'use client';

import { Box, Container, Heading, Text, VStack, Image, Grid, GridItem, Badge } from "@chakra-ui/react";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/common/TranslatedText';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CreationSection() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;
        const image = imageRef.current;

        if (section && content && image) {
            // Content fade in animation
            gsap.fromTo(content,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Pin the image to scroll with content
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                pin: image,
                pinSpacing: false,
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <Box
            ref={sectionRef}
            py={{ base: 20, md: 28, lg: 32 }}
            bg="white"
            position="relative"
            overflow="hidden"
        >
            {/* Subtle background shapes */}
            <Box
                position="absolute"
                top="5%"
                right="-8%"
                w="500px"
                h="500px"
                opacity={0.15}
                zIndex={0}
                pointerEvents="none"
            >
                <svg width="100%" height="100%" viewBox="0 0 500 500">
                    <defs>
                        <linearGradient id="creationGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e08e46" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#f4a460" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                    <circle cx="250" cy="250" r="200" fill="url(#creationGrad1)" />
                </svg>
            </Box>

            <Box
                position="absolute"
                bottom="-10%"
                left="-5%"
                w="400px"
                h="400px"
                opacity={0.12}
                zIndex={0}
                pointerEvents="none"
            >
                <svg width="100%" height="100%" viewBox="0 0 400 400">
                    <defs>
                        <linearGradient id="creationGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffc478" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#e08e46" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <polygon points="200,50 350,350 50,350" fill="url(#creationGrad2)" />
                </svg>
            </Box>
            <Container maxW={{ base: "container.md", lg: "container.xl" }} px={{ base: 8, md: 10, lg: 12 }} position="relative" zIndex={1}>
                <Grid
                    templateColumns={{ base: "1fr", lg: "1fr 400px" }}
                    gap={{ base: 0, lg: 16 }}
                    alignItems="flex-start"
                >
                    {/* Text Content - Left Side */}
                    <GridItem order={{ base: 2, lg: 1 }}>
                        <VStack ref={contentRef} align="flex-start" spacing={10} w="100%">
                            {/* Badge */}
                            <Box w="100%" display="flex" justifyContent="center">
                                <Badge
                                    px={4}
                                    py={2}
                                    borderRadius="full"
                                    fontSize="sm"
                                    fontWeight="600"
                                    bg="rgba(224, 142, 70, 0.1)"
                                    color="#e08e46"
                                    border="1px solid"
                                    borderColor="rgba(224, 142, 70, 0.2)"
                                >
                                    {t('philosophy.creation.badge')}
                                </Badge>
                            </Box>

                            <Heading
                                as="h2"
                                fontSize={{ base: "3xl", md: "4xl" }}
                                fontWeight="700"
                                color="gray.900"
                                letterSpacing="-0.02em"
                                lineHeight="1.2"
                            >
                                <TranslatedText as="span" translationKey="philosophy.creation.title" staggerDelay={0.08} />
                            </Heading>

                            <VStack align="flex-start" spacing={6} fontSize={{ base: "md", md: "lg" }} lineHeight="1.9" color="gray.700">
                                <Text>{t('philosophy.creation.p1')}</Text>
                                <Text>{t('philosophy.creation.p2')}</Text>
                                <Text>{t('philosophy.creation.p3')}</Text>
                                <Text>{t('philosophy.creation.p4')}</Text>
                                <Text>{t('philosophy.creation.p5')}</Text>
                                <Text>{t('philosophy.creation.p6')}</Text>
                                <Text>{t('philosophy.creation.p7')}</Text>

                                <Box
                                    w="100%"
                                    pl={6}
                                    py={5}
                                    borderLeft="5px solid"
                                    borderColor="#E19C49"
                                    my={4}
                                >
                                    <VStack align="flex-start" spacing={3}>
                                        <Text color="gray.900" fontWeight="500" fontSize={{ base: "md", md: "lg" }}>
                                            {t('philosophy.creation.callout1')}
                                        </Text>
                                        <Text color="gray.900" fontWeight="500" fontSize={{ base: "md", md: "lg" }}>
                                            {t('philosophy.creation.callout2')}
                                        </Text>
                                        <Text color="gray.900" fontWeight="500" fontSize={{ base: "md", md: "lg" }}>
                                            {t('philosophy.creation.callout3')}
                                        </Text>
                                        <Text color="gray.900" fontWeight="500" fontSize={{ base: "md", md: "lg" }}>
                                            {t('philosophy.creation.callout4')}
                                        </Text>
                                    </VStack>
                                </Box>

                               

                                <Text fontWeight="600" fontSize={{ base: "lg", md: "xl" }} color="gray.900">
                                    {t('philosophy.creation.p8')}
                                </Text>

                                <Text
                                    fontWeight="700"
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    color="gray.900"
                                    lineHeight="1.5"
                                    pt={4}
                                >
                                    {t('philosophy.creation.final')}
                                </Text>
                            </VStack>

                            {/* Signature */}
                            <Box
                                pt={6}
                                w="100%"
                                display="flex"
                                justifyContent={{ base: "center", lg: "center" }}
                            >
                                <Image
                                    src="/images/philo/sign_japanese.png"
                                    alt="Signature"
                                    maxW={{ base: "240px", md: "280px" }}
                                    opacity={0.85}
                                />
                            </Box>
                        </VStack>
                    </GridItem>

                    <GridItem
                        order={{ base: 1, lg: 2 }}
                        mb={{ base: 12, lg: 0 }}
                    >
                        <Box
                            display={{ base: "block", lg: "none" }}
                            maxW="400px"
                            mx="auto"
                            overflow="hidden"
                        >
                            <Image
                                src="/images/philo/bodyimage.jpg"
                                alt="Philosophy"
                                w="100%"
                                h="auto"
                                objectFit="cover"
                                objectPosition="60% center"
                            />
                        </Box>

                        <Box
                            ref={imageRef}
                            display={{ base: "none", lg: "block" }}
                            w="100%"
                        >
                            <Image
                                src="/images/philo/bodyimage.jpg"
                                alt="Philosophy"
                                w="100%"
                                h="auto"
                                maxH="85vh"
                                objectFit="cover"
                                boxShadow="0 10px 40px rgba(0, 0, 0, 0.15)"
                            />
                        </Box>
                    </GridItem>
                </Grid>
            </Container>
        </Box>
    );
}
