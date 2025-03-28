'use client';

import { getColors } from '@/constant/colorenum';
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

const recruitmentSteps = [
    {
        step: 1,
        title: '応募受付',
        description: 'サインタの公式採用ページや求人情報を通じて履歴書・職務経歴書をご提出ください。',
    },
    {
        step: 2,
        title: '書類選考',
        description: '提出いただいた書類をもとに選考を行います。',
    },
    {
        step: 3,
        title: '一次面接（オンライン可）',
        description: 'これまでの経験やスキル、サインタでのキャリアビジョンについてお聞きします。',
        note: '※合格者には次のステップや技術審査の有無についてメールでご案内します。'
    },
    {
        step: 4,
        title: '最終面接（オフィスにて）',
        description: '経営陣との面談を行います。',
    },
    {
        step: 5,
        title: '内定通知',
        description: '選考結果を通知し、給与や勤務条件の最終確認を行います。入社日や必要な手続きについてもご案内します。',
    },
];

export default function CareerProcess() {
    const { colorMode } = useColorMode();

    const { bgColor1, headingColor, textColor, cardBg, borderColor } = getColors(colorMode);

    const noteColor = useColorModeValue('orange.600', 'orange.300');

    const headingRef = useRef(null);
    const stepsRef = useRef(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
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
        <Box py={16} bg={bgColor1} transition="background-color 0.2s">
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
                            採用プロセスの流れ
                        </Heading>
                        <Text
                            fontSize={{ base: "lg", md: "xl" }}
                            color={headingColor}
                        >
                            全てのポジションについて、面接プロセスは以下の通りです：
                        </Text>
                    </Stack>

                    <VStack spacing={0} position="relative" ref={stepsRef}>
                        <Box
                            position="absolute"
                            left="60px"
                            top="0"
                            bottom="0"
                            width="2px"
                            bgGradient={"linear(to-b, orange.200, orange.400)"}
                            display={{ base: 'none', md: 'block' }}
                        />

                        {recruitmentSteps.map((step, index) => (
                            <Flex
                                key={step.step}
                                ref={el => { stepRefs.current[index] = el }}
                                w="100%"
                                gap={6}
                                position="relative"
                                pb={index === recruitmentSteps.length - 1 ? 0 : 8}
                                _hover={{ transform: 'translateY(-2px)' }}
                                transition="all 0.3s"
                            >
                                <VStack spacing={1} minW="80px">
                                    <Circle
                                        size="120px"
                                        bgGradient={`linear(to-br, orange.${200 + (index * 50)}, orange.${300 + (index * 50)})`}
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
                                            {step.note && (
                                                <Text
                                                    color={noteColor}
                                                    fontSize="sm"
                                                    mt={2}
                                                    fontStyle="italic"
                                                >
                                                    {step.note}
                                                </Text>
                                            )}
                                        </Box>
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