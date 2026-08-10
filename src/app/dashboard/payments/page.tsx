import React from "react";
import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardPaymentsClient, { PaymentItem } from "./DashboardPaymentsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Lacag-bixinada - IsmailBooks",
  description: "Taariikhdaada lacag-bixinta iyo rasiidhada.",
};

export default async function DashboardPaymentsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const adminSupabase = await createAdminClient();
  let authUserId = user.id;
  let legacyUserId: number | null = /^\d+$/.test(user.id) ? Number(user.id) : null;

  if (user.email) {
    const { data: legacyAccount } = await adminSupabase.from("users").select("user_id").ilike("email", user.email).maybeSingle();
    if (legacyAccount) legacyUserId = legacyAccount.user_id;
    const { data: profileAccount } = await adminSupabase.from("profiles").select("id").eq("id", user.id).maybeSingle();
    if (profileAccount) authUserId = profileAccount.id;
  }

  let paymentsQuery = adminSupabase
    .from("payments")
    .select("id, payment_method, reference_number, amount, status, created_at, book_id, admin_notes");

  if (legacyUserId && authUserId && !/^\d+$/.test(authUserId)) {
    paymentsQuery = paymentsQuery.or(`auth_user_id.eq.${authUserId},user_id.eq.${legacyUserId}`);
  } else if (legacyUserId) {
    paymentsQuery = paymentsQuery.eq("user_id", legacyUserId);
  } else {
    paymentsQuery = paymentsQuery.eq("auth_user_id", authUserId);
  }

  const { data: rawPayments } = await paymentsQuery.order("created_at", { ascending: false });

  const paymentBookIds = [...new Set((rawPayments || []).map((p: any) => p.book_id).filter(Boolean))] as number[];

  const { data: paymentBooks } = paymentBookIds.length > 0
    ? await adminSupabase.from("books").select("id, title").in("id", paymentBookIds)
    : { data: [] };

  const paymentBooksMap = Object.fromEntries((paymentBooks || []).map((b: any) => [b.id, b]));

  const paymentHistory: PaymentItem[] = (rawPayments || []).map((p: any) => {
    let fmtAmount = "";
    if (typeof p.amount === "number") fmtAmount = `$${p.amount.toFixed(2)}`;
    else if (typeof p.amount === "string") fmtAmount = p.amount.startsWith("$") ? p.amount : `$${p.amount}`;
    else fmtAmount = "$0.00";

    const bk = p.book_id ? paymentBooksMap[p.book_id] : null;

    return {
      id: p.id,
      bookTitle: bk?.title || `Book #${p.book_id || "?"}`,
      method: p.payment_method || "Unknown",
      ref: p.reference_number || null,
      amount: fmtAmount,
      status: p.status || "pending",
      date: new Date(p.created_at).toLocaleDateString('so-SO'),
      adminNotes: p.admin_notes || null,
    };
  });

  return <DashboardPaymentsClient payments={paymentHistory} />;
}
