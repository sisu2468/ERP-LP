"use client"

import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    SimpleGrid,
    Icon,
    Badge,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { HiSparkles } from 'react-icons/hi';
import { FaFileCsv, FaFilePdf, FaImage, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import ScrollReveal from '@/components/common/ScrollReveal';

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const features = [
    {
        icon: FaFileCsv,
        iconColor: '#10b981',
        title: 'CSVインポート',
        desc: '取引先リスト、在庫データ。ドラッグ&ドロップで即座に反映。',
    },
    {
        icon: FaFilePdf,
        iconColor: '#ef4444',
        title: 'PDF読み取り',
        desc: '請求書や納品書をアップロード。AIが内容を抽出して自動入力。',
    },
    {
        icon: FaImage,
        iconColor: '#3b82f6',
        title: '画像認識',
        desc: '名刺や書類の写真から、必要な情報を自動で読み取り。',
    },
];

export default function HakuAISection() {
    return (
        <Box
            id="haku-ai"
            py={{ base: 24, md: 32 }}
            bg="linear-gradient(180deg, #ffffff 0%, #fafafa 100%)"
            position="relative"
            overflow="hidden"
        >
            {/* Subtle background pattern */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                opacity={0.03}
                bgImage="radial-gradient(circle at 1px 1px, #000 1px, transparent 0)"
                bgSize="40px 40px"
                pointerEvents="none"
            />

            <Container maxW="7xl" position="relative">
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 16, lg: 24 }} alignItems="center">
                    {/* Left - Content */}
                    <ScrollReveal direction="right">
                        <VStack align="flex-start" spacing={8}>
                            {/* Badge */}
                            <Badge
                                px={4}
                                py={2}
                                borderRadius="full"
                                fontSize="sm"
                                fontWeight="600"
                                bg="rgba(74, 85, 104, 0.08)"
                                color="#4a5568"
                                display="flex"
                                alignItems="center"
                                gap={2}
                                textTransform="none"
                            >
                                <Box
                                    w={2}
                                    h={2}
                                    borderRadius="full"
                                    bg="#10b981"
                                    animation={`${pulse} 2s ease-in-out infinite`}
                                />
                                AI アシスタント
                            </Badge>

                            {/* Heading */}
                            <VStack align="flex-start" spacing={4}>
                                <Heading
                                    as="h2"
                                    fontSize={{ base: "4xl", md: "5xl", lg: "64px" }}
                                    fontWeight="800"
                                    color="#111111"
                                    letterSpacing="-0.03em"
                                    lineHeight="1.1"
                                >
                                    はく
                                    <Text as="span" color="#e08e46">AI</Text>
                                </Heading>

                                <Text
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    color="#111111"
                                    lineHeight="1.6"
                                    fontWeight="500"
                                >
                                    データ入力は、もう終わり。
                                </Text>
                            </VStack>

                            {/* Description */}
                            <Text
                                fontSize={{ base: "md", md: "lg" }}
                                color="#6e6e73"
                                lineHeight="1.8"
                                maxW="480px"
                            >
                                ファイルをアップロードするだけ。
                                はくAIが内容を理解し、必要なデータを抽出。
                                システムへの入力まで、すべて自動で行います。
                            </Text>

                            {/* Feature cards */}
                            <VStack spacing={4} w="full" pt={4}>
                                {features.map((feature, index) => (
                                    <ScrollReveal key={index} delay={index * 0.1}>
                                        <HStack
                                            w="full"
                                            p={5}
                                            bg="white"
                                            borderRadius="xl"
                                            border="1px solid"
                                            borderColor="rgba(0, 0, 0, 0.06)"
                                            spacing={4}
                                            cursor="pointer"
                                            transition="all 0.2s ease"
                                            _hover={{
                                                borderColor: 'rgba(224, 142, 70, 0.3)',
                                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                                                transform: 'translateY(-2px)',
                                            }}
                                        >
                                            <Box
                                                w={12}
                                                h={12}
                                                borderRadius="xl"
                                                bg={`${feature.iconColor}10`}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                flexShrink={0}
                                            >
                                                <Icon
                                                    as={feature.icon}
                                                    boxSize={6}
                                                    color={feature.iconColor}
                                                />
                                            </Box>
                                            <VStack align="flex-start" spacing={1} flex={1}>
                                                <Text
                                                    fontSize="md"
                                                    fontWeight="700"
                                                    color="#111111"
                                                >
                                                    {feature.title}
                                                </Text>
                                                <Text
                                                    fontSize="sm"
                                                    color="#6e6e73"
                                                    lineHeight="1.5"
                                                >
                                                    {feature.desc}
                                                </Text>
                                            </VStack>
                                            <Icon
                                                as={FaArrowRight}
                                                boxSize={4}
                                                color="#d1d5db"
                                                transition="all 0.2s"
                                                _groupHover={{
                                                    color: '#e08e46',
                                                    transform: 'translateX(4px)',
                                                }}
                                            />
                                        </HStack>
                                    </ScrollReveal>
                                ))}
                            </VStack>
                        </VStack>
                    </ScrollReveal>

                    {/* Right - Visual */}
                    <ScrollReveal direction="left" delay={0.2}>
                        <Box position="relative">
                            {/* Main visual container */}
                            <Box
                                position="relative"
                                borderRadius="3xl"
                                overflow="hidden"
                                bg="linear-gradient(135deg, #4a5568 0%, #2d3748 100%)"
                                p={{ base: 8, md: 12 }}
                                boxShadow="0 32px 64px rgba(0, 0, 0, 0.15)"
                            >
                                {/* Grid pattern overlay */}
                                <Box
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    right={0}
                                    bottom={0}
                                    opacity={0.1}
                                    bgImage="linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)"
                                    bgSize="24px 24px"
                                />

                                {/* Swan icon */}
                                <VStack spacing={6} position="relative">
                                    <Box
                                        w={{ base: '180px', md: '240px' }}
                                        h={{ base: '180px', md: '240px' }}
                                        borderRadius="full"
                                        overflow="hidden"
                                        border="4px solid rgba(255, 255, 255, 0.2)"
                                        boxShadow="0 16px 48px rgba(0, 0, 0, 0.3)"
                                        position="relative"
                                    >
                                        <Image
                                            src="/haku-ai-icon.png"
                                            alt="はくAI"
                                            width={240}
                                            height={240}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        {/* Glow effect */}
                                        <Box
                                            position="absolute"
                                            inset={-2}
                                            borderRadius="full"
                                            bg="radial-gradient(circle, rgba(224, 142, 70, 0.3) 0%, transparent 70%)"
                                            pointerEvents="none"
                                        />
                                    </Box>

                                    {/* Chat bubbles */}
                                    <VStack spacing={3} w="full" maxW="320px">
                                        <Box
                                            alignSelf="flex-end"
                                            bg="white"
                                            px={4}
                                            py={3}
                                            borderRadius="2xl"
                                            borderBottomRightRadius="sm"
                                            maxW="85%"
                                        >
                                            <Text fontSize="sm" color="#111111" fontWeight="500">
                                                この請求書データを取り込んで
                                            </Text>
                                        </Box>
                                        <Box
                                            alignSelf="flex-start"
                                            bg="rgba(224, 142, 70, 0.9)"
                                            px={4}
                                            py={3}
                                            borderRadius="2xl"
                                            borderBottomLeftRadius="sm"
                                            maxW="85%"
                                        >
                                            <Text fontSize="sm" color="white" fontWeight="500">
                                                3件の取引を検出しました。
                                                <br />
                                                インポートを開始します。
                                            </Text>
                                        </Box>
                                    </VStack>

                                    {/* Badge */}
                                    <Badge
                                        px={4}
                                        py={2}
                                        borderRadius="full"
                                        bg="rgba(255, 255, 255, 0.15)"
                                        color="white"
                                        fontWeight="600"
                                        fontSize="xs"
                                        backdropFilter="blur(10px)"
                                        display="flex"
                                        alignItems="center"
                                        gap={2}
                                    >
                                        <HiSparkles />
                                        Powered by GPT-4o
                                    </Badge>
                                </VStack>
                            </Box>

                            {/* Floating elements */}
                            <Box
                                position="absolute"
                                top={-4}
                                right={-4}
                                w={24}
                                h={24}
                                borderRadius="2xl"
                                bg="white"
                                boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                border="1px solid"
                                borderColor="rgba(0, 0, 0, 0.06)"
                            >
                                <Icon as={FaFileCsv} boxSize={10} color="#10b981" />
                            </Box>
                            <Box
                                position="absolute"
                                bottom={8}
                                left={-6}
                                w={20}
                                h={20}
                                borderRadius="2xl"
                                bg="white"
                                boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                border="1px solid"
                                borderColor="rgba(0, 0, 0, 0.06)"
                            >
                                <Icon as={FaFilePdf} boxSize={8} color="#ef4444" />
                            </Box>
                        </Box>
                    </ScrollReveal>
                </SimpleGrid>
            </Container>
        </Box>
    );
}
