import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, Home } from "lucide-react";
import { WelcomeHeader } from "@/components/WelcomeHeader";
import { ModuleCard } from "@/components/ModuleCard";
import { SkillsSection } from "@/components/SkillsSection";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { MotivationalQuote } from "@/components/MotivationalQuote";
import { DailyTasks } from "@/components/DailyTasks";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { GoodbyeModal } from "@/components/GoodbyeModal";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { BeeMascot } from "@/components/BeeMascot";
import { ProgressChecklist } from "@/components/ProgressChecklist";
import { mockModules, mockUserProgress, Module } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { playAppJingle } from "@/utils/appJingle";
import { useToast } from "@/hooks/use-toast";
import { useTrackingSystem } from "@/hooks/useTrackingSystem";

const Index = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>(() => {
    // Auto-activate Module 1 for new users
    return mockModules.map((m, i) => i === 0 ? { ...m, isUnlocked: true } : m);
  });
  const [userProgress, setUserProgress] = useState(mockUserProgress);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showGoodbye, setShowGoodbye] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { toast } = useToast();
  const hasPlayedJingle = useRef(false);
  const { startSession, endSession, getSessionDuration, currentSession } = useTrackingSystem();
  
  const userName = localStorage.getItem('englishville_user_name') || 'Friend';
  const isFirstVisit = !localStorage.getItem('englishville_visited');

  // Find the next module the user should work on
  const nextModuleIndex = modules.findIndex((m) => m.isUnlocked && !m.isCompleted);

  // Play jingle and show welcome on first load
  useEffect(() => {
    if (!hasPlayedJingle.current) {
      hasPlayedJingle.current = true;
      
      // Show welcome screen for first-time or returning users
      if (isFirstVisit) {
        localStorage.setItem('englishville_visited', 'true');
        setShowWelcome(true);
      }
      
      // Play jingle
      setTimeout(() => {
        playAppJingle();
      }, 500);
      
      // Start tracking session
      startSession();
    }
  }, [isFirstVisit, startSession]);

  // Handle page unload - show goodbye
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Optionally show goodbye modal
      // For now, just end the session
      endSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [endSession]);

  const currentModule = modules.find((m) => m.isUnlocked && !m.isCompleted);
  const currentTasks = currentModule?.tasks || [];

  // Progress checklist items based on completed modules
  const progressItems = [
    { id: 'intro', text: 'You can introduce yourself', isCompleted: modules[0]?.progress >= 30 },
    { id: 'name', text: 'You can say your name', isCompleted: modules[0]?.progress >= 20 },
    { id: 'origin', text: 'You can tell where you are from', isCompleted: modules[0]?.progress >= 40 },
    { id: 'age', text: 'You can say your age', isCompleted: modules[0]?.progress >= 50 },
    { id: 'job', text: 'You can tell people your job', isCompleted: modules[0]?.progress >= 60 },
    { id: 'numbers', text: 'You can count to 20', isCompleted: modules[0]?.progress >= 70 },
  ];

  const handleModuleClick = (module: Module) => {
    if (!module.isUnlocked) return;
    
    if (module.id === 1) {
      navigate('/module/1');
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

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  const handleMenuNavigate = (section: string) => {
    if (section === 'neighbors') {
      // Keep menu open to show neighbors
      return;
    }
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
      {/* Welcome Screen */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen 
            userName={userName} 
            onComplete={handleWelcomeComplete}
            autoHideDelay={4000}
          />
        )}
      </AnimatePresence>

      {/* Goodbye Modal */}
      <GoodbyeModal
        isOpen={showGoodbye}
        userName={userName}
        sessionStats={currentSession ? {
          lessonsCompleted: currentSession.lessonsCompleted,
          practiceAttempts: currentSession.practiceAttempts,
          duration: getSessionDuration(),
        } : undefined}
        onClose={() => setShowGoodbye(false)}
        onStay={() => setShowGoodbye(false)}
      />

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

          {/* Bee Mascot floating near next module */}
          {nextModuleIndex >= 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center my-4"
            >
              <BeeMascot
                size="medium"
                message={`Ready to continue, ${userName}? 🎯`}
                userName={userName}
                isWaving={false}
              />
            </motion.div>
          )}

          {/* Motivational Quote */}
          <MotivationalQuote quote={currentModule?.quote || ""} />

          {/* Daily Tasks */}
          {currentTasks.length > 0 && (
            <div className="mt-6">
              <DailyTasks tasks={currentTasks} onToggle={handleTaskToggle} />
            </div>
          )}

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
                  {/* Bee indicator for next module */}
                  {index === nextModuleIndex && (
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -top-3 -right-2 z-10 text-2xl"
                    >
                      🐝
                    </motion.div>
                  )}
                  <ModuleCard
                    module={module}
                    index={index}
                    onClick={() => handleModuleClick(module)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Checklist */}
          <div className="mt-8">
            <ProgressChecklist 
              items={progressItems} 
              userName={userName}
              title="What You Can Do Now"
            />
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
