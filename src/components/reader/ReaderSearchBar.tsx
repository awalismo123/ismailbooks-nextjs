"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronUp, ChevronDown, Search } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  html: string;
  onHighlightedHtml: (html: string | null) => void;
};

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildHighlightedHtml(html: string, query: string): { html: string; count: number } {
  if (!query.trim()) return { html, count: 0 };
  const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
  let count = 0;
  const result = html.replace(regex, (m) => {
    const idx = count++;
    return `<mark class="ib-search-mark" data-idx="${idx}">${m}</mark>`;
  });
  return { html: result, count };
}

export default function ReaderSearchBar({ open, onClose, html, onHighlightedHtml }: Props) {
  const [query, setQuery] = useState("");
  const [matchCount, setMatchCount] = useState(0);
  const [currentMatch, setCurrentMatch] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setMatchCount(0);
      setCurrentMatch(0);
      onHighlightedHtml(null);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const applyHighlight = useCallback(
    (q: string) => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

      if (!q.trim()) {
        setMatchCount(0);
        setCurrentMatch(0);
        onHighlightedHtml(null);
        return;
      }
      
      searchTimeoutRef.current = setTimeout(() => {
        const { html: highlighted, count } = buildHighlightedHtml(html, q);
        setMatchCount(count);
        setCurrentMatch(count > 0 ? 1 : 0);
        onHighlightedHtml(count > 0 ? highlighted : null);
        if (count > 0) {
          requestAnimationFrame(() => {
            const el = document.querySelector<HTMLElement>(".ib-search-mark[data-idx=\"0\"]");
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
          });
        }
      }, 300);
    },
    [html, onHighlightedHtml],
  );

  const navigateTo = (idx: number) => {
    document.querySelectorAll<HTMLElement>(".ib-search-mark").forEach((m) => {
      m.style.background = "rgba(234, 179, 8, 0.4)";
      m.style.color = "inherit";
    });
    const el = document.querySelector<HTMLElement>(`.ib-search-mark[data-idx="${idx}"]`);
    if (!el) return;
    el.style.background = "#EAB308";
    el.style.color = "#1A1A1A";
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const goPrev = () => {
    if (matchCount === 0) return;
    const next = currentMatch > 1 ? currentMatch - 1 : matchCount;
    setCurrentMatch(next);
    navigateTo(next - 1);
  };

  const goNext = () => {
    if (matchCount === 0) return;
    const next = currentMatch < matchCount ? currentMatch + 1 : 1;
    setCurrentMatch(next);
    navigateTo(next - 1);
  };

  if (!open) return null;

  return (
    <div
      style={{ background: "var(--reader-surface)", borderBottom: "1px solid var(--reader-border)", zIndex: 45 }}
      className="sticky top-0 flex items-center gap-2 px-3 py-2"
    >
      <Search className="w-4 h-4 shrink-0" style={{ color: "var(--reader-muted)" }} />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => { setQuery(e.target.value); applyHighlight(e.target.value); }}
        onKeyDown={(e) => {
          if (e.key === "Enter") goNext();
          if (e.key === "Escape") { onClose(); onHighlightedHtml(null); }
        }}
        placeholder="Qoraalka ka raadi..."
        style={{ background: "transparent", border: "none", outline: "none", color: "var(--reader-body)", fontSize: 14, flex: 1, minWidth: 0 }}
        autoComplete="off"
        spellCheck={false}
      />
      {matchCount > 0 && (
        <span style={{ color: "var(--reader-muted)", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
          {currentMatch} / {matchCount}
        </span>
      )}
      {query && matchCount === 0 && (
        <span style={{ color: "#EF4444", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>Ma helin</span>
      )}
      <button type="button" onClick={goPrev} disabled={matchCount === 0}
        style={{ color: "var(--reader-muted)", minWidth: 32, minHeight: 32 }}
        className="inline-flex items-center justify-center rounded-lg disabled:opacity-30" aria-label="Hore">
        <ChevronUp className="w-4 h-4" />
      </button>
      <button type="button" onClick={goNext} disabled={matchCount === 0}
        style={{ color: "var(--reader-muted)", minWidth: 32, minHeight: 32 }}
        className="inline-flex items-center justify-center rounded-lg disabled:opacity-30" aria-label="Xiga">
        <ChevronDown className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => { onClose(); onHighlightedHtml(null); }}
        style={{ color: "var(--reader-muted)", minWidth: 32, minHeight: 32 }}
        className="inline-flex items-center justify-center rounded-lg" aria-label="Xir raadinta">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
