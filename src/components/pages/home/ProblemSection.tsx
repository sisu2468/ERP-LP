"use client"

import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Badge,
    SimpleGrid,
    Icon,
    keyframes,
} from '@chakra-ui/react';
import { 
    FaCheckCircle, 
    FaArrowRight, 
    FaChartLine,
    FaBullhorn,
    FaHandshake,
    FaPalette,
    FaYenSign
} from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/common/TranslatedText';

gsap.registerPlugin(ScrollTrigger);

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

export default function ProblemSection() {
    const { t } = useLanguage(); // 理志：言語翻訳用フックを追加
    const headingRef = useRef(null);
    const problemsRef = useRef<HTMLDivElement>(null);
    const solutionRef = useRef(null);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.fromTo(headingRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        //　理志：アニメーションを追加、スタート位置を調整
        if (cardRefs.current.length > 0) {
            gsap.fromTo(cardRefs.current,
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: problemsRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        gsap.fromTo(solutionRef.current,
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                delay: 0.4,
                scrollTrigger: {
                    trigger: solutionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const problems = [
        { 
            icon: FaChartLine,
            textKey: "problem.1.text",
            highlightKey: "problem.1.highlight",
            color: "#dc2626",
            iconBg: "rgba(220, 38, 38, 0.1)",
            tagKey: "problem.1.tag",
            tagColor: "#ef4444"
        },
        { 
            icon: FaBullhorn,
            textKey: "problem.2.text",
            highlightKey: "problem.2.highlight",
            color: "#7c3aed",
            iconBg: "rgba(124, 58, 237, 0.1)",
            tagKey: "problem.2.tag",
            tagColor: "#8b5cf6"
        },
        { 
            icon: FaHandshake,
            textKey: "problem.3.text",
            highlightKey: "problem.3.highlight",
            color: "#ea580c",
            iconBg: "rgba(234, 88, 12, 0.1)",
            tagKey: "problem.3.tag",
            tagColor: "#f97316"
        },
        { 
            icon: FaPalette,
            textKey: "problem.4.text",
            highlightKey: "problem.4.highlight",
            color: "#0891b2",
            iconBg: "rgba(8, 145, 178, 0.1)",
            tagKey: "problem.4.tag",
            tagColor: "#06b6d4"
        },
        { 
            icon: FaYenSign,
            textKey: "problem.5.text",
            highlightKey: "problem.5.highlight",
            color: "#059669",
            iconBg: "rgba(5, 150, 105, 0.1)",
            tagKey: "problem.5.tag",
            tagColor: "#10b981"
        }
    ];

    return (
        <Box 
            py={{ base: 20, md: 28 }}
            bg="#fafafa"
            position="relative"
            overflow="hidden"
        >
            {/* SVGバックグラウンド */}
            <Box
                position="absolute"
                top="10%"
                right="-5%"
                w="400px"
                h="400px"
                opacity={0.15}
            >
                <svg width="100%" height="100%" viewBox="0 0 400 400">
                    <defs>
                        <linearGradient id="problemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e08e46" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#f4a460" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                    <circle cx="200" cy="200" r="150" fill="url(#problemGrad)" />
                </svg>
            </Box>

            <Container maxW="7xl" position="relative" zIndex={1}>
                <VStack spacing={20}>
                    <VStack spacing={6} textAlign="center" maxW="3xl" mx="auto">
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
                            {t('problem.badge')}
                        </Badge>
                        <Heading
                            ref={headingRef}
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl", lg: "52px" }}
                            fontWeight="700"
                            color="#111111"
                            letterSpacing="-0.02em"
                            lineHeight="1.2"
                        >
                            <TranslatedText as="span" translationKey="problem.heading.1" staggerDelay={0.1} />
                            <br />
                            <TranslatedText as="span" translationKey="problem.heading.2" staggerDelay={0.12} />
                            <TranslatedText as="span" color="#e08e46" translationKey="problem.heading.3" staggerDelay={0.14} />
                            <TranslatedText as="span" translationKey="problem.heading.4" staggerDelay={0.16} />
                        </Heading>
                    </VStack>

                    <SimpleGrid
                        ref={problemsRef}
                        columns={{ base: 1, md: 2 }}
                        spacing={6}
                        w="full"
                        maxW="6xl"
                        mx="auto"
                    >
                        {problems.map((problem, index) => {
                            const isOdd = index % 2 === 1;
                            return (
                                <Box
                                    key={index}
                                    ref={(el) => { cardRefs.current[index] = el; }}
                                    position="relative"
                                    p={8}
                                    bg="white"
                                    borderRadius="2xl"
                                    border="2px solid"
                                    borderColor={hoveredCard === index ? problem.tagColor : "#e5e7eb"}
                                    boxShadow={hoveredCard === index ? `0 12px 32px ${problem.color}20` : "0 4px 12px rgba(0, 0, 0, 0.05)"}
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    cursor="pointer"
                                    transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                                    mt={isOdd ? { base: 0, md: 8 } : 0}
                                    h="full"
                                    minH="200px"
                                    _hover={{
                                        transform: 'translateY(-8px)',
                                        borderColor: problem.tagColor,
                                    }}
                                >
                                    {/* Shimmer effect on hover */}
                                    {hoveredCard === index && (
                                        <Box
                                            position="absolute"
                                            top={0}
                                            left={0}
                                            right={0}
                                            h="3px"
                                            bgGradient={`linear(to-r, transparent, ${problem.tagColor}, transparent)`}
                                            backgroundSize="200% auto"
                                            animation={`${shimmer} 2s linear infinite`}
                                            borderRadius="2xl 2xl 0 0"
                                        />
                                    )}

                                    <VStack spacing={5} align="flex-start">
                                        <HStack spacing={3} w="full" justify="space-between">
                                            <Box
                                                w={14}
                                                h={14}
                                                borderRadius="xl"
                                                bg={problem.iconBg}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                flexShrink={0}
                                                border="2px solid"
                                                borderColor={hoveredCard === index ? problem.color : "transparent"}
                                                animation={hoveredCard === index ? `${pulse} 2s ease-in-out infinite` : 'none'}
                                                transition="all 0.3s"
                                            >
                                                <Icon as={problem.icon} color={problem.color} boxSize={7} />
                                            </Box>
                                            <Badge
                                                px={4}
                                                py={1.5}
                                                bg={`${problem.tagColor}15`}
                                                color={problem.tagColor}
                                                fontSize="xs"
                                                fontWeight="700"
                                                borderRadius="full"
                                                border="1px solid"
                                                borderColor={`${problem.tagColor}30`}
                                                textTransform="none"
                                            >
                                                {t(problem.tagKey)}
                                            </Badge>
                                        </HStack>
                                        <Text
                                            fontSize="lg"
                                            color="#111111"
                                            lineHeight="1.75"
                                            fontWeight="500"
                                            pl={1}
                                        >
                                            {t(problem.textKey).split(t(problem.highlightKey)).map((part, i, arr) => (
                                                i < arr.length - 1 ? (
                                                    <span key={i}>
                                                        {part}
                                                        <Text as="span" color={problem.color} fontWeight="700">
                                                            {t(problem.highlightKey)}
                                                        </Text>
                                                    </span>
                                                ) : part
                                            ))}
                                        </Text>
                                    </VStack>
                                </Box>
                            );
                        })}
                    </SimpleGrid>

                    <Box
                        ref={solutionRef}
                        position="relative"
                        w="full"
                        maxW="5xl"
                        mx="auto"
                        p={{ base: 10, md: 14 }}
                        bg="white"
                        borderRadius="3xl"
                        border="2px solid"
                        borderColor="#e08e46"
                        boxShadow="0 20px 40px rgba(224, 142, 70, 0.15)"
                        overflow="hidden"
                    >
                        <Box
                            position="absolute"
                            top={-20}
                            right={-20}
                            w="200px"
                            h="200px"
                            borderRadius="full"
                            bg="rgba(224, 142, 70, 0.05)"
                            animation={`${float} 8s ease-in-out infinite`}
                        />

                        <VStack spacing={8} align="stretch" position="relative" zIndex={1}>
                            <HStack spacing={3} justify="center">
                                <Icon as={FaCheckCircle} color="#e08e46" boxSize={8} />
                                <Heading
                                    fontSize={{ base: "2xl", md: "3xl", lg: "36px" }} 
                                    fontWeight="700" 
                                    color="#111111"
                                    textAlign="center"
                                    lineHeight="1.3"
                                >
                                    <TranslatedText as="span" translationKey="problem.solution.heading.1" staggerDelay={0.1} />
                                    <TranslatedText as="span" color="#e08e46" translationKey="problem.solution.heading.2" staggerDelay={0.12} />
                                </Heading>
                            </HStack>

                            <VStack spacing={6} pt={4}>
                                <Text 
                                    fontSize={{ base: "md", md: "lg" }}
                                    color="#6e6e73" 
                                    lineHeight="1.8"
                                    fontWeight="400"
                                    textAlign="center"
                                >
                                    <TranslatedText as="span" translationKey="problem.solution.text.1.1" staggerDelay={0.1} />
                                    <TranslatedText as="span" color="#e08e46" fontWeight="700" translationKey="problem.solution.text.1.2" staggerDelay={0.12} />
                                    <TranslatedText as="span" translationKey="problem.solution.text.1.3" staggerDelay={0.14} />
                                </Text>
                                <Text 
                                    fontSize={{ base: "md", md: "lg" }} 
                                    color="#6e6e73" 
                                    lineHeight="1.8"
                                    fontWeight="400"
                                    textAlign="center"
                                >
                                    <TranslatedText as="span" translationKey="problem.solution.text.2.1" staggerDelay={0.1} />
                                    <TranslatedText as="span" color="#e08e46" fontWeight="700" translationKey="problem.solution.text.2.2" staggerDelay={0.12} />
                                    <TranslatedText as="span" translationKey="problem.solution.text.2.3" staggerDelay={0.14} />
                                    <TranslatedText as="span" color="#e08e46" fontWeight="700" translationKey="problem.solution.text.2.4" staggerDelay={0.16} />
                                    <TranslatedText as="span" translationKey="problem.solution.text.2.5" staggerDelay={0.18} />
                                </Text>
                            </VStack>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}
