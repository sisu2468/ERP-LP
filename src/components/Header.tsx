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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';

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
        <Flex h="16" alignItems="center" justifyContent={{ base: 'space-between', lg: 'space-between', xl: 'flex-start'}}  gap={10} borderBottom="1px solid #cccccc" px={{ base: 4, sm: 6, xl: 8 }} >
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
                <MenuButton
                  as={Button}
                  variant="ghost"
                  className="nav-item"
                  px="3"
                  py="2"
                  fontSize="sm"
                  fontWeight="medium"
                  color={pathname === item.path ? 'gray.900' : 'gray.500'}
                  borderBottom="2px"
                  borderColor={pathname === item.path ? 'orange.500' : 'transparent'}
                  _hover={{
                    color: 'gray.900',
                    borderColor: 'orange.500',
                  }}
                >
                  {item.title}
                  <Icon as={ChevronDownIcon} ml={1} h={4} w={4} />
                </MenuButton>
                <MenuList
                  py="2"
                  boxShadow="lg"
                  border="1px"
                  borderColor="gray.100"
                >
                  <MenuItem>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium">
                        {item.title}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {item.description}
                      </Text>
                    </Box>
                  </MenuItem>
                </MenuList>
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
            <Link key={item.path} href={item.path}>
              <Box
                px="4"
                py="3"
                _hover={{ bg: 'gray.50' }}
                color={pathname === item.path ? 'gray.900' : 'gray.500'}
              >
                <Text fontSize="sm" fontWeight="medium">
                  {item.title}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {item.description}
                </Text>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
} 