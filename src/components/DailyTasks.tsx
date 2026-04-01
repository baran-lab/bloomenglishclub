import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, Mic, Play, RotateCcw, Gamepad2, BookOpen, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { playSuccessSound } from "@/utils/soundEffects";

interface DailyTask {
  id: string;
  title: string;
  category: string;
  icon: string;
}

const dailyTasks: DailyTask[] = [
  // Speaking
  { id: "dt-1", title: "Say your name and country", category: "Speaking", icon: "🗣️" },
  { id: "dt-2", title: "Introduce yourself", category: "Speaking", icon: "🗣️" },
  { id: "dt-3", title: "Say your address", category: "Speaking", icon: "🗣️" },
  { id: "dt-4", title: "Say your phone number", category: "Speaking", icon: "🗣️" },
  { id: "dt-5", title: 'Ask: "What is your name?"', category: "Speaking", icon: "🗣️" },
  { id: "dt-6", title: 'Ask: "Where are you from?"', category: "Speaking", icon: "🗣️" },
  { id: "dt-7", title: "Say 3 sentences about your day", category: "Speaking", icon: "🗣️" },
  { id: "dt-8", title: "Describe your family", category: "Speaking", icon: "🗣️" },
  { id: "dt-9", title: "Ask a simple question", category: "Speaking", icon: "🗣️" },
  { id: "dt-10", title: "Repeat a dialogue", category: "Speaking", icon: "🗣️" },
  // Listening
  { id: "dt-11", title: "Listen and repeat 5 words", category: "Listening", icon: "👂" },
  { id: "dt-12", title: "Listen to one dialogue", category: "Listening", icon: "👂" },
  { id: "dt-13", title: "Repeat after audio", category: "Listening", icon: "👂" },
  { id: "dt-14", title: "Listen and choose the answer", category: "Listening", icon: "👂" },
  { id: "dt-15", title: "Practice pronunciation", category: "Listening", icon: "👂" },
  // Vocabulary
  { id: "dt-16", title: "Learn 5 new words", category: "Vocabulary", icon: "🧠" },
  { id: "dt-17", title: "Use 3 words in sentences", category: "Vocabulary", icon: "🧠" },
  { id: "dt-18", title: "Match words and pictures", category: "Vocabulary", icon: "🧠" },
  { id: "dt-19", title: "Review yesterday's words", category: "Vocabulary", icon: "🧠" },
  { id: "dt-20", title: "Say words out loud", category: "Vocabulary", icon: "🧠" },
  // Real Life
  { id: "dt-21", title: "Read a simple sign", category: "Real Life", icon: "📝" },
  { id: "dt-22", title: "Write your name and address", category: "Real Life", icon: "📝" },
  { id: "dt-23", title: "Fill a simple form", category: "Real Life", icon: "📝" },
  { id: "dt-24", title: "Practice numbers", category: "Real Life", icon: "📝" },
  { id: "dt-25", title: "Count 1–20 out loud", category: "Real Life", icon: "📝" },
  // Confidence
  { id: "dt-26", title: "Speak for 1 minute", category: "Confidence", icon: "🎯" },
  { id: "dt-27", title: "Record your voice", category: "Confidence", icon: "🎯" },
  { id: "dt-28", title: "Repeat 3 times", category: "Confidence", icon: "🎯" },
  { id: "dt-29", title: "Try again without reading", category: "Confidence", icon: "🎯" },
  { id: "dt-30", title: "Practice with a friend", category: "Confidence", icon: "🎯" },
];

