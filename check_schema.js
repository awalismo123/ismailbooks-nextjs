const { Client } = require('pg');

const CONNECTION_STRING = 'postgresql://postgres:Awal0636475579@db.gdsmqhhzddjixifznecx.supabase.co:5432/postgres?sslmode=require';

async function main() {
  const client = new Client({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  const res = await client.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'reading_progress';
  `);
  console.log(res.rows);
  await client.end();
}

main().catch(err => console.error(err));
