import { redirect } from "next/navigation";

export default async function BlogCategoryRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Redirect to the new query-param based filtering
  redirect(`/blog?category=${encodeURIComponent(slug)}`);
}
