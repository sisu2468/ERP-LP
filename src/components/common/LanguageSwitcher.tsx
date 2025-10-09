'use client';

import {
  Box,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
  Text,
  keyframes,
  useColorMode,
} from '@chakra-ui/react';
import { FaGlobe, FaCheck } from 'react-icons/fa';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useState } from 'react';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 理志：国旗文字を使用しないことにした
const languageInfo = {
  ja: { name: '日本語', flag: '🇯🇵' },
  en: { name: 'English', flag: '🇺🇸' },
  ko: { name: '한국어', flag: '🇰🇷' },
};

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { colorMode } = useColorMode();
  const [isRotating, setIsRotating] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    if (lang !== language) {
      setIsRotating(true);
      setLanguage(lang);
      setTimeout(() => setIsRotating(false), 600);
    }
  };

  return (
    <Menu>
      <MenuButton
        as={Box}
        cursor="pointer"
        p={2}
        borderRadius="lg"
        transition="all 0.3s"
        _hover={{
          bg: colorMode === 'light' ? 'rgba(224, 142, 70, 0.1)' : 'rgba(224, 142, 70, 0.2)',
          transform: 'translateY(-2px)',
        }}
      >
        <HStack spacing={2}>
          <Icon
            as={FaGlobe}
            boxSize={5}
            color="#e08e46"
            animation={isRotating ? `${rotate} 0.6s ease-in-out` : 'none'}
          />
          <Text
            fontSize="sm"
            fontWeight="600"
            color={colorMode === 'light' ? 'gray.700' : 'white'}
            display={{ base: 'none', md: 'block' }}
          >
            {languageInfo[language].name}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList
        py={2}
        boxShadow="xl"
        border="2px solid"
        borderColor={colorMode === 'light' ? 'rgba(224, 142, 70, 0.2)' : 'rgba(224, 142, 70, 0.3)'}
        borderRadius="xl"
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        minW="200px"
      >
        {Object.entries(languageInfo).map(([lang, info]) => (
          <MenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang as Language)}
            bg={language === lang ? (colorMode === 'light' ? 'rgba(224, 142, 70, 0.1)' : 'rgba(224, 142, 70, 0.2)') : 'transparent'}
            _hover={{
              bg: colorMode === 'light' ? 'rgba(224, 142, 70, 0.15)' : 'rgba(224, 142, 70, 0.25)',
            }}
            borderLeft="3px solid"
            borderLeftColor={language === lang ? '#e08e46' : 'transparent'}
            transition="all 0.2s"
          >
            <HStack spacing={3} w="full" justify="space-between">
              <HStack spacing={3}>
                <Text
                  fontSize="sm"
                  fontWeight={language === lang ? '700' : '500'}
                  color={language === lang ? '#e08e46' : (colorMode === 'light' ? 'gray.700' : 'gray.300')}
                >
                  {info.name}
                </Text>
              </HStack>
              {language === lang && (
                <Icon
                  as={FaCheck}
                  boxSize={4}
                  color="#e08e46"
                  animation={`${pulse} 1s ease-in-out infinite`}
                />
              )}
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
