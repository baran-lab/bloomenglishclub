import { motion } from "framer-motion";
import { Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CommunitySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-5 shadow-soft border border-border"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-fredoka text-lg font-semibold text-foreground">🌍 Join Our Community</h3>
          <p className="text-xs text-muted-foreground">Practice English with others</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Share your answers and experiences. Practice English with students from around the world.
      </p>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          className="gap-1.5"
          onClick={() => window.open('https://www.facebook.com/groups/', '_blank')}
        >
          <ExternalLink className="w-4 h-4" /> Join our Facebook Group
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-3 italic">
        💡 Tip: Record your daily task answer and share it in the group!
      </p>
    </motion.div>
  );
}
