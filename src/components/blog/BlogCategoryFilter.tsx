import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function BlogCategoryFilter({ currentCategory }: { currentCategory?: string }) {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("blog_categories")
    .select("name, slug")
    .eq("is_active", 1)
    .order("sort_order", { ascending: true });

  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
          !currentCategory
            ? "bg-[#1F3A54] text-white border-[#1F3A54]"
            : "bg-white text-[#6B5F52] border-[#E8DFD2] hover:border-[#1F3A54] hover:text-[#1F3A54]"
        }`}
      >
        Dhammaan
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/blog/category/${cat.slug}`}
          className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
            currentCategory === cat.slug
              ? "bg-[#1F3A54] text-white border-[#1F3A54]"
              : "bg-white text-[#6B5F52] border-[#E8DFD2] hover:border-[#1F3A54] hover:text-[#1F3A54]"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
