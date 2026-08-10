# IsmailBooks — Phase-by-Phase Completion Plan
**Project:** PHP/LEMP → Next.js 15 + Supabase + Vercel migration  
**Status at start:** ~45% complete  
**Goal:** Production-ready at `ismailbooks.com`

---

## How to Read This Plan

Each phase must be **completed and verified** before starting the next.  
Every item lists: the exact files to touch, what to build, and how to verify it works.

> **Colour Key**
> - 🔴 Blocking — site cannot launch without this  
> - 🟡 Important — needed for feature parity  
> - 🟢 Polish — improves quality, not blocking launch

---

## Phase 0 — Critical Fixes (Day 1 — must do first)
> These are bugs in the current code that make existing pages non-functional.

### 0-A 🔴 Fix Blog Post Detail Page — Remove Hardcoded Data

**Problem:** `/blog/[slug]/page.tsx` is a `"use client"` component with **all blog content hardcoded** in a static object. It never touches Supabase. Only 5 posts are visible and they are fake.

**What to build:**
- Convert to a `async` Server Component (remove `"use client"`)
- Remove the entire `allBlogPosts` static dictionary
- Fetch the post from Supabase using the `slug` param:
  ```ts
  supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single()
  ```
- Render `post.content` as HTML (use `dangerouslySetInnerHTML` since content is HTML from editor)
- Add `generateMetadata()` using `post.meta_title` / `post.meta_description` / `post.title`
- Increment `views` on page load (fire-and-forget update)
- Call `notFound()` if post is null

**Files:**
- `src/app/blog/[slug]/page.tsx` — complete rewrite

**Verify:** Visit any real blog post slug from your Supabase `blog_posts` table → content loads from DB.

---

### 0-B 🔴 Fix Reading Progress Save in BookReaderClient

**Problem:** `BookReaderClient.tsx` loads TOC + chapters from Supabase Storage correctly, but **never saves reading progress** back to the database. Progress is always 0 on the dashboard.

**What to build:**
- Add a server action `src/app/actions/reader.ts`:
  ```ts
  export async function saveProgressAction(formData: FormData)
  // Upserts into reading_progress: chapter_index, time_spent, completed
  // Also updates user_books.reading_status to "reading" or "completed"
  ```
- In `BookReaderClient.tsx`:
  - On chapter change → call `saveProgressAction` with `chapter_index`
  - On page load → fetch existing `reading_progress` for this book, restore `currentChapter`
  - Track elapsed time with `setInterval` → save `time_spent` on chapter change

**Files:**
- `src/app/actions/reader.ts` — new file
- `src/components/books/BookReaderClient.tsx` — add progress load + save

**Verify:** Open a book, advance a chapter, close it, reopen → lands on the same chapter.

---

### 0-C 🔴 Verify Google OAuth Callback Creates Profile Row

**Problem:** The `/auth/callback` route handles the OAuth token exchange, but if it doesn't insert a row into `profiles`, every subsequent query on `profiles` returns null — breaking dashboard, admin check, etc.

**What to check:**
- Open `src/app/auth/callback/` and read its `route.ts` or `page.tsx`
- Confirm it calls `supabase.auth.exchangeCodeForSession()` (standard Supabase flow)
- Confirm a Supabase Database Trigger exists on `auth.users INSERT` to auto-create a `profiles` row

**If the trigger is missing**, add it in Supabase SQL editor:
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, is_admin, account_status, created_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    false,
    'active',
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

**Files:**
- `src/app/auth/callback/` — read and verify
- Supabase SQL editor — add trigger if missing

**Verify:** Register a new test user with Google → profile row appears in `public.profiles`.

---

## Phase 1 — Public Content Pages (Days 2–3)
> Make every public-facing page fully dynamic and production-ready.

### 1-A 🔴 Blog Listing — Add Category Filter

**What to build:**
- Fetch `blog_categories` in `src/app/blog/page.tsx`
- Render category filter pills (client component for interactivity)
- Support URL query param `?category=slug` to filter posts server-side

**Files:**
- `src/app/blog/page.tsx` — add categories fetch + filter support
- `src/components/blog/BlogCategoryFilter.tsx` — new client component (pill buttons)

**Verify:** Click a category pill → only posts in that category shown.

---

### 1-B 🔴 Blog Category Page

