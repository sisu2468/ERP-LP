'use client';

import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Badge,
    Icon,
} from '@chakra-ui/react';
import { FaHeadset, FaChalkboardTeacher, FaComments, FaArrowRight } from 'react-icons/fa';
import ScrollReveal from '@/components/common/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLanguageAnimation, textReveal } from '@/components/common/LanguageAnimationWrapper';
import TranslatedText from '@/components/common/TranslatedText';

export default function ProcessSection() {
    const { t } = useLanguage();
    const { animationKey } = useLanguageAnimation();

    const steps = [
        {
            number: '01',
            icon: FaHeadset,
            title: t('english.process.step.1.title'),
            description: t('english.process.step.1.desc'),
            color: '#e08e46',
        },
        {
            number: '02',
            icon: FaChalkboardTeacher,
            title: t('english.process.step.2.title'),
            description: t('english.process.step.2.desc'),
            color: '#f4a460',
        },
        {
            number: '03',
            icon: FaComments,
            title: t('english.process.step.3.title'),
            description: t('english.process.step.3.desc'),
            color: '#d97706',
        },
    ];

    return (
        <Box py={{ base: 16, md: 24 }} bg="white">
            <Container maxW="7xl">
                <VStack spacing={16}>
                    {/* Section Header */}
                    <ScrollReveal>
                        <VStack spacing={6} textAlign="center" maxW="4xl" mx="auto" key={animationKey}>
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
                                textTransform="none"
                                animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`}
                            >
                                {t('english.process.badge')}
                            </Badge>
                            <Heading
                                as="h2"
                                fontSize={{ base: "2xl", md: "3xl", lg: "42px" }}
                                fontWeight="700"
                                color="#111111"
                                letterSpacing="-0.02em"
                                lineHeight="1.3"
                                animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards`}
                                opacity={0}
                            >
                                <TranslatedText as="span" translationKey="english.process.title.1" staggerDelay={0} />
                                <Text as="span" color="#e08e46"><TranslatedText as="span" translationKey="english.process.title.2" staggerDelay={0.02} /></Text>
                                <TranslatedText as="span" translationKey="english.process.title.3" staggerDelay={0.04} />
                            </Heading>
                        </VStack>
                    </ScrollReveal>

                    {/* Process Steps - Horizontal on desktop, vertical on mobile */}
                    <Box w="full" position="relative">
                        {/* Desktop View */}
                        <HStack
                            spacing={0}
                            justify="center"
                            align="stretch"
                            display={{ base: 'none', lg: 'flex' }}
                        >
                            {steps.map((step, index) => (
                                <ScrollReveal key={index} delay={index * 0.15}>
                                    <HStack spacing={0} align="center">
                                        <Box
                                            bg="#fafafa"
                                            p={8}
                                            borderRadius="2xl"
                                            border="1px solid"
                                            borderColor="#e5e7eb"
                                            transition="all 0.3s"
                                            minW="280px"
                                            _hover={{
                                                borderColor: step.color,
                                                transform: 'translateY(-4px)',
                                                boxShadow: `0 20px 40px ${step.color}15`,
                                            }}
                                        >
                                            <VStack spacing={5} align="center" textAlign="center">
                                                <Box position="relative">
                                                    <Box
                                                        w="80px"
                                                        h="80px"
                                                        borderRadius="full"
                                                        bg={`${step.color}15`}
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <Icon
                                                            as={step.icon}
                                                            boxSize={8}
                                                            color={step.color}
                                                        />
                                                    </Box>
                                                    <Box
                                                        position="absolute"
                                                        top="-8px"
                                                        right="-8px"
                                                        w="32px"
                                                        h="32px"
                                                        borderRadius="full"
                                                        bg={step.color}
                                                        color="white"
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        fontWeight="700"
                                                        fontSize="xs"
                                                    >
                                                        {step.number}
                                                    </Box>
                                                </Box>
                                                <VStack spacing={2}>
                                                    <Text
                                                        fontSize="lg"
                                                        fontWeight="700"
                                                        color="#111111"
                                                    >
                                                        {step.title}
                                                    </Text>
                                                    <Text
                                                        fontSize="sm"
                                                        color="#6e6e73"
                                                        lineHeight="1.7"
                                                    >
                                                        {step.description}
                                                    </Text>
                                                </VStack>
                                            </VStack>
                                        </Box>

                                        {/* Arrow between steps */}
                                        {index < steps.length - 1 && (
                                            <Box px={4}>
                                                <Icon
                                                    as={FaArrowRight}
                                                    boxSize={6}
                                                    color="#e08e46"
                                                    opacity={0.5}
                                                />
                                            </Box>
                                        )}
                                    </HStack>
                                </ScrollReveal>
                            ))}
                        </HStack>

                        {/* Mobile View */}
                        <VStack
                            spacing={6}
                            display={{ base: 'flex', lg: 'none' }}
                        >
                            {steps.map((step, index) => (
                                <ScrollReveal key={index} delay={index * 0.1}>
                                    <Box
                                        bg="#fafafa"
                                        p={6}
                                        borderRadius="2xl"
                                        border="1px solid"
                                        borderColor="#e5e7eb"
                                        w="full"
                                    >
                                        <HStack spacing={4} align="flex-start">
                                            <Box position="relative" flexShrink={0}>
                                                <Box
                                                    w="60px"
                                                    h="60px"
                                                    borderRadius="full"
                                                    bg={`${step.color}15`}
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <Icon
                                                        as={step.icon}
                                                        boxSize={6}
                                                        color={step.color}
                                                    />
                                                </Box>
                                                <Box
                                                    position="absolute"
                                                    top="-4px"
                                                    right="-4px"
                                                    w="24px"
                                                    h="24px"
                                                    borderRadius="full"
                                                    bg={step.color}
                                                    color="white"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    fontWeight="700"
                                                    fontSize="xs"
                                                >
                                                    {step.number}
                                                </Box>
                                            </Box>
                                            <VStack spacing={1} align="flex-start">
                                                <Text
                                                    fontSize="md"
                                                    fontWeight="700"
                                                    color="#111111"
                                                >
                                                    {step.title}
                                                </Text>
                                                <Text
                                                    fontSize="sm"
                                                    color="#6e6e73"
                                                    lineHeight="1.7"
                                                >
                                                    {step.description}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                </ScrollReveal>
                            ))}
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}
