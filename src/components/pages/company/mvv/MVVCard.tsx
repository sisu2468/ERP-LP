'use client';

import { Box, VStack, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { MVVCardProps } from "@/constant/MVVCard";
import TranslatedText from '@/components/common/TranslatedText';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function MVVCard({ title, titleEn, subtitle, subtitleEn, description, children, setHeight, titleKey, subtitleKey, ...props }: MVVCardProps) {
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
        <Box transition="background-color 0.2s" w="full">
            <Box
                ref={cardRef}
                bg="white"
                p={{ base: 8, md: 10 }}
                h="full"
                borderRadius="xl"
                boxShadow="sm"
                borderWidth="1px"
                borderColor="gray.200"
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
                    h="4px"
                    bg="#E19C49"
                    borderTopRadius="xl"
                />

                <VStack spacing={6} align="start">
                    <VStack spacing={2} align="start" w="full">
                        <Heading
                            as="h3"
                            fontSize={{ base: "2xl", md: "3xl" }}
                            color="gray.900"
                            fontWeight="700"
                            letterSpacing="-0.02em"
                            sx={{
                                wordBreak: 'keep-all',
                                overflowWrap: 'anywhere',
                                lineBreak: 'strict'
                            }}
                        >
                            {titleKey ? (
                                <TranslatedText as="span" translationKey={titleKey} staggerDelay={0.08} />
                            ) : (
                                title
                            )}
                        </Heading>
                        <Text
                            fontSize="md"
                            color="gray.500"
                            letterSpacing="0.05em"
                            fontWeight="500"
                        >
                            {titleEn}
                        </Text>
                    </VStack>

                    {subtitle && (
                        <VStack spacing={2} align="start" w="full">
                            <Heading
                                as="h4"
                                fontSize={{ base: "lg", md: "xl" }}
                                color="gray.800"
                                fontWeight="600"
                                sx={{
                                    wordBreak: 'keep-all',
                                    overflowWrap: 'anywhere',
                                    lineBreak: 'strict'
                                }}
                            >
                                {subtitleKey ? (
                                    <TranslatedText as="span" translationKey={subtitleKey} staggerDelay={0.06} />
                                ) : (
                                    subtitle
                                )}
                            </Heading>
                            {subtitleEn && (
                                <Text
                                    fontSize="sm"
                                    color="gray.500"
                                    letterSpacing="0.05em"
                                    fontWeight="500"
                                >
                                    {subtitleEn}
                                </Text>
                            )}
                        </VStack>
                    )}

                    {description && (
                        <Text
                            color="gray.700"
                            fontSize={{ base: "md", md: "lg" }}
                            lineHeight="1.9"
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