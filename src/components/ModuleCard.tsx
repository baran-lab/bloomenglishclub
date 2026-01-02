import { motion } from "framer-motion";
import { Lock, Check, ChevronRight, User, ClipboardList, Map, Heart, ShoppingBag, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Module } from "@/data/mockData";

interface ModuleCardProps {
  module: Module;
  index: number;
  onClick: () => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  user: User,
  clipboard: ClipboardList,
  map: Map,
  heart: Heart,
  "shopping-bag": ShoppingBag,
  briefcase: Briefcase,
};

const moduleColors = [
  "from-[hsl(175,60%,45%)] to-[hsl(185,55%,50%)]",
  "from-[hsl(200,70%,50%)] to-[hsl(210,65%,55%)]",
  "from-[hsl(145,55%,45%)] to-[hsl(155,50%,50%)]",
  "from-[hsl(350,70%,55%)] to-[hsl(0,65%,60%)]",
  "from-[hsl(35,90%,50%)] to-[hsl(25,85%,55%)]",
  "from-[hsl(260,60%,55%)] to-[hsl(270,55%,60%)]",
];

export function ModuleCard({ module, index, onClick }: ModuleCardProps) {
  const IconComponent = iconMap[module.icon] || User;
  const isLocked = !module.isUnlocked;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={!isLocked ? { scale: 1.02, y: -4 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      onClick={!isLocked ? onClick : undefined}
      className={cn(
        "relative rounded-2xl p-6 cursor-pointer transition-all duration-300",
        "shadow-card hover:shadow-lg",
        isLocked 
          ? "bg-muted cursor-not-allowed opacity-70" 
          : "bg-card"
      )}
    >
      {/* Progress bar background */}
      {!isLocked && module.progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-muted rounded-b-2xl overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${module.progress}%` }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
            className="h-full bg-gradient-success rounded-b-2xl"
          />
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            "flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center",
            isLocked 
              ? "bg-locked" 
              : `bg-gradient-to-br ${moduleColors[index]}`
          )}
        >
          {isLocked ? (
            <Lock className="w-6 h-6 text-locked-foreground" />
          ) : (
            <IconComponent className="w-7 h-7 text-primary-foreground" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full",
              isLocked 
                ? "bg-locked text-locked-foreground" 
                : module.isCompleted 
                  ? "bg-success text-success-foreground"
                  : "bg-primary/10 text-primary"
            )}>
              Module {module.id}
            </span>
            {module.isCompleted && (
              <Check className="w-4 h-4 text-success" />
            )}
          </div>
          
          <h3 className={cn(
            "font-fredoka text-lg font-semibold mb-1 truncate",
            isLocked ? "text-locked-foreground" : "text-foreground"
          )}>
            {module.title}
          </h3>
          
          <p className={cn(
            "text-sm line-clamp-2",
            isLocked ? "text-locked-foreground" : "text-muted-foreground"
          )}>
            {module.description}
          </p>

          {/* Progress indicator for unlocked modules */}
          {!isLocked && module.progress > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs font-medium text-primary">
                {module.progress}% complete
              </span>
            </div>
          )}
        </div>

        {/* Arrow */}
        {!isLocked && (
          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
        )}
      </div>

      {/* Locked overlay message */}
      {isLocked && (
        <div className="mt-3 text-xs text-locked-foreground flex items-center gap-1">
          <Lock className="w-3 h-3" />
          Complete previous modules to unlock
        </div>
      )}
    </motion.div>
  );
}
