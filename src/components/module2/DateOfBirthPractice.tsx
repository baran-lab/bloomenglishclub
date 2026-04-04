import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Play, RotateCcw, Volume2, Home, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageContext';

interface DateOfBirthPracticeProps {
  onComplete: () => void;
  userName?: string;
}

const ordinalNumbers = [
  'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
  'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth',
  'eighteenth', 'nineteenth', 'twentieth', 'twenty-first', 'twenty-second', 'twenty-third',
  'twenty-fourth', 'twenty-fifth', 'twenty-sixth', 'twenty-seventh', 'twenty-eighth',
  'twenty-ninth', 'thirtieth', 'thirty-first',
];

const dobTranslations: Record<string, Record<string, string>> = {
  arabic: {
    title: 'تدريب على تاريخ الميلاد',
    subtitle: 'قل تاريخ ميلادك باستخدام الأعداد الترتيبية لليوم',
    languageUse: '🗣️ كيف تقول تاريخ ميلادك',
    correct: '✅ صحيح:',
    incorrect: '❌ خطأ:',
    useOrdinal: 'استخدم دائمًا الأعداد الترتيبية لليوم',
    sayYourDob: 'قل تاريخ ميلادك:',
    prompt: '"إنه ……."',
    tapToRecord: 'اضغط للتسجيل',
    tapToStop: 'اضغط للإيقاف',
    tooShort: 'التسجيل قصير جدًا. حاول مرة أخرى.',
    greatJob: 'أحسنت!',
    listenCheck: 'استمع لتسجيلك للتأكد.',
    continue: 'متابعة',
  },
  bengali: {
    title: 'জন্ম তারিখ অনুশীলন',
    subtitle: 'দিনের জন্য ক্রমবাচক সংখ্যা ব্যবহার করে আপনার জন্ম তারিখ বলুন',
    languageUse: '🗣️ কিভাবে আপনার জন্ম তারিখ বলবেন',
    correct: '✅ সঠিক:',
    incorrect: '❌ ভুল:',
    useOrdinal: 'সবসময় দিনের জন্য ক্রমবাচক সংখ্যা ব্যবহার করুন',
    sayYourDob: 'আপনার জন্ম তারিখ বলুন:',
    prompt: '"এটা ……."',
    tapToRecord: 'রেকর্ড করতে ট্যাপ করুন',
    tapToStop: 'থামাতে ট্যাপ করুন',
    tooShort: 'রেকর্ডিং খুব ছোট। আবার চেষ্টা করুন।',
    greatJob: 'দারুণ!',
    listenCheck: 'আপনার রেকর্ডিং শুনুন।',
    continue: 'পরবর্তী',
  },
  korean: {
    title: '생년월일 연습',
    subtitle: '서수를 사용하여 생년월일을 말하세요',
    languageUse: '🗣️ 생년월일 말하는 법',
    correct: '✅ 맞음:',
    incorrect: '❌ 틀림:',
    useOrdinal: '항상 날짜에 서수를 사용하세요',
    sayYourDob: '생년월일을 말하세요:',
    prompt: '"그것은 ……."',
    tapToRecord: '녹음하려면 탭하세요',
    tapToStop: '중지하려면 탭하세요',
    tooShort: '녹음이 너무 짧습니다. 다시 시도하세요.',
    greatJob: '잘했어요!',
    listenCheck: '녹음을 들어보세요.',
    continue: '계속',
  },
  spanish: {
    title: 'Práctica de Fecha de Nacimiento',
    subtitle: 'Di tu fecha de nacimiento usando números ordinales para el día',
    languageUse: '🗣️ Cómo decir tu fecha de nacimiento',
    correct: '✅ Correcto:',
    incorrect: '❌ Incorrecto:',
    useOrdinal: 'Siempre usa números ordinales para el día',
    sayYourDob: 'Di tu fecha de nacimiento:',
    prompt: '"Es ……."',
    tapToRecord: 'Toca para grabar',
    tapToStop: 'Toca para detener',
    tooShort: 'Grabación muy corta. Intenta de nuevo.',
    greatJob: '¡Buen trabajo!',
    listenCheck: 'Escucha tu grabación.',
    continue: 'Continuar',
  },
  turkish: {
    title: 'Doğum Tarihi Pratiği',
    subtitle: 'Gün için sıra sayılarını kullanarak doğum tarihinizi söyleyin',
    languageUse: '🗣️ Doğum tarihinizi nasıl söylersiniz',
    correct: '✅ Doğru:',
    incorrect: '❌ Yanlış:',
    useOrdinal: 'Gün için her zaman sıra sayılarını kullanın',
    sayYourDob: 'Doğum tarihinizi söyleyin:',
    prompt: '"O ……."',
    tapToRecord: 'Kaydetmek için dokunun',
    tapToStop: 'Durdurmak için dokunun',
    tooShort: 'Kayıt çok kısa. Tekrar deneyin.',
    greatJob: 'Harika!',
    listenCheck: 'Kaydınızı dinleyin.',
    continue: 'Devam',
  },
};

