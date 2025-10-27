'use client';

import { Box, Container, Heading, SimpleGrid, VStack, Badge, Text, useColorModeValue } from "@chakra-ui/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import CompanyMission from "./CompanyMission";
import CompanyValues from "./CompanyValues";
import CompanyVision from "./CompanyVision";
import TranslatedText from '@/components/common/TranslatedText';
import { useLanguage } from '@/contexts/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CompanyMVV() {
    const { t } = useLanguage();
    const headingRef = useRef(null);
    const gridRef = useRef(null);
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const accentColor = useColorModeValue('orange.500', 'orange.300');

    useEffect(() => {
        const ctx = gsap.context(() => {
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
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(gridRef.current,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <Box py={{ base: 20, md: 28, lg: 32 }} bg="gray.50" transition="background-color 0.2s">
            <Container maxW={{ base: "container.lg", lg: "container.xl" }} px={{ base: 8, md: 10, lg: 12 }}>
                <VStack spacing={16}>
                    <VStack spacing={6} align="center">
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
                            {t('mvv.badge')}
                        </Badge>
                        <Heading
                            ref={headingRef}
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl" }}
                            textAlign="center"
                            color="gray.900"
                            fontWeight="700"
                            letterSpacing="-0.02em"
                        >
                            <TranslatedText as="span" translationKey="mvv.section.heading" staggerDelay={0.08} />
                        </Heading>
                        <Text
                            color="#6e6e73"
                            fontSize={{ base: "lg", md: "xl" }}
                            letterSpacing="0.1em"
                            fontWeight="600"
                        >
                            {t('mvv.section.subheading')}
                        </Text>
                    </VStack>
                    <Box w="full" ref={gridRef}>
                        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
                            <CompanyMission />
                            <CompanyVision />
                        </SimpleGrid>
                        <Box mt={8}>
                            <CompanyValues />
                        </Box>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}
