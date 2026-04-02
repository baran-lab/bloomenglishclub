import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flame, Target, Gamepad2, BookOpen, Mic, Headphones, FileText, CheckCircle2, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUserStore } from "@/stores/userStore";

const skillData = [
  { key: "speaking", label: "Speaking", icon: Mic, color: "from-primary to-primary/70", emoji: "🗣" },
  { key: "listening", label: "Listening", icon: Headphones, color: "from-accent to-accent/70", emoji: "👂" },
  { key: "vocabulary", label: "Vocabulary", icon: BookOpen, color: "from-success to-success/70", emoji: "📇" },
  { key: "realLife", label: "Real-life English", icon: FileText, color: "from-destructive to-destructive/70", emoji: "📝" },
];

const abilities = [
  { id: "intro", text: "You can introduce yourself", module: 1 },
  { id: "name", text: "You can say your name", module: 1 },
  { id: "origin", text: "You can tell where you are from", module: 1 },
  { id: "spell", text: "You can spell your name", module: 2 },
  { id: "dates", text: "You can say dates", module: 2 },
  { id: "directions", text: "You can ask for directions", module: 3 },
  { id: "health", text: "You can describe health problems", module: 4 },
  { id: "food", text: "You can talk about food", module: 5 },
  { id: "routine", text: "You can describe your daily routine", module: 6 },
  { id: "current", text: "You can describe current activities", module: 7 },
  { id: "past", text: "You can talk about the past", module: 8 },
];

export default function MyProgress() {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const userName = localStorage.getItem('englishville_user_name') || 'Friend';

  const completedModules = userData.completedLessons?.length || 0;
  const totalModules = 8;
  const streak = userData.streak || 0;
  const totalPoints = userData.points || 0;
  const gamesPlayed = parseInt(localStorage.getItem('englishville_games_played') || '0');
  const tasksCompleted = parseInt(localStorage.getItem('englishville_tasks_completed') || '0');

  // Skill progress (simulated based on activity)
  const getSkillPercent = (key: string) => {
    const base = Math.min(completedModules * 12, 100);
    const offsets: Record<string, number> = { speaking: 5, listening: -5, vocabulary: 10, realLife: -10 };
    return Math.max(0, Math.min(100, base + (offsets[key] || 0)));
  };

  // Unlocked abilities based on progress
  const unlockedAbilities = abilities.filter(a => {
    const moduleProgress = userData.completedLessons?.some((l: string) => l.startsWith(`${a.module}-`));
    return moduleProgress || completedModules >= a.module;
  });

  const lastActivity = localStorage.getItem('englishville_last_activity') || 'Today';

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-fredoka text-xl font-bold text-foreground">My Progress</h1>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Encouragement Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-primary rounded-2xl p-5 text-primary-foreground text-center"
        >
          <p className="font-fredoka text-lg font-semibold">🌟 You are doing great, {userName}!</p>
          <p className="text-sm opacity-80 mt-1">Keep practicing every day</p>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Modules", value: `${completedModules} / ${totalModules}`, icon: "📘" },
            { label: "Tasks", value: `${tasksCompleted} / 30`, icon: "🎯" },
            { label: "Streak", value: `${streak} days`, icon: "🔥" },
            { label: "Games", value: `${gamesPlayed}`, icon: "🎮" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl p-4 shadow-soft border border-border text-center"
            >
              <span className="text-2xl">{stat.icon}</span>
              <p className="font-fredoka text-lg font-bold text-foreground mt-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Skill Progress */}
        <div className="bg-card rounded-2xl p-5 shadow-soft border border-border">
          <h2 className="font-fredoka text-lg font-semibold text-foreground mb-4">Skills</h2>
          <div className="space-y-4">
            {skillData.map((skill) => {
              const percent = getSkillPercent(skill.key);
              return (
                <div key={skill.key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span>{skill.emoji}</span>
                      <span className="text-sm font-medium text-foreground">{skill.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">{percent}%</span>
                  </div>
                  <Progress value={percent} className="h-2.5" />
                </div>
              );
            })}
          </div>
        </div>

        {/* What You Can Do Now */}
        <div className="bg-card rounded-2xl p-5 shadow-soft border border-border">
          <h2 className="font-fredoka text-lg font-semibold text-foreground mb-3">What You Can Do Now</h2>
          {unlockedAbilities.length > 0 ? (
            <div className="space-y-2">
              {unlockedAbilities.map((ability) => (
                <motion.div
                  key={ability.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                  <span className="text-foreground">{ability.text}</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Complete lessons to unlock abilities!</p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-2xl p-5 shadow-soft border border-border">
          <h2 className="font-fredoka text-lg font-semibold text-foreground mb-3">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Last activity: {lastActivity}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Flame className="w-4 h-4 text-accent" />
              <span className="text-foreground">Current streak: {streak} days</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Total points: {totalPoints}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button onClick={() => navigate('/practice')} className="flex-1 gap-2">
            <BookOpen className="w-4 h-4" /> Practice Skills
          </Button>
          <Button onClick={() => navigate('/achievements')} variant="outline" className="flex-1 gap-2">
            <Target className="w-4 h-4" /> Achievements
          </Button>
        </div>
      </main>
    </div>
  );
}
