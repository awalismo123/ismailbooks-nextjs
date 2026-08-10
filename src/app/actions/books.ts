"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { processBookFileBuffer } from "@/lib/ingestion/processBookFile";

async function getAdminClient() {
  const { createServerClient } = await import("@supabase/ssr");
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() {},
      },
    }
  );
}

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) {
    const adminSupabase = await getAdminClient();
    const { data: profile } = await adminSupabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle();
    if (!profile?.is_admin) redirect("/");
  }
  return user;
}

// ── Create or Update a Book ──────────────────────────────────────────────────
export async function saveBookAction(
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  await requireAdmin();
  const adminSupabase = await getAdminClient();

  const bookId       = (formData.get("bookId") as string) || "";
  const title        = (formData.get("title") as string)?.trim();
  const author       = (formData.get("author") as string)?.trim() || null;
  const category     = (formData.get("category") as string)?.trim() || null;
  const description  = (formData.get("description") as string)?.trim() || null;
  const price        = Number(formData.get("price") || 0);
  let   pages        = Number(formData.get("pages") || 0);
  const is_paid      = formData.get("is_paid") === "true";
  const is_active    = formData.get("is_active") === "true";
  const coverFile    = formData.get("cover") as File | null;
  const bookDocFile  = formData.get("bookFile") as File | null;

  if (!title) return { error: "Cinwaanka buugga waa lagama maarmaan!" };

  // ── Upload cover image ────────────────────────────────────────────────────
  let cover_image: string | null = null;
  if (coverFile && coverFile.size > 0) {
    const ext  = coverFile.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `book-${Date.now()}.${ext}`;
    const { error } = await adminSupabase.storage
      .from("covers")
      .upload(path, coverFile, {
        contentType: coverFile.type || "image/jpeg",
        upsert: false,
      });
    if (!error) cover_image = path;
  }

  const now = new Date().toISOString();

  const payload: Record<string, unknown> = {
    title,
    author,
    category,
    description,
    price: is_paid ? price : 0,
    pages,
    is_paid,
    is_active,
    updated_at: now,
    ...(cover_image ? { cover_image } : {}),
  };

  let targetId = bookId;

  if (bookId) {
    // ── UPDATE ────────────────────────────────────────────────────────────
    const { error } = await adminSupabase
      .from("books")
      .update(payload)
      .eq("id", bookId);
    if (error) return { error: `Khaladka: ${error.message}` };
  } else {
    // ── INSERT ────────────────────────────────────────────────────────────
    const { data: newBook, error } = await adminSupabase
      .from("books")
      .insert({
        ...payload,
        file_link: "",        // required by DB schema — empty until PDF is processed
        created_at: now,
        views: 0,
        total_downloads: 0,
      })
      .select("id")
      .single();

    if (error) return { error: `Khaladka gelitaanka: ${error.message}` };
    if (newBook) targetId = String(newBook.id);
  }

  // ── Ingest PDF / TXT file ─────────────────────────────────────────────────
  if (bookDocFile && bookDocFile.size > 0 && targetId) {
    try {
      const arrayBuf = await bookDocFile.arrayBuffer();
      const buffer   = Buffer.from(arrayBuf);

      const ingestion = await processBookFileBuffer(buffer, bookDocFile.name);

      // Persist the ingested file reference in file_link column
      const filePath = `${targetId}/${bookDocFile.name}`;
      await adminSupabase
        .from("books")
        .update({
          file_link: filePath,
          ...(ingestion.pages && pages === 0 ? { pages: ingestion.pages } : {}),
        })
        .eq("id", targetId);

      // Upload toc.json
      const tocStr = JSON.stringify(ingestion.toc, null, 2);
      await adminSupabase.storage
        .from("book-content")
        .upload(`${targetId}/toc.json`, Buffer.from(tocStr), {
          contentType: "application/json",
          upsert: true,
        });

      // Upload each chapter HTML file
      for (const chap of ingestion.chapters) {
        await adminSupabase.storage
          .from("book-content")
          .upload(`${targetId}/${chap.fileName}`, Buffer.from(chap.content), {
            contentType: "text/html",
            upsert: true,
          });
      }
    } catch (err: any) {
      console.error("Book ingestion error:", err);
      return {
        error: `Buugga waa la kaydiyay laakiin PDF-ka processing-kiisii wuu guul-darraystay: ${err.message}`,
      };
    }
  }

  revalidatePath("/admin");
  revalidatePath("/books");
  revalidatePath("/");
  return { success: true };
}

// ── Delete a Book ────────────────────────────────────────────────────────────
export async function deleteBookAction(
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  await requireAdmin();
  const bookId      = formData.get("bookId") as string;
  const adminSupabase = await getAdminClient();

  const { error } = await adminSupabase.from("books").delete().eq("id", bookId);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/books");
  revalidatePath("/");
  return { success: true };
}