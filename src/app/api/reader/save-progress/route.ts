import { type NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

/**
 * POST /api/reader/save-progress
 *
 * Accepts a JSON body from navigator.sendBeacon() on tab close / backgrounding.
 * Body: { bookId: string, chapterIndex: number, scrollOffset: number, timeSpent: number }
 *
 * NOTE: This intentionally duplicates the core upsert logic from
 * saveProgressAction (src/app/actions/reader.ts). If the reading_progress
 * schema changes, update both. Server Actions cannot be reliably used with
 * sendBeacon because they require multipart FormData and keepalive semantics.
 *
 * Returns 200 OK (body is ignored by sendBeacon).
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ ok: false }, { status: 401 });

    let body: { bookId?: unknown; chapterIndex?: unknown; scrollOffset?: unknown; timeSpent?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const bookId = Number(body.bookId);
    if (!bookId || !Number.isFinite(bookId)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const chapterIndex = Math.max(0, Number(body.chapterIndex ?? 0));
    const scrollOffset = Math.max(0, Math.round(Number(body.scrollOffset ?? 0)));
    const timeSpent = Math.max(0, Number(body.timeSpent ?? 0));

    const supabase = await createAdminClient();

    const { data: userRow } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", user.email)
      .maybeSingle();
    const legacyUserId: number | null = userRow?.user_id ?? null;

    const orFilter = legacyUserId
      ? `auth_user_id.eq.${user.id},user_id.eq.${legacyUserId}`
      : `auth_user_id.eq.${user.id}`;

    const { data: existing } = await supabase
      .from("reading_progress")
      .select("id")
      .eq("book_id", bookId)
      .or(orFilter)
      .maybeSingle();

    const now = new Date().toISOString();
    const payload = {
      chapter_index: chapterIndex,
      scroll_position: scrollOffset,
      time_spent: timeSpent,
      last_read: now,
      auth_user_id: user.id,
    };

    if (existing) {
      await supabase.from("reading_progress").update(payload).eq("id", existing.id);
    } else {
      await supabase.from("reading_progress").insert({
        ...payload,
        user_id: legacyUserId,
        book_id: bookId,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    // sendBeacon ignores the response body/status; still return 200 to avoid
    // browser console noise on slow unload paths.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
