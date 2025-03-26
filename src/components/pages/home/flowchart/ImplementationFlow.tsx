'use client';

import {
    Box,
    Circle,
    Container,
    Flex,
    Heading,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Update the data structure for steps with more detailed information
const implementationSteps = [
    {
        step: 1,
        title: 'すぐに購入したい方',
        description: '最後のステップまでお進みください。',
        subTitle: '相談したい方',
        subDescription: 'まずはお気軽にご相談ください。',
    },
    {
        step: 2,
        title: '基本情報の入力',
        description: '（会社名、業種など）',
    },
    {
        step: 3,
        title: 'プラン選択',
        description: '月額プランまたは年額プラン',
        subTitle: 'モジュール選択',
        subDescription: 'ビジネスに最適なモジュールを選択',
    },
    {
        step: 4,
        title: '支払い情報の入力',
        description: 'セキュアな環境で安全にお支払い',
    },
    {
        step: 5,
        title: '確認後、すぐに利用開始！',
        description: '今なら 2 週間お試し無料',
    },
];

export default function ImplementationFlow() {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('white', 'gray.800');
    const headingColor = useColorModeValue('gray.800', 'white');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const headingRef = useRef(null);
    const stepsRef = useRef(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

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

        // Steps container animation
        gsap.fromTo(stepsRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: stepsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Individual step animations
        stepRefs.current.forEach((stepRef, index) => {
            if (stepRef) {
                gsap.fromTo(stepRef,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.6,
                        delay: index * 0.2,
                        scrollTrigger: {
                            trigger: stepRef,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <Box py={16} bg={bgColor} transition="background-color 0.2s">
            <Container maxW={{ base: "xl", md: "4xl" }}>
                <VStack spacing={12} align="stretch">
                    <Stack spacing={4} textAlign="center" ref={headingRef}>
                        <Heading
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl" }}
                            fontWeight="bold"
                            bgGradient={"linear(to-r, orange.400, orange.600)"}
                            bgClip="text"
                        >
                            導入の流れ
                        </Heading>
                        <Text
                            fontSize={{ base: "lg", md: "xl" }}
                            color={headingColor}
                        >
                            導入まで、カンタン <Text as="span" color={colorMode === 'light' ? "orange.500" : "orange.300"} fontWeight="bold" fontSize="2xl">5</Text> ステップ
                        </Text>
                        <Text color={textColor} maxW="2xl" mx="auto">
                            シンプルな導入プロセスで、すぐにサービスをご利用いただけます
                        </Text>
                    </Stack>

                    <VStack spacing={0} position="relative" ref={stepsRef}>
                        <Box
                            position="absolute"
                            left="52px"
                            top="0"
                            bottom="0"
                            width="2px"
                            bgGradient={"linear(to-b, orange.200, orange.400)"}
                            display={{ base: 'none', md: 'block' }}
                        />

                        {implementationSteps.map((step, index) => (
                            <Flex
                                key={step.step}
                                ref={el => { stepRefs.current[index] = el }}
                                w="100%"
                                gap={6}
                                position="relative"
                                pb={index === implementationSteps.length - 1 ? 0 : 8}
                                _hover={{ transform: 'translateY(-2px)' }}
                                transition="all 0.3s"
                            >
                                <VStack spacing={1} minW="80px">
                                    <Circle
                                        size="104px"
                                        bgGradient={`linear(to-br, orange.${200 + (index * 100)}, orange.${100 + (index * 100)})`}
                                        color="white"
                                        fontWeight="bold"
                                        boxShadow="lg"
                                        transition="all 0.3s"
                                        _hover={{ transform: 'scale(1.05)' }}
                                    >
                                        <VStack spacing={0}>
                                            <Text fontSize="sm">ステップ</Text>
                                            <Text fontSize="xl">{step.step}</Text>
                                        </VStack>
                                    </Circle>
                                </VStack>

                                <Box
                                    flex={1}
                                    pt={2}
                                    bg={cardBg}
                                    borderRadius="xl"
                                    p={5}
                                    boxShadow="md"
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                    position="relative"
                                    _before={{
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        borderRadius: 'xl',
                                        opacity: 0,
                                        transition: 'opacity 0.3s',
                                        bgGradient: `linear(to-br, orange.${300 + (index * 100)}, orange.${400 + (index * 100)})`,
                                        zIndex: -1,
                                    }}
                                    transition="all 0.3s"
                                    _hover={{
                                        boxShadow: "xl",
                                        transform: "translateY(-2px)",
                                        borderColor: `orange.${400 + (index * 100)}`,
                                    }}
                                >
                                    <VStack align="stretch" spacing={4}>
                                        <Box>
                                            <Heading
                                                as="h3"
                                                fontSize="lg"
                                                color={colorMode === 'light' ? "orange.600" : "orange.300"}
                                                mb={2}
                                            >
                                                {step.title}
                                            </Heading>
                                            <Text color={textColor}>
                                                {step.description}
                                            </Text>
                                        </Box>

                                        {step.subTitle && (
                                            <Box>
                                                <Heading
                                                    as="h4"
                                                    fontSize="md"
                                                    color={colorMode === 'light' ? "orange.500" : "orange.300"}
                                                    mb={2}
                                                >
                                                    {step.subTitle}
                                                </Heading>
                                                <Text color={textColor}>
                                                    {step.subDescription}
                                                </Text>
                                            </Box>
                                        )}
                                    </VStack>
                                </Box>
                            </Flex>
                        ))}
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
} 