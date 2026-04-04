import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Play, RotateCcw, Volume2, Home, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageContext';
import { telephoneNumberInfo } from '@/data/module2Data';
import { speakText } from '@/utils/speechUtils';

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

// Accepted answers for the telephone number
const acceptedPatterns = [
  'two one two five five five oh one eight two',
  'two one two five five five zero one eight two',
  '212 555 0182',
  '2125550182',
];

export const TelephonePractice: React.FC<TelephonePracticeProps> = ({ onComplete, userName = 'friend' }) => {
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const [recognizedNumber, setRecognizedNumber] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  const translations = telephoneTranslations[selectedLanguage] || telephoneTranslations.spanish;

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setRecognizedNumber(transcript);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  

  const validateRecording = (text: string): boolean => {
    const normalized = text.toLowerCase().replace(/[,.\-()]/g, '').replace(/\s+/g, ' ').trim();
    return acceptedPatterns.some(pattern => {
      const normalizedPattern = pattern.toLowerCase().replace(/\s+/g, ' ').trim();
      // Check if recognized text contains the pattern or is close enough
      return normalized.includes(normalizedPattern) || normalizedPattern.includes(normalized);
    });
  };

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      setRecognizedNumber(null);
      setFeedback(null);
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
          
          // Validate after a short delay to let speech recognition finish
          setTimeout(() => {
            if (recognizedNumber) {
              const isValid = validateRecording(recognizedNumber);
              if (isValid) {
                setFeedback({ type: 'success', message: `Great job, ${userName}! 🎉` });
              } else {
                setFeedback({ type: 'error', message: 'Try saying: "two-one-two, five-five-five, oh-one-eight-two"' });
              }
            } else {
              // If no recognition, still show success (recognition may not be available)
              setFeedback({ type: 'success', message: `Great job, ${userName}! 🎉` });
            }
          }, 500);
        }
        stream.getTracks().forEach(t => t.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);

      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (err) {
      console.error('Microphone error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const playRecording = () => {
    if (audioUrl) new Audio(audioUrl).play();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold">Telephone Number Practice</h3>
      </div>

      {!showPractice ? (
        <div className="bg-card rounded-2xl border p-6 space-y-6">
          <h4 className="font-semibold text-center text-lg">How to say your telephone number:</h4>
          
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-2xl font-mono font-bold">{telephoneNumberInfo.example}</p>
              <Button variant="outline" size="sm" onClick={() => speakText(telephoneNumberInfo.spoken)} className="gap-2">
                <Volume2 className="w-4 h-4" /> Listen
              </Button>
              <p className="text-muted-foreground italic">{telephoneNumberInfo.spoken}</p>
            </div>

            <div className="p-4 bg-primary/10 rounded-xl">
              <p className="font-medium text-primary text-center">
                💡 {telephoneNumberInfo.tip}
              </p>
              <p className="text-sm text-muted-foreground text-center mt-1" dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}>
                {translations.tip}
              </p>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Alternative:</p>
              <Button variant="ghost" size="sm" onClick={() => speakText(telephoneNumberInfo.alternativeSpoken)} className="gap-2">
                <Volume2 className="w-4 h-4" /> {telephoneNumberInfo.alternativeSpoken}
              </Button>
            </div>

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
            <p className="text-sm text-muted-foreground mb-2">Say this telephone number:</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="font-bold text-foreground text-2xl font-mono">212 555 0182</p>
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
              {/* Show recognized number */}
              {recognizedNumber && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-muted/50 rounded-xl text-center"
                >
                  <p className="text-sm text-muted-foreground">You said:</p>
                  <p className="text-xl font-mono font-bold text-foreground mt-1">
                    {recognizedNumber}
                  </p>
                </motion.div>
              )}

              {/* Feedback */}
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-center ${
                    feedback.type === 'success' 
                      ? 'bg-green-50 dark:bg-green-900/20' 
                      : 'bg-amber-50 dark:bg-amber-900/20'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <p className="text-green-700 dark:text-green-400 font-medium">{feedback.message}</p>
                    </div>
                  ) : (
                    <div className="flex items-start justify-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-amber-700 dark:text-amber-400 font-medium">{feedback.message}</p>
                    </div>
                  )}
                </motion.div>
              )}

              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={playRecording} className="gap-2">
                  <Play className="w-4 h-4" /> Play Recording
                </Button>
                <Button variant="outline" onClick={() => { setHasRecorded(false); setAudioUrl(null); setRecognizedNumber(null); setFeedback(null); }} className="gap-2">
                  <RotateCcw className="w-4 h-4" /> Try Again
                </Button>
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