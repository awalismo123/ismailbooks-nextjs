"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { saveProgressAction, loadProgressAction } from "@/app/actions/reader";

export type TocItem = { title: string; file: string };

export function localProgressKey(bookId: string) {
  return `ib_progress_${bookId}`;
}

export function readLocalProgress(bookId: string): {
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

export function writeLocalProgress(
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
export function streakKey(bookId: string) {
  return `ib_streak_${bookId}`;
}

export function recordReadingDay(bookId: string) {
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

export function computeStreak(bookId: string): number {
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
  } catch {
    return 0;
  }
}

export interface UseReaderProgressOptions {
  bookId: string;
  itemType?: "book" | "summary";
  isPreview?: boolean;
  initialChapter?: number;
  initialScrollOffset?: number;
  toc: TocItem[] | null;
  scrollProgressPct: number;
  loading: boolean;
  previewLimit: number;
  setPaywallModalOpen: (open: boolean) => void;
  setTocOpen: (open: boolean) => void;
  setChromeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useReaderProgress({
  bookId,
  itemType = "book",
  isPreview = false,
  initialChapter = 0,
  initialScrollOffset = 0,
  toc,
  scrollProgressPct,
  loading,
  previewLimit,
  setPaywallModalOpen,
  setTocOpen,
  setChromeVisible,
}: UseReaderProgressOptions) {
  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [initialLoadDone, setInitialLoadDone] = useState(isPreview);
  const [resumeBanner, setResumeBanner] = useState<{
    chapter: number;
    pct: number;
  } | null>(null);
  const [streakDays, setStreakDays] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const chapterRef = useRef(initialChapter);
  const scrollOffsetRef = useRef(initialScrollOffset);
  const timeSpentRef = useRef(0);
  const pendingScrollRestore = useRef(initialScrollOffset);
  const restoredOnce = useRef(false);
  const celebrationFired = useRef(false);

  // Streak hydration
  useEffect(() => {
    if (!isPreview) {
      try {
        recordReadingDay(bookId);
      } catch {}
      setStreakDays(computeStreak(bookId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Track reading time
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
  }, [initialLoadDone, bookId, toc, isPreview, itemType, showSavedToast]);

  // Keep a stable ref to the latest saveProgress so the 60-s interval below
  // does not need it in its dep array (which would reset the interval every
  // chapter change and potentially skip saves on fast navigation).
  const saveProgressRef = useRef(saveProgress);
  useEffect(() => {
    saveProgressRef.current = saveProgress;
  }, [saveProgress]);

  // Update chapterRef and fire an immediate save on every chapter change.
  useEffect(() => {
    if (!initialLoadDone || isPreview) return;
    chapterRef.current = currentChapter;
    saveProgress();
    // saveProgress is stable across chapter changes (reads chapterRef internally)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapter, initialLoadDone, isPreview]);

  // Stable 60-second autosave interval — set up once, never torn down by
  // chapter changes. Uses saveProgressRef so it always calls the latest version.
  useEffect(() => {
    if (!initialLoadDone || isPreview) return;
    const interval = setInterval(() => saveProgressRef.current(), 60000);
    return () => clearInterval(interval);
  }, [initialLoadDone, isPreview]);

  // ── Flush progress on tab close / background ─────────────────────────────
  // sendBeacon is reliable during unload; a normal fetch / server action is not.
  // Skipped in preview mode and when not logged in (no server record to update).
  useEffect(() => {
    if (isPreview || itemType === "summary") return;

    const flush = () => {
      const payload = JSON.stringify({
        bookId,
        chapterIndex: chapterRef.current,
        scrollOffset: Math.round(scrollOffsetRef.current),
        timeSpent: timeSpentRef.current,
      });
      // Also update localStorage synchronously — doesn't need a network round-trip
      writeLocalProgress(bookId, chapterRef.current, scrollOffsetRef.current);
      // sendBeacon fires even after the page starts unloading
      navigator.sendBeacon(
        "/api/reader/save-progress",
        new Blob([payload], { type: "application/json" }),
      );
    };

    // pagehide is the most reliable unload event (covers mobile, back/forward cache)
    const onPageHide = () => flush();
    // visibilitychange catches tab switches to background on desktop
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") flush();
    };

    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [bookId, isPreview, itemType]);

  // Finish celebration: trigger when on last chapter and 90%+ scrolled
  const chaptersCount = toc?.length ?? 0;
  useEffect(() => {
    if (isPreview || !toc || loading || chaptersCount === 0) return;
    if (currentChapter === chaptersCount - 1 && scrollProgressPct >= 90 && !celebrationFired.current) {
      celebrationFired.current = true;
      setShowCelebration(true);
      import("canvas-confetti").then((mod) => {
        const confetti = mod.default;
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.55 },
          colors: ["#7A1F2B", "#C9962E", "#A78BFA", "#fff"],
        });
        setTimeout(() => confetti({ particleCount: 60, spread: 55, origin: { y: 0.4 }, angle: 60 }), 400);
        setTimeout(() => confetti({ particleCount: 60, spread: 55, origin: { y: 0.4 }, angle: 120 }), 400);
      });
    }
  }, [isPreview, toc, loading, chaptersCount, currentChapter, scrollProgressPct]);

  const goTo = useCallback(
    (idx: number) => {
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
    },
    [isPreview, previewLimit, setPaywallModalOpen, setTocOpen, setChromeVisible],
  );

  return {
    currentChapter,
    setCurrentChapter,
    initialLoadDone,
    setInitialLoadDone,
    resumeBanner,
    setResumeBanner,
    streakDays,
    setStreakDays,
    showCelebration,
    setShowCelebration,
    chapterRef,
    scrollOffsetRef,
    timeSpentRef,
    pendingScrollRestore,
    restoredOnce,
    celebrationFired,
    saveProgress,
    goTo,
  };
}
