import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const env = fs.readFileSync(".env.local", "utf8");
let URL = "", KEY = "";
for (const line of env.split("\n")) {
  if (line.includes("NEXT_PUBLIC_SUPABASE_URL=")) URL = line.split("=")[1].trim();
  if (line.includes("SUPABASE_SERVICE_ROLE_KEY=")) KEY = line.split("=")[1].trim();
}

const supabase = createClient(URL, KEY);

async function runFullTest() {
  console.log("=== FULL AUTH + PROFILE TEST ===\n");

  // 1. Sign up a new user
  const email = `fulltest_${Date.now()}@example.com`;
  console.log(`1. Signing up: ${email}`);
  const signupRes = await fetch(`${URL}/auth/v1/signup`, {
    method: "POST",
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: "TestPass123!" })
  });
  const signup = await signupRes.json();

  if (signupRes.status !== 200) {
    console.error("❌ Signup FAILED:", signup.msg || signup.error_description);
    return;
  }
  const userId = signup.user?.id;
  console.log(`   ✅ Signup OK — user ID: ${userId}\n`);

  // 2. Wait a moment for trigger to run
  await new Promise(r => setTimeout(r, 1000));

  // 3. Check profiles table
  console.log("2. Checking profiles table...");
  const { data: profile, error: profErr } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (profErr) {
    console.error("   ❌ Profile query error:", profErr.message);
  } else if (!profile) {
    console.error("   ❌ No profile row was created by the trigger!");
  } else {
    console.log("   ✅ Profile created by trigger:");
    console.log("   ", JSON.stringify(profile, null, 2));
  }

  // 4. Check blog posts are visible
  console.log("\n3. Checking blog posts...");
  const { data: posts, error: blogErr } = await supabase
    .from("blog_posts")
    .select("id, title, status")
    .eq("status", "published")
    .limit(3);
  
  if (blogErr) {
    console.error("   ❌ Blog posts error:", blogErr.message);
  } else {
    console.log(`   ✅ Found ${posts?.length ?? 0} published blog posts`);
    posts?.forEach(p => console.log(`      - [${p.id}] ${p.title}`));
  }

  // 5. Check reading_progress has auth_user_id column
  console.log("\n4. Checking reading_progress schema...");
  const { error: rpErr } = await supabase
    .from("reading_progress")
    .select("auth_user_id")
    .limit(1);
  if (rpErr) {
    console.error("   ❌ reading_progress.auth_user_id missing:", rpErr.message);
  } else {
    console.log("   ✅ reading_progress.auth_user_id column exists");
  }

  console.log("\n=== TEST COMPLETE ===");
}

runFullTest();
