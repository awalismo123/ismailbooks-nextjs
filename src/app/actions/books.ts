"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { processBookFileBuffer } from "@/lib/ingestion/processBookFile";
import { createAdminClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) {
    const adminSupabase = await createAdminClient();
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
  const adminSupabase = await createAdminClient();

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

      // Persist the raw document file in storage so it can be re-ingested at any time
      await adminSupabase.storage
        .from("book-content")
        .upload(filePath, buffer, {
          contentType: bookDocFile.type || "application/octet-stream",
          upsert: true,
        });

      // Upload toc.json
      const tocStr = JSON.stringify(ingestion.toc, null, 2);
      await adminSupabase.storage
        .from("book-content")
        .upload(`${targetId}/toc.json`, Buffer.from(tocStr), {
          contentType: "application/json",
          upsert: true,
        });

      // Upload chapter HTML files in batches of 6 for fast parallel upload
      const BATCH_SIZE = 6;
      for (let i = 0; i < ingestion.chapters.length; i += BATCH_SIZE) {
        const chunk = ingestion.chapters.slice(i, i + BATCH_SIZE);
        await Promise.all(
          chunk.map((chap) =>
            adminSupabase.storage
              .from("book-content")
              .upload(`${targetId}/${chap.fileName}`, Buffer.from(chap.content), {
                contentType: "text/html",
                upsert: true,
              })
          )
        );
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

// ── Update Book Table of Contents (TOC) ──────────────────────────────────────
export async function updateTocAction(
  bookId: string,
  toc: { title: string; file: string }[]
): Promise<{ success?: boolean; error?: string }> {
  await requireAdmin();
  const adminSupabase = await createAdminClient();

  try {
    const tocStr = JSON.stringify(toc, null, 2);
    const { error } = await adminSupabase.storage
      .from("book-content")
      .upload(`${bookId}/toc.json`, Buffer.from(tocStr), {
        contentType: "application/json",
        upsert: true,
      });

    if (error) return { error: error.message };

    revalidatePath("/admin");
    revalidatePath(`/books/${bookId}/read`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

// ── Re-ingest an Existing Uploaded Book ─────────────────────────────────────
export async function reingestBookAction(
  bookId: string
): Promise<{ success?: boolean; error?: string }> {
  await requireAdmin();
  const adminSupabase = await createAdminClient();

  try {
    const { data: book, error: fetchErr } = await adminSupabase
      .from("books")
      .select("id, file_link")
      .eq("id", bookId)
      .single();

    if (fetchErr || !book || !book.file_link) {
      return { error: "Faylka buugga lagama helin kaydka (file_link is missing)." };
    }

    const { data: fileData, error: downloadErr } = await adminSupabase.storage
      .from("book-content")
      .download(book.file_link);

    if (downloadErr || !fileData) {
      return { error: `Faylka buugga waa la soo rogi waayay: ${downloadErr?.message}` };
    }

    const arrayBuf = await fileData.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);
    const fileName = book.file_link.split("/").pop() || "book.pdf";

    const ingestion = await processBookFileBuffer(buffer, fileName);

    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (ingestion.pages) {
      updatePayload.pages = ingestion.pages;
    }
    await adminSupabase.from("books").update(updatePayload).eq("id", bookId);

    const tocStr = JSON.stringify(ingestion.toc, null, 2);
    await adminSupabase.storage
      .from("book-content")
      .upload(`${bookId}/toc.json`, Buffer.from(tocStr), {
        contentType: "application/json",
        upsert: true,
      });

    const BATCH_SIZE = 6;
    for (let i = 0; i < ingestion.chapters.length; i += BATCH_SIZE) {
      const chunk = ingestion.chapters.slice(i, i + BATCH_SIZE);
      await Promise.all(
        chunk.map((chap) =>
          adminSupabase.storage
            .from("book-content")
            .upload(`${bookId}/${chap.fileName}`, Buffer.from(chap.content), {
              contentType: "text/html",
              upsert: true,
            })
        )
      );
    }

    revalidatePath("/admin");
    revalidatePath(`/books/${bookId}/read`);
    return { success: true };
  } catch (err: any) {
    return { error: `Khalad ayaa dhacay intii lagu guda jiray re-ingestion: ${err.message}` };
  }
}

// ── Delete a Book ────────────────────────────────────────────────────────────
export async function deleteBookAction(
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  await requireAdmin();
  const bookId      = formData.get("bookId") as string;
  const adminSupabase = await createAdminClient();

  const { error } = await adminSupabase.from("books").delete().eq("id", bookId);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/books");
  revalidatePath("/");
  return { success: true };
}
