import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle2, Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VocabularyItem } from '@/data/module1Data';
import { useLanguage } from '@/components/LanguageContext';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { speakText } from '@/utils/speechUtils';

interface MonthsLessonProps {
  content: VocabularyItem[];
  onComplete: () => void;
}

export const MonthsLesson: React.FC<MonthsLessonProps> = ({ content, onComplete }) => {
  const { selectedLanguage } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedMonths, setCompletedMonths] = useState<Set<string>>(new Set());
  const { isRecording, startRecording, stopRecording, clearRecording } = useVoiceRecorder();

  const currentMonth = content[currentIndex];
  const progress = (completedMonths.size / content.length) * 100;
  const allCompleted = completedMonths.size === content.length;

  const speakMonth = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
      setCompletedMonths(prev => new Set([...prev, currentMonth.id]));
      if (currentIndex < content.length - 1) {
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setShowTranslation(false);
        }, 500);
      }
    } else {
      clearRecording();
      await startRecording();
    }
  };

  const goNext = () => {
    setCompletedMonths(prev => new Set([...prev, currentMonth.id]));
    if (currentIndex < content.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowTranslation(false);
      clearRecording();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowTranslation(false);
      clearRecording();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">Months of the Year 📅</h2>
        <p className="text-muted-foreground">Listen and repeat each month</p>
      </div>

      {/* Progress */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
      </div>

      {/* Month Grid Preview */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {content.map((month, idx) => (
          <button
            key={month.id}
            onClick={() => {
              setCurrentIndex(idx);
              speakMonth(month.english);
            }}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${idx === currentIndex ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2' : ''}
              ${completedMonths.has(month.id) ? 'bg-green-500/30 text-green-700' : 'bg-muted text-muted-foreground hover:bg-muted/80'}
            `}
          >
            {month.english.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Current Month Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMonth.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl p-8 border border-primary/30 text-center"
        >
          <div className="text-2xl text-muted-foreground mb-2">
            Month {currentIndex + 1}
          </div>
          <div className="text-5xl font-bold text-primary mb-4">
            {currentMonth.english}
          </div>

          <div className="flex justify-center gap-3">
            <Button onClick={() => speakMonth(currentMonth.english)} className="gap-2">
              <Volume2 className="w-5 h-5" />
              Listen
            </Button>
            <Button variant="outline" onClick={() => setShowTranslation(!showTranslation)}>
              {showTranslation ? 'Hide' : 'Show'} Translation
            </Button>
          </div>

          <AnimatePresence>
            {showTranslation && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xl text-foreground mt-4"
                dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}
              >
                {currentMonth.translations[selectedLanguage]}
              </motion.p>
            )}
          </AnimatePresence>

          {completedMonths.has(currentMonth.id) && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-600 rounded-full mt-4"
            >
              <CheckCircle2 className="w-5 h-5" />
              Completed!
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Voice Recording */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Say: "{currentMonth.english}"
        </p>

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
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0}>
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {content.length}
        </span>
        {allCompleted ? (
          <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600 gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Complete
          </Button>
        ) : (
          <Button onClick={goNext}>
            {currentIndex === content.length - 1 ? 'Finish' : 'Next'}
          </Button>
        )}
      </div>
    </div>
  );
};
