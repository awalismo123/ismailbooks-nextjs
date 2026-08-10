const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', '_ismail_books production live server database.sql');
const outputFile = path.join(__dirname, 'supabase_data_inserts.sql');

if (!fs.existsSync(inputFile)) {
  console.error('Could not find the SQL dump file at:', inputFile);
  process.exit(1);
}

const content = fs.readFileSync(inputFile, 'utf-8');

// We only want the INSERT INTO statements for the tables we care about.
const targetTables = [
  'users',
  'admin_users',
  'books',
  'summaries',
  'blog_categories',
  'blog_posts',
  'payments',
  'user_books',
  'user_summaries',
  'reading_progress',
  'password_reset_tokens',
  'user_sessions',
  'daily_stats',
  'site_settings',
  'book_insights',
  'oauth_providers'
];

let outSql = '-- PostgreSQL Data Imports (Generated from MySQL dump)\n\n';

// We process line by line to extract INSERT INTO statements
const lines = content.split('\n');
let inInsert = false;
let currentTable = '';

for (let line of lines) {
  if (line.startsWith('INSERT INTO')) {
    // Check if it's one of our target tables
    const match = line.match(/INSERT INTO `([^`]+)`/);
    if (match && targetTables.includes(match[1])) {
      inInsert = true;
      currentTable = match[1];
      
      // Transform the line
      let transformed = line
        .replace(/`([^`]+)`/g, '"$1"') // backticks to double quotes for identifiers
        .replace(/\\'/g, "''")         // escaped single quotes to double single quotes
        .replace(/\\"/g, '"')          // escaped double quotes to just double quotes
        .replace(/\\r\\n/g, '\n')      // MySQL literal \r\n to actual newline
        .replace(/\\n/g, '\n');        // MySQL literal \n to actual newline

      outSql += transformed + '\n';
    }
  } else if (inInsert) {
    let transformed = line
        .replace(/\\'/g, "''")
        .replace(/\\"/g, '"')
        .replace(/\\r\\n/g, '\n')
        .replace(/\\n/g, '\n');

    outSql += transformed + '\n';
    
    // An INSERT statement ends with a semicolon
    if (line.trim().endsWith(';')) {
      inInsert = false;
    }
  }
}

// Reset all sequences for tables that have auto-increment IDs
outSql += '\n-- Reset Sequences so new rows get the correct IDs\n';
const seqTables = [
  { table: 'users', id: 'user_id' },
  { table: 'admin_users', id: 'id' },
  { table: 'books', id: 'id' },
  { table: 'summaries', id: 'id' },
  { table: 'blog_categories', id: 'id' },
  { table: 'blog_posts', id: 'id' },
  { table: 'payments', id: 'id' },
  { table: 'user_books', id: 'id' },
  { table: 'user_summaries', id: 'id' },
  { table: 'reading_progress', id: 'id' },
  { table: 'password_reset_tokens', id: 'id' },
  { table: 'user_sessions', id: 'id' },
  { table: 'daily_stats', id: 'id' },
  { table: 'book_insights', id: 'id' },
  { table: 'oauth_providers', id: 'id' }
];

for (const { table, id } of seqTables) {
  outSql += `SELECT setval(pg_get_serial_sequence('"${table}"', '${id}'), COALESCE((SELECT MAX("${id}") FROM "${table}") + 1, 1), false);\n`;
}

fs.writeFileSync(outputFile, outSql, 'utf-8');
console.log('Successfully generated supabase_data_inserts.sql');
