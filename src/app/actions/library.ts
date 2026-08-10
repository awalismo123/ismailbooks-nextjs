"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function claimFreeBooksAction() {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const adminSupabase = await createAdminClient();

  // Fetch all active free books
  const { data: freeBooks } = await adminSupabase
    .from("books")
    .select("id")
    .or("is_paid.eq.false,is_paid.eq.0")
    .eq("is_active", true);

  if (!freeBooks || freeBooks.length === 0) {
    return { success: true, count: 0 };
  }

  // Get existing user books to avoid duplicates
  const { data: userRow } = await adminSupabase
    .from("users")
    .select("user_id")
    .eq("email", user.email)
    .maybeSingle();
  const legacyUserId: number | null = userRow?.user_id ?? null;

  const orFilter = legacyUserId
    ? `auth_user_id.eq.${user.id},user_id.eq.${legacyUserId}`
    : `auth_user_id.eq.${user.id}`;

  const { data: existing } = await adminSupabase
    .from("user_books")
    .select("book_id")
    .or(orFilter);

  const existingIds = new Set((existing || []).map((b: any) => b.book_id));

  const newEntitlements = freeBooks
    .filter((b: any) => !existingIds.has(b.id))
    .map((b: any) => ({
      auth_user_id: user.id,
      user_id: legacyUserId || 0,
      book_id: b.id,
      reading_status: "not_started",
      payment_id: 0,
    }));

  if (newEntitlements.length > 0) {
    await adminSupabase
      .from("user_books")
      .upsert(newEntitlements, { ignoreDuplicates: true });
  }

  revalidatePath("/dashboard");
  return { success: true, count: newEntitlements.length };
}

/**
 * Toggle completion status of a book for the current user
 */
export async function toggleBookCompletedAction(
  bookId: number,
  targetCompleted: boolean
) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const adminSupabase = await createAdminClient();
  const now = new Date().toISOString();

  let authUserId = user.id;
  let legacyUserId: number | null = /^\d+$/.test(user.id) ? Number(user.id) : null;

  if (user.email) {
    const { data: legacyAccount } = await adminSupabase
      .from("users")
      .select("user_id")
      .ilike("email", user.email)
      .maybeSingle();
    if (legacyAccount) legacyUserId = legacyAccount.user_id;

    const { data: profileAccount } = await adminSupabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();
    if (profileAccount) authUserId = profileAccount.id;
  }

  let orFilter = `auth_user_id.eq.${authUserId}`;
  if (legacyUserId && authUserId && !/^\d+$/.test(authUserId)) {
    orFilter = `auth_user_id.eq.${authUserId},user_id.eq.${legacyUserId}`;
  } else if (legacyUserId) {
    orFilter = `user_id.eq.${legacyUserId}`;
  }

  const newStatus = targetCompleted ? "completed" : "reading";

  // Update user_books
  const { error: ubError } = await adminSupabase
    .from("user_books")
    .update({ reading_status: newStatus, last_accessed: now })
    .eq("book_id", bookId)
    .or(orFilter);

  if (ubError) console.error("Update user_books error:", ubError);

  // Update reading_progress
  const { data: existingProgress } = await adminSupabase
    .from("reading_progress")
    .select("id")
    .eq("book_id", bookId)
    .or(orFilter)
    .maybeSingle();

  if (existingProgress) {
    await adminSupabase
      .from("reading_progress")
      .update({
        completed: targetCompleted ? 1 : 0,
        last_read: now,
      })
      .eq("id", existingProgress.id);
  } else {
    await adminSupabase.from("reading_progress").insert({
      auth_user_id: user.id,
      user_id: legacyUserId,
      book_id: bookId,
      chapter_index: 0,
      time_spent: 0,
      completed: targetCompleted ? 1 : 0,
      last_read: now,
    });
  }

  revalidatePath("/dashboard");
  return { success: true };
}

/**
 * Remove a free book from the user's library
 */
export async function removeFreeBookAction(bookId: number) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const adminSupabase = await createAdminClient();

  // Verify book is free
  const { data: book } = await adminSupabase
    .from("books")
    .select("is_paid, price")
    .eq("id", bookId)
    .maybeSingle();

  const isPaid =
    book?.is_paid === true ||
    (book?.is_paid as unknown) === 1 ||
    Number(book?.price || 0) > 0;

  if (isPaid) {
    return { error: "Paid books cannot be removed from library." };
  }

  let authUserId = user.id;
  let legacyUserId: number | null = /^\d+$/.test(user.id) ? Number(user.id) : null;

  if (user.email) {
    const { data: legacyAccount } = await adminSupabase
      .from("users")
      .select("user_id")
      .ilike("email", user.email)
      .maybeSingle();
    if (legacyAccount) legacyUserId = legacyAccount.user_id;

    const { data: profileAccount } = await adminSupabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();
    if (profileAccount) authUserId = profileAccount.id;
  }

  let orFilter = `auth_user_id.eq.${authUserId}`;
  if (legacyUserId && authUserId && !/^\d+$/.test(authUserId)) {
    orFilter = `auth_user_id.eq.${authUserId},user_id.eq.${legacyUserId}`;
  } else if (legacyUserId) {
    orFilter = `user_id.eq.${legacyUserId}`;
  }

  // Delete user_books entitlement
  await adminSupabase
    .from("user_books")
    .delete()
    .eq("book_id", bookId)
    .or(orFilter);

  // Delete reading_progress
  await adminSupabase
    .from("reading_progress")
    .delete()
    .eq("book_id", bookId)
    .or(orFilter);

  revalidatePath("/dashboard");
  return { success: true };
}
