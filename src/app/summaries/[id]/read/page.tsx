import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import SummaryReaderClient from "@/components/summaries/SummaryReaderClient";
import BookReaderClient from "@/components/books/BookReaderClient";
import { parseReturnTarget, UserRole } from "@/lib/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: summary } = await supabase
    .from("summaries")
    .select("title, description")
    .eq("id", id)
    .single();

  return {
    title: summary ? `Akhrinta: ${summary.title} — IsmailBooks` : "Soo-koobid — IsmailBooks",
    description: summary?.description ?? "Akhrinta soo-koobidda buugga",
  };
}

export default async function SummaryReaderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ preview?: string; returnTo?: string }>;
}) {
  const { id: summaryId } = await params;
  const { preview, returnTo } = await searchParams;
  const supabase = await createClient();

  // 1. Fetch summary metadata
  const { data: summary } = await supabase
    .from("summaries")
    .select("*")
    .eq("id", summaryId)
    .single();

  if (!summary) {
    notFound();
  }

  const user = await getCurrentUser();
  const userRole: UserRole = !user ? "public" : user.isAdmin ? "admin" : "user";
  
  // Validate return target parameter
  const returnTarget = parseReturnTarget(returnTo, userRole, `/summaries/${summaryId}`);

  const isPaid = summary.is_paid === true || (summary.is_paid as unknown) === 1;
  let isPreviewMode = false;

  // Check paid authorization if summary is paid
  if (isPaid) {
    let userOwns = false;
    if (user) {
      const { data: entitlement } = await supabase
        .from("user_summaries")
        .select("user_summary_id")
        .or(`auth_user_id.eq.${user.id}`)
        .eq("summary_id", summaryId)
        .maybeSingle();
      userOwns = !!entitlement;
    }

    if (!userOwns) {
      isPreviewMode = true;
    }
  }

  if (summary.file_link) {
    return (
      <BookReaderClient
        bookId={summaryId}
        itemType="summary"
        bookTitle={summary.title}
        bookAuthor={summary.book_author || "IsmailBooks"}
        isPreview={isPreviewMode}
        isPaid={isPaid}
        returnTarget={returnTarget}
      />
    );
  }

  return (
    <SummaryReaderClient
      summaryId={summaryId}
      summaryTitle={summary.title}
      bookTitle={summary.book_title || undefined}
      bookAuthor={summary.book_author || undefined}
      summaryCreator={summary.summary_creator || undefined}
      contentHtml={summary.content_html || "<p>Nuxurka soo-koobidda lagama helin.</p>"}
      isPreview={isPreviewMode}
      isPaid={isPaid}
      price={summary.price}
      returnTarget={returnTarget}
    />
  );
}
