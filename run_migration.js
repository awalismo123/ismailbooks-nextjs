/**
 * run_migration.js
 * Connects directly to Supabase PostgreSQL and runs the full migration.
 */
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const CONNECTION_STRING = 'postgresql://postgres:Awal0636475579@db.gdsmqhhzddjixifznecx.supabase.co:5432/postgres?sslmode=require';
const SQL_FILE = path.join(__dirname, 'FINAL_supabase_import.sql');

async function main() {
  const client = new Client({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  });

  console.log('Connecting to Supabase...');
  await client.connect();
  console.log('Connected! Reading SQL file...');

  const sql = fs.readFileSync(SQL_FILE, 'utf-8');

  // Split into individual statements by semicolon, filter empties
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`Running ${statements.length} SQL statements...\n`);

  let done = 0;
  let errors = 0;

  for (const stmt of statements) {
    try {
      await client.query(stmt);
      done++;
      if (done % 50 === 0) {
        console.log(`  Progress: ${done}/${statements.length} statements completed...`);
      }
    } catch (err) {
      errors++;
      console.error(`  ⚠️  Error on statement #${done + 1}: ${err.message}`);
      console.error(`  Statement preview: ${stmt.substring(0, 100)}...`);
    }
  }

  await client.end();

  console.log('\n================================================');
  console.log(`✅ Migration complete!`);
  console.log(`   Successful: ${done}`);
  console.log(`   Errors:     ${errors}`);
  console.log('================================================');
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
