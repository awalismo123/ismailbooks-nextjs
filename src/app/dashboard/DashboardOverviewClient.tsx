"use client";

import React, { useState, useMemo, useTransition, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Flame, Clock, CheckCircle2, PlayCircle, ArrowRight,
  BookOpen, Library, Activity, ChevronRight, RefreshCw, Zap, Sparkles,
} from "lucide-react";
import { claimFreeBooksAction, toggleBookCompletedAction } from "@/app/actions/library";
import { buildReturnTarget } from "@/lib/navigation";

export type OverviewBookItem = {
  id: number;
  title: string;
  author: string;
  coverImage: string | null;
  progressPct: number;
  chapterIndex: number;
  totalChapters: number;
  isCompleted: boolean;
  lastReadRaw: string | null;
};

export type OverviewStats = {
  username: string;
  email: string;
  totalReadingTimeMinutes: number;
  booksCompleted: number;
  booksOwnedCount: number;
  readingStreakDays: number;
};

export type OverviewPayment = {
  id: number;
  status: string;
  amount: string;
  date: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatRelativeTime(isoString?: string | null): string {
  if (!isoString) return "Wali lama furan";
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffMinutes < 2) return "Hadda (Just now)";
  if (diffMinutes < 60) return `${diffMinutes}m ka hor`;
  if (diffHours < 24) return `${diffHours}h ka hor`;
  if (diffDays === 1) return "Shalay (Yesterday)";
  if (diffDays < 7) return `${diffDays} maalmood ka hor`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function isReadingNow(isoString?: string | null): boolean {
  if (!isoString) return false;
  return Date.now() - new Date(isoString).getTime() < 15 * 60 * 1000;
}

function BookCover({ book, size = "sm" }: { book: Pick<OverviewBookItem, "title" | "author" | "coverImage">; size?: "sm" | "md" | "lg" }) {
  const dims: Record<string, string> = { sm: "w-16 h-24", md: "w-20 h-28", lg: "w-36 h-52" };
  return (
    <div className={`${dims[size]} rounded-xl overflow-hidden shrink-0 shadow-md border border-[#E8DFD2]`}>
      {book.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            const fb = e.currentTarget.parentElement!.querySelector(".cover-fallback") as HTMLElement;
            if (fb) fb.style.display = "flex";
          }}
        />
      ) : null}
      <div className={`cover-fallback w-full h-full bg-gradient-to-br from-[#7A1F2B] to-[#1F3A54] p-2 flex flex-col justify-between text-white text-center ${book.coverImage ? "hidden" : "flex"}`}>
        <span className="text-[8px] uppercase tracking-widest opacity-60">IsmailBooks</span>
        <span className="font-display text-[9px] font-bold line-clamp-4 leading-snug">{book.title}</span>
        <span className="text-[8px] opacity-60">{book.author}</span>
      </div>
    </div>
  );
}

