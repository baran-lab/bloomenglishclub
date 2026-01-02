import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";
import { characters } from "@/data/mockData";

export function WelcomeHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
          <Building2 className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-fredoka text-3xl font-bold text-foreground">
            Englishville
          </h1>
          <p className="text-muted-foreground text-sm">
            Your English learning neighborhood
          </p>
        </div>
      </div>

      {/* Characters strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 flex items-center gap-2 overflow-x-auto pb-2"
      >
        <div className="flex items-center gap-1 text-sm text-muted-foreground mr-2">
          <Users className="w-4 h-4" />
          <span>Meet your neighbors:</span>
        </div>
        {characters.map((char, index) => (
          <motion.div
            key={char.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-1 px-3 py-1.5 bg-secondary rounded-full text-sm whitespace-nowrap"
          >
            <span>{char.flag}</span>
            <span className="font-medium text-secondary-foreground">{char.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
