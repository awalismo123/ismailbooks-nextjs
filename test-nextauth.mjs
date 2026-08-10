async function testNextAuthEndpoints() {
  console.log("=== TESTING NEXTAUTH API ENDPOINTS ===\n");

  try {
    const res = await fetch("http://localhost:3000/api/auth/providers");
    if (res.status === 200) {
      const data = await res.json();
      console.log("✅ NextAuth /api/auth/providers is active and returning 200 OK!");
      console.log("Configured Providers:", Object.keys(data));
      console.log("Google Provider Configured:", !!data.google);
      console.log("Credentials Provider Configured:", !!data.credentials);
    } else {
      console.log(`⚠️ Dev server returned status: ${res.status}`);
    }
  } catch (err) {
    console.error("❌ Could not connect to dev server on http://localhost:3000:", err.message);
  }
}

testNextAuthEndpoints();
