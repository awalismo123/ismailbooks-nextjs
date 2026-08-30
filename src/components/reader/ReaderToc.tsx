"use client";

import React from "react";
import { List, X, Lock, Check } from "lucide-react";
import type { TocItem } from "@/hooks/useReaderProgress";

export interface ReaderTocProps {
  open: boolean;
  toc: TocItem[] | null;
  currentChapter: number;
  isPreview?: boolean;
  previewLimit?: number;
  onClose: () => void;
  goTo: (idx: number) => void;
}

export default function ReaderToc({
  open,
  toc,
  currentChapter,
  isPreview = false,
  previewLimit = 0,
  onClose,
  goTo,
}: ReaderTocProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--reader-bg)",
          borderLeft: "1px solid var(--reader-border)",
        }}
        className="w-full max-w-xs h-full flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{ borderBottom: "1px solid var(--reader-border)" }}
          className="flex items-center justify-between px-5 py-4"
        >
          <h3
            style={{ color: "var(--reader-heading)" }}
            className="font-display text-base font-extrabold flex items-center gap-2 m-0"
          >
            <List className="w-4 h-4" style={{ color: "var(--reader-accent)" }} />
            Cutubyada Buugga
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{ color: "var(--reader-muted)", minWidth: 44, minHeight: 44 }}
            className="inline-flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {toc?.map((ch, idx) => {
            const isCurrent = idx === currentChapter;
            const isLocked = isPreview && idx > previewLimit;

            return (
              <button
                key={ch.file}
                type="button"
                onClick={() => goTo(idx)}
                style={{
                  background: isCurrent ? "var(--reader-surface)" : "transparent",
                  border: isCurrent
                    ? "1px solid var(--reader-border)"
                    : "1px solid transparent",
                  color: isCurrent
                    ? "var(--reader-heading)"
                    : "var(--reader-body)",
                  opacity: isLocked ? 0.6 : 1,
                }}
                className="w-full text-left px-3 py-3 rounded-xl flex items-center justify-between group hover:bg-[var(--reader-surface)] transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 pr-3">
                  <div
                    style={{
                      background: isCurrent
                        ? "var(--reader-accent)"
                        : "transparent",
                      color: isCurrent ? "#fff" : "var(--reader-muted)",
                    }}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-extrabold shrink-0"
                  >
                    {idx + 1}
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <span className="text-sm font-semibold truncate block">
                      {ch.title}
                    </span>
                  </div>
                </div>
                {isLocked ? (
                  <Lock className="w-4 h-4 shrink-0 text-amber-500" />
                ) : (
                  idx < currentChapter && (
                    <Check className="w-4 h-4 shrink-0 text-emerald-500" />
                  )
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
