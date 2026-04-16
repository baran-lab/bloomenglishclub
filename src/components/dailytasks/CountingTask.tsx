import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speakText } from "@/utils/speechUtils";
import { VoiceRecordButton } from "./VoiceRecordButton";
import type { CountingContent } from "@/data/dailyTaskContent";

interface Props {
  task: CountingContent;
  onComplete: () => void;
}

export function CountingTask({ task, onComplete }: Props) {
  const [listened, setListened] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const numbers = Array.from({ length: task.to - task.from + 1 }, (_, i) => task.from + i);

  const handleListen = () => {
    const text = numbers.join(', ');
    speakText(text, 0.6);
    setListened(true);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-medium">{task.instruction}</p>

      <div className="bg-muted rounded-xl p-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {numbers.map(n => (
            <span key={n} className="bg-card px-3 py-1.5 rounded-lg text-sm font-bold border border-border">
              {n}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button variant="outline" size="sm" onClick={handleListen} className="gap-2">
          🔊 {listened ? "Listen Again" : "Listen"}
        </Button>

        <p className="text-xs text-muted-foreground">Now count out loud and record:</p>
        <VoiceRecordButton onRecorded={() => setRecorded(true)} />

        {recorded && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-success font-semibold text-sm">
            🎉 Awesome counting!
          </motion.p>
        )}
      </div>

      <div className="flex justify-end">
        <Button size="sm" onClick={onComplete} disabled={!recorded} className="gap-1.5">
          Done <Check className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
