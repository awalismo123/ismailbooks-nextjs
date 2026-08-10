"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function submitReviewAction(formData: FormData) {
  const user = await getCurrentUser();
  const supabase = await createClient();

  if (!user) {
    return { error: "Waa inaad soo gasho si aad faallo u reebto." };
  }

  const bookId = Number(formData.get("bookId"));
  const rating = Number(formData.get("rating"));
  const reviewText = (formData.get("reviewText") as string)?.trim();

  if (!bookId || !rating || rating < 1 || rating > 5) {
    return { error: "Xog aan sax ahayn." };
  }

  // Ensure user owns the book (if paid)
  const { data: book } = await supabase.from("books").select("is_paid").eq("id", bookId).single();
  
  if (book?.is_paid) {
    const { data: entitlement } = await supabase
      .from("user_books")
      .select("user_book_id")
      .eq("auth_user_id", user.id)
      .eq("book_id", bookId)
      .maybeSingle();
      
    if (!entitlement) {
      return { error: "Buuggan ma iibsan, markaa faallo kama reebi kartid." };
    }
  }

  // Insert review
  const { error } = await supabase.from("book_reviews").upsert(
    {
      user_id: user.id,
      book_id: bookId,
      rating,
      review_text: reviewText || null,
      status: "approved", // auto-approve for now
      created_at: new Date().toISOString(),
    },
    { onConflict: "user_id,book_id" }
  );

  if (error) {
    console.error("Review submit error:", error.message);
    return { error: "Cillad ayaa dhacday, fadlan dib isku day." };
  }

  // Trigger on Supabase usually updates average_rating and total_reviews.
  // If not, we might need to manually trigger or compute.

  revalidatePath(`/books/${bookId}`);
  return { success: true };
}
