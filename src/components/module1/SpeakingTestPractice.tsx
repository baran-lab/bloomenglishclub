import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Play, RotateCcw, ChevronLeft, ChevronRight, Home, Volume2, Lightbulb, CheckCircle2, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/components/LanguageContext';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { playRecordingSuccessSound } from '@/utils/soundEffects';
import { SupportedLanguage } from '@/data/module1Data';
import { useNavigate } from 'react-router-dom';

export interface SpeakingTestSlide {
  id: string;
  videoUrl: string;
  questionToAsk: string;
  hint: string;
  translations: Record<SupportedLanguage, { question: string; hint: string }>;
}

interface SpeakingTestPracticeProps {
  slides: SpeakingTestSlide[];
  onComplete: () => void;
  onContinue?: () => void;
  lessonTitle: string;
  lessonDescription: string;
  onBackToDashboard: () => void;
  characterName?: string;
}

const encouragingMessages = [
  "Great effort! Keep going! 🌟",
  "You're doing amazing! 💪",
  "Nice job! Let's hear the next one! 🎉",
  "Wonderful! You're making great progress! ✨",
  "Well done! On to the next question! 🌈",
  "You're getting better! 🚀",
  "Good job! 👏",
];

const SpeakingTestPractice: React.FC<SpeakingTestPracticeProps> = ({
  slides,
  onComplete,
  onContinue,
  lessonTitle,
  lessonDescription,
  onBackToDashboard,
  characterName = 'Marisol',
}) => {
  const navigate = useNavigate();
  const { selectedLanguage, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const currentSlide = slides[currentIndex];
  const progress = ((currentIndex + (hasRecorded ? 1 : 0)) / slides.length) * 100;

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }
        if (finalTranscript) {
          setRecognizedText(prev => prev + ' ' + finalTranscript);
        }
      };
      
      recognitionRef.current.onerror = () => {};
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setRecognizedText('');
      audioChunksRef.current = [];
      
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (err) {
          console.log('Speech recognition already started or not available');
        }
      }
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
    }
    
    setIsRecording(false);
    setIsListening(false);
    setIsAnalyzing(true);
    
    // Analyze and provide feedback, then auto-advance
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasRecorded(true);
      
      // Generate encouraging feedback (no score, no right/wrong)
      const message = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
      setFeedbackMessage(message);
      
      playRecordingSuccessSound();
      
      // Auto-advance to next slide after showing feedback briefly
      const timer = window.setTimeout(() => {
        handleAutoNext();
      }, 2500);
      setAutoAdvanceTimer(timer);
    }, 1000);
  };

  const handleAutoNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setHasRecorded(false);
      setFeedbackMessage('');
      setRecognizedText('');
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      setAudioUrl(null);
      setAutoAdvanceTimer(null);
    } else {
      setIsComplete(true);
      onComplete();
    }
  };

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      // Clear any pending auto-advance
      if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        setAutoAdvanceTimer(null);
      }
      await startRecording();
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const handleNext = () => {
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setHasRecorded(false);
      setFeedbackMessage('');
      setRecognizedText('');
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      setAudioUrl(null);
    } else {
      setIsComplete(true);
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setHasRecorded(false);
      setFeedbackMessage('');
      setRecognizedText('');
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      setAudioUrl(null);
    }
  };

  // Get translation for current slide
  const getTranslation = () => {
    const lang = selectedLanguage as SupportedLanguage;
    return currentSlide.translations[lang] || { question: currentSlide.questionToAsk, hint: currentSlide.hint };
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-12"
      >
        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="w-12 h-12 text-primary-foreground" />
        </div>
        <h2 className="font-fredoka text-3xl font-bold text-foreground">
          {t('congratulations')}
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          You've completed {lessonTitle}! Great job practicing your speaking skills!
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate('/')} className="gap-2">
            <Home className="w-4 h-4" />
            Dashboard
          </Button>
          {onContinue && (
            <Button onClick={onContinue} className="gap-2 bg-gradient-primary">
              Continue
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  const translation = getTranslation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <Home className="w-5 h-5" />
        </Button>
        <div className="text-center flex-1">
          <h2 className="font-fredoka text-xl font-bold text-foreground">{lessonTitle}</h2>
          <p className="text-sm text-muted-foreground">{lessonDescription}</p>
        </div>
        <div className="w-10" />
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentIndex + 1} of {slides.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Main Content Card */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card rounded-2xl border border-border overflow-hidden"
      >
        <div className="p-6 space-y-6">
          {/* Task Instruction */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Mic className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Ask {characterName}:</span>
            </div>
            
            {/* Show ONLY the hint */}
            <div className="mt-4">
              <div className="inline-block px-8 py-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-300 dark:border-amber-700">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Hint</span>
                </div>
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                  {currentSlide.hint}
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-500 mt-2">
                  {translation.hint}
                </p>
              </div>
            </div>
          </div>

          {/* Recording Button */}
          <div className="flex flex-col items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleRecord}
              disabled={isAnalyzing}
              className={`
                w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg
                ${isAnalyzing 
                  ? 'bg-muted text-muted-foreground cursor-wait'
                  : isRecording 
                    ? 'bg-destructive text-destructive-foreground animate-pulse' 
                    : 'bg-gradient-primary text-primary-foreground hover:scale-105'
                }
              `}
            >
              {isAnalyzing ? (
                <div className="w-8 h-8 border-4 border-muted-foreground border-t-transparent rounded-full animate-spin" />
              ) : isRecording ? (
                <Square className="w-10 h-10" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </motion.button>
            <p className="text-sm text-muted-foreground">
              {isAnalyzing 
                ? 'Analyzing your speech...' 
                : isRecording 
                  ? 'Tap to stop recording' 
                  : 'Tap to record your question'
              }
            </p>
          </div>

          {/* Feedback after recording - show transcript and encouraging message */}
          <AnimatePresence>
            {hasRecorded && feedbackMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* What the user said */}
                {recognizedText && (
                  <div className="text-center p-3 bg-muted/50 rounded-xl">
                    <span className="text-sm text-muted-foreground">You said: </span>
                    <span className="font-medium text-foreground">"{recognizedText.trim()}"</span>
                  </div>
                )}

                {/* Encouraging Feedback - no right/wrong indication */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-xl border border-primary/20">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-lg font-semibold text-primary">
                      {feedbackMessage}
                    </span>
                  </div>
                </motion.div>

                {/* Playback */}
                {audioUrl && (
                  <div className="flex justify-center">
                    <Button variant="outline" size="sm" onClick={playRecording} className="gap-2">
                      <Play className="w-4 h-4" />
                      Play Recording
                    </Button>
                  </div>
                )}

                <p className="text-sm text-muted-foreground text-center animate-pulse">
                  Moving to next question...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button onClick={handleNext} className="gap-2">
          {currentIndex < slides.length - 1 ? 'Next Question' : 'Complete'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SpeakingTestPractice;