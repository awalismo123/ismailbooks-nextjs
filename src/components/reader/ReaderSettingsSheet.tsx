"use client";

import React from "react";
import { X, Sun, Moon, BookOpen, Minus, Plus, Maximize, Minimize, Eye } from "lucide-react";

export type ReaderTheme = "light" | "sepia" | "night";
export type FontFamily = "serif" | "sans" | "mono" | "dyslexia";
export type LineSpacing = "normal" | "relaxed";

type Props = {
  open: boolean;
  onClose: () => void;
  readerTheme: ReaderTheme;
  fontFamily: FontFamily;
  fontSize: number;
  lineSpacing: LineSpacing;
  isFullscreen: boolean;
  onThemeChange: (t: ReaderTheme) => void;
  onFontFamilyChange: (f: FontFamily) => void;
  onFontSizeChange: (delta: number) => void;
  onLineSpacingChange: (s: LineSpacing) => void;
  onToggleFullscreen: () => void;
};

const THEMES: { id: ReaderTheme; label: string; icon: React.ReactNode }[] = [
  { id: "light", label: "Iftiin", icon: <Sun className="w-4 h-4" /> },
  { id: "sepia", label: "Sepia", icon: <BookOpen className="w-4 h-4" /> },
  { id: "night", label: "Habeen", icon: <Moon className="w-4 h-4" /> },
];

const FONTS: { id: FontFamily; label: string; sub?: string }[] = [
  { id: "serif", label: "Serif" },
  { id: "sans", label: "Sans" },
  { id: "mono", label: "Mono" },
  { id: "dyslexia", label: "Fudud", sub: "Akhrin" },
];

export default function ReaderSettingsSheet({
  open,
  onClose,
  readerTheme,
  fontFamily,
  fontSize,
  lineSpacing,
  isFullscreen,
  onThemeChange,
  onFontFamilyChange,
  onFontSizeChange,
  onLineSpacingChange,
  onToggleFullscreen,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center sm:justify-end"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Dejinta akhriska"
    >
      <div
        style={{
          background: "var(--reader-bg)",
          borderColor: "var(--reader-border)",
          color: "var(--reader-body)",
        }}
        className="w-full sm:max-w-sm sm:h-full sm:border-l rounded-t-2xl sm:rounded-none max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{ borderColor: "var(--reader-border)" }}
          className="sticky top-0 flex items-center justify-between px-5 py-4 border-b backdrop-blur-md"
        >
          <h3
            style={{ color: "var(--reader-heading)" }}
            className="font-display text-base font-extrabold m-0"
          >
            Dejinta Akhriska
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{ color: "var(--reader-muted)", minWidth: 44, minHeight: 44 }}
            className="inline-flex items-center justify-center rounded-xl hover:opacity-70"
            aria-label="Xir"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-5 space-y-6">
          <section>
            <p
              style={{ color: "var(--reader-muted)" }}
              className="text-[11px] font-extrabold uppercase tracking-wider mb-2"
            >
              Tema
            </p>
            <div className="grid grid-cols-3 gap-2">
              {THEMES.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onThemeChange(opt.id)}
                  style={{
                    minHeight: 48,
                    border: "1px solid var(--reader-border)",
                    background:
                      readerTheme === opt.id
                        ? "var(--reader-accent)"
                        : "var(--reader-surface)",
                    color: readerTheme === opt.id ? "#fff" : "var(--reader-heading)",
                  }}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl text-xs font-bold"
                  aria-pressed={readerTheme === opt.id}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p
              style={{ color: "var(--reader-muted)" }}
              className="text-[11px] font-extrabold uppercase tracking-wider mb-2"
            >
              Nooca Xarfaha
            </p>
            <div className="grid grid-cols-4 gap-2">
              {FONTS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onFontFamilyChange(f.id)}
                  style={{
                    minHeight: 48,
                    border: "1px solid var(--reader-border)",
                    background:
                      fontFamily === f.id
                        ? "var(--reader-accent)"
                        : "var(--reader-surface)",
                    color: fontFamily === f.id ? "#fff" : "var(--reader-heading)",
                  }}
                  className="flex flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-bold uppercase"
                  aria-pressed={fontFamily === f.id}
                >
                  {f.id === "dyslexia" && <Eye className="w-3 h-3" />}
                  {f.label}
                  {f.sub && <span style={{ fontSize: 8, opacity: 0.7 }}>{f.sub}</span>}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p
              style={{ color: "var(--reader-muted)" }}
              className="text-[11px] font-extrabold uppercase tracking-wider mb-2"
            >
              Cabbirka Xarfaha
            </p>
            <div
              style={{
                border: "1px solid var(--reader-border)",
                background: "var(--reader-surface)",
              }}
              className="flex items-center justify-between rounded-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => onFontSizeChange(-2)}
                style={{ color: "var(--reader-muted)", minWidth: 48, minHeight: 48 }}
                className="inline-flex items-center justify-center hover:opacity-70"
                aria-label="Yaree xarfaha"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span
                style={{ color: "var(--reader-accent)" }}
                className="text-sm font-mono font-bold"
              >
                {fontSize}px
              </span>
              <button
                type="button"
                onClick={() => onFontSizeChange(2)}
                style={{ color: "var(--reader-muted)", minWidth: 48, minHeight: 48 }}
                className="inline-flex items-center justify-center hover:opacity-70"
                aria-label="Kordhi xarfaha"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </section>

          <section>
            <p
              style={{ color: "var(--reader-muted)" }}
              className="text-[11px] font-extrabold uppercase tracking-wider mb-2"
            >
              Baaxadda Sadarrada
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: "normal" as LineSpacing, label: "Caadi" },
                  { id: "relaxed" as LineSpacing, label: "Ballaaran" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onLineSpacingChange(opt.id)}
                  style={{
                    minHeight: 44,
                    border: "1px solid var(--reader-border)",
                    background:
                      lineSpacing === opt.id
                        ? "var(--reader-accent)"
                        : "var(--reader-surface)",
                    color: lineSpacing === opt.id ? "#fff" : "var(--reader-heading)",
                  }}
                  className="rounded-xl text-xs font-bold"
                  aria-pressed={lineSpacing === opt.id}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          <section className="hidden sm:block">
            <button
              type="button"
              onClick={onToggleFullscreen}
              style={{
                minHeight: 48,
                border: "1px solid var(--reader-border)",
                background: "var(--reader-surface)",
                color: "var(--reader-heading)",
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl text-xs font-bold"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
              {isFullscreen ? "Ka bax shaashadda buuxda" : "Shaashad Buuxda"}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
