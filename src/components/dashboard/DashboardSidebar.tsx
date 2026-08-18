"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Sparkles,
  Library,
  CreditCard,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";

type Props = {
  username: string;
  email: string;
};

const navItems = [
  { href: "/dashboard", label: "Guud-mar (Overview)", icon: Sparkles, exact: true },
  { href: "/dashboard/books", label: "Buugaagtayda (My Books)", icon: Library },
  { href: "/dashboard/payments", label: "Lacag-bixinada (Payments)", icon: CreditCard },
  { href: "/dashboard/settings", label: "Hagaajinta (Settings)", icon: Settings },
];

export function DashboardSidebar({ username, email }: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex flex-col w-[280px] h-screen fixed top-0 left-0 bg-white border-r border-[#E8DFD2] z-40 overflow-y-auto">
        {/* User Block */}
        <div className="p-6 border-b border-[#E8DFD2]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7A1F2B] to-[#1F3A54] flex items-center justify-center text-white font-display font-bold text-lg shadow-sm">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="font-display font-bold text-[#201B16] truncate">
                {username}
              </h2>
              <p className="text-[11px] text-[#6B5F52] uppercase tracking-wider font-semibold truncate">
                Akhriste
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  isActive
                    ? "bg-[#7A1F2B] text-white shadow-md"
                    : "text-[#6B5F52] hover:bg-[#FBF7F0] hover:text-[#201B16]"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#C9962E]"}`} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#E8DFD2] space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#6B5F52] hover:bg-[#FBF7F0] hover:text-[#201B16] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ku noqo Goobta
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MOBILE TOP BAR ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E8DFD2] z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-1.5 rounded-xl text-[#6B5F52] hover:bg-[#FBF7F0] hover:text-[#7A1F2B] transition-colors"
            title="Ku noqo Goobta"
            aria-label="Ku noqo Goobta"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link href="/" className="font-display font-extrabold text-[#7A1F2B] text-xl">
            IsmailBooks
          </Link>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="p-2 text-[#6B5F52] hover:text-rose-600 transition-colors"
          aria-label="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8DFD2] z-40 pb-safe">
        <nav className="flex items-center justify-around px-2 py-2">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href);
            // Extract the first word for mobile nav (e.g. "Guud-mar")
            const shortLabel = label.split(" ")[0];
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-1 p-2 min-w-[70px] rounded-xl transition-all ${
                  isActive ? "text-[#7A1F2B]" : "text-[#6B5F52]"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-[#7A1F2B]" : ""}`} />
                <span className="text-[10px] font-bold">{shortLabel}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
