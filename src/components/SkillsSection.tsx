import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, MessageCircle, Headphones, Mic, Gamepad2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserProgress } from "@/data/mockData";

interface SkillsSectionProps {
  progress: UserProgress;
}

const skills = [
  { key: "vocabulary", label: "Vocabulary", icon: BookOpen, color: "from-[hsl(175,60%,45%)] to-[hsl(185,55%,50%)]", route: "/practice" },
  { key: "everydayEnglish", label: "Everyday English", icon: MessageCircle, color: "from-[hsl(35,90%,50%)] to-[hsl(25,85%,55%)]", route: "/practice?tab=everyday" },
  { key: "listening", label: "Listening", icon: Headphones, color: "from-[hsl(200,70%,50%)] to-[hsl(210,65%,55%)]", route: "/practice?tab=listening" },
  { key: "speaking", label: "Speaking", icon: Mic, color: "from-[hsl(145,55%,45%)] to-[hsl(155,50%,50%)]", route: "/pronunciation" },
  { key: "games", label: "Games", icon: Gamepad2, color: "from-[hsl(260,60%,55%)] to-[hsl(270,55%,60%)]", route: "/practice?tab=games" },
];

export function SkillsSection({ progress }: SkillsSectionProps) {
  const navigate = useNavigate();

  const getSkillProgress = (key: string) => {
    switch (key) {
      case "vocabulary":
        return progress.vocabulary;
      case "everydayEnglish":
        return progress.everydayEnglish;
      case "listening":
        return progress.listening;
      case "speaking":
        return progress.speaking;
      case "games":
        return { current: 0, total: 15 };
      default:
        return { current: 0, total: 0 };
    }
  };

  const isUnlocked = (key: string) => {
    const skillProgress = getSkillProgress(key);
    return skillProgress.current > 0 || key === "vocabulary" || key === "games" || key === "speaking" || key === "listening" || key === "everydayEnglish";
  };

  const handleClick = (skill: typeof skills[0]) => {
    if (skill.route) {
      navigate(skill.route);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="font-fredoka text-xl font-semibold text-foreground mb-4">
        Practice Skills
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {skills.map((skill, index) => {
          const skillProgress = getSkillProgress(skill.key);
          const unlocked = isUnlocked(skill.key);
          const Icon = skill.icon;
          const percentage = skillProgress.total > 0 
            ? Math.round((skillProgress.current / skillProgress.total) * 100) 
            : 0;

          return (
            <motion.div
              key={skill.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={unlocked ? { scale: 1.05, y: -2 } : {}}
              onClick={() => unlocked && handleClick(skill)}
              className={cn(
                "relative rounded-xl p-4 text-center transition-all shadow-soft",
                unlocked 
                  ? "bg-card cursor-pointer" 
                  : "bg-muted cursor-not-allowed opacity-60"
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center",
                  unlocked 
                    ? `bg-gradient-to-br ${skill.color}` 
                    : "bg-locked"
                )}
              >
                {unlocked ? (
                  <Icon className="w-6 h-6 text-primary-foreground" />
                ) : (
                  <Lock className="w-5 h-5 text-locked-foreground" />
                )}
              </div>

              <h3 className={cn(
                "font-semibold text-sm mb-1",
                unlocked ? "text-foreground" : "text-locked-foreground"
              )}>
                {skill.label}
              </h3>

              {unlocked ? (
                <div className="text-xs text-muted-foreground">
                  {skillProgress.current}/{skillProgress.total}
                </div>
              ) : (
                <div className="text-xs text-locked-foreground">
                  Locked
                </div>
              )}

              {unlocked && (
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    className={`h-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
