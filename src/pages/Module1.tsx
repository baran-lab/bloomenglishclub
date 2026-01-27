import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, BookOpen, Menu, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageProvider, useLanguage } from '@/components/LanguageContext';
import { LanguageSelector } from '@/components/module1/LanguageSelector';
import { LessonCard } from '@/components/module1/LessonCard';
import { VideoLesson } from '@/components/module1/VideoLesson';
import { VocabularyLesson } from '@/components/module1/VocabularyLesson';
import { VocabularyMatchingPractice } from '@/components/module1/VocabularyMatchingPractice';
import { VideoSeriesLesson } from '@/components/module1/VideoSeriesLesson';
import { SentencePractice } from '@/components/module1/SentencePractice';
import { NumbersMatchingPractice } from '@/components/module1/NumbersMatchingPractice';
import { SpeakingPractice } from '@/components/module1/SpeakingPractice';
import { EmbeddedPractice } from '@/components/module1/EmbeddedPractice';
import { ListeningWritingPractice } from '@/components/module1/ListeningWritingPractice';
import { FillInTheBlankPractice } from '@/components/module1/FillInTheBlankPractice';
import { SmartAnswerPractice } from '@/components/module1/SmartAnswerPractice';
import { InteractiveForm } from '@/components/module1/InteractiveForm';
import { ListeningFillInBlank } from '@/components/module1/ListeningFillInBlank';
import { MultipleChoiceQuiz } from '@/components/module1/MultipleChoiceQuiz';
import VideoPracticeQuiz from '@/components/module1/VideoPracticeQuiz';
import WordOrderPractice from '@/components/module1/WordOrderPractice';
import SpeakingTestPractice from '@/components/module1/SpeakingTestPractice';
import NeighborVideoQuiz from '@/components/module1/NeighborVideoQuiz';
import { PronounPractice } from '@/components/module1/PronounPractice';
import { Module1Checklist } from '@/components/module1/Module1Checklist';
import { module1Lessons, neighborLessons, Lesson, greetingPhrases } from '@/data/module1Data';
import { useToast } from '@/hooks/use-toast';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { useMicroWin } from '@/components/MicroWins';

type ViewState = 'language-select' | 'intro-video' | 'lessons' | 'lesson-detail';

