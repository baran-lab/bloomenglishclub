import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronLeft, ChevronRight, Eye, EyeOff, Mic, Square, Play, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SentenceItem, encouragingMessages, congratulatoryMessages } from '@/data/module1Data';
import { useLanguage } from '@/components/LanguageContext';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { speakText } from '@/utils/speechUtils';

interface SentencePracticeProps {
  sentences: SentenceItem[];
  onComplete: () => void;
  title?: string;
}

export const SentencePractice: React.FC<SentencePracticeProps> = ({ 
  sentences, 
  onComplete,
  title = 'Listen and Repeat'
}) => {
  const { selectedLanguage, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSentences, setCompletedSentences] = useState<Set<string>>(new Set());
  const [showTranslation, setShowTranslation] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const { isRecording, audioUrl, startRecording, stopRecording, clearRecording } = useVoiceRecorder();

  const currentSentence = sentences[currentIndex];
  const progress = (completedSentences.size / sentences.length) * 100;
  const allCompleted = completedSentences.size === sentences.length;

  const speakSentence = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentSentence.english);
      utterance.lang = 'en-US';
      utterance.rate = 0.6;
      speechSynthesis.speak(utterance);
    }
  };

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
      setTimeout(() => {
        const score = Math.floor(Math.random() * 25) + 75;
        setPronunciationScore(score);
        if (score >= 70) {
          setCompletedSentences(prev => new Set([...prev, currentSentence.id]));
        }
      }, 500);
    } else {
      clearRecording();
      setPronunciationScore(null);
      await startRecording();
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const goNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowTranslation(false);
      setPronunciationScore(null);
      clearRecording();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowTranslation(false);
      setPronunciationScore(null);
      clearRecording();
    }
  };

  const getRandomMessage = (messages: typeof encouragingMessages) => {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    return msg.translations[selectedLanguage] || msg.english;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Sentence {currentIndex + 1} of {sentences.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Encouraging message */}
      {completedSentences.size > 0 && completedSentences.size < sentences.length && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-3 bg-primary/10 rounded-xl"
        >
          <p className="text-primary font-medium">{getRandomMessage(encouragingMessages)}</p>
        </motion.div>
      )}

      {/* Sentence Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSentence.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-gradient-to-br from-module-2/20 to-module-2/10 rounded-2xl p-6 border border-module-2/30"
        >
          <div className="text-center space-y-4">
            {/* Step 1: Listen */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-module-2/20 rounded-full text-sm font-medium text-module-2">
              Step 1: {t('listen')}
            </div>

            {/* English sentence */}
            <div>
              <p className="text-xl font-bold text-foreground leading-relaxed">{currentSentence.english}</p>
              <p className="text-sm text-muted-foreground italic mt-2">/{currentSentence.pronunciation}/</p>
            </div>

            {/* Listen button */}
            <Button onClick={speakSentence} className="gap-2 bg-module-2 hover:bg-module-2/90">
              <Volume2 className="w-5 h-5" />
              {t('listen')}
            </Button>

            {/* Translation toggle */}
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
                className="gap-2 text-muted-foreground"
              >
                {showTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showTranslation ? t('hideTranslation') : t('needHelp')}
              </Button>
              
              <AnimatePresence>
                {showTranslation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-4 bg-muted/50 rounded-xl"
                  >
                    <p 
                      className="text-lg font-medium text-foreground"
                      dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}
                    >
                      {currentSentence.translations[selectedLanguage]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Completed indicator */}
            {completedSentences.has(currentSentence.id) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-600 rounded-full"
              >
                <CheckCircle2 className="w-5 h-5" />
                {t('correct')}
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Step 2: Record */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary mx-auto block text-center">
          <span className="w-full text-center">Step 2: {t('repeat')}</span>
        </div>

        <div className="flex justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRecord}
            className={`
              w-16 h-16 rounded-full flex items-center justify-center transition-all
              ${isRecording 
                ? 'bg-destructive text-destructive-foreground animate-pulse' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }
            `}
          >
            {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </motion.button>
        </div>

        {audioUrl && !isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm" onClick={playRecording} className="gap-2">
                <Play className="w-4 h-4" />
                {t('playRecording')}
              </Button>
              <Button variant="outline" size="sm" onClick={() => { clearRecording(); setPronunciationScore(null); }} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                {t('tryAgain')}
              </Button>
            </div>

            {pronunciationScore !== null && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <span className={`text-2xl font-bold ${pronunciationScore >= 85 ? 'text-green-500' : pronunciationScore >= 70 ? 'text-amber-500' : 'text-orange-500'}`}>
                  {pronunciationScore}%
                </span>
                <p className={`font-medium ${pronunciationScore >= 85 ? 'text-green-500' : pronunciationScore >= 70 ? 'text-amber-500' : 'text-orange-500'}`}>
                  {pronunciationScore >= 85 ? t('excellent') : pronunciationScore >= 70 ? t('goodJob') : t('keepPracticing')}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          {t('previous')}
        </Button>

        {allCompleted && currentIndex === sentences.length - 1 ? (
          <Button onClick={onComplete} className="gap-2 bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-4 h-4" />
            Complete
          </Button>
        ) : (
          <Button onClick={goNext} disabled={currentIndex === sentences.length - 1} className="gap-2">
            {t('next')}
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Completion celebration */}
      <AnimatePresence>
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl border border-green-500/30"
          >
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-lg font-bold text-green-600">{getRandomMessage(congratulatoryMessages)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
