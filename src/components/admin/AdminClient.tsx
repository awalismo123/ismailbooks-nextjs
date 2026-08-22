"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { buildReturnTarget } from "@/lib/navigation";
import {
  ShieldCheck, Users, BookOpen, CreditCard, FileText, Check, X, Eye,
  TrendingUp, LayoutDashboard, LogOut, ExternalLink, Activity, Wallet,
  Image as ImageIcon, Ban, CheckCircle2, Library, Plus, Pencil, Trash2,
  BookMarked, Sparkles, Search, Copy, Tag, Key, Lock, ArrowLeft, List
} from "lucide-react";
import { approvePaymentAction, rejectPaymentAction } from "@/app/actions/payment";
import {
  setUserStatusAction, setBookActiveAction, deleteBookAction,
  toggleBlogPostStatusAction, deleteBlogPostAction,
  saveSummaryAction, deleteSummaryAction, saveBlogCategoryAction, deleteBlogCategoryAction,
  adminResetUserPasswordAction
} from "@/app/actions/admin";
import { createClient } from "@/lib/supabase/client";
import BookFormModal from "./BookFormModal";
import BlogPostFormModal from "./BlogPostFormModal";
import BlogCategoryModal from "./BlogCategoryModal";
import SummaryFormModal, { type EditableSummary } from "./SummaryFormModal";
import TocReviewModal from "./TocReviewModal";

type Payment = {
  id: number; user: string; book: string; method: string; ref: string;
  amount: string; date: string; status: "pending" | "approved" | "rejected";
  receiptUrl: string | null; adminNotes: string | null;
};
type Book = {
  id: number | string; title: string; author: string; is_paid: boolean; price: string;
  priceRaw: number; views: number; downloads: number; is_active: boolean;
  category: string | null; description: string | null; pages: number; coverUrl: string | null;
  file_link: string;
};
type UserData = {
  id: string;
  name: string;
  email: string | null;
  status: string;
  date: string;
  booksOwned: number;
  ownedBookTitles?: string[];
  paymentsCount?: number;
};
type Reading = { user: string; book: string; status: string };
type BlogPost = {
  id: number; title: string; slug: string; status: string; view_count: number; date: string;
  category: string; category_id: number | null; excerpt: string | null; content: string;
  featured_image: string | null; meta_title: string | null; meta_description: string | null;
};
type Summary = {
  id: number; title: string; book_title: string | null; book_author: string | null;
  is_paid: boolean; price: string; views: number; date: string; description: string | null;
  content_html: string; cover_image: string | null; summary_creator: string | null;
  pages: number | null;
  category: string | null;
  reading_time_minutes: number | null;
  is_published: boolean;
};
type BlogCategory = { id: number; name: string; slug: string };
type Stats = {
  totalRevenue: string; monthlyRevenue: string; pendingValue: string;
  pendingCount: number; approvedCount: number; rejectedCount: number;
  readersCount: number; activeReadersCount: number; booksCount: number; blogCount: number;
  summariesCount: number;
};
type AdminData = {
  payments: Payment[]; books: Book[]; users: UserData[];
  activity: Reading[]; blogPosts: BlogPost[]; summaries: Summary[];
  blogCategories: BlogCategory[]; stats: Stats;
};
type Tab = "overview" | "payments" | "books" | "summaries" | "readers" | "blog";

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-3.5 text-left text-[11px] text-[#6B5F52] uppercase tracking-[0.08em] bg-[#FCFAF6] border-b border-[#E8DFD2] whitespace-nowrap">
    {children}
  </th>
);
const Td = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: (e: React.MouseEvent) => void }) => (
  <td className={`px-3 py-3.5 ${className}`} onClick={onClick}>{children}</td>
);

const statusBadge = (status: string) => {
  if (status === "approved") return <span className="badge badge-success">Approved ✓</span>;
  if (status === "rejected") return <span className="badge badge-error">Rejected</span>;
  if (status === "pending") return <span className="badge badge-pending">Pending</span>;
  return <span className="badge badge-navy">{status}</span>;
};

