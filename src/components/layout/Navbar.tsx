"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { Globe, User, Menu, X, LayoutDashboard, ShieldCheck, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      setIsLoggedIn(true);
      setIsAdmin((session.user as any).isAdmin === true);
      return;
    }

    const supabase = createClient();

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .maybeSingle();
        setIsAdmin(profile?.is_admin === true);
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", session.user.id)
          .maybeSingle();
        setIsAdmin(profile?.is_admin === true);
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [session]);

  const handleSignOut = async () => {
    try {
      await nextAuthSignOut({ redirect: false });
    } catch {}
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = "/";
  };

  const navItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.books, href: "/books" },
    { label: t.nav.summaries, href: "/summaries" },
    { label: t.nav.blog, href: "/blog" },
  ];

  return (
    <header className="topbar">
      <div className="container-site">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <Link href="/" className="flex items-center gap-3 font-extrabold tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-[#7A1F2B] text-white grid place-items-center font-display text-lg font-extrabold">
              IB
            </div>
            <div>
              <span className="font-display text-xl text-[#201B16]">
                IsmailBooks
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-[#6B5F52] font-semibold">
                Maktabadda Af-Soomaaliga
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex flex-wrap items-center gap-5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold no-underline transition-colors ${
                    isActive
                      ? "text-[#7A1F2B] underline"
                      : "text-[#1F3A54] hover:underline"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "so" ? "en" : "so")}
              className="chip !min-h-10 !py-2 !px-3 text-xs"
              type="button"
            >
              <Globe className="w-3.5 h-3.5 text-[#1F3A54]" />
              <span>{lang === "so" ? "SO" : "EN"}</span>
            </button>

            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="btn btn-secondary btn-sm">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  {t.nav.dashboard}
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="btn btn-ghost btn-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin
                  </Link>
                )}
                <button onClick={handleSignOut} className="btn btn-ghost btn-sm" type="button">
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost btn-sm">
                  {t.nav.login}
                </Link>
                <Link href="/register" className="btn btn-primary btn-sm">
                  <User className="w-3.5 h-3.5" />
                  {t.nav.register}
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "so" ? "en" : "so")}
              className="chip !min-h-10 !py-2 !px-3 text-xs"
              type="button"
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="chip !min-h-10 !w-10 !p-0 justify-center"
              type="button"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DFD2] bg-white px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold no-underline ${
                pathname === item.href
                  ? "bg-[#7A1F2B] text-white"
                  : "text-[#1F3A54] hover:bg-[#F7FAFD]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#E8DFD2] space-y-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-secondary btn-block"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {t.nav.dashboard}
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-ghost btn-block"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin Panel
                  </Link>
                )}
                <button onClick={handleSignOut} className="btn btn-error btn-block" type="button">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-secondary btn-block"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary btn-block"
                >
                  {t.nav.register}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
