import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Home, Volume2, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';
import { speakText } from '@/utils/speechUtils';

interface CoinsAndBillsProps {
  onComplete: () => void;
}

const coinVideos = [
  { url: '/videos/module5/m5-penny.mp4', title: 'Penny', subtitle: '1 cent' },
  { url: '/videos/module5/m5-nickel.mp4', title: 'Nickel', subtitle: '5 cents' },
  { url: '/videos/module5/m5-dime.mp4', title: 'Dime', subtitle: '10 cents' },
  { url: '/videos/module5/m5-quarter.mp4', title: 'Quarter', subtitle: '25 cents' },
  { url: '/videos/module5/m5-one.mp4', title: 'One Dollar', subtitle: '$1' },
  { url: '/videos/module5/m5-five.mp4', title: 'Five Dollars', subtitle: '$5' },
  { url: '/videos/module5/m5-ten.mp4', title: 'Ten Dollars', subtitle: '$10' },
  { url: '/videos/module5/m5-twenty.mp4', title: 'Twenty Dollars', subtitle: '$20' },
  { url: '/videos/module5/m5-fifty.mp4', title: 'Fifty Dollars', subtitle: '$50' },
  { url: '/videos/module5/m5-one-hundred.mp4', title: 'One Hundred Dollars', subtitle: '$100' },
];

