import React from "react";
import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardOverviewClient, {
  OverviewBookItem,
  OverviewStats,
  OverviewPayment,
} from "./DashboardOverviewClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardOverviewPage() {
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

  const displayUsername = user.name || user.username || user.email?.split("@")[0] || "Akhriste";

  // Profile (for admin badge)
  const { data: profile } = await adminSupabase.from("profiles").select("is_admin").eq("id", authUserId).maybeSingle();

  // Build or-filter helper
  const buildOrFilter = (base: string) => {
    if (legacyUserId && authUserId && !/^\d+$/.test(authUserId)) return `${base}.eq.${authUserId},user_id.eq.${legacyUserId}`;
    if (legacyUserId) return `user_id.eq.${legacyUserId}`;
    return `${base}.eq.${authUserId}`;
  };

  // ── Entitlements ────────────────────────────────────────────────────────────
  let entitlementsQuery = adminSupabase.from("user_books").select("user_book_id, reading_status, book_id, last_accessed");
  if (legacyUserId && authUserId && !/^\d+$/.test(authUserId)) {
    entitlementsQuery = entitlementsQuery.or(`auth_user_id.eq.${authUserId},user_id.eq.${legacyUserId}`);
  } else if (legacyUserId) {
    entitlementsQuery = entitlementsQuery.eq("user_id", legacyUserId);
  } else {
    entitlementsQuery = entitlementsQuery.eq("auth_user_id", authUserId);
  }
  let { data: entitlements } = await entitlementsQuery.order("last_accessed", { ascending: false, nullsFirst: false });

  // ── Auto-grant free books ───────────────────────────────────────────────────
  if (!entitlements || entitlements.length === 0) {
    const { data: freeBooks } = await adminSupabase.from("books").select("id").or("is_paid.eq.false,is_paid.eq.0").eq("is_active", true);
    if (freeBooks && freeBooks.length > 0) {
      const toInsert = freeBooks.map((b: any) => ({
        auth_user_id: authUserId, user_id: legacyUserId || 0, book_id: b.id, reading_status: "not_started", payment_id: 0,
      }));
      await adminSupabase.from("user_books").upsert(toInsert, { ignoreDuplicates: true });
      const { data: refreshed } = await entitlementsQuery.order("last_accessed", { ascending: false, nullsFirst: false });
      entitlements = refreshed || [];
    }
  }

  // ── Book details ────────────────────────────────────────────────────────────
  const bookIds = [...new Set((entitlements || []).map((e: any) => e.book_id).filter(Boolean))];
  const { data: booksData } = bookIds.length > 0
    ? await adminSupabase.from("books").select("id, title, author, cover_image, is_paid, price").in("id", bookIds)
    : { data: [] };
  const booksMap = Object.fromEntries((booksData || []).map((b: any) => [b.id, b]));

  // ── TOC chapter counts ──────────────────────────────────────────────────────
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const chapterCountsMap: Record<number, number> = {};
  await Promise.all(
    bookIds.map(async (bId) => {
      try {
        const res = await fetch(`${SUPABASE_URL}/storage/v1/object/public/book-content/${bId}/toc.json`, { next: { revalidate: 3600 } });
        if (res.ok) {
          const toc = await res.json();
          if (Array.isArray(toc)) chapterCountsMap[bId] = toc.length;
        }
      } catch {}
    })
  );

  // ── Reading progress ────────────────────────────────────────────────────────
  let progressQuery = adminSupabase.from("reading_progress").select("book_id, chapter_index, time_spent, completed, last_read");
  if (legacyUserId && authUserId && !/^\d+$/.test(authUserId)) {
    progressQuery = progressQuery.or(`auth_user_id.eq.${authUserId},user_id.eq.${legacyUserId}`);
  } else if (legacyUserId) {
    progressQuery = progressQuery.eq("user_id", legacyUserId);
  } else {
    progressQuery = progressQuery.eq("auth_user_id", authUserId);
  }
  const { data: progressRows } = await progressQuery;
  const progressMap = Object.fromEntries((progressRows || []).map((p: any) => [p.book_id, p]));

  // ── Reading streak ──────────────────────────────────────────────────────────
  const activityDates = new Set<string>();
  (progressRows || []).forEach((p: any) => { if (p.last_read) activityDates.add(p.last_read.split("T")[0]); });
  (entitlements || []).forEach((e: any) => { if (e.last_accessed) activityDates.add(e.last_accessed.split("T")[0]); });
  let streakDays = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    if (activityDates.has(dateStr)) streakDays++;
    else if (i > 0) break;
  }

  // ── Stats ───────────────────────────────────────────────────────────────────
  let totalTimeSeconds = 0;
  let completedCount = 0;
  (progressRows || []).forEach((p: any) => {
    totalTimeSeconds += Number(p.time_spent || 0);
    if (p.completed === 1 || p.completed === true) completedCount++;
  });

  const stats: OverviewStats = {
    username: displayUsername,
    email: user.email || "",
    totalReadingTimeMinutes: Math.round(totalTimeSeconds / 60),
    booksCompleted: completedCount,
    booksOwnedCount: (entitlements || []).length,
    readingStreakDays: streakDays,
  };

  // ── Build overview book items ────────────────────────────────────────────────
  const books: OverviewBookItem[] = (entitlements || []).map((ent: any) => {
    const bk = booksMap[ent.book_id];
    if (!bk) return null;
    const prog = progressMap[ent.book_id];
    const totalCh = chapterCountsMap[bk.id] || 0;
    const chIdx = prog?.chapter_index ?? 0;
    const isDone = ent.reading_status === "completed" || prog?.completed === 1 || prog?.completed === true;

    let coverUrl: string | null = null;
    if (bk.cover_image) {
      coverUrl = bk.cover_image.startsWith("http") ? bk.cover_image : `${SUPABASE_URL}/storage/v1/object/public/covers/${bk.cover_image}`;
    }

    return {
      id: bk.id,
      title: bk.title,
      author: bk.author || "",
      coverImage: coverUrl,
      progressPct: totalCh > 0 ? Math.round((chIdx / totalCh) * 100) : 0,
      chapterIndex: chIdx,
      totalChapters: totalCh,
      isCompleted: isDone,
      lastReadRaw: prog?.last_read || ent.last_accessed || null,
    };
  }).filter(Boolean) as OverviewBookItem[];

  // ── Recent Payments ─────────────────────────────────────────────────────────
  let paymentsQuery = adminSupabase.from("payments").select("id, status, amount, created_at");
  if (legacyUserId && authUserId && !/^\d+$/.test(authUserId)) {
    paymentsQuery = paymentsQuery.or(`auth_user_id.eq.${authUserId},user_id.eq.${legacyUserId}`);
  } else if (legacyUserId) {
    paymentsQuery = paymentsQuery.eq("user_id", legacyUserId);
  } else {
    paymentsQuery = paymentsQuery.eq("auth_user_id", authUserId);
  }
  const { data: rawPayments } = await paymentsQuery.order("created_at", { ascending: false }).limit(3);

  const recentPayments: OverviewPayment[] = (rawPayments || []).map((p: any) => {
    let fmtAmount = "";
    if (typeof p.amount === "number") fmtAmount = `$${p.amount.toFixed(2)}`;
    else if (typeof p.amount === "string") fmtAmount = p.amount.startsWith("$") ? p.amount : `$${p.amount}`;
    else fmtAmount = "$0.00";
    return {
      id: p.id,
      status: p.status || "pending",
      amount: fmtAmount,
      date: new Date(p.created_at).toLocaleDateString("so-SO"),
    };
  });

  return (
    <DashboardOverviewClient
      stats={stats}
      books={books}
      recentPayments={recentPayments}
      userId={authUserId}
      isAdmin={!!profile?.is_admin}
    />
  );
}
