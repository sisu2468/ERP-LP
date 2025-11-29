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
import { useCallback } from 'react';
import InquiryModal from '../../common/InquiryModal';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/common/TranslatedText';

export default function CTASection() {
    const { t } = useLanguage();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
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
                                {/* Primary CTA - Orange with glow */}
                                <Button
                                    size="lg"
                                    bg="linear-gradient(135deg, #e08e46 0%, #f4a460 100%)"
                                    color="white"
                                    px={{ base: 6, md: 10 }}
                                    h="56px"
                                    fontSize={{ base: "sm", md: "md" }}
                                    fontWeight="700"
                                    borderRadius="full"
                                    onClick={onOpen}
                                    rightIcon={<FaArrowRight />}
                                    boxShadow="0 4px 14px rgba(224, 142, 70, 0.4)"
                                    _hover={{
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 8px 24px rgba(224, 142, 70, 0.5)",
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
                                {/* Secondary CTA - Glassy with orange accent */}
                                <Button
                                    size="lg"
                                    h="56px"
                                    px={{ base: 6, md: 10 }}
                                    bg="rgba(255, 255, 255, 0.8)"
                                    backdropFilter="blur(10px)"
                                    color="#111111"
                                    fontWeight="700"
                                    borderRadius="full"
                                    border="1px solid"
                                    borderColor="rgba(224, 142, 70, 0.3)"
                                    fontSize={{ base: "sm", md: "md" }}
                                    onClick={() => scrollToSection('pricing')}
                                    _hover={{
                                        bg: 'rgba(255, 255, 255, 0.95)',
                                        borderColor: '#e08e46',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 24px rgba(224, 142, 70, 0.2)',
                                    }}
                                    _active={{
                                        transform: 'translateY(0)',
                                    }}
                                    transition="all 0.2s"
                                >
                                    {t('cta.final.button2')}
                                </Button>
                            </Flex>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
} 