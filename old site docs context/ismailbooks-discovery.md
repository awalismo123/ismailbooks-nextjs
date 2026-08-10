# IsmailBooks — Discovery Audit
**Generated:** 2026-07-19  
**Purpose:** Pre-migration factual inventory for the Next.js + Supabase migration PRD  
**Scope:** Full static analysis of `c:\xampp\htdocs\ismailbooks_website`

---

## 1. Tech Stack Actually in Use

### PHP

- **Minimum declared version:** `>=7.4` (from `composer.json`)
- **Runtime compatibility:** `.htaccess` has both `<IfModule mod_php8.c>` and `<IfModule mod_php7.c>` blocks, so the codebase was tested on both PHP 7.4 and PHP 8.x
- **Modern PHP features in use:** `declare(strict_types=1)` on every file, union return types (`int|false`), named arguments, `str_starts_with()` / `str_ends_with()` (PHP 8.0+), `match` not used
- **Conclusion:** Codebase is PHP 8.0-compatible and likely runs on PHP 8.x on production (OPcache config in `.htaccess` references `mod_php8.c` first)

### Frameworks and Libraries

This is a **custom MVC framework** — no Laravel, Symfony, or Slim. The framework was built in-house and consists of:

| Component | File | Notes |
|---|---|---|
| Router | `app/core/Router.php` | Regex-based, supports `{param}` placeholders |
| Base Controller | `app/core/Controller.php` | `render()`, `redirect()`, session management |
| Base Model | `app/core/Model.php` | PDO wrapper with `find()`, `insert()`, `update()` |
| File Cache | `app/core/Cache.php` | SHA-256 keyed, serialized PHP, stored in `private/cache/` |

**Composer packages (from `composer.lock`):**

| Package | Version (approx) | Purpose |
|---|---|---|
| `google/apiclient` | ^2.15 | Google OAuth2 login |

No other Composer packages. Everything else is hand-rolled PHP in `includes/`.

### Autoloading

Composer PSR-4 plus a custom `spl_autoload_register` fallback in `public/index.php`:

