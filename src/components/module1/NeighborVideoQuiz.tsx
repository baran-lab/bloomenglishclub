import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MatchingQuiz from './MatchingQuiz';
import DragDropQuiz from './DragDropQuiz';
import FillInfoQuiz from './FillInfoQuiz';

export type QuizType = 'matching' | 'drag-drop' | 'fill-info';

interface NeighborVideoQuizProps {
  videoUrl: string;
  characterName: string;
  quizType: QuizType;
  quizData: {
    // For matching quiz
    matchingPairs?: { id: string; question: string; answer: string }[];
    // For drag-drop quiz
    sentences?: { id: string; textBefore: string; textAfter: string; correctAnswer: string }[];
    words?: string[];
    // For fill-info quiz
    fields?: { id: string; label: string; correctAnswer: string; acceptedAnswers?: string[] }[];
  };
  onComplete: () => void;
  onBackToDashboard: () => void;
}

export const NeighborVideoQuiz: React.FC<NeighborVideoQuizProps> = ({
  videoUrl,
  characterName,
  quizType,
  quizData,
  onComplete,
  onBackToDashboard,
}) => {
  const [stage, setStage] = useState<'video' | 'quiz' | 'complete'>('video');
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleContinueToQuiz = () => {
    setStage('quiz');
  };

  const handleQuizComplete = () => {
    setStage('complete');
    onComplete();
  };

  const renderQuiz = () => {
    switch (quizType) {
      case 'matching':
        return (
          <MatchingQuiz
            pairs={quizData.matchingPairs || []}
            onComplete={handleQuizComplete}
            title={`About ${characterName}`}
            characterName={characterName}
          />
        );
      case 'drag-drop':
        return (
          <DragDropQuiz
            sentences={quizData.sentences || []}
            words={quizData.words || []}
            onComplete={handleQuizComplete}
            title={`Complete ${characterName}'s Introduction`}
            characterName={characterName}
          />
        );
      case 'fill-info':
        return (
          <FillInfoQuiz
            fields={quizData.fields || []}
            onComplete={handleQuizComplete}
            title={`${characterName}'s Information`}
            characterName={characterName}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBackToDashboard}
          className="rounded-full"
        >
          <Home className="w-5 h-5" />
        </Button>
        <h1 className="font-fredoka text-xl font-bold text-foreground">
          Meet {characterName}
        </h1>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <p className="text-muted-foreground">
                Watch {characterName}'s introduction, then answer some questions
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-black shadow-lg">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                autoPlay
                className="w-full aspect-video"
                onEnded={handleVideoEnd}
              />
            </div>

            <AnimatePresence>
              {videoEnded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center"
                >
                  <Button
                    size="lg"
                    onClick={handleContinueToQuiz}
                    className="gap-2 rounded-xl bg-gradient-primary text-primary-foreground px-8"
                  >
                    Start Quiz
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {!videoEnded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <Button
                  variant="ghost"
                  onClick={handleContinueToQuiz}
                  className="text-muted-foreground"
                >
                  Skip to Quiz →
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}

        {stage === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {renderQuiz()}
          </motion.div>
        )}

        {stage === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="bg-success/20 rounded-3xl p-8 border-2 border-success">
              <span className="text-6xl block mb-4">🎉</span>
              <h2 className="font-fredoka text-2xl font-bold text-success mb-2">
                Great Job!
              </h2>
              <p className="text-foreground">
                You've learned about {characterName}!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NeighborVideoQuiz;
