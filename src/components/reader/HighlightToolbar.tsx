"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bookmark, Share2 } from "lucide-react";
import type { HighlightColor } from "@/components/reader/HighlightsPanel";

const PALETTE: { key: HighlightColor; label: string; color: string }[] = [
  { key: "gold", label: "Dahab", color: "#C9962E" },
  { key: "navy", label: "Buluug", color: "#1D3A5F" },
  { key: "oxblood", label: "Guduud", color: "#70193D" },
  { key: "green", label: "Cagaar", color: "#2E7D5B" },
];

const TOOLBAR_W = 248;
const TOOLBAR_H = 52;

type SelectionState = {
  text: string;
  left: number;
  top: number;
};

/**
 * Self-contained selection toolbar.
 * Keeps its own open/position state so selecting text does NOT re-render
 * BookReaderClient (which would remount chapter HTML and kill the selection).
 */
export default function HighlightToolbar({
  contentRef,
  enabled = true,
  onHighlight,
  onBookmark,
}: {
  contentRef: React.RefObject<HTMLElement | null>;
  enabled?: boolean;
  onHighlight: (text: string, color: HighlightColor) => void;
  onBookmark: (text: string) => void;
}) {
  const [sel, setSel] = useState<SelectionState | null>(null);
  const selRef = useRef<SelectionState | null>(null);
  const pointerDownRef = useRef(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (showTimer.current) clearTimeout(showTimer.current);
    hideTimer.current = null;
    showTimer.current = null;
  }, []);

  const close = useCallback(() => {
    clearTimers();
    selRef.current = null;
    setSel(null);
  }, [clearTimers]);

  const readSelection = useCallback((): SelectionState | null => {
    const article = contentRef.current;
    const selection = window.getSelection();
    if (!article || !selection || selection.rangeCount === 0) return null;

    const text = selection.toString().replace(/\s+/g, " ").trim();
    if (text.length < 2) return null;

    const anchor = selection.anchorNode;
    const focus = selection.focusNode;
    if (!anchor || !focus) return null;
    if (!article.contains(anchor) || !article.contains(focus)) return null;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (rect.width < 1 && rect.height < 1) return null;

    // Fixed positioning → viewport coords only (never add scrollY)
    const centerX = rect.left + rect.width / 2;
    const left = Math.max(8, Math.min(centerX - TOOLBAR_W / 2, window.innerWidth - TOOLBAR_W - 8));
    const above = rect.top - TOOLBAR_H - 10;
    const top = above >= 56 ? above : Math.min(rect.bottom + 10, window.innerHeight - TOOLBAR_H - 8);

    return { text, left: Math.round(left), top: Math.round(top) };
  }, [contentRef]);

  const tryShow = useCallback(
    (delay = 0) => {
      if (!enabled) return;
      if (showTimer.current) clearTimeout(showTimer.current);
      showTimer.current = setTimeout(() => {
        if (pointerDownRef.current) return;
        const next = readSelection();
        if (!next) {
          close(); // Selection cleared, so close the toolbar
          return;
        }
        const prev = selRef.current;
        if (prev && prev.text === next.text && prev.left === next.left && prev.top === next.top) {
          return;
        }
        selRef.current = next;
        setSel(next);
      }, delay);
    },
    [enabled, readSelection, close],
  );

  useEffect(() => {
    if (!enabled) {
      close();
      return;
    }

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.("[data-highlight-toolbar]")) return;
      pointerDownRef.current = true;
    };

    const onPointerUp = () => {
      pointerDownRef.current = false;
      // Mobile needs a beat for native selection handles to settle
      const touchLike = window.matchMedia("(pointer: coarse)").matches;
      tryShow(touchLike ? 280 : 20);
    };

    const onSelectionChange = () => {
      if (pointerDownRef.current) return;
      tryShow(120);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.getSelection()?.removeAllRanges();
        close();
      }
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("selectionchange", onSelectionChange);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimers();
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("selectionchange", onSelectionChange);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close, enabled, tryShow, clearTimers]);

  useEffect(() => {
    if (!enabled) close();
  }, [close, enabled]);

  const takeText = () => selRef.current?.text || readSelection()?.text || "";

  const handleHighlight = (color: HighlightColor) => {
    const text = takeText();
    if (!text) return;
    onHighlight(text, color);
    window.getSelection()?.removeAllRanges();
    close();
  };

  const handleBookmark = () => {
    const text = takeText();
    if (!text) return;
    onBookmark(text);
    window.getSelection()?.removeAllRanges();
    close();
  };

  const handleShare = async () => {
    const text = takeText();
    if (!text) return;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ text });
      } else if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // user cancelled share — ignore
    }
  };

  if (!sel) return null;

  return (
    <div
      data-highlight-toolbar=""
      role="toolbar"
      aria-label="Xusha qoraalka"
      style={{
        position: "fixed",
        left: sel.left,
        top: sel.top,
        zIndex: 9999,
        width: TOOLBAR_W,
      }}
      onPointerDown={(e) => {
        // Keep the browser selection alive when tapping toolbar buttons
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        className="flex items-center gap-1 rounded-2xl border px-2 py-1.5"
        style={{
          background: "var(--reader-bg, #fff)",
          borderColor: "var(--reader-border, #e5e7eb)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
        }}
      >
        {PALETTE.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => handleHighlight(opt.key)}
            title={opt.label}
            aria-label={`Xushi — ${opt.label}`}
            className="h-9 w-9 shrink-0 rounded-full transition-transform active:scale-95"
            style={{ background: opt.color }}
          />
        ))}

        <div className="mx-0.5 h-7 w-px shrink-0" style={{ background: "var(--reader-border)" }} />

        <button
          type="button"
          onClick={handleBookmark}
          title="Calaamadi"
          aria-label="Calaamadi goobtan"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
          style={{
            background: "var(--reader-surface, #f9f6f1)",
            color: "var(--reader-heading, #201B16)",
            borderColor: "var(--reader-border, #e5e7eb)",
          }}
        >
          <Bookmark className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => void handleShare()}
          title="Wadaag"
          aria-label="Wadaag qoraalka"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
          style={{
            background: "var(--reader-surface, #f9f6f1)",
            color: "var(--reader-heading, #201B16)",
            borderColor: "var(--reader-border, #e5e7eb)",
          }}
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
