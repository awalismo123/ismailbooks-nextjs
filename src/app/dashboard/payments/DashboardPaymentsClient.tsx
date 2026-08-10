"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CreditCard, Clock, FileText, X, Sparkles } from "lucide-react";

export type PaymentItem = {
  id: number;
  bookTitle: string;
  method: string;
  ref: string | null;
  amount: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  adminNotes: string | null;
};

const StatusBadge = ({ status }: { status: "pending" | "approved" | "rejected" }) => {
  if (status === "approved") return <span className="bg-emerald-100 text-emerald-800 border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Approved</span>;
  if (status === "rejected") return <span className="bg-rose-100 text-rose-800 border-rose-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Rejected</span>;
  return <span className="bg-amber-100 text-amber-800 border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Pending</span>;
};

export default function DashboardPaymentsClient({ payments }: { payments: PaymentItem[] }) {
  const [receiptPayment, setReceiptPayment] = useState<PaymentItem | null>(null);

  return (
    <div className="space-y-6 relative">
      <h1 className="font-display text-2xl font-extrabold text-[#201B16]">Lacag-bixinada (Payments)</h1>

      <div className="rounded-3xl bg-white border border-[#E8DFD2] shadow-sm overflow-hidden">
        {payments.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto">
              <CreditCard className="w-8 h-8 text-[#C9962E]" />
            </div>
            <h4 className="font-display text-lg font-bold text-[#201B16]">Wax lacag-bixin ah ma jiraan</h4>
            <p className="text-sm text-[#6B5F52] max-w-sm mx-auto">
              Taariikhdaada iibsiga iyo rasiidhada ayaa halkan kasoo muuqan doona markaad iibsato buugaagta.
            </p>
            <Link href="/books" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7A1F2B] hover:bg-[#601822] text-white font-bold text-sm transition-all">
              <Sparkles className="w-4 h-4" /> Eeg Buugaagta
            </Link>
          </div>
        ) : (
          <>
            {payments.some(p => p.status === "pending") && (
              <div className="mx-4 mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800 font-semibold flex items-start gap-3">
                <Clock className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Waxaad leedahay lacag-bixin sugaysa ansixinta maamulka. Waxaad akhrin kartaa marka la ansixiyo.</span>
              </div>
            )}
            
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto p-4">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="bg-[#FBF7F0] border-b border-[#E8DFD2] text-[11px] uppercase tracking-widest text-[#6B5F52]">
                    <th className="px-5 py-3.5 font-bold rounded-tl-xl">Buugga</th>
                    <th className="px-5 py-3.5 font-bold">Habka</th>
                    <th className="px-5 py-3.5 font-bold">Tixraac</th>
                    <th className="px-5 py-3.5 font-bold">Qaddarka</th>
                    <th className="px-5 py-3.5 font-bold">Taariikhda</th>
                    <th className="px-5 py-3.5 font-bold">Xaaladda</th>
                    <th className="px-5 py-3.5 font-bold rounded-tr-xl"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD2] text-sm">
                  {payments.map(p => (
                    <tr key={p.id} className="hover:bg-[#FBF7F0] transition-colors">
                      <td className="px-5 py-4 font-bold text-[#201B16]">{p.bookTitle}</td>
                      <td className="px-5 py-4 text-[#6B5F52] uppercase font-semibold text-xs">{p.method}</td>
                      <td className="px-5 py-4 font-mono text-xs text-[#6B5F52]">{p.ref || "-"}</td>
                      <td className="px-5 py-4 font-extrabold text-[#7A1F2B]">{p.amount}</td>
                      <td className="px-5 py-4 text-[#6B5F52] text-xs">{p.date}</td>
                      <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={() => setReceiptPayment(p)} className="text-xs font-bold text-[#7A1F2B] hover:underline inline-flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" /> Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile list */}
            <div className="md:hidden divide-y divide-[#E8DFD2]">
              {payments.map(p => (
                <div key={p.id} className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[#201B16] text-sm">{p.bookTitle}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="flex justify-between text-xs text-[#6B5F52]">
                    <span>{p.method} {p.ref ? `• ${p.ref}` : ""}</span>
                    <span className="font-bold text-[#7A1F2B]">{p.amount}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 text-[11px] text-[#6B5F52]">
                    <span>{p.date}</span>
                    <button onClick={() => setReceiptPayment(p)} className="text-[#7A1F2B] font-bold underline">Receipt</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Receipt Modal */}
      {receiptPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#201B16]/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative">
            <div className="bg-gradient-to-r from-[#7A1F2B] to-[#4A1018] px-6 py-5 text-white flex justify-between items-center">
              <h3 className="font-display font-bold text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#C9962E]" /> Receipt
              </h3>
              <button onClick={() => setReceiptPayment(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3 text-sm">
              {([
                ["Book", receiptPayment.bookTitle],
                ["Method", receiptPayment.method?.toUpperCase()],
                receiptPayment.ref ? ["Reference", receiptPayment.ref] : null,
                ["Amount", receiptPayment.amount],
                ["Date", receiptPayment.date],
              ].filter(Boolean) as string[][]).map(([label, val]) => (
                <div key={label} className="flex justify-between py-2 border-b border-[#F0EBE3]">
                  <span className="text-[#6B5F52]">{label}:</span>
                  <span className="font-bold text-[#201B16] text-right max-w-[60%]">{val}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 border-b border-[#F0EBE3]">
                <span className="text-[#6B5F52]">Status:</span>
                <StatusBadge status={receiptPayment.status} />
              </div>
              {receiptPayment.adminNotes && (
                <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs">
                  <span className="font-bold block mb-1">Admin Note:</span>
                  {receiptPayment.adminNotes}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
