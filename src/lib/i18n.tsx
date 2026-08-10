"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "so" | "en";

export const translations = {
  so: {
    nav: {
      home: "Boga Hore",
      books: "Buugaagta",
      summaries: "Saanad / Soo-koobid",
      blog: "Qoraallada",
      about: "Naga Saabsan",
      login: "Gal Account",
      register: "Diiwaangali",
      dashboard: "Maktabadayda",
      admin: "Maamulka",
    },
    hero: {
      tag: "Maktabadda Af-Soomaaliga • 2026",
      title: "Hel buugaag iyo aqoon ku anfacda",
      subtitle: "Goob walba iyo goor walba si fudud. Ku soo dhawoow IsmailBooks — buugaag diirran, la aamini karo, fudud in la akhriyo, oo ku habboon mobile-ka.",
      btnPrimary: "Iibso / Hel buugaagta",
      btnSecondary: "Akhriso preview",
      trustNote: "✓ EVC • Zaad • eDahab  •  Ansixin 24 saacadood gudahood",
      statsBooks: "Buugaag & Soo-koobid",
      statsUsers: "Akhristayaal Dhab ah",
      statsDownloads: "Aqoonta La Qabsaday",
      trustBadge: "Buugaag Af-Soomaali ah — Cilmi-nafsiga, Falsafadda, iyo Horumar Shaqsiyeed",
    },
    books: {
      searchPlaceholder: "Raadi buug ama qoraa...",
      filterAll: "Dhammaan",
      filterFree: "Bilaash",
      filterPremium: "Premium",
      booksFound: "buug ayaa la helay",
      noResults: "Buug la helin",
      noResultsHint: "Isku day ereyga kale ama tirtir shaandhaynta.",
      pages: "boggag",
    },
    sections: {
      featuredBooksTitle: "Buugaagta Ugu Horreeya",
      featuredBooksSub: "Muuqaalka buugaagta cilmi-nafsiga, falsafadda iyo horumarinta shaqsiyadeed.",
      latestBlogTitle: "Qoraalladii Ugu Dambeeyay",
      latestBlogSub: "Falanqayn qoto dheer oo ku saabsan cilmiga maskaxda, buug-sheegyo iyo falsafad.",
      insightsTitle: "Xikmadaha Buugaagta",
      insightsSub: "Erayo dhiirrigelin iyo feker ku dhasha oo ka mid ah buugaagteenna.",
      whyUsTitle: "Sababta IsmailBooks?",
      viewAll: "Dhammaan Eeg",
      readMore: "Sii Akhri",
      downloadEpub: "Gub Buugga (EPUB)",
      free: "Bilaash",
      premium: "V.I.P / Premium",
    },
    footer: {
      tagline: "Madasha koowaad ee buugaagta digitaalka ah, cilmi-nafsiga iyo falsafadda af-Soomaaliga.",
      quickLinks: "Hagaha Degdegga ah",
      legal: "Xeeraadka",
      contactUs: "Nala Soo Xiriir",
      rights: "Dhammaan xuquuqdu waxay u dhawran yihiin IsmailBooks.com",
    }
  },
  en: {
    nav: {
      home: "Home",
      books: "Books",
      summaries: "Summaries",
      blog: "Blog",
      about: "About",
      login: "Sign In",
      register: "Register",
      dashboard: "My Library",
      admin: "Admin",
    },
    hero: {
      tag: "Somali Digital Library • 2026",
      title: "Find books and knowledge that help you grow",
      subtitle: "Anywhere, anytime — made simple. Warm, readable, trustworthy Somali books built for mobile and real reading.",
      btnPrimary: "Browse books",
      btnSecondary: "Read preview",
      trustNote: "✓ EVC • Zaad • eDahab  •  Approval within 24 hours",
      statsBooks: "Books & Summaries",
      statsUsers: "Active Readers",
      statsDownloads: "Knowledge Downloads",
      trustBadge: "Somali books — Psychology, Philosophy, and Personal Growth",
    },
    books: {
      searchPlaceholder: "Search books or authors...",
      filterAll: "All",
      filterFree: "Free",
      filterPremium: "Premium",
      booksFound: "books found",
      noResults: "No books found",
      noResultsHint: "Try a different keyword or clear the filters.",
      pages: "pages",
    },
    sections: {
      featuredBooksTitle: "Featured Masterpieces",
      featuredBooksSub: "Explore curated works in psychology, philosophy, and personal mastery.",
      latestBlogTitle: "Latest Essays & Insights",
      latestBlogSub: "Deep dives into cognitive science, philosophical breakdowns, and mental wellness.",
      insightsTitle: "Literary Gems & Quotes",
      insightsSub: "Thought-provoking highlights directly from our top titles.",
      whyUsTitle: "Why IsmailBooks?",
      viewAll: "View All",
      readMore: "Read Essay",
      downloadEpub: "Read EPUB",
      free: "Free",
      premium: "Premium",
    },
    footer: {
      tagline: "The premier Somali platform for digital books, psychology, and philosophy.",
      quickLinks: "Quick Navigation",
      legal: "Legal",
      contactUs: "Get In Touch",
      rights: "All rights reserved. IsmailBooks.com",
    }
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: typeof translations.so;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "so",
  setLang: () => {},
  t: translations.so,
});

export function LanguageProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [lang, setLangState] = useState<Language>("so");

  useEffect(() => {
    const saved = localStorage.getItem("ismailbooks_lang") as Language;
    if (saved === "so" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("ismailbooks_lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
