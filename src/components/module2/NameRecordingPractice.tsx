import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Mic, Square, Play, CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { nameRecordingQuestions } from '@/data/module2Data';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';

interface NameRecordingPracticeProps {
  onComplete: () => void;
  userName?: string;
}

export const NameRecordingPractice: React.FC<NameRecordingPracticeProps> = ({ onComplete, userName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const { isRecording, audioUrl, startRecording, stopRecording, clearRecording } = useVoiceRecorder();
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentQuestion = nameRecordingQuestions[currentIndex];
  const progress = (completedQuestions.size / nameRecordingQuestions.length) * 100;
  const allCompleted = completedQuestions.size === nameRecordingQuestions.length;

  const speakQuestion = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
      // Simulate pronunciation check
      setTimeout(() => {
        const score = Math.floor(Math.random() * 20) + 80;
        setPronunciationScore(score);
        if (score >= 70) {
          setCompletedQuestions(prev => new Set([...prev, currentIndex]));
        }
      }, 500);
    } else {
      clearRecording();
      setPronunciationScore(null);
      await startRecording();
    }
  };

  const playRecording = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
    }
  };

  const goNext = () => {
    if (currentIndex < nameRecordingQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setPronunciationScore(null);
      clearRecording();
    }
  };

  const retry = () => {
    setPronunciationScore(null);
    clearRecording();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">Name Practice 🎤</h2>
        <p className="text-muted-foreground">Answer the questions and check your pronunciation</p>
      </div>

      {/* Progress */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
      </div>

      {/* Question Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl p-8 border border-primary/30 text-center"
        >
          <div className="text-6xl mb-4">🎧</div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {currentQuestion.question}
          </h3>
          <p className="text-muted-foreground italic mb-4">
            {currentQuestion.hint}
          </p>

          <Button onClick={speakQuestion} className="gap-2">
            <Volume2 className="w-5 h-5" />
            Listen to Question
          </Button>

          {completedQuestions.has(currentIndex) && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-600 rounded-full mt-4 ml-3"
            >
              <CheckCircle2 className="w-5 h-5" />
              Completed!
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Recording Section */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Record your answer
        </p>

        <div className="flex justify-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRecord}
            className={`
              w-20 h-20 rounded-full flex items-center justify-center transition-all
              ${isRecording 
                ? 'bg-destructive text-destructive-foreground animate-pulse' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }
            `}
          >
            {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </motion.button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          {isRecording ? 'Recording... Tap to stop' : 'Tap to record'}
        </p>

        {/* Playback */}
        {audioUrl && (
          <div className="flex justify-center gap-3">
            <audio ref={audioRef} src={audioUrl} />
            <Button variant="outline" onClick={playRecording} className="gap-2">
              <Play className="w-4 h-4" />
              Play Recording
            </Button>
            <Button variant="ghost" onClick={retry} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        )}

        {/* Pronunciation Score */}
        {pronunciationScore !== null && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center p-4 rounded-xl bg-muted"
          >
            <div className={`text-4xl font-bold ${pronunciationScore >= 85 ? 'text-green-500' : pronunciationScore >= 70 ? 'text-amber-500' : 'text-orange-500'}`}>
              {pronunciationScore}%
            </div>
            <p className={`font-medium ${pronunciationScore >= 85 ? 'text-green-600' : pronunciationScore >= 70 ? 'text-amber-600' : 'text-orange-600'}`}>
              {pronunciationScore >= 85 ? 'Excellent!' : pronunciationScore >= 70 ? 'Good job!' : 'Keep practicing!'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Listen to your recording to check your pronunciation
            </p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(prev => prev - 1);
              setPronunciationScore(null);
              clearRecording();
            }
          }} 
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {nameRecordingQuestions.length}
        </span>
        {allCompleted ? (
          <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600 gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Complete
          </Button>
        ) : (
          <Button onClick={goNext} disabled={currentIndex === nameRecordingQuestions.length - 1}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
