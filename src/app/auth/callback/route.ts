import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const next = searchParams.get("next") ?? "/dashboard";

  if (error || errorDescription) {
    console.error("Auth callback error parameter:", error, errorDescription);
    const msg = errorDescription || error || "Soo galitaanku wuu guuldareystay";
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(msg)}`);
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!exchangeError) {
      // Ensure profile row exists in Supabase for OAuth user
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const username = user.email ? user.email.split("@")[0] : `user_${user.id.slice(0, 6)}`;
          await supabase.from("profiles").upsert(
            {
              id: user.id,
              username: user.user_metadata?.full_name || user.user_metadata?.name || username,
              full_name: user.user_metadata?.full_name || user.user_metadata?.name || username,
              account_status: "active",
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );
        }
      } catch (err) {
        console.warn("Callback profile upsert warning:", err);
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }

    console.error("Supabase exchangeCodeForSession error:", exchangeError.message);
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(exchangeError.message)}`
    );
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
