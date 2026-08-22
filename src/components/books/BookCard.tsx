import Link from "next/link";
import { ArrowRight, BookOpen, Star } from "lucide-react";

export type BookCardData = {
  id: number | string;
  title: string;
  author: string;
  is_paid: boolean;
  cover: string;
  priceLabel: string;
  pages?: number;
  rating?: string;
  category?: string | null;
  href?: string;
};

export function BookCard({ book }: { book: BookCardData }) {
  const isGradient = book.cover.startsWith("cover-gradient") || book.cover.startsWith("linear-gradient");
  const hasRating = book.rating && book.rating !== "—";
  
  const href = book.href || `/books/${book.id}`;

  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E8DFD2] bg-white shadow-[0_1px_3px_rgba(32,27,22,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1F3A54]/30 hover:shadow-[0_20px_44px_-12px_rgba(32,27,22,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1F2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF7F0]"
    >
      {/* ── Cover ── */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {isGradient ? (
          <div
            className={`${book.cover} absolute inset-0 flex flex-col justify-between p-3.5 transition-transform duration-500 group-hover:scale-[1.04] sm:p-4`}
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">
              IsmailBooks
            </span>
            <div>
              <p className="font-display line-clamp-3 text-sm font-bold leading-snug text-white sm:text-base">
                {book.title}
              </p>
              <p className="mt-1 line-clamp-1 text-[10px] font-medium text-white/70">
                {book.author}
              </p>
            </div>
          </div>
        ) : (
          <img
            src={book.cover}
            alt={`Coverka ${book.title}`}
            loading="lazy"
            width={300}
            height={450}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        )}

        {/* Spine shadow — real book feel */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/20 to-transparent" />

        {/* Category chip */}
        {book.category && (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#1F3A54] backdrop-blur-sm sm:left-2.5 sm:top-2.5 sm:text-[10px]">
            {book.category}
          </span>
        )}

        {/* Rating */}
        {hasRating && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-0.5 rounded-full bg-[#201B16]/75 px-1.5 py-0.5 text-[9px] font-bold text-[#F7F1E5] backdrop-blur-sm sm:right-2.5 sm:top-2.5 sm:text-[10px]">
            <Star className="h-2.5 w-2.5 fill-[#C9962E] text-[#C9962E]" />
            {book.rating}
          </span>
        )}

        {/* Free / Premium */}
        <span
          className={`absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider sm:bottom-2.5 sm:left-2.5 sm:text-[10px] ${
            book.is_paid
              ? "bg-[#C9962E] text-[#201B16]"
              : "bg-[#2E7D5B] text-white"
          }`}
        >
          {book.is_paid ? "Premium" : "Bilaash"}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="font-display line-clamp-2 text-[13px] font-bold leading-snug text-[#201B16] transition-colors group-hover:text-[#7A1F2B] sm:text-[15px]">
          {book.title}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-[#6B5F52] sm:text-xs">
          {book.author}
        </p>

        {/* Price + action */}
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-[#1F3A54] sm:text-base">
              {book.priceLabel}
            </span>
            {book.pages ? (
              <span className="hidden items-center gap-1 text-[10px] font-semibold text-[#6B5F52] sm:flex">
                <BookOpen className="h-3 w-3" />
                {book.pages}
              </span>
            ) : null}
          </div>

          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E8DFD2] bg-[#FBF7F0] text-[#7A1F2B] transition-all duration-300 group-hover:border-[#7A1F2B] group-hover:bg-[#7A1F2B] group-hover:text-white sm:h-9 sm:w-9">
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}