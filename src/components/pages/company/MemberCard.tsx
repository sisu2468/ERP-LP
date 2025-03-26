'use client';

import { Box, Flex, VStack, Avatar, Heading, Text, useColorModeValue, Icon, HStack } from "@chakra-ui/react";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

interface MemberCardProps {
    name: string;
    image: string;
    title: string;
    description1: string;
    description2: string;
    linkedin?: string;
    twitter?: string;
}

export default function MemberCard({ name, image, title, description1, description2, linkedin, twitter }: MemberCardProps) {
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const avatarBorderColor = useColorModeValue('orange.300', 'orange.700');
    const cardBg = useColorModeValue('white', 'gray.800');
    const accentColor = useColorModeValue('orange.500', 'orange.300');
    const glowColor = useColorModeValue('orange.50', 'rgba(251, 146, 60, 0.15)');
    const textColor = useColorModeValue('gray.700', 'gray.100');
    const descriptionColor = useColorModeValue('gray.600', 'gray.300');

    const cardRef = useRef(null);
    const contentRef = useRef(null);
    const avatarRef = useRef(null);

    useEffect(() => {
        // Card entrance animation
        gsap.fromTo(cardRef.current,
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
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Avatar animation
        gsap.fromTo(avatarRef.current,
            {
                opacity: 0,
                scale: 0.8,
                rotate: -15
            },
            {
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 1,
                delay: 0.3,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                    trigger: avatarRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Content fade in animation
        gsap.fromTo(contentRef.current,
            {
                opacity: 0,
                x: 20
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: 0.4,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    return (
        <Box
            ref={cardRef}
            w="full"
            borderRadius="2xl"
            overflow="hidden"
            borderWidth="1px"
            borderColor={borderColor}
            bg={cardBg}
            position="relative"
            transition="all 0.3s"
            _hover={{
                boxShadow: '2xl',
                transform: 'translateY(-4px)',
                '&::before': {
                    transform: 'scale(1.1)',
                }
            }}
            _before={{
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                opacity: 0.8,
                transform: 'scale(0.8)',
                transition: 'transform 0.6s ease',
                zIndex: 0,
            }}
        >
            <Flex
                direction={{ base: "column", md: "row" }}
                align="center"
                p={{ base: 6, md: 8 }}
                gap={{ base: 6, md: 8 }}
                position="relative"
                zIndex={1}
            >
                <VStack spacing={4} align={{ base: "center", md: "start" }}>
                    <Box ref={avatarRef}>
                        <Avatar
                            size="2xl"
                            name={name}
                            src={image}
                            border={`4px solid ${avatarBorderColor}`}
                            boxShadow="md"
                        />
                    </Box>
                    {(linkedin || twitter) && (
                        <HStack spacing={3} justify="center">
                            {linkedin && (
                                <Icon
                                    as={FaLinkedin}
                                    w={5}
                                    h={5}
                                    color={accentColor}
                                    cursor="pointer"
                                    transition="all 0.3s"
                                    _hover={{ transform: 'scale(1.2)' }}
                                />
                            )}
                            {twitter && (
                                <Icon
                                    as={FaTwitter}
                                    w={5}
                                    h={5}
                                    color={accentColor}
                                    cursor="pointer"
                                    transition="all 0.3s"
                                    _hover={{ transform: 'scale(1.2)' }}
                                />
                            )}
                        </HStack>
                    )}
                </VStack>

                <Flex 
                    direction="column" 
                    gap={4} 
                    flex={1}
                    ref={contentRef}
                >
                    <Flex 
                        direction={{ base: "column", md: "row" }}
                        justify="space-between"
                        align={{ base: "center", md: "start" }}
                        gap={2}
                    >
                        <Heading 
                            size="lg"
                            color={textColor}
                            fontWeight="bold"
                        >
                            {name}
                        </Heading>
                        <Text
                            color={accentColor}
                            fontSize="md"
                            fontWeight="semibold"
                            px={3}
                            py={1}
                            bg={glowColor}
                            borderRadius="full"
                        >
                            {title}
                        </Text>
                    </Flex>
                    <VStack
                        spacing={4}
                        align="start"
                        flex={1}
                    >
                        <Text
                            fontSize="md"
                            lineHeight="tall"
                            color={descriptionColor}
                            sx={{
                                'text-wrap': 'pretty'
                            }}
                        >
                            {description1}
                        </Text>
                        <Text
                            fontSize="md"
                            lineHeight="tall"
                            color={descriptionColor}
                            sx={{
                                'text-wrap': 'pretty'
                            }}
                        >
                            {description2}
                        </Text>
                    </VStack>
                </Flex>
            </Flex>
        </Box>
    );
}