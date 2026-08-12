"use client";

import React from "react";

type Theme = "paper" | "sepia" | "night";

interface ArticleContentProps {
  content: string;
  fontSize: number;
  theme: Theme;
}

// ─── Inline markdown → React nodes ───────────────────────────────────────────
// Handles: **bold** and [text](url).  Returns a stable array keyed by index.
function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let cursor = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    // Plain text before this match
    if (m.index > cursor) {
      result.push(text.slice(cursor, m.index));
    }

    if (m[0].startsWith("**")) {
      // Bold
      result.push(
        <strong key={`${keyPrefix}-b-${m.index}`} className="font-extrabold text-[var(--reader-heading,#201B16)]">
          {m[2]}
        </strong>
      );
    } else {
      // Link — [text](url)
      result.push(
        <a
          key={`${keyPrefix}-a-${m.index}`}
          href={m[4]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1F3A54] font-semibold underline underline-offset-4 hover:text-[#7A1F2B] transition-colors"
        >
          {m[3]}
        </a>
      );
    }
    cursor = regex.lastIndex;
  }

  if (cursor < text.length) result.push(text.slice(cursor));
  return result.length ? result : [text];
}

// ─── Block-level markdown renderer ───────────────────────────────────────────
function renderMarkdown(raw: string): React.ReactNode[] {
  // Normalise Windows line endings
  const text = raw.replace(/\r\n/g, "\n");
  // Split on blank lines (one or more)
  const blocks = text.split(/\n{2,}/);
  let paraIndex = 0; // counts only <p> elements for lead detection

  return blocks.flatMap((block, blockIdx) => {
    const b = block.trim();
    if (!b) return [];
    const k = `block-${blockIdx}`;

    // ── Heading 2
    if (b.startsWith("## ")) {
      return (
        <h2
          key={k}
          className="font-display font-extrabold tracking-tight text-[var(--reader-heading,#201B16)] mt-12 mb-5"
          style={{ fontSize: "1.55em" }}
        >
          {parseInline(b.slice(3), k)}
        </h2>
      );
    }

    // ── Heading 3
    if (b.startsWith("### ")) {
      return (
        <h3
          key={k}
          className="font-display font-bold tracking-tight text-[var(--reader-heading,#201B16)] mt-10 mb-4"
          style={{ fontSize: "1.25em" }}
        >
          {parseInline(b.slice(4), k)}
        </h3>
      );
    }

    // ── Blockquote  (may be multi-line inside one block)
    if (b.startsWith("> ")) {
      const quoteText = b
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .join(" ");
      return (
        <blockquote
          key={k}
          className="
            my-8 pl-5 pr-4 py-4
            border-l-4 border-[#C9962E]
            rounded-r-2xl
            font-serif italic
            text-[var(--reader-muted,#6B5F52)]
            leading-relaxed
          "
          style={{ background: "color-mix(in srgb, var(--reader-background,#FBF7F0) 70%, transparent)" }}
        >
          {parseInline(quoteText, k)}
        </blockquote>
      );
    }

    // ── Bullet list  (lines that start with "- " or "* ")
    const listLines = b.split("\n").filter((l) => /^[-*]\s/.test(l));
    if (listLines.length > 0 && listLines.length === b.split("\n").filter(Boolean).length) {
      return (
        <ul
          key={k}
          className="
            my-6 pl-6 space-y-2.5
            list-disc marker:text-[#C9962E]
            font-serif leading-[1.8]
            text-[var(--reader-text,#2b241d)]
          "
        >
          {listLines.map((line, i) => (
            <li key={i}>{parseInline(line.replace(/^[-*]\s+/, ""), `${k}-li-${i}`)}</li>
          ))}
        </ul>
      );
    }

    // ── Horizontal rule
    if (/^---+$/.test(b) || /^\*\*\*+$/.test(b)) {
      return <hr key={k} className="my-10 border-[var(--reader-border,#E8DFD2)]" />;
    }

    // ── Paragraph (default)
    const isLead = paraIndex === 0;
    paraIndex++;

    return (
      <p
        key={k}
        className={[
          "font-serif leading-[1.85] mb-[1.5em] tracking-[0.01em]",
          "text-[var(--reader-text,#2b241d)]",
          isLead ? "text-[1.08em] font-medium" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {parseInline(b, k)}
      </p>
    );
  });
}

// ─── HTML mode: uses scoped .article-reader-body CSS from globals.css ────────
// (No @tailwindcss/typography installed — prose-* classes are inert)
function HtmlContent({ html, fontSize }: { html: string; fontSize: number }) {
  return (
    <div
      className="article-reader-body"
      style={{ fontSize: `${fontSize}px` }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function ArticleContent({ content, fontSize, theme }: ArticleContentProps) {
  if (!content) return null;

  // Detect pre-rendered HTML (admin rich-text editor output)
  const isHtml = /<[a-z][\s\S]*>/i.test(content);

  return (
    // data-reader-theme drives the --reader-* CSS variables from globals.css.
    // "paper" is the default (:root) so we omit the attribute for it.
    <div
      data-reader-theme={theme !== "paper" ? theme : undefined}
      className="
        reader-shell
        rounded-3xl px-6 py-8 sm:px-10 sm:py-12 md:px-14
        border transition-colors duration-300
      "
      style={{
        background: "var(--reader-background,#f7f1e5)",
        color: "var(--reader-text,#2b241d)",
        borderColor: "var(--reader-border,#e4d8c4)",
      }}
    >
      <div className="max-w-[680px] mx-auto" style={{ fontSize: `${fontSize}px` }}>
        {isHtml ? (
          <HtmlContent html={content} fontSize={fontSize} />
        ) : (
          renderMarkdown(content)
        )}
      </div>
    </div>
  );
}
