"use client";

import React, { useState, useMemo, useTransition, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  BookOpen, CheckCircle2, Trash2, X, PlayCircle, Search,
  ArrowUpDown, RefreshCw, Zap, Activity, Filter,
} from "lucide-react";
import {
  toggleBookCompletedAction,
  removeFreeBookAction,
  claimFreeBooksAction,
} from "@/app/actions/library";
import { buildReturnTarget } from "@/lib/navigation";

export type BookItem = {
  id: number;
  title: string;
  author: string;
  coverImage: string | null;
  category: string;
  isPaid: boolean;
  pages: number;
  price: number;
  chapterIndex: number;
  totalChapters: number;
  progressPct: number;
  isCompleted: boolean;
  lastAccessed: string;
  lastAccessedRaw?: string | null;
  estimatedTimeLeft?: string | null;
};

type SortOption = "last_read" | "title" | "progress" | "newest";

// ─── Sub-components ──────────────────────────────────────────────────────────

function BookCover({ book, size = "sm" }: { book: Pick<BookItem, "title" | "author" | "coverImage">; size?: "sm" | "md" | "lg" }) {
  const dims: Record<string, string> = { sm: "w-16 h-24", md: "w-24 h-36", lg: "w-36 h-52" };
  return (
    <div className={`${dims[size]} rounded-xl overflow-hidden shrink-0 shadow-md border border-[#E8DFD2]`}>
      {book.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            const fb = e.currentTarget.parentElement!.querySelector(".cover-fallback") as HTMLElement;
            if (fb) fb.style.display = "flex";
          }}
        />
      ) : null}
      <div className={`cover-fallback w-full h-full bg-gradient-to-br from-[#7A1F2B] to-[#1F3A54] p-3 flex flex-col justify-between text-white text-center ${book.coverImage ? "hidden" : "flex"}`}>
        <span className="text-[8px] uppercase tracking-widest opacity-60 font-semibold">IsmailBooks</span>
        <span className="font-display text-[10px] font-bold line-clamp-4 leading-snug">{book.title}</span>
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

// ─── Main Component ──────────────────────────────────────────────────────────

