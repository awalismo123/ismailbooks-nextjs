import fs from "fs";

// Poor man's dotenv
const env = fs.readFileSync(".env.local", "utf8");
let URL = "";
let KEY = "";
for (const line of env.split("\n")) {
  if (line.startsWith("NEXT_PUBLIC_SUPABASE_URL=")) URL = line.split("=")[1].trim();
  if (line.startsWith("NEXT_PUBLIC_SUPABASE_ANON_KEY=")) KEY = line.split("=")[1].trim();
}

async function run() {
  const res = await fetch(`${URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: `test_http_${Date.now()}@example.com`,
      password: "TestPassword123!"
    })
  });
  
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text);
}

run();
