import { createAdminClient } from "@/lib/supabase/server";
import { AuthUser } from "@/lib/auth";

export interface CanReadResult {
  canRead: boolean;
  isPaid: boolean;
  isOwned: boolean;
  book: {
    id: number | string;
    title: string;
    author: string | null;
    is_paid: boolean | number;
    price: number | null;
    is_active: boolean | number;
  } | null;
}

/**
 * Single Source of Truth for book reading authorization.
 * Checks if a user has full reading rights for a specific book.
 */
export async function canReadBook(
  user: AuthUser | null,
  bookId: string | number
): Promise<CanReadResult> {
  const adminSupabase = await createAdminClient();

  // 1. Fetch book metadata
  const { data: book } = await adminSupabase
    .from("books")
    .select("id, title, author, is_paid, price, is_active")
    .eq("id", bookId)
    .maybeSingle();

  if (!book) {
    return { canRead: false, isPaid: false, isOwned: false, book: null };
  }

  const isPaid =
    book.is_paid === true ||
    (book.is_paid as unknown) === 1 ||
    Number(book.price || 0) > 0;

  // Free active books can be read by anyone
  if (!isPaid) {
    return { canRead: true, isPaid: false, isOwned: true, book };
  }

  // Paid books require an authenticated user
  if (!user) {
    return { canRead: false, isPaid: true, isOwned: false, book };
  }

  // Admins have full access to all books
  if (user.isAdmin) {
    return { canRead: true, isPaid: true, isOwned: true, book };
  }

  // Resolve user identifiers (both UUID auth_user_id and legacy integer user_id)
  let authUserId = user.id;
  let legacyUserId: number | null = /^\d+$/.test(user.id) ? Number(user.id) : null;

  if (user.email) {
    const { data: legacyAccount } = await adminSupabase
      .from("users")
      .select("user_id")
      .ilike("email", user.email)
      .maybeSingle();

    if (legacyAccount) {
      legacyUserId = legacyAccount.user_id;
    }

    const { data: profileAccount } = await adminSupabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (profileAccount) {
      authUserId = profileAccount.id;
    }
  }

  // Query user_books entitlement table using adminSupabase (bypasses RLS issues)
  let query = adminSupabase
    .from("user_books")
    .select("user_book_id")
    .eq("book_id", bookId);

  if (legacyUserId && authUserId && !/^\d+$/.test(authUserId)) {
    query = query.or(`auth_user_id.eq.${authUserId},user_id.eq.${legacyUserId}`);
  } else if (legacyUserId) {
    query = query.eq("user_id", legacyUserId);
  } else {
    query = query.eq("auth_user_id", authUserId);
  }

  const { data: entitlement } = await query.maybeSingle();
  const isOwned = !!entitlement;

  return {
    canRead: isOwned,
    isPaid: true,
    isOwned,
    book,
  };
}
