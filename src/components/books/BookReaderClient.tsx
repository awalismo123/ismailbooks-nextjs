"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { saveProgressAction, loadProgressAction } from "@/app/actions/reader";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  List,
  X,
  Sun,
  Moon,
  BookOpen,
  Minus,
  Plus,
  Lock,
  CreditCard,
  Sparkles,
  Bookmark,
  Maximize,
  Minimize,
  Type,
  Check,
} from "lucide-react";

import ReaderBackButton from "@/components/reader/ReaderBackButton";

type ReaderTheme = "light" | "sepia" | "night";
type FontFamily = "serif" | "sans" | "mono";
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
};

const LS_THEME = "ib_reader_theme";
const LS_FONT_SIZE = "ib_reader_font_size";
const LS_FONT_FAMILY = "ib_reader_font_family";

export default function BookReaderClient({
  bookId,
  bookTitle,
  bookAuthor,
  isPreview = false,
  isPaid = false,
  returnTarget,
  initialChapter = 0,
}: {
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  isPreview?: boolean;
  isPaid?: boolean;
  returnTarget?: string;
  /** Starting chapter resolved server-side (from DB progress or ?chapter= param) */
  initialChapter?: number;
}) {
  // Persisted prefs (localStorage)
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState<FontFamily>("serif");
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>("light");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Bookmarks state
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Reader state
  const [tocOpen, setTocOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [paywallModalOpen, setPaywallModalOpen] = useState(false);

  // Saved toast
  const [savedToast, setSavedToast] = useState(false);
  const savedToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Data
  const [toc, setToc] = useState<TocItem[] | null>(null);
  const [currentHtml, setCurrentHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);
  const [hasContent, setHasContent] = useState(true);

  // Progress
  const [initialLoadDone, setInitialLoadDone] = useState(!isPreview); // if server gave us initialChapter, skip client fetch
  const timeSpentRef = useRef(0);
  const chapterRef = useRef(initialChapter);

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  // ── Load persisted prefs on mount ──────────────────────────────
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(LS_THEME) as ReaderTheme | null;
      const savedFontSize = localStorage.getItem(LS_FONT_SIZE);
      const savedFontFamily = localStorage.getItem(LS_FONT_FAMILY) as FontFamily | null;
      
      if (savedTheme && ["light", "sepia", "night"].includes(savedTheme)) {
        setReaderTheme(savedTheme);
      }
      if (savedFontSize) {
        const n = Number(savedFontSize);
        if (n >= 14 && n <= 30) setFontSize(n);
      }
      if (savedFontFamily && ["serif", "sans", "mono"].includes(savedFontFamily)) {
        setFontFamily(savedFontFamily);
      }
    } catch {}
  }, []);

  const changeTheme = (t: ReaderTheme) => {
    setReaderTheme(t);
    try { localStorage.setItem(LS_THEME, t); } catch {}
  };

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => {
      const next = Math.min(30, Math.max(14, prev + delta));
      try { localStorage.setItem(LS_FONT_SIZE, String(next)); } catch {}
      return next;
    });
  };

  const changeFontFamily = (f: FontFamily) => {
    setFontFamily(f);
    try { localStorage.setItem(LS_FONT_FAMILY, f); } catch {}
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  // ── Bookmarking ───────────────────────────────────────────────
  const bookmarkKey = `ib_bm_${bookId}`;

  useEffect(() => {
    try {
      const savedBookmark = localStorage.getItem(bookmarkKey);
      if (savedBookmark) {
        const bm = JSON.parse(savedBookmark);
        if (bm.chapterIndex === currentChapter) {
          setIsBookmarked(true);
        } else {
          setIsBookmarked(false);
        }
      } else {
        setIsBookmarked(false);
      }
    } catch {
      setIsBookmarked(false);
    }
  }, [currentChapter, bookmarkKey]);

  const toggleBookmark = () => {
    try {
      if (isBookmarked) {
        localStorage.removeItem(bookmarkKey);
        setIsBookmarked(false);
      } else {
        const bmData = {
          bookId,
          chapterIndex: currentChapter,
          chapterTitle: toc?.[currentChapter]?.title || `Cutubka ${currentChapter + 1}`,
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem(bookmarkKey, JSON.stringify(bmData));
        setIsBookmarked(true);
      }
    } catch {}
  };

  // ── Fetch TOC ────────────────────────────────────────────────────────
  useEffect(() => {
    async function loadToc() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/storage/v1/object/public/book-content/${bookId}/toc.json`,
          { cache: "no-store" }
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

  // ── Load reading progress (only if not preview AND server didn't supply initialChapter) ─
  useEffect(() => {
    if (isPreview) {
      setInitialLoadDone(true);
      return;
    }
    // If initialChapter > 0 the server already resolved progress — skip client fetch
    // to avoid a flash. We still mark load done so saves can fire.
    if (initialChapter > 0) {
      setCurrentChapter(initialChapter);
      chapterRef.current = initialChapter;
      setInitialLoadDone(true);
      return;
    }
    async function fetchProgress() {
      const progress = await loadProgressAction(Number(bookId));
      if (progress) {
        const chapter = progress.chapterIndex ?? 0;
        setCurrentChapter(chapter);
        chapterRef.current = chapter;
        timeSpentRef.current = progress.timeSpent ?? 0;
      }
      setInitialLoadDone(true);
    }
    fetchProgress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, isPreview]);

  // ── Time tracker (every 30s) ─────────────────────────────────────────
  useEffect(() => {
    if (isPreview) return;
    const timer = setInterval(() => {
      timeSpentRef.current += 30;
    }, 30000);
    return () => clearInterval(timer);
  }, [isPreview]);

  // ── Save progress ────────────────────────────────────────────────────
  const showSavedToast = useCallback(() => {
    setSavedToast(true);
    if (savedToastTimer.current) clearTimeout(savedToastTimer.current);
    savedToastTimer.current = setTimeout(() => setSavedToast(false), 2500);
  }, []);

  const saveProgress = useCallback(() => {
    if (!initialLoadDone || !bookId || isPreview) return;
    const fd = new FormData();
    fd.append("bookId", bookId);
    fd.append("chapterIndex", String(chapterRef.current));
    fd.append("timeSpent", String(timeSpentRef.current));
    const isCompleted = toc ? chapterRef.current === toc.length - 1 : false;
    fd.append("completed", String(isCompleted));
    saveProgressAction(fd).then(() => showSavedToast()).catch(() => {});
  }, [initialLoadDone, bookId, toc, isPreview, showSavedToast]);

  useEffect(() => {
    if (!initialLoadDone || isPreview) return;
    chapterRef.current = currentChapter;
    saveProgress();
    const interval = setInterval(saveProgress, 60000);
    return () => clearInterval(interval);
  }, [currentChapter, initialLoadDone, saveProgress, isPreview]);

  // ── Fetch chapter HTML ───────────────────────────────────────────────
  useEffect(() => {
    if (!toc || toc.length === 0) return;
    async function loadChapter() {
      setLoading(true);
      setContentError(null);
      try {
        const item = toc![currentChapter];
        if (!item) throw new Error("Chapter not found");
        const res = await fetch(
          `${SUPABASE_URL}/storage/v1/object/public/book-content/${bookId}/${item.file}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to load chapter.");
        const html = await res.text();
        setCurrentHtml(html);
      } catch (err: any) {
        setContentError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadChapter();
  }, [toc, currentChapter, bookId, SUPABASE_URL]);

  const chaptersCount = toc?.length ?? 0;
  const chapterTitle = toc?.[currentChapter]?.title ?? "";
  const progressPct = chaptersCount > 0 ? ((currentChapter + 1) / chaptersCount) * 100 : 0;

  const goTo = (idx: number) => {
    if (isPreview && idx > 0) {
      setPaywallModalOpen(true);
      setTocOpen(false);
      return;
    }
    setCurrentChapter(idx);
    setTocOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Keyboard navigation ──────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentChapter > 0) goTo(currentChapter - 1);
      if (e.key === "ArrowRight" && chaptersCount > 0 && currentChapter < chaptersCount - 1) {
        goTo(currentChapter + 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentChapter, chaptersCount, isPreview]);

  const themeVars = THEME_STYLES[readerTheme];

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
      }}
    >
      {/* ── Saved Toast ── */}
      {savedToast && (
        <div
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: "#2E7D5B",
            color: "#fff",
            padding: "0.5rem 1.25rem",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 700,
            boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            pointerEvents: "none",
            animation: "fadeInUp 0.2s ease",
          }}
        >
          <Check size={14} /> Saved
        </div>
      )}
      {/* ── HEADER ── */}
      <header
        style={{ background: "var(--reader-bg)", borderBottom: "1px solid var(--reader-border)" }}
        className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between backdrop-blur-md"
      >
        <div className="flex items-center gap-3 min-w-0">
          <ReaderBackButton returnTarget={returnTarget || `/books/${bookId}`} />

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1
                style={{ color: "var(--reader-heading)" }}
                className="font-display text-sm font-extrabold truncate max-w-[180px] sm:max-w-sm md:max-w-lg"
              >
                {bookTitle}
              </h1>
              {isPreview && (
                <span className="shrink-0 rounded-full bg-[#C9962E]/20 text-[#C9962E] border border-[#C9962E]/40 px-2 py-0.5 text-[9px] font-extrabold uppercase">
                  Tijaabo (Preview)
                </span>
              )}
            </div>
            {chapterTitle && (
              <p style={{ color: "var(--reader-muted)" }} className="text-[11px] truncate max-w-[160px] sm:max-w-xs">
                {chapterTitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Bookmark Button */}
          <button
            onClick={toggleBookmark}
            style={{ border: "1px solid var(--reader-border)", background: "var(--reader-surface)" }}
            className={`p-2 rounded-xl transition-all ${
              isBookmarked ? "text-amber-500 bg-amber-500/10" : "text-gray-400 hover:text-gray-600"
            }`}
            title={isBookmarked ? "Waa lagu calaamadiyay" : "Calaamadee Cutubkan"}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
          </button>

          {/* Theme switcher */}
          <div
            style={{ border: "1px solid var(--reader-border)", background: "var(--reader-surface)" }}
            className="hidden sm:flex items-center rounded-xl p-1 gap-0.5"
          >
            {([
              { id: "light" as ReaderTheme, icon: <Sun className="w-3.5 h-3.5" />, label: "Light" },
              { id: "sepia" as ReaderTheme, icon: <BookOpen className="w-3.5 h-3.5" />, label: "Sepia" },
              { id: "night" as ReaderTheme, icon: <Moon className="w-3.5 h-3.5" />, label: "Night" },
            ]).map((opt) => (
              <button
                key={opt.id}
                onClick={() => changeTheme(opt.id)}
                title={opt.label}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all"
                style={{
                  background: readerTheme === opt.id ? "var(--reader-accent)" : "transparent",
                  color: readerTheme === opt.id ? "#fff" : "var(--reader-muted)",
                }}
                aria-pressed={readerTheme === opt.id}
              >
                {opt.icon}
                <span className="hidden md:inline">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Font Family switcher */}
          <div
            style={{ border: "1px solid var(--reader-border)", background: "var(--reader-surface)" }}
            className="hidden md:flex items-center rounded-xl p-1 gap-0.5 text-[10px] font-bold"
          >
            {(["serif", "sans", "mono"] as FontFamily[]).map((f) => (
              <button
                key={f}
                onClick={() => changeFontFamily(f)}
                className={`px-2 py-1 rounded-lg uppercase transition-all ${
                  fontFamily === f ? "bg-[#7A1F2B] text-white" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Font size */}
          <div
            style={{ border: "1px solid var(--reader-border)", background: "var(--reader-surface)" }}
            className="flex items-center rounded-xl overflow-hidden"
          >
            <button
              onClick={() => changeFontSize(-2)}
              style={{ color: "var(--reader-muted)" }}
              className="px-2.5 py-1.5 text-xs font-bold hover:opacity-70 transition-opacity"
              title="Yareey xarfaha"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span style={{ color: "var(--reader-accent)", borderLeft: "1px solid var(--reader-border)", borderRight: "1px solid var(--reader-border)" }} className="px-2 py-1.5 text-[11px] font-mono font-bold">
              {fontSize}
            </span>
            <button
              onClick={() => changeFontSize(2)}
              style={{ color: "var(--reader-muted)" }}
              className="px-2.5 py-1.5 text-xs font-bold hover:opacity-70 transition-opacity"
              title="Korodhsi xarfaha"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            style={{ border: "1px solid var(--reader-border)", background: "var(--reader-surface)", color: "var(--reader-muted)" }}
            className="p-2 rounded-xl transition-opacity hover:opacity-80 hidden sm:flex"
            title="Shaashad Buuxda (Fullscreen)"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* TOC button */}
          {chaptersCount > 0 && (
            <button
              onClick={() => setTocOpen(true)}
              style={{ border: "1px solid var(--reader-border)", background: "var(--reader-surface)", color: "var(--reader-heading)" }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-opacity hover:opacity-80"
            >
              <List className="w-4 h-4" style={{ color: "var(--reader-accent)" }} />
              <span className="hidden sm:inline">Cutubyada</span>
            </button>
          )}
        </div>
      </header>

      {/* Progress bar */}
      {chaptersCount > 0 && (
        <div style={{ background: "var(--reader-border)" }} className="w-full h-1">
          <div
            style={{ background: "var(--reader-accent)", width: `${progressPct}%` }}
            className="h-1 transition-all duration-500"
          />
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <main className="flex-grow max-w-[720px] mx-auto px-5 sm:px-8 py-10 sm:py-14 w-full">
        {/* No content state */}
        {!hasContent && !loading && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <div
              style={{ background: "var(--reader-surface)", border: "1px solid var(--reader-border)" }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
            >
              <BookOpen className="w-8 h-8" style={{ color: "var(--reader-accent)" }} />
            </div>
            <h2 style={{ color: "var(--reader-heading)" }} className="font-display text-xl font-extrabold">
              Nuxurka buugga wali lama keenin
            </h2>
            <p style={{ color: "var(--reader-muted)" }} className="text-sm max-w-xs">
              Faylka PDF-ga buuggan wali lama soo gelinin nidaamka. Maamulaha wuxuu u baahan yahay inuu PDF-ka soo raro.
            </p>
            <Link
              href={`/books/${bookId}`}
              style={{ background: "var(--reader-accent)", color: "#fff" }}
              className="px-5 py-2.5 rounded-xl text-sm font-bold"
            >
              ← Ku noqo Buugga
            </Link>
          </div>
        )}

        {/* Loading state */}
        {loading && hasContent && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div
              style={{ border: "4px solid var(--reader-border)", borderTopColor: "var(--reader-accent)" }}
              className="w-10 h-10 rounded-full animate-spin"
            />
            <p style={{ color: "var(--reader-muted)" }} className="text-sm font-bold">
              Diyaarinta cutubka...
            </p>
          </div>
        )}

        {/* Error state */}
        {contentError && (
          <div className="text-center py-16">
            <p className="text-red-500 font-bold mb-2">Qalad ayaa dhacay</p>
            <p style={{ color: "var(--reader-muted)" }} className="text-sm">{contentError}</p>
          </div>
        )}

        {/* Chapter content */}
        {!loading && !contentError && hasContent && currentHtml && (
          <article className={FONT_CLASSES[fontFamily]} style={{ fontSize: `${fontSize}px` }}>
            <div
              className="reader-prose"
              dangerouslySetInnerHTML={{ __html: currentHtml }}
            />
          </article>
        )}

        {/* Preview Paywall Callout at end of Chapter 1 */}
        {isPreview && currentChapter === 0 && !loading && (
          <div className="mt-12 rounded-2xl border border-[#C9962E]/40 bg-gradient-to-b from-[#FBF7F0] to-[#FAF3E6] p-6 text-center shadow-lg">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9962E]/20 text-[#C9962E]">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-extrabold text-[#201B16]">
              Cutubka 1-aad waa dhammaaday
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-[#6B5F52]">
              Waa ku mahadsan tahay akhrinta tijaabada ah! Si aad u akhriso dhammaan cutubyada kale oo aad buugga oo dhan u hesho, iibso buuggan hadda.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`/payment/${bookId}`}
                className="btn btn-primary btn-block sm:w-auto"
              >
                <CreditCard className="h-4 w-4" />
                Iibso Buugga Hadda
              </Link>
              <Link
                href={`/books/${bookId}`}
                className="btn btn-secondary btn-block sm:w-auto"
              >
                Eeg Faahfaahinta
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* ── BOTTOM NAV ── */}
      {chaptersCount > 0 && (
        <footer className="sticky bottom-4 z-30 max-w-sm mx-auto w-full px-4 pb-2">
          <div
            style={{ border: "1px solid var(--reader-border)", background: "var(--reader-surface)" }}
            className="rounded-2xl p-3 flex items-center justify-between shadow-xl"
          >
            <button
              disabled={currentChapter === 0}
              onClick={() => goTo(currentChapter - 1)}
              style={{ border: "1px solid var(--reader-border)", color: "var(--reader-heading)" }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold disabled:opacity-30 hover:opacity-70 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Hore</span>
            </button>

            <div className="text-center">
              <span style={{ color: "var(--reader-accent)" }} className="text-xs font-extrabold block">
                {currentChapter + 1} / {chaptersCount}
              </span>
              <span style={{ color: "var(--reader-muted)" }} className="text-[10px]">
                {Math.round(progressPct)}% dhammaystiran
              </span>
            </div>

            <button
              disabled={currentChapter === chaptersCount - 1}
              onClick={() => goTo(currentChapter + 1)}
              style={{ background: "var(--reader-accent)", color: "#fff" }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold disabled:opacity-30 hover:opacity-80 transition-opacity"
            >
              <span className="hidden sm:inline">Xiga</span>
              {isPreview && currentChapter === 0 ? (
                <Lock className="w-4 h-4 text-amber-300" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </footer>
      )}

      {/* ── TOC DRAWER ── */}
      {tocOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setTocOpen(false)}
        >
          <div
            style={{ background: "var(--reader-bg)", borderLeft: "1px solid var(--reader-border)" }}
            className="w-full max-w-xs h-full flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{ borderBottom: "1px solid var(--reader-border)" }}
              className="flex items-center justify-between px-5 py-4"
            >
              <h3 style={{ color: "var(--reader-heading)" }} className="font-display text-base font-extrabold flex items-center gap-2 m-0">
                <List className="w-4 h-4" style={{ color: "var(--reader-accent)" }} />
                Cutubyada Buugga
              </h3>
              <button onClick={() => setTocOpen(false)} style={{ color: "var(--reader-muted)" }} className="p-1 rounded-lg hover:opacity-70">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {toc?.map((ch, idx) => {
                const isLocked = isPreview && idx > 0;
                const isCurrent = currentChapter === idx;
                const isCompleted = idx < currentChapter;
                return (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between group"
                    style={{
                      background: isCurrent ? "var(--reader-accent)" : "var(--reader-surface)",
                      color: isCurrent ? "#fff" : "var(--reader-body)",
                      border: "1px solid " + (isCurrent ? "transparent" : "var(--reader-border)"),
                      opacity: isLocked ? 0.7 : 1,
                    }}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="block truncate">{ch.title}</span>
                        {isCurrent && (
                          <span className="shrink-0 text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-white/25 text-white uppercase tracking-wider">
                            📍 Halkan ayaad joogtaa
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] opacity-60">Cutub {idx + 1}</span>
                    </div>
                    {isLocked ? (
                      <Lock className="w-4 h-4 text-[#C9962E] shrink-0" />
                    ) : isCompleted ? (
                      <Check className={`w-4 h-4 shrink-0 ${isCurrent ? "text-white" : "text-emerald-500"}`} />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── PAYWALL MODAL (When clicking locked chapter) ── */}
      {paywallModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setPaywallModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[#E8DFD2] bg-[#FBF7F0] p-6 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7A1F2B]/10 text-[#7A1F2B]">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="font-display text-xl font-extrabold text-[#201B16]">
              Cutubkan waa Premium!
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#6B5F52]">
              Waad ku mahadsan tahay akhrinta Cutubka 1-aad! Cutubyada 2-{chaptersCount} waxay u furan yihiin oo keliya dadka iibsada buuggan.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href={`/payment/${bookId}`}
                className="btn btn-primary btn-block"
              >
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
        .reader-prose { line-height: 1.85; }
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
        .chapter-content > h1:first-child { margin-top: 0; }
      `}</style>
    </div>
  );
}
