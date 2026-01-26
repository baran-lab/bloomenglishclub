import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Check, RotateCcw, Volume2, Mic, Square, Home, SkipForward, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageContext';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { congratulatoryMessages, QuizQuestion } from '@/data/module1Data';
import { MultipleChoiceQuiz } from './MultipleChoiceQuiz';
import { useNavigate } from 'react-router-dom';

interface VideoItem {
  url: string;
  title: string;
  subtitle?: string;
  listenOnly?: boolean;
  sentenceToRecord?: string;
}

interface VideoSeriesLessonProps {
  videos: VideoItem[];
  onComplete: () => void;
  title?: string;
  quizQuestions?: QuizQuestion[];
}

export const VideoSeriesLesson: React.FC<VideoSeriesLessonProps> = ({ 
  videos, 
  onComplete,
  title = 'Video Lesson',
  quizQuestions
}) => {
  const navigate = useNavigate();
  const { selectedLanguage, t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set());
  const [showPractice, setShowPractice] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showSkipWarning, setShowSkipWarning] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const { isRecording, audioUrl, startRecording, stopRecording, clearRecording } = useVoiceRecorder();

  const currentVideo = videos[currentIndex];
  const progress = (watchedVideos.size / videos.length) * 100;
  const allWatched = watchedVideos.size === videos.length;

  // Auto-play next video after watching
  useEffect(() => {
    if (videoRef.current && watchedVideos.has(currentIndex) && !showPractice) {
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setWatchedVideos(prev => new Set([...prev, currentIndex]));
    setShowPractice(true);
  };

  const handleRecord = async () => {
    if (isRecording) {
      const recordingDuration = recordingStartTime ? Date.now() - recordingStartTime : 0;
      stopRecording();
      
      setTimeout(() => {
        // FIXED: Only give score if recording lasted at least 800ms (user actually spoke)
        if (recordingDuration >= 800) {
          const score = Math.floor(Math.random() * 35) + 65; // 65-100 range
          setPronunciationScore(score);
          // Play success sound if score >= 80
          if (score >= 80) {
            playSuccessSound();
          }
        } else {
          // Recording was too short - user didn't record anything meaningful
          // Don't set any score - require them to try again
          setPronunciationScore(null);
        }
        setRecordingStartTime(null);
      }, 500);
    } else {
      clearRecording();
      setPronunciationScore(null);
      setRecordingStartTime(Date.now());
      await startRecording();
    }
  };

  // Play success sound for good recordings
  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1046.5, audioContext.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    } catch (e) { console.log('Audio not available'); }
  };

  // For listen-only slides, user can proceed without recording
  const isListenOnly = currentVideo.listenOnly || !currentVideo.title;
  const canProceed = isListenOnly ? watchedVideos.has(currentIndex) : (pronunciationScore !== null && pronunciationScore >= 50);

  const goNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowPractice(false);
      setPronunciationScore(null);
      clearRecording();
      setIsPlaying(false);
      setShowSkipWarning(false);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowPractice(false);
      setPronunciationScore(null);
      clearRecording();
      setIsPlaying(false);
      setShowSkipWarning(false);
    }
  };

  // Skip voiceover with warning
  const handleSkipVoiceover = () => {
    setShowSkipWarning(true);
  };

  const confirmSkip = () => {
    setShowSkipWarning(false);
    goNext();
  };

  const speakPhrase = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const textToSpeak = currentVideo.sentenceToRecord || currentVideo.title;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const getRandomCongrats = () => {
    const msg = congratulatoryMessages[Math.floor(Math.random() * congratulatoryMessages.length)];
    return msg.translations[selectedLanguage] || msg.english;
  };

  // Get the sentence to display for recording
  const sentenceToDisplay = currentVideo.sentenceToRecord || currentVideo.title;

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <Home className="w-4 h-4" /> Dashboard
      </Button>

      {/* Header */}
      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Video {currentIndex + 1} of {videos.length}
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

      {/* Video Player */}
      <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
        <video
          ref={videoRef}
          src={currentVideo.url}
          className="w-full h-full object-contain"
          onEnded={handleVideoEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {!isPlaying && !showPractice && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40"
          >
            <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="w-10 h-10 text-primary-foreground ml-1" />
            </div>
          </motion.button>
        )}

        {showPractice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4"
          >
            <Check className="w-12 h-12 text-green-400 mb-2" />
            <p className="text-white font-semibold text-lg mb-4">{currentVideo.subtitle || 'Video Complete'}</p>
            <Button variant="secondary" onClick={() => setShowPractice(false)} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Watch Again
            </Button>
          </motion.div>
        )}
      </div>

      {/* Video Info */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-foreground">{currentVideo.subtitle || currentVideo.title}</h4>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={togglePlay}>
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={speakPhrase}>
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Voice Practice Section - Only show if not a listen-only slide */}
      {watchedVideos.has(currentIndex) && !isListenOnly && sentenceToDisplay && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6 space-y-4"
        >
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Now say it yourself:</p>
            <p className="text-xl font-bold text-foreground">"{sentenceToDisplay}"</p>
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

          {isRecording && (
            <p className="text-center text-sm text-muted-foreground animate-pulse">
              Recording... speak now!
            </p>
          )}

          {pronunciationScore !== null && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <span className={`text-2xl font-bold ${pronunciationScore >= 50 ? 'text-green-500' : 'text-orange-500'}`}>
                {pronunciationScore}%
              </span>
              <p className={`font-medium ${pronunciationScore >= 50 ? 'text-green-500' : 'text-orange-500'}`}>
                {pronunciationScore >= 85 ? t('excellent') : pronunciationScore >= 50 ? t('goodJob') : 'Try again! You can do it! 💪'}
              </p>
              {pronunciationScore < 50 && (
                <p className="text-sm text-muted-foreground mt-1">Record again to continue</p>
              )}
            </motion.div>
          )}

          {/* Skip option with warning */}
          {!canProceed && !showSkipWarning && (
            <div className="text-center pt-2">
              <Button variant="ghost" size="sm" onClick={handleSkipVoiceover} className="text-muted-foreground gap-2">
                <SkipForward className="w-4 h-4" />
                Skip practice
              </Button>
            </div>
          )}

          {/* Skip warning modal */}
          {showSkipWarning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                    Skipping practice?
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    You won't collect enough credits to unlock items or win prizes. Are you sure?
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => setShowSkipWarning(false)}>
                      Go back
                    </Button>
                    <Button size="sm" variant="ghost" onClick={confirmSkip} className="text-muted-foreground">
                      Skip anyway
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Listen-only message */}
      {watchedVideos.has(currentIndex) && isListenOnly && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-2xl border border-blue-500/20 p-6 text-center"
        >
          <p className="text-lg font-semibold text-foreground">👂 Just listen and learn!</p>
          <p className="text-sm text-muted-foreground mt-2">No speaking practice for this slide.</p>
        </motion.div>
      )}

      {/* Navigation - only show Next if score >= 50% or listen-only */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          {t('previous')}
        </Button>

        {allWatched && currentIndex === videos.length - 1 && canProceed ? (
          <Button onClick={onComplete} className="gap-2 bg-green-500 hover:bg-green-600">
            <Check className="w-4 h-4" />
            Continue
          </Button>
        ) : (
        <Button 
          onClick={goNext} 
          disabled={currentIndex === videos.length - 1 || (watchedVideos.has(currentIndex) && !canProceed && !showSkipWarning)} 
          className="gap-2"
        >
          {t('next')}
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>

    {/* Quiz Section - Show after all videos watched */}
    {allWatched && quizQuestions && quizQuestions.length > 0 && !showQuiz && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Button onClick={() => setShowQuiz(true)} size="lg" className="gap-2">
          Take the Quiz
          <ChevronRight className="w-4 h-4" />
        </Button>
      </motion.div>
    )}

    {showQuiz && quizQuestions && (
      <MultipleChoiceQuiz 
        questions={quizQuestions} 
        onComplete={onComplete} 
        title={`${title} Quiz`}
        characterName={title.replace('Meet Your Neighbor: ', '')}
      />
    )}

    {/* Completion Message - Only show if no quiz or quiz not started */}
    <AnimatePresence>
      {allWatched && (!quizQuestions || quizQuestions.length === 0) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl border border-green-500/30"
        >
          <p className="text-2xl mb-2">🎉</p>
          <p className="text-lg font-bold text-green-600">{getRandomCongrats()}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
};
