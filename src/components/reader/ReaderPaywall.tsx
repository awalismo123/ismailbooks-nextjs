"use client";

import React from "react";
import Link from "next/link";
import { Lock, CreditCard, Sparkles } from "lucide-react";

export interface ReaderPreviewCtaProps {
  bookId: string;
  isPreview?: boolean;
  currentChapter: number;
  previewLimit: number;
  loading: boolean;
  showPreviewCta: boolean;
}

export function ReaderPreviewCta({
  bookId,
  isPreview = false,
  currentChapter,
  previewLimit,
  loading,
  showPreviewCta,
}: ReaderPreviewCtaProps) {
  if (!isPreview || currentChapter !== previewLimit || loading || !showPreviewCta) {
    return null;
  }

  return (
    <div
      className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl border p-5 sm:p-7 text-center shadow-sm"
      style={{
        background: "var(--reader-surface)",
        borderColor: "rgba(201, 150, 46, 0.3)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#C9962E]/10 text-[#C9962E]">
        <Lock className="h-6 w-6 sm:h-7 sm:w-7" />
      </div>
      <h3
        className="font-display text-lg sm:text-xl font-extrabold"
        style={{ color: "var(--reader-heading)" }}
      >
        Qeybta tijaabada waa dhammaatay
      </h3>
      <p
        className="mx-auto mt-2 max-w-sm text-xs sm:text-sm leading-relaxed"
        style={{ color: "var(--reader-muted)" }}
      >
        Si aad u akhriso dhammaan cutubyada kale, fadlan iibso buuggan hadda.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={`/payment/${bookId}`}
          className="btn w-full sm:w-auto min-h-[44px] px-5 rounded-xl font-extrabold text-xs sm:text-sm border-0 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
          style={{ background: "#C9962E", color: "#1A1208" }}
        >
          <CreditCard className="h-4 w-4" />
          Iibso Buugga Hadda
        </Link>
        <Link
          href={`/payment/${bookId}?isGift=true`}
          className="btn w-full sm:w-auto min-h-[44px] px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors hover:opacity-80"
          style={{
            background: "transparent",
            border: "1px solid var(--reader-border)",
            color: "var(--reader-heading)",
          }}
        >
          🎁 U hdiyay Saaxiib
        </Link>
        <Link
          href={`/books/${bookId}`}
          className="btn w-full sm:w-auto min-h-[44px] px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors hover:opacity-80"
          style={{
            background: "transparent",
            color: "var(--reader-muted)",
          }}
        >
          Eeg Faahfaahinta
        </Link>
      </div>
    </div>
  );
}

export interface ReaderPaywallModalProps {
  bookId: string;
  open: boolean;
  onClose: () => void;
}

export function ReaderPaywallModal({
  bookId,
  open,
  onClose,
}: ReaderPaywallModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      style={{
        paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm sm:max-w-md rounded-2xl sm:rounded-3xl border p-6 sm:p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200 relative"
        style={{
          background: "var(--reader-surface)",
          borderColor: "var(--reader-border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 sm:mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9962E]/10 text-[#C9962E]">
          <Sparkles className="h-7 w-7" />
        </div>
        <h3
          className="font-display text-xl sm:text-2xl font-extrabold"
          style={{ color: "var(--reader-heading)" }}
        >
          Cutubkan waa Premium!
        </h3>
        <p
          className="mx-auto mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed max-w-[280px]"
          style={{ color: "var(--reader-muted)" }}
        >
          Qaybtaan iyo inta ka dhiman buugga waxay u furan yihiin dadka iibsada
          buuggan.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-col gap-3">
          <Link
            href={`/payment/${bookId}`}
            className="btn btn-block min-h-[48px] rounded-xl font-extrabold text-sm border-0 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            style={{ background: "#C9962E", color: "#1A1208" }}
          >
            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
            Iibso Buugga Hadda
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-block min-h-[48px] rounded-xl font-bold text-sm transition-colors hover:opacity-80"
            style={{
              background: "transparent",
              color: "var(--reader-muted)",
            }}
          >
            Ka noqo
          </button>
        </div>
      </div>
    </div>
  );
}
