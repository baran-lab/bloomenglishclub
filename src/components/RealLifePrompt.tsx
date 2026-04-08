import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playSuccessSound } from "@/utils/soundEffects";

interface RealLifePromptProps {
  suggestion: string;
  emoji: string;
  onDismiss?: () => void;
}

export function RealLifePrompt({ suggestion, emoji, onDismiss }: RealLifePromptProps) {
  const [response, setResponse] = useState<'done' | 'later' | null>(null);

  const handleDidIt = () => {
    setResponse('done');
    playSuccessSound();
    const count = parseInt(localStorage.getItem('englishville_real_life_done') || '0');
    localStorage.setItem('englishville_real_life_done', String(count + 1));
    setTimeout(() => onDismiss?.(), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-5 shadow-soft border border-border"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-accent" />
        <h3 className="font-fredoka text-base font-semibold text-foreground">🌍 Try this in real life!</h3>
      </div>

      <p className="text-sm text-foreground mb-4">
        {emoji} {suggestion}
      </p>

      <AnimatePresence mode="wait">
        {response === null ? (
          <motion.div key="buttons" className="flex gap-2">
            <Button size="sm" onClick={handleDidIt} className="gap-1.5">
              <Check className="w-4 h-4" /> I did it!
            </Button>
            <Button size="sm" variant="outline" onClick={() => { setResponse('later'); setTimeout(() => onDismiss?.(), 1500); }} className="gap-1.5">
              <Clock className="w-4 h-4" /> I'll try later
            </Button>
          </motion.div>
        ) : response === 'done' ? (
          <motion.p key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-success">
            🎉 Amazing! You're using English in real life!
          </motion.p>
        ) : (
          <motion.p key="later" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground">
            No problem! Try when you're ready. 💪
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
