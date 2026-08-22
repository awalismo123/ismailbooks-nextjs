-- IsmailBooks: Supabase Row Level Security (RLS) Policies
-- Run this in your Supabase SQL Editor to secure your tables and clear the warnings.

-- 1. Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_providers ENABLE ROW LEVEL SECURITY;

-- 2. Publicly Readable Tables (Anyone can view catalog, blog, and settings)
CREATE POLICY "Publicly readable books" ON books FOR SELECT USING (is_active = true);
CREATE POLICY "Publicly readable summaries" ON summaries FOR SELECT USING (is_active = true);
CREATE POLICY "Publicly readable blog categories" ON blog_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Publicly readable blog posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Publicly readable book insights" ON book_insights FOR SELECT USING (is_active = true);
CREATE POLICY "Publicly readable site settings" ON site_settings FOR SELECT USING (true);

-- 3. Reader annotations: one user sees only their own rows.
-- This mirrors the project’s dual-ID pattern used by reading_progress.
CREATE POLICY "User can read own highlights" ON highlights FOR SELECT USING (
  auth_user_id = auth.uid() OR user_id = (
    SELECT user_id FROM public.users WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()) LIMIT 1
  )
);
CREATE POLICY "User can write own highlights" ON highlights FOR INSERT WITH CHECK (
  auth_user_id = auth.uid() OR user_id = (
    SELECT user_id FROM public.users WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()) LIMIT 1
  )
);
CREATE POLICY "User can update own highlights" ON highlights FOR UPDATE USING (
  auth_user_id = auth.uid() OR user_id = (
    SELECT user_id FROM public.users WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()) LIMIT 1
  )
) WITH CHECK (
  auth_user_id = auth.uid() OR user_id = (
    SELECT user_id FROM public.users WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()) LIMIT 1
  )
);
CREATE POLICY "User can delete own highlights" ON highlights FOR DELETE USING (
  auth_user_id = auth.uid() OR user_id = (
    SELECT user_id FROM public.users WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()) LIMIT 1
  )
);

CREATE POLICY "User can read own bookmarks" ON bookmarks FOR SELECT USING (
  auth_user_id = auth.uid() OR user_id = (
    SELECT user_id FROM public.users WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()) LIMIT 1
  )
);
CREATE POLICY "User can write own bookmarks" ON bookmarks FOR INSERT WITH CHECK (
  auth_user_id = auth.uid() OR user_id = (
    SELECT user_id FROM public.users WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()) LIMIT 1
  )
);
CREATE POLICY "User can update own bookmarks" ON bookmarks FOR UPDATE USING (
  auth_user_id = auth.uid() OR user_id = (
    SELECT user_id FROM public.users WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()) LIMIT 1
  )
) WITH CHECK (
  auth_user_id = auth.uid() OR user_id = (
    SELECT user_id FROM public.users WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()) LIMIT 1
  )
);
CREATE POLICY "User can delete own bookmarks" ON bookmarks FOR DELETE USING (
  auth_user_id = auth.uid() OR user_id = (
    SELECT user_id FROM public.users WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()) LIMIT 1
  )
);

-- 4. Everything else is restricted by default.
-- Because we are keeping your integer 'user_id' system instead of using Supabase's built-in UUIDs, 
-- your Next.js application will use the secure "service_role" key in its server API routes to bypass 
-- RLS and handle sensitive tasks (like login, payments, and admin dashboards) securely on the server side.
