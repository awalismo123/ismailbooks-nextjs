import React from "react";
import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/profile/ProfileForm";
import { ShieldCheck, UserCog } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Hagaajinta - IsmailBooks",
  description: "Maamul profile-kaaga iyo doorbidistaada.",
};

export default async function DashboardSettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const adminSupabase = await createAdminClient();
  let authUserId = user.id;
  let legacyUserId: number | null = /^\d+$/.test(user.id) ? Number(user.id) : null;

  if (user.email) {
    const { data: legacyAccount } = await adminSupabase.from("users").select("user_id").ilike("email", user.email).maybeSingle();
    if (legacyAccount) legacyUserId = legacyAccount.user_id;
    const { data: profileAccount } = await adminSupabase.from("profiles").select("id").eq("id", user.id).maybeSingle();
    if (profileAccount) authUserId = profileAccount.id;
  }

  const { data: profile } = await adminSupabase
    .from("profiles")
    .select("id, username, full_name, is_admin, account_status, created_at, email, phone")
    .eq("id", authUserId)
    .maybeSingle();

  const displayUsername = profile?.username || profile?.full_name || user.name || user.username || user.email?.split("@")[0] || "Akhriste";

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-display text-2xl font-extrabold text-[#201B16] flex items-center gap-3">
        <UserCog className="w-7 h-7 text-[#7A1F2B]" />
        Hagaajinta (Settings)
      </h1>

      <div className="rounded-3xl bg-white border border-[#E8DFD2] p-6 sm:p-8 space-y-8 shadow-sm">
        {/* Profile Header */}
        <div className="flex items-center gap-5 pb-6 border-b border-[#E8DFD2]">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7A1F2B] to-[#1F3A54] flex items-center justify-center text-3xl font-display font-extrabold text-white shadow-lg shrink-0">
            {displayUsername.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-extrabold text-[#201B16] truncate">{displayUsername}</h2>
            <p className="text-sm text-[#6B5F52] truncate">{user.email || profile?.email || "No email"}</p>
            {profile?.is_admin && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold mt-2 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Account
              </span>
            )}
          </div>
        </div>

        {/* Profile Form (Handles Name/Password updates) */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-[#201B16]">Profile Details</h3>
          <ProfileForm initialProfile={profile} />
        </div>
      </div>
    </div>
  );
}
