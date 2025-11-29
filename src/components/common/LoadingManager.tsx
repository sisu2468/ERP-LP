'use client';

import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoadingAnimation from './LoadingAnimation';

interface LoadingManagerProps {
  children: React.ReactNode;
  duration?: number;
}

export default function LoadingManager({
  children,
  duration = 2000
}: LoadingManagerProps) {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const isHomePage = pathname === '/' || pathname === '/home';

  useEffect(() => {
    // Only show loader on home page, every time
    if (isHomePage) {
      setShowLoader(true);
      setIsReady(false);
    } else {
      setShowLoader(false);
      setIsReady(true);
    }
  }, [isHomePage]);

  const handleLoadingComplete = () => {
    setShowLoader(false);
    setIsReady(true);
  };

  // Show loading placeholder only on home page before loader starts
  if (isHomePage && !isReady && !showLoader) {
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
          duration={duration}
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
