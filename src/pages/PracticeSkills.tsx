import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Lightbulb, BookOpen, Gamepad2, Headphones, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VocabularySection } from "@/components/VocabularySection";
import { GamesSection } from "@/components/GamesSection";
import { ListeningSection } from "@/components/ListeningSection";
import { EverydayEnglishSection } from "@/components/EverydayEnglishSection";
import { useState } from "react";

const PracticeSkills = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'vocabulary';
  const [activeTab, setActiveTab] = useState(initialTab);

  const isPrePublish = true;
  const completedModules = isPrePublish ? [1, 2] : [];

  const tabs = [
    { key: 'vocabulary', label: 'Vocabulary', icon: BookOpen },
    { key: 'everyday', label: 'Everyday English', icon: MessageCircle },
    { key: 'listening', label: 'Listening', icon: Headphones },
    { key: 'games', label: 'Games', icon: Gamepad2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="font-fredoka text-xl font-bold text-primary">Practice Skills</div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Tab navigation */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card text-muted-foreground hover:bg-muted border border-border'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'vocabulary' && <VocabularySection />}
        {activeTab === 'everyday' && <EverydayEnglishSection />}
        {activeTab === 'listening' && <ListeningSection />}
        {activeTab === 'games' && <GamesSection completedModules={completedModules} />}
      </main>
    </div>
  );
};

export default PracticeSkills;
