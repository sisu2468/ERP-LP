'use client';

import { Box, Container, Heading, Text, VStack, Button, keyframes, HStack, Icon } from '@chakra-ui/react';
import { FaHome, FaArrowRight, FaExclamationTriangle } from 'react-icons/fa';
import SLink from '@/components/SLink';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/common/TranslatedText';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function NotFound() {
    const { t } = useLanguage();
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Fade in animation
        gsap.fromTo(containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: "power2.out" }
        );

        // Image animation
        if (imageRef.current) {
            gsap.fromTo(imageRef.current,
                { opacity: 0, scale: 0.8, y: 30 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0, 
                    duration: 1.2, 
                    delay: 0.2,
                    ease: "back.out(1.2)" 
                }
            );
        }

        // Text animation
        if (textRef.current) {
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    delay: 0.6,
                    ease: "power3.out" 
                }
            );
        }

        // Button animation
        if (buttonRef.current) {
            gsap.fromTo(buttonRef.current,
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    delay: 0.9,
                    ease: "power3.out" 
                }
            );
        }

        // Mouse move parallax effect
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 30,
                y: (e.clientY / window.innerHeight - 0.5) * 30,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <Box 
            ref={containerRef}
            position="relative"
            minH="100vh"
            display="flex"
            alignItems="center"
            overflow="hidden"
            bg="#fafafa"
        >
            {/* Animated Background Shapes - サインタ Orange */}
            <Box
                position="absolute"
                top="-10%"
                right="-5%"
                w="600px"
                h="600px"
                opacity={0.4}
                transform={`translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`}
                transition="transform 0.3s ease-out"
                pointerEvents="none"
            >
                <svg width="100%" height="100%" viewBox="0 0 600 600">
                    <defs>
                        <linearGradient id="orangeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e08e46" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#f4a460" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                    <polygon points="300,50 550,450 50,450" fill="url(#orangeGrad1)" />
                </svg>
            </Box>

            <Box
                position="absolute"
                bottom="-15%"
                left="-10%"
                w="500px"
                h="500px"
                opacity={0.3}
                animation={`${rotate} 60s linear infinite`}
                pointerEvents="none"
            >
                <svg width="100%" height="100%" viewBox="0 0 500 500">
                    <defs>
                        <linearGradient id="orangeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e08e46" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#ffc478" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>
                    <circle cx="250" cy="250" r="200" fill="url(#orangeGrad2)" />
                </svg>
            </Box>

            <Box
                position="absolute"
                top="30%"
                left="15%"
                w="300px"
                h="300px"
                opacity={0.25}
                transform={`translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`}
                transition="transform 0.3s ease-out"
                pointerEvents="none"
            >
                <svg width="100%" height="100%" viewBox="0 0 300 300">
                    <defs>
                        <linearGradient id="orangeGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e08e46" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#f4a460" stopOpacity="0.08" />
                        </linearGradient>
                    </defs>
                    <polygon points="150,20 280,140 150,280 20,140" fill="url(#orangeGrad3)" />
                </svg>
            </Box>

            <Container maxW="8xl" position="relative" zIndex={2} py={{ base: 20, md: 28 }}>
                <Box 
                    display="flex" 
                    flexDirection={{ base: "column", lg: "row" }}
                    alignItems="center"
                    gap={{ base: 12, lg: 20 }}
                    minH={{ base: "auto", lg: "70vh" }}
                >
                    {/* Left Column - Floating Image */}
                    <Box 
                        ref={imageRef}
                        flex={{ base: "0 0 auto", lg: "0 0 45%" }}
                        w="full"
                        maxW={{ base: "350px", md: "450px", lg: "500px" }}
                        animation={`${float} 6s ease-in-out infinite`}
                        filter="drop-shadow(0 20px 40px rgba(224, 142, 70, 0.15))"
                    >
                        <Image
                            src="/contentblocks/404/contentimage_main4.png"
                            alt="404 Error"
                            layout="responsive"
                            width={500}
                            height={500}
                            style={{
                                objectFit: 'contain',
                            }}
                            priority
                        />
                    </Box>

                    {/* Right Column - Text Content */}
                    <VStack 
                        flex={{ base: "1", lg: "1" }}
                        align={{ base: "center", lg: "flex-start" }} 
                        spacing={10}
                        ref={textRef}
                        w="full"
                    >
                        <VStack 
                            align={{ base: "center", lg: "flex-start" }} 
                            spacing={6}
                            w="full"
                        >
                            <HStack spacing={4} align="center">
                                <Heading 
                                    as="h1" 
                                    fontSize={{ base: "80px", md: "100px", lg: "120px", xl: "140px" }}
                                    fontWeight="800"
                                    color="gray.800"
                                    lineHeight="1"
                                    letterSpacing="-0.04em"
                                >
                                    404
                                </Heading>
                                <Icon 
                                    as={FaExclamationTriangle} 
                                    color="#e08e46" 
                                    boxSize={{ base: 8, md: 10 }}
                                    animation={`${pulse} 2s ease-in-out infinite`}
                                />
                            </HStack>
                            
                            <Heading
                                as="h2"
                                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                                fontWeight="700"
                                color="#111111"
                                textAlign={{ base: "center", lg: "left" }}
                                letterSpacing="-0.02em"
                                lineHeight="1.3"
                            >
                                <TranslatedText 
                                    as="span"
                                    translationKey="404.title"
                                />
                                <TranslatedText 
                                    as="span" 
                                    color="#e08e46"
                                    translationKey="404.title.highlight"
                                    staggerDelay={0.1}
                                />
                            </Heading>
                        </VStack>

                        <VStack 
                            align={{ base: "center", lg: "flex-start" }} 
                            spacing={4}
                            w="full"
                        >
                            <TranslatedText
                                translationKey="404.description.1"
                                color="#6e6e73" 
                                textAlign={{ base: "center", lg: "left" }}
                                fontSize={{ base: "lg", md: "xl" }}
                                lineHeight="1.8"
                                w="full"
                            />
                            <TranslatedText
                                translationKey="404.description.2"
                                color="gray.600" 
                                textAlign={{ base: "center", lg: "left" }}
                                fontSize={{ base: "md", md: "lg" }}
                                lineHeight="1.8"
                                w="full"
                                staggerDelay={0.2}
                            />
                        </VStack>

                        {/* CTA Buttons */}
                        <HStack 
                            spacing={4} 
                            ref={buttonRef}
                            flexWrap="wrap"
                            justify={{ base: "center", lg: "flex-start" }}
                        >
                            <SLink href="/">
                                <Button
                                    size="lg"
                                    px={8}
                                    py={7}
                                    fontSize={{ base: "md", md: "lg" }}
                                    fontWeight="700"
                                    bg="#e08e46"
                                    color="white"
                                    borderRadius="full"
                                    boxShadow="0 10px 30px rgba(224, 142, 70, 0.3)"
                                    rightIcon={<FaArrowRight />}
                                    _hover={{
                                        bg: "#d67d35",
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 15px 40px rgba(224, 142, 70, 0.4)'
                                    }}
                                    _active={{
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 20px rgba(224, 142, 70, 0.35)'
                                    }}
                                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                >
                                    <HStack spacing={2}>
                                        <Icon as={FaHome} />
                                        <Text>{t('404.cta')}</Text>
                                    </HStack>
                                </Button>
                            </SLink>
                        </HStack>
                    </VStack>
                </Box>
            </Container>
        </Box>
    );
} 