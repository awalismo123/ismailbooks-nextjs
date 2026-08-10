import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { FileText, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import { buildReturnTarget } from "@/lib/navigation";

export const metadata = {
  title: "Soo-koobidda Buugaagta — IsmailBooks",
  description:
    "Geli fikradaha waaweyn ee buugaagta ugu caansan adiga oo akhrinaya soo-koobidno qoto dheer oo af-Somali ah.",
};

export default async function SummariesPage() {
  const supabase = await createClient();

  // Fetch summaries from the dedicated `summaries` table
  const { data: dbSummaries } = await supabase
    .from("summaries")
    .select("*")
    .order("created_at", { ascending: false });

  // Also fetch books categorized as summaries
  const { data: bookSummaries } = await supabase
    .from("books")
    .select("*")
    .or("category.ilike.%summary%,category.ilike.%soo-koobid%")
    .eq("is_active", true);

  // Combine and format
  const combinedList = [
    ...(dbSummaries || []).map((s) => ({
      id: s.id,
      title: s.title,
      bookTitle: s.book_title || s.title,
      author: s.book_author || "IsmailBooks",
      desc: s.description || "",
      creator: s.summary_creator || "IsmailBooks",
      pages: s.pages || null,
      isPaid: s.is_paid,
      price: s.price,
      isDbSummary: true,
    })),
    ...(bookSummaries || []).map((b) => ({
      id: b.id,
      title: b.title,
      bookTitle: b.title,
      author: b.author,
      desc: b.description || "",
      creator: "IsmailBooks",
      pages: b.pages || null,
      isPaid: b.is_paid,
      price: b.price ? Number(b.price) : 0,
      isDbSummary: false,
    })),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0]">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container-site">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <span className="badge badge-gold mb-3">
              <Sparkles className="w-3 h-3" /> Soo-koobid Qoto Dheer
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#201B16] mb-4">
              Faham buugaagta ugu waaweyn daqiiqado gudaheed.
            </h1>
            <p className="text-base text-[#6B5F52]">
              Ka fiirso ururintan buugaagta ugu saamaynta badan ee loo soo koobay si aad fikradaha ugu waaweyn uga hesho waqti yar.
            </p>
          </div>

          {/* Grid */}
          {combinedList.length === 0 ? (
            <div className="surface-card text-center py-16">
              <BookOpen className="w-12 h-12 text-[#6B5F52] mx-auto mb-4 opacity-50" />
              <h3 className="font-display text-xl font-bold text-[#201B16] mb-2">
                Wali soo-koobidno ma jiraan
              </h3>
              <p className="text-sm text-[#6B5F52]">
                Waqti dhow ku soo laab si aad u hesho soo-koobidda buugaagta cusub.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {combinedList.map((sum) => (
                <div
                  key={`${sum.isDbSummary ? "db" : "bk"}-${sum.id}`}
                  className="surface-card flex flex-col justify-between hover:border-[#7A1F2B] transition-all hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`badge ${sum.isPaid ? "badge-gold" : "badge-success"}`}>
                        {sum.isPaid ? `$${sum.price}` : "Bilaash"}
                      </span>
                      {sum.pages && (
                        <span className="flex items-center gap-1 text-[11px] text-[#6B5F52] font-bold">
                          <FileText className="w-3.5 h-3.5 text-[#1F3A54]" />
                          {sum.pages} Boggag
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-extrabold text-[#201B16] mb-2">
                      {sum.title}
                    </h3>
                    <p className="text-xs text-[#7A1F2B] font-semibold mb-3">
                      Buugga Asalka ah: {sum.bookTitle} — {sum.author}
                    </p>
                    <p className="text-xs text-[#6B5F52] leading-relaxed mb-6 line-clamp-3">
                      {sum.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8DFD2] flex items-center justify-between">
                    <span className="text-[11px] text-[#6B5F52]">Soo-koobe: {sum.creator}</span>
                    <Link
                      href={sum.isDbSummary ? `/summaries/${sum.id}/read?returnTo=${buildReturnTarget("/summaries")}` : `/books/${sum.id}/read?returnTo=${buildReturnTarget("/summaries")}`}
                      className="btn btn-primary btn-sm"
                    >
                      <span>Akhri Soo-koobidda</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
