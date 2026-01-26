import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface VideoItem {
  url: string;
  title: string;
  subtitle?: string;
}

interface HebaListeningLessonProps {
  videos: VideoItem[];
  onComplete: () => void;
  title?: string;
}

export const HebaListeningLesson: React.FC<HebaListeningLessonProps> = ({ 
  videos, 
  onComplete,
  title = 'Listening Practice'
}) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set());

  const currentVideo = videos[currentIndex];
  const progress = (watchedVideos.size / videos.length) * 100;
  const allWatched = watchedVideos.size === videos.length;

  // Auto-play video when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  const handleVideoEnd = () => {
    setWatchedVideos(prev => new Set([...prev, currentIndex]));
    
    // Auto-advance to next video if not the last one
    if (currentIndex < videos.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 500);
    }
  };

  const goNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

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
        <p className="text-xs text-muted-foreground mt-1">
          👂 Just listen and learn - no speaking practice
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Video Player - Auto plays */}
      <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
        <video
          ref={videoRef}
          src={currentVideo.url}
          className="w-full h-full object-contain"
          onEnded={handleVideoEnd}
          autoPlay
          playsInline
          controls
        />
      </div>

      {/* Video subtitle */}
      {currentVideo.subtitle && (
        <div className="text-center p-3 bg-muted rounded-xl">
          <p className="text-sm text-muted-foreground">{currentVideo.subtitle}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {allWatched && currentIndex === videos.length - 1 ? (
          <Button onClick={onComplete} className="gap-2 bg-green-500 hover:bg-green-600">
            <Check className="w-4 h-4" />
            Complete
          </Button>
        ) : (
          <Button onClick={goNext} disabled={currentIndex === videos.length - 1} className="gap-2">
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Completion celebration */}
      <AnimatePresence>
        {allWatched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl border border-green-500/30"
          >
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-lg font-bold text-green-600">Great listening practice!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
