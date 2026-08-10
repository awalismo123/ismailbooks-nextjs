import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardRealtimeSync } from "@/components/dashboard/DashboardRealtimeSync";

export const metadata = {
  title: "Dashboard - IsmailBooks",
  description: "Maamul buugaagtaada, lacag-bixinada, iyo profile-kaaga.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Determine display name
  const displayUsername = user.name || user.username || user.email?.split("@")[0] || "Akhriste";

  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      <DashboardRealtimeSync userId={user.id} />
      {/* 
        We pass the user info to the Sidebar. 
        Note: The sidebar is a Client Component and handles the responsive layout 
        (Desktop left sidebar, Mobile top/bottom bars) 
      */}
      <DashboardSidebar 
        username={displayUsername} 
        email={user.email || ""} 
      />

      {/* Main Content Area */}
      <main className="md:ml-[280px] pt-16 md:pt-0 pb-24 md:pb-0 min-h-screen">
        <div className="max-w-[1100px] mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
