import React from 'react';
import { motion } from 'framer-motion';
import { Character } from '@/data/module1Data';

interface CharacterCardProps {
  character: Character;
  index: number;
  onClick?: () => void;
  isActive?: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  index, 
  onClick,
  isActive = false 
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        flex flex-col items-center p-4 rounded-2xl transition-all duration-200
        ${isActive 
          ? 'bg-primary/20 border-2 border-primary shadow-lg' 
          : 'bg-card border border-border hover:bg-muted/50 hover:shadow-md'
        }
      `}
    >
      <div className="text-4xl mb-2">{character.avatar}</div>
      <div className="flex items-center gap-1 mb-1">
        <span className="text-sm">{character.flag}</span>
      </div>
      <h4 className="font-semibold text-sm text-foreground text-center">
        {character.name}
      </h4>
      <p className="text-xs text-muted-foreground">{character.country}</p>
      {character.job && (
        <p className="text-xs text-primary mt-1">{character.job}</p>
      )}
    </motion.button>
  );
};
