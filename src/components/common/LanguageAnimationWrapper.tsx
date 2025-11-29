'use client';

import { Box, keyframes } from '@chakra-ui/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useRef, useState } from 'react';

// Sexy text reveal animation
export const textReveal = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px) rotateX(-20deg);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0);
    filter: blur(0);
  }
`;

export const underlineGrow = keyframes`
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  100% {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

// Hook to detect language changes and trigger animations
export function useLanguageAnimation() {
    const { language } = useLanguage();
    const [animationKey, setAnimationKey] = useState(0);
    const prevLanguageRef = useRef(language);

    useEffect(() => {
        if (prevLanguageRef.current !== language) {
            setAnimationKey(prev => prev + 1);
            prevLanguageRef.current = language;
        }
    }, [language]);

    return { animationKey, language };
}

interface LanguageAnimationWrapperProps {
    children: React.ReactNode;
    delay?: number;
}

export default function LanguageAnimationWrapper({
    children,
    delay = 0
}: LanguageAnimationWrapperProps) {
    const { animationKey } = useLanguageAnimation();

    return (
        <Box
            key={animationKey}
            animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`}
            opacity={delay > 0 ? 0 : 1}
            style={{ perspective: '1000px' }}
        >
            {children}
        </Box>
    );
}
