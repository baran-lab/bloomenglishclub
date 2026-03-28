import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, BookOpen, Menu, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageProvider, useLanguage } from '@/components/LanguageContext';
import { LanguageSelector } from '@/components/module1/LanguageSelector';
import { LessonCard } from '@/components/module1/LessonCard';
import { VocabularyLesson } from '@/components/module1/VocabularyLesson';
import { VocabularyMatchingPractice } from '@/components/module1/VocabularyMatchingPractice';
import { VideoSeriesLesson } from '@/components/module1/VideoSeriesLesson';
import { AlphabetLesson } from '@/components/module2/AlphabetLesson';
import { AlphabetMatchingPractice } from '@/components/module2/AlphabetMatchingPractice';
import { OrdinalAudioMatchingPractice } from '@/components/module2/OrdinalAudioMatchingPractice';
import { NameRecordingPractice } from '@/components/module2/NameRecordingPractice';
import { SpellingPractice } from '@/components/module2/SpellingPractice';
import { MonthsLesson } from '@/components/module2/MonthsLesson';
import { MonthsOrderPractice } from '@/components/module2/MonthsOrderPractice';
import { TelephonePractice } from '@/components/module2/TelephonePractice';
import { DateOfBirthPractice } from '@/components/module2/DateOfBirthPractice';
import { NumbersAudioMatchingPractice } from '@/components/module2/NumbersAudioMatchingPractice';
import { AddressVideoLesson } from '@/components/module2/AddressVideoLesson';
import { HebaListeningLesson } from '@/components/module2/HebaListeningLesson';
import { AddressWordOrderPractice } from '@/components/module2/AddressWordOrderPractice';
import { Module2Checklist } from '@/components/module2/Module2Checklist';
import { module2Lessons, Module2Lesson } from '@/data/module2Data';
import { useToast } from '@/hooks/use-toast';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { useMicroWin } from '@/components/MicroWins';

type ViewState = 'language-select' | 'lessons' | 'lesson-detail';

