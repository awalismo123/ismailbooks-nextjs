"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n";
import { BookOpen, LogIn, Mail, Lock, Eye, EyeOff, Globe } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Read URL errors
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const err = params.get("error");
    if (err) setError(decodeURIComponent(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Try NextAuth credentials
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok && !res?.error) {
        const params = new URLSearchParams(window.location.search);
        const redirectTo = params.get("redirectTo") || params.get("redirect") || "/dashboard";
        window.location.href = redirectTo;
        return;
      }

      // 2. Fallback to Supabase Auth
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      const params = new URLSearchParams(window.location.search);
      const redirectTo = params.get("redirectTo") || params.get("redirect") || "/dashboard";
      window.location.href = redirectTo;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Email ama Password-ka waa khaldan yahay.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      // NextAuth Google OAuth — handles everything locally via NEXTAUTH_URL
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google login failed.";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0]">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="panel w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#7A1F2B] flex items-center justify-center mx-auto mb-4 text-white shadow-sm">
              <BookOpen className="w-7 h-7" />
            </div>
            <h1 className="font-display text-3xl font-extrabold text-[#201B16] m-0">
              {t.nav.login}
            </h1>
            <p className="text-sm text-[#6B5F52] mt-2">
              Ku soo dhawoow IsmailBooks. Geli macluumaadkaaga si aad u gasho maktabadaada.
            </p>
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-secondary btn-block mb-5"
          >
            <Globe className="w-4 h-4" />
            <span>Ku gal Google Account-kaaga</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-[#E8DFD2] w-full" />
            <span className="bg-white px-3 text-[11px] uppercase tracking-widest text-[#6B5F52] absolute">
              Ama Email &amp; Password
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-[rgba(179,38,30,0.08)] border border-[rgba(179,38,30,0.22)] text-[#B3261E] text-xs font-bold">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="field">
              <label htmlFor="login-email">
                <Mail className="w-4 h-4 inline mr-1.5 opacity-60" />
                Emailkaaga
              </label>
              <input
                id="login-email"
                type="email"
                required
                placeholder="magacaa@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="login-password" className="!mb-0">
                  <Lock className="w-4 h-4 inline mr-1.5 opacity-60" />
                  Password-ka
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-[#1F3A54] hover:underline no-underline"
                >
                  La illoobay?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B5F52] hover:text-[#201B16]"
                  aria-label="Show/hide password"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className={`btn btn-primary btn-block ${loading ? "btn-disabled" : ""}`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{t.nav.login}</span>
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#6B5F52]">
            Aakaunti ma lehid?{" "}
            <Link href="/register" className="text-[#1F3A54] font-bold hover:underline">
              {t.nav.register}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
