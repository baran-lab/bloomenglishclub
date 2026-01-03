import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageContext';

interface EmbeddedPracticeProps {
  embedUrl: string;
  onComplete: () => void;
  title?: string;
}

export const EmbeddedPractice: React.FC<EmbeddedPracticeProps> = ({ 
  embedUrl, 
  onComplete,
  title = 'Interactive Practice'
}) => {
  const { t } = useLanguage();
  const [hasInteracted, setHasInteracted] = useState(false);
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-fredoka text-xl font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">Complete the interactive exercise below</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Restart
          </Button>
          <a href={embedUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Open in new tab
            </Button>
          </a>
        </div>
      </div>

      {/* Embedded iframe */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-card rounded-2xl border border-border overflow-hidden"
        style={{ minHeight: '500px' }}
      >
        <iframe
          key={key}
          src={embedUrl}
          className="w-full h-full min-h-[500px]"
          style={{ border: 'none' }}
          allow="fullscreen; autoplay;"
          allowFullScreen
          onLoad={() => setHasInteracted(true)}
        />
      </motion.div>

      {/* Instructions */}
      <div className="bg-muted/50 rounded-xl p-4">
        <h4 className="font-semibold text-foreground mb-2">📝 Instructions:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Listen to the audio carefully</li>
          <li>• Arrange the words in the correct order</li>
          <li>• Click "Check" to verify your answer</li>
          <li>• When you finish, click "Mark Complete" below</li>
        </ul>
      </div>

      {/* Complete button */}
      <div className="flex justify-center">
        <Button 
          onClick={onComplete} 
          className="gap-2 bg-green-500 hover:bg-green-600"
          size="lg"
        >
          <CheckCircle2 className="w-5 h-5" />
          Mark Complete
        </Button>
      </div>
    </div>
  );
};
