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

import { BookOpen } from "lucide-react";
import { mockModules, mockUserProgress, Module } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { playAppJingle } from "@/utils/appJingle";
import { useToast } from "@/hooks/use-toast";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";

const Index = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>(() => {
    // All modules are unlocked - users can access any module
    return mockModules.map((m) => ({ ...m, isUnlocked: true }));
  });
  const [userProgress, setUserProgress] = useState(mockUserProgress);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { toast } = useToast();
  const hasPlayedJingle = useRef(false);
  const { startSession, endSession, getSessionDuration, currentSession } = useTrackingSystem();
  
  const userName = localStorage.getItem('englishville_user_name') || 'Friend';

  // Calculate total time spent (mock data + current session)
  const totalTimeSpent = userProgress.totalTimeSpent || 0;

  // Find the next module the user should work on
  const nextModuleIndex = modules.findIndex((m) => m.isUnlocked && !m.isCompleted);

  // Play jingle on first load
  useEffect(() => {
    if (!hasPlayedJingle.current) {
      hasPlayedJingle.current = true;
      
      // Play jingle
      setTimeout(() => {
        playAppJingle();
      }, 500);
      
      // Start tracking session
      startSession();
    }
  }, [startSession]);

  // Handle page unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      endSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [endSession]);

  const currentModule = modules.find((m) => m.isUnlocked && !m.isCompleted);
  const currentTasks = currentModule?.tasks || [];


  const handleModuleClick = (module: Module) => {
    if (!module.isUnlocked) return;
    
    if (module.id === 1) {
      navigate('/module/1');
    } else if (module.id === 2) {
      navigate('/module/2');
    } else if (module.id === 3) {
      navigate('/module/3');
    } else if (module.id === 5) {
      navigate('/module/5');
    } else {
      toast({
        title: `Opening ${module.title}`,
        description: module.quote,
      });
    }
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
          toast({
            title: "🎉 Module Complete!",
            description: `You've finished ${module.title}! Next module unlocked.`,
          });
          
          setUserProgress((prev) => ({
            ...prev,
            points: prev.points + 100,
            modulesCompleted: prev.modulesCompleted + 1,
          }));
        }
        
        return {
          ...module,
          tasks: updatedTasks,
          progress: newProgress,
          isCompleted: completedTasks === updatedTasks.length,
        };
      })
    );

    // Unlock next module if current is complete
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
    
    // Handle navigation based on section
    switch (section) {
      case 'progress':
        toast({ title: 'My Progress', description: 'Coming soon!' });
        break;
      case 'lessons':
        navigate('/module/1');
        break;
      case 'achievements':
        toast({ title: 'Achievements', description: 'Coming soon!' });
        break;
      case 'share':
        toast({ title: 'Share', description: 'Coming soon!' });
        break;
      case 'settings':
        toast({ title: 'Settings', description: 'Coming soon!' });
        break;
    }
  };

  return (
    <>
      {/* Hamburger Menu */}
      <HamburgerMenu 
        isOpen={showMenu} 
        onClose={() => setShowMenu(false)} 
        userName={userName}
        onNavigate={handleMenuNavigate}
      />

      <div className="min-h-screen bg-gradient-hero">
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowMenu(true)}
                className="rounded-full"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="font-fredoka text-xl font-bold text-primary">
                Englishville
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Streak indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 px-3 py-1.5 bg-accent/10 rounded-full"
              >
                <span className="text-lg">🔥</span>
                <span className="font-semibold text-sm text-accent-foreground">
                  {userProgress.streak}
                </span>
              </motion.div>

              {/* Points */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 rounded-full"
              >
                <span className="text-lg">⭐</span>
                <span className="font-semibold text-sm text-primary">
                  {userProgress.points}
                </span>
              </motion.div>

              {/* Notification */}
              <button className="p-2 rounded-full hover:bg-muted transition-colors relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>

              {/* Profile */}
              <button
                onClick={() => setIsProfileOpen(true)}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold hover:opacity-90 transition-opacity"
              >
                {userName.charAt(0).toUpperCase()}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container max-w-4xl mx-auto px-4 py-6">
          <WelcomeHeader />

          {/* Motivational Quote */}
          <MotivationalQuote />

          {/* Daily Tasks */}
          <div className="mt-6">
            <DailyTasks />
          </div>

          {/* Modules Grid */}
          <div className="mt-8">
            <h2 className="font-fredoka text-xl font-semibold text-foreground mb-4">
              Learning Modules
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <ModuleCard
                    module={module}
                    index={index}
                    onClick={() => handleModuleClick(module)}
                  />
                </motion.div>
              ))}
            </div>
          </div>


          {/* Practice Skills Section */}
          <div className="mt-8">
            <h2 className="font-fredoka text-xl font-semibold text-foreground mb-4">
              Practice Skills
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Vocabulary */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate('/practice?view=vocabulary')}
                className="bg-card rounded-2xl p-5 shadow-soft text-left hover:shadow-md transition-shadow border border-border group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-fredoka text-lg font-semibold text-foreground">📇 Vocabulary</h3>
                    <p className="text-xs text-muted-foreground">Learn & review words with audio</p>
                  </div>
                </div>
              </motion.button>

              {/* Games */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                onClick={() => navigate('/practice?view=games')}
                className="bg-card rounded-2xl p-5 shadow-soft text-left hover:shadow-md transition-shadow border border-border group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <span className="text-xl">🎮</span>
                  </div>
                  <div>
                    <h3 className="font-fredoka text-lg font-semibold text-foreground">🎮 Games</h3>
                    <p className="text-xs text-muted-foreground">Fun activities by module</p>
                  </div>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                  <p className="text-xs text-muted-foreground">Stats · Skills · Streak</p>
                </div>
              </div>
            </motion.button>
          </div>

          {/* Skills Section */}
          <SkillsSection progress={userProgress} />
        </main>

        {/* Profile Sidebar */}
        <ProfileSidebar
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          progress={userProgress}
        />
      </div>
    </>
  );
};

export default Index;
