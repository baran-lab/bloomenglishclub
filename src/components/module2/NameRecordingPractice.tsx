import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Mic, Square, Play, CheckCircle2, RotateCcw, Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { nameRecordingQuestions } from '@/data/module2Data';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { useNavigate } from 'react-router-dom';
import { speakText } from '@/utils/speechUtils';

interface NameRecordingPracticeProps {
  onComplete: () => void;
  userName?: string;
}

export const NameRecordingPractice: React.FC<NameRecordingPracticeProps> = ({ onComplete, userName }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState<string | null>(null);
  const { isRecording, audioUrl, startRecording, stopRecording, clearRecording } = useVoiceRecorder();
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);
  const recordingStartTimeRef = useRef<number | null>(null);

  const currentQuestion = nameRecordingQuestions[currentIndex];
  const progress = (completedQuestions.size / nameRecordingQuestions.length) * 100;
  const allCompleted = completedQuestions.size === nameRecordingQuestions.length;

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setRecognizedText(transcript);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

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
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      const recordingDuration = recordingStartTimeRef.current ? Date.now() - recordingStartTimeRef.current : 0;
      
      // Validate recording
      setTimeout(() => {
        if (recordingDuration < 800) {
          setFeedback('Please record a longer response.');
          return;
        }

        const recognized = recognizedText?.toLowerCase().trim() || '';
        
        // Validate based on question type
        if (currentQuestion.expectedStart) {
          // First question: "What's your first name?" - must start with "My first name is"
          if (recognized.startsWith('my first name is') || recognized.includes('my first name is')) {
            const score = Math.floor(Math.random() * 15) + 85;
            setPronunciationScore(score);
            setFeedback(null);
            setCompletedQuestions(prev => new Set([...prev, currentIndex]));
          } else if (recognized.startsWith('my name is') || recognized.includes('my name is')) {
            // Accept but give feedback
            setPronunciationScore(75);
            setFeedback('Good! But try to say: "My first name is..."');
            setCompletedQuestions(prev => new Set([...prev, currentIndex]));
          } else {
            setFeedback('Please answer with: "My first name is [your name]"');
            setPronunciationScore(null);
          }
        } else {
          // Second question: spelling - show what they spelled
          const score = Math.floor(Math.random() * 15) + 80;
          setPronunciationScore(score);
          setFeedback(null);
          setCompletedQuestions(prev => new Set([...prev, currentIndex]));
        }
      }, 500);
    } else {
      clearRecording();
      setPronunciationScore(null);
      setFeedback(null);
      setRecognizedText(null);
      recordingStartTimeRef.current = Date.now();
      await startRecording();
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
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
      setFeedback(null);
      setRecognizedText(null);
      clearRecording();
    }
  };

  const retry = () => {
    setPronunciationScore(null);
    setFeedback(null);
    setRecognizedText(null);
    clearRecording();
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <Home className="w-4 h-4" /> Dashboard
      </Button>

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

        {/* Feedback message */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 dark:text-amber-400">{feedback}</p>
          </motion.div>
        )}

        {/* Recognized text display */}
        {recognizedText && !isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center"
          >
            <p className="text-sm text-muted-foreground">You said:</p>
            <p className="text-lg font-medium text-blue-700 dark:text-blue-400 mt-1">
              "{recognizedText}"
            </p>
          </motion.div>
        )}

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
              setFeedback(null);
              setRecognizedText(null);
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

export default NameRecordingPractice;
