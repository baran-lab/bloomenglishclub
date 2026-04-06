import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, BarChart2, BookOpen, Heart, Share2, Shield, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  showAdmin?: boolean;
  onNavigate?: (section: string) => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onClose,
  userName,
  showAdmin = false,
  onNavigate,
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'progress', label: 'My Progress', icon: BarChart2 },
    { id: 'lessons', label: 'All Lessons', icon: BookOpen },
    { id: 'achievements', label: 'Achievements', icon: Heart },
    { id: 'practice', label: 'Practice Skills', icon: BookOpen },
    { id: 'pronunciation', label: 'Pronunciation', icon: Mic },
    { id: 'share', label: 'Share Progress', icon: Share2 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'admin', label: 'Admin Facility', icon: Shield },
  ];

  const visibleMenuItems = menuItems.filter((item) => item.id !== 'admin' || showAdmin);

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
    if (itemId === 'pronunciation') {
      navigate('/pronunciation');
      onClose();
      return;
    }
    onNavigate?.(itemId);
    onClose();
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
                  Bloom English Club
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
              {visibleMenuItems.map((item, index) => {
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
                Bloom English Club v1.0 • Made with 💛
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HamburgerMenu;
