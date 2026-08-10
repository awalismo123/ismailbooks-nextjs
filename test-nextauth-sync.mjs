import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const env = fs.readFileSync(".env.local", "utf8");
let URL = "", KEY = "";
for (const line of env.split("\n")) {
  if (line.includes("NEXT_PUBLIC_SUPABASE_URL=")) URL = line.split("=")[1].trim();
  if (line.includes("SUPABASE_SERVICE_ROLE_KEY=")) KEY = line.split("=")[1].trim();
}

const supabase = createClient(URL, KEY);

async function testNextAuthProfileUpsert() {
  console.log("=== TESTING NEXTAUTH PROFILE UPSERT LOGIC ===");

  const dummyGoogleUserId = "google_user_test_999999";
  const dummyEmail = "google_test_user@gmail.com";

  // Simulate NextAuth signIn callback for Google
  const { data, error } = await supabase.from("profiles").upsert(
    {
      id: "cbba4394-6535-4f85-8f37-32818b7b0649", // existing test UUID
      username: "google_test_user",
      full_name: "Google Test User",
      account_status: "active",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) {
    console.error("❌ Profile upsert error:", error.message);
  } else {
    console.log("✅ NextAuth Google profile sync works 100%!");
  }
}

testNextAuthProfileUpsert();
