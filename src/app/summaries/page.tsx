import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { BookOpen } from "lucide-react";
import BooksClientFilter from "@/components/books/BooksClientFilter";

export const metadata = {
  title: "Soo-koobid — IsmailBooks",
  description:
    "Faham buugaagta ugu waaweyn daqiiqado gudaheed. Soo-koobidno qoto dheer oo af-Somali ah.",
  openGraph: {
    title: "Soo-koobid — IsmailBooks",
    locale: "so_SO",
  },
};

const COVER_GRADIENTS = [
  "cover-gradient-1",
  "cover-gradient-2",
  "cover-gradient-3",
  "cover-gradient-4",
  "cover-gradient-5",
  "cover-gradient-6",
];

export default async function SummariesPage() {
  const supabase = await createClient();

  const { data: summaries, error } = await supabase
    .from("summaries")
    .select("id, title, book_author, summary_creator, description, is_paid, price, pages, category, cover_image")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Summaries fetch error:", error);
  }

  const allSummaries = (summaries ?? []).map((s, i) => {
    let coverUrl = COVER_GRADIENTS[i % COVER_GRADIENTS.length];
    if (s.cover_image) {
      if (s.cover_image.startsWith("http")) {
        coverUrl = s.cover_image;
      } else {
        const { data: publicUrlData } = supabase.storage.from("covers").getPublicUrl(s.cover_image);
        coverUrl = publicUrlData.publicUrl;
      }
    }

    return {
      ...s,
      // Map summary fields to book-like fields for the BooksClientFilter
      author: s.summary_creator || s.book_author || "IsmailBooks",
      is_paid: s.is_paid === true || (s.is_paid as unknown) === 1,
      cover: coverUrl,
      rating: "—", // Summaries don't have average_rating natively yet
      desc: s.description ?? "",
      price: s.price ? String(s.price) : "0.00",
      pages: s.pages ?? 0,
      isSummary: true, // Custom flag to help with links
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: allSummaries.slice(0, 20).map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `/summaries/${s.id}`,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-grow">
        {/* Library header */}
        <header className="border-b border-[#E8DFD2] bg-gradient-to-b from-white to-[#FBF7F0]">
          <div className="container-site py-10 sm:py-14">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <span className="eyebrow">Maktabada IsmailBooks</span>
                <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-[#201B16] sm:text-5xl">
                  Soo-koobid
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-[#6B5F52] sm:text-base">
                  Faham buugaagta ugu waaweyn daqiiqado gudaheed. Soo-koobidno qoto dheer oo af-Somali ah.
                </p>
              </div>

              {/* Live book count */}
              <div className="flex items-center gap-3 md:pb-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E8DFD2] bg-white px-4 py-2 text-sm font-bold text-[#1F3A54] shadow-sm">
                  <BookOpen className="h-4 w-4 text-[#7A1F2B]" />
                  {allSummaries.length} soo-koobid
                </span>
              </div>
            </div>

            {/* Bookmark ribbon rule */}
            <div className="relative mt-8 h-[3px] w-full rounded-full bg-[#E8DFD2]">
              <div className="absolute left-0 top-0 h-full w-24 rounded-full bg-[#C9962E]" />
              <div className="absolute left-[6.5rem] top-0 h-full w-10 rounded-full bg-[#7A1F2B]" />
            </div>
          </div>
        </header>

        <div className="container-site py-8 sm:py-10">
          <BooksClientFilter books={allSummaries} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
