'use client';

import { Box, Container, Flex, Heading, Text, VStack, Badge, SimpleGrid, Icon } from "@chakra-ui/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import { FaRocket, FaMicrochip, FaYenSign } from 'react-icons/fa';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function BusinessOverview() {
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
            gsap.fromTo(headingRef.current,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Text animation
            gsap.fromTo(textRef.current,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Cards stagger animation
            if (cardsRef.current.length > 0) {
                gsap.fromTo(cardsRef.current,
                    {
                        opacity: 0,
                        y: 40,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsRef.current[0],
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    const values = [
        {
            icon: FaRocket,
            title: "直感的な操作性",
            description: "学習コストゼロで、すぐに使いこなせる",
            color: "#e08e46"
        },
        {
            icon: FaMicrochip,
            title: "最先端テクノロジー",
            description: "AIと自動化で、業務効率を最大化",
            color: "#0891b2"
        },
        {
            icon: FaYenSign,
            title: "適正な価格設定",
            description: "企業規模に合わせた柔軟なプラン",
            color: "#059669"
        }
    ];

    const businesses = [
        {
            name: "サインタ・コア",
            tagline: "統合基幹業務システム",
            description: "会計、在庫、販売、人事を一つのプラットフォームで管理。リアルタイムのデータ分析で、経営判断を加速させます。",
            status: "開発中",
            statusColor: "#f59e0b",
            features: ["データ一元管理", "AI予測分析", "自動化ワークフロー"]
        },
        {
            name: "サインタ・ラボ",
            tagline: "カスタムウェブソリューション",
            description: "企業の個性を最大限に引き出すウェブサイト制作。最新技術とデザイントレンドで、ブランド価値を向上させます。",
            status: null,
            statusColor: null,
            features: ["レスポンシブデザイン", "SEO最適化", "高速パフォーマンス"]
        },
        {
            name: "サインタ・コネクト",
            tagline: "ワークフロー管理プラットフォーム",
            description: "チーム間のコミュニケーションと業務プロセスを最適化。タスク管理から承認フローまで、すべてを可視化します。",
            status: "ベータ版提供中",
            statusColor: "#0891b2",
            features: ["タスク自動化", "リアルタイム通知", "進捗可視化"]
        }
    ];

    return (
        <Box py={20} bg="#fafafa" overflow="hidden" position="relative">
            {/* SVG Background Shapes */}
            <Box
                position="absolute"
                top="10%"
                right="5%"
                opacity={0.1}
                pointerEvents="none"
                animation="rotate 60s linear infinite"
                sx={{
                    '@keyframes rotate': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                    }
                }}
            >
                <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
                    <circle cx="150" cy="150" r="120" fill="url(#gradient1)" />
                    <defs>
                        <linearGradient id="gradient1" x1="30" y1="30" x2="270" y2="270">
                            <stop offset="0%" stopColor="#e08e46" />
                            <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                    </defs>
                </svg>
            </Box>

            <Box
                position="absolute"
                bottom="5%"
                left="10%"
                opacity={0.08}
                pointerEvents="none"
                animation="float 8s ease-in-out infinite"
                sx={{
                    '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-30px)' }
                    }
                }}
            >
                <svg width="250" height="250" viewBox="0 0 250 250" fill="none">
                    <polygon points="125,20 230,230 20,230" fill="url(#gradient2)" />
                    <defs>
                        <linearGradient id="gradient2" x1="20" y1="20" x2="230" y2="230">
                            <stop offset="0%" stopColor="#e08e46" />
                            <stop offset="100%" stopColor="#0891b2" />
                        </linearGradient>
                    </defs>
                </svg>
            </Box>

            <Box
                position="absolute"
                top="60%"
                left="5%"
                opacity={0.07}
                pointerEvents="none"
                animation="pulse 6s ease-in-out infinite"
                sx={{
                    '@keyframes pulse': {
                        '0%, 100%': { opacity: 0.07, transform: 'scale(1)' },
                        '50%': { opacity: 0.12, transform: 'scale(1.05)' }
                    }
                }}
            >
                <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                    <rect x="40" y="40" width="100" height="100" transform="rotate(45 90 90)" fill="url(#gradient3)" />
                    <defs>
                        <linearGradient id="gradient3" x1="40" y1="40" x2="140" y2="140">
                            <stop offset="0%" stopColor="#059669" />
                            <stop offset="100%" stopColor="#0891b2" />
                        </linearGradient>
                    </defs>
                </svg>
            </Box>

            <Container maxW="7xl" position="relative" zIndex={1}>
                <VStack spacing={20} align="center" w="full">
                    <VStack align="center" spacing={6} ref={headingRef} w="full">
                        <Badge
                            px={4}
                            py={2}
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="600"
                            bg="rgba(224, 142, 70, 0.1)"
                            color="#e08e46"
                            border="1px solid"
                            borderColor="rgba(224, 142, 70, 0.2)"
                        >
                            私たちのミッション
                        </Badge>
                        <Heading
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl", lg: "48px" }}
                            fontWeight="700"
                            color="#111111"
                            letterSpacing="-0.02em"
                        >
                            事業概要
                        </Heading>
                        <Text
                            fontSize={{ base: "lg", md: "xl" }}
                            fontWeight="600"
                            color="#6e6e73"
                            letterSpacing="0.1em"
                        >
                            BUSINESS OVERVIEW
                        </Text>
                    </VStack>

                    <VStack spacing={12} w="full">
                        <Box
                            ref={textRef}
                            w="full"
                        >
                            <VStack spacing={6} align="flex-start">
                                <Text
                                    fontSize={{ base: "lg", md: "xl" }}
                                    color="#111111"
                                    lineHeight="1.8"
                                    fontWeight="500"
                                >
                                    <Text as="span" color="#e08e46" fontWeight="700">
                                        複雑さを、シンプルに。
                                    </Text>
                                    それが私たちの使命です。急速に変化するビジネス環境において、テクノロジーは企業の成長を加速させる最大の武器となります。
                                </Text>
                                <Text
                                    fontSize={{ base: "lg", md: "xl" }}
                                    color="#111111"
                                    lineHeight="1.8"
                                    fontWeight="500"
                                >
                                    しかし、多くの企業が
                                    <Text as="span" color="#e08e46" fontWeight="700">
                                        使いにくいシステム
                                    </Text>
                                    や
                                    <Text as="span" color="#e08e46" fontWeight="700">
                                        複雑な導入プロセス
                                    </Text>
                                    に悩まされています。サインタは、この課題を解決します。
                                </Text>
                                <Text
                                    fontSize={{ base: "lg", md: "xl" }}
                                    color="#111111"
                                    lineHeight="1.8"
                                    fontWeight="500"
                                >
                                    直感的なデザインと最新技術を組み合わせ、誰もが簡単に使える
                                    <Text as="span" color="#e08e46" fontWeight="700">
                                        次世代のビジネスツール
                                    </Text>
                                    を提供します。業務の自動化から戦略的な意思決定まで、すべてをサポートします。
                                </Text>
                            </VStack>
                        </Box>

                        {/* Values - Horizontal Row */}
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
                            {values.map((value, index) => (
                                <Box
                                    key={index}
                                    ref={(el) => { cardsRef.current[index] = el; }}
                                    p={8}
                                    bg="white"
                                    borderRadius="2xl"
                                    border="2px solid"
                                    borderColor="#e5e7eb"
                                    transition="all 0.3s"
                                    _hover={{
                                        borderColor: value.color,
                                        transform: 'translateY(-4px)',
                                        boxShadow: `0 12px 24px ${value.color}20`
                                    }}
                                >
                                    <VStack spacing={4} align="center">
                                        <Box
                                            w={16}
                                            h={16}
                                            borderRadius="xl"
                                            bg={`${value.color}15`}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            border="2px solid"
                                            borderColor={`${value.color}30`}
                                        >
                                            <Icon as={value.icon} color={value.color} boxSize={8} />
                                        </Box>
                                        <VStack spacing={2} align="center">
                                            <Heading
                                                fontSize="xl"
                                                color={value.color}
                                                fontWeight="700"
                                                textAlign="center"
                                            >
                                                {value.title}
                                            </Heading>
                                            <Text
                                                fontSize="md"
                                                color="#6e6e73"
                                                fontWeight="500"
                                                textAlign="center"
                                            >
                                                {value.description}
                                            </Text>
                                        </VStack>
                                    </VStack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </VStack>

                    {/* Business Products - Horizontal Layout */}
                    <VStack spacing={16} w="full" pt={8}>
                        <VStack spacing={4} align="center">
                            <Heading
                                fontSize={{ base: "3xl", md: "4xl", lg: "48px" }}
                                fontWeight="800"
                                color="#111111"
                                letterSpacing="-0.03em"
                            >
                                私たちのソリューション
                            </Heading>
                            <Text
                                fontSize={{ base: "md", md: "lg" }}
                                color="#6e6e73"
                                textAlign="center"
                                maxW="2xl"
                                lineHeight="1.7"
                            >
                                ビジネスの成長を加速させる、3つの革新的なプロダクト
                            </Text>
                        </VStack>

                        <SimpleGrid
                            columns={{ base: 1, md: 3 }}
                            spacing={8}
                            w="full"
                        >
                            {businesses.map((business, index) => (
                                <Box
                                    key={index}
                                    ref={(el) => {
                                        if (el) cardsRef.current[values.length + index] = el;
                                    }}
                                    bg="white"
                                    p={10}
                                    borderRadius="2xl"
                                    border="1px solid"
                                    borderColor="#e5e7eb"
                                    position="relative"
                                    overflow="hidden"
                                    _hover={{
                                        borderColor: "#e08e46",
                                        transform: "translateY(-8px)",
                                        boxShadow: "0 20px 40px -12px rgba(224, 142, 70, 0.2)"
                                    }}
                                    transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                                    h="full"
                                >
                                    {/* Status Badge */}
                                    {business.status && (
                                        <Box
                                            position="absolute"
                                            top={6}
                                            right={6}
                                            bg={business.statusColor}
                                            color="white"
                                            px={3}
                                            py={1.5}
                                            borderRadius="full"
                                            fontSize="xs"
                                            fontWeight="700"
                                            letterSpacing="0.05em"
                                        >
                                            {business.status}
                                        </Box>
                                    )}

                                    <VStack align="flex-start" spacing={6} h="full">
                                        {/* Product Name */}
                                        <VStack align="flex-start" spacing={2}>
                                            <Text
                                                fontSize="2xl"
                                                fontWeight="800"
                                                color="#111111"
                                                lineHeight="1.2"
                                            >
                                                {business.name}
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                fontWeight="600"
                                                color="#e08e46"
                                                letterSpacing="0.02em"
                                            >
                                                {business.tagline}
                                            </Text>
                                        </VStack>

                                        {/* Description */}
                                        <Text
                                            color="#6e6e73"
                                            lineHeight="1.8"
                                            fontSize="md"
                                            flex={1}
                                        >
                                            {business.description}
                                        </Text>

                                        {/* Features */}
                                        <VStack align="flex-start" spacing={3} w="full" pt={2}>
                                            {business.features.map((feature, idx) => (
                                                <Flex key={idx} align="center" gap={2}>
                                                    <Box
                                                        w="4px"
                                                        h="4px"
                                                        borderRadius="full"
                                                        bg="#e08e46"
                                                    />
                                                    <Text
                                                        fontSize="sm"
                                                        color="#6e6e73"
                                                        fontWeight="500"
                                                    >
                                                        {feature}
                                                    </Text>
                                                </Flex>
                                            ))}
                                        </VStack>
                                    </VStack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
} 