import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import BlogHomeClient, { type BlogPostSummary } from "@/components/blog/BlogHomeClient";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — IsmailBooks",
  description: "Falanqayn qoto dheer oo ku saabsan cilmi-nafsiga, falsafadda iyo buugaagta.",
  openGraph: { type: "website", locale: "so_SO", siteName: "IsmailBooks" },
};

export default async function BlogPage() {
  const supabase = await createClient();
  const [{ data: postsData }, { data: categoriesData }] = await Promise.all([
    supabase.from("blog_posts").select("id, slug, title, excerpt, category_id, estimated_read_time, view_count, created_at").eq("status", "published").order("created_at", { ascending: false }),
    supabase.from("blog_categories").select("id, name, slug").eq("is_active", 1).order("sort_order", { ascending: true }),
  ]);

  const categories = categoriesData || [];
  const categoriesMap = new Map(categories.map((category) => [category.id, category]));
  const posts: BlogPostSummary[] = (postsData || []).map((post: Record<string, unknown>) => {
    const category = post.category_id ? categoriesMap.get(Number(post.category_id)) : undefined;
    return {
      id: String(post.id), title: String(post.title), slug: String(post.slug),
      excerpt: post.excerpt ? String(post.excerpt) : null,
      categoryName: category?.name || null, categorySlug: category?.slug || null,
      estimatedReadTime: post.estimated_read_time ? Number(post.estimated_read_time) : null,
      viewCount: post.view_count ? Number(post.view_count) : null,
      createdAt: post.created_at ? String(post.created_at) : null,
    };
  });

  return <div className="min-h-screen flex flex-col bg-[#FBF7F0]"><Navbar /><main className="flex-grow"><BlogHomeClient posts={posts} categories={categories} /></main><Footer /></div>;
}
