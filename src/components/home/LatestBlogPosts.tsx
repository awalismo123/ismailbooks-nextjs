import React from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const LatestBlogPosts: React.FC = async () => {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, category, read_time, views, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  const allPosts = posts ?? [];

  // Don't render the section if there are no posts
  if (allPosts.length === 0) return null;

  return (
    <section className="py-14 md:py-16 border-y border-[#E8DFD2] bg-white/50">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#7A1F2B] text-xs font-extrabold uppercase tracking-widest block mb-2">
              Qoraallada & Falanqaynta
            </span>
            <h2 className="font-display text-[clamp(28px,3vw,36px)] font-extrabold text-[#201B16] m-0">
              Qoraallada Ugu Cusub
            </h2>
            <p className="text-[#6B5F52] text-sm mt-2 max-w-xl m-0">
              Falanqayn qoto dheer oo ku saabsan cilmi-nafsiga, falsafadda iyo buugaagta.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1F3A54] hover:underline no-underline"
          >
            <span>Dhammaantood eeg</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {allPosts.map((post: any) => (
            <article key={post.id} className="surface-card flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4 text-xs">
                  <span className="badge badge-navy">{post.category ?? "Blog"}</span>
                  <div className="flex items-center gap-3 text-[#6B5F52]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.read_time ?? 5} min
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-[#201B16] group-hover:text-[#7A1F2B] transition-colors leading-snug mb-3">
                  {post.title}
                </h3>
                <p className="text-sm text-[#6B5F52] line-clamp-3 leading-relaxed mb-5">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DFD2] flex items-center justify-between">
                <span className="text-[11px] text-[#6B5F52]">
                  {post.created_at ? new Date(post.created_at).toLocaleDateString() : "IsmailBooks"}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F3A54] no-underline group-hover:translate-x-1 transition-transform"
                >
                  <span>Akhri</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
