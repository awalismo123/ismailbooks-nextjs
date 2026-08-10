import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Star, BookOpen, Sparkles, UserCheck } from "lucide-react";

import { buildReturnTarget, parseReturnTarget } from "@/lib/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
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
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ returnTo?: string }>;
}) {
  const { id } = await params;
  const { returnTo } = (await searchParams) || {};
  const supabase = await createClient();

  const { data: summary } = await supabase
    .from("summaries")
    .select("*")
    .eq("id", id)
    .single();

  if (!summary) {
    notFound();
  }

  // Increment view count
  await supabase
    .from("summaries")
    .update({ views: (summary.views || 0) + 1 })
    .eq("id", id);

  const isPaid = summary.is_paid === true || (summary.is_paid as unknown) === 1;
  const priceLabel = isPaid ? `$${Number(summary.price || 0).toLocaleString()}` : "Free";
  const backTarget = parseReturnTarget(returnTo, "public", "/summaries");

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0]">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container-site max-w-4xl">
          <Link
            href={backTarget}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#6B5F52] hover:text-[#7A1F2B] mb-8 no-underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ku laabo
          </Link>

          <header className="surface-card mb-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`badge ${isPaid ? "badge-gold" : "badge-success"}`}>
                  {priceLabel}
                </span>
                {summary.pages && (
                  <span className="flex items-center gap-1 text-xs text-[#6B5F52] font-semibold">
                    <FileText className="w-3.5 h-3.5 text-[#1F3A54]" />
                    {summary.pages} Boggag
                  </span>
                )}
                {summary.summary_creator && (
                  <span className="flex items-center gap-1 text-xs text-[#1F3A54] font-semibold">
                    <UserCheck className="w-3.5 h-3.5" />
                    Soo-koobe: {summary.summary_creator}
                  </span>
                )}
              </div>
              <Link
                href={`/summaries/${summary.id}/read?returnTo=${buildReturnTarget(`/summaries/${summary.id}`)}`}
                className="btn btn-primary btn-sm"
              >
                <BookOpen className="w-4 h-4" />
                Fooran Akhriska Buuxa (Reader Mode)
              </Link>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#201B16] mb-3">
              {summary.title}
            </h1>
            {summary.book_title && (
              <p className="text-[#7A1F2B] font-extrabold text-base mb-3">
                Buugga Asalka ah: {summary.book_title} {summary.book_author ? `— ${summary.book_author}` : ""}
              </p>
            )}
            {summary.description && (
              <p className="text-sm text-[#6B5F52] leading-relaxed">{summary.description}</p>
            )}
          </header>

          <article className="surface-card space-y-6 text-sm text-[#201B16] leading-relaxed font-reader">
            <div
              className="prose max-w-none prose-headings:font-display prose-headings:font-extrabold prose-headings:text-[#7A1F2B] prose-p:leading-relaxed prose-p:mb-4"
              dangerouslySetInnerHTML={{ __html: summary.content_html || "<p>Nuxurka soo-koobidda lagama helin.</p>" }}
            />
          </article>

          <div className="mt-12 surface-card flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-display font-extrabold text-[#201B16]">Si aad ah oo buuxa buugga u akhriso</p>
              <p className="text-xs text-[#6B5F52]">Daraaseey maktabadaada buugaagta si aad buugaagta kale oo dhan u hesho.</p>
            </div>
            <Link href="/books" className="btn btn-primary btn-sm shrink-0">
              <BookOpen className="w-4 h-4" />
              Daraaseey Maktabada
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
