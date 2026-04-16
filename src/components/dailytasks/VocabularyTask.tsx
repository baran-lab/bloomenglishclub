import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speakText } from "@/utils/speechUtils";
import type { VocabularyContent } from "@/data/dailyTaskContent";

interface Props {
  task: VocabularyContent;
  onComplete: () => void;
}

export function VocabularyTask({ task, onComplete }: Props) {
  const [learnedWords, setLearnedWords] = useState<Set<number>>(new Set());

  const handleListen = (word: string, index: number) => {
    speakText(word, 0.7);
    setLearnedWords(prev => new Set(prev).add(index));
  };

  const allLearned = learnedWords.size === task.words.length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-medium">{task.instruction}</p>

      <div className="space-y-2">
        {task.words.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
              learnedWords.has(i) ? "bg-success/10 border-success/20" : "bg-card border-border"
            }`}
          >
            <span className="text-2xl">{item.emoji}</span>
            <div className="flex-1">
              <p className="font-fredoka font-semibold text-foreground">{item.word}</p>
              <p className="text-xs text-muted-foreground">{item.meaning}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleListen(item.word, i)}>
              <Volume2 className="w-4 h-4" />
            </Button>
            {learnedWords.has(i) && <Check className="w-4 h-4 text-success" />}
          </motion.div>
        ))}
      </div>

      {allLearned && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-success font-semibold text-sm">
          🎉 You learned all 5 words!
        </motion.p>
      )}

      <div className="flex justify-end">
        <Button size="sm" onClick={onComplete} className="gap-1.5" disabled={!allLearned}>
          Done <Check className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
