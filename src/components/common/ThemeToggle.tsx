'use client';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={colorMode}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          variant="ghost"
          color={colorMode === 'light' ? 'gray.600' : 'yellow.400'}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          _hover={{
            bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
} 