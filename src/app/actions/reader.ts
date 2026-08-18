"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type ReadingProgress = {
  chapterIndex: number;
  scrollOffset: number;
  timeSpent: number;
  completed: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// Save (upsert) reading progress for the current user + book.
// Uses admin client to bypass RLS — works for NextAuth + Supabase Auth users.
// ─────────────────────────────────────────────────────────────────────────────
export async function saveProgressAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return;

  const bookId = Number(formData.get("bookId"));
  const chapterIndex = Number(formData.get("chapterIndex") ?? 0);
  const scrollOffset = Math.max(0, Number(formData.get("scrollOffset") ?? 0));
  const timeSpent = Number(formData.get("timeSpent") ?? 0);
  const completed = formData.get("completed") === "true";
  if (!bookId) return;

  const supabase = await createAdminClient();
  const now = new Date().toISOString();

  const { data: userRow } = await supabase
    .from("users")
    .select("user_id")
    .eq("email", user.email)
    .maybeSingle();
  const legacyUserId: number | null = userRow?.user_id ?? null;

  const orFilter = legacyUserId
    ? `auth_user_id.eq.${user.id},user_id.eq.${legacyUserId}`
    : `auth_user_id.eq.${user.id}`;

  const { data: existing } = await supabase
    .from("reading_progress")
    .select("id, chapter_index, last_read")
    .eq("book_id", bookId)
    .or(orFilter)
    .maybeSingle();

  const payload = {
    chapter_index: chapterIndex,
    scroll_position: scrollOffset,
    time_spent: timeSpent,
    completed: completed ? 1 : 0,
    last_read: now,
    auth_user_id: user.id,
  };

  if (existing) {
    await supabase.from("reading_progress").update(payload).eq("id", existing.id);
  } else {
    await supabase.from("reading_progress").insert({
      ...payload,
      user_id: legacyUserId,
      book_id: bookId,
    });
  }

  const newStatus = completed ? "completed" : "reading";
  const ubFilter = legacyUserId
    ? supabase
        .from("user_books")
        .update({ reading_status: newStatus, last_accessed: now })
        .eq("book_id", bookId)
        .or(`auth_user_id.eq.${user.id},user_id.eq.${legacyUserId}`)
    : supabase
        .from("user_books")
        .update({ reading_status: newStatus, last_accessed: now })
        .eq("book_id", bookId)
        .eq("auth_user_id", user.id);
  await ubFilter;

  revalidatePath("/dashboard");
}

// ─────────────────────────────────────────────────────────────────────────────
// Load reading progress — dual-ID aware (auth UUID + legacy int).
// ─────────────────────────────────────────────────────────────────────────────
export async function loadProgressAction(
  bookId: number,
): Promise<ReadingProgress | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createAdminClient();

  const { data: userRow } = await supabase
    .from("users")
    .select("user_id")
    .eq("email", user.email)
    .maybeSingle();
  const legacyUserId: number | null = userRow?.user_id ?? null;

  const orFilter = legacyUserId
    ? `auth_user_id.eq.${user.id},user_id.eq.${legacyUserId}`
    : `auth_user_id.eq.${user.id}`;

  const { data } = await supabase
    .from("reading_progress")
    .select("chapter_index, scroll_position, time_spent, completed")
    .eq("book_id", bookId)
    .or(orFilter)
    .order("last_read", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!data) return null;

  return {
    chapterIndex: data.chapter_index ?? 0,
    scrollOffset: data.scroll_position ?? 0,
    timeSpent: data.time_spent ?? 0,
    completed: data.completed === 1 || data.completed === true,
  };
}
