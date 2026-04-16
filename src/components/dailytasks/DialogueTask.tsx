import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speakText } from "@/utils/speechUtils";
import type { DialogueContent } from "@/data/dailyTaskContent";
import { VoiceRecordButton } from "./VoiceRecordButton";

interface Props {
  task: DialogueContent;
  onComplete: () => void;
}

export function DialogueTask({ task, onComplete }: Props) {
  const [listened, setListened] = useState(false);
  const [recorded, setRecorded] = useState(false);

  const handleListen = () => {
    const fullText = task.lines.map(l => l.text).join('. ');
    speakText(fullText, 0.65);
    setListened(true);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-medium">{task.instruction}</p>

      <div className="bg-muted rounded-xl p-4 space-y-3">
        {task.lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex gap-2"
          >
            <span className="font-bold text-primary text-sm min-w-[24px]">{line.speaker}:</span>
            <span className="text-sm text-foreground">{line.text}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button variant="outline" size="sm" onClick={handleListen} className="gap-2">
          <Volume2 className="w-4 h-4" /> {listened ? "Listen Again" : "Listen"}
        </Button>

        {listened && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">Now try to repeat the dialogue:</p>
            <VoiceRecordButton onRecorded={() => setRecorded(true)} />
          </motion.div>
        )}

        {recorded && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <p className="text-success font-semibold text-sm">👏 Great job!</p>
          </motion.div>
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