- `App\` → `app/` (case-insensitive folder search)
- `IsmailBooks\` → `includes/` (with sub-namespace path support)

### Templating

**Raw PHP includes** — no Twig, Blade, or similar. Templates live in `app/views/` and are loaded via `Controller::render()`. Layouts are selected by passing a string (`'main'`, `'admin'`, `'none'`) to `render()`.

View folders:
- `app/views/layouts/` — shared layout shells
- `app/views/auth/` — login, register, forgot/reset password, auth-choice
- `app/views/admin/` — all admin panel pages
- `app/views/blog/` — blog index and post detail
- `app/views/books/` — book catalog and detail
- `app/views/summaries/` — summary catalog and detail
- `app/views/home/` — homepage
- `app/views/user/` — user dashboard and profile
- `app/views/reader/` — in-app reader (uses layout `'none'`)
- `app/views/pages/` — about, privacy
- `app/views/partials/` — reusable fragments (nav, footer, etc.)

### Frontend

**JavaScript:**
- **Bootstrap 5** (`bootstrap.bundle.min.js`, 80 KB) — UI components
- **Bootstrap Icons** (CSS icon font, 98 KB) — icons throughout
- Custom JS: `vibrant.js` (12 KB, homepage interactivity), `book-cards.js` (4 bytes — empty/placeholder), plus per-feature scripts in `assets/js/admin/`, `assets/js/blog/`, `assets/js/reader/`, `assets/js/user/`
- **No jQuery**, no React, no build tooling

**CSS:**
- `style.css` — main site stylesheet (36 KB, hand-written)
- `vibrant.css` — homepage hero/animations (99 KB)
- `bootstrap-icons.css` — icon font
- `responsive.css` — breakpoints / mobile (15 KB)
- `auth.css`, `dashboard.css`, `reader.css`, `book-mockup.css` — feature-scoped stylesheets
- Sub-folders: `css/admin/`, `css/blog/`, `css/reader/`, `css/user/`
- **No Sass, no PostCSS, no Tailwind**

### Build Tools / Asset Pipeline

**None.** Assets are served raw. A `public/minify_assets.php` script exists to manually minify CSS/JS, but it is run on-demand, not part of a CI pipeline. Asset versioning is handled via the `ASSET_VERSION` constant (currently `'1.0.8'`) appended as `?v=1.0.8` query strings.

---

## 2. Folder and File Structure

```
ismailbooks_website/
├── .env                        # Live secrets (gitignored)
├── .env.example                # Template listing all env vars
├── .htaccess                   # Root Apache config: security, gzip, cache, routing
├── .gitignore
├── composer.json / composer.lock
├── index.php                   # Tiny stub (redirects to public/)
├── robots.txt
├── sw.js                       # Service worker (PWA shell)
│
├── app/                        # MVC application code
│   ├── core/
│   │   ├── Router.php          # URL dispatcher
│   │   ├── Controller.php      # Base controller (render, redirect)
│   │   ├── Model.php           # Base model (PDO CRUD helpers)
│   │   └── Cache.php           # File-based cache
│   ├── controllers/            # 22 controller classes (see §8)
│   ├── models/                 # 9 model classes (see §5)
│   ├── views/                  # PHP templates (see §1)
│   ├── DTOs/                   # Data Transfer Objects (e.g. CreatePostDTO)
│   ├── Exceptions/             # Custom exception classes (ValidationException)
│   └── Services/               # Service layer (PostManagementService,
│                               #   ImageUploadService, GoogleOAuthService)
│
├── config/
│   ├── db.php                  # PDO singleton + BASE_URL + ASSET_VERSION
│   ├── env.php                 # Env::get() helper (reads .env or $_ENV)
│   ├── blog.php                # Blog constants (per-page count, upload paths, etc.)
│   ├── routes.php              # All route definitions
│   └── .htaccess               # Blocks direct web access to config/
│
├── database/
│   ├── run_migrations.php      # Migration runner
│   └── migrations/
│       ├── 001_create_features_tables.php
│       ├── 002_add_indexes.php
│       ├── 003_add_triggers.php
│       ├── 004_create_password_reset_tokens.php
│       ├── 005_optimize_indexes.php
│       ├── 006_blog_deployment_verification.sql
│       ├── 006_create_book_insights.php
│       ├── 007_optimize_book_insights.php
│       └── 008_add_oauth_providers.php
│
├── includes/                   # Utility/library classes (IsmailBooks\ namespace)
│   ├── ActivityTracker.php     # DAU/WAU/MAU, user_sessions, daily_stats
│   ├── BlogCategory.php        # blog_categories CRUD
│   ├── BlogComment.php         # blog_comments CRUD + moderation
│   ├── BlogHelper.php          # Formatting helpers
│   ├── BlogPost.php            # blog_posts CRUD (legacy class, parallel to app/models/BlogPost.php)
│   ├── BookMockupGenerator.php # Generates CSS-based book cover mockups
│   ├── BookReview.php          # book_reviews CRUD
│   ├── Csrf.php                # CSRF token generate/validate
│   ├── EpubExtractor.php       # Extracts EPUB → HTML chapters
│   ├── ErrorHandler.php        # Custom error/exception handler
│   ├── NotificationManager.php # notifications table CRUD
│   ├── ReadingList.php         # reading_lists + reading_list_items CRUD
│   ├── ReadingProgress.php     # reading_progress table CRUD
│   ├── SeoHelper.php           # Canonical, OG, Twitter Card, JSON-LD
│   ├── SitemapPinger.php       # Pings Google/Bing after publish
│   ├── UserAuth.php            # Session auth, password_hash/verify
│   └── .htaccess               # Blocks direct web access to includes/
│
├── public/                     # Web root (pointed to by .htaccess DirectoryIndex)
│   ├── index.php               # Front controller (bootstraps everything)
│   ├── assets/
│   │   ├── css/                # All stylesheets
│   │   ├── js/                 # All scripts
│   │   ├── fonts/              # Self-hosted fonts (if any)
│   │   └── images/             # Static UI images, favicon
│   ├── book-content/           # EPUB-extracted HTML chapters, organized by book ID
│   │   └── {book_id}/
│   │       ├── toc.json        # Table of contents
│   │       └── ch_0.html, ch_1.html, …  # Chapter files
│   ├── images/                 # Legacy image location
│   └── uploads/
│       ├── (cover images)      # Book/summary covers: cover_{ts}_{hash}.webp/.jpg
│       ├── blog/
│       │   ├── featured/       # Blog post featured images
│       │   └── content/        # Inline blog images uploaded via editor
│       └── payments/           # Payment proof screenshots
│
├── private/                    # Server-only (blocked by .htaccess)
│   ├── cache/                  # File-based cache (PHP serialized)
│   └── error.log               # Application error log
│
├── vendor/                     # Composer packages
└── docs/, deploy_update/, skills/  # Dev tooling, not part of the live app
```

**Entry points:**
1. `public/index.php` — the single front controller for all dynamic routes
2. `.htaccess` routes all non-file/non-directory requests to `public/index.php`
3. Static assets (`assets/`, `images/`, `uploads/`, `book-content/`) are served directly by Apache via `.htaccess` rewrite alias

---

## 3. Database Schema

**Engine:** MySQL / MariaDB, InnoDB, `utf8mb4_unicode_ci` throughout.

Schema is reconstructed from migration files (001–008) and cross-validated against all SQL queries in models and controllers. No schema dump file exists in the repo.

### Table: `users`

Primary store for registered (non-admin) users.

```sql
CREATE TABLE users (
  user_id           INT UNSIGNED     NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username          VARCHAR(255)     NOT NULL,
  email             VARCHAR(255)     NOT NULL,
  password_hash     VARCHAR(255)     NOT NULL,   -- bcrypt via password_hash()
  phone_number      VARCHAR(50),
  full_name         VARCHAR(255),
  account_status    VARCHAR(20)      DEFAULT 'active',  -- 'active' | 'suspended'
  registration_date DATETIME,
  last_login        DATETIME,
  -- Added by migration 001:
  books_completed   INT              DEFAULT 0,
  total_reading_time INT             DEFAULT 0,   -- seconds
  current_streak    INT              DEFAULT 0,
  longest_streak    INT              DEFAULT 0,
  last_reading_date DATE             NULL,
  -- Indexes:
  UNIQUE idx_users_email (email),
  UNIQUE idx_users_username (username),
  INDEX  idx_users_is_active (is_active),   -- ⚠ column name uncertain: code uses account_status not is_active
  INDEX  idx_users_role (role),             -- ⚠ column 'role' referenced in migration 005 index but not elsewhere
  INDEX  idx_users_created_at (created_at), -- ⚠ column 'created_at' referenced in migration 005 but not in INSERT queries; may be absent
  INDEX  idx_users_books_completed (books_completed),
  INDEX  idx_users_total_reading_time (total_reading_time),
  INDEX  idx_users_last_reading_date (last_reading_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

> **⚠ Uncertainty:** Migration 005 adds indexes on `is_active`, `role`, and `created_at`, but the actual column definitions for these three are not in any migration file. They likely existed in the original table created before migration 001. The `account_status` column is what the code actually queries — the `is_active` name in the index may be a mistake or may be a separate boolean column. **Requires live schema inspection (`SHOW CREATE TABLE users`) to confirm.**

---

### Table: `admin_users`

Separate table for the single admin account.

```sql
CREATE TABLE admin_users (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(255)  NOT NULL,
  password_hash VARCHAR(255)  NOT NULL   -- bcrypt via password_hash()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

No `email`, no roles, no `created_at`. First-time setup creates the sole admin row.

---

### Table: `books`

```sql
CREATE TABLE books (
  id            INT UNSIGNED   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(255)   NOT NULL,
  author        VARCHAR(255),
  description   TEXT,
  cover_image   VARCHAR(500),            -- relative path, e.g. "uploads/cover_xxx.webp"
  file_link     VARCHAR(500),            -- path or URL to the EPUB/content
  is_paid       TINYINT(1)     DEFAULT 0,
  category      VARCHAR(100),            -- 'summary', 'free', or any label (NOT a FK)
  price         DECIMAL(10,2)  NULL,
  pages         INT            NULL,
  file_size     VARCHAR(50)    NULL,
  views         INT            DEFAULT 0,
  is_active     TINYINT(1)     DEFAULT 1,
  created_at    DATETIME,
  -- Added by migration 001:
  average_rating DECIMAL(3,2)  NULL,
  total_reviews  INT           DEFAULT 0,
  -- Indexes:
  INDEX idx_books_is_active (is_active),
  INDEX idx_books_is_paid (is_paid),
  INDEX idx_books_category (category),
  INDEX idx_books_created_at (created_at),
  INDEX idx_books_views (views),
  INDEX idx_books_active_paid_cat (is_active, is_paid, category),
  INDEX idx_books_average_rating (average_rating),
  INDEX idx_books_total_reviews (total_reviews),
  FULLTEXT INDEX idx_books_fulltext (title, author)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `summaries`

Books and summaries share the same reader but are stored separately. Summaries have HTML content stored inline (`content_html`), unlike books which store content as extracted EPUB files.

```sql
CREATE TABLE summaries (
  id              INT UNSIGNED   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title           VARCHAR(255)   NOT NULL,
  book_title      VARCHAR(255),            -- title of the original book
  book_author     VARCHAR(255),
  summary_creator VARCHAR(255),
  description     TEXT,
  content_html    LONGTEXT,               -- full summary content as HTML
  cover_image     VARCHAR(500),
  is_paid         TINYINT(1)     DEFAULT 0,
  price           DECIMAL(10,2)  NULL,
  pages           INT            NULL,
  file_size       VARCHAR(50)    NULL,
  views           INT            DEFAULT 0,
  created_at      DATETIME,
  -- ⚠ is_active column referenced in migration 005 index but not in INSERT; may exist
  -- Indexes:
  INDEX idx_summaries_is_active (is_active),
  INDEX idx_summaries_is_paid (is_paid),
  INDEX idx_summaries_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `blog_posts`

```sql
CREATE TABLE blog_posts (
  id                   INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title                VARCHAR(255)  NOT NULL,
  slug                 VARCHAR(255)  NOT NULL,
  excerpt              TEXT,
  content              LONGTEXT      NOT NULL,
  featured_image       VARCHAR(500)  NULL,          -- filename only (stored under uploads/blog/featured/)
  featured_image_alt   VARCHAR(255)  NULL,
  category_id          INT UNSIGNED  NULL,
  author_id            INT UNSIGNED  DEFAULT 1,     -- references admin_users.id
  meta_title           VARCHAR(255)  NULL,
  meta_description     TEXT          NULL,
  meta_keywords        VARCHAR(500)  NULL,
  focus_keyword        VARCHAR(255)  NULL,
  status               VARCHAR(20)   DEFAULT 'draft',  -- 'draft' | 'published'
  is_featured          TINYINT(1)    DEFAULT 0,
  allow_comments       TINYINT(1)    DEFAULT 1,
  comment_count        INT           DEFAULT 0,     -- denormalized, updated by trigger-like PHP
  view_count           INT           DEFAULT 0,
  estimated_read_time  INT           NULL,           -- minutes
  published_at         DATETIME      NULL,
  scheduled_at         DATETIME      NULL,
  created_at           TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  -- Indexes:
  UNIQUE idx_blog_posts_slug (slug),
  INDEX  idx_blog_posts_status (status),
  INDEX  idx_blog_posts_category_id (category_id),
  INDEX  idx_blog_posts_published_at (published_at),
  INDEX  idx_blog_posts_status_published (status, published_at),
  INDEX  idx_blog_posts_view_count (view_count),
  INDEX  idx_is_featured (is_featured),
  FULLTEXT INDEX idx_blog_posts_fulltext (title, content, excerpt),
  FULLTEXT INDEX ft_title_excerpt (title, excerpt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `blog_categories`

```sql
CREATE TABLE blog_categories (
  id              INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(255)  NOT NULL,           -- English name
  name_so         VARCHAR(255)  NULL,               -- Somali name
  slug            VARCHAR(255)  NOT NULL,
  description     TEXT          NULL,
  description_so  TEXT          NULL,
  icon            VARCHAR(100)  DEFAULT 'bi-folder',  -- Bootstrap Icons class
  color           VARCHAR(20)   DEFAULT '#70193D',
  sort_order      INT           DEFAULT 0,
  is_active       TINYINT(1)    DEFAULT 1,
  post_count      INT           DEFAULT 0,          -- denormalized
  -- Indexes:
  UNIQUE idx_blog_categories_slug (slug),
  INDEX  idx_sort_order (sort_order),
  INDEX  idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `blog_comments`

```sql
CREATE TABLE blog_comments (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  post_id       INT UNSIGNED  NOT NULL,
  user_id       INT UNSIGNED  NULL,             -- NULL = anonymous comment
  author_name   VARCHAR(255)  NOT NULL,
  author_email  VARCHAR(255)  NOT NULL,
  author_url    VARCHAR(500)  NULL,
  content       TEXT          NOT NULL,
  status        VARCHAR(20)   DEFAULT 'pending',  -- 'pending' | 'approved' | 'spam'
  parent_id     INT UNSIGNED  NULL,             -- threaded (one level; nullable FK to self)
  ip_address    VARCHAR(45)   NULL,
  user_agent    TEXT          NULL,
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `payments`

```sql
CREATE TABLE payments (
  id                INT UNSIGNED   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  payment_id        INT UNSIGNED   NULL,            -- set to id after insert (redundant, see §11)
  user_id           INT UNSIGNED   NOT NULL,
  book_id           INT UNSIGNED   NULL,            -- XOR with summary_id
  summary_id        INT UNSIGNED   NULL,
  payment_method    VARCHAR(100),                   -- e.g. 'EVC', 'eDahab', 'Zaad'
  reference_number  VARCHAR(255),                   -- transaction reference from payer
  proof_image_path  VARCHAR(500),                   -- path to screenshot: uploads/payments/pay_xxx.ext
  amount            DECIMAL(10,2),
  status            VARCHAR(20)    DEFAULT 'pending',  -- 'pending' | 'approved' | 'rejected'
  admin_notes       TEXT           NULL,
  processed_at      DATETIME       NULL,
  created_at        DATETIME,
  -- Indexes:
  INDEX idx_payments_status (status),
  INDEX idx_payments_user_id (user_id),
  INDEX idx_payments_created_at (created_at),
  INDEX idx_payments_processed_at (processed_at),
  INDEX idx_payments_book_id (book_id),
  INDEX idx_payments_summary_id (summary_id),
  INDEX idx_payments_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Note:** `payer_name` and `payer_phone` appear in the payment form `$_POST` but are **not** inserted into the DB. They appear to be unused captured fields.

---

### Table: `user_books`

Access control: which users own which paid books.

```sql
CREATE TABLE user_books (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id       INT UNSIGNED  NOT NULL,
  book_id       INT UNSIGNED  NOT NULL,
  payment_id    INT UNSIGNED  NULL,
  acquired_date DATETIME,
  UNIQUE KEY idx_user_books_composite (user_id, book_id),
  INDEX  idx_user_books_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `user_summaries`

```sql
CREATE TABLE user_summaries (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id       INT UNSIGNED  NOT NULL,
  summary_id    INT UNSIGNED  NOT NULL,
  payment_id    INT UNSIGNED  NULL,
  acquired_date DATETIME,
  UNIQUE KEY idx_user_summaries_composite (user_id, summary_id),
  INDEX  idx_user_summaries_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `book_reviews`

```sql
CREATE TABLE book_reviews (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id     INT UNSIGNED  NOT NULL,
  book_id     INT UNSIGNED  NOT NULL,
  rating      TINYINT       NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_public   BOOLEAN       DEFAULT TRUE,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_book_review (user_id, book_id),
  INDEX idx_book_reviews_book_id (book_id),
  INDEX idx_book_reviews_user_id (user_id),
  INDEX idx_book_reviews_rating (rating),
  INDEX idx_book_reviews_created_at (created_at),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `notifications`

```sql
CREATE TABLE notifications (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id     INT UNSIGNED  NOT NULL,
  type        VARCHAR(50)   NOT NULL,    -- e.g. 'payment_approved', 'new_book'
  title       VARCHAR(255)  NOT NULL,
  message     TEXT          NOT NULL,
  data        JSON          NULL,        -- arbitrary structured payload
  read_status BOOLEAN       DEFAULT FALSE,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_notifications_user_id (user_id),
  INDEX idx_notifications_read_status (read_status),
  INDEX idx_notifications_type (type),
  INDEX idx_notifications_created_at (created_at),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `reading_lists`

```sql
CREATE TABLE reading_lists (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id     INT UNSIGNED  NOT NULL,
  name        VARCHAR(255)  NOT NULL,
  description TEXT,
  is_public   BOOLEAN       DEFAULT FALSE,
  cover_image VARCHAR(500)  NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_reading_lists_user_id (user_id),
  INDEX idx_reading_lists_is_public (is_public),
  INDEX idx_reading_lists_created_at (created_at),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `reading_list_items`

```sql
CREATE TABLE reading_list_items (
  id       INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  list_id  INT UNSIGNED  NOT NULL,
  book_id  INT UNSIGNED  NOT NULL,
  added_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  notes    TEXT,
  UNIQUE KEY unique_list_book (list_id, book_id),
  INDEX idx_reading_list_items_list_id (list_id),
  INDEX idx_reading_list_items_book_id (book_id),
  INDEX idx_reading_list_items_added_at (added_at),
  FOREIGN KEY (list_id) REFERENCES reading_lists(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `reading_progress`

```sql
CREATE TABLE reading_progress (
  id              INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id         INT UNSIGNED  NOT NULL,
  book_id         INT UNSIGNED  NOT NULL,
  chapter_index   INT           DEFAULT 0,    -- 0-based index into toc.json
  scroll_position INT           DEFAULT 0,    -- pixel scroll offset
  time_spent      INT           DEFAULT 0,    -- cumulative seconds
  completed       BOOLEAN       DEFAULT FALSE,
  last_read       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_book_progress (user_id, book_id),
  INDEX idx_reading_progress_user_id (user_id),
  INDEX idx_reading_progress_book_id (book_id),
  INDEX idx_reading_progress_completed (completed),
  INDEX idx_reading_progress_last_read (last_read),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `password_reset_tokens`

```sql
CREATE TABLE password_reset_tokens (
  id         INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id    INT UNSIGNED  NOT NULL,
  token      VARCHAR(255)  NOT NULL UNIQUE,   -- bcrypt hash of the raw token
  expires_at TIMESTAMP     NOT NULL,
  used       BOOLEAN       DEFAULT FALSE,
  created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_token (token),
  INDEX idx_expires_at (expires_at),
  INDEX idx_prt_token (token),
  INDEX idx_prt_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `user_sessions`

Used by `ActivityTracker` for live presence tracking.

```sql
CREATE TABLE user_sessions (
  user_id       INT UNSIGNED  NOT NULL,
  session_id    VARCHAR(255)  NOT NULL,
  last_activity DATETIME,
  ip_address    VARCHAR(45)   NULL,
  user_agent    TEXT          NULL,
  PRIMARY KEY or UNIQUE (user_id, session_id)  -- ⚠ exact DDL not in migrations; inferred from INSERT...ON DUPLICATE KEY UPDATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

> **⚠ Uncertainty:** This table's DDL is not in any migration file. It was presumably created before migration 001 (like the core tables). Confirm with `SHOW CREATE TABLE user_sessions`.

---

### Table: `daily_stats`

```sql
CREATE TABLE daily_stats (
  stat_date   DATE          NOT NULL PRIMARY KEY,
  total_users INT           DEFAULT 0,
  active_users INT          DEFAULT 0,
  new_users   INT           DEFAULT 0,
  books_opened INT          DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

> **⚠ Uncertainty:** DDL not in migrations. Inferred from `ActivityTracker` INSERT/UPDATE queries.

---

### Table: `site_settings`

Key-value store for admin-configurable settings.

```sql
CREATE TABLE site_settings (
  setting_key   VARCHAR(100)  NOT NULL PRIMARY KEY,
  setting_value TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

Known keys (populated from `AdminSettingsController`):
- `site_name`, `site_description`, `contact_email`, `contact_phone`
- `twitter_url`, `instagram_url`, `youtube_url`, `telegram_url`, `tiktok_url`, `facebook_url`
- `payment_gateway`, `paypal_email`, `stripe_public_key`, `stripe_secret_key`
- `smtp_host`, `smtp_port`, `smtp_username`, `smtp_password`, `smtp_encryption`
- `maintenance_mode` (`'0'` / `'1'`), `maintenance_message`

---

### Table: `book_insights`

```sql
CREATE TABLE book_insights (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  book_id       INT UNSIGNED  NOT NULL,
  quote         TEXT          NOT NULL,
  author        VARCHAR(255)  NOT NULL,
  bg_color      VARCHAR(50)   DEFAULT 'card-bg-1',   -- CSS class token
  font_family   VARCHAR(100)  DEFAULT 'Lora',
  display_order INT           DEFAULT 0,
  is_active     TINYINT(1)    DEFAULT 1,
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_book_id (book_id),
  INDEX idx_display_order (display_order),
  INDEX idx_insights_active_order (book_id, is_active, display_order),
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Table: `oauth_providers`

```sql
CREATE TABLE oauth_providers (
  id                INT UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id           INT UNSIGNED  NOT NULL,
  provider          VARCHAR(50)   NOT NULL,          -- 'google'
  provider_user_id  VARCHAR(255)  NOT NULL,
  provider_email    VARCHAR(255),
  provider_avatar   VARCHAR(500),
  created_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_provider_user (provider, provider_user_id),
  KEY idx_user_id (user_id),
  KEY idx_provider_email (provider_email),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### Stored Procedures, Triggers, and Views

**Triggers (3):** Defined in migration 003, maintained on `book_reviews`:
- `update_book_rating_after_insert` — recalculates `books.average_rating` and `books.total_reviews` after a review INSERT
- `update_book_rating_after_update` — same on UPDATE
- `update_book_rating_after_delete` — same on DELETE (uses `OLD.book_id`)

**No stored procedures, no views.**

---

## 4. Authentication and Authorization

### User (Front-end) Auth

- **Mechanism:** PHP server-side sessions
- **Session name:** `IB_SESSION` (set explicitly in `public/index.php`)
- **Session key:** `$_SESSION['user_id']` (integer)
- **Cookie settings:** `httponly=true`, `samesite=Lax`, `secure=true` on HTTPS
- **Password hashing:** `password_hash($password, PASSWORD_DEFAULT)` on registration → bcrypt. Verified with `password_verify()`. **Passwords are portable** as-is to any bcrypt-aware system.
- **Login:** `UserAuth::authenticate()` queries `users` by `username OR email`, then `password_verify()`. Returns `user_id` on success, `-1` on suspended account, `null` on wrong credentials.
- **Logout:** `UserAuth::logout()` clears `$_SESSION`, unsets cookie, calls `session_destroy()`
- **Suspension check:** `UserAuth::isLoggedIn()` does a live DB query for `account_status = 'active'` on every request (cached per PHP process via `static $cachedLoginStatus`)
- **Remember Me:** **Not implemented.** Session expires when browser closes (cookie `lifetime=0`)
- **Password Reset:** Token-based. Raw token (`bin2hex(random_bytes(32))`) is URL-encoded and given to the user. The **hashed** token is stored in `password_reset_tokens`. On verify, all unexpired tokens are fetched and `password_verify()` looped — **this is O(n) and insecure for large datasets** (see §11)
- **Google OAuth:** Fully implemented via `google/apiclient`. Creates user in `users` table and records in `oauth_providers`. On subsequent login, looks up `oauth_providers` by `provider` + `provider_user_id`.

### Admin Auth

- **Completely separate** from user auth — different session key (`$_SESSION['admin_user_id']`)
- **Table:** `admin_users` — only `id`, `username`, `password_hash`
- **Roles:** None — single admin, no role granularity
- **First-time setup:** If `admin_users` count is 0, the login page doubles as a registration form (creates the first admin)
- **No admin password reset flow exists** in the code

### Authorization

- **User pages:** `UserAuth::requireAuth()` — redirects to `/auth-choice?redirect_url=...` if not logged in
- **Admin pages:** `AdminController::requireAdmin()` — redirects to `/admin/login` if `$_SESSION['admin_user_id']` not set
- **No role-based access control** beyond the user/admin split

---

## 5. Content Types and Fields

### Content Types Summary

| Type | Table | Free/Paid | Has Reader | SEO Fields |
|---|---|---|---|---|
| Book | `books` | Both | Yes (EPUB-based) | `description` only |
| Summary | `summaries` | Both | Yes (HTML inline) | `description` only |
| Blog Post | `blog_posts` | Free (all public) | No | Full SEO fields |
| Book Insight | `book_insights` | N/A (reader widget) | — | — |
| Blog Category | `blog_categories` | — | — | — |

### Books (`books` table)

Full field list (from INSERT in `Book::create()`):
`id`, `title`, `author`, `description`, `cover_image`, `file_link`, `is_paid`, `category`, `price`, `pages`, `file_size`, `is_active`, `created_at`

Plus added by migrations: `average_rating`, `total_reviews`

The `category` field is a free-text string, not a foreign key. Values seen in queries: `'summary'`, `'free'`, `'premium'` (inferred from filter logic).

### Summaries (`summaries` table)

Fields: `id`, `title`, `book_title`, `book_author`, `summary_creator`, `description`, `content_html`, `cover_image`, `is_paid`, `price`, `pages`, `file_size`, `views`, `created_at`

Key difference from books: content is stored as `content_html` (LONGTEXT) rather than extracted EPUB files.

### Blog Posts (`blog_posts` table)

Full SEO-first design. Fields include:
- Core: `id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `featured_image_alt`
- Relations: `category_id` (FK → `blog_categories.id`), `author_id` (references `admin_users.id`)
- SEO: `meta_title`, `meta_description`, `meta_keywords`, `focus_keyword`
- Flags: `status`, `is_featured`, `allow_comments`
- Stats: `comment_count` (denormalized), `view_count`, `estimated_read_time`
- Scheduling: `published_at`, `scheduled_at`

### Relationships

```
users          ──< user_books         >── books
users          ──< user_summaries     >── summaries
users          ──< book_reviews       >── books
users          ──< notifications
users          ──< reading_lists      ──< reading_list_items >── books
users          ──< reading_progress   >── books
users          ──< user_sessions
users          ──< oauth_providers
users          ──< password_reset_tokens
blog_categories ──< blog_posts        ──< blog_comments
books          ──< book_insights
books          ──< reading_progress
payments       >── users
payments       >── books  (nullable)
payments       >── summaries (nullable)
```

---

## 6. Comments System

**Status:** **Disabled in production.** `config/blog.php` sets `define('BLOG_COMMENTS_ENABLED', false)`.

**Schema:** `blog_comments` table exists and is fully implemented.

**Type:** Semi-threaded — `parent_id` column allows one level of nesting (parent comment → reply). No deeper nesting. Fetched with `ORDER BY created_at ASC` without recursive tree building, so the UI likely flattens them.

**Moderation flow:**
- Default status on creation: `'pending'` (controlled by `BLOG_COMMENTS_REQUIRE_APPROVAL` constant, which is `true`)
- Admin can change status to `'approved'` or `'spam'`
- Only `status = 'approved'` comments are shown publicly
- `blog_posts.comment_count` is updated by PHP (not a DB trigger) every time a comment is created, status-changed, or deleted

**Spam protection:** IP address and user agent are stored. **No CAPTCHA, no Akismet, no rate-limiting** in the code.

**Auth requirement:** `BLOG_COMMENTS_REQUIRE_LOGIN = false` (anonymous comments allowed when re-enabled).

---

## 7. Admin Dashboard

URL prefix: `/admin` — all routes require `$_SESSION['admin_user_id']`.

### Feature Inventory

| Section | Routes | Features |
|---|---|---|
| **Dashboard** | `GET /admin` | Summary cards (total books, users, payments pending) |
| **Books** | `GET /admin/books` | List all books with status toggle |
| | `GET/POST /admin/books/create` | Create book: title, author, description, cover upload, EPUB upload, paid/free toggle, price |
| | `GET/POST /admin/books/edit` | Edit book (same fields) |
| | `GET /admin/books/toggle` | Toggle `is_active` |
| | `GET /admin/books/delete` | Delete book |
| **Summaries** | `GET /admin/summaries` | List all summaries |
| | `GET/POST /admin/summaries/create` | Create summary: rich-text editor (TinyMCE), EPUB import option |
| | `GET/POST /admin/summaries/edit` | Edit summary |
| | `GET /admin/summaries/delete` | Delete summary |
| **Blog Posts** | `GET /admin/blog` | List posts with status/category filter, search, pagination |
| | `GET/POST /admin/blog/create` | Create post with TinyMCE editor, featured image upload, SEO fields, scheduling |
| | `GET/POST /admin/blog/edit` | Edit post (same fields) |
| | `GET /admin/blog/delete` | Delete post + clean up featured image file |
| | `POST /admin/blog/upload-image` | Inline image upload for editor (returns URL) |
| | `POST /admin/blog/auto-save` | Draft auto-save endpoint |
| **Blog Categories** | `GET /admin/blog/categories` | List categories |
| | `POST /admin/blog/categories/create` | Create category: name, name_so, slug, description, icon, color |
| | `POST /admin/blog/categories/update` | Update category |
| | `GET /admin/blog/categories/delete` | Delete category |
| **Book Insights** | `GET /admin/insights` | List insights per book |
| | `GET/POST /admin/insights/create` | Add insight: quote, author, bg_color, font_family, display_order |
| | `GET/POST /admin/insights/edit` | Edit insight |
| | `POST /admin/insights/delete` | Delete insight |
| | `POST /admin/insights/reorder` | Drag-to-reorder (updates `display_order`) |
| **Payments** | `GET /admin/payments` | List pending payments with user info + content title |
| | `GET /admin/payments/process` | Approve or Reject payment; on approve, inserts into `user_books`/`user_summaries` |
| **Users** | `GET /admin/users` | List all users |
| | `GET /admin/users/toggle` | Toggle account_status between 'active' / 'suspended' |
| **Analytics** | `GET /admin/analytics` | Online users (live count), DAU/WAU/MAU, 7-day activity chart, top 10 books by reader count |
| | `GET /admin/analytics/online-users` | JSON endpoint: current online user count |
| **Settings** | `GET /admin/settings` | Edit all site_settings key-value pairs |
| | `POST /admin/settings/update` | Save settings by group (site info, social media, payment, SMTP, maintenance mode) |
| **Maintenance Mode** | (via Settings) | Toggle site-wide maintenance page; admin/auth routes still work |

**TinyMCE:** Used in blog and summary editors. API key is `'no-api-key'` (placeholder) — requires replacement on production.

---

## 8. Routing and URL Structure

### How Routing Works

1. All requests hit `public/index.php` via `.htaccess` front-controller rewrite
2. `Router::dispatch()` strips the base path, normalizes trailing slashes, and matches against the route table
3. Static asset paths (`assets/`, `images/`, `uploads/`, `book-content/`) are aliased directly by `.htaccess` to `public/` subdirectories

### Public URL Patterns

| URL | Controller@Method | Notes |
|---|---|---|
| `GET /` | `HomeController@index` | Homepage |
| `GET /about` | `AboutController@index` | About page |
| `GET /privacy` | `AboutController@privacy` | Privacy policy |
| `GET /books` | `BookController@index` | All books catalog |
| `GET /books/all` | `BookController@index` | Same as /books |
| `GET /books/free` | `BookController@free` | Free books only |
| `GET /books/premium` | `BookController@premium` | Paid books only |
| `GET /books/show?id={n}` | `BookController@show` | Book detail (query string, not path param) |
| `GET /summaries` | `SummaryController@index` | Summaries catalog |
| `GET /summaries/show?id={n}` | `SummaryController@show` | Summary detail |
| `GET /blog` | `BlogController@index` | Blog listing (with `?q=`, `?page=` support) |
| `GET /blog/category/{slug}` | `BlogController@category` | Posts by category |
| `GET /blog/{slug}` | `BlogController@show` | Single blog post |
| `GET /reader?book={n}` | `ReaderController@index` | In-app reader for book |
| `GET /reader?summary={n}` | `ReaderController@index` | In-app reader for summary |
| `GET /login` | `AuthController@login` | Login page |
| `POST /login` | `AuthController@login` | Login submit |
| `GET /register` | `AuthController@register` | Register page |
| `POST /register` | `AuthController@register` | Register submit |
| `GET /auth-choice` | `AuthController@authChoice` | Login-or-register gate |
| `GET /forgot-password` | `AuthController@forgotPassword` | Forgot password page |
| `POST /forgot-password` | `AuthController@forgotPassword` | Submit email/phone |
| `GET /reset-password?token={tok}` | `AuthController@resetPassword` | Reset password page |
| `POST /reset-password` | `AuthController@resetPassword` | Submit new password |
| `GET /logout` | `AuthController@logout` | Logout |
| `GET /auth/google/login` | `AuthController@googleLogin` | Start Google OAuth |
| `GET /auth/google/callback` | `AuthController@googleCallback` | Google OAuth callback |
| `GET /dashboard` | `UserController@dashboard` | User dashboard |
| `GET /profile` | `UserController@profile` | User profile page |
| `GET /sitemap.xml` | `SitemapController@index` | XML sitemap |

### API/AJAX URL Patterns

| URL | Notes |
|---|---|
| `POST /api/progress/save` | Save reading progress (JSON) |
| `POST /api/notifications/mark-read` | Mark notification read |
| `POST /api/reviews/submit` | Submit book review |
| `GET /api/insights?book_id={n}` | Get book insights (JSON, public) |
| `POST /payment/submit` | Submit payment with proof image |
| `GET /payment/status?content_id={n}&content_type={t}` | Check access (JSON) |
| `GET /admin/analytics/online-users` | Online user count (JSON) |
| `POST /admin/blog/upload-image` | Image upload for editor |
| `POST /admin/blog/auto-save` | Auto-save draft |

### Legacy URL Aliases

| Legacy URL | Maps To |
|---|---|
| `GET /user/dashboard` | `UserController@dashboard` |
| `GET /book-detail` | `BookController@show` |
| `GET /summary-detail` | `SummaryController@show` |

### `.htaccess` Rewrite vs Query Strings

- **Clean URLs** via path params: `/blog/{slug}`, `/blog/category/{slug}`
- **Query string IDs**: `/books/show?id=5`, `/summaries/show?id=3`, `/reader?book=5` — these are **not** clean slugged URLs. Migration will need to decide on URL format for books and summaries.
- **No existing redirects** from old query-string URLs to new clean URLs — migration will need to add them.

---

## 9. Third-Party Integrations

### Google OAuth2

- **Library:** `google/apiclient` (Composer)
- **Flow:** Standard OAuth2 Authorization Code flow
- **Config keys:** `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`
- **Implementation:** `app/Services/GoogleOAuthService.php`, called from `AuthController`

### Payment Processing

**No payment processor integration.** The payment system is **fully manual**:
1. User submits a form with their mobile money reference number + a screenshot of the transfer
2. Screenshot is uploaded to `public/uploads/payments/`
3. Admin manually reviews and approves/rejects in the admin panel
4. Approval inserts a row into `user_books` or `user_summaries`
5. WhatsApp number (`WHATSAPP_NUMBER` env var) is referenced in some views for support contact

Supported payment method strings: `EVC Plus`, `eDahab`, `Zaad`, `Premier Bank` (Somali mobile money operators — inferred from context; exact strings in form options need to be verified in view files).

### Email

**SMTP settings exist in `site_settings`** (`smtp_host`, `smtp_port`, etc.) and are configurable in the admin panel. **However, no email-sending code exists in the codebase.** No PHPMailer, no `mail()` calls. The password reset flow **does not email the token** — it renders the reset link directly on the page (see `AuthController::forgotPassword()`).

> **⚠ This is a significant gap:** There is no email delivery for password reset. Users must be told their reset link verbally or through another channel.

### Analytics

No Google Analytics, Plausible, or any external analytics script found in the code. The analytics are entirely first-party:
- `ActivityTracker` → `user_sessions` + `daily_stats` tables
- Admin analytics dashboard shows DAU/WAU/MAU and top books

### Sitemap Pinging

`SitemapPinger::ping()` is called after a blog post is published. It pings Google and Bing with the sitemap URL. This is a server-side HTTP call.

### TinyMCE

Used in blog and summary editors. Loaded from CDN (`cdn.tiny.cloud`). Current `TINYMCE_API_KEY` is `'no-api-key'` — on the free plan this works but shows a warning banner. Needs a real key in production.

### File Uploads

All uploads are stored on the **local filesystem** under `public/uploads/`. There is no S3, Cloudinary, or any object storage integration. File naming: `cover_{timestamp}_{random}.webp/.jpg`, `pay_{uniqid}_{time}.ext`, blog images in `uploads/blog/featured/` and `uploads/blog/content/`.

Book content (extracted EPUB chapters) is stored in `public/book-content/{book_id}/` as HTML files with a `toc.json` manifest.

**All of this file storage will need to be migrated** to Supabase Storage or another object store for the Vercel deployment (Vercel's filesystem is ephemeral).

---

## 10. Configuration and Environment

### Config Files

| File | What it configures |
|---|---|
| `.env` | Runtime secrets (DB credentials, OAuth keys) |
| `config/db.php` | PDO singleton, `BASE_URL` auto-detection, `ASSET_VERSION` constant |
| `config/env.php` | `Env::get()` helper — reads from `$_ENV`, `getenv()`, or `.env` file |
| `config/blog.php` | Blog display constants, upload paths, comment settings, TinyMCE key |
| `config/routes.php` | All route registrations |

### Environment Variables (Vercel env vars needed)

| Variable Name | Purpose |
|---|---|
| `DB_HOST` | MySQL host |
| `DB_PORT` | MySQL port (default 3306) |
| `DB_NAME` | Database name |
| `DB_USER` | Database user |
| `DB_PASS` | Database password |
| `WHATSAPP_NUMBER` | WhatsApp support number (used in views) |
| `APP_ENV` | `production` / `development` — controls error display |
| `GOOGLE_CLIENT_ID` | Google OAuth2 client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth2 client secret |
| `GOOGLE_REDIRECT_URI` | Callback URL: `https://ismailbooks.com/auth/google/callback` |

**Note:** SMTP credentials (`smtp_host`, `smtp_port`, `smtp_username`, `smtp_password`) are stored in the `site_settings` **database table**, not environment variables. They will need to move to proper env vars in the new stack.

Stripe and PayPal keys (`stripe_public_key`, `stripe_secret_key`, `paypal_email`) are also in `site_settings`, but the payment gateway is currently manual so these are unused.

### Hard-coded Values

- `ASSET_VERSION = '1.0.8'` — in `config/db.php`
- `SITE_DOMAIN = 'https://ismailbooks.com'` — hard-coded in `SeoHelper.php`
- `BLOG_SITE_NAME`, `BLOG_SITE_DESCRIPTION` — in `config/blog.php`
- `TINYMCE_API_KEY = 'no-api-key'` — in `config/blog.php` (needs real key)

---

## 11. Known Issues and Technical Debt

### High Priority

1. **Password reset token verification is O(n):** `AuthController::resetPassword()` fetches ALL unexpired tokens from the DB and loops with `password_verify()`. On a table with many tokens this is extremely slow. The correct approach is to store the raw token (or HMAC) and query directly — **not** bcrypt-hash the token and do full-table scans. Needs to be redesigned in the new stack.

2. **`payment_id` self-reference:** `PaymentController::submit()` does:
   ```php
   $newId = $pdo->lastInsertId();
   $pdo->prepare("UPDATE payments SET payment_id = id WHERE id = ?")->execute([$newId]);
   ```
   This sets `payment_id = id` on every inserted row, making `payment_id` a redundant copy of `id`. This column appears to be leftover from a refactor and serves no purpose. Can be dropped.

3. **No email delivery:** Password reset generates a URL but never sends it by email. Users must somehow receive this URL through another channel. The admin panel has SMTP settings but no code uses them.

4. **`payer_name` and `payer_phone` captured but not stored:** The payment form collects these fields but `PaymentController::submit()` never inserts them. The admin sees no payer contact info.

5. **`BLOG_COMMENTS_ENABLED = false`** is hard-coded in `config/blog.php`. Comments can only be re-enabled by editing this file. There is no admin toggle for it.

6. **TinyMCE API key is a placeholder:** `'no-api-key'` will show a warning banner in TinyMCE 6 on production.

7. **`users` table schema uncertainty:** Three columns (`is_active`, `role`, `created_at`) appear in migration 005 indexes but no migration creates them. Their existence, types, and data must be confirmed against the live database.

### Medium Priority

8. **Two parallel `BlogPost` implementations:** `includes/BlogPost.php` (`IsmailBooks\BlogPost`) and `app/models/BlogPost.php` (`App\Models\BlogPost`) both exist and are both used in different parts of the code. The includes version is richer (full CRUD) and used by the admin blog controller via a service layer; the MVC model is used by the public blog controller. They write to the same table but are not in sync — e.g., the includes version sets `featured_image_alt` and SEO fields, the MVC model's ALLOWED_COLUMNS does not include them.

9. **`book-cards.js` is empty:** `public/assets/js/book-cards.js` contains 4 bytes (likely just a newline). Dead file.

10. **`is_active` index on users probably means `account_status`:** The index `idx_users_is_active ON users(is_active)` added by migration 005 may be wrong — the actual column is `account_status`. This index may not exist or may fail to create on a clean install.

11. **No content security policy enforcement:** The CSP header is set as `Content-Security-Policy-Report-Only` (not enforced). `'unsafe-inline'` for scripts and styles is allowed.

12. **`BLOG_CACHE_ENABLED = false`** — caching is disabled in `config/blog.php`. The file-based cache system exists but is not active. This is fine for a migration, but means the existing production site has no page caching.

13. **`session_cache_limiter('')`** is set in `public/index.php` which suppresses PHP's auto-sent `Cache-Control` headers. This is intentional (performance) but unusual and worth noting.

14. **`test.php` and `test_use.php` in project root** — these are test stubs (each is ~31–36 bytes). They should not be deployed to production.

15. **Python scripts in root** (`convert_docx_to_epub.py`, `convert_pdf.py`, `download_books.py`) — admin tooling for content preparation. Not part of the web app, but they reveal that book content preparation is a manual offline process.

---

## Needs Live-Server Access

The following items **cannot be determined from code alone** and require access to the live Hostinger server or its dashboards:

1. **Exact PHP version** running on production (code is compatible with 7.4–8.x, but the actual version affects migration planning)
2. **Exact MySQL/MariaDB version** and whether it's truly MySQL or MariaDB (affects Postgres migration compatibility of triggers and JSON column usage)
3. **`SHOW CREATE TABLE users`** — to resolve the `is_active` vs `account_status`, `role`, and `created_at` column ambiguity
4. **`SHOW CREATE TABLE user_sessions`** and **`SHOW CREATE TABLE daily_stats`** — DDL for tables not in any migration file
5. **`SHOW TRIGGERS`** — to confirm the 3 book rating triggers are actually installed on production
6. **`SHOW FULL COLUMNS FROM users`** — complete column list for the core user table
7. **Row counts** for all tables (users, books, summaries, blog_posts, payments, etc.) — needed to scope data migration effort
8. **List of all `book-content/` directories** in production — to know which books have extracted EPUB content and which don't
9. **Actual `uploads/` directory contents** on production server — local dev `uploads/` has 28 cover images + payment screenshots, but production likely has more
10. **Hostinger PHP config** (`php.ini`): `upload_max_filesize`, `post_max_size`, `max_execution_time` — relevant for file upload limits
11. **Cron jobs** configured at the server level (e.g., for session cleanup — `ActivityTracker::cleanOldSessions()` exists but there's no code calling it on a schedule)
12. **SSL certificate** issuer, expiry, and whether HSTS is already enforced by Hostinger's CDN layer or only by the `.htaccess` header
13. **DNS / nameserver configuration** — current A/CNAME records and TTLs (needed for cutover planning)
14. **Hostinger control panel settings** — any server-level caching (Hostinger LiteSpeed Cache, Redis OPcache config beyond `.htaccess`)
15. **`WHATSAPP_NUMBER` actual value** — redacted from `.env.example`; the views that reference it need the real number for migration
16. **Google OAuth2 client status** — whether the client ID in `.env.example` is the production credential or an example placeholder
17. **`site_settings` table current contents** — which settings keys are actually populated on production (especially social media URLs and SMTP, which are editable via admin panel)
18. **Whether any external CDN or proxy** (Cloudflare, Hostinger CDN) sits in front of the origin — affects HTTPS detection logic and header forwarding

---

*End of discovery audit. All findings are derived from static code analysis only. Sections flagged with ⚠ should be verified against the live database before the PRD is written.*
