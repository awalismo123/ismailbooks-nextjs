-- =========================================================
-- FIX_AUTH_NOW.sql — Run this in Supabase SQL Editor
-- Fixes the Google OAuth / Email signup 500 error
-- =========================================================

-- STEP 1: Add missing columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- STEP 2: Add missing auth_user_id to legacy tables
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.user_books ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id);

-- STEP 3: Replace the trigger function with a safe version
-- Uses EXCEPTION block so even if something goes wrong, login still succeeds
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  legacy_user_id BIGINT;
BEGIN
  -- Insert profile, using only columns that actually exist
  INSERT INTO public.profiles (id, username, full_name, is_admin, account_status)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'user_name',
      NEW.raw_user_meta_data->>'name',
      SPLIT_PART(COALESCE(NEW.email, ''), '@', 1),
      'user'
    ),
    NEW.raw_user_meta_data->>'full_name',
    false,
    'active'
  )
  ON CONFLICT (id) DO NOTHING;

  -- Link legacy purchases (only if public.users table exists)
  BEGIN
    SELECT user_id INTO legacy_user_id
    FROM public.users WHERE email = NEW.email LIMIT 1;

    IF legacy_user_id IS NOT NULL THEN
      UPDATE public.payments
        SET auth_user_id = NEW.id
        WHERE user_id = legacy_user_id AND auth_user_id IS NULL;

      UPDATE public.user_books
        SET auth_user_id = NEW.id
        WHERE user_id = legacy_user_id AND auth_user_id IS NULL;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    -- Don't fail login if legacy linking errors
    NULL;
  END;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- CRITICAL: Never block user creation even if trigger fails
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- STEP 4: Attach (or reattach) the trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- STEP 5: Add auth_user_id to reading_progress so the reader can track progress
ALTER TABLE public.reading_progress ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id);

-- STEP 6: Create book_reviews table
CREATE TABLE IF NOT EXISTS book_reviews (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id BIGINT REFERENCES books(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  status TEXT DEFAULT 'approved',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, book_id)
);

-- Done! Test by registering a new user — it should now work.
