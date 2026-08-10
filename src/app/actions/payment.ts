"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

// ─────────────────────────────────────────────────────────────
// Helper: verify current user is admin
// ─────────────────────────────────────────────────────────────
async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin) {
    redirect("/");
  }
  return user;
}

// ─────────────────────────────────────────────────────────────
// 1. Submit a payment (called from /payment/[bookId] form)
//    Now handles the receipt screenshot upload.
// ─────────────────────────────────────────────────────────────
export async function submitPaymentAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const bookId = formData.get("bookId") as string;
  const method = formData.get("method") as string;
  const refNumber = formData.get("refNumber") as string;
  const receipt = formData.get("receipt") as File | null;

  if (!bookId || !method || !refNumber?.trim()) {
    redirect(`/payment/${bookId}?error=missing_fields`);
  }

  // Receipt screenshot is required — it is the admin's proof of payment.
  if (!receipt || receipt.size === 0) {
    redirect(`/payment/${bookId}?error=no_receipt`);
  }

  // Fetch book price from database (never trust the client's price)
  const { data: book } = await supabase
    .from("books")
    .select("id, price, is_paid")
    .eq("id", bookId)
    .single();

  if (!book) redirect(`/books/${bookId}?error=not_found`);

  // ── Upload receipt screenshot to Supabase Storage ──
  // Stored under the user's own folder: {user_id}/{book_id}-{timestamp}.ext
  const fileExt = receipt.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${user.id}/${bookId}-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("receipts")
    .upload(fileName, receipt, {
      contentType: receipt.type || "image/jpeg",
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Receipt upload error:", uploadError);
    redirect(`/payment/${bookId}?error=upload_error`);
  }

  const { data: urlData } = supabase.storage
    .from("receipts")
    .getPublicUrl(fileName);
  const receiptUrl = urlData.publicUrl;

  // ── Insert pending payment with receipt URL ──
  const { error } = await supabase.from("payments").insert({
    auth_user_id: user.id,
    book_id: Number(bookId),
    payment_method: method,
    reference_number: refNumber.trim(),
    amount: book.price ?? 0,
    status: "pending",
    proof_image_path: receiptUrl,
    // Legacy bigint columns — use 0 as placeholder
    payment_id: 0,
    user_id: 0,
  });

  if (error) {
    console.error("Payment insert error:", error);
    redirect(`/payment/${bookId}?error=db_error`);
  }

  revalidatePath("/dashboard");
  redirect("/dashboard?payment=submitted");
}

// ─────────────────────────────────────────────────────────────
// 2. Approve a payment (Admin only)
// ─────────────────────────────────────────────────────────────
export async function approvePaymentAction(formData: FormData) {
  await requireAdmin();

  const paymentId = formData.get("paymentId") as string;
  const adminSupabase = await createAdminClient();

  const { data: payment, error: fetchErr } = await adminSupabase
    .from("payments")
    .select("id, auth_user_id, book_id")
    .eq("id", paymentId)
    .single();

  if (fetchErr || !payment) {
    console.error("Approve: payment not found", fetchErr);
    revalidatePath("/admin");
    return;
  }

  await adminSupabase
    .from("payments")
    .update({ status: "approved", processed_at: new Date().toISOString() })
    .eq("id", paymentId);

  // Grant entitlement — insert into user_books if not already present
  const { data: existing } = await adminSupabase
    .from("user_books")
    .select("user_book_id")
    .eq("auth_user_id", payment.auth_user_id)
    .eq("book_id", payment.book_id)
    .maybeSingle();

  if (!existing) {
    await adminSupabase.from("user_books").insert({
      auth_user_id: payment.auth_user_id,
      book_id: payment.book_id,
      payment_id: payment.id,
      reading_status: "not_started",
      // Legacy bigint column
      user_id: 0,
    });
  }

  revalidatePath("/admin");
  revalidatePath("/dashboard");
}

// ─────────────────────────────────────────────────────────────
// 3. Reject a payment (Admin only)
// ─────────────────────────────────────────────────────────────
export async function rejectPaymentAction(formData: FormData) {
  await requireAdmin();

  const paymentId = formData.get("paymentId") as string;
  const adminNotes = (formData.get("adminNotes") as string) ?? "";
  const adminSupabase = await createAdminClient();

  await adminSupabase
    .from("payments")
    .update({
      status: "rejected",
      processed_at: new Date().toISOString(),
      admin_notes: adminNotes,
    })
    .eq("id", paymentId);

  revalidatePath("/admin");
  revalidatePath("/dashboard");
}