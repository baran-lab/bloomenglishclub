import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronLeft, ChevronRight, CheckCircle2, ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SupportedLanguage } from '@/data/module1Data';
import { speakText } from '@/utils/speechUtils';

interface FamilyMember {
  id: string;
  english: string;
  pronunciation: string;
  translations: Partial<Record<SupportedLanguage, string>>;
}

const familyMembers: FamilyMember[] = [
  { id: 'wife', english: 'Wife', pronunciation: 'wahyf', translations: { arabic: 'زوجة', bengali: 'স্ত্রী', chinese: '妻子', hebrew: 'אישה', korean: '아내', spanish: 'Esposa', turkish: 'Eş (kadın)' } },
  { id: 'husband', english: 'Husband', pronunciation: 'HUHZ-buhnd', translations: { arabic: 'زوج', bengali: 'স্বামী', chinese: '丈夫', hebrew: 'בעל', korean: '남편', spanish: 'Esposo', turkish: 'Eş (erkek)' } },
  { id: 'mother', english: 'Mother / Mom', pronunciation: 'MUHTH-er / mahm', translations: { arabic: 'أم', bengali: 'মা', chinese: '母亲/妈妈', hebrew: 'אמא', korean: '어머니/엄마', spanish: 'Madre / Mamá', turkish: 'Anne' } },
  { id: 'father', english: 'Father / Dad', pronunciation: 'FAH-ther / dad', translations: { arabic: 'أب', bengali: 'বাবা', chinese: '父亲/爸爸', hebrew: 'אבא', korean: '아버지/아빠', spanish: 'Padre / Papá', turkish: 'Baba' } },
  { id: 'son', english: 'Son', pronunciation: 'suhn', translations: { arabic: 'ابن', bengali: 'ছেলে', chinese: '儿子', hebrew: 'בן', korean: '아들', spanish: 'Hijo', turkish: 'Oğul' } },
  { id: 'daughter', english: 'Daughter', pronunciation: 'DAW-ter', translations: { arabic: 'ابنة', bengali: 'মেয়ে', chinese: '女儿', hebrew: 'בת', korean: '딸', spanish: 'Hija', turkish: 'Kız' } },
  { id: 'child', english: 'Child', pronunciation: 'chahyld', translations: { arabic: 'طفل', bengali: 'শিশু', chinese: '孩子', hebrew: 'ילד/ילדה', korean: '아이', spanish: 'Niño/a', turkish: 'Çocuk' } },
  { id: 'children', english: 'Children', pronunciation: 'CHIL-druhn', translations: { arabic: 'أطفال', bengali: 'শিশুরা', chinese: '孩子们', hebrew: 'ילדים', korean: '아이들', spanish: 'Niños', turkish: 'Çocuklar' } },
  { id: 'brother', english: 'Brother', pronunciation: 'BRUHTH-er', translations: { arabic: 'أخ', bengali: 'ভাই', chinese: '兄弟', hebrew: 'אח', korean: '형제', spanish: 'Hermano', turkish: 'Erkek kardeş' } },
  { id: 'sister', english: 'Sister', pronunciation: 'SIS-ter', translations: { arabic: 'أخت', bengali: 'বোন', chinese: '姐妹', hebrew: 'אחות', korean: '자매', spanish: 'Hermana', turkish: 'Kız kardeş' } },
  { id: 'grandmother', english: 'Grandmother / Grandma', pronunciation: 'GRAND-muhth-er', translations: { arabic: 'جدة', bengali: 'দাদি/নানি', chinese: '祖母/奶奶', hebrew: 'סבתא', korean: '할머니', spanish: 'Abuela', turkish: 'Büyükanne' } },
  { id: 'grandfather', english: 'Grandfather / Grandpa', pronunciation: 'GRAND-fah-ther', translations: { arabic: 'جد', bengali: 'দাদা/নানা', chinese: '祖父/爷爷', hebrew: 'סבא', korean: '할아버지', spanish: 'Abuelo', turkish: 'Büyükbaba' } },
  { id: 'grandson', english: 'Grandson', pronunciation: 'GRAND-suhn', translations: { arabic: 'حفيد', bengali: 'নাতি', chinese: '孙子', hebrew: 'נכד', korean: '손자', spanish: 'Nieto', turkish: 'Torun (erkek)' } },
  { id: 'granddaughter', english: 'Granddaughter', pronunciation: 'GRAND-daw-ter', translations: { arabic: 'حفيدة', bengali: 'নাতনি', chinese: '孙女', hebrew: 'נכדה', korean: '손녀', spanish: 'Nieta', turkish: 'Torun (kız)' } },
  { id: 'grandchildren', english: 'Grandchildren', pronunciation: 'GRAND-chil-druhn', translations: { arabic: 'أحفاد', bengali: 'নাতি-নাতনি', chinese: '孙辈', hebrew: 'נכדים', korean: '손주', spanish: 'Nietos', turkish: 'Torunlar' } },
  { id: 'aunt', english: 'Aunt', pronunciation: 'ant', translations: { arabic: 'عمة/خالة', bengali: 'মাসি/খালা', chinese: '阿姨/姑姑', hebrew: 'דודה', korean: '이모/고모', spanish: 'Tía', turkish: 'Teyze/Hala' } },
  { id: 'uncle', english: 'Uncle', pronunciation: 'UHNG-kuhl', translations: { arabic: 'عم/خال', bengali: 'মামা/চাচা', chinese: '叔叔/舅舅', hebrew: 'דוד', korean: '삼촌', spanish: 'Tío', turkish: 'Amca/Dayı' } },
  { id: 'nephew', english: 'Nephew', pronunciation: 'NEF-yoo', translations: { arabic: 'ابن أخ/أخت', bengali: 'ভাগনে/ভাতিজা', chinese: '侄子/外甥', hebrew: 'אחיין', korean: '조카(남)', spanish: 'Sobrino', turkish: 'Yeğen (erkek)' } },
  { id: 'niece', english: 'Niece', pronunciation: 'nees', translations: { arabic: 'ابنة أخ/أخت', bengali: 'ভাগনি/ভাতিজি', chinese: '侄女/外甥女', hebrew: 'אחיינית', korean: '조카(여)', spanish: 'Sobrina', turkish: 'Yeğen (kız)' } },
  { id: 'cousin', english: 'Cousin', pronunciation: 'KUHZ-in', translations: { arabic: 'ابن/ابنة عم', bengali: 'চাচাতো ভাই/বোন', chinese: '堂/表兄弟姐妹', hebrew: 'בן/בת דוד', korean: '사촌', spanish: 'Primo/a', turkish: 'Kuzen' } },
  { id: 'mother-in-law', english: 'Mother-in-law', pronunciation: 'MUHTH-er-in-law', translations: { arabic: 'حماة', bengali: 'শাশুড়ি', chinese: '婆婆/岳母', hebrew: 'חמות', korean: '시어머니/장모', spanish: 'Suegra', turkish: 'Kayınvalide' } },
  { id: 'father-in-law', english: 'Father-in-law', pronunciation: 'FAH-ther-in-law', translations: { arabic: 'حمو', bengali: 'শ্বশুর', chinese: '公公/岳父', hebrew: 'חם', korean: '시아버지/장인', spanish: 'Suegro', turkish: 'Kayınpeder' } },
  { id: 'son-in-law', english: 'Son-in-law', pronunciation: 'SUHN-in-law', translations: { arabic: 'صهر', bengali: 'জামাই', chinese: '女婿', hebrew: 'חתן', korean: '사위', spanish: 'Yerno', turkish: 'Damat' } },
  { id: 'daughter-in-law', english: 'Daughter-in-law', pronunciation: 'DAW-ter-in-law', translations: { arabic: 'كنة', bengali: 'বউমা', chinese: '儿媳', hebrew: 'כלה', korean: '며느리', spanish: 'Nuera', turkish: 'Gelin' } },
  { id: 'sister-in-law', english: 'Sister-in-law', pronunciation: 'SIS-ter-in-law', translations: { arabic: 'أخت الزوج/الزوجة', bengali: 'ননদ/ভাবি', chinese: '嫂子/小姑', hebrew: 'גיסה', korean: '시누이/올케', spanish: 'Cuñada', turkish: 'Baldız/Görümce' } },
  { id: 'brother-in-law', english: 'Brother-in-law', pronunciation: 'BRUHTH-er-in-law', translations: { arabic: 'أخو الزوج/الزوجة', bengali: 'দেবর/ভাশুর', chinese: '大伯/小叔', hebrew: 'גיס', korean: '시동생/처남', spanish: 'Cuñado', turkish: 'Kayınbirader/Enişte' } },
];

