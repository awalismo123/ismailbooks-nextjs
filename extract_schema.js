const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', '_ismail_books production live server database.sql');
const content = fs.readFileSync(inputFile, 'utf-8');

const regex = /CREATE TABLE `([^`]+)` \([\s\S]*?\) ENGINE=InnoDB/g;
let match;
const schemas = {};

while ((match = regex.exec(content)) !== null) {
  schemas[match[1]] = match[0];
}

const targetTables = [
  'admin_users', 'blog_categories', 'blog_posts', 'books', 'book_insights',
  'daily_stats', 'oauth_providers', 'password_reset_tokens', 'payments',
  'reading_progress', 'site_settings', 'summaries', 'users', 'user_books',
  'user_summaries', 'user_sessions'
];

let out = '';
for (const table of targetTables) {
  out += `\n--- Table: ${table} ---\n`;
  out += schemas[table] + '\n';
}

fs.writeFileSync('extracted_schemas.txt', out, 'utf-8');
console.log('Saved to extracted_schemas.txt');
