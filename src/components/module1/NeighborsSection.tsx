import React from 'react';
import { motion } from 'framer-motion';
import { characters } from '@/data/module1Data';
import { CharacterCard } from './CharacterCard';

export const NeighborsSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="font-fredoka text-2xl font-bold text-foreground mb-2">Meet Your Neighbors 🏠</h2>
        <p className="text-muted-foreground">These are the people who live at Garden Street Apartments</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {characters.map((character, index) => (
          <CharacterCard key={character.id} character={character} index={index} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 p-6 bg-gradient-to-b from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
        <h3 className="font-fredoka text-lg font-semibold text-center text-primary mb-4">🏢 Garden Street Apartments</h3>
        <div className="grid grid-cols-2 gap-2 max-w-lg mx-auto">
          {/* Floor 4 */}
          {characters.filter(c => c.apartment.includes('4')).map(char => (
            <div key={char.id} className="bg-card/80 rounded-lg p-3 text-center border border-border/50">
              <span className="text-xl">{char.avatar}</span>
              <p className="text-xs font-medium text-foreground truncate">{char.name.split(' ')[0]}</p>
              <p className="text-[10px] text-primary font-medium">{char.job}</p>
              <p className="text-[10px] text-muted-foreground">{char.apartment}</p>
            </div>
          ))}
          {/* Floor 3 */}
          {characters.filter(c => c.apartment.includes('3')).map(char => (
            <div key={char.id} className="bg-card/80 rounded-lg p-3 text-center border border-border/50">
              <span className="text-xl">{char.avatar}</span>
              <p className="text-xs font-medium text-foreground truncate">{char.name.split(' ')[0]}</p>
              <p className="text-[10px] text-primary font-medium">{char.job}</p>
              <p className="text-[10px] text-muted-foreground">{char.apartment}</p>
            </div>
          ))}
          {/* Floor 2 */}
          {characters.filter(c => c.apartment.includes('2')).map(char => (
            <div key={char.id} className="bg-card/80 rounded-lg p-3 text-center border border-border/50">
              <span className="text-xl">{char.avatar}</span>
              <p className="text-xs font-medium text-foreground truncate">{char.name.split(' ')[0]}</p>
              <p className="text-[10px] text-primary font-medium">{char.job}</p>
              <p className="text-[10px] text-muted-foreground">{char.apartment}</p>
            </div>
          ))}
          {/* Floor 1 */}
          {characters.filter(c => c.apartment.includes('1')).map(char => (
            <div key={char.id} className="bg-card/80 rounded-lg p-3 text-center border border-border/50">
              <span className="text-xl">{char.avatar}</span>
              <p className="text-xs font-medium text-foreground truncate">{char.name.split(' ')[0]}</p>
              <p className="text-[10px] text-primary font-medium">{char.job}</p>
              <p className="text-[10px] text-muted-foreground">{char.apartment}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
