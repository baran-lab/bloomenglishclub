import { supabase } from "@/integrations/supabase/client";

export const LEGACY_USER_NAME_KEY = "englishville_user_name";

export function clearLegacyUserIdentity() {
  localStorage.removeItem(LEGACY_USER_NAME_KEY);
}

export async function ensureBaseUserRole(userId: string) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .eq("role", "user")
    .maybeSingle();

  if (data) return;

  if (error && error.code !== "PGRST116") {
    console.error("Failed to check user role:", error);
    return;
  }

  const { error: insertError } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role: "user" });

  if (insertError && insertError.code !== "23505") {
    console.error("Failed to create default user role:", insertError);
  }
}
