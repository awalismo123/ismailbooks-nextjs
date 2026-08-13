"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Clock, Eye, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { getCategoryTheme } from "@/lib/categoryTheme";

// Minimal types expected from the server
export interface BlogHomePost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  categoryName: string | null;
  estimatedReadTime: number | null;
  viewCount: number | null;
  createdAt: string | null;
}

export interface BlogHomeCategory {
  id: string;
  slug: string;
  name: string;
  count: number;
}

interface BlogHomeClientProps {
  initialPosts: BlogHomePost[];
  categories: BlogHomeCategory[];
}

export function BlogHomeClient({ initialPosts, categories }: BlogHomeClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategoryParam = searchParams.get("category");

  // Filter posts based on the URL parameter
  const filteredPosts = useMemo(() => {
    if (!activeCategoryParam) return initialPosts;
    return initialPosts.filter(
      (p) => p.categoryName && p.categoryName.toLowerCase() === activeCategoryParam.toLowerCase()
    );
  }, [initialPosts, activeCategoryParam]);

  const activeCategory = useMemo(() => {
    if (!activeCategoryParam) return null;
    return categories.find((c) => c.name.toLowerCase() === activeCategoryParam.toLowerCase()) || {
      name: activeCategoryParam,
      slug: activeCategoryParam,
      count: filteredPosts.length,
    };
  }, [activeCategoryParam, categories, filteredPosts.length]);

  const activeTheme = getCategoryTheme(activeCategory?.name || null);

  const setCategory = (catName: string | null) => {
    if (!catName) {
      router.push("/blog", { scroll: false });
    } else {
      router.push(`/blog?category=${encodeURIComponent(catName)}`, { scroll: false });
    }
  };

  const firstPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const restPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="bg-[#FBF7F0] min-h-screen pb-20">
      
      {/* ── MOBILE CHIP RAIL (Sticky) ── */}
      <div className="md:hidden sticky top-0 z-40 bg-[#FBF7F0]/95 backdrop-blur-md border-b border-[#E8DFD2] py-3">
        <div className="container-site">
          <nav aria-label="Qaybaha" className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setCategory(null)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                !activeCategory
                  ? "bg-[#201B16] text-white border-[#201B16]"
                  : "bg-white text-[#6B5F52] border-[#E8DFD2] hover:border-[#201B16] hover:text-[#201B16]"
              }`}
            >
              Dhammaan
            </button>
            {categories.map((cat) => {
              const theme = getCategoryTheme(cat.name);
              const isActive = activeCategory?.name.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.slug}
                  onClick={() => setCategory(cat.name)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                    isActive
                      ? `${theme.bg} ${theme.text} ${theme.border}`
                      : "bg-white text-[#6B5F52] border-[#E8DFD2] hover:border-[#201B16] hover:text-[#201B16]"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── HEADER / MASTHEAD / CATEGORY HERO ── */}
      {activeCategory ? (
        <header className={`${activeTheme.bg} pt-12 pb-14 relative overflow-hidden transition-colors duration-500`}>
          <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
          <div className="container-site relative z-10 text-center md:text-left">
            <button 
              onClick={() => setCategory(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white/70 hover:text-white transition-colors mb-4"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              Ku noqo dhammaan
            </button>
            <h1 className="font-display text-[40px] md:text-[56px] font-extrabold text-white leading-tight mb-4">
              {activeCategory.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white border border-white/20 backdrop-blur-sm">
                {activeCategory.count} Qoraal
              </span>
              <button 
                onClick={() => setCategory(null)}
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Clear filter"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
      ) : (
        <header className="pt-12 pb-10 border-b-4 border-double border-[#201B16]/10 mb-10">
          <div className="container-site text-center">
            <div className="flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#7A1F2B] mb-6">
              <span>{new Date().toLocaleDateString('so-SO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <h1 className="font-display text-[48px] sm:text-[64px] md:text-[80px] font-extrabold text-[#201B16] leading-[0.9] tracking-tight mb-6">
              Blog-ga IsmailBooks
            </h1>
            <p className="font-serif italic text-lg md:text-xl text-[#6B5F52] max-w-2xl mx-auto mb-8">
              Falanqayn qoto dheer oo ku saabsan cilmi-nafsiga, falsafadda, iyo nolosha — laga soo dheegtay buugaagta ugu wanaagsan dunida.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs font-semibold text-[#1F3A54]">
              <span>{initialPosts.length} Qoraal</span>
              <span className="text-[#C9962E]">•</span>
              <span>{categories.length} Qaybood</span>
            </div>
          </div>
        </header>
      )}

      {/* ── DESKTOP CHIP RAIL (Only visible if no category is active) ── */}
      {!activeCategory && (
        <div className="hidden md:block container-site mb-12">
          <nav aria-label="Qaybaha (Desktop)" className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setCategory(null)}
              className="px-4 py-2 rounded-full text-xs font-bold bg-[#201B16] text-white border border-[#201B16] transition-colors"
            >
              Dhammaan
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setCategory(cat.name)}
                className="px-4 py-2 rounded-full text-xs font-bold bg-white text-[#6B5F52] border border-[#E8DFD2] hover:border-[#201B16] hover:text-[#201B16] transition-colors"
              >
                {cat.name}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="container-site">
        
        {/* EMPTY STATE */}
        {filteredPosts.length === 0 ? (
          <div className="py-32 text-center">
            <h2 className="font-display text-3xl font-bold text-[#201B16] mb-4">Qoraal wali majiro qaybtan</h2>
            <button 
              onClick={() => setCategory(null)}
              className="btn btn-secondary inline-flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Soo bandhig dhammaan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 xl:gap-20">
            
            {/* LEFT COLUMN: Posts */}
            <div className="flex flex-col gap-10">
              
              {/* FEATURED ESSAY */}
              {firstPost && (
                <article className="group relative rounded-[2rem] overflow-hidden bg-white border border-[#E8DFD2] shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`/blog/${firstPost.slug}`} className="absolute inset-0 z-10">
                    <span className="sr-only">Akhri {firstPost.title}</span>
                  </Link>
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_30%]">
                    <div className="p-8 sm:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-[#C9962E] text-[10px] font-extrabold uppercase tracking-widest">Maqaalka Todobaadka</span>
                        <span className="w-8 h-px bg-[#E8DFD2]" />
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${getCategoryTheme(firstPost.categoryName).tint}`}>
                          {firstPost.categoryName || "Blog"}
                        </span>
                      </div>
                      <h2 className="font-display text-3xl sm:text-[42px] leading-tight font-extrabold text-[#201B16] mb-5">
                        <span className="bg-left-bottom bg-gradient-to-r from-[#C9962E]/30 to-[#C9962E]/30 bg-[length:0%_6px] bg-no-repeat group-hover:bg-[length:100%_6px] transition-all duration-500 ease-out">
                          {firstPost.title}
                        </span>
                      </h2>
                      {firstPost.excerpt && (
                        <p className="font-serif italic text-lg text-[#6B5F52] leading-relaxed mb-8 line-clamp-3">
                          {firstPost.excerpt}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#6B5F52] mt-auto">
                        <span>{firstPost.createdAt ? new Date(firstPost.createdAt).toLocaleDateString("so-SO", { day: "numeric", month: "short", year: "numeric" }) : ""}</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#C9962E]" />
                          {firstPost.estimatedReadTime || 5} min
                        </span>
                        <span className="relative z-20 ml-auto btn btn-primary py-2 px-5 bg-[#201B16] hover:bg-[#7A1F2B] transition-colors border-none">
                          Akhri Maqaalka
                        </span>
                      </div>
                    </div>
                    {/* Decorative Panel Desktop */}
                    <div className={`hidden md:flex relative ${getCategoryTheme(firstPost.categoryName).bg} items-center justify-center overflow-hidden`}>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-display text-[300px] leading-none font-bold select-none">
                        &rdquo;
                      </div>
                      <div className="relative z-10 text-center">
                        <Clock className="w-8 h-8 text-[#C9962E] mx-auto mb-2 opacity-80" />
                        <div className="text-white font-bold text-xl">{firstPost.estimatedReadTime || 5} min</div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mt-1">Akhris</div>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* LIST OF REST POSTS */}
              {restPosts.length > 0 && (
                <div className="flex flex-col">
                  {restPosts.map((post, index) => {
                    const theme = getCategoryTheme(post.categoryName);
                    return (
                      <article key={post.id} className="group relative py-8 border-b border-[#E8DFD2] last:border-0 flex gap-6 sm:gap-8 items-start">
                        <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
                          <span className="sr-only">Akhri {post.title}</span>
                        </Link>
                        
                        {/* Ghost Number */}
                        <div className="hidden sm:block text-[40px] font-display font-bold leading-none text-[#E8DFD2] group-hover:text-opacity-0 transition-colors shrink-0 w-12" style={{ color: "var(--ghost-color, #E8DFD2)", transition: "color 0.3s" }} >
                          {(index + 2).toString().padStart(2, "0")}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${theme.tint}`}>
                              {post.categoryName || "Blog"}
                            </span>
                            <span className="text-[11px] font-semibold text-[#6B5F52]">
                              {post.createdAt ? new Date(post.createdAt).toLocaleDateString("so-SO", { day: "numeric", month: "short", year: "numeric" }) : ""}
                            </span>
                          </div>
                          
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#201B16] leading-snug mb-3 pr-8">
                            <span className="bg-left-bottom bg-gradient-to-r from-[#7A1F2B]/30 to-[#7A1F2B]/30 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-300 ease-out">
                              {post.title}
                            </span>
                          </h3>
                          
                          {post.excerpt && (
                            <p className="text-sm sm:text-base text-[#6B5F52] font-serif italic line-clamp-2 leading-relaxed mb-4">
                              {post.excerpt}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs font-semibold text-[#6B5F52]">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#C9962E]" />
                              {post.estimatedReadTime || 5} min
                            </span>
                            {post.viewCount !== null && (
                              <span className="flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5 text-[#6B5F52]" />
                                {post.viewCount} views
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Hover Arrow Nudge */}
                        <div className="mt-2 text-[#E8DFD2] group-hover:text-[#1F3A54] transition-colors transform group-hover:translate-x-1 duration-300">
                          <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        
                        {/* Inline styles to inject the category hex on hover for the ghost number */}
                        <style>{`
                          article:hover .text-\\[\\#E8DFD2\\] { color: ${theme.hex}20 !important; }
                        `}</style>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Sidebar (Sticky on Desktop) */}
            <aside className="hidden lg:block relative">
              <div className="sticky top-8 flex flex-col gap-10">
                
                {/* Qaybaha List */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD2] shadow-sm">
                  <h3 className="font-display text-lg font-bold text-[#201B16] mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C9962E]" /> Qaybaha
                  </h3>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <button 
                        onClick={() => setCategory(null)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                          !activeCategory ? "bg-[#201B16] text-white" : "text-[#6B5F52] hover:bg-[#FBF7F0] hover:text-[#201B16]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {!activeCategory && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          Dhammaan
                        </div>
                        <span className={!activeCategory ? "text-white/60" : "text-[#E8DFD2]"}>{initialPosts.length}</span>
                      </button>
                    </li>
                    {categories.map((cat) => {
                      const theme = getCategoryTheme(cat.name);
                      const isActive = activeCategory?.name.toLowerCase() === cat.name.toLowerCase();
                      return (
                        <li key={cat.slug}>
                          <button 
                            onClick={() => setCategory(cat.name)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                              isActive ? `${theme.bg} text-white` : "text-[#6B5F52] hover:bg-[#FBF7F0] hover:text-[#201B16]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isActive ? (
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              ) : (
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.hex }} />
                              )}
                              {cat.name}
                            </div>
                            <span className={isActive ? "text-white/60" : "text-[#E8DFD2]"}>{cat.count}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Quote Card */}
                <div className="bg-[#1F3A54] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
                  <div className="absolute -top-6 -left-6 text-white/10 font-display text-9xl leading-none font-bold select-none">
                    &ldquo;
                  </div>
                  <div className="relative z-10">
                    <p className="font-serif italic text-lg leading-relaxed text-white/90 mb-4">
                      Akhrisku maaha uun in aad aragto waraaqo, ee waa in aad maskaxdaada ku quudiso aqoonta ifaysa nolosha.
                    </p>
                    <div className="text-xs font-bold uppercase tracking-widest text-[#C9962E]">IsmailBooks</div>
                  </div>
                </div>

              </div>
            </aside>
            
          </div>
        )}
      </div>
    </div>
  );
}
