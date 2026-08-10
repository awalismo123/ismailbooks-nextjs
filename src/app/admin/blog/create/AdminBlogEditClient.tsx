"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Globe, FileText, ChevronDown, ChevronUp, Image as ImageIcon, Upload, Sun, Moon, X } from "lucide-react";
import TinyMCEBlogEditor from "@/components/admin/TinyMCEBlogEditor";
import { saveBlogPostAction } from "@/app/actions/admin";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface PostData {
  id?: number;
  title: string;
  slug: string;
  status: string;
  category_id: number | null;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export default function AdminBlogEditClient({
  post,
  categories,
}: {
  post: PostData | null;
  categories: Category[];
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showSeo, setShowSeo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [categoryId, setCategoryId] = useState<string>(
    post?.category_id ? String(post.category_id) : categories[0]?.id ? String(categories[0].id) : ""
  );
  const [status, setStatus] = useState<string>(post?.status ?? "published");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image ?? "");
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? "");
  const [content, setContent] = useState(post?.content ?? "");

  // File Upload Handler for computer file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Fadlan dooro sawir sax ah (PNG, JPG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFeaturedImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!post?.id) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .slice(0, 100)
      );
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Fadlan geli cinwaanka qoraalka.");
      return;
    }
    if (!content.trim()) {
      setError("Fadlan qor nuxurka qoraalka (content).");
      return;
    }

    setSaving(true);
    setError("");

    const fd = new FormData();
    if (post?.id) fd.append("id", String(post.id));
    fd.append("title", title);
    fd.append("slug", slug);
    fd.append("category_id", categoryId);
    fd.append("status", status);
    fd.append("excerpt", excerpt);
    fd.append("featured_image", featuredImage);
    fd.append("meta_title", metaTitle);
    fd.append("meta_description", metaDescription);
    fd.append("content", content);

    const res = await saveBlogPostAction(fd);
    setSaving(false);

    if (res?.error) {
      setError(res.error);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 p-4 sm:p-8 ${
        darkMode ? "bg-[#0D1117] text-[#E7E9EA]" : "bg-[#F7F4EF] text-[#201B16]"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className={`p-2 rounded-xl border transition-colors ${
                darkMode
                  ? "bg-[#161B22] border-[#30363D] text-white hover:bg-[#21262D]"
                  : "bg-white border-[#E8DFD2] text-[#1F3A54] hover:bg-[#FBF7F0]"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-display text-2xl font-extrabold m-0">
                {post ? "Wax ka beddel Qoraalka" : "Qoraal Cusub"}
              </h1>
              <p className={`text-xs m-0 ${darkMode ? "text-gray-400" : "text-[#6B5F52]"}`}>
                {post ? "Beddel nuxurka qoraalka" : "Abuur qoraal cusub oo blog ah"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-colors ${
                darkMode
                  ? "bg-[#21262D] border-[#30363D] text-yellow-400 hover:bg-[#30363D]"
                  : "bg-white border-[#E8DFD2] text-[#1F3A54] hover:bg-[#FBF7F0]"
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {darkMode ? "Light Theme" : "Dark Theme"}
            </button>

            <Link href="/admin" className="btn btn-ghost btn-sm">
              Ka noqo
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn btn-primary btn-sm disabled:opacity-50"
            >
              {saving ? "Waa la kaydinayaa..." : post ? "Keydi Beddelka" : "🚀 Daabac Qoraalka"}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold">
            {error}
          </div>
        )}

        {/* 2 Column Layout matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Left Column (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div
              className={`surface-card !p-6 space-y-5 border transition-colors ${
                darkMode ? "!bg-[#161B22] border-[#30363D]" : ""
              }`}
            >
              <h3 className="font-display text-base font-extrabold m-0 pb-3 border-b border-[#E8DFD2]/40">
                Nuxurka Qoraalka
              </h3>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold">Cinwaanka *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Qor cinwaanka qoraalka..."
                    className={`input-field w-full text-sm font-bold ${
                      darkMode ? "!bg-[#0D1117] !border-[#30363D] !text-white" : ""
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-extrabold">Slug (URL)</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="auto-generated from title"
                    className={`input-field w-full text-xs font-mono text-[#8A5A00] ${
                      darkMode ? "!bg-[#0D1117] !border-[#30363D] !text-yellow-400" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold">Excerpt (Sharaxaad kooban)</label>
                  <span className="text-[10px] text-gray-400 font-mono">{excerpt.length} / 160</span>
                </div>
                <textarea
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Sharaxaad gaaban oo SEO-friendly ah (160 xaraf ama ka yar)..."
                  className={`input-field w-full text-xs ${
                    darkMode ? "!bg-[#0D1117] !border-[#30363D] !text-white" : ""
                  }`}
                />
              </div>

              {/* TinyMCE Rich Text Content */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#7A1F2B]" /> Content (Nuxurka TinyMCE) *
                </label>
                <TinyMCEBlogEditor
                  value={content}
                  onChange={(newContent) => setContent(newContent)}
                  height={450}
                  darkMode={darkMode}
                />
              </div>
            </div>

            {/* SEO Section */}
            <div
              className={`surface-card !p-6 space-y-4 border transition-colors ${
                darkMode ? "!bg-[#161B22] border-[#30363D]" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setShowSeo(!showSeo)}
                className="w-full flex items-center justify-between text-sm font-extrabold"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#7A1F2B]" /> SEO Meta Tags (Google Search)
                </span>
                {showSeo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showSeo && (
                <div className="space-y-4 pt-3 border-t border-[#E8DFD2]/40">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400">Meta Title</label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="Meta Title for Google..."
                      className={`input-field w-full text-xs ${
                        darkMode ? "!bg-[#0D1117] !border-[#30363D] !text-white" : ""
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400">Meta Description</label>
                    <textarea
                      rows={2}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="Meta Description for Google..."
                      className={`input-field w-full text-xs ${
                        darkMode ? "!bg-[#0D1117] !border-[#30363D] !text-white" : ""
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Right Column */}
          <div className="space-y-6">
            {/* Publishing Box */}
            <div
              className={`surface-card !p-6 space-y-4 border transition-colors ${
                darkMode ? "!bg-[#161B22] border-[#30363D]" : ""
              }`}
            >
              <h3 className="font-display text-base font-extrabold m-0 pb-3 border-b border-[#E8DFD2]/40">
                Daabacaadda
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-extrabold">Xaaladda (Status)</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={`input-field w-full text-xs ${
                    darkMode ? "!bg-[#0D1117] !border-[#30363D] !text-white" : ""
                  }`}
                >
                  <option value="published">Daabacan (Published)</option>
                  <option value="draft">Qabad (Draft)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold">Qeybta (Category)</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={`input-field w-full text-xs ${
                    darkMode ? "!bg-[#0D1117] !border-[#30363D] !text-white" : ""
                  }`}
                >
                  <option value="">Dooro Qeybta...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="btn btn-primary w-full btn-sm mt-2 disabled:opacity-50"
              >
                {saving ? "Waa la kaydinayaa..." : "🚀 Daabac Qoraalka"}
              </button>
            </div>

            {/* Featured Image Box with Computer File Picker */}
            <div
              className={`surface-card !p-6 space-y-4 border transition-colors ${
                darkMode ? "!bg-[#161B22] border-[#30363D]" : ""
              }`}
            >
              <h3 className="font-display text-base font-extrabold m-0 pb-3 border-b border-[#E8DFD2]/40">
                Featured Image
              </h3>
              <div className="space-y-2">
                <label className="text-xs font-bold flex items-center justify-between">
                  <span>Sawirka Qoraalka</span>
                  <span className="text-[10px] text-gray-400">URL ama File</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="URL ama ka soo dooro computer-ka..."
                    className={`input-field flex-1 text-xs ${
                      darkMode ? "!bg-[#0D1117] !border-[#30363D] !text-white" : ""
                    }`}
                  />
                  <label className="btn btn-secondary btn-xs cursor-pointer shrink-0 flex items-center gap-1">
                    <Upload className="w-3 h-3" /> Select
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {featuredImage ? (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-[#E8DFD2]/40 group">
                  <img
                    src={featuredImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFeaturedImage("")}
                    className="absolute top-2 right-2 p-1 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Tirtir Sawirka"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="aspect-video rounded-xl border-2 border-dashed border-[#E8DFD2]/40 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-[#7A1F2B] transition-colors">
                  <Upload className="w-8 h-8 opacity-40 mb-1" />
                  <span className="text-xs font-bold text-[#7A1F2B]">Ka dooro Computer-ka</span>
                  <span className="text-[10px] opacity-70">PNG, JPG, WEBP</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
