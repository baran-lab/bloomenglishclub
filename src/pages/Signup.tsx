import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AccountSessionCard } from "@/components/AccountSessionCard";
import { useAuthIdentity } from "@/hooks/useAuthIdentity";
import { supabase } from "@/integrations/supabase/client";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { email: activeEmail, fullName: activeFullName, isReady, user } = useAuthIdentity();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Passwords don't match", description: "Please make sure your passwords match.", variant: "destructive" });
      return;
    }

    if (formData.password.length < 6) {
      toast({ title: "Password too short", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }

    if (!formData.fullName.trim()) {
      toast({ title: "Full name required", description: "Please enter your full name.", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: formData.fullName.trim(),
          },
        },
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast({ title: "Account exists", description: "An account with this email already exists. Please sign in instead.", variant: "destructive" });
        } else {
          toast({ title: "Signup failed", description: error.message, variant: "destructive" });
        }
        return;
      }

      if (data.user && data.user.identities && data.user.identities.length === 0) {
        toast({ title: "Account already exists", description: "An account with this email already exists. Please sign in instead.", variant: "destructive" });
        return;
      }

      if (data.session) {
        toast({ title: "Welcome to Bloom English Club! 🎉", description: "Your account has been created successfully." });
        navigate('/');
      } else {
        toast({ title: "Check your email", description: "Please confirm your email to finish creating your account." });
        navigate('/login');
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchAccount = async () => {
    await supabase.auth.signOut();
  };

  if (isReady && user) {
    return (
      <AccountSessionCard
        continueLabel="Continue to dashboard"
        description="A different user is already signed in on this device, so switch accounts before creating a new student account."
        email={activeEmail}
        fullName={activeFullName}
        onContinue={() => navigate('/')}
        onSwitchAccount={handleSwitchAccount}
        title="You’re already signed in"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4"
          >
            <span className="text-3xl">🐝</span>
          </motion.div>
          <h1 className="font-fredoka text-3xl font-bold text-foreground">
            Join Bloom English Club
          </h1>
          <p className="text-muted-foreground mt-2">
            Create your account with your name, email, and password
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
            Beta test signup is now open
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-card p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="fullName" type="text" placeholder="Your full name" value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="pl-10 h-12" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="pl-10 h-12" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a password (min 6 chars)"
                  value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 h-12" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Confirm your password"
                  value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 h-12" required />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg gap-2" disabled={isLoading}>
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
              ) : (
                <>Create Account <ArrowRight className="w-5 h-5" /></>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-4 text-muted-foreground">Already have an account?</span>
            </div>
          </div>

          <Link to="/login">
            <Button variant="outline" className="w-full h-12">Sign In Instead</Button>
          </Link>
        </motion.div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">No invite code is needed for the beta test.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
