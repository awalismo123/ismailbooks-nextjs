"use client";

import React, { useEffect, useRef, useState } from "react";
import { Copy, Check, MessageCircle, Sun, Moon, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Theme = "paper" | "sepia" | "night";

interface ArticleToolbarProps {
  title: string;
  slug: string; // only slug; URL resolved client-side
  theme: Theme;
  fontSize: number;
  onThemeChange: (theme: Theme) => void;
  onFontSizeChange: (size: number) => void;
}

export function ArticleToolbar({
  title,
  slug,
  theme,
  fontSize,
  onThemeChange,
  onFontSizeChange,
}: ArticleToolbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  // URL resolved after mount to avoid SSR mismatch
  const [shareUrl, setShareUrl] = useState<string>(`https://ismailbooks.com/blog/${slug}`);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    // Resolve canonical URL on the client
    setShareUrl(window.location.href);
    // Check motion preference
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback: select and copy from a temporary input
      const inp = document.createElement("input");
      inp.value = shareUrl;
      document.body.appendChild(inp);
      inp.select();
      document.execCommand("copy");
      document.body.removeChild(inp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title}\n${shareUrl}`)}`;

  const THEMES: { key: Theme; label: string; icon: React.ReactNode; activeClass: string }[] = [
    {
      key: "paper",
      label: "Paper",
      icon: <Sun className="w-3.5 h-3.5 shrink-0" />,
      activeClass: "bg-white text-[#7A1F2B] border border-[#E8DFD2] shadow-sm",
    },
    {
      key: "sepia",
      label: "Sepia",
      icon: <BookOpen className="w-3.5 h-3.5 shrink-0" />,
      activeClass: "bg-[#F1E4CD] text-[#8C3B2E] border border-[#DFC9A8] shadow-sm",
    },
    {
      key: "night",
      label: "Night",
      icon: <Moon className="w-3.5 h-3.5 shrink-0" />,
      activeClass: "bg-[#151210] text-[#D4A94C] border border-[#3A332C] shadow-sm",
    },
  ];

  const inactiveClass =
    "text-[#6B5F52] hover:bg-[#E8DFD2]/60 hover:text-[#201B16]";

  return (
    <>
      {/* ── Reading Progress Bar — fixed top 3px ── */}
      <div
        className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#7A1F2B] via-[#a0273b] to-[#C9962E]"
          style={{
            width: `${scrollProgress}%`,
            transition: prefersReducedMotion.current
              ? "none"
              : "width 120ms linear",
          }}
        />
      </div>

      {/* ── Sticky toolbar ── */}
      <nav
        aria-label="Xulashooyinka akhriska"
        className="
          sticky top-3 z-50 mb-8 mx-auto max-w-[720px]
          flex items-center gap-2 sm:gap-3
          px-3 py-2 sm:px-4
          rounded-2xl
          bg-white/95 backdrop-blur-md
          border border-[#E8DFD2]
          shadow-[0_2px_16px_rgba(32,27,22,0.07)]
          transition-shadow duration-200
          overflow-x-auto no-scrollbar
        "
      >
        {/* ── Back button ── */}
        <Link
          href="/blog"
          className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-[#FBF7F0] border border-[#E8DFD2]/70 text-[#6B5F52] hover:bg-[#E8DFD2]/70 hover:text-[#201B16] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1F2B]"
          aria-label="Ku noqo Qoraallada"
          title="Ku noqo Qoraallada"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        
        {/* ── Separator ── */}
        <div className="hidden sm:block w-px h-6 bg-[#E8DFD2] shrink-0" aria-hidden="true" />

        {/* ── Font size ── */}
        <div
          className="flex items-center gap-0.5 shrink-0 bg-[#FBF7F0] rounded-xl px-1 py-0.5 border border-[#E8DFD2]/70"
          role="group"
          aria-label="Cabbirka qoraalka"
        >
          <button
            onClick={() => fontSize > 15 && onFontSizeChange(fontSize - 1)}
            disabled={fontSize <= 15}
            aria-label="Yaree cabbirka (A−)"
            className="
              w-10 h-10 flex items-center justify-center rounded-lg
              text-sm font-bold text-[#201B16]
              hover:bg-[#E8DFD2]/70 disabled:opacity-35 disabled:cursor-not-allowed
              transition-colors focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#7A1F2B] focus-visible:ring-offset-1
            "
          >
            A−
          </button>
          <span
            aria-live="polite"
            aria-label={`Cabbirka hadda: ${fontSize} pixels`}
            className="text-[11px] tabular-nums font-semibold text-[#6B5F52] px-1 select-none"
          >
            {fontSize}
          </span>
          <button
            onClick={() => fontSize < 22 && onFontSizeChange(fontSize + 1)}
            disabled={fontSize >= 22}
            aria-label="Weyneey cabbirka (A+)"
            className="
              w-10 h-10 flex items-center justify-center rounded-lg
              text-sm font-bold text-[#201B16]
              hover:bg-[#E8DFD2]/70 disabled:opacity-35 disabled:cursor-not-allowed
              transition-colors focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#7A1F2B] focus-visible:ring-offset-1
            "
          >
            A+
          </button>
        </div>

        {/* ── Separator ── */}
        <div className="w-px h-6 bg-[#E8DFD2] shrink-0" aria-hidden="true" />

        {/* ── Theme switcher ── */}
        <div
          className="flex items-center gap-0.5 shrink-0 bg-[#FBF7F0] rounded-xl px-1 py-0.5 border border-[#E8DFD2]/70"
          role="group"
          aria-label="Theme-ka akhriska"
        >
          {THEMES.map(({ key, label, icon, activeClass }) => (
            <button
              key={key}
              onClick={() => onThemeChange(key)}
              aria-pressed={theme === key}
              aria-label={`Theme: ${label}`}
              className={`
                h-10 px-2.5 flex items-center gap-1.5 rounded-lg
                text-xs font-bold whitespace-nowrap
                transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#7A1F2B] focus-visible:ring-offset-1
                ${theme === key ? activeClass : inactiveClass}
              `}
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ── Separator ── */}
        <div className="w-px h-6 bg-[#E8DFD2] shrink-0 ml-auto" aria-hidden="true" />

        {/* ── Share actions ── */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ku wadaag WhatsApp"
            title="Ku wadaag WhatsApp"
            className="
              h-10 px-2.5 flex items-center gap-1.5 rounded-xl
              bg-[rgba(37,211,102,0.09)] text-[#1a7a40]
              border border-[rgba(37,211,102,0.25)]
              text-xs font-bold
              hover:bg-[rgba(37,211,102,0.18)] transition-colors
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#25D366] focus-visible:ring-offset-1
            "
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          <button
            onClick={handleCopy}
            aria-label={copied ? "La koobiyeeyay!" : "Kobi link-ga"}
            title={copied ? "La koobiyeeyay!" : "Kobi link-ga"}
            className="
              h-10 px-2.5 flex items-center gap-1.5 rounded-xl
              bg-[rgba(31,58,84,0.07)] text-[#1F3A54]
              border border-[rgba(31,58,84,0.14)]
              text-xs font-bold
              hover:bg-[rgba(31,58,84,0.13)] transition-colors
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#1F3A54] focus-visible:ring-offset-1
            "
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                <span className="text-[#2E7D5B] whitespace-nowrap">La koobiyeeyay!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 shrink-0" />
                <span className="hidden md:inline">Kobi Link</span>
              </>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