**What to build:**
- New route `src/app/blog/category/[slug]/page.tsx`
- Fetch posts where `category_id` matches the category slug
- Same card grid as the main blog page
- `generateMetadata()` using the category name

**Files:**
- `src/app/blog/category/[slug]/page.tsx` — new file

**Verify:** `/blog/category/falsafadda` shows only philosophy posts.

---

### 1-C 🟡 Book Detail Page — Star Ratings + Reviews Section

**Problem:** The book detail page (`/books/[id]/page.tsx`) already fetches `average_rating` and `total_reviews` from `books` table but the UI may not render them fully. Also, no review form exists.

**What to build:**
- Render star rating display (1–5 stars) using `average_rating`
- Show `total_reviews` count
- Section below book info: list of public reviews from `book_reviews` table
- Review submission form (client component):
  - Only for logged-in users who **own** the book (`user_books` check)
  - Star picker (1–5) + text area
  - Submit calls `submitReviewAction`
- Server action `src/app/actions/reviews.ts`:
  ```ts
  export async function submitReviewAction(formData: FormData)
  // Upserts into book_reviews (rating + review_text)
  // Supabase triggers auto-update books.average_rating
  ```

**Files:**
- `src/app/books/[id]/page.tsx` — add reviews fetch + render
- `src/components/books/ReviewForm.tsx` — new client component
- `src/app/actions/reviews.ts` — new file

**Verify:** Buy a book → review form appears → submit 5-star review → star rating on book detail updates.

---

### 1-D 🟡 Summaries Detail Page

**What to build:**
- New route `src/app/summaries/[id]/page.tsx`
- Fetch from `books` table where `id = params.id`
- Check if `content_html` exists (if the summaries are stored inline) or redirect to reader
- If `content_html` present: render full HTML inline (styled article, no chapter navigation needed)
- If `content_html` absent: redirect to `/books/[id]/read`

**Files:**
- `src/app/summaries/[id]/page.tsx` — new file

**Verify:** Click a summary card → detail page loads with full content.

---

### 1-E 🟡 User Profile Page

**What to build:**
- Route `src/app/profile/page.tsx` (protected — redirect if not logged in)
- Show: username, email, join date, account status badge
- Edit form: update `username` and `full_name` in `profiles` table
- Server action: `updateProfileAction` in `src/app/actions/profile.ts`

**Files:**
- `src/app/profile/page.tsx` — new file
- `src/app/actions/profile.ts` — new file

**Verify:** Change username → saved → dashboard shows new username.

---

### 1-F 🔴 About Page + Privacy Policy Page

**What to build:**
- `src/app/about/page.tsx` — static content (who is IsmailBooks, mission, contact)
- `src/app/privacy/page.tsx` — static content (privacy policy text)
- Both use `Navbar` + `Footer`, proper `metadata` export

**Files:**
- `src/app/about/page.tsx` — new file
- `src/app/privacy/page.tsx` — new file

**Verify:** `/about` and `/privacy` render without errors.

---

## Phase 2 — Admin: Blog Full CRUD (Days 4–5)
> The admin panel currently can only **view** blog posts. This phase adds full management.

### 2-A 🔴 Admin Blog — Create / Edit Post Form

**What to build:**
- A new admin section tab: `"blog-editor"` added to `AdminClient.tsx`
- Or better: a dedicated route `src/app/admin/blog/page.tsx` for better URL structure
- Form fields (all mapped to `blog_posts` table):
  - `title` (text input)
  - `slug` (auto-generated from title, editable)
  - `excerpt` (textarea)
  - `content` (rich text editor — use **Tiptap** or `@uiw/react-md-editor` for markdown)
  - `category_id` (dropdown from `blog_categories`)
  - `meta_title`, `meta_description`, `focus_keyword` (SEO fields, collapsible section)
  - `is_featured` (checkbox)
  - `published` (toggle — draft / published)
  - `read_time` (number input)
  - Featured image upload → Supabase Storage `blog-images` bucket
- Server actions in `src/app/actions/blog.ts`:
  ```ts
  export async function saveBlogPostAction(formData: FormData)
  export async function deleteBlogPostAction(formData: FormData)
  export async function toggleBlogPublishedAction(formData: FormData)
  ```

