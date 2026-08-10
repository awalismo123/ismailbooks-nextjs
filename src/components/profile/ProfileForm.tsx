"use client";

import { useState } from "react";
import { updateProfileAction } from "@/app/actions/profile";

export default function ProfileForm({ initialProfile }: { initialProfile: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const res = await updateProfileAction(formData);

    if (res?.error) {
      setError(res.error);
    } else {
      setSuccess(true);
      // clear passwords
      const form = e.target as HTMLFormElement;
      form.currentPassword.value = "";
      form.newPassword.value = "";
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-semibold border border-red-100">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm font-semibold border border-green-100">
          Xogtaada si guul leh ayaa loo kaydiyay!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="field">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            defaultValue={initialProfile?.username || ""} 
            required
          />
        </div>
        <div className="field">
          <label htmlFor="fullName">Magaca Buuxa (Ikhtiyaari)</label>
          <input 
            type="text" 
            id="fullName" 
            name="fullName" 
            defaultValue={initialProfile?.full_name || ""} 
          />
        </div>
      </div>

      <div className="border-t border-[#E8DFD2] pt-5 mt-5">
        <h3 className="font-bold text-[#201B16] mb-4 text-sm">Beddel Kumbasirka (Password) — Haddii aad rabto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="field">
            <label htmlFor="newPassword">Kumbasir Cusub</label>
            <input 
              type="password" 
              id="newPassword" 
              name="newPassword" 
              placeholder="••••••••"
              minLength={6}
            />
          </div>
          <div className="field">
            <label htmlFor="currentPassword">Kumbasirka Hadda (Si loo xaqiijiyo)</label>
            <input 
              type="password" 
              id="currentPassword" 
              name="currentPassword" 
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          type="submit" 
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? "Waa la kaydinayaa..." : "Kaydi Isbedelada"}
        </button>
      </div>
    </form>
  );
}
