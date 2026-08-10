"use client";

import React, { useState } from "react";
import { X, Plus, Trash2, Tag } from "lucide-react";
import { saveBlogCategoryAction, deleteBlogCategoryAction } from "@/app/actions/admin";

export type CategoryItem = {
  id: number;
  name: string;
  slug: string;
};

interface BlogCategoryModalProps {
  categories: CategoryItem[];
  onClose: () => void;
  onSaved: () => void;
}

export default function BlogCategoryModal({
  categories,
  onClose,
  onSaved,
}: BlogCategoryModalProps) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleAdd = async () => {
    if (!name.trim()) return;
    setSaving(true);
    setError("");

    const fd = new FormData();
    fd.append("name", name);
    const res = await saveBlogCategoryAction(fd);
    setSaving(false);

    if (res?.error) {
      setError(res.error);
      return;
    }

    setName("");
    onSaved();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Ma hubtaa inaad tirtirto qeybtan?")) return;
    setDeletingId(id);
    const fd = new FormData();
    fd.append("id", String(id));
    await deleteBlogCategoryAction(fd);
    setDeletingId(null);
    onSaved();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md my-8 overflow-hidden border border-[#E8DFD2] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DFD2] bg-[#FCFAF6]">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#7A1F2B]" />
            <h2 className="font-display text-base font-extrabold text-[#201B16] m-0">
              Maamulka Qeybaha Blog-ga
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B5F52] hover:bg-[#F7F1E5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-bold">
              {error}
            </div>
          )}

          {/* Add Category Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Magaca qeybta cusub (tusaale: Tiknoolajiyada)..."
              className="input-field flex-1 text-xs"
            />
            <button
              disabled={saving || !name.trim()}
              onClick={handleAdd}
              className="btn btn-primary btn-sm shrink-0 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" /> Ku dar
            </button>
          </div>

          {/* Categories List */}
          <div className="space-y-2 max-h-60 overflow-y-auto pt-2 border-t border-[#E8DFD2]">
            <span className="text-[10px] font-extrabold text-[#6B5F52] uppercase tracking-wider block">
              Qeybaha Hadda Jira ({categories.length})
            </span>
            {categories.length === 0 ? (
              <p className="text-xs text-[#6B5F52] text-center py-4">
                Wali wax qeyb ah ma jiraan.
              </p>
            ) : (
              categories.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#FBF7F0]/60 border border-[#E8DFD2]"
                >
                  <span className="text-xs font-bold text-[#201B16]">{c.name}</span>
                  <button
                    disabled={deletingId === c.id}
                    onClick={() => handleDelete(c.id)}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-3 border-t border-[#E8DFD2] bg-[#FCFAF6]">
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            Xir
          </button>
        </div>
      </div>
    </div>
  );
}
