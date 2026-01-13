import React from 'react';
import { motion } from 'framer-motion';
import { Check, Circle, Trophy } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface ProgressChecklistProps {
  title?: string;
  items: ChecklistItem[];
  userName?: string;
  showConfetti?: boolean;
}

const defaultItems: ChecklistItem[] = [
  { id: 'intro', text: 'You can introduce yourself', isCompleted: false },
  { id: 'name', text: 'You can say your name', isCompleted: false },
  { id: 'origin', text: 'You can tell where you are from', isCompleted: false },
  { id: 'age', text: 'You can say your age', isCompleted: false },
  { id: 'job', text: 'You can tell people your job', isCompleted: false },
  { id: 'workplace', text: 'You can say where you work', isCompleted: false },
  { id: 'greetings', text: 'You can greet people', isCompleted: false },
  { id: 'numbers', text: 'You can count to 60', isCompleted: false },
];

export const ProgressChecklist: React.FC<ProgressChecklistProps> = ({
  title = 'What You Can Do Now',
  items = defaultItems,
  userName = '',
  showConfetti = false,
}) => {
  const completedCount = items.filter(i => i.isCompleted).length;
  const allCompleted = completedCount === items.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-3xl p-6 shadow-card border border-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            allCompleted ? 'bg-gradient-success' : 'bg-primary/10'
          }`}>
            <Trophy className={`w-5 h-5 ${allCompleted ? 'text-success-foreground' : 'text-primary'}`} />
          </div>
          <div>
            <h3 className="font-fredoka font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {completedCount}/{items.length} skills unlocked
            </p>
          </div>
        </div>

        {/* Progress ring */}
        <div className="relative w-12 h-12">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="4"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="hsl(var(--success))"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ strokeDasharray: 125.6, strokeDashoffset: 125.6 }}
              animate={{ strokeDashoffset: 125.6 * (1 - completedCount / items.length) }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
            {Math.round((completedCount / items.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
              item.isCompleted ? 'bg-success/10' : 'bg-secondary/50'
            }`}
          >
            <motion.div
              initial={false}
              animate={item.isCompleted ? { scale: [1, 1.2, 1] } : {}}
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                item.isCompleted 
                  ? 'bg-success text-success-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {item.isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
            </motion.div>
            <span className={`text-sm ${
              item.isCompleted ? 'text-foreground font-medium' : 'text-muted-foreground'
            }`}>
              {item.text.replace('{name}', userName)}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Completion message */}
      {allCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gradient-success rounded-2xl text-center"
        >
          <p className="font-fredoka font-semibold text-success-foreground">
            🎉 Amazing, {userName || 'friend'}! You've mastered this module!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProgressChecklist;
