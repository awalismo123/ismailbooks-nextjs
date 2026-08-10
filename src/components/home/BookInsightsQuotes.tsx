"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { Quote } from "lucide-react";

const quotes = [
  {
    id: 1,
    quote:
      "Qofka Alle wanaag ka fishaa wuxuu ku noolaadaa rajo. Qofka rajadu qalbigiisa ka buuxdaana, nolosha ayaa u fududaata.",
    author: "Dr. Joe Dispenza (Cilmi-Nafsiga Bogsashada)",
    tag: "Bogsashada Maskaxda",
  },
  {
    id: 2,
    quote:
      "Mid ka mid ah qaababka ugu fiican ee looga takhaluso isla-waynida waa inaad lahaato Maskax Ardaynimo (Student Mindset).",
    author: "Ryan Holiday (Ego is the Enemy)",
    tag: "Isla-Waynida & Kibirka",
  },
  {
    id: 3,
    quote:
      "Falsafaddu maaha wax ku kooban jaamacadaha. Waa safar u furan qof kasta oo raba inuu maskaxdiisa tuujiyo.",
    author: "Thomas Nagel (What Does It All Mean?)",
    tag: "Hordhaca Falsafadda",
  },
];

export const BookInsightsQuotes: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-14 md:py-16">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="eyebrow mb-3">Xikmadaha Buugaagta</span>
          <h2 className="font-display text-[clamp(28px,3vw,36px)] font-extrabold text-[#201B16] mt-3 mb-2">
            {t.sections.insightsTitle}
          </h2>
          <p className="text-[#6B5F52] text-sm m-0">{t.sections.insightsSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quotes.map((q) => (
            <article key={q.id} className="surface-card flex flex-col justify-between">
              <Quote className="w-9 h-9 text-[#7A1F2B]/40 mb-3" />
              <blockquote className="font-reader text-base text-[#201B16] italic leading-relaxed mb-5 m-0">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-[#E8DFD2]">
                <span className="text-xs font-bold text-[#1F3A54] block">{q.author}</span>
                <span className="text-[11px] text-[#6B5F52]">{q.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
