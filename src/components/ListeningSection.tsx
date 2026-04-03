import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Play, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ListeningVideo {
  id: string;
  title: string;
  videoUrl: string;
  quiz: QuizQuestion[];
}

const listeningVideos: ListeningVideo[] = [
  {
    id: 'ahmed',
    title: 'Ahmed',
    videoUrl: '/videos/listening/M1_L_Ahmed.mp4',
    quiz: [
      { question: "Where is Ahmed from?", options: ["Syria", "Egypt", "Jordan", "Iraq"], correctAnswer: 0 },
      { question: "What does Ahmed do?", options: ["He is a student", "He is a teacher", "He is a doctor", "He is a driver"], correctAnswer: 0 },
    ],
  },
  {
    id: 'marisol',
    title: 'Marisol',
    videoUrl: '/videos/listening/M1_L_Marisol.mp4',
    quiz: [
      { question: "Where is Marisol from?", options: ["Mexico", "Colombia", "Peru", "Argentina"], correctAnswer: 0 },
      { question: "What apartment does Marisol live in?", options: ["Apartment 1", "Apartment 2", "Apartment 3", "Apartment 4"], correctAnswer: 1 },
    ],
  },
  {
    id: 'saojin',
    title: 'Saojin',
    videoUrl: '/videos/listening/M1_L_Saojin.mp4',
    quiz: [
      { question: "Where is Saojin from?", options: ["Japan", "China", "South Korea", "Vietnam"], correctAnswer: 2 },
      { question: "What is Saojin's job?", options: ["Nurse", "Teacher", "Student", "Chef"], correctAnswer: 2 },
    ],
  },
  {
    id: 'fatima',
    title: 'Fatima',
    videoUrl: '/videos/listening/M1_L_Fatima.mp4',
    quiz: [
      { question: "Where is Fatima from?", options: ["Morocco", "Turkey", "Egypt", "Iran"], correctAnswer: 0 },
      { question: "How many children does Fatima have?", options: ["One", "Two", "Three", "Four"], correctAnswer: 1 },
    ],
  },
  {
    id: 'dmitry',
    title: 'Dmitry',
    videoUrl: '/videos/listening/M1_L_Dmitry.mp4',
    quiz: [
      { question: "Where is Dmitry from?", options: ["Ukraine", "Russia", "Poland", "Germany"], correctAnswer: 1 },
      { question: "What does Dmitry do?", options: ["He is a chef", "He is an engineer", "He is a mechanic", "He is a teacher"], correctAnswer: 2 },
    ],
  },
  {
    id: 'rosa',
    title: 'Rosa',
    videoUrl: '/videos/listening/M1_L_Rosa.mp4',
    quiz: [
      { question: "Where is Rosa from?", options: ["Brazil", "Portugal", "Colombia", "Spain"], correctAnswer: 2 },
      { question: "What apartment does Rosa live in?", options: ["Apartment 3", "Apartment 4", "Apartment 5", "Apartment 6"], correctAnswer: 2 },
    ],
  },
  {
    id: 'ali',
    title: 'Ali',
    videoUrl: '/videos/listening/M1_L_Ali.mp4',
    quiz: [
      { question: "Where is Ali from?", options: ["Turkey", "Syria", "Iraq", "Lebanon"], correctAnswer: 0 },
      { question: "What is Ali's job?", options: ["Driver", "Cook", "Builder", "Cleaner"], correctAnswer: 1 },
    ],
  },
];

export function ListeningSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [videoWatched, setVideoWatched] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideoData = listeningVideos.find(v => v.id === activeVideo);

  const handleVideoEnd = () => {
    setVideoWatched(true);
  };

  const handleAnswer = (index: number) => {
    if (showResult || !currentVideoData) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === currentVideoData.quiz[currentQuestion].correctAnswer) {
      setCorrectCount(prev => prev + 1);
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  const handleNextQuestion = () => {
    if (!currentVideoData) return;
    if (currentQuestion < currentVideoData.quiz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      setCompletedVideos(prev => new Set(prev).add(activeVideo!));
    }
  };

  const handleBack = () => {
    setActiveVideo(null);
    setVideoWatched(false);
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setQuizComplete(false);
  };

  if (activeVideo && currentVideoData) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-5 shadow-soft">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h3 className="font-fredoka text-lg font-semibold">Listen to {currentVideoData.title}</h3>
        </div>

        {!quizStarted ? (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden bg-black">
              <video
                ref={videoRef}
                src={currentVideoData.videoUrl}
                controls
                autoPlay
                className="w-full aspect-video"
                onEnded={handleVideoEnd}
              />
            </div>
            {videoWatched && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
                <Button onClick={() => setQuizStarted(true)} className="bg-gradient-primary text-primary-foreground gap-2">
                  Start Quiz
                </Button>
              </motion.div>
            )}
          </div>
        ) : quizComplete ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 py-6">
            <div className="text-4xl">🎉</div>
            <h4 className="font-fredoka text-xl font-bold text-foreground">
              Quiz Complete!
            </h4>
            <p className="text-muted-foreground">
              You got {correctCount}/{currentVideoData.quiz.length} correct
            </p>
            <Button onClick={handleBack} className="bg-gradient-primary text-primary-foreground">
              Back to Listening
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1}/{currentVideoData.quiz.length}</span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-primary"
                animate={{ width: `${((currentQuestion + 1) / currentVideoData.quiz.length) * 100}%` }}
              />
            </div>

            <h4 className="font-fredoka text-lg font-semibold text-foreground">
              {currentVideoData.quiz[currentQuestion].question}
            </h4>

            <div className="space-y-2">
              {currentVideoData.quiz[currentQuestion].options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-3 rounded-xl text-left text-sm font-medium transition-all border ${
                    showResult
                      ? idx === currentVideoData.quiz[currentQuestion].correctAnswer
                        ? 'bg-green-100 border-green-400 text-green-800'
                        : idx === selectedAnswer
                          ? 'bg-red-100 border-red-400 text-red-800'
                          : 'bg-muted border-border text-muted-foreground'
                      : selectedAnswer === idx
                        ? 'bg-primary/10 border-primary text-foreground'
                        : 'bg-muted border-border text-foreground hover:bg-primary/5'
                  }`}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-2">
                    {showResult && idx === currentVideoData.quiz[currentQuestion].correctAnswer && (
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    )}
                    {showResult && idx === selectedAnswer && idx !== currentVideoData.quiz[currentQuestion].correctAnswer && (
                      <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    {option}
                  </div>
                </motion.button>
              ))}
            </div>

            {showResult && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                <Button onClick={handleNextQuestion} className="bg-gradient-primary text-primary-foreground">
                  {currentQuestion < currentVideoData.quiz.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card rounded-2xl p-5 shadow-soft"
    >
      <div className="flex items-center gap-2 mb-4">
        <Headphones className="w-5 h-5 text-primary" />
        <h3 className="font-fredoka text-lg font-semibold">Listening</h3>
      </div>

      <div className="space-y-2">
        {listeningVideos.map((video, index) => {
          const isCompleted = completedVideos.has(video.id);
          return (
            <motion.button
              key={video.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              onClick={() => setActiveVideo(video.id)}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-primary/10 transition-all text-left border border-border"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-green-100' : 'bg-primary/10'}`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Play className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{index + 1}. Listen to {video.title}</p>
                  <p className="text-xs text-muted-foreground">{video.quiz.length} quiz questions</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
