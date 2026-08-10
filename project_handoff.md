# IsmailBooks Next.js Project Context & Handoff

This document contains the complete context of the IsmailBooks Next.js project. It was generated to provide a seamless handoff for future AI assistant sessions.

## 1. Project Overview
- **Name:** IsmailBooks Website
- **Tech Stack:** Next.js 16 (App Router), React, TypeScript, TailwindCSS, Framer Motion, Supabase (PostgreSQL + Auth).
- **Design System:** Dark-mode first, glassmorphism UI, burgundy (`#70193D`) and gold (`#D4A843`) accents.
- **Language:** Bilingual support (Somali & English) via a custom `i18n` hook.
- **Goal:** Migrate a legacy PHP/MySQL application to a modern Next.js stack with premium, highly optimized design aesthetics.

## 2. Completed Phases

### Phase A: Architecture & UI Foundation
- Next.js App Router structure established.
- Global layouts (`Navbar`, `Footer`) built with responsive design.
- `i18n` hook created for EN/SO toggling.

### Phase B: Content & Reading Experience
- **Homepage (`/`)**: Hero section, featured books, and testimonials.
- **Books Catalog (`/books`)**: Grid listing all premium and free books.
- **Book Details (`/books/[id]`)**: Landing pages for each book showing price, author, and description.
- **EPUB/Text Reader (`/books/[id]/read`)**: Advanced web reader with font size controls, reading progress, and a table of contents sidebar.
- **Blog Section (`/blog` & `/blog/[slug]`)**: Professional blog listing and dynamic routing for rich text articles.

### Phase C: Authentication & User Dashboard
- **Supabase Integration**: Auth implementation for Login (`/login`), Registration (`/register`), and Password Reset (`/forgot-password`).
- **Navbar Sync**: Navbar dynamically checks the real Supabase Auth session, while preserving a "Demo Mode" fallback for testing.
- **User Dashboard (`/dashboard`)**: Displays reading stats, purchased books library, and payment history.
- **Payment Gateway UI (`/payment/[id]`)**: Mobile money form supporting Zaad, eDahab, Sahal, etc., with success flows and a WhatsApp fallback.

### Phase D: Admin Panel & Management
- **Admin Dashboard (`/admin`)**: Secure administrative panel featuring:
  - **Overview Stats**: Quick look at users, revenue, and content count.
  - **Payments Queue**: Table for approving/rejecting pending mobile money payments.
  - **Books Management**: CRUD UI modals for adding and editing Books.
  - **Blog Management**: CRUD UI modals for adding and editing Blog posts.
  - **Users Management**: Ability to suspend or activate readers.

## 3. Database Migration Details
- The original MySQL database dump (`ismailbo_ismail.sql`) was analyzed and converted to PostgreSQL (`supabase_schema.sql` and `supabase_schema_v2.sql`).
- All data, including users, books, blog posts, and payments, were successfully migrated to the remote Supabase project.
- Boolean columns in PostgreSQL were correctly mapped (converting `1`/`0` to `TRUE`/`FALSE`).

## 4. Current State & Next Steps
- The application compiles perfectly (`npm run build` exits successfully with zero type errors).
- All core routes have been tested and return `200 OK`.
- **Environment:** The app relies on `.env.local` for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **Next Steps:** The codebase is ready for deployment (e.g., to Vercel). The frontend is largely complete, and any future work should focus on connecting any remaining mock data arrays in the UI (like in the Admin and Dashboard pages) to live Supabase queries if requested.

## 5. Important Instructions for the AI
- **Aesthetics are critical:** Always use the defined color platte.
- **State:** When starting new features, always refer to the existing `src/app` structure to maintain consistency.
- **Tools:** Use the Supabase client utilities in `src/lib/supabase/` for any database or auth interactions.
