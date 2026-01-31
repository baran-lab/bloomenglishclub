import { motion } from "framer-motion";
import { format, subDays, startOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { HabitEntry } from "@/hooks/useHabits";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HabitHeatMapProps {
  entries: HabitEntry[];
  habitId: string;
  habitColor?: string;
  weeks?: number;
}

export function HabitHeatMap({ 
  entries, 
  habitId, 
  habitColor = "#10b981",
  weeks = 12 
}: HabitHeatMapProps) {
  const today = new Date();
  const startDate = startOfWeek(subDays(today, weeks * 7 - 1));
  const allDays = eachDayOfInterval({ start: startDate, end: today });
  
  // Group days by week
  const weekGroups: Date[][] = [];
  let currentWeek: Date[] = [];
  
  allDays.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === allDays.length - 1) {
      weekGroups.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const getEntryForDate = (date: Date): HabitEntry | undefined => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return entries.find(e => e.habit_id === habitId && e.entry_date === dateStr);
  };

  const getIntensity = (entry: HabitEntry | undefined): number => {
    if (!entry) return 0;
    if (entry.is_completed) return 4;
    if (entry.range_value !== null) {
      // Calculate percentage based on range (assuming max is stored or use default)
      return Math.min(4, Math.ceil((entry.range_value / 10) * 4));
    }
    if (entry.dropdown_value) return 3;
    return 0;
  };

  const getColorClass = (intensity: number): string => {
    switch (intensity) {
      case 0: return "bg-muted";
      case 1: return "bg-success/20";
      case 2: return "bg-success/40";
      case 3: return "bg-success/60";
      case 4: return "bg-success";
      default: return "bg-muted";
    }
  };

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {/* Day labels column */}
        <div className="flex flex-col gap-1 mr-1">
          {dayLabels.map((label, i) => (
            <div 
              key={i} 
              className="w-3 h-3 text-[8px] text-muted-foreground flex items-center justify-center"
            >
              {i % 2 === 1 ? label : ''}
            </div>
          ))}
        </div>
        
        {/* Heat map grid */}
        <TooltipProvider delayDuration={100}>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {weekGroups.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => {
                  const entry = getEntryForDate(day);
                  const intensity = getIntensity(entry);
                  const isToday = isSameDay(day, today);
                  
                  return (
                    <Tooltip key={dayIndex}>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ 
                            delay: (weekIndex * 7 + dayIndex) * 0.005,
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                          className={cn(
                            "w-3 h-3 rounded-sm cursor-pointer transition-all duration-200",
                            getColorClass(intensity),
                            isToday && "ring-1 ring-primary ring-offset-1",
                            intensity > 0 && "hover:scale-125 hover:shadow-lg"
                          )}
                          style={intensity > 0 ? { 
                            backgroundColor: `${habitColor}${intensity === 4 ? '' : Math.round((intensity / 4) * 255).toString(16).padStart(2, '0')}`
                          } : undefined}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        <p className="font-medium">{format(day, 'MMM d, yyyy')}</p>
                        <p className="text-muted-foreground">
                          {entry?.is_completed ? '✅ Completed' : 
                           entry?.range_value ? `📊 ${entry.range_value}` :
                           entry?.dropdown_value ? `📝 ${entry.dropdown_value}` :
                           'No entry'}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={cn("w-3 h-3 rounded-sm", getColorClass(level))}
              style={level > 0 ? { 
                backgroundColor: `${habitColor}${level === 4 ? '' : Math.round((level / 4) * 255).toString(16).padStart(2, '0')}`
              } : undefined}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
