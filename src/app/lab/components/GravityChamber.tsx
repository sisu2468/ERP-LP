'use client';

import React, { useEffect, useState } from 'react';
import { Box, Icon, keyframes } from '@chakra-ui/react';

interface Tag {
  text: string;
  IconComponent: React.ElementType;
}

interface GravityChamberProps {
  tags: Tag[];
}

// 理志：モダンなフェードイン＆スライドアニメーション
const fadeInUp = keyframes`
  0% { 
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  100% { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const pulseGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(224, 142, 70, 0.3),
                0 0 40px rgba(224, 142, 70, 0.2),
                0 0 60px rgba(224, 142, 70, 0.1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(224, 142, 70, 0.5),
                0 0 60px rgba(224, 142, 70, 0.3),
                0 0 90px rgba(224, 142, 70, 0.2);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// 理志：Stripe風のグラデーション背景
const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

// 理志：各タグカード（Stripe/Apple風のクリーンなデザイン）
const TagCard: React.FC<{ tag: Tag; index: number; total: number }> = ({ tag, index, total }) => {
  const delay = index * 0.1;

  return (
    <Box
      animation={`${fadeInUp} 0.6s ease-out ${delay}s both, ${float} 3s ease-in-out ${delay + 0.6}s infinite`}
    >
      <Box
        bg="white"
        borderRadius="16px"
        p={6}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={3}
        border="1px solid"
        borderColor="gray.200"
        shadow="lg"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{
          transform: 'translateY(-8px) scale(1.05)',
          shadow: '2xl',
          borderColor: 'orange.400',
        }}
        position="relative"
        overflow="hidden"
      >
        {/* ホバー時のシマーエフェクト */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-r, transparent, rgba(224, 142, 70, 0.1), transparent)"
          bgSize="1000px 100%"
          animation={`${shimmer} 2s infinite`}
          opacity={0}
          transition="opacity 0.3s"
          _groupHover={{ opacity: 1 }}
        />
        
        {/* アイコン */}
        <Box
          p={3}
          bg="orange.50"
          borderRadius="12px"
          transition="all 0.3s"
          _groupHover={{
            bg: 'orange.500',
            transform: 'scale(1.1) rotate(5deg)',
          }}
        >
          <Icon 
            as={tag.IconComponent} 
            boxSize={8} 
            color="orange.500"
            transition="color 0.3s"
            _groupHover={{ color: 'white' }}
          />
        </Box>
        
        {/* テキスト */}
        <Box
          fontSize="13px"
          fontWeight="600"
          color="gray.800"
          textAlign="center"
          letterSpacing="0.2px"
          maxW="full"
        >
          {tag.text}
        </Box>
      </Box>
    </Box>
  );
};

// 理志：重力チャンバー - Apple/Stripe風のモダンデザイン
export default function GravityChamber({ tags }: GravityChamberProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box
      w="full"
      h="full"
      bg="linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)"
      position="relative"
      overflow="hidden"
      borderRadius="24px"
      border="1px solid"
      borderColor="gray.200"
      p={8}
    >
      {/* 背景のグリッドパターン（Stripe風） */}
      <Box
        position="absolute"
        inset={0}
        bgImage="radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.03) 1px, transparent 0)"
        bgSize="40px 40px"
        opacity={0.6}
      />

      {/* 中央のグローエフェクト */}
      <Box
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(224, 142, 70, 0.08) 0%, transparent 70%)"
        animation={`${pulseGlow} 4s ease-in-out infinite`}
        filter="blur(40px)"
      />

      {/* タグカードのグリッドレイアウト */}
      <Box
        position="relative"
        zIndex={1}
        display="grid"
        gridTemplateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: `repeat(${Math.min(tags.length, 4)}, 1fr)`,
        }}
        gap={4}
        w="full"
        h="full"
        alignItems="center"
        justifyItems="center"
      >
        {mounted && tags.map((tag, index) => (
          <TagCard key={index} tag={tag} index={index} total={tags.length} />
        ))}
      </Box>

      {/* 装飾的なコーナーエフェクト */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="120px"
        h="120px"
        bgGradient="radial(circle at top left, orange.100, transparent)"
        opacity={0.4}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom={0}
        right={0}
        w="120px"
        h="120px"
        bgGradient="radial(circle at bottom right, orange.100, transparent)"
        opacity={0.4}
        pointerEvents="none"
      />
    </Box>
  );
}

