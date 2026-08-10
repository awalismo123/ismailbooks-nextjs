"use client";

import React, { useState, useMemo } from "react";
import { Search, BookOpen, Tag } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { BookCard, type BookCardData } from "./BookCard";

type Book = {
  id: number;
  title: string;
  author: string;
  desc: string;
  is_paid: boolean;
  price: string;
  pages: number;
  rating: string;
  cover: string;
  category: string;
};

type FilterMode = "all" | "free" | "premium";

export default function BooksClientFilter({ books }: { books: Book[] }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterMode>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Extract unique categories from books data
  const categories = useMemo(() => {
    const set = new Set<string>();
    books.forEach((b) => {
      if (b.category && b.category.trim()) {
        set.add(b.category.trim());
      }
    });
    return Array.from(set).sort();
  }, [books]);

  const filtered = books.filter((b) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "free" && !b.is_paid) ||
      (filter === "premium" && b.is_paid);

    const matchesCategory =
      selectedCategory === "all" ||
      (b.category && b.category.trim().toLowerCase() === selectedCategory.toLowerCase());

    const q = search.toLowerCase();
    const matchesSearch =
      b.title.toLowerCase().includes(q) ||
      (b.author ?? "").toLowerCase().includes(q) ||
      (b.category ?? "").toLowerCase().includes(q);

    return matchesFilter && matchesCategory && matchesSearch;
  });

  const toCard = (b: Book): BookCardData => ({
    id: b.id,
    title: b.title,
    author: b.author,
    is_paid: b.is_paid,
    cover: b.cover,
    priceLabel: b.is_paid
      ? `$${Number(b.price).toLocaleString()}`
      : "Bilaash",
    pages: b.pages,
    rating: b.rating,
    category: b.category,
  });

  const typeFilters: { key: FilterMode; label: string; count?: number }[] = [
    { key: "all", label: t.books?.filterAll ?? "Dhammaan", count: books.length },
    { key: "free", label: t.books?.filterFree ?? "Bilaash" },
    { key: "premium", label: t.books?.filterPremium ?? "Premium" },
  ];

  return (
    <>
      {/* ── Filter bar ── */}
      <div className="mb-6 space-y-4 rounded-2xl border border-[#E8DFD2] bg-white p-4 shadow-sm sm:mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B5F52]" />
            <input
              type="text"
              placeholder={t.books?.searchPlaceholder ?? "Raadi buug ama qoraa..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field bg-[#FBF7F0]/60 pl-10 text-sm focus:bg-white"
            />
          </div>

          {/* Type filter chips */}
          <div className="flex flex-wrap items-center gap-2">
            {typeFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="chip btn-sm"
                aria-pressed={filter === f.key}
                type="button"
              >
                {f.label}
                {f.count !== undefined && (
                  <span className="ml-1 text-[#6B5F52]">({f.count})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Category chips row if categories exist */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#E8DFD2]/60 pb-1 scrollbar-none">
            <span className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-[#6B5F52] shrink-0 pr-1">
              <Tag className="w-3 h-3 text-[#7A1F2B]" /> Qeybta:
            </span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-all shrink-0 ${
                selectedCategory === "all"
                  ? "bg-[#1F3A54] text-white"
                  : "bg-[#FBF7F0] text-[#6B5F52] border border-[#E8DFD2] hover:border-[#1F3A54]/40"
              }`}
              type="button"
            >
              Dhammaan Qeybaha
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all shrink-0 ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-[#1F3A54] text-white"
                    : "bg-[#FBF7F0] text-[#6B5F52] border border-[#E8DFD2] hover:border-[#1F3A54]/40"
                }`}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="mb-5 text-xs font-semibold text-[#6B5F52]">
        {filtered.length} {t.books?.booksFound ?? "buug ayaa la helay"}
      </p>

      {/* ── Book grid ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E8DFD2] bg-white">
            <BookOpen className="h-7 w-7 text-[#C9962E]" />
          </div>
          <p className="font-display text-xl font-extrabold text-[#201B16]">
            {t.books?.noResults ?? "Buug la helin"}
          </p>
          <p className="mt-1.5 max-w-xs text-sm text-[#6B5F52]">
            {t.books?.noResultsHint ?? "Isku day ereyga kale ama tirtir shaandhaynta."}
          </p>
          <button
            onClick={() => {
              setSearch("");
              setFilter("all");
              setSelectedCategory("all");
            }}
            className="btn btn-secondary btn-sm mt-5"
            type="button"
          >
            {t.books?.filterAll ?? "Tirtir Shaandhaynta"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
          {filtered.map((book) => (
            <BookCard key={book.id} book={toCard(book)} />
          ))}
        </div>
      )}
    </>
  );
}