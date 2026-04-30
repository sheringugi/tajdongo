import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language } from "./translations";
import { client } from "../../tina/__generated__/client";

// Use a loose type instead of the strict literal type
type TranslationData = Record<string, any>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [t, setT] = useState<TranslationData>(translations["en"]);

 useEffect(() => {
  const fetchData = () => {
    client.queries.global({ relativePath: `global-${language}.json` })
      .then((globalRes) => {
        const globalData = globalRes.data?.global;
        if (globalData) {
          setT({
            ...translations[language],
            nav: globalData.nav || translations[language].nav,
            footer: globalData.footer || translations[language].footer,
            partners: globalData.partners || translations[language].partners,
            impact: globalData.impact || translations[language].impact,
          });
        }
      })
      .catch((error) => {
        console.error('TinaCloud global fetch failed:', error);
      });
  };

  fetchData();
  const interval = setInterval(fetchData, 10000); // refetch every 10 seconds
  return () => clearInterval(interval);
}, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};