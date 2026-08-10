/**
 * generate_final_sql.js
 * Reads the MySQL dump and produces ONE complete, final SQL file for Supabase.
 * Strategy: store booleans as INTEGER, insert all data, THEN convert to BOOLEAN,
 * THEN add RLS. This avoids all type-cast errors.
 */
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', '_ismail_books production live server database.sql');
const outputFile = path.join(__dirname, 'FINAL_supabase_import.sql');

const content = fs.readFileSync(inputFile, 'utf-8');

// ─── 1. SCHEMA SECTION ───────────────────────────────────────────────────────
const schema = `
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
`;

// ─── 2. DATA EXTRACTION ──────────────────────────────────────────────────────
const targetTables = [
  'admin_users', 'blog_categories', 'blog_posts', 'books', 'book_insights',
  'daily_stats', 'oauth_providers', 'password_reset_tokens', 'payments',
  'reading_progress', 'site_settings', 'summaries', 'users', 'user_books',
  'user_summaries', 'user_sessions'
];

let inserts = '\n';
const lines = content.split('\n');
let inInsert = false;
let activeTable = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const raw = line.replace(/\r$/, '');

  if (raw.startsWith('INSERT INTO `')) {
    const m = raw.match(/^INSERT INTO `([^`]+)`/);
    if (m && targetTables.includes(m[1])) {
      inInsert = true;
      activeTable = m[1];
    } else {
      inInsert = false;
    }
  }

  if (inInsert) {
    let out = raw
      // backtick identifiers → double-quoted
      .replace(/`([^`]+)`/g, '"$1"')
      // MySQL escaped single quotes → SQL standard
      .replace(/\\'/g, "''")
      // MySQL escaped double quotes
      .replace(/\\"/g, '"')
      // literal \r\n in string values
      .replace(/\\r\\n/g, '\n')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r');

    inserts += out + '\n';

    if (raw.trim().endsWith(';')) {
      inInsert = false;
    }
  }
}

// ─── 3. POST-INSERT: CONVERT TO BOOLEAN & ADD RLS ────────────────────────────
const postInsert = `
-- STEP 4: Convert integer columns to proper PostgreSQL BOOLEAN
-- Must DROP DEFAULT first, then change type, then SET DEFAULT again.
ALTER TABLE blog_categories ALTER COLUMN is_active DROP DEFAULT;
ALTER TABLE blog_categories ALTER COLUMN is_active TYPE BOOLEAN USING (is_active = 1);
ALTER TABLE blog_categories ALTER COLUMN is_active SET DEFAULT true;

ALTER TABLE blog_posts ALTER COLUMN is_featured DROP DEFAULT;
ALTER TABLE blog_posts ALTER COLUMN is_featured TYPE BOOLEAN USING (is_featured = 1);
ALTER TABLE blog_posts ALTER COLUMN is_featured SET DEFAULT false;

ALTER TABLE blog_posts ALTER COLUMN allow_comments DROP DEFAULT;
ALTER TABLE blog_posts ALTER COLUMN allow_comments TYPE BOOLEAN USING (allow_comments = 1);
ALTER TABLE blog_posts ALTER COLUMN allow_comments SET DEFAULT true;

ALTER TABLE books ALTER COLUMN is_paid DROP DEFAULT;
ALTER TABLE books ALTER COLUMN is_paid TYPE BOOLEAN USING (is_paid = 1);
ALTER TABLE books ALTER COLUMN is_paid SET DEFAULT false;

ALTER TABLE books ALTER COLUMN is_active DROP DEFAULT;
ALTER TABLE books ALTER COLUMN is_active TYPE BOOLEAN USING (is_active = 1);
ALTER TABLE books ALTER COLUMN is_active SET DEFAULT true;

ALTER TABLE book_insights ALTER COLUMN is_active DROP DEFAULT;
ALTER TABLE book_insights ALTER COLUMN is_active TYPE BOOLEAN USING (is_active = 1);
ALTER TABLE book_insights ALTER COLUMN is_active SET DEFAULT true;

ALTER TABLE password_reset_tokens ALTER COLUMN used DROP DEFAULT;
ALTER TABLE password_reset_tokens ALTER COLUMN used TYPE BOOLEAN USING (used = 1);
ALTER TABLE password_reset_tokens ALTER COLUMN used SET DEFAULT false;

ALTER TABLE payments ALTER COLUMN notify_sent DROP DEFAULT;
ALTER TABLE payments ALTER COLUMN notify_sent TYPE BOOLEAN USING (notify_sent = 1);
ALTER TABLE payments ALTER COLUMN notify_sent SET DEFAULT false;

ALTER TABLE reading_progress ALTER COLUMN completed DROP DEFAULT;
ALTER TABLE reading_progress ALTER COLUMN completed TYPE BOOLEAN USING (completed = 1);
ALTER TABLE reading_progress ALTER COLUMN completed SET DEFAULT false;

ALTER TABLE summaries ALTER COLUMN is_paid DROP DEFAULT;
ALTER TABLE summaries ALTER COLUMN is_paid TYPE BOOLEAN USING (is_paid = 1);
ALTER TABLE summaries ALTER COLUMN is_paid SET DEFAULT false;

ALTER TABLE users ALTER COLUMN profile_complete DROP DEFAULT;
ALTER TABLE users ALTER COLUMN profile_complete TYPE BOOLEAN USING (profile_complete = 1);
ALTER TABLE users ALTER COLUMN profile_complete SET DEFAULT false;

-- STEP 5: Reset sequences so new rows get correct IDs
SELECT setval(pg_get_serial_sequence('"admin_users"', 'id'), COALESCE((SELECT MAX("id") FROM "admin_users") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"blog_categories"', 'id'), COALESCE((SELECT MAX("id") FROM "blog_categories") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"blog_posts"', 'id'), COALESCE((SELECT MAX("id") FROM "blog_posts") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"books"', 'id'), COALESCE((SELECT MAX("id") FROM "books") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"book_insights"', 'id'), COALESCE((SELECT MAX("id") FROM "book_insights") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"daily_stats"', 'id'), COALESCE((SELECT MAX("id") FROM "daily_stats") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"oauth_providers"', 'id'), COALESCE((SELECT MAX("id") FROM "oauth_providers") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"password_reset_tokens"', 'id'), COALESCE((SELECT MAX("id") FROM "password_reset_tokens") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"payments"', 'id'), COALESCE((SELECT MAX("id") FROM "payments") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"reading_progress"', 'id'), COALESCE((SELECT MAX("id") FROM "reading_progress") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"site_settings"', 'id'), COALESCE((SELECT MAX("id") FROM "site_settings") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"summaries"', 'id'), COALESCE((SELECT MAX("id") FROM "summaries") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"users"', 'user_id'), COALESCE((SELECT MAX("user_id") FROM "users") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"user_books"', 'user_book_id'), COALESCE((SELECT MAX("user_book_id") FROM "user_books") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"user_summaries"', 'user_summary_id'), COALESCE((SELECT MAX("user_summary_id") FROM "user_summaries") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"user_sessions"', 'id'), COALESCE((SELECT MAX("id") FROM "user_sessions") + 1, 1), false);

-- STEP 6: Enable Row Level Security
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

-- STEP 7: Public read policies (now safe because columns are BOOLEAN)
CREATE POLICY "Public read books" ON books FOR SELECT USING (is_active = true);
CREATE POLICY "Public read blog categories" ON blog_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read blog posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read book insights" ON book_insights FOR SELECT USING (is_active = true);
CREATE POLICY "Public read summaries" ON summaries FOR SELECT USING (true);
CREATE POLICY "Public read site settings" ON site_settings FOR SELECT USING (true);

-- DONE! All data migrated and secured.
`;

fs.writeFileSync(outputFile, schema + inserts + postInsert, 'utf-8');
const size = (fs.statSync(outputFile).size / 1024).toFixed(1);
console.log(`Success! Created FINAL_supabase_import.sql (${size} KB)`);
console.log('Run that single file in your Supabase SQL Editor and you are done!');
