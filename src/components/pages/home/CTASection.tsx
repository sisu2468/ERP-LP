"use client"

import {
    Box,
    Container,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Text,
    VStack,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import {
    FaRocket,
    FaChartLine,
    FaUsers,
    FaArrowRight,
} from 'react-icons/fa';
import Button_Blue from '../../buttons/Button_Blue';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InquiryModal from '../../common/InquiryModal';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/common/TranslatedText';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
    const { t } = useLanguage(); // 理志：言語翻訳用フックを追加
    const headingRef = useRef(null);
    const cardsGridRef = useRef(null);
    const ctaBoxRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        gsap.fromTo(headingRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        gsap.fromTo(cardsGridRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: cardsGridRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        const ctaBox = ctaBoxRef.current;
        if (ctaBox) {
            gsap.fromTo(ctaBox,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: ctaBox,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const benefits = [
        {
            icon: FaRocket,
            titleKey: "cta.benefit1.title",
            descriptionKey: "cta.benefit1.description",
        },
        {
            icon: FaChartLine,
            titleKey: "cta.benefit2.title",
            descriptionKey: "cta.benefit2.description",
        },
        {
            icon: FaUsers,
            titleKey: "cta.benefit3.title",
            descriptionKey: "cta.benefit3.description",
        }
    ];

    return (
        <Box 
            py={{ base: 16, md: 24 }}
            bg="#ffffff"
            borderTop="1px solid"
            borderColor="#e5e7eb"
        >
            <Container maxW="7xl">
                <VStack spacing={16}>
                    <VStack 
                        ref={headingRef}
                        spacing={4} 
                        textAlign="center" 
                        maxW="3xl" 
                        mx="auto"
                    >
                        <Heading 
                            fontSize={{ base: "3xl", md: "4xl", lg: "52px" }}
                            fontWeight="600"
                            color="#111111"
                            letterSpacing="-0.02em"
                            lineHeight="1.1"
                        >
                            <TranslatedText translationKey="cta.heading.1" as="span" staggerDelay={0.1} />
                            <TranslatedText translationKey="cta.heading.2" as="span" color="#e08e46" staggerDelay={0.12} />
                            <TranslatedText translationKey="cta.heading.3" as="span" staggerDelay={0.14} />
                        </Heading>
                        <Text fontSize="xl" color="#6e6e73" lineHeight="1.6">
                            <TranslatedText translationKey="cta.subheading" staggerDelay={0.05} />
                        </Text>
                    </VStack>

                    <SimpleGrid
                        ref={cardsGridRef}
                        columns={{ base: 1, lg: 3 }}
                        spacing={6}
                        width="full"
                    >
                        {benefits.map((benefit, index) => (
                            <Box
                                key={index}
                                p={8}
                                bg="white"
                                borderRadius="xl"
                                border="1px"
                                borderColor="#e5e7eb"
                                textAlign="center"
                                boxShadow="0 1px 3px rgba(0, 0, 0, 0.05)"
                                _hover={{
                                    borderColor: 'rgba(224, 142, 70, 0.3)',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
                                    transform: 'translateY(-4px)',
                                    transition: 'all 0.2s',
                                }}
                                transition="all 0.2s"
                            >
                                <VStack spacing={4}>
                                    <Box
                                        w={14}
                                        h={14}
                                        borderRadius="xl"
                                        bg="rgba(224, 142, 70, 0.1)"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Icon 
                                            as={benefit.icon} 
                                            w={7} 
                                            h={7} 
                                            color="#e08e46"
                                        />
                                    </Box>
                                    <Heading size="md" color="#111111" fontWeight="700">
                                        <TranslatedText translationKey={benefit.titleKey} staggerDelay={0.1} />
                                    </Heading>
                                    <Text color="#6e6e73" lineHeight="1.7" fontSize="md">
                                        <TranslatedText translationKey={benefit.descriptionKey} staggerDelay={0.05} />
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>

                    <Box
                        ref={ctaBoxRef}
                        bg="#fafafa"
                        w="full"
                        p={12}
                        borderRadius="2xl"
                        textAlign="center"
                        borderWidth="1px"
                        borderColor="#e5e7eb"
                    >
                        <VStack spacing={6}>
                            <Heading size="lg" fontWeight="700" color="#111111">
                                <TranslatedText translationKey="cta.final.heading" staggerDelay={0.1} />
                            </Heading>
                            <Text color="#6e6e73" fontSize="lg">
                                <TranslatedText translationKey="cta.final.subheading" staggerDelay={0.05} />
                            </Text>
                            <Flex
                                gap={4}
                                flexWrap="wrap"
                                justify="center"
                                pt={4}
                                w="full"
                            >
                                <Button
                                    size="lg"
                                    bg="#e08e46"
                                    color="white"
                                    px={{ base: 6, md: 10 }}
                                    h="56px"
                                    fontSize={{ base: "sm", md: "md" }}
                                    fontWeight="600"
                                    borderRadius="full"
                                    onClick={onOpen}
                                    rightIcon={<FaArrowRight />}
                                    _hover={{
                                        bg: "#d17d35",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 4px 12px rgba(224, 142, 70, 0.3)",
                                    }}
                                    _active={{
                                        transform: "translateY(0)",
                                    }}
                                    transition="all 0.2s"
                                    whiteSpace="normal"
                                    textAlign="center"
                                >
                                    {t('cta.final.button1')}
                                </Button>
                                <InquiryModal isOpen={isOpen} onClose={onClose} />
                                <Button_Blue href="/pricing">
                                    {t('cta.final.button2')}
                                </Button_Blue>
                            </Flex>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
} 