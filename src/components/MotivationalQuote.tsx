import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface MotivationalQuoteProps {
  quote: string;
}

const quotes = [
  "Every word you learn opens a new door! 🚪",
  "You're doing amazing - keep going! 🌟",
  "Small steps lead to big achievements! 👣",
  "Today's practice is tomorrow's fluency! 💪",
  "Your English journey is an adventure! 🗺️",
];

export function MotivationalQuote({ quote }: MotivationalQuoteProps) {
  const displayQuote = quote || quotes[Math.floor(Math.random() * quotes.length)];

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
          <p className="text-sm font-medium text-muted-foreground mb-1">Daily Motivation</p>
          <p className="font-fredoka text-lg text-foreground">{displayQuote}</p>
        </div>
      </div>
    </motion.div>
  );
}
