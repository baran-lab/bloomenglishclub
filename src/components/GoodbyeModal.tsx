import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BeeMascot, getRandomMessage } from './BeeMascot';
import { Button } from '@/components/ui/button';

interface GoodbyeModalProps {
  isOpen: boolean;
  userName: string;
  sessionStats?: {
    lessonsCompleted: number;
    practiceAttempts: number;
    duration: number; // in seconds
  };
  onClose: () => void;
  onStay: () => void;
}

export const GoodbyeModal: React.FC<GoodbyeModalProps> = ({
  isOpen,
  userName,
  sessionStats,
  onClose,
  onStay,
}) => {
  const goodbyeMessage = getRandomMessage('goodbye', userName || 'friend');

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="bg-card rounded-3xl p-8 max-w-sm w-full shadow-2xl border-2 border-accent/20"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Bee waving goodbye */}
              <BeeMascot
                size="large"
                message={goodbyeMessage}
                userName={userName}
                isWaving={true}
              />

              {/* Session summary */}
              {sessionStats && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full bg-secondary/50 rounded-2xl p-4 space-y-2"
                >
                  <h3 className="font-fredoka font-semibold text-foreground text-center mb-3">
                    Today's Progress
                  </h3>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Time spent:</span>
                    <span className="font-medium text-foreground">
                      {formatDuration(sessionStats.duration)}
                    </span>
                  </div>
                  {sessionStats.lessonsCompleted > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Lessons:</span>
                      <span className="font-medium text-success">
                        {sessionStats.lessonsCompleted} completed ✓
                      </span>
                    </div>
                  )}
                  {sessionStats.practiceAttempts > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Practice:</span>
                      <span className="font-medium text-foreground">
                        {sessionStats.practiceAttempts} attempts
                      </span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  onClick={onStay}
                  className="flex-1 rounded-xl"
                >
                  Keep Learning
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 rounded-xl bg-gradient-primary text-primary-foreground"
                >
                  See you! 👋
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GoodbyeModal;
