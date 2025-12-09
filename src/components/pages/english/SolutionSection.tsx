'use client';

import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    SimpleGrid,
    Icon,
    Badge,
} from '@chakra-ui/react';
import { FaBook, FaCommentDots, FaUserCog } from 'react-icons/fa';
import ScrollReveal from '@/components/common/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLanguageAnimation, textReveal } from '@/components/common/LanguageAnimationWrapper';
import TranslatedText from '@/components/common/TranslatedText';

export default function SolutionSection() {
    const { t } = useLanguage();
    const { animationKey } = useLanguageAnimation();

    const solutions = [
        {
            icon: FaBook,
            title: t('english.solutions.item.1.title'),
            description: t('english.solutions.item.1.desc'),
            color: '#e08e46',
        },
        {
            icon: FaCommentDots,
            title: t('english.solutions.item.2.title'),
            description: t('english.solutions.item.2.desc'),
            color: '#f4a460',
        },
        {
            icon: FaUserCog,
            title: t('english.solutions.item.3.title'),
            description: t('english.solutions.item.3.desc'),
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
                                {t('english.solutions.badge')}
                            </Badge>
                            <Heading
                                as="h2"
                                fontSize={{ base: "xl", md: "3xl", lg: "42px" }}
                                fontWeight="700"
                                color="#111111"
                                letterSpacing="-0.02em"
                                lineHeight={{ base: "1.5", md: "1.3" }}
                                animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards`}
                                opacity={0}
                            >
                                <TranslatedText as="span" translationKey="english.solutions.title.1" staggerDelay={0} />
                                <Text as="span" color="#e08e46"><TranslatedText as="span" translationKey="english.solutions.title.2" staggerDelay={0.02} /></Text>
                                <TranslatedText as="span" translationKey="english.solutions.title.3" staggerDelay={0.04} />
                            </Heading>
                        </VStack>
                    </ScrollReveal>

                    {/* Solution Cards */}
                    <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8} w="full">
                        {solutions.map((solution, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <Box
                                    bg="#fafafa"
                                    p={8}
                                    borderRadius="2xl"
                                    border="1px solid"
                                    borderColor="#e5e7eb"
                                    transition="all 0.3s"
                                    h="full"
                                    _hover={{
                                        borderColor: solution.color,
                                        transform: 'translateY(-4px)',
                                        boxShadow: `0 20px 40px ${solution.color}15`,
                                    }}
                                >
                                    <VStack spacing={6} align="flex-start">
                                        <Box
                                            w="64px"
                                            h="64px"
                                            borderRadius="xl"
                                            bg={`${solution.color}15`}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Icon
                                                as={solution.icon}
                                                boxSize={7}
                                                color={solution.color}
                                            />
                                        </Box>
                                        <VStack spacing={3} align="flex-start">
                                            <Text
                                                fontSize={{ base: "lg", md: "xl" }}
                                                fontWeight="700"
                                                color="#111111"
                                                lineHeight="1.4"
                                            >
                                                {solution.title}
                                            </Text>
                                            <Text
                                                fontSize={{ base: "sm", md: "md" }}
                                                color="#6e6e73"
                                                lineHeight="1.8"
                                            >
                                                {solution.description}
                                            </Text>
                                        </VStack>
                                        <Box
                                            h="3px"
                                            w="60px"
                                            bg={solution.color}
                                            borderRadius="full"
                                        />
                                    </VStack>
                                </Box>
                            </ScrollReveal>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
}
