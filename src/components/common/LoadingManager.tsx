'use client';

import { Box, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import LoadingAnimation from './LoadingAnimation';

interface LoadingManagerProps {
  children: React.ReactNode;
  imageUrls?: string[];
  minLoadingTime?: number;
}

export default function LoadingManager({ 
  children, 
  imageUrls = [], 
  minLoadingTime = 2000 
}: LoadingManagerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [startTime] = useState(Date.now());
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (imageUrls.length === 0) {
      // If no images to preload, just wait for minimum time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, minLoadingTime);
      return () => clearTimeout(timer);
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const preloadImage = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setImagesLoaded(loadedCount);
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setImagesLoaded(loadedCount);
          resolve(); // Resolve even on error to continue loading
        };
        img.src = url;
      });
    };

    const preloadAllImages = async () => {
      try {
        await Promise.all(imageUrls.map(preloadImage));
      } catch (error) {
        console.warn('Some images failed to load:', error);
      }

      // Ensure minimum loading time
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    preloadAllImages();
  }, [imageUrls, minLoadingTime, startTime]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <Box position="relative">
      {isLoading && (
        <LoadingAnimation 
          onLoadingComplete={handleLoadingComplete}
          duration={minLoadingTime}
        />
      )}
      
      <Box
        opacity={isLoading ? 0 : 1}
        transition="opacity 0.5s ease-in-out"
        pointerEvents={isLoading ? 'none' : 'auto'}
      >
        {children}
      </Box>
    </Box>
  );
} 