function ProgressBar({ pct, accent = false }: { pct: number; accent?: boolean }) {
  return (
    <div className="w-full h-2 bg-[#E8DFD2] rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ${pct === 100 ? "bg-emerald-500" : accent ? "bg-gradient-to-r from-[#C9962E] to-[#7A1F2B]" : "bg-[#7A1F2B]"}`}
        style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DashboardOverviewClient({
  stats,
  books: initialBooks,
  recentPayments,
  userId,
  isAdmin,
}: {
  stats: OverviewStats;
  books: OverviewBookItem[];
  recentPayments: OverviewPayment[];
  userId?: string | null;
  isAdmin?: boolean;
}) {
  const router = useRouter();
  const [books, setBooks] = useState(initialBooks);
  const [isPending, startTransition] = useTransition();
  const [isSyncing, setIsSyncing] = useState(false);
  const [actionLoadingBookId, setActionLoadingBookId] = useState<number | null>(null);
  const [realtimeStatus, setRealtimeStatus] = useState<"connecting" | "live" | "error">("connecting");

  // Sync from server re-fetch
  useEffect(() => { setBooks(initialBooks); }, [initialBooks]);

  // Refresh on mount to capture reader updates
  useEffect(() => {
    startTransition(() => router.refresh());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Realtime subscription
  useEffect(() => {
    if (!userId) return;
    const supabase = createClient();
    const onDbChange = () => startTransition(() => router.refresh());
    const channel = supabase
      .channel(`dashboard_overview_${userId}_${Date.now()}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "user_books" }, onDbChange)
      .on("postgres_changes", { event: "*", schema: "public", table: "reading_progress" }, onDbChange)
      .on("postgres_changes", { event: "*", schema: "public", table: "payments" }, onDbChange)
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setRealtimeStatus("live");
        else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") setRealtimeStatus("error");
      });
    return () => { supabase.removeChannel(channel); };
  }, [userId, router]);

  const handleSync = async () => {
    setIsSyncing(true);
    await claimFreeBooksAction();
    startTransition(() => router.refresh());
    setTimeout(() => setIsSyncing(false), 1000);
  };

  const handleToggleComplete = async (book: OverviewBookItem) => {
    const targetStatus = !book.isCompleted;
    setActionLoadingBookId(book.id);
    setBooks(prev => prev.map(b => b.id === book.id ? { ...b, isCompleted: targetStatus } : b));
    await toggleBookCompletedAction(Number(book.id), targetStatus);
    startTransition(() => router.refresh());
    setActionLoadingBookId(null);
  };

  // Derived data (same logic as the original)
  const lastReadBook = useMemo(() => {
    const sorted = [...books].sort((a, b) => {
      if (!a.lastReadRaw && !b.lastReadRaw) return 0;
      if (!a.lastReadRaw) return 1;
      if (!b.lastReadRaw) return -1;
      return new Date(b.lastReadRaw).getTime() - new Date(a.lastReadRaw).getTime();
    });
    return sorted.find(b => b.progressPct > 0 && !b.isCompleted) || sorted[0] || null;
  }, [books]);

  const inProgressBooks = useMemo(() =>
    [...books]
      .filter(b => !b.isCompleted && b.progressPct > 0)
      .sort((a, b) => {
        if (!a.lastReadRaw && !b.lastReadRaw) return 0;
        if (!a.lastReadRaw) return 1;
        if (!b.lastReadRaw) return -1;
        return new Date(b.lastReadRaw).getTime() - new Date(a.lastReadRaw).getTime();
      }),
    [books]
  );

  const completionRate = stats.booksOwnedCount > 0
    ? Math.round((stats.booksCompleted / stats.booksOwnedCount) * 100)
    : 0;

  const today = new Date().toLocaleDateString("so-SO", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-6">
      {/* ── Greeting Header ─────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap border-b border-[#E8DFD2] pb-5">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#201B16]">
              Salaan, {stats.username} 👋
            </h1>
            {isAdmin && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C9962E]/15 text-[#8a5a00] border border-[#C9962E]/30">
                ⚡ Admin
              </span>
            )}
            {stats.readingStreakDays > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                {stats.readingStreakDays}-day streak
              </span>
            )}
            <span className={`w-2 h-2 rounded-full inline-block ${realtimeStatus === "live" ? "bg-emerald-400 animate-pulse" : realtimeStatus === "error" ? "bg-rose-400" : "bg-amber-400"}`} title={realtimeStatus === "live" ? "Live sync active" : "Connecting..."} />
          </div>
          <p className="text-[#6B5F52] text-sm mt-1">{today}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSync}
            disabled={isSyncing || isPending}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E8DFD2] text-sm font-bold text-[#6B5F52] hover:text-[#7A1F2B] hover:border-[#7A1F2B] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing || isPending ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{isSyncing ? "Syncing..." : "Refresh"}</span>
          </button>
          <Link href="/books" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7A1F2B] text-white text-sm font-bold hover:bg-[#601822] transition-colors">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Browse Books</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Buugaag la iibsaday", value: stats.booksOwnedCount, icon: Library, color: "text-[#C9962E]", bg: "bg-amber-50" },
          { label: "Akhris socda", value: inProgressBooks.length, icon: Activity, color: "text-[#7A1F2B]", bg: "bg-rose-50" },
          { label: "La dhammeeyay", value: stats.booksCompleted, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          {
            label: "Wakhtiga Akhriska",
            value: stats.totalReadingTimeMinutes > 60 ? `${(stats.totalReadingTimeMinutes / 60).toFixed(1)}h` : `${stats.totalReadingTimeMinutes}m`,
            icon: Clock,
            color: "text-[#1F3A54]",
            bg: "bg-blue-50"
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E8DFD2] p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-[11px] text-[#6B5F52] uppercase font-bold tracking-wider leading-tight">{stat.label}</p>
            <p className="font-display text-2xl font-extrabold text-[#201B16]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Continue Reading Hero ────────────────────────────────────────────── */}
      {lastReadBook ? (
        <div className="rounded-3xl bg-white border border-[#E8DFD2] shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#7A1F2B]/5 to-transparent px-6 py-4 border-b border-[#E8DFD2] flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-[#7A1F2B]">
              <Flame className="w-4 h-4" /> Sii wad akhriska
              {isReadingNow(lastReadBook.lastReadRaw) && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800 animate-pulse">
                  ● Reading Now
                </span>
              )}
            </span>
            <span className="text-xs text-[#6B5F52]">Last read: {formatRelativeTime(lastReadBook.lastReadRaw)}</span>
          </div>
          <div className="p-6 flex flex-col sm:flex-row gap-6">
            <BookCover book={lastReadBook} size="lg" />
            <div className="flex-1 flex flex-col justify-between min-h-[180px]">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#201B16] leading-tight mb-1">{lastReadBook.title}</h2>
                <p className="text-sm text-[#6B5F52]">by <span className="font-semibold text-[#201B16]">{lastReadBook.author}</span></p>
              </div>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#6B5F52]">
                    {lastReadBook.isCompleted ? "✓ Completed" : `Chapter ${lastReadBook.chapterIndex + 1}`}
                    {lastReadBook.totalChapters > 0 && !lastReadBook.isCompleted && (
                      <span className="text-gray-400 font-normal ml-1">
                        ({lastReadBook.totalChapters - (lastReadBook.chapterIndex + 1)} chapters left)
                      </span>
                    )}
                  </span>
                  <span className="text-[#7A1F2B] font-extrabold">{lastReadBook.progressPct}%</span>
                </div>
                <div className="w-full h-3 bg-[#F0EBE3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C9962E] to-[#7A1F2B] rounded-full transition-all duration-700"
                    style={{ width: `${Math.max(4, lastReadBook.progressPct)}%` }}
                  />
                </div>
                <div className="flex gap-3 pt-1">
                  <Link
                    href={`/books/${lastReadBook.id}/read?returnTo=${buildReturnTarget("/dashboard")}&chapter=${lastReadBook.chapterIndex > 0 ? lastReadBook.chapterIndex : 0}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#7A1F2B] hover:bg-[#601822] text-white font-bold text-sm transition-all shadow"
                  >
                    <PlayCircle className="w-4 h-4" />
                    {lastReadBook.progressPct > 0 ? "Sii Akhriso" : "Bilow Akhriska"}
                  </Link>
                  <button
                    onClick={() => handleToggleComplete(lastReadBook)}
                    disabled={actionLoadingBookId === lastReadBook.id}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0EBE3] hover:bg-[#E8DFD2] text-[#201B16] font-semibold text-sm transition-all disabled:opacity-60"
                  >
                    <CheckCircle2 className={`w-4 h-4 ${lastReadBook.isCompleted ? "text-emerald-600" : "text-gray-400"}`} />
                    {lastReadBook.isCompleted ? "U celiyo Akhris" : "Dhameeyay"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-white border border-[#E8DFD2] p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#C9962E] flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="font-display text-lg font-bold text-[#201B16]">No books in your library yet</h3>
          <p className="text-sm text-[#6B5F52] max-w-sm mx-auto">Free books are automatically added to your library. Click sync to load them now.</p>
          <div className="flex justify-center gap-3">
            <button onClick={handleSync} disabled={isSyncing} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7A1F2B] text-white font-bold text-sm disabled:opacity-60">
              <Zap className="w-4 h-4" /> {isSyncing ? "Loading..." : "Sync Free Books"}
            </button>
            <Link href="/books" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F0EBE3] text-[#201B16] font-bold text-sm hover:bg-[#E8DFD2]">
              Browse Store
            </Link>
          </div>
        </div>
      )}

      {/* ── In-Progress Grid ─────────────────────────────────────────────────── */}
      {inProgressBooks.length > 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-[#201B16] flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#C9962E]" /> Currently Reading ({inProgressBooks.length})
            </h3>
            <Link href="/dashboard/books" className="text-xs font-bold text-[#7A1F2B] hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressBooks.slice(0, 3).map((book) => (
              <div key={book.id} className="rounded-2xl bg-white border border-[#E8DFD2] p-4 flex gap-4 hover:shadow-md transition-all group">
                <BookCover book={book} size="sm" />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display text-sm font-bold text-[#201B16] line-clamp-2 group-hover:text-[#7A1F2B] transition-colors">{book.title}</h4>
                    <p className="text-xs text-[#6B5F52] truncate mt-0.5">{book.author}</p>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-[#6B5F52]">Ch. {book.chapterIndex + 1}</span>
                      <span className="text-[#7A1F2B]">{book.progressPct}%</span>
                    </div>
                    <ProgressBar pct={book.progressPct} />
                    <Link
                      href={`/books/${book.id}/read?returnTo=${buildReturnTarget("/dashboard")}&chapter=${book.chapterIndex > 0 ? book.chapterIndex : 0}`}
                      className="mt-1 w-full text-center py-1.5 rounded-lg bg-[#7A1F2B] text-white font-bold text-[11px] block hover:bg-[#601822] transition-colors"
                    >
                      Continue
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── All Books Quick List ─────────────────────────────────────────────── */}
      {books.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-3xl bg-white border border-[#E8DFD2] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E8DFD2] flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-[#201B16]">All Your Books ({books.length})</h3>
              <Link href="/dashboard/books" className="text-xs font-bold text-[#7A1F2B] hover:underline flex items-center gap-1">
                See library <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-[#E8DFD2]">
              {books.slice(0, 5).map((book) => (
                <div key={book.id} className="px-6 py-4 flex items-center gap-4 hover:bg-[#FBF7F0] transition-colors group">
                  <BookCover book={book} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-display text-sm font-bold text-[#201B16] truncate group-hover:text-[#7A1F2B] transition-colors">{book.title}</h4>
                      {book.isCompleted && (
                        <span className="shrink-0 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">✓ Done</span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B5F52] mb-2">{book.author}</p>
                    <ProgressBar pct={book.progressPct} accent />
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-extrabold text-[#7A1F2B] font-display">{book.progressPct}%</div>
                    <Link
                      href={`/books/${book.id}/read?returnTo=${buildReturnTarget("/dashboard")}&chapter=${book.chapterIndex > 0 ? book.chapterIndex : 0}`}
                      className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#7A1F2B] hover:underline"
                    >
                      <PlayCircle className="w-3 h-3" />
                      {book.progressPct > 0 ? "Continue" : "Start"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="rounded-3xl bg-white border border-[#E8DFD2] shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8DFD2] flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-[#201B16]">Lacag-bixin U Danbeeyay</h3>
              <Link href="/dashboard/payments" className="text-xs font-bold text-[#7A1F2B] hover:underline flex items-center gap-1">
                Dhammaan <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {recentPayments.length === 0 ? (
              <div className="p-8 text-center">
                <Sparkles className="w-8 h-8 text-[#E8DFD2] mx-auto mb-2" />
                <p className="text-sm text-[#6B5F52]">Wax lacag-bixin ah ma jiraan.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#E8DFD2]">
                {recentPayments.map((p) => (
                  <div key={p.id} className="px-5 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#201B16]">{p.amount}</p>
                      <p className="text-xs text-[#6B5F52]">{p.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      p.status === "approved" ? "bg-emerald-100 text-emerald-800" :
                      p.status === "rejected" ? "bg-rose-100 text-rose-800" :
                      "bg-amber-100 text-amber-800"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
