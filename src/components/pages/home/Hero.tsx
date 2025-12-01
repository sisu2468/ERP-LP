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
    useDisclosure,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaRocket, FaYenSign } from 'react-icons/fa';
import { FiLayers } from 'react-icons/fi';
import { useEffect, useRef, useCallback, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import InquiryModal from '@/components/common/InquiryModal';
import { useLanguage } from '@/contexts/LanguageContext';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
`;

// Sexy text reveal animation
const textReveal = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px) rotateX(-20deg);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0);
    filter: blur(0);
  }
`;

const underlineGrow = keyframes`
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  100% {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

export default function Hero() {
    const lottieContainerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<AnimationItem | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { language, t } = useLanguage();
    const [animationKey, setAnimationKey] = useState(0);
    const prevLanguageRef = useRef(language);

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // Trigger animation on language change
    useEffect(() => {
        if (prevLanguageRef.current !== language) {
            setAnimationKey(prev => prev + 1);
            prevLanguageRef.current = language;
        }
    }, [language]);

    useEffect(() => {
        // Initialize Lottie animation
        if (lottieContainerRef.current && !animationRef.current) {
            animationRef.current = lottie.loadAnimation({
                container: lottieContainerRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '/heroAnimation.json'
            });
        }

        return () => {
            if (animationRef.current) {
                animationRef.current.destroy();
                animationRef.current = null;
            }
        };
    }, []);

    return (
        <Box
            position="relative"
            bg="#fafafa"
            pt={{ base: 16, md: 20 }}
            pb={{ base: 16, md: 24 }}
        >
            <Container maxW="7xl" position="relative" zIndex={2}>
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 10, lg: 20, xl: 32 }} alignItems="center">
                    {/* 左カラム - コンテンツ */}
                    <VStack align="flex-start" spacing={10}>
                        <VStack align="flex-start" spacing={8} key={animationKey}>
                            <Heading
                                as="h1"
                                fontSize={{ base: "24px", md: "32px", lg: "40px", xl: "46px" }}
                                fontWeight="800"
                                lineHeight="1.3"
                                letterSpacing="-0.02em"
                                color="#111111"
                                whiteSpace={{ base: "normal", md: language === 'en' ? "normal" : "nowrap" }}
                                animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`}
                                style={{ perspective: '1000px' }}
                            >
                                {t('core.hero.headline.1')}
                                {language === 'en' && <br />}
                                <Text
                                    as="span"
                                    bgGradient="linear(to-r, #e08e46, #f4a460, #e08e46)"
                                    bgClip="text"
                                    position="relative"
                                    display="inline-block"
                                    _after={{
                                        content: '""',
                                        position: 'absolute',
                                        bottom: '-4px',
                                        left: '0',
                                        width: '100%',
                                        height: '4px',
                                        bgGradient: 'linear(to-r, #e08e46, #f4a460)',
                                        borderRadius: 'full',
                                        animation: `${underlineGrow} 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards`,
                                        transform: 'scaleX(0)',
                                    }}
                                >
                                    {t('core.hero.headline.2')}
                                </Text>
                            </Heading>

                            <VStack align="flex-start" spacing={4} maxW="560px">
                                <Text
                                    fontSize={{ base: "sm", md: "md" }}
                                    color="#444"
                                    lineHeight="1.9"
                                    fontWeight="600"
                                    animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards`}
                                    opacity={0}
                                >
                                    {t('core.hero.body.1')}
                                </Text>
                                <Text
                                    fontSize={{ base: "sm", md: "md" }}
                                    color="#444"
                                    lineHeight="1.9"
                                    fontWeight="600"
                                    animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards`}
                                    opacity={0}
                                >
                                    {t('core.hero.body.2')}
                                </Text>
                                <Text
                                    fontSize={{ base: "md", md: "lg" }}
                                    color="#111111"
                                    lineHeight="1.8"
                                    fontWeight="700"
                                    mt={2}
                                    animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards`}
                                    opacity={0}
                                >
                                    {t('core.hero.body.3.start')}
                                    <Text as="span" color="#e08e46">{t('core.hero.body.3.highlight')}</Text>
                                    {t('core.hero.body.3.end')}
                                </Text>
                            </VStack>
                        </VStack>

                        <HStack
                            spacing={4}
                            pt={2}
                            flexWrap="wrap"
                            key={`buttons-${animationKey}`}
                            animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards`}
                            opacity={0}
                        >
                            {/* Primary CTA - Orange solid with glow */}
                            <Button
                                size="lg"
                                h="56px"
                                px={8}
                                bg="linear-gradient(135deg, #e08e46 0%, #f4a460 100%)"
                                color="white"
                                fontWeight="700"
                                borderRadius="full"
                                leftIcon={<FaRocket />}
                                onClick={onOpen}
                                boxShadow="0 4px 14px rgba(224, 142, 70, 0.4)"
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(224, 142, 70, 0.5)',
                                }}
                                _active={{
                                    transform: 'translateY(0)',
                                }}
                                transition="all 0.2s"
                                fontSize={{ base: "sm", md: "md" }}
                            >
                                {t('core.hero.cta.primary')}
                            </Button>
                            {/* Features CTA - Glassy white */}
                            <Button
                                size="lg"
                                h="56px"
                                px={8}
                                bg="rgba(255, 255, 255, 0.7)"
                                backdropFilter="blur(10px)"
                                color="#111111"
                                fontWeight="700"
                                borderRadius="full"
                                border="1px solid"
                                borderColor="rgba(224, 142, 70, 0.3)"
                                leftIcon={<FiLayers color="#e08e46" />}
                                onClick={() => scrollToSection('modules')}
                                _hover={{
                                    bg: 'rgba(255, 255, 255, 0.9)',
                                    borderColor: '#e08e46',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(224, 142, 70, 0.2)',
                                }}
                                _active={{
                                    transform: 'translateY(0)',
                                }}
                                transition="all 0.2s"
                                fontSize={{ base: "sm", md: "md" }}
                            >
                                {t('core.hero.cta.features')}
                            </Button>
                            {/* Pricing CTA - Glassy white with orange accent */}
                            <Button
                                size="lg"
                                h="56px"
                                px={8}
                                bg="rgba(255, 255, 255, 0.7)"
                                backdropFilter="blur(10px)"
                                color="#111111"
                                fontWeight="700"
                                borderRadius="full"
                                border="1px solid"
                                borderColor="rgba(224, 142, 70, 0.3)"
                                leftIcon={<FaYenSign color="#e08e46" />}
                                onClick={() => scrollToSection('pricing')}
                                _hover={{
                                    bg: 'rgba(255, 255, 255, 0.9)',
                                    borderColor: '#e08e46',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(224, 142, 70, 0.2)',
                                }}
                                _active={{
                                    transform: 'translateY(0)',
                                }}
                                transition="all 0.2s"
                                fontSize={{ base: "sm", md: "md" }}
                            >
                                {t('core.hero.cta.pricing')}
                            </Button>
                        </HStack>

                        <HStack
                            spacing={6}
                            pt={4}
                            opacity={0.7}
                            key={`trust-${animationKey}`}
                            animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards`}
                            sx={{ opacity: 0 }}
                        >
                            <Text fontSize="sm" color="#6e6e73" fontWeight="500">
                                ✓ {t('core.hero.trust.1')}
                            </Text>
                            <Text fontSize="sm" color="#6e6e73" fontWeight="500">
                                ✓ {t('core.hero.trust.2')}
                            </Text>
                        </HStack>
                    </VStack>

                    {/* Right Column - Lottie Animation */}
                    <Box
                        position="relative"
                        display={{ base: 'none', lg: 'block' }}
                    >
                        <Box
                            animation={`${float} 6s ease-in-out infinite`}
                        >
                            {/* Lottie Animation Container */}
                            <Box
                                ref={lottieContainerRef}
                                width="100%"
                                maxW="650px"
                                height={{ base: '350px', xl: '450px' }}
                                mx="auto"
                            />
                        </Box>
                    </Box>
                </SimpleGrid>
            </Container>

            <InquiryModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}
