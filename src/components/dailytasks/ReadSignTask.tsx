import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { playSuccessSound } from "@/utils/soundEffects";
import type { ReadSignContent } from "@/data/dailyTaskContent";

interface Props {
  task: ReadSignContent;
  onComplete: () => void;
}

export function ReadSignTask({ task, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (i: number) => {
    if (showResult) return;
    setSelected(i);
    setShowResult(true);
    if (i === task.correctIndex) playSuccessSound();
  };

  const isCorrect = selected === task.correctIndex;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-medium">{task.instruction}</p>

      <div className="bg-muted rounded-xl p-8 text-center">
        <p className="text-4xl font-bold">{task.sign}</p>
      </div>

      <p className="font-semibold text-sm text-center">{task.question}</p>

      <div className="space-y-2">
        {task.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={cn(
              "w-full text-left p-3 rounded-lg border text-sm transition-colors",
              showResult && i === task.correctIndex ? "bg-success/10 border-success text-success" :
              showResult && i === selected && !isCorrect ? "bg-destructive/10 border-destructive/30" :
              "bg-card border-border hover:bg-muted"
            )}
          >
            {opt}
          </button>
        ))}
      </div>

      {showResult && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("text-center font-semibold text-sm", isCorrect ? "text-success" : "text-primary")}>
          {isCorrect ? "🎉 Correct!" : `💛 The answer is: ${task.options[task.correctIndex]}`}
        </motion.p>
      )}

      <div className="flex justify-end">
        <Button size="sm" onClick={onComplete} disabled={!showResult} className="gap-1.5">
          Next <Check className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
