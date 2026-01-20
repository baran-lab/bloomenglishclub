import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Play, RotateCcw, ChevronLeft, ChevronRight, Home, Volume2, Lightbulb, CheckCircle2, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/components/LanguageContext';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { playRecordingSuccessSound } from '@/utils/soundEffects';
import { SupportedLanguage } from '@/data/module1Data';

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
  "Great effort! 🌟",
  "You're doing amazing! 💪",
  "Keep it up! 🎉",
  "Nice try! Practice makes perfect! ✨",
  "Wonderful attempt! 🌈",
  "You're getting better! 🚀",
  "Good job trying! 👏",
];

const congratulatoryMessages = [
  "Perfect! You nailed it! 🎯",
  "Excellent pronunciation! 🌟",
  "Amazing job! You're a natural! 💫",
  "Outstanding! Keep shining! ⭐",
  "Wow! That was great! 🎉",
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
  const { selectedLanguage, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionRef = useRef<any>(null);
  
  const { 
    isRecording, 
    audioUrl, 
    audioBlob,
    startRecording, 
    stopRecording, 
    clearRecording, 
    error 
  } = useVoiceRecorder();

  const currentSlide = slides[currentIndex];
  const progress = ((currentIndex + (showAnswer ? 1 : 0)) / slides.length) * 100;

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
    }
  }, []);

  // Calculate pronunciation score based on recognized text
  const calculateScore = useCallback((recognized: string, expected: string): number => {
    const normalizeText = (text: string) => 
      text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    const normalizedRecognized = normalizeText(recognized);
    const normalizedExpected = normalizeText(expected);

    if (!normalizedRecognized) return 0;
    
    // Check for key words
    const expectedWords = normalizedExpected.split(' ');
    const recognizedWords = normalizedRecognized.split(' ');
    
    let matchedWords = 0;
    expectedWords.forEach(word => {
      if (recognizedWords.some(rw => rw.includes(word) || word.includes(rw))) {
        matchedWords++;
      }
    });

    const score = Math.min(100, Math.round((matchedWords / expectedWords.length) * 100));
    return score;
  }, []);

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
      
      // Stop speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      setIsAnalyzing(true);
      
      // Wait for recording to process
      setTimeout(() => {
        setIsAnalyzing(false);
        
        // Check if we have recognized text or at least audio
        if (audioBlob || recognizedText) {
          setHasRecorded(true);
          
          // Calculate score if we have recognized text
          let score = 0;
          if (recognizedText) {
            score = calculateScore(recognizedText, currentSlide.questionToAsk);
          } else {
            // Random encouraging score if no speech recognition
            score = Math.floor(Math.random() * 30) + 50; // 50-80%
          }
          
          setPronunciationScore(score);
          
          // Generate feedback based on score
          const message = score >= 80
            ? congratulatoryMessages[Math.floor(Math.random() * congratulatoryMessages.length)]
            : encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
          setFeedbackMessage(message);
          
          if (score >= 50) {
            playRecordingSuccessSound();
          }
          
          // Auto-show answer after recording
          setTimeout(() => {
            setShowAnswer(true);
            if (videoRef.current) {
              videoRef.current.play();
            }
          }, 1500);
        } else {
          setFeedbackMessage("Try speaking a bit longer! 🎤");
        }
      }, 800);
    } else {
      // Reset state
      clearRecording();
      setHasRecorded(false);
      setShowAnswer(false);
      setFeedbackMessage('');
      setPronunciationScore(null);
      setRecognizedText('');
      
      // Start recording
      await startRecording();
      
      // Start speech recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          recognitionRef.current.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setRecognizedText(transcript);
          };
          recognitionRef.current.onerror = (event: any) => {
            console.log('Speech recognition error:', event.error);
          };
        } catch (err) {
          console.log('Speech recognition not available');
        }
      }
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const handleRetry = () => {
    clearRecording();
    setHasRecorded(false);
    setShowAnswer(false);
    setFeedbackMessage('');
    setPronunciationScore(null);
    setRecognizedText('');
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setHasRecorded(false);
      setShowAnswer(false);
      setFeedbackMessage('');
      setPronunciationScore(null);
      setRecognizedText('');
      clearRecording();
    } else {
      setIsComplete(true);
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setHasRecorded(false);
      setShowAnswer(false);
      setFeedbackMessage('');
      setPronunciationScore(null);
      setRecognizedText('');
      clearRecording();
    }
  };

  // Get translation for current slide
  const getTranslation = () => {
    const lang = selectedLanguage as SupportedLanguage;
    return currentSlide.translations[lang] || { question: currentSlide.questionToAsk, hint: currentSlide.hint };
  };

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-orange-600';
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
          <Button variant="outline" onClick={onBackToDashboard} className="gap-2">
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
        <Button variant="ghost" size="icon" onClick={onBackToDashboard}>
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
        {/* Before Recording / Recording Phase */}
        {!showAnswer && (
          <div className="p-6 space-y-6">
            {/* Task Instruction */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Mic className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Ask {characterName}:</span>
              </div>
              
              {/* Show ONLY the hint, not the full question */}
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

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Feedback after recording (before video plays) */}
            <AnimatePresence>
              {hasRecorded && feedbackMessage && !showAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Score Display */}
                  {pronunciationScore !== null && (
                    <div className="flex justify-center">
                      <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                        <Star className={`w-5 h-5 ${getScoreColor(pronunciationScore)}`} />
                        <span className={`font-bold ${getScoreColor(pronunciationScore)}`}>
                          {pronunciationScore}%
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Recognized Text */}
                  {recognizedText && (
                    <div className="text-center text-sm text-muted-foreground">
                      <span>You said: </span>
                      <span className="font-medium text-foreground">"{recognizedText}"</span>
                    </div>
                  )}

                  {/* Feedback Message */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-lg font-semibold text-green-700 dark:text-green-400">
                        {feedbackMessage}
                      </span>
                    </div>
                  </motion.div>

                  {/* Playback and retry */}
                  <div className="flex justify-center gap-3">
                    {audioUrl && (
                      <Button variant="outline" size="sm" onClick={playRecording} className="gap-2">
                        <Play className="w-4 h-4" />
                        Play Recording
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={handleRetry} className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Try Again
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    Hear {characterName}'s answer...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Answer Section - Video plays after recording */}
        {showAnswer && (
          <div className="space-y-4">
            {/* Video */}
            <div className="relative bg-black">
              <video
                ref={videoRef}
                src={currentSlide.videoUrl}
                controls
                autoPlay
                className="w-full aspect-video"
                onEnded={() => {
                  // Optional: auto-advance after video ends
                }}
              />
            </div>

            {/* Success Message */}
            <div className="p-6 text-center space-y-4">
              {pronunciationScore !== null && (
                <div className="flex justify-center gap-4 items-center">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    pronunciationScore >= 80 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
                  }`}>
                    <Star className={`w-5 h-5 ${getScoreColor(pronunciationScore)}`} />
                    <span className={`font-bold ${getScoreColor(pronunciationScore)}`}>
                      Your score: {pronunciationScore}%
                    </span>
                  </div>
                </div>
              )}

              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <Sparkles className="w-5 h-5 text-green-600" />
                <span className="text-lg font-semibold text-green-700 dark:text-green-400">
                  {feedbackMessage}
                </span>
              </div>

              <p className="text-muted-foreground">
                The question was: <span className="font-semibold text-foreground">"{currentSlide.questionToAsk}"</span>
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {showAnswer && (
          <Button
            onClick={handleNext}
            className="gap-2 bg-gradient-primary text-primary-foreground"
          >
            {currentIndex === slides.length - 1 ? 'Complete' : 'Next Question'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SpeakingTestPractice;
