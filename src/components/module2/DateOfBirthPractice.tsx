import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Play, RotateCcw, Volume2, Home, ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface DateOfBirthPracticeProps {
  onComplete: () => void;
  userName?: string;
}

export const DateOfBirthPractice: React.FC<DateOfBirthPracticeProps> = ({ onComplete, userName = 'friend' }) => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setRecordingStartTime(Date.now());
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const recordingDuration = recordingStartTime ? Date.now() - recordingStartTime : 0;
        
        // Check if recording was long enough
        if (recordingDuration < 800) {
          setFeedback("Recording too short. Please try again and say your complete date of birth.");
          setHasRecorded(false);
        } else {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          setAudioUrl(URL.createObjectURL(blob));
          setHasRecorded(true);
          setFeedback(null);
        }
        stream.getTracks().forEach(t => t.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setFeedback(null);
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

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <Home className="w-4 h-4" /> Dashboard
      </Button>

      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold">Date of Birth Practice</h3>
        <p className="text-sm text-muted-foreground mt-1">Say your date of birth using ordinal numbers for the day</p>
      </div>

      <div className="bg-card rounded-2xl border p-6 space-y-6">
        {/* Instruction */}
        <div className="p-4 bg-amber-500/10 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                Use ordinal numbers for the day!
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Example: "January <strong>fifteenth</strong>, nineteen ninety" (not "January 15")
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={() => speakText("What's your date of birth?")} className="gap-2 mb-4">
            <Volume2 className="w-5 h-5" /> What's your date of birth?
          </Button>
        </div>

        <div className="text-center p-4 bg-muted/50 rounded-xl">
          <p className="text-sm text-muted-foreground mb-2">Say your date of birth:</p>
          <p className="font-medium text-foreground">"My date of birth is..."</p>
        </div>

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
            {isRecording ? 'Tap to stop' : 'Tap to record'}
          </p>
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-amber-500/10 rounded-xl text-center"
          >
            <p className="text-amber-700 dark:text-amber-400">{feedback}</p>
          </motion.div>
        )}

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
              <p className="text-sm text-muted-foreground mt-1">
                Listen to your recording to check you used ordinal numbers correctly.
              </p>
            </div>
            <Button onClick={onComplete} className="w-full gap-2">
              Continue <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateOfBirthPractice;
