import { supabase } from "@/integrations/supabase/client";

export const LEGACY_USER_NAME_KEY = "englishville_user_name";

export function clearLegacyUserIdentity() {
  localStorage.removeItem(LEGACY_USER_NAME_KEY);
}