const Module2Content: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { languageInfo } = useLanguage();
  const { showWin, MicroWinComponent } = useMicroWin();
  
  const [viewState, setViewState] = useState<ViewState>('language-select');
  const [lessons, setLessons] = useState<Module2Lesson[]>(module2Lessons);
  const [activeLesson, setActiveLesson] = useState<Module2Lesson | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState(() => localStorage.getItem('englishville_user_name') || '');
  const [showContinue, setShowContinue] = useState(false);

  const completedCount = lessons.filter(l => l.isCompleted).length;
  const progress = (completedCount / lessons.length) * 100;
  const currentLessonIndex = lessons.findIndex(l => l.id === activeLesson?.id);

  useEffect(() => {
    const lessonId = searchParams.get('lesson');
    if (!lessonId) return;
    const target = module2Lessons.find(l => l.id === lessonId);
    if (target) {
      setActiveLesson(target);
      setViewState('lesson-detail');
    }
  }, [searchParams]);

  const handleLanguageSelected = () => {
    setViewState('lessons');
    toast({ title: `${languageInfo.flag} ${languageInfo.english} selected` });
  };

  const handleLessonClick = (lesson: Module2Lesson) => {
    setActiveLesson(lesson);
    setViewState('lesson-detail');
    setShowContinue(false);
  };

  const handleLessonComplete = () => {
    if (activeLesson) {
      setLessons(prev => prev.map(l => l.id === activeLesson.id ? { ...l, isCompleted: true } : l));
      showWin(`Great job, ${userName || 'friend'}! 🎉`, userName, 'correct');
      setShowContinue(true);
    }
  };

  const handleContinue = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setActiveLesson(lessons[currentLessonIndex + 1]);
      setShowContinue(false);
    } else {
      toast({ title: '🏆 Module Complete!' });
      navigate('/');
    }
  };

  const handleBack = () => {
    if (viewState === 'lesson-detail') {
      setViewState('lessons');
      setActiveLesson(null);
    } else {
      navigate('/');
    }
  };

  const renderLessonContent = (lesson: Module2Lesson) => {
    switch (lesson.type) {
      case 'alphabet':
        return <AlphabetLesson onComplete={handleLessonComplete} />;
      case 'alphabet-matching':
        return <AlphabetMatchingPractice onComplete={handleLessonComplete} />;
      case 'vocabulary':
        return <VocabularyLesson vocabulary={lesson.content || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'vocabulary-matching':
        return <VocabularyMatchingPractice vocabulary={lesson.content || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'ordinal-numbers':
      case 'ordinal-audio-matching':
        return <OrdinalAudioMatchingPractice content={lesson.content || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'video-series':
        return <VideoSeriesLesson videos={lesson.videos || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'name-recording':
        return <NameRecordingPractice onComplete={handleLessonComplete} userName={userName} />;
      case 'spelling-practice':
        return <SpellingPractice spellingData={lesson.spellingData || []} onComplete={handleLessonComplete} />;
      case 'numbers-matching':
      case 'numbers-audio-matching':
        return <NumbersAudioMatchingPractice numbers={lesson.content || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'months':
        return <MonthsLesson content={lesson.content || []} onComplete={handleLessonComplete} />;
      case 'months-order':
        return <MonthsOrderPractice months={lesson.content || []} onComplete={handleLessonComplete} />;
      case 'telephone-practice':
        return <TelephonePractice onComplete={handleLessonComplete} userName={userName} />;
      case 'date-of-birth-practice':
        return <DateOfBirthPractice onComplete={handleLessonComplete} userName={userName} />;
      case 'address-video-series':
        return <AddressVideoLesson videos={lesson.videos || []} onComplete={handleLessonComplete} title={lesson.title} userName={userName} />;
      case 'listening-lesson':
        return <HebaListeningLesson videos={lesson.videos || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'address-word-order':
        return <AddressWordOrderPractice onComplete={handleLessonComplete} />;
      case 'module-complete':
        return <Module2Checklist onComplete={handleLessonComplete} userName={userName || 'friend'} />;
      default:
        return <VocabularyLesson vocabulary={lesson.content || []} onComplete={handleLessonComplete} title={lesson.title} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {MicroWinComponent}
      <HamburgerMenu isOpen={showMenu} onClose={() => setShowMenu(false)} userName={userName} />
      
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={viewState === 'lessons' ? () => setShowMenu(true) : handleBack}>
              {viewState === 'lessons' ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>
            <div>
              <h1 className="font-fredoka text-lg font-bold text-primary">Module 2: Names and Dates</h1>
              <p className="text-xs text-muted-foreground">{completedCount}/{lessons.length} lessons completed</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {viewState !== 'language-select' && (
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)} className="gap-2">
                <span className="text-lg">{languageInfo.flag}</span>
              </Button>
            )}
          </div>
        </div>
        <div className="h-1 bg-muted">
          <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
        </div>
      </header>

      <AnimatePresence>
        {showSettings && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="container max-w-4xl mx-auto px-4 py-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <LanguageSelector showTitle={false} onSelect={() => setShowSettings(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container max-w-4xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {viewState === 'language-select' && (
            <motion.div key="language-select" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="font-fredoka text-3xl font-bold text-foreground">Module 2: Names and Dates 📅</h2>
                <p className="text-muted-foreground max-w-md mx-auto">Learn the alphabet, spelling, and dates.</p>
              </div>
              <LanguageSelector showTitle={true} />
              <div className="flex justify-center">
                <Button size="lg" onClick={handleLanguageSelected} className="gap-2">
                  <BookOpen className="w-5 h-5" />
                  Start Learning
                </Button>
              </div>
            </motion.div>
          )}

          {viewState === 'lessons' && (
            <motion.div key="lessons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
                <Home className="w-4 h-4" /> Dashboard
              </Button>
              <div className="space-y-4">
                <h2 className="font-fredoka text-xl font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Lessons
                </h2>
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <LessonCard 
                      key={lesson.id} 
                      lesson={{
                        ...lesson,
                        type: 'vocabulary' as any,
                      }} 
                      index={index} 
                      onClick={() => handleLessonClick(lesson)} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {viewState === 'lesson-detail' && activeLesson && (
            <motion.div key="lesson-detail" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
              {renderLessonContent(activeLesson)}
              
              {showContinue && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center gap-3 pt-4"
                >
                  <Button variant="outline" onClick={() => { setViewState('lessons'); setActiveLesson(null); setShowContinue(false); }} className="gap-2">
                    <Home className="w-4 h-4" />
                    Lessons
                  </Button>
                  <Button size="lg" onClick={handleContinue} className="gap-2 rounded-xl bg-gradient-primary text-primary-foreground px-8">
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const Module2: React.FC = () => (
  <LanguageProvider>
    <Module2Content />
  </LanguageProvider>
);

export default Module2;
