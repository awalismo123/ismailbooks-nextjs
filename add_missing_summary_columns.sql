-- Run this in your Supabase SQL Editor
-- Adds missing columns to summaries table to fully match books features

ALTER TABLE summaries
  ADD COLUMN IF NOT EXISTS category        TEXT    DEFAULT 'General',
  ADD COLUMN IF NOT EXISTS reading_time_minutes INTEGER DEFAULT 5,
  ADD COLUMN IF NOT EXISTS is_published    BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS is_featured     BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS file_link       TEXT;

-- Ensure existing rows are published
UPDATE summaries SET is_published = TRUE WHERE is_published IS NULL;
