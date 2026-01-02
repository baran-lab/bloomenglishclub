import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Settings, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageProvider, useLanguage } from '@/components/LanguageContext';
import { LanguageSelector } from '@/components/module1/LanguageSelector';
import { NeighborsSection } from '@/components/module1/NeighborsSection';
import { LessonCard } from '@/components/module1/LessonCard';
import { VideoLesson } from '@/components/module1/VideoLesson';
import { PhraseCard } from '@/components/module1/PhraseCard';
import { SpeakingPractice } from '@/components/module1/SpeakingPractice';
import { module1Lessons, Lesson, greetingPhrases, jobsVocabulary, languageNames, SupportedLanguage } from '@/data/module1Data';
import { useToast } from '@/hooks/use-toast';

type ViewState = 'language-select' | 'lessons' | 'lesson-detail';

const Module1Content: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { selectedLanguage, languageInfo } = useLanguage();
  
  const [viewState, setViewState] = useState<ViewState>('language-select');
  const [lessons, setLessons] = useState<Lesson[]>(module1Lessons);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const completedCount = lessons.filter(l => l.isCompleted).length;
  const progress = (completedCount / lessons.length) * 100;

  const handleLanguageSelected = () => {
    setViewState('lessons');
    toast({
      title: `${languageInfo.flag} ${languageInfo.english} selected`,
      description: 'Translations will be shown in your chosen language.',
    });
  };

  const handleLessonClick = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setViewState('lesson-detail');
  };

  const handleLessonComplete = () => {
    if (activeLesson) {
      setLessons(prev => prev.map(l => 
        l.id === activeLesson.id ? { ...l, isCompleted: true } : l
      ));
      toast({
        title: '🎉 Lesson Complete!',
        description: `You've finished "${activeLesson.title}"`,
      });
    }
  };

  const handleNextLesson = () => {
    if (activeLesson) {
      const currentIndex = lessons.findIndex(l => l.id === activeLesson.id);
      if (currentIndex < lessons.length - 1) {
        setActiveLesson(lessons[currentIndex + 1]);
      } else {
        setViewState('lessons');
        setActiveLesson(null);
      }
    }
  };

  const handleBack = () => {
    if (viewState === 'lesson-detail') {
      setViewState('lessons');
      setActiveLesson(null);
    } else if (viewState === 'lessons') {
      navigate('/');
    } else {
      navigate('/');
    }
  };

  const renderLessonContent = (lesson: Lesson) => {
    switch (lesson.type) {
      case 'video':
      case 'practice':
      case 'review':
        return (
          <VideoLesson
            lesson={lesson}
            onComplete={handleLessonComplete}
            onNext={handleNextLesson}
          />
        );
      case 'vocabulary':
        return (
          <div className="space-y-4">
            <h3 className="font-fredoka text-xl font-semibold text-foreground">
              {lesson.title}
            </h3>
            {lesson.phrases ? (
              lesson.phrases.map((phrase, index) => (
                <PhraseCard key={phrase.id} phrase={phrase} index={index} />
              ))
            ) : lesson.content ? (
              <div className="grid gap-3">
                {lesson.content.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-xl border border-border p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{item.english}</p>
                      <p className="text-sm text-muted-foreground italic">/{item.pronunciation}/</p>
                    </div>
                    <p className="text-foreground font-medium" dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}>
                      {item.translations[selectedLanguage]}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : null}
            <Button onClick={handleLessonComplete} className="w-full mt-4">
              Mark as Complete
            </Button>
          </div>
        );
      case 'speaking':
        return (
          <SpeakingPractice
            phrases={lesson.phrases || greetingPhrases.slice(0, 5)}
            onComplete={handleLessonComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-fredoka text-lg font-bold text-primary">
                Module 1: Introduce Yourself
              </h1>
              <p className="text-xs text-muted-foreground">
                {completedCount}/{lessons.length} lessons completed
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {viewState !== 'language-select' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="gap-2"
              >
                <span className="text-lg">{languageInfo.flag}</span>
                <span className="hidden sm:inline text-sm">{languageInfo.native}</span>
              </Button>
            )}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container max-w-4xl mx-auto px-4 py-4"
          >
            <div className="bg-card rounded-xl border border-border p-4">
              <LanguageSelector showTitle={false} onSelect={() => setShowSettings(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="container max-w-4xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {viewState === 'language-select' && (
            <motion.div
              key="language-select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Welcome message */}
              <div className="text-center space-y-2">
                <motion.h2
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="font-fredoka text-3xl font-bold text-foreground"
                >
                  Welcome to Englishville! 🏘️
                </motion.h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Before we begin, choose your native language to help you learn English.
                </p>
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
            <motion.div
              key="lessons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Meet the neighbors */}
              <NeighborsSection />

              {/* Lessons list */}
              <div className="space-y-4">
                <h2 className="font-fredoka text-xl font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Lessons
                </h2>
                
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      index={index}
                      onClick={() => handleLessonClick(lesson)}
                      isActive={activeLesson?.id === lesson.id}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {viewState === 'lesson-detail' && activeLesson && (
            <motion.div
              key="lesson-detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              {renderLessonContent(activeLesson)}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const Module1: React.FC = () => {
  return (
    <LanguageProvider>
      <Module1Content />
    </LanguageProvider>
  );
};

export default Module1;
