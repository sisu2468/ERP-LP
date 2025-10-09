'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

export default function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  useEffect(() => {
    // 理志：言語に応じてHTML要素のlang属性を動的に更新
    document.documentElement.lang = language;
  }, [language]);

  return <>{children}</>;
}
