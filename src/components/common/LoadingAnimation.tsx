'use client';

import { Box, Text, keyframes } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface LoadingAnimationProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const progressGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(224, 142, 70, 0.3); }
  50% { box-shadow: 0 0 20px rgba(224, 142, 70, 0.6); }
  100% { box-shadow: 0 0 5px rgba(224, 142, 70, 0.3); }
`;

const textFade = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const dotPulse = keyframes`
  0%, 20% { opacity: 0; }
  40% { opacity: 1; }
  100% { opacity: 0; }
`;

export default function LoadingAnimation({
  onLoadingComplete,
  duration = 2000
}: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const lottieContainer = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    // Load Lottie animation (bird logo)
    if (lottieContainer.current && !animationRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/logoAnimation.json'
      });
    }

    // Progress animation
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        setIsExiting(true);
        setTimeout(() => {
          onLoadingComplete?.();
        }, 400);
      }
    }, 16);

    return () => {
      clearInterval(progressInterval);
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, [duration, onLoadingComplete]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bg="#fafafa"
      zIndex={9999}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      opacity={isExiting ? 0 : 1}
      transition="opacity 0.4s ease-out"
    >
      {/* Lottie Animation */}
      <Box
        ref={lottieContainer}
        width={{ base: '180px', md: '220px' }}
        height={{ base: '130px', md: '160px' }}
        mb={6}
      />

      {/* Modern Loading Text */}
      <Text
        fontSize={{ base: 'sm', md: 'md' }}
        fontWeight="500"
        color="#6e6e73"
        letterSpacing="0.15em"
        mb={4}
        animation={`${textFade} 2s ease-in-out infinite`}
      >
        ロード中
        <Text as="span" animation={`${dotPulse} 1.4s ease-in-out infinite`}>.</Text>
        <Text as="span" animation={`${dotPulse} 1.4s ease-in-out 0.2s infinite`}>.</Text>
        <Text as="span" animation={`${dotPulse} 1.4s ease-in-out 0.4s infinite`}>.</Text>
      </Text>

      {/* Modern Progress Bar */}
      <Box
        width={{ base: '200px', md: '280px' }}
        height="3px"
        bg="#e5e7eb"
        borderRadius="full"
        overflow="hidden"
        position="relative"
      >
        <Box
          height="100%"
          width={`${progress}%`}
          bg="linear-gradient(90deg, #e08e46 0%, #f4a460 50%, #e08e46 100%)"
          backgroundSize="200% 100%"
          borderRadius="full"
          transition="width 0.1s ease-out"
          animation={`${progressGlow} 1.5s ease-in-out infinite`}
        />
      </Box>
    </Box>
  );
}