const Module1Content: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { languageInfo } = useLanguage();
  const { showWin, MicroWinComponent } = useMicroWin();
  
  const [viewState, setViewState] = useState<ViewState>('language-select');
  const [lessons, setLessons] = useState<Lesson[]>(module1Lessons);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState(() => localStorage.getItem('englishville_user_name') || '');
  const [showContinue, setShowContinue] = useState(false);
  const [introVideoWatched, setIntroVideoWatched] = useState(false);

  const completedCount = lessons.filter(l => l.isCompleted).length;
  const progress = (completedCount / lessons.length) * 100;
  const currentLessonIndex = lessons.findIndex(l => l.id === activeLesson?.id);

  // Allow deep-linking to a specific lesson/neighbor via ?lesson=<id>
  useEffect(() => {
    const lessonId = searchParams.get('lesson');
    if (!lessonId) return;

    const allLessons = [...module1Lessons, ...neighborLessons];
    const target = allLessons.find(l => l.id === lessonId);
    if (!target) return;

    setActiveLesson(target);
    setViewState('lesson-detail');
    setShowContinue(false);
  }, [searchParams]);

  const handleLanguageSelected = () => {
    // Skip intro video, go directly to lessons
    setViewState('lessons');
    toast({
      title: `${languageInfo.flag} ${languageInfo.english} selected`,
      description: 'Translations will be shown in your chosen language.',
    });
  };

  const handleIntroVideoComplete = () => {
    setIntroVideoWatched(true);
    setViewState('lessons');
  };

  const handleLessonClick = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setViewState('lesson-detail');
    setShowContinue(false);
  };

  const handleLessonComplete = () => {
    if (activeLesson) {
      setLessons(prev => prev.map(l => 
        l.id === activeLesson.id ? { ...l, isCompleted: true } : l
      ));
      showWin(`Great job, ${userName || 'friend'}! 🎉`, userName, 'correct');
      setShowContinue(true);
    }
  };

  const handleContinue = () => {
    // Neighbor lessons are not part of the Module 1 sequence.
    if (currentLessonIndex === -1) {
      setViewState('lessons');
      setActiveLesson(null);
      setShowContinue(false);
      return;
    }

    if (currentLessonIndex < lessons.length - 1) {
      const nextLesson = lessons[currentLessonIndex + 1];
      setActiveLesson(nextLesson);
      setShowContinue(false);
    } else {
      toast({ title: '🏆 Module Complete!', description: 'You finished all lessons!' });
      setViewState('lessons');
      setActiveLesson(null);
    }
  };

  const handleBack = () => {
    if (viewState === 'lesson-detail') {
      setViewState('lessons');
      setActiveLesson(null);
      setShowContinue(false);
    } else if (viewState === 'lessons') {
      navigate('/');
    } else if (viewState === 'intro-video') {
      setViewState('language-select');
    } else {
      navigate('/');
    }
  };

  const renderLessonContent = (lesson: Lesson) => {
    switch (lesson.type) {
      case 'video':
        return <VideoLesson lesson={lesson} onComplete={handleLessonComplete} onNext={() => setViewState('lessons')} />;
      case 'video-series':
        return <VideoSeriesLesson videos={lesson.videos || []} onComplete={handleLessonComplete} title={lesson.title} quizQuestions={lesson.quizQuestions} />;
      case 'vocabulary':
        if (lesson.phrases) {
          return <VocabularyLesson vocabulary={lesson.phrases.map(p => ({ id: p.id, english: p.english, pronunciation: p.pronunciation, translations: p.translations }))} onComplete={handleLessonComplete} title={lesson.title} />;
        }
        return <VocabularyLesson vocabulary={lesson.content || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'vocabulary-matching':
        return <VocabularyMatchingPractice vocabulary={lesson.content || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'sentences':
        return <SentencePractice sentences={lesson.sentences || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'numbers-practice':
        return <NumbersMatchingPractice numbers={lesson.content || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'numbers-matching':
        return <NumbersMatchingPractice numbers={lesson.content || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'speaking':
        return <SpeakingPractice phrases={lesson.phrases || greetingPhrases.slice(0, 5)} onComplete={handleLessonComplete} />;
      case 'practice':
        if (lesson.embedUrl) {
          return <EmbeddedPractice embedUrl={lesson.embedUrl} onComplete={handleLessonComplete} title={lesson.title} />;
        }
        return <VideoLesson lesson={lesson} onComplete={handleLessonComplete} onNext={() => setViewState('lessons')} />;
      case 'listening-writing':
        return <ListeningWritingPractice questions={lesson.questions || []} onComplete={handleLessonComplete} title={lesson.title} />;
      case 'fill-in-blank':
        return <FillInTheBlankPractice items={lesson.fillInBlankItems || []} onComplete={handleLessonComplete} title={lesson.title} userName={userName} />;
      case 'listening-fill-in-blank':
        return <ListeningFillInBlank items={lesson.listeningFillInBlankItems || []} onComplete={handleLessonComplete} title={lesson.title} userName={userName} />;
      case 'smart-practice':
        return <SmartAnswerPractice questions={lesson.smartQuestions || []} onComplete={handleLessonComplete} title={lesson.title} userName={userName} />;
      case 'interactive-form':
        return <InteractiveForm formType={lesson.formType || 'doctor-intake'} onComplete={handleLessonComplete} userName={userName} />;
      case 'quiz':
        return <MultipleChoiceQuiz questions={lesson.quizQuestions || []} onComplete={handleLessonComplete} title={lesson.title} characterName={lesson.title.replace('Quiz: ', '')} />;
      case 'practice-quiz':
        return <VideoPracticeQuiz slides={lesson.practiceQuizSlides || []} onComplete={handleLessonComplete} onContinue={handleContinue} lessonTitle={lesson.title} onBackToDashboard={() => navigate('/')} />;
      case 'word-order':
        return <WordOrderPractice slides={lesson.wordOrderSlides || []} onComplete={handleLessonComplete} onContinue={handleContinue} lessonTitle={lesson.title} lessonDescription={lesson.description} onBackToDashboard={() => navigate('/')} />;
      case 'speaking-test':
        const characterName = lesson.title.includes('Rosa') ? 'Rosa' : 'Marisol';
        return <SpeakingTestPractice slides={lesson.speakingTestSlides || []} onComplete={handleLessonComplete} onContinue={handleContinue} lessonTitle={lesson.title} lessonDescription={lesson.description} onBackToDashboard={() => navigate('/')} characterName={characterName} />;
      case 'neighbor-video-quiz':
        if (!lesson.neighborVideoQuiz) return null;
        return (
          <NeighborVideoQuiz
            videoUrl={lesson.neighborVideoQuiz.videoUrl}
            characterName={lesson.neighborVideoQuiz.characterName}
            quizType={lesson.neighborVideoQuiz.quizType}
            quizData={lesson.neighborVideoQuiz.quizData}
            onComplete={() => {
              showWin(`Great job, ${userName || 'friend'}! 🎉`, userName, 'correct');
              setShowContinue(true);
            }}
            onBackToDashboard={() => navigate('/')}
          />
        );
      case 'pronoun-practice':
        return <PronounPractice onComplete={handleLessonComplete} userName={userName} />;
      case 'module-checklist':
        return <Module1Checklist onComplete={() => navigate('/module/2')} userName={userName} />;
      default:
        return <VideoLesson lesson={lesson} onComplete={handleLessonComplete} onNext={() => setViewState('lessons')} />;
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
              <h1 className="font-fredoka text-lg font-bold text-primary">Module 1: Introduce Yourself</h1>
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
                    <LessonCard key={lesson.id} lesson={lesson} index={index} onClick={() => handleLessonClick(lesson)} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {viewState === 'lesson-detail' && activeLesson && (
            <motion.div key="lesson-detail" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
              {renderLessonContent(activeLesson)}
              
              {/* Continue Button */}
              {showContinue && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center gap-3 pt-4"
                >
                  <Button variant="outline" onClick={() => navigate('/')} className="gap-2">
                    <Home className="w-4 h-4" />
                    Dashboard
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

const Module1: React.FC = () => (
  <LanguageProvider>
    <Module1Content />
  </LanguageProvider>
);

export default Module1;
