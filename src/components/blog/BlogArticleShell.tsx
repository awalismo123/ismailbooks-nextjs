"use client";

import React, { useState, useEffect } from "react";
import { ArticleToolbar } from "./ArticleToolbar";
import { ArticleContent } from "./ArticleContent";

type Theme = "paper" | "sepia" | "night";

interface BlogArticleShellProps {
  title: string;
  slug: string;
  content: string;
}

export function BlogArticleShell({ title, slug, content }: BlogArticleShellProps) {
  const [theme, setTheme] = useState<Theme>("paper");
  const [fontSize, setFontSize] = useState<number>(18);
  // Avoid hydration mismatch: render with server defaults first,
  // then apply localStorage values after mount.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("ismailbooks_reader_theme") as Theme | null;
      const savedSize = localStorage.getItem("ismailbooks_reader_font_size");

      if (savedTheme && ["paper", "sepia", "night"].includes(savedTheme)) {
        setTheme(savedTheme);
      }
      if (savedSize) {
        const parsed = parseInt(savedSize, 10);
        if (!isNaN(parsed) && parsed >= 15 && parsed <= 22) {
          setFontSize(parsed);
        }
      }
    } catch {
      // Silently ignore — private browsing / storage quota
    }
    setHydrated(true);
  }, []);

  const handleThemeChange = (t: Theme) => {
    setTheme(t);
    try { localStorage.setItem("ismailbooks_reader_theme", t); } catch { /* noop */ }
  };

  const handleFontSizeChange = (s: number) => {
    setFontSize(s);
    try { localStorage.setItem("ismailbooks_reader_font_size", String(s)); } catch { /* noop */ }
  };

  return (
    <>
      <ArticleToolbar
        title={title}
        slug={slug}
        theme={hydrated ? theme : "paper"}
        fontSize={hydrated ? fontSize : 18}
        onThemeChange={handleThemeChange}
        onFontSizeChange={handleFontSizeChange}
      />

      <ArticleContent
        content={content}
        fontSize={hydrated ? fontSize : 18}
        theme={hydrated ? theme : "paper"}
      />
    </>
  );
}