**Files:**
- `src/app/admin/blog/page.tsx` — new file (or new tab in AdminClient)
- `src/app/actions/blog.ts` — new file
- `src/components/admin/BlogPostForm.tsx` — new client component

**Verify:**
1. Create a new post with title + content → appears in `/blog`
2. Edit an existing post → changes reflected immediately
3. Delete a post → gone from listing
4. Toggle draft ↔ published → only published posts appear on `/blog`

---

### 2-B 🟡 Admin Blog — Category Management

**What to build:**
- Tab or sub-section in admin blog area: `"Blog Catagories"`
- CRUD for `blog_categories`: name, name_so (Somali), slug, icon, color
- Server actions in `src/app/actions/blog.ts`:
  ```ts
  export async function saveCategoryAction(formData: FormData)
  export async function deleteCategoryAction(formData: FormData)
  ```
- Category list table with edit/delete buttons

**Files:**
- `src/app/actions/blog.ts` — add category actions
- `src/components/admin/BlogCategoryManager.tsx` — new component

**Verify:** Create category "Horumar" → it appears in the blog post create form dropdown + filter pills on `/blog`.

---

### 2-C 🟡 Admin Summaries — Full CRUD

**What to build:**
- New tab `"summaries"` in `AdminClient.tsx`
- Form fields: `title`, `author` (original book author), `description`, `content_html` (rich text), `is_paid`, `price`, `pages`, `cover_image` upload
- Note: If summaries are stored in the `books` table with a category, the create form should auto-set `category = "summary"`. If there's a separate `summaries` table, target that instead.
- Server actions: `saveSummaryAction`, `deleteSummaryAction` (add to `src/app/actions/books.ts` or a new `summaries.ts`)

**Files:**
- `src/components/admin/AdminClient.tsx` — add summaries tab
- `src/app/actions/summaries.ts` — new file (or extend books.ts)
- `src/components/admin/SummaryFormModal.tsx` — new component

**Verify:** Create a summary with HTML content → appears on `/summaries` → clicking it shows full content.

---

### 2-D 🟡 Admin Book Insights — CRUD + Reorder

**What to build:**
- New tab `"insights"` in admin
- List insights per book (dropdown to select which book)
- Form fields: `quote`, `author`, `bg_color` (color picker/preset), `font_family`, `display_order`
- Drag-to-reorder (use `@dnd-kit/sortable`) → updates `display_order` via server action
- Server actions: `saveInsightAction`, `deleteInsightAction`, `reorderInsightsAction`

**Files:**
- `src/app/actions/insights.ts` — new file
- `src/components/admin/InsightsManager.tsx` — new client component

**Verify:** Add 3 quotes to a book → reorder by drag → homepage `BookInsightsQuotes` shows them in new order.

---

## Phase 3 — Admin: Site Settings (Day 6)

### 3-A 🟡 Site Settings Panel

**What to build:**
- New tab `"settings"` in AdminClient
- Grouped form sections (matching old `site_settings` table keys):
  1. **Site Info** — `site_name`, `site_description`, `contact_email`, `contact_phone`, WhatsApp number
  2. **Social Media** — Twitter, Instagram, YouTube, Telegram, TikTok, Facebook (URL inputs)
  3. **Maintenance Mode** — toggle + message textarea
- Store in Supabase `site_settings` table (key-value)
- Server action: `saveSiteSettingsAction` in `src/app/actions/settings.ts`
- Read settings in `Footer.tsx` and `Navbar.tsx` for social links

**Files:**
- `src/app/actions/settings.ts` — new file
- `src/components/admin/SiteSettingsPanel.tsx` — new component
- `src/components/layout/Footer.tsx` — read social links from DB or env
- `src/lib/supabase/settings.ts` — helper to fetch settings (cached)

**Verify:** Update Instagram URL in settings → Footer shows new link.

---

### 3-B 🟡 Maintenance Mode Middleware

**What to build:**
- In `src/middleware.ts`, after session refresh:
  ```ts
  // Check maintenance mode from Supabase (cached via edge config or short TTL)
  // If active AND not admin AND not auth route → redirect to /maintenance
  ```
- `src/app/maintenance/page.tsx` — simple maintenance page with message from settings

**Files:**
- `src/middleware.ts` — add maintenance check
- `src/app/maintenance/page.tsx` — new file

