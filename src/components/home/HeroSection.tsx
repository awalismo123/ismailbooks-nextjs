"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const miniBooks = [
  { label: "Cilmi-Nafsiga", className: "cover-gradient-1" },
  { label: "Falsafadda", className: "cover-gradient-2" },
  { label: "Taariikhda", className: "cover-gradient-3" },
  { label: "Horumar", className: "cover-gradient-4" },
  { label: "Diinta", className: "cover-gradient-5" },
  { label: "Dhaqanka", className: "cover-gradient-6" },
];

interface HeroProps {
  heroCovers?: string[];
}

export const HeroSection: React.FC<HeroProps> = ({ heroCovers = [] }) => {
  const { t } = useLanguage();

  return (
    <section className="pb-6 pt-8 md:pb-8 md:pt-14">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-8 rounded-[32px] border border-[#E8DFD2] bg-gradient-to-b from-white to-[#FBF7F0] p-6 shadow-[0_20px_50px_rgba(32,27,22,0.08)] md:p-12 lg:grid-cols-[1.15fr_0.85fr]"
        >
          {/* Left — copy */}
          <div>
            <span className="eyebrow">{t.hero.tag}</span>
            <h1 className="font-display mb-3.5 mt-4 text-[clamp(34px,5vw,60px)] font-extrabold leading-[1.05] text-[#201B16]">
              {t.hero.title}
            </h1>
            <p className="m-0 max-w-[58ch] text-base leading-relaxed text-[#6B5F52] md:text-lg">
              {t.hero.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap gap-3.5">
              <Link href="/books" className="btn btn-primary">
                <BookOpen className="h-4 w-4" />
                {t.hero.btnPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/books" className="btn btn-secondary">
                {t.hero.btnSecondary}
              </Link>
            </div>

            <p className="m-0 mt-4 text-sm font-bold text-[#2E7D5B]">
              {t.hero.trustNote}
            </p>
          </div>

          {/* Right — cover shelf */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="rounded-[26px] border border-[#E8DFD2] bg-white p-4 md:p-6"
          >
            <div className="grid grid-cols-3 gap-3">
              {heroCovers.length > 0
                ? heroCovers.slice(0, 6).map((cover, i) => (
                    <div
                      key={i}
                      className="relative h-[110px] overflow-hidden rounded-[14px] shadow-sm md:h-[126px]"
                    >
                      <img
                        src={cover}
                        alt="Book cover"
                        loading="eager"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  ))
                : miniBooks.map((book) => (
                    <div
                      key={book.label}
                      className={`${book.className} flex h-[110px] items-end rounded-[14px] p-2.5 text-xs font-extrabold leading-snug text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] md:h-[126px]`}
                    >
                      {book.label}
                    </div>
                  ))}
            </div>

            <div className="trust-line mt-4">
              <span>★</span>
              <span>{t.hero.trustBadge}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};