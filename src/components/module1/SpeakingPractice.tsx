import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PhraseItem } from '@/data/module1Data';
import { VoiceRecorder } from './VoiceRecorder';
import { useLanguage } from '@/components/LanguageContext';
import { speakText } from '@/utils/speechUtils';

interface SpeakingPracticeProps {
  phrases: PhraseItem[];
  onComplete?: () => void;
}

export const SpeakingPractice: React.FC<SpeakingPracticeProps> = ({ 
  phrases,
  onComplete 
}) => {
  const { selectedLanguage, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedPhrases, setCompletedPhrases] = useState<Set<string>>(new Set());
  const [showTranslation, setShowTranslation] = useState(false);

  const currentPhrase = phrases[currentIndex];
  const progress = (completedPhrases.size / phrases.length) * 100;

  const handleRecordComplete = (success: boolean) => {
    if (success) {
      setCompletedPhrases(prev => new Set([...prev, currentPhrase.id]));
    }
  };

  const goNext = () => {
    if (currentIndex < phrases.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowTranslation(false);
    } else if (completedPhrases.size === phrases.length) {
      onComplete?.();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowTranslation(false);
    }
  };

  const speakPhrase = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentPhrase.english);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      const voices = speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en'));
      if (englishVoice) utterance.voice = englishVoice;
      setTimeout(() => speechSynthesis.speak(utterance), 50);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{completedPhrases.size} / {phrases.length}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current phrase card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhrase.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20"
        >
          <div className="text-center space-y-4">
            {/* Phrase number */}
            <span className="inline-block px-3 py-1 bg-primary/20 rounded-full text-sm font-medium text-primary">
              Phrase {currentIndex + 1} of {phrases.length}
            </span>

            {/* English phrase */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {currentPhrase.english}
              </h3>
              <p className="text-muted-foreground italic">
                /{currentPhrase.pronunciation}/
              </p>
            </div>

            {/* Listen button */}
            <Button
              variant="outline"
              onClick={speakPhrase}
              className="gap-2"
            >
              <Volume2 className="w-4 h-4" />
              Listen
            </Button>

            {/* Translation toggle */}
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
                className="text-muted-foreground"
              >
                {showTranslation ? t('hideTranslation') : t('needHelp')}
              </Button>
              
              {showTranslation && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-3 bg-muted/50 rounded-lg text-foreground"
                  dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}
                >
                  {currentPhrase.translations[selectedLanguage]}
                </motion.p>
              )}
            </div>

            {/* Completed indicator */}
            {completedPhrases.has(currentPhrase.id) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-600 rounded-full"
              >
                ✓ Completed
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Voice recorder */}
      <VoiceRecorder
        targetPhrase={currentPhrase.english}
        onComplete={handleRecordComplete}
      />

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('previous')}
        </Button>

        <Button
          onClick={goNext}
          disabled={currentIndex === phrases.length - 1 && completedPhrases.size < phrases.length}
          className="gap-2"
        >
          {currentIndex === phrases.length - 1 ? 'Finish' : t('next')}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
