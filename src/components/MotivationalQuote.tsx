import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const motivationMessages = [
  "You can learn English step by step. 🌟",
  "Small practice is big progress. 💪",
  "It's okay to make mistakes. 🌈",
  "Speak, even if it's not perfect. 🗣️",
  "You are improving every day. 📈",
  "Practice a little every day. ✨",
  "Your voice matters. 🎤",
  "Don't be afraid to speak. 💬",
  "You are doing great. 🌟",
  "Keep going—you are strong. 💪",
  "Every word helps. 📚",
  "You can do this. 🎯",
  "Try again. You will get better. 🔁",
  "English is for your life. 🌍",
  "Learning takes time. That's okay. ⏳",
  "You are not alone. 🤝",
  "Be proud of your progress. 🏆",
  "One sentence is enough today. ✅",
  "Confidence comes with practice. 💎",
  "You are building your future. 🏗️",
  "Practice makes you stronger. 💪",
  "It's okay to ask questions. ❓",
  "Your effort is important. ⭐",
  "Speak slowly. It's okay. 🐢",
  "Today is a good day to practice. ☀️",
  "You are learning real English. 📖",
  "Every day is a new chance. 🌅",
  "You are getting better. 📊",
  "Don't stop now. 🚀",
  "You are closer than yesterday. 🎉",
];

function getTodaysMotivation(): string {
  const start = new Date(2025, 0, 1);
  const now = new Date();
  const daysSinceStart = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return motivationMessages[daysSinceStart % motivationMessages.length];
}

export function MotivationalQuote() {
  const displayQuote = getTodaysMotivation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent rounded-2xl p-5 border border-accent/20"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">🌟 Daily Motivation</p>
          <p className="font-fredoka text-lg text-foreground">{displayQuote}</p>
        </div>
      </div>
    </motion.div>
  );
}
