'use client';

import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
    Badge,
} from '@chakra-ui/react';
import { FaComments, FaUserShield, FaExclamationCircle, FaRandom, FaUserClock, FaArrowRight } from 'react-icons/fa';
import ScrollReveal from '@/components/common/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLanguageAnimation, textReveal } from '@/components/common/LanguageAnimationWrapper';
import TranslatedText from '@/components/common/TranslatedText';

export default function ProblemsSection() {
    const { t } = useLanguage();
    const { animationKey } = useLanguageAnimation();

    const problems = [
        {
            icon: FaComments,
            title: t('english.problems.item.1'),
        },
        {
            icon: FaUserShield,
            title: t('english.problems.item.2'),
        },
        {
            icon: FaExclamationCircle,
            title: t('english.problems.item.3'),
        },
        {
            icon: FaRandom,
            title: t('english.problems.item.4'),
        },
        {
            icon: FaUserClock,
            title: t('english.problems.item.5'),
        },
    ];

    return (
        <Box py={{ base: 16, md: 24 }} bg="#fafafa">
            <Container maxW="7xl">
                <VStack spacing={12}>
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
                                {t('english.problems.badge')}
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
                                <TranslatedText as="span" translationKey="english.problems.title.1" staggerDelay={0} />
                                <Text as="span" color="#e08e46"><TranslatedText as="span" translationKey="english.problems.title.2" staggerDelay={0.02} /></Text>
                                <TranslatedText as="span" translationKey="english.problems.title.3" staggerDelay={0.04} />
                            </Heading>
                        </VStack>
                    </ScrollReveal>

                    {/* Problem List - Clean vertical layout */}
                    <ScrollReveal>
                        <VStack spacing={4} w="full" maxW="3xl" mx="auto">
                            {problems.map((problem, index) => (
                                <HStack
                                    key={index}
                                    w="full"
                                    p={5}
                                    bg="white"
                                    borderRadius="xl"
                                    border="1px solid"
                                    borderColor="#e5e7eb"
                                    spacing={4}
                                    transition="all 0.2s"
                                    _hover={{
                                        borderColor: '#e08e46',
                                        boxShadow: '0 4px 20px rgba(224, 142, 70, 0.1)',
                                    }}
                                >
                                    <Box
                                        w="44px"
                                        h="44px"
                                        borderRadius="full"
                                        bg="rgba(224, 142, 70, 0.1)"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexShrink={0}
                                    >
                                        <Icon
                                            as={problem.icon}
                                            boxSize={5}
                                            color="#e08e46"
                                        />
                                    </Box>
                                    <Text
                                        fontSize={{ base: "md", md: "lg" }}
                                        fontWeight="600"
                                        color="#111111"
                                        lineHeight="1.5"
                                    >
                                        {problem.title}
                                    </Text>
                                </HStack>
                            ))}
                        </VStack>
                    </ScrollReveal>

                    {/* Solution */}
                    <ScrollReveal>
                        <VStack spacing={6} maxW="3xl" mx="auto" px={{ base: 4, md: 0 }}>
                            <Icon as={FaArrowRight} boxSize={5} color="#e08e46" transform="rotate(90deg)" opacity={0.5} />

                            <VStack spacing={0} align="center">
                                <Text
                                    fontSize={{ base: "xl", md: "3xl", lg: "36px" }}
                                    color="#111111"
                                    fontWeight="700"
                                    letterSpacing="-0.02em"
                                    lineHeight="1.4"
                                    textAlign="center"
                                >
                                    <Text as="span" color="#e08e46">{t('english.problems.solution.1')}</Text>
                                    {t('english.problems.solution.2')}
                                </Text>
                            </VStack>

                            <Text
                                fontSize={{ base: "md", md: "xl" }}
                                color="#111111"
                                fontWeight="600"
                                textAlign="center"
                                lineHeight={{ base: "2", md: "1.8" }}
                            >
                                {t('english.problems.solution.detail.1')}
                                <Text as="span" color="#e08e46">{t('english.problems.solution.detail.highlight1')}</Text>
                                {t('english.problems.solution.detail.2')}
                                <Text as="span" color="#e08e46">{t('english.problems.solution.detail.highlight2')}</Text>
                                {t('english.problems.solution.detail.3')}
                            </Text>
                        </VStack>
                    </ScrollReveal>
                </VStack>
            </Container>
        </Box>
    );
}
