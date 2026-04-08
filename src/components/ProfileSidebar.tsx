import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Flame, Trophy, Award, BookOpen, Mic, Target, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserProgress } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";
import { microplay } from "@/utils/microplayMessages";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
}

export function ProfileSidebar({ isOpen, onClose, progress }: ProfileSidebarProps) {
  const navigate = useNavigate();
  const { userData } = useUserStore();

  const handleLogout = async () => {
    const { supabase } = await import('@/integrations/supabase/client');
    await supabase.auth.signOut();
    navigate('/login');
    onClose();
  };

  // Use real user data from store
  const completedLessons = userData.completedLessons?.length || 0;
  const streak = userData.streak || 0;
  const points = userData.points || 0;

  const stats = [
    { label: "Lessons Completed", value: completedLessons, description: completedLessons > 0 ? "Keep learning!" : "Start your first lesson" },
    { label: "Current Streak", value: `${streak} day${streak !== 1 ? 's' : ''}`, description: streak > 0 ? "You're consistent!" : "Practice daily to build a streak" },
    { label: "Total Points", value: points, description: points > 0 ? "You're earning!" : "Earn points by practicing" },
  ];

  // Progress message based on what user has done
  const getProgressMessage = () => {
    if (completedLessons === 0) return "Start your first lesson to begin your journey!";
    if (completedLessons < 3) return "You can now introduce yourself.";
    if (completedLessons < 6) return "You can now say your name and where you are from.";
    if (completedLessons < 10) return "You can now spell your name and say dates.";
    return "You are building strong English skills!";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-card shadow-2xl z-50 overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <h2 className="font-fredoka text-xl font-semibold">Your Progress</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Profile Card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground mb-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl font-bold">
                    {progress.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-fredoka text-xl font-bold">{progress.name}</h3>
                    <p className="text-primary-foreground/80 text-sm">English Learner</p>
                  </div>
                </div>
                <p className="text-sm text-primary-foreground/90 italic">{getProgressMessage()}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span className="font-semibold">{points} points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-accent" />
                    <span className="font-semibold">{streak} day streak</span>
                  </div>
                </div>
              </motion.div>

              {/* Real Stats */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
                <h3 className="font-fredoka text-lg font-semibold mb-4">Your Activity</h3>
                <div className="space-y-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="bg-muted/50 rounded-xl p-3">
                      <div className="flex justify-between text-sm mb-0.5">
                        <span className="text-foreground font-medium">{stat.label}</span>
                        <span className="font-semibold text-primary">{stat.value}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Log Out */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6">
                <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" /> Log Out
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
