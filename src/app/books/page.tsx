import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { BookOpen } from "lucide-react";
import BooksClientFilter from "@/components/books/BooksClientFilter";

export const metadata = {
  title: "Maktabada Buugaagta — IsmailBooks",
  description:
    "Brawsarso buugaagta cilmi-nafsiga, falsafadda iyo buugaagta tayada sare leh ee Af-Soomaali.",
  openGraph: {
    title: "Maktabada Buugaagta — IsmailBooks",
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

export default async function BooksPage() {
  const supabase = await createClient();

  const { data: books, error } = await supabase
    .from("books")
    .select("id, title, author, description, is_paid, price, pages, average_rating, category, cover_image")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Books fetch error:", error);
  }

  const allBooks = (books ?? []).map((b, i) => {
    let coverUrl = COVER_GRADIENTS[i % COVER_GRADIENTS.length];
    if (b.cover_image) {
      const { data: publicUrlData } = supabase.storage.from("covers").getPublicUrl(b.cover_image);
      coverUrl = publicUrlData.publicUrl;
    }

    return {
      ...b,
      is_paid: b.is_paid === true || b.is_paid === 1,
      cover: coverUrl,
      rating: b.average_rating ? String(Number(b.average_rating).toFixed(1)) : "—",
      desc: b.description ?? "",
      price: b.price ? String(b.price) : "0.00",
      pages: b.pages ?? 0,
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: allBooks.slice(0, 20).map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.title,
      url: `/books/${b.id}`,
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
                  Buugaagta
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-[#6B5F52] sm:text-base">
                  Brawsarso buugaagta cilmi-nafsiga, falsafadda iyo buugaagta
                  tayada sare leh ee Af-Soomaali.
                </p>
              </div>

              {/* Live book count */}
              <div className="flex items-center gap-3 md:pb-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E8DFD2] bg-white px-4 py-2 text-sm font-bold text-[#1F3A54] shadow-sm">
                  <BookOpen className="h-4 w-4 text-[#7A1F2B]" />
                  {allBooks.length} buug
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
          <BooksClientFilter books={allBooks} />
        </div>
      </main>
      <Footer />
    </div>
  );
}