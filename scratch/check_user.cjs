const { createClient } = require("@supabase/supabase-js");

const url = "https://gdsmqhhzddjixifznecx.supabase.co";
const serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdkc21xaGh6ZGRqaXhpZnpuZWN4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDQ3NTQ4OSwiZXhwIjoyMTAwMDUxNDg5fQ.DuQ7OK-OmfG-aBQvYm_MDrMlAsy5rsTiEuTjE2498G0";

const supabase = createClient(url, serviceKey);

async function main() {
  const userIdStr = "50234d92-6674-47b8-8816-0d5a273dd26e";
  const userEmail = "ismailawalabdi12@gmail.com";

  // Check legacy user_id
  const { data: legacyUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", userEmail)
    .maybeSingle();

  console.log("Legacy User:", legacyUser);

  // Check auth user
  const { data: authUser } = await supabase.auth.admin.getUserById(userIdStr);
  console.log("Auth User:", authUser?.user?.id, authUser?.user?.email);

  // Check user_books query: eq vs or
  const { data: byAuthId } = await supabase
    .from("user_books")
    .select("*")
    .eq("auth_user_id", userIdStr);
  console.log("byAuthId count:", byAuthId?.length);

  const { data: byUserId } = await supabase
    .from("user_books")
    .select("*")
    .eq("user_id", legacyUser?.user_id || 3);
  console.log("byUserId count:", byUserId?.length);

  // Check combined or query
  const legacyId = legacyUser?.user_id || 3;
  const { data: combined } = await supabase
    .from("user_books")
    .select("*")
    .or(`auth_user_id.eq.${userIdStr},user_id.eq.${legacyId}`);
  console.log("combined query count:", combined?.length);
}

main().catch(console.error);
