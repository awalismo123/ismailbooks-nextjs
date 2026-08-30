"use client";

import React, { useState, useEffect } from "react";
import type {
  ReaderTheme,
  FontFamily,
  LineSpacing,
} from "@/components/reader/ReaderSettingsSheet";

export const THEME_STYLES: Record<ReaderTheme, React.CSSProperties> = {
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

export const FONT_CLASSES: Record<FontFamily, string> = {
  serif: "font-serif",
  sans: "font-sans",
  mono: "font-mono",
  dyslexia: "font-dyslexia",
};

// Dyslexia high-readability style — injected once
export const DYSLEXIA_STYLE_ID = "ib-dyslexia-font";
export function ensureDyslexiaFont() {
  if (typeof document === "undefined") return;
  if (document.getElementById(DYSLEXIA_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = DYSLEXIA_STYLE_ID;
  style.textContent = `.font-dyslexia { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important; letter-spacing: 0.1em !important; word-spacing: 0.25em !important; line-height: 2 !important; }`;
  document.head.appendChild(style);
}

export const LINE_HEIGHT: Record<LineSpacing, number> = {
  normal: 1.85,
  relaxed: 2.1,
};

export const LS_THEME = "ib_reader_theme";
export const LS_FONT_SIZE = "ib_reader_font_size";
export const LS_FONT_FAMILY = "ib_reader_font_family";
export const LS_LINE_SPACING = "ib_reader_line_spacing";

export function useReaderPrefs(options?: { isPreview?: boolean }) {
  // All reader-settings defaults are applied here and overridden after mount
  // in the hydration useEffect — avoids SSR/client mismatch.
  const [fontSize, setFontSize] = useState<number>(18);
  const [fontFamily, setFontFamily] = useState<FontFamily>("serif");
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>(options?.isPreview ? "sepia" : "light");
  const [lineSpacing, setLineSpacing] = useState<LineSpacing>("normal");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chromeVisible, setChromeVisible] = useState(true);

  // ── Post-mount hydration ───────────────────────────────────────────────────
  useEffect(() => {
    // Reader settings
    try {
      const savedFontSize = localStorage.getItem(LS_FONT_SIZE);
      const n = Number(savedFontSize);
      if (savedFontSize && n >= 14 && n <= 30) setFontSize(n);
    } catch {}

    try {
      const savedFamily = localStorage.getItem(LS_FONT_FAMILY) as FontFamily | null;
      if (savedFamily && ["serif", "sans", "mono", "dyslexia"].includes(savedFamily)) {
        if (savedFamily === "dyslexia") ensureDyslexiaFont();
        setFontFamily(savedFamily);
      }
    } catch {}

    try {
      const savedTheme = localStorage.getItem(LS_THEME) as ReaderTheme | null;
      if (savedTheme && ["light", "sepia", "night"].includes(savedTheme)) {
        setReaderTheme(savedTheme);
      } else if (options?.isPreview) {
        setReaderTheme("sepia");
      }
    } catch {}

    try {
      const savedSpacing = localStorage.getItem(LS_LINE_SPACING) as LineSpacing | null;
      if (savedSpacing && ["normal", "relaxed"].includes(savedSpacing)) {
        setLineSpacing(savedSpacing);
      }
    } catch {}
  }, [options?.isPreview]);

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

  return {
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    readerTheme,
    setReaderTheme,
    lineSpacing,
    setLineSpacing,
    isFullscreen,
    setIsFullscreen,
    chromeVisible,
    setChromeVisible,
    changeTheme,
    changeFontSize,
    changeFontFamily,
    changeLineSpacing,
    toggleFullscreen,
  };
}
