import React from 'react';
import { motion } from 'framer-motion';
import { Home, Trophy, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageContext';

interface Module5CompleteProps {
  onComplete: () => void;
}

export const Module5Complete: React.FC<Module5CompleteProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center space-y-6 p-8 bg-accent rounded-2xl border border-border"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl"
        >
          🎉🏆🎉
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <h2 className="font-fredoka text-3xl font-bold text-primary">
            {t('moduleComplete')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {t('congratsModule')}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-2 text-primary"
        >
          <Trophy className="w-6 h-6" />
          <span className="font-fredoka text-lg font-semibold">Module 5: Food & Cooking</span>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center gap-4 pt-4"
        >
          <Button
            size="lg"
            onClick={() => navigate('/')}
            className="gap-2 rounded-xl bg-gradient-primary text-primary-foreground px-8"
          >
            <Home className="w-5 h-5" />
            {t('backToDashboard')}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
