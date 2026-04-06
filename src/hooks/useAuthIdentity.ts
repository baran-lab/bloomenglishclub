import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { clearLegacyUserIdentity, LEGACY_USER_NAME_KEY } from "@/lib/auth";

interface AuthIdentityState {
  email: string;
  fullName: string;
  isAdmin: boolean;
  isReady: boolean;
  user: User | null;
}

const defaultState: AuthIdentityState = {
  email: "",
  fullName: "",
  isAdmin: false,
  isReady: false,
  user: null,
};

const getFallbackName = (user: User) => {
  const metadataName = typeof user.user_metadata?.full_name === "string"
    ? user.user_metadata.full_name.trim()
    : "";

  if (metadataName) return metadataName;
  if (user.email) return user.email.split("@")[0];
  return "Friend";
};

export function useAuthIdentity() {
  const [state, setState] = useState<AuthIdentityState>(defaultState);

  useEffect(() => {
    let isActive = true;

    const setSignedOut = () => {
      clearLegacyUserIdentity();

      if (!isActive) return;
      setState({ ...defaultState, isReady: true });
    };

    const syncIdentity = async (session: Session | null) => {
      const currentUser = session?.user ?? null;

      if (!currentUser) {
        setSignedOut();
        return;
      }

      const [{ data: profile, error: profileError }, { data: isAdmin, error: roleError }] = await Promise.all([
        supabase
          .from("profiles")
          .select("full_name, email")
          .eq("id", currentUser.id)
          .maybeSingle(),
        supabase.rpc("has_role", { _user_id: currentUser.id, _role: "admin" }),
      ]);

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Failed to load profile:", profileError);
      }

      if (roleError) {
        console.error("Failed to load admin role:", roleError);
      }

      const fullName = profile?.full_name?.trim() || getFallbackName(currentUser);
      localStorage.setItem(LEGACY_USER_NAME_KEY, fullName);

      if (!isActive) return;

      setState({
        email: profile?.email || currentUser.email || "",
        fullName,
        isAdmin: isAdmin === true,
        isReady: true,
        user: currentUser,
      });
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      void syncIdentity(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      void syncIdentity(session);
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, []);

  return state;
}
