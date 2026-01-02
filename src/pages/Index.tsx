import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { WelcomeHeader } from "@/components/WelcomeHeader";
import { ModuleCard } from "@/components/ModuleCard";
import { SkillsSection } from "@/components/SkillsSection";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { MotivationalQuote } from "@/components/MotivationalQuote";
import { DailyTasks } from "@/components/DailyTasks";
import { mockModules, mockUserProgress, Module, Task } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>(mockModules);
  const [userProgress, setUserProgress] = useState(mockUserProgress);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { toast } = useToast();

  const currentModule = modules.find((m) => m.isUnlocked && !m.isCompleted);
  const currentTasks = currentModule?.tasks || [];

  const handleModuleClick = (module: Module) => {
    if (!module.isUnlocked) return;
    
    // Navigate to the module page
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
        
        // Check if all tasks are complete
        if (completedTasks === updatedTasks.length && !module.isCompleted) {
          toast({
            title: "🎉 Module Complete!",
            description: `You've finished ${module.title}! Next module unlocked.`,
          });
          
          // Update user progress
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

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-fredoka text-xl font-bold text-primary">
            Englishville
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
              {userProgress.name.charAt(0)}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-6">
        <WelcomeHeader />

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
              <ModuleCard
                key={module.id}
                module={module}
                index={index}
                onClick={() => handleModuleClick(module)}
              />
            ))}
          </div>
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
  );
};

export default Index;
