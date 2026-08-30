"use client";

import React, { useState, useEffect, useTransition } from "react";
import { X, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { updateTocAction, reingestBookAction } from "@/app/actions/books";

type TocItem = { title: string; file: string };

export default function TocReviewModal({
  bookId,
  bookTitle,
  isLegacy = false,
  onClose,
  onSaved,
}: {
  bookId: string;
  bookTitle: string;
  isLegacy?: boolean;
  onClose: () => void;
  onSaved?: () => void;
}) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isReingesting, setIsReingesting] = useState(false);

  const SUPABASE_URL =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://gdsmqhhzddjixifznecx.supabase.co";

  // Fetch TOC on mount
  useEffect(() => {
    async function loadToc() {
      setLoading(true);
      setErrorMsg(null);
      try {
        const res = await fetch(
          `${SUPABASE_URL}/storage/v1/object/public/book-content/${bookId}/toc.json`
        );
        if (!res.ok) throw new Error("TOC lagama helin kaydka (No toc.json found).");
        const data = await res.json();
        setToc(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setErrorMsg(err.message || "TOC lama soo ragi karo.");
        setToc([]);
      } finally {
        setLoading(false);
      }
    }
    loadToc();
  }, [bookId, SUPABASE_URL]);

  const handleTitleChange = (index: number, newTitle: string) => {
    const updated = [...toc];
    updated[index] = { ...updated[index], title: newTitle };
    setToc(updated);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...toc];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setToc(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === toc.length - 1) return;
    const updated = [...toc];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setToc(updated);
  };

  const handleDelete = (index: number) => {
    setToc(toc.filter((_, i) => i !== index));
  };

  const handleAddChapter = () => {
    const nextNum = String(toc.length + 1).padStart(3, "0");
    setToc([
      ...toc,
      { title: `Cutubka ${toc.length + 1}`, file: `ch_${nextNum}.html` },
    ]);
  };

  const handleSaveToc = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    startTransition(async () => {
      const res = await updateTocAction(bookId, toc);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("TOC-ga waa la kaydiyay!");
        setTimeout(() => {
          onSaved?.();
        }, 1000);
      }
    });
  };

  const handleReingest = async () => {
    if (!confirm("Ma cinwaannada iyo cutubyada HTML miyaa dib loogu noqonayaa processing nadiif ah? (Clean Re-ingest)")) return;
    setIsReingesting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await reingestBookAction(bookId);
    setIsReingesting(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setSuccessMsg("Buugga dib ayaa loo re-ingest gareeyay, HTML-kiisiina waa la nadiifiyay!");
      // Reload updated TOC
      try {
        const fetchRes = await fetch(
          `${SUPABASE_URL}/storage/v1/object/public/book-content/${bookId}/toc.json?t=${Date.now()}`
        );
        if (fetchRes.ok) {
          const data = await fetchRes.json();
          setToc(Array.isArray(data) ? data : []);
        }
      } catch {}
      setTimeout(() => {
        onSaved?.();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-[#E8DFD2] bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8DFD2] px-6 py-4 bg-[#FBF7F0]">
          <div>
            <h3 className="font-display text-lg font-extrabold text-[#201B16]">
              Eeg & Wax ka beddel Cutubyada (TOC)
            </h3>
            <p className="text-xs text-[#6B5F52] truncate max-w-md">
              {bookTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#6B5F52] hover:bg-white hover:text-[#201B16] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-600">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {isLegacy && !successMsg && (
            <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/90 p-3.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <div className="space-y-1">
                <p className="font-bold m-0">Nidaamka Cusub ee Qoraalka (Hardened Typography):</p>
                <p className="text-[11px] text-amber-800 m-0 leading-relaxed">
                  Buuggan waxaa la galiyay ka hor inta aan la hagaajin nidaamka qoraalka (inline style & justify stripping). Guji badhanka <strong>&quot;Re-ingest Clean HTML&quot;</strong> ee hoose si cutubyada loogu sifeeyo HTML nadiif ah.
                </p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12 text-xs font-bold text-[#6B5F52]">
              Soo rogidda cutubyada (TOC)...
            </div>
          ) : toc.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#6B5F52]">
              Wax cutubyo ah lagama helin toc.json.
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-[#6B5F52] font-semibold mb-3">
                Waad saxhi kartaa cinwaanka cutub kasta ama waad kala hor raysiin kartaa:
              </p>
              {toc.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-xl border border-[#E8DFD2] bg-[#FBF7F0]/40 p-2.5 hover:bg-white transition-colors"
                >
                  <span className="text-xs font-bold text-[#6B5F52] min-w-[28px] text-center">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleTitleChange(idx, e.target.value)}
                    className="flex-1 input-field !min-h-[38px] !py-1 text-sm bg-white font-medium"
                    placeholder="Cinwaanka cutubka..."
                  />
                  <span className="text-[11px] font-mono text-[#6B5F52] bg-[#E8DFD2]/40 px-2 py-1 rounded">
                    {item.file}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#6B5F52] hover:bg-[#FBF7F0] disabled:opacity-30"
                      title="Kala hor mar (Up)"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === toc.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      className="p-1.5 rounded-lg border border-[#E8DFD2] text-[#6B5F52] hover:bg-[#FBF7F0] disabled:opacity-30"
                      title="Kala hor mar (Down)"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                      title="Tirtir cutubkan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 flex justify-between items-center">
            <button
              type="button"
              onClick={handleAddChapter}
              className="btn btn-secondary btn-sm"
            >
              <Plus className="w-3.5 h-3.5" /> Ku dar Cutub Cusub
            </button>

            <button
              type="button"
              disabled={isReingesting}
              onClick={handleReingest}
              className="btn btn-ghost btn-sm text-[#7A1F2B] hover:bg-red-50"
              title="Dib u habee HTML cutubyada si hababka dark mode u shaqeeyaan"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isReingesting ? "animate-spin" : ""}`} />
              {isReingesting ? "Nadiifinaya HTML..." : "Re-ingest Clean HTML"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#E8DFD2] px-6 py-4 bg-[#FBF7F0]">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary btn-sm"
          >
            Ka noqo
          </button>
          <button
            type="button"
            disabled={isPending || loading}
            onClick={handleSaveToc}
            className="btn btn-primary btn-sm"
          >
            <Save className="w-4 h-4" />
            {isPending ? "Kaydinaya..." : "Kaydi TOC"}
          </button>
        </div>
      </div>
    </div>
  );
}
