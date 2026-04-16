import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { speakText } from "@/utils/speechUtils";
import { playSuccessSound } from "@/utils/soundEffects";
import type { ListenChooseContent } from "@/data/dailyTaskContent";

interface Props {
  task: ListenChooseContent;
  onComplete: () => void;
}

export function ListenChooseTask({ task, onComplete }: Props) {
  const [listened, setListened] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleListen = () => {
    const fullText = task.dialogue.map(l => l.text).join('. ');
    speakText(fullText, 0.65);
    setListened(true);
  };

  const handleSelect = (i: number) => {
    if (showResult) return;
    setSelected(i);
    setShowResult(true);
    if (i === task.correctIndex) {
      playSuccessSound();
    }
  };

  const isCorrect = selected === task.correctIndex;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-medium">{task.instruction}</p>

      <div className="bg-muted rounded-xl p-4 space-y-2">
        {task.dialogue.map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="font-bold text-primary text-sm min-w-[24px]">{line.speaker}:</span>
            <span className="text-sm text-foreground">{line.text}</span>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={handleListen} className="gap-2 mx-auto flex">
        <Volume2 className="w-4 h-4" /> {listened ? "Listen Again" : "Listen"}
      </Button>

      {listened && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <p className="font-semibold text-sm text-center">{task.question}</p>
          <div className="space-y-2">
            {task.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={cn(
                  "w-full text-left p-3 rounded-lg border text-sm transition-colors",
                  showResult && i === task.correctIndex
                    ? "bg-success/10 border-success text-success"
                    : showResult && i === selected && i !== task.correctIndex
                    ? "bg-destructive/10 border-destructive/30"
                    : selected === i
                    ? "bg-primary/10 border-primary"
                    : "bg-card border-border hover:bg-muted"
                )}
              >
                {opt}
              </button>
            ))}
          </div>

          {showResult && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("text-center font-semibold text-sm", isCorrect ? "text-success" : "text-primary")}>
              {isCorrect ? "🎉 Correct!" : `💛 Nice try! The answer is: ${task.options[task.correctIndex]}`}
            </motion.p>
          )}
        </motion.div>
      )}

      <div className="flex justify-end">
        <Button size="sm" onClick={onComplete} className="gap-1.5" disabled={!showResult}>
          Next <Check className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
