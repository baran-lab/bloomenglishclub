import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speakText } from "@/utils/speechUtils";
import { VoiceRecordButton } from "./VoiceRecordButton";
import type { SayWordsContent } from "@/data/dailyTaskContent";

interface Props {
  task: SayWordsContent;
  onComplete: () => void;
}

export function SayWordsTask({ task, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const word = task.words[currentIndex];

  const handleListen = () => speakText(word, 0.7);
  const handleRecorded = () => setCompleted(prev => new Set(prev).add(currentIndex));

  const allDone = completed.size === task.words.length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-medium">{task.instruction}</p>

      <div className="flex gap-2 justify-center">
        {task.words.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${completed.has(i) ? "bg-success" : i === currentIndex ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      <div className="bg-muted rounded-xl p-6 text-center space-y-4">
        <p className="font-fredoka text-2xl font-bold text-foreground">{word}</p>
        <Button variant="outline" size="sm" onClick={handleListen} className="gap-2">
          <Volume2 className="w-4 h-4" /> Listen
        </Button>
        <div><VoiceRecordButton onRecorded={handleRecorded} /></div>
        {completed.has(currentIndex) && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-success font-semibold text-sm">✅ Great!</motion.p>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" size="sm" disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex - 1)}>Back</Button>
        {allDone ? (
          <Button size="sm" onClick={onComplete} className="gap-1.5">Done <Check className="w-4 h-4" /></Button>
        ) : (
          <Button size="sm" onClick={() => setCurrentIndex(Math.min(currentIndex + 1, task.words.length - 1))} disabled={!completed.has(currentIndex)}>Next</Button>
        )}
      </div>
    </div>
  );
}
