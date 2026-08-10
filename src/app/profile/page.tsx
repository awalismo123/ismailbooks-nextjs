import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User, ShieldCheck, Clock, Mail, CheckCircle2 } from "lucide-react";
import ProfileForm from "@/components/profile/ProfileForm";

export const metadata = {
  title: "Profile-kayga — IsmailBooks",
  description: "Maamul xogtaada akoonka, kumbasirka, iyo habaynta IsmailBooks.",
};

export default async function ProfilePage() {
  const supabase = await createClient();

  // 1. Unified Auth User check (NextAuth or Supabase Auth)
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // 2. Fetch profile from database
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, full_name, is_admin, account_status, created_at")
    .eq("id", user.id)
    .maybeSingle();

  const formattedJoinDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("so-SO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Dhawaan";

  const displayUsername =
    profile?.username || user.username || user.name || user.email?.split("@")[0] || "Akhriste";
  const displayFullName = profile?.full_name || profile?.username || user.name || "Akhriste";

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0]">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="container-site max-w-4xl space-y-8">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-[#201B16] sm:text-4xl">
              Profile-kayga & Akoonka
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5F52] mt-1">
              Halkaan waxaad ka maamuli kartaa xogtaada gaarka ah iyo badbaadada akoonkaaga.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar Stats */}
            <div className="md:col-span-1 space-y-4">
              <div className="rounded-3xl bg-white p-6 border border-[#E8DFD2] shadow-sm text-center flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#7A1F2B] to-[#1F3A54] text-white rounded-full flex items-center justify-center font-display text-4xl font-extrabold mb-4 shadow-md">
                  {displayUsername.charAt(0).toUpperCase()}
                </div>
                <h2 className="font-display text-xl font-bold text-[#201B16]">
                  {displayFullName}
                </h2>
                <p className="text-xs text-[#6B5F52] mb-4">@{displayUsername}</p>

                {profile?.is_admin && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-2 w-full justify-center">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    Maamule (Admin)
                  </span>
                )}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold w-full justify-center ${
                    profile?.account_status === "active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {profile?.account_status === "active"
                    ? "Akoon furan"
                    : "La xannibay"}
                </span>
              </div>

              <div className="rounded-3xl bg-white p-6 border border-[#E8DFD2] shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#201B16]">
                  <Mail className="w-4 h-4 text-[#6B5F52] shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#201B16]">
                  <Clock className="w-4 h-4 text-[#6B5F52] shrink-0" />
                  <span>Xubin soo ahaa: {formattedJoinDate}</span>
                </div>
              </div>
            </div>

            {/* Edit Form */}
            <div className="md:col-span-2">
              <div className="rounded-3xl bg-white p-6 sm:p-8 border border-[#E8DFD2] shadow-sm">
                <h2 className="font-display text-xl font-bold text-[#201B16] mb-6 border-b border-[#E8DFD2] pb-4">
                  Wax ka beddel Xogtaada
                </h2>
                <ProfileForm initialProfile={profile || { username: displayUsername, full_name: displayFullName }} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
