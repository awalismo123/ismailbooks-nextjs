import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { BlogHomeClient, BlogHomePost, BlogHomeCategory } from "@/components/blog/BlogHomeClient";
import type { Metadata } from "next";

// This is required to read searchParams dynamically for Metadata
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
  const params = await searchParams;
  const categoryParam = params.category as string | undefined;

  let title = "Blog — IsmailBooks";
  let description = "Falanqayn qoto dheer oo ku saabsan cilmi-nafsiga, falsafadda iyo buugaagta.";

  if (categoryParam) {
    title = `${categoryParam} - Blog — IsmailBooks`;
    description = `Qoraallada ku saabsan ${categoryParam}. ${description}`;
  }

  return {
    title,
    description,
    openGraph: { type: "website", locale: "so_SO", siteName: "IsmailBooks", title, description },
  };
}

export default async function BlogPage() {
  const supabase = await createClient();

  // 1. Fetch posts
  const { data: postsData } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, category_id, estimated_read_time, view_count, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  // 2. Fetch categories
  const { data: categoriesData } = await supabase
    .from("blog_categories")
    .select("id, name, slug");

  const categoriesMap = new Map((categoriesData || []).map((c) => [c.id, c.name]));

  // 3. Map posts to Client Component props
  const initialPosts: BlogHomePost[] = (postsData || []).map((post: Record<string, unknown>) => ({ // eslint-disable-line
    id: String(post.id),
    title: String(post.title),
    slug: String(post.slug),
    excerpt: post.excerpt ? String(post.excerpt) : null,
    categoryName: post.category_id ? categoriesMap.get(Number(post.category_id)) || null : null,
    estimatedReadTime: post.estimated_read_time ? Number(post.estimated_read_time) : null,
    viewCount: post.view_count ? Number(post.view_count) : null,
    createdAt: post.created_at ? String(post.created_at) : null,
  }));

  // 4. Derive active categories and counts from the actual published posts
  const categoryCounts = new Map<string, number>();
  initialPosts.forEach((post) => {
    if (post.categoryName) {
      categoryCounts.set(post.categoryName, (categoryCounts.get(post.categoryName) || 0) + 1);
    }
  });

  const categories: BlogHomeCategory[] = Array.from(categoryCounts.entries())
    .map(([name, count]) => ({
      id: name,
      slug: encodeURIComponent(name),
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count); // Most posts first

  return (
    <>
      <Navbar />
      <main>
        <BlogHomeClient initialPosts={initialPosts} categories={categories} />
      </main>
      <Footer />
    </>
  );
}
