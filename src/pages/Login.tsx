import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Building2, Mail, Lock, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import heroImage from "@/assets/englishville-hero.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, just navigate to dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={heroImage}
          alt="Englishville - A welcoming neighborhood"
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
              Welcome to Englishville!
            </h2>
            <p className="text-muted-foreground">
              Join Maria, Ahmed, Yuki, and friends as they learn everyday English in their American neighborhood. 🏘️
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
              Englishville
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
              <option value="zh">中文</option>
              <option value="vi">Tiếng Việt</option>
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
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-6"
              >
                Start Learning
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                New to Englishville?{" "}
                <button
                  type="button"
                  className="text-primary font-semibold hover:underline"
                >
                  Create an account
                </button>
              </p>
            </div>
          </motion.form>

          {/* Demo notice */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-xs text-muted-foreground mt-6"
          >
            💡 Demo: Click "Start Learning" to explore the app
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