**Verify:** Enable maintenance mode → non-admin users see maintenance page → admin still sees site.

---

## Phase 4 — Reading Progress & Dashboard (Day 7)

### 4-A 🔴 Dashboard — Real Reading Stats

**Problem:** `dashboard/page.tsx` hardcodes `currentStreak: 0`, `totalReadingTimeMinutes: 0`, `booksCompleted: 0`.

**What to build:**
- Query `reading_progress` for the current user:
  ```ts
  const { data: progress } = await supabase
    .from("reading_progress")
    .select("book_id, time_spent, completed, last_read")
    .eq("user_id", user.id);
  ```
- Compute:
  - `booksCompleted` = count of rows where `completed = true`
  - `totalReadingTimeMinutes` = sum of `time_spent` / 60
  - `currentStreak` = consecutive days with `last_read` activity (JavaScript date diff logic)
- Update the `userStats` object in `dashboard/page.tsx` with real values
- Show real reading progress % on each book card:
  - Join `reading_progress.chapter_index` with book's total chapter count

**Files:**
- `src/app/dashboard/page.tsx` — replace mocked stats with real queries

**Verify:** Read 2 chapters → dashboard shows `totalReadingTime > 0` and book shows correct progress %.

---

### 4-B 🟡 Notifications System

**What to build:**
- Notification bell icon in `Navbar.tsx` (client component, shows badge count)
- Fetch unread count: `reading_progress` — no wait — `notifications` table:
  ```ts
  supabase.from("notifications").select("id").eq("user_id", userId).eq("read_status", false)
  ```
- Dropdown on bell click: list recent notifications with title + message
- `src/app/actions/notifications.ts`:
  ```ts
  export async function markNotificationReadAction(formData: FormData)
  export async function markAllReadAction(formData: FormData)
  ```
- Trigger notification creation in `approvePaymentAction` and `rejectPaymentAction`:
  ```ts
  await adminSupabase.from("notifications").insert({
    user_id: payment.auth_user_id,
    type: "payment_approved",
    title: "Lacag-bixintaada waa la ansixiyay ✓",
    message: `Hada waxaad si buuxda u geli kartaa buugga.`,
  });
  ```

**Files:**
- `src/components/layout/Navbar.tsx` — add notification bell
- `src/components/layout/NotificationBell.tsx` — new client component
- `src/app/actions/notifications.ts` — new file
- `src/app/actions/payment.ts` — add notification insert after approve/reject

**Verify:** Admin approves a payment → user sees bell badge → clicks it → sees "payment approved" notification.

---

### 4-C 🟢 Reading Lists

**What to build:**
- User dashboard section: "My Reading Lists"
- Create a new list (name, description)
- Add/remove books from a list
- View list contents

**Files:**
- `src/app/dashboard/page.tsx` — add reading lists section
- `src/app/actions/readinglist.ts` — new file (CRUD on `reading_lists` + `reading_list_items`)
- `src/components/books/AddToListButton.tsx` — new component (shows on book cards)

---

## Phase 5 — SEO, Redirects & Static (Day 8)

### 5-A 🔴 XML Sitemap

**What to build:**
- `src/app/sitemap.ts` (Next.js built-in sitemap support):
  ```ts
  export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch all active books, blog posts, summaries
    // Return array of { url, lastModified, changeFrequency, priority }
  }
  ```
- Includes: `/`, `/books`, `/summaries`, `/blog`, `/about`, `/privacy`
- Dynamic: each `/books/[id]`, `/summaries/[id]`, `/blog/[slug]`

**Files:**
- `src/app/sitemap.ts` — new file

**Verify:** `/sitemap.xml` returns valid XML with all URLs.

---

### 5-B 🔴 Old URL Redirects

**Problem:** Old PHP site used query strings. Any existing links or Google index entries will 404.

