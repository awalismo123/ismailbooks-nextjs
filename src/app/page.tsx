import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedBooks } from "@/components/home/FeaturedBooks";
import { LatestBlogPosts } from "@/components/home/LatestBlogPosts";
import { BookInsightsQuotes } from "@/components/home/BookInsightsQuotes";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IsmailBooks — Buugaag, Kooban & Aqoon Af-Soomaali",
  description:
    "Maktabad dhijitaal ah oo Af-Soomaali ah: buugaagta cilmi-nafsiga, falsafadda iyo horumarinta nafta. Akhriso, iibso, oo kobci aqoontaada.",
  openGraph: {
    title: "IsmailBooks — Buugaag & Aqoon Af-Soomaali",
    description: "Buugaag dhijitaal ah oo Af-Soomaali ah. Akhriso maanta.",
    siteName: "IsmailBooks",
    type: "website",
    locale: "so_SO",
  },
};

export default async function HomePage() {
  const supabase = await createClient();
  const { data: books } = await supabase
    .from("books")
    .select("cover_image")
    .eq("is_active", true)
    .not("cover_image", "is", null)
    .limit(6);

  const heroCovers = (books ?? []).map((b) => {
    const { data } = supabase.storage.from("covers").getPublicUrl(b.cover_image);
    return data.publicUrl;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "IsmailBooks",
        // TODO: replace with your real domain
        url: "https://ismailbooks.com",
      },
      {
        "@type": "WebSite",
        name: "IsmailBooks",
        inLanguage: ["so", "en"],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-grow">
        <HeroSection heroCovers={heroCovers} />
        <FeaturedBooks />
        <LatestBlogPosts />
        <BookInsightsQuotes />
      </main>
      <Footer />
    </div>
  );
}