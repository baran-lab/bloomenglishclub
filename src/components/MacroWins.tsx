import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MacroWin } from '@/stores/userStore';

interface MacroWinsModalProps {
  isOpen: boolean;
  win: MacroWin | null;
  userName: string;
  onClose: () => void;
  onShare: () => void;
}

export const MacroWinsModal: React.FC<MacroWinsModalProps> = ({
  isOpen,
  win,
  userName,
  onClose,
  onShare,
}) => {
  if (!win) return null;

  const displayTitle = win.title.replace('{name}', userName);
  const displayDescription = win.description.replace('{name}', userName);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `🎉 ${displayTitle}`,
          text: `I just achieved "${displayTitle}" on Englishville! ${displayDescription}`,
          url: window.location.origin,
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    }
    onShare();
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
            initial={{ scale: 0.5, opacity: 0, rotateY: -30 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-card rounded-3xl p-8 max-w-sm w-full shadow-2xl border-4 border-accent/30 relative overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Confetti effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    y: -20, 
                    x: Math.random() * 300,
                    opacity: 1,
                    rotate: 0,
                  }}
                  animate={{ 
                    y: 400,
                    opacity: 0,
                    rotate: Math.random() * 360,
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 0.5,
                    repeat: Infinity,
                  }}
                  className="absolute text-xl"
                  style={{ left: `${Math.random() * 100}%` }}
                >
                  {['🎉', '⭐', '🌟', '✨', '🎊'][Math.floor(Math.random() * 5)]}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-6 relative z-10">
              {/* Achievement icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-accent flex items-center justify-center shadow-lg"
              >
                <span className="text-5xl">{win.icon}</span>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <span className="text-sm font-medium text-success uppercase tracking-wide">
                    Achievement Unlocked!
                  </span>
                </div>
                <h2 className="font-fredoka text-2xl font-bold text-foreground mb-2">
                  {displayTitle}
                </h2>
                <p className="text-muted-foreground">
                  {displayDescription}
                </p>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-3 w-full"
              >
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 rounded-xl"
                >
                  Continue
                </Button>
                <Button
                  onClick={handleShare}
                  className="flex-1 rounded-xl bg-gradient-accent text-accent-foreground gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Achievement badge display
export const AchievementBadge: React.FC<{ win: MacroWin; size?: 'sm' | 'md' | 'lg' }> = ({
  win,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center shadow-md ${
        win.isUnlocked
          ? 'bg-gradient-accent'
          : 'bg-muted grayscale opacity-50'
      }`}
    >
      <span>{win.icon}</span>
    </motion.div>
  );
};

export default MacroWinsModal;
