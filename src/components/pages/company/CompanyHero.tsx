'use client';

import { Box, Container, Heading, Text, VStack, keyframes } from "@chakra-ui/react";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/common/TranslatedText';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

export default function CompanyHero() {
    const { t } = useLanguage();
    const heroRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const hero = heroRef.current;
        const title = titleRef.current;
        
        if (hero && title) {
            gsap.fromTo(hero,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                }
            );

            gsap.fromTo(title,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    delay: 0.3,
                    ease: "power3.out"
                }
            );
        }
    }, []);

    return (
        <Box 
            ref={heroRef}
            position="relative" 
            minH="70vh"
            display="flex"
            alignItems="center"
            overflow="hidden"
        >
            {/* Background Image */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgImage="/images/company/company.jpg"
                bgPosition="center"
                bgSize="cover"
                _after={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bg: 'rgba(0, 0, 0, 0.4)',
                }}
            />

            {/* SVG Triangle Gradients - サインタ Orange */}
            <Box
                position="absolute"
                top="-15%"
                right="-8%"
                w="700px"
                h="700px"
                opacity={0.15}
                zIndex={1}
            >
                <svg width="100%" height="100%" viewBox="0 0 700 700">
                    <defs>
                        <linearGradient id="companyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e08e46" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#f4a460" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <polygon points="350,100 600,550 100,550" fill="url(#companyGrad1)" />
                </svg>
            </Box>

            <Box
                position="absolute"
                bottom="-20%"
                left="-10%"
                w="500px"
                h="500px"
                opacity={0.2}
                animation={`${float} 8s ease-in-out infinite`}
                zIndex={1}
            >
                <svg width="100%" height="100%" viewBox="0 0 500 500">
                    <defs>
                        <linearGradient id="companyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e08e46" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#ffc478" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <circle cx="250" cy="250" r="200" fill="url(#companyGrad2)" />
                </svg>
            </Box>

            <Container maxW="7xl" position="relative" zIndex={2} py={20}>
                <VStack
                    ref={titleRef}
                    spacing={8}
                    align="center"
                >
                    <VStack spacing={4}>
                        <Heading
                            as="h1"
                            fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
                            fontWeight="700"
                            color="white"
                            textAlign="center"
                            letterSpacing="-0.02em"
                            lineHeight="1.1"
                        >
                            <TranslatedText as="span" translationKey="hero.company.title" staggerDelay={0.1} />
                        </Heading>
                        <Text
                            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                            color="rgba(255, 255, 255, 0.9)"
                            textAlign="center"
                            fontWeight="600"
                            letterSpacing="0.1em"
                        >
                            <TranslatedText as="span" translationKey="hero.company.subtitle" staggerDelay={0.12} />
                        </Text>
                    </VStack>
                    
                    <Text
                        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                        color="white"
                        textAlign="center"
                        maxW="3xl"
                        lineHeight="1.8"
                        pt={4}
                    >
                        <TranslatedText as="span" translationKey="hero.company.tagline" staggerDelay={0.14} />
                    </Text>
                </VStack>
            </Container>
        </Box>
    );
}   
