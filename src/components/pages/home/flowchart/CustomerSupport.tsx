'use client';

import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    VStack,
    HStack,
    Icon,
    Flex,
    Badge,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    FaComments,
    FaHeadset,
    FaShieldAlt,
    FaCheckCircle,
    FaClock,
    FaUsers,
    FaHandshake
} from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const supportFeatures = [
    {
        icon: FaComments,
        title: 'いつでも頼れる無料サポート',
        description: 'すべてのユーザーに無料の専用フォーラムを提供！ユーザーだけでなくスタッフと知恵を共有しながら、悩みを素早く解決できます。',
        benefits: [
            { icon: FaUsers, text: 'コミュニティサポート' },
            { icon: FaClock, text: '24時間利用可能' },
            { icon: FaCheckCircle, text: '完全無料' }
        ]
    },
    {
        icon: FaHeadset,
        title: '寄り添う対応、確かな安心',
        description: 'お困りごとには迅速かつ丁寧に対応。どんな小さな疑問でも、安心してお任せください。',
        benefits: [
            { icon: FaCheckCircle, text: '迅速な対応' },
            { icon: FaHandshake, text: '丁寧なサポート' },
            { icon: FaUsers, text: '専門スタッフ対応' }
        ]
    },
    {
        icon: FaShieldAlt,
        title: '万が一の時も柔軟に対応',
        description: '問題の深刻度や状況に応じて返金対応も可能です。ビジネスの不安を少しでも軽くするお手伝いをいたします。',
        note: '※返金可否は当社の判断により決定いたします。',
        benefits: [
            { icon: FaShieldAlt, text: '返金保証制度' },
            { icon: FaHandshake, text: '柔軟な対応' },
            { icon: FaCheckCircle, text: '安心保証' }
        ]
    }
];

export default function CustomerSupport() {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('gray.50', 'gray.800');
    const cardBg = useColorModeValue('white', 'gray.800');
    const headingColor = useColorModeValue('orange.500', 'orange.300');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const noteColor = useColorModeValue('gray.500', 'gray.400');
    const iconBg = useColorModeValue('orange.200', 'orange.900');
    const iconColor = useColorModeValue('orange.500', 'orange.300');
    const benefitBg = useColorModeValue('orange.50', 'gray.700');
    const benefitTextColor = useColorModeValue('gray.700', 'gray.200');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const headingRef = useRef(null);
    const cardsRef = useRef(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Heading animation
        gsap.fromTo(headingRef.current,
            { opacity: 0, y: 30 },
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

        // Individual card animations
        cardRefs.current.forEach((cardRef, index) => {
            if (cardRef) {
                // Scroll animation
                gsap.fromTo(cardRef,
                    { opacity: 0, y: 30 },  // Changed from y: 50 to y: 30
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: index * 0.1,  // Changed from 0.2 to 0.1
                        scrollTrigger: {
                            trigger: cardRef,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Hover animation
                cardRef.addEventListener('mouseenter', () => {
                    gsap.to(cardRef, {
                        translateY: -8,
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        borderColor: colorMode === 'light' ? '#FED7AA' : '#ED8936',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                cardRef.addEventListener('mouseleave', () => {
                    gsap.to(cardRef, {
                        translateY: 0,
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        borderColor: borderColor,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            cardRefs.current.forEach(cardRef => {
                if (cardRef) {
                    cardRef.removeEventListener('mouseenter', () => {});
                    cardRef.removeEventListener('mouseleave', () => {});
                }
            });
        };
    }, [colorMode, borderColor]);

    return (
        <Box py={16} bg={bgColor} transition="background-color 0.2s">
            <Container maxW="8xl">
                <VStack spacing={12}>
                    <VStack spacing={4} textAlign="center" ref={headingRef}>
                        <Heading
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl" }}
                            bgGradient={colorMode === 'light'
                                ? "linear(to-r, orange.400, orange.600)"
                                : "linear(to-r, orange.300, orange.500)"
                            }
                            bgClip="text"
                        >
                            充実の顧客サポート
                        </Heading>
                        <Text
                            fontSize={{ base: "lg", md: "xl" }}
                            color={textColor}
                            maxW="2xl"
                        >
                            あなたのビジネスを、ずっと支える安心感
                        </Text>
                    </VStack>

                    <SimpleGrid
                        columns={{ base: 1, md: 3 }}
                        spacing={8}
                        w="full"
                        ref={cardsRef}
                    >
                        {supportFeatures.map((feature, index) => (
                            <Box
                                key={index}
                                ref={el => { cardRefs.current[index] = el }}
                                style={{ willChange: 'transform', transform: 'translateY(0)' }}
                                bg={cardBg}
                                p={8}
                                borderRadius="2xl"
                                boxShadow="xl"
                                position="relative"
                                overflow="hidden"
                                borderWidth="1px"
                                borderColor={borderColor}
                                _hover={{
                                    transform: 'translateY(-4px)',
                                    boxShadow: '2xl',
                                    borderColor: colorMode === 'light' ? 'orange.200' : 'orange.500',
                                }}
                                transition="all 0.3s"
                            >
                                <Box
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    right={0}
                                    h={2}
                                    bg={colorMode === 'light' ? 'orange.300' : 'orange.400'}
                                />

                                <Flex h="100%" direction="column" gap={4} justify="space-between">
                                    <Flex
                                        w={16}
                                        h={16}
                                        bg={iconBg}
                                        color={iconColor}
                                        borderRadius="xl"
                                        align="center"
                                        justify="center"
                                        transition="all 0.3s"
                                        _hover={{
                                            transform: 'scale(1.1)',
                                        }}
                                    >
                                        <Icon as={feature.icon} boxSize={8} />
                                    </Flex>
                                    <Flex h="100%" direction="column" gap={5} justify="space-between">
                                        <VStack align="flex-start" spacing={3}>
                                            <Heading
                                                as="h3"
                                                fontSize="2xl"
                                                color={headingColor}
                                            >
                                                {feature.title}
                                            </Heading>
                                            <Text color={textColor}>
                                                {feature.description}
                                            </Text>
                                            {feature.note && (
                                                <Text
                                                    fontSize="sm"
                                                    color={noteColor}
                                                    fontStyle="italic"
                                                >
                                                    {feature.note}
                                                </Text>
                                            )}
                                        </VStack>

                                        <Box w="full">
                                            <SimpleGrid columns={3} spacing={2}>
                                                {feature.benefits.map((benefit, idx) => (
                                                    <HStack
                                                        key={idx}
                                                        bg={benefitBg}
                                                        p={2}
                                                        borderRadius="md"
                                                        spacing={2}
                                                        h={20}
                                                        transition="all 0.3s"
                                                        _hover={{
                                                            transform: 'translateY(-2px)',
                                                            bg: colorMode === 'light' ? 'orange.100' : 'gray.600',
                                                        }}
                                                    >
                                                        <Icon
                                                            as={benefit.icon}
                                                            color={iconColor}
                                                        />
                                                        <Text
                                                            fontSize="sm"
                                                            color={benefitTextColor}
                                                            fontWeight="medium"
                                                        >
                                                            {benefit.text}
                                                        </Text>
                                                    </HStack>
                                                ))}
                                            </SimpleGrid>
                                        </Box>
                                    </Flex>
                                </Flex>
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
} 