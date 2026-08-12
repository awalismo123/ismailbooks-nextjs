import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Eye, ArrowLeft, ArrowRight, BookOpen, Sparkles, ChevronRight } from "lucide-react";
import { BookCard, type BookCardData } from "@/components/books/BookCard";
import { BlogArticleShell } from "@/components/blog/BlogArticleShell";

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("title, excerpt, meta_title, meta_description, featured_image")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
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
      images: post.featured_image ? [{ url: post.featured_image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

// ─── Page Component ──────────────────────────────────────────────────────────
export default async function SingleBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const supabase = await createClient();

  // Fetch the blog post
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select(
      "id, title, slug, excerpt, content, featured_image, category_id, estimated_read_time, view_count, created_at, meta_title, meta_description"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    notFound();
  }

  // Fetch category info if category_id exists
  let categoryName = null;
  let categorySlug = null;
  if (post.category_id) {
    const { data: cat } = await supabase
      .from("blog_categories")
      .select("name, slug")
      .eq("id", post.category_id)
      .single();
    if (cat) {
      categoryName = cat.name;
      categorySlug = cat.slug;
    }
  }

  // Server-side view count increment (fire and forget)
  supabase
    .from("blog_posts")
    .update({ view_count: (post.view_count ?? 0) + 1 })
    .eq("id", post.id)
    .then(() => {});

  // Fetch related blog posts
  const { data: related } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, category_id, estimated_read_time, created_at")
    .eq("status", "published")
    .eq("category_id", post.category_id ?? 0)
    .neq("id", post.id)
    .limit(3);

  const relatedPosts = related ?? [];

  // Fetch Previous and Next blog posts for footer navigation
  const { data: prevPost } = await supabase
    .from("blog_posts")
    .select("id, title, slug")
    .eq("status", "published")
    .lt("created_at", post.created_at || new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: nextPost } = await supabase
    .from("blog_posts")
    .select("id, title, slug")
    .eq("status", "published")
    .gt("created_at", post.created_at || new Date().toISOString())
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  // Fetch related books for Commerce Bridge
  let relatedBooksData: BookCardData[] = [];
  try {
    const { data: books } = await supabase
      .from("books")
      .select("id, title, author, description, is_paid, price, category, cover_image, pages, average_rating")
      .eq("is_active", true)
      .limit(3);

    if (books && books.length > 0) {
      const COVER_GRADIENTS = [
        "cover-gradient-1",
        "cover-gradient-2",
        "cover-gradient-3",
        "cover-gradient-4",
        "cover-gradient-5",
        "cover-gradient-6",
      ];
      relatedBooksData = books.map((b, i) => {
        let coverUrl = COVER_GRADIENTS[i % COVER_GRADIENTS.length];
        if (b.cover_image) {
          const { data } = supabase.storage.from("covers").getPublicUrl(b.cover_image);
          coverUrl = data.publicUrl;
        }
        const isPaid = b.is_paid === true || (b.is_paid as unknown) === 1;
        return {
          id: b.id,
          title: b.title,
          author: b.author,
          is_paid: isPaid,
          cover: coverUrl,
          priceLabel: isPaid ? `$${Number(b.price).toLocaleString()}` : "Bilaash",
          pages: b.pages ?? undefined,
          rating: b.average_rating ? Number(b.average_rating).toFixed(1) : undefined,
          category: b.category,
        };
      });
    }
  } catch (err) {
    console.error("Error fetching related books:", err);
  }

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("so-SO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0] text-[#201B16]">
      {/* ── JSON-LD BlogPosting Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt ?? "",
            image: post.featured_image ? [post.featured_image] : undefined,
            datePublished: post.created_at,
            inLanguage: "so",
            author: {
              "@type": "Organization",
              name: "IsmailBooks",
              url: "https://ismailbooks.com",
            },
            publisher: {
              "@type": "Organization",
              name: "IsmailBooks",
              url: "https://ismailbooks.com",
            },
          }),
        }}
      />

      <Navbar />

      <main className="flex-grow py-8 sm:py-12">
        <div className="container-site">
          <article className="max-w-[840px] mx-auto">

            {/* ── Breadcrumb Navigation ── */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center flex-wrap gap-1.5 text-xs text-[#6B5F52]">
                <li>
                  <Link href="/" className="hover:text-[#7A1F2B] transition-colors no-underline">
                    Boga Hore
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-[#E8DFD2]" />
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[#7A1F2B] transition-colors no-underline">
                    Qoraallada
                  </Link>
                </li>
                {categoryName && categorySlug && (
                  <>
                    <li>
                      <ChevronRight className="w-3.5 h-3.5 text-[#E8DFD2]" />
                    </li>
                    <li className="font-semibold text-[#1F3A54] truncate max-w-[160px] sm:max-w-none">
                      <Link
                        href={`/blog/category/${categorySlug}`}
                        className="hover:text-[#7A1F2B] transition-colors no-underline"
                      >
                        {categoryName}
                      </Link>
                    </li>
                  </>
                )}
              </ol>
            </nav>

            {/* ── Article Header ── */}
            <header className="max-w-[720px] mx-auto text-left mb-8">
              {categoryName && (
                <div className="mb-4">
                  <span className="badge badge-navy">
                    {categoryName}
                  </span>
                </div>
              )}

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#201B16] leading-[1.18] tracking-tight mb-5">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="font-serif italic text-lg sm:text-xl text-[#6B5F52] leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              )}

              {/* Author & Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#E8DFD2] text-xs text-[#6B5F52]">
                <div className="flex items-center gap-3">
                  {/* Initials Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center font-extrabold text-sm shadow-xs select-none">
                    IB
                  </div>
                  <div>
                    <span className="font-bold text-[#201B16] text-sm block leading-tight">
                      IsmailBooks
                    </span>
                    <span className="text-[11px] text-[#6B5F52]">
                      Qoraaga Madasha
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  {formattedDate && (
                    <time dateTime={post.created_at ?? undefined} className="font-medium">
                      {formattedDate}
                    </time>
                  )}
                  {post.estimated_read_time && (
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#C9962E]" />
                      {post.estimated_read_time} daqiiqo akhris
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 font-medium hidden xs:inline-flex">
                    <Eye className="w-3.5 h-3.5 text-[#1F3A54]" />
                    {(post.view_count ?? 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </header>

            {/* ── Featured Image ── */}
            {post.featured_image && (
              <figure className="max-w-[720px] mx-auto mb-8 rounded-2xl overflow-hidden border border-[#E8DFD2] shadow-xs">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  loading="eager"
                  className="w-full max-h-[420px] object-cover"
                />
              </figure>
            )}

            {/* ── Main Interactive Article Reader Shell (Client Component) ── */}
            <div className="mb-14 max-w-[720px] mx-auto">
              <BlogArticleShell
                title={post.title}
                slug={post.slug}
                content={post.content ?? ""}
              />
            </div>

            {/* ── Commerce Bridge Section ── */}
            <section className="my-16 pt-10 border-t border-[#E8DFD2] max-w-[720px] mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-[#7A1F2B]" />
                <h2 className="font-display text-2xl font-extrabold text-[#201B16]">
                  Buugaag la xiriira
                </h2>
              </div>

              {/* Related Books Cards */}
              {relatedBooksData.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  {relatedBooksData.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              )}

              {/* High Impact Inline Bookstore CTA Banner */}
              <div className="panel bg-gradient-to-r from-[#FBF7F0] via-[#FFFFFF] to-[#F7F1E5] border border-[#C9962E]/30 relative overflow-hidden p-6 sm:p-8 rounded-3xl shadow-sm">
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div className="space-y-1.5 max-w-md">
                    <span className="badge badge-gold">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Maktabadda IsmailBooks
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#201B16]">
                      Ma rabtaa buugga oo buuxa?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B5F52] leading-relaxed">
                      Eeg kumanaan buug oo af-Soomaali ku qoran, kuwo bilaash ah iyo kuwo gaar ah oo aad isla markiba akhrisan karto.
                    </p>
                  </div>

                  <Link
                    href="/books"
                    className="btn btn-primary min-h-[48px] px-6 text-sm font-extrabold whitespace-nowrap shadow-sm hover:scale-[1.02] transition-transform no-underline"
                  >
                    Sahami Maktabadda
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </section>

            {/* ── Article Footer ── */}
            <footer className="mt-12 pt-8 border-t border-[#E8DFD2] max-w-[720px] mx-auto space-y-10">
              
              {/* Author Bio Card */}
              <div className="surface-card flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 bg-white border border-[#E8DFD2] rounded-2xl">
                <div className="w-14 h-14 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center font-extrabold text-xl shrink-0 select-none shadow-sm">
                  IB
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-[#201B16]">
                    IsmailBooks Editorial
                  </h3>
                  <p className="text-xs text-[#6B5F52] leading-relaxed">
                    Ku soo dhowow IsmailBooks — madasha buugaagta digital-ka ah iyo qoraallada aqooneed ee Soomaaliyeed. Waxaan idiin soo bandhignaa falanqayn qoto dheer iyo buugaag tayo sare leh.
                  </p>
                </div>
              </div>

              {/* Prev / Next Post Links */}
              {(prevPost || nextPost) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="surface-card p-4 border border-[#E8DFD2] rounded-2xl group no-underline block"
                    >
                      <span className="text-[11px] font-bold text-[#6B5F52] flex items-center gap-1 mb-1">
                        <ArrowLeft className="w-3.5 h-3.5 text-[#7A1F2B] transition-transform group-hover:-translate-x-1" />
                        Qoraalkii Hore
                      </span>
                      <p className="font-display text-sm font-bold text-[#201B16] group-hover:text-[#7A1F2B] transition-colors line-clamp-2">
                        {prevPost.title}
                      </p>
                    </Link>
                  ) : <div />}

                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="surface-card p-4 border border-[#E8DFD2] rounded-2xl text-right group no-underline block"
                    >
                      <span className="text-[11px] font-bold text-[#6B5F52] flex items-center justify-end gap-1 mb-1">
                        Qoraalka Xiga
                        <ArrowRight className="w-3.5 h-3.5 text-[#7A1F2B] transition-transform group-hover:translate-x-1" />
                      </span>
                      <p className="font-display text-sm font-bold text-[#201B16] group-hover:text-[#7A1F2B] transition-colors line-clamp-2">
                        {nextPost.title}
                      </p>
                    </Link>
                  ) : <div />}
                </div>
              )}

              {/* Related Posts Section ("Qoraallo kale") */}
              {relatedPosts.length > 0 && (
                <div className="pt-6">
                  <h3 className="font-display text-xl font-extrabold text-[#201B16] mb-5">
                    Qoraallo kale
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {relatedPosts.map((p: any) => (
                      <Link
                        key={p.id}
                        href={`/blog/${p.slug}`}
                        className="surface-card p-5 group block no-underline border border-[#E8DFD2] rounded-2xl hover:-translate-y-1 transition-all"
                      >
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7A1F2B] mb-2 block">
                          {categoryName ?? "Blog"}
                        </span>
                        <h4 className="font-display text-sm font-bold text-[#201B16] group-hover:text-[#7A1F2B] transition-colors leading-snug mb-2 line-clamp-2">
                          {p.title}
                        </h4>
                        {p.estimated_read_time && (
                          <span className="text-xs text-[#6B5F52] flex items-center gap-1 mt-3">
                            <Clock className="w-3 h-3 text-[#C9962E]" />
                            {p.estimated_read_time} min
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </footer>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
