'use client';

import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    SimpleGrid,
    keyframes,
    useDisclosure,
} from '@chakra-ui/react';
import { FaArrowRight, FaEnvelope } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import InquiryModal from '@/components/common/InquiryModal';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/common/TranslatedText';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(1deg); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
`;

export default function Hero() {
    const { t } = useLanguage();
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const hero = heroRef.current;
        const title = titleRef.current;
        const image = imageRef.current;
        
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
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    delay: 0.3,
                    ease: "power3.out"
                }
            );

            if (image) {
                gsap.fromTo(image,
                    { opacity: 0, x: 30, scale: 0.9 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 1.2,
                        delay: 0.5,
                        ease: "power3.out"
                    }
                );
            }
        }

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
            ref={heroRef}
            position="relative" 
            overflow="hidden"
            minH="100vh"
            display="flex"
            alignItems="center"
            bg="#fafafa"
        >
            {/* SVG Triangle Gradients - サインタ Orange */}
            <Box
                position="absolute"
                top="-10%"
                right="-5%"
                w="600px"
                h="600px"
                opacity={0.4}
                transform={`translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`}
                transition="transform 0.3s ease-out"
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

            <Container maxW="8xl" position="relative" zIndex={2}>
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} alignItems="center" py={{ base: 20, md: 28 }}>
                    {/* 理志：左カラム - コンテンツ */}
                    <VStack align="flex-start" spacing={10} ref={titleRef}>
                        <VStack align="flex-start" spacing={6}>
                            <Heading
                                as="h1"
                                fontSize={{ base: "48px", md: "64px", lg: "72px", xl: "84px" }}
                                fontWeight="700"
                                lineHeight="1.1"
                                letterSpacing="-0.03em"
                                color="#111111"
                            >
                                <TranslatedText
                                    as="span"
                                    translationKey="hero.title.1"
                                />
                                <br />
                                <TranslatedText
                                    as="span"
                                    color="#e08e46"
                                    translationKey="hero.title.2"
                                    staggerDelay={0.1}
                                />
                            </Heading>

                            <Text
                                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                                color="#6e6e73"
                                lineHeight="1.6"
                                maxW="600px"
                            >
                                <TranslatedText
                                    as="span"
                                    translationKey="hero.subtitle.1"
                                />
                                <br />
                                <TranslatedText
                                    as="span"
                                    translationKey="hero.subtitle.2"
                                    staggerDelay={0.15}
                                />
                                <TranslatedText
                                    as="span"
                                    fontWeight="700"
                                    color="#111111"
                                    translationKey="hero.subtitle.3"
                                    staggerDelay={0.2}
                                />
                                <TranslatedText
                                    as="span"
                                    translationKey="hero.subtitle.4"
                                    staggerDelay={0.25}
                                />
                            </Text>
                        </VStack>

                        <HStack spacing={4} pt={2} flexWrap="wrap">
                            <Button
                                size="lg"
                                h="56px"
                                px={8}
                                bg="#e08e46"
                                color="white"
                                fontWeight="700"
                                borderRadius="lg"
                                leftIcon={<FaEnvelope />}
                                onClick={onOpen}
                                _hover={{
                                    bg: '#d17d35',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(224, 142, 70, 0.35)',
                                }}
                                _active={{
                                    transform: 'translateY(0)',
                                }}
                                transition="all 0.2s"
                                fontSize={{ base: "sm", md: "md" }}
                                whiteSpace="normal"
                                textAlign="center"
                            >
                                {t('hero.cta')}
                            </Button>
                            <Button
                                as={Link}
                                href="/pricing"
                                size="lg"
                                h="56px"
                                px={8}
                                bg="white"
                                color="#111111"
                                fontWeight="700"
                                borderRadius="lg"
                                border="2px solid"
                                borderColor="#e5e7eb"
                                rightIcon={<FaArrowRight />}
                                _hover={{
                                    borderColor: '#e08e46',
                                    color: '#e08e46',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
                                }}
                                _active={{
                                    transform: 'translateY(0)',
                                }}
                                transition="all 0.2s"
                                fontSize={{ base: "sm", md: "md" }}
                                whiteSpace="normal"
                                textAlign="center"
                            >
                                {t('hero.demo')}
                            </Button>
                        </HStack>

                        <HStack spacing={6} pt={6} opacity={0.7}>
                            <Text fontSize="sm" color="#6e6e73" fontWeight="500">
                                ✓ 無料相談・お見積もり
                            </Text>
                            <Text fontSize="sm" color="#6e6e73" fontWeight="500">
                                ✓ 初回打ち合わせ無料
                            </Text>
                        </HStack>
                    </VStack>

                    {/* Right Column - Floating Transparent Image */}
                    <Box
                        ref={imageRef}
                        position="relative"
                        display={{ base: 'none', lg: 'flex' }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box
                            position="relative"
                            animation={`${float} 6s ease-in-out infinite`}
                        >
                            <Image
                                src="/hero/basic-kinousei.png"
                                alt="ビジネス基盤"
                                width={600}
                                height={400}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1))',
                                }}
                            />
                            
                            <Box
                                position="absolute"
                                top={-2}
                                right={-2}
                                w={3}
                                h={3}
                                borderRadius="full"
                                bg="#e08e46"
                                animation={`${pulse} 2s ease-in-out infinite`}
                                boxShadow="0 0 20px #e08e46"
                            />
                        </Box>
                    </Box>
                </SimpleGrid>
            </Container>

            <InquiryModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}
