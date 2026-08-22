import type { CSSProperties } from "react";
import { Bookmark, ChevronRight, X } from "lucide-react";

export type BookmarkEntry = {
  id: string;
  bookId: string;
  chapterIndex: number;
  chapterTitle: string;
  previewText: string;
  scrollOffset: number;
  createdAt: string;
};

export default function BookmarksPanel({
  open,
  bookmarks,
  onClose,
  onJump,
}: {
  open: boolean;
  bookmarks: BookmarkEntry[];
  onClose: () => void;
  onJump: (chapterIndex: number, scrollOffset: number) => void;
}) {
  if (!open) return null;

  const panelStyle: CSSProperties = {
    background: "var(--reader-bg)",
    borderColor: "var(--reader-border)",
    color: "var(--reader-body)",
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-[1px]">
      <button
        type="button"
        aria-label="Close bookmark list"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <aside
        style={panelStyle}
        className="relative z-10 h-full w-full max-w-md border-l shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3" style={{ borderColor: "var(--reader-border)", background: "var(--reader-surface)" }}>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "rgba(201, 150, 46, 0.14)", color: "#C9962E" }}>
              <Bookmark className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--reader-muted)" }}>Buuggan</p>
              <h3 className="text-base font-extrabold" style={{ color: "var(--reader-heading)" }}>Calaamadaha</h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border"
            style={{ borderColor: "var(--reader-border)", color: "var(--reader-muted)" }}
            aria-label="Close bookmark list"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-[calc(100%-73px)] overflow-y-auto p-3">
          {bookmarks.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed p-5 text-center" style={{ borderColor: "var(--reader-border)", background: "var(--reader-surface)" }}>
              <p className="text-sm font-bold" style={{ color: "var(--reader-heading)" }}>Wali ma jiraan calaamad</p>
              <p className="mt-2 text-xs leading-6" style={{ color: "var(--reader-muted)" }}>
                Markaad calaamadiso qodob ama cutub, halkan ayuu ka muuqan doonaa.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {bookmarks
                .slice()
                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                .map((bookmark) => (
                  <button
                    key={bookmark.id}
                    type="button"
                    onClick={() => onJump(bookmark.chapterIndex, bookmark.scrollOffset)}
                    className="w-full rounded-2xl border p-3 text-left transition-transform duration-150 hover:-translate-y-0.5"
                    style={{
                      borderColor: "var(--reader-border)",
                      background: "var(--reader-surface)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--reader-muted)" }}>
                          Cutub {bookmark.chapterIndex + 1}
                        </p>
                        <p className="mt-1 text-sm font-extrabold truncate" style={{ color: "var(--reader-heading)" }}>
                          {bookmark.chapterTitle}
                        </p>
                      </div>
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0" style={{ color: "var(--reader-accent)" }} />
                    </div>

                    <p className="mt-2 line-clamp-3 text-xs leading-5" style={{ color: "var(--reader-body)" }}>
                      {bookmark.previewText || "Calaamad laga dhigay cutubkan."}
                    </p>
                  </button>
                ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
