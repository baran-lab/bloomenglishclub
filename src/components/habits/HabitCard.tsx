import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Check, Trash2, ChevronDown, ChevronUp, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Habit, HabitEntry } from "@/hooks/useHabits";
import { HabitHeatMap } from "./HabitHeatMap";
import confetti from "canvas-confetti";

interface HabitCardProps {
  habit: Habit;
  entries: HabitEntry[];
  onToggle: (habitId: string, date: string) => void;
  onUpdate: (habitId: string, date: string, value: { dropdown_value?: string; range_value?: number; is_completed?: boolean }) => void;
  onDelete: (habitId: string) => void;
}

export function HabitCard({ habit, entries, onToggle, onUpdate, onDelete }: HabitCardProps) {
  const [expanded, setExpanded] = useState(false);
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayEntry = entries.find(e => e.habit_id === habit.id && e.entry_date === today);
  const isCompletedToday = todayEntry?.is_completed || false;

  // Calculate streak
  const calculateStreak = () => {
    let streak = 0;
    const sortedEntries = entries
      .filter(e => e.habit_id === habit.id && e.is_completed)
      .sort((a, b) => new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime());
    
    if (sortedEntries.length === 0) return 0;

    let currentDate = new Date();
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.entry_date);
      const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= 1) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    }
    return streak;
  };

  const streak = calculateStreak();

  const handleCheckboxToggle = () => {
    if (!isCompletedToday) {
      // Trigger confetti on completion
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: [habit.color, '#fbbf24', '#34d399']
      });
    }
    onToggle(habit.id, today);
  };

  const handleRangeChange = (value: number[]) => {
    onUpdate(habit.id, today, { 
      range_value: value[0],
      is_completed: value[0] >= (habit.range_max || 10) * 0.8 
    });
  };

  const handleDropdownChange = (value: string) => {
    onUpdate(habit.id, today, { 
      dropdown_value: value,
      is_completed: true 
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-card rounded-2xl p-4 shadow-soft border border-border overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Completion indicator / Toggle */}
          {habit.habit_type === 'checkbox' ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCheckboxToggle}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0",
                isCompletedToday
                  ? "bg-success text-success-foreground shadow-lg"
                  : "border-2 border-muted-foreground/30 hover:border-success hover:bg-success/10"
              )}
              style={isCompletedToday ? { backgroundColor: habit.color } : undefined}
            >
              <AnimatePresence mode="wait">
                {isCompletedToday && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ) : (
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${habit.color}20` }}
            >
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: habit.color }}
              />
            </div>
          )}

          {/* Habit info */}
          <div className="flex-1 min-w-0">
            <h4 className={cn(
              "font-fredoka font-semibold text-base truncate transition-all",
              isCompletedToday && "text-muted-foreground line-through"
            )}>
              {habit.name}
            </h4>
            {habit.description && (
              <p className="text-sm text-muted-foreground truncate">
                {habit.description}
              </p>
            )}
          </div>

          {/* Streak badge */}
          {streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-full flex-shrink-0"
            >
              <Flame className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent-foreground">{streak}</span>
            </motion.div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => onDelete(habit.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Interactive input for dropdown/range */}
      {habit.habit_type !== 'checkbox' && (
        <div className="mt-4 pl-13">
          {habit.habit_type === 'dropdown' && habit.dropdown_options && (
            <Select
              value={todayEntry?.dropdown_value || ''}
              onValueChange={handleDropdownChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent>
                {habit.dropdown_options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {habit.habit_type === 'range' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {habit.range_min || 0} {habit.range_unit}
                </span>
                <span className="font-semibold" style={{ color: habit.color }}>
                  {todayEntry?.range_value || 0} {habit.range_unit}
                </span>
                <span className="text-muted-foreground">
                  {habit.range_max || 10} {habit.range_unit}
                </span>
              </div>
              <Slider
                value={[todayEntry?.range_value || 0]}
                onValueChange={handleRangeChange}
                min={habit.range_min || 0}
                max={habit.range_max || 10}
                step={1}
                className="w-full"
              />
            </div>
          )}
        </div>
      )}

      {/* Expanded heat map */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Your progress over time</p>
              <HabitHeatMap
                entries={entries}
                habitId={habit.id}
                habitColor={habit.color}
                weeks={12}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
