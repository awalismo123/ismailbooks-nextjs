"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  List,
  Sun,
  Moon,
  BookOpen,
  Eye,
  Minus,
  Plus,
  Maximize,
  Minimize,
  Bookmark,
  Highlighter,
  Search,
  Settings2,
  Flame,
  Lock,
} from "lucide-react";
import ReaderBackButton from "./ReaderBackButton";
import ReaderToc from "./ReaderToc";
import type { ReaderTheme, FontFamily } from "./ReaderSettingsSheet";
import type { TocItem } from "@/hooks/useReaderProgress";

export interface ReaderChromeProps {
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  returnTarget?: string;
  isPreview?: boolean;
  chapterTitle: string;
  currentChapter: number;
  chaptersCount: number;
  blendedPct: number;
  chromeOpen: boolean;
  prefersReducedMotion: boolean;
  readerTheme: ReaderTheme;
  fontFamily: FontFamily;
  fontSize: number;
  isFullscreen: boolean;
  isBookmarked: boolean;
  annotationsOpen: boolean;
  bookmarksCount: number;
  highlightsCount: number;
  tocOpen: boolean;
  searchOpen: boolean;
  settingsOpen: boolean;
  streakDays: number;
  previewLimit: number;
  toc: TocItem[] | null;
  changeTheme: (t: ReaderTheme) => void;
  changeFontFamily: (f: FontFamily) => void;
  changeFontSize: (delta: number) => void;
  toggleFullscreen: () => void;
  toggleBookmark: () => void;
  onOpenAnnotations: () => void;
  onOpenToc: () => void;
  onToggleSearch: () => void;
  onOpenSettings: () => void;
  onCloseToc: () => void;
  goTo: (idx: number) => void;
}

export default function ReaderChrome({
  bookId,
  bookTitle,
  bookAuthor,
  returnTarget,
  isPreview = false,
  chapterTitle,
  currentChapter,
  chaptersCount,
  blendedPct,
  chromeOpen,
  prefersReducedMotion,
  readerTheme,
  fontFamily,
  fontSize,
  isFullscreen,
  isBookmarked,
  annotationsOpen,
  bookmarksCount,
  highlightsCount,
  tocOpen,
  searchOpen,
  settingsOpen,
  streakDays,
  previewLimit,
  toc,
  changeTheme,
  changeFontFamily,
  changeFontSize,
  toggleFullscreen,
  toggleBookmark,
  onOpenAnnotations,
  onOpenToc,
  onToggleSearch,
  onOpenSettings,
  onCloseToc,
  goTo,
}: ReaderChromeProps) {
  return (
    <>
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

      {/* Chapter change announcer for screen readers */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {chapterTitle ? `Cutub ${currentChapter + 1}: ${chapterTitle}` : ""}
      </div>

      {/* Header */}
      <header
        style={{
          background: "var(--reader-bg)",
          borderBottom: "1px solid var(--reader-border)",
          transform: chromeOpen ? "translateY(0)" : "translateY(-110%)",
          transition: prefersReducedMotion ? "none" : "transform 0.25s ease",
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
            {[
              { id: "light" as ReaderTheme, icon: <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, title: "Iftiin" },
              { id: "sepia" as ReaderTheme, icon: <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, title: "Sepia" },
              { id: "night" as ReaderTheme, icon: <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, title: "Habeen" },
            ].map((opt) => (
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
            {[
              { id: "serif" as FontFamily, label: "Serif" },
              { id: "sans" as FontFamily, label: "Sans" },
              { id: "dyslexia" as FontFamily, label: "Fudud", icon: <Eye className="w-3.5 h-3.5" /> },
            ].map((opt) => (
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
            onClick={onOpenAnnotations}
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
            {bookmarksCount + highlightsCount > 0 && (
              <span
                className="absolute -right-1 -top-1 min-w-[16px] rounded-full px-1 text-[9px] font-black leading-[16px] text-center"
                style={{ background: "#C9962E", color: "#1A1208" }}
              >
                {bookmarksCount + highlightsCount}
              </span>
            )}
          </button>

          {/* Chapters (TOC) button */}
          {chaptersCount > 0 && (
            <button
              type="button"
              onClick={onOpenToc}
              style={{
                border: "1px solid var(--reader-border)",
                background: tocOpen ? "var(--reader-accent)" : "var(--reader-surface)",
                color: tocOpen ? "#fff" : "var(--reader-heading)",
              }}
              className="h-8 sm:h-11 px-2 sm:px-2.5 inline-flex items-center justify-center gap-1 rounded-xl text-xs font-bold shrink-0"
              aria-label="Cutubyada"
              title="Cutubyada"
            >
              <List
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                style={{ color: tocOpen ? "#fff" : "var(--reader-accent)" }}
              />
              <span className="hidden md:inline">Cutubyada</span>
            </button>
          )}

          {/* Search button */}
          <button
            type="button"
            onClick={onToggleSearch}
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

          {/* Settings button */}
          <button
            type="button"
            onClick={onOpenSettings}
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
              transition: prefersReducedMotion ? "none" : "width 300ms ease",
            }}
            className="h-1"
          />
        </div>
      )}

      {/* Bottom dock */}
      {chaptersCount > 0 && (
        <footer
          style={{
            transform: chromeOpen ? "translateY(0)" : "translateY(120%)",
            transition: prefersReducedMotion ? "none" : "transform 0.25s ease",
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

      {/* Table of contents drawer */}
      <ReaderToc
        open={tocOpen}
        toc={toc}
        currentChapter={currentChapter}
        isPreview={isPreview}
        previewLimit={previewLimit}
        onClose={onCloseToc}
        goTo={goTo}
      />
    </>
  );
}
