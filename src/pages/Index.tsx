import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import { WelcomeHeader } from "@/components/WelcomeHeader";
import { ModuleCard } from "@/components/ModuleCard";
import { SkillsSection } from "@/components/SkillsSection";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { MotivationalQuote } from "@/components/MotivationalQuote";
import { DailyTasks } from "@/components/DailyTasks";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { CommunitySection } from "@/components/CommunitySection";
import { RealLifePrompt } from "@/components/RealLifePrompt";
import { AddToHomeScreen } from "@/components/AddToHomeScreen";

import { BookOpen, ExternalLink } from "lucide-react";
import { mockModules, mockUserProgress, Module } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { playAppJingle } from "@/utils/appJingle";
import { useToast } from "@/hooks/use-toast";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";
import { useAuthIdentity } from "@/hooks/useAuthIdentity";
import { microplay } from "@/utils/microplayMessages";

const Index = () => {
  const navigate = useNavigate();
  const { fullName, isAdmin } = useAuthIdentity();

  const [modules, setModules] = useState<Module[]>(() => {
    // If admin, unlock all modules
    return mockModules;
  });
  const [userProgress, setUserProgress] = useState(() => ({ ...mockUserProgress, name: 'Friend' }));
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showRealLife, setShowRealLife] = useState(true);
  const { toast } = useToast();
  const hasPlayedJingle = useRef(false);
  const { startSession, endSession, getSessionDuration, currentSession } = useTrackingSystem();

  const userName = fullName || 'Friend';

  // Unlock all modules for admin
  useEffect(() => {
    if (isAdmin) {
      setModules(prev => prev.map(m => ({ ...m, isUnlocked: true })));
    }
  }, [isAdmin]);

  // Calculate total time spent (mock data + current session)
  const totalTimeSpent = userProgress.totalTimeSpent || 0;

  // Find the next module the user should work on
  const nextModuleIndex = modules.findIndex((m) => m.isUnlocked && !m.isCompleted);

  // Play jingle on first load
  useEffect(() => {
    if (!hasPlayedJingle.current) {
      hasPlayedJingle.current = true;
      setTimeout(() => { playAppJingle(); }, 500);
      startSession();
    }
  }, [startSession]);

  useEffect(() => {
    setUserProgress((prev) => prev.name === userName ? prev : { ...prev, name: userName });
  }, [userName]);

  // Handle page unload
  useEffect(() => {
    const handleBeforeUnload = () => { endSession(); };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [endSession]);

  const currentModule = modules.find((m) => m.isUnlocked && !m.isCompleted);

  const handleModuleClick = (module: Module) => {
    if (!module.isUnlocked) return;
    if (module.id === 1) navigate('/module/1');
    else if (module.id === 2) navigate('/module/2');
    else if (module.id === 3) navigate('/module/3');
    else if (module.id === 5) navigate('/module/5');
    else toast({ title: `Opening ${module.title}`, description: module.quote });
  };

  const handleTaskToggle = (taskId: string) => {
    setModules((prev) =>
      prev.map((module) => {
        if (!module.isUnlocked || module.isCompleted) return module;
        const updatedTasks = module.tasks.map((task) =>
          task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        );
        const completedTasks = updatedTasks.filter((t) => t.isCompleted).length;
        const newProgress = Math.round((completedTasks / updatedTasks.length) * 100);
        if (completedTasks === updatedTasks.length && !module.isCompleted) {
          toast({ title: "🎉 Module Complete!", description: `You've finished ${module.title}! Next module unlocked.` });
          setUserProgress((prev) => ({ ...prev, points: prev.points + 100, modulesCompleted: prev.modulesCompleted + 1 }));
        }
        return { ...module, tasks: updatedTasks, progress: newProgress, isCompleted: completedTasks === updatedTasks.length };
      })
    );
    setModules((prev) => {
      const updatedModules = [...prev];
      for (let i = 0; i < updatedModules.length - 1; i++) {
        if (updatedModules[i].isCompleted && !updatedModules[i + 1].isUnlocked) {
          updatedModules[i + 1] = { ...updatedModules[i + 1], isUnlocked: true };
        }
      }
      return updatedModules;
    });
  };

  const handleMenuNavigate = (section: string) => {
    setShowMenu(false);
    switch (section) {
      case 'progress': toast({ title: 'My Progress', description: 'Coming soon!' }); break;
      case 'lessons': navigate('/module/1'); break;
      case 'achievements': toast({ title: 'Achievements', description: 'Coming soon!' }); break;
      case 'share': toast({ title: 'Share', description: 'Coming soon!' }); break;
      case 'settings': toast({ title: 'Settings', description: 'Coming soon!' }); break;
    }
  };

  // Get a real-life suggestion based on current module
  const currentModuleId = currentModule?.id || 1;
  const realLifeSuggestion = microplay.realLifeSuggestions.find(s => s.module === currentModuleId) || microplay.realLifeSuggestions[0];

  return (
    <>
      <HamburgerMenu 
        isOpen={showMenu} 
        onClose={() => setShowMenu(false)} 
        userName={userName}
        showAdmin={isAdmin}
        onNavigate={handleMenuNavigate}
      />

      <div className="min-h-screen bg-gradient-hero">
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setShowMenu(true)} className="rounded-full">
                <Menu className="w-5 h-5" />
              </Button>
              <div className="font-fredoka text-xl font-bold text-primary">English Place</div>
            </div>
            <div className="flex items-center gap-2">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 px-3 py-1.5 bg-accent/10 rounded-full">
                <span className="text-lg">🔥</span>
                <span className="font-semibold text-sm text-accent-foreground">{userProgress.streak}</span>
              </motion.div>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 rounded-full">
                <span className="text-lg">⭐</span>
                <span className="font-semibold text-sm text-primary">{userProgress.points}</span>
              </motion.div>
              <button className="p-2 rounded-full hover:bg-muted transition-colors relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <button onClick={() => setIsProfileOpen(true)} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold hover:opacity-90 transition-opacity">
                {userName.charAt(0).toUpperCase()}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container max-w-4xl mx-auto px-4 py-6">
          <WelcomeHeader userName={userName} />
          <MotivationalQuote />

          <div className="mt-6">
            <DailyTasks />
          </div>

          {/* Modules Grid */}
          <div className="mt-8">
            <h2 className="font-fredoka text-xl font-semibold text-foreground mb-4">Learning Modules</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {modules.map((module, index) => (
                <motion.div key={module.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="relative">
                  <ModuleCard module={module} index={index} onClick={() => handleModuleClick(module)} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Real-life connection prompt */}
          {showRealLife && (
            <div className="mt-6">
              <RealLifePrompt suggestion={realLifeSuggestion.text} emoji={realLifeSuggestion.emoji} onDismiss={() => setShowRealLife(false)} />
            </div>
          )}

          {/* Facebook Group + Quick Links */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Button
                className="w-full gap-2 h-auto py-4"
                onClick={() => window.open('https://www.facebook.com/share/g/1DtJ9vP9va/', '_blank')}
              >
                <ExternalLink className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-fredoka font-semibold">Join Facebook Group</p>
                  <p className="text-xs opacity-80">Practice with others</p>
                </div>
              </Button>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => navigate('/progress')}
              className="bg-card rounded-2xl p-5 shadow-soft text-left hover:shadow-md transition-shadow border border-border group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <span className="text-xl">📊</span>
                </div>
                <div>
                  <h3 className="font-fredoka text-lg font-semibold text-foreground">My Progress</h3>
                  <p className="text-xs text-muted-foreground">Your learning story</p>
                </div>
              </div>
            </motion.button>
          </div>

          <SkillsSection progress={userProgress} />
        </main>

        <ProfileSidebar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} progress={userProgress} />
        <AddToHomeScreen />
      </div>
    </>
  );
};

export default Index;
