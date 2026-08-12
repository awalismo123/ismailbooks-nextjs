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
    <header className="topbar" role="banner">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#7A1F2B] focus:text-white focus:rounded-lg focus:font-bold"
      >
        {t.common?.skipToContent || "Bood content-ka"}
      </a>

      <div className="container-site">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <Link href="/" className="flex items-center gap-3 font-extrabold tracking-tight" aria-label="IsmailBooks - Boga Hore">
            <div className="w-10 h-10 rounded-xl bg-[#7A1F2B] text-white grid place-items-center font-display text-lg font-extrabold" aria-hidden="true">
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

          <nav className="hidden md:flex flex-wrap items-center gap-5" role="navigation" aria-label={t.nav.home}>
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
                  aria-current={isActive ? "page" : undefined}
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
              aria-label={`Switch language to ${lang === "so" ? "English" : "Soomaali"}`}
            >
              <Globe className="w-3.5 h-3.5 text-[#1F3A54]" aria-hidden="true" />
              <span>{lang === "so" ? "SO" : "EN"}</span>
            </button>

            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="btn btn-secondary btn-sm">
                  <LayoutDashboard className="w-3.5 h-3.5" aria-hidden="true" />
                  {t.nav.dashboard}
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="btn btn-ghost btn-sm">
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    Admin
                  </Link>
                )}
                <button 
                  onClick={handleSignOut} 
                  className="btn btn-ghost btn-sm" 
                  type="button"
                  aria-label={t.nav.logout}
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  {t.nav.logout}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost btn-sm">
                  {t.nav.login}
                </Link>
                <Link href="/register" className="btn btn-primary btn-sm">
                  <User className="w-3.5 h-3.5" aria-hidden="true" />
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
              aria-label={`Switch language to ${lang === "so" ? "English" : "Soomaali"}`}
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="chip !min-h-10 !w-10 !p-0 justify-center"
              type="button"
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.menu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden border-t border-[#E8DFD2] bg-white px-4 pt-3 pb-5 space-y-1"
          role="dialog"
          aria-label={t.nav.menu}
        >
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
              aria-current={pathname === item.href ? "page" : undefined}
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
                  <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
                  {t.nav.dashboard}
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-ghost btn-block"
                  >
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    Admin Panel
                  </Link>
                )}
                <button 
                  onClick={handleSignOut} 
                  className="btn btn-error btn-block" 
                  type="button"
                  aria-label={t.nav.logout}
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  {t.nav.logout}
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
