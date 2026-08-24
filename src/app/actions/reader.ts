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

async function getCurrentUserIds() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createAdminClient();
  const { data: userRow } = await supabase
    .from("users")
    .select("user_id")
    .eq("email", user.email)
    .maybeSingle();

  return {
    authUserId: user.id,
    legacyUserId: userRow?.user_id ?? null,
    supabase,
  };
}

function buildUserOrFilter(authUserId: string, legacyUserId: number | null) {
  return legacyUserId
    ? `auth_user_id.eq.${authUserId},user_id.eq.${legacyUserId}`
    : `auth_user_id.eq.${authUserId}`;
}

export async function syncBookmarksAction(formData: FormData) {
  const userIds = await getCurrentUserIds();
  if (!userIds) return { synced: 0 };

  const bookId = Number(formData.get("bookId"));
  const rawItems = formData.get("items");
  if (!bookId || !rawItems) return { synced: 0 };

  let items: Array<Record<string, unknown>>;
  try {
    items = JSON.parse(String(rawItems));
  } catch {
    return { synced: 0 };
  }

  if (!Array.isArray(items) || items.length === 0) {
    return { synced: 0 };
  }

  const { supabase, authUserId, legacyUserId } = userIds;
  const remoteRows = await supabase
    .from("bookmarks")
    .select("id, chapter_index, chapter_title, preview_text")
    .eq("book_id", bookId)
    .or(buildUserOrFilter(authUserId, legacyUserId));

  const existingKeySet = new Set(
    (remoteRows.data ?? [])
      .map((row) => {
        const chapter = Number(row.chapter_index ?? 0);
        const title = String(row.chapter_title ?? "");
        const preview = String(row.preview_text ?? "");
        return `${chapter}|${title.slice(0, 40)}|${preview.slice(0, 80)}`;
      })
      .filter(Boolean),
  );

  const payload = items
    .map((item) => {
      const chapterIndex = Number(item.chapterIndex ?? item.chapter_index ?? 0);
      const chapterTitle = String(item.chapterTitle ?? item.chapter_title ?? `Cutubka ${chapterIndex + 1}`);
      const previewText = String(item.previewText ?? item.preview_text ?? "");
      const key = `${chapterIndex}|${chapterTitle.slice(0, 40)}|${previewText.slice(0, 80)}`;
      if (existingKeySet.has(key)) return null;

      return {
        auth_user_id: authUserId,
        user_id: legacyUserId,
        book_id: bookId,
        chapter_index: chapterIndex,
        chapter_title: chapterTitle,
        preview_text: previewText || null,
        created_at: item.createdAt ? String(item.createdAt) : new Date().toISOString(),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (!payload.length) return { synced: 0 };

  const { error } = await supabase.from("bookmarks").insert(payload);
  if (error) {
    return { synced: 0, error: error.message };
  }

  return { synced: payload.length };
}

export async function syncHighlightsAction(formData: FormData) {
  const userIds = await getCurrentUserIds();
  if (!userIds) return { synced: 0 };

  const bookId = Number(formData.get("bookId"));
  const rawItems = formData.get("items");
  if (!bookId || !rawItems) return { synced: 0 };

  let items: Array<Record<string, unknown>>;
  try {
    items = JSON.parse(String(rawItems));
  } catch {
    return { synced: 0 };
  }

  if (!Array.isArray(items) || items.length === 0) {
    return { synced: 0 };
  }

  const { supabase, authUserId, legacyUserId } = userIds;
  const remoteRows = await supabase
    .from("highlights")
    .select("id, chapter_index, highlighted_text, color")
    .eq("book_id", bookId)
    .or(buildUserOrFilter(authUserId, legacyUserId));

  const existingKeySet = new Set(
    (remoteRows.data ?? [])
      .map((row) => {
        const chapter = Number(row.chapter_index ?? 0);
        const text = String(row.highlighted_text ?? "");
        const color = String(row.color ?? "gold");
        return `${chapter}|${color}|${text.slice(0, 80)}`;
      })
      .filter(Boolean),
  );

  const payload = items
    .map((item) => {
      const chapterIndex = Number(item.chapterIndex ?? item.chapter_index ?? 0);
      const text = String(item.text ?? item.highlighted_text ?? "");
      const color = String(item.color ?? "gold");
      const key = `${chapterIndex}|${color}|${text.slice(0, 80)}`;
      if (existingKeySet.has(key)) return null;

      return {
        auth_user_id: authUserId,
        user_id: legacyUserId,
        book_id: bookId,
        chapter_index: chapterIndex,
        highlighted_text: text,
        color: ["gold", "navy", "oxblood", "green"].includes(color) ? color : "gold",
        created_at: item.createdAt ? String(item.createdAt) : new Date().toISOString(),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (!payload.length) return { synced: 0 };

  const { error } = await supabase.from("highlights").insert(payload);
  if (error) {
    return { synced: 0, error: error.message };
  }

  return { synced: payload.length };
}

export async function loadBookmarksAction(bookId: number) {
  const userIds = await getCurrentUserIds();
  if (!userIds) return [];

  const { supabase, authUserId, legacyUserId } = userIds;
  const { data } = await supabase
    .from("bookmarks")
    .select("id, book_id, chapter_index, chapter_title, preview_text, created_at")
    .eq("book_id", bookId)
    .or(buildUserOrFilter(authUserId, legacyUserId))
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => ({
    id: String(row.id),
    bookId: String(row.book_id ?? bookId),
    chapterIndex: Number(row.chapter_index ?? 0),
    chapterTitle: String(row.chapter_title ?? `Cutubka ${Number(row.chapter_index ?? 0) + 1}`),
    previewText: String(row.preview_text ?? ""),
    scrollOffset: 0,
    createdAt: String(row.created_at ?? new Date().toISOString()),
  }));
}

export async function loadHighlightsAction(bookId: number) {
  const userIds = await getCurrentUserIds();
  if (!userIds) return [];

  const { supabase, authUserId, legacyUserId } = userIds;
  const { data } = await supabase
    .from("highlights")
    .select("id, book_id, chapter_index, highlighted_text, color, created_at")
    .eq("book_id", bookId)
    .or(buildUserOrFilter(authUserId, legacyUserId))
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => ({
    id: String(row.id),
    bookId: String(row.book_id ?? bookId),
    chapterIndex: Number(row.chapter_index ?? 0),
    chapterTitle: `Cutubka ${Number(row.chapter_index ?? 0) + 1}`,
    text: String(row.highlighted_text ?? ""),
    color: ["gold", "navy", "oxblood", "green"].includes(String(row.color ?? "gold"))
      ? String(row.color ?? "gold")
      : "gold",
    scrollOffset: 0,
    createdAt: String(row.created_at ?? new Date().toISOString()),
  }));
}

export async function deleteBookmarkAction(id: string) {
  const userIds = await getCurrentUserIds();
  if (!userIds) return { ok: false };

  // Local-only ids are not numeric DB rows
  if (!/^\d+$/.test(id)) return { ok: true };

  const { supabase, authUserId, legacyUserId } = userIds;
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", Number(id))
    .or(buildUserOrFilter(authUserId, legacyUserId));

  return { ok: !error };
}

export async function deleteHighlightAction(id: string) {
  const userIds = await getCurrentUserIds();
  if (!userIds) return { ok: false };

  if (!/^\d+$/.test(id)) return { ok: true };

  const { supabase, authUserId, legacyUserId } = userIds;
  const { error } = await supabase
    .from("highlights")
    .delete()
    .eq("id", Number(id))
    .or(buildUserOrFilter(authUserId, legacyUserId));

  return { ok: !error };
}
