"use client"

import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Text,
    VStack,
    Badge,
} from '@chakra-ui/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/common/TranslatedText';

gsap.registerPlugin(ScrollTrigger);

export default function BasicFlowSection() {
    const { t } = useLanguage(); // 理志：言語翻訳用フックを追加
    const headingRef = useRef(null);
    const stepsRef = useRef(null);

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

        gsap.fromTo(stepsRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                delay: 0.2,
                scrollTrigger: {
                    trigger: stepsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const steps = [
        {
            icon: "/svg/svg2.svg",
            titleKey: "basicflow.step1.title",
            descriptionKey: "basicflow.step1.description",
        },
        {
            icon: "/svg/svg3.svg",
            titleKey: "basicflow.step2.title",
            descriptionKey: "basicflow.step2.description",
        },
        {
            icon: "/svg/svg4.svg",
            titleKey: "basicflow.step3.title",
            descriptionKey: "basicflow.step3.description",
        }
    ];

    return (
        <Box 
            py={{ base: 16, md: 24 }}
            bg="#fafafa"
            position="relative"
        >
            <Container maxW="7xl" position="relative" zIndex={1}>
                <VStack spacing={16}>
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
                            {t('basicflow.badge')}
                        </Badge>
                        <Heading
                            ref={headingRef}
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl", lg: "52px" }}
                            fontWeight="600"
                            color="#111111"
                            letterSpacing="-0.02em"
                            lineHeight="1.1"
                        >
                            <TranslatedText translationKey="basicflow.heading" staggerDelay={0.1} />
                        </Heading>
                    </VStack>

                    <SimpleGrid
                        ref={stepsRef}
                        columns={{ base: 1, md: 3 }}
                        spacing={6}
                        w="full"
                    >
                        {steps.map((step, index) => (
                            <Box
                                key={index}
                                p={8}
                                bg="white"
                                borderRadius="xl"
                                border="1px solid"
                                borderColor="#e5e7eb"
                                textAlign="center"
                                position="relative"
                                boxShadow="0 1px 3px rgba(0, 0, 0, 0.05)"
                                _hover={{
                                    borderColor: "rgba(224, 142, 70, 0.3)",
                                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
                                    transform: 'translateY(-4px)',
                                    transition: 'all 0.2s',
                                }}
                                transition="all 0.2s"
                            >
                                <VStack spacing={6}>
                                    <Box
                                        w={12}
                                        h={12}
                                        borderRadius="full"
                                        bg="rgba(224, 142, 70, 0.1)"
                                        border="2px solid"
                                        borderColor="#e08e46"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        color="#e08e46"
                                        fontWeight="700"
                                        fontSize="xl"
                                    >
                                        {index + 1}
                                    </Box>

                                    <Box
                                        position="relative"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        opacity={0.6}
                                    >
                                        <Image
                                            src={step.icon}
                                            alt={t(step.titleKey)}
                                            width={320}
                                            height={180}
                                        />
                                    </Box>
                                    
                                    <Heading
                                        as="h3"
                                        fontSize={{ base: "xl", md: "2xl" }}
                                        fontWeight="700"
                                        color="#111111"
                                    >
                                        <TranslatedText translationKey={step.titleKey} staggerDelay={0.1} />
                                    </Heading>

                                    <Text
                                        color="#6e6e73"
                                        lineHeight="1.8"
                                        fontSize="md"
                                    >
                                        <TranslatedText translationKey={step.descriptionKey} staggerDelay={0.05} />
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
}
