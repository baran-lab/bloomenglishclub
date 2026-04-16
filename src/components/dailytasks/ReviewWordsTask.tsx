import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speakText } from "@/utils/speechUtils";
import { VoiceRecordButton } from "./VoiceRecordButton";
import type { ReviewWordsContent } from "@/data/dailyTaskContent";

interface Props {
  task: ReviewWordsContent;
  onComplete: () => void;
}

export function ReviewWordsTask({ task, onComplete }: Props) {
  const [reviewed, setReviewed] = useState<Set<number>>(new Set());

  const handleListen = (word: string, i: number) => {
    speakText(word, 0.7);
    setReviewed(prev => new Set(prev).add(i));
  };

  const allReviewed = reviewed.size === task.words.length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-medium">{task.instruction}</p>

      <div className="space-y-2">
        {task.words.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`flex items-center gap-3 p-3 rounded-lg border ${reviewed.has(i) ? "bg-success/10 border-success/20" : "bg-card border-border"}`}
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="flex-1 font-fredoka font-semibold text-foreground">{item.word}</span>
            <Button variant="ghost" size="sm" onClick={() => handleListen(item.word, i)}>
              <Volume2 className="w-4 h-4" />
            </Button>
            {reviewed.has(i) && <Check className="w-4 h-4 text-success" />}
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button size="sm" onClick={onComplete} disabled={!allReviewed} className="gap-1.5">
          Done <Check className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
