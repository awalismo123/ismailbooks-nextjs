"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  CreditCard,
  ArrowLeft,
  MessageCircle,
  BookOpen,
  Copy,
  Check,
  CheckCircle2,
  ShieldCheck,
  User,
  ImagePlus,
  Trash2,
  RefreshCw,
  Clock,
  Lock,
  Star,
} from "lucide-react";
import { submitPaymentAction } from "@/app/actions/payment";
import { createClient } from "@/lib/supabase/client";

const PAYMENT_NUMBER = "0636 475 579";
const PAYMENT_NUMBER_RAW = "0636475579";

const paymentMethods = [
  { id: "EVC", label: "EVC Plus", ussd: "*888#", dot: "#2E7D5B", desc: "Hormuud Telecom" },
  { id: "ZAAD", label: "Zaad Service", ussd: "*800#", dot: "#1F3A54", desc: "Telesom" },
  { id: "E-Dahab", label: "eDahab", ussd: "*600#", dot: "#C9962E", desc: "Dahabshiil" },
  { id: "Sahal", label: "Sahal", ussd: "*808#", dot: "#7A1F2B", desc: "Amal Bank" },
];

export default function PaymentFormClient({
  bookId,
  bookTitle,
  bookPrice,
}: {
  bookId: string;
  bookTitle: string;
  bookPrice: string;
}) {
  const [method, setMethod] = useState("EVC");
  const [ref, setRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [receiptError, setReceiptError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReceipt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setReceiptError("Fadlan dooro fayl sawir ah (JPG ama PNG).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setReceiptError("Sawirku waa inuu ka yar yahay 5MB.");
      return;
    }
    setReceiptError("");
    setReceipt(file);
    setPreviewUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(file);
    });
  };

  const removeReceipt = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setReceipt(null);
    setPreviewUrl("");
    setReceiptError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
  }, []);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT_NUMBER_RAW);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const refDone = ref.trim().length >= 4;
  const step2Done = refDone && !!receipt;
  const completionPct = step2Done ? 100 : refDone ? 66 : method !== "EVC" ? 33 : 16;
  const steps = [
    { num: 1, label: "Dooro Habka", state: "done" as const },
    { num: 2, label: "Dir & Reference", state: step2Done ? ("done" as const) : ("current" as const) },
    { num: 3, label: "Xaqiijinta", state: step2Done ? ("current" as const) : ("upcoming" as const) },
  ];

  const circleClass = (state: "done" | "current" | "upcoming") =>
    state === "done"
      ? "bg-[#2E7D5B] text-white"
      : state === "current"
        ? "bg-[#1F3A54] text-white ring-4 ring-[rgba(31,58,84,0.15)]"
        : "bg-white border-2 border-[#E8DFD2] text-[#6B5F52]";

  return (
    <div className="container-site">
      {/* Back link */}
      <Link
        href={`/books/${bookId}`}
        className="inline-flex items-center gap-2 text-xs text-[#6B5F52] no-underline transition-colors hover:text-[#201B16] mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Ku laabo Faahfaahinta Buugga
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#201B16] m-0">
          Dhammaystir Bixinta
        </h1>
        <p className="text-sm text-[#6B5F52] mt-2 m-0">
          Raac tallaabooyinkan si aad u hesho buuggaaga 24 saacadood gudahood.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-[#6B5F52] uppercase tracking-wider">Horumarka</span>
          <span className="text-[10px] font-extrabold text-[#1F3A54]">{completionPct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#E8DFD2] overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-[#1F3A54] to-[#2E7D5B] transition-all duration-700" style={{ width: `${completionPct}%` }} />
        </div>
      </div>

      {/* ── Step indicator ── */}
      <div className="mb-8 flex items-start mt-5">
        {steps.map((s, i) => (
          <React.Fragment key={s.num}>
            {i > 0 && (
              <div
                className={`mt-[15px] h-0.5 flex-1 rounded ${
                  s.state !== "upcoming" ? "bg-[#2E7D5B]" : "bg-[#E8DFD2]"
                }`}
              />
            )}
            <div className="flex flex-col items-center gap-1.5 px-1 sm:px-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold transition-all ${circleClass(s.state)}`}
              >
                {s.state === "done" ? <Check className="h-4 w-4" /> : s.num}
              </span>
              <span
                className={`whitespace-nowrap text-[10px] sm:text-xs font-bold ${
                  s.state === "upcoming" ? "text-[#6B5F52]" : "text-[#201B16]"
                }`}
              >
                {s.label}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* ── Login nudge ── */}
      {isLoggedIn === false && (
        <div className="note-box mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <User className="w-4 h-4 text-[#1F3A54] mt-0.5 shrink-0" />
            <p className="m-0 text-sm">
              <span className="font-extrabold">Fadlan gal account-kaaga</span> si
              buugga loogu xiro magacaaga kadib ansixinta.
            </p>
          </div>
          <Link href="/login" className="btn btn-secondary btn-sm shrink-0">
            Gal Account
          </Link>
        </div>
      )}

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        {/* ════════ LEFT: form ════════ */}
        <form
          id="payment-form"
                    action={(formData) => {
            const file = formData.get("receipt") as File | null;
            if (!file || file.size === 0) {
              setReceiptError("Fadlan ku lifaaq sawirka xaqiijinta lacag-bixinta.");
              document
                .getElementById("receipt-upload")
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
              return;
            }
            setReceiptError("");
            setLoading(true);
            formData.append("bookId", bookId);
            formData.append("method", method);
            submitPaymentAction(formData).finally(() => setLoading(false));
          }}
          className="space-y-6"
        >
          {/* Step 1 — payment method */}
          <div className="rounded-2xl border border-[#E8DFD2] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-full bg-[#1F3A54] text-white text-xs font-extrabold grid place-items-center shrink-0">1</span>
              <h2 className="font-display text-lg font-bold text-[#201B16] m-0">Dooro Habka Lacagta</h2>
            </div>
            <p className="text-xs text-[#6B5F52] m-0 mb-4 pl-8">Dooro adeegga aad isticmaali doonto si aad lacagta u dirto.</p>

            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  aria-pressed={method === m.id}
                  className={`relative flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                    method === m.id
                      ? "border-[#1F3A54] bg-[#F7FAFD] shadow-sm"
                      : "border-[#E8DFD2] bg-white hover:border-[#1F3A54]/40"
                  }`}
                >
                  {method === m.id && (
                    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#1F3A54]">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: m.dot }} />
                    <span className="text-sm font-extrabold text-[#201B16]">{m.label}</span>
                  </span>
                  <span className="font-mono text-xs text-[#6B5F52]">{m.ussd}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 — send money + reference */}
          <div className="rounded-2xl border border-[#E8DFD2] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-full bg-[#1F3A54] text-white text-xs font-extrabold grid place-items-center shrink-0">2</span>
              <h2 className="font-display text-lg font-bold text-[#201B16] m-0">Dir Lacagta &amp; Geli Reference-ka</h2>
            </div>
            <p className="text-xs text-[#6B5F52] m-0 mb-4 pl-8">
              Lacagta u dir nambarka hoose, kadibna geli reference number-ka aad heshay.
            </p>

            {/* Payment number — copyable */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[#E8DFD2] bg-[#FBF7F0] p-4 mb-5">
              <div>
                <p className="text-xs text-[#6B5F52] m-0 mb-1">
                  Lacagta u dir nambarka:
                </p>
                <p className="font-mono text-2xl font-extrabold tracking-tight text-[#1F3A54] m-0">
                  {PAYMENT_NUMBER}
                </p>
                <p className="text-xs text-[#6B5F52] m-0 mt-1">
                  Faafiye: Ismail Abdi Ismail
                </p>
              </div>
              <button
                type="button"
                onClick={copyNumber}
                className={`btn btn-sm shrink-0 ${
                  copied ? "btn-success" : "btn-secondary"
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "La koobiyeeyay!" : "Koobi Lambarka"}
              </button>
            </div>

            {/* Reference input */}
            <div className="field !m-0">
              <label htmlFor="refNumber">Transaction ID / Reference</label>
              <input
                id="refNumber"
                name="refNumber"
                type="text"
                required
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                placeholder="Tusaale: EVC123456 ama ZAAD-884920"
                autoComplete="off"
              />
                           <div className="helper">
                {refDone ? (
                  <span className="text-[#2E7D5B] font-bold">
                    ✓ Reference-ka waa diyaar.
                  </span>
                ) : (
                  "Waxaad ku heleysaa reference-ka farriinta xaqiijinta ee kuu timid."
                )}
              </div>
            </div>

            {/* ── Screenshot upload ── */}
            <div id="receipt-upload" className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <label className="m-0 text-sm font-extrabold text-[#201B16]">
                  Sawirka Xaqiijinta <span className="text-[#7A1F2B]">*</span>
                </label>
                <span className="rounded-full bg-[rgba(122,31,43,0.08)] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#7A1F2B]">
                  Lagama maarmaan
                </span>
              </div>

              <input
                ref={fileInputRef}
                id="receipt"
                name="receipt"
                type="file"
                accept="image/*"
                onChange={handleReceipt}
                className="hidden"
              />

              {!receipt ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-all ${
                    receiptError
                      ? "border-[#B3261E] bg-[rgba(179,38,30,0.04)]"
                      : "border-[#E8DFD2] bg-[#FBF7F0]/60 hover:border-[#1F3A54]/50 hover:bg-[#F7FAFD]"
                  }`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8DFD2] bg-white shadow-sm">
                    <ImagePlus className="h-5 w-5 text-[#1F3A54]" />
                  </span>
                  <span className="text-sm font-extrabold text-[#201B16]">
                    Ku lifaaq sawirka xaqiijinta
                  </span>
                  <span className="text-xs text-[#6B5F52]">
                    Screenshot-ka farriinta lacag-bixinta • JPG/PNG • ugu badnaan 5MB
                  </span>
                </button>
              ) : (
                <div className="flex items-center gap-4 rounded-xl border border-[#E8DFD2] bg-[#FBF7F0]/60 p-3">
                  <img
                    src={previewUrl}
                    alt="Xaqiijinta lacag-bixinta"
                    className="h-16 w-16 shrink-0 rounded-lg border border-[#E8DFD2] object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="m-0 truncate text-sm font-bold text-[#201B16]">
                      {receipt.name}
                    </p>
                    <p className="m-0 mt-0.5 flex items-center gap-1 text-xs font-semibold text-[#2E7D5B]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {(receipt.size / 1024 / 1024).toFixed(2)} MB • Diyaar
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn btn-sm btn-secondary !px-3"
                      title="Beddel sawirka"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={removeReceipt}
                      className="btn btn-sm !px-3 border border-[rgba(179,38,30,0.25)] bg-[rgba(179,38,30,0.06)] text-[#B3261E]"
                      title="Tirtir sawirka"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {receiptError ? (
                <p className="m-0 mt-2 text-xs font-bold text-[#B3261E]">
                  {receiptError}
                </p>
              ) : (
                <p className="m-0 mt-2 text-xs text-[#6B5F52]">
                  Ka soo qaado screenshot farriinta xaqiijinta ee kaaga timid
                  EVC / Zaad / eDahab, kadibna halkan ku lifaaq.
                </p>
              )}
            </div>
          </div>

          {/* Submit (always visible) */}
          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary btn-block ${
              loading ? "opacity-70 pointer-events-none" : ""
            }`}
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Dir Codsiga Lacag-bixinta
              </>
            )}
          </button>

          {/* Trust footer line */}
          <div className="rounded-xl border border-[#E8DFD2] bg-[#FCFAF6] p-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B5F52]">
              <span className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#2E7D5B]" /> Amniga 100% la hubiyay
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <Lock className="w-4 h-4 text-[#1F3A54]" /> Macluumaadkaaga waa ammaan
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <Clock className="w-4 h-4 text-[#C9962E]" /> Xaqiijin 24 saacadood gudahood
              </span>
            </div>
          </div>
        </form>

        {/* ════════ RIGHT: sticky order summary ════════ */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
          {/* Order summary */}
          <div className="rounded-2xl border-2 border-[#1F3A54]/20 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[rgba(122,31,43,0.08)] flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-[#7A1F2B]" />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#6B5F52] m-0">
                Codsigaaga La Bixinayo
              </p>
            </div>
            <h3 className="font-display m-0 text-base font-extrabold leading-snug text-[#201B16] mb-1 line-clamp-2">
              {bookTitle}
            </h3>
            <p className="m-0 text-[11px] text-[#6B5F52] mb-4">Buug dhijitaal ah · Af-Soomaali</p>

            <div className="bg-[#FBF7F0] rounded-xl p-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B5F52]">Wadarta</span>
                <span className="font-display text-2xl font-extrabold text-[#1F3A54]">{bookPrice}</span>
              </div>
            </div>

            <ul className="space-y-2">
              {[
                "Akhris buuxa oo online ah",
                "Mobile iyo desktop",
                "Ansixin 24 saacadood gudahood",
                "Access joogto ah",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-[#6B5F52]">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#2E7D5B]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Urgency Note */}
          <div className="rounded-xl border border-[#C9962E]/30 bg-[#FEF3C7] p-4">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#C9962E] mt-0.5 shrink-0" />
              <div>
                <p className="m-0 text-xs font-extrabold text-[#8A5A00]">Xaqiijintu waxay qaadataa 24 saacadood</p>
                <p className="m-0 text-xs text-[#8A5A00] mt-0.5">Kadib ansixinta adiga oo si buuxa u akhrisan karta buugga.</p>
              </div>
            </div>
          </div>

          {/* WhatsApp help */}
          <a
            href="https://wa.me/252636475579?text=Waxaan%20bixi%20rabaa%20lacagta%20buugga"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-block"
          >
            <MessageCircle className="w-4 h-4" />
            Caawimo? WhatsApp: +252 63 6475579
          </a>
        </div>
      </div>

      {/* spacer so sticky bar doesn't cover content on mobile */}
      <div className="h-24 lg:hidden" />

      {/* ── Sticky mobile submit bar ── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E8DFD2] bg-white/95 p-3 backdrop-blur-md lg:hidden">
        <div className="container-site flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] font-semibold text-[#6B5F52]">
              Wadarta
            </span>
            <span className="font-display text-lg font-extrabold text-[#1F3A54]">
              {bookPrice}
            </span>
          </div>
          <button
            type="submit"
            form="payment-form"
            disabled={loading}
            className={`btn btn-primary flex-1 ${
              loading ? "opacity-70 pointer-events-none" : ""
            }`}
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                Dir Codsiga
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}