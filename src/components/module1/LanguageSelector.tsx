import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SupportedLanguage, languageNames } from '@/data/module1Data';
import { useLanguage } from '@/components/LanguageContext';

interface LanguageSelectorProps {
  onSelect?: (lang: SupportedLanguage) => void;
  showTitle?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  onSelect,
  showTitle = true 
}) => {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  
  const languages = Object.entries(languageNames) as [SupportedLanguage, typeof languageNames[SupportedLanguage]][];

  const handleSelect = (lang: SupportedLanguage) => {
    setSelectedLanguage(lang);
    onSelect?.(lang);
  };

  return (
    <div className="space-y-4">
      {showTitle && (
        <h3 className="font-fredoka text-lg font-semibold text-foreground text-center">
          Choose your language for translations
        </h3>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {languages.map(([code, info], index) => (
          <motion.button
            key={code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(code)}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-200
              ${selectedLanguage === code 
                ? 'border-primary bg-primary/10 shadow-md' 
                : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
              }
            `}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">{info.flag}</span>
              <div className="text-center">
                <p className="font-semibold text-foreground">{info.native}</p>
                <p className="text-xs text-muted-foreground">{info.english}</p>
              </div>
            </div>
            
            {selectedLanguage === code && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-primary-foreground" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
