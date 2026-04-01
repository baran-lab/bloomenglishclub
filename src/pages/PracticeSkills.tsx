import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Gamepad2, ArrowLeft, ChevronRight, ChevronDown, ChevronUp, ExternalLink, Lock, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VocabularySection } from "@/components/VocabularySection";
import { GamesSection } from "@/components/GamesSection";

type View = 'home' | 'vocabulary' | 'games';

const PracticeSkills = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>('home');

  // TODO: replace with real completion tracking
  const completedModules: number[] = [];
  const isPrePublish = true;

  if (view === 'vocabulary') {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setView('home')} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="font-fredoka text-xl font-bold text-primary">Vocabulary Practice</div>
          </div>
        </header>
        <main className="container max-w-4xl mx-auto px-4 py-6">
          <VocabularySection />
        </main>
      </div>
    );
  }

  if (view === 'games') {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setView('home')} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="font-fredoka text-xl font-bold text-primary">Games</div>
          </div>
        </header>
        <main className="container max-w-4xl mx-auto px-4 py-6">
          <GamesSection completedModules={isPrePublish ? [1, 2] : completedModules} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="font-fredoka text-xl font-bold text-primary">Practice Skills</div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6">
        {/* Guidance message */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 bg-primary/10 rounded-2xl mb-6"
        >
          <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-foreground">
            Practice your English with vocabulary and games. Choose a category to begin.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Vocabulary Card */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setView('vocabulary')}
            className="bg-card rounded-2xl p-6 shadow-soft text-left hover:shadow-md transition-shadow border border-border group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-fredoka text-lg font-semibold text-foreground mb-1">📇 Vocabulary Practice</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Learn and review vocabulary with audio, translations, and voice recording.
            </p>
            <div className="flex items-center gap-1 text-xs text-primary font-medium">
              <span>Module 1</span>
            </div>
            <div className="flex items-center justify-end mt-2">
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </motion.button>

          {/* Games Card */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setView('games')}
            className="bg-card rounded-2xl p-6 shadow-soft text-left hover:shadow-md transition-shadow border border-border group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Gamepad2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-fredoka text-lg font-semibold text-foreground mb-1">🎮 Games</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Fun interactive games organized by module to reinforce what you've learned.
            </p>
            <div className="flex items-center gap-1 text-xs text-primary font-medium">
              <span>Module 1 · Module 2</span>
            </div>
            <div className="flex items-center justify-end mt-2">
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default PracticeSkills;
