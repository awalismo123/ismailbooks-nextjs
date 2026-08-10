-- ============================================================
-- ISMAILBOOKS.COM — FINAL SUPABASE IMPORT SCRIPT
-- Run this once in the Supabase SQL Editor. No other files needed.
-- ============================================================

-- STEP 1: Drop all existing tables (safe reset)
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS user_summaries CASCADE;
DROP TABLE IF EXISTS user_books CASCADE;
DROP TABLE IF EXISTS reading_progress CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;
DROP TABLE IF EXISTS oauth_providers CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS book_insights CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS summaries CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS daily_stats CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- STEP 2: Create tables
-- NOTE: All MySQL tinyint(1) booleans are kept as INTEGER here.
-- They will be converted to BOOLEAN after all data is inserted.

CREATE TABLE admin_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

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
  updated_at TIMESTAMPTZ,
  average_rating DECIMAL(3,2),
  total_reviews INTEGER DEFAULT 0,
  reading_time_estimate INTEGER
);

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

CREATE TABLE password_reset_tokens (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE site_settings (
  id BIGSERIAL PRIMARY KEY,
  setting_key TEXT NOT NULL,
  setting_value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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
  updated_at TIMESTAMPTZ
);

CREATE TABLE users (
  user_id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  phone_number TEXT,
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

CREATE TABLE user_sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  session_id TEXT NOT NULL,
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- STEP 3: DATA INSERTS (below)