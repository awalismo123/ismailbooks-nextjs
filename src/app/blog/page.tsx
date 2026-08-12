import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — IsmailBooks",
  description: "Falanqayn qoto dheer oo ku saabsan cilmi-nafsiga, falsafadda iyo buugaagta.",
  openGraph: { type: "website", locale: "so_SO", siteName: "IsmailBooks" },
};

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: postsData } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, category_id, estimated_read_time, view_count, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const { data: categoriesData } = await supabase
    .from("blog_categories")
    .select("id, name, slug");

  const categoriesMap = new Map((categoriesData || []).map((c) => [c.id, c.name]));

  // Ensure no any
  const allPosts = (postsData || []).map((post: Record<string, unknown>) => ({ // eslint-disable-line
    id: String(post.id),
    title: String(post.title),
    slug: String(post.slug),
    excerpt: post.excerpt ? String(post.excerpt) : null,
    categoryName: post.category_id ? categoriesMap.get(Number(post.category_id)) || null : null,
    estimatedReadTime: post.estimated_read_time ? Number(post.estimated_read_time) : null,
    viewCount: post.view_count ? Number(post.view_count) : null,
    createdAt: post.created_at ? String(post.created_at) : null,
  }));

  const firstPost = allPosts.length > 0 ? allPosts[0] : null;
  const restPosts = allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0]">
      <Navbar />
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="bg-[#FBF7F0] pt-12 pb-6">
          <div className="container-site">
            <span className="eyebrow mb-4 block w-fit">Qoraallada & Falanqaynta</span>
            <h1 className="font-display text-[48px] sm:text-[56px] font-extrabold text-[#201B16] leading-tight mb-4">
              Blog-ga IsmailBooks
            </h1>
            <p className="text-[#6B5F52] text-base sm:text-lg max-w-lg mb-6">
              Falanqayn qoto dheer oo ku saabsan cilmi-nafsiga, falsafadda iyo buugaagta.
            </p>
            <div className="flex items-center gap-4 text-sm font-semibold text-[#1F3A54]">
              <span>{allPosts.length} Qoraal</span>
              <span className="text-[#E8DFD2]">|</span>
              <span>{categoriesData?.length || 0} Qaybood</span>
            </div>
          </div>
        </section>

        {/* FEATURED POST */}
        {firstPost && (
          <section className="container-site mb-10">
            <BlogPostCard post={firstPost} featured={true} />
          </section>
        )}

        {/* CATEGORY FILTER */}
        <div className="container-site">
          <BlogCategoryFilter />
        </div>

        {/* POSTS GRID */}
        {restPosts.length > 0 && (
          <section className="container-site pb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-extrabold text-[#201B16]">
                Qoraallo dheeraad ah
              </h2>
              <span className="badge badge-navy">
                {restPosts.length} qoraal
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* EMPTY STATE */}
        {allPosts.length === 0 && (
          <section className="container-site py-20 text-center">
            <h2 className="font-display text-2xl font-bold text-[#201B16] mb-2">
              Qoraal wali majiro
            </h2>
            <p className="text-[#6B5F52]">Soo noqo dhawaan — qoraalladii waa la dhameystirayaa.</p>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
