import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testSignup() {
  console.log("Testing email/password signup to verify the database trigger...");
  
  const testEmail = `test_trigger_${Date.now()}@example.com`;
  
  const { data, error } = await supabase.auth.signUp({
    email: testEmail,
    password: "TestPassword123!",
  });

  if (error) {
    console.error("❌ SIGNUP FAILED:");
    console.error(JSON.stringify(error, null, 2));
    console.error(error.message);
  } else {
    console.log("✅ SIGNUP SUCCESSFUL!");
    console.log("Created user ID:", data.user?.id);
  }
}

testSignup();