export const DateOfBirthPractice: React.FC<DateOfBirthPracticeProps> = ({ onComplete, userName = 'friend' }) => {
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();
  const t = dobTranslations[selectedLanguage] || dobTranslations.spanish;
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const [recognizedText, setRecognizedText] = useState<string | null>(null);
  const [ordinalFeedback, setOrdinalFeedback] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setRecognizedText(transcript);
      };
      
      recognitionRef.current.onerror = () => {};
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  const checkForOrdinalNumbers = (text: string): boolean => {
    const normalized = text.toLowerCase();
    // Check if any ordinal number is present
    return ordinalNumbers.some(ord => normalized.includes(ord));
  };

  

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      setRecognizedText(null);
      setOrdinalFeedback(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setRecordingStartTime(Date.now());
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const recordingDuration = recordingStartTime ? Date.now() - recordingStartTime : 0;
        
        if (recordingDuration < 800) {
          setFeedback(t.tooShort);
          setHasRecorded(false);
        } else {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          setAudioUrl(URL.createObjectURL(blob));
          setHasRecorded(true);
          setFeedback(null);
          
          // Check ordinal usage after a delay
          setTimeout(() => {
            if (recognizedText) {
              const hasOrdinal = checkForOrdinalNumbers(recognizedText);
              if (!hasOrdinal) {
                setOrdinalFeedback('Remember to use ordinal numbers for the day! Say "fifteenth" not "fifteen", "twenty-first" not "twenty-one".');
              } else {
                setOrdinalFeedback(null);
              }
            }
          }, 500);
        }
        stream.getTracks().forEach(t => t.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setFeedback(null);

      if (recognitionRef.current) {
        try { recognitionRef.current.start(); } catch (e) {}
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
      try { recognitionRef.current.stop(); } catch (e) {}
    }
  };

  const playRecording = () => {
    if (audioUrl) new Audio(audioUrl).play();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold">Date of Birth Practice</h3>
        <p className="text-sm text-muted-foreground mt-1">{t.subtitle}</p>
      </div>

      <div className="bg-card rounded-2xl border p-6 space-y-6">
        {/* Language Use Explanation */}
        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">📅</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                {t.languageUse}
              </p>
              <div className="text-xs text-muted-foreground mt-2 space-y-1">
                <p>{t.correct} "January <em>fifteenth</em>, nineteen ninety"</p>
                <p>{t.incorrect} "January fifteen, nineteen ninety"</p>
                <p className="mt-2">{t.useOrdinal}:</p>
                <ul className="list-disc list-inside pl-2">
                  <li>1st = first, 2nd = second, 3rd = third</li>
                  <li>4th = fourth, 5th = fifth, etc.</li>
                  <li>21st = twenty-first, 22nd = twenty-second, etc.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

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
          <p className="text-sm text-muted-foreground mb-2">{t.sayYourDob}</p>
          <p className="font-medium text-foreground">"It's ……."</p>
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
            {isRecording ? t.tapToStop : t.tapToRecord}
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
            {/* Show what the user said */}
            {recognizedText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-muted/50 rounded-xl text-center"
              >
                <p className="text-sm text-muted-foreground">You said:</p>
                <p className="text-lg font-medium text-foreground mt-1">"{recognizedText}"</p>
              </motion.div>
            )}

            {/* Ordinal number feedback */}
            {ordinalFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-300 dark:border-amber-700"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700 dark:text-amber-400">{ordinalFeedback}</p>
                </div>
              </motion.div>
            )}

            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={playRecording} className="gap-2">
                <Play className="w-4 h-4" /> Play Recording
              </Button>
              <Button variant="outline" onClick={() => { setHasRecorded(false); setAudioUrl(null); setRecognizedText(null); setOrdinalFeedback(null); }} className="gap-2">
                <RotateCcw className="w-4 h-4" /> Try Again
              </Button>
            </div>

            {!ordinalFeedback && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <p className="text-green-700 dark:text-green-400 font-medium">{t.greatJob} {userName}! 🎉</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{t.listenCheck}</p>
              </div>
            )}

            <Button onClick={onComplete} className="w-full gap-2">
              {t.continue} <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateOfBirthPractice;