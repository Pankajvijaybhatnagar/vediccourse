'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Bilingual content is authored inline as { en, hi } objects; `t()` picks the active language.
const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: (v) => (typeof v === 'string' ? v : v?.en) });
const STORAGE_KEY = 'vedicdhaam-lang';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'hi' || saved === 'en') setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const t = useCallback((v) => (v == null ? '' : typeof v === 'string' || typeof v === 'number' ? v : v[lang] ?? v.en), [lang]);

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);

/** Inline translation usable from server components: <T en="Home" hi="होम" /> */
export function T({ en, hi }) {
  const { lang } = useLang();
  return lang === 'hi' && hi ? hi : en;
}
