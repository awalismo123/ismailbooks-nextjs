"use client";

import React, { useMemo, useState, useTransition, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  X,
  ChevronDown,
  Clock,
  Eye,
  ArrowRight,
  BookOpen,
  Sparkles,
  TrendingUp,
  Mail,
  CheckCircle,
} from "lucide-react";
import { getCategoryTheme } from "@/lib/categoryTheme";
import { buildReturnTarget } from "@/lib/navigation";
import { BookCard, type BookCardData } from "@/components/books/BookCard";

// ─── Shared Type (imported by page.tsx) ────────────────────────────────────

export interface SummaryItem {
  id: string;
  title: string;
  slug: string | null;
  bookId: string | null;
  originalBookTitle: string | null;
  originalAuthor: string | null;
  category: string | null;
  excerpt: string | null;
  readingTimeMinutes: number | null;
  pages: number | null;
  views: number;
  isPaid: boolean;
  price: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string | null;
  summarizer: string | null;
  keyTakeaways: string[];
  isDbSummary: boolean;
}

export interface RelatedBook {
  id: string;
  title: string;
  author: string | null;
  coverGradient: string;
  price: number;
  isPaid: boolean;
}

export interface ProgressItem {
  summaryId: string;
  percent: number;
}

interface CategoryMeta {
  name: string;
  count: number;
  hex: string;
}

