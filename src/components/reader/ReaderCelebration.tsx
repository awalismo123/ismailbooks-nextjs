"use client";

import React from "react";
import Link from "next/link";
import { PartyPopper, Sparkles } from "lucide-react";

export interface ReaderCelebrationProps {
  show: boolean;
  bookTitle: string;
}

export default function ReaderCelebration({
  show,
  bookTitle,
}: ReaderCelebrationProps) {
  if (!show) return null;

  return (
    <div
      className="mt-12 mb-8 rounded-2xl border border-[var(--reader-border)] p-6 sm:p-8 text-center shadow-lg"
      style={{ background: "var(--reader-surface)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#C9962E] to-[#EAB308] text-white shadow-inner">
        <PartyPopper className="h-7 w-7" />
      </div>
      <h3
        className="font-display text-xl font-extrabold"
        style={{ color: "var(--reader-heading)" }}
      >
        Hambalyo!
      </h3>
      <p
        className="mx-auto mt-2 max-w-sm text-sm leading-relaxed"
        style={{ color: "var(--reader-muted)" }}
      >
        Waad dhammaystirtay akhriska buuggan. Horumar wacan!
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => {
            if (typeof navigator !== "undefined" && navigator.share) {
              navigator.share({
                title: "IsmailBooks",
                text: `Waxaan dhammaystay akhriska: ${bookTitle}!`,
                url: window.location.href,
              });
            }
          }}
          className="btn btn-secondary btn-block sm:w-auto font-bold px-6 h-12"
        >
          <Sparkles className="h-4 w-4 mr-1.5" />
          La wadaag
        </button>
        <Link
          href="/books"
          className="btn btn-primary btn-block sm:w-auto font-bold px-6 h-12"
        >
          Buug kale eeg
        </Link>
      </div>
    </div>
  );
}
