"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sun,
  Moon,
  BookOpen,
  Minus,
  Plus,
  Lock,
  CreditCard,
  Sparkles,
  Maximize,
  Minimize,
  Type,
  FileText,
  UserCheck,
} from "lucide-react";
import ReaderBackButton from "@/components/reader/ReaderBackButton";

type ReaderTheme = "light" | "sepia" | "night";
type FontFamily = "serif" | "sans" | "mono";

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
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState<FontFamily>("serif");
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>("light");
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("ib_summary_theme") as ReaderTheme | null;
      const savedFontSize = localStorage.getItem("ib_summary_font_size");
      const savedFontFamily = localStorage.getItem("ib_summary_font_family") as FontFamily | null;

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
    try { localStorage.setItem("ib_summary_theme", t); } catch {}
  };

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => {
      const next = Math.min(30, Math.max(14, prev + delta));
      try { localStorage.setItem("ib_summary_font_size", String(next)); } catch {}
      return next;
    });
  };

  const changeFontFamily = (f: FontFamily) => {
    setFontFamily(f);
    try { localStorage.setItem("ib_summary_font_family", f); } catch {}
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
        className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between backdrop-blur-md"
      >
        <div className="flex items-center gap-3 min-w-0">
          <ReaderBackButton returnTarget={returnTarget || `/summaries/${summaryId}`} />

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1
                style={{ color: "var(--reader-heading)" }}
                className="font-display text-sm font-extrabold truncate max-w-[180px] sm:max-w-sm md:max-w-lg"
              >
                {summaryTitle}
              </h1>
              {isPreview && (
                <span className="shrink-0 rounded-full bg-[#C9962E]/20 text-[#C9962E] border border-[#C9962E]/40 px-2 py-0.5 text-[9px] font-extrabold uppercase">
                  Tijaabo
                </span>
              )}
            </div>
            {bookTitle && (
              <p style={{ color: "var(--reader-muted)" }} className="text-[11px] truncate max-w-[160px] sm:max-w-xs">
                Asal: {bookTitle} {bookAuthor ? `— ${bookAuthor}` : ""}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
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
              >
                {opt.icon}
                <span className="hidden md:inline">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Font Family */}
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
            title="Shaashad Buuxda"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
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

        <article className={FONT_CLASSES[fontFamily]} style={{ fontSize: `${fontSize}px` }}>
          <div
            className="reader-prose"
            dangerouslySetInnerHTML={{ __html: contentHtml || "<p>Nuxurka soo-koobidda lagama helin.</p>" }}
          />
        </article>

        {/* Paywall Callout if preview */}
        {isPreview && (
          <div className="mt-12 rounded-2xl border border-[#C9962E]/40 bg-gradient-to-b from-[#FBF7F0] to-[#FAF3E6] p-6 text-center shadow-lg">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9962E]/20 text-[#C9962E]">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-extrabold text-[#201B16]">
              Soo-koobidda Buuxda waa Premium
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-[#6B5F52]">
              Kani waa tijaabada soo-koobidda. Si aad u akhriso dhammaan qodobada muhiimka ah, iibso soo-koobidda ama buugga.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`/payment/${summaryId}`}
                className="btn btn-primary btn-block sm:w-auto"
              >
                <CreditCard className="h-4 w-4" />
                Iibso Hadda {price ? `($${price})` : ""}
              </Link>
              <Link
                href={`/summaries/${summaryId}`}
                className="btn btn-secondary btn-block sm:w-auto"
              >
                Eeg Faahfaahinta
              </Link>
            </div>
          </div>
        )}
      </main>

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
      `}</style>
    </div>
  );
}
