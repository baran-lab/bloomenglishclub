import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Flame, Trophy, Award, BookOpen, Mic, Target, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserProgress } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
}

const badgeIcons: Record<string, React.ComponentType<any>> = {
  star: Star,
  flame: Flame,
  book: BookOpen,
  mic: Mic,
  trophy: Trophy,
};

export function ProfileSidebar({ isOpen, onClose, progress }: ProfileSidebarProps) {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    const { supabase } = await import('@/integrations/supabase/client');
    await supabase.auth.signOut();
    navigate('/login');
    onClose();
  };

  const stats = [
    { label: "Modules", current: progress.modulesCompleted, total: progress.totalModules, color: "bg-primary" },
    { label: "Vocabulary", current: progress.vocabulary.current, total: progress.vocabulary.total, color: "bg-module-2" },
    { label: "Everyday English", current: progress.everydayEnglish.current, total: progress.everydayEnglish.total, color: "bg-accent" },
    { label: "Listening", current: progress.listening.current, total: progress.listening.total, color: "bg-module-3" },
    { label: "Speaking", current: progress.speaking.current, total: progress.speaking.total, color: "bg-module-4" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-card shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <h2 className="font-fredoka text-xl font-semibold">Your Progress</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground mb-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl font-bold">
                    {progress.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-fredoka text-xl font-bold">{progress.name}</h3>
                    <p className="text-primary-foreground/80 text-sm">Level {progress.level} Learner</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span className="font-semibold">{progress.points} points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-accent" />
                    <span className="font-semibold">{progress.streak} day streak!</span>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <h3 className="font-fredoka text-lg font-semibold mb-4">Learning Stats</h3>
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={stat.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground font-medium">{stat.label}</span>
                        <span className="text-muted-foreground">
                          {stat.current}/{stat.total}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(stat.current / stat.total) * 100}%` }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                          className={cn("h-full rounded-full", stat.color)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-fredoka text-lg font-semibold mb-4">Badges</h3>
                <div className="grid grid-cols-2 gap-3">
                  {progress.badges.map((badge, index) => {
                    const Icon = badgeIcons[badge.icon] || Award;
                    return (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className={cn(
                          "rounded-xl p-4 text-center transition-all",
                          badge.isEarned
                            ? "bg-accent/10 border-2 border-accent"
                            : "bg-muted border-2 border-transparent opacity-50"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center",
                          badge.isEarned ? "bg-accent" : "bg-locked"
                        )}>
                          <Icon className={cn(
                            "w-5 h-5",
                            badge.isEarned ? "text-accent-foreground" : "text-locked-foreground"
                          )} />
                        </div>
                        <p className={cn(
                          "font-semibold text-sm",
                          badge.isEarned ? "text-foreground" : "text-locked-foreground"
                        )}>
                          {badge.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {badge.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Log Out Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
