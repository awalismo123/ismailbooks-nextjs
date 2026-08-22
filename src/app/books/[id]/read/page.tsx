import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import BookReaderClient from "@/components/books/BookReaderClient";
import { parseReturnTarget, UserRole } from "@/lib/navigation";
import { canReadBook } from "@/lib/permissions";
import { loadProgressAction } from "@/app/actions/reader";
import { createAdminClient } from "@/lib/supabase/server";
import type { BookCardData } from "@/components/books/BookCard";

const COVER_GRADIENTS = [
  "cover-gradient-1",
  "cover-gradient-2",
  "cover-gradient-3",
  "cover-gradient-4",
  "cover-gradient-5",
  "cover-gradient-6",
];

async function getRelatedBooks(currentBookId: string): Promise<BookCardData[]> {
  try {
    const adminSupabase = await createAdminClient();

    const { data: currentBook } = await adminSupabase
      .from("books")
      .select("category")
      .eq("id", currentBookId)
      .maybeSingle();

    const category = currentBook?.category;

    let query = adminSupabase
      .from("books")
      .select("id, title, author, is_paid, price, cover_image, pages, category, views")
      .eq("is_active", true)
      .neq("id", currentBookId);

    if (category) {
      query = query.eq("category", category);
    }

    const { data: matchedBooks } = await query.limit(3);
    let booksList = matchedBooks || [];

    if (booksList.length < 3) {
      const excludeIds = [currentBookId, ...booksList.map((b) => String(b.id))];
      const { data: fallbackBooks } = await adminSupabase
        .from("books")
        .select("id, title, author, is_paid, price, cover_image, pages, category, views")
        .eq("is_active", true)
        .not("id", "in", `(${excludeIds.join(",")})`)
        .order("views", { ascending: false })
        .limit(3 - booksList.length);

      if (fallbackBooks) {
        booksList = [...booksList, ...fallbackBooks];
      }
    }

    return booksList.map((b, i) => {
      let coverUrl = COVER_GRADIENTS[i % COVER_GRADIENTS.length];
      if (b.cover_image) {
        if (
          b.cover_image.startsWith("http") ||
          b.cover_image.startsWith("data:") ||
          b.cover_image.startsWith("/") ||
          b.cover_image.startsWith("cover-gradient")
        ) {
          coverUrl = b.cover_image;
        } else {
          const { data: publicUrlData } = adminSupabase.storage
            .from("covers")
            .getPublicUrl(b.cover_image);
          coverUrl = publicUrlData?.publicUrl || coverUrl;
        }
      }

      const isPaid = b.is_paid === true || (b.is_paid as unknown) === 1;
      const priceVal = Number(b.price || 0);

      return {
        id: b.id,
        title: b.title,
        author: b.author || "IsmailBooks",
        is_paid: isPaid,
        cover: coverUrl,
        priceLabel: isPaid ? `$${priceVal.toLocaleString()}` : "Bilaash",
        pages: b.pages || undefined,
        category: b.category || null,
        href: `/books/${b.id}`,
      };
    });
  } catch (e) {
    console.error("Error fetching related books:", e);
    return [];
  }
}

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

  // 5. Resolve starting chapter + scroll:
  //    Priority: ?chapter=X (explicit) > DB saved progress > 0
  let initialChapter = 0;
  let initialScrollOffset = 0;
  if (!isPreviewMode && user) {
    if (chapterParam !== undefined && chapterParam !== "") {
      const parsed = parseInt(chapterParam, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        initialChapter = parsed;
      }
    } else {
      const progress = await loadProgressAction(Number(bookId));
      initialChapter = progress?.chapterIndex ?? 0;
      initialScrollOffset = progress?.scrollOffset ?? 0;
    }
  }

  // 6. Fetch related books concurrently
  const relatedBooks = await getRelatedBooks(bookId);

  // 7. Render Reader
  return (
    <BookReaderClient
      bookId={bookId}
      bookTitle={authResult.book.title}
      bookAuthor={authResult.book.author || ""}
      isPreview={isPreviewMode}
      isPaid={authResult.isPaid}
      returnTarget={returnTarget}
      initialChapter={initialChapter}
      initialScrollOffset={initialScrollOffset}
      relatedBooks={relatedBooks}
    />
  );
}
