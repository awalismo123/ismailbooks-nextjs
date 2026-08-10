"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }
      );

      if (resetError) throw resetError;
      setSent(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0]">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="panel w-full max-w-md">

          <Link href="/login" className="inline-flex items-center gap-2 text-xs text-[#6B5F52] hover:text-[#201B16] mb-6 no-underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>

          {sent ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-[rgba(46,125,91,0.12)] border-2 border-[#2E7D5B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#2E7D5B]" />
              </div>
              <h2 className="font-display text-2xl font-extrabold text-[#201B16] m-0">
                Check Your Email!
              </h2>
              <p className="text-sm text-[#6B5F52]">
                We sent a password reset link to{" "}
                <span className="font-bold text-[#1F3A54]">{email}</span>.
                Click the link in the email to set a new password.
              </p>
              <Link href="/login" className="btn btn-primary btn-block mt-4">
                Back to Login
              </Link>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#7A1F2B] flex items-center justify-center mx-auto mb-4 text-white shadow-sm">
                  <Mail className="w-7 h-7" />
                </div>
                <h1 className="font-display text-2xl font-extrabold text-[#201B16] m-0">
                  Forgot Password?
                </h1>
                <p className="text-sm text-[#6B5F52] mt-2">
                  Enter your email below and we will send you a link to reset your password.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-[rgba(179,38,30,0.08)] border border-[rgba(179,38,30,0.22)] text-[#B3261E] text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="field">
                  <label htmlFor="forgot-email">
                    <Mail className="w-4 h-4 inline mr-1.5 opacity-60" />
                    Your Email
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-primary btn-block ${loading ? "btn-disabled" : ""}`}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Reset Link</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
