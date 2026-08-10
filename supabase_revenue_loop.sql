-- ============================================================
-- IsmailBooks — Run this in Supabase SQL Editor
-- ============================================================

-- 1. Create profiles table (linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username   TEXT,
  phone      TEXT,
  is_admin   BOOLEAN DEFAULT FALSE,
  account_status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read and update only their own profile
CREATE POLICY "Own profile select" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Own profile update" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. Auto-create a profile when a new user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username)
  VALUES (NEW.id, SPLIT_PART(NEW.email, '@', 1))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 3. Add auth_user_id (UUID) to payments table
ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id);

-- RLS for payments
DROP POLICY IF EXISTS "Insert own payment" ON payments;
DROP POLICY IF EXISTS "Read own payments" ON payments;

CREATE POLICY "Insert own payment" ON payments
  FOR INSERT WITH CHECK (auth.uid() = auth_user_id);

CREATE POLICY "Read own payments" ON payments
  FOR SELECT USING (auth.uid() = auth_user_id);

-- 4. Add auth_user_id (UUID) to user_books table (entitlements)
ALTER TABLE user_books
  ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id);

-- RLS for user_books
DROP POLICY IF EXISTS "Read own entitlements" ON user_books;

CREATE POLICY "Read own entitlements" ON user_books
  FOR SELECT USING (auth.uid() = auth_user_id);

-- 5. Make yourself an admin (replace with your real email)
-- Run this AFTER you have signed up / logged in once on the site:
-- UPDATE profiles SET is_admin = TRUE WHERE id = (
--   SELECT id FROM auth.users WHERE email = 'your-email@example.com'
-- );
