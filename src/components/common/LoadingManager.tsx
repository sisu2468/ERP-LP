'use client';

import { Box } from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import LoadingAnimation from './LoadingAnimation';

interface LoadingManagerProps {
  children: React.ReactNode;
  duration?: number;
  transitionDuration?: number;
}

export default function LoadingManager({
  children,
  duration = 2000,
  transitionDuration = 1200
}: LoadingManagerProps) {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(duration);
  const previousPathRef = useRef<string | null>(null);
  const isFirstLoad = useRef(true);

  const isHomePage = pathname === '/' || pathname === '/home';

  useEffect(() => {
    // First load - show full loader on home page
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      if (isHomePage) {
        setCurrentDuration(duration);
        setShowLoader(true);
        setIsReady(false);
      } else {
        // First load on non-home page - show shorter transition
        setCurrentDuration(transitionDuration);
        setShowLoader(true);
        setIsReady(false);
      }
      previousPathRef.current = pathname;
      return;
    }

    // Subsequent navigations - detect pathname change
    if (previousPathRef.current !== pathname) {
      previousPathRef.current = pathname;
      // Show shorter transition animation for page changes
      setCurrentDuration(transitionDuration);
      setShowLoader(true);
      setIsReady(false);
    }
  }, [pathname, isHomePage, duration, transitionDuration]);

  const handleLoadingComplete = () => {
    setShowLoader(false);
    setIsReady(true);
    // Dispatch custom event to trigger header animations
    window.dispatchEvent(new CustomEvent('loadingComplete'));
  };

  // Show loading placeholder before loader starts
  if (!isReady && !showLoader) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        bg="#fafafa"
        zIndex={9999}
      />
    );
  }

  return (
    <>
      {showLoader && (
        <LoadingAnimation
          onLoadingComplete={handleLoadingComplete}
          duration={currentDuration}
        />
      )}
      <Box
        opacity={isReady ? 1 : 0}
        transition="opacity 0.3s ease-in-out"
      >
        {children}
      </Box>
    </>
  );
}
