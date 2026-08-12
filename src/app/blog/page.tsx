import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { BlogHomeClient } from "@/components/blog/BlogHomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog-ga IsmailBooks — Qoraallo & Falanqayn",
  description:
    "Falanqayn qoto dheer oo ku saabsan cilmi-nafsiga, falsafadda iyo buugaagta. Maqaallo cilmiyeysan iyo fikrado horumarineed.",
  openGraph: {
    type: "website",
    locale: "so_SO",
    siteName: "IsmailBooks",
    title: "Blog-ga IsmailBooks — Qoraallo & Falanqayn",
    description:
      "Falanqayn qoto dheer oo ku saabsan cilmi-nafsiga, falsafadda iyo buugaagta.",
  },
};

export default async function BlogPage() {
  const supabase = await createClient();

  // Fetch published blog posts
  const { data: postsData } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, excerpt, category_id, estimated_read_time, view_count, created_at"
    )
    .eq("status", "published")
    .order("created_at", { ascending: false });

  // Fetch categories
  const { data: categoriesData } = await supabase
    .from("blog_categories")
    .select("id, name, slug");

  // Fetch some books for commerce bridge (latest 4)
  const { data: booksData } = await supabase
    .from("books")
    .select("id, slug, title, price, cover_image")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(4);

  const categoriesMap = new Map(
    (categoriesData || []).map((c) => [c.id, c.name])
  );

  // Transform posts
  const allPosts = (postsData || []).map(
    (post: Record<string, unknown>) => ({
      id: String(post.id),
      title: String(post.title),
      slug: String(post.slug),
      excerpt: post.excerpt ? String(post.excerpt) : null,
      categoryName: post.category_id
        ? categoriesMap.get(Number(post.category_id)) || null
        : null,
      estimatedReadTime: post.estimated_read_time
        ? Number(post.estimated_read_time)
        : null,
      viewCount: post.view_count ? Number(post.view_count) : null,
      createdAt: post.created_at ? String(post.created_at) : null,
    })
  );

  // Compute category counts
  const categoryCounts = new Map<string, number>();
  allPosts.forEach((post) => {
    if (post.categoryName) {
      categoryCounts.set(
        post.categoryName,
        (categoryCounts.get(post.categoryName) || 0) + 1
      );
    }
  });

  const categories = (categoriesData || []).map((cat) => ({
    id: String(cat.id),
    name: cat.name,
    slug: cat.slug,
    count: categoryCounts.get(cat.name) || 0,
  }));

  // Transform books
  const relatedBooks = (booksData || []).map((book: Record<string, unknown>) => ({
    id: String(book.id),
    slug: String(book.slug),
    title: String(book.title),
    price: book.price ? Number(book.price) : null,
    coverImage: book.cover_image ? String(book.cover_image) : null,
  }));

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog-ga IsmailBooks",
    description:
      "Falanqayn qoto dheer oo ku saabsan cilmi-nafsiga, falsafadda iyo buugaagta.",
    inLanguage: "so",
    itemListElement: allPosts.slice(0, 10).map((post, index) => ({
      "@type": "BlogPosting",
      position: index + 1,
      headline: post.title,
      datePublished: post.createdAt,
      author: {
        "@type": "Organization",
        name: "Ismail Books",
      },
      inLanguage: "so",
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0]">
      <Navbar />
      <main className="flex-grow" id="main-content">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <BlogHomeClient
          posts={allPosts}
          categories={categories}
          relatedBooks={relatedBooks}
        />
      </main>
      <Footer />
    </div>
  );
}
