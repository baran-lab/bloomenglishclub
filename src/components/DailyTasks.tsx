import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Gamepad2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { playSuccessSound } from "@/utils/soundEffects";
import { getTodayTaskSet, getTodayKey } from "@/data/dailyTaskContent";
import type { DailyTaskContent } from "@/data/dailyTaskContent";

import { ListenRepeatTask } from "./dailytasks/ListenRepeatTask";
import { DialogueTask } from "./dailytasks/DialogueTask";
import { RepeatSentenceTask } from "./dailytasks/RepeatSentenceTask";
import { ListenChooseTask } from "./dailytasks/ListenChooseTask";
import { VocabularyTask } from "./dailytasks/VocabularyTask";
import { UseSentencesTask } from "./dailytasks/UseSentencesTask";
import { PronunciationTask } from "./dailytasks/PronunciationTask";
import { ReadSignTask } from "./dailytasks/ReadSignTask";
import { FillFormTask } from "./dailytasks/FillFormTask";
import { CountingTask } from "./dailytasks/CountingTask";
import { MatchWordsTask } from "./dailytasks/MatchWordsTask";
import { ReviewWordsTask } from "./dailytasks/ReviewWordsTask";
import { SayWordsTask } from "./dailytasks/SayWordsTask";

const TASK_ICONS: Record<DailyTaskContent['type'], string> = {
  'listen-repeat': '🎧',
  'dialogue': '🎧',
  'repeat-sentence': '🎤',
  'listen-choose': '🎯',
  'vocabulary': '📚',
  'use-sentences': '📚',
  'pronunciation': '🎤',
  'read-sign': '📝',
  'fill-form': '📝',
  'counting': '🔢',
  'match-words': '🧩',
  'review-words': '🔁',
  'say-words': '🎤',
};

const TASK_LABELS: Record<DailyTaskContent['type'], string> = {
  'listen-repeat': 'Listen & Repeat',
  'dialogue': 'Listen to Dialogue',
  'repeat-sentence': 'Repeat Sentence',
  'listen-choose': 'Listen & Choose',
  'vocabulary': 'Learn New Words',
  'use-sentences': 'Use Words in Sentences',
  'pronunciation': 'Practice Pronunciation',
  'read-sign': 'Read a Sign',
  'fill-form': 'Fill a Form',
  'counting': 'Count Out Loud',
  'match-words': 'Match Words & Pictures',
  'review-words': 'Review Words',
  'say-words': 'Say Words Out Loud',
};

const celebrationMessages = [
  "🎉 You completed this task!",
  "👏 Great job!",
  "💛 Keep going!",
  "🌟 You're doing amazing!",
  "✨ Wonderful work!",
];

export function DailyTasks() {
  const navigate = useNavigate();
  const taskSet = getTodayTaskSet();
  const todayKey = getTodayKey();
  const totalTasks = taskSet.tasks.length;

  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(() => {
    const saved = localStorage.getItem('daily_task_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.day === todayKey) return Math.min(parsed.index, totalTasks);
      } catch {}
    }
    return 0;
  });

  const [showCelebration, setShowCelebration] = useState(false);

  // Streak
  const [streak, setStreak] = useState(() => {
    try { return JSON.parse(localStorage.getItem('daily_task_streak') || '0'); }
    catch { return 0; }
  });

  const allDone = currentTaskIndex >= totalTasks;
  const progress = (currentTaskIndex / totalTasks) * 100;

  const handleTaskComplete = () => {
    const nextIndex = currentTaskIndex + 1;
    setShowCelebration(true);
    playSuccessSound();

    setTimeout(() => {
      setShowCelebration(false);
      setCurrentTaskIndex(nextIndex);
      localStorage.setItem('daily_task_progress', JSON.stringify({ day: todayKey, index: nextIndex }));

      // If all done, update streak
      if (nextIndex >= totalTasks) {
        const lastDay = localStorage.getItem('daily_task_last_day');
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;
        const newStreak = lastDay === yesterdayKey ? streak + 1 : lastDay === todayKey ? streak : 1;
        setStreak(newStreak);
        localStorage.setItem('daily_task_streak', JSON.stringify(newStreak));
        localStorage.setItem('daily_task_last_day', todayKey);
      }
    }, 1800);
  };

  const renderTask = (task: DailyTaskContent) => {
    const props = { onComplete: handleTaskComplete };
    switch (task.type) {
      case 'listen-repeat': return <ListenRepeatTask task={task} {...props} />;
      case 'dialogue': return <DialogueTask task={task} {...props} />;
      case 'repeat-sentence': return <RepeatSentenceTask task={task} {...props} />;
      case 'listen-choose': return <ListenChooseTask task={task} {...props} />;
      case 'vocabulary': return <VocabularyTask task={task} {...props} />;
      case 'use-sentences': return <UseSentencesTask task={task} {...props} />;
      case 'pronunciation': return <PronunciationTask task={task} {...props} />;
      case 'read-sign': return <ReadSignTask task={task} {...props} />;
      case 'fill-form': return <FillFormTask task={task} {...props} />;
      case 'counting': return <CountingTask task={task} {...props} />;
      case 'match-words': return <MatchWordsTask task={task} {...props} />;
      case 'review-words': return <ReviewWordsTask task={task} {...props} />;
      case 'say-words': return <SayWordsTask task={task} {...props} />;
    }
  };

  const streakMessage = streak >= 30 ? "Incredible! 🏆" : streak >= 14 ? "Amazing progress! 🌟" : streak >= 7 ? "You are consistent! 💪" : streak >= 3 ? "Great start! 🔥" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card rounded-2xl p-5 shadow-soft border border-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-fredoka text-lg font-semibold">🎯 Today's Practice</h3>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1 px-3 py-1 bg-accent/10 rounded-full">
            <span className="text-sm">🔥</span>
            <span className="font-semibold text-xs text-accent-foreground">{streak}-day streak</span>
          </div>
        )}
      </div>

      {streakMessage && (
        <p className="text-xs font-medium text-primary mb-3">{streakMessage}</p>
      )}

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Task {Math.min(currentTaskIndex + 1, totalTasks)} of {totalTasks}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="p-6 bg-success/10 rounded-xl text-center mb-4"
          >
            <p className="font-fredoka text-lg text-success font-bold">
              {celebrationMessages[currentTaskIndex % celebrationMessages.length]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task content */}
      {!showCelebration && (
        <AnimatePresence mode="wait">
          {allDone ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="p-5 bg-success/10 rounded-xl text-center space-y-2">
                <p className="text-3xl">🎉</p>
                <p className="font-fredoka text-lg text-success font-bold">You finished today's practice!</p>
                <p className="text-sm text-muted-foreground">🔥 Come back tomorrow!</p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                <Button size="sm" variant="outline" onClick={() => navigate('/practice')} className="gap-1.5">
                  <Gamepad2 className="w-4 h-4" /> Play Games
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate('/practice')} className="gap-1.5">
                  <BookOpen className="w-4 h-4" /> Practice More
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`task-${currentTaskIndex}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              {/* Task type badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{TASK_ICONS[taskSet.tasks[currentTaskIndex].type]}</span>
                <span className="text-xs font-semibold bg-muted px-2 py-1 rounded-full text-muted-foreground">
                  {TASK_LABELS[taskSet.tasks[currentTaskIndex].type]}
                </span>
              </div>

              {renderTask(taskSet.tasks[currentTaskIndex])}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
