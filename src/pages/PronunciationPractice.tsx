import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Square, Play, RotateCcw, Volume2, ChevronRight, ChevronLeft, CheckCircle2, Lightbulb, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageContext';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { getErrorsForLanguage, languageTips, difficultyLevels, PronunciationError } from '@/data/pronunciationData';
import { speakText } from '@/utils/speechUtils';

  const allErrors = getErrorsForLanguage(selectedLanguage);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selfRating, setSelfRating] = useState<SelfRating>(null);
  const [completedSounds, setCompletedSounds] = useState<Set<string>>(new Set());
  const [view, setView] = useState<'list' | 'practice'>('list');

  const filteredErrors = difficultyFilter === 'all'
    ? allErrors
    : allErrors.filter(e => e.difficulty === difficultyFilter);

  const currentError = filteredErrors[currentIndex];

  const speakWord = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      
      // Ensure voices are loaded before speaking
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        const englishVoice = voices.find(v => v.lang.startsWith('en'));
        if (englishVoice) utterance.voice = englishVoice;
      }
      
      // Workaround for Chrome bug where speechSynthesis stops working
      setTimeout(() => {
        speechSynthesis.speak(utterance);
      }, 50);
    }
  }, []);

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      clearRecording();
      setSelfRating(null);
      await startRecording();
    }
  };

  const handleSelfRate = (rating: SelfRating) => {
    setSelfRating(rating);
    if (currentError && (rating === 'good' || rating === 'okay')) {
      setCompletedSounds(prev => new Set([...prev, currentError.id]));
    }
  };

  const goNext = () => {
    if (currentIndex < filteredErrors.length - 1) {
      setCurrentIndex(prev => prev + 1);
      clearRecording();
      setSelfRating(null);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      clearRecording();
      setSelfRating(null);
    }
  };

  const startPractice = (index: number) => {
    setCurrentIndex(index);
    clearRecording();
    setSelfRating(null);
    setView('practice');
  };

  const difficultyColor = (d: string) => {
    if (d === 'easy') return 'bg-green-500/20 text-green-700';
    if (d === 'medium') return 'bg-yellow-500/20 text-yellow-700';
    return 'bg-red-500/20 text-red-700';
  };

  // ─── LIST VIEW ───
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="font-fredoka text-xl font-bold text-primary">🗣 Pronunciation Practice</div>
          </div>
        </header>

        <main className="container max-w-4xl mx-auto px-4 py-6 space-y-5">
          {/* Language tip */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 bg-primary/10 rounded-2xl">
            <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-foreground">{languageTips[selectedLanguage]}</p>
          </motion.div>

          {/* Progress */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Practiced: {completedSounds.size} / {allErrors.length} sounds</span>
            <span className="text-primary font-semibold">
              {allErrors.length > 0 ? Math.round((completedSounds.size / allErrors.length) * 100) : 0}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div className="h-full bg-primary rounded-full"
              animate={{ width: `${allErrors.length > 0 ? (completedSounds.size / allErrors.length) * 100 : 0}%` }} />
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {(['all', ...difficultyLevels] as const).map(level => (
              <button key={level} onClick={() => { setDifficultyFilter(level); setCurrentIndex(0); }}
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
                  difficultyFilter === level ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}>
                {level}
              </button>
            ))}
          </div>

          {/* Sound cards */}
          <div className="grid gap-3">
            {filteredErrors.map((error, idx) => (
              <motion.button key={error.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => startPractice(idx)}
                className="bg-card rounded-xl p-4 border border-border text-left hover:shadow-md transition-shadow group flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  {completedSounds.has(error.id) ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <span className="text-lg font-bold text-primary">{error.ipa}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{error.sound}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${difficultyColor(error.difficulty)}`}>
                      {error.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{error.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
              </motion.button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // ─── PRACTICE VIEW ───
  if (!currentError) return null;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setView('list')} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="font-fredoka text-lg font-bold text-primary">
            {currentError.sound}
          </div>
          <span className="ml-auto text-sm text-muted-foreground">
            {currentIndex + 1} / {filteredErrors.length}
          </span>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Sound card */}
        <AnimatePresence mode="wait">
          <motion.div key={currentError.id}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-primary/15 to-primary/5 p-6 text-center space-y-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${difficultyColor(currentError.difficulty)}`}>
                {currentError.difficulty}
              </span>
              <h2 className="text-3xl font-bold text-foreground">{currentError.sound}</h2>
              <p className="text-muted-foreground text-sm">{currentError.description}</p>
            </div>

            <div className="p-6 space-y-5">
              {/* Common mistake */}
              <div className="p-3 bg-destructive/10 rounded-xl">
                <p className="text-sm font-medium text-destructive">❌ Common mistake: {currentError.commonMistake}</p>
              </div>

              {/* Tip */}
              <div className="p-3 bg-primary/10 rounded-xl">
                <p className="text-sm font-medium text-primary">💡 Tip: {currentError.tip}</p>
              </div>

              {/* Example words */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">Example Words</h4>
                <div className="flex flex-wrap gap-2">
                  {currentError.exampleWords.map((ew, i) => (
                    <button key={i} onClick={() => speakWord(ew.word.replace(/[↑↓]/g, ''))}
                      className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl hover:bg-muted/80 transition-colors group">
                      <Volume2 className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      <span className="font-medium text-foreground">{ew.word}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Practice phrase */}
              <div className="bg-muted/50 rounded-xl p-4 text-center space-y-3">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Practice this phrase</p>
                <p className="text-lg font-semibold text-foreground">"{currentError.practicePhrase}"</p>
                <Button variant="outline" size="sm" onClick={() => speakWord(currentError.practicePhrase)} className="gap-2">
                  <Volume2 className="w-4 h-4" /> Listen
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Recording section */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <p className="text-center text-sm text-muted-foreground font-medium">Record yourself saying the phrase</p>

          <div className="flex justify-center">
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleRecord}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isRecording ? 'bg-destructive text-destructive-foreground animate-pulse' : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}>
              {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </motion.button>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            {isRecording ? 'Tap to stop' : 'Tap to record'}
          </p>

          {/* Playback */}
          {audioUrl && !isRecording && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center gap-3">
              <Button variant="outline" size="sm" onClick={() => { const a = new Audio(audioUrl); a.play(); }} className="gap-2">
                <Play className="w-4 h-4" /> Play Back
              </Button>
              <Button variant="outline" size="sm" onClick={() => { clearRecording(); setSelfRating(null); }} className="gap-2">
                <RotateCcw className="w-4 h-4" /> Try Again
              </Button>
            </motion.div>
          )}

          {/* Self-assessment */}
          {audioUrl && !isRecording && !selfRating && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <p className="text-center text-sm font-medium text-foreground">How did it sound?</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => handleSelfRate('good')}
                  className="px-4 py-2 rounded-xl bg-green-500/15 text-green-700 font-medium text-sm hover:bg-green-500/25 transition-colors">
                  😊 Good!
                </button>
                <button onClick={() => handleSelfRate('okay')}
                  className="px-4 py-2 rounded-xl bg-yellow-500/15 text-yellow-700 font-medium text-sm hover:bg-yellow-500/25 transition-colors">
                  🤔 Okay
                </button>
                <button onClick={() => handleSelfRate('needsWork')}
                  className="px-4 py-2 rounded-xl bg-red-500/15 text-red-700 font-medium text-sm hover:bg-red-500/25 transition-colors">
                  😬 Needs Work
                </button>
              </div>
            </motion.div>
          )}

          {/* Rating feedback */}
          {selfRating && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className={`text-center p-3 rounded-xl ${
                selfRating === 'good' ? 'bg-green-500/15 text-green-700' :
                selfRating === 'okay' ? 'bg-yellow-500/15 text-yellow-700' :
                'bg-red-500/15 text-red-700'
              }`}>
              <p className="font-semibold">
                {selfRating === 'good' ? '🎉 Great job! Keep it up!' :
                 selfRating === 'okay' ? '👍 Good effort! Try once more to feel confident.' :
                 '💪 No worries! Listen again and try to match the sound.'}
              </p>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>
          <Button onClick={goNext} disabled={currentIndex === filteredErrors.length - 1} className="gap-2">
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PronunciationPractice;
