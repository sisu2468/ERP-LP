'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Container,
  Button,
  Icon,
} from '@chakra-ui/react';
import gsap from 'gsap';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import Image from 'next/image';

interface NavItem {
  title: string;
  path: string;
  description: string;
}

const navItems: NavItem[] = [
  {
    title: 'トップ',
    path: '/',
    description: 'サービス概要や導入メリットを紹介',
  },
  {
    title: 'サービス',
    path: '/services',
    description: 'ERPの各機能一覧',
  },
  {
    title: 'サインタラボ',
    path: '/signta-lab',
    description: 'webシステムの開発',
  },
  {
    title: 'サインタ・コネクト',
    path: '/signta-connect',
    description: '専門家マッチングプラットフォーム',
  },
  {
    title: 'プラン・料金',
    path: '/pricing',
    description: '料金体系と導入プラン',
  },
  {
    title: 'お役立ち情報',
    path: '/resources',
    description: '導入ガイド・活用事例・業務効率化のコツ',
  },
  {
    title: 'お問い合わせ・無料体験',
    path: '/contact',
    description: '相談・無料トライアル申し込み',
  },
];

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-item', {
        y: -2,
        duration: 0.5,
        stagger: 0.5,
        ease: 'power2.out',
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      as="nav"
      ref={navRef}
      position="fixed"
      top="0"
      left="0"
      right="0"
      bg="white"
      backdropFilter="blur(8px)"
      borderBottom="1px"
      borderColor="gray.100"
      zIndex="sticky"
    >
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <HStack spacing="8">
            <Link href="/home">
              <Image src="/logos/sainta-gyoumu.png" alt="サインタロゴ" width={100} height={100} />
            </Link>
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
                  borderColor={pathname === item.path ? 'blue.500' : 'transparent'}
                  _hover={{
                    color: 'gray.900',
                    borderColor: 'blue.500',
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
        </Flex>
      </Container>
    </Box>
  );
} 