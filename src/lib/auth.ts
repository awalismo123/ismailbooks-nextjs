import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { createClient } from "@/lib/supabase/server";

export interface AuthUser {
  id: string;
  email: string | null;
  name?: string | null;
  username?: string | null;
  isAdmin?: boolean;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  // 1. Try NextAuth session first
  try {
    const session = await getServerSession(authOptions);
    if (session?.user) {
      const user = session.user as any;
      return {
        id: user.id || user.email,
        email: user.email || null,
        name: user.name || null,
        username: user.name || user.email?.split("@")[0] || null,
        isAdmin: user.isAdmin || false,
      };
    }
  } catch (err) {
    // ignore NextAuth error and fallback
  }

  // 2. Fallback to Supabase Auth session
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, is_admin")
        .eq("id", user.id)
        .maybeSingle();

      return {
        id: user.id,
        email: user.email || null,
        name: profile?.username || user.email?.split("@")[0] || null,
        username: profile?.username || user.email?.split("@")[0] || null,
        isAdmin: profile?.is_admin || false,
      };
    }
  } catch (err) {
    // ignore
  }

  return null;
}
