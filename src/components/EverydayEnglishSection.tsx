import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Play, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EverydayVideo {
  id: string;
  title: string;
  videoUrl: string;
}

const everydayVideos: EverydayVideo[] = [
  {
    id: 'everyday1',
    title: 'Everyday English 1',
    videoUrl: '/videos/everyday/M1_Everyday_English_1.mp4',
  },
];

export function EverydayEnglishSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideoData = everydayVideos.find(v => v.id === activeVideo);

  const handleVideoEnd = () => {
    if (activeVideo) {
      setWatchedVideos(prev => new Set(prev).add(activeVideo));
    }
  };

  if (activeVideo && currentVideoData) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-5 shadow-soft">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => setActiveVideo(null)} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h3 className="font-fredoka text-lg font-semibold">{currentVideoData.title}</h3>
        </div>
        <div className="rounded-xl overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={currentVideoData.videoUrl}
            controls
            autoPlay
            className="w-full aspect-video"
            onEnded={handleVideoEnd}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-2xl p-5 shadow-soft"
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className="font-fredoka text-lg font-semibold">Everyday English</h3>
      </div>

      <div className="space-y-2">
        {everydayVideos.map((video, index) => {
          const isWatched = watchedVideos.has(video.id);
          return (
            <motion.button
              key={video.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              onClick={() => setActiveVideo(video.id)}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-primary/10 transition-all text-left border border-border"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isWatched ? 'bg-green-100' : 'bg-primary/10'}`}>
                  {isWatched ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Play className="w-4 h-4 text-primary" />
                  )}
                </div>
                <p className="text-sm font-medium text-foreground">{index + 1}. {video.title}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
