"use client";

import { useEffect, useRef } from "react";
import { Bookmark } from "lucide-react";

const PALETTE = [
  { key: "gold",    label: "Dahab",   color: "#C9962E", ring: "#F5E0A0" },
  { key: "navy",    label: "Buluug",  color: "#1D3A5F", ring: "#A8C0E0" },
  { key: "oxblood", label: "Guduud",  color: "#70193D", ring: "#E0A0B8" },
  { key: "green",   label: "Cagaar",  color: "#2E7D5B", ring: "#A0DEC0" },
] as const;

export default function HighlightToolbar({
  open,
  x,
  y,
  onHighlight,
  onBookmark,
  onShare,
}: {
  open: boolean;
  x: number;
  y: number;
  onHighlight: (color: string) => void;
  onBookmark: () => void;
  onShare: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Re-position every time open/x/y change, after paint, to avoid layout flash
  useEffect(() => {
    if (!open || !ref.current) return;
    const el = ref.current;
    const W = window.innerWidth;
    const elRect = el.getBoundingClientRect();
    const w = elRect.width || 220;
    const h = elRect.height || 60;

    // Clamp horizontal so toolbar never exits screen
    const left = Math.max(8, Math.min(x - w / 2, W - w - 8));

    // Try above selection; if not enough room, show below
    const ARROW = 10;
    const above = y - h - ARROW;
    const top = above < 58 ? y + ARROW : above;

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
    el.style.visibility = "visible";
  }, [open, x, y]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      // Start invisible — positioning useEffect makes it visible after measuring
      style={{ visibility: "hidden", position: "fixed", zIndex: 9999, top: 0, left: 0 }}
      // Prevent mousedown from clearing the text selection on desktop
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      // Stop touch events from bubbling up and triggering the document's captureSelection
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
    >
      <div
        className="flex items-center gap-1.5 rounded-2xl border px-2.5 py-2"
        style={{
          background: "var(--reader-bg, #fff)",
          borderColor: "var(--reader-border, #e5e7eb)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.20), 0 2px 8px rgba(0,0,0,0.10)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        {/* Colour swatches */}
        {PALETTE.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => onHighlight(opt.key)}
            title={opt.label}
            aria-label={`Xushi — ${opt.label}`}
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: opt.color,
              outlineColor: opt.color,
            }}
          >
            {/* Subtle inner gloss */}
            <span
              className="pointer-events-none absolute inset-[3px] rounded-full opacity-25"
              style={{ background: opt.ring }}
            />
          </button>
        ))}

        {/* Thin divider */}
        <div
          className="h-7 w-px shrink-0"
          style={{ background: "var(--reader-border, #e5e7eb)" }}
        />

        {/* Bookmark button */}
        <button
          type="button"
          onClick={onBookmark}
          title="Calaamadi"
          aria-label="Calaamadi goobtan"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-150 hover:scale-110 active:scale-95"
          style={{
            background: "var(--reader-surface, #f9f6f1)",
            color: "var(--reader-heading, #201B16)",
            border: "1px solid var(--reader-border, #e5e7eb)",
          }}
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
