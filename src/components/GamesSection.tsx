import { motion } from "framer-motion";
import { Gamepad2, Lock, ExternalLink } from "lucide-react";

interface Game {
  title: string;
  url: string;
  requiredModule: number;
}

const module1Games: Game[] = [
  { title: "Listen and Order 1", url: "https://www.educaplay.com/game/27271340-listen_and_order.html", requiredModule: 1 },
  { title: "Listen and Order 2", url: "https://www.educaplay.com/game/27241419-listen_and_order.html", requiredModule: 1 },
  { title: "Match the Pairs 1", url: "https://www.educaplay.com/game/27241388-match_the_pairs.html", requiredModule: 1 },
  { title: "Match the Pairs 2", url: "https://www.educaplay.com/game/27238561-match_the_pairs.html", requiredModule: 1 },
  { title: "Personal Information", url: "https://www.educaplay.com/game/27238501-personal_information.html", requiredModule: 1 },
  { title: "Let's Review", url: "https://www.educaplay.com/game/26954994-let_s_review.html", requiredModule: 1 },
  { title: "Numbers 1", url: "https://www.educaplay.com/game/26954271-numbers.html", requiredModule: 1 },
  { title: "Numbers 2", url: "https://www.educaplay.com/game/26954574-numbers.html", requiredModule: 1 },
];

const module2Games: Game[] = [
  { title: "What's Your Telephone Number?", url: "https://www.educaplay.com/game/26944089-what_s_your_telephone_number.html", requiredModule: 2 },
  { title: "When Were You Born?", url: "https://www.educaplay.com/game/26945229-when_were_you_born_what_s_your_date_of_birth.html", requiredModule: 2 },
  { title: "What's Your Address?", url: "https://www.educaplay.com/game/26945691-what_s_your_address.html", requiredModule: 2 },
];

interface GamesSectionProps {
  completedModules: number[];
}

export function GamesSection({ completedModules }: GamesSectionProps) {
  const allGames = [...module1Games, ...module2Games];

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

      <div className="grid gap-2 sm:grid-cols-2">
        {allGames.map((game, index) => {
          const isUnlocked = completedModules.includes(game.requiredModule);

          return (
            <motion.a
              key={index}
              href={isUnlocked ? game.url : undefined}
              target={isUnlocked ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                isUnlocked
                  ? "bg-muted hover:bg-primary/10 cursor-pointer"
                  : "bg-muted/50 opacity-60 cursor-not-allowed"
              }`}
              onClick={(e) => { if (!isUnlocked) e.preventDefault(); }}
            >
              {isUnlocked ? (
                <ExternalLink className="w-4 h-4 text-primary shrink-0" />
              ) : (
                <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
              <span className="text-sm font-medium text-foreground truncate">
                {game.title}
              </span>
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}
