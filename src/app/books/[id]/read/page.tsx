import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import BookReaderClient from "@/components/books/BookReaderClient";
import { parseReturnTarget, UserRole } from "@/lib/navigation";
import { canReadBook } from "@/lib/permissions";
import { loadProgressAction } from "@/app/actions/reader";

export default async function ReaderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ preview?: string; returnTo?: string; chapter?: string }>;
}) {
  const { id: bookId } = await params;
  const { preview, returnTo, chapter: chapterParam } = await searchParams;

  // 1. Get current user (NextAuth)
  const user = await getCurrentUser();
  const userRole: UserRole = !user ? "public" : user.isAdmin ? "admin" : "user";

  // 2. Validate return target
  const returnTarget = parseReturnTarget(returnTo, userRole, `/books/${bookId}`);

  // 3. Authorization check via single source of truth
  const authResult = await canReadBook(user, bookId);

  if (!authResult.book) {
    redirect("/books");
  }

  // 4. Redirect unauthenticated users trying to read paid books
  if (!user && authResult.isPaid && preview !== "true") {
    const loginRedirect = encodeURIComponent(`/books/${bookId}/read`);
    redirect(`/login?redirect=${loginRedirect}`);
  }

  const isPreviewMode = !authResult.canRead;

  // 5. Resolve starting chapter:
  //    Priority: ?chapter=X (explicit) > DB saved progress > 0
  let initialChapter = 0;
  if (!isPreviewMode && user) {
    if (chapterParam !== undefined && chapterParam !== "") {
      const parsed = parseInt(chapterParam, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        initialChapter = parsed;
      }
    } else {
      // Server-side progress fetch so chapter is correct even on refresh/direct URL
      const progress = await loadProgressAction(Number(bookId));
      initialChapter = progress?.chapterIndex ?? 0;
    }
  }

  // 6. Render Reader
  return (
    <BookReaderClient
      bookId={bookId}
      bookTitle={authResult.book.title}
      bookAuthor={authResult.book.author || ""}
      isPreview={isPreviewMode}
      isPaid={authResult.isPaid}
      returnTarget={returnTarget}
      initialChapter={initialChapter}
    />
  );
}