function getTodaysTask(): DailyTask {
  const start = new Date(2025, 0, 1);
  const now = new Date();
  const daysSinceStart = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return dailyTasks[daysSinceStart % dailyTasks.length];
}

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function DailyTasks() {
  const navigate = useNavigate();
  const task = getTodaysTask();
  const todayKey = getTodayKey();

  const [phase, setPhase] = useState<'ready' | 'recording' | 'done'>(() => {
    const saved = localStorage.getItem('daily_task_completed');
    return saved === todayKey ? 'done' : 'ready';
  });

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Streak
  const [streak, setStreak] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('daily_task_streak') || '0');
    } catch { return 0; }
  });

  const streakMessage = streak >= 30 ? "Incredible! 🏆" : streak >= 14 ? "Amazing progress! 🌟" : streak >= 7 ? "You are consistent! 💪" : streak >= 3 ? "Great start! 🔥" : "";

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setPhase('recording');
    } catch {
      // Mic not available
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleComplete = () => {
    localStorage.setItem('daily_task_completed', todayKey);
    // Update streak
    const lastDay = localStorage.getItem('daily_task_last_day');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;
    const newStreak = lastDay === yesterdayKey ? streak + 1 : lastDay === todayKey ? streak : 1;
    setStreak(newStreak);
    localStorage.setItem('daily_task_streak', JSON.stringify(newStreak));
    localStorage.setItem('daily_task_last_day', todayKey);
    setPhase('done');
    playSuccessSound();
  };

  const handleRetry = () => {
    setAudioUrl(null);
    setPhase('ready');
  };

  const playAudio = () => {
    if (audioUrl) new Audio(audioUrl).play();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card rounded-2xl p-5 shadow-soft border border-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-fredoka text-lg font-semibold">🎯 Today's Task</h3>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1 px-3 py-1 bg-accent/10 rounded-full">
            <span className="text-sm">🔥</span>
            <span className="font-semibold text-xs text-accent-foreground">{streak}-day streak</span>
          </div>
        )}
      </div>

      {/* Streak milestone message */}
      {streakMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-medium text-primary mb-3"
        >
          {streakMessage}
        </motion.p>
      )}

      {/* Task card */}
      <div className={cn(
        "rounded-xl p-4 mb-4",
        phase === 'done' ? "bg-success/10 border border-success/20" : "bg-muted"
      )}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{task.icon}</span>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">{task.category}</p>
            <p className={cn(
              "font-fredoka text-base font-semibold",
              phase === 'done' ? "text-success line-through" : "text-foreground"
            )}>{task.title}</p>
          </div>
          {phase === 'done' && (
            <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
              <Check className="w-4 h-4 text-success-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <AnimatePresence mode="wait">
        {phase === 'ready' && (
          <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-2 flex-wrap">
            <Button size="sm" onClick={startRecording} className="gap-1.5">
              <Mic className="w-4 h-4" /> Start Task
            </Button>
          </motion.div>
        )}

        {phase === 'recording' && (
          <motion.div key="recording" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            <div className="flex gap-2 flex-wrap">
              {isRecording ? (
                <Button size="sm" variant="destructive" onClick={stopRecording} className="gap-1.5">
                  <Square className="w-3 h-3" /> Stop Recording
                </Button>
              ) : (
                <>
                  {audioUrl && (
                    <Button size="sm" variant="outline" onClick={playAudio} className="gap-1.5">
                      <Play className="w-4 h-4" /> Play
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={handleRetry} className="gap-1.5">
                    <RotateCcw className="w-4 h-4" /> Try Again
                  </Button>
                  <Button size="sm" onClick={handleComplete} className="gap-1.5">
                    <Check className="w-4 h-4" /> Mark as Completed
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}

        {phase === 'done' && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3">
            <div className="p-3 bg-success/10 rounded-xl text-center">
              <p className="font-fredoka text-success font-semibold">
                🎉 Great job! You practiced today.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="outline" onClick={() => navigate('/practice')} className="gap-1.5">
                <Gamepad2 className="w-4 h-4" /> Play Games
              </Button>
              <Button size="sm" variant="outline" onClick={() => navigate('/practice')} className="gap-1.5">
                <BookOpen className="w-4 h-4" /> Practice Vocabulary
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
