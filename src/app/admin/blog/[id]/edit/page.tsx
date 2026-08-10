import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import AdminBlogEditClient from "../../create/AdminBlogEditClient";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin) redirect("/");

  const { id } = await params;
  const adminSupabase = await createAdminClient();

  const [{ data: post }, { data: categories }] = await Promise.all([
    adminSupabase.from("blog_posts").select("*").eq("id", id).maybeSingle(),
    adminSupabase.from("blog_categories").select("id, name, slug").order("name", { ascending: true }),
  ]);

  if (!post) notFound();

  return (
    <AdminBlogEditClient
      post={post}
      categories={categories || []}
    />
  );
}
