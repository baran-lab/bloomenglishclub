import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BeeMascot, getRandomMessage } from './BeeMascot';

interface WelcomeScreenProps {
  userName: string;
  onComplete: () => void;
  autoHideDelay?: number;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  userName,
  onComplete,
  autoHideDelay = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const welcomeMessage = getRandomMessage('welcome', userName || 'friend');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for exit animation
    }, autoHideDelay);

    return () => clearTimeout(timer);
  }, [autoHideDelay, onComplete]);

  const handleClick = () => {
    setIsVisible(false);
    setTimeout(onComplete, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero"
          onClick={handleClick}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="flex flex-col items-center gap-8"
          >
            {/* Logo */}
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-fredoka text-4xl md:text-5xl font-bold text-primary"
            >
              Englishville
            </motion.h1>

            {/* Bee with welcome message */}
            <BeeMascot
              size="large"
              message={welcomeMessage}
              userName={userName}
              isWaving={true}
            />

            {/* Tap to continue hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
              className="text-muted-foreground text-sm"
            >
              Tap anywhere to continue
            </motion.p>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-10 left-10 text-4xl"
            animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌸
          </motion.div>
          <motion.div
            className="absolute top-20 right-16 text-3xl"
            animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-16 text-3xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            🌷
          </motion.div>
          <motion.div
            className="absolute bottom-16 right-10 text-4xl"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 0.3 }}
          >
            🏠
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
