import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHabits } from "@/hooks/useHabits";
import { HabitCard } from "./HabitCard";
import { CreateHabitModal } from "./CreateHabitModal";
import { Skeleton } from "@/components/ui/skeleton";

export function HabitTracker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { habits, entries, isLoading, createHabit, deleteHabit, toggleHabitEntry, updateHabitEntry } = useHabits();

  const completedToday = habits.filter(habit => {
    const today = new Date().toISOString().split('T')[0];
    const entry = entries.find(e => e.habit_id === habit.id && e.entry_date === today);
    return entry?.is_completed;
  }).length;

  const progress = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-5 shadow-soft"
      >
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="bg-card rounded-2xl p-5 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-fredoka text-lg font-semibold">Habit Tracker</h3>
              <p className="text-sm text-muted-foreground">
                {habits.length === 0 
                  ? "Create your first habit!" 
                  : `${completedToday}/${habits.length} completed today`
                }
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            size="sm"
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Habit</span>
          </Button>
        </div>

        {/* Progress bar */}
        {habits.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Today's Progress</span>
              <span className="font-semibold text-primary">{progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-primary rounded-full"
              />
            </div>
            {progress === 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 py-2 bg-success/10 rounded-xl"
              >
                <Sparkles className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">All habits complete! 🎉</span>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Habits list */}
      <AnimatePresence mode="popLayout">
        {habits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-2xl p-8 shadow-soft text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-fredoka text-lg font-semibold mb-2">No habits yet</h4>
            <p className="text-muted-foreground mb-4">
              Start building good habits! Track your daily practice and watch your progress grow.
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Habit
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                entries={entries}
                onToggle={toggleHabitEntry}
                onUpdate={updateHabitEntry}
                onDelete={deleteHabit}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Create Modal */}
      <CreateHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createHabit}
      />
    </motion.div>
  );
}
