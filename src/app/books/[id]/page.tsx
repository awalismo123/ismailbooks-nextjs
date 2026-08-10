import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookCard, type BookCardData } from "@/components/books/BookCard";
import ReviewForm from "@/components/books/ReviewForm";
import { notFound } from "next/navigation";
import { buildReturnTarget } from "@/lib/navigation";
import { canReadBook } from "@/lib/permissions";
import Link from "next/link";
import {
  BookOpen,
  Star,
  Clock,
  ArrowLeft,
  CreditCard,
  CheckCircle2,
  FileText,
  MessageCircle,
  ShieldCheck,
  List,
  Lock,
} from "lucide-react";

const COVER_GRADIENTS = [
  "cover-gradient-1",
  "cover-gradient-2",
  "cover-gradient-3",
  "cover-gradient-4",
  "cover-gradient-5",
  "cover-gradient-6",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createAdminClient();
  const { data: book } = await supabase
    .from("books")
    .select("title, description")
    .eq("id", id)
    .single();

  return {
    title: book ? `${book.title} — IsmailBooks` : "Buug — IsmailBooks",
    description: book?.description ?? "",
    openGraph: {
      title: book ? `${book.title} — IsmailBooks` : "IsmailBooks",
      description: book?.description ?? "",
      type: "article",
      locale: "so_SO",
    },
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const adminSupabase = await createAdminClient();
  const supabase = adminSupabase;

  /* ── Fetch book ── */
  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (!book) notFound();

  const isPaid = book.is_paid === true || book.is_paid === 1;

  let coverUrl = COVER_GRADIENTS[Number(id) % COVER_GRADIENTS.length];
  if (book.cover_image) {
    const { data: pub } = supabase.storage
      .from("covers")
      .getPublicUrl(book.cover_image);
    coverUrl = pub.publicUrl;
  }

  /* ── Ownership check via shared canReadBook utility ── */
  const currentUser = await getCurrentUser();
  const authResult = await canReadBook(currentUser, book.id);
  const userOwnsBook = authResult.isOwned;
  const user = currentUser; // keep for review query below

  // Fetch user's existing review
  let userReview = null;
  if (currentUser) {
    const { data } = await adminSupabase
      .from("book_reviews")
      .select("*")
      .eq("user_id", currentUser.id)
      .eq("book_id", book.id)
      .maybeSingle();
    userReview = data;
  }

  // Fetch TOC from storage
  let tocItems: { title: string; file: string }[] = [];
  try {
    const { data: pubUrl } = supabase.storage
      .from("book-content")
      .getPublicUrl(`${book.id}/toc.json`);
    if (pubUrl?.publicUrl) {
      const res = await fetch(pubUrl.publicUrl, { next: { revalidate: 60 } });
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json)) tocItems = json;
      }
    }
  } catch {}

  const price = book.price ? Number(book.price).toLocaleString() : "0";
  const readTime = book.reading_time_estimate
    ? Math.round(book.reading_time_estimate / 60)
    : book.pages
      ? Math.round(book.pages / 30)
      : null;

  /* ── Related books ── */
  const { data: related } = await supabase
    .from("books")
    .select(
      "id, title, author, is_paid, price, pages, average_rating, category, cover_image"
    )
    .eq("is_active", true)
    .neq("id", book.id)
    .limit(4);

  const relatedCards: BookCardData[] = (related ?? []).map((b, i) => {
    let relCover = COVER_GRADIENTS[(i + 2) % COVER_GRADIENTS.length];
    if (b.cover_image) {
      const { data } = supabase.storage
        .from("covers")
        .getPublicUrl(b.cover_image);
      relCover = data.publicUrl;
    }
    const relPaid = b.is_paid === true || (b.is_paid as unknown) === 1;
    return {
      id: b.id,
      title: b.title,
      author: b.author,
      is_paid: relPaid,
      cover: relCover,
      priceLabel: relPaid
        ? `$${Number(b.price).toLocaleString()}`
        : "Bilaash",
      pages: b.pages ?? undefined,
      rating: b.average_rating
        ? Number(b.average_rating).toFixed(1)
        : undefined,
      category: b.category,
    };
  });

  /* ── JSON-LD ── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: book.author
      ? { "@type": "Person", name: book.author }
      : undefined,
    description: book.description ?? "",
    image: coverUrl.startsWith("http") ? coverUrl : undefined,
    inLanguage: "so",
    offers: {
      "@type": "Offer",
      price: book.price ?? 0,
      priceCurrency: "SOS",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* pb-28 on mobile so sticky CTA doesn't cover content */}
      <main className="flex-grow pb-28 pt-8 lg:pb-16">
        <div className="container-site">
          {/* ── Breadcrumb ── */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-[#6B5F52]">
            <Link
              href="/"
              className="no-underline transition-colors hover:text-[#7A1F2B]"
            >
              Boga Hore
            </Link>
            <span>/</span>
            <Link
              href="/books"
              className="no-underline transition-colors hover:text-[#7A1F2B]"
            >
              Buugaagta
            </Link>
            <span>/</span>
            <span className="line-clamp-1 font-semibold text-[#201B16]">
              {book.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* ══════════ COVER COLUMN ══════════ */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-sm">
                {/* Cover */}
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl shadow-[0_24px_60px_-12px_rgba(32,27,22,0.25)]">
                  {coverUrl.startsWith("http") ? (
                    <img
                      src={coverUrl}
                      alt={book.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 flex flex-col justify-between p-6 ${coverUrl}`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                        IsmailBooks
                      </span>
                      <div>
                        <p className="font-display text-2xl font-bold leading-tight text-white">
                          {book.title}
                        </p>
                        {book.author && (
                          <p className="mt-2 text-sm text-white/70">
                            {book.author}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Spine shadow */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/25 to-transparent" />
                </div>

                {/* Floating badge */}
                <div className="absolute -right-2 -top-2 z-10 sm:-right-3 sm:-top-3">
                  <span
                    className={`badge shadow-md ${isPaid ? "badge-gold" : "badge-success"}`}
                  >
                    {isPaid ? "Premium" : "Bilaash"}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="mx-auto mt-6 grid max-w-sm grid-cols-3 gap-3">
                {book.average_rating && (
                  <div className="rounded-xl border border-[#E8DFD2] bg-white p-3 text-center">
                    <Star className="mx-auto mb-1 h-4 w-4 fill-[#C9962E] text-[#C9962E]" />
                    <span className="block text-sm font-extrabold text-[#201B16]">
                      {Number(book.average_rating).toFixed(1)}
                    </span>
                    <span className="text-[10px] font-semibold text-[#6B5F52]">
                      Rating
                    </span>
                  </div>
                )}
                <div className="rounded-xl border border-[#E8DFD2] bg-white p-3 text-center">
                  <FileText className="mx-auto mb-1 h-4 w-4 text-[#1F3A54]" />
                  <span className="block text-sm font-extrabold text-[#201B16]">
                    {book.pages ?? "—"}
                  </span>
                  <span className="text-[10px] font-semibold text-[#6B5F52]">
                    Boggag
                  </span>
                </div>
                {readTime && (
                  <div className="rounded-xl border border-[#E8DFD2] bg-white p-3 text-center">
                    <Clock className="mx-auto mb-1 h-4 w-4 text-[#7A1F2B]" />
                    <span className="block text-sm font-extrabold text-[#201B16]">
                      {readTime}h
                    </span>
                    <span className="text-[10px] font-semibold text-[#6B5F52]">
                      Akhris
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ══════════ DETAIL COLUMN ══════════ */}
            <div className="space-y-8 lg:col-span-7">
              {/* Title */}
              <div>
                {book.category && (
                  <span className="mb-3 inline-block rounded-full bg-[rgba(31,58,84,0.08)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#1F3A54]">
                    {book.category}
                  </span>
                )}
                <h1 className="font-display text-3xl font-extrabold leading-tight text-[#201B16] sm:text-4xl">
                  {book.title}
                </h1>
                {book.author && (
                  <p className="mt-2 text-base font-semibold text-[#7A1F2B]">
                    Qoraa: {book.author}
                  </p>
                )}
              </div>

              {/* ── Buy box ── */}
              <div className="rounded-2xl border border-[#E8DFD2] bg-white p-5 shadow-sm sm:p-6">
                {/* Price + methods */}
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="block text-xs font-semibold text-[#6B5F52]">
                      Qiimaha
                    </span>
                    <span className="font-display text-3xl font-extrabold text-[#201B16]">
                      {isPaid ? `$${price}` : "Bilaash"}
                    </span>
                  </div>
                  {isPaid && (
                    <div className="flex items-center gap-2">
                      {["EVC", "Zaad", "eDahab"].map((m) => (
                        <span
                          key={m}
                          className="rounded-lg border border-[#E8DFD2] bg-[#FBF7F0] px-2.5 py-1.5 text-[11px] font-extrabold text-[#1F3A54]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA buttons */}
                <div className="mt-5 space-y-3">
                  {isPaid ? (
                    userOwnsBook ? (
                      <>
                        <div className="trust-line">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2E7D5B]" />
                          <span className="font-bold">
                            Buuggan waa kuu furan yahay!
                          </span>
                        </div>
                        <Link
                          href={`/books/${book.id}/read?returnTo=${buildReturnTarget(`/books/${book.id}`)}`}
                          className="btn btn-success btn-block"
                        >
                          <BookOpen className="h-4 w-4" />
                          akhriso bugaaga / read your book
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href={currentUser ? `/payment/${book.id}` : `/login?redirect=${encodeURIComponent(`/books/${book.id}`)}`}
                          className="btn btn-primary btn-block"
                        >
                          <CreditCard className="h-4 w-4" />
                          {currentUser ? "Iibso Buuggan" : "Gal si aad u Iibsato"}
                        </Link>
                        <Link
                          href={`/books/${book.id}/read?preview=true&returnTo=${buildReturnTarget(`/books/${book.id}`)}`}
                          className="btn btn-secondary btn-block"
                        >
                          <BookOpen className="h-4 w-4" />
                          Akhriso Preview (Cutubka 1-aad)
                        </Link>
                      </>
                    )
                  ) : (
                    <Link
                      href={`/books/${book.id}/read?returnTo=${buildReturnTarget(`/books/${book.id}`)}`}
                      className="btn btn-success btn-block"
                    >
                      <BookOpen className="h-4 w-4" />
                      Akhri Bilaash
                    </Link>
                  )}
                </div>

                {/* Trust signals */}
                {isPaid && !userOwnsBook && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#6B5F52]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#2E7D5B]" />
                      <span>Ansixin 24 saacadood gudahood</span>
                    </div>
                    <a
                      href="https://wa.me/252636475579"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-semibold text-[#1F3A54] no-underline transition-colors hover:text-[#7A1F2B]"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Caawimo? WhatsApp: +252 63 6475579</span>
                    </a>
                  </div>
                )}

                {/* What's included */}
                <div className="mt-5 border-t border-[#E8DFD2] pt-4">
                  <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-[#6B5F52]">
                    Waxa ku jira
                  </p>
                  <ul className="space-y-1.5 text-sm text-[#6B5F52]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#2E7D5B]" />
                      Akhris buuxa oo online ah
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#2E7D5B]" />
                      Mobile iyo desktop
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#2E7D5B]" />
                      Bookmark iyo reading progress
                    </li>
                  </ul>
                </div>
              </div>

              {/* Description */}
              {book.description && (
                <div>
                  <h2 className="font-display mb-3 text-xl font-bold text-[#201B16]">
                    Ku saabsan Buuggan
                  </h2>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-[#6B5F52]">
                    {book.description}
                  </p>
                </div>
              )}

              {/* ── Table of Contents (TOC) Preview ── */}
              {tocItems.length > 0 && (
                <div className="pt-6 border-t border-[#E8DFD2]">
                  <h2 className="font-display mb-4 text-xl font-bold text-[#201B16] flex items-center gap-2">
                    <List className="h-5 w-5 text-[#7A1F2B]" />
                    Tusaha Cutubyada ({tocItems.length})
                  </h2>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {tocItems.map((ch, idx) => {
                      const isUnlocked = !isPaid || userOwnsBook || idx === 0;
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-xl border border-[#E8DFD2] bg-white p-3 text-xs font-bold text-[#201B16] shadow-sm transition-all hover:border-[#1F3A54]/30"
                        >
                          <div className="flex items-center gap-2.5 truncate pr-2">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#FBF7F0] text-[11px] font-extrabold text-[#7A1F2B]">
                              {idx + 1}
                            </span>
                            <span className="truncate">{ch.title}</span>
                          </div>
                          {isUnlocked ? (
                            <span className="shrink-0 rounded-md bg-[#2E7D5B]/10 px-2 py-0.5 text-[10px] font-extrabold text-[#2E7D5B]">
                              {idx === 0 && isPaid && !userOwnsBook ? "Preview" : "Furan"}
                            </span>
                          ) : (
                            <Lock className="h-3.5 w-3.5 shrink-0 text-[#C9962E]" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Review Form (only if user owns book) */}
              {currentUser && userOwnsBook && (
                <div className="pt-8 border-t border-[#E8DFD2]">
                  <ReviewForm bookId={book.id} userReview={userReview} />
                </div>
              )}
            </div>
          </div>

          {/* ══════════ RELATED BOOKS ══════════ */}
          {relatedCards.length > 0 && (
            <section className="mt-16 border-t border-[#E8DFD2] pt-12">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-[#201B16]">
                    Buugaag la mid ah
                  </h2>
                  <p className="mt-1 text-sm text-[#6B5F52]">
                    Akhristayaasha kale waxay kaloo jeclaayeen kuwan.
                  </p>
                </div>
                <Link
                  href="/books"
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-extrabold text-[#1F3A54] no-underline transition-colors hover:text-[#7A1F2B]"
                >
                  Dhammaan
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {relatedCards.map((b) => (
                  <BookCard key={b.id} book={b} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* ══════════ STICKY MOBILE CTA ══════════ */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E8DFD2] bg-white/95 p-3 backdrop-blur-md lg:hidden">
        <div className="container-site flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] font-semibold text-[#6B5F52]">
              {isPaid ? "Qiimaha" : "Bilaash"}
            </span>
            <span className="font-display text-lg font-extrabold text-[#201B16]">
              {isPaid ? `$${price}` : "Bilaash"}
            </span>
          </div>

          {isPaid ? (
            userOwnsBook ? (
              <Link
                href={`/books/${book.id}/read?returnTo=${buildReturnTarget(`/books/${book.id}`)}`}
                className="btn btn-success flex-1"
              >
                <BookOpen className="h-4 w-4" />
                akhriso bugaaga / read your book
              </Link>
            ) : (
              <Link
                href={`/payment/${book.id}`}
                className="btn btn-primary flex-1"
              >
                <CreditCard className="h-4 w-4" />
                Iibso Hadda
              </Link>
            )
          ) : (
            <Link
              href={`/books/${book.id}/read?returnTo=${buildReturnTarget(`/books/${book.id}`)}`}
              className="btn btn-success flex-1"
            >
              <BookOpen className="h-4 w-4" />
              Akhri Bilaash
            </Link>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}