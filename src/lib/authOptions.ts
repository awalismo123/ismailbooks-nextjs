import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAdminClient } from "@/lib/supabase/server";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const supabase = await createAdminClient();

        // 1. Try Supabase Auth first
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (!authError && authData.user) {
          // Fetch or ensure profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("id, username, is_admin")
            .eq("id", authData.user.id)
            .maybeSingle();

          return {
            id: authData.user.id,
            email: authData.user.email,
            name: profile?.username || authData.user.email?.split("@")[0],
            isAdmin: profile?.is_admin || false,
          };
        }

        // 2. Fallback to public.users (legacy users)
        const { data: legacyUser } = await supabase
          .from("users")
          .select("user_id, email, username")
          .eq("email", credentials.email)
          .maybeSingle();

        if (legacyUser) {
          // Basic fallback for legacy user
          return {
            id: String(legacyUser.user_id),
            email: legacyUser.email,
            name: legacyUser.username,
            isAdmin: false,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const supabase = await createAdminClient();
          
          // Ensure a profile row exists in Supabase
          const username = user.email ? user.email.split("@")[0] : `user_${user.id.slice(0, 6)}`;
          
          const { error } = await supabase.from("profiles").upsert(
            {
              id: user.id,
              username: user.name || username,
              full_name: user.name,
              account_status: "active",
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );

          if (error) {
            console.warn("NextAuth Google signIn profile upsert warning:", error.message);
          }
        } catch (err) {
          console.error("NextAuth signIn callback error:", err);
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = (user as any).isAdmin || false;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "ismailbooks_nextauth_secret_key_2026",
};
