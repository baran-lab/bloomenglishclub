import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, User, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const RequestAccess = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    if (!formData.name.trim()) {
      toast({ title: "Name required", description: "Please enter your name.", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from('beta_requests').insert({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
      });

      if (error) {
        if (error.code === '23505') {
          toast({ title: "Already requested", description: "You've already submitted a request with this email. We'll get back to you soon!", variant: "destructive" });
        } else {
          toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
        }
        return;
      }

      setIsSubmitted(true);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          </motion.div>
          <h1 className="font-fredoka text-3xl font-bold text-foreground mb-3">Request Received! 🎉</h1>
          <p className="text-muted-foreground mb-2">Thank you, <strong>{formData.name}</strong>!</p>
          <p className="text-muted-foreground mb-8">We'll review your request and send you an access code at <strong>{formData.email}</strong> soon.</p>
          <Link to="/login">
            <Button variant="outline" className="gap-2">Back to Login <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <span className="text-3xl">🐝</span>
          </motion.div>
          <h1 className="font-fredoka text-3xl font-bold text-foreground">Request Beta Access</h1>
          <p className="text-muted-foreground mt-2">Fill out the form below and we'll send you an access code</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="name" type="text" placeholder="Your full name" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="pl-10 h-12" required />
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

            <Button type="submit" className="w-full h-12 text-lg gap-2" disabled={isLoading}>
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
              ) : (
                <>Request Access <ArrowRight className="w-5 h-5" /></>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-4 text-muted-foreground">Already have a code?</span>
            </div>
          </div>

          <Link to="/signup">
            <Button variant="outline" className="w-full h-12">Sign Up with Code</Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RequestAccess;
