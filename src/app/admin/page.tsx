import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminClient from "@/components/admin/AdminClient";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/dashboard");

  const adminSupabase = await createAdminClient();

  // ── Fetch everything in parallel ──
  const [
    { data: dbUsersData },
    { data: profilesData },
    authUsersResult,
    { data: booksData },
    { data: paymentsData },
    { data: activityData },
    { data: blogData },
    { data: blogCategoriesData },
    { data: summariesData },
  ] = await Promise.all([
    adminSupabase
      .from("users")
      .select("user_id, username, email, registration_date, account_status, phone_number")
      .order("registration_date", { ascending: false }),

    adminSupabase
      .from("profiles")
      .select("id, username, full_name, is_admin, account_status, created_at"),

    adminSupabase.auth.admin.listUsers({ perPage: 1000 }).catch(() => ({ data: { users: [] } })),

    adminSupabase
      .from("books")
      .select("id, title, author, is_paid, price, views, total_downloads, is_active, category, description, pages, cover_image, file_link")
      .order("created_at", { ascending: false }),

    adminSupabase
      .from("payments")
      .select("id, payment_method, reference_number, amount, created_at, status, auth_user_id, user_id, book_id, proof_image_path, admin_notes")
      .order("created_at", { ascending: false }),

    adminSupabase
      .from("user_books")
      .select("user_id, auth_user_id, book_id, reading_status, acquired_date"),

    adminSupabase
      .from("blog_posts")
      .select("id, title, slug, status, view_count, created_at, category_id, excerpt, content, featured_image, meta_title, meta_description")
      .order("created_at", { ascending: false }),

    adminSupabase
      .from("blog_categories")
      .select("id, name, slug")
      .order("name", { ascending: true }),

    adminSupabase
      .from("summaries")
      .select("id, title, book_title, book_author, is_paid, price, views, created_at, description, content_html, cover_image, summary_creator, pages")
      .order("created_at", { ascending: false }),
  ]);

  const authUsersData = authUsersResult as any;
  const bookTitleMap = new Map((booksData ?? []).map((b) => [b.id, b.title]));
  const categoryMap = new Map((blogCategoriesData ?? []).map((c) => [c.id, c.name]));

  // ── Owned books per user ──
  const ownedBooksMap = new Map<string, string[]>();
  (activityData ?? []).forEach((a: any) => {
    const userKey = a.user_id != null ? String(a.user_id) : null;
    const authKey = a.auth_user_id ? String(a.auth_user_id) : null;

    const keys = [userKey, authKey].filter(Boolean) as string[];
    keys.forEach((key) => {
      if (a.book_id) {
        const title = bookTitleMap.get(a.book_id) || `Book #${a.book_id}`;
        const existing = ownedBooksMap.get(key) || [];
        if (!existing.includes(title)) {
          ownedBooksMap.set(key, [...existing, title]);
        }
      }
    });
  });

  // ── Payments per user ──
  const userPaymentsCountMap = new Map<string, number>();
  (paymentsData ?? []).forEach((p: any) => {
    const keys = [
      p.auth_user_id ? String(p.auth_user_id) : null,
      p.user_id != null ? String(p.user_id) : null,
    ].filter(Boolean) as string[];
    keys.forEach((k) => {
      userPaymentsCountMap.set(k, (userPaymentsCountMap.get(k) || 0) + 1);
    });
  });

  // ── Build users from legacy users table (409 rows) ──
  const legacyUsers = (dbUsersData ?? []).map((u: any) => {
    const idStr = String(u.user_id);
    const ownedTitles = ownedBooksMap.get(idStr) || [];
    return {
      id: idStr,
      name: u.username || u.email?.split("@")[0] || `User #${u.user_id}`,
      email: u.email || null,
      status: u.account_status || "active",
      date: u.registration_date ? new Date(u.registration_date).toISOString().split("T")[0] : "-",
      booksOwned: ownedTitles.length,
      ownedBookTitles: ownedTitles,
      paymentsCount: userPaymentsCountMap.get(idStr) || 0,
      isLegacy: true,
    };
  });

  // ── Build users from Supabase auth profiles ──
  const authUserMap = new Map<string, any>((authUsersData?.data?.users ?? []).map((u: any) => [String(u.id), u]));
  const legacyIdSet = new Set(legacyUsers.map((u) => u.id));

  const profileUsers = (profilesData ?? []).map((p: any) => {
    const idStr = String(p.id);
    const authU = authUserMap.get(idStr);
    const ownedTitles = ownedBooksMap.get(idStr) || [];
    return {
      id: idStr,
      name: p.full_name || p.username || authU?.email?.split("@")[0] || `User #${idStr.slice(0, 8)}`,
      email: authU?.email || null,
      status: p.account_status || "active",
      date: p.created_at ? new Date(p.created_at).toISOString().split("T")[0] : "-",
      booksOwned: ownedTitles.length,
      ownedBookTitles: ownedTitles,
      paymentsCount: userPaymentsCountMap.get(idStr) || 0,
      isLegacy: false,
    };
  });

  // Merge users
  const users = [
    ...legacyUsers,
    ...profileUsers.filter((pu) => !legacyIdSet.has(pu.id)),
  ];

  users.sort((a, b) =>
    b.booksOwned - a.booksOwned ||
    b.paymentsCount - a.paymentsCount ||
    (b.date > a.date ? 1 : -1)
  );

  const userNameMap = new Map<string, string>();
  users.forEach((u) => userNameMap.set(u.id, u.name));

  // ── Revenue stats ──
  const rawPayments = paymentsData ?? [];
  const sum = (list: typeof rawPayments) =>
    list.reduce((s, p) => s + Number(p.amount ?? 0), 0);

  const approvedList = rawPayments.filter((p) => p.status === "approved");
  const pendingList = rawPayments.filter((p) => p.status === "pending");
  const rejectedList = rawPayments.filter((p) => p.status === "rejected");

  const now = new Date();
  const monthlyRevenue = sum(
    approvedList.filter((p) => {
      if (!p.created_at) return false;
      const d = new Date(p.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
  );

  const payments = rawPayments.map((p: any) => {
    const userKey = p.auth_user_id ? String(p.auth_user_id) : p.user_id != null ? String(p.user_id) : "";
    return {
      id: p.id,
      user: userKey ? (userNameMap.get(userKey) || "Unknown") : "Unknown",
      book: p.book_id ? bookTitleMap.get(p.book_id) || "Unknown" : "Unknown",
      method: p.payment_method,
      ref: p.reference_number || "-",
      amount: `$${Number(p.amount ?? 0).toLocaleString()}`,
      date: p.created_at ? new Date(p.created_at).toISOString().split("T")[0] : "-",
      status: (p.status || "pending") as "pending" | "approved" | "rejected",
      receiptUrl: p.proof_image_path || null,
      adminNotes: p.admin_notes || null,
    };
  });

  const activity = (activityData ?? []).map((a: any) => {
    const userKey = a.user_id != null ? String(a.user_id) : a.auth_user_id ? String(a.auth_user_id) : "";
    return {
      user: userKey ? (userNameMap.get(userKey) || "Unknown") : "Unknown",
      book: a.book_id ? bookTitleMap.get(a.book_id) || "Unknown" : "Unknown",
      status: a.reading_status || "not_started",
    };
  });

  const books = (booksData ?? []).map((b) => {
    let coverUrl: string | null = null;
    if (b.cover_image) {
      if (b.cover_image.startsWith("http") || b.cover_image.startsWith("data:")) {
        coverUrl = b.cover_image;
      } else if (b.cover_image.startsWith("/")) {
        coverUrl = b.cover_image;
      } else {
        const { data } = adminSupabase.storage.from("covers").getPublicUrl(b.cover_image);
        coverUrl = data.publicUrl || `/uploads/${b.cover_image}`;
      }
    }
    return {
      id: b.id,
      title: b.title,
      author: b.author || "N/A",
      is_paid: b.is_paid === true || (b.is_paid as unknown) === 1,
      price: b.price ? `$${Number(b.price).toLocaleString()}` : "0",
      priceRaw: Number(b.price ?? 0),
      views: b.views || 0,
      downloads: b.total_downloads || 0,
      is_active: b.is_active === true || (b.is_active as unknown) === 1,
      category: b.category ?? null,
      description: b.description ?? null,
      pages: b.pages ?? 0,
      coverUrl,
      file_link: b.file_link || "",
    };
  });

  const blogPosts = (blogData ?? []).map((b) => {
    let imgUrl: string | null = null;
    if (b.featured_image) {
      if (b.featured_image.startsWith("http") || b.featured_image.startsWith("data:")) {
        imgUrl = b.featured_image;
      } else if (b.featured_image.startsWith("/")) {
        imgUrl = b.featured_image;
      } else if (b.featured_image.startsWith("blog/")) {
        imgUrl = `/uploads/${b.featured_image}`;
      } else {
        const { data } = adminSupabase.storage.from("covers").getPublicUrl(b.featured_image);
        imgUrl = data.publicUrl || `/uploads/${b.featured_image}`;
      }
    }
    return {
      id: b.id,
      title: b.title,
      slug: b.slug,
      status: b.status || "draft",
      view_count: b.view_count || 0,
      date: b.created_at ? new Date(b.created_at).toISOString().split("T")[0] : "-",
      category: b.category_id ? categoryMap.get(b.category_id) || "—" : "—",
      category_id: b.category_id || null,
      excerpt: b.excerpt || null,
      content: b.content || "",
      featured_image: imgUrl || b.featured_image || null,
      meta_title: b.meta_title || null,
      meta_description: b.meta_description || null,
    };
  });

  const summaries = (summariesData ?? []).map((s) => ({
    id: s.id,
    title: s.title,
    book_title: s.book_title || null,
    book_author: s.book_author || null,
    is_paid: s.is_paid === true || (s.is_paid as unknown) === 1,
    price: s.price ? `$${Number(s.price).toLocaleString()}` : "0",
    views: s.views || 0,
    date: s.created_at ? new Date(s.created_at).toISOString().split("T")[0] : "-",
    description: s.description || null,
    content_html: s.content_html || "",
    cover_image: s.cover_image || null,
    summary_creator: s.summary_creator || null,
    pages: s.pages || null,
  }));

  const blogCategories = (blogCategoriesData ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));

  const stats = {
    totalRevenue: `$${sum(approvedList).toLocaleString()}`,
    monthlyRevenue: `$${monthlyRevenue.toLocaleString()}`,
    pendingValue: `$${sum(pendingList).toLocaleString()}`,
    pendingCount: pendingList.length,
    approvedCount: approvedList.length,
    rejectedCount: rejectedList.length,
    readersCount: users.length,
    activeReadersCount: users.filter((u) => u.booksOwned > 0).length,
    booksCount: books.length,
    blogCount: blogPosts.length,
    summariesCount: summaries.length,
  };

  return (
    <AdminClient
      data={{
        payments,
        books,
        users,
        activity,
        blogPosts,
        summaries,
        blogCategories,
        stats,
      }}
    />
  );
}