"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  CreditCard,
  UserCheck,
  Settings2,
  Check,
} from "lucide-react";
import ReaderBackButton from "@/components/reader/ReaderBackButton";
import ReaderSettingsSheet, {
  type ReaderTheme,
  type FontFamily,
  type LineSpacing,
} from "@/components/reader/ReaderSettingsSheet";

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

const LINE_SPACING_CLASSES: Record<LineSpacing, string> = {
  normal: "leading-relaxed",
  relaxed: "leading-loose",
};

interface SummaryReaderClientProps {
  summaryId: string;
  summaryTitle: string;
  bookTitle?: string;
  bookAuthor?: string;
  summaryCreator?: string;
  contentHtml: string;
  isPreview?: boolean;
  isPaid?: boolean;
  price?: number;
  returnTarget?: string;
}

export default function SummaryReaderClient({
  summaryId,
  summaryTitle,
  bookTitle,
  bookAuthor,
  summaryCreator,
  contentHtml,
  isPreview = false,
  isPaid = false,
  price,
  returnTarget,
}: SummaryReaderClientProps) {
  const [fontSize, setFontSize] = useState<number>(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("ib_reader_font_size");
        const n = Number(saved);
        if (saved && n >= 14 && n <= 30) return n;
      }
    } catch {}
    return 18;
  });
  const [fontFamily, setFontFamily] = useState<FontFamily>(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("ib_reader_font_family") as FontFamily;
        if (saved && ["serif", "sans", "mono", "dyslexia"].includes(saved)) return saved;
      }
    } catch {}
    return "serif";
  });
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("ib_reader_theme") as ReaderTheme;
        if (saved && ["light", "sepia", "night"].includes(saved)) return saved;
      }
    } catch {}
    return isPreview ? "sepia" : "light";
  });
  const [lineSpacing, setLineSpacing] = useState<LineSpacing>(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("ib_reader_line_spacing") as LineSpacing;
        if (saved && ["normal", "relaxed"].includes(saved)) return saved;
      }
    } catch {}
    return "normal";
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const changeTheme = (t: ReaderTheme) => {
    setReaderTheme(t);
    try { localStorage.setItem("ib_reader_theme", t); } catch {}
  };

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => {
      const next = Math.min(30, Math.max(14, prev + delta));
      try { localStorage.setItem("ib_reader_font_size", String(next)); } catch {}
      return next;
    });
  };

  const changeFontFamily = (f: FontFamily) => {
    setFontFamily(f);
    try { localStorage.setItem("ib_reader_font_family", f); } catch {}
  };

  const changeLineSpacing = (s: LineSpacing) => {
    setLineSpacing(s);
    try { localStorage.setItem("ib_reader_line_spacing", s); } catch {}
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

  const themeVars = THEME_STYLES[readerTheme];

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
      }}
    >
      {/* ── HEADER ── */}
      <header
        style={{ background: "var(--reader-bg)", borderBottom: "1px solid var(--reader-border)" }}
        className="sticky top-0 z-40 px-2 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-1 sm:gap-2 backdrop-blur-md"
      >
        <div className="flex items-center gap-1 sm:gap-2 min-w-0 shrink">
          <ReaderBackButton returnTarget={returnTarget || `/summaries/${summaryId}`} className="!min-w-[36px] !min-h-[36px] sm:!min-w-[44px] sm:!min-h-[44px] !justify-center shrink-0" />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1
                style={{ color: "var(--reader-heading)" }}
                className="font-display text-xs sm:text-sm font-extrabold truncate max-w-[130px] sm:max-w-xs md:max-w-md"
              >
                {summaryTitle}
              </h1>
              {isPreview && (
                <span className="shrink-0 rounded-full bg-[#C9962E]/20 text-[#C9962E] border border-[#C9962E]/40 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-extrabold uppercase">
                  Tijaabo
                </span>
              )}
            </div>
            {bookTitle && (
              <p style={{ color: "var(--reader-muted)" }} className="text-[10px] sm:text-[11px] truncate max-w-[120px] sm:max-w-xs hidden sm:block">
                Asal: {bookTitle} {bookAuthor ? `— ${bookAuthor}` : ""}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 sm:w-11 sm:h-11 inline-flex items-center justify-center rounded-xl transition-colors hover:bg-[var(--reader-surface)] text-[var(--reader-muted)] hover:text-[var(--reader-heading)]"
            title="Dejinta Akhriska"
          >
            <Settings2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-grow max-w-[720px] mx-auto px-5 sm:px-8 py-10 sm:py-14 w-full">
        {summaryCreator && (
          <div className="mb-6 flex items-center justify-between border-b border-[var(--reader-border)] pb-4 text-xs">
            <span className="flex items-center gap-1.5 font-bold" style={{ color: "var(--reader-accent)" }}>
              <UserCheck className="w-4 h-4" /> Soo-koobe: {summaryCreator}
            </span>
            {bookTitle && (
              <span className="text-[var(--reader-muted)] truncate">
                {bookTitle}
              </span>
            )}
          </div>
        )}

        <article lang="so" className={`${FONT_CLASSES[fontFamily]} ${LINE_SPACING_CLASSES[lineSpacing]}`} style={{ fontSize: `${fontSize}px` }}>
          <div
            className="reader-prose pb-20"
            dangerouslySetInnerHTML={{ __html: contentHtml || "<p>Nuxurka soo-koobidda lagama helin.</p>" }}
          />
        </article>

        {isPreview && (
          <div
            className="mt-12 rounded-2xl sm:rounded-3xl border p-5 sm:p-8 text-center shadow-sm mb-20"
            style={{
              background: "var(--reader-surface)",
              borderColor: "rgba(201, 150, 46, 0.3)",
            }}
          >
            <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#C9962E]/10 text-[#C9962E]">
              <Lock className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h3
              className="font-display text-lg sm:text-xl font-extrabold"
              style={{ color: "var(--reader-heading)" }}
            >
              Soo-koobidda Buuxda waa Premium
            </h3>
            <p
              className="mx-auto mt-2 max-w-sm text-xs sm:text-sm leading-relaxed"
              style={{ color: "var(--reader-muted)" }}
            >
              Kani waa tijaabada soo-koobidda. Si aad u akhriso dhammaan qodobada muhiimka ah, iibso soo-koobidda ama buugga.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`/payment/${summaryId}`}
                className="btn w-full sm:w-auto min-h-[44px] px-5 rounded-xl font-extrabold text-xs sm:text-sm border-0 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                style={{ background: "#C9962E", color: "#1A1208" }}
              >
                <CreditCard className="h-4 w-4" />
                Iibso Hadda {price ? `($${price})` : ""}
              </Link>
              <Link
                href={`/summaries/${summaryId}`}
                className="btn w-full sm:w-auto min-h-[44px] px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors hover:opacity-80"
                style={{
                  background: "transparent",
                  border: "1px solid var(--reader-border)",
                  color: "var(--reader-heading)",
                }}
              >
                Eeg Faahfaahinta
              </Link>
            </div>
          </div>
        )}
      </main>

      <ReaderSettingsSheet
        open={showSettings}
        onClose={() => setShowSettings(false)}
        readerTheme={readerTheme}
        onThemeChange={changeTheme}
        fontSize={fontSize}
        onFontSizeChange={changeFontSize}
        fontFamily={fontFamily}
        onFontFamilyChange={changeFontFamily}
        lineSpacing={lineSpacing}
        onLineSpacingChange={changeLineSpacing}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      <style>{`
        .reader-prose { line-height: 1.85; hyphens: none; -webkit-hyphens: none; }
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
      `}</style>
    </div>
  );
}
