/**
 * split_sql.js
 * Splits FINAL_supabase_import.sql into Part 1 (schema) and Part 2 (data + RLS).
 * This makes it easy to paste in two steps into the Supabase SQL editor.
 */
const fs = require('fs');

const full = fs.readFileSync('FINAL_supabase_import.sql', 'utf-8');

// Part 1: everything up to and including STEP 3 header
const splitMarker = '-- STEP 3: DATA INSERTS (below)';
const splitIndex = full.indexOf(splitMarker);

if (splitIndex === -1) {
  console.error('Could not find split marker!');
  process.exit(1);
}

const part1 = full.substring(0, splitIndex + splitMarker.length);
const part2 = full.substring(splitIndex + splitMarker.length);

fs.writeFileSync('PART1_schema.sql', part1.trim(), 'utf-8');
fs.writeFileSync('PART2_data_and_rls.sql', part2.trim(), 'utf-8');

const s1 = (fs.statSync('PART1_schema.sql').size / 1024).toFixed(1);
const s2 = (fs.statSync('PART2_data_and_rls.sql').size / 1024).toFixed(1);

console.log('Done!');
console.log('  PART1_schema.sql       ->', s1, 'KB  (run this first)');
console.log('  PART2_data_and_rls.sql ->', s2, 'KB  (run this second)');
