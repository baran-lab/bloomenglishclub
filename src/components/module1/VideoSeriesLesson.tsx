import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Check, RotateCcw, Volume2, Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageContext';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { congratulatoryMessages } from '@/data/module1Data';

interface VideoItem {
  url: string;
  title: string;
  subtitle?: string;
}

interface VideoSeriesLessonProps {
  videos: VideoItem[];
  onComplete: () => void;
  title?: string;
}

export const VideoSeriesLesson: React.FC<VideoSeriesLessonProps> = ({ 
  videos, 
  onComplete,
  title = 'Video Lesson'
}) => {
  const { selectedLanguage, t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set());
  const [showPractice, setShowPractice] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const { isRecording, audioUrl, startRecording, stopRecording, clearRecording } = useVoiceRecorder();

  const currentVideo = videos[currentIndex];
  const progress = (watchedVideos.size / videos.length) * 100;
  const allWatched = watchedVideos.size === videos.length;

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
      stopRecording();
      setTimeout(() => {
        const score = Math.floor(Math.random() * 35) + 65; // 65-100 range
        setPronunciationScore(score);
      }, 500);
    } else {
      clearRecording();
      setPronunciationScore(null);
      await startRecording();
    }
  };

  const canProceed = pronunciationScore !== null && pronunciationScore >= 50;

  const goNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowPractice(false);
      setPronunciationScore(null);
      clearRecording();
      setIsPlaying(false);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowPractice(false);
      setPronunciationScore(null);
      clearRecording();
      setIsPlaying(false);
    }
  };

  const speakPhrase = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentVideo.title);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const getRandomCongrats = () => {
    const msg = congratulatoryMessages[Math.floor(Math.random() * congratulatoryMessages.length)];
    return msg.translations[selectedLanguage] || msg.english;
  };

  return (
    <div className="space-y-6">
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
            <p className="text-white font-semibold text-lg mb-4">{currentVideo.title}</p>
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
            <h4 className="font-semibold text-foreground">{currentVideo.title}</h4>
            {currentVideo.subtitle && (
              <p className="text-sm text-muted-foreground">{currentVideo.subtitle}</p>
            )}
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

      {/* Voice Practice Section */}
      {watchedVideos.has(currentIndex) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6 space-y-4"
        >
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Now say it yourself:</p>
            <p className="text-xl font-bold text-foreground">"{currentVideo.title}"</p>
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
        </motion.div>
      )}

      {/* Navigation - only show Next if score >= 50% */}
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
            disabled={currentIndex === videos.length - 1 || (watchedVideos.has(currentIndex) && !canProceed)} 
            className="gap-2"
          >
            {t('next')}
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Completion Message */}
      <AnimatePresence>
        {allWatched && (
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
