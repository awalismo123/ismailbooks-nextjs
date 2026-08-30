import { useState, type CSSProperties } from "react";
import { ChevronRight, Highlighter, X } from "lucide-react";

export type HighlightColor = "gold" | "navy" | "oxblood" | "green";

export type HighlightEntry = {
  id: string;
  bookId: string;
  chapterIndex: number;
  chapterTitle: string;
  text: string;
  color: HighlightColor;
  scrollOffset: number;
  createdAt: string;
};

const colorMap: Record<HighlightColor, { label: string; swatch: string; text: string }> = {
  gold: { label: "Gold", swatch: "#C9962E", text: "#1A1208" },
  navy: { label: "Navy", swatch: "#1D3A5F", text: "#F4F8FF" },
  oxblood: { label: "Oxblood", swatch: "#70193D", text: "#FFF6FA" },
  green: { label: "Green", swatch: "#2E7D5B", text: "#F4FFF9" },
};

export default function HighlightsPanel({
  open,
  highlights,
  onClose,
  onJump,
}: {
  open: boolean;
  highlights: HighlightEntry[];
  onClose: () => void;
  onJump: (chapterIndex: number, scrollOffset: number) => void;
}) {
  const [visibleCount, setVisibleCount] = useState(20);

  if (!open) return null;

  const sorted = highlights
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const visibleHighlights = sorted.slice(0, visibleCount);
  const hasMore = sorted.length > visibleCount;

  const grouped = visibleHighlights.reduce<Record<number, HighlightEntry[]>>((acc, item) => {
    if (!acc[item.chapterIndex]) acc[item.chapterIndex] = [];
    acc[item.chapterIndex].push(item);
    return acc;
  }, {});

  const panelStyle: CSSProperties = {
    background: "var(--reader-bg)",
    borderColor: "var(--reader-border)",
    color: "var(--reader-body)",
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-[1px]">
      <button
        type="button"
        aria-label="Close highlights list"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <aside
        style={panelStyle}
        className="relative z-10 h-full w-full max-w-md border-l shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3" style={{ borderColor: "var(--reader-border)", background: "var(--reader-surface)" }}>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "rgba(112, 25, 61, 0.12)", color: "#70193D" }}>
              <Highlighter className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--reader-muted)" }}>Highlights</p>
              <h3 className="text-base font-extrabold" style={{ color: "var(--reader-heading)" }}>Aqoonta la xushay</h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border"
            style={{ borderColor: "var(--reader-border)", color: "var(--reader-muted)" }}
            aria-label="Close highlights list"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-[calc(100%-73px)] overflow-y-auto p-3">
          {highlights.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed p-5 text-center" style={{ borderColor: "var(--reader-border)", background: "var(--reader-surface)" }}>
              <p className="text-sm font-bold" style={{ color: "var(--reader-heading)" }}>Wali ma jiraan xushay</p>
              <p className="mt-2 text-xs leading-6" style={{ color: "var(--reader-muted)" }}>
                Xulo qoraal, markaas guji Highlight si aad u keydiso.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(grouped)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([chapterKey, chapterHighlights]) => (
                  <div key={chapterKey} className="space-y-2">
                    <p className="px-1 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--reader-muted)" }}>
                      Cutub {Number(chapterKey) + 1}
                    </p>

                    {chapterHighlights.map((entry) => {
                      const palette = colorMap[entry.color] || colorMap.gold;

                      return (
                        <button
                          key={entry.id}
                          type="button"
                          onClick={() => onJump(entry.chapterIndex, entry.scrollOffset)}
                          className="w-full rounded-2xl border p-3 text-left transition-transform duration-150 hover:-translate-y-0.5"
                          style={{
                            borderColor: "var(--reader-border)",
                            background: "var(--reader-surface)",
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span
                                className="inline-block h-3 w-3 rounded-full"
                                style={{ background: palette.swatch }}
                                aria-label={palette.label}
                              />
                              <span className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--reader-muted)" }}>
                                {palette.label}
                              </span>
                            </div>
                            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--reader-accent)" }} />
                          </div>

                          <p className="mt-2 rounded-xl px-2 py-1.5 text-xs leading-6" style={{ background: palette.swatch, color: palette.text }}>
                            “{entry.text}”
                          </p>
                        </button>
                      );
                    })}
                  </div>
                ))}

              {hasMore && (
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 20)}
                  className="w-full py-2.5 mt-2 rounded-xl border text-xs font-bold text-center hover:opacity-80 transition-opacity"
                  style={{
                    borderColor: "var(--reader-border)",
                    background: "var(--reader-surface)",
                    color: "var(--reader-accent)",
                  }}
                >
                  Tus Dheeraad ah ({sorted.length - visibleCount})
                </button>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
