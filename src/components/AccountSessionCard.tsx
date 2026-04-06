import { Button } from "@/components/ui/button";

interface AccountSessionCardProps {
  continueLabel: string;
  description: string;
  email: string;
  fullName: string;
  onContinue: () => void;
  onSwitchAccount: () => void | Promise<void>;
  title: string;
}

export function AccountSessionCard({
  continueLabel,
  description,
  email,
  fullName,
  onContinue,
  onSwitchAccount,
  title,
}: AccountSessionCardProps) {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card shadow-card p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="font-fredoka text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="rounded-2xl bg-muted/50 border border-border p-4 text-center space-y-1">
          <p className="font-semibold text-foreground">{fullName || "Current user"}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>

        <div className="space-y-3">
          <Button className="w-full" onClick={onContinue}>
            {continueLabel}
          </Button>
          <Button className="w-full" variant="outline" onClick={onSwitchAccount}>
            Switch account
          </Button>
        </div>
      </div>
    </div>
  );
}
