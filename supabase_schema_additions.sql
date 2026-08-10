-- 1. Ensure PROFILES table exists and has necessary columns
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  full_name TEXT,
  is_admin BOOLEAN DEFAULT false,
  account_status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- In case profiles already existed without full_name, let's add it
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;

-- 2. Add auth_user_id columns for legacy linking
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.user_books ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id);

-- 3. Ensure the trigger function works correctly and doesn't fail if fields are missing
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  legacy_user_id BIGINT;
BEGIN
  -- 1. Create a profile for the new user
  INSERT INTO public.profiles (id, username, full_name, is_admin, account_status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'user_name', SPLIT_PART(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'full_name',
    false,
    'active'
  )
  ON CONFLICT (id) DO NOTHING;

  -- 2. Link legacy purchases if they exist
  SELECT user_id INTO legacy_user_id FROM public.users WHERE email = NEW.email LIMIT 1;
  IF legacy_user_id IS NOT NULL THEN
    UPDATE public.payments SET auth_user_id = NEW.id WHERE user_id = legacy_user_id AND auth_user_id IS NULL;
    UPDATE public.user_books SET auth_user_id = NEW.id WHERE user_id = legacy_user_id AND auth_user_id IS NULL;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger just in case
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Add book_reviews table to Supabase if it doesn't exist yet
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

-- Trigger to update books.average_rating and total_reviews
CREATE OR REPLACE FUNCTION update_book_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE books
    SET 
      average_rating = (SELECT AVG(rating)::numeric(3,2) FROM book_reviews WHERE book_id = NEW.book_id AND status = 'approved'),
      total_reviews = (SELECT COUNT(*) FROM book_reviews WHERE book_id = NEW.book_id AND status = 'approved')
    WHERE id = NEW.book_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE books
    SET 
      average_rating = (SELECT AVG(rating)::numeric(3,2) FROM book_reviews WHERE book_id = OLD.book_id AND status = 'approved'),
      total_reviews = (SELECT COUNT(*) FROM book_reviews WHERE book_id = OLD.book_id AND status = 'approved')
    WHERE id = OLD.book_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_review_changed ON book_reviews;
CREATE TRIGGER on_review_changed
AFTER INSERT OR UPDATE OR DELETE ON book_reviews
FOR EACH ROW EXECUTE PROCEDURE update_book_rating();
