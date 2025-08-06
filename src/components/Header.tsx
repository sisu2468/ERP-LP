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
import { useRef, useState } from 'react';
import SLink from './SLink';
import Header_MenuButton from './buttons/Header_MenuButton';
import InquiryModal from './common/InquiryModal';
import ThemeToggle from './common/ThemeToggle';

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  // Japanese name regex: kanji, hiragana, katakana, full-width space
  const jpNameRegex = /^[\u3000\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF66-\uFF9F\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
              <Image
                src={colorMode === 'light' ? "/logos/sainta.png" : "/logos/sainta-white.png"}
                alt="サインタロゴ"
                width={120}
                height={35}
              />
            </SLink>
          </Box>

          <HStack spacing="8" display={{ base: 'none', md: 'none', lg: 'none', xl: 'flex' }}>
            {navItems.map((item) => (
              <Menu key={item.path}>
                {item.subMenu ? (
                  <Header_MenuButton pathname={pathname} item={item}>
                    <Flex gap={1} alignItems='center' color={colorMode === 'light' ? 'gray.600' : 'white'}>
                      {item.title}
                      <Icon
                        as={ChevronDownIcon}
                        ml={1}
                        h={4}
                        w={4}
                        color={colorMode === 'light' ? 'gray.600' : 'white'}
                      />
                    </Flex>
                  </Header_MenuButton>
                ) : item.title === 'お問い合わせ' ? (
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
                    <Flex gap={1} alignItems='center'>
                      {item.title}
                    </Flex>
                  </Button>
                ) : (
                  <Link href={item.path}>
                    <Header_MenuButton pathname={pathname} item={item}>
                      <Flex gap={1} alignItems='center' color={colorMode === 'light' ? 'gray.600' : 'white'}>
                        {item.title}
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
                              {subItem.title}
                            </Text>
                            <Text
                              fontSize="xs"
                              color={colorMode === 'light' ? 'gray.500' : 'gray.400'}
                            >
                              {subItem.description}
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

          <Flex gap={4} alignItems="center">
            <ThemeToggle />
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
              {item.title === 'お問い合わせ' ? (
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
                  {item.title}
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
                          {item.title}
                        </Text>
                        <Text
                          fontSize="xs"
                          color={colorMode === 'light' ? 'gray.500' : 'gray.400'}
                        >
                          {item.description}
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
                          {subItem.title}
                        </Text>
                        <Text
                          fontSize="xs"
                          color={colorMode === 'light' ? 'gray.500' : 'gray.400'}
                        >
                          {subItem.description}
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