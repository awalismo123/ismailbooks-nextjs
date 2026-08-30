"use client";

import React from "react";
import Link from "next/link";
import { X, Sparkles, BookOpen } from "lucide-react";

export interface ReaderOfflineBannerProps {
  show: boolean;
  onClose: () => void;
}

export function ReaderOfflineBanner({ show, onClose }: ReaderOfflineBannerProps) {
  if (!show) return null;
  return (
    <div
      style={{ background: "#92400E", color: "#FEF3C7" }}
      className="px-4 py-2 text-xs font-semibold flex items-center justify-between"
    >
      <span>📶 Xog-warsaadka laaantii — waad akhrisan kartaa</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 opacity-70"
        aria-label="Xir"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export interface ReaderResumeBannerProps {
  resumeBanner: { chapter: number; pct: number } | null;
  isPreview?: boolean;
  chapterTitle?: string;
  onResume: () => void;
  onClose: () => void;
}

export function ReaderResumeBanner({
  resumeBanner,
  isPreview = false,
  chapterTitle,
  onResume,
  onClose,
}: ReaderResumeBannerProps) {
  if (!resumeBanner || isPreview) return null;
  return (
    <div
      style={{
        background: "var(--reader-surface)",
        borderBottom: "1px solid var(--reader-border)",
      }}
      className="px-4 py-2.5 flex items-center justify-between gap-3 text-sm"
    >
      <p style={{ color: "var(--reader-body)" }} className="text-xs font-semibold m-0">
        Sii wad · Cutub {resumeBanner.chapter + 1}
        {chapterTitle ? ` · ${chapterTitle}` : ""}
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onResume}
          style={{ background: "var(--reader-accent)", color: "#fff", minHeight: 36 }}
          className="px-3 rounded-lg text-xs font-bold"
        >
          Sii wad
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{ color: "var(--reader-muted)", minWidth: 36, minHeight: 36 }}
          className="inline-flex items-center justify-center"
          aria-label="Xir"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export interface ReaderOwnerNudgeProps {
  bookId: string;
  isPreview?: boolean;
  dismissed: boolean;
  loading: boolean;
  contentError: string | null;
  hasContent: boolean;
  timeSpent: number;
  scrollProgressPct: number;
  onDismiss: () => void;
}

export function ReaderOwnerNudge({
  bookId,
  isPreview = false,
  dismissed,
  loading,
  contentError,
  hasContent,
  timeSpent,
  scrollProgressPct,
  onDismiss,
}: ReaderOwnerNudgeProps) {
  if (
    isPreview ||
    dismissed ||
    loading ||
    Boolean(contentError) ||
    !hasContent ||
    (timeSpent < 600 && scrollProgressPct < 85)
  ) {
    return null;
  }

  return (
    <div
      className="mt-10 rounded-2xl border border-[var(--reader-border)] p-6 sm:p-7 relative transition-all shadow-sm"
      style={{ background: "var(--reader-surface)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-4 right-4 p-1.5 rounded-lg border border-[var(--reader-border)] opacity-60 hover:opacity-100 transition-opacity"
        style={{ color: "var(--reader-muted)" }}
        title="Ka xidh"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C9962E]/15 text-[#C9962E]">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h4
            className="font-display text-base font-extrabold"
            style={{ color: "var(--reader-heading)" }}
          >
            Miyaad ka heshay buuggan?
          </h4>
          <p
            className="mt-1 text-xs leading-relaxed max-w-lg"
            style={{ color: "var(--reader-muted)" }}
          >
            Waad ku mahadsan tahay akhriska! Maadaama aad buuggan leedahay, waad u hdiyayn kartaa saaxiib ama waxaad brawsarsan kartaa buugaagta kale ee maktabada.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href={`/payment/${bookId}?isGift=true`}
              className="btn btn-primary btn-sm text-xs"
            >
              🎁 U hdiyay Buuggan
            </Link>
            <Link
              href="/books"
              className="btn btn-secondary btn-sm text-xs"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Brawsar Maktabada
            </Link>
            <button
              type="button"
              onClick={onDismiss}
              className="btn btn-ghost btn-sm text-xs opacity-75"
            >
              Ka xidh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
