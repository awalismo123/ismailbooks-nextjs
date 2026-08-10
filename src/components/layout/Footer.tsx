"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { MessageCircle, Mail, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#E8DFD2] bg-white pt-14 pb-10 mt-auto text-sm text-[#6B5F52]">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-[#E8DFD2]">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <div className="w-9 h-9 rounded-xl bg-[#7A1F2B] text-white grid place-items-center font-display font-extrabold">
                IB
              </div>
              <span className="font-display text-xl font-bold text-[#201B16]">
                IsmailBooks
              </span>
            </Link>
            <p className="text-xs leading-relaxed">{t.footer.tagline}</p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://wa.me/252636475579"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-[#E8DFD2] bg-[#FBF7F0] hover:border-[#25D366] hover:text-[#25D366] flex items-center justify-center transition-colors text-[#1F3A54]"
                title="WhatsApp Support"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@ismailbooks.com"
                className="w-9 h-9 rounded-xl border border-[#E8DFD2] bg-[#FBF7F0] hover:border-[#1F3A54] text-[#1F3A54] flex items-center justify-center transition-colors"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-[#201B16] font-semibold tracking-wider text-xs uppercase">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/books" className="hover:text-[#7A1F2B] no-underline text-[#1F3A54]">
                  {t.nav.books}
                </Link>
              </li>
              <li>
                <Link href="/summaries" className="hover:text-[#7A1F2B] no-underline text-[#1F3A54]">
                  {t.nav.summaries}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#7A1F2B] no-underline text-[#1F3A54]">
                  {t.nav.blog}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-[#201B16] font-semibold tracking-wider text-xs uppercase">
              Mawduucyada / Topics
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/blog" className="hover:text-[#7A1F2B] no-underline text-[#1F3A54]">
                  Cilmiga Maskaxda (Psychology)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#7A1F2B] no-underline text-[#1F3A54]">
                  Falsafadda (Philosophy)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#7A1F2B] no-underline text-[#1F3A54]">
                  Horumar Shaqsiyeed (Self-Improvement)
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 surface-card !p-5 hover:!translate-y-0">
            <h4 className="font-display text-[#201B16] font-semibold text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2E7D5B]" />
              Caawimo & Taageero
            </h4>
            <p className="text-xs leading-relaxed">
              Waxaad nagala soo xiriiri kartaa WhatsApp si aad u bixiso lacagta ama u hesho caawimo.
            </p>
            <a
              href="https://wa.me/252636475579"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F4FAF7] text-[#235C45] border border-[rgba(46,125,91,0.18)] text-xs font-bold no-underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: +252 63 6475579</span>
            </a>
          </div>
        </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>{t.footer.rights}</p>
            <p className="text-[#6B5F52]">Waxaa sameeyay Ismail Abdi Ismail · Somalia 🇸🇴</p>
          </div>
      </div>
    </footer>
  );
};
