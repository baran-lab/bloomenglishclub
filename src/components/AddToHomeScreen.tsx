import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, X, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AddToHomeScreen() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('a2hs_dismissed');
    if (dismissed) return;

    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const standalone = (window.navigator as any).standalone === true || window.matchMedia('(display-mode: standalone)').matches;
    if (!standalone) {
      setIsIOS(ios);
      setTimeout(() => setShow(true), 5000);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem('a2hs_dismissed', 'true');
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-4 right-4 z-40 bg-card rounded-2xl p-4 shadow-xl border border-border max-w-md mx-auto"
      >
        <button onClick={dismiss} className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-fredoka font-semibold text-sm text-foreground">📱 Add to your Home Screen</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isIOS
                ? "Tap the Share button, then 'Add to Home Screen'."
                : "Tap the menu (⋮), then 'Add to Home Screen'."}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
