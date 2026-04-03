import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Building2, Mail, Lock, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/englishville-hero.jpg";

type LoginState = 'login' | 'welcome-video';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginState, setLoginState] = useState<LoginState>('login');
  const [videoEnded, setVideoEnded] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate('/');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Login failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email not verified",
            description: "Please check your email and click the confirmation link.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.session) {
        toast({
          title: "Welcome back! 🎉",
          description: "You've successfully signed in.",
        });
        // Show welcome video
        setLoginState('welcome-video');
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleContinueToModule = () => {
    navigate("/module/1");
  };

  // Welcome video screen
  if (loginState === 'welcome-video') {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-3xl space-y-6"
        >
          <div className="text-center space-y-2">
              <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-fredoka text-3xl md:text-4xl font-bold text-foreground"
            >
              Welcome to Bloom English Club! 🏘️
            </motion.h1>
            <p className="text-muted-foreground">
              Watch this short introduction to get started
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden bg-black shadow-2xl"
          >
            <video
              src="/videos/module1/m1-l1-s1.mp4"
              controls
              autoPlay
              className="w-full aspect-video"
              onEnded={handleVideoEnd}
            />
          </motion.div>

          <AnimatePresence>
            {videoEnded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <Button
                  size="lg"
                  onClick={handleContinueToModule}
                  className="gap-2 bg-gradient-primary text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-glow"
                >
                  Start Learning
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {!videoEnded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center"
            >
              <Button
                variant="ghost"
                onClick={handleContinueToModule}
                className="text-muted-foreground hover:text-foreground"
              >
                Skip intro →
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={heroImage}
          alt="Bloom English Club - A welcoming neighborhood"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
        <div className="relative z-10 p-12 flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 max-w-md shadow-card"
          >
            <h2 className="font-fredoka text-2xl font-bold text-foreground mb-2">
              Welcome to Bloom English Club!
            </h2>
            <p className="text-muted-foreground">
              Learn everyday English through real conversations with your neighbors. 🏘️
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-20 h-20 rounded-2xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center shadow-glow"
            >
              <Building2 className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="font-fredoka text-3xl font-bold text-foreground">
              Bloom English Club
            </h1>
            <p className="text-muted-foreground mt-1">
              Learn English for everyday life
            </p>
          </div>

          {/* Language selector */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <Globe className="w-4 h-4 text-muted-foreground" />
            <select className="text-sm bg-transparent text-muted-foreground border-none focus:ring-0 cursor-pointer">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="ar">العربية</option>
              <option value="ko">한국어</option>
              <option value="tr">Türkçe</option>
              <option value="bn">বাংলা</option>
            </select>
          </motion.div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleLogin}
            className="bg-card rounded-2xl p-6 shadow-card"
          >
            <h2 className="font-fredoka text-xl font-semibold text-foreground mb-6">
              Sign in to continue
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Start Learning
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                New to Bloom English Club?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-semibold hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
