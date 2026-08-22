"use client";

import React, { useState, useRef, useTransition } from "react";
import { X, Upload, BookOpen, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { saveSummaryAction } from "@/app/actions/admin";
import { createClient } from "@/lib/supabase/client";

export type EditableSummary = {
  id: number | string;
  title: string;
  book_title: string | null;
  book_author: string | null;
  summary_creator: string | null;
  description: string | null;
  content_html: string;
  cover_image: string | null;
  is_paid: boolean;
  price: string;
  pages: number | null;
  category: string | null;
  reading_time_minutes: number | null;
  is_published: boolean;
  file_link?: string | null;
};

const CATEGORIES = [
  "Cilmi-Nafsiga", "Falsafadda", "Taariikhda",
  "Horumar Shaqsiyeed", "Diinta", "Dhaqanka",
  "Ganacsiga", "Xisaabta", "Saynis", "Kale",
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

export default function SummaryFormModal({
  summary, onClose, onSaved,
}: {
  summary: EditableSummary | null;
  onClose: () => void;
  onSaved?: () => void;
}) {
  const isEdit = !!summary;
  const [isPending, startTransition] = useTransition();

  // Fields
  const [title, setTitle] = useState(summary?.title ?? "");
  const [bookTitle, setBookTitle] = useState(summary?.book_title ?? "");
  const [bookAuthor, setBookAuthor] = useState(summary?.book_author ?? "");
  const [creator, setCreator] = useState(summary?.summary_creator ?? "Ismail Abdi");
  const [category, setCategory] = useState(summary?.category ?? "");
  const [description, setDescription] = useState(summary?.description ?? "");
  const [content, setContent] = useState(summary?.content_html ?? "");
  const [isPaid, setIsPaid] = useState(summary?.is_paid ?? false);
  const [isPublished, setIsPublished] = useState(summary?.is_published ?? true);
  const [price, setPrice] = useState(summary?.price ?? "0");
  const [pages, setPages] = useState(summary?.pages ? String(summary.pages) : "15");
  const [readingTime, setReadingTime] = useState(
    summary?.reading_time_minutes ? String(summary.reading_time_minutes) : "5"
  );

  const [coverPreview, setCoverPreview] = useState<string | null>(summary?.cover_image ?? null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);

  const [summaryFileName, setSummaryFileName] = useState<string | null>(null);
  const [summaryFile, setSummaryFile] = useState<File | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const summaryFileRef = useRef<HTMLInputElement>(null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setCoverFile(f);
      setCoverPreview(URL.createObjectURL(f));
    }
  };

  const handleSummaryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setSummaryFile(f);
      setSummaryFileName(f.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccess(false);

    if (!title.trim() || (!content.trim() && !summaryFile && !summary?.file_link)) {
      setErrorMsg("Cinwaanka iyo qoraalka (ama faylka soo-koobka) waa lagama maarmaan.");
      return;
    }

    startTransition(async () => {
      let coverImagePath: string | null = coverPreview;

      // Upload cover to Supabase storage if a new file was selected
      if (coverFile) {
        setUploadingCover(true);
        try {
          const supabase = createClient();
          const ext = coverFile.name.split(".").pop() || "jpg";
          const path = `summaries/${Date.now()}.${ext}`;
          const { error: uploadErr } = await supabase.storage
            .from("covers")
            .upload(path, coverFile, { upsert: true });
          if (!uploadErr) {
            const { data: pub } = supabase.storage.from("covers").getPublicUrl(path);
            coverImagePath = pub.publicUrl;
          }
        } finally {
          setUploadingCover(false);
        }
      }

      const fd = new FormData();
      if (summary?.id) fd.append("id", String(summary.id));
      fd.append("title", title);
      fd.append("book_title", bookTitle);
      fd.append("book_author", bookAuthor);
      fd.append("summary_creator", creator);
      fd.append("category", category);
      fd.append("description", description);
      fd.append("content_html", content);
      fd.append("is_paid", String(isPaid));
      fd.append("is_published", String(isPublished));
      fd.append("price", price);
      fd.append("pages", pages);
      fd.append("reading_time_minutes", readingTime);
      fd.append("cover_image", coverImagePath ?? "");
      if (summaryFile) {
        fd.append("summaryFile", summaryFile);
      }

      const result = await saveSummaryAction(fd);
      if ((result as any)?.error) {
        setErrorMsg((result as any).error);
      } else {
        setSuccess(true);
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
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#E8DFD2] bg-[#FBF7F0] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E8DFD2] bg-[#FBF7F0]/95 px-6 py-4 backdrop-blur">
          <h3 className="m-0 flex items-center gap-2 font-display text-xl font-extrabold text-[#201B16]">
            <BookOpen className="h-5 w-5 text-[#7A1F2B]" />
            {isEdit ? "Wax ka beddel Soo-koobka" : "Soo-koob Cusub"}
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
            {isEdit ? "Isbeddelada waa la kaydiyay!" : "Soo-koobka waa la daabacay!"}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_240px]">
          {/* ── Left: fields ── */}
          <div className="space-y-4">
            {/* Title */}
            <div className="field !m-0">
              <label htmlFor="sm-title">Cinwaanka Soo-koobka *</label>
              <input
                id="sm-title" required
                value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="Cinwaanka soo-koobka..."
              />
            </div>

            {/* Book title + Author */}
            <div className="grid grid-cols-2 gap-4">
              <div className="field !m-0">
                <label htmlFor="sm-book-title">Magaca Buugga Asalka ah</label>
                <input
                  id="sm-book-title"
                  value={bookTitle} onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Magaca buugga..."
                />
              </div>
              <div className="field !m-0">
                <label htmlFor="sm-book-author">Qoraaga Buugga</label>
                <input
                  id="sm-book-author"
                  value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)}
                  placeholder="Magaca qoraaga..."
                />
              </div>
            </div>

            {/* Creator + Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="field !m-0">
                <label htmlFor="sm-creator">Sameeyaha Soo-koobka</label>
                <input
                  id="sm-creator"
                  value={creator} onChange={(e) => setCreator(e.target.value)}
                />
              </div>
              <div className="field !m-0">
                <label htmlFor="sm-category">Qeybta</label>
                <input
                  id="sm-category" list="sm-cats"
                  value={category} onChange={(e) => setCategory(e.target.value)}
                  placeholder="Dooro qeyb"
                />
                <datalist id="sm-cats">
                  {CATEGORIES.map((c) => <option key={c} value={c} />)}
                </datalist>
              </div>
            </div>

            {/* Pages + Reading time + Price */}
            <div className="grid grid-cols-3 gap-4">
              <div className="field !m-0">
                <label htmlFor="sm-pages">Bogagga</label>
                <input
                  id="sm-pages" type="number" min="0"
                  value={pages} onChange={(e) => setPages(e.target.value)}
                />
              </div>
              <div className="field !m-0">
                <label htmlFor="sm-time">Daqiiqo Akhriska</label>
                <input
                  id="sm-time" type="number" min="1"
                  value={readingTime} onChange={(e) => setReadingTime(e.target.value)}
                />
              </div>
              <div className="field !m-0">
                <label htmlFor="sm-price">Qiimaha (USD $)</label>
                <input
                  id="sm-price" type="number" min="0"
                  value={price} onChange={(e) => setPrice(e.target.value)}
                  disabled={!isPaid}
                  className={!isPaid ? "opacity-50" : ""}
                />
              </div>
            </div>

            {/* Description */}
            <div className="field !m-0">
              <label htmlFor="sm-desc">Sharaxaadda (Description)</label>
              <textarea
                id="sm-desc" rows={2}
                value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Faahfaahin kooban..."
              />
            </div>

            {/* ── Document File Upload ── */}
            <div className="field !m-0">
              <label className="flex items-center gap-1.5 mb-1.5">
                <FileText className="h-4 w-4 text-[#7A1F2B]" />
                <span>Soo rar Buugga Soo-koobka (DOCX, EPUB, PDF, TXT) — Ikhtiyaari</span>
              </label>
              <input
                ref={summaryFileRef}
                name="summaryFile"
                type="file"
                accept=".docx,.pdf,.epub,.txt,.html"
                onChange={handleSummaryFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => summaryFileRef.current?.click()}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-dashed border-[#1F3A54]/40 bg-[#F7FAFD] p-3 text-left transition-colors hover:border-[#1F3A54]"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Upload className="h-4 w-4 shrink-0 text-[#1F3A54]" />
                  <span className="truncate text-xs font-bold text-[#201B16]">
                    {summaryFileName ? summaryFileName : summary?.file_link ? "Fayl waa diyaar, beddel hadaad rabtid" : "Dooro DOCX / EPUB / PDF"}
                  </span>
                </div>
                <span className="shrink-0 rounded-lg bg-[#1F3A54] px-2.5 py-1 text-[10px] font-extrabold text-white">
                  {summaryFileName ? "Beddel" : "Soo rar"}
                </span>
              </button>
            </div>

            {/* Content HTML */}
            <div className="field !m-0">
              <label htmlFor="sm-content" className="flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-[#7A1F2B]" />
                Qoraalka Soo-koobka (Haddii aadan soo rogin fayl, halkan ku qor)
              </label>
              <textarea
                id="sm-content" rows={14}
                value={content} onChange={(e) => setContent(e.target.value)}
                placeholder="<h2>Fasal 1</h2><p>Qoraalka...</p>"
                className="font-mono text-sm"
                style={{ minHeight: 280 }}
              />
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Toggle
                on={isPaid} onChange={setIsPaid}
                label="Premium / Lacag leh"
                sub={isPaid ? "Waa la iibinayaa" : "Waa bilaash"}
                activeColor="#C9962E"
              />
              <Toggle
                on={isPublished} onChange={setIsPublished}
                label="La daabacay"
                sub={isPublished ? "Wuxuu ka muuqdaa goobta" : "Waa qarsoon yahay"}
                activeColor="#2E7D5B"
              />
            </div>
          </div>

          {/* ── Right: live cover preview ── */}
          <div className="space-y-3">
            <p className="m-0 text-[11px] font-extrabold uppercase tracking-widest text-[#6B5F52]">
              Galka Soo-koobka (Cover)
            </p>
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-[#E8DFD2] shadow-md">
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="cover-gradient-3 absolute inset-0 flex flex-col justify-between p-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">IsmailBooks</span>
                  <p className="font-display line-clamp-3 text-base font-bold leading-snug text-white">
                    {title || "Cinwaanka soo-koobka"}
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

            <input ref={fileRef} name="cover" type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()} className="btn btn-secondary btn-sm btn-block">
              <Upload className="h-4 w-4" />
              {coverPreview ? "Beddel Cover-ka" : "Soo rar Cover"}
            </button>
            {uploadingCover && (
              <p className="text-center text-xs font-bold text-[#C9962E]">
                Cover-ka waa la soo raraa...
              </p>
            )}
          </div>

          {/* ── Footer ── */}
          <div className="flex items-center justify-end gap-3 border-t border-[#E8DFD2] pt-4 md:col-span-2">
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">Ka noqo</button>
            <button
              type="submit"
              disabled={isPending || success || uploadingCover}
              className={`btn btn-primary ${isPending || success ? "pointer-events-none opacity-70" : ""}`}
            >
              {isPending ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              ) : success ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <BookOpen className="h-4 w-4" />
              )}
              {isPending ? "La kaydiyaa..." : isEdit ? "Kaydi Isbeddelada" : "Daabac Soo-koobka"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
