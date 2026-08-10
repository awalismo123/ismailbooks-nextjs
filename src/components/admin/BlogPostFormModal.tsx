"use client";

import React, { useState } from "react";
import { X, Sparkles, Image as ImageIcon, Globe, FileText, ChevronDown, ChevronUp, Upload, Sun, Moon } from "lucide-react";
import TinyMCEBlogEditor from "./TinyMCEBlogEditor";
import { saveBlogPostAction } from "@/app/actions/admin";

export type BlogPostItem = {
  id: number;
  title: string;
  slug: string;
  status: string;
  view_count: number;
  date: string;
  category: string;
  category_id: number | null;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
};

export type BlogCategoryItem = {
  id: number;
  name: string;
  slug: string;
};

interface BlogPostFormModalProps {
  post: BlogPostItem | null;
  categories: BlogCategoryItem[];
  onClose: () => void;
  onSaved: () => void;
  onOpenCategoryManager?: () => void;
}

export default function BlogPostFormModal({
  post,
  categories,
  onClose,
  onSaved,
  onOpenCategoryManager,
}: BlogPostFormModalProps) {
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

  // File Upload Handler for picking image from computer
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

    onSaved();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`rounded-2xl shadow-2xl w-full max-w-4xl my-6 overflow-hidden border transition-colors duration-200 ${
          darkMode
            ? "bg-[#161E27] text-[#E7E9EA] border-[#2F3336]"
            : "bg-white text-[#201B16] border-[#E8DFD2]"
        } animate-in fade-in zoom-in-95`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            darkMode ? "bg-[#1A232D] border-[#2F3336]" : "bg-[#FCFAF6] border-[#E8DFD2]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7A1F2B] text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-extrabold m-0">
                {post ? "Wax ka beddel Qoraalka Blog" : "Abuur Qoraal Cusub (Blog)"}
              </h2>
              <p className={`text-xs m-0 ${darkMode ? "text-gray-400" : "text-[#6B5F52]"}`}>
                TinyMCE word editor rich text creator.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-colors ${
                darkMode
                  ? "bg-[#253341] border-[#38444D] text-yellow-400 hover:bg-[#2C3846]"
                  : "bg-white border-[#E8DFD2] text-[#1F3A54] hover:bg-[#FBF7F0]"
              }`}
              title="Beddel Nooca Theme-ka (Light / Dark)"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ${
                darkMode ? "text-gray-400 hover:bg-[#253341]" : "text-[#6B5F52] hover:bg-[#F7F1E5]"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Form Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold">
              {error}
            </div>
          )}

          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-extrabold">Cinwaanka Qoraalka (Title) *</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Qor cinwaanka qoraalka..."
                className={`input-field w-full text-sm font-bold ${
                  darkMode ? "!bg-[#192734] !border-[#38444D] !text-white" : ""
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold">Slug (URL Path)</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated-slug"
                className={`input-field w-full text-xs font-mono text-[#8A5A00] ${
                  darkMode ? "!bg-[#192734] !border-[#38444D] !text-yellow-400" : ""
                }`}
              />
            </div>
          </div>

          {/* Category, Status, Featured Image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold">Qeybta (Category)</label>
                {onOpenCategoryManager && (
                  <button
                    type="button"
                    onClick={onOpenCategoryManager}
                    className="text-[10px] text-[#7A1F2B] font-bold hover:underline"
                  >
                    + Qeyb Cusub
                  </button>
                )}
              </div>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={`input-field w-full text-xs ${
                  darkMode ? "!bg-[#192734] !border-[#38444D] !text-white" : ""
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

            <div className="space-y-1">
              <label className="text-xs font-extrabold">Xaaladda (Status)</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`input-field w-full text-xs ${
                  darkMode ? "!bg-[#192734] !border-[#38444D] !text-white" : ""
                }`}
              >
                <option value="published">Daabacan (Published)</option>
                <option value="draft">Qabad (Draft)</option>
              </select>
            </div>

            {/* Featured Image Picker & Upload */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold flex items-center justify-between">
                <span>Sawirka Qoraalka</span>
                <span className="text-[10px] text-gray-400 font-normal">URL ama File</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="URL ama ka soo dooro computer-ka..."
                  className={`input-field flex-1 text-xs ${
                    darkMode ? "!bg-[#192734] !border-[#38444D] !text-white" : ""
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
          </div>

          {/* Featured Image Thumbnail Preview */}
          {featuredImage && (
            <div className="flex items-center gap-3 p-2.5 rounded-xl border border-[#E8DFD2] bg-[#FBF7F0]/40">
              <div className="w-16 h-12 rounded-lg overflow-hidden border border-[#E8DFD2] shrink-0 bg-black/5">
                <img
                  src={featuredImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold m-0 truncate">Sawirka waa la habeeyay</p>
                <p className="text-[10px] text-gray-500 m-0 truncate">{featuredImage.slice(0, 60)}...</p>
              </div>
              <button
                type="button"
                onClick={() => setFeaturedImage("")}
                className="text-xs text-red-500 font-bold hover:underline"
              >
                Tirtir
              </button>
            </div>
          )}

          {/* Excerpt */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold">Excerpt (Sharaxaad Kooban)</label>
              <span className="text-[10px] text-gray-400 font-mono">
                {excerpt.length} / 160 xaraf
              </span>
            </div>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Sharaxaad gaaban oo muuqanaysa bogga blogs-ka..."
              className={`input-field w-full text-xs ${
                darkMode ? "!bg-[#192734] !border-[#38444D] !text-white" : ""
              }`}
            />
          </div>

          {/* SEO Collapsible Section */}
          <div
            className={`border rounded-xl overflow-hidden transition-colors ${
              darkMode ? "border-[#2F3336] bg-[#192734]" : "border-[#E8DFD2] bg-[#FCFAF6]"
            }`}
          >
            <button
              type="button"
              onClick={() => setShowSeo(!showSeo)}
              className="w-full px-4 py-3 flex items-center justify-between text-xs font-extrabold hover:opacity-80 transition-opacity"
            >
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#7A1F2B]" /> SEO Meta Tags (Google Search)
              </span>
              {showSeo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showSeo && (
              <div
                className={`p-4 border-t space-y-3 ${
                  darkMode ? "border-[#2F3336] bg-[#161E27]" : "border-[#E8DFD2] bg-white"
                }`}
              >
                <div className="space-y-1">
                  <label className="text-[11px] font-bold">Meta Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Meta Title for Google Search..."
                    className={`input-field w-full text-xs ${
                      darkMode ? "!bg-[#192734] !border-[#38444D] !text-white" : ""
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold">Meta Description</label>
                  <textarea
                    rows={2}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Meta Description for Google Search..."
                    className={`input-field w-full text-xs ${
                      darkMode ? "!bg-[#192734] !border-[#38444D] !text-white" : ""
                    }`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* TinyMCE Editor Section */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#7A1F2B]" /> Qoraalka Qoraalka (TinyMCE Word Writer) *
            </label>
            <TinyMCEBlogEditor
              value={content}
              onChange={(newContent) => setContent(newContent)}
              height={400}
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-t ${
            darkMode ? "bg-[#1A232D] border-[#2F3336]" : "bg-[#FCFAF6] border-[#E8DFD2]"
          }`}
        >
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            Ka noqo
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary btn-sm disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : post ? (
              "Baqiiji Beddelka"
            ) : (
              "Daabac / Keydi Qoraalka"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
