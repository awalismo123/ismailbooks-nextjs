import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminBlogEditClient from "./AdminBlogEditClient";

export default async function CreateBlogPage() {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin) redirect("/");

  const adminSupabase = await createAdminClient();
  const { data: categories } = await adminSupabase
    .from("blog_categories")
    .select("id, name, slug")
    .order("name", { ascending: true });

  return (
    <AdminBlogEditClient
      post={null}
      categories={categories || []}
    />
  );
}
