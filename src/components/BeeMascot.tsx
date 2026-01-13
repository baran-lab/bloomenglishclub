import React from 'react';
import { motion } from 'framer-motion';

interface BeeMascotProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  userName?: string;
  isWaving?: boolean;
  className?: string;
  onClick?: () => void;
}

const welcomeMessages = [
  "Welcome back, {name}! 🌸",
  "Ready to learn, {name}? 🎯",
  "Hello, {name}! Let's practice! 📚",
  "Great to see you, {name}! 🌟",
  "Hi {name}! Time to shine! ✨",
];

const goodbyeMessages = [
  "Good job, {name}! See you soon! 👋",
  "Great progress today, {name}! 🌟",
  "Keep practicing, {name}! 💪",
  "Bye {name}! You did amazing! 🎉",
  "See you tomorrow, {name}! 🐝",
];

const encouragingMessages = [
  "You can do it, {name}! 💪",
  "Great effort, {name}! 🌟",
  "Keep going, {name}! 🎯",
  "Amazing work, {name}! ✨",
  "You're doing great, {name}! 🎉",
];

export const getRandomMessage = (type: 'welcome' | 'goodbye' | 'encourage', userName: string = 'friend') => {
  const messages = type === 'welcome' ? welcomeMessages : type === 'goodbye' ? goodbyeMessages : encouragingMessages;
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex].replace('{name}', userName);
};

export const BeeMascot: React.FC<BeeMascotProps> = ({
  size = 'medium',
  message,
  userName = 'friend',
  isWaving = false,
  className = '',
  onClick,
}) => {
  const sizeClasses = {
    small: 'w-12 h-12 text-2xl',
    medium: 'w-20 h-20 text-4xl',
    large: 'w-32 h-32 text-6xl',
  };

  const displayMessage = message?.replace('{name}', userName);

  return (
    <motion.div 
      className={`flex flex-col items-center gap-2 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      onClick={onClick}
    >
      {/* Speech bubble */}
      {displayMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border-2 border-accent rounded-2xl px-4 py-2 shadow-lg max-w-xs text-center relative"
        >
          <p className="text-sm font-medium text-foreground">{displayMessage}</p>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-r-2 border-b-2 border-accent rotate-45" />
        </motion.div>
      )}

      {/* Bee */}
      <motion.div
        className={`${sizeClasses[size]} flex items-center justify-center cursor-pointer`}
        animate={isWaving ? {
          rotate: [0, -10, 10, -10, 10, 0],
          y: [0, -5, 0, -3, 0],
        } : {
          y: [0, -8, 0],
        }}
        transition={isWaving ? {
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
        } : {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span role="img" aria-label="Bee mascot" className="drop-shadow-lg">
          🐝
        </span>
      </motion.div>

      {/* Wing flutter effect */}
      <motion.div
        className="absolute opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
};

export default BeeMascot;
