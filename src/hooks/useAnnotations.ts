"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  syncBookmarksAction,
  syncHighlightsAction,
  loadBookmarksAction,
  loadHighlightsAction,
  deleteBookmarkAction,
  deleteHighlightAction,
} from "@/app/actions/reader";
import type { BookmarkEntry } from "@/components/reader/BookmarksPanel";
import type { HighlightEntry, HighlightColor } from "@/components/reader/HighlightsPanel";
import type { AnnotationsTab } from "@/components/reader/AnnotationsSheet";
import type { TocItem } from "@/hooks/useReaderProgress";

export interface UseAnnotationsOptions {
  bookId: string;
  isLoggedIn: boolean;
  currentChapter: number;
  scrollOffsetRef: React.MutableRefObject<number>;
  toc: TocItem[] | null;
  currentHtml: string;
  setCurrentChapter: (chapter: number) => void;
  pendingScrollRestore: React.MutableRefObject<number>;
  setChromeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useAnnotations({
  bookId,
  isLoggedIn,
  currentChapter,
  scrollOffsetRef,
  toc,
  currentHtml,
  setCurrentChapter,
  pendingScrollRestore,
  setChromeVisible,
}: UseAnnotationsOptions) {
  const [annotationsOpen, setAnnotationsOpen] = useState(false);
  const [annotationsTab, setAnnotationsTab] = useState<AnnotationsTab>("bookmarks");
  const didHydrateRemoteAnnotations = useRef(false);
  const bookmarksRef = useRef<BookmarkEntry[]>([]);
  const highlightsRef = useRef<HighlightEntry[]>([]);

  // Initialise to empty; populated after mount in the hydration useEffect below.
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>([]);
  const [highlights, setHighlights] = useState<HighlightEntry[]>([]);

  bookmarksRef.current = bookmarks;
  highlightsRef.current = highlights;

  const bookmarkListKey = `ib_bookmarks_${bookId}`;
  const legacyBookmarkKey = `ib_bm_${bookId}`;

  const normalizeBookmark = useCallback(
    (raw: unknown): BookmarkEntry | null => {
      if (!raw || typeof raw !== "object") return null;
      const item = raw as Record<string, unknown>;
      const chapterIndex = Number(item.chapterIndex ?? item.chapter_index ?? 0);
      const scrollOffset = Number(item.scrollOffset ?? item.scroll_offset ?? 0);
      const chapterTitle =
        typeof item.chapterTitle === "string" && item.chapterTitle.trim()
          ? item.chapterTitle
          : typeof item.title === "string" && item.title.trim()
            ? item.title
            : `Cutubka ${chapterIndex + 1}`;
      const previewText =
        typeof item.previewText === "string" && item.previewText.trim()
          ? item.previewText
          : typeof item.preview === "string" && item.preview.trim()
            ? item.preview
            : `${chapterTitle} — marka aan ku calaamadisay.`;
      const createdAt =
        typeof item.createdAt === "string" && item.createdAt
          ? item.createdAt
          : typeof item.timestamp === "string" && item.timestamp
            ? item.timestamp
            : new Date().toISOString();

      if (!Number.isFinite(chapterIndex)) return null;

      return {
        id: String(item.id || `bookmark-${bookId}-${chapterIndex}-${Math.round(scrollOffset / 100)}`),
        bookId,
        chapterIndex,
        chapterTitle,
        previewText,
        scrollOffset,
        createdAt,
      };
    },
    [bookId],
  );

  const readBookmarks = useCallback(() => {
    if (typeof window === "undefined") return [];
    try {
      const rawList = localStorage.getItem(bookmarkListKey);
      if (rawList) {
        const parsed = JSON.parse(rawList);
        if (Array.isArray(parsed)) {
          return parsed
            .map((item) => normalizeBookmark(item))
            .filter((item): item is BookmarkEntry => Boolean(item));
        }
      }

      const legacyRaw = localStorage.getItem(legacyBookmarkKey);
      if (legacyRaw) {
        const legacy = normalizeBookmark(JSON.parse(legacyRaw));
        const migrated = legacy ? [legacy] : [];
        localStorage.setItem(bookmarkListKey, JSON.stringify(migrated));
        localStorage.removeItem(legacyBookmarkKey);
        return migrated;
      }

      return [];
    } catch {
      return [];
    }
  }, [bookmarkListKey, legacyBookmarkKey, normalizeBookmark]);

  // Post-mount local storage hydration
  useEffect(() => {
    // Bookmarks
    const localBookmarks = readBookmarks();
    if (localBookmarks.length > 0) setBookmarks(localBookmarks);

    // Highlights
    try {
      const raw = localStorage.getItem(`ib_highlights_${bookId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) setHighlights(parsed);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mergeLocalAndRemoteBookmarks = useCallback(
    (localEntries: BookmarkEntry[], remoteEntries: BookmarkEntry[]) => {
      const merged = new Map<string, BookmarkEntry>();

      [...remoteEntries, ...localEntries].forEach((entry) => {
        const key = `${entry.bookId}|${entry.chapterIndex}|${Math.round(entry.scrollOffset / 150)}|${entry.previewText.slice(0, 60)}`;
        const existing = merged.get(key);
        if (!existing || new Date(entry.createdAt).getTime() > new Date(existing.createdAt).getTime()) {
          merged.set(key, entry);
        }
      });

      return Array.from(merged.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    },
    [],
  );

  const mergeLocalAndRemoteHighlights = useCallback(
    (localEntries: HighlightEntry[], remoteEntries: HighlightEntry[]) => {
      const merged = new Map<string, HighlightEntry>();

      [...remoteEntries, ...localEntries].forEach((entry) => {
        const key = `${entry.bookId}|${entry.chapterIndex}|${entry.color}|${entry.text.slice(0, 60)}`;
        const existing = merged.get(key);
        if (!existing || new Date(entry.createdAt).getTime() > new Date(existing.createdAt).getTime()) {
          merged.set(key, entry);
        }
      });

      return Array.from(merged.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    },
    [],
  );

  const syncBookmarksToCloud = useCallback(
    async (next: BookmarkEntry[]) => {
      if (!isLoggedIn || typeof window === "undefined") return;
      const formData = new FormData();
      formData.append("bookId", String(bookId));
      formData.append("items", JSON.stringify(next));
      await syncBookmarksAction(formData);
    },
    [bookId, isLoggedIn],
  );

  const syncHighlightsToCloud = useCallback(
    async (next: HighlightEntry[]) => {
      if (!isLoggedIn || typeof window === "undefined") return;
      const formData = new FormData();
      formData.append("bookId", String(bookId));
      formData.append("items", JSON.stringify(next));
      await syncHighlightsAction(formData);
    },
    [bookId, isLoggedIn],
  );

  const persistBookmarks = useCallback(
    (next: BookmarkEntry[]) => {
      setBookmarks(next);
      try {
        localStorage.setItem(bookmarkListKey, JSON.stringify(next));
      } catch {}
      if (isLoggedIn) {
        void syncBookmarksToCloud(next);
      }
    },
    [bookmarkListKey, isLoggedIn, syncBookmarksToCloud],
  );

  const persistHighlights = useCallback(
    (next: HighlightEntry[]) => {
      setHighlights(next);
      try {
        localStorage.setItem(`ib_highlights_${bookId}`, JSON.stringify(next));
      } catch {}
      if (isLoggedIn) {
        void syncHighlightsToCloud(next);
      }
    },
    [bookId, isLoggedIn, syncHighlightsToCloud],
  );

  // Hydrate remote annotations when logged in
  useEffect(() => {
    if (!isLoggedIn) {
      didHydrateRemoteAnnotations.current = false;
      return;
    }
    if (didHydrateRemoteAnnotations.current) return;
    didHydrateRemoteAnnotations.current = true;

    const loadRemoteAnnotations = async () => {
      try {
        const [remoteBookmarks, remoteHighlights] = await Promise.all([
          loadBookmarksAction(Number(bookId)),
          loadHighlightsAction(Number(bookId)),
        ]);

        const mergedBookmarks = mergeLocalAndRemoteBookmarks(
          bookmarksRef.current,
          remoteBookmarks,
        );
        const mergedHighlights = mergeLocalAndRemoteHighlights(
          highlightsRef.current,
          remoteHighlights as HighlightEntry[],
        );

        persistBookmarks(mergedBookmarks);
        persistHighlights(mergedHighlights);
      } catch {}
    };

    void loadRemoteAnnotations();
  }, [
    bookId,
    isLoggedIn,
    mergeLocalAndRemoteBookmarks,
    mergeLocalAndRemoteHighlights,
    persistBookmarks,
    persistHighlights,
  ]);

  const isBookmarked = bookmarks.some(
    (bookmark) =>
      bookmark.chapterIndex === currentChapter &&
      Math.abs(bookmark.scrollOffset - scrollOffsetRef.current) < 250,
  );

  const toggleBookmark = useCallback(() => {
    try {
      const chapterTitle =
        toc?.[currentChapter]?.title || `Cutubka ${currentChapter + 1}`;
      const previewText = (() => {
        if (!currentHtml) {
          return `${chapterTitle} — waxa la calaamadiyey.`;
        }
        const clean = currentHtml
          .replace(/<script[\s\S]*?<\/script>/gi, " ")
          .replace(/<style[\s\S]*?<\/style>/gi, " ")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        return clean.slice(0, 120) || `${chapterTitle} — waxa la calaamadiyey.`;
      })();

      const existingMatch = bookmarks.find(
        (bookmark) =>
          bookmark.chapterIndex === currentChapter &&
          Math.abs(bookmark.scrollOffset - scrollOffsetRef.current) < 250,
      );

      if (existingMatch) {
        persistBookmarks(bookmarks.filter((bookmark) => bookmark.id !== existingMatch.id));
        return;
      }

      const nextBookmark: BookmarkEntry = {
        id: `bookmark-${bookId}-${currentChapter}-${Date.now()}`,
        bookId,
        chapterIndex: currentChapter,
        chapterTitle,
        previewText,
        scrollOffset: scrollOffsetRef.current,
        createdAt: new Date().toISOString(),
      };

      persistBookmarks([nextBookmark, ...bookmarks]);
    } catch {}
  }, [bookId, bookmarks, currentChapter, currentHtml, persistBookmarks, scrollOffsetRef, toc]);

  const jumpToBookmark = useCallback(
    (bookmark: BookmarkEntry) => {
      setAnnotationsOpen(false);
      setCurrentChapter(bookmark.chapterIndex);
      pendingScrollRestore.current = bookmark.scrollOffset;
      scrollOffsetRef.current = bookmark.scrollOffset;
      setChromeVisible(true);
      window.setTimeout(() => {
        window.scrollTo({ top: bookmark.scrollOffset, behavior: "smooth" });
      }, 80);
    },
    [pendingScrollRestore, scrollOffsetRef, setChromeVisible, setCurrentChapter],
  );

  const jumpToHighlight = useCallback(
    (highlight: HighlightEntry) => {
      setAnnotationsOpen(false);
      setCurrentChapter(highlight.chapterIndex);
      setChromeVisible(true);
      window.setTimeout(() => {
        const mark = document.querySelector(
          `mark[data-hl-id="${CSS.escape(highlight.id)}"]`,
        ) as HTMLElement | null;
        if (mark) {
          mark.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
        window.scrollTo({ top: highlight.scrollOffset || 0, behavior: "smooth" });
      }, 120);
    },
    [setChromeVisible, setCurrentChapter],
  );

  const createHighlight = useCallback(
    (text: string, color: HighlightColor = "gold") => {
      const cleaned = text.replace(/\s+/g, " ").trim();
      if (cleaned.length < 2) return;

      const chapterTitle = toc?.[currentChapter]?.title || `Cutubka ${currentChapter + 1}`;
      const nextHighlight: HighlightEntry = {
        id: `highlight-${bookId}-${currentChapter}-${Date.now()}`,
        bookId,
        chapterIndex: currentChapter,
        chapterTitle,
        text: cleaned,
        color,
        scrollOffset: scrollOffsetRef.current,
        createdAt: new Date().toISOString(),
      };

      persistHighlights([nextHighlight, ...highlightsRef.current]);
    },
    [bookId, currentChapter, persistHighlights, scrollOffsetRef, toc],
  );

  const createBookmarkFromText = useCallback(
    (text: string) => {
      const cleaned = text.replace(/\s+/g, " ").trim();
      if (cleaned.length < 2) return;

      const chapterTitle = toc?.[currentChapter]?.title || `Cutubka ${currentChapter + 1}`;
      const nextBookmark: BookmarkEntry = {
        id: `bookmark-${bookId}-${currentChapter}-${Date.now()}`,
        bookId,
        chapterIndex: currentChapter,
        chapterTitle,
        previewText: cleaned.length > 160 ? `${cleaned.slice(0, 157)}...` : cleaned,
        scrollOffset: scrollOffsetRef.current,
        createdAt: new Date().toISOString(),
      };

      persistBookmarks([nextBookmark, ...bookmarksRef.current]);
    },
    [bookId, currentChapter, persistBookmarks, scrollOffsetRef, toc],
  );

  const removeBookmark = useCallback(
    (id: string) => {
      persistBookmarks(bookmarksRef.current.filter((item) => item.id !== id));
      if (isLoggedIn) void deleteBookmarkAction(id);
    },
    [isLoggedIn, persistBookmarks],
  );

  const removeHighlight = useCallback(
    (id: string) => {
      persistHighlights(highlightsRef.current.filter((item) => item.id !== id));
      if (isLoggedIn) void deleteHighlightAction(id);
    },
    [isLoggedIn, persistHighlights],
  );

  return {
    bookmarks,
    setBookmarks,
    highlights,
    setHighlights,
    annotationsOpen,
    setAnnotationsOpen,
    annotationsTab,
    setAnnotationsTab,
    isBookmarked,
    toggleBookmark,
    jumpToBookmark,
    jumpToHighlight,
    createHighlight,
    createBookmarkFromText,
    removeBookmark,
    removeHighlight,
  };
}
