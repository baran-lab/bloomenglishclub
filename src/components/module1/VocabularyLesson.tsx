import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronLeft, ChevronRight, Eye, EyeOff, CheckCircle2, Mic, Square, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VocabularyItem, encouragingMessages, congratulatoryMessages, SupportedLanguage } from '@/data/module1Data';
import { useLanguage } from '@/components/LanguageContext';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';

interface VocabularyLessonProps {
  vocabulary: VocabularyItem[];
  onComplete: () => void;
  title?: string;
}

export const VocabularyLesson: React.FC<VocabularyLessonProps> = ({ 
  vocabulary, 
  onComplete,
  title = 'Vocabulary'
}) => {
  const { selectedLanguage, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedWords, setCompletedWords] = useState<Set<string>>(new Set());
  const [showTranslation, setShowTranslation] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [activatedWords, setActivatedWords] = useState<Set<number>>(new Set());
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const { isRecording, audioUrl, startRecording, stopRecording, clearRecording } = useVoiceRecorder();
  const recognitionRef = useRef<any>(null);
  const [recognizedText, setRecognizedText] = useState('');
  const recordingStartTimeRef = useRef<number | null>(null);

  const currentWord = vocabulary?.[currentIndex];
  const progress = vocabulary?.length > 0 ? (completedWords.size / vocabulary.length) * 100 : 0;
  const allCompleted = vocabulary?.length > 0 && completedWords.size === vocabulary.length;

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
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setRecognizedText(transcript);
      };
      
      recognitionRef.current.onerror = () => {};
    }
  }, []);

  // Safety check
  if (!vocabulary || vocabulary.length === 0 || !currentWord) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No vocabulary items available.</p>
        <Button onClick={onComplete} className="mt-4">Continue</Button>
      </div>
    );
  }

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentWord.english);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  // Auto-play vocabulary when word changes
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const timer = setTimeout(() => {
      speakWord();
    }, 400);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Word activation: check which words in the phrase were recognized
  const getWordParts = () => {
    return currentWord.english.replace(/[?.!,]/g, '').split(/\s+/);
  };

  const checkWordActivation = useCallback((recognized: string) => {
    const normalizedRecognized = recognized.toLowerCase().replace(/[?.!,]/g, '');
    const recognizedWords = normalizedRecognized.split(/\s+/);
    const wordParts = currentWord.english.replace(/[?.!,]/g, '').split(/\s+/);
    
    const activated = new Set<number>();
    wordParts.forEach((word, idx) => {
      const normalizedWord = word.toLowerCase();
      if (recognizedWords.some(rw => rw === normalizedWord || rw.includes(normalizedWord) || normalizedWord.includes(rw))) {
        activated.add(idx);
      }
    });
    setActivatedWords(activated);
    return activated;
  }, [currentWord]);

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
      
      // Stop speech recognition
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      
      const recordingDuration = recordingStartTimeRef.current ? Date.now() - recordingStartTimeRef.current : 0;
      recordingStartTimeRef.current = null;
      
      setTimeout(() => {
        if (recordingDuration < 800) {
          setPronunciationScore(null);
          setFeedbackMessage('');
          return;
        }
        
        const normalized = recognizedText.toLowerCase().replace(/[?.!,]/g, '').trim();
        const wordParts = currentWord.english.replace(/[?.!,]/g, '').toLowerCase().split(/\s+/);
        const recognizedWords = normalized.split(/\s+/);
        
        // Check word activation
        const activated = checkWordActivation(recognizedText);
        
        // Check completeness
        const allWordsPresent = wordParts.every(word => 
          recognizedWords.some(rw => rw === word || rw.includes(word) || word.includes(rw))
        );
        
        if (allWordsPresent) {
          const score = Math.floor(Math.random() * 15) + 85; // 85-100
          setPronunciationScore(score);
          setFeedbackMessage('');
          setCompletedWords(prev => new Set([...prev, currentWord.id]));
        } else {
          // Incomplete - grade at 70% with encouraging comment
          setPronunciationScore(70);
          const encouragements = [
            "Almost there! Try saying the complete word. 💪",
            "Good effort! Make sure to say the full word. 🌟",
            "You're close! Try to pronounce all parts clearly. ✨",
            "Nice try! Listen again and repeat the whole word. 🎯",
          ];
          setFeedbackMessage(encouragements[Math.floor(Math.random() * encouragements.length)]);
          setCompletedWords(prev => new Set([...prev, currentWord.id]));
        }
      }, 800);
    } else {
      clearRecording();
      setPronunciationScore(null);
      setFeedbackMessage('');
      setRecognizedText('');
      setActivatedWords(new Set());
      recordingStartTimeRef.current = Date.now();
      await startRecording();
      
      // Start speech recognition
      if (recognitionRef.current) {
        try { recognitionRef.current.start(); } catch (e) {}
      }
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const goNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowTranslation(false);
      setPronunciationScore(null);
      setFeedbackMessage('');
      setRecognizedText('');
      setActivatedWords(new Set());
      clearRecording();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowTranslation(false);
      setPronunciationScore(null);
      setFeedbackMessage('');
      setRecognizedText('');
      setActivatedWords(new Set());
      clearRecording();
    }
  };

  const getRandomMessage = (messages: typeof encouragingMessages) => {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    return msg.translations[selectedLanguage] || msg.english;
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-orange-500';
  };

  const wordParts = getWordParts();
  const isMultiWord = wordParts.length > 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {currentIndex + 1} / {vocabulary.length}
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

      {/* Encouraging message */}
      {completedWords.size > 0 && completedWords.size < vocabulary.length && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-3 bg-primary/10 rounded-xl"
        >
          <p className="text-primary font-medium">{getRandomMessage(encouragingMessages)}</p>
        </motion.div>
      )}

      {/* Word Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20"
        >
          <div className="text-center space-y-4">
            {/* English word with word activation */}
            <div>
              {isMultiWord ? (
                <h2 className="text-3xl font-bold text-foreground mb-2 flex flex-wrap justify-center gap-2">
                  {wordParts.map((word, idx) => (
                    <span
                      key={idx}
                      className={`transition-all duration-300 px-1 rounded ${
                        activatedWords.has(idx)
                          ? 'text-green-600 bg-green-100 dark:bg-green-900/30 scale-110'
                          : ''
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </h2>
              ) : (
                <h2 className={`text-3xl font-bold mb-2 transition-all duration-300 ${
                  activatedWords.has(0) ? 'text-green-600' : 'text-foreground'
                }`}>
                  {currentWord.english}
                </h2>
              )}
            </div>

            {/* Listen button */}
            <Button variant="outline" onClick={speakWord} className="gap-2">
              <Volume2 className="w-5 h-5" />
              {t('listen')}
            </Button>

            {/* Translation toggle */}
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
                className="gap-2 text-muted-foreground"
              >
                {showTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showTranslation ? t('hideTranslation') : t('showTranslation')}
              </Button>
              
              <AnimatePresence>
                {showTranslation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-4 bg-muted/50 rounded-xl"
                  >
                    <p 
                      className="text-xl font-semibold text-foreground"
                      dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}
                    >
                      {currentWord.translations[selectedLanguage]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Completed indicator */}
            {completedWords.has(currentWord.id) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-600 rounded-full"
              >
                <CheckCircle2 className="w-5 h-5" />
                {t('correct')}
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Voice Recording Section */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          {t('record')} "{currentWord.english}"
        </p>

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

        {audioUrl && !isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm" onClick={playRecording} className="gap-2">
                <Play className="w-4 h-4" />
                {t('playRecording')}
              </Button>
              <Button variant="outline" size="sm" onClick={() => { clearRecording(); setPronunciationScore(null); setFeedbackMessage(''); setActivatedWords(new Set()); setRecognizedText(''); }} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                {t('tryAgain')}
              </Button>
            </div>

            {pronunciationScore !== null && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center space-y-1"
              >
                <span className={`text-2xl font-bold ${getScoreColor(pronunciationScore)}`}>
                  {pronunciationScore}%
                </span>
                <p className={`font-medium ${getScoreColor(pronunciationScore)}`}>
                  {pronunciationScore >= 85 ? t('excellent') : pronunciationScore >= 70 ? t('goodJob') : t('keepPracticing')}
                </p>
                {feedbackMessage && (
                  <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">{feedbackMessage}</p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Navigation - always enabled */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          {t('previous')}
        </Button>

        {currentIndex === vocabulary.length - 1 ? (
          <Button onClick={onComplete} className="gap-2 bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-4 h-4" />
            {t('lessonComplete')}
          </Button>
        ) : (
          <Button onClick={goNext} className="gap-2">
            {t('next')}
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Completion celebration */}
      <AnimatePresence>
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl border border-green-500/30"
          >
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-lg font-bold text-green-600">{getRandomMessage(congratulatoryMessages)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};