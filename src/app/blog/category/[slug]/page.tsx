import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("blog_categories")
    .select("name, description")
    .eq("slug", slug)
    .single();

  if (!category) {
    return { title: "Blog — IsmailBooks" };
  }

  return {
    title: `${category.name} - Blog — IsmailBooks`,
    description: category.description || `Qoraallada ku saabsan ${category.name}`,
    openGraph: { type: "website", locale: "so_SO", siteName: "IsmailBooks" },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("blog_categories")
    .select("id, name, slug, description")
    .eq("slug", slug)
    .single();

  if (!category) {
    notFound();
  }

  const { data: postsData } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, category_id, estimated_read_time, view_count, created_at")
    .eq("status", "published")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });
    
  // Ensure no any
  const allPosts = (postsData || []).map((post: Record<string, unknown>) => ({ // eslint-disable-line
    id: String(post.id),
    title: String(post.title),
    slug: String(post.slug),
    excerpt: post.excerpt ? String(post.excerpt) : null,
    categoryName: category.name,
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
        {/* CATEGORY HERO */}
        <section className="bg-[#1F3A54] pt-14 pb-12 relative overflow-hidden">
          {/* Decorative subtle pattern or gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1F3A54] to-[#2a4d70] opacity-80" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container-site relative z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#C9962E] text-[#1F3A54] mb-4">
              Qaybta
            </span>
            <h1 className="font-display text-[40px] sm:text-[48px] font-extrabold text-white leading-tight mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-white/80 text-base sm:text-lg max-w-xl mb-6 font-serif italic">
                {category.description}
              </p>
            )}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
              {allPosts.length} Qoraal
            </div>
          </div>
        </section>

        {/* FILTER */}
        <div className="container-site py-8">
          <BlogCategoryFilter currentCategory={slug} />
        </div>

        {/* POSTS GRID */}
        <section className="container-site pb-20">
          {firstPost && (
            <div className="mb-10">
              <BlogPostCard post={firstPost} featured={true} />
            </div>
          )}
          
          {restPosts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* EMPTY STATE */}
          {allPosts.length === 0 && (
            <div className="text-center py-16">
              <h2 className="font-display text-2xl font-bold text-[#201B16] mb-2">
                Qoraal wali majiro qaybtan
              </h2>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
