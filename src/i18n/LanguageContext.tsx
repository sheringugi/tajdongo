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
  Promise.all([
    client.queries.translations({ relativePath: `${language}.json` }),
    client.queries.global({ relativePath: `global-${language}.json` }),
  ])
    .then(([translationsRes, globalRes]) => {
      const merged = {
        ...translations[language],
        ...(translationsRes.data?.translations || {}),
        nav: globalRes.data?.global?.nav || translations[language].nav,
        footer: globalRes.data?.global?.footer || translations[language].footer,
        partners: globalRes.data?.global?.partners || translations[language].partners,
        impact: globalRes.data?.global?.impact || translations[language].impact,
      };
      setT(merged);
    })
    .catch(() => {
      setT(translations[language]);
    });
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