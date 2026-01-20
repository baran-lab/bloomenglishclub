import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Play, RotateCcw, ChevronLeft, ChevronRight, Home, Volume2, Lightbulb, CheckCircle2, Sparkles } from 'lucide-react';
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
}

const encouragingMessages = [
  "Great effort! 🌟",
  "You're doing amazing! 💪",
  "Keep it up! 🎉",
  "Nice try! Practice makes perfect! ✨",
  "Wonderful attempt! 🌈",
  "You're getting better! 🚀",
  "Excellent work! 🏆",
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
}) => {
  const { selectedLanguage, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
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

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
      // Check if recording has content (at least 800ms)
      setTimeout(() => {
        if (audioBlob && audioBlob.size > 0) {
          setHasRecorded(true);
          // Generate encouraging feedback
          const isGood = Math.random() > 0.3; // 70% chance of "good" feedback
          const message = isGood 
            ? congratulatoryMessages[Math.floor(Math.random() * congratulatoryMessages.length)]
            : encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
          setFeedbackMessage(message);
          playRecordingSuccessSound();
        } else {
          setFeedbackMessage("Try speaking a bit longer! 🎤");
        }
      }, 500);
    } else {
      clearRecording();
      setHasRecorded(false);
      setShowAnswer(false);
      setFeedbackMessage('');
      await startRecording();
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
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    // Auto-play video when showing answer
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setHasRecorded(false);
      setShowAnswer(false);
      setShowHint(false);
      setFeedbackMessage('');
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
      setShowHint(false);
      setFeedbackMessage('');
      clearRecording();
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
        {/* Question Section - Before Recording */}
        {!showAnswer && (
          <div className="p-6 space-y-6">
            {/* Question to Ask */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Volume2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Ask Marisol:</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                "{currentSlide.questionToAsk}"
              </p>
              <p className="text-muted-foreground text-sm">
                {translation.question}
              </p>
            </div>

            {/* Hint Toggle */}
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHint(!showHint)}
                className="gap-2 text-amber-600"
              >
                <Lightbulb className="w-4 h-4" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
            </div>

            {/* Hint Display */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-center"
                >
                  <div className="inline-block px-6 py-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <p className="text-lg font-semibold text-amber-700 dark:text-amber-400">
                      💡 {currentSlide.hint}
                    </p>
                    <p className="text-sm text-amber-600 dark:text-amber-500 mt-1">
                      {translation.hint}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recording Button */}
            <div className="flex flex-col items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleRecord}
                className={`
                  w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg
                  ${isRecording 
                    ? 'bg-destructive text-destructive-foreground animate-pulse' 
                    : 'bg-gradient-primary text-primary-foreground hover:scale-105'
                  }
                `}
              >
                {isRecording ? (
                  <Square className="w-10 h-10" />
                ) : (
                  <Mic className="w-10 h-10" />
                )}
              </motion.button>
              <p className="text-sm text-muted-foreground">
                {isRecording ? 'Tap to stop recording' : 'Tap to record your question'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Recorded Audio Controls */}
            <AnimatePresence>
              {audioUrl && !isRecording && hasRecorded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Playback Controls */}
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" size="sm" onClick={playRecording} className="gap-2">
                      <Play className="w-4 h-4" />
                      Play Recording
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleRetry} className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Try Again
                    </Button>
                  </div>

                  {/* Feedback Message */}
                  {feedbackMessage && (
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
                  )}

                  {/* Show Answer Button */}
                  <div className="flex justify-center">
                    <Button
                      onClick={handleShowAnswer}
                      className="gap-2 bg-gradient-primary text-primary-foreground px-8"
                      size="lg"
                    >
                      <Volume2 className="w-5 h-5" />
                      Hear Marisol's Answer
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Answer Section - After Recording */}
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
              />
            </div>

            {/* Success Message */}
            <div className="p-6 text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <Sparkles className="w-5 h-5 text-green-600" />
                <span className="text-lg font-semibold text-green-700 dark:text-green-400">
                  Great job asking the question! 🎉
                </span>
              </div>

              <p className="text-muted-foreground">
                You asked: <span className="font-semibold text-foreground">"{currentSlide.questionToAsk}"</span>
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
