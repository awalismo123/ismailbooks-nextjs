"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { get as idbGet, set as idbSet } from "idb-keyval";
import { useSession } from "next-auth/react";
import { createClient } from "@/lib/supabase/client";
import dynamic from "next/dynamic";
import { type BookCardData } from "@/components/books/BookCard";
import {
  useReaderPrefs,
  THEME_STYLES,
  LINE_HEIGHT,
} from "@/hooks/useReaderPrefs";
import {
  useReaderProgress,
  type TocItem,
  writeLocalProgress,
} from "@/hooks/useReaderProgress";
import { useAnnotations } from "@/hooks/useAnnotations";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { applyHighlightsToHtml } from "@/lib/reader/applyHighlights";

import ReaderChrome from "@/components/reader/ReaderChrome";
import ReaderContent from "@/components/reader/ReaderContent";
import {
  ReaderOfflineBanner,
  ReaderResumeBanner,
  ReaderOwnerNudge,
} from "@/components/reader/ReaderBanners";
import {
  ReaderPreviewCta,
  ReaderPaywallModal,
} from "@/components/reader/ReaderPaywall";
import ReaderCelebration from "@/components/reader/ReaderCelebration";

const ReaderSearchBar = dynamic(
  () => import("@/components/reader/ReaderSearchBar"),
  { ssr: false }
);
const ReaderSettingsSheet = dynamic(
  () => import("@/components/reader/ReaderSettingsSheet"),
  { ssr: false }
);
const AnnotationsSheet = dynamic(
  () => import("@/components/reader/AnnotationsSheet"),
  { ssr: false }
);
const HighlightToolbar = dynamic(
  () => import("@/components/reader/HighlightToolbar"),
  { ssr: false }
);

const SUPABASE_URL = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error(
      "[BookReaderClient] NEXT_PUBLIC_SUPABASE_URL is not set. Check your environment variables."
    );
  }
  return url;
})();

function ensureLazyImages(html: string): string {
  if (!html) return "";
  return html.replace(/<img(?![^>]*\bloading\s*=)/gi, '<img loading="lazy"');
}

// ── IndexedDB chapter cache ────────────────────────────────────────────────
const IDB_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

