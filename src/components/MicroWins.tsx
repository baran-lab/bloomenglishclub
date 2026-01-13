import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Sparkles, Star, Zap } from 'lucide-react';

interface MicroWinProps {
  message: string;
  userName?: string;
  type?: 'correct' | 'pronunciation' | 'streak' | 'points';
  onComplete?: () => void;
  autoHide?: boolean;
  duration?: number;
}

const icons = {
  correct: CheckCircle,
  pronunciation: Sparkles,
  streak: Zap,
  points: Star,
};

const colors = {
  correct: 'text-success',
  pronunciation: 'text-primary',
  streak: 'text-accent',
  points: 'text-amber-500',
};

export const MicroWin: React.FC<MicroWinProps> = ({
  message,
  userName = '',
  type = 'correct',
  onComplete,
  autoHide = true,
  duration = 2000,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = icons[type];
  const colorClass = colors[type];

  const displayMessage = message.replace('{name}', userName);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onComplete?.(), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: 2 }}
            className="bg-card border-2 border-success/30 rounded-2xl px-6 py-4 shadow-xl flex items-center gap-3"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Icon className={`w-8 h-8 ${colorClass}`} />
            </motion.div>
            <span className="font-fredoka font-semibold text-lg text-foreground">
              {displayMessage}
            </span>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 15, -15, 0],
              }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-2xl"
            >
              ✨
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook to show micro wins easily
export const useMicroWin = () => {
  const [win, setWin] = useState<{
    message: string;
    userName?: string;
    type?: MicroWinProps['type'];
    key: number;
  } | null>(null);

  const showWin = (message: string, userName?: string, type?: MicroWinProps['type']) => {
    setWin({ message, userName, type, key: Date.now() });
  };

  const clearWin = () => setWin(null);

  const MicroWinComponent = win ? (
    <MicroWin
      key={win.key}
      message={win.message}
      userName={win.userName}
      type={win.type}
      onComplete={clearWin}
    />
  ) : null;

  return { showWin, MicroWinComponent };
};

export default MicroWin;
