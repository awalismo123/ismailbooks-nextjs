import { Bookmark, Highlighter, Share2 } from "lucide-react";

const PALETTE = [
  { key: "gold", color: "#C9962E" },
  { key: "navy", color: "#1D3A5F" },
  { key: "oxblood", color: "#70193D" },
  { key: "green", color: "#2E7D5B" },
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
  if (!open) return null;

  return (
    <div
      className="fixed z-50"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -110%)",
      }}
    >
      <div
        className="flex items-center gap-2 rounded-2xl border px-2 py-1.5 shadow-xl backdrop-blur-sm"
        style={{
          background: "var(--reader-bg)",
          borderColor: "var(--reader-border)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.14)",
        }}
      >
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{ background: "var(--reader-surface)", color: "var(--reader-heading)", border: "1px solid var(--reader-border)" }}
          aria-label="Highlight selection"
        >
          <Highlighter className="h-3.5 w-3.5" />
          Highlight
        </button>

        <div className="flex items-center gap-1.5 rounded-xl bg-[var(--reader-surface)] px-1 py-0.5" style={{ border: "1px solid var(--reader-border)" }}>
          {PALETTE.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => onHighlight(opt.key)}
              title={`Highlight ${opt.key}`}
              aria-label={`Highlight in ${opt.key} color`}
              className="h-5 w-5 rounded-full border-2 transition-transform hover:scale-105"
              style={{
                borderColor: "rgba(255,255,255,0.7)",
                background: opt.color,
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onBookmark}
          className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{ background: "var(--reader-surface)", color: "var(--reader-heading)", border: "1px solid var(--reader-border)" }}
          aria-label="Bookmark this spot"
        >
          <Bookmark className="h-3.5 w-3.5" />
          Bookmark
        </button>

        <button
          type="button"
          onClick={onShare}
          className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{ background: "var(--reader-surface)", color: "var(--reader-heading)", border: "1px solid var(--reader-border)" }}
          aria-label="Share this selection"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
      </div>
    </div>
  );
}
