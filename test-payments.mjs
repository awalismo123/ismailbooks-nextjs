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

async function testProfiles() {
  console.log("URL:", URL);
  console.log("Checking payments columns...");
  // Attempt to insert a dummy record to see if auth_user_id exists and accepts UUID
  const { data, error } = await supabase.from("payments").insert({
    payment_id: 12345678,
    user_id: 123,
    payment_method: "test",
    amount: 10,
    auth_user_id: "00000000-0000-0000-0000-000000000000"
  });
  console.log(error ? error.message : "Inserted OK (or violated foreign key which is fine)");
}
testProfiles();
