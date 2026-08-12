"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, X } from "lucide-react";
import { BlogPostCard } from "./BlogPostCard";

export interface BlogPostSummary {
  id: string; title: string; slug: string; excerpt: string | null;
  categoryName: string | null; categorySlug: string | null;
  estimatedReadTime: number | null; viewCount: number | null; createdAt: string | null;
}
interface BlogCategory { id: number; name: string; slug: string; }

export default function BlogHomeClient({ posts, categories }: { posts: BlogPostSummary[]; categories: BlogCategory[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const visiblePosts = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return posts.filter((post) => (activeCategory === "all" || post.categorySlug === activeCategory) && (!term || `${post.title} ${post.excerpt || ""} ${post.categoryName || ""}`.toLocaleLowerCase().includes(term)));
  }, [activeCategory, posts, query]);
  const featuredPost = visiblePosts[0] || null;
  const remainingPosts = featuredPost ? visiblePosts.slice(1) : [];
  const isFiltering = query.trim().length > 0 || activeCategory !== "all";

  return <>
    <section className="relative overflow-hidden border-b border-[#E8DFD2] bg-[#FBF7F0] py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true"><div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#C9962E]/15 blur-3xl" /><div className="absolute -bottom-40 left-[35%] h-80 w-80 rounded-full bg-[#1F3A54]/10 blur-3xl" /></div>
      <div className="container-site relative"><div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]"><div className="max-w-3xl"><span className="eyebrow mb-5"><Sparkles className="h-3.5 w-3.5" /> Fikrado mudan in la wadaago</span><h1 className="font-display text-5xl font-extrabold leading-[0.95] text-[#201B16] sm:text-6xl">Blog-ga<br /><span className="text-[#7A1F2B]">IsmailBooks</span></h1><p className="mt-5 max-w-2xl font-serif text-lg italic leading-relaxed text-[#6B5F52] sm:text-xl">Falanqayn qoto dheer oo ku saabsan cilmi-nafsiga, falsafadda, iyo buugaagta wax ka beddela aragtidaada.</p></div><div className="flex gap-6 border-[#E8DFD2] text-sm sm:gap-9 lg:border-l lg:pl-8"><div><strong className="block font-display text-3xl text-[#1F3A54]">{posts.length}</strong><span className="font-semibold text-[#6B5F52]">Qoraal</span></div><div><strong className="block font-display text-3xl text-[#1F3A54]">{categories.length}</strong><span className="font-semibold text-[#6B5F52]">Qaybood</span></div></div></div>
        <div className="mt-9 max-w-2xl"><label className="sr-only" htmlFor="blog-search">Raadi qoraallada</label><div className="flex items-center rounded-2xl border border-[#E8DFD2] bg-white p-2 shadow-[0_12px_30px_rgba(32,27,22,0.06)] focus-within:border-[#1F3A54] focus-within:ring-4 focus-within:ring-[#1F3A54]/10"><Search className="ml-3 h-5 w-5 shrink-0 text-[#6B5F52]" /><input id="blog-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Raadi fikrad, buug ama mawduuc..." className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-[#201B16] outline-none placeholder:text-[#9A8F82]" />{query && <button type="button" onClick={() => setQuery("")} className="rounded-xl p-2 text-[#6B5F52] hover:bg-[#FBF7F0]" aria-label="Nadiifi raadinta"><X className="h-4 w-4" /></button>}</div></div>
      </div>
    </section>
    <section className="container-site py-7 sm:py-9"><div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar" aria-label="Ku shaandhee qaybta"><button type="button" onClick={() => setActiveCategory("all")} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-bold transition-colors ${activeCategory === "all" ? "border-[#1F3A54] bg-[#1F3A54] text-white" : "border-[#E8DFD2] bg-white text-[#6B5F52] hover:border-[#1F3A54] hover:text-[#1F3A54]"}`}>Dhammaan</button>{categories.map((category) => <button key={category.id} type="button" onClick={() => setActiveCategory(category.slug)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-bold transition-colors ${activeCategory === category.slug ? "border-[#1F3A54] bg-[#1F3A54] text-white" : "border-[#E8DFD2] bg-white text-[#6B5F52] hover:border-[#1F3A54] hover:text-[#1F3A54]"}`}>{category.name}</button>)}</div></section>
    {featuredPost && <section className="container-site pb-12 sm:pb-16"><div className="mb-5 flex items-center gap-3"><span className="h-px w-8 bg-[#C9962E]" /><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#7A1F2B]">{isFiltering ? "Natiijada ugu horreysa" : "Maqaalka la xushay"}</p></div><BlogPostCard post={featuredPost} featured /></section>}
    {remainingPosts.length > 0 && <section className="border-t border-[#E8DFD2] bg-white/45 py-12 sm:py-16"><div className="container-site"><div className="mb-8 flex flex-wrap items-end justify-between gap-3"><div><p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#7A1F2B]">Sii wad akhriska</p><h2 className="font-display text-3xl font-extrabold text-[#201B16]">Qoraallo kuu furan</h2></div><p className="badge badge-navy">{visiblePosts.length} qoraal</p></div><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{remainingPosts.map((post) => <BlogPostCard key={post.id} post={post} />)}</div></div></section>}
    {visiblePosts.length === 0 && <section className="container-site py-16 sm:py-24"><div className="mx-auto max-w-lg rounded-3xl border border-dashed border-[#D9CFC0] bg-white px-6 py-12 text-center"><Search className="mx-auto mb-4 h-7 w-7 text-[#C9962E]" /><h2 className="font-display text-2xl font-extrabold text-[#201B16]">Wax qoraal ah lama helin</h2><p className="mt-3 text-[#6B5F52]">Isku day eray kale, ama eeg dhammaan qaybaha blog-ga.</p><button type="button" onClick={() => { setQuery(""); setActiveCategory("all"); }} className="btn btn-secondary btn-sm mt-6">Dib u deji shaandhaynta</button></div></section>}
    {!isFiltering && posts.length > 0 && <section className="container-site pb-14"><Link href="/books" className="group flex items-center justify-between rounded-2xl bg-[#1F3A54] px-6 py-5 text-white no-underline sm:px-8"><span><span className="block text-xs font-bold uppercase tracking-widest text-[#C9962E]">Soo ogow wax badan</span><span className="mt-1 block font-display text-xl font-bold">Ka hel buugga xiga maktabaddeenna</span></span><ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></Link></section>}
  </>;
}
