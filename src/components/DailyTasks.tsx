import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task } from "@/data/mockData";

interface DailyTasksProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
}

export function DailyTasks({ tasks, onToggle }: DailyTasksProps) {
  // Show only one task per day based on the current date
  const today = new Date();
  const dayIndex = today.getDate() % tasks.length;
  const dailyTask = tasks[dayIndex];

  if (!dailyTask) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card rounded-2xl p-5 shadow-soft"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-fredoka text-lg font-semibold">Today's Task</h3>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => onToggle(dailyTask.id)}
        className={cn(
          "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all",
          dailyTask.isCompleted
            ? "bg-success/10"
            : "bg-muted hover:bg-muted/80"
        )}
      >
        <div
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center transition-all",
            dailyTask.isCompleted
              ? "bg-success text-success-foreground"
              : "border-2 border-muted-foreground/30"
          )}
        >
          {dailyTask.isCompleted && <Check className="w-4 h-4" />}
        </div>
        <span
          className={cn(
            "flex-1 font-medium text-sm",
            dailyTask.isCompleted
              ? "text-muted-foreground line-through"
              : "text-foreground"
          )}
        >
          {dailyTask.title}
        </span>
      </motion.div>

      {dailyTask.isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-3 bg-success/10 rounded-xl text-center"
        >
          <p className="font-fredoka text-success font-semibold">
            🎉 Amazing! Task complete!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
