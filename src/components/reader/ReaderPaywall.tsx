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
      className="mt-10 rounded-2xl border border-[#C9962E]/40 bg-[#FBF7F0] p-6 text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9962E]/20 text-[#C9962E]">
        <Lock className="h-6 w-6" />
      </div>
      <h3 className="font-display text-lg font-extrabold text-[#201B16]">
        Qeybta tijaabada waa dhammaatay
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-[#6B5F52]">
        Si aad u akhriso dhammaan cutubyada kale, iibso buuggan hadda.
      </p>
      <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href={`/payment/${bookId}`} className="btn btn-primary btn-block sm:w-auto">
          <CreditCard className="h-4 w-4" />
          Iibso Buugga Hadda
        </Link>
        <Link
          href={`/payment/${bookId}?isGift=true`}
          className="btn btn-secondary btn-block sm:w-auto"
        >
          🎁 U hdiyay Saaxiib
        </Link>
        <Link
          href={`/books/${bookId}`}
          className="btn btn-ghost btn-block sm:w-auto"
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#E8DFD2] bg-[#FBF7F0] p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7A1F2B]/10 text-[#7A1F2B]">
          <Sparkles className="h-7 w-7" />
        </div>
        <h3 className="font-display text-xl font-extrabold text-[#201B16]">
          Cutubkan waa Premium!
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-[#6B5F52]">
          Qaybtaan iyo inta ka dhiman buugga waxay u furan yihiin dadka iibsada
          buuggan.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <Link href={`/payment/${bookId}`} className="btn btn-primary btn-block">
            <CreditCard className="h-4 w-4" />
            Iibso Buugga Hadda
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm"
          >
            Ka noqo
          </button>
        </div>
      </div>
    </div>
  );
}
