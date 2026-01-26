import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Play, RotateCcw, Volume2, Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageContext';
import { telephoneNumberInfo } from '@/data/module2Data';

interface TelephonePracticeProps {
  onComplete: () => void;
  userName?: string;
}

const telephoneTranslations: Record<string, { tip: string; title: string }> = {
  arabic: { tip: 'يمكنك استخدام "oh" بدلاً من "zero"', title: 'تدريب على رقم الهاتف' },
  bengali: { tip: 'আপনি "zero" এর পরিবর্তে "oh" ব্যবহার করতে পারেন', title: 'টেলিফোন নম্বর অনুশীলন' },
  korean: { tip: '"zero" 대신 "oh"를 사용할 수 있습니다', title: '전화번호 연습' },
  spanish: { tip: 'Puedes usar "oh" en lugar de "zero"', title: 'Práctica de Número Telefónico' },
  turkish: { tip: '"zero" yerine "oh" kullanabilirsiniz', title: 'Telefon Numarası Pratik' },
};

export const TelephonePractice: React.FC<TelephonePracticeProps> = ({ onComplete, userName = 'friend' }) => {
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const translations = telephoneTranslations[selectedLanguage] || telephoneTranslations.spanish;

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
        
        if (recordingDuration >= 800) {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          setAudioUrl(URL.createObjectURL(blob));
          setHasRecorded(true);
        }
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

      {!showPractice ? (
        <div className="bg-card rounded-2xl border p-6 space-y-6">
          <h4 className="font-semibold text-center text-lg">How to say your telephone number:</h4>
          
          <div className="space-y-4">
            {/* Example with audio */}
            <div className="text-center space-y-2">
              <p className="text-2xl font-mono font-bold">{telephoneNumberInfo.example}</p>
              <Button variant="outline" size="sm" onClick={() => speakText(telephoneNumberInfo.spoken)} className="gap-2">
                <Volume2 className="w-4 h-4" /> Listen
              </Button>
              <p className="text-muted-foreground italic">{telephoneNumberInfo.spoken}</p>
            </div>

            {/* Key tip about "oh" for "zero" */}
            <div className="p-4 bg-primary/10 rounded-xl">
              <p className="font-medium text-primary text-center">
                💡 {telephoneNumberInfo.tip}
              </p>
              <p className="text-sm text-muted-foreground text-center mt-1" dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}>
                {translations.tip}
              </p>
            </div>

            {/* Alternative pronunciation */}
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Alternative:</p>
              <Button variant="ghost" size="sm" onClick={() => speakText(telephoneNumberInfo.alternativeSpoken)} className="gap-2">
                <Volume2 className="w-4 h-4" /> {telephoneNumberInfo.alternativeSpoken}
              </Button>
            </div>

            {/* Explanation */}
            <div className="p-4 bg-muted/50 rounded-xl text-sm space-y-2">
              <p className="font-medium">When saying telephone numbers:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Say each digit separately</li>
                <li>Pause slightly between groups</li>
                <li>Use "oh" instead of "zero" (it's more natural!)</li>
                <li>Area code: say all three digits together</li>
              </ul>
            </div>
          </div>

          <Button onClick={() => setShowPractice(true)} className="w-full">
            Practice Now
          </Button>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border p-6 space-y-6">
          <div className="text-center">
            <Button variant="outline" onClick={() => speakText("What's your telephone number?")} className="gap-2 mb-4">
              <Volume2 className="w-5 h-5" /> What's your telephone number?
            </Button>
          </div>

          <div className="text-center p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">Say your telephone number:</p>
            <p className="font-medium text-foreground">"My telephone number is..."</p>
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
              <Button onClick={onComplete} className="w-full gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TelephonePractice;
