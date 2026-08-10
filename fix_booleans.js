const fs = require('fs');
let schema = fs.readFileSync('supabase_schema_v2.sql', 'utf-8');

schema = schema.replace(/BOOLEAN DEFAULT FALSE/g, 'INTEGER DEFAULT 0');
schema = schema.replace(/BOOLEAN DEFAULT TRUE/g, 'INTEGER DEFAULT 1');

fs.writeFileSync('supabase_schema_v2.sql', schema);

const alters = `
-- Final step: Convert all those integer columns back into real Postgres Booleans!
ALTER TABLE blog_categories ALTER COLUMN is_active TYPE BOOLEAN USING (is_active = 1), ALTER COLUMN is_active SET DEFAULT true;
ALTER TABLE blog_posts ALTER COLUMN is_featured TYPE BOOLEAN USING (is_featured = 1), ALTER COLUMN is_featured SET DEFAULT false;
ALTER TABLE blog_posts ALTER COLUMN allow_comments TYPE BOOLEAN USING (allow_comments = 1), ALTER COLUMN allow_comments SET DEFAULT true;
ALTER TABLE books ALTER COLUMN is_paid TYPE BOOLEAN USING (is_paid = 1), ALTER COLUMN is_paid SET DEFAULT false;
ALTER TABLE books ALTER COLUMN is_active TYPE BOOLEAN USING (is_active = 1), ALTER COLUMN is_active SET DEFAULT true;
ALTER TABLE book_insights ALTER COLUMN is_active TYPE BOOLEAN USING (is_active = 1), ALTER COLUMN is_active SET DEFAULT true;
ALTER TABLE password_reset_tokens ALTER COLUMN used TYPE BOOLEAN USING (used = 1), ALTER COLUMN used SET DEFAULT false;
ALTER TABLE payments ALTER COLUMN notify_sent TYPE BOOLEAN USING (notify_sent = 1), ALTER COLUMN notify_sent SET DEFAULT false;
ALTER TABLE reading_progress ALTER COLUMN completed TYPE BOOLEAN USING (completed = 1), ALTER COLUMN completed SET DEFAULT false;
ALTER TABLE summaries ALTER COLUMN is_paid TYPE BOOLEAN USING (is_paid = 1), ALTER COLUMN is_paid SET DEFAULT false;
ALTER TABLE users ALTER COLUMN profile_complete TYPE BOOLEAN USING (profile_complete = 1), ALTER COLUMN profile_complete SET DEFAULT false;
`;

fs.appendFileSync('supabase_data_inserts.sql', alters);
console.log('Scripts updated!');
