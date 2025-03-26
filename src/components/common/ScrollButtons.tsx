'use client';

import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { IconButton, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function ScrollButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show buttons when page is scrolled 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <VStack
      position="fixed"
      bottom="4"
      right="4"
      zIndex="tooltip"
      spacing={2}
      opacity={isVisible ? 1 : 0}
      transform={isVisible ? 'translateY(0)' : 'translateY(20px)'}
      transition="all 0.3s ease-in-out"
    >
      <IconButton
        aria-label="Scroll to top"
        icon={<ChevronUpIcon />}
        onClick={scrollToTop}
        colorScheme="orange"
        size="lg"
        borderRadius="full"
        boxShadow="lg"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'xl',
        }}
      />
      <IconButton
        aria-label="Scroll to bottom"
        icon={<ChevronDownIcon />}
        onClick={scrollToBottom}
        colorScheme="orange"
        size="lg"
        borderRadius="full"
        boxShadow="lg"
        _hover={{
          transform: 'translateY(2px)',
          boxShadow: 'xl',
        }}
      />
    </VStack>
  );
} 