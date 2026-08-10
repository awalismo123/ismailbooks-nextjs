"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { submitReviewAction } from "@/app/actions/reviews";

export default function ReviewForm({ bookId, userReview }: { bookId: number, userReview?: any }) {
  const [rating, setRating] = useState(userReview?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      setError("Fadlan dooro xiddigaha.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    formData.append("rating", rating.toString());
    formData.append("bookId", bookId.toString());

    const res = await submitReviewAction(formData);

    if (res?.error) {
      setError(res.error);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  }

  return (
    <div className="surface-card">
      <h3 className="font-display font-bold text-lg text-[#201B16] mb-4">
        {userReview ? "Beddel Faalladaada" : "Faallo ka reeb buuggan"}
      </h3>
      
      {success ? (
        <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-200">
          Waad ku mahadsantahay faalladaada!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-[#6B5F52] mb-2">
              Qiimayn
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-7 h-7 ${
                      star <= (hoverRating || rating) 
                        ? "fill-[#C9962E] text-[#C9962E]" 
                        : "text-[#E8DFD2]"
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="reviewText" className="block text-sm font-semibold text-[#6B5F52] mb-2">
              Fikirkaaga (Ikhtiyaari)
            </label>
            <textarea
              id="reviewText"
              name="reviewText"
              rows={4}
              defaultValue={userReview?.review_text || ""}
              placeholder="Maxaad ka heshay buuggan?"
              className="input-field"
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? "Waa la dirayaa..." : "Dir Faallada"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