interface FamilyMembersLessonProps {
  selectedLanguage: SupportedLanguage;
  onComplete: () => void;
  onBack: () => void;
}

export const FamilyMembersLesson: React.FC<FamilyMembersLessonProps> = ({ selectedLanguage, onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play audio when word changes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(familyMembers[currentIndex].english);
        utterance.lang = 'en-US';
        utterance.rate = 0.7;
        speechSynthesis.speak(utterance);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [currentIndex]);
  const [completedWords, setCompletedWords] = useState<Set<string>>(new Set());
  const [phase, setPhase] = useState<'listen' | 'matching'>('listen');

  // Matching practice state
  const BATCH_SIZE = 6;
  const [matchBatch, setMatchBatch] = useState(0);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<string | null>(null);
  const [shuffledTranslations, setShuffledTranslations] = useState<FamilyMember[]>([]);

  const current = familyMembers[currentIndex];
  const progress = phase === 'listen' 
    ? (completedWords.size / familyMembers.length) * 50 
    : 50 + ((matchBatch * BATCH_SIZE + matchedPairs.size) / familyMembers.length) * 50;

  const totalMatchBatches = Math.ceil(familyMembers.length / BATCH_SIZE);
  const currentBatchItems = familyMembers.slice(matchBatch * BATCH_SIZE, (matchBatch + 1) * BATCH_SIZE);

  React.useEffect(() => {
    if (phase === 'matching') {
      setShuffledTranslations([...currentBatchItems].sort(() => Math.random() - 0.5));
      setMatchedPairs(new Set());
      setSelectedEnglish(null);
      setSelectedTranslation(null);
    }
  }, [phase, matchBatch]);

  const speakWord = (word: string) => {
    speakText(word, 0.7);
  };

  const handleListenComplete = () => {
    setCompletedWords(prev => new Set([...prev, current.id]));
    if (currentIndex < familyMembers.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleStartMatching = () => {
    setPhase('matching');
    setMatchBatch(0);
  };

  // Matching logic
  React.useEffect(() => {
    if (selectedEnglish && selectedTranslation) {
      const engItem = currentBatchItems.find(m => m.id === selectedEnglish);
      const transItem = currentBatchItems.find(m => m.id === selectedTranslation);
      if (engItem && transItem && engItem.id === transItem.id) {
        setMatchedPairs(prev => new Set([...prev, engItem.id]));
        try { new Audio('/sounds/success.mp3').play(); } catch {}
      } else {
        setWrongPair(selectedEnglish);
        setTimeout(() => setWrongPair(null), 800);
      }
      setSelectedEnglish(null);
      setSelectedTranslation(null);
    }
  }, [selectedEnglish, selectedTranslation]);

  const isRtl = selectedLanguage === 'arabic' || selectedLanguage === 'hebrew';

  if (phase === 'listen') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <h3 className="font-fredoka text-xl font-bold text-foreground">Family Members</h3>
        </div>

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Word {currentIndex + 1} of {familyMembers.length}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-6 border border-primary/30"
          >
            <div className="text-center space-y-4">
              <p className="text-2xl font-bold text-foreground">{current.english}</p>
              
              <Button onClick={() => speakWord(current.english)} className="gap-2">
                <Volume2 className="w-5 h-5" /> Listen
              </Button>

              <div className="p-4 bg-muted/50 rounded-xl" dir={isRtl ? 'rtl' : 'ltr'}>
                <p className="text-lg font-medium text-foreground">
                  {current.translations[selectedLanguage] || '—'}
                </p>
              </div>

              {completedWords.has(current.id) && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-600 rounded-full">
                  <CheckCircle2 className="w-5 h-5" /> Done
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>

          {currentIndex === familyMembers.length - 1 ? (
            <Button onClick={handleStartMatching} className="gap-2 bg-green-500 hover:bg-green-600">
              <BookOpen className="w-4 h-4" /> Start Matching Practice
            </Button>
          ) : (
            <Button onClick={() => { handleListenComplete(); }} className="gap-2">
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Matching phase
  const allMatched = matchedPairs.size === currentBatchItems.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => setPhase('listen')} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Words
        </Button>
        <h3 className="font-fredoka text-xl font-bold text-foreground">Matching Practice</h3>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
      </div>

      <p className="text-sm text-muted-foreground text-center">
        Batch {matchBatch + 1} of {totalMatchBatches}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* English column */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase text-center">English</p>
          {currentBatchItems.map(item => (
            <motion.button
              key={item.id}
              onClick={() => !matchedPairs.has(item.id) && setSelectedEnglish(item.id)}
              className={`w-full p-3 rounded-xl text-sm font-medium transition-all border
                ${matchedPairs.has(item.id) ? 'bg-green-500/20 border-green-500/30 text-green-600 opacity-60' :
                  selectedEnglish === item.id ? 'bg-primary/20 border-primary' :
                  wrongPair === item.id ? 'bg-destructive/20 border-destructive' :
                  'bg-card border-border hover:bg-muted'}`}
              disabled={matchedPairs.has(item.id)}
              whileTap={{ scale: 0.97 }}
            >
              {item.english}
            </motion.button>
          ))}
        </div>

        {/* Translation column */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase text-center">Translation</p>
          {shuffledTranslations.map(item => (
            <motion.button
              key={item.id}
              onClick={() => !matchedPairs.has(item.id) && setSelectedTranslation(item.id)}
              className={`w-full p-3 rounded-xl text-sm font-medium transition-all border
                ${matchedPairs.has(item.id) ? 'bg-green-500/20 border-green-500/30 text-green-600 opacity-60' :
                  selectedTranslation === item.id ? 'bg-primary/20 border-primary' :
                  'bg-card border-border hover:bg-muted'}`}
              disabled={matchedPairs.has(item.id)}
              dir={isRtl ? 'rtl' : 'ltr'}
              whileTap={{ scale: 0.97 }}
            >
              {item.translations[selectedLanguage] || '—'}
            </motion.button>
          ))}
        </div>
      </div>

      {allMatched && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-4 bg-green-500/20 rounded-2xl border border-green-500/30">
          <p className="text-2xl mb-2">🎉</p>
          <p className="font-bold text-green-600">All matched!</p>
          <div className="mt-3">
            {matchBatch < totalMatchBatches - 1 ? (
              <Button onClick={() => setMatchBatch(prev => prev + 1)} className="gap-2">
                Next Batch <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={onComplete} className="gap-2 bg-green-500 hover:bg-green-600">
                <CheckCircle2 className="w-4 h-4" /> Complete
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