const moneyItems = [
  { id: 'penny', label: 'Penny', emoji: '🪙', value: '1¢' },
  { id: 'nickel', label: 'Nickel', emoji: '🪙', value: '5¢' },
  { id: 'dime', label: 'Dime', emoji: '🪙', value: '10¢' },
  { id: 'quarter', label: 'Quarter', emoji: '🪙', value: '25¢' },
  { id: 'one-dollar', label: 'One dollar', emoji: '💵', value: '$1' },
  { id: 'one-dollar-bill', label: 'One-dollar bill', emoji: '💵', value: '$1' },
  { id: 'five-dollars', label: 'Five dollars', emoji: '💵', value: '$5' },
  { id: 'five-dollar-bill', label: 'Five-dollar bill', emoji: '💵', value: '$5' },
  { id: 'ten-dollars', label: 'Ten dollars', emoji: '💵', value: '$10' },
  { id: 'ten-dollar-bill', label: 'Ten-dollar bill', emoji: '💵', value: '$10' },
  { id: 'twenty-dollars', label: 'Twenty dollars', emoji: '💵', value: '$20' },
  { id: 'twenty-dollar-bill', label: 'Twenty-dollar bill', emoji: '💵', value: '$20' },
  { id: 'fifty-dollars', label: 'Fifty dollars', emoji: '💵', value: '$50' },
  { id: 'fifty-dollar-bill', label: 'Fifty-dollar bill', emoji: '💵', value: '$50' },
  { id: 'one-hundred-dollars', label: 'One hundred dollars', emoji: '💵', value: '$100' },
  { id: 'one-hundred-dollar-bill', label: 'One-hundred-dollar bill', emoji: '💵', value: '$100' },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Stage = 'videos' | 'matching';

export const CoinsAndBills: React.FC<CoinsAndBillsProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video stage
  const [stage, setStage] = useState<Stage>('videos');
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);

  // Matching stage
  const [matchOrder] = useState<typeof moneyItems>(() => shuffleArray(moneyItems));
  const [currentMatch, setCurrentMatch] = useState(0);
  const [shuffledButtons] = useState<typeof moneyItems>(() => shuffleArray([...moneyItems]));
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Video handlers
  const handleVideoEnd = () => setVideoEnded(true);

  const handleNextVideo = () => {
    if (currentVideoIdx < coinVideos.length - 1) {
      setCurrentVideoIdx(prev => prev + 1);
      setVideoEnded(false);
    } else {
      setStage('matching');
    }
  };

  // Matching handlers
  const playCurrentItem = () => {
    if (currentMatch >= matchOrder.length) return;
    setIsPlaying(true);
    speakText(matchOrder[currentMatch].label, 0.7);
    setTimeout(() => setIsPlaying(false), 1500);
  };

  const handleMatchClick = (item: typeof moneyItems[0]) => {
    if (matched.has(item.id)) return;
    const target = matchOrder[currentMatch];
    if (item.id === target.id) {
      playSuccessSound();
      const newMatched = new Set(matched);
      newMatched.add(item.id);
      setMatched(newMatched);
      setWrongId(null);
      if (newMatched.size === moneyItems.length) {
        setIsComplete(true);
      } else {
        // Find next unmatched
        let next = currentMatch + 1;
        while (next < matchOrder.length && newMatched.has(matchOrder[next].id)) next++;
        if (next < matchOrder.length) {
          setCurrentMatch(next);
          setTimeout(() => speakText(matchOrder[next].label, 0.7), 600);
        }
      }
    } else {
      playErrorSound();
      setWrongId(item.id);
      setTimeout(() => setWrongId(null), 800);
    }
  };

  // VIDEO STAGE
  if (stage === 'videos') {
    const video = coinVideos[currentVideoIdx];
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
            <Home className="w-4 h-4" /> Dashboard
          </Button>
          <span className="text-sm text-muted-foreground">{currentVideoIdx + 1}/{coinVideos.length}</span>
        </div>

        <div className="text-center space-y-2">
          <h2 className="font-fredoka text-2xl font-bold text-foreground">💰 Coins & Bills</h2>
          <p className="text-muted-foreground text-sm">Listen and repeat: {video.title} ({video.subtitle})</p>
        </div>

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div className="h-full bg-primary rounded-full"
            animate={{ width: `${((currentVideoIdx + 1) / coinVideos.length) * 100}%` }} />
        </div>

        <div className="rounded-2xl overflow-hidden bg-black shadow-lg">
          <video preload="metadata" ref={videoRef} src={video.url}
            controls autoPlay className="w-full aspect-video" onEnded={handleVideoEnd}
            key={video.url} />
        </div>

        <div className="flex justify-center">
          <Button onClick={handleNextVideo} className="gap-2 px-8">
            {currentVideoIdx < coinVideos.length - 1 ? 'Next' : 'Start Matching Game'} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // COMPLETION
  if (isComplete) {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 p-6 bg-accent rounded-xl border border-border">
          <div className="text-4xl">🎉</div>
          <h3 className="font-fredoka text-xl font-bold text-primary">All coins and bills matched!</h3>
          <p className="text-muted-foreground">Great job learning US money!</p>
          <Button onClick={onComplete} className="gap-2">Continue <ArrowRight className="w-4 h-4" /></Button>
        </motion.div>
      </div>
    );
  }

  // MATCHING STAGE
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-4 h-4" /> Dashboard
        </Button>
        <span className="text-sm text-muted-foreground">{matched.size}/{moneyItems.length} matched</span>
      </div>

      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">💰 Tap What You Hear</h2>
        <p className="text-muted-foreground text-sm">Listen to the audio and tap the correct coin or bill.</p>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full"
          animate={{ width: `${(matched.size / moneyItems.length) * 100}%` }} />
      </div>

      <div className="flex justify-center">
        <Button onClick={playCurrentItem} variant="outline" size="lg" className="gap-2 text-lg"
          disabled={isPlaying}>
          <Volume2 className="w-5 h-5" /> {isPlaying ? 'Playing...' : 'Listen'}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {shuffledButtons.map(item => {
          const isMatched = matched.has(item.id);
          const isWrong = wrongId === item.id;
          return (
            <motion.button key={item.id} onClick={() => handleMatchClick(item)}
              whileHover={!isMatched ? { scale: 1.03 } : {}}
              whileTap={!isMatched ? { scale: 0.97 } : {}}
              className={`relative p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                isMatched
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 opacity-60'
                  : isWrong
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 animate-shake'
                  : 'border-border bg-card hover:bg-accent text-foreground'
              }`}>
              <span className="text-xl">{item.emoji}</span>
              <div className="mt-1 leading-tight">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.value}</div>
              {isMatched && <CheckCircle2 className="absolute top-1 right-1 w-4 h-4 text-green-600" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
