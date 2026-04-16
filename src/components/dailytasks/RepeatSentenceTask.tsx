import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speakText } from "@/utils/speechUtils";
import type { RepeatSentenceContent } from "@/data/dailyTaskContent";
import { VoiceRecordButton } from "./VoiceRecordButton";

interface Props {
  task: RepeatSentenceContent;
  onComplete: () => void;
}

export function RepeatSentenceTask({ task, onComplete }: Props) {
  const [listened, setListened] = useState(false);
  const [recorded, setRecorded] = useState(false);

  const handleListen = () => {
    speakText(task.sentence, 0.65);
    setListened(true);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-medium">{task.instruction}</p>

      <div className="bg-muted rounded-xl p-6 text-center space-y-4">
        <p className="font-fredoka text-xl font-bold text-foreground">"{task.sentence}"</p>

        <Button variant="outline" size="sm" onClick={handleListen} className="gap-2">
          <Volume2 className="w-4 h-4" /> {listened ? "Listen Again" : "Listen"}
        </Button>

        {listened && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <p className="text-xs text-muted-foreground">Now say it yourself:</p>
            <VoiceRecordButton onRecorded={() => setRecorded(true)} />
          </motion.div>
        )}

        {recorded && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-success font-semibold text-sm">
            🌟 Excellent!
          </motion.p>
        )}
      </div>

      <div className="flex justify-end">
        <Button size="sm" onClick={onComplete} className="gap-1.5" disabled={!listened}>
          Next <Check className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
