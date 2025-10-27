'use client';

import { Box, Container, Heading, Text, VStack, Button, useDisclosure, Tooltip } from "@chakra-ui/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import InquiryModal from '@/components/common/InquiryModal';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/common/TranslatedText';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const InteractiveWord = ({ word, message }: { word: string; message: string }) => {
    const { language } = useLanguage();
    
    return (
        <Tooltip
            label={message}
            bg="white"
            color="#e08e46"
            fontSize="sm"
            fontWeight="600"
            px={4}
            py={2}
            borderRadius="md"
            border="2px solid"
            borderColor="#e08e46"
            boxShadow="0 4px 12px rgba(224, 142, 70, 0.2)"
            hasArrow
            placement="bottom"
            arrowShadowColor="rgba(224, 142, 70, 0.2)"
        >
            <Box
                as="span"
                color="#e08e46"
                fontWeight="700"
                cursor="pointer"
                position="relative"
                _after={{
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    bg: '#e08e46',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease'
                }}
                _hover={{
                    _after: {
                        transform: 'scaleX(1)'
                    }
                }}
            >
                {word}
            </Box>
        </Tooltip>
    );
};

export default function OurThoughts() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const quoteRef = useRef(null);
    const ctaRef = useRef(null);
    const principleRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.fromTo(headingRef.current,
                { opacity: 0, scale: 0.9, y: 60 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(quoteRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(principleRef.current,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: principleRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(ctaRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Box
                ref={sectionRef}
                bg="gray.50"
                py={{ base: 20, md: 28, lg: 32 }}
                position="relative"
                overflow="hidden"
            >
                <Container maxW={{ base: "container.md", lg: "container.lg" }} position="relative" zIndex={1} px={{ base: 8, md: 10, lg: 12 }}>
                    <VStack spacing={{ base: 12, md: 16 }} align="flex-start" w="full">
                        {/* Main Heading */}
                        <Box ref={headingRef} w="full">
                            <Heading
                                fontSize={{ base: "4xl", md: "5xl", lg: "56px" }}
                                fontWeight="800"
                                color="#111111"
                                letterSpacing="-0.03em"
                                lineHeight="1.1"
                            >
                                <TranslatedText as="span" translationKey="thoughts.main.title" staggerDelay={0.05} />
                                <br />
                                <InteractiveWord word={t('thoughts.main.liberate')} message={t('thoughts.tooltip.liberate')} />、
                                <InteractiveWord word={t('thoughts.main.create')} message={t('thoughts.tooltip.create')} />、
                                <InteractiveWord word={t('thoughts.main.challenge')} message={t('thoughts.tooltip.challenge')} />
                                <TranslatedText as="span" translationKey="thoughts.main.suffix" staggerDelay={0.05} />
                            </Heading>
                        </Box>

                        <Text
                            ref={quoteRef}
                            fontSize={{ base: "lg", md: "xl" }}
                            color="#111111"
                            lineHeight="1.8"
                            fontWeight="500"
                        >
                            {t('thoughts.quote')}
                        </Text>

                        <Box
                            ref={principleRef}
                            w="full"
                            pl={6}
                            py={5}
                            borderLeft="5px solid"
                            borderColor="#E19C49"
                        >
                            <Text fontWeight="600" fontSize={{ base: "lg", md: "xl" }} color="gray.900" lineHeight="1.7">
                                {t('thoughts.principle.title')}
                            </Text>
                        </Box>

                        <VStack spacing={6} align="flex-start" w="full">
                            <Text
                                fontSize={{ base: "md", md: "lg" }}
                                color="#111111"
                                lineHeight="1.9"
                            >
                                {t('thoughts.principle.subtitle')}
                            </Text>

                            <Text
                                fontSize={{ base: "md", md: "lg" }}
                                color="#111111"
                                lineHeight="1.9"
                            >
                                {t('thoughts.text1')}
                            </Text>

                            <Text
                                fontSize={{ base: "md", md: "lg" }}
                                color="#111111"
                                lineHeight="1.9"
                            >
                                {t('thoughts.text2')}
                            </Text>
                        </VStack>

                        {/* CTA Section */}
                        <Box
                            ref={ctaRef}
                            w="full"
                            pt={{ base: 8, md: 12 }}
                        >
                            <VStack spacing={6} align="flex-start" w="full">
                                <Heading
                                    fontSize={{ base: "2xl", md: "3xl", lg: "40px" }}
                                    fontWeight="700"
                                    color="#111111"
                                    lineHeight="1.3"
                                >
                                    {t('thoughts.cta.title')}
                                </Heading>
                                <Text
                                    fontSize={{ base: "md", md: "lg" }}
                                    color="#6e6e73"
                                    lineHeight="1.8"
                                >
                                    {t('thoughts.cta.subtitle')}
                                </Text>

                                <VStack spacing={10} align="center" w="full" pt={4}>
                                    <Button
                                        onClick={onOpen}
                                        size="lg"
                                        h="64px"
                                        px={12}
                                        bg="#e08e46"
                                        color="white"
                                        fontSize="lg"
                                        fontWeight="700"
                                        borderRadius="full"
                                        boxShadow="0 4px 20px rgba(224, 142, 70, 0.3)"
                                        _hover={{
                                            bg: "#d17d3a",
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 8px 30px rgba(224, 142, 70, 0.4)"
                                        }}
                                        _active={{
                                            transform: "translateY(0px)"
                                        }}
                                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                    >
                                        {t('thoughts.cta.button')}
                                    </Button>

                                    <Text
                                        fontSize={{ base: "sm", md: "md" }}
                                        color="#6e6e73"
                                        textAlign="center"
                                        fontWeight="500"
                                    >
                                        {t('thoughts.cta.benefits')}
                                    </Text>
                                </VStack>
                            </VStack>
                        </Box>

                    </VStack>
                </Container>
            </Box>

            <InquiryModal isOpen={isOpen} onClose={onClose} />
        </>
    );
} 