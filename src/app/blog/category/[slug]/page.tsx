import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
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

  // We query by category_id
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, category_id, estimated_read_time, view_count, created_at")
    .eq("status", "published")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  const allPosts = posts ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0]">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container-site">

          <div className="mb-10">
            <span className="text-[#7A1F2B] text-xs font-extrabold uppercase tracking-widest block mb-2">
              Qaybta
            </span>
            <h1 className="font-display text-4xl font-extrabold text-[#201B16]">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-[#6B5F52] text-sm mt-2 max-w-2xl">
                {category.description}
              </p>
            )}
          </div>

          <BlogCategoryFilter currentCategory={slug} />

          {allPosts.length === 0 ? (
            <div className="text-center py-20 text-[#6B5F52]">
              <p className="text-lg font-display font-bold">Qoraal wali majiro qaybtan</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {allPosts.map((post: any) => (
                <article
                  key={post.id}
                  className="surface-card flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 text-xs">
                      <span className="badge badge-navy">
                        {category.name}
                      </span>
                      <div className="flex items-center gap-2 text-[#6B5F52]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.estimated_read_time ?? 5} min</span>
                      </div>
                    </div>

                    <h2 className="font-display text-xl font-bold text-[#201B16] group-hover:text-[#7A1F2B] transition-colors leading-snug mb-3">
                      {post.title}
                    </h2>
                    <p className="text-xs text-[#6B5F52] line-clamp-3 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8DFD2] flex items-center justify-between">
                    <span className="text-[10px] text-[#6B5F52]">
                      {post.created_at ? new Date(post.created_at).toLocaleDateString() : ""}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F3A54] group-hover:translate-x-1 transition-transform no-underline"
                    >
                      <span>Akhri</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
