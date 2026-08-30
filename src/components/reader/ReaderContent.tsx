"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { BookCard, type BookCardData } from "@/components/books/BookCard";
import { FONT_CLASSES } from "@/hooks/useReaderPrefs";
import type { FontFamily } from "./ReaderSettingsSheet";

export interface ReaderContentProps {
  contentRef: React.RefObject<HTMLElement | null>;
  endSentinelRef?: React.RefObject<HTMLDivElement | null>;
  bookId: string;
  fontFamily: FontFamily;
  fontSize: number;
  currentHtml: string;
  searchHighlightedHtml: string | null;
  annotatedHtml: string;
  loading: boolean;
  hasContent: boolean;
  contentError: string | null;
  relatedBooks?: BookCardData[];
  currentChapter: number;
  chaptersCount: number;
  goTo: (idx: number) => void;
  onToggleChrome: () => void;
  children?: React.ReactNode;
}

export default function ReaderContent({
  contentRef,
  endSentinelRef,
  bookId,
  fontFamily,
  fontSize,
  currentHtml,
  searchHighlightedHtml,
  annotatedHtml,
  loading,
  hasContent,
  contentError,
  relatedBooks = [],
  currentChapter,
  chaptersCount,
  goTo,
  onToggleChrome,
  children,
}: ReaderContentProps) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  return (
    <main
      className="flex-grow max-w-[720px] mx-auto px-4 sm:px-8 py-6 sm:py-12 w-full"
      onClick={onToggleChrome}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        if (!touchStartX.current || !touchStartY.current) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY.current);

        // Must be mostly horizontal swipe
        if (deltaY < 50 && Math.abs(deltaX) > 80) {
          if (deltaX > 0 && currentChapter > 0) goTo(currentChapter - 1); // Swipe right = prev
          else if (deltaX < 0 && currentChapter < chaptersCount - 1) goTo(currentChapter + 1); // Swipe left = next
        }
        touchStartX.current = null;
        touchStartY.current = null;
      }}
    >
      {!hasContent && !loading && (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <div
            style={{
              background: "var(--reader-surface)",
              border: "1px solid var(--reader-border)",
            }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
          >
            <BookOpen className="w-8 h-8" style={{ color: "var(--reader-accent)" }} />
          </div>
          <h2
            style={{ color: "var(--reader-heading)" }}
            className="font-display text-xl font-extrabold"
          >
            Nuxurka buugga wali lama keenin
          </h2>
          <Link
            href={`/books/${bookId}`}
            style={{ background: "var(--reader-accent)", color: "#fff" }}
            className="px-5 py-2.5 rounded-xl text-sm font-bold"
          >
            ← Ku noqo Buugga
          </Link>
        </div>
      )}

      {loading && hasContent && (
        <div className="space-y-4 py-6 animate-pulse" aria-busy="true">
          <div
            style={{ background: "var(--reader-border)" }}
            className="h-8 w-2/3 rounded-lg"
          />
          <div
            style={{ background: "var(--reader-border)" }}
            className="h-4 w-full rounded"
          />
          <div
            style={{ background: "var(--reader-border)" }}
            className="h-4 w-[92%] rounded"
          />
          <div
            style={{ background: "var(--reader-border)" }}
            className="h-4 w-[88%] rounded"
          />
          <div
            style={{ background: "var(--reader-border)" }}
            className="h-4 w-full rounded"
          />
          <div
            style={{ background: "var(--reader-border)" }}
            className="h-4 w-[70%] rounded"
          />
          <div
            style={{ background: "var(--reader-border)" }}
            className="h-40 w-full rounded-xl mt-6"
          />
          <p
            style={{ color: "var(--reader-muted)" }}
            className="text-sm font-bold text-center pt-4"
          >
            Diyaarinta cutubka...
          </p>
        </div>
      )}

      {contentError && (
        <div className="text-center py-16">
          <p className="text-red-500 font-bold mb-2">Qalad ayaa dhacay</p>
          <p style={{ color: "var(--reader-muted)" }} className="text-sm">
            {contentError}
          </p>
        </div>
      )}

      {!loading && !contentError && hasContent && currentHtml && (
        <article
          ref={contentRef}
          lang="so"
          className={FONT_CLASSES[fontFamily]}
          style={{ fontSize: `${fontSize}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="reader-prose"
            dangerouslySetInnerHTML={{ __html: searchHighlightedHtml || annotatedHtml }}
          />
          {endSentinelRef && <div ref={endSentinelRef} className="h-4 w-full" aria-hidden />}
        </article>
      )}

      {/* Related Books Strip — inline after chapter finishes */}
      {!loading && !contentError && hasContent && relatedBooks && relatedBooks.length > 0 && (
        <div
          className="mt-14 pt-8 border-t border-[var(--reader-border)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3
                className="font-display text-base sm:text-lg font-extrabold"
                style={{ color: "var(--reader-heading)" }}
              >
                Akhristayaashu waxay sidoo kale jeclaadeen
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--reader-muted)" }}>
                Buugaag kale oo xioso leh oo aad ka heli karto maktabada
              </p>
            </div>
            <Link
              href="/books"
              className="text-xs font-bold hover:underline flex items-center gap-1 shrink-0 ml-2"
              style={{ color: "var(--reader-accent)" }}
            >
              Dhammaan →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedBooks.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      )}

      {children}
    </main>
  );
}
