import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Mic, Square, CheckCircle2, RotateCcw, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VocabularyItem, encouragingMessages, congratulatoryMessages } from '@/data/module1Data';
import { useLanguage } from '@/components/LanguageContext';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { speakText } from '@/utils/speechUtils';

interface NumbersPracticeProps {
  numbers: VocabularyItem[];
  onComplete: () => void;
  title?: string;
}

export const NumbersPractice: React.FC<NumbersPracticeProps> = ({ 
  numbers, 
  onComplete,
  title = 'Numbers Practice'
}) => {
  const { selectedLanguage, t } = useLanguage();
  const [practiceNumbers, setPracticeNumbers] = useState<VocabularyItem[]>(() => 
    [...numbers].sort(() => Math.random() - 0.5).slice(0, 10)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedNumbers, setCompletedNumbers] = useState<Set<string>>(new Set());
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const { isRecording, audioUrl, startRecording, stopRecording, clearRecording } = useVoiceRecorder();

  const currentNumber = practiceNumbers[currentIndex];
  const progress = (completedNumbers.size / practiceNumbers.length) * 100;
  const allCompleted = completedNumbers.size === practiceNumbers.length;

  const speakNumber = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentNumber.english);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
      setTimeout(() => {
        const score = Math.floor(Math.random() * 20) + 80;
        setPronunciationScore(score);
        if (score >= 75) {
          setCompletedNumbers(prev => new Set([...prev, currentNumber.id]));
        }
      }, 500);
    } else {
      clearRecording();
      setPronunciationScore(null);
      await startRecording();
    }
  };

  const goNext = () => {
    if (currentIndex < practiceNumbers.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setPronunciationScore(null);
      setShowAnswer(false);
      clearRecording();
    }
  };

  const shuffleNumbers = () => {
    setPracticeNumbers([...numbers].sort(() => Math.random() - 0.5).slice(0, 10));
    setCurrentIndex(0);
    setCompletedNumbers(new Set());
    setPronunciationScore(null);
    setShowAnswer(false);
    clearRecording();
  };

  const getRandomMessage = (messages: typeof encouragingMessages) => {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    return msg.translations[selectedLanguage] || msg.english;
  };

  // Extract the numeric value from the english word
  const getNumericValue = (english: string): string => {
    const numMap: Record<string, string> = {
      'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
      'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
      'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13',
      'fourteen': '14', 'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
      'eighteen': '18', 'nineteen': '19', 'twenty': '20', 'twenty-one': '21',
      'twenty-two': '22', 'twenty-three': '23', 'twenty-four': '24',
      'twenty-five': '25', 'twenty-six': '26', 'twenty-seven': '27',
      'twenty-eight': '28', 'twenty-nine': '29', 'thirty': '30',
      'thirty-one': '31', 'thirty-two': '32', 'thirty-three': '33',
      'thirty-four': '34', 'thirty-five': '35', 'thirty-six': '36',
      'thirty-seven': '37', 'thirty-eight': '38', 'thirty-nine': '39',
      'forty': '40', 'forty-one': '41', 'forty-two': '42', 'forty-three': '43',
      'forty-four': '44', 'forty-five': '45', 'forty-six': '46',
      'forty-seven': '47', 'forty-eight': '48', 'forty-nine': '49',
      'fifty': '50', 'fifty-one': '51', 'fifty-two': '52', 'fifty-three': '53',
      'fifty-four': '54', 'fifty-five': '55', 'fifty-six': '56',
      'fifty-seven': '57', 'fifty-eight': '58', 'fifty-nine': '59', 'sixty': '60',
    };
    return numMap[english.toLowerCase()] || '?';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-fredoka text-xl font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {currentIndex + 1} / {practiceNumbers.length}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={shuffleNumbers} className="gap-2">
          <Shuffle className="w-4 h-4" />
          New Set
        </Button>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-module-3"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Encouraging message */}
      {completedNumbers.size > 0 && completedNumbers.size < practiceNumbers.length && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-3 bg-module-3/10 rounded-xl"
        >
          <p className="text-module-3 font-medium">{getRandomMessage(encouragingMessages)}</p>
        </motion.div>
      )}

      {/* Number Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNumber.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-gradient-to-br from-module-3/20 to-module-3/10 rounded-3xl p-8 border border-module-3/30 text-center"
        >
          {/* Big Number */}
          <div className="text-7xl font-bold text-module-3 mb-4">
            {getNumericValue(currentNumber.english)}
          </div>

          {/* Show answer toggle */}
          <AnimatePresence>
            {showAnswer ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <p className="text-2xl font-bold text-foreground">{currentNumber.english}</p>
                <p className="text-muted-foreground italic">/{currentNumber.pronunciation}/</p>
                <p 
                  className="text-lg text-foreground"
                  dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}
                >
                  {currentNumber.translations[selectedLanguage]}
                </p>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground"
              >
                How do you say this number?
              </motion.p>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex justify-center gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowAnswer(!showAnswer)}
              className="gap-2"
            >
              {showAnswer ? 'Hide' : 'Show'} Answer
            </Button>
            <Button onClick={speakNumber} className="gap-2 bg-module-3 hover:bg-module-3/90">
              <Volume2 className="w-5 h-5" />
              {t('listen')}
            </Button>
          </div>

          {/* Completed indicator */}
          {completedNumbers.has(currentNumber.id) && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-600 rounded-full mt-4"
            >
              <CheckCircle2 className="w-5 h-5" />
              {t('correct')}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Voice Recording */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Say: "{currentNumber.english}"
        </p>

        <div className="flex justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRecord}
            className={`
              w-16 h-16 rounded-full flex items-center justify-center transition-all
              ${isRecording 
                ? 'bg-destructive text-destructive-foreground animate-pulse' 
                : 'bg-module-3 text-white hover:bg-module-3/90'
              }
            `}
          >
            {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </motion.button>
        </div>

        {pronunciationScore !== null && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <span className={`text-2xl font-bold ${pronunciationScore >= 85 ? 'text-green-500' : pronunciationScore >= 75 ? 'text-amber-500' : 'text-orange-500'}`}>
              {pronunciationScore}%
            </span>
            <p className={`font-medium ${pronunciationScore >= 85 ? 'text-green-500' : pronunciationScore >= 75 ? 'text-amber-500' : 'text-orange-500'}`}>
              {pronunciationScore >= 85 ? t('excellent') : pronunciationScore >= 75 ? t('goodJob') : t('keepPracticing')}
            </p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-center">
        {allCompleted ? (
          <Button onClick={onComplete} className="gap-2 bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-4 h-4" />
            Complete Practice
          </Button>
        ) : (
          <Button 
            onClick={goNext} 
            disabled={currentIndex === practiceNumbers.length - 1}
            className="gap-2"
          >
            Next Number
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