**What to build:**
Add to `next.config.ts`:
```ts
async redirects() {
  return [
    { source: "/books/show", destination: "/books/:id", permanent: true,
      has: [{ type: "query", key: "id", value: "(?<id>.*)" }] },
    { source: "/summaries/show", destination: "/summaries/:id", permanent: true,
      has: [{ type: "query", key: "id", value: "(?<id>.*)" }] },
    { source: "/reader", destination: "/books/:book/read", permanent: true,
      has: [{ type: "query", key: "book", value: "(?<book>.*)" }] },
    { source: "/user/dashboard", destination: "/dashboard", permanent: true },
    { source: "/book-detail", destination: "/books/:id", permanent: true,
      has: [{ type: "query", key: "id", value: "(?<id>.*)" }] },
    { source: "/summary-detail", destination: "/summaries/:id", permanent: true,
      has: [{ type: "query", key: "id", value: "(?<id>.*)" }] },
    { source: "/auth-choice", destination: "/login", permanent: true },
  ];
}
```

**Files:**
- `next.config.ts` — add `redirects()`

**Verify:** Visit `/books/show?id=3` → 301 redirect to `/books/3`.

---

### 5-C 🔴 robots.txt

**What to build:**
- `src/app/robots.ts` (Next.js built-in):
  ```ts
  export default function robots(): MetadataRoute.Robots {
    return {
      rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/dashboard"] },
      sitemap: "https://ismailbooks.com/sitemap.xml",
    };
  }
  ```

**Files:**
- `src/app/robots.ts` — new file

---

### 5-D 🟡 Per-Page OpenGraph Images (Social Cards)

**What to build:**
- `src/app/opengraph-image.tsx` — default OG image
- `src/app/blog/[slug]/opengraph-image.tsx` — dynamic OG image for blog posts using Next.js `ImageResponse`
- `src/app/books/[id]/opengraph-image.tsx` — book cover as OG image

**Files:**
- `src/app/opengraph-image.tsx`
- `src/app/blog/[slug]/opengraph-image.tsx`
- `src/app/books/[id]/opengraph-image.tsx`

---

## Phase 6 — Admin Analytics (Day 9)

### 6-A 🟡 Analytics Tab in Admin

**What to build:**
- New tab `"analytics"` in `AdminClient.tsx`
- Metrics to show:
  - **Daily Active Users** — count distinct `auth_user_id` from `reading_progress` where `last_read >= today`
  - **Weekly Active Users** — same, last 7 days
  - **Monthly Active Users** — same, last 30 days
  - **Top 10 Books by Views** — from `books.views`
  - **Revenue over time** — group `payments` by week/month (approved only)
- Bar chart for revenue: use a lightweight chart library (e.g., **Recharts** — already common in Next.js projects)
- Fetch all analytics data in `src/app/admin/page.tsx` and pass to `AdminClient`

**Files:**
- `src/app/admin/page.tsx` — add analytics queries
- `src/components/admin/AdminClient.tsx` — add analytics tab
- `src/components/admin/AnalyticsCharts.tsx` — new client component (Recharts)

**Verify:** Analytics tab shows real user counts and top books from actual Supabase data.

---

## Phase 7 — Production Cutover (Day 10)

### 7-A 🔴 Environment Variables on Vercel

Make sure these are set in Vercel project settings:
| Key | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role (server-only) |
| `NEXT_PUBLIC_SITE_URL` | `https://ismailbooks.com` |

### 7-B 🔴 Supabase Auth Redirect URLs

In Supabase Dashboard → Authentication → URL Configuration:
- **Site URL:** `https://ismailbooks.com`
- **Redirect URLs:** Add `https://ismailbooks.com/auth/callback`
- Also add your Vercel preview URL: `https://*.vercel.app/auth/callback`

### 7-C 🔴 Google OAuth Redirect URI

In Google Cloud Console → OAuth Client:
- Add `https://ismailbooks.com/auth/callback` as Authorized Redirect URI
- Also update the Supabase Google provider with the correct client ID + secret

### 7-D 🔴 Supabase Storage Buckets — Verify Public Access

Confirm these buckets exist and have correct public/private settings:
| Bucket | Access |
|---|---|
| `covers` | Public (book covers displayed on public pages) |
| `receipts` | Private (payment receipts — admin only via service role) |
| `book-content` | Public (chapter HTML files served to authenticated readers) |
| `blog-images` | Public (blog featured images) |

### 7-E 🔴 DNS Cutover — Hostinger → Vercel

