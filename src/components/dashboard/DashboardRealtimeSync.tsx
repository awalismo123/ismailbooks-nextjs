"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function DashboardRealtimeSync({ userId }: { userId: string | null }) {
  const router = useRouter();
  
  useEffect(() => {
    if (!userId) return;
    
    const supabase = createClient();
    
    const channel = supabase.channel('dashboard_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_books', filter: `auth_user_id=eq.${userId}` },
        () => {
          router.refresh();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'reading_progress', filter: `auth_user_id=eq.${userId}` },
        () => {
          router.refresh();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'payments', filter: `auth_user_id=eq.${userId}` },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, router]);

  return null;
}
