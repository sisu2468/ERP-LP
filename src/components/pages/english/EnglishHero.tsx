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
    useBreakpointValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Icon,
} from '@chakra-ui/react';
import { FiTool } from 'react-icons/fi';
import { keyframes } from '@emotion/react';
import { FaRocket, FaYenSign } from 'react-icons/fa';
import { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/common/TranslatedText';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
`;

// Text reveal animation
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

export default function EnglishHero() {
    const { language, t } = useLanguage();
    const [animationKey, setAnimationKey] = useState(0);
    const prevLanguageRef = useRef(language);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const handleRegisterClick = useCallback(() => {
        if (!isMobile) {
            onOpen();
        }
    }, [isMobile, onOpen]);

    // Trigger animation on language change
    useEffect(() => {
        if (prevLanguageRef.current !== language) {
            setAnimationKey(prev => prev + 1);
            prevLanguageRef.current = language;
        }
    }, [language]);

    return (
        <Box
            position="relative"
            bg="#fafafa"
            pt={{ base: 16, md: 20 }}
            pb={{ base: 16, md: 24 }}
        >
            <Container maxW="7xl" position="relative" zIndex={2}>
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 10, lg: 20, xl: 32 }} alignItems="center">
                    {/* Left Column - Content */}
                    <VStack align="flex-start" spacing={10}>
                        <VStack align="flex-start" spacing={8} key={animationKey}>
                            <Heading
                                as="h1"
                                fontSize={{ base: "24px", md: "32px", lg: "40px", xl: "46px" }}
                                fontWeight="800"
                                lineHeight="1.3"
                                letterSpacing="-0.02em"
                                color="#111111"
                                animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`}
                                style={{ perspective: '1000px' }}
                            >
                                <TranslatedText as="span" translationKey="english.hero.title.1" staggerDelay={0} />
                                <br />
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
                                    <TranslatedText as="span" translationKey="english.hero.title.2" staggerDelay={0.02} />
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
                                    <TranslatedText as="span" translationKey="english.hero.subtitle.1" staggerDelay={0.04} />
                                </Text>
                                <Text
                                    fontSize={{ base: "md", md: "lg" }}
                                    color="#111111"
                                    lineHeight="1.8"
                                    fontWeight="700"
                                    mt={2}
                                    animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards`}
                                    opacity={0}
                                >
                                    <TranslatedText as="span" translationKey="english.hero.subtitle.2" staggerDelay={0.06} />
                                    <Text as="span" color="#e08e46"><TranslatedText as="span" translationKey="english.hero.subtitle.2.highlight" staggerDelay={0.08} /></Text>
                                    <TranslatedText as="span" translationKey="english.hero.subtitle.2.end" staggerDelay={0.1} />
                                </Text>
                            </VStack>
                        </VStack>

                        <VStack
                            align="flex-start"
                            spacing={4}
                            pt={2}
                            key={`buttons-${animationKey}`}
                            animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards`}
                            opacity={0}
                            w="full"
                        >
                            <HStack spacing={4} flexWrap="wrap">
                                {/* Primary CTA - Orange solid with glow */}
                                <Button
                                    size="lg"
                                    h="56px"
                                    px={8}
                                    bg={isMobile ? "gray.300" : "linear-gradient(135deg, #e08e46 0%, #f4a460 100%)"}
                                    color={isMobile ? "gray.500" : "white"}
                                    fontWeight="700"
                                    borderRadius="full"
                                    leftIcon={<FaRocket />}
                                    onClick={handleRegisterClick}
                                    boxShadow={isMobile ? "none" : "0 4px 14px rgba(224, 142, 70, 0.4)"}
                                    cursor={isMobile ? "not-allowed" : "pointer"}
                                    _hover={isMobile ? {} : {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 24px rgba(224, 142, 70, 0.5)',
                                    }}
                                    _active={isMobile ? {} : {
                                        transform: 'translateY(0)',
                                    }}
                                    transition="all 0.2s"
                                    fontSize={{ base: "sm", md: "md" }}
                                    isDisabled={isMobile}
                                    _disabled={{
                                        bg: "gray.300",
                                        color: "gray.500",
                                        cursor: "not-allowed",
                                        opacity: 0.7,
                                    }}
                                >
                                    {t('english.hero.cta.register')}
                                </Button>
                                {/* Secondary CTA - Glassy white with orange accent */}
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
                                    {t('english.hero.cta.pricing')}
                                </Button>
                            </HStack>
                            {/* Mobile notice */}
                            {isMobile && (
                                <Box
                                    w="full"
                                    bg="rgba(110, 110, 115, 0.08)"
                                    borderRadius="lg"
                                    py={3}
                                    px={4}
                                    mt={3}
                                >
                                    <Text
                                        fontSize="xs"
                                        color="#6e6e73"
                                        fontWeight="500"
                                        textAlign="center"
                                    >
                                        {t('english.hero.mobile.notice')}
                                    </Text>
                                </Box>
                            )}
                        </VStack>
                    </VStack>

                    {/* Right Column - Hero Image */}
                    <Box
                        position="relative"
                        display={{ base: 'none', lg: 'block' }}
                    >
                        <Box
                            animation={`${float} 6s ease-in-out infinite`}
                        >
                            <Box
                                width="100%"
                                maxW="650px"
                                height={{ base: '350px', xl: '450px' }}
                                mx="auto"
                                position="relative"
                                borderRadius="2xl"
                                overflow="hidden"
                            >
                                <Image
                                    src="/images/english/english_hero.png"
                                    alt="SAINTA English"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    priority
                                />
                            </Box>
                        </Box>
                    </Box>
                </SimpleGrid>
            </Container>

            {/* Development Modal */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
                <ModalOverlay bg="rgba(0, 0, 0, 0.5)" backdropFilter="blur(8px)" />
                <ModalContent
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="#e5e7eb"
                    p={2}
                    bg="white"
                    boxShadow="0 25px 80px rgba(0, 0, 0, 0.2)"
                    mx={4}
                >
                    <ModalHeader
                        fontWeight="700"
                        fontSize={{ base: "lg", md: "xl" }}
                        pb={2}
                        color="#111111"
                        pt={6}
                        px={6}
                        textAlign="center"
                    >
                        {t('english.hero.modal.title')}
                    </ModalHeader>
                    <ModalCloseButton
                        color="#6e6e73"
                        top={4}
                        right={4}
                        borderRadius="full"
                        _hover={{ bg: '#fafafa' }}
                    />

                    <ModalBody px={6} pb={8}>
                        <VStack spacing={5} textAlign="center">
                            <Box
                                w={16}
                                h={16}
                                borderRadius="full"
                                bg="rgba(224, 142, 70, 0.1)"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Icon as={FiTool} boxSize={8} color="#e08e46" />
                            </Box>
                            <Text fontSize="sm" color="#6e6e73" lineHeight="1.8">
                                {t('english.hero.modal.message')}
                            </Text>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
