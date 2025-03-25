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
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';
import gsap from 'gsap';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import SLink from './SLink';
import Header_MenuButton from './buttons/Header_MenuButton';

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      bg="white"
      backdropFilter="blur(8px)"
      borderBottom="1px"
      borderColor="gray.100"
      zIndex="sticky"
    >
      <Box w="100%">
        <Flex h="16" alignItems="center" justifyContent={{ base: 'space-between', lg: 'space-between', xl: 'flex-start' }} gap={10} borderBottom="1px solid #cccccc" px={{ base: 4, sm: 6, xl: 8 }} >
          <Box w="120px" h="35px">
            <Link href="/">
              <Image
                src="/logos/sainta.jpg"
                alt="サインタロゴ"
                width={120}
                height={35}
              />
            </Link>
          </Box>

          <HStack spacing="8" display={{ base: 'none', md: 'none', lg: 'none', xl: 'flex' }}>
            {navItems.map((item) => (
              <Menu key={item.path}>
                {item.subMenu ? (
                  <Header_MenuButton pathname={pathname} item={item}>
                    <Flex gap={1} alignItems='center'>
                      {item.title}
                      <Icon as={ChevronDownIcon} ml={1} h={4} w={4} />
                    </Flex>
                  </Header_MenuButton>
                ) : (
                  <Link href={item.path}>
                    <Header_MenuButton pathname={pathname} item={item}>
                      {item.title}
                    </Header_MenuButton>
                  </Link>
                )}
                {item.subMenu && (
                  <MenuList
                    py="2"
                    boxShadow="lg"
                    border="1px"
                    borderColor="gray.100"
                  >
                    {item.subMenu.map((subItem) => (
                      <MenuItem key={subItem.path}>
                        <SLink href={subItem.path}>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium">
                              {subItem.title}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
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

          <IconButton
            ref={hamburgerRef}
            display={{ lg: 'flex', xl: 'none' }}
            aria-label="Open menu"
            colorScheme="orange"
            bg='orange.500'
            color='white'
            _hover={{ bg: 'gray.400' }}
            borderRadius="xl"
            icon={<HamburgerIcon />}
            variant="ghost"
            size="lg"
            onClick={handleMenuClick}
          />
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
          bg="white"
          py="4"
          boxShadow="lg"
        >
          {navItems.map((item) => (
            <Box key={item.path}>
              <SLink href={item.subMenu ? '#' : item.path}>
                <Box
                  px="4"
                  py="3"
                  _hover={{ bg: 'gray.50' }}
                  color={pathname === item.path ? 'gray.900' : 'gray.500'}
                >
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Text fontSize="sm" fontWeight="medium">
                        {item.title}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {item.description}
                      </Text>
                    </Box>
                    {item.subMenu && (
                      <Icon as={ChevronDownIcon} h={4} w={4} />
                    )}
                  </Flex>
                </Box>
              </SLink>
              {item.subMenu && (
                <Box pl="6" bg="gray.50">
                  {item.subMenu.map((subItem) => (
                    <Link key={subItem.path} href={subItem.path}>
                      <Box
                        px="4"
                        py="2"
                        _hover={{ bg: 'gray.100' }}
                      >
                        <Text fontSize="sm">
                          {subItem.title}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
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
    </Box>
  );
} 