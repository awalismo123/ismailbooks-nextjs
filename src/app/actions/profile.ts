"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(formData: FormData) {
  const user = await getCurrentUser();
  const supabase = await createClient();

  if (!user) {
    return { error: "Fadlan soo gal." };
  }

  const username = (formData.get("username") as string)?.trim();
  const fullName = (formData.get("fullName") as string)?.trim();

  if (!username) {
    return { error: "Magaca lagama maarmaan." };
  }

  // Build update object — only include full_name if column exists (safe approach)
  const updateData: Record<string, any> = {
    username,
    updated_at: new Date().toISOString(),
  };

  // Include full_name — if column doesn't exist yet, Supabase will error
  // but we catch it gracefully below
  if (fullName !== undefined) {
    updateData.full_name = fullName || null;
  }

  const { error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", user.id);

  if (error) {
    // If full_name column doesn't exist yet, retry without it
    if (error.message?.includes("full_name")) {
      const { error: retryError } = await supabase
        .from("profiles")
        .update({ username, updated_at: new Date().toISOString() })
        .eq("id", user.id);

      if (retryError) {
        if (retryError.code === "23505") {
          return { error: "Magacan (username) wuu jiraa, fadlan mid kale dooro." };
        }
        console.error("Profile update retry error:", retryError);
        return { error: "Cillad ayaa dhacday, fadlan dib isku day." };
      }
    } else if (error.code === "23505") {
      return { error: "Magacan (username) wuu jiraa, fadlan mid kale dooro." };
    } else {
      console.error("Profile update error:", error);
      return { error: "Cillad ayaa dhacday, fadlan dib isku day." };
    }
  }

  // Password change
  const newPassword = formData.get("newPassword") as string;
  if (newPassword && newPassword.length >= 6) {
    const { error: pwdError } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (pwdError) {
      return { error: "Kumbasirka (password) lama beddeli karin. " + pwdError.message };
    }
  }

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  return { success: true };
}