export default function DashboardBooksClient({
  initialBooks,
  userId,
}: {
  initialBooks: BookItem[];
  userId?: string | null;
}) {
  const router = useRouter();
  const [books, setBooks] = useState(initialBooks);
  const [isPending, startTransition] = useTransition();
  const [actionLoadingBookId, setActionLoadingBookId] = useState<number | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [realtimeStatus, setRealtimeStatus] = useState<"connecting" | "live" | "error">("connecting");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "reading" | "done">("all");
  const [sortBy, setSortBy] = useState<SortOption>("last_read");

  // Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Sync books when server re-fetches
  useEffect(() => { setBooks(initialBooks); }, [initialBooks]);

  // Refresh on mount
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
      .channel(`dashboard_books_${userId}_${Date.now()}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "user_books" }, onDbChange)
      .on("postgres_changes", { event: "*", schema: "public", table: "reading_progress" }, onDbChange)
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setRealtimeStatus("live");
        else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") setRealtimeStatus("error");
      });
    return () => { supabase.removeChannel(channel); };
  }, [userId, router]);

  // Handlers
  const handleSync = async () => {
    setIsSyncing(true);
    await claimFreeBooksAction();
    startTransition(() => router.refresh());
    setTimeout(() => setIsSyncing(false), 1000);
  };

  const handleToggleComplete = async (book: BookItem) => {
    const targetStatus = !book.isCompleted;
    setActionLoadingBookId(book.id);
    // Optimistic update
    setBooks(prev => prev.map(b => b.id === book.id ? { ...b, isCompleted: targetStatus } : b));
    const res = await toggleBookCompletedAction(Number(book.id), targetStatus);
    if (res?.error) {
      setBooks(initialBooks); // revert
      showToast(res.error, "error");
    } else {
      showToast(targetStatus ? "✓ Marked as completed!" : "Marked as reading", "success");
      startTransition(() => router.refresh());
    }
    setActionLoadingBookId(null);
  };

  const handleRemoveFreeBook = async (book: BookItem) => {
    if (!confirm(`Ma hubtaa inaad rabto in aad "${book.title}" ka saarto maktabadaada?`)) return;
    setActionLoadingBookId(book.id);
    setBooks(prev => prev.filter(b => b.id !== book.id));
    const res = await removeFreeBookAction(Number(book.id));
    if (res?.error) {
      setBooks(initialBooks); // revert
      showToast(res.error, "error");
    } else {
      showToast("Buugga waa laga saaray.", "success");
      startTransition(() => router.refresh());
    }
    setActionLoadingBookId(null);
  };

  // Derived / filtered list
  const filteredBooks = useMemo(() => {
    let list = [...books];
    if (statusFilter === "reading") list = list.filter(b => !b.isCompleted);
    if (statusFilter === "done") list = list.filter(b => b.isCompleted);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "progress") return b.progressPct - a.progressPct;
      if (sortBy === "newest") return Number(b.id) - Number(a.id);
      // last_read
      if (!a.lastAccessedRaw && !b.lastAccessedRaw) return 0;
      if (!a.lastAccessedRaw) return 1;
      if (!b.lastAccessedRaw) return -1;
      return new Date(b.lastAccessedRaw).getTime() - new Date(a.lastAccessedRaw).getTime();
    });
    return list;
  }, [books, statusFilter, searchQuery, sortBy]);

  return (
    <div className="space-y-5 relative">
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 md:bottom-8 px-6 py-3 rounded-full text-sm font-bold shadow-lg z-50 flex items-center gap-2 ${toast.type === "success" ? "bg-[#2E7D5B] text-white" : "bg-rose-600 text-white"}`}>
          {toast.message}
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="font-display text-2xl font-extrabold text-[#201B16] flex items-center gap-2">
          Buugaagtayda
          <span className={`w-2 h-2 rounded-full inline-block ${realtimeStatus === "live" ? "bg-emerald-400 animate-pulse" : realtimeStatus === "error" ? "bg-rose-400" : "bg-amber-400"}`} title={realtimeStatus === "live" ? "Live sync active" : "Connecting..."} />
        </h1>
        <button
          onClick={handleSync}
          disabled={isSyncing || isPending}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E8DFD2] text-sm font-bold text-[#6B5F52] hover:text-[#7A1F2B] hover:border-[#7A1F2B] transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing || isPending ? "animate-spin" : ""}`} />
          {isSyncing ? "Syncing..." : "Sync"}
        </button>
      </div>

      {/* Empty state */}
      {books.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E8DFD2] p-12 text-center shadow-sm">
          <BookOpen className="w-16 h-16 text-[#C9962E] mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-[#201B16] mb-2">Maktabadaada waa eber</h2>
          <p className="text-[#6B5F52] mb-6">Wali wax buug ah kuma haysatid maktabadaada.</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <button onClick={handleSync} disabled={isSyncing} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7A1F2B] text-white font-bold text-sm disabled:opacity-60">
              <Zap className="w-4 h-4" /> {isSyncing ? "Loading..." : "Sync Free Books"}
            </button>
            <Link href="/books" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F0EBE3] text-[#201B16] font-bold text-sm hover:bg-[#E8DFD2]">
              Eeg Buugaagta
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Controls: Search + Filter + Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#6B5F52] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Raadi cinwaan ama qoraa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#E8DFD2] text-sm text-[#201B16] focus:outline-none focus:border-[#7A1F2B] transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              {/* Status filter pills */}
              <div className="flex items-center bg-[#FBF7F0] border border-[#E8DFD2] rounded-xl p-1 gap-1">
                {(["all", "reading", "done"] as const).map((id) => {
                  const label = id === "all" ? `All (${books.length})` : id === "reading" ? `Reading (${books.filter(b => !b.isCompleted).length})` : `Done (${books.filter(b => b.isCompleted).length})`;
                  return (
                    <button key={id} onClick={() => setStatusFilter(id)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${statusFilter === id ? "bg-white text-[#7A1F2B] shadow-sm" : "text-[#6B5F52] hover:text-[#201B16]"}`}>
                      {label}
                    </button>
                  );
                })}
              </div>
              {/* Sort */}
              <div className="flex items-center gap-1 bg-white border border-[#E8DFD2] rounded-xl px-3 py-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#6B5F52]" />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="text-xs font-bold text-[#201B16] bg-transparent outline-none cursor-pointer">
                  <option value="last_read">Last Read</option>
                  <option value="title">Title A–Z</option>
                  <option value="progress">% Done</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid of books */}
          {filteredBooks.length === 0 ? (
            <div className="rounded-2xl bg-white border border-[#E8DFD2] p-12 text-center space-y-3">
              <Filter className="w-8 h-8 text-[#E8DFD2] mx-auto" />
              <p className="text-sm text-[#6B5F52] font-semibold">Ma jiraan buugaag la xiriira xaaladda la doortay.</p>
              <button onClick={() => { setSearchQuery(""); setStatusFilter("all"); setSortBy("last_read"); }} className="text-xs text-[#7A1F2B] underline">
                Nadiifi xaaladda
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredBooks.map((book) => (
                <div key={book.id} className="rounded-2xl bg-white border border-[#E8DFD2] shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group">
                  <div className="p-5 flex gap-4 flex-1">
                    <BookCover book={book} size="md" />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full ${book.isCompleted ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                            {book.isCompleted ? "✓ Completed" : "Reading..."}
                          </span>
                          {!book.isPaid && (
                            <button
                              onClick={() => handleRemoveFreeBook(book)}
                              disabled={actionLoadingBookId === book.id}
                              className="text-gray-400 hover:text-rose-600 transition-colors p-1 rounded"
                              title="Ka saar Maktabada"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <h4 className="font-display text-sm font-bold text-[#201B16] line-clamp-2 group-hover:text-[#7A1F2B] transition-colors">{book.title}</h4>
                        <p className="text-xs text-[#6B5F52] truncate mt-0.5">{book.author}</p>
                        {book.category && <span className="mt-1 inline-block text-[9px] font-bold text-[#1F3A54] bg-[#1F3A54]/8 px-1.5 py-0.5 rounded">{book.category}</span>}
                      </div>
                      <div className="mt-3 space-y-1.5">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-[#6B5F52]">
                            {book.isCompleted ? "✓ Dhammeeyay" : `Ch. ${book.chapterIndex + 1}`}
                            {book.estimatedTimeLeft && !book.isCompleted && <span className="ml-1 text-[#C9962E]">({book.estimatedTimeLeft})</span>}
                          </span>
                          <span className="text-[#7A1F2B]">{book.progressPct}%</span>
                        </div>
                        <ProgressBar pct={book.progressPct} accent />
                      </div>
                    </div>
                  </div>
                  {/* Action footer */}
                  <div className="px-5 pb-4 flex gap-2">
                    <Link
                      href={`/books/${book.id}/read?returnTo=${buildReturnTarget("/dashboard/books")}&chapter=${book.chapterIndex > 0 ? book.chapterIndex : 0}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#7A1F2B] hover:bg-[#601822] text-white text-[11px] font-bold rounded-xl transition-colors"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      {book.progressPct > 0 ? "Sii Akhriso" : "Bilow Akhriska"}
                    </Link>
                    <button
                      onClick={() => handleToggleComplete(book)}
                      disabled={actionLoadingBookId === book.id}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold border transition-all disabled:opacity-60 ${
                        book.isCompleted
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-white text-[#6B5F52] border-[#E8DFD2] hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50"
                      }`}
                      title={book.isCompleted ? "Calaamadee in uu socdo" : "Calaamadee in uu dhammaaday"}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {book.isCompleted ? "Undone" : "Done"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* In-progress summary row */}
          {books.filter(b => !b.isCompleted && b.progressPct > 0).length > 0 && (
            <div className="rounded-2xl bg-white border border-[#E8DFD2] shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-[#E8DFD2] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#C9962E]" />
                <h3 className="font-display text-sm font-bold text-[#201B16]">Horumarinta Akhriska (Progress)</h3>
              </div>
              <div className="divide-y divide-[#E8DFD2]">
                {books
                  .filter(b => !b.isCompleted && b.progressPct > 0)
                  .sort((a, b) => {
                    if (!a.lastAccessedRaw && !b.lastAccessedRaw) return 0;
                    if (!a.lastAccessedRaw) return 1;
                    if (!b.lastAccessedRaw) return -1;
                    return new Date(b.lastAccessedRaw).getTime() - new Date(a.lastAccessedRaw).getTime();
                  })
                  .map((book) => (
                    <div key={book.id} className="px-5 py-4 flex items-center gap-4 hover:bg-[#FBF7F0] transition-colors group">
                      <BookCover book={book} size="sm" />
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h4 className="font-display text-sm font-bold text-[#201B16] truncate">{book.title}</h4>
                            <p className="text-xs text-[#6B5F52]">{book.author}</p>
                          </div>
                        </div>
                        <ProgressBar pct={book.progressPct} accent />
                        <div className="flex justify-between text-[11px] text-[#6B5F52]">
                          <span>Chapter {book.chapterIndex + 1}{book.totalChapters > 0 ? ` of ${book.totalChapters}` : ""}</span>
                          <span className="font-extrabold text-[#7A1F2B]">{book.progressPct}%</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <Link
                          href={`/books/${book.id}/read?returnTo=${buildReturnTarget("/dashboard/books")}&chapter=${book.chapterIndex > 0 ? book.chapterIndex : 0}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7A1F2B] text-white font-bold text-xs hover:bg-[#601822] transition-colors"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          {book.progressPct > 0 ? "Continue" : "Start"}
                        </Link>
                        <button
                          onClick={() => handleToggleComplete(book)}
                          disabled={actionLoadingBookId === book.id}
                          className="text-[10px] font-bold rounded-lg px-2 py-1 border transition-all border-[#E8DFD2] text-[#6B5F52] hover:border-emerald-200 hover:text-emerald-600"
                        >
                          Mark Done
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