interface SummariesClientProps {
  summaries: SummaryItem[];
  categories: CategoryMeta[];
  featuredSummary: SummaryItem | null;
  trendingSummaries: SummaryItem[];
  relatedBooks: RelatedBook[];
  progressItems: ProgressItem[];
  totalReaders: number;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

const COVER_GRADIENTS = [
  "linear-gradient(160deg,#1F3A54,#101f2e)",
  "linear-gradient(160deg,#7A1F2B,#4a1018)",
  "linear-gradient(160deg,#5D4A2A,#2f2413)",
  "linear-gradient(160deg,#2E7D5B,#173f2e)",
  "linear-gradient(160deg,#6B4423,#3a2413)",
  "linear-gradient(160deg,#8A5A00,#4a3000)",
];

function coverGradient(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return COVER_GRADIENTS[Math.abs(hash) % COVER_GRADIENTS.length];
}

const SORT_OPTIONS = [
  { value: "newest", label: "Ugu Cusub" },
  { value: "popular", label: "Ugu Caansan" },
  { value: "shortest", label: "Ugu Gaaban" },
];

const PAGE_SIZE = 6;

// ─── Main Component ──────────────────────────────────────────────────────────

export function SummariesClient({
  summaries,
  categories,
  featuredSummary,
  trendingSummaries,
  relatedBooks,
  progressItems,
  totalReaders,
}: SummariesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const categoryParam = searchParams.get("category") || "";
  const sortParam = (searchParams.get("sort") || "newest") as "newest" | "popular" | "shortest";
  const qParam = searchParams.get("q") || "";

  const [localQ, setLocalQ] = useState(qParam);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep local search in sync with URL on back/forward navigation
  useEffect(() => {
    setLocalQ(qParam);
  }, [qParam]);

  // ── URL helpers ───────────────────────────────────────────────────────────

  function buildUrl(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v === null || v === "") {
        params.delete(k);
      } else {
        params.set(k, v);
      }
    });
    return `/summaries${params.toString() ? `?${params.toString()}` : ""}`;
  }

  function navigate(updates: Record<string, string | null>) {
    startTransition(() => {
      router.push(buildUrl(updates), { scroll: false });
      setVisibleCount(PAGE_SIZE);
    });
  }

  function handleSearchChange(value: string) {
    setLocalQ(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      navigate({ q: value || null });
    }, 320);
  }

  function clearFilters() {
    setLocalQ("");
    startTransition(() => {
      router.push("/summaries", { scroll: false });
      setVisibleCount(PAGE_SIZE);
    });
  }

  // ── Filter + sort ─────────────────────────────────────────────────────────

  const filteredSorted = useMemo(() => {
    let list = summaries;

    if (categoryParam) {
      list = list.filter(
        (s) => s.category?.toLowerCase() === categoryParam.toLowerCase()
      );
    }

    if (qParam.trim()) {
      const q = qParam.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          (s.originalBookTitle || "").toLowerCase().includes(q) ||
          (s.originalAuthor || "").toLowerCase().includes(q) ||
          (s.category || "").toLowerCase().includes(q)
      );
    }

    if (sortParam === "popular") {
      list = [...list].sort((a, b) => b.views - a.views);
    } else if (sortParam === "shortest") {
      list = [...list].sort(
        (a, b) => (a.readingTimeMinutes ?? 999) - (b.readingTimeMinutes ?? 999)
      );
    } else {
      list = [...list].sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      );
    }

    return list;
  }, [summaries, categoryParam, qParam, sortParam]);

  const hasFilters = !!(categoryParam || qParam.trim());
  const visibleSummaries = filteredSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSorted.length;

  // ── Progress lookup ───────────────────────────────────────────────────────
  const progressMap = useMemo(() => {
    const m = new Map<string, number>();
    progressItems.forEach((p) => m.set(p.summaryId, p.percent));
    return m;
  }, [progressItems]);

  const continueItems = useMemo(
    () =>
      summaries.filter(
        (s) => progressMap.has(s.id) && (progressMap.get(s.id) ?? 0) < 100
      ),
    [summaries, progressMap]
  );

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalMinutes = summaries.reduce(
    (acc, s) => acc + (s.readingTimeMinutes ?? 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#FBF7F0] pb-24">

      {/* ════════════════════════════════════════════════════════
          HERO / MASTHEAD
      ════════════════════════════════════════════════════════ */}
      <header
        className="pt-14 pb-12 border-b border-[#E8DFD2] relative overflow-hidden"
        style={{ background: "linear-gradient(180deg,#fff 0%,#FBF7F0 100%)" }}
      >
        <div className="container-site relative z-10">
          {/* Thin rule + eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px flex-1 max-w-[40px] bg-[#C9962E]" />
            <span className="eyebrow text-[11px] uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              Maktabadda Aqoonta
            </span>
            <span className="h-px flex-1 max-w-[40px] bg-[#C9962E]" />
          </div>

          <h1
            className="font-display font-extrabold text-[#201B16] leading-tight mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 48px)", letterSpacing: "-0.03em" }}
          >
            Soo-koobid Qoto Dheer
          </h1>
          <p
            className="font-reader italic text-[#6B5F52] mb-8 max-w-xl"
            style={{ fontSize: "18px" }}
          >
            Faham buugaagta ugu waaweyn daqiiqado gudaheed.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-bold text-[#1F3A54]">
            <span>{summaries.length} Soo-koobid</span>
            <span className="text-[#C9962E]">·</span>
            <span>{categories.length} Mawduuc</span>
            <span className="text-[#C9962E]">·</span>
            <span>
              {totalReaders > 0
                ? `${formatViews(totalReaders)} Akhriste`
                : `${totalMinutes} Daqiiqo oo Aqoon ah`}
            </span>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════
          MOBILE STICKY CHIP RAIL
      ════════════════════════════════════════════════════════ */}
      <div className="md:hidden sticky top-0 z-40 bg-[#FBF7F0]/95 backdrop-blur-md border-b border-[#E8DFD2] py-3">
        <div className="container-site">
          <nav
            aria-label="Qaybaha (Mobile)"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar"
          >
            <button
              onClick={() => navigate({ category: null })}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                !categoryParam
                  ? "bg-[#201B16] text-white border-[#201B16]"
                  : "bg-white text-[#6B5F52] border-[#E8DFD2] hover:text-[#201B16] hover:border-[#201B16]"
              }`}
              id="filter-chip-all-mobile"
            >
              Dhammaan
            </button>
            {categories.map((cat) => {
              const isActive =
                cat.name.toLowerCase() === categoryParam.toLowerCase();
              return (
                <button
                  key={cat.name}
                  onClick={() => navigate({ category: isActive ? null : cat.name })}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-colors`}
                  style={
                    isActive
                      ? { background: cat.hex, color: "#fff", borderColor: cat.hex }
                      : {}
                  }
                  id={`filter-chip-${encodeURIComponent(cat.name)}-mobile`}
                >
                  {cat.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          SEARCH + FILTER BAR
      ════════════════════════════════════════════════════════ */}
      <div className="container-site mt-10 mb-8">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5F52] pointer-events-none"
              aria-hidden
            />
            <input
              id="summaries-search"
              type="search"
              value={localQ}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Raadi soo-koobid..."
              className="input-field pl-11 pr-10 w-full"
              aria-label="Raadi soo-koobid"
            />
            {localQ && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5F52] hover:text-[#201B16]"
                aria-label="Tirtir raadinta"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              id="summaries-sort"
              value={sortParam}
              onChange={(e) => navigate({ sort: e.target.value })}
              className="input-field pr-10 appearance-none min-w-[160px] font-bold text-[14px] cursor-pointer"
              aria-label="Kala saar"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5F52] pointer-events-none" />
          </div>
        </div>

        {/* Desktop category chips */}
        <div className="hidden md:flex flex-wrap gap-2 mt-4" role="group" aria-label="Qaybaha">
          <button
            onClick={() => navigate({ category: null })}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
              !categoryParam
                ? "bg-[#201B16] text-white border-[#201B16]"
                : "bg-white text-[#6B5F52] border-[#E8DFD2] hover:text-[#201B16] hover:border-[#201B16]"
            }`}
            id="filter-chip-all"
          >
            Dhammaan ({summaries.length})
          </button>
          {categories.map((cat) => {
            const isActive = cat.name.toLowerCase() === categoryParam.toLowerCase();
            return (
              <button
                key={cat.name}
                onClick={() => navigate({ category: isActive ? null : cat.name })}
                className="px-4 py-2 rounded-full text-xs font-bold border transition-colors"
                style={
                  isActive
                    ? { background: cat.hex, color: "#fff", borderColor: cat.hex }
                    : {
                        background: "#fff",
                        color: "#6B5F52",
                        borderColor: "#E8DFD2",
                      }
                }
                id={`filter-chip-${encodeURIComponent(cat.name)}`}
              >
                {cat.name} ({cat.count})
              </button>
            );
          })}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-full text-xs font-bold border border-[#7A1F2B] text-[#7A1F2B] bg-[#7A1F2B]/5 hover:bg-[#7A1F2B]/10 transition-colors flex items-center gap-1.5"
              id="clear-filters-btn"
            >
              <X className="w-3.5 h-3.5" />
              Nadiifi
            </button>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          CONTINUE READING STRIP (logged-in users with progress)
      ════════════════════════════════════════════════════════ */}
      {continueItems.length > 0 && (
        <div className="container-site mb-10">
          <div className="surface-card">
            <h2 className="font-display text-lg font-bold text-[#201B16] mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9962E] animate-pulse" />
              Sii Wad Akhriska
            </h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {continueItems.slice(0, 4).map((s) => {
                const pct = progressMap.get(s.id) ?? 0;
                return (
                  <div
                    key={s.id}
                    className="shrink-0 w-[220px] bg-[#FBF7F0] rounded-2xl p-4 border border-[#E8DFD2] flex flex-col gap-3"
                  >
                    <p className="font-display text-sm font-bold text-[#201B16] line-clamp-2 leading-snug">
                      {s.title}
                    </p>
                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-[#6B5F52] mb-1.5">
                        <span>{pct}% dhamaystiran</span>
                        {s.readingTimeMinutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-[#C9962E]" />
                            {s.readingTimeMinutes} min
                          </span>
                        )}
                      </div>
                      <div className="progress-bar">
                        <span
                          className="progress-bar-fill"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <Link
                      href={`/summaries/${s.id}/read?returnTo=${buildReturnTarget("/summaries")}`}
                      className="btn btn-sm btn-primary text-[12px]"
                      id={`continue-reading-${s.id}`}
                    >
                      Sii wad <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="container-site">

        {/* ════════════════════════════════════════════════════════
            EMPTY STATES
        ════════════════════════════════════════════════════════ */}
        {summaries.length === 0 ? (
          <div className="surface-card text-center py-20 mb-12">
            <BookOpen className="w-12 h-12 text-[#6B5F52] mx-auto mb-4 opacity-40" />
            <h2 className="font-display text-2xl font-bold text-[#201B16] mb-3">
              Weli soo-koobid lama daabicin
            </h2>
            <p className="text-[#6B5F52] text-sm mb-6">
              Soo laab mar dambe si aad u hesho soo-koobidda buugaagta cusub.
            </p>
            <Link href="/books" className="btn btn-primary btn-sm inline-flex">
              <BookOpen className="w-4 h-4" />
              Booqo Maktabada
            </Link>
          </div>
        ) : filteredSorted.length === 0 ? (
          <div className="surface-card text-center py-20 mb-12">
            <Search className="w-12 h-12 text-[#6B5F52] mx-auto mb-4 opacity-40" />
            <h2 className="font-display text-2xl font-bold text-[#201B16] mb-3">
              {categoryParam
                ? "Qeybtan weli soo-koobid kuma jirto"
                : "Wax raadin kuma helno"}
            </h2>
            <p className="text-[#6B5F52] text-sm mb-6">
              {categoryParam
                ? `"${categoryParam}" qaybta wali soo-koobidno kuma jiraan.`
                : `"${qParam}" ka jawaab la ma helin. Isku day eray kale.`}
            </p>
            <button
              onClick={clearFilters}
              className="btn btn-secondary btn-sm inline-flex"
              id="empty-state-clear-btn"
            >
              <X className="w-3.5 h-3.5" />
              Nadiifi raadinta
            </button>
          </div>
        ) : (
          <>
            {/* ════════════════════════════════════════════════════════
                FEATURED INSIGHT CARD
            ════════════════════════════════════════════════════════ */}
            {featuredSummary && !hasFilters && (
              <FeaturedInsightCard summary={featuredSummary} />
            )}

            {/* ════════════════════════════════════════════════════════
                MAIN GRID: [cards | sidebar]
            ════════════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 xl:gap-16">

              {/* ── LEFT: Summary Cards ── */}
              <div>
                {visibleSummaries.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
                    {visibleSummaries.map((s) => {
                      const bookCardData: BookCardData = {
                        id: s.id,
                        title: s.title,
                        author: s.originalAuthor || s.summarizer || "IsmailBooks",
                        is_paid: s.isPaid,
                        cover: coverGradient(s.id),
                        priceLabel: s.isPaid ? `$${s.price.toFixed(2)}` : "Bilaash",
                        pages: s.readingTimeMinutes ?? undefined,
                        rating: "—", // Summaries don't have ratings yet
                        category: s.category ?? undefined,
                        href: `/summaries/${s.id}/read?returnTo=${buildReturnTarget("/summaries")}`,
                      };
                      return (
                        <BookCard key={s.id} book={bookCardData} />
                      );
                    })}
                  </div>
                )}

                {/* Load More */}
                {hasMore && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                      className="btn btn-secondary"
                      id="load-more-summaries"
                    >
                      Soo-koobid dheeraad ah
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* End of results indicator */}
                {!hasMore && filteredSorted.length > PAGE_SIZE && (
                  <p className="text-center text-[12px] text-[#6B5F52] mt-10 font-semibold">
                    ✓ Dhammaan {filteredSorted.length} soo-koobid la soo bandhigay
                  </p>
                )}
              </div>

              {/* ── RIGHT: Sticky Sidebar ── */}
              <aside className="hidden lg:block">
                <div className="sticky top-8 flex flex-col gap-8">

                  {/* Categories */}
                  <div className="bg-white rounded-3xl p-6 border border-[#E8DFD2]">
                    <h3 className="font-display text-base font-bold text-[#201B16] mb-5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C9962E]" />
                      Qaybaha
                    </h3>
                    <ul className="flex flex-col gap-1">
                      <li>
                        <button
                          onClick={() => navigate({ category: null })}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                            !categoryParam
                              ? "bg-[#201B16] text-white"
                              : "text-[#6B5F52] hover:bg-[#FBF7F0] hover:text-[#201B16]"
                          }`}
                          id="sidebar-cat-all"
                        >
                          <div className="flex items-center gap-2.5">
                            {!categoryParam && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                            Dhammaan
                          </div>
                          <span
                            className={
                              !categoryParam ? "text-white/60" : "text-[#E8DFD2]"
                            }
                          >
                            {summaries.length}
                          </span>
                        </button>
                      </li>
                      {categories.map((cat) => {
                        const isActive =
                          cat.name.toLowerCase() === categoryParam.toLowerCase();
                        return (
                          <li key={cat.name}>
                            <button
                              onClick={() =>
                                navigate({ category: isActive ? null : cat.name })
                              }
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors`}
                              style={
                                isActive
                                  ? { background: cat.hex, color: "#fff" }
                                  : {}
                              }
                              id={`sidebar-cat-${encodeURIComponent(cat.name)}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{
                                    backgroundColor: isActive
                                      ? "#fff"
                                      : cat.hex,
                                  }}
                                />
                                {cat.name}
                              </div>
                              <span
                                style={{ color: isActive ? "rgba(255,255,255,0.6)" : "#E8DFD2" }}
                              >
                                {cat.count}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Trending Now */}
                  {trendingSummaries.length > 0 && (
                    <div className="bg-white rounded-3xl p-6 border border-[#E8DFD2]">
                      <h3 className="font-display text-base font-bold text-[#201B16] mb-5 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#C9962E]" />
                        Trending Hadda
                      </h3>
                      <div className="flex flex-col gap-4">
                        {trendingSummaries.map((s, i) => (
                          <Link
                            key={s.id}
                            href={`/summaries/${s.id}`}
                            className="flex items-start gap-3 group no-underline"
                            id={`trending-${s.id}`}
                          >
                            <span className="font-display text-2xl font-bold text-[#E8DFD2] group-hover:text-[#C9962E] transition-colors leading-none shrink-0 w-8">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="font-display text-sm font-bold text-[#201B16] line-clamp-2 leading-snug mb-1 group-hover:text-[#7A1F2B] transition-colors">
                                {s.title}
                              </p>
                              <div className="flex items-center gap-2 text-[11px] text-[#6B5F52] font-semibold">
                                {s.readingTimeMinutes && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-[#C9962E]" />
                                    {s.readingTimeMinutes} min
                                  </span>
                                )}
                                {s.views > 0 && (
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {formatViews(s.views)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Commerce Bridge */}
                  {relatedBooks.length > 0 && (
                    <div className="bg-white rounded-3xl p-6 border border-[#E8DFD2]">
                      <h3 className="font-display text-base font-bold text-[#201B16] mb-1">
                        Ma rabtaa buugga oo buuxa?
                      </h3>
                      <p className="text-[12px] text-[#6B5F52] mb-5">
                        Hel waaya&rsquo;aragnimada oo dhan buuggaaga asalka ah.
                      </p>
                      <div className="flex flex-col gap-4">
                        {relatedBooks.slice(0, 2).map((book) => (
                          <div
                            key={book.id}
                            className="flex items-center gap-3 p-3 rounded-2xl bg-[#FBF7F0] border border-[#E8DFD2]"
                          >
                            {/* Cover */}
                            <div
                              className="w-12 h-16 rounded-lg shrink-0 flex items-center justify-center"
                              style={{ background: book.coverGradient }}
                            >
                              <BookOpen className="w-5 h-5 text-white/60" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-display text-sm font-bold text-[#201B16] line-clamp-2 leading-snug">
                                {book.title}
                              </p>
                              {book.author && (
                                <p className="text-[11px] text-[#6B5F52] mt-0.5">
                                  {book.author}
                                </p>
                              )}
                              <p className="text-[11px] font-bold text-[#7A1F2B] mt-0.5">
                                {book.isPaid ? `$${book.price.toFixed(2)}` : "Bilaash"}
                              </p>
                            </div>
                            <Link
                              href={book.isPaid ? `/payment/${book.id}` : `/books/${book.id}`}
                              className="btn btn-primary btn-sm text-[12px] shrink-0"
                              id={`buy-book-${book.id}`}
                            >
                              {book.isPaid ? "Iibso" : "Akhri"}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Newsletter */}
                  <div
                    className="rounded-3xl p-6 border border-[#E8DFD2] text-white relative overflow-hidden"
                    style={{ background: "#1F3A54" }}
                  >
                    <div
                      className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
                      style={{ background: "#C9962E" }}
                    />
                    <Mail className="w-6 h-6 text-[#C9962E] mb-3 relative z-10" />
                    <h3 className="font-display text-base font-bold text-white mb-1 relative z-10">
                      Hel soo-koobid cusub
                    </h3>
                    <p className="text-[12px] text-white/70 mb-4 relative z-10">
                      Todobaad kasta — soo-koobid cusub, lacag la&rsquo;aan ah.
                    </p>
                    {newsletterDone ? (
                      <div className="flex items-center gap-2 text-sm font-bold text-[#C9962E] relative z-10">
                        <CheckCircle className="w-4 h-4" />
                        Mahadsanid! Waan kuu dirnaa.
                      </div>
                    ) : (
                      <form
                        className="flex flex-col gap-2 relative z-10"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (newsletterEmail.trim()) setNewsletterDone(true);
                        }}
                      >
                        <input
                          id="newsletter-email"
                          type="email"
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="iimaylkaaga@example.com"
                          className="input-field text-[13px]"
                          aria-label="Iimaylka warbaahinta"
                        />
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm w-full"
                          id="newsletter-submit"
                        >
                          Isdiiwaangeli
                        </button>
                      </form>
                    )}
                  </div>

                </div>
              </aside>

            </div>
          </>
        )}
      </div>

      {/* ── Mobile Sidebar (categories + newsletter stacked below) ── */}
      <div className="lg:hidden container-site mt-12 flex flex-col gap-6">
        {/* Mobile categories */}
        {categories.length > 0 && (
          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD2]">
            <h3 className="font-display text-base font-bold text-[#201B16] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9962E]" />
              Qaybaha
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigate({ category: null })}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                  !categoryParam
                    ? "bg-[#201B16] text-white border-[#201B16]"
                    : "text-[#6B5F52] border-[#E8DFD2] bg-white"
                }`}
              >
                Dhammaan ({summaries.length})
              </button>
              {categories.map((cat) => {
                const isActive =
                  cat.name.toLowerCase() === categoryParam.toLowerCase();
                return (
                  <button
                    key={cat.name}
                    onClick={() => navigate({ category: isActive ? null : cat.name })}
                    className="px-3 py-1.5 rounded-full text-xs font-bold border"
                    style={
                      isActive
                        ? { background: cat.hex, color: "#fff", borderColor: cat.hex }
                        : {
                            background: "#fff",
                            color: "#6B5F52",
                            borderColor: "#E8DFD2",
                          }
                    }
                  >
                    {cat.name} ({cat.count})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile commerce bridge */}
        {relatedBooks.length > 0 && (
          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD2]">
            <h3 className="font-display text-base font-bold text-[#201B16] mb-1">
              Ma rabtaa buugga oo buuxa?
            </h3>
            <p className="text-[12px] text-[#6B5F52] mb-4">
              Hel waaya&rsquo;aragnimada oo dhan buuggaaga asalka ah.
            </p>
            <div className="flex flex-col gap-3">
              {relatedBooks.slice(0, 2).map((book) => (
                <div
                  key={book.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#FBF7F0] border border-[#E8DFD2]"
                >
                  <div
                    className="w-10 h-14 rounded-lg shrink-0 flex items-center justify-center"
                    style={{ background: book.coverGradient }}
                  >
                    <BookOpen className="w-4 h-4 text-white/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm font-bold text-[#201B16] line-clamp-1">
                      {book.title}
                    </p>
                    <p className="text-[11px] font-bold text-[#7A1F2B]">
                      {book.isPaid ? `$${book.price.toFixed(2)}` : "Bilaash"}
                    </p>
                  </div>
                  <Link
                    href={book.isPaid ? `/payment/${book.id}` : `/books/${book.id}`}
                    className="btn btn-primary btn-sm text-[12px] shrink-0"
                    id={`buy-book-mobile-${book.id}`}
                  >
                    {book.isPaid ? "Iibso" : "Akhri"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile newsletter */}
        <div
          className="rounded-3xl p-6 border border-[#E8DFD2]"
          style={{ background: "#1F3A54" }}
        >
          <Mail className="w-5 h-5 text-[#C9962E] mb-3" />
          <h3 className="font-display text-base font-bold text-white mb-1">
            Hel soo-koobid cusub
          </h3>
          <p className="text-[12px] text-white/70 mb-4">
            Todobaad kasta — soo-koobid cusub, lacag la&rsquo;aan ah.
          </p>
          {newsletterDone ? (
            <div className="flex items-center gap-2 text-sm font-bold text-[#C9962E]">
              <CheckCircle className="w-4 h-4" />
              Mahadsanid!
            </div>
          ) : (
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail.trim()) setNewsletterDone(true);
              }}
            >
              <input
                id="newsletter-email-mobile"
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="iimaylkaaga@example.com"
                className="input-field text-[13px]"
              />
              <button type="submit" className="btn btn-primary btn-sm w-full">
                Isdiiwaangeli
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Featured Insight Card ───────────────────────────────────────────────────

function FeaturedInsightCard({ summary }: { summary: SummaryItem }) {
  const theme = getCategoryTheme(summary.category);
  const readHref = `/summaries/${summary.id}/read?returnTo=${buildReturnTarget("/summaries")}`;

  // Pick a short quote from the excerpt for the right panel
  const quoteText = summary.keyTakeaways?.[0]
    || summary.excerpt?.split(".")[0]
    || "Aqoon waa iftiinka maskaxda.";

  return (
    <article
      className="w-full rounded-[2rem] overflow-hidden bg-white border border-[#E8DFD2] shadow-sm mb-10"
      aria-label={`Soo-koobidda la xushay: ${summary.title}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
        {/* LEFT: Content */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[#C9962E] text-[10px] font-extrabold uppercase tracking-widest">
              Soo-koobidda la xushay
            </span>
            <span className="w-6 h-px bg-[#E8DFD2]" />
            <span
              className="px-2.5 py-1 rounded-md text-[10px] font-bold"
              style={{ background: `${theme.hex}18`, color: theme.hex }}
            >
              {summary.category || "Soo-koobid"}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-display font-extrabold text-[#201B16] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 36px)", letterSpacing: "-0.03em" }}
          >
            {summary.title}
          </h2>

          {/* Excerpt */}
          {summary.excerpt && (
            <p className="font-reader italic text-[#6B5F52] text-base leading-relaxed mb-6 line-clamp-2">
              {summary.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-[12px] font-semibold text-[#6B5F52] mb-7">
            {summary.readingTimeMinutes && (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-extrabold"
                style={{ background: "#C9962E", color: "#201B16", fontSize: "13px" }}
              >
                <Clock className="w-3.5 h-3.5" />
                {summary.readingTimeMinutes} min
              </span>
            )}
            {summary.originalBookTitle && (
              <span>
                📚 {summary.originalBookTitle}
                {summary.originalAuthor && ` — ${summary.originalAuthor}`}
              </span>
            )}
            {summary.summarizer && (
              <span>✍️ {summary.summarizer}</span>
            )}
          </div>

          <Link
            href={readHref}
            className="btn btn-primary inline-flex self-start"
            id="featured-read-btn"
          >
            Akhri Soo-koobidda
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* RIGHT: Decorative panel — desktop only */}
        <div
          className="hidden md:flex relative items-center justify-center overflow-hidden p-8"
          style={{ background: theme.hex }}
        >
          {/* Giant ghost quote mark */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold leading-none select-none pointer-events-none"
            style={{ fontSize: "220px", color: "rgba(255,255,255,0.06)" }}
            aria-hidden
          >
            &ldquo;
          </div>

          <div className="relative z-10 text-center text-white max-w-[200px]">
            {summary.readingTimeMinutes && (
              <div className="mb-4">
                <div
                  className="font-display font-extrabold leading-none"
                  style={{ fontSize: "64px", color: "#C9962E" }}
                >
                  {summary.readingTimeMinutes}
                </div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-widest -mt-1">
                  daqiiqo
                </div>
              </div>
            )}
            {quoteText && (
              <p className="font-reader italic text-white/80 text-sm leading-relaxed line-clamp-3">
                &ldquo;{quoteText}&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
