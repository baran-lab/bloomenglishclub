import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FillFormContent } from "@/data/dailyTaskContent";

interface Props {
  task: FillFormContent;
  onComplete: () => void;
}

export function FillFormTask({ task, onComplete }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const allFilled = task.fields.every(f => (values[f.label] || '').trim().length > 0);

  const handleChange = (label: string, value: string) => {
    setValues(prev => ({ ...prev, [label]: value }));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-medium">{task.instruction}</p>

      <div className="space-y-3">
        {task.fields.map((field, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <label className="text-sm font-medium text-foreground block mb-1">{field.label}</label>
            <Input
              placeholder={field.placeholder}
              value={values[field.label] || ''}
              onChange={(e) => handleChange(field.label, e.target.value)}
            />
          </motion.div>
        ))}
      </div>

      {allFilled && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-success font-semibold text-sm text-center">
          ✅ Great! You filled out the form!
        </motion.p>
      )}

      <div className="flex justify-end">
        <Button size="sm" onClick={onComplete} disabled={!allFilled} className="gap-1.5">
          Done <Check className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
