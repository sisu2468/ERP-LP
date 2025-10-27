'use client';

import { Box, Container, Heading, Text, VStack, Badge } from "@chakra-ui/react";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/common/TranslatedText';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function TimeSection() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;

        if (section && content) {
            gsap.fromTo(content,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, []);

    return (
        <Box
            ref={sectionRef}
            py={{ base: 20, md: 28, lg: 32 }}
            bg="gray.50"
            position="relative"
            overflow="hidden"
        >
            {/* Subtle background shapes */}
            <Box
                position="absolute"
                bottom="10%"
                left="-5%"
                w="450px"
                h="450px"
                opacity={0.12}
                zIndex={0}
                pointerEvents="none"
            >
                <svg width="100%" height="100%" viewBox="0 0 450 450">
                    <defs>
                        <linearGradient id="timeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e08e46" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#ffc478" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                    <polygon points="225,40 410,360 40,360" fill="url(#timeGrad1)" />
                </svg>
            </Box>

            <Box
                position="absolute"
                top="-5%"
                right="-3%"
                w="350px"
                h="350px"
                opacity={0.1}
                zIndex={0}
                pointerEvents="none"
            >
                <svg width="100%" height="100%" viewBox="0 0 350 350">
                    <defs>
                        <linearGradient id="timeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f4a460" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#e08e46" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <circle cx="175" cy="175" r="140" fill="url(#timeGrad2)" />
                </svg>
            </Box>
            <Container maxW={{ base: "container.md", lg: "container.xl" }} px={{ base: 8, md: 10, lg: 12 }} position="relative" zIndex={1}>
                <VStack ref={contentRef} align="flex-start" spacing={10} w="100%">
                    {/* Badge */}
                    <Box w="100%" display="flex" justifyContent="center">
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
                            {t('philosophy.time.badge')}
                        </Badge>
                    </Box>

                    {/* Title */}
                    <Heading
                        as="h2"
                        fontSize={{ base: "3xl", md: "4xl" }}
                        fontWeight="700"
                        color="gray.900"
                        letterSpacing="-0.02em"
                        lineHeight="1.2"
                    >
                        <TranslatedText as="span" translationKey="philosophy.time.title" staggerDelay={0.08} />
                    </Heading>

                    {/* Body Text */}
                    <VStack align="flex-start" spacing={6} fontSize={{ base: "md", md: "lg" }} lineHeight="1.9" color="gray.700">
                        <Text>{t('philosophy.time.p1')}</Text>
                        <Text>{t('philosophy.time.p2')}</Text>
                        <Text>{t('philosophy.time.p3')}</Text>
                        <Text>{t('philosophy.time.p4')}</Text>

                        {/* Key quote with subtle border */}
                        <Box
                            w="100%"
                            pl={6}
                            py={5}
                            borderLeft="5px solid"
                            borderColor="#E19C49"
                            my={4}
                        >
                            <VStack align="flex-start" spacing={4}>
                                <Text fontWeight="600" fontSize={{ base: "lg", md: "xl" }} color="gray.900">
                                    {t('philosophy.time.quote1')}
                                </Text>
                                <Text fontWeight="600" fontSize={{ base: "lg", md: "xl" }} color="gray.900">
                                    {t('philosophy.time.quote2')}
                                </Text>
                            </VStack>
                        </Box>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
}
