import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthIdentity } from "@/hooks/useAuthIdentity";
import { AccountSessionCard } from "@/components/AccountSessionCard";
import { supabase } from "@/integrations/supabase/client";
import logoImage from "@/assets/bloom-english-club-logo.png";

type LoginState = 'login' | 'welcome-video';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginState, setLoginState] = useState<LoginState>('login');
  const [videoEnded, setVideoEnded] = useState(false);
  const { email: activeEmail, fullName, isReady, user } = useAuthIdentity();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Invalid password", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({ title: "Login failed", description: "Invalid email or password. Please try again.", variant: "destructive" });
        } else if (error.message.includes('Email not confirmed')) {
          toast({ title: "Email not verified", description: "Please check your email and click the confirmation link.", variant: "destructive" });
        } else {
          toast({ title: "Login failed", description: error.message, variant: "destructive" });
        }
        return;
      }
      if (data.session) {
        try {
          await supabase.from('login_sessions').insert({
            user_id: data.session.user.id,
            ip_address: null,
            user_agent: navigator.userAgent,
          });
        } catch (sessionError) {
          console.error('Failed to log session:', sessionError);
        }
        toast({ title: "Welcome back! 🎉", description: "You've successfully signed in." });
        navigate('/');
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({ title: "Enter your email", description: "Please enter your email address first, then click Forgot Password.", variant: "destructive" });
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast({ title: "Check your email", description: "We've sent you a password reset link." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Could not send reset email.", variant: "destructive" });
    }
  };

  const handleVideoEnd = () => setVideoEnded(true);
  const handleContinueToModule = () => navigate("/module/1");
  const handleSwitchAccount = async () => {
    await supabase.auth.signOut();
  };

  if (loginState === 'welcome-video') {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-3xl space-y-6">
          <div className="text-center space-y-2">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="font-fredoka text-3xl md:text-4xl font-bold text-foreground">
              Welcome to Bloom English Club! 🏘️
            </motion.h1>
            <p className="text-muted-foreground">Watch this short introduction to get started</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative rounded-2xl overflow-hidden bg-black shadow-2xl">
            <video preload="metadata" src="/videos/module1/m1-l1-s1.mp4" controls autoPlay className="w-full aspect-video" onEnded={handleVideoEnd} />
          </motion.div>
          <AnimatePresence>
            {videoEnded && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
                <Button size="lg" onClick={handleContinueToModule} className="gap-2 bg-gradient-primary text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-glow">
                  Start Learning <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          {!videoEnded && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex justify-center">
              <Button variant="ghost" onClick={handleContinueToModule} className="text-muted-foreground hover:text-foreground">Skip intro →</Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  if (isReady && user) {
    return (
      <AccountSessionCard
        continueLabel="Continue to dashboard"
        description="You’re already signed in on this device, so switch accounts before testing another student login."
        email={activeEmail}
        fullName={fullName}
        onContinue={() => navigate('/')}
        onSwitchAccount={handleSwitchAccount}
        title="You’re already signed in"
      />
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="relative w-full lg:w-1/2 flex items-center justify-center p-8 overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" src="/videos/login-left.mp4" />
        <div className="absolute inset-0 bg-black/20" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <img src={logoImage} alt="Bloom English Club" className="w-32 h-32 mx-auto object-contain" />
          </div>

          <div className="text-center mb-4">
            <h1 className="font-fredoka text-3xl font-bold text-white drop-shadow-lg">Welcome Back</h1>
            <p className="text-white/80 mt-1 drop-shadow">Sign in to continue learning</p>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center justify-center gap-2 mb-6">
            <Globe className="w-4 h-4 text-white/70" />
            <select className="text-sm bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-white/30 cursor-pointer backdrop-blur-sm">
              <option value="en">English</option>
              <option value="ar">العربية (Arabic)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="zh">中文 (Chinese)</option>
              <option value="he">עברית (Hebrew)</option>
              <option value="ko">한국어 (Korean)</option>
              <option value="es">Español (Spanish)</option>
              <option value="tr">Türkçe (Turkish)</option>
            </select>
          </motion.div>

          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onSubmit={handleLogin} className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-card">
            <h2 className="font-fredoka text-xl font-semibold text-foreground mb-6">Sign in to continue</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={handleForgotPassword} className="text-sm text-primary hover:underline font-medium">
                  Forgot password?
                </button>
              </div>
              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-6" disabled={isLoading}>
                {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
                ) : (
                  <>Start Learning <ArrowRight className="w-5 h-5 ml-2" /></>
                )}
              </Button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                New to Bloom English Club?{" "}
                <Link to="/signup" className="text-primary font-semibold hover:underline">Create an account</Link>
              </p>
            </div>
          </motion.form>
        </motion.div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" src="/videos/login-right.mp4" />
      </div>
    </div>
  );
};

export default Login;
