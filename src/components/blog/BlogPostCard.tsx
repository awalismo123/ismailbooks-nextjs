import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

interface BlogPostCardData {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string | null;
  categoryName: string | null;
  estimatedReadTime: number | null;
  viewCount: number | null;
  createdAt: string | null;
}

interface BlogPostCardProps {
  post: BlogPostCardData;
  featured?: boolean;
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("so-SO", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl bg-white border border-[#E8DFD2] shadow-sm hover:shadow-md transition-all duration-300 no-underline"
      >
        {/* Accent Bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#7A1F2B]" />

        {/* Content */}
        <div className="flex-1 p-8 sm:p-10 md:p-12 z-10 flex flex-col justify-center">
          <div className="mb-6">
            <span className="badge badge-navy">
              {post.categoryName || "Blog"}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-[40px] font-extrabold text-[#201B16] leading-tight mb-4 group-hover:text-[#7A1F2B] transition-colors">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="font-serif italic text-lg text-[#6B5F52] line-clamp-3 leading-relaxed mb-8 max-w-2xl">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-auto text-xs font-semibold text-[#6B5F52]">
            {formattedDate && <span>{formattedDate}</span>}
            {post.estimatedReadTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C9962E]" />
                {post.estimatedReadTime} min
              </span>
            )}
          </div>
        </div>

        {/* Decorative Abstract Shape */}
        <div className="hidden md:block relative w-[35%] overflow-hidden bg-[#FBF7F0] border-l border-[#E8DFD2]/50">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-tr from-[#1F3A54] to-[#FBF7F0] opacity-10 blur-2xl group-hover:scale-110 transition-transform duration-700" />
           <div className="absolute bottom-8 right-8">
             <span className="btn btn-secondary shadow-sm group-hover:bg-[#1F3A54] group-hover:text-white transition-colors">
               Akhri Maqaalka <ArrowRight className="w-4 h-4 ml-1.5" />
             </span>
           </div>
        </div>
      </Link>
    );
  }

  // Determine header color based on category name
  const getHeaderColorClass = (category: string | null) => {
    if (!category) return "bg-[#1F3A54]";
    const colors = ["bg-[#7A1F2B]", "bg-[#1F3A54]", "bg-[#C9962E]"];
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
      hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="surface-card flex flex-col justify-between group no-underline overflow-hidden relative border border-[#E8DFD2] p-0"
    >
      <div className={`h-1 w-full ${getHeaderColorClass(post.categoryName)}`} />
      
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4 text-xs">
          <span className="badge badge-navy text-[10px]">
            {post.categoryName || "Blog"}
          </span>
          {post.estimatedReadTime && (
             <div className="flex items-center gap-1.5 text-[#6B5F52] bg-[#FBF7F0] px-2 py-1 rounded-full font-medium">
               <Clock className="w-3.5 h-3.5 text-[#C9962E]" />
               <span>{post.estimatedReadTime} min</span>
             </div>
          )}
        </div>

        <h3 className="font-display text-lg font-bold text-[#201B16] group-hover:text-[#7A1F2B] transition-colors leading-snug mb-3 line-clamp-2">
          {post.title}
        </h3>
        
        {post.excerpt && (
          <p className="text-sm text-[#6B5F52] font-serif italic line-clamp-2 leading-relaxed mb-6">
            {post.excerpt}
          </p>
        )}

        <div className="pt-4 border-t border-[#E8DFD2] flex items-center justify-between mt-auto">
          <span className="text-[11px] font-semibold text-[#6B5F52]">
            {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1F3A54]">
            Akhri <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
