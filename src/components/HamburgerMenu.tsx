import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Settings, BarChart2, BookOpen, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { characters } from '@/data/module1Data';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onNavigate?: (section: string) => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onClose,
  userName,
  onNavigate,
}) => {
  const menuItems = [
    { id: 'neighbors', label: 'Meet Your Neighbors', icon: Users },
    { id: 'progress', label: 'My Progress', icon: BarChart2 },
    { id: 'lessons', label: 'All Lessons', icon: BookOpen },
    { id: 'achievements', label: 'Achievements', icon: Heart },
    { id: 'share', label: 'Share Progress', icon: Share2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleItemClick = (itemId: string) => {
    onNavigate?.(itemId);
    if (itemId !== 'neighbors') {
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
            className="fixed left-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-card shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-primary p-6 pt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-fredoka text-xl font-bold text-primary-foreground">
                  Englishville
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
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleItemClick(item.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-secondary transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium text-foreground">{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Neighbors Section (expandable) */}
            <div className="p-4 border-t border-border">
              <h3 className="font-fredoka font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Your Neighbors
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {characters.slice(0, 8).map((character) => (
                  <motion.div
                    key={character.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                      {character.avatar}
                    </div>
                    <span className="text-xs text-muted-foreground truncate max-w-full">
                      {character.name.split(' ')[0]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Version info */}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs text-muted-foreground text-center">
                Englishville v1.0 • Made with 💛
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HamburgerMenu;
