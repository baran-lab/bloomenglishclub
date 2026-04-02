import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Settings, BarChart2, BookOpen, Heart, Share2, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { characters } from '@/data/module1Data';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onNavigate?: (section: string) => void;
}

// Map character names to their lesson IDs in Module 1
// Marisol/Rosa direct to their neighbor quizzes, others to specialized quizzes
const neighborLessons: Record<string, { lessonId: string; name: string; directToModule?: boolean }> = {
  'marisol': { lessonId: 'neighbor-marisol-quiz', name: 'Marisol Rivera' },
  'rosa': { lessonId: 'neighbor-rosa-quiz', name: 'Rosa Silva' },
  'ahmet': { lessonId: 'neighbor-ahmed', name: 'Ahmet El-Masri' },
  'saojin': { lessonId: 'neighbor-saojin', name: 'Saojin Lee' },
  'dmitry': { lessonId: 'neighbor-dmitry', name: 'Dmitry Ivanov' },
  'fatima': { lessonId: 'neighbor-fatima', name: 'Fatima Hassan' },
};

// Filter out characters not in the menu
const displayCharacters = characters.filter(c => 
  ['marisol', 'rosa', 'ahmet', 'saojin', 'dmitry', 'fatima'].includes(c.id.toLowerCase())
);

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onClose,
  userName,
  onNavigate,
}) => {
  const navigate = useNavigate();
  const [isNeighborsExpanded, setIsNeighborsExpanded] = useState(false);

  const menuItems = [
    { id: 'progress', label: 'My Progress', icon: BarChart2 },
    { id: 'lessons', label: 'All Lessons', icon: BookOpen },
    { id: 'achievements', label: 'Achievements', icon: Heart },
    { id: 'practice', label: 'Practice Skills', icon: BookOpen },
    { id: 'share', label: 'Share Progress', icon: Share2 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'admin', label: 'Admin Facility', icon: Shield },
  ];

  const handleItemClick = (itemId: string) => {
    if (itemId === 'admin') {
      navigate('/admin');
      onClose();
      return;
    }
    if (itemId === 'progress') {
      navigate('/progress');
      onClose();
      return;
    }
    if (itemId === 'achievements') {
      navigate('/achievements');
      onClose();
      return;
    }
    if (itemId === 'practice') {
      navigate('/practice');
      onClose();
      return;
    }
    onNavigate?.(itemId);
    onClose();
  };

  const handleNeighborClick = (characterKey: string) => {
    const lesson = neighborLessons[characterKey.toLowerCase()];
    if (lesson) {
      // Navigate to Module 1 with the neighbor's lesson ID
      const lessonId = lesson.lessonId;
      navigate(`/module/1?lesson=${lessonId}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-card shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-primary p-6 pt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-fredoka text-xl font-bold text-primary-foreground">
                  RealTalkEnglish
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-primary-foreground hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Hello, {userName || 'Friend'}! 🐝
              </p>
            </div>

            {/* Menu Items */}
            <nav className="p-4 space-y-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                
                return (
                  <div key={item.id}>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleItemClick(item.id)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left hover:bg-secondary transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-medium text-foreground">{item.label}</span>
                      </div>
                    </motion.button>
                  </div>
                );
              })}
            </nav>

            {/* Version info */}
            <div className="p-4 border-t border-border mt-4">
              <p className="text-xs text-muted-foreground text-center">
                RealTalkEnglish v1.0 • Made with 💛
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HamburgerMenu;
