import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const env = fs.readFileSync(".env.local", "utf8");
let URL = "";
let KEY = "";
for (const line of env.split("\n")) {
  if (line.startsWith("NEXT_PUBLIC_SUPABASE_URL=")) URL = line.split("=")[1].trim();
  if (line.startsWith("SUPABASE_SERVICE_ROLE_KEY=")) KEY = line.split("=")[1].trim();
}

const supabase = createClient(URL, KEY);

async function checkSchema() {
  console.log("Checking if profiles table exists...");
  const { data: p, error: pe } = await supabase.from("profiles").select("*").limit(1);
  if (pe) console.error("Profiles error:", pe.message);
  else console.log("Profiles table EXISTS!");

  console.log("Checking if auth_user_id exists on payments...");
  const { data: pay, error: payE } = await supabase.from("payments").select("auth_user_id").limit(1);
  if (payE) console.error("Payments error:", payE.message);
  else console.log("auth_user_id column on payments EXISTS!");

  console.log("Checking if users table exists...");
  const { data: u, error: ue } = await supabase.from("users").select("user_id, email").limit(1);
  if (ue) console.error("Users error:", ue.message);
  else console.log("Users table EXISTS!");
}

checkSchema();
