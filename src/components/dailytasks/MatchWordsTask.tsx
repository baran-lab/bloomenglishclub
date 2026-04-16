import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { speakText } from "@/utils/speechUtils";
import { playSuccessSound } from "@/utils/soundEffects";
import type { MatchWordsContent } from "@/data/dailyTaskContent";

interface Props {
  task: MatchWordsContent;
  onComplete: () => void;
}

export function MatchWordsTask({ task, onComplete }: Props) {
  const [shuffledEmojis, setShuffledEmojis] = useState<{ word: string; emoji: string; originalIndex: number }[]>([]);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());

  useEffect(() => {
    const shuffled = task.pairs.map((p, i) => ({ ...p, originalIndex: i })).sort(() => Math.random() - 0.5);
    setShuffledEmojis(shuffled);
  }, [task]);

  useEffect(() => {
    if (selectedWord !== null && selectedEmoji !== null) {
      const emojiItem = shuffledEmojis[selectedEmoji];
      if (emojiItem.originalIndex === selectedWord) {
        setMatched(prev => new Set(prev).add(selectedWord));
        playSuccessSound();
      }
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedEmoji(null);
      }, 500);
    }
  }, [selectedWord, selectedEmoji, shuffledEmojis]);

  const allMatched = matched.size === task.pairs.length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-medium">{task.instruction}</p>

      <div className="grid grid-cols-2 gap-3">
        {/* Words column */}
        <div className="space-y-2">
          {task.pairs.map((pair, i) => (
            <button
              key={`w-${i}`}
              disabled={matched.has(i)}
              onClick={() => { setSelectedWord(i); speakText(pair.word, 0.7); }}
              className={cn(
                "w-full p-3 rounded-lg border text-sm font-semibold transition-colors text-center",
                matched.has(i) ? "bg-success/10 border-success/20 text-success" :
                selectedWord === i ? "bg-primary/10 border-primary" :
                "bg-card border-border hover:bg-muted"
              )}
            >
              {pair.word}
            </button>
          ))}
        </div>

        {/* Emoji column */}
        <div className="space-y-2">
          {shuffledEmojis.map((item, i) => (
            <button
              key={`e-${i}`}
              disabled={matched.has(item.originalIndex)}
              onClick={() => setSelectedEmoji(i)}
              className={cn(
                "w-full p-3 rounded-lg border text-2xl transition-colors text-center",
                matched.has(item.originalIndex) ? "bg-success/10 border-success/20" :
                selectedEmoji === i ? "bg-primary/10 border-primary" :
                "bg-card border-border hover:bg-muted"
              )}
            >
              {item.emoji}
            </button>
          ))}
        </div>
      </div>

      {allMatched && (
        <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center text-success font-semibold">
          🎉 All matched! Great job!
        </motion.p>
      )}

      <div className="flex justify-end">
        <Button size="sm" onClick={onComplete} disabled={!allMatched} className="gap-1.5">
          Done <Check className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
