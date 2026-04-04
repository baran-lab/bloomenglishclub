import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Mic, Square, CheckCircle2, RotateCcw, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { alphabetData } from '@/data/module2Data';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { speakText } from '@/utils/speechUtils';

interface AlphabetLessonProps {
  onComplete: () => void;
}

export const AlphabetLesson: React.FC<AlphabetLessonProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedLetters, setCompletedLetters] = useState<Set<string>>(new Set());
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const { isRecording, startRecording, stopRecording, clearRecording } = useVoiceRecorder();

  const currentLetter = alphabetData[currentIndex];
  const progress = (completedLetters.size / alphabetData.length) * 100;
  const allCompleted = completedLetters.size === alphabetData.length;

  const speakLetter = (letter: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.lang = 'en-US';
      utterance.rate = 0.6;
      speechSynthesis.speak(utterance);
    }
  };

  const playAllLetters = async () => {
    setIsPlayingAll(true);
    for (let i = 0; i < alphabetData.length; i++) {
      setCurrentIndex(i);
      speakLetter(alphabetData[i].letter);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    setIsPlayingAll(false);
  };

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
      setCompletedLetters(prev => new Set([...prev, currentLetter.letter]));
      if (currentIndex < alphabetData.length - 1) {
        setTimeout(() => setCurrentIndex(prev => prev + 1), 500);
      }
    } else {
      clearRecording();
      await startRecording();
    }
  };

  const goNext = () => {
    if (currentIndex < alphabetData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      clearRecording();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      clearRecording();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">The Alphabet 🔤</h2>
        <p className="text-muted-foreground">Listen and repeat each letter</p>
      </div>

      {/* Progress */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
      </div>

      {/* Play All Button */}
      <div className="flex justify-center">
        <Button 
          onClick={playAllLetters} 
          disabled={isPlayingAll}
          variant="outline"
          className="gap-2"
        >
          <Play className="w-4 h-4" />
          {isPlayingAll ? 'Playing...' : 'Play All Letters'}
        </Button>
      </div>

      {/* Letter Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLetter.letter}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl p-8 border border-primary/30 text-center"
        >
          <div className="text-8xl font-bold text-primary mb-4">
            {currentLetter.letter}
          </div>
          <p className="text-xl text-muted-foreground italic">/{currentLetter.phonetic}/</p>

          <div className="flex justify-center gap-3 mt-6">
            <Button onClick={() => speakLetter(currentLetter.letter)} className="gap-2">
              <Volume2 className="w-5 h-5" />
              Listen
            </Button>
          </div>

          {completedLetters.has(currentLetter.letter) && (
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

      {/* Letter Grid Preview */}
      <div className="grid grid-cols-13 gap-1">
        {alphabetData.map((item, idx) => (
          <button
            key={item.letter}
            onClick={() => {
              setCurrentIndex(idx);
              speakLetter(item.letter);
            }}
            className={`
              w-8 h-8 rounded text-sm font-bold transition-all
              ${idx === currentIndex ? 'bg-primary text-primary-foreground scale-110' : ''}
              ${completedLetters.has(item.letter) ? 'bg-green-500/30 text-green-700' : 'bg-muted text-muted-foreground'}
            `}
          >
            {item.letter}
          </button>
        ))}
      </div>

      {/* Voice Recording */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Say the letter: "{currentLetter.letter}"
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
          {currentIndex + 1} / {alphabetData.length}
        </span>
        {allCompleted ? (
          <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Complete
          </Button>
        ) : (
          <Button onClick={goNext} disabled={currentIndex === alphabetData.length - 1}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
