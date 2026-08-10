import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Eye, ArrowLeft, Share2, MessageCircle, Tag } from "lucide-react";

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt, meta_title, meta_description, featured_image")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) {
    return { title: "Qoraal — IsmailBooks" };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || "";

  return {
    title: `${title} — IsmailBooks`,
    description,
    openGraph: {
      title: `${title} — IsmailBooks`,
      description,
      type: "article",
      locale: "so_SO",
      siteName: "IsmailBooks",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function SingleBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch the post
  const { data: post } = await supabase
    .from("blog_posts")
    .select(
      "id, title, slug, excerpt, content, featured_image, category_id, estimated_read_time, view_count, created_at, meta_title, meta_description, blog_categories(name, slug)"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) notFound();

  const categoryName = (post.blog_categories as any)?.name ?? null;
  const categorySlug = (post.blog_categories as any)?.slug ?? null;

  // Increment view count
  supabase
    .from("blog_posts")
    .update({ view_count: (post.view_count ?? 0) + 1 })
    .eq("id", post.id)
    .then(() => {});

  // Fetch related posts (same category_id, excluding current)
  const { data: related } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, category_id, estimated_read_time, created_at, blog_categories(name)")
    .eq("status", "published")
    .eq("category_id", post.category_id ?? 0)
    .neq("id", post.id)
    .limit(3);

  const relatedPosts = related ?? [];

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("so-SO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const shareUrl = `https://ismailbooks.com/blog/${post.slug}`;
  const whatsappText = encodeURIComponent(`${post.title}\n${shareUrl}`);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0]">
      {/* JSON-LD Article schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt ?? "",
            datePublished: post.created_at,
            inLanguage: "so",
            publisher: {
              "@type": "Organization",
              name: "IsmailBooks",
              url: "https://ismailbooks.com",
            },
          }),
        }}
      />

      <Navbar />

      <main className="flex-grow py-10 sm:py-14">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">

            {/* ── Back link ── */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B5F52] hover:text-[#7A1F2B] transition-colors mb-8 no-underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Ku noqo Qoraallada
            </Link>

            {/* ── Article header ── */}
            <header className="mb-10">
              {categoryName && (
                <Link
                  href={`/blog/category/${categorySlug}`}
                  className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[rgba(122,31,43,0.07)] text-[#7A1F2B] border border-[rgba(122,31,43,0.15)] no-underline hover:bg-[rgba(122,31,43,0.12)] transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {categoryName}
                </Link>
              )}

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#201B16] leading-tight mb-5">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg text-[#6B5F52] leading-relaxed mb-6 border-l-4 border-[#C9962E] pl-4 font-medium">
                  {post.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#6B5F52] pb-6 border-b border-[#E8DFD2]">
                <span className="font-extrabold text-[#201B16] text-sm">IsmailBooks</span>
                {formattedDate && <span>{formattedDate}</span>}
                {post.estimated_read_time && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9962E]" />
                    {post.estimated_read_time} daqiiqo akhris
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#1F3A54]" />
                  {(post.view_count ?? 0).toLocaleString()} daawasho
                </span>
              </div>
            </header>

            {/* ── Featured image ── */}
            {post.featured_image && (
              <div className="mb-10 rounded-2xl overflow-hidden shadow-md">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            )}

            {/* ── Article body ── */}
            <article
              className="
                prose prose-lg max-w-none
                prose-headings:font-display prose-headings:text-[#201B16] prose-headings:font-extrabold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-[#3D3228] prose-p:leading-[1.85] prose-p:text-base sm:prose-p:text-[17px]
                prose-a:text-[#1F3A54] prose-a:font-semibold prose-a:underline-offset-2
                prose-a:hover:text-[#7A1F2B]
                prose-strong:text-[#201B16] prose-strong:font-extrabold
                prose-blockquote:border-l-[#C9962E] prose-blockquote:bg-[#FBF7F0]
                prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:pr-4
                prose-blockquote:text-[#5C4F3A] prose-blockquote:not-italic
                prose-ul:text-[#3D3228] prose-ol:text-[#3D3228]
                prose-li:marker:text-[#C9962E]
                prose-code:bg-[#F3EDE3] prose-code:text-[#7A1F2B] prose-code:rounded prose-code:px-1
                prose-hr:border-[#E8DFD2]
              "
              dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
            />

            {/* ── Share strip ── */}
            <div className="mt-14 pt-8 border-t border-[#E8DFD2]">
              <div className="panel flex flex-col sm:flex-row items-center justify-between gap-5">
                <div>
                  <span className="text-xs text-[#6B5F52] block mb-1 font-semibold uppercase tracking-widest">Wadaag</span>
                  <p className="font-display text-lg font-bold text-[#201B16]">
                    Ma heshay fikrad cusub? Qoraalkan la wadaag.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={`https://wa.me/?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[rgba(37,211,102,0.1)] text-[#1a7a40] border border-[rgba(37,211,102,0.25)] text-sm font-bold no-underline hover:bg-[rgba(37,211,102,0.18)] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <button
                    onClick={undefined}
                    id="copy-link-btn"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[rgba(31,58,84,0.07)] text-[#1F3A54] border border-[rgba(31,58,84,0.15)] text-sm font-bold hover:bg-[rgba(31,58,84,0.12)] transition-colors"
                    aria-label="Copy link"
                  >
                    <Share2 className="w-4 h-4" />
                    Kobi Link-ga
                  </button>
                </div>
              </div>
            </div>

            {/* ── Related posts ── */}
            {relatedPosts.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-2xl font-extrabold text-[#201B16] mb-6">
                  Qoraallo kale
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {relatedPosts.map((p: any) => (
                    <Link
                      key={p.id}
                      href={`/blog/${p.slug}`}
                      className="surface-card group block no-underline"
                    >
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7A1F2B] mb-2 block">
                        {(p.blog_categories as any)?.name ?? "Blog"}
                      </span>
                      <h3 className="font-display text-base font-bold text-[#201B16] group-hover:text-[#7A1F2B] transition-colors leading-snug mb-2">
                        {p.title}
                      </h3>
                      {p.estimated_read_time && (
                        <span className="text-xs text-[#6B5F52] flex items-center gap-1 mt-3">
                          <Clock className="w-3 h-3" />
                          {p.estimated_read_time} daqiiqo
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
