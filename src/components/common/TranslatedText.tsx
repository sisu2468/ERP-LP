'use client';

import { Text, TextProps } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';

interface TranslatedTextProps extends TextProps {
  translationKey: string;
  as?: any;
  staggerDelay?: number;
}

export default function TranslatedText({ translationKey, staggerDelay = 0, as, ...props }: TranslatedTextProps) {
  const { t, language } = useLanguage();
  const textRef = useRef<HTMLElement>(null);
  const prevLanguage = useRef(language);
  const hasAnimated = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (textRef.current && isMounted) {
      const shouldAnimate = prevLanguage.current !== language && hasAnimated.current;
      
      if (shouldAnimate) {
        // 理志：言語変更時のみウォーターフォールアニメーション
        const text = textRef.current;
        const chars = t(translationKey).split('');
        
        text.innerHTML = chars
          .map((char) => `<span style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');

        const charElements = text.querySelectorAll('span');

        gsap.fromTo(
          charElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.02,
            delay: staggerDelay,
            ease: 'power3.out',
          }
        );
      } else if (!hasAnimated.current) {
        // 理志：初回レンダリング時は即座に表示
        hasAnimated.current = true;
      }

      prevLanguage.current = language;
    }
  }, [language, staggerDelay, isMounted, t, translationKey]);

  return (
    <Text 
      ref={textRef} 
      as={as || 'span'} 
      display={as === 'span' || !as ? 'inline' : 'block'} 
      suppressHydrationWarning 
      {...props}
    >
      {t(translationKey)}
    </Text>
  );
}
