import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PaymentFormClient from "@/components/payment/PaymentFormClient";
import Link from "next/link";
import { BookOpen, ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { buildReturnTarget } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Dhammaystir Bixinta — IsmailBooks",
  description:
    "Ku bixi lacagta buugga si ammaan ah — EVC, Zaad, ama eDahab. Ansixin 24 saacadood gudahood.",
};

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?redirect=/payment/${bookId}`);
  }

  const supabase = await createClient();

  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", bookId)
    .single();

  if (!book) {
    notFound();
  }

  const isPaid = book.is_paid === true || (book.is_paid as unknown) === 1;

  if (!isPaid) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FBF7F0]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-16 px-4">
          <div className="surface-card max-w-md w-full text-center py-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[rgba(46,125,91,0.2)] bg-[#F4FAF7]">
              <CheckCircle2 className="h-8 w-8 text-[#2E7D5B]" />
            </div>
            <h1 className="font-display text-2xl font-extrabold text-[#201B16]">
              Buuggan waa bilaash!
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#6B5F52]">
              Buuggan uma baahna lacag-bixin. Waxaad si toos ah ugu akhrin kartaa bilaash.
            </p>
            <div className="mt-6 space-y-3">
              <Link
                href={`/books/${bookId}/read?returnTo=${buildReturnTarget("/dashboard", { tab: "library" })}`}
                className="btn btn-success btn-block"
              >
                <BookOpen className="h-4 w-4" />
                Akhri Bilaash
              </Link>
              <Link
                href={`/books/${bookId}`}
                className="btn btn-ghost btn-block"
              >
                <ArrowLeft className="h-4 w-4" />
                Ku noqo buugga
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ── Paid book — render checkout form ── */
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0]">
      <Navbar />
      <main className="flex-grow py-10 md:py-12">
        <PaymentFormClient
          bookId={book.id.toString()}
          bookTitle={book.title}
          bookPrice={`$${Number(book.price ?? 0).toLocaleString()}`}
        />
      </main>
      <Footer />
    </div>
  );
}