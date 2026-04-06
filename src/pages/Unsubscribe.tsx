import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [status, setStatus] = useState<Status>("loading");
  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: SUPABASE_ANON_KEY },
    })
      .then(r => r.json())
      .then(data => {
        if (data.valid === false && data.reason === "already_unsubscribed") setStatus("already");
        else if (data.valid) setStatus("valid");
        else setStatus("invalid");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const handleUnsubscribe = async () => {
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) setStatus("success");
      else if (data.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-card p-8 text-center space-y-4">
        <span className="text-4xl">🐝</span>
        <h1 className="font-fredoka text-2xl font-bold text-foreground">Bloom English Club</h1>

        {status === "loading" && <p className="text-muted-foreground">Verifying…</p>}
        {status === "valid" && (
          <>
            <p className="text-muted-foreground">Would you like to unsubscribe from our emails?</p>
            <Button onClick={handleUnsubscribe} className="w-full">Confirm Unsubscribe</Button>
          </>
        )}
        {status === "success" && <p className="text-success font-semibold">You've been unsubscribed. You won't receive any more emails from us.</p>}
        {status === "already" && <p className="text-muted-foreground">You're already unsubscribed.</p>}
        {status === "invalid" && <p className="text-destructive">This unsubscribe link is invalid or expired.</p>}
        {status === "error" && <p className="text-destructive">Something went wrong. Please try again later.</p>}
      </div>
    </div>
  );
};

export default Unsubscribe;
