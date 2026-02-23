import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Home, Mic, Square, Play, RotateCcw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface VideoItem {
  url: string;
  title: string;
  subtitle?: string;
}

interface AddressVideoLessonProps {
  videos: VideoItem[];
  onComplete: () => void;
  title?: string;
  userName?: string;
}

// Address component labels for validation
const ADDRESS_PARTS = [
  { id: 'number', label: 'Number', required: true },
  { id: 'street', label: 'Street Name', required: true },
  { id: 'apartment', label: 'Apartment (optional)', required: false },
  { id: 'city', label: 'City', required: true },
  { id: 'state', label: 'State', required: true },
  { id: 'zip', label: 'Zip Code', required: true },
];

export const AddressVideoLesson: React.FC<AddressVideoLessonProps> = ({ 
  videos, 
  onComplete,
  title = 'How to Say Your Address',
  userName = 'friend'
}) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set());
  const [showRecording, setShowRecording] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [addressParts, setAddressParts] = useState<Record<string, string>>({});
  const [addressFeedback, setAddressFeedback] = useState<string | null>(null);
  const [addressValid, setAddressValid] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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
    
    // If this was the last video, show recording section
    if (currentIndex === videos.length - 1) {
      setShowRecording(true);
    } else {
      // Auto-advance to next video
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

  const handleAddressPartChange = (partId: string, value: string) => {
    setAddressParts(prev => ({ ...prev, [partId]: value }));
    setAddressFeedback(null);
  };

  const validateAddress = () => {
    const missing: string[] = [];
    ADDRESS_PARTS.forEach(part => {
      if (part.required && (!addressParts[part.id] || addressParts[part.id].trim() === '')) {
        missing.push(part.label);
      }
    });
    
    if (missing.length > 0) {
      setAddressFeedback(`Please add: ${missing.join(', ')}`);
      setAddressValid(false);
      return false;
    }
    
    setAddressFeedback(null);
    setAddressValid(true);
    return true;
  };

  const startRecording = async () => {
    if (!validateAddress()) return;
    
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
        setHasRecorded(true);
        stream.getTracks().forEach(t => t.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (audioUrl) new Audio(audioUrl).play();
  };

  // Build the full address string for display
  const getFullAddress = () => {
    const parts: string[] = [];
    if (addressParts.number) parts.push(addressParts.number);
    if (addressParts.street) parts.push(addressParts.street);
    if (addressParts.apartment) parts.push(addressParts.apartment);
    if (addressParts.city) parts.push(addressParts.city);
    if (addressParts.state) parts.push(addressParts.state);
    if (addressParts.zip) parts.push(addressParts.zip);
    return parts.join(', ');
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
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
        />
      </div>

      {!showRecording ? (
        <>
          {/* Video Player - Auto plays */}
          <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
            <video
              ref={videoRef}
              src={currentVideo.url}
              className="w-full h-full object-contain"
              onEnded={handleVideoEnd}
              autoPlay
              playsInline
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
            <Button onClick={goNext} disabled={currentIndex === videos.length - 1} className="gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </>
      ) : (
        /* Recording Section - After all videos watched */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6 space-y-4">
            <div className="text-center">
              <h4 className="font-fredoka text-lg font-bold text-foreground mb-2">
                Now say your address! 🏠
              </h4>
              <p className="text-sm text-muted-foreground">
                Fill in each part of your address, then record yourself saying it.
              </p>
            </div>

            {/* Address Parts Form */}
            <div className="space-y-3">
              {ADDRESS_PARTS.map((part) => (
                <div key={part.id} className="flex items-center gap-3">
                  <label className="text-sm font-medium text-foreground w-32 flex-shrink-0">
                    {part.label}
                  </label>
                  <input
                    type="text"
                    value={addressParts[part.id] || ''}
                    onChange={(e) => handleAddressPartChange(part.id, e.target.value)}
                    placeholder={part.required ? 'Required' : 'Optional'}
                    className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              ))}
            </div>

            {/* Address feedback */}
            {addressFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-amber-500/10 rounded-xl"
              >
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-400">{addressFeedback}</p>
              </motion.div>
            )}

            {/* Show composed address */}
            {addressValid && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-muted rounded-xl text-center"
              >
                <p className="text-xs text-muted-foreground mb-1">Your address:</p>
                <p className="font-medium text-foreground text-sm">{getFullAddress()}</p>
              </motion.div>
            )}

            <div className="flex flex-col items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  isRecording ? 'bg-destructive text-white animate-pulse' : 'bg-primary text-white'
                }`}
              >
                {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </motion.button>
              <p className="text-sm text-muted-foreground">
                {isRecording ? 'Recording... Tap to stop' : 'Tap to record your address'}
              </p>
            </div>

            {hasRecorded && (
              <div className="space-y-4">
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={playRecording} className="gap-2">
                    <Play className="w-4 h-4" /> Play Recording
                  </Button>
                  <Button variant="outline" onClick={() => { setHasRecorded(false); setAudioUrl(null); }} className="gap-2">
                    <RotateCcw className="w-4 h-4" /> Try Again
                  </Button>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                  <p className="text-green-700 dark:text-green-400 font-medium">Great job, {userName}! 🎉</p>
                </div>
              </div>
            )}
          </div>

          {hasRecorded && (
            <Button onClick={onComplete} className="w-full gap-2 bg-green-500 hover:bg-green-600">
              <Check className="w-4 h-4" />
              Complete Lesson
            </Button>
          )}
        </motion.div>
      )}

      {/* Completion celebration when all videos watched */}
      <AnimatePresence>
        {allWatched && !showRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl border border-green-500/30"
          >
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-lg font-bold text-green-600">All videos complete!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};