import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Lesson } from '@/data/module1Data';

interface VideoLessonProps {
  lesson: Lesson;
  onComplete: () => void;
  onNext?: () => void;
}

export const VideoLesson: React.FC<VideoLessonProps> = ({ lesson, onComplete, onNext }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percent);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
    onComplete();
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setHasEnded(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Video container */}
      <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
        <video preload="metadata"
          ref={videoRef}
          src={lesson.videoUrl}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Play overlay */}
        {!isPlaying && !hasEnded && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30"
          >
            <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="w-10 h-10 text-primary-foreground ml-1" />
            </div>
          </motion.button>
        )}

        {/* Completion overlay */}
        {hasEnded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 gap-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center"
            >
              <Check className="w-8 h-8 text-white" />
            </motion.div>
            <p className="text-white font-semibold text-lg">Video Complete!</p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={restartVideo} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Watch Again
              </Button>
              {onNext && (
                <Button onClick={onNext} className="gap-2">
                  Next Lesson
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{lesson.title}</h3>
          <p className="text-sm text-muted-foreground">{lesson.description}</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={restartVideo}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