// ── Payment Detail Modal ───────────────────────────────────────────────────
function PaymentDetailModal({
  payment,
  onClose,
  onApprove,
  onReject,
  loading,
}: {
  payment: Payment;
  onClose: () => void;
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number, notes?: string) => Promise<void>;
  loading: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [adminNotes, setAdminNotes] = useState(payment.adminNotes || "");

  const handleCopyRef = () => {
    navigator.clipboard.writeText(payment.ref);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmReject = async () => {
    await onReject(payment.id, adminNotes);
    onClose();
  };

  const handleConfirmApprove = async () => {
    await onApprove(payment.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden border border-[#E8DFD2] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DFD2] bg-[#FCFAF6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1F3A54] text-white flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-extrabold text-[#201B16] m-0">
                Faahfaahinta Lacag-Bixinta #{payment.id}
              </h2>
              <p className="text-xs text-[#6B5F52] m-0">
                Taariikhda: {payment.date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {statusBadge(payment.status)}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6B5F52] hover:bg-[#F7F1E5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Info Details */}
          <div className="space-y-4">
            <div className="surface-card !p-4 !bg-[#FBF7F0]/60 space-y-3">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#6B5F52]">
                  Akhristaha / User Account
                </span>
                <p className="text-sm font-extrabold text-[#201B16] m-0 flex items-center gap-1.5 mt-0.5">
                  <Users className="w-4 h-4 text-[#1F3A54]" /> {payment.user}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E8DFD2]/60">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#6B5F52]">
                  Buugga La Bixiyay
                </span>
                <p className="text-sm font-extrabold text-[#7A1F2B] m-0 flex items-center gap-1.5 mt-0.5">
                  <BookOpen className="w-4 h-4 text-[#7A1F2B]" /> {payment.book}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E8DFD2]/60 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#6B5F52]">
                    Wadarta Lacagta
                  </span>
                  <p className="text-base font-extrabold text-[#1F3A54] m-0 mt-0.5">
                    {payment.amount}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#6B5F52]">
                    Habka Lacagta
                  </span>
                  <p className="text-xs font-bold text-[#201B16] m-0 mt-0.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1F3A54]/10 text-[#1F3A54]">
                      {payment.method}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Reference Card with Copy */}
            <div className="surface-card !p-4 !bg-white border-2 border-[#1F3A54]/15">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#6B5F52]">
                Transaction ID / Reference
              </span>
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="font-mono text-base font-extrabold text-[#8A5A00] tracking-wide">
                  {payment.ref}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className={`btn btn-xs ${copied ? "btn-success" : "btn-secondary"}`}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Koobiyay" : "Koobi"}
                </button>
              </div>
            </div>

            {/* Admin Notes Section */}
            {rejecting ? (
              <div className="space-y-2 p-3 bg-red-50 rounded-xl border border-red-200">
                <label className="text-xs font-bold text-red-800 block">
                  Sababta loo diiday (Nootada Admin-ka):
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Tusaale: Sawirka rasiidka ma cadda ama reference nambarku waa khaldan yahay..."
                  className="w-full text-xs p-2.5 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                />
              </div>
            ) : payment.adminNotes ? (
              <div className="p-3 bg-[#FCFAF6] rounded-xl border border-[#E8DFD2]">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#6B5F52] block mb-1">
                  Nootada Admin-ka
                </span>
                <p className="text-xs text-[#201B16] m-0 italic">"{payment.adminNotes}"</p>
              </div>
            ) : null}
          </div>

          {/* Right: Receipt Image Preview */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#6B5F52] mb-2 block">
              Sawirka Rasiidka (Receipt Proof)
            </span>
            {payment.receiptUrl ? (
              <div className="relative flex-1 min-h-[220px] rounded-xl overflow-hidden border border-[#E8DFD2] bg-black/5 group">
                <img
                  src={payment.receiptUrl}
                  alt="Receipt Screenshot"
                  className="w-full h-full object-contain max-h-[300px]"
                />
                <a
                  href={payment.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 btn btn-xs btn-primary shadow-lg"
                >
                  <Eye className="w-3 h-3" /> Eeg Sawirka Buuxa
                </a>
              </div>
            ) : (
              <div className="flex-1 min-h-[200px] rounded-xl border-2 border-dashed border-[#E8DFD2] flex flex-col items-center justify-center p-6 text-center text-[#6B5F52]">
                <ImageIcon className="w-10 h-10 mb-2 opacity-40" />
                <p className="text-xs font-bold m-0">Sawir rasiid ah ma lifaaqna</p>
                <p className="text-[10px] opacity-70 mt-1 m-0">
                  User-ku ma soo gelin sawirka xaqiijinta.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-[#E8DFD2] bg-[#FCFAF6]">
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            Xir
          </button>
          <div className="flex items-center gap-2">
            {rejecting ? (
              <>
                <button
                  onClick={() => setRejecting(false)}
                  className="btn btn-ghost btn-sm"
                >
                  Ka noqo
                </button>
                <button
                  disabled={loading}
                  onClick={handleConfirmReject}
                  className="btn btn-error btn-sm"
                >
                  {loading ? "Waa la socda..." : "Xaqiiji Diidmada"}
                </button>
              </>
            ) : payment.status === "pending" ? (
              <>
                <button
                  disabled={loading}
                  onClick={() => setRejecting(true)}
                  className="btn btn-error btn-sm"
                >
                  <X className="w-3.5 h-3.5" /> Diid Lacagta
                </button>
                <button
                  disabled={loading}
                  onClick={handleConfirmApprove}
                  className="btn btn-success btn-sm"
                >
                  <Check className="w-3.5 h-3.5" /> Fasax Lacagta ✓
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                {payment.status === "approved" ? (
                  <button
                    disabled={loading}
                    onClick={() => setRejecting(true)}
                    className="btn btn-ghost btn-sm text-red-600 hover:bg-red-50"
                  >
                    Ka dhig Diiddan
                  </button>
                ) : (
                  <button
                    disabled={loading}
                    onClick={handleConfirmApprove}
                    className="btn btn-success btn-sm"
                  >
                    <Check className="w-3.5 h-3.5" /> Fasax Lacagta
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// ── User Detail Modal ──────────────────────────────────────────────────────
function UserDetailModal({
  user,
  onClose,
  onToggleStatus,
  onViewPayments,
  loadingKey,
}: {
  user: UserData;
  onClose: () => void;
  onToggleStatus: (id: string, current: string) => Promise<void>;
  onViewPayments: (name: string) => void;
  loadingKey: string | null;
}) {
  const isUpdating = loadingKey === `user-${user.id}`;
  const [showResetPass, setShowResetPass] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [resetting, setResetting] = useState(false);
  const [resetMsg, setResetMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleResetPassword = async () => {
    if (!newPass.trim()) return;
    setResetting(true);
    setResetMsg(null);
    const fd = new FormData();
    fd.append("userId", user.id);
    fd.append("newPassword", newPass);

    const res = await adminResetUserPasswordAction(fd);
    setResetting(false);

    if (res?.error) {
      setResetMsg({ type: "error", text: res.error });
    } else {
      setResetMsg({ type: "success", text: `Paswoord-ka cusub: "${newPass}" waa loo keydiyay!` });
      setNewPass("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl my-8 overflow-hidden border border-[#E8DFD2] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DFD2] bg-[#FCFAF6]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#7A1F2B] text-white flex items-center justify-center font-display font-extrabold text-lg shadow-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-display text-lg font-extrabold text-[#201B16] m-0">
                {user.name}
              </h2>
              {user.email && (
                <p className="text-xs text-[#6B5F52] m-0">{user.email}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`badge ${user.status === "active" ? "badge-success" : "badge-error"}`}>
              {user.status === "active" ? "Active ✓" : "Suspended"}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6B5F52] hover:bg-[#F7F1E5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* User Metrics Summary */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="surface-card !p-3 !bg-[#FBF7F0]/60">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#6B5F52] block">
                Buugaagta Haysta
              </span>
              <span className="font-display text-2xl font-extrabold text-[#1F3A54] block mt-0.5">
                {user.booksOwned}
              </span>
            </div>
            <div className="surface-card !p-3 !bg-[#FBF7F0]/60">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#6B5F52] block">
                Lacag-bixinada
              </span>
              <span className="font-display text-2xl font-extrabold text-[#C9962E] block mt-0.5">
                {user.paymentsCount ?? 0}
              </span>
            </div>
            <div className="surface-card !p-3 !bg-[#FBF7F0]/60">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#6B5F52] block">
                Diiwaangalinta
              </span>
              <span className="text-xs font-extrabold text-[#201B16] block mt-2">
                {user.date}
              </span>
            </div>
          </div>

          {/* User ID Box */}
          <div className="p-3 bg-[#FCFAF6] rounded-xl border border-[#E8DFD2] flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6B5F52]">User Auth ID:</span>
            <span className="font-mono text-xs text-[#201B16] font-semibold">{user.id}</span>
          </div>

          {/* Admin Reset Password Box */}
          <div className="p-3.5 bg-[#FCFAF6] rounded-xl border border-[#E8DFD2] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#201B16] flex items-center gap-1.5">
                <Key className="w-4 h-4 text-[#C9962E]" /> Reset Password (Admin)
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowResetPass(!showResetPass);
                  setResetMsg(null);
                }}
                className="text-xs font-bold text-[#7A1F2B] hover:underline"
              >
                {showResetPass ? "Xir" : "Beddel Password-ka"}
              </button>
            </div>

            {showResetPass && (
              <div className="pt-2.5 space-y-2.5 border-t border-[#E8DFD2]">
                <p className="text-xs text-[#6B5F52] m-0">
                  Geli paswoord cusub si aad ugu tijaabiso akoonkan dashboard-ka:
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Tusaale: Test123456!"
                    className="flex-1 px-3 py-2 text-xs font-mono rounded-xl border border-[#E8DFD2] focus:outline-none focus:border-[#7A1F2B] bg-white"
                  />
                  <button
                    type="button"
                    disabled={resetting || !newPass.trim()}
                    onClick={handleResetPassword}
                    className="px-4 py-2 rounded-xl bg-[#7A1F2B] hover:bg-[#601822] text-white text-xs font-bold shrink-0 disabled:opacity-50 transition-colors"
                  >
                    {resetting ? "Waa la beddelayaa..." : "Set Password"}
                  </button>
                </div>
                {resetMsg && (
                  <div
                    className={`p-2.5 rounded-xl text-xs font-bold border ${
                      resetMsg.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-rose-50 text-rose-800 border-rose-200"
                    }`}
                  >
                    {resetMsg.text}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Owned Books Section */}
          <div>
            <span className="text-xs font-extrabold text-[#201B16] uppercase tracking-wider block mb-2">
              Buugaagta uu Leeyahay ({user.booksOwned})
            </span>
            {user.ownedBookTitles && user.ownedBookTitles.length > 0 ? (
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border border-[#E8DFD2] rounded-xl bg-[#FBF7F0]/30">
                {user.ownedBookTitles.map((title, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-white border border-[#E8DFD2] text-[#1F3A54] shadow-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#7A1F2B]" />
                    {title}
                  </span>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-[#E8DFD2] text-center text-xs text-[#6B5F52]">
                Isticmaalahan wali wax buug ah ma iibsan ama ma helin.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-[#E8DFD2] bg-[#FCFAF6]">
          <button
            onClick={() => {
              onClose();
              onViewPayments(user.name);
            }}
            className="btn btn-secondary btn-sm"
          >
            <CreditCard className="w-4 h-4" /> Eeg Lacag-bixinadiisa
          </button>

          <div className="flex items-center gap-2">
            <button onClick={onClose} className="btn btn-ghost btn-sm">
              Xir
            </button>
            <button
              disabled={isUpdating}
              onClick={() => onToggleStatus(user.id, user.status)}
              className={`btn btn-sm ${user.status === "active" ? "btn-error" : "btn-success"}`}
            >
              {isUpdating ? (
                "Waa la socda..."
              ) : user.status === "active" ? (
                <>
                  <Ban className="w-3.5 h-3.5" /> Hakad Geli Account-ka
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" /> Fasax Account-ka
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main AdminClient ────────────────────────────────────────────────────────
export default function AdminClient({ data }: { data: AdminData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams?.get("tab") as Tab) || "overview";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  React.useEffect(() => {
    const tabParam = searchParams?.get("tab") as Tab | null;
    if (tabParam && ["overview", "payments", "books", "summaries", "readers", "blog"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);
  const [loadingPaymentId, setLoadingPaymentId] = useState<number | null>(null);
  const [actionKey, setActionKey] = useState<string | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [paymentDetailModal, setPaymentDetailModal] = useState<Payment | null>(null);
  const [paymentFilter, setPaymentFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [paymentSearch, setPaymentSearch] = useState("");
  const [bookModal, setBookModal] = useState<{ open: boolean; book: Book | null }>({ open: false, book: null });
  const [tocModal, setTocModal] = useState<{ open: boolean; bookId: string; bookTitle: string } | null>(null);
  const [blogModal, setBlogModal] = useState<{ open: boolean; post: BlogPost | null }>({ open: false, post: null });
  const [summaryModal, setSummaryModal] = useState<{ open: boolean; summary: EditableSummary | null }>({ open: false, summary: null });
  const [userDetailModal, setUserDetailModal] = useState<UserData | null>(null);
  const [userSearch, setUserSearch] = useState("");
  const [userFilter, setUserFilter] = useState<"all" | "has_books" | "no_books" | "active" | "suspended">("all");
  const [blogFilter, setBlogFilter] = useState<"all" | "published" | "draft">("all");
  const [blogSearch, setBlogSearch] = useState("");
  const [blogCategoryModalOpen, setBlogCategoryModalOpen] = useState(false);
  const [bookSearch, setBookSearch] = useState("");
  const [bookFilter, setBookFilter] = useState<"all" | "live" | "hidden" | "premium" | "free" | "no_file">("all");
  const [summarySearch, setSummarySearch] = useState("");
  const [summaryFilter, setSummaryFilter] = useState<"all" | "free" | "premium">("all");

  const { stats } = data;

  const handleSignOut = async () => {
    try { await nextAuthSignOut({ redirect: false }); } catch {}
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleApprove = async (id: number) => {
    setLoadingPaymentId(id);
    const fd = new FormData(); fd.append("paymentId", String(id));
    await approvePaymentAction(fd);
    setLoadingPaymentId(null);
    router.refresh();
  };
  const handleReject = async (id: number, notes?: string) => {
    setLoadingPaymentId(id);
    const fd = new FormData(); fd.append("paymentId", String(id));
    if (notes) fd.append("adminNotes", notes);
    await rejectPaymentAction(fd);
    setLoadingPaymentId(null);
    router.refresh();
  };
  const handleUserStatus = async (id: string, current: string) => {
    const key = `user-${id}`; setActionKey(key);
    const fd = new FormData(); fd.append("userId", id);
    fd.append("newStatus", current === "active" ? "suspended" : "active");
    await setUserStatusAction(fd); setActionKey(null);
  };
  const handleBookActive = async (id: number | string, current: boolean) => {
    const key = `book-${id}`; setActionKey(key);
    const fd = new FormData(); fd.append("bookId", String(id));
    fd.append("isActive", String(!current));
    await setBookActiveAction(fd); setActionKey(null);
    router.refresh();
  };
  const handleDeleteBook = async (id: number | string, title: string) => {
    if (!window.confirm(`"${title}" buuggan tirtiraysaa? Tani waa joogto daro.`)) return;
    const fd = new FormData(); fd.append("bookId", String(id));
    await deleteBookAction(fd);
    router.refresh();
  };
  const handleToggleBlog = async (id: number, status: string) => {
    const key = `blog-${id}`; setActionKey(key);
    const fd = new FormData(); fd.append("postId", String(id));
    fd.append("currentStatus", status);
    await toggleBlogPostStatusAction(fd); setActionKey(null);
    router.refresh();
  };
  const handleDeleteBlog = async (id: number) => {
    if (!window.confirm("Qoraalkan blog-ga ka tirtiraysaa?")) return;
    const fd = new FormData(); fd.append("postId", String(id));
    await deleteBlogPostAction(fd);
    router.refresh();
  };
  const handleDeleteSummary = async (id: number) => {
    if (!window.confirm("Soo-koobkan tirtiraysaa?")) return;
    const fd = new FormData(); fd.append("summaryId", String(id));
    await deleteSummaryAction(fd);
    router.refresh();
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "overview", label: "Guud-mar", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "payments", label: "Lacag-bixinada", icon: <CreditCard className="w-4 h-4" />, badge: stats.pendingCount },
    { id: "books", label: "Buugaagta", icon: <BookOpen className="w-4 h-4" /> },
    { id: "summaries", label: "Soo-koobida", icon: <BookMarked className="w-4 h-4" /> },
    { id: "readers", label: "Akhristayaasha", icon: <Users className="w-4 h-4" /> },
    { id: "blog", label: "Blog-ga", icon: <FileText className="w-4 h-4" /> },
  ];

  const filteredPayments = data.payments
    .filter(p => paymentFilter === "all" || p.status === paymentFilter)
    .filter(p => {
      if (!paymentSearch.trim()) return true;
      const q = paymentSearch.toLowerCase();
      return p.user.toLowerCase().includes(q) || p.book.toLowerCase().includes(q) || p.ref.toLowerCase().includes(q) || p.method.toLowerCase().includes(q);
    });
  const filteredBlog = blogFilter === "all" ? data.blogPosts : data.blogPosts.filter(p => p.status === blogFilter);
  const filteredSummaries = data.summaries
    .filter(s => summaryFilter === "all" || (summaryFilter === "premium" ? s.is_paid : !s.is_paid))
    .filter(s => {
      if (!summarySearch.trim()) return true;
      const q = summarySearch.toLowerCase();
      return s.title.toLowerCase().includes(q) || (s.book_title || "").toLowerCase().includes(q) || (s.book_author || "").toLowerCase().includes(q);
    });
  const topBooks = [...data.books].sort((a, b) => b.views - a.views).slice(0, 6);
  const maxViews = Math.max(...topBooks.map(b => b.views), 1);
  const recentPayments = [...data.payments].sort((a, b) => b.id - a.id).slice(0, 5);

  const NavItem = ({ tab }: { tab: (typeof tabs)[number] }) => (
    <button onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? "bg-[#7A1F2B] text-white shadow" : "text-[#B7AC9D] hover:bg-white/5 hover:text-white"}`}>
      {tab.icon}<span className="flex-1 text-left">{tab.label}</span>
      {tab.badge ? <span className="min-w-[20px] h-5 px-1 rounded-full bg-[#C9962E] text-[#201B16] text-[10px] font-extrabold flex items-center justify-center">{tab.badge}</span> : null}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 flex-col bg-[#14212E]">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-[#7A1F2B] text-white grid place-items-center font-display font-extrabold">IB</div>
          <div><p className="font-display font-extrabold text-white m-0 leading-tight">IsmailBooks</p><p className="text-[10px] uppercase tracking-widest text-[#C9962E] font-extrabold m-0">Admin Panel</p></div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="px-3.5 pt-2 pb-1 text-[10px] uppercase tracking-widest text-[#6B5F52] font-extrabold">Maamulka</p>
          {tabs.map(t => <NavItem key={t.id} tab={t} />)}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-[#B7AC9D] hover:bg-white/5 hover:text-white no-underline transition-all"><ExternalLink className="w-4 h-4" /> Ku noqo Goobta</Link>
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-[#B7AC9D] hover:bg-[#7A1F2B]/20 hover:text-white transition-all"><LogOut className="w-4 h-4" /> Ka bax</button>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#14212E]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="p-1 rounded-lg text-[#B7AC9D] hover:text-white hover:bg-white/10 transition-colors"
              title="Ku noqo Goobta"
              aria-label="Ku noqo Goobta"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 rounded-lg bg-[#7A1F2B] text-white grid place-items-center font-display font-extrabold text-sm">IB</div>
            <span className="font-display font-extrabold text-white">Admin</span>
          </div>
          <button onClick={handleSignOut} className="text-[#B7AC9D] p-2" title="Ka bax" aria-label="Ka bax"><LogOut className="w-5 h-5" /></button>
        </div>
        <div className="flex gap-1.5 px-3 pb-3 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeTab === t.id ? "bg-[#7A1F2B] text-white" : "text-[#B7AC9D] bg-white/5"}`}>
              {t.icon}{t.label}
              {t.badge ? <span className="min-w-[16px] h-4 px-1 rounded-full bg-[#C9962E] text-[#201B16] text-[9px] font-extrabold flex items-center justify-center">{t.badge}</span> : null}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1200px]">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Hero Revenue Banner */}
              <div className="rounded-2xl bg-[#14212E] p-6 sm:p-8 border-l-4 border-[#C9962E] relative overflow-hidden">
                <div className="absolute right-6 top-4 opacity-5">
                  <Wallet className="w-32 h-32 text-[#C9962E]" />
                </div>
                <p className="text-[11px] uppercase tracking-widest text-[#B7AC9D] font-extrabold m-0 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-[#C9962E]" /> Dakhliga Guud · Total Revenue
                </p>
                <p className="font-display text-4xl sm:text-5xl font-extrabold text-[#C9962E] m-0 mt-2">{stats.totalRevenue}</p>
                <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4 text-sm">
                  <p className="m-0 text-[#B7AC9D]">Bishan: <strong className="text-white">{stats.monthlyRevenue}</strong></p>
                  <p className="m-0 text-[#B7AC9D]">Sugaya: <strong className="text-[#C9962E]">{stats.pendingValue}</strong></p>
                  <p className="m-0 text-[#B7AC9D]">Ansixan: <strong className="text-[#2E7D5B]">{stats.approvedCount} lacag-bixin</strong></p>
                </div>
              </div>

              {/* 4 KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Lacag-bixin Sugaya", value: String(stats.pendingCount), sub: stats.pendingValue, icon: <CreditCard className="w-5 h-5" />, tone: "bg-[#F8EBC8] text-[#8A5A00]", action: () => setActiveTab("payments") },
                  { label: "Akhristayaal Firfircoon", value: String(stats.activeReadersCount), sub: `${stats.readersCount} diiwaangashan`, icon: <Users className="w-5 h-5" />, tone: "bg-[rgba(31,58,84,0.08)] text-[#1F3A54]", action: () => setActiveTab("readers") },
                  { label: "Buugaagta", value: String(stats.booksCount), sub: `${data.books.filter(b => b.is_active).length} live`, icon: <BookOpen className="w-5 h-5" />, tone: "bg-[rgba(122,31,43,0.08)] text-[#7A1F2B]", action: () => setActiveTab("books") },
                  { label: "Soo-koobida", value: String(stats.summariesCount), sub: `${data.summaries.filter(s => s.is_paid).length} premium`, icon: <BookMarked className="w-5 h-5" />, tone: "bg-[rgba(46,125,91,0.1)] text-[#2E7D5B]", action: () => setActiveTab("summaries") },
                ].map((s, i) => (
                  <button key={i} onClick={s.action} className="surface-card !p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer w-full">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.tone}`}>{s.icon}</div>
                    <div className="font-display text-3xl font-extrabold text-[#201B16]">{s.value}</div>
                    <div className="text-xs font-bold text-[#6B5F52] mt-0.5">{s.label}</div>
                    <div className="text-[10px] text-[#6B5F52]/70 mt-0.5">{s.sub}</div>
                  </button>
                ))}
              </div>

              {/* Payment Status Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {[
                  { label: "Pending", count: stats.pendingCount, color: "#C9962E", bg: "bg-[#FEF3C7]" },
                  { label: "Approved", count: stats.approvedCount, color: "#2E7D5B", bg: "bg-[#DCFCE7]" },
                  { label: "Rejected", count: stats.rejectedCount, color: "#B3261E", bg: "bg-[#FEE2E2]" },
                ].map((bar) => (
                  <div key={bar.label} className={`surface-card !p-5 flex items-center gap-4`}>
                    <div className={`w-12 h-12 rounded-xl ${bar.bg} flex items-center justify-center shrink-0`}>
                      <CreditCard className="w-5 h-5" style={{ color: bar.color }} />
                    </div>
                    <div>
                      <div className="font-display text-2xl font-extrabold text-[#201B16]">{bar.count}</div>
                      <div className="text-xs font-bold text-[#6B5F52]">{bar.label} Lacag-bixinada</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Two columns: recent payments + top books */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Payments */}
                <div className="surface-card !p-0 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8DFD2]">
                    <h3 className="font-display font-extrabold text-[#201B16] m-0 text-base">Lacag-bixinta Dambe</h3>
                    <button onClick={() => setActiveTab("payments")} className="text-xs font-bold text-[#7A1F2B] hover:underline">Dhammaan →</button>
                  </div>
                  <div className="divide-y divide-[#E8DFD2]">
                    {recentPayments.length === 0 ? (
                      <div className="px-5 py-8 text-center text-xs text-[#6B5F52]">Wax lacag-bixin ah lama helin.</div>
                    ) : recentPayments.map(p => (
                      <div
                        key={p.id}
                        onClick={() => setPaymentDetailModal(p)}
                        className="flex items-center justify-between px-5 py-3 hover:bg-[#FBF7F0] transition-colors cursor-pointer"
                      >
                        <div className="min-w-0">
                          <p className="m-0 text-sm font-bold text-[#201B16] truncate">{p.user}</p>
                          <p className="m-0 text-xs text-[#6B5F52] truncate">{p.book}</p>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <p className="m-0 text-sm font-extrabold text-[#1F3A54]">{p.amount}</p>
                          {statusBadge(p.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Books by Views */}
                <div className="surface-card !p-0 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8DFD2]">
                    <h3 className="font-display font-extrabold text-[#201B16] m-0 text-base">Buugaagta Ugu Daawashadii Badan</h3>
                    <button onClick={() => setActiveTab("books")} className="text-xs font-bold text-[#7A1F2B] hover:underline">Dhammaan →</button>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    {topBooks.length === 0 ? (
                      <div className="py-6 text-center text-xs text-[#6B5F52]">Wax buug ah lama helin.</div>
                    ) : topBooks.map((b, i) => (
                      <div key={b.id} className="flex items-center gap-3">
                        <span className="w-5 text-[10px] font-extrabold text-[#6B5F52] shrink-0">#{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="m-0 text-xs font-bold text-[#201B16] truncate">{b.title}</p>
                          <div className="mt-1 h-1.5 rounded-full bg-[#E8DFD2] overflow-hidden">
                            <div className="h-full rounded-full bg-[#1F3A54] transition-all" style={{ width: `${Math.round((b.views / maxViews) * 100)}%` }} />
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold text-[#6B5F52] shrink-0">{b.views} daawasho</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="surface-card !p-5">
                <p className="text-[11px] uppercase tracking-widest font-extrabold text-[#6B5F52] m-0 mb-4">Ficillada Degdega</p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setActiveTab("books")} className="btn btn-secondary btn-sm"><BookOpen className="w-4 h-4" /> Buugaagta</button>
                  <button onClick={() => { setActiveTab("payments"); setPaymentFilter("pending"); }} className="btn btn-sm !bg-[#F8EBC8] !text-[#8A5A00] !border-[#C9962E]/30">
                    <CreditCard className="w-4 h-4" /> Lacag-bixin Sugaya ({stats.pendingCount})
                  </button>
                  <button onClick={() => setActiveTab("summaries")} className="btn btn-secondary btn-sm"><BookMarked className="w-4 h-4" /> Soo-koobida</button>
                  <button onClick={() => setActiveTab("readers")} className="btn btn-secondary btn-sm"><Users className="w-4 h-4" /> Akhristayaasha</button>
                  <button onClick={() => setActiveTab("blog")} className="btn btn-secondary btn-sm"><FileText className="w-4 h-4" /> Blog-ga</button>
                </div>
              </div>
            </div>
          )}

          {/* PAYMENTS */}
          {activeTab === "payments" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-[#201B16] m-0">Lacag-bixinada</h2>
                  <p className="text-xs text-[#6B5F52] mt-0.5">Maamul, fasax, ama diid codsiyadda lacag-bixinta ee akhristayaasha.</p>
                </div>
              </div>

              {/* Payment Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="surface-card !p-4 border-l-4 border-[#C9962E]">
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Wadarta Dakhliga</span>
                  <span className="font-display text-xl font-extrabold text-[#C9962E] block mt-0.5">{stats.totalRevenue}</span>
                  <span className="text-[10px] text-[#6B5F52]">Bishan: {stats.monthlyRevenue}</span>
                </div>
                <div className="surface-card !p-4 border-l-4 border-[#2E7D5B]">
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Ansixan</span>
                  <span className="font-display text-2xl font-extrabold text-[#2E7D5B] block mt-0.5">{stats.approvedCount}</span>
                  <span className="text-[10px] text-[#6B5F52]">Lacag-bixin la fasaxay</span>
                </div>
                <div className="surface-card !p-4 border-l-4 border-[#C9962E]">
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Sugaya</span>
                  <span className="font-display text-2xl font-extrabold text-[#8A5A00] block mt-0.5">{stats.pendingCount}</span>
                  <span className="text-[10px] text-[#6B5F52]">{stats.pendingValue} la sugayo</span>
                </div>
                <div className="surface-card !p-4 border-l-4 border-[#B3261E]">
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">La diidday</span>
                  <span className="font-display text-2xl font-extrabold text-[#B3261E] block mt-0.5">{stats.rejectedCount}</span>
                  <span className="text-[10px] text-[#6B5F52]">Lacag-bixin la diidday</span>
                </div>
              </div>

              {/* Search + Filter toolbar */}
              <div className="surface-card !p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B5F52]" />
                  <input
                    type="text"
                    placeholder="Raadi user, buug, reference..."
                    value={paymentSearch}
                    onChange={(e) => setPaymentSearch(e.target.value)}
                    className="input-field bg-[#FBF7F0]/60 pl-10 text-sm focus:bg-white"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {(["all", "pending", "approved", "rejected"] as const).map((f) => (
                    <button key={f} onClick={() => setPaymentFilter(f)}
                      className={`chip btn-sm ${paymentFilter === f ? "!bg-[#1F3A54] !text-white" : ""}`}
                      aria-pressed={paymentFilter === f}>
                      {f === "all" ? `Dhammaan (${data.payments.length})` : f === "pending" ? `Pending (${stats.pendingCount})` : f === "approved" ? `Approved (${stats.approvedCount})` : `Rejected (${stats.rejectedCount})`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="surface-card !p-0 overflow-hidden">
                <div className="overflow-auto">
                  <table className="w-full border-collapse min-w-[820px] bg-white">
                    <thead>
                      <tr>
                        <Th>Rasiidka</Th><Th>User</Th><Th>Buugga</Th><Th>Habka</Th>
                        <Th>Reference</Th><Th>Qiimaha</Th><Th>Taariikhda</Th><Th>Xaaladda / Ficil</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments.length === 0 ? (
                        <tr><td colSpan={8} className="text-center py-10 text-[#6B5F52]">
                          {paymentSearch ? `Wax raadintaada u dhigma "${paymentSearch}" lama helin.` : "Wax lacag-bixin ah lama helin."}
                        </td></tr>
                      ) : (
                        filteredPayments.map((p) => (
                          <tr
                            key={p.id}
                            onClick={() => setPaymentDetailModal(p)}
                            className="border-b border-[#E8DFD2] last:border-b-0 hover:bg-[#FBF7F0] transition-colors cursor-pointer"
                          >
                            <Td>
                              {p.receiptUrl ? (
                                <button onClick={(e) => { e.stopPropagation(); setLightboxUrl(p.receiptUrl); }} className="group relative w-12 h-12 rounded-lg overflow-hidden border border-[#E8DFD2] hover:border-[#7A1F2B] transition-colors" title="Eeg rasiidka">
                                  <img src={p.receiptUrl} alt="Receipt" className="w-full h-full object-cover" />
                                  <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <Eye className="w-4 h-4 text-white" />
                                  </span>
                                </button>
                              ) : (
                                <span className="w-12 h-12 rounded-lg border border-dashed border-[#E8DFD2] flex items-center justify-center text-[#6B5F52]"><ImageIcon className="w-4 h-4" /></span>
                              )}
                            </Td>
                            <Td className="text-sm font-bold text-[#201B16]">{p.user}</Td>
                            <Td className="text-xs text-[#6B5F52] max-w-[160px] truncate">{p.book}</Td>
                            <Td>
                              <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-[rgba(31,58,84,0.08)] text-[#1F3A54]">
                                {p.method}
                              </span>
                            </Td>
                            <Td className="text-xs font-mono text-[#8A5A00] font-bold">{p.ref}</Td>
                            <Td className="text-sm font-extrabold text-[#201B16]">{p.amount}</Td>
                            <Td className="text-xs text-[#6B5F52]">{p.date}</Td>
                            <Td onClick={(e) => e.stopPropagation()}>
                              {p.status === "pending" ? (
                                <div className="flex items-center gap-2">
                                  <button disabled={loadingPaymentId === p.id} onClick={() => handleApprove(p.id)} className="btn btn-success btn-sm !min-h-8 !py-1 !px-2.5 !text-xs disabled:opacity-50">
                                    <Check className="w-3 h-3" /> Fasax
                                  </button>
                                  <button disabled={loadingPaymentId === p.id} onClick={() => handleReject(p.id)} className="btn btn-error btn-sm !min-h-8 !py-1 !px-2.5 !text-xs disabled:opacity-50">
                                    <X className="w-3 h-3" /> Diid
                                  </button>
                                  <button onClick={() => setPaymentDetailModal(p)} className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#1F3A54] hover:bg-[#FBF7F0]" title="Faahfaahin">
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  {statusBadge(p.status)}
                                  <button onClick={() => setPaymentDetailModal(p)} className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#1F3A54] hover:bg-[#FBF7F0]" title="Faahfaahin">
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </Td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* BOOKS */}
          {activeTab === "books" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-[#201B16] m-0">Maktabada Buugaagta ({data.books.length})</h2>
                  <p className="text-xs text-[#6B5F52] mt-0.5">Maamul buugaagta, soo rar DOCX/EPUB/PDF, ka dhig live ama qarsoon.</p>
                </div>
                <button onClick={() => setBookModal({ open: true, book: null })} className="btn btn-primary btn-sm">
                  <Plus className="h-4 w-4" /> Ku dar Buug Cusub
                </button>
              </div>

              {/* Books Summary Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="surface-card !p-4">
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Dhammaan Buugaagta</span>
                  <span className="font-display text-2xl font-extrabold text-[#201B16]">{data.books.length}</span>
                </div>
                <div className="surface-card !p-4">
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Live ka ah</span>
                  <span className="font-display text-2xl font-extrabold text-[#2E7D5B]">{data.books.filter(b => b.is_active).length}</span>
                </div>
                <div className="surface-card !p-4">
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Premium (Lacag leh)</span>
                  <span className="font-display text-2xl font-extrabold text-[#C9962E]">{data.books.filter(b => b.is_paid).length}</span>
                </div>
                <div className="surface-card !p-4">
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">File-ku Ingested ka yahay</span>
                  <span className="font-display text-2xl font-extrabold text-[#1F3A54]">{data.books.filter(b => b.file_link).length}</span>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 surface-card !p-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B5F52]" />
                  <input
                    type="text"
                    placeholder="Raadi buug ama qoraa..."
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                    className="input-field bg-[#FBF7F0]/60 pl-10 text-sm focus:bg-white"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
                  {([
                    { key: "all", label: "Dhammaan" },
                    { key: "live", label: "Live" },
                    { key: "hidden", label: "Qarsoon" },
                    { key: "premium", label: "Premium" },
                    { key: "free", label: "Bilaash" },
                    { key: "no_file", label: "File La'aan ⚠️" },
                  ] as const).map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setBookFilter(f.key)}
                      className={`chip btn-xs ${bookFilter === f.key ? "!bg-[#1F3A54] !text-white" : ""}`}
                      aria-pressed={bookFilter === f.key}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Books Table */}
              <div className="surface-card !p-0 overflow-hidden">
                <div className="overflow-auto">
                  <table className="w-full border-collapse min-w-[780px] bg-white">
                    <thead>
                      <tr>
                        <Th>Buugga</Th>
                        <Th>Qoraaga</Th>
                        <Th>Nooca</Th>
                        <Th>Qiimaha</Th>
                        <Th>Boggag</Th>
                        <Th>File Status</Th>
                        <Th>Muuqaal</Th>
                        <Th>Ficil</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.books.filter((b) => {
                        const matchesFilter =
                          bookFilter === "all" ||
                          (bookFilter === "live" && b.is_active) ||
                          (bookFilter === "hidden" && !b.is_active) ||
                          (bookFilter === "premium" && b.is_paid) ||
                          (bookFilter === "free" && !b.is_paid) ||
                          (bookFilter === "no_file" && !b.file_link);

                        const q = bookSearch.toLowerCase();
                        const matchesSearch =
                          b.title.toLowerCase().includes(q) ||
                          (b.author ?? "").toLowerCase().includes(q) ||
                          (b.category ?? "").toLowerCase().includes(q);

                        return matchesFilter && matchesSearch;
                      }).length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center py-10 text-[#6B5F52]">
                            Wax buug ah oo u dhigma raadintaada ama shaandhayntaada lama helin.
                          </td>
                        </tr>
                      ) : (
                        data.books.filter((b) => {
                          const matchesFilter =
                            bookFilter === "all" ||
                            (bookFilter === "live" && b.is_active) ||
                            (bookFilter === "hidden" && !b.is_active) ||
                            (bookFilter === "premium" && b.is_paid) ||
                            (bookFilter === "free" && !b.is_paid) ||
                            (bookFilter === "no_file" && !b.file_link);

                          const q = bookSearch.toLowerCase();
                          const matchesSearch =
                            b.title.toLowerCase().includes(q) ||
                            (b.author ?? "").toLowerCase().includes(q) ||
                            (b.category ?? "").toLowerCase().includes(q);

                          return matchesFilter && matchesSearch;
                        }).map((b) => (
                          <tr key={b.id} className="border-b border-[#E8DFD2] last:border-b-0 hover:bg-[#FBF7F0] transition-colors">
                            <Td className="text-sm font-bold text-[#201B16] max-w-[220px] truncate">{b.title}</Td>
                            <Td className="text-xs text-[#6B5F52]">{b.author}</Td>
                            <Td><span className={`badge ${b.is_paid ? "badge-gold" : "badge-success"}`}>{b.is_paid ? "Premium" : "Free"}</span></Td>
                            <Td className="text-xs font-bold text-[#1F3A54]">{b.is_paid ? b.price : "—"}</Td>
                            <Td className="text-xs text-[#201B16]">{b.pages ? `${b.pages} p` : "—"}</Td>
                            <Td>
                              {b.file_link ? (
                                <span className="badge badge-success text-[10px]" title={b.file_link}>📄 File Loaded</span>
                              ) : (
                                <span className="badge badge-pending text-[10px]">⚠️ No File</span>
                              )}
                            </Td>
                            <Td>
                              <span className={`badge ${b.is_active ? "badge-success" : "badge-error"}`}>{b.is_active ? "Live" : "Qarsoon"}</span>
                            </Td>
                            <Td>
                              <div className="flex items-center gap-2">
                                <Link href={`/books/${b.id}/read?returnTo=${buildReturnTarget("/admin", { tab: "books" })}`} className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#7A1F2B] hover:bg-[#FBF7F0]" title="Akhriso Buugga (Reader)"><BookOpen className="w-3.5 h-3.5" /></Link>
                                <Link href={`/books/${b.id}?returnTo=${buildReturnTarget("/admin", { tab: "books" })}`} className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#1F3A54] hover:bg-[#FBF7F0]" title="Eeg Faahfaahinta"><Eye className="w-3.5 h-3.5" /></Link>
                                <button onClick={() => setTocModal({ open: true, bookId: String(b.id), bookTitle: b.title })} className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#1F3A54] hover:bg-[#FBF7F0]" title="Eeg & Wax ka beddel Cutubyada (TOC)"><List className="w-3.5 h-3.5" /></button>
                                <button onClick={() => setBookModal({ open: true, book: b })} className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#7A1F2B] hover:bg-[rgba(122,31,43,0.06)]" title="Wax ka beddel / Soo rar Document"><Pencil className="w-3.5 h-3.5" /></button>
                                <button onClick={() => handleBookActive(b.id, b.is_active)} className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#6B5F52] hover:bg-[#FBF7F0]" title={b.is_active ? "Kaa dhig Qarsoon" : "Ka dhig Live"}><Ban className="w-3.5 h-3.5" /></button>
                                <button onClick={() => handleDeleteBook(b.id, b.title)} className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50" title="Tirtir Buugga"><Trash2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </Td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SUMMARIES */}
          {activeTab === "summaries" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-[#201B16] m-0">Soo-koobida Buugaagta ({data.summaries.length})</h2>
                  <p className="text-xs text-[#6B5F52] mt-0.5">Ku dar, wax ka beddel, ama tirtir soo-koobidda buugaagta.</p>
                </div>
                <button onClick={() => setSummaryModal({ open: true, summary: null })} className="btn btn-primary btn-sm">
                  <Plus className="h-4 w-4" /> Ku dar Soo-koob Cusub
                </button>
              </div>

              {/* Summary Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="surface-card !p-4">
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Dhammaan Soo-koobida</span>
                  <span className="font-display text-2xl font-extrabold text-[#201B16] block mt-0.5">{data.summaries.length}</span>
                </div>
                <div className="surface-card !p-4">
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Premium</span>
                  <span className="font-display text-2xl font-extrabold text-[#C9962E] block mt-0.5">{data.summaries.filter(s => s.is_paid).length}</span>
                </div>
                <div className="surface-card !p-4">
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Bilaash</span>
                  <span className="font-display text-2xl font-extrabold text-[#2E7D5B] block mt-0.5">{data.summaries.filter(s => !s.is_paid).length}</span>
                </div>
                <div className="surface-card !p-4">
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Wadarta Daawashada</span>
                  <span className="font-display text-2xl font-extrabold text-[#1F3A54] block mt-0.5">{data.summaries.reduce((t, s) => t + s.views, 0)}</span>
                </div>
              </div>

              {/* Search + Filter Toolbar */}
              <div className="surface-card !p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B5F52]" />
                  <input
                    type="text"
                    placeholder="Raadi soo-koob, buug, qoraa..."
                    value={summarySearch}
                    onChange={(e) => setSummarySearch(e.target.value)}
                    className="input-field bg-[#FBF7F0]/60 pl-10 text-sm focus:bg-white"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {(["all", "free", "premium"] as const).map((f) => (
                    <button key={f} onClick={() => setSummaryFilter(f)}
                      className={`chip btn-sm ${summaryFilter === f ? "!bg-[#1F3A54] !text-white" : ""}`}
                      aria-pressed={summaryFilter === f}>
                      {f === "all" ? "Dhammaan" : f === "free" ? "Bilaash" : "Premium"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="surface-card !p-0 overflow-hidden">
                <div className="overflow-auto">
                  <table className="w-full border-collapse min-w-[760px] bg-white">
                    <thead>
                      <tr><Th>Cinwaanka</Th><Th>Qeybta</Th><Th>Buugga</Th><Th>Status</Th><Th>Nooca</Th><Th>Qiimaha</Th><Th>Daawashada</Th><Th>Ficil</Th></tr>
                    </thead>
                    <tbody>
                      {filteredSummaries.length === 0 ? (
                        <tr><td colSpan={8} className="text-center py-10 text-[#6B5F52]">
                          {summarySearch ? `"${summarySearch}" raadintaada wax lama helin.` : "Wax soo-koob ah lama helin."}
                        </td></tr>
                      ) : filteredSummaries.map((s) => (
                        <tr key={s.id} className="border-b border-[#E8DFD2] last:border-b-0 hover:bg-[#FBF7F0] transition-colors">
                          <Td className="text-sm font-bold text-[#201B16] max-w-[200px] truncate">{s.title}</Td>
                          <Td className="text-xs text-[#6B5F52]">{s.category || "—"}</Td>
                          <Td className="text-xs text-[#6B5F52] max-w-[140px] truncate">{s.book_title || "—"}</Td>
                          <Td>
                            {s.is_published ? (
                              <span className="flex items-center gap-1 text-[#2E7D5B] text-[11px] font-extrabold uppercase"><CheckCircle2 className="w-3.5 h-3.5" /> Published</span>
                            ) : (
                              <span className="flex items-center gap-1 text-[#6B5F52] text-[11px] font-extrabold uppercase"><Ban className="w-3.5 h-3.5" /> Draft</span>
                            )}
                          </Td>
                          <Td><span className={`badge ${s.is_paid ? "badge-gold" : "badge-success"}`}>{s.is_paid ? "Premium" : "Free"}</span></Td>
                          <Td className="text-xs font-bold text-[#1F3A54]">{s.is_paid ? s.price : "—"}</Td>
                          <Td className="text-xs text-[#201B16] font-semibold">{s.views.toLocaleString()}</Td>
                          <Td>
                            <div className="flex items-center gap-2">
                              <Link href={`/summaries/${s.id}/read?returnTo=${buildReturnTarget("/admin", { tab: "summaries" })}`} className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#7A1F2B] hover:bg-[#FBF7F0]" title="Akhriso Soo-koobka (Reader)"><BookOpen className="w-3.5 h-3.5" /></Link>
                              <Link href={`/summaries/${s.id}?returnTo=${buildReturnTarget("/admin", { tab: "summaries" })}`} className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#1F3A54] hover:bg-[#FBF7F0]" title="Eeg Faahfaahinta"><Eye className="w-3.5 h-3.5" /></Link>
                              <button onClick={() => setSummaryModal({ open: true, summary: { ...s, price: s.price.replace('$', '') } as any })} className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#7A1F2B] hover:bg-[rgba(122,31,43,0.06)]" title="Wax ka beddel"><Pencil className="w-3.5 h-3.5" /></button>
                              <button onClick={() => handleDeleteSummary(s.id)} className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50" title="Tirtir"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* READERS / USER MANAGEMENT */}
          {activeTab === "readers" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-[#201B16] m-0">
                    Maamulka Akhristayaasha ({data.users.length})
                  </h2>
                  <p className="text-xs text-[#6B5F52] mt-0.5">
                    Daawo dhammaan isticmaalayaasha diiwaangashan, buugaagta ay leeyihiin, iyo xaaladda account-yadooda.
                  </p>
                </div>
              </div>

              {/* 4 Metric Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button
                  onClick={() => setUserFilter("all")}
                  className={`surface-card !p-4 text-left hover:shadow-md transition-all cursor-pointer ${userFilter === "all" ? "ring-2 ring-[#1F3A54]" : ""}`}
                >
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Dhammaan Akhristayaasha</span>
                  <span className="font-display text-2xl font-extrabold text-[#201B16] block mt-0.5">
                    {data.users.length}
                  </span>
                  <span className="text-[10px] text-[#6B5F52]">User-yaal Diiwaangashan</span>
                </button>

                <button
                  onClick={() => setUserFilter("has_books")}
                  className={`surface-card !p-4 border-l-4 border-[#2E7D5B] text-left hover:shadow-md transition-all cursor-pointer ${userFilter === "has_books" ? "ring-2 ring-[#2E7D5B]" : ""}`}
                >
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Akhristayaal Buug Leeh 📚</span>
                  <span className="font-display text-2xl font-extrabold text-[#2E7D5B] block mt-0.5">
                    {data.users.filter((u) => u.booksOwned > 0).length}
                  </span>
                  <span className="text-[10px] text-[#2E7D5B] font-bold">Isticmaalayaasha iibsaday</span>
                </button>

                <button
                  onClick={() => setUserFilter("active")}
                  className={`surface-card !p-4 border-l-4 border-[#1F3A54] text-left hover:shadow-md transition-all cursor-pointer ${userFilter === "active" ? "ring-2 ring-[#1F3A54]" : ""}`}
                >
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Firfircoon (Active)</span>
                  <span className="font-display text-2xl font-extrabold text-[#1F3A54] block mt-0.5">
                    {data.users.filter((u) => u.status === "active").length}
                  </span>
                  <span className="text-[10px] text-[#6B5F52]">Account-yo fasaxan</span>
                </button>

                <button
                  onClick={() => setUserFilter("suspended")}
                  className={`surface-card !p-4 border-l-4 border-[#B3261E] text-left hover:shadow-md transition-all cursor-pointer ${userFilter === "suspended" ? "ring-2 ring-[#B3261E]" : ""}`}
                >
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Hakad (Suspended)</span>
                  <span className="font-display text-2xl font-extrabold text-[#B3261E] block mt-0.5">
                    {data.users.filter((u) => u.status !== "active").length}
                  </span>
                  <span className="text-[10px] text-[#6B5F52]">Account-yo la joojiyay</span>
                </button>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="surface-card !p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B5F52]" />
                  <input
                    type="text"
                    placeholder="Raadi magac, email, ama user ID..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="input-field bg-[#FBF7F0]/60 pl-10 text-sm focus:bg-white"
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  {([
                    { key: "all", label: `Dhammaan (${data.users.length})` },
                    { key: "has_books", label: `Buug Leeh 📚 (${data.users.filter((u) => u.booksOwned > 0).length})` },
                    { key: "no_books", label: `Bilaash (${data.users.filter((u) => u.booksOwned === 0).length})` },
                    { key: "active", label: `Active (${data.users.filter((u) => u.status === "active").length})` },
                    { key: "suspended", label: `Suspended (${data.users.filter((u) => u.status !== "active").length})` },
                  ] as const).map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setUserFilter(f.key)}
                      className={`chip btn-sm ${userFilter === f.key ? "!bg-[#1F3A54] !text-white" : ""}`}
                      aria-pressed={userFilter === f.key}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Users Table */}
              <div className="surface-card !p-0 overflow-hidden">
                <div className="overflow-auto">
                  <table className="w-full border-collapse min-w-[720px] bg-white">
                    <thead>
                      <tr>
                        <Th>Isticmaalaha</Th>
                        <Th>Buugaagta Haysta</Th>
                        <Th>Lacag-bixinada</Th>
                        <Th>Xaaladda</Th>
                        <Th>Diiwaangalinta</Th>
                        <Th>Ficil</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.users
                        .filter((u) => {
                          const matchesFilter =
                            userFilter === "all" ||
                            (userFilter === "has_books" && u.booksOwned > 0) ||
                            (userFilter === "no_books" && u.booksOwned === 0) ||
                            (userFilter === "active" && u.status === "active") ||
                            (userFilter === "suspended" && u.status !== "active");

                          const q = userSearch.toLowerCase();
                          const matchesSearch =
                            u.name.toLowerCase().includes(q) ||
                            (u.email ?? "").toLowerCase().includes(q) ||
                            u.id.toLowerCase().includes(q);

                          return matchesFilter && matchesSearch;
                        }).length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-10 text-[#6B5F52]">
                            {userSearch
                              ? `Wax user ah oo u dhigma "${userSearch}" lama helin.`
                              : "Wax isticmaale ah oo nidaamka ku jira lama helin."}
                          </td>
                        </tr>
                      ) : (
                        data.users
                          .filter((u) => {
                            const matchesFilter =
                              userFilter === "all" ||
                              (userFilter === "has_books" && u.booksOwned > 0) ||
                              (userFilter === "no_books" && u.booksOwned === 0) ||
                              (userFilter === "active" && u.status === "active") ||
                              (userFilter === "suspended" && u.status !== "active");

                            const q = userSearch.toLowerCase();
                            const matchesSearch =
                              u.name.toLowerCase().includes(q) ||
                              (u.email ?? "").toLowerCase().includes(q) ||
                              u.id.toLowerCase().includes(q);

                            return matchesFilter && matchesSearch;
                          })
                          .map((u) => (
                            <tr
                              key={u.id}
                              onClick={() => setUserDetailModal(u)}
                              className="border-b border-[#E8DFD2] last:border-b-0 hover:bg-[#FBF7F0] transition-colors cursor-pointer"
                            >
                              <Td>
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-xl bg-[#7A1F2B]/10 text-[#7A1F2B] font-display font-extrabold flex items-center justify-center text-sm shrink-0">
                                    {u.name.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-[#201B16] m-0">{u.name}</p>
                                    {u.email && (
                                      <p className="text-[11px] text-[#6B5F52] m-0">{u.email}</p>
                                    )}
                                  </div>
                                </div>
                              </Td>
                              <Td>
                                {u.booksOwned > 0 ? (
                                  <span className="inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#2E7D5B]/10 text-[#2E7D5B]">
                                    <BookOpen className="w-3 h-3" />
                                    {u.booksOwned} buug
                                  </span>
                                ) : (
                                  <span className="text-xs text-[#6B5F52]">0 buug</span>
                                )}
                              </Td>
                              <Td className="text-xs font-bold text-[#1F3A54]">
                                {u.paymentsCount ?? 0}
                              </Td>
                              <Td>
                                <span className={`badge ${u.status === "active" ? "badge-success" : "badge-error"}`}>
                                  {u.status === "active" ? "Active" : "Suspended"}
                                </span>
                              </Td>
                              <Td className="text-xs text-[#6B5F52]">{u.date}</Td>
                              <Td onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setUserDetailModal(u)}
                                    className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#1F3A54] hover:bg-[#FBF7F0]"
                                    title="Eeg Faahfaahinta"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    disabled={actionKey === `user-${u.id}`}
                                    onClick={() => handleUserStatus(u.id, u.status)}
                                    className={`btn btn-sm !min-h-8 !py-1 !px-2.5 !text-xs ${u.status === "active" ? "btn-error" : "btn-success"}`}
                                  >
                                    {u.status === "active" ? (
                                      <>
                                        <Ban className="w-3 h-3" /> Jooji
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle2 className="w-3 h-3" /> Fasax
                                      </>
                                    )}
                                  </button>
                                </div>
                              </Td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* BLOG MANAGEMENT TAB */}
          {activeTab === "blog" && (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-[#201B16] m-0">
                    Maamulka Qoraallada Blog ({data.blogPosts.length})
                  </h2>
                  <p className="text-xs text-[#6B5F52] mt-0.5">
                    Abuur, ku qor TinyMCE word editor, ka dhig published ama draft, maamul qeybaha.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBlogCategoryModalOpen(true)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Tag className="h-4 w-4" /> Maamul Qeybaha
                  </button>
                  <button
                    onClick={() => setBlogModal({ open: true, post: null })}
                    className="btn btn-primary btn-sm"
                  >
                    <Plus className="h-4 w-4" /> Qoraal Cusub (Modal Editor)
                  </button>
                  <Link
                    href="/admin/blog/create"
                    className="btn btn-secondary btn-sm"
                  >
                    <Sparkles className="h-4 w-4 text-[#7A1F2B]" /> Full Page Editor
                  </Link>
                </div>
              </div>

              {/* 4 Metric Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button
                  onClick={() => setBlogFilter("all")}
                  className={`surface-card !p-4 text-left hover:shadow-md transition-all cursor-pointer ${blogFilter === "all" ? "ring-2 ring-[#1F3A54]" : ""}`}
                >
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Dhammaan Qoraallada</span>
                  <span className="font-display text-2xl font-extrabold text-[#201B16] block mt-0.5">
                    {data.blogPosts.length}
                  </span>
                  <span className="text-[10px] text-[#6B5F52]">Blog Posts</span>
                </button>

                <button
                  onClick={() => setBlogFilter("published")}
                  className={`surface-card !p-4 border-l-4 border-[#2E7D5B] text-left hover:shadow-md transition-all cursor-pointer ${blogFilter === "published" ? "ring-2 ring-[#2E7D5B]" : ""}`}
                >
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Daabacan (Published)</span>
                  <span className="font-display text-2xl font-extrabold text-[#2E7D5B] block mt-0.5">
                    {data.blogPosts.filter((p) => p.status === "published").length}
                  </span>
                  <span className="text-[10px] text-[#2E7D5B] font-bold">Live ka ah web-ka</span>
                </button>

                <button
                  onClick={() => setBlogFilter("draft")}
                  className={`surface-card !p-4 border-l-4 border-[#C9962E] text-left hover:shadow-md transition-all cursor-pointer ${blogFilter === "draft" ? "ring-2 ring-[#C9962E]" : ""}`}
                >
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Qabad (Drafts)</span>
                  <span className="font-display text-2xl font-extrabold text-[#8A5A00] block mt-0.5">
                    {data.blogPosts.filter((p) => p.status === "draft").length}
                  </span>
                  <span className="text-[10px] text-[#6B5F52]">Wali la daabacin</span>
                </button>

                <div className="surface-card !p-4 border-l-4 border-[#1F3A54]">
                  <span className="text-[11px] font-semibold text-[#6B5F52] block">Wadarta Daawashada</span>
                  <span className="font-display text-2xl font-extrabold text-[#1F3A54] block mt-0.5">
                    {data.blogPosts.reduce((s, p) => s + p.view_count, 0).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#6B5F52]">Daawashada dhamaan</span>
                </div>
              </div>

              {/* Search + Filter Toolbar */}
              <div className="surface-card !p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B5F52]" />
                  <input
                    type="text"
                    placeholder="Raadi cinwaan, qeyb, sharaxaad..."
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    className="input-field bg-[#FBF7F0]/60 pl-10 text-sm focus:bg-white"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {([
                    { key: "all", label: `Dhammaan (${data.blogPosts.length})` },
                    { key: "published", label: `Daabacan (${data.blogPosts.filter((p) => p.status === "published").length})` },
                    { key: "draft", label: `Draft (${data.blogPosts.filter((p) => p.status === "draft").length})` },
                  ] as const).map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setBlogFilter(f.key)}
                      className={`chip btn-sm ${blogFilter === f.key ? "!bg-[#1F3A54] !text-white" : ""}`}
                      aria-pressed={blogFilter === f.key}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blog Posts Table */}
              <div className="surface-card !p-0 overflow-hidden">
                <div className="overflow-auto">
                  <table className="w-full border-collapse min-w-[760px] bg-white">
                    <thead>
                      <tr>
                        <Th>Sawirka</Th>
                        <Th>Cinwaanka</Th>
                        <Th>Qeybta</Th>
                        <Th>Xaaladda</Th>
                        <Th>Daawashada</Th>
                        <Th>Taariikhda</Th>
                        <Th>Ficil</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.blogPosts.filter((p) => {
                        const matchesFilter =
                          blogFilter === "all" || p.status === blogFilter;
                        const q = blogSearch.toLowerCase();
                        const matchesSearch =
                          p.title.toLowerCase().includes(q) ||
                          (p.category ?? "").toLowerCase().includes(q) ||
                          (p.excerpt ?? "").toLowerCase().includes(q);
                        return matchesFilter && matchesSearch;
                      }).length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-10 text-[#6B5F52]">
                            {blogSearch
                              ? `Wax blog post ah oo u dhigma "${blogSearch}" lama helin.`
                              : "Wax qoraal blog ah lama helin."}
                          </td>
                        </tr>
                      ) : (
                        data.blogPosts
                          .filter((p) => {
                            const matchesFilter =
                              blogFilter === "all" || p.status === blogFilter;
                            const q = blogSearch.toLowerCase();
                            const matchesSearch =
                              p.title.toLowerCase().includes(q) ||
                              (p.category ?? "").toLowerCase().includes(q) ||
                              (p.excerpt ?? "").toLowerCase().includes(q);
                            return matchesFilter && matchesSearch;
                          })
                          .map((p) => (
                            <tr
                              key={p.id}
                              className="border-b border-[#E8DFD2] last:border-b-0 hover:bg-[#FBF7F0] transition-colors"
                            >
                              <Td>
                                {p.featured_image ? (
                                  <div className="w-12 h-10 rounded-lg overflow-hidden border border-[#E8DFD2] bg-black/5 relative">
                                    <img
                                      src={p.featured_image}
                                      alt={p.title}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.currentTarget as HTMLElement).style.display = "none";
                                        const fallback = e.currentTarget.nextElementSibling;
                                        if (fallback) fallback.classList.remove("hidden");
                                      }}
                                    />
                                    <div className="hidden absolute inset-0 flex items-center justify-center bg-[#FBF7F0] text-[#7A1F2B]">
                                      <ImageIcon className="w-4 h-4 opacity-60" />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="w-12 h-10 rounded-lg border border-dashed border-[#E8DFD2] flex items-center justify-center text-[#6B5F52]">
                                    <ImageIcon className="w-4 h-4 opacity-40" />
                                  </div>
                                )}
                              </Td>
                              <Td>
                                <p className="text-sm font-bold text-[#201B16] max-w-[260px] truncate m-0">
                                  {p.title}
                                </p>
                                <p className="text-[10px] text-[#8A5A00] font-mono m-0 font-semibold truncate max-w-[260px]">
                                  /{p.slug}
                                </p>
                              </Td>
                              <Td>
                                <span className="inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#1F3A54]/10 text-[#1F3A54]">
                                  {p.category}
                                </span>
                              </Td>
                              <Td>
                                <span
                                  className={`badge ${p.status === "published" ? "badge-success" : "badge-pending"}`}
                                >
                                  {p.status === "published" ? "Published ✓" : "Draft"}
                                </span>
                              </Td>
                              <Td className="text-xs font-semibold text-[#201B16]">
                                👁 {p.view_count.toLocaleString()}
                              </Td>
                              <Td className="text-xs text-[#6B5F52]">{p.date}</Td>
                              <Td>
                                <div className="flex items-center gap-2">
                                  <Link
                                    href={`/blog/${p.slug}`}
                                    target="_blank"
                                    className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#1F3A54] hover:bg-[#FBF7F0]"
                                    title="Eeg Public Blog Page"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </Link>
                                  <button
                                    onClick={() => setBlogModal({ open: true, post: p })}
                                    className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#7A1F2B] hover:bg-[rgba(122,31,43,0.06)]"
                                    title="Wax ka beddel TinyMCE"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    disabled={actionKey === `blog-toggle-${p.id}`}
                                    onClick={() => handleToggleBlog(p.id, p.status)}
                                    className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#6B5F52] hover:bg-[#FBF7F0]"
                                    title={p.status === "published" ? "Ka dhig Draft" : "Daabac"}
                                  >
                                    <Ban className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    disabled={actionKey === `blog-del-${p.id}`}
                                    onClick={() => handleDeleteBlog(p.id)}
                                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                                    title="Tirtir"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </Td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* BOOK FORM MODAL */}
      {bookModal.open && (
        <BookFormModal
          book={bookModal.book}
          onClose={() => setBookModal({ open: false, book: null })}
          onSaved={() => { setBookModal({ open: false, book: null }); router.refresh(); }}
        />
      )}

      {/* TOC REVIEW MODAL */}
      {tocModal?.open && (
        <TocReviewModal
          bookId={tocModal.bookId}
          bookTitle={tocModal.bookTitle}
          onClose={() => setTocModal(null)}
          onSaved={() => { setTocModal(null); router.refresh(); }}
        />
      )}

      {/* BLOG POST FORM MODAL (TinyMCE) */}
      {blogModal.open && (
        <BlogPostFormModal
          post={blogModal.post}
          categories={data.blogCategories}
          onClose={() => setBlogModal({ open: false, post: null })}
          onSaved={() => { setBlogModal({ open: false, post: null }); router.refresh(); }}
          onOpenCategoryManager={() => setBlogCategoryModalOpen(true)}
        />
      )}

      {/* BLOG CATEGORY MODAL */}
      {blogCategoryModalOpen && (
        <BlogCategoryModal
          categories={data.blogCategories}
          onClose={() => setBlogCategoryModalOpen(false)}
          onSaved={() => router.refresh()}
        />
      )}

      {/* SUMMARY FORM MODAL */}
      {summaryModal.open && (
        <SummaryFormModal
          summary={summaryModal.summary}
          onClose={() => setSummaryModal({ open: false, summary: null })}
          onSaved={() => { setSummaryModal({ open: false, summary: null }); router.refresh(); }}
        />
      )}

      {/* USER DETAIL MODAL */}
      {userDetailModal && (
        <UserDetailModal
          user={userDetailModal}
          onClose={() => setUserDetailModal(null)}
          onToggleStatus={handleUserStatus}
          onViewPayments={(userName) => {
            setActiveTab("payments");
            setPaymentSearch(userName);
          }}
          loadingKey={actionKey}
        />
      )}

      {/* PAYMENT DETAIL MODAL */}
      {paymentDetailModal && (
        <PaymentDetailModal
          payment={paymentDetailModal}
          onClose={() => setPaymentDetailModal(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          loading={loadingPaymentId === paymentDetailModal.id}
        />
      )}

      {/* RECEIPT LIGHTBOX */}
      {lightboxUrl && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setLightboxUrl(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center" onClick={() => setLightboxUrl(null)}>
            <X className="w-5 h-5" />
          </button>
          <img src={lightboxUrl} alt="Receipt" className="max-h-[85vh] max-w-full rounded-xl shadow-2xl" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}