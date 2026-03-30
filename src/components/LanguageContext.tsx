import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SupportedLanguage, languageNames, uiTranslations } from '@/data/module1Data';

interface LanguageContextType {
  selectedLanguage: SupportedLanguage;
  setSelectedLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  languageInfo: { native: string; english: string; flag: string } | undefined;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('spanish');

  const t = (key: string): string => {
    return uiTranslations[selectedLanguage]?.[key] || key;
  };

  const languageInfo = languageNames[selectedLanguage];

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, t, languageInfo }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
