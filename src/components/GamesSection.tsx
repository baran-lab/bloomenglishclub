import { motion } from "framer-motion";
import { Gamepad2, ExternalLink, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Game {
  title: string;
  url: string;
}

const module1Games: Game[] = [
  { title: "Listen and Order 1", url: "https://www.educaplay.com/game/27271340-listen_and_order.html" },
  { title: "Listen and Order 2", url: "https://www.educaplay.com/game/27241419-listen_and_order.html" },
  { title: "Match the Pairs 1", url: "https://www.educaplay.com/game/27241388-match_the_pairs.html" },
  { title: "Match the Pairs 2", url: "https://www.educaplay.com/game/27238561-match_the_pairs.html" },
  { title: "Personal Information", url: "https://www.educaplay.com/game/27238501-personal_information.html" },
  { title: "Let's Review", url: "https://www.educaplay.com/game/26954994-let_s_review.html" },
  { title: "Numbers 1", url: "https://www.educaplay.com/game/26954271-numbers.html" },
  { title: "Numbers 2", url: "https://www.educaplay.com/game/26954574-numbers.html" },
];

const module2Games: Game[] = [
  { title: "What's Your Telephone Number?", url: "https://www.educaplay.com/game/26944089-what_s_your_telephone_number.html" },
  { title: "When Were You Born?", url: "https://www.educaplay.com/game/26945229-when_were_you_born_what_s_your_date_of_birth.html" },
  { title: "What's Your Address?", url: "https://www.educaplay.com/game/26945691-what_s_your_address.html" },
];

interface ModuleGames {
  moduleId: number;
  moduleTitle: string;
  games: Game[];
}

const allModuleGames: ModuleGames[] = [
  { moduleId: 1, moduleTitle: "Module 1", games: module1Games },
  { moduleId: 2, moduleTitle: "Module 2", games: module2Games },
];

interface GamesSectionProps {
  completedModules: number[];
}

export function GamesSection({ completedModules }: GamesSectionProps) {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  };

  // For pre-publication testing, all games are unlocked
  const isPrePublish = true; // Set to false after publishing

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card rounded-2xl p-5 shadow-soft"
    >
      <div className="flex items-center gap-2 mb-4">
        <Gamepad2 className="w-5 h-5 text-primary" />
        <h3 className="font-fredoka text-lg font-semibold">Games</h3>
      </div>

      <div className="space-y-3">
        {allModuleGames.map((moduleGroup) => {
          const isUnlocked = isPrePublish || completedModules.includes(moduleGroup.moduleId);
          const isExpanded = expandedModules.has(moduleGroup.moduleId);

          return (
            <div key={moduleGroup.moduleId} className="rounded-xl border border-border overflow-hidden">
              {/* Module Header */}
              <button
                onClick={() => isUnlocked && toggleModule(moduleGroup.moduleId)}
                className={`w-full flex items-center justify-between p-3 transition-colors ${
                  isUnlocked ? 'hover:bg-muted/50 cursor-pointer' : 'opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2">
                  {!isUnlocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                  <span className="font-fredoka font-semibold text-foreground">
                    {moduleGroup.moduleTitle} Games
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({moduleGroup.games.length} games)
                  </span>
                </div>
                {isUnlocked && (
                  isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {/* Locked message */}
              {!isUnlocked && (
                <div className="px-3 pb-3">
                  <p className="text-xs text-muted-foreground">
                    Complete {moduleGroup.moduleTitle} to unlock these games
                  </p>
                </div>
              )}

              {/* Games List */}
              {isUnlocked && isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="border-t border-border"
                >
                  <div className="grid gap-1 p-2 sm:grid-cols-2">
                    {moduleGroup.games.map((game, index) => (
                      <motion.a
                        key={index}
                        href={game.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                        className="flex items-center gap-3 p-3 rounded-xl transition-all bg-muted hover:bg-primary/10 cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm font-medium text-foreground truncate">
                          {game.title}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion message */}
      {completedModules.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-primary/10 rounded-xl text-center"
        >
          <p className="text-sm font-medium text-primary">
            🎉 Great job! You can play the games for completed modules or continue to the next one.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
