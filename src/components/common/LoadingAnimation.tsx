'use client';

import { Box, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

export default function LoadingAnimation({ 
  onLoadingComplete, 
  duration = 3500 
}: LoadingAnimationProps) {
  const [loading, setLoading] = useState(true);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onLoadingComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete]);

  if (!loading) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bg={colorMode === 'light' ? 'white' : 'gray.900'}
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Box
        position="relative"
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* SVG Animation Container */}
        <Box
          position="absolute"
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            as="object"
            data="/svg/svg1.svg"
            type="image/svg+xml"
            width="100%"
            height="100%"
            maxWidth="800px"
            maxHeight="600px"
            sx={{
              '& svg': {
                width: '100%',
                height: '100%',
                filter: colorMode === 'dark' ? 'invert(1)' : 'none'
              }
            }}
          />
        </Box>
        
        {/* Loading Text */}
        <Box
          position="absolute"
          bottom="20%"
          left="50%"
          transform="translateX(-50%)"
          textAlign="center"
        >
          <Box
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="medium"
            color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
            opacity={0.8}
          >
            読み込み中...
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 