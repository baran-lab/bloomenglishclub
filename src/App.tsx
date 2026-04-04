import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/components/LanguageContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Lazy load heavy module pages (video-heavy)
const Module1 = lazy(() => import("./pages/Module1"));
const Module2 = lazy(() => import("./pages/Module2"));
const Module3 = lazy(() => import("./pages/Module3"));
const Module5 = lazy(() => import("./pages/Module5"));
const PracticeSkills = lazy(() => import("./pages/PracticeSkills"));
const MyProgress = lazy(() => import("./pages/MyProgress"));
const Achievements = lazy(() => import("./pages/Achievements"));
const PronunciationPractice = lazy(() => import("./pages/PronunciationPractice"));
const Admin = lazy(() => import("./pages/Admin"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground font-medium">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/module/1" element={<Module1 />} />
              <Route path="/module/2" element={<Module2 />} />
              <Route path="/module/3" element={<Module3 />} />
              <Route path="/module/5" element={<Module5 />} />
              <Route path="/practice" element={<PracticeSkills />} />
              <Route path="/progress" element={<MyProgress />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/pronunciation" element={<PronunciationPractice />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
