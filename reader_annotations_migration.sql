-- Reader annotation tables for highlights and bookmarks.
-- This follows the same dual-ID pattern used by reading_progress:
--   - auth_user_id (UUID from auth.users)
--   - user_id (legacy integer id, nullable)
-- The app keys chapter references by (book_id, chapter_index), not by a separate chapters table.

CREATE TABLE IF NOT EXISTS public.highlights (
  id BIGSERIAL PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id BIGINT NULL,
  book_id BIGINT NOT NULL,
  chapter_index INTEGER NOT NULL DEFAULT 0,
  highlighted_text TEXT NOT NULL,
  color TEXT NOT NULL CHECK (color IN ('gold', 'navy', 'oxblood', 'green')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bookmarks (
  id BIGSERIAL PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id BIGINT NULL,
  book_id BIGINT NOT NULL,
  chapter_index INTEGER NOT NULL DEFAULT 0,
  chapter_title TEXT NOT NULL,
  preview_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_highlights_user_book_chapter
  ON public.highlights (auth_user_id, user_id, book_id, chapter_index, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user_book_chapter
  ON public.bookmarks (auth_user_id, user_id, book_id, chapter_index, created_at DESC);

ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Notes on the matching RLS behavior used elsewhere in the project:
-- 1) default deny unless the row belongs to the current signed-in user
-- 2) allow the legacy integer user_id as a fallback when the app resolves it from the email

CREATE POLICY "Highlights are readable only by the owner"
ON public.highlights
FOR SELECT
USING (
  auth_user_id = auth.uid()
  OR user_id = (
    SELECT u.user_id
    FROM public.users u
    WHERE u.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    LIMIT 1
  )
);

CREATE POLICY "Highlights are writable only by the owner"
ON public.highlights
FOR INSERT
WITH CHECK (
  auth_user_id = auth.uid()
  OR user_id = (
    SELECT u.user_id
    FROM public.users u
    WHERE u.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    LIMIT 1
  )
);

CREATE POLICY "Highlights can be updated only by the owner"
ON public.highlights
FOR UPDATE
USING (
  auth_user_id = auth.uid()
  OR user_id = (
    SELECT u.user_id
    FROM public.users u
    WHERE u.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    LIMIT 1
  )
)
WITH CHECK (
  auth_user_id = auth.uid()
  OR user_id = (
    SELECT u.user_id
    FROM public.users u
    WHERE u.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    LIMIT 1
  )
);

CREATE POLICY "Highlights can be deleted only by the owner"
ON public.highlights
FOR DELETE
USING (
  auth_user_id = auth.uid()
  OR user_id = (
    SELECT u.user_id
    FROM public.users u
    WHERE u.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    LIMIT 1
  )
);

CREATE POLICY "Bookmarks are readable only by the owner"
ON public.bookmarks
FOR SELECT
USING (
  auth_user_id = auth.uid()
  OR user_id = (
    SELECT u.user_id
    FROM public.users u
    WHERE u.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    LIMIT 1
  )
);

CREATE POLICY "Bookmarks are writable only by the owner"
ON public.bookmarks
FOR INSERT
WITH CHECK (
  auth_user_id = auth.uid()
  OR user_id = (
    SELECT u.user_id
    FROM public.users u
    WHERE u.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    LIMIT 1
  )
);

CREATE POLICY "Bookmarks can be updated only by the owner"
ON public.bookmarks
FOR UPDATE
USING (
  auth_user_id = auth.uid()
  OR user_id = (
    SELECT u.user_id
    FROM public.users u
    WHERE u.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    LIMIT 1
  )
)
WITH CHECK (
  auth_user_id = auth.uid()
  OR user_id = (
    SELECT u.user_id
    FROM public.users u
    WHERE u.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    LIMIT 1
  )
);

CREATE POLICY "Bookmarks can be deleted only by the owner"
ON public.bookmarks
FOR DELETE
USING (
  auth_user_id = auth.uid()
  OR user_id = (
    SELECT u.user_id
    FROM public.users u
    WHERE u.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    LIMIT 1
  )
);
