'use client';

import { Box, VStack, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { MVVCardProps } from "@/constant/MVVCard";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function MVVCard({ title, titleEn, subtitle, subtitleEn, description, children, setHeight, ...props }: MVVCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const accentColor = useColorModeValue('orange.500', 'orange.300');
    const textColor = useColorModeValue('gray.700', 'gray.100');
    const subTextColor = useColorModeValue('gray.600', 'gray.300');
    const bgColor = useColorModeValue('gray.50', 'gray.800');

    useEffect(() => {
        const ctx = gsap.context(() => {
            const card = cardRef.current;
            if (!card) return;

            // Initial animation
            gsap.fromTo(card,
                { 
                    opacity: 0,
                    y: 30,
                    scale: 0.95
                },
                { 
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Hover animations
            const handleMouseEnter = () => {
                gsap.to(card, {
                    y: -8,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    borderColor: accentColor,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            };

            const handleMouseLeave = () => {
                gsap.to(card, {
                    y: 0,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    borderColor: borderColor,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            };

            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                card.removeEventListener('mouseenter', handleMouseEnter);
                card.removeEventListener('mouseleave', handleMouseLeave);
            };
        });

        return () => ctx.revert();
    }, [accentColor, borderColor]);

    return (
        <Box pt={16} transition="background-color 0.2s" w="full">
            <Box
                ref={cardRef}
                bg={cardBg}
                p={8}
                h="full"
                borderRadius="2xl"
                boxShadow="xl"
                borderWidth="1px"
                borderColor={borderColor}
                transition="all 0.3s"
                position="relative"
                style={{ willChange: 'transform' }}
                {...props}
            >
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    h={2}
                    bg={accentColor}
                    borderTopRadius="2xl"
                />

                <VStack spacing={8} align="start">
                    <VStack spacing={2} align="start" w="full">
                        <Heading
                            as="h3"
                            fontSize={{ base: "3xl", md: "4xl" }}
                            bgGradient={`linear(to-r, ${accentColor}, ${useColorModeValue('orange.600', 'orange.400')})`}
                            bgClip="text"
                            sx={{
                                wordBreak: 'keep-all',
                                overflowWrap: 'anywhere',
                                lineBreak: 'strict'
                            }}
                        >
                            {title}
                        </Heading>
                        <Text
                            fontSize="lg"
                            color="gray.500"
                            letterSpacing="wider"
                            fontWeight="semibold"
                        >
                            {titleEn}
                        </Text>
                    </VStack>

                    {subtitle && (
                        <VStack spacing={2} align="start" w="full">
                            <Heading
                                as="h4"
                                fontSize={{ base: "xl", md: "2xl" }}
                                color={textColor}
                                sx={{
                                    wordBreak: 'keep-all',
                                    overflowWrap: 'anywhere',
                                    lineBreak: 'strict'
                                }}
                            >
                                {subtitle}
                            </Heading>
                            {subtitleEn && (
                                <Text 
                                    fontSize="md" 
                                    color={subTextColor}
                                    letterSpacing="wide"
                                >
                                    {subtitleEn}
                                </Text>
                            )}
                        </VStack>
                    )}

                    {description && (
                        <Text
                            color={subTextColor}
                            fontSize={{ base: "md", md: "lg" }}
                            lineHeight="tall"
                            whiteSpace="pre-wrap"
                            sx={{
                                wordBreak: 'keep-all',
                                overflowWrap: 'anywhere',
                                lineBreak: 'strict'
                            }}
                        >
                            {description}
                        </Text>
                    )}

                    {children}
                </VStack>
            </Box>
        </Box>
    );
} 