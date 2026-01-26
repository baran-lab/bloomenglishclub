import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Trophy, Clock, Star, X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface JoinClubCardProps {
  totalTimeSpent: number; // in seconds
  totalCredits: number;
  userName?: string;
}

const REQUIRED_TIME = 30 * 60; // 30 minutes in seconds
const REQUIRED_CREDITS = 500;

export const JoinClubCard: React.FC<JoinClubCardProps> = ({ 
  totalTimeSpent, 
  totalCredits,
  userName = 'Friend'
}) => {
  const [showModal, setShowModal] = useState(false);
  
  const timeProgress = Math.min((totalTimeSpent / REQUIRED_TIME) * 100, 100);
  const creditsProgress = Math.min((totalCredits / REQUIRED_CREDITS) * 100, 100);
  const canJoin = totalTimeSpent >= REQUIRED_TIME && totalCredits >= REQUIRED_CREDITS;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) {
      return `${hrs}h ${mins % 60}m`;
    }
    return `${mins}m`;
  };

  return (
    <>
      <motion.button
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/30 hover:border-amber-500/50 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Users className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-fredoka text-lg font-bold text-foreground">
              Join English Place Club
            </h3>
            <p className="text-sm text-muted-foreground">
              {canJoin ? '🎉 You can join now!' : 'Complete activities to unlock'}
            </p>
          </div>
          {canJoin ? (
            <Trophy className="w-6 h-6 text-amber-500" />
          ) : (
            <Lock className="w-6 h-6 text-muted-foreground" />
          )}
        </div>
      </motion.button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-fredoka text-2xl text-center flex items-center justify-center gap-2">
              <Users className="w-6 h-6 text-amber-500" />
              English Place Club
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {canJoin ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-4"
              >
                <div className="text-6xl">🎉</div>
                <h3 className="font-fredoka text-xl font-bold text-green-600">
                  Congratulations, {userName}!
                </h3>
                <p className="text-muted-foreground">
                  You've earned enough credits and practiced enough to join the English Place Club!
                </p>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  Join the Club! 🏆
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <p className="text-center text-muted-foreground">
                  Complete lessons and collect credits to join the exclusive English Place Club!
                </p>

                {/* Time Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Practice Time</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatTime(totalTimeSpent)} / {formatTime(REQUIRED_TIME)}
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${timeProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {timeProgress >= 100 ? '✅ Time requirement met!' : `${Math.round(timeProgress)}% complete`}
                  </p>
                </div>

                {/* Credits Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500" />
                      <span className="font-medium">Credits</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {totalCredits} / {REQUIRED_CREDITS}
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${creditsProgress}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {creditsProgress >= 100 ? '✅ Credits requirement met!' : `${Math.round(creditsProgress)}% complete`}
                  </p>
                </div>

                <div className="p-4 bg-amber-500/10 rounded-xl text-center">
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    💡 Complete lessons and practice speaking to earn more credits!
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
