import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Play, RotateCcw, Volume2, Home, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageContext';
import { telephoneNumberInfo } from '@/data/module2Data';

interface TelephonePracticeProps {
  onComplete: () => void;
  userName?: string;
}

export const TelephonePractice: React.FC<TelephonePracticeProps> = ({ onComplete, userName = 'friend' }) => {
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
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

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <Home className="w-4 h-4" /> Dashboard
      </Button>

      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold">Telephone Number Practice</h3>
      </div>

      {showInfo && (
        <div className="bg-card rounded-2xl border p-6 space-y-4">
          <h4 className="font-semibold text-center">How to say your telephone number:</h4>
          <div className="text-center space-y-2">
            <p className="text-lg font-mono">{telephoneNumberInfo.example}</p>
            <Button variant="outline" size="sm" onClick={() => speakText(telephoneNumberInfo.spoken)} className="gap-2">
              <Volume2 className="w-4 h-4" /> Listen
            </Button>
            <p className="text-muted-foreground">{telephoneNumberInfo.spoken}</p>
            <p className="text-sm text-muted-foreground italic">{telephoneNumberInfo.tip}</p>
          </div>
          <Button onClick={() => setShowInfo(false)} className="w-full">Practice Now</Button>
        </div>
      )}

      {!showInfo && (
        <div className="bg-card rounded-2xl border p-6 space-y-6">
          <div className="text-center">
            <Button variant="outline" onClick={() => speakText("What's your telephone number?")} className="gap-2 mb-4">
              <Volume2 className="w-5 h-5" /> What's your telephone number?
            </Button>
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
              {isRecording ? 'Tap to stop' : 'Tap to record your number'}
            </p>
          </div>

          {hasRecorded && (
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={playRecording} className="gap-2">
                <Play className="w-4 h-4" /> Play Recording
              </Button>
              <Button variant="outline" onClick={() => { setHasRecorded(false); setAudioUrl(null); }} className="gap-2">
                <RotateCcw className="w-4 h-4" /> Try Again
              </Button>
            </div>
          )}

          {hasRecorded && (
            <Button onClick={onComplete} className="w-full gap-2">
              Continue <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TelephonePractice;
