// No dotenv require, using node --env-file
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  console.error("Missing environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function testConnection() {
  console.log("Checking Supabase connection...");
  
  // 1. Check if we can fetch users from auth
  const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
  if (usersError) {
    console.error("Error fetching users (Service Role missing or invalid):", usersError.message);
  } else {
    console.log(`✅ Success: Found ${users.users.length} users in Auth.`);
  }

  // 2. Check if the 'profiles' table exists and has data
  const { data: profiles, error: profilesError } = await supabase.from("profiles").select("id").limit(1);
  if (profilesError) {
    console.error("Error fetching profiles:", profilesError.message);
  } else {
    console.log(`✅ Success: 'profiles' table exists and is accessible.`);
  }

  // 3. Check if the 'books' table exists
  const { data: books, error: booksError } = await supabase.from("books").select("id").limit(1);
  if (booksError) {
    console.error("Error fetching books:", booksError.message);
  } else {
    console.log(`✅ Success: 'books' table exists and is accessible.`);
  }
}

testConnection();