async function getChapterFromCache(key: string): Promise<string | null> {
  try {
    const entry = await idbGet<{ html: string; ts: number }>(key);
    if (!entry) return null;
    if (Date.now() - entry.ts > IDB_TTL_MS) return null;
    return entry.html;
  } catch {
    return null;
  }
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

  // 1. Reader preferences (theme, font, spacing, fullscreen, chrome visibility)
  const {
    fontSize,
    fontFamily,
    readerTheme,
    lineSpacing,
    isFullscreen,
    chromeVisible,
    setChromeVisible,
    changeTheme,
    changeFontSize,
    changeFontFamily,
    changeLineSpacing,
    toggleFullscreen,
  } = useReaderPrefs();

  // Auth state
  const { data: session } = useSession();
  const [supabaseLoggedIn, setSupabaseLoggedIn] = useState(false);
  const isLoggedIn = Boolean(session?.user) || supabaseLoggedIn;

  useEffect(() => {
    if (session) return;

    let active = true;
    const supabase = createClient();

    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (active) setSupabaseLoggedIn(Boolean(user));
    };

    void checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (active) setSupabaseLoggedIn(Boolean(currentSession?.user));
      }
    );

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, [session]);

  // UI modal / panel state
  const contentRef = useRef<HTMLElement | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [paywallModalOpen, setPaywallModalOpen] = useState(false);
  const [showPreviewCta, setShowPreviewCta] = useState(false);
  const [previewLimit, setPreviewLimit] = useState(0);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchHighlightedHtml, setSearchHighlightedHtml] = useState<string | null>(null);
  const [ownerNudgeDismissed, setOwnerNudgeDismissed] = useState(false);

  // Content fetching & scroll state
  const [toc, setToc] = useState<TocItem[] | null>(null);
  const [currentHtml, setCurrentHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);
  const [hasContent, setHasContent] = useState(true);
  const [scrollProgressPct, setScrollProgressPct] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const saveScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endSentinelRef = useRef<HTMLDivElement | null>(null);

  // 2. Network connectivity status
  const { offlineBanner, setOfflineBanner } = useNetworkStatus();

  // 3. Reader progress & streak hook
  const {
    currentChapter,
    setCurrentChapter,
    initialLoadDone,
    resumeBanner,
    setResumeBanner,
    streakDays,
    showCelebration,
    chapterRef,
    scrollOffsetRef,
    timeSpentRef,
    pendingScrollRestore,
    restoredOnce,
    saveProgress,
    goTo,
  } = useReaderProgress({
    bookId,
    itemType,
    isPreview,
    initialChapter,
    initialScrollOffset,
    toc,
    scrollProgressPct,
    loading,
    previewLimit,
    setPaywallModalOpen,
    setTocOpen,
    setChromeVisible,
  });

  // 4. Annotations hook (bookmarks & highlights)
  const {
    bookmarks,
    highlights,
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
  } = useAnnotations({
    bookId,
    isLoggedIn,
    currentChapter,
    scrollOffsetRef,
    toc,
    currentHtml,
    setCurrentChapter,
    pendingScrollRestore,
    setChromeVisible,
  });

  const dismissOwnerNudge = useCallback(() => {
    setOwnerNudgeDismissed(true);
    try {
      sessionStorage.setItem(`ib_owner_nudge_${bookId}`, "true");
    } catch {}
  }, [bookId]);

  // Post-mount hydration for owner nudge flag
  useEffect(() => {
    try {
      if (sessionStorage.getItem(`ib_owner_nudge_${bookId}`) === "true") {
        setOwnerNudgeDismissed(true);
      }
    } catch {}
  }, [bookId]);

  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

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
  }, [bookId, storageId]);

  // Find the first chapter with real prose for the preview limit
  useEffect(() => {
    if (!toc || toc.length === 0) return;
    let cancelled = false;

    async function findFirstProseChapter() {
      let firstProse = 0;
      for (let i = 0; i < Math.min(toc!.length, 10); i++) {
        try {
          const res = await fetch(
            `${SUPABASE_URL}/storage/v1/object/public/book-content/${storageId}/${toc![i].file}`,
          );
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

    return () => {
      cancelled = true;
    };
  }, [toc, bookId, storageId, isPreview, currentChapter, setCurrentChapter, chapterRef]);

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
          setCurrentHtml(ensureLazyImages(cached));
          setLoading(false);
          // Background revalidate
          fetch(url)
            .then(async (r) => {
              if (r.ok) {
                const fresh = await r.text();
                await setChapterInCache(cacheKey, fresh);
              }
            })
            .catch(() => {});
        } else {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Failed to load chapter.");
          const html = await res.text();
          if (!cancelled) {
            setCurrentHtml(ensureLazyImages(html));
            await setChapterInCache(cacheKey, html);
          }
        }

        const next = toc![currentChapter + 1];
        if (next && !(isPreview && currentChapter === previewLimit)) {
          const nextCacheKey = `reader-${storageId}-${next.file}`;
          getChapterFromCache(nextCacheKey).then((alreadyCached) => {
            if (alreadyCached) return;
            fetch(
              `${SUPABASE_URL}/storage/v1/object/public/book-content/${storageId}/${next.file}`,
            )
              .then(async (r) => {
                if (r.ok) {
                  const html = await r.text();
                  await setChapterInCache(nextCacheKey, html);
                }
              })
              .catch(() => {});
          });
        }
      } catch (err: unknown) {
        if (!cancelled) {
          // Try cache on network failure
          const item = toc![currentChapter];
          const cacheKey = `reader-${bookId}-${item?.file}`;
          const cached = await getChapterFromCache(cacheKey);
          if (cached) {
            setCurrentHtml(ensureLazyImages(cached));
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
  }, [
    toc,
    currentChapter,
    bookId,
    storageId,
    isPreview,
    previewLimit,
    setOfflineBanner,
  ]);

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
  }, [loading, currentHtml, isPreview, pendingScrollRestore, scrollOffsetRef, restoredOnce]);

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
    settingsOpen,
    isPreview,
    initialLoadDone,
    bookId,
    saveProgress,
    chapterRef,
    scrollOffsetRef,
    setChromeVisible,
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
  }, [currentChapter, chaptersCount, isPreview, goTo, setChromeVisible]);

  const forceShowChrome = () => {
    setChromeVisible(true);
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const themeVars = THEME_STYLES[readerTheme];
  const chromeOpen =
    chromeVisible || settingsOpen || tocOpen || annotationsOpen || paywallModalOpen;

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
      <ReaderChrome
        bookId={bookId}
        bookTitle={bookTitle}
        bookAuthor={bookAuthor}
        returnTarget={returnTarget}
        isPreview={isPreview}
        chapterTitle={chapterTitle}
        currentChapter={currentChapter}
        chaptersCount={chaptersCount}
        blendedPct={blendedPct}
        chromeOpen={chromeOpen}
        prefersReducedMotion={prefersReducedMotion.current}
        readerTheme={readerTheme}
        fontFamily={fontFamily}
        fontSize={fontSize}
        isFullscreen={isFullscreen}
        isBookmarked={isBookmarked}
        annotationsOpen={annotationsOpen}
        bookmarksCount={bookmarks.length}
        highlightsCount={highlights.length}
        tocOpen={tocOpen}
        searchOpen={searchOpen}
        settingsOpen={settingsOpen}
        streakDays={streakDays}
        previewLimit={previewLimit}
        toc={toc}
        changeTheme={changeTheme}
        changeFontFamily={changeFontFamily}
        changeFontSize={changeFontSize}
        toggleFullscreen={toggleFullscreen}
        toggleBookmark={toggleBookmark}
        onOpenAnnotations={() => {
          forceShowChrome();
          setAnnotationsTab(highlights.length > bookmarks.length ? "highlights" : "bookmarks");
          setAnnotationsOpen(true);
        }}
        onOpenToc={() => {
          forceShowChrome();
          setTocOpen(true);
        }}
        onToggleSearch={() => {
          forceShowChrome();
          setSearchOpen((v) => !v);
        }}
        onOpenSettings={() => {
          forceShowChrome();
          setSettingsOpen(true);
        }}
        onCloseToc={() => setTocOpen(false)}
        goTo={goTo}
      />

      <ReaderOfflineBanner
        show={offlineBanner}
        onClose={() => setOfflineBanner(false)}
      />

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

      <ReaderResumeBanner
        resumeBanner={resumeBanner}
        isPreview={isPreview}
        chapterTitle={chapterTitle}
        onResume={() => {
          window.scrollTo({
            top: pendingScrollRestore.current || scrollOffsetRef.current,
            behavior: "smooth",
          });
          setResumeBanner(null);
        }}
        onClose={() => setResumeBanner(null)}
      />

      <ReaderContent
        contentRef={contentRef}
        endSentinelRef={endSentinelRef}
        bookId={bookId}
        fontFamily={fontFamily}
        fontSize={fontSize}
        currentHtml={currentHtml}
        searchHighlightedHtml={searchHighlightedHtml}
        annotatedHtml={annotatedHtml}
        loading={loading}
        hasContent={hasContent}
        contentError={contentError}
        relatedBooks={relatedBooks}
        currentChapter={currentChapter}
        chaptersCount={chaptersCount}
        goTo={goTo}
        onToggleChrome={() => {
          if (!settingsOpen && !tocOpen && !annotationsOpen) setChromeVisible((v) => !v);
        }}
      >
        <ReaderOwnerNudge
          bookId={bookId}
          isPreview={isPreview}
          dismissed={ownerNudgeDismissed}
          loading={loading}
          contentError={contentError}
          hasContent={hasContent}
          timeSpent={timeSpentRef.current}
          scrollProgressPct={scrollProgressPct}
          onDismiss={dismissOwnerNudge}
        />

        <ReaderPreviewCta
          bookId={bookId}
          isPreview={isPreview}
          currentChapter={currentChapter}
          previewLimit={previewLimit}
          loading={loading}
          showPreviewCta={showPreviewCta}
        />

        <ReaderCelebration
          show={showCelebration}
          bookTitle={bookTitle}
        />
      </ReaderContent>

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

      <ReaderPaywallModal
        bookId={bookId}
        open={paywallModalOpen}
        onClose={() => setPaywallModalOpen(false)}
      />

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
