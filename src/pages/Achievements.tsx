import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Trophy, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/stores/userStore";
import { playSuccessSound } from "@/utils/soundEffects";

interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  condition: (stats: UserStats) => boolean;
}

interface UserStats {
  lessonsCompleted: number;
  streak: number;
  recordings: number;
  gamesPlayed: number;
  points: number;
  tasksCompleted: number;
}

const achievements: AchievementDef[] = [
  // Getting Started
  { id: "first-lesson", name: "First Step", description: "Completed your first lesson", icon: "🥇", category: "Getting Started", condition: (s) => s.lessonsCompleted >= 1 },
  { id: "first-task", name: "First Daily Task", description: "Completed your first daily task", icon: "✅", category: "Getting Started", condition: (s) => s.tasksCompleted >= 1 },
  { id: "first-voice", name: "First Voice", description: "Made your first voice recording", icon: "🎤", category: "Getting Started", condition: (s) => s.recordings >= 1 },
  { id: "first-game", name: "Game On", description: "Played your first game", icon: "🎮", category: "Getting Started", condition: (s) => s.gamesPlayed >= 1 },
  // Consistency
  { id: "streak-3", name: "3-Day Streak", description: "Practiced 3 days in a row", icon: "🔥", category: "Consistency", condition: (s) => s.streak >= 3 },
  { id: "streak-7", name: "7-Day Streak", description: "Practiced 7 days in a row", icon: "⭐", category: "Consistency", condition: (s) => s.streak >= 7 },
  { id: "streak-14", name: "2-Week Streak", description: "14 days of practice!", icon: "🏅", category: "Consistency", condition: (s) => s.streak >= 14 },
  { id: "streak-30", name: "Unstoppable", description: "30-day streak!", icon: "🚀", category: "Consistency", condition: (s) => s.streak >= 30 },
  // Learning
  { id: "5-lessons", name: "Getting Started", description: "Completed 5 lessons", icon: "🚶", category: "Learning", condition: (s) => s.lessonsCompleted >= 5 },
  { id: "first-module", name: "Module Master", description: "Completed a full module", icon: "📘", category: "Learning", condition: (s) => s.lessonsCompleted >= 10 },
  // Speaking
  { id: "10-recordings", name: "Confident Speaker", description: "10 voice recordings", icon: "🗣", category: "Speaking", condition: (s) => s.recordings >= 10 },
  // Real-Life
  { id: "intro-self", name: "Real-Life Speaker", description: "Used English in real life", icon: "💬", category: "Real-Life", condition: (s) => s.tasksCompleted >= 1 },
];

const rewardLevels = [
  { points: 50, label: "Great Start", icon: "🎉" },
  { points: 100, label: "Active Learner", icon: "🏅" },
  { points: 200, label: "Practice Pro", icon: "⭐" },
  { points: 300, label: "Confident Speaker", icon: "🗣️" },
  { points: 500, label: "Certificate", icon: "📜" },
];

const pointsRules = [
  { action: "Complete lesson", points: "+10" },
  { action: "Complete daily task", points: "+5" },
  { action: "Complete game", points: "+3" },
  { action: "Record voice", points: "+2" },
  { action: "7-day streak bonus", points: "+20" },
];

export default function Achievements() {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const [showUnlock, setShowUnlock] = useState<AchievementDef | null>(null);

  const stats: UserStats = {
    lessonsCompleted: userData.completedLessons?.length || 0,
    streak: userData.streak || 0,
    recordings: parseInt(localStorage.getItem('englishville_recordings') || '0'),
    gamesPlayed: parseInt(localStorage.getItem('englishville_games_played') || '0'),
    points: userData.points || 0,
    tasksCompleted: parseInt(localStorage.getItem('englishville_tasks_completed') || '0'),
  };

  const earnedIds = achievements.filter(a => a.condition(stats)).map(a => a.id);
  const categories = [...new Set(achievements.map(a => a.category))];
  const nextReward = rewardLevels.find(r => r.points > stats.points);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-fredoka text-xl font-bold text-foreground">Achievements & Rewards</h1>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Points Overview */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-primary rounded-2xl p-5 text-primary-foreground text-center">
          <p className="text-sm opacity-80">Total Points</p>
          <p className="font-fredoka text-4xl font-bold">⭐ {stats.points}</p>
          {nextReward && (
            <div className="mt-3">
              <p className="text-xs opacity-70">{nextReward.points - stats.points} points to next reward</p>
              <Progress value={(stats.points / nextReward.points) * 100} className="h-2 mt-2 bg-primary-foreground/20" />
            </div>
          )}
        </motion.div>

        {/* Points Rules */}
        <div className="bg-card rounded-2xl p-5 shadow-soft border border-border">
          <h2 className="font-fredoka text-lg font-semibold text-foreground mb-3">💰 How to Earn Points</h2>
          <div className="space-y-2">
            {pointsRules.map((rule) => (
              <div key={rule.action} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{rule.action}</span>
                <Badge variant="secondary" className="font-mono">{rule.points}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-card rounded-2xl p-5 shadow-soft border border-border">
          <h2 className="font-fredoka text-lg font-semibold text-foreground mb-3">🎁 Rewards</h2>
          <div className="space-y-3">
            {rewardLevels.map((reward) => {
              const unlocked = stats.points >= reward.points;
              return (
                <motion.div key={reward.points} className={`flex items-center gap-3 p-3 rounded-xl border ${unlocked ? 'bg-success/10 border-success/30' : 'bg-muted/30 border-border'}`}>
                  <span className="text-2xl">{reward.icon}</span>
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>{reward.label}</p>
                    <p className="text-xs text-muted-foreground">{reward.points} points</p>
                  </div>
                  {unlocked && <span className="text-success text-lg">✅</span>}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Badges by Category */}
        {categories.map((cat) => (
          <div key={cat} className="bg-card rounded-2xl p-5 shadow-soft border border-border">
            <h2 className="font-fredoka text-lg font-semibold text-foreground mb-3">{cat}</h2>
            <div className="grid grid-cols-2 gap-3">
              {achievements.filter(a => a.category === cat).map((achievement) => {
                const earned = earnedIds.includes(achievement.id);
                return (
                  <motion.div key={achievement.id} whileHover={{ scale: 1.02 }} className={`p-3 rounded-xl border text-center ${earned ? 'bg-accent/10 border-accent/30' : 'bg-muted/20 border-border opacity-60'}`}>
                    <span className="text-3xl">{achievement.icon}</span>
                    <p className={`font-medium text-sm mt-1 ${earned ? 'text-foreground' : 'text-muted-foreground'}`}>{achievement.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{achievement.description}</p>
                    {earned && <Badge className="mt-2 text-[10px]">Earned!</Badge>}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex gap-3 pb-6">
          <Button onClick={() => navigate('/progress')} variant="outline" className="flex-1 gap-2">📊 My Progress</Button>
          <Button onClick={() => navigate('/practice')} className="flex-1 gap-2">📇 Practice Skills</Button>
        </div>
      </main>

      {/* Achievement Unlock Popup */}
      <AnimatePresence>
        {showUnlock && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowUnlock(null)}>
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} className="bg-card rounded-2xl p-8 text-center max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
              <span className="text-6xl">{showUnlock.icon}</span>
              <h3 className="font-fredoka text-xl font-bold text-foreground mt-3">Achievement Unlocked!</h3>
              <p className="text-foreground font-medium mt-2">{showUnlock.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{showUnlock.description}</p>
              <Button className="mt-4" onClick={() => setShowUnlock(null)}>Continue</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
