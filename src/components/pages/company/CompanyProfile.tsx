'use client';
import { Box, Container, Heading, HStack, List, ListIcon, ListItem, Text, VStack, Badge } from "@chakra-ui/react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from "react";
import { FiCircle } from "react-icons/fi";
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/common/TranslatedText';

gsap.registerPlugin(ScrollTrigger);

export const CompanyProfile = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        // Heading animation - matching home page pattern
        gsap.fromTo(sectionRef.current,
            {
                opacity: 0,
                y: 60
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Card animation - slide in from bottom with scale
        gsap.fromTo(cardRef.current,
            {
                opacity: 0,
                y: 60,
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
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Items stagger animation - slide in from bottom
        if (itemRefs.current.length > 0) {
            gsap.fromTo(itemRefs.current,
                {
                    opacity: 0,
                    y: 40
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <Box
            bg="white"
            id="company"
            position="relative"
            py={20}
        >
            <Container maxW="6xl" position="relative">
                <VStack spacing={16} align="stretch">
                    <Box ref={sectionRef}>
                        <VStack spacing={6} mb={16}>
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
                                {t('company.badge')}
                            </Badge>
                            <Heading
                                as="h2"
                                fontSize={{ base: "3xl", md: "4xl", lg: "48px" }}
                                textAlign="center"
                                color="#111111"
                                fontWeight="700"
                                letterSpacing="-0.02em"
                            >
                                <TranslatedText as="span" translationKey="company.heading" staggerDelay={0.1} />
                            </Heading>
                            <Text
                                color="#6e6e73"
                                fontSize={{ base: "lg", md: "xl" }}
                                letterSpacing="0.1em"
                                fontWeight="600"
                            >
                                COMPANY PROFILE
                            </Text>
                        </VStack>

                        <VStack
                            ref={cardRef}
                            spacing={0}
                            align="stretch"
                            borderRadius="2xl"
                            borderWidth="1px"
                            borderColor="#e5e7eb"
                            overflow="hidden"
                            bg="white"
                            boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
                        >
                            {[
                                { label: t('company.name.label'), content: <Text fontSize="lg" color="#111111" fontWeight="500" sx={{ wordBreak: 'keep-all', overflowWrap: 'anywhere', lineBreak: 'strict' }}>{t('company.name.value')}</Text> },
                                { label: t('company.location.label'), content: <Text color="#111111" fontWeight="500" sx={{ wordBreak: 'keep-all', overflowWrap: 'anywhere', lineBreak: 'strict' }}>{t('company.location.value')}</Text> },
                                {
                                    label: t('company.ceo.label'), content: (
                                        <VStack align="start" spacing={1}>
                                            <Text color="#111111" fontWeight="500" sx={{ wordBreak: 'keep-all', overflowWrap: 'anywhere', lineBreak: 'strict' }}>{t('company.ceo.value')}</Text>
                                        </VStack>
                                    )
                                },
                                { label: t('company.members.label'), content: <Text color="#111111" fontWeight="500" sx={{ wordBreak: 'keep-all', overflowWrap: 'anywhere', lineBreak: 'strict' }}>{t('company.members.value')}</Text> }
                            ].map((item, index) => (
                                <HStack
                                    key={item.label}
                                    ref={el => {
                                        if (el) itemRefs.current[index] = el;
                                    }}
                                    spacing={8}
                                    w="full"
                                    py={6}
                                    px={8}
                                    borderBottomWidth={index < 3 ? "1px" : "0"}
                                    borderColor="#f5f5f7"
                                    transition="all 0.3s"
                                    _hover={{
                                        bg: "#fafafa",
                                    }}
                                >
                                    <Text
                                        fontWeight="700"
                                        minW="120px"
                                        color="#e08e46"
                                        fontSize="md"
                                    >
                                        {item.label}
                                    </Text>
                                    <Box flex="1">
                                        {item.content}
                                    </Box>
                                </HStack>
                            ))}

                            <HStack
                                spacing={8}
                                w="full"
                                py={6}
                                px={8}
                                alignItems="flex-start"
                                ref={el => {
                                    if (el) itemRefs.current[4] = el;
                                }}
                                transition="all 0.3s"
                                _hover={{
                                    bg: "#fafafa",
                                }}
                            >
                                <Text
                                    fontWeight="700"
                                    minW="120px"
                                    color="#e08e46"
                                    fontSize="md"
                                >
                                    {t('company.business.label')}
                                </Text>
                                <List spacing={4} flex="1">
                                    {[
                                        t('company.business.erp'),
                                        t('company.business.lab'),
                                        t('company.business.connect')
                                    ].map((service, index) => (
                                        <ListItem
                                            key={index}
                                            display="flex"
                                            alignItems="center"
                                            transition="all 0.3s"
                                            color="#111111"
                                            fontWeight="500"
                                            sx={{
                                                wordBreak: 'keep-all',
                                                overflowWrap: 'anywhere',
                                                lineBreak: 'strict'
                                            }}
                                            _hover={{
                                                color: '#e08e46',
                                                transform: 'translateX(8px)'
                                            }}
                                        >
                                            <ListIcon
                                                as={FiCircle}
                                                color="#e08e46"
                                                fontSize="xs"
                                                mr={3}
                                            />
                                            {service}
                                        </ListItem>
                                    ))}
                                </List>
                            </HStack>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}