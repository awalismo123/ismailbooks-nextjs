"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase embeds the recovery token in the URL hash.
    // The client SDK automatically picks it up and establishes the session.
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    // Also check for errors in the URL
    const params = new URLSearchParams(window.location.search);
    const err = params.get("error_description");
    if (err) setError(decodeURIComponent(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setDone(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FBF7F0]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-16 px-4">
          <div className="panel w-full max-w-md text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-[rgba(46,125,91,0.12)] border-2 border-[#2E7D5B] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#2E7D5B]" />
            </div>
            <h2 className="font-display text-2xl font-extrabold text-[#201B16] m-0">Password Updated!</h2>
            <p className="text-sm text-[#6B5F52]">Your password has been changed. Redirecting to your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0]">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="panel w-full max-w-md">

          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#7A1F2B] flex items-center justify-center mx-auto mb-4 text-white shadow-sm">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-display text-2xl font-extrabold text-[#201B16] m-0">
              Set New Password
            </h1>
            <p className="text-sm text-[#6B5F52] mt-2">
              Enter and confirm your new password below.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-[rgba(179,38,30,0.08)] border border-[rgba(179,38,30,0.22)] text-[#B3261E] text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!ready && !error && (
            <div className="text-center text-sm text-[#6B5F52] mb-4">
              Verifying your reset link...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="field">
              <label htmlFor="reset-password">
                <Lock className="w-4 h-4 inline mr-1.5 opacity-60" />
                New Password
              </label>
              <div className="relative">
                <input
                  id="reset-password"
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

            <div className="field">
              <label htmlFor="reset-confirm">
                <Lock className="w-4 h-4 inline mr-1.5 opacity-60" />
                Confirm Password
              </label>
              <input
                id="reset-confirm"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !ready}
              className={`btn btn-primary btn-block ${(loading || !ready) ? "btn-disabled" : ""}`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </form>

        </div>
      </main>
      <Footer />
    </div>
  );
}
