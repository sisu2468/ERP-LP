'use client';

import React from 'react';
import { Box, Icon, keyframes } from '@chakra-ui/react';

interface Tag {
  text: string;
  IconComponent: React.ElementType;
}

interface GravityChamberProps {
  tags: Tag[];
}

// 理志：CSS Keyframesで物理シミュレーション風のアニメーション
const float = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -20px) rotate(5deg); }
  50% { transform: translate(-5px, 10px) rotate(-3deg); }
  75% { transform: translate(-15px, -5px) rotate(7deg); }
`;

const bounce = keyframes`
  0% { transform: translateY(-100px) rotate(0deg); opacity: 0; }
  60% { transform: translateY(0) rotate(180deg); opacity: 1; }
  80% { transform: translateY(-20px) rotate(200deg); }
  100% { transform: translateY(0) rotate(360deg); }
`;

// 理志：各タグの物理演算風アニメーション
const TagBall: React.FC<{ tag: Tag; index: number; total: number }> = ({ tag, index, total }) => {
  const angle = (index / total) * Math.PI * 2;
  const radius = 100;
  const initialX = Math.cos(angle) * radius;
  const initialZ = Math.sin(angle) * radius;
  
  // ランダムな遅延とアニメーション時間
  const delay = index * 0.15;
  const duration = 1.5 + Math.random() * 0.5;

  return (
    <Box
      position="absolute"
      left={`calc(50% + ${initialX}px)`}
      top={`calc(50% + ${initialZ}px)`}
      transform="translate(-50%, -50%)"
      animation={`${bounce} ${duration}s ease-out ${delay}s forwards, ${float} 3s ease-in-out ${delay + duration}s infinite`}
      zIndex={index}
    >
      <Box
        bg="orange.500"
        borderRadius="full"
        w="80px"
        h="80px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={1}
        shadow="lg"
        border="3px solid"
        borderColor="orange.400"
        _hover={{ transform: 'scale(1.1)', transition: 'transform 0.2s' }}
      >
        <Icon as={tag.IconComponent} boxSize={6} color="white" />
        <Box
          fontSize="9px"
          fontWeight="bold"
          color="white"
          textAlign="center"
          px={1}
          maxW="70px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {tag.text}
        </Box>
      </Box>
    </Box>
  );
};

// 理志：重力チャンバー - CSS/SVGベースの軽量版
export default function GravityChamber({ tags }: GravityChamberProps) {
  return (
    <Box
      w="full"
      h="full"
      bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
      position="relative"
      overflow="hidden"
      borderRadius="xl"
    >
      {/* 背景グリッド */}
      <Box
        position="absolute"
        inset={0}
        bgImage="linear-gradient(rgba(224, 142, 70, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(224, 142, 70, 0.1) 1px, transparent 1px)"
        bgSize="20px 20px"
        opacity={0.3}
      />

      {/* 中央の輝く球体 */}
      <Box
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        w="200px"
        h="200px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(224, 142, 70, 0.2) 0%, transparent 70%)"
        animation={`${float} 4s ease-in-out infinite`}
      />

      {/* タグボール */}
      {tags.map((tag, index) => (
        <TagBall key={index} tag={tag} index={index} total={tags.length} />
      ))}

      {/* チャンバーの枠 */}
      <Box
        position="absolute"
        inset={4}
        border="2px solid"
        borderColor="orange.500"
        borderRadius="xl"
        opacity={0.3}
      />
    </Box>
  );
}
