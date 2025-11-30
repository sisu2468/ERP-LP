'use client';

import { navItems } from '@/constant/navItems';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import gsap from 'gsap';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import SLink from './SLink';
import Header_MenuButton from './buttons/Header_MenuButton';
import InquiryModal from './common/InquiryModal';
import LanguageSwitcher from './common/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import lottie, { AnimationItem } from 'lottie-web';

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const lottieAnimationRef = useRef<AnimationItem | null>(null);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const { t } = useLanguage();

  // Check if animation already played this session
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [showStaticLogo, setShowStaticLogo] = useState(true);

  // Listen for loading complete event from LoadingManager
  useEffect(() => {
    const hasAnimated = sessionStorage.getItem('headerAnimationPlayed');

    const handleLoadingComplete = () => {
      if (!hasAnimated) {
        setShouldAnimate(true);
        setShowStaticLogo(false); // Show Lottie animation instead
        sessionStorage.setItem('headerAnimationPlayed', 'true');
      }
    };

    // Listen for the custom event
    window.addEventListener('loadingComplete', handleLoadingComplete);

    return () => {
      window.removeEventListener('loadingComplete', handleLoadingComplete);
    };
  }, []);

  // Logo Lottie animation (only if first visit this session)
  useEffect(() => {
    if (!logoContainerRef.current || !shouldAnimate || showStaticLogo) return;

    // Clear any existing animation
    if (lottieAnimationRef.current) {
      lottieAnimationRef.current.destroy();
    }

    // Load Lottie animation
    lottieAnimationRef.current = lottie.loadAnimation({
      container: logoContainerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: '/logoAnimation-titles.json',
    });

    // Speed up the animation (1.5x faster)
    lottieAnimationRef.current.setSpeed(1.5);

    // When animation completes, show static logo
    lottieAnimationRef.current.addEventListener('complete', () => {
      setShowStaticLogo(true);
    });

    return () => {
      if (lottieAnimationRef.current) {
        lottieAnimationRef.current.destroy();
      }
    };
  }, [shouldAnimate, showStaticLogo]);

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    if (hamburgerRef.current) {
      gsap.to(hamburgerRef.current, {
        rotate: isMobileMenuOpen ? 0 : 180,
        scale: 1.2,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(hamburgerRef.current, {
            scale: 1,
            duration: 0.2,
          });
        }
      });
    }

    if (mobileMenuRef.current) {
      if (!isMobileMenuOpen) {
        gsap.set(mobileMenuRef.current, { display: 'block', height: 'auto' });
        const height = mobileMenuRef.current.offsetHeight;
        gsap.fromTo(mobileMenuRef.current,
          { height: 0, opacity: 0 },
          {
            height: height,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(mobileMenuRef.current, { display: 'none' });
          }
        });
      }
    }
  };

  return (
    <Box
      as="nav"
      ref={navRef}
      position="sticky"
      top="0"
      left="0"
      right="0"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      backdropFilter="blur(8px)"
      borderBottom="1px"
      borderColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      zIndex="sticky"
    >
      <Box w="100%">
        <Flex
          h="16"
          alignItems="center"
          justifyContent={{ base: 'space-between', lg: 'space-between', xl: 'flex-start' }}
          gap={10}
          borderBottom="1px"
          borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          px={{ base: 4, sm: 6, xl: 8 }}
        >
          <Box>
            <SLink href="/">
              {showStaticLogo ? (
                <Image
                  src={colorMode === 'light' ? "/logos/sainta.png" : "/logos/sainta-white.png"}
                  alt="サインタロゴ"
                  width={120}
                  height={35}
                />
              ) : (
                <Box
                  ref={logoContainerRef}
                  width="120px"
                  height="40px"
                  sx={{
                    '& svg': {
                      width: '100%',
                      height: '100%',
                    },
                    '& path': {
                      fill: colorMode === 'light' ? '#000' : '#fff',
                    },
                  }}
                />
              )}
            </SLink>
          </Box>

          <HStack spacing="8" display={{ base: 'none', md: 'none', lg: 'none', xl: 'flex' }}>
            {navItems.map((item) => (
              <Menu key={item.path}>
                {item.subMenu ? (
                  <Header_MenuButton pathname={pathname} item={item}>
                    <Flex gap={1} alignItems='center' color={colorMode === 'light' ? 'gray.600' : 'white'}>
                      {t(item.title)}
                      <Icon
                        as={ChevronDownIcon}
                        ml={1}
                        h={4}
                        w={4}
                        color={colorMode === 'light' ? 'gray.600' : 'white'}
                      />
                    </Flex>
                  </Header_MenuButton>
                ) : item.title === 'nav.contact' ? (
                  <Button
                    variant="ghost"
                    className="nav-item"
                    px="3"
                    py="2"
                    fontSize="sm"
                    fontWeight="medium"
                    color={colorMode === 'light' ? 'gray.600' : 'white'}
                    borderBottom="2px"
                    borderColor="transparent"
                    _hover={{
                      color: 'orange.500',
                      borderColor: 'orange.500',
                    }}
                    onClick={onOpen}
                  >
                    {t(item.title)}
                  </Button>
                ) : (
                  <Link href={item.path}>
                    <Header_MenuButton pathname={pathname} item={item}>
                      <Flex gap={1} alignItems='center' color={colorMode === 'light' ? 'gray.600' : 'white'}>
                        {t(item.title)}
                       </Flex>
                    </Header_MenuButton>
                  </Link>
                )}
                {item.subMenu && (
                  <MenuList
                    py="2"
                    boxShadow="lg"
                    border="1px"
                    borderColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                    bg={colorMode === 'light' ? 'white' : 'gray.800'}
                  >
                    {item.subMenu.map((subItem) => (
                      <MenuItem
                        key={subItem.path}
                        _hover={{
                          bg: colorMode === 'light' ? 'gray.50' : 'gray.700'
                        }}
                      >
                        <SLink href={subItem.path}>
                          <Box>
                            <Text
                              fontSize="sm"
                              fontWeight="medium"
                              color={colorMode === 'light' ? 'gray.800' : 'white'}
                            >
                              {t(subItem.title)}
                            </Text>
                            <Text
                              fontSize="xs"
                              color={colorMode === 'light' ? 'gray.500' : 'gray.400'}
                            >
                              {t(subItem.description)}
                            </Text>
                          </Box>
                        </SLink>
                      </MenuItem>
                    ))}
                  </MenuList>
                )}
              </Menu>
            ))}
          </HStack>

          <Flex gap={4} alignItems="center" ml={{ xl: 'auto' }}>
            <LanguageSwitcher />
            <IconButton
              ref={hamburgerRef}
              display={{ lg: 'flex', xl: 'none' }}
              aria-label="Open menu"
              colorScheme="orange"
              bg='orange.500'
              color='white'
              _hover={{ bg: colorMode === 'light' ? 'gray.400' : 'gray.600' }}
              borderRadius="xl"
              icon={<HamburgerIcon />}
              variant="ghost"
              size="lg"
              onClick={handleMenuClick}
            />
          </Flex>
        </Flex>

        <Box
          ref={mobileMenuRef}
          display="none"
          height={0}
          overflow="hidden"
          position="absolute"
          top="100%"
          left="0"
          right="0"
          bg={colorMode === 'light' ? 'white' : 'gray.800'}
          py="4"
          boxShadow="lg"
        >
          {navItems.map((item) => (
            <Box key={item.path}>
              {item.title === 'nav.contact' ? (
                <Button
                  w="full"
                  justifyContent="flex-start"
                  px="4"
                  py="3"
                  fontSize="sm"
                  fontWeight="medium"
                  bgColor={colorMode === 'light' ? 'white' : 'gray.800'}
                  _hover={{ bg: colorMode === 'light' ? 'gray.50' : 'gray.700' }}
                  color={colorMode === 'light' ? 'gray.800' : 'gray.400'}
                  onClick={onOpen}
                >
                  {t(item.title)}
                </Button>
              ) : (
                <SLink href={item.subMenu ? '#' : item.path}>
                  <Box
                    px="4"
                    py="3"
                    _hover={{ bg: colorMode === 'light' ? 'gray.50' : 'gray.700' }}
                    color={pathname === item.path ?
                      (colorMode === 'light' ? 'gray.900' : 'white') :
                      (colorMode === 'light' ? 'gray.500' : 'gray.400')
                    }
                  >
                    <Flex justify="space-between" align="center">
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color={colorMode === 'light' ? 'gray.800' : 'white'}
                        >
                          {t(item.title)}
                        </Text>
                        <Text
                          fontSize="xs"
                          color={colorMode === 'light' ? 'gray.500' : 'gray.400'}
                        >
                          {t(item.description)}
                        </Text>
                      </Box>
                      {item.subMenu && (
                        <Icon
                          as={ChevronDownIcon}
                          h={4}
                          w={4}
                          color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
                        />
                      )}
                    </Flex>
                  </Box>
                </SLink>
              )}
              {item.subMenu && (
                <Box
                  pl="6"
                  bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}
                >
                  {item.subMenu.map((subItem) => (
                    <Link key={subItem.path} href={subItem.path}>
                      <Box
                        px="4"
                        py="2"
                        _hover={{ bg: colorMode === 'light' ? 'gray.100' : 'gray.600' }}
                      >
                        <Text
                          fontSize="sm"
                          color={colorMode === 'light' ? 'gray.800' : 'white'}
                        >
                          {t(subItem.title)}
                        </Text>
                        <Text
                          fontSize="xs"
                          color={colorMode === 'light' ? 'gray.500' : 'gray.400'}
                        >
                          {t(subItem.description)}
                        </Text>
                      </Box>
                    </Link>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <InquiryModal isOpen={isOpen} onClose={onClose} />
    </Box >
  );
} 