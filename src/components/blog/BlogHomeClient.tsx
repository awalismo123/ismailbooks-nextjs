"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Quote, MessageCircle } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  categoryName: string | null;
  estimatedReadTime: number | null;
  viewCount: number | null;
  createdAt: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface Book {
  id: string;
  slug: string;
  title: string;
  price: number | null;
  coverImage: string | null;
}

interface BlogHomeClientProps {
  posts: BlogPost[];
  categories: Category[];
  relatedBooks: Book[];
}

export function BlogHomeClient({ posts, categories, relatedBooks }: BlogHomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts by category and search
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = !selectedCategory || post.categoryName === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const listPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  const formattedDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("so-SO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const todayDate = new Date().toLocaleDateString("so-SO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* EDITORIAL MASTHEAD */}
      <section className="pt-10 pb-8 border-b-2 border-double border-[#E8DFD2]">
        <div className="container-site">
          <p className="text-xs font-bold text-[#6B5F52] uppercase tracking-widest mb-3">
            {todayDate}
          </p>
          <h1 className="font-display text-[42px] sm:text-[56px] font-extrabold text-[#201B16] leading-tight mb-4">
            Blog-ga IsmailBooks
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#6B5F52] max-w-2xl mb-6 leading-relaxed">
            Falanqayn qoto dheer, maqaallo cilmiyeysan iyo fikrado ku saabsan nolasha,
            falsafadda iyo horumarinta nafta.
          </p>
          <div className="flex items-center gap-3 text-sm font-semibold text-[#6B5F52]">
            <span className="text-[#201B16]">{posts.length} Qoraal</span>
            <span className="text-[#C9962E]">●</span>
            <span className="text-[#201B16]">{categories.length} Qaybood</span>
          </div>
        </div>
      </section>

      {/* CATEGORY RAIL + SEARCH */}
      <section className="py-6 border-b border-[#E8DFD2]">
        <div className="container-site">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Category chips - horizontal scroll on mobile */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === null
                    ? "bg-[#7A1F2B] text-white shadow-md"
                    : "bg-white text-[#6B5F52] border border-[#E8DFD2] hover:border-[#7A1F2B] hover:text-[#7A1F2B]"
                }`}
              >
                Dhammaan
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat.name
                      ? "bg-[#7A1F2B] text-white shadow-md"
                      : "bg-white text-[#6B5F52] border border-[#E8DFD2] hover:border-[#7A1F2B] hover:text-[#7A1F2B]"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative min-w-[200px]">
              <input
                type="search"
                placeholder="Raadi maqaal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-[#E8DFD2] bg-white text-sm font-medium text-[#201B16] placeholder-[#6B5F52]/60 focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20 focus:border-[#7A1F2B] transition-all"
                aria-label="Raadi maqaal"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5F52]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <div className="container-site py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
          {/* LEFT COLUMN */}
          <div>
            {/* FEATURED ESSAY - MAQAALKA TODOBAADKA */}
            {featuredPost && (
              <article className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge badge-navy text-xs font-bold">
                    Maqaalka Todobaadka
                  </span>
                  {featuredPost.categoryName && (
                    <>
                      <span className="text-[#E8DFD2]">/</span>
                      <span className="text-xs font-bold text-[#6B5F52] uppercase tracking-wide">
                        {featuredPost.categoryName}
                      </span>
                    </>
                  )}
                </div>

                <div className="surface-card p-0 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
                    {/* Left content */}
                    <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-center">
                      <h2 className="font-display text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#201B16] leading-tight mb-4 group-hover:text-[#7A1F2B] transition-colors">
                        <Link
                          href={`/blog/${featuredPost.slug}`}
                          className="no-underline relative inline-block"
                        >
                          {featuredPost.title}
                          <span className="absolute bottom-1 left-0 w-0 h-[3px] bg-[#C9962E] transition-all duration-300 group-hover:w-full" />
                        </Link>
                      </h2>

                      {featuredPost.excerpt && (
                        <p className="font-serif italic text-base sm:text-lg text-[#6B5F52] leading-relaxed mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#6B5F52] mb-6">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-[#1F3A54] text-white text-[10px] font-extrabold grid place-items-center">
                            IB
                          </span>
                          <span>Ismail Books</span>
                        </span>
                        <span className="text-[#E8DFD2]">|</span>
                        {formattedDate(featuredPost.createdAt)}
                        <span className="text-[#E8DFD2]">|</span>
                        {featuredPost.estimatedReadTime && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#C9962E]" />
                            {featuredPost.estimatedReadTime} daqiiqo akhris
                          </span>
                        )}
                        {featuredPost.viewCount !== null && (
                          <>
                            <span className="text-[#E8DFD2]">|</span>
                            <span>{featuredPost.viewCount} aragti</span>
                          </>
                        )}
                      </div>

                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="btn btn-primary w-fit"
                      >
                        Akhri Maqaalka
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Right decorative panel - desktop only */}
                    <div className="hidden md:block bg-[#1F3A54] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1F3A54] to-[#2a4d70]" />
                      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                        <Quote className="w-16 h-16 text-[#C9962E]/30 mb-4" />
                        {featuredPost.estimatedReadTime && (
                          <div className="text-center">
                            <span className="block font-display text-[56px] font-extrabold text-[#C9962E] leading-none">
                              {featuredPost.estimatedReadTime}
                            </span>
                            <span className="block text-sm font-semibold text-white/80 uppercase tracking-wider mt-2">
                              Daqiiqo Akhris
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* POSTS LIST - Magazine contents style */}
            <section>
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#E8DFD2]">
                <h2 className="font-display text-2xl font-extrabold text-[#201B16]">
                  Qoraallada Ugu Dambeeyay
                </h2>
                <span className="text-xs font-bold text-[#6B5F52] uppercase tracking-widest">
                  {listPosts.length} Qoraal
                </span>
              </div>

              {listPosts.length > 0 ? (
                <div className="space-y-0 divide-y divide-[#E8DFD2]">
                  {listPosts.map((post, index) => (
                    <article
                      key={post.id}
                      className="group py-6 first:pt-0 last:pb-0"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="no-underline block"
                      >
                        <div className="flex items-start gap-4 sm:gap-6">
                          {/* Ghost number */}
                          <span className="font-display text-[40px] sm:text-[48px] font-bold text-[#E8DFD2] leading-none shrink-0 group-hover:text-[#C9962E] transition-colors">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              {post.categoryName && (
                                <span className="badge badge-navy text-[10px]">
                                  {post.categoryName}
                                </span>
                              )}
                            </div>

                            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#201B16] leading-snug mb-2 group-hover:text-[#7A1F2B] transition-colors relative inline-block">
                              {post.title}
                              <span className="absolute bottom-0.5 left-0 w-0 h-[2px] bg-[#7A1F2B] transition-all duration-300 group-hover:w-full" />
                            </h3>

                            {post.excerpt && (
                              <p className="text-sm text-[#6B5F52] font-serif line-clamp-2 mb-3 leading-relaxed">
                                {post.excerpt}
                              </p>
                            )}

                            {/* Consistent meta line */}
                            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#6B5F52]">
                              {formattedDate(post.createdAt)}
                              <span className="text-[#E8DFD2]">•</span>
                              {post.estimatedReadTime && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-[#C9962E]" />
                                  {post.estimatedReadTime} daqiiqo
                                </span>
                              )}
                              {post.viewCount !== null && (
                                <>
                                  <span className="text-[#E8DFD2]">•</span>
                                  <span>{post.viewCount} aragti</span>
                                </>
                              )}
                              <span className="ml-auto inline-flex items-center gap-1 text-[#1F3A54] opacity-0 group-hover:opacity-100 transition-opacity">
                                Akhri
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div className="py-16 text-center surface-card">
                  <h3 className="font-display text-xl font-bold text-[#201B16] mb-2">
                    Lama helin qoraallo
                  </h3>
                  <p className="text-[#6B5F52] text-sm">
                    Isku day inaad bedesho qaybta ama raqditaanka.
                  </p>
                  {(selectedCategory || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery("");
                      }}
                      className="mt-4 text-sm font-bold text-[#7A1F2B] hover:underline"
                    >
                      Tirtir wax walba
                    </button>
                  )}
                </div>
              )}
            </section>
          </div>

          {/* RIGHT SIDEBAR - Sticky on desktop */}
          <aside className="hidden lg:block space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Categories vertical list */}
              <div className="surface-card">
                <h3 className="font-display text-lg font-bold text-[#201B16] mb-4 pb-3 border-b border-[#E8DFD2]">
                  Qaybaha
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        selectedCategory === null
                          ? "bg-[#7A1F2B]/10 text-[#7A1F2B]"
                          : "text-[#6B5F52] hover:bg-[#FBF7F0] hover:text-[#201B16]"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        <span>Dhammaan</span>
                        <span className="text-xs text-[#6B5F52]">
                          {posts.length}
                        </span>
                      </span>
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <button
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          selectedCategory === cat.name
                            ? "bg-[#7A1F2B]/10 text-[#7A1F2B]"
                            : "text-[#6B5F52] hover:bg-[#FBF7F0] hover:text-[#201B16]"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span>{cat.name}</span>
                          <span className="text-xs text-[#6B5F52]">{cat.count}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Follow card */}
              <div className="surface-card bg-gradient-to-br from-[#FBF7F0] to-white border-[#E8DFD2]">
                <h3 className="font-display text-lg font-bold text-[#201B16] mb-2">
                  Raac IsmailBooks
                </h3>
                <p className="text-xs text-[#6B5F52] mb-4 leading-relaxed">
                  Qoraal cusub todobaad kasta. Hel warbixinno cusub oo ku saabsan
                  falsafadda iyo cilmi-nafsiga.
                </p>
                <a
                  href="https://wa.me/252636475579"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              {/* Commerce bridge - Related books */}
              {relatedBooks.length > 0 && (
                <div className="surface-card">
                  <h3 className="font-display text-lg font-bold text-[#201B16] mb-4 pb-3 border-b border-[#E8DFD2]">
                    Buugaag la xiriira
                  </h3>
                  <ul className="space-y-3">
                    {relatedBooks.slice(0, 2).map((book) => (
                      <li key={book.id}>
                        <Link
                          href={`/books/${book.slug}`}
                          className="flex items-center gap-3 group no-underline"
                        >
                          <div className="w-12 h-16 rounded bg-[#E8DFD2] overflow-hidden shrink-0">
                            {book.coverImage ? (
                              <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[#1F3A54] to-[#7A1F2B]" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[#201B16] group-hover:text-[#7A1F2B] transition-colors line-clamp-2 leading-snug">
                              {book.title}
                            </p>
                            {book.price && (
                              <p className="text-xs font-semibold text-[#C9962E] mt-1">
                                ${book.price.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/books"
                    className="block mt-4 text-xs font-bold text-[#1F3A54] hover:text-[#7A1F2B] transition-colors"
                  >
                    Eeg buugaagta oo dhan →
                  </Link>
                </div>
              )}

              {/* Quote card */}
              <div className="surface-card bg-[#FBF7F0] border-[#E8DFD2]">
                <Quote className="w-6 h-6 text-[#C9962E] mb-3" />
                <blockquote className="font-serif italic text-sm text-[#6B5F52] leading-relaxed mb-3">
                  "Aqoontu waa iftiinka nolosha; buugguna waa furaha aqoonta."
                </blockquote>
                <cite className="text-xs font-bold text-[#201B16] not-italic">
                  — Ismail Books
                </cite>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile-only sidebar (stacked at bottom) */}
      <div className="lg:hidden container-site pb-12 space-y-6">
        {/* Categories */}
        <div className="surface-card">
          <h3 className="font-display text-lg font-bold text-[#201B16] mb-4 pb-3 border-b border-[#E8DFD2]">
            Qaybaha
          </h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedCategory === null
                    ? "bg-[#7A1F2B]/10 text-[#7A1F2B]"
                    : "text-[#6B5F52] hover:bg-[#FBF7F0] hover:text-[#201B16]"
                }`}
              >
                <span className="flex items-center justify-between">
                  <span>Dhammaan</span>
                  <span className="text-xs text-[#6B5F52]">{posts.length}</span>
                </span>
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <button
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    selectedCategory === cat.name
                      ? "bg-[#7A1F2B]/10 text-[#7A1F2B]"
                      : "text-[#6B5F52] hover:bg-[#FBF7F0] hover:text-[#201B16]"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span>{cat.name}</span>
                    <span className="text-xs text-[#6B5F52]">{cat.count}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow card mobile */}
        <div className="surface-card bg-gradient-to-br from-[#FBF7F0] to-white border-[#E8DFD2]">
          <h3 className="font-display text-lg font-bold text-[#201B16] mb-2">
            Raac IsmailBooks
          </h3>
          <p className="text-xs text-[#6B5F52] mb-4 leading-relaxed">
            Qoraal cusub todobaad kasta.
          </p>
          <a
            href="https://wa.me/252636475579"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        {/* Quote card mobile */}
        <div className="surface-card bg-[#FBF7F0] border-[#E8DFD2]">
          <Quote className="w-6 h-6 text-[#C9962E] mb-3" />
          <blockquote className="font-serif italic text-sm text-[#6B5F52] leading-relaxed mb-3">
            "Aqoontu waa iftiinka nolosha; buugguna waa furaha aqoonta."
          </blockquote>
          <cite className="text-xs font-bold text-[#201B16] not-italic">
            — Ismail Books
          </cite>
        </div>
      </div>
    </>
  );
}
