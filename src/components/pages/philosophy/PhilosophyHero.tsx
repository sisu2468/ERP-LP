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
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
`;


export default function PhilosophyHero() {
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
            
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgImage="/images/philo/heroimage.png"
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

            <Box
                position="absolute"
                top="-10%"
                right="-5%"
                w="600px"
                h="600px"
                opacity={0.12}
                zIndex={1}
                animation={`${float} 10s ease-in-out infinite`}
            >
                <svg width="100%" height="100%" viewBox="0 0 600 600">
                    <defs>
                        <linearGradient id="philoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e08e46" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#f4a460" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                    <polygon points="300,50 550,500 50,500" fill="url(#philoGrad1)" />
                </svg>
            </Box>

            <Box
                position="absolute"
                bottom="-15%"
                left="-8%"
                w="450px"
                h="450px"
                opacity={0.15}
                zIndex={1}
            >
                <svg width="100%" height="100%" viewBox="0 0 450 450">
                    <defs>
                        <linearGradient id="philoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e08e46" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#ffc478" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <circle cx="225" cy="225" r="180" fill="url(#philoGrad2)" />
                </svg>
            </Box>

            <Container maxW="7xl" position="relative" zIndex={2} py={20}>
                <VStack
                    ref={titleRef}
                    spacing={6}
                    align="center"
                >
                    <VStack spacing={3}>
                        <Heading
                            as="h1"
                            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                            fontWeight="700"
                            color="white"
                            textAlign="center"
                            letterSpacing="0.1em"
                            lineHeight="1.2"
                        >
                            <TranslatedText as="span" translationKey="hero.philosophy.title" staggerDelay={0.1} />
                        </Heading>
                        <Text
                            fontSize={{ base: "md", md: "lg", lg: "xl" }}
                            color="rgba(255, 255, 255, 0.95)"
                            textAlign="center"
                            fontWeight="400"
                            letterSpacing="0.15em"
                        >
                            <TranslatedText as="span" translationKey="hero.philosophy.subtitle" staggerDelay={0.12} />
                        </Text>
                    </VStack>

                    <Text
                        fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                        color="white"
                        textAlign="center"
                        fontWeight="500"
                        pt={6}
                        letterSpacing="0.05em"
                    >
                        <TranslatedText as="span" translationKey="hero.philosophy.tagline" staggerDelay={0.14} />
                    </Text>
                </VStack>
            </Container>
        </Box>
    );
}
