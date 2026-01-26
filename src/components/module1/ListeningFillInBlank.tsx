import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/components/LanguageContext';
import { SupportedLanguage } from '@/data/module1Data';

export interface ListeningFillInBlankItem {
  id: string;
  fullSentence: string; // Full sentence for audio playback
  sentenceBefore: string;
  sentenceAfter: string;
  correctAnswer: string; // Primary correct answer
  acceptedAnswers: string[]; // All accepted variations (is, IS, Is, iS)
  audioUrl?: string;
  translations: Record<SupportedLanguage, string>;
}

interface ListeningFillInBlankProps {
  items: ListeningFillInBlankItem[];
  onComplete: () => void;
  title?: string;
  userName?: string;
}

export const ListeningFillInBlank: React.FC<ListeningFillInBlankProps> = ({
  items,
  onComplete,
  title = "Let's Practice",
  userName = '',
}) => {
  const { selectedLanguage, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasTypo, setHasTypo] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [hasListened, setHasListened] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentItem = items[currentIndex];
  const progress = ((currentIndex + 1) / items.length) * 100;
  const allComplete = completedItems.size === items.length;

  // Auto-play audio when new item loads
  useEffect(() => {
    setHasListened(false);
  }, [currentIndex]);

  const speakSentence = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentItem.fullSentence);
      utterance.lang = 'en-US';
      utterance.rate = 0.75;
      speechSynthesis.speak(utterance);
      setHasListened(true);
    }
  };

  // Helper to check if answer is close enough (allows one letter missing)
  const isCloseEnough = (input: string, correct: string): boolean => {
    if (input === correct) return true;
    
    // Allow one letter missing
    if (Math.abs(input.length - correct.length) === 1) {
      const longer = input.length > correct.length ? input : correct;
      const shorter = input.length <= correct.length ? input : correct;
      
      let differences = 0;
      let j = 0;
      for (let i = 0; i < longer.length && j < shorter.length; i++) {
        if (longer[i] === shorter[j]) {
          j++;
        } else {
          differences++;
        }
      }
      differences += (shorter.length - j);
      
      return differences <= 1;
    }
    
    return false;
  };

  const checkAnswer = () => {
    const trimmedAnswer = userAnswer.trim();
    const normalizedAnswer = trimmedAnswer.toLowerCase();
    const correctNormalized = currentItem.correctAnswer.toLowerCase();
    
    // Check if it's an accepted variation (exact match)
    const isAccepted = currentItem.acceptedAnswers.some(
      ans => ans.toLowerCase() === normalizedAnswer
    );
    
    // Check if close enough (one letter missing - like "wok" for "work", "liv" for "live")
    const isTypoAccepted = currentItem.acceptedAnswers.some(
      ans => isCloseEnough(normalizedAnswer, ans.toLowerCase())
    );
    
    if (isAccepted || isTypoAccepted) {
      setIsCorrect(true);
      setCompletedItems(prev => new Set([...prev, currentItem.id]));
      
      // Play success sound
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
      } catch (e) { console.log('Audio not available'); }
      
      // Check if it's not the "standard" answer (typo or different case)
      if (!isAccepted && isTypoAccepted) {
        setHasTypo(true);
      } else if (trimmedAnswer !== currentItem.correctAnswer && 
          trimmedAnswer.toLowerCase() === correctNormalized) {
        setHasTypo(true);
      } else {
        setHasTypo(false);
      }
    } else {
      setIsCorrect(false);
      setHasTypo(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setIsCorrect(null);
      setHasTypo(false);
      setShowTranslation(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (allComplete) {
      onComplete();
    }
  };

  const handleRetry = () => {
    setUserAnswer('');
    setIsCorrect(null);
    setHasTypo(false);
    inputRef.current?.focus();
  };

  const getTypoMessage = () => {
    const standardForm = currentItem.correctAnswer;
    return `Your answer is correct! Just a tip: in English, we usually write "${standardForm}"`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground">{currentIndex + 1}/{items.length}</span>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-primary" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card rounded-3xl p-6 shadow-card border border-border space-y-6"
        >
          {/* Step 1: Listen */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">Step 1: Listen to the sentence</p>
            <Button
              variant="default"
              size="lg"
              onClick={speakSentence}
              className="gap-2 rounded-full px-8"
            >
              <Volume2 className="w-5 h-5" />
              {hasListened ? 'Listen Again' : 'Listen'}
            </Button>
          </div>

          {/* Step 2: Fill in the blank */}
          {hasListened && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground text-center">Step 2: Complete the sentence</p>
              
              {/* Sentence with blank */}
              <div className="text-center py-4 bg-muted/30 rounded-2xl px-4">
                <p className="text-xl font-medium text-foreground leading-relaxed">
                  "{currentItem.sentenceBefore}
                  <span className="inline-block mx-2 min-w-[80px] border-b-2 border-primary pb-1 px-2">
                    {isCorrect !== null ? (
                      <span className={isCorrect ? 'text-green-600 font-semibold' : 'text-destructive'}>
                        {userAnswer || '_____'}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">_____</span>
                    )}
                  </span>
                  {currentItem.sentenceAfter}"
                </p>
              </div>

              {/* Answer input */}
              <div className="flex gap-3 max-w-md mx-auto">
                <Input
                  ref={inputRef}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && isCorrect === null && userAnswer.trim() && checkAnswer()}
                  placeholder="Type your answer..."
                  disabled={isCorrect === true}
                  className="text-center text-lg rounded-xl"
                  autoFocus
                />
                {isCorrect === null && (
                  <Button 
                    onClick={checkAnswer} 
                    disabled={!userAnswer.trim()}
                    className="rounded-xl px-6"
                  >
                    Check
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {isCorrect !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className={`p-4 rounded-2xl text-center ${
                  isCorrect ? 'bg-green-500/10' : 'bg-accent/10'
                }`}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <span className="text-2xl">💪</span>
                    )}
                    <span className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-accent-foreground'}`}>
                      {isCorrect ? `Great job, ${userName || 'friend'}! 🎉` : `Good try, ${userName || 'friend'}! You can do it!`}
                    </span>
                  </div>
                </div>

                {/* Typo explanation */}
                {isCorrect && hasTypo && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-amber-500/10 flex items-start gap-2"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      {getTypoMessage()}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Translation toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-sm text-primary hover:underline"
            >
              {showTranslation ? 'Hide translation' : 'Show translation'}
            </button>
            
            {showTranslation && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground italic mt-2"
                dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}
              >
                {currentItem.translations[selectedLanguage]}
              </motion.p>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-3 pt-4">
            {isCorrect === false && (
              <Button variant="outline" onClick={handleRetry} className="gap-2 rounded-xl">
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
            )}
            {isCorrect === true && (
              <Button onClick={handleNext} className="gap-2 rounded-xl bg-gradient-primary">
                {currentIndex >= items.length - 1 ? 'Complete' : 'Continue'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Completion celebration */}
      <AnimatePresence>
        {allComplete && currentIndex >= items.length - 1 && isCorrect === true && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl border border-green-500/30"
          >
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-lg font-bold text-green-600">
              Excellent work, {userName || 'friend'}! You completed all sentences!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListeningFillInBlank;
