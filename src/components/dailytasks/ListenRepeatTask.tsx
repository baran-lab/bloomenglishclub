import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, RotateCcw, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speakText } from "@/utils/speechUtils";
import type { ListenRepeatContent } from "@/data/dailyTaskContent";
import { VoiceRecordButton } from "./VoiceRecordButton";

interface Props {
  task: ListenRepeatContent;
  onComplete: () => void;
}

export function ListenRepeatTask({ task, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const word = task.words[currentIndex];

  const handleListen = () => {
    speakText(word, 0.7);
  };

  const handleRecorded = () => {
    setCompleted(prev => new Set(prev).add(currentIndex));
  };

  const handleNext = () => {
    if (currentIndex < task.words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const allDone = completed.size === task.words.length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-medium">{task.instruction}</p>

      {/* Progress dots */}
      <div className="flex gap-2 justify-center">
        {task.words.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              completed.has(i) ? "bg-success" : i === currentIndex ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-muted rounded-xl p-6 text-center space-y-4"
        >
          <p className="font-fredoka text-2xl font-bold text-foreground">{word}</p>

          <Button variant="outline" size="sm" onClick={handleListen} className="gap-2">
            <Volume2 className="w-4 h-4" /> Listen
          </Button>

          <div className="pt-2">
            <VoiceRecordButton onRecorded={handleRecorded} />
          </div>

          {completed.has(currentIndex) && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
              <p className="text-success font-semibold text-sm">✅ Great job!</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
        >
          Back
        </Button>

        {allDone ? (
          <Button size="sm" onClick={onComplete} className="gap-1.5">
            Done <Check className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            size="sm"
            disabled={currentIndex === task.words.length - 1 && !completed.has(currentIndex)}
            onClick={handleNext}
            className="gap-1.5"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
