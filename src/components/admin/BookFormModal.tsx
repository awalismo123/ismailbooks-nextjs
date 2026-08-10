"use client";

import React, { useState, useRef, useTransition } from "react";
import { X, Upload, BookOpen, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { saveBookAction } from "@/app/actions/books";

export type EditableBook = {
  id: number | string;
  title: string;
  author: string;
  is_paid: boolean;
  priceRaw: number;
  pages: number;
  is_active: boolean;
  category: string | null;
  description: string | null;
  coverUrl: string | null;
};

const CATEGORIES = [
  "Cilmi-Nafsiga", "Falsafadda", "Taariikhda",
  "Horumar Shaqsiyeed", "Diinta", "Dhaqanka",
];

function Toggle({
  on, onChange, label, sub, activeColor,
}: {
  on: boolean; onChange: (v: boolean) => void;
  label: string; sub: string; activeColor: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#E8DFD2] bg-white p-3 text-left transition-colors hover:border-[#1F3A54]/40"
    >
      <span>
        <span className="block text-sm font-extrabold text-[#201B16]">{label}</span>
        <span className="block text-[11px] text-[#6B5F52]">{sub}</span>
      </span>
      <span
        className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
        style={{ backgroundColor: on ? activeColor : "#E8DFD2" }}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`}
        />
      </span>
    </button>
  );
}

export default function BookFormModal({
  book, onClose, onSaved,
}: {
  book: EditableBook | null;
  onClose: () => void;
  onSaved?: () => void;
}) {
  const isEdit = !!book;
  const [isPending, startTransition] = useTransition();
  const [isPaid, setIsPaid] = useState(book?.is_paid ?? true);
  const [isActive, setIsActive] = useState(book?.is_active ?? true);
  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [category, setCategory] = useState(book?.category ?? "");
  const [description, setDescription] = useState(book?.description ?? "");
  const [priceRaw, setPriceRaw] = useState(String(book?.priceRaw ?? 0));
  const [pages, setPages] = useState(String(book?.pages ?? 0));
  const [coverPreview, setCoverPreview] = useState<string | null>(book?.coverUrl ?? null);
  const [bookFileName, setBookFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const bookFileRef = useRef<HTMLInputElement>(null);

  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setCoverPreview(URL.createObjectURL(f));
  };

  const handleBookFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setBookFileName(f.name);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccess(false);

    const fd = new FormData(e.currentTarget);
    // Inject controlled state values that aren't standard inputs
    fd.set("is_paid", String(isPaid));
    fd.set("is_active", String(isActive));

    startTransition(async () => {
      const result = await saveBookAction(fd);
      if (result?.error) {
        setErrorMsg(result.error);
      } else {
        setSuccess(true);
        // Notify parent to refresh data, then close
        setTimeout(() => {
          if (onSaved) onSaved();
          else onClose();
        }, 800);
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#201B16]/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#E8DFD2] bg-[#FBF7F0] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E8DFD2] bg-[#FBF7F0]/95 px-6 py-4 backdrop-blur">
          <h3 className="m-0 flex items-center gap-2 font-display text-xl font-extrabold text-[#201B16]">
            <BookOpen className="h-5 w-5 text-[#7A1F2B]" />
            {isEdit ? "Wax ka beddel Buugga" : "Ku dar Buug Cusub"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8DFD2] bg-white text-[#6B5F52] transition-colors hover:border-[#B3261E]/40 hover:text-[#B3261E]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Error / Success banners */}
        {errorMsg && (
          <div className="mx-6 mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMsg}
          </div>
        )}
        {success && (
          <div className="mx-6 mt-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {isEdit ? "Isbeddelada waa la kaydiyay!" : "Buugga waa la daabacay!"}
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_240px]"
        >
          <input type="hidden" name="bookId" value={book?.id ?? ""} />

          {/* ── Left: fields ── */}
          <div className="space-y-4">
            <div className="field !m-0">
              <label htmlFor="bk-title">Cinwaanka Buugga *</label>
              <input
                id="bk-title" name="title" required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tusaale: Nafsadda iyo Falsafadda"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="field !m-0">
                <label htmlFor="bk-author">Qoraaga</label>
                <input
                  id="bk-author" name="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Magaca qoraaga"
                />
              </div>
              <div className="field !m-0">
                <label htmlFor="bk-category">Qeybta</label>
                <input
                  id="bk-category" name="category"
                  list="bk-cats"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Dooro qeyb"
                />
                <datalist id="bk-cats">
                  {CATEGORIES.map((c) => <option key={c} value={c} />)}
                </datalist>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="field !m-0">
                <label htmlFor="bk-price">Qiimaha (USD $)</label>
                <input
                  id="bk-price" name="price" type="number" min="0"
                  value={priceRaw}
                  onChange={(e) => setPriceRaw(e.target.value)}
                  disabled={!isPaid}
                  className={!isPaid ? "opacity-50" : ""}
                />
              </div>
              <div className="field !m-0">
                <label htmlFor="bk-pages">Tirada Bogagga</label>
                <input
                  id="bk-pages" name="pages" type="number" min="0"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                />
              </div>
            </div>

            <div className="field !m-0">
              <label htmlFor="bk-desc">Sharaxaadda</label>
              <textarea
                id="bk-desc" name="description" rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Sharaxaad kooban oo buugga ah..."
                style={{ minHeight: 90 }}
              />
            </div>

            {/* ── Document File Upload ── */}
            <div className="field !m-0">
              <label className="flex items-center gap-1.5 mb-1.5">
                <FileText className="h-4 w-4 text-[#7A1F2B]" />
                <span>Soo rar Buugga (DOCX, EPUB, PDF, TXT) — Ingestion Otomaatig ah</span>
              </label>
              <input
                ref={bookFileRef}
                name="bookFile"
                type="file"
                accept=".docx,.pdf,.epub,.txt,.html"
                onChange={handleBookFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => bookFileRef.current?.click()}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-dashed border-[#1F3A54]/40 bg-[#F7FAFD] p-3 text-left transition-colors hover:border-[#1F3A54]"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Upload className="h-4 w-4 shrink-0 text-[#1F3A54]" />
                  <span className="truncate text-xs font-bold text-[#201B16]">
                    {bookFileName ? bookFileName : "Dooro ama hoos ku soo daadhuux DOCX / EPUB / PDF"}
                  </span>
                </div>
                <span className="shrink-0 rounded-lg bg-[#1F3A54] px-2.5 py-1 text-[10px] font-extrabold text-white">
                  {bookFileName ? "Beddel" : "Soo rar"}
                </span>
              </button>
              <p className="mt-1 text-[11px] text-[#6B5F52]">
                Tip: DOCX iyo EPUB waxay bixiyaan cutubyo iyo habayn akhris oo 100% nadiif ah!
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Toggle
                on={isPaid} onChange={setIsPaid}
                label="Premium / Lacag leh"
                sub={isPaid ? "Waa la iibinayaa" : "Waa bilaash"}
                activeColor="#C9962E"
              />
              <Toggle
                on={isActive} onChange={setIsActive}
                label="La daabacay"
                sub={isActive ? "Wuxuu ka muuqdaa goobta" : "Waa qarsoon yahay"}
                activeColor="#2E7D5B"
              />
            </div>
          </div>

          {/* ── Right: live cover preview ── */}
          <div className="space-y-3">
            <p className="m-0 text-[11px] font-extrabold uppercase tracking-widest text-[#6B5F52]">
              Galka Buugga (Cover)
            </p>
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-[#E8DFD2] shadow-md">
              {coverPreview ? (
                <img src={coverPreview} alt="Cover preview" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="cover-gradient-2 absolute inset-0 flex flex-col justify-between p-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">IsmailBooks</span>
                  <p className="font-display line-clamp-3 text-base font-bold leading-snug text-white">
                    {title || "Cinwaanka buugga"}
                  </p>
                </div>
              )}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/25 to-transparent" />
              <span
                className={`absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase ${
                  isPaid ? "bg-[#C9962E] text-[#201B16]" : "bg-[#2E7D5B] text-white"
                }`}
              >
                {isPaid ? "Premium" : "Bilaash"}
              </span>
            </div>

            <input ref={fileRef} name="cover" type="file" accept="image/*" onChange={handleCover} className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()} className="btn btn-secondary btn-sm btn-block">
              <Upload className="h-4 w-4" />
              {coverPreview ? "Beddel Cover-ka" : "Soo rar Cover"}
            </button>
          </div>

          {/* ── Footer ── */}
          <div className="flex items-center justify-end gap-3 border-t border-[#E8DFD2] pt-4 md:col-span-2">
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">Ka noqo</button>
            <button
              type="submit"
              disabled={isPending || success}
              className={`btn btn-primary ${isPending || success ? "pointer-events-none opacity-70" : ""}`}
            >
              {isPending ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              ) : success ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <BookOpen className="h-4 w-4" />
              )}
              {isPending ? "La kaydiyaa..." : isEdit ? "Kaydi Isbeddelada" : "Daabac Buugga"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}