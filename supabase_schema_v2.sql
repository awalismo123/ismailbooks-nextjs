-- IsmailBooks: Supabase PostgreSQL Schema Migration v2
-- Run this in your Supabase SQL Editor

-- 0. Drop existing tables to start fresh
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS user_summaries CASCADE;
DROP TABLE IF EXISTS user_books CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS summaries CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS reading_progress CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;
DROP TABLE IF EXISTS oauth_providers CASCADE;
DROP TABLE IF EXISTS daily_stats CASCADE;
DROP TABLE IF EXISTS book_insights CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- 1. admin_users
CREATE TABLE admin_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. blog_categories
CREATE TABLE blog_categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_so TEXT,
  slug TEXT NOT NULL,
  description TEXT,
  description_so TEXT,
  icon TEXT DEFAULT 'bi-folder',
  color TEXT DEFAULT '#70193D',
  sort_order INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. blog_posts
CREATE TABLE blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  featured_image_alt TEXT,
  category_id BIGINT,
  author_id BIGINT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  focus_keyword TEXT,
  status TEXT DEFAULT 'draft',
  is_featured INTEGER DEFAULT 0,
  allow_comments INTEGER DEFAULT 1,
  view_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  estimated_read_time INTEGER,
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. books
CREATE TABLE books (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  description TEXT,
  cover_image TEXT,
  file_link TEXT NOT NULL,
  is_paid INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  category TEXT DEFAULT 'free',
  pages INTEGER,
  price DECIMAL(10,2),
  file_size TEXT,
  file_hash TEXT,
  total_downloads INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  average_rating DECIMAL(3,2),
  total_reviews INTEGER DEFAULT 0,
  reading_time_estimate INTEGER
);

-- 5. book_insights
CREATE TABLE book_insights (
  id BIGSERIAL PRIMARY KEY,
  book_id BIGINT NOT NULL,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  bg_color TEXT DEFAULT 'card-bg-1',
  font_family TEXT DEFAULT 'Lora',
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. daily_stats
CREATE TABLE daily_stats (
  id BIGSERIAL PRIMARY KEY,
  stat_date DATE NOT NULL,
  total_users INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  new_users INTEGER DEFAULT 0,
  books_opened INTEGER DEFAULT 0,
  total_reading_time INTEGER DEFAULT 0,
  total_books INTEGER DEFAULT 0,
  total_summaries INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. oauth_providers
CREATE TABLE oauth_providers (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  provider TEXT NOT NULL,
  provider_user_id TEXT NOT NULL,
  provider_email TEXT,
  provider_avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. password_reset_tokens
CREATE TABLE password_reset_tokens (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. payments
CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  payment_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  book_id BIGINT,
  summary_id BIGINT,
  payment_method TEXT NOT NULL,
  reference_number TEXT,
  proof_image_path TEXT,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  notify_sent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- 10. reading_progress
CREATE TABLE reading_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  book_id BIGINT NOT NULL,
  chapter_index INTEGER DEFAULT 0,
  scroll_position INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  completed INTEGER DEFAULT 0,
  last_read TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. site_settings
CREATE TABLE site_settings (
  id BIGSERIAL PRIMARY KEY,
  setting_key TEXT NOT NULL,
  setting_value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. summaries
CREATE TABLE summaries (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  book_title TEXT,
  book_author TEXT,
  summary_creator TEXT,
  description TEXT,
  content_html TEXT NOT NULL,
  is_paid INTEGER DEFAULT 0,
  price DECIMAL(10,2),
  pages INTEGER,
  file_size BIGINT,
  cover_image TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. users
CREATE TABLE users (
  user_id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  registration_date TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  account_status TEXT DEFAULT 'active',
  profile_complete INTEGER DEFAULT 0,
  total_reading_time INTEGER DEFAULT 0,
  books_completed INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_reading_date DATE
);

-- 14. user_books
CREATE TABLE user_books (
  user_book_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  book_id BIGINT NOT NULL,
  payment_id BIGINT DEFAULT 0,
  access_count INTEGER DEFAULT 0,
  last_accessed TIMESTAMPTZ,
  acquired_date TIMESTAMPTZ DEFAULT NOW(),
  reading_status TEXT DEFAULT 'not_started',
  rating INTEGER,
  review_id BIGINT
);

-- 15. user_summaries
CREATE TABLE user_summaries (
  user_summary_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  summary_id BIGINT NOT NULL,
  payment_id BIGINT NOT NULL,
  access_count INTEGER DEFAULT 0,
  last_accessed TIMESTAMPTZ,
  acquired_date TIMESTAMPTZ DEFAULT NOW(),
  reading_status TEXT DEFAULT 'not_started',
  rating INTEGER,
  review_id BIGINT
);

-- 16. user_sessions
CREATE TABLE user_sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  session_id TEXT NOT NULL,
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Finally, re-enable RLS on all tables
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
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_providers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Publicly readable books" ON books FOR SELECT USING (is_active = true);
CREATE POLICY "Publicly readable summaries" ON summaries FOR SELECT USING (true);
CREATE POLICY "Publicly readable blog categories" ON blog_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Publicly readable blog posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Publicly readable book insights" ON book_insights FOR SELECT USING (is_active = true);
CREATE POLICY "Publicly readable site settings" ON site_settings FOR SELECT USING (true);
