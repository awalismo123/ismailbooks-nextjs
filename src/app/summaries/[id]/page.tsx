import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookCard, type BookCardData } from "@/components/books/BookCard";
import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { buildReturnTarget } from "@/lib/navigation";
import { canReadSummary } from "@/lib/permissions";
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
  UserCheck,
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
  const { data: summary } = await supabase
    .from("summaries")
    .select("title, description")
    .eq("id", id)
    .single();

  return {
    title: summary ? `${summary.title} — IsmailBooks` : "Soo-koobid — IsmailBooks",
    description: summary?.description ?? "",
  };
}

export default async function SummaryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const adminSupabase = await createAdminClient();
  const supabase = adminSupabase;

  /* ── Fetch summary ── */
  const { data: summary } = await supabase
    .from("summaries")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (!summary) notFound();

  // Increment view count
  await supabase
    .from("summaries")
    .update({ views: (summary.views || 0) + 1 })
    .eq("id", id);

  const isPaid = summary.is_paid === true || summary.is_paid === 1;

  let coverUrl = COVER_GRADIENTS[Number(id) % COVER_GRADIENTS.length];
  if (summary.cover_image) {
    if (summary.cover_image.startsWith("http")) {
      coverUrl = summary.cover_image;
    } else {
      const { data: pub } = supabase.storage
        .from("covers")
        .getPublicUrl(summary.cover_image);
      coverUrl = pub.publicUrl;
    }
  }

  /* ── Ownership check via shared canReadSummary utility ── */
  const currentUser = await getCurrentUser();
  const authResult = await canReadSummary(currentUser, summary.id);
  const userOwnsBook = authResult.isOwned;

  const price = summary.price ? Number(summary.price).toLocaleString() : "0";
  const readTime = summary.reading_time_minutes
    ? summary.reading_time_minutes
    : summary.pages
      ? Math.round(summary.pages / 2)
      : 5;

  /* ── Related summaries ── */
  const { data: related } = await supabase
    .from("summaries")
    .select(
      "id, title, book_author, is_paid, price, pages, category, cover_image"
    )
    .eq("is_published", true)
    .neq("id", summary.id)
    .limit(4);

  const relatedCards: BookCardData[] = (related ?? []).map((s, i) => {
    let relCover = COVER_GRADIENTS[(i + 2) % COVER_GRADIENTS.length];
    if (s.cover_image) {
      if (s.cover_image.startsWith("http")) {
        relCover = s.cover_image;
      } else {
        const { data } = supabase.storage
          .from("covers")
          .getPublicUrl(s.cover_image);
        relCover = data.publicUrl;
      }
    }
    const relPaid = s.is_paid === true || (s.is_paid as unknown) === 1;
    return {
      id: s.id,
      title: s.title,
      author: s.book_author,
      is_paid: relPaid,
      cover: relCover,
      priceLabel: relPaid
        ? `$${Number(s.price).toLocaleString()}`
        : "Bilaash",
      pages: s.pages ?? undefined,
      category: s.category,
      href: `/summaries/${s.id}`,
    };
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0]">
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
              href="/summaries"
              className="no-underline transition-colors hover:text-[#7A1F2B]"
            >
              Soo-koobid
            </Link>
            <span>/</span>
            <span className="line-clamp-1 font-semibold text-[#201B16]">
              {summary.title}
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
                      alt={summary.title}
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
                          {summary.title}
                        </p>
                        {summary.book_author && (
                          <p className="mt-2 text-sm text-white/70">
                            {summary.book_author}
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
                <div className="rounded-xl border border-[#E8DFD2] bg-white p-3 text-center">
                  <Star className="mx-auto mb-1 h-4 w-4 fill-[#C9962E] text-[#C9962E]" />
                  <span className="block text-sm font-extrabold text-[#201B16]">
                    4.9
                  </span>
                  <span className="text-[10px] font-semibold text-[#6B5F52]">
                    Rating
                  </span>
                </div>
                <div className="rounded-xl border border-[#E8DFD2] bg-white p-3 text-center">
                  <FileText className="mx-auto mb-1 h-4 w-4 text-[#1F3A54]" />
                  <span className="block text-sm font-extrabold text-[#201B16]">
                    {summary.pages ?? "—"}
                  </span>
                  <span className="text-[10px] font-semibold text-[#6B5F52]">
                    Boggag
                  </span>
                </div>
                {readTime && (
                  <div className="rounded-xl border border-[#E8DFD2] bg-white p-3 text-center">
                    <Clock className="mx-auto mb-1 h-4 w-4 text-[#7A1F2B]" />
                    <span className="block text-sm font-extrabold text-[#201B16]">
                      {readTime}m
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
                {summary.category && (
                  <span className="mb-3 inline-block rounded-full bg-[rgba(31,58,84,0.08)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#1F3A54]">
                    {summary.category}
                  </span>
                )}
                <h1 className="font-display text-3xl font-extrabold leading-tight text-[#201B16] sm:text-4xl">
                  {summary.title}
                </h1>
                {summary.book_title && (
                  <p className="mt-2 text-base font-semibold text-[#7A1F2B]">
                    Buugga: {summary.book_title} {summary.book_author ? `— ${summary.book_author}` : ""}
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
                            Soo-koobkan waa kuu furan yahay!
                          </span>
                        </div>
                        <Link
                          href={`/summaries/${summary.id}/read?returnTo=${buildReturnTarget(`/summaries/${summary.id}`)}`}
                          className="btn btn-success btn-block"
                        >
                          <BookOpen className="h-4 w-4" />
                          Akhriso Soo-koobka
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href={currentUser ? `/payment/${summary.id}?type=summary` : `/login?redirect=${encodeURIComponent(`/summaries/${summary.id}`)}`}
                          className="btn btn-primary btn-block"
                        >
                          <CreditCard className="h-4 w-4" />
                          {currentUser ? "Iibso Soo-koobkan" : "Gal si aad u Iibsato"}
                        </Link>
                      </>
                    )
                  ) : (
                    <Link
                      href={`/summaries/${summary.id}/read?returnTo=${buildReturnTarget(`/summaries/${summary.id}`)}`}
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
                      Nuxurka muhiimka ah oo kooban
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#2E7D5B]" />
                      Waqti badbaadin ({readTime} daqiiqo)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#2E7D5B]" />
                      Qodobada ugu muhiimsan buugga
                    </li>
                  </ul>
                </div>
              </div>

              {/* Description */}
              {summary.description && (
                <div>
                  <h2 className="font-display mb-3 text-xl font-bold text-[#201B16]">
                    Ku saabsan Soo-koobkan
                  </h2>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-[#6B5F52]">
                    {summary.description}
                  </p>
                </div>
              )}
              
              {summary.summary_creator && (
                <div className="flex items-center gap-2 mt-4 text-sm font-semibold text-[#1F3A54]">
                  <UserCheck className="w-4 h-4" />
                  Soo-koobe: {summary.summary_creator}
                </div>
              )}
            </div>
          </div>

          {/* ══════════ RELATED SUMMARIES ══════════ */}
          {relatedCards.length > 0 && (
            <section className="mt-16 border-t border-[#E8DFD2] pt-12">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-[#201B16]">
                    Soo-koobid la mid ah
                  </h2>
                  <p className="mt-1 text-sm text-[#6B5F52]">
                    Wax badan ka baro waqti yar.
                  </p>
                </div>
                <Link
                  href="/summaries"
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
        <div className="container-site flex items-center justify-between gap-2">
          <div className="min-w-[4.5rem] shrink-0">
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
                href={`/summaries/${summary.id}/read?returnTo=${buildReturnTarget(`/summaries/${summary.id}`)}`}
                className="btn btn-success flex-1"
              >
                <BookOpen className="h-4 w-4" />
                Akhriso
              </Link>
            ) : (
              <div className="flex flex-1 gap-2 min-w-0">
                <Link
                  href={
                    currentUser
                      ? `/payment/${summary.id}?type=summary`
                      : `/login?redirect=${encodeURIComponent(`/summaries/${summary.id}`)}`
                  }
                  className="btn btn-primary flex-1 !px-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Iibso
                </Link>
              </div>
            )
          ) : (
            <Link
              href={`/summaries/${summary.id}/read?returnTo=${buildReturnTarget(`/summaries/${summary.id}`)}`}
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