1. Deploy to Vercel, get the Vercel project domain (e.g. `ismailbooks-nextjs.vercel.app`)
2. In Vercel: Add custom domain `ismailbooks.com` and `www.ismailbooks.com`
3. In Hostinger DNS (do NOT change nameservers — only add/change DNS records):
   - **Delete** any existing A record for `@` pointing to Hostinger server
   - **Add** `A` record: `@` → Vercel's IP `76.76.21.21`
   - **Add** `CNAME` record: `www` → `cname.vercel-dns.com`
4. Wait for DNS propagation (5–30 minutes with low TTL)
5. Verify SSL certificate is auto-issued by Vercel

### 7-F 🔴 Smoke Test Checklist (run after cutover)

| Test | Expected |
|---|---|
| `https://ismailbooks.com` | Homepage loads with books |
| `https://ismailbooks.com/books` | Books catalog with real data |
| `https://ismailbooks.com/blog` | Blog posts from Supabase |
| `https://ismailbooks.com/blog/[real-slug]` | Post content renders from DB |
| Login with email | Redirects to dashboard |
| Login with Google | Profile created, redirects to dashboard |
| Buy a book → submit payment | Payment row created, admin sees it |
| Admin approve payment | User gains book access |
| Open a book in reader | Chapters load from Supabase Storage |
| `/books/show?id=1` | 301 redirect to `/books/1` |
| `/sitemap.xml` | Valid XML with URLs |
| `/robots.txt` | Disallows `/admin` |

---

## Summary: Files to Create (New) vs Files to Edit (Existing)

### New Files to Create

```
src/app/about/page.tsx
src/app/privacy/page.tsx
src/app/maintenance/page.tsx
src/app/profile/page.tsx
src/app/sitemap.ts
src/app/robots.ts
src/app/opengraph-image.tsx
src/app/blog/category/[slug]/page.tsx
src/app/blog/[slug]/opengraph-image.tsx
src/app/books/[id]/opengraph-image.tsx
src/app/summaries/[id]/page.tsx
src/app/admin/blog/page.tsx          ← or inline in AdminClient tabs
src/app/actions/reader.ts
src/app/actions/reviews.ts
src/app/actions/blog.ts
src/app/actions/summaries.ts
src/app/actions/insights.ts
src/app/actions/notifications.ts
src/app/actions/settings.ts
src/app/actions/readinglist.ts
src/app/actions/profile.ts
src/components/blog/BlogCategoryFilter.tsx
src/components/books/ReviewForm.tsx
src/components/books/AddToListButton.tsx
src/components/admin/BlogPostForm.tsx
src/components/admin/BlogCategoryManager.tsx
src/components/admin/SummaryFormModal.tsx
src/components/admin/InsightsManager.tsx
src/components/admin/SiteSettingsPanel.tsx
src/components/admin/AnalyticsCharts.tsx
src/components/layout/NotificationBell.tsx
src/lib/supabase/settings.ts
```

### Existing Files to Edit

```
src/app/blog/[slug]/page.tsx          ← Complete rewrite (currently hardcoded)
src/app/blog/page.tsx                 ← Add category filter
src/app/dashboard/page.tsx            ← Replace mocked stats with real queries
src/app/admin/page.tsx                ← Add analytics queries
src/app/auth/callback/route.ts        ← Verify + fix profile creation
src/app/actions/payment.ts            ← Add notifications on approve/reject
src/components/books/BookReaderClient.tsx  ← Add progress save/load
src/components/admin/AdminClient.tsx  ← Add summaries/insights/settings/analytics tabs
src/components/layout/Navbar.tsx      ← Add notification bell
src/components/layout/Footer.tsx      ← Read social links from settings
next.config.ts                        ← Add redirects()
```

---

## Phase Completion Checklist

| Phase | Description | Status |
|---|---|---|
| **Phase 0** | Critical fixes (blog hardcode, reader progress, OAuth) | ✅ Done |
| **Phase 1** | Public content pages (blog category, reviews, summaries, profile, about) | ✅ Done |
| **Phase 2** | Admin full CRUD (blog, summaries, insights) | ✅ Done |
| **Phase 3** | Admin site settings + maintenance mode | ⬜ |
| **Phase 4** | Dashboard real stats + notifications + reading lists | ⬜ |
| **Phase 5** | SEO: sitemap, redirects, robots.txt, OG images | ⬜ |
| **Phase 6** | Admin analytics tab | ⬜ |
| **Phase 7** | Production cutover: Vercel env, DNS, smoke test | ⬜ |
