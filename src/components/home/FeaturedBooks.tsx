import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { BookCard, type BookCardData } from "@/components/books/BookCard";

const COVER_GRADIENTS = [
  "cover-gradient-1",
  "cover-gradient-2",
  "cover-gradient-3",
  "cover-gradient-4",
  "cover-gradient-5",
  "cover-gradient-6",
];

export const FeaturedBooks: React.FC = async () => {
  const supabase = await createClient();

  const { data: books } = await supabase
    .from("books")
    .select(
      "id, title, author, description, is_paid, price, category, cover_image, pages, average_rating"
    )
    .eq("is_active", true)
    .order("total_downloads", { ascending: false })
    .limit(4);

  const cards: BookCardData[] = (books ?? []).map((b, i) => {
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
      priceLabel: isPaid
        ? `$${Number(b.price).toLocaleString()}`
        : "Bilaash",
      pages: b.pages ?? undefined,
      rating: b.average_rating
        ? Number(b.average_rating).toFixed(1)
        : undefined,
      category: b.category,
    };
  });

  if (cards.length === 0) return null;

  return (
    <section className="bg-gradient-to-b from-transparent to-[#F7F1E5]/40 py-14 md:py-20">
      <div className="container-site">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-[#7A1F2B]">
              Maktabada IsmailBooks
            </span>
            <h2 className="font-display m-0 text-[clamp(28px,3.5vw,40px)] font-extrabold leading-tight text-[#201B16]">
              Buugaagta Ugu Caansan
            </h2>
            <p className="m-0 mt-2 max-w-xl text-sm leading-relaxed text-[#6B5F52] md:text-base">
              Dooro buugaagta ugu waaweyn ee Af-Soomaaliga — cilmi-nafsiga,
              falsafadda, iyo horumar shaqsiyeed.
            </p>
            {/* Bookmark ribbon */}
            <div className="relative mt-5 h-[3px] w-40 rounded-full bg-[#E8DFD2]">
              <div className="absolute left-0 top-0 h-full w-16 rounded-full bg-[#C9962E]" />
              <div className="absolute left-[4.5rem] top-0 h-full w-6 rounded-full bg-[#7A1F2B]" />
            </div>
          </div>

          <Link
            href="/books"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-[#1F3A54] no-underline transition-all hover:translate-x-1 hover:text-[#7A1F2B]"
          >
            <span>Dhammaantood eeg</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {cards.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};