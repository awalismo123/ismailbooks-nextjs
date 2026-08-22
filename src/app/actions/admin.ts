"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { processBookFileBuffer } from "@/lib/ingestion/processBookFile";

// ─────────────────────────────────────────────────────────────
// Helper: verify current user is admin (NextAuth or Supabase)
// ─────────────────────────────────────────────────────────────
async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) {
    // Double-check from DB in case session is stale
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

// ─────────────────────────────────────────────────────────────
// USER MANAGEMENT
// ─────────────────────────────────────────────────────────────
export async function setUserStatusAction(formData: FormData) {
  await requireAdmin();
  const userId = formData.get("userId") as string;
  const newStatus = formData.get("newStatus") as string;
  const adminSupabase = await createAdminClient();

  // Detect if this is a legacy integer user_id or a UUID (profiles/auth user)
  const isLegacyUser = /^\d+$/.test(userId);
  if (isLegacyUser) {
    await adminSupabase
      .from("users")
      .update({ account_status: newStatus })
      .eq("user_id", Number(userId));
  } else {
    await adminSupabase
      .from("profiles")
      .update({ account_status: newStatus })
      .eq("id", userId);
  }
  revalidatePath("/admin");
}

export async function adminResetUserPasswordAction(formData: FormData) {
  await requireAdmin();
  const userId = formData.get("userId") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!userId || !newPassword) {
    return { error: "User ID iyo paswoord cusub ayaa loo baahan yahay." };
  }

  if (newPassword.length < 6) {
    return { error: "Paswoord-ku waa inuu ugu yaraan 6 xaraf ka koobnaadaa." };
  }

  const adminSupabase = await createAdminClient();
  const { error } = await adminSupabase.auth.admin.updateUserById(userId, {
    password: newPassword,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

// ─────────────────────────────────────────────────────────────
// BOOK MANAGEMENT
// ─────────────────────────────────────────────────────────────
export async function setBookActiveAction(formData: FormData) {
  await requireAdmin();
  const bookId = formData.get("bookId") as string;
  const isActive = formData.get("isActive") === "true";
  const adminSupabase = await createAdminClient();
  await adminSupabase.from("books").update({ is_active: isActive }).eq("id", bookId);
  revalidatePath("/admin");
  revalidatePath("/books");
  revalidatePath("/");
}

export async function saveBookAction(formData: FormData) {
  await requireAdmin();
  const adminSupabase = await createAdminClient();

  const id = formData.get("id") as string | null;
  const bookData = {
    title: formData.get("title") as string,
    author: formData.get("author") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    is_paid: formData.get("is_paid") === "true" ? 1 : 0,
    price: formData.get("price") ? Number(formData.get("price")) : null,
    pages: formData.get("pages") ? Number(formData.get("pages")) : null,
    file_link: formData.get("file_link") as string,
    cover_image: formData.get("cover_image") as string | null,
    is_active: formData.get("is_active") === "true" ? 1 : 0,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await adminSupabase.from("books").update(bookData).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await adminSupabase.from("books").insert({
      ...bookData,
      created_at: new Date().toISOString(),
      total_downloads: 0,
      views: 0,
    });
    if (error) return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/books");
  return { success: true };
}

export async function deleteBookAction(formData: FormData) {
  await requireAdmin();
  const bookId = formData.get("bookId") as string;
  const adminSupabase = await createAdminClient();
  await adminSupabase.from("books").delete().eq("id", bookId);
  revalidatePath("/admin");
  revalidatePath("/books");
}

// ─────────────────────────────────────────────────────────────
// BLOG MANAGEMENT
// ─────────────────────────────────────────────────────────────
export async function saveBlogPostAction(formData: FormData) {
  await requireAdmin();
  const adminSupabase = await createAdminClient();

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const status = formData.get("status") as string; // "published" | "draft"
  const category_id = formData.get("category_id") ? Number(formData.get("category_id")) : null;
  const featured_image = formData.get("featured_image") as string | null;
  const meta_title = formData.get("meta_title") as string | null;
  const meta_description = formData.get("meta_description") as string | null;

  // Auto-generate slug from title
  const slug = id
    ? (formData.get("slug") as string)
    : title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 100);

  // Estimate read time (~200 words/min)
  const wordCount = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  const estimated_read_time = Math.max(1, Math.ceil(wordCount / 200));

  const postData = {
    title, content, excerpt, status, slug,
    category_id, featured_image, meta_title, meta_description,
    estimated_read_time,
    updated_at: new Date().toISOString(),
    ...(status === "published" && !id ? { published_at: new Date().toISOString() } : {}),
  };

  if (id) {
    const { error } = await adminSupabase.from("blog_posts").update(postData).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await adminSupabase.from("blog_posts").insert({
      ...postData,
      author_id: 1,
      view_count: 0,
      created_at: new Date().toISOString(),
    });
    if (error) return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/blog");
  return { success: true };
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireAdmin();
  const postId = formData.get("postId") as string;
  const adminSupabase = await createAdminClient();
  await adminSupabase.from("blog_posts").delete().eq("id", postId);
  revalidatePath("/admin");
  revalidatePath("/blog");
}

export async function toggleBlogPostStatusAction(formData: FormData) {
  await requireAdmin();
  const postId = formData.get("postId") as string;
  const currentStatus = formData.get("currentStatus") as string;
  const newStatus = currentStatus === "published" ? "draft" : "published";
  const adminSupabase = await createAdminClient();
  await adminSupabase.from("blog_posts").update({
    status: newStatus,
    ...(newStatus === "published" ? { published_at: new Date().toISOString() } : {}),
    updated_at: new Date().toISOString(),
  }).eq("id", postId);
  revalidatePath("/admin");
  revalidatePath("/blog");
}

// ─────────────────────────────────────────────────────────────
// SUMMARIES MANAGEMENT
// ─────────────────────────────────────────────────────────────
export async function saveSummaryAction(formData: FormData) {
  await requireAdmin();
  const adminSupabase = await createAdminClient();

  const id = formData.get("id") as string | null;
  const summaryFile = formData.get("summaryFile") as File | null;
  let pages = formData.get("pages") ? Number(formData.get("pages")) : null;

  const summaryData: any = {
    title: formData.get("title") as string,
    book_title: formData.get("book_title") as string,
    book_author: formData.get("book_author") as string,
    summary_creator: formData.get("summary_creator") as string,
    description: formData.get("description") as string,
    content_html: formData.get("content_html") as string,
    category: formData.get("category") as string,
    is_paid: formData.get("is_paid") === "true" ? 1 : 0,
    is_published: formData.get("is_published") === "true" ? 1 : 0,
    price: formData.get("price") ? Number(formData.get("price")) : null,
    pages: pages,
    reading_time_minutes: formData.get("reading_time_minutes") ? Number(formData.get("reading_time_minutes")) : null,
    cover_image: formData.get("cover_image") as string | null,
    updated_at: new Date().toISOString(),
  };

  let targetId = id;

  if (id) {
    const { error } = await adminSupabase.from("summaries").update(summaryData).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { data: newSummary, error } = await adminSupabase.from("summaries").insert({
      ...summaryData,
      views: 0,
      created_at: new Date().toISOString(),
    }).select("id").single();
    if (error) return { error: error.message };
    if (newSummary) targetId = String(newSummary.id);
  }

  // ── Ingest Document File (if provided) ──
  if (summaryFile && summaryFile.size > 0 && targetId) {
    try {
      const arrayBuf = await summaryFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuf);
      const ingestion = await processBookFileBuffer(buffer, summaryFile.name);

      const filePath = `summary_${targetId}/${summaryFile.name}`;
      
      const updateData: any = { file_link: filePath };
      if (ingestion.pages && !pages) {
        updateData.pages = ingestion.pages;
        updateData.reading_time_minutes = Math.round(ingestion.pages / 2) || 5;
      }

      await adminSupabase.from("summaries").update(updateData).eq("id", targetId);

      const tocStr = JSON.stringify(ingestion.toc, null, 2);
      await adminSupabase.storage
        .from("book-content")
        .upload(`summary_${targetId}/toc.json`, Buffer.from(tocStr), {
          contentType: "application/json",
          upsert: true,
        });

      for (const chap of ingestion.chapters) {
        await adminSupabase.storage
          .from("book-content")
          .upload(`summary_${targetId}/${chap.fileName}`, Buffer.from(chap.content), {
            contentType: "text/html",
            upsert: true,
          });
      }
    } catch (err: any) {
      console.error("Summary ingestion error:", err);
      return {
        error: `Soo-koobka waa la kaydiyay laakiin processing-ka faylka wuu guul-darraystay: ${err.message}`,
      };
    }
  }

  revalidatePath("/admin");
  revalidatePath("/summaries");
  return { success: true };
}

export async function deleteSummaryAction(formData: FormData) {
  await requireAdmin();
  const summaryId = formData.get("summaryId") as string;
  const adminSupabase = await createAdminClient();
  await adminSupabase.from("summaries").delete().eq("id", summaryId);
  revalidatePath("/admin");
  revalidatePath("/summaries");
}

// ─────────────────────────────────────────────────────────────
// BLOG CATEGORIES MANAGEMENT
// ─────────────────────────────────────────────────────────────
export async function saveBlogCategoryAction(formData: FormData) {
  await requireAdmin();
  const adminSupabase = await createAdminClient();
  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  if (id) {
    const { error } = await adminSupabase.from("blog_categories").update({ name, slug }).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await adminSupabase.from("blog_categories").insert({ name, slug });
    if (error) return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/blog");
  return { success: true };
}

export async function deleteBlogCategoryAction(formData: FormData) {
  await requireAdmin();
  const categoryId = (formData.get("id") || formData.get("categoryId")) as string;
  const adminSupabase = await createAdminClient();
  await adminSupabase.from("blog_categories").delete().eq("id", categoryId);
  revalidatePath("/admin");
  revalidatePath("/blog");
}