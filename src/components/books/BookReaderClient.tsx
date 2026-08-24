"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { get as idbGet, set as idbSet } from "idb-keyval";
import { useSession } from "next-auth/react";
import {
  saveProgressAction,
  loadProgressAction,
  syncBookmarksAction,
  syncHighlightsAction,
  loadBookmarksAction,
  loadHighlightsAction,
  deleteBookmarkAction,
  deleteHighlightAction,
} from "@/app/actions/reader";
import { createClient } from "@/lib/supabase/client";
import {
  ChevronLeft,
  ChevronRight,
  List,
  X,
  BookOpen,
  Lock,
  CreditCard,
  Sparkles,
  Bookmark,
  Check,
  Search,
  Flame,
  PartyPopper,
  Sun,
  Moon,
  Eye,
  Minus,
  Plus,
  Settings2,
  Maximize,
  Minimize,
  Highlighter,
} from "lucide-react";

import ReaderBackButton from "@/components/reader/ReaderBackButton";
import ReaderSearchBar from "@/components/reader/ReaderSearchBar";
import ReaderSettingsSheet, {
  type ReaderTheme,
  type FontFamily,
  type LineSpacing,
} from "@/components/reader/ReaderSettingsSheet";
import { type BookmarkEntry } from "@/components/reader/BookmarksPanel";
import { type HighlightEntry, type HighlightColor } from "@/components/reader/HighlightsPanel";
import AnnotationsSheet, { type AnnotationsTab } from "@/components/reader/AnnotationsSheet";
import HighlightToolbar from "@/components/reader/HighlightToolbar";
import { applyHighlightsToHtml } from "@/lib/reader/applyHighlights";
import { BookCard, type BookCardData } from "@/components/books/BookCard";

type TocItem = { title: string; file: string };

const THEME_STYLES: Record<ReaderTheme, React.CSSProperties> = {
  light: {
    "--reader-bg": "#FFFFFF",
    "--reader-surface": "#F9F6F1",
    "--reader-border": "#E8DFD2",
    "--reader-heading": "#201B16",
    "--reader-body": "#3A3028",
    "--reader-muted": "#6B5F52",
    "--reader-accent": "#7A1F2B",
  } as React.CSSProperties,
  sepia: {
    "--reader-bg": "#F5EDD6",
    "--reader-surface": "#EDE0C4",
    "--reader-border": "#D4BC90",
    "--reader-heading": "#2C1B0A",
    "--reader-body": "#4A3420",
    "--reader-muted": "#7A5C3A",
    "--reader-accent": "#8B4513",
  } as React.CSSProperties,
  night: {
    "--reader-bg": "#13111A",
    "--reader-surface": "#1E1B27",
    "--reader-border": "#2D2A38",
    "--reader-heading": "#EDE0FF",
    "--reader-body": "#C0B8D8",
    "--reader-muted": "#7B7493",
    "--reader-accent": "#A78BFA",
  } as React.CSSProperties,
};

const FONT_CLASSES: Record<FontFamily, string> = {
  serif: "font-serif",
  sans: "font-sans",
  mono: "font-mono",
  dyslexia: "font-dyslexia",
};

// Dyslexia high-readability style — injected once
const DYSLEXIA_STYLE_ID = "ib-dyslexia-font";
function ensureDyslexiaFont() {
  if (typeof document === "undefined") return;
  if (document.getElementById(DYSLEXIA_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = DYSLEXIA_STYLE_ID;
  style.textContent = `.font-dyslexia { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important; letter-spacing: 0.1em !important; word-spacing: 0.25em !important; line-height: 2 !important; }`;
  document.head.appendChild(style);
}

const LINE_HEIGHT: Record<LineSpacing, number> = {
  normal: 1.85,
  relaxed: 2.1,
};

const LS_THEME = "ib_reader_theme";
const LS_FONT_SIZE = "ib_reader_font_size";
const LS_FONT_FAMILY = "ib_reader_font_family";
const LS_LINE_SPACING = "ib_reader_line_spacing";

function localProgressKey(bookId: string) {
  return `ib_progress_${bookId}`;
}

function readLocalProgress(bookId: string): {
  chapterIndex: number;
  scrollOffset: number;
} | null {
  try {
    const raw = localStorage.getItem(localProgressKey(bookId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      chapterIndex: Number(parsed.chapterIndex) || 0,
      scrollOffset: Number(parsed.scrollOffset) || 0,
    };
  } catch {
    return null;
  }
}

function writeLocalProgress(
  bookId: string,
  chapterIndex: number,
  scrollOffset: number,
) {
  try {
    localStorage.setItem(
      localProgressKey(bookId),
      JSON.stringify({ chapterIndex, scrollOffset, updatedAt: Date.now() }),
    );
  } catch {}
}

// ── Streak helpers ─────────────────────────────────────────────────────────
function streakKey(bookId: string) { return `ib_streak_${bookId}`; }

function recordReadingDay(bookId: string) {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const raw = localStorage.getItem(streakKey(bookId));
    const days: string[] = raw ? JSON.parse(raw) : [];
    if (!days.includes(today)) {
      days.push(today);
      // keep last 60 days only
      if (days.length > 60) days.splice(0, days.length - 60);
      localStorage.setItem(streakKey(bookId), JSON.stringify(days));
    }
  } catch {}
}

function computeStreak(bookId: string): number {
  try {
    const raw = localStorage.getItem(streakKey(bookId));
    if (!raw) return 0;
    const days: string[] = JSON.parse(raw);
    if (days.length === 0) return 0;
    const sorted = [...days].sort().reverse();
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (sorted[0] !== today && sorted[0] !== yesterday) return 0;
    let streak = 1;
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);
      const diff = Math.round((prev.getTime() - curr.getTime()) / 86400000);
      if (diff === 1) streak++;
      else break;
    }
    return streak;
  } catch { return 0; }
}

// ── IndexedDB chapter cache ────────────────────────────────────────────────
const IDB_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

async function getChapterFromCache(key: string): Promise<string | null> {
  try {
    const entry = await idbGet<{ html: string; ts: number }>(key);
    if (!entry) return null;
    if (Date.now() - entry.ts > IDB_TTL_MS) return null;
    return entry.html;
  } catch { return null; }
}

async function setChapterInCache(key: string, html: string) {
  try {
    await idbSet(key, { html, ts: Date.now() });
  } catch {}
}

export default function BookReaderClient({
  bookId, // For backwards compatibility, will represent itemId
  itemType = "book",
  bookTitle,
  bookAuthor,
  isPreview = false,
  returnTarget,
  initialChapter = 0,
  initialScrollOffset = 0,
  relatedBooks = [],
  isPaid = false,
}: {
  bookId: string;
  itemType?: "book" | "summary";
  bookTitle: string;
  bookAuthor: string;
  isPreview?: boolean;
  returnTarget?: string;
  initialChapter?: number;
  initialScrollOffset?: number;
  relatedBooks?: BookCardData[];
  isPaid?: boolean;
}) {
  const storageId = itemType === "summary" ? `summary_${bookId}` : bookId;
  const [fontSize, setFontSize] = useState<number>(() => {
    try {
      const savedFontSize = localStorage.getItem(LS_FONT_SIZE);
      const n = Number(savedFontSize);
      return savedFontSize && n >= 14 && n <= 30 ? n : 18;
    } catch {
      return 18;
    }
  });
  const [fontFamily, setFontFamily] = useState<FontFamily>(() => {
    try {
      const savedFontFamily = localStorage.getItem(LS_FONT_FAMILY) as FontFamily | null;
      if (savedFontFamily && ["serif", "sans", "mono", "dyslexia"].includes(savedFontFamily)) {
        if (savedFontFamily === "dyslexia") ensureDyslexiaFont();
        return savedFontFamily;
      }
    } catch {}
    return "serif";
  });
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>(() => {
    try {
      const savedTheme = localStorage.getItem(LS_THEME) as ReaderTheme | null;
      if (savedTheme && ["light", "sepia", "night"].includes(savedTheme)) {
        return savedTheme;
      }
    } catch {}
    return "light";
  });
  const [lineSpacing, setLineSpacing] = useState<LineSpacing>(() => {
    try {
      const savedSpacing = localStorage.getItem(LS_LINE_SPACING) as LineSpacing | null;
      if (savedSpacing && ["normal", "relaxed"].includes(savedSpacing)) {
        return savedSpacing;
      }
    } catch {}
    return "normal";
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chromeVisible, setChromeVisible] = useState(true);
  const { data: session } = useSession();
  const [supabaseLoggedIn, setSupabaseLoggedIn] = useState(false);
  const isLoggedIn = Boolean(session?.user) || supabaseLoggedIn;

  const [annotationsOpen, setAnnotationsOpen] = useState(false);
  const [annotationsTab, setAnnotationsTab] = useState<AnnotationsTab>("bookmarks");
  const contentRef = useRef<HTMLElement | null>(null);
  const didHydrateRemoteAnnotations = useRef(false);
  const bookmarksRef = useRef<BookmarkEntry[]>([]);
  const highlightsRef = useRef<HighlightEntry[]>([]);
  const [highlights, setHighlights] = useState<HighlightEntry[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(`ib_highlights_${bookId}`);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [tocOpen, setTocOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [paywallModalOpen, setPaywallModalOpen] = useState(false);
  const [showPreviewCta, setShowPreviewCta] = useState(false);
  const [previewLimit, setPreviewLimit] = useState(0);

  // Phase 2 state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchHighlightedHtml, setSearchHighlightedHtml] = useState<string | null>(null);
  const [streakDays] = useState(() => {
    if (!isPreview) {
      try {
        recordReadingDay(bookId);
      } catch {}
    }
    return !isPreview ? computeStreak(bookId) : 0;
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const [offlineBanner, setOfflineBanner] = useState(false);
  const [ownerNudgeDismissed, setOwnerNudgeDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(`ib_owner_nudge_${bookId}`) === "true";
    } catch {
      return false;
    }
  });
  const [resumeBanner, setResumeBanner] = useState<{
    chapter: number;
    pct: number;
  } | null>(null);

  useEffect(() => {
    if (session) return;

    let active = true;
    const supabase = createClient();

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (active) setSupabaseLoggedIn(Boolean(user));
    };

    void checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (active) setSupabaseLoggedIn(Boolean(currentSession?.user));
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, [session]);

  const dismissOwnerNudge = useCallback(() => {
    setOwnerNudgeDismissed(true);
    try {
      sessionStorage.setItem(`ib_owner_nudge_${bookId}`, "true");
    } catch {}
  }, [bookId]);

  // Phase 3 state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const lastScrollTime = useRef(0);

  const [toc, setToc] = useState<TocItem[] | null>(null);
  const [currentHtml, setCurrentHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);
  const [hasContent, setHasContent] = useState(true);

  const [initialLoadDone, setInitialLoadDone] = useState(isPreview);
  const [scrollProgressPct, setScrollProgressPct] = useState(0);
  const timeSpentRef = useRef(0);
  const chapterRef = useRef(initialChapter);
  const scrollOffsetRef = useRef(initialScrollOffset);
  const pendingScrollRestore = useRef(initialScrollOffset);
  const lastScrollY = useRef(0);
  const saveScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endSentinelRef = useRef<HTMLDivElement | null>(null);
  const restoredOnce = useRef(false);

  const SUPABASE_URL =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://gdsmqhhzddjixifznecx.supabase.co";

  const changeTheme = (t: ReaderTheme) => {
    setReaderTheme(t);
    try {
      localStorage.setItem(LS_THEME, t);
    } catch {}
  };

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => {
      const next = Math.min(30, Math.max(14, prev + delta));
      try {
        localStorage.setItem(LS_FONT_SIZE, String(next));
      } catch {}
      return next;
    });
  };

  const changeFontFamily = (f: FontFamily) => {
    setFontFamily(f);
    if (f === "dyslexia") ensureDyslexiaFont();
    try {
      localStorage.setItem(LS_FONT_FAMILY, f);
    } catch {}
  };

  const changeLineSpacing = (s: LineSpacing) => {
    setLineSpacing(s);
    try {
      localStorage.setItem(LS_LINE_SPACING, s);
    } catch {}
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else if (document.exitFullscreen) {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  const bookmarkListKey = `ib_bookmarks_${bookId}`;
  const legacyBookmarkKey = `ib_bm_${bookId}`;

  const normalizeBookmark = (raw: unknown): BookmarkEntry | null => {
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
  };

  const readBookmarks = () => {
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
  };

  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>(() => readBookmarks());
  bookmarksRef.current = bookmarks;
  highlightsRef.current = highlights;

  const mergeLocalAndRemoteBookmarks = useCallback((localEntries: BookmarkEntry[], remoteEntries: BookmarkEntry[]) => {
    const merged = new Map<string, BookmarkEntry>();

    [...remoteEntries, ...localEntries].forEach((entry) => {
      const key = `${entry.bookId}|${entry.chapterIndex}|${Math.round(entry.scrollOffset / 150)}|${entry.previewText.slice(0, 60)}`;
      const existing = merged.get(key);
      if (!existing || new Date(entry.createdAt).getTime() > new Date(existing.createdAt).getTime()) {
        merged.set(key, entry);
      }
    });

    return Array.from(merged.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, []);

  const mergeLocalAndRemoteHighlights = useCallback((localEntries: HighlightEntry[], remoteEntries: HighlightEntry[]) => {
    const merged = new Map<string, HighlightEntry>();

    [...remoteEntries, ...localEntries].forEach((entry) => {
      const key = `${entry.bookId}|${entry.chapterIndex}|${entry.color}|${entry.text.slice(0, 60)}`;
      const existing = merged.get(key);
      if (!existing || new Date(entry.createdAt).getTime() > new Date(existing.createdAt).getTime()) {
        merged.set(key, entry);
      }
    });

    return Array.from(merged.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, []);

  const syncBookmarksToCloud = useCallback(async (next: BookmarkEntry[]) => {
    if (!isLoggedIn || typeof window === "undefined") return;
    const formData = new FormData();
    formData.append("bookId", String(bookId));
    formData.append("items", JSON.stringify(next));
    await syncBookmarksAction(formData);
  }, [bookId, isLoggedIn]);

  const syncHighlightsToCloud = useCallback(async (next: HighlightEntry[]) => {
    if (!isLoggedIn || typeof window === "undefined") return;
    const formData = new FormData();
    formData.append("bookId", String(bookId));
    formData.append("items", JSON.stringify(next));
    await syncHighlightsAction(formData);
  }, [bookId, isLoggedIn]);

  const isBookmarked = bookmarks.some(
    (bookmark) =>
      bookmark.chapterIndex === currentChapter &&
      Math.abs(bookmark.scrollOffset - scrollOffsetRef.current) < 250,
  );

  const persistBookmarks = useCallback((next: BookmarkEntry[]) => {
    setBookmarks(next);
    try {
      localStorage.setItem(bookmarkListKey, JSON.stringify(next));
    } catch {}
    if (isLoggedIn) {
      void syncBookmarksToCloud(next);
    }
  }, [bookmarkListKey, isLoggedIn, syncBookmarksToCloud]);

  const persistHighlights = useCallback((next: HighlightEntry[]) => {
    setHighlights(next);
    try {
      localStorage.setItem(`ib_highlights_${bookId}`, JSON.stringify(next));
    } catch {}
    if (isLoggedIn) {
      void syncHighlightsToCloud(next);
    }
  }, [bookId, isLoggedIn, syncHighlightsToCloud]);

  const toggleBookmark = () => {
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
  };

  const jumpToBookmark = (bookmark: BookmarkEntry) => {
    setAnnotationsOpen(false);
    setCurrentChapter(bookmark.chapterIndex);
    pendingScrollRestore.current = bookmark.scrollOffset;
    scrollOffsetRef.current = bookmark.scrollOffset;
    setChromeVisible(true);
    window.setTimeout(() => {
      window.scrollTo({ top: bookmark.scrollOffset, behavior: "smooth" });
    }, 80);
  };

  const jumpToHighlight = (highlight: HighlightEntry) => {
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
  };

  const createHighlight = (text: string, color: HighlightColor = "gold") => {
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
  };

  const createBookmarkFromText = (text: string) => {
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
  };

  const removeBookmark = (id: string) => {
    persistBookmarks(bookmarksRef.current.filter((item) => item.id !== id));
    if (isLoggedIn) void deleteBookmarkAction(id);
  };

  const removeHighlight = (id: string) => {
    persistHighlights(highlightsRef.current.filter((item) => item.id !== id));
    if (isLoggedIn) void deleteHighlightAction(id);
  };

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

  const annotatedHtml = useMemo(() => {
    const chapterItems = highlights.filter((h) => h.chapterIndex === currentChapter);
    return applyHighlightsToHtml(currentHtml, chapterItems);
  }, [currentHtml, highlights, currentChapter]);


  // TOC
  useEffect(() => {
    async function loadToc() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/storage/v1/object/public/book-content/${storageId}/toc.json`,
        );
        if (!res.ok) throw new Error("TOC not found");
        const data = await res.json();
        setToc(Array.isArray(data) ? data : []);
        setHasContent(true);
      } catch {
        setToc([]);
        setHasContent(false);
        setLoading(false);
      }
    }
    loadToc();
  }, [bookId, SUPABASE_URL]);

  // Find the first chapter with real prose for the preview limit
  useEffect(() => {
    if (!toc || toc.length === 0) return;
    let cancelled = false;

    async function findFirstProseChapter() {
      let firstProse = 0;
      for (let i = 0; i < Math.min(toc!.length, 10); i++) {
        try {
          const res = await fetch(`${SUPABASE_URL}/storage/v1/object/public/book-content/${storageId}/${toc![i].file}`);
          const html = await res.text();
          const pCount = (html.match(/<p\b[^>]*>/gi) || []).length;
          if (pCount >= 3) {
            firstProse = i;
            break;
          }
        } catch (e) {}
      }
      if (!cancelled) {
        setPreviewLimit(firstProse);
        // If in preview mode and currently on chapter 0 (default), jump straight to the real content
        if (isPreview && currentChapter === 0 && firstProse > 0) {
          setCurrentChapter(firstProse);
          chapterRef.current = firstProse;
        }
      }
    }
    findFirstProseChapter();

    return () => { cancelled = true; };
  }, [toc, bookId, SUPABASE_URL, isPreview]);

  // Progress bootstrap
  useEffect(() => {
    if (isPreview) {
      setInitialLoadDone(true);
      return;
    }

    async function bootstrap() {
      const local = readLocalProgress(bookId);
      let chapter = initialChapter;
      let offset = initialScrollOffset;

      if (initialChapter > 0 || initialScrollOffset > 0) {
        chapter = initialChapter;
        offset = initialScrollOffset;
      } else {
        const progress = itemType !== "summary" ? await loadProgressAction(Number(bookId)) : null;
        if (progress) {
          chapter = progress.chapterIndex ?? 0;
          offset = progress.scrollOffset ?? 0;
          timeSpentRef.current = progress.timeSpent ?? 0;
        } else if (local) {
          chapter = local.chapterIndex;
          offset = local.scrollOffset;
        }
      }

      // Prefer newer local scroll if same chapter
      if (local && local.chapterIndex === chapter && local.scrollOffset > offset) {
        offset = local.scrollOffset;
      }

      setCurrentChapter(chapter);
      chapterRef.current = chapter;
      scrollOffsetRef.current = offset;
      pendingScrollRestore.current = offset;

      if (offset > 120) {
        setResumeBanner({
          chapter,
          pct: Math.min(99, Math.round((offset / Math.max(offset + 400, 800)) * 100)),
        });
      }

      setInitialLoadDone(true);
    }

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, isPreview]);

  useEffect(() => {
    if (isPreview) return;
    const timer = setInterval(() => {
      timeSpentRef.current += 30;
    }, 30000);
    return () => clearInterval(timer);
  }, [isPreview]);

  const showSavedToast = useCallback(() => {
    // Disabled visual toast for silent saving
  }, []);

  const saveProgress = useCallback(() => {
    if (!initialLoadDone || !bookId || isPreview || itemType === "summary") return;
    writeLocalProgress(bookId, chapterRef.current, scrollOffsetRef.current);
    const fd = new FormData();
    fd.append("bookId", bookId);
    fd.append("chapterIndex", String(chapterRef.current));
    fd.append("scrollOffset", String(Math.round(scrollOffsetRef.current)));
    fd.append("timeSpent", String(timeSpentRef.current));
    const isCompleted = toc ? chapterRef.current === toc.length - 1 : false;
    fd.append("completed", String(isCompleted));
    saveProgressAction(fd)
      .then(() => showSavedToast())
      .catch(() => {});
  }, [initialLoadDone, bookId, toc, isPreview, showSavedToast]);

  useEffect(() => {
    if (!initialLoadDone || isPreview) return;
    chapterRef.current = currentChapter;
    saveProgress();
    const interval = setInterval(saveProgress, 60000);
    return () => clearInterval(interval);
  }, [currentChapter, initialLoadDone, saveProgress, isPreview]);

  // Chapter fetch + prefetch next (with IndexedDB cache)
  useEffect(() => {
    if (!toc || toc.length === 0) return;
    let cancelled = false;

    async function loadChapter() {
      setLoading(true);
      setContentError(null);
      setShowPreviewCta(false);
      setSearchHighlightedHtml(null);
      try {
        const item = toc![currentChapter];
        if (!item) throw new Error("Chapter not found");
        const url = `${SUPABASE_URL}/storage/v1/object/public/book-content/${storageId}/${item.file}`;
        const cacheKey = `reader-${storageId}-${item.file}`;

        // Try cache first
        const cached = await getChapterFromCache(cacheKey);
        if (cached && !cancelled) {
          setCurrentHtml(cached);
          setLoading(false);
          // Background revalidate
          fetch(url).then(async (r) => {
            if (r.ok) {
              const fresh = await r.text();
              await setChapterInCache(cacheKey, fresh);
            }
          }).catch(() => {});
        } else {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Failed to load chapter.");
          const html = await res.text();
          if (!cancelled) {
            setCurrentHtml(html);
            await setChapterInCache(cacheKey, html);
          }
        }

        const next = toc![currentChapter + 1];
        if (next && !(isPreview && currentChapter === previewLimit)) {
          fetch(
            `${SUPABASE_URL}/storage/v1/object/public/book-content/${storageId}/${next.file}`,
          ).catch(() => {});
        }
      } catch (err: unknown) {
        if (!cancelled) {
          // Try cache on network failure
          const item = toc![currentChapter];
          const cacheKey = `reader-${bookId}-${item?.file}`;
          const cached = await getChapterFromCache(cacheKey);
          if (cached) {
            setCurrentHtml(cached);
            setOfflineBanner(true);
          } else {
            setContentError(err instanceof Error ? err.message : "Qalad");
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadChapter();
    return () => {
      cancelled = true;
    };
  }, [toc, currentChapter, bookId, SUPABASE_URL, isPreview, previewLimit]);

  // Restore scroll after chapter HTML paints
  useEffect(() => {
    if (loading || !currentHtml || restoredOnce.current) return;
    const offset = pendingScrollRestore.current;
    if (offset > 0 && !isPreview) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: offset, behavior: "auto" });
        scrollOffsetRef.current = offset;
      });
    }
    restoredOnce.current = true;
  }, [loading, currentHtml, isPreview]);

  // Scroll: throttled progress, auto-hide chrome, debounced save
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const now = Date.now();
      
      // Throttle heavy state updates to 100ms
      if (now - lastScrollTime.current > 100) {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const pct = Math.min(100, Math.round((y / max) * 100));
        setScrollProgressPct(pct);
        lastScrollTime.current = now;
      }
      
      scrollOffsetRef.current = y;

      if (!settingsOpen && !tocOpen && !paywallModalOpen) {
        if (y > lastScrollY.current + 8 && y > 80) {
          setChromeVisible(false);
        } else if (y < lastScrollY.current - 8) {
          setChromeVisible(true);
        }
      }
      lastScrollY.current = y;

      if (saveScrollTimer.current) clearTimeout(saveScrollTimer.current);
      saveScrollTimer.current = setTimeout(() => {
        if (!isPreview && initialLoadDone) {
          writeLocalProgress(bookId, chapterRef.current, scrollOffsetRef.current);
          saveProgress();
        }
      }, 1500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (saveScrollTimer.current) clearTimeout(saveScrollTimer.current);
    };
  }, [
    tocOpen,
    paywallModalOpen,
    isPreview,
    initialLoadDone,
    bookId,
    saveProgress,
  ]);

  // Preview CTA: show once reader scrolls ≥60% through the preview chapter
  useEffect(() => {
    if (!isPreview || currentChapter !== previewLimit || loading || !currentHtml) {
      setShowPreviewCta(false);
      return;
    }
    if (scrollProgressPct >= 60) {
      setShowPreviewCta(true);
    }
  }, [isPreview, currentChapter, previewLimit, loading, currentHtml, scrollProgressPct]);

  const chaptersCount = toc?.length ?? 0;
  const chapterTitle = toc?.[currentChapter]?.title ?? "";
  const chapterPct =
    chaptersCount > 0 ? ((currentChapter + 1) / chaptersCount) * 100 : 0;
  const blendedPct = chaptersCount
    ? Math.min(
        100,
        chapterPct - 100 / chaptersCount + scrollProgressPct / chaptersCount,
      )
    : scrollProgressPct;

  // Finish celebration: trigger when on last chapter and 90%+ scrolled
  const celebrationFired = useRef(false);
  useEffect(() => {
    if (isPreview || !toc || loading || chaptersCount === 0) return;
    if (currentChapter === chaptersCount - 1 && scrollProgressPct >= 90 && !celebrationFired.current) {
      celebrationFired.current = true;
      setShowCelebration(true);
      import("canvas-confetti").then((mod) => {
        const confetti = mod.default;
        confetti({ particleCount: 140, spread: 80, origin: { y: 0.55 }, colors: ["#7A1F2B", "#C9962E", "#A78BFA", "#fff"] });
        setTimeout(() => confetti({ particleCount: 60, spread: 55, origin: { y: 0.4 }, angle: 60 }), 400);
        setTimeout(() => confetti({ particleCount: 60, spread: 55, origin: { y: 0.4 }, angle: 120 }), 400);
      });
    }
  }, [isPreview, toc, loading, chaptersCount, currentChapter, scrollProgressPct]);


  const goTo = (idx: number) => {
    if (isPreview && idx > previewLimit) {
      setPaywallModalOpen(true);
      setTocOpen(false);
      return;
    }
    
    restoredOnce.current = true;
    pendingScrollRestore.current = 0;
    scrollOffsetRef.current = 0;
    setResumeBanner(null);
    setCurrentChapter(idx);
    setTocOpen(false);
    setChromeVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentChapter > 0) goTo(currentChapter - 1);
      if (
        e.key === "ArrowRight" &&
        chaptersCount > 0 &&
        currentChapter < chaptersCount - 1
      ) {
        goTo(currentChapter + 1);
      }
      if (e.key === "f" || e.key === "F") {
        setChromeVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapter, chaptersCount, isPreview]);

  const forceShowChrome = () => {
    setChromeVisible(true);
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const themeVars = THEME_STYLES[readerTheme];
  const chromeOpen = chromeVisible || settingsOpen || tocOpen || annotationsOpen || paywallModalOpen;

  if (!mounted) {
    return <div style={{ background: "#FFFFFF", minHeight: "100vh" }} />;
  }

  return (
    <div
      style={{
        ...themeVars,
        background: "var(--reader-bg)",
        color: "var(--reader-body)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        transition: "background 0.3s, color 0.3s",
        ["--reader-line-height" as string]: String(LINE_HEIGHT[lineSpacing]),
      }}
    >
      {/* Mobile Floating Back Button (Visible when header is hidden) */}
      <div 
        className={`md:hidden fixed top-3 left-3 z-50 transition-opacity duration-300 ${!chromeOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <ReaderBackButton
          returnTarget={returnTarget || `/books/${bookId}`}
          className="shadow-md bg-white/90 backdrop-blur-sm !min-w-[40px] !min-h-[40px] !p-2 !justify-center !rounded-full border border-gray-200"
          label=""
        />
      </div>

      {/* Header */}
      <header
        style={{
          background: "var(--reader-bg)",
          borderBottom: "1px solid var(--reader-border)",
          transform: chromeOpen ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.25s ease",
        }}
        className="sticky top-0 z-40 px-2 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-1 sm:gap-2"
      >
        {/* Left Side: Back button + Title */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-0 shrink">
          <ReaderBackButton
            returnTarget={returnTarget || `/books/${bookId}`}
            className="!min-w-[36px] !min-h-[36px] sm:!min-w-[44px] sm:!min-h-[44px] !justify-center shrink-0"
          />
          <div className="min-w-0 hidden md:block">
            <div className="flex items-center gap-1.5">
              <h1
                style={{ color: "var(--reader-heading)" }}
                className="font-display text-xs sm:text-sm font-extrabold truncate max-w-[120px] sm:max-w-xs"
              >
                {bookTitle}
              </h1>
              {isPreview && (
                <span className="shrink-0 rounded-full bg-[#C9962E]/20 text-[#C9962E] border border-[#C9962E]/40 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-extrabold uppercase">
                  Tijaabo
                </span>
              )}
            </div>
            {chapterTitle && (
              <p
                style={{ color: "var(--reader-muted)" }}
                className="text-[10px] sm:text-[11px] truncate max-w-[140px] sm:max-w-xs"
              >
                {chapterTitle}
              </p>
            )}
            {bookAuthor && (
              <p
                style={{ color: "var(--reader-muted)" }}
                className="text-[9px] sm:text-[10px] truncate max-w-[140px] sm:max-w-xs"
              >
                {bookAuthor}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: All Controls (Never clipped, beautifully responsive) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          
          {/* Theme Quick Switcher */}
          <div className="flex items-center bg-[var(--reader-surface)] rounded-xl border border-[var(--reader-border)] p-0.5 shrink-0">
            {(
              [
                { id: "light" as ReaderTheme, icon: <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, title: "Iftiin" },
                { id: "sepia" as ReaderTheme, icon: <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, title: "Sepia" },
                { id: "night" as ReaderTheme, icon: <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, title: "Habeen" },
              ]
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => changeTheme(opt.id)}
                title={opt.title}
                style={{
                  background: readerTheme === opt.id ? "var(--reader-accent)" : "transparent",
                  color: readerTheme === opt.id ? "#fff" : "var(--reader-muted)",
                  minWidth: 28,
                  minHeight: 32,
                }}
                className="rounded-[9px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center transition-colors"
                aria-label={opt.title}
              >
                {opt.icon}
              </button>
            ))}
          </div>

          {/* Desktop-only Font Family Toggles */}
          <div className="hidden lg:flex items-center bg-[var(--reader-surface)] rounded-xl border border-[var(--reader-border)] p-0.5 shrink-0">
            {(
              [
                { id: "serif" as FontFamily, label: "Serif" },
                { id: "sans" as FontFamily, label: "Sans" },
                { id: "dyslexia" as FontFamily, label: "Fudud", icon: <Eye className="w-3.5 h-3.5" /> },
              ]
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => changeFontFamily(opt.id)}
                style={{
                  background: fontFamily === opt.id ? "var(--reader-accent)" : "transparent",
                  color: fontFamily === opt.id ? "#fff" : "var(--reader-muted)",
                  minWidth: 44,
                  minHeight: 36,
                }}
                className="rounded-[10px] flex items-center justify-center gap-1 px-1.5 text-[10px] font-bold uppercase transition-colors"
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>

          {/* Font Size Stepper */}
          <div className="flex items-center bg-[var(--reader-surface)] rounded-xl border border-[var(--reader-border)] shrink-0">
            <button
              type="button"
              onClick={() => changeFontSize(-2)}
              className="w-7 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:opacity-70 text-[var(--reader-muted)]"
              title="Yaree xarfaha"
              aria-label="Yaree xarfaha"
            >
              <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <span className="text-[11px] sm:text-[12px] font-mono font-bold text-[var(--reader-accent)] min-w-[20px] sm:min-w-[28px] text-center">
              {fontSize}
            </span>
            <button
              type="button"
              onClick={() => changeFontSize(2)}
              className="w-7 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:opacity-70 text-[var(--reader-muted)]"
              title="Kordhi xarfaha"
              aria-label="Kordhi xarfaha"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            style={{
              border: "1px solid var(--reader-border)",
              background: isFullscreen ? "var(--reader-accent)" : "var(--reader-surface)",
              color: isFullscreen ? "#fff" : "var(--reader-muted)",
            }}
            className="w-8 h-8 sm:w-11 sm:h-11 inline-flex items-center justify-center rounded-xl shrink-0"
            title={isFullscreen ? "Ka bax shaashadda buuxda" : "Shaashad buuxda"}
            aria-label="Shaashad buuxda"
          >
            {isFullscreen ? (
              <Minimize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>

          {/* Bookmark current spot */}
          <button
            type="button"
            onClick={toggleBookmark}
            style={{
              border: "1px solid var(--reader-border)",
              background: isBookmarked ? "rgba(201, 150, 46, 0.16)" : "var(--reader-surface)",
              color: isBookmarked ? "#C9962E" : "var(--reader-muted)",
            }}
            className="w-8 h-8 sm:w-11 sm:h-11 inline-flex items-center justify-center rounded-xl shrink-0"
            title={isBookmarked ? "Ka saar calaamadda" : "Calaamadee goobtan"}
            aria-label="Calaamad"
          >
            <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isBookmarked ? "fill-current" : ""}`} />
          </button>

          {/* Annotations (bookmarks + highlights list) */}
          <button
            type="button"
            onClick={() => {
              forceShowChrome();
              setAnnotationsTab(highlights.length > bookmarks.length ? "highlights" : "bookmarks");
              setAnnotationsOpen(true);
            }}
            style={{
              border: "1px solid var(--reader-border)",
              background: annotationsOpen ? "var(--reader-accent)" : "var(--reader-surface)",
              color: annotationsOpen ? "#fff" : "var(--reader-heading)",
            }}
            className="relative h-8 sm:h-11 px-2 sm:px-2.5 inline-flex items-center justify-center gap-1 rounded-xl text-xs font-bold shrink-0"
            aria-label="Xusuus-qorkaaga"
            title="Calaamadaha & xushayaasha"
          >
            <Highlighter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline">Xusuus</span>
            {(bookmarks.length + highlights.length) > 0 && (
              <span
                className="absolute -right-1 -top-1 min-w-[16px] rounded-full px-1 text-[9px] font-black leading-[16px] text-center"
                style={{ background: "#C9962E", color: "#1A1208" }}
              >
                {bookmarks.length + highlights.length}
              </span>
            )}
          </button>

          {/* Chapters (TOC) button */}
          {chaptersCount > 0 && (
            <button
              type="button"
              onClick={() => {
                forceShowChrome();
                setTocOpen(true);
              }}
              style={{
                border: "1px solid var(--reader-border)",
                background: tocOpen ? "var(--reader-accent)" : "var(--reader-surface)",
                color: tocOpen ? "#fff" : "var(--reader-heading)",
              }}
              className="h-8 sm:h-11 px-2 sm:px-2.5 inline-flex items-center justify-center gap-1 rounded-xl text-xs font-bold shrink-0"
              aria-label="Cutubyada"
              title="Cutubyada"
            >
              <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: tocOpen ? "#fff" : "var(--reader-accent)" }} />
              <span className="hidden md:inline">Cutubyada</span>
            </button>
          )}

          {/* Search button */}
          <button
            type="button"
            onClick={() => { forceShowChrome(); setSearchOpen((v) => !v); }}
            style={{
              border: "1px solid var(--reader-border)",
              background: searchOpen ? "var(--reader-accent)" : "var(--reader-surface)",
              color: searchOpen ? "#fff" : "var(--reader-muted)",
            }}
            className="w-8 h-8 sm:w-11 sm:h-11 inline-flex items-center justify-center rounded-xl shrink-0"
            aria-label="Raadi"
            title="Raadi"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Settings button (opens full drawer with font family, line spacing, etc.) */}
          <button
            type="button"
            onClick={() => {
              forceShowChrome();
              setSettingsOpen(true);
            }}
            style={{
              border: "1px solid var(--reader-border)",
              background: settingsOpen ? "var(--reader-accent)" : "var(--reader-surface)",
              color: settingsOpen ? "#fff" : "var(--reader-heading)",
            }}
            className="w-8 h-8 sm:w-11 sm:h-11 inline-flex items-center justify-center rounded-xl shrink-0"
            aria-label="Dejinta"
            title="Dejinta"
          >
            <Settings2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Streak chip — shown when ≥2 days */}
          {!isPreview && streakDays >= 2 && (
            <span
              style={{
                background: "linear-gradient(135deg, #EA580C 0%, #EAB308 100%)",
                color: "#fff",
                fontSize: 10,
                fontWeight: 800,
                padding: "0.15rem 0.45rem",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                gap: 2,
                userSelect: "none",
              }}
              className="shrink-0 hidden xs:inline-flex"
              title={`${streakDays} maalmood oo xiriir ah`}
            >
              <Flame className="w-2.5 h-2.5" />
              {streakDays}
            </span>
          )}
        </div>
      </header>

      {/* Offline banner */}
      {offlineBanner && (
        <div
          style={{ background: "#92400E", color: "#FEF3C7" }}
          className="px-4 py-2 text-xs font-semibold flex items-center justify-between"
        >
          <span>📶 Xog-warsaadka laaantii — waad akhrisan kartaa</span>
          <button type="button" onClick={() => setOfflineBanner(false)} className="ml-2 opacity-70" aria-label="Xir">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* In-book search bar */}
      <ReaderSearchBar
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        html={currentHtml}
        onHighlightedHtml={setSearchHighlightedHtml}
      />

      <AnnotationsSheet
        open={annotationsOpen}
        tab={annotationsTab}
        onTabChange={setAnnotationsTab}
        bookmarks={bookmarks}
        highlights={highlights}
        onClose={() => setAnnotationsOpen(false)}
        onJumpBookmark={jumpToBookmark}
        onJumpHighlight={jumpToHighlight}
        onDeleteBookmark={removeBookmark}
        onDeleteHighlight={removeHighlight}
      />
      <HighlightToolbar
        contentRef={contentRef}
        enabled={!annotationsOpen && !settingsOpen && !tocOpen && !searchOpen}
        onHighlight={createHighlight}
        onBookmark={createBookmarkFromText}
      />

      {/* Progress */}
      {chaptersCount > 0 && (
        <div
          style={{
            background: "var(--reader-border)",
            opacity: chromeOpen ? 1 : 0.35,
          }}
          className="sticky top-0 z-30 w-full h-1"
        >
          <div
            style={{
              background: "var(--reader-accent)",
              width: `${Math.max(blendedPct, 2)}%`,
            }}
            className="h-1 transition-all duration-300"
          />
        </div>
      )}

      {resumeBanner && !isPreview && (
        <div
          style={{
            background: "var(--reader-surface)",
            borderBottom: "1px solid var(--reader-border)",
          }}
          className="px-4 py-2.5 flex items-center justify-between gap-3 text-sm"
        >
          <p style={{ color: "var(--reader-body)" }} className="text-xs font-semibold m-0">
            Sii wad · Cutub {resumeBanner.chapter + 1}
            {chapterTitle ? ` · ${chapterTitle}` : ""}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({
                  top: pendingScrollRestore.current || scrollOffsetRef.current,
                  behavior: "smooth",
                });
                setResumeBanner(null);
              }}
              style={{ background: "var(--reader-accent)", color: "#fff", minHeight: 36 }}
              className="px-3 rounded-lg text-xs font-bold"
            >
              Sii wad
            </button>
            <button
              type="button"
              onClick={() => setResumeBanner(null)}
              style={{ color: "var(--reader-muted)", minWidth: 36, minHeight: 36 }}
              className="inline-flex items-center justify-center"
              aria-label="Xir"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <main
        className="flex-grow max-w-[720px] mx-auto px-4 sm:px-8 py-6 sm:py-12 w-full"
        onClick={() => {
          if (!settingsOpen && !tocOpen && !annotationsOpen) setChromeVisible((v) => !v);
        }}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
          touchStartY.current = e.touches[0].clientY;
        }}
        onTouchEnd={(e) => {
          if (!touchStartX.current || !touchStartY.current) return;
          const deltaX = e.changedTouches[0].clientX - touchStartX.current;
          const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
          
          // Must be mostly horizontal swipe
          if (deltaY < 50 && Math.abs(deltaX) > 80) {
            if (deltaX > 0 && currentChapter > 0) goTo(currentChapter - 1); // Swipe right = prev
            else if (deltaX < 0 && currentChapter < chaptersCount - 1) goTo(currentChapter + 1); // Swipe left = next
          }
          touchStartX.current = null;
          touchStartY.current = null;
        }}
      >
        {!hasContent && !loading && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <div
              style={{
                background: "var(--reader-surface)",
                border: "1px solid var(--reader-border)",
              }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
            >
              <BookOpen className="w-8 h-8" style={{ color: "var(--reader-accent)" }} />
            </div>
            <h2
              style={{ color: "var(--reader-heading)" }}
              className="font-display text-xl font-extrabold"
            >
              Nuxurka buugga wali lama keenin
            </h2>
            <Link
              href={`/books/${bookId}`}
              style={{ background: "var(--reader-accent)", color: "#fff" }}
              className="px-5 py-2.5 rounded-xl text-sm font-bold"
            >
              ← Ku noqo Buugga
            </Link>
          </div>
        )}

        {loading && hasContent && (
          <div className="space-y-4 py-6 animate-pulse" aria-busy="true">
            <div
              style={{ background: "var(--reader-border)" }}
              className="h-8 w-2/3 rounded-lg"
            />
            <div
              style={{ background: "var(--reader-border)" }}
              className="h-4 w-full rounded"
            />
            <div
              style={{ background: "var(--reader-border)" }}
              className="h-4 w-[92%] rounded"
            />
            <div
              style={{ background: "var(--reader-border)" }}
              className="h-4 w-[88%] rounded"
            />
            <div
              style={{ background: "var(--reader-border)" }}
              className="h-4 w-full rounded"
            />
            <div
              style={{ background: "var(--reader-border)" }}
              className="h-4 w-[70%] rounded"
            />
            <div
              style={{ background: "var(--reader-border)" }}
              className="h-40 w-full rounded-xl mt-6"
            />
            <p
              style={{ color: "var(--reader-muted)" }}
              className="text-sm font-bold text-center pt-4"
            >
              Diyaarinta cutubka...
            </p>
          </div>
        )}

        {contentError && (
          <div className="text-center py-16">
            <p className="text-red-500 font-bold mb-2">Qalad ayaa dhacay</p>
            <p style={{ color: "var(--reader-muted)" }} className="text-sm">
              {contentError}
            </p>
          </div>
        )}

        {!loading && !contentError && hasContent && currentHtml && (
          <article
            ref={contentRef}
            lang="so"
            className={FONT_CLASSES[fontFamily]}
            style={{ fontSize: `${fontSize}px` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="reader-prose"
              dangerouslySetInnerHTML={{ __html: searchHighlightedHtml || annotatedHtml }}
            />
            <div ref={endSentinelRef} className="h-4 w-full" aria-hidden />
          </article>
        )}

        {/* Related Books Strip — inline after chapter finishes */}
        {!loading && !contentError && hasContent && relatedBooks && relatedBooks.length > 0 && (
          <div
            className="mt-14 pt-8 border-t border-[var(--reader-border)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display text-base sm:text-lg font-extrabold" style={{ color: "var(--reader-heading)" }}>
                  Akhristayaashu waxay sidoo kale jeclaadeen
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--reader-muted)" }}>
                  Buugaag kale oo xioso leh oo aad ka heli karto maktabada
                </p>
              </div>
              <Link
                href="/books"
                className="text-xs font-bold hover:underline flex items-center gap-1 shrink-0 ml-2"
                style={{ color: "var(--reader-accent)" }}
              >
                Dhammaan →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedBooks.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        )}

        {/* Love this book? Soft Nudge for Owners (non-preview) */}
        {!isPreview && !ownerNudgeDismissed && !loading && !contentError && hasContent && (timeSpentRef.current >= 600 || scrollProgressPct >= 85) && (
          <div
            className="mt-10 rounded-2xl border border-[var(--reader-border)] p-6 sm:p-7 relative transition-all shadow-sm"
            style={{ background: "var(--reader-surface)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={dismissOwnerNudge}
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-[var(--reader-border)] opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: "var(--reader-muted)" }}
              title="Ka xidh"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C9962E]/15 text-[#C9962E]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-base font-extrabold" style={{ color: "var(--reader-heading)" }}>
                  Miyaad ka heshay buuggan?
                </h4>
                <p className="mt-1 text-xs leading-relaxed max-w-lg" style={{ color: "var(--reader-muted)" }}>
                  Waad ku mahadsan tahay akhriska! Maadaama aad buuggan leedahay, waad u hdiyayn kartaa saaxiib ama waxaad brawsarsan kartaa buugaagta kale ee maktabada.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/payment/${bookId}?isGift=true`}
                    className="btn btn-primary btn-sm text-xs"
                  >
                    🎁 U hdiyay Buuggan
                  </Link>
                  <Link
                    href="/books"
                    className="btn btn-secondary btn-sm text-xs"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    Brawsar Maktabada
                  </Link>
                  <button
                    type="button"
                    onClick={dismissOwnerNudge}
                    className="btn btn-ghost btn-sm text-xs opacity-75"
                  >
                    Ka xidh
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview CTA — only after reaching end */}
        {isPreview && currentChapter === previewLimit && !loading && showPreviewCta && (
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
              <Link href={`/payment/${bookId}?isGift=true`} className="btn btn-secondary btn-block sm:w-auto">
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
        )}

        {/* Celebration Card — on completion */}
        {showCelebration && (
          <div
            className="mt-12 mb-8 rounded-2xl border border-[var(--reader-border)] p-6 sm:p-8 text-center shadow-lg"
            style={{ background: "var(--reader-surface)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#C9962E] to-[#EAB308] text-white shadow-inner">
              <PartyPopper className="h-7 w-7" />
            </div>
            <h3 className="font-display text-xl font-extrabold" style={{ color: "var(--reader-heading)" }}>
              Hambalyo!
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed" style={{ color: "var(--reader-muted)" }}>
              Waad dhammaystirtay akhriska buuggan. Horumar wacan!
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: "IsmailBooks", text: `Waxaan dhammaystay akhriska: ${bookTitle}!`, url: window.location.href });
                  }
                }}
                className="btn btn-secondary btn-block sm:w-auto font-bold px-6 h-12"
              >
                <Sparkles className="h-4 w-4 mr-1.5" />
                La wadaag
              </button>
              <Link href="/books" className="btn btn-primary btn-block sm:w-auto font-bold px-6 h-12">
                Buug kale eeg
              </Link>
            </div>
          </div>
        )}

      </main>

      {/* Bottom dock */}
      {chaptersCount > 0 && (
        <footer
          style={{
            transform: chromeOpen ? "translateY(0)" : "translateY(120%)",
            transition: "transform 0.25s ease",
          }}
          className="sticky bottom-4 z-30 max-w-sm mx-auto w-full px-4 pb-2 pointer-events-none"
        >
          <div
            style={{
              border: "1px solid var(--reader-border)",
              background: "var(--reader-surface)",
            }}
            className="rounded-2xl p-2 flex items-center justify-between pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              disabled={currentChapter === 0}
              onClick={() => goTo(currentChapter - 1)}
              style={{
                border: "1px solid var(--reader-border)",
                color: "var(--reader-heading)",
                minWidth: 44,
                minHeight: 44,
              }}
              className="inline-flex items-center justify-center gap-1 rounded-xl text-xs font-bold disabled:opacity-30"
              aria-label="Hore"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Hore</span>
            </button>

            <div className="text-center px-2">
              <span
                style={{ color: "var(--reader-accent)" }}
                className="text-xs font-extrabold block"
              >
                {currentChapter + 1} / {chaptersCount}
              </span>
              <span style={{ color: "var(--reader-muted)" }} className="text-[10px]">
                {Math.round(blendedPct)}% dhammaystiran
              </span>
            </div>

            <button
              type="button"
              disabled={currentChapter === chaptersCount - 1 && !isPreview}
              onClick={() => goTo(currentChapter + 1)}
              style={{
                background: "var(--reader-accent)",
                color: "#fff",
                minWidth: 44,
                minHeight: 44,
              }}
              className="inline-flex items-center justify-center gap-1 rounded-xl text-xs font-bold disabled:opacity-30 px-3"
              aria-label="Xiga"
            >
              <span className="hidden sm:inline">Xiga</span>
              {isPreview && currentChapter === previewLimit ? (
                <Lock className="w-4 h-4 text-amber-300" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </footer>
      )}

      <ReaderSettingsSheet
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        readerTheme={readerTheme}
        fontFamily={fontFamily}
        fontSize={fontSize}
        lineSpacing={lineSpacing}
        isFullscreen={isFullscreen}
        onThemeChange={changeTheme}
        onFontFamilyChange={changeFontFamily}
        onFontSizeChange={changeFontSize}
        onLineSpacingChange={changeLineSpacing}
        onToggleFullscreen={toggleFullscreen}
      />

      {tocOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setTocOpen(false)}
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
                onClick={() => setTocOpen(false)}
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
                      border: isCurrent ? "1px solid var(--reader-border)" : "1px solid transparent",
                      color: isCurrent ? "var(--reader-heading)" : "var(--reader-body)",
                      opacity: isLocked ? 0.6 : 1,
                    }}
                    className={`w-full text-left px-3 py-3 rounded-xl flex items-center justify-between group hover:bg-[var(--reader-surface)] transition-colors`}
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-3">
                      <div
                        style={{ background: isCurrent ? "var(--reader-accent)" : "transparent", color: isCurrent ? "#fff" : "var(--reader-muted)" }}
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
                      idx < currentChapter && <Check className="w-4 h-4 shrink-0 text-emerald-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {paywallModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPaywallModalOpen(false)}
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
                onClick={() => setPaywallModalOpen(false)}
                className="btn btn-ghost btn-sm"
              >
                Ka noqo
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .reader-prose { line-height: var(--reader-line-height, 1.85); hyphens: none; -webkit-hyphens: none; }
        .reader-prose p { margin-bottom: 1.4em; color: var(--reader-body); }
        .reader-prose h1, .reader-prose h2, .reader-prose h3 {
          font-family: var(--font-display, serif);
          font-weight: 800;
          color: var(--reader-heading);
          margin-top: 1.8em;
          margin-bottom: 0.6em;
          line-height: 1.3;
        }
        .reader-prose h1 { font-size: 1.6em; }
        .reader-prose h2 { font-size: 1.3em; color: var(--reader-accent); }
        .reader-prose h3 { font-size: 1.1em; }
        .reader-prose blockquote {
          border-left: 3px solid var(--reader-accent);
          padding: 0.5em 1em;
          margin: 1.5em 0;
          opacity: 0.85;
          font-style: italic;
        }
        .reader-prose strong { color: var(--reader-heading); font-weight: 700; }
        .reader-prose img { max-width: 100%; height: auto; border-radius: 12px; }
        .reader-prose mark.ib-hl {
          border-radius: 3px;
          padding: 0.05em 0.12em;
          color: inherit;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
        }
        .reader-prose mark.ib-hl--gold { background: rgba(201, 150, 46, 0.38); }
        .reader-prose mark.ib-hl--navy { background: rgba(29, 58, 95, 0.28); }
        .reader-prose mark.ib-hl--oxblood { background: rgba(112, 25, 61, 0.28); }
        .reader-prose mark.ib-hl--green { background: rgba(46, 125, 91, 0.28); }
      `}</style>
    </div>
  );
}
