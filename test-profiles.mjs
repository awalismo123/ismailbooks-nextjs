import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const env = fs.readFileSync(".env.local", "utf8");
let URL = "";
let KEY = "";
for (const line of env.split("\n")) {
  if (line.includes("NEXT_PUBLIC_SUPABASE_URL=")) URL = line.split("=")[1].trim();
  if (line.includes("SUPABASE_SERVICE_ROLE_KEY=")) KEY = line.split("=")[1].trim();
}

const supabase = createClient(URL, KEY);

async function checkProfilesSchema() {
  console.log("Fetching a single row from profiles to inspect its columns...");
  // We use the REST API to get the column list by throwing a deliberate error or parsing the JSON
  const { data, error } = await supabase.from("profiles").select("*").limit(1);
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Columns:", data.length > 0 ? Object.keys(data[0]) : "No rows, cannot infer columns.");
    
    // Better way: use an OPTIONS request or just try to insert a fake record and let it fail to see what's wrong
    const { error: insertErr } = await supabase.from("profiles").insert({
        id: "00000000-0000-0000-0000-000000000000",
        username: "test",
        full_name: "test",
        is_admin: false,
        account_status: "active"
    });
    console.log("Insert Test Result:", insertErr ? insertErr.message : "Success");
  }
}

checkProfilesSchema();
