import React from "react";
import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardBooksClient, { BookItem } from "./DashboardBooksClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Buugaagtayda - IsmailBooks",
  description: "Dhammaan buugaagta aad ka iibsatay ama akhrinayso.",
};

export default async function MyBooksPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const adminSupabase = await createAdminClient();
  let authUserId = user.id;
  let legacyUserId: number | null = /^\d+$/.test(user.id) ? Number(user.id) : null;

  if (user.email) {
    const { data: legacyAccount } = await adminSupabase.from("users").select("user_id").ilike("email", user.email).maybeSingle();
    if (legacyAccount) legacyUserId = legacyAccount.user_id;
    const { data: profileAccount } = await adminSupabase.from("profiles").select("id").eq("id", user.id).maybeSingle();
    if (profileAccount) authUserId = profileAccount.id;
  }

  // 1. Fetch entitlements for books
  let entitlementsQuery = adminSupabase.from("user_books").select("user_book_id, reading_status, book_id, last_accessed");
  if (legacyUserId && authUserId && !/^\d+$/.test(authUserId)) {
    entitlementsQuery = entitlementsQuery.or(`auth_user_id.eq.${authUserId},user_id.eq.${legacyUserId}`);
  } else if (legacyUserId) {
    entitlementsQuery = entitlementsQuery.eq("user_id", legacyUserId);
  } else {
    entitlementsQuery = entitlementsQuery.eq("auth_user_id", authUserId);
  }
  let { data: bookEntitlements } = await entitlementsQuery.order("last_accessed", { ascending: false, nullsFirst: false });

  // 1b. Fetch entitlements for summaries
  let summariesQuery = adminSupabase.from("user_summaries").select("user_summary_id, reading_status, summary_id, last_accessed");
  if (legacyUserId && authUserId && !/^\d+$/.test(authUserId)) {
    summariesQuery = summariesQuery.or(`auth_user_id.eq.${authUserId},user_id.eq.${legacyUserId}`);
  } else if (legacyUserId) {
    summariesQuery = summariesQuery.eq("user_id", legacyUserId);
  } else {
    summariesQuery = summariesQuery.eq("auth_user_id", authUserId);
  }
  let { data: summaryEntitlements } = await summariesQuery.order("last_accessed", { ascending: false, nullsFirst: false });

  // 2. Fetch details for both
  const bookIds = [...new Set((bookEntitlements || []).map((e: any) => e.book_id).filter(Boolean))];
  const summaryIds = [...new Set((summaryEntitlements || []).map((e: any) => e.summary_id).filter(Boolean))];

  const { data: booksData } = bookIds.length > 0 
    ? await adminSupabase.from("books").select("id, title, author, cover_image, category, is_paid, pages, price").in("id", bookIds)
    : { data: [] };
  const booksMap = Object.fromEntries((booksData || []).map((b: any) => [b.id, b]));

  const { data: summariesData } = summaryIds.length > 0 
    ? await adminSupabase.from("summaries").select("id, title, book_author, summary_creator, cover_image, category, is_paid, pages, price").in("id", summaryIds)
    : { data: [] };
  const summariesMap = Object.fromEntries((summariesData || []).map((b: any) => [b.id, b]));

  // 3. Fetch chapters counts (TOC)
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const chapterCountsMap: Record<string, number> = {};
  await Promise.all([
    ...bookIds.map(async (bId) => {
      try {
        const res = await fetch(`${SUPABASE_URL}/storage/v1/object/public/book-content/${bId}/toc.json`, { next: { revalidate: 3600 } });
        if (res.ok) {
          const tocData = await res.json();
          if (Array.isArray(tocData)) chapterCountsMap[`book_${bId}`] = tocData.length;
        }
      } catch {}
    }),
    ...summaryIds.map(async (sId) => {
      try {
        const res = await fetch(`${SUPABASE_URL}/storage/v1/object/public/book-content/summary_${sId}/toc.json`, { next: { revalidate: 3600 } });
        if (res.ok) {
          const tocData = await res.json();
          if (Array.isArray(tocData)) chapterCountsMap[`summary_${sId}`] = tocData.length;
        }
      } catch {}
    })
  ]);

  // 4. Reading progress
  let progressQuery = adminSupabase.from("reading_progress").select("book_id, summary_id, chapter_index, time_spent, completed, last_read");
  if (legacyUserId && authUserId && !/^\d+$/.test(authUserId)) {
    progressQuery = progressQuery.or(`auth_user_id.eq.${authUserId},user_id.eq.${legacyUserId}`);
  } else if (legacyUserId) {
    progressQuery = progressQuery.eq("user_id", legacyUserId);
  } else {
    progressQuery = progressQuery.eq("auth_user_id", authUserId);
  }
  const { data: progressRows } = await progressQuery;
  const progressMap = Object.fromEntries((progressRows || []).map((p: any) => [
    p.book_id ? `book_${p.book_id}` : `summary_${p.summary_id}`, 
    p
  ]));

  // 5. Build combined list
  const myItems: BookItem[] = [
    ...(bookEntitlements || []).map((ent: any) => {
      const bk = booksMap[ent.book_id];
      if (!bk) return null;
      const itemKey = `book_${bk.id}`;
      const prog = progressMap[itemKey];
      const totalCh = chapterCountsMap[itemKey] || 0;
      const chIdx = prog?.chapter_index ?? 0;
      const isDone = ent.reading_status === "completed" || prog?.completed === 1 || prog?.completed === true;

      let coverUrl: string | null = null;
      if (bk.cover_image) {
        if (bk.cover_image.startsWith("http")) coverUrl = bk.cover_image;
        else coverUrl = `${SUPABASE_URL}/storage/v1/object/public/covers/${bk.cover_image}`;
      }
      const isPaid = bk.is_paid === true || bk.is_paid === 1 || Number(bk.price || 0) > 0;
      let estimatedTimeLeft = null;
      if (totalCh > 0 && !isDone) {
        const timeSpentSeconds = Number(prog?.time_spent || 0);
        const avgChapterTime = chIdx > 0 ? timeSpentSeconds / chIdx : 900;
        const remainingChapters = Math.max(0, totalCh - chIdx - 1);
        const remainingSeconds = remainingChapters * avgChapterTime;
        if (remainingSeconds > 0) {
          const h = Math.floor(remainingSeconds / 3600);
          const m = Math.floor((remainingSeconds % 3600) / 60);
          estimatedTimeLeft = h > 0 ? `~${h}h ${m}m left` : (m > 0 ? `~${m}m left` : `<1m left`);
        }
      }
      return {
        id: bk.id,
        isSummary: false,
        title: bk.title,
        author: bk.author || "",
        coverImage: coverUrl,
        category: bk.category || "",
        isPaid,
        pages: bk.pages || 0,
        price: bk.price || 0,
        chapterIndex: chIdx,
        totalChapters: totalCh,
        progressPct: totalCh > 0 ? Math.round((chIdx / totalCh) * 100) : 0,
        isCompleted: isDone,
        lastAccessed: ent.last_accessed || new Date().toISOString(),
        lastAccessedRaw: prog?.last_read || ent.last_accessed || null,
        estimatedTimeLeft,
      };
    }),
    ...(summaryEntitlements || []).map((ent: any) => {
      const bk = summariesMap[ent.summary_id];
      if (!bk) return null;
      const itemKey = `summary_${bk.id}`;
      const prog = progressMap[itemKey];
      const totalCh = chapterCountsMap[itemKey] || 0;
      const chIdx = prog?.chapter_index ?? 0;
      const isDone = ent.reading_status === "completed" || prog?.completed === 1 || prog?.completed === true;

      let coverUrl: string | null = null;
      if (bk.cover_image) {
        if (bk.cover_image.startsWith("http")) coverUrl = bk.cover_image;
        else coverUrl = `${SUPABASE_URL}/storage/v1/object/public/covers/${bk.cover_image}`;
      }
      const isPaid = bk.is_paid === true || bk.is_paid === 1 || Number(bk.price || 0) > 0;
      return {
        id: bk.id,
        isSummary: true,
        title: bk.title,
        author: bk.summary_creator || bk.book_author || "IsmailBooks",
        coverImage: coverUrl,
        category: bk.category || "Soo-koobid",
        isPaid,
        pages: bk.pages || 0,
        price: bk.price || 0,
        chapterIndex: chIdx,
        totalChapters: totalCh,
        progressPct: totalCh > 0 ? Math.round((chIdx / totalCh) * 100) : (isDone ? 100 : 0),
        isCompleted: isDone,
        lastAccessed: ent.last_accessed || new Date().toISOString(),
        lastAccessedRaw: prog?.last_read || ent.last_accessed || null,
        estimatedTimeLeft: null,
      };
    })
  ].filter(Boolean) as (BookItem & { isSummary?: boolean })[];

  // Sort by most recently accessed
  myItems.sort((a, b) => {
    const da = a.lastAccessedRaw ? new Date(a.lastAccessedRaw).getTime() : new Date(a.lastAccessed).getTime();
    const db = b.lastAccessedRaw ? new Date(b.lastAccessedRaw).getTime() : new Date(b.lastAccessed).getTime();
    return db - da;
  });

  return <DashboardBooksClient initialBooks={myItems} userId={authUserId} />;
}
