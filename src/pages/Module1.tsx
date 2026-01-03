import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageProvider, useLanguage } from '@/components/LanguageContext';
import { LanguageSelector } from '@/components/module1/LanguageSelector';
import { NeighborsSection } from '@/components/module1/NeighborsSection';
import { LessonCard } from '@/components/module1/LessonCard';
import { VideoLesson } from '@/components/module1/VideoLesson';
import { VocabularyLesson } from '@/components/module1/VocabularyLesson';
import { VideoSeriesLesson } from '@/components/module1/VideoSeriesLesson';
import { SentencePractice } from '@/components/module1/SentencePractice';
import { NumbersPractice } from '@/components/module1/NumbersPractice';
import { SpeakingPractice } from '@/components/module1/SpeakingPractice';
import { EmbeddedPractice } from '@/components/module1/EmbeddedPractice';
import { ListeningWritingPractice } from '@/components/module1/ListeningWritingPractice';
import { module1Lessons, Lesson, greetingPhrases } from '@/data/module1Data';
import { useToast } from '@/hooks/use-toast';

type ViewState = 'language-select' | 'lessons' | 'lesson-detail';

const Module1Content: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { languageInfo } = useLanguage();
  
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

  const handleBack = () => {
    if (viewState === 'lesson-detail') {
      setViewState('lessons');
      setActiveLesson(null);
    } else {
      navigate('/');
    }
  };

  const renderLessonContent = (lesson: Lesson) => {
    switch (lesson.type) {
      case 'video':
        return <VideoLesson lesson={lesson} onComplete={handleLessonComplete} onNext={() => setViewState('lessons')} />;
      case 'video-series':
        return <VideoSeriesLesson videos={lesson.videos || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'vocabulary':
        if (lesson.phrases) {
          return <VocabularyLesson vocabulary={lesson.phrases.map(p => ({ id: p.id, english: p.english, pronunciation: p.pronunciation, translations: p.translations }))} onComplete={handleLessonComplete} title={lesson.title} />;
        }
        return <VocabularyLesson vocabulary={lesson.content || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'sentences':
        return <SentencePractice sentences={lesson.sentences || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'numbers-practice':
        return <NumbersPractice numbers={lesson.content || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'speaking':
        return <SpeakingPractice phrases={lesson.phrases || greetingPhrases.slice(0, 5)} onComplete={handleLessonComplete} />;
      case 'practice':
        if (lesson.embedUrl) {
          return <EmbeddedPractice embedUrl={lesson.embedUrl} onComplete={handleLessonComplete} title={lesson.title} />;
        }
        return <VideoLesson lesson={lesson} onComplete={handleLessonComplete} onNext={() => setViewState('lessons')} />;
      case 'listening-writing':
        return <ListeningWritingPractice questions={lesson.questions || []} onComplete={handleLessonComplete} title={lesson.title} />;
      default:
        return <VideoLesson lesson={lesson} onComplete={handleLessonComplete} onNext={() => setViewState('lessons')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-fredoka text-lg font-bold text-primary">Module 1: Introduce Yourself</h1>
              <p className="text-xs text-muted-foreground">{completedCount}/{lessons.length} lessons completed</p>
            </div>
          </div>
          {viewState !== 'language-select' && (
            <Button variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)} className="gap-2">
              <span className="text-lg">{languageInfo.flag}</span>
              <span className="hidden sm:inline text-sm">{languageInfo.native}</span>
            </Button>
          )}
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
                <h2 className="font-fredoka text-3xl font-bold text-foreground">Welcome to Englishville! 🏘️</h2>
                <p className="text-muted-foreground max-w-md mx-auto">Choose your native language to help you learn English.</p>
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
            <motion.div key="lessons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <NeighborsSection />
              <div className="space-y-4">
                <h2 className="font-fredoka text-xl font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Lessons
                </h2>
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <LessonCard key={lesson.id} lesson={lesson} index={index} onClick={() => handleLessonClick(lesson)} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {viewState === 'lesson-detail' && activeLesson && (
            <motion.div key="lesson-detail" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              {renderLessonContent(activeLesson)}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const Module1: React.FC = () => (
  <LanguageProvider>
    <Module1Content />
  </LanguageProvider>
);

export default Module1;
