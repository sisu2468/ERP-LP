import { Box, Heading, Icon, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { CTACard as CTACardType } from '../../../constant/interface';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CTACardProps {
    card: CTACardType;
    colorMode: 'light' | 'dark';
    index: number; // Add index prop for staggered animation
}

export function CTACard({ card, colorMode, index }: CTACardProps) {
    const cardBg = useColorModeValue('white', 'gray.800');
    const headingColor = useColorModeValue('gray.800', 'white');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const iconColor = useColorModeValue('orange.500', 'orange.300');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const iconBg = useColorModeValue('orange.50', 'gray.700');

    const cardRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Card entrance animation
        gsap.fromTo(cardRef.current,
            { 
                opacity: 0, 
                y: 30 
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Card hover animations
        const card = cardRef.current;
        if (card) {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    translateY: -8,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    borderColor: colorMode === 'light' ? '#FED7AA' : '#ED8936',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    translateY: 0,
                    boxShadow: 'none',
                    borderColor: borderColor,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }

        // Icon hover animation
        const icon = iconRef.current;
        if (icon) {
            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }

        return () => {
            // Cleanup
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            if (card) {
                card.removeEventListener('mouseenter', () => {});
                card.removeEventListener('mouseleave', () => {});
            }
            if (icon) {
                icon.removeEventListener('mouseenter', () => {});
                icon.removeEventListener('mouseleave', () => {});
            }
        };
    }, [colorMode, borderColor, index]);

    return (
        <Box
            ref={cardRef}
            bg={cardBg}
            p={8}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            style={{ 
                willChange: 'transform',
                transform: 'translateY(0)'
            }}
        >
            <VStack spacing={4} align="flex-start">
                <Box
                    ref={iconRef}
                    p={3}
                    bg={iconBg}
                    borderRadius="lg"
                >
                    <Icon
                        as={card.icon}
                        boxSize={6}
                        color={iconColor}
                    />
                </Box>
                <Heading 
                    size="md"
                    color={headingColor}
                >
                    {card.title}
                </Heading>
                <Text 
                    color={textColor}
                >
                    {card.description}
                </Text>
            </VStack>
        </Box>
    );
}