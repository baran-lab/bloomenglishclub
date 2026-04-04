import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Eye, EyeOff, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PhraseItem, SupportedLanguage } from '@/data/module1Data';
import { useLanguage } from '@/components/LanguageContext';
import { speakText } from '@/utils/speechUtils';

interface PhraseCardProps {
  phrase: PhraseItem;
  index: number;
  onPractice?: () => void;
}

export const PhraseCard: React.FC<PhraseCardProps> = ({ phrase, index, onPractice }) => {
  const { selectedLanguage, t } = useLanguage();
  const [showTranslation, setShowTranslation] = useState(false);

  const speakPhrase = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(phrase.english);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-xl border border-border p-4 space-y-3"
    >
      {/* English phrase */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-lg font-semibold text-foreground">{phrase.english}</p>
          <p className="text-sm text-muted-foreground italic">/{phrase.pronunciation}/</p>
          {phrase.context && (
            <p className="text-xs text-primary mt-1">{phrase.context}</p>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={speakPhrase}
            className="text-primary hover:text-primary hover:bg-primary/10"
          >
            <Volume2 className="w-5 h-5" />
          </Button>
          {onPractice && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onPractice}
              className="text-accent-foreground hover:bg-accent/10"
            >
              <Mic className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Translation toggle */}
      <div className="border-t border-border pt-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTranslation(!showTranslation)}
          className="gap-2 text-muted-foreground hover:text-foreground w-full justify-start"
        >
          {showTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showTranslation ? t('hideTranslation') : t('showTranslation')}
        </Button>
        
        {showTranslation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 p-3 bg-muted/50 rounded-lg"
          >
            <p className="text-foreground font-medium" dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}>
              {phrase.translations[selectedLanguage]}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
