"use client";

import type { CSSProperties } from "react";
import { Bookmark, ChevronRight, Highlighter, Trash2, X } from "lucide-react";
import type { BookmarkEntry } from "@/components/reader/BookmarksPanel";
import type { HighlightColor, HighlightEntry } from "@/components/reader/HighlightsPanel";

const colorMap: Record<HighlightColor, { label: string; swatch: string }> = {
  gold: { label: "Dahab", swatch: "#C9962E" },
  navy: { label: "Buluug", swatch: "#1D3A5F" },
  oxblood: { label: "Guduud", swatch: "#70193D" },
  green: { label: "Cagaar", swatch: "#2E7D5B" },
};

export type AnnotationsTab = "bookmarks" | "highlights";

export default function AnnotationsSheet({
  open,
  tab,
  onTabChange,
  bookmarks,
  highlights,
  onClose,
  onJumpBookmark,
  onJumpHighlight,
  onDeleteBookmark,
  onDeleteHighlight,
}: {
  open: boolean;
  tab: AnnotationsTab;
  onTabChange: (tab: AnnotationsTab) => void;
  bookmarks: BookmarkEntry[];
  highlights: HighlightEntry[];
  onClose: () => void;
  onJumpBookmark: (bookmark: BookmarkEntry) => void;
  onJumpHighlight: (highlight: HighlightEntry) => void;
  onDeleteBookmark: (id: string) => void;
  onDeleteHighlight: (id: string) => void;
}) {
  if (!open) return null;

  const panelStyle: CSSProperties = {
    background: "var(--reader-bg)",
    borderColor: "var(--reader-border)",
    color: "var(--reader-body)",
  };

  const sortedBookmarks = bookmarks
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const groupedHighlights = highlights
    .slice()
    .sort((a, b) => a.chapterIndex - b.chapterIndex || b.createdAt.localeCompare(a.createdAt))
    .reduce<Record<number, HighlightEntry[]>>((acc, item) => {
      if (!acc[item.chapterIndex]) acc[item.chapterIndex] = [];
      acc[item.chapterIndex].push(item);
      return acc;
    }, {});

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-[1px]">
      <button type="button" aria-label="Xir" onClick={onClose} className="absolute inset-0 cursor-default" />

      <aside
        style={panelStyle}
        className="relative z-10 flex h-full w-full max-w-md flex-col border-l shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Calaamadaha iyo xushayaasha"
      >
        <div
          className="flex items-center justify-between gap-3 border-b px-4 py-3"
          style={{ borderColor: "var(--reader-border)", background: "var(--reader-surface)" }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--reader-muted)" }}>
              Buuggan
            </p>
            <h3 className="text-base font-extrabold" style={{ color: "var(--reader-heading)" }}>
              Xusuus-qorkaaga
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border"
            style={{ borderColor: "var(--reader-border)", color: "var(--reader-muted)" }}
            aria-label="Xir"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1 border-b p-2" style={{ borderColor: "var(--reader-border)" }}>
          {(
            [
              { id: "bookmarks" as const, label: "Calaamadaha", count: bookmarks.length, icon: Bookmark },
              { id: "highlights" as const, label: "Xushay", count: highlights.length, icon: Highlighter },
            ]
          ).map((item) => {
            const active = tab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className="flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-xs font-bold transition-colors"
                style={{
                  background: active ? "var(--reader-accent)" : "var(--reader-surface)",
                  color: active ? "#fff" : "var(--reader-heading)",
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px]"
                  style={{
                    background: active ? "rgba(255,255,255,0.2)" : "var(--reader-border)",
                  }}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {tab === "bookmarks" && (
            sortedBookmarks.length === 0 ? (
              <EmptyState
                title="Wali ma jiraan calaamad"
                body="Xulo qoraal oo riix calaamadda, ama riix calaamadda kore si aad u kaydiso goobta aad joogto."
              />
            ) : (
              <div className="space-y-2">
                {sortedBookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="rounded-2xl border p-3"
                    style={{ borderColor: "var(--reader-border)", background: "var(--reader-surface)" }}
                  >
                    <button
                      type="button"
                      onClick={() => onJumpBookmark(bookmark)}
                      className="w-full text-left"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--reader-muted)" }}>
                            Cutub {bookmark.chapterIndex + 1}
                          </p>
                          <p className="mt-0.5 truncate text-sm font-extrabold" style={{ color: "var(--reader-heading)" }}>
                            {bookmark.chapterTitle}
                          </p>
                        </div>
                        <ChevronRight className="mt-1 h-4 w-4 shrink-0" style={{ color: "var(--reader-accent)" }} />
                      </div>
                      <p className="mt-2 line-clamp-3 text-xs leading-5" style={{ color: "var(--reader-body)" }}>
                        {bookmark.previewText || "Calaamad laga dhigay cutubkan."}
                      </p>
                    </button>
                    <div className="mt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => onDeleteBookmark(bookmark.id)}
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold"
                        style={{ color: "var(--reader-muted)" }}
                        aria-label="Tirtir calaamadda"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Tirtir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {tab === "highlights" && (
            highlights.length === 0 ? (
              <EmptyState
                title="Wali ma jiraan xushay"
                body="Xulo qoraal cutubka dhexdiisa, ka dibna dooro midab si aad u kaydiso."
              />
            ) : (
              <div className="space-y-4">
                {Object.entries(groupedHighlights).map(([chapterKey, chapterHighlights]) => (
                  <div key={chapterKey} className="space-y-2">
                    <p className="px-1 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--reader-muted)" }}>
                      Cutub {Number(chapterKey) + 1}
                    </p>
                    {chapterHighlights.map((entry) => {
                      const palette = colorMap[entry.color] || colorMap.gold;
                      return (
                        <div
                          key={entry.id}
                          className="rounded-2xl border p-3"
                          style={{ borderColor: "var(--reader-border)", background: "var(--reader-surface)" }}
                        >
                          <button type="button" onClick={() => onJumpHighlight(entry)} className="w-full text-left">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="inline-block h-3 w-3 rounded-full" style={{ background: palette.swatch }} />
                                <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--reader-muted)" }}>
                                  {palette.label}
                                </span>
                              </div>
                              <ChevronRight className="h-4 w-4 shrink-0" style={{ color: "var(--reader-accent)" }} />
                            </div>
                            <p
                              className="mt-2 rounded-xl px-2.5 py-2 text-xs leading-6"
                              style={{
                                background: `color-mix(in srgb, ${palette.swatch} 28%, transparent)`,
                                color: "var(--reader-heading)",
                              }}
                            >
                              “{entry.text}”
                            </p>
                          </button>
                          <div className="mt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={() => onDeleteHighlight(entry.id)}
                              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold"
                              style={{ color: "var(--reader-muted)" }}
                              aria-label="Tirtir xushadda"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Tirtir
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </aside>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="mt-6 rounded-2xl border border-dashed p-5 text-center"
      style={{ borderColor: "var(--reader-border)", background: "var(--reader-surface)" }}
    >
      <p className="text-sm font-bold" style={{ color: "var(--reader-heading)" }}>{title}</p>
      <p className="mt-2 text-xs leading-6" style={{ color: "var(--reader-muted)" }}>{body}</p>
    </div>
  );
}
