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

  const buttonStyle = {
    bg: 'white',
    color: '#e08e46',
    border: '2px solid',
    borderColor: '#e08e46',
    borderRadius: '10px',
    w: '48px',
    h: '48px',
    boxShadow: '0 4px 16px rgba(224, 142, 70, 0.15)',
    _hover: {
      bg: 'rgba(224, 142, 70, 0.05)',
      borderColor: '#d17d3a',
      boxShadow: '0 6px 24px rgba(224, 142, 70, 0.25)',
    },
    _active: {
      transform: 'scale(0.95)',
    },
  };

  return (
    <VStack
      position="fixed"
      bottom="32px"
      right="32px"
      zIndex="tooltip"
      spacing={3}
      opacity={isVisible ? 1 : 0}
      visibility={isVisible ? 'visible' : 'hidden'}
      transform={isVisible ? 'translateY(0)' : 'translateY(20px)'}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <IconButton
        aria-label="Scroll to top"
        icon={<ChevronUpIcon boxSize={6} />}
        onClick={scrollToTop}
        size="lg"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        {...buttonStyle}
        _hover={{
          ...buttonStyle._hover,
          transform: 'translateY(-3px)',
        }}
      />
      <IconButton
        aria-label="Scroll to bottom"
        icon={<ChevronDownIcon boxSize={6} />}
        onClick={scrollToBottom}
        size="lg"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        {...buttonStyle}
        _hover={{
          ...buttonStyle._hover,
          transform: 'translateY(3px)',
        }}
      />
    </VStack>
  );
} 