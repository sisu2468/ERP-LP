"use client"

import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Badge,
    SimpleGrid,
    keyframes,
} from '@chakra-ui/react';
import Image from 'next/image';
import ScrollReveal from '@/components/common/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLanguageAnimation, textReveal } from '@/components/common/LanguageAnimationWrapper';

const featureColors = ['#e08e46', '#f4a460', '#d97706', '#ea580c', '#c2410c'];
const featureSvgs = [
    '/svg/features/feature-inventory.svg',
    '/svg/features/feature-invoice.svg',
    '/svg/features/feature-customer360.svg',
    '/svg/features/feature-status-colors.svg',
    '/svg/features/feature-order-tracking.svg',
];

export default function FeaturesSection() {
    const { t } = useLanguage();
    const { animationKey } = useLanguageAnimation();

    const features = [
        {
            title: t('core.features.1.title'),
            subtitle: t('core.features.1.subtitle'),
            problem: t('core.features.1.problem'),
            svg: featureSvgs[0],
            color: featureColors[0],
        },
        {
            title: t('core.features.2.title'),
            subtitle: t('core.features.2.subtitle'),
            problem: t('core.features.2.problem'),
            svg: featureSvgs[1],
            color: featureColors[1],
        },
        {
            title: t('core.features.3.title'),
            subtitle: t('core.features.3.subtitle'),
            problem: t('core.features.3.problem'),
            svg: featureSvgs[2],
            color: featureColors[2],
        },
        {
            title: t('core.features.4.title'),
            subtitle: t('core.features.4.subtitle'),
            problem: t('core.features.4.problem'),
            svg: featureSvgs[3],
            color: featureColors[3],
        },
        {
            title: t('core.features.5.title'),
            subtitle: t('core.features.5.subtitle'),
            problem: t('core.features.5.problem'),
            svg: featureSvgs[4],
            color: featureColors[4],
        },
    ];

    return (
        <Box py={{ base: 20, md: 28 }} bg="white">
            <Container maxW="7xl">
                <VStack spacing={20}>
                    {/* Header */}
                    <ScrollReveal>
                        <VStack
                            spacing={6}
                            textAlign="center"
                            maxW="3xl"
                            mx="auto"
                            key={animationKey}
                        >
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
                                {t('core.features.badge')}
                            </Badge>
                            <Heading
                                as="h2"
                                fontSize={{ base: "3xl", md: "4xl", lg: "52px" }}
                                fontWeight="700"
                                color="#111111"
                                letterSpacing="-0.02em"
                                lineHeight="1.2"
                                animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards`}
                                opacity={0}
                            >
                                {t('core.features.title.1')}
                                <Text as="span" color="#e08e46">{t('core.features.title.2')}</Text>
                                {t('core.features.title.3')}
                            </Heading>
                            <Text
                                fontSize={{ base: "lg", md: "xl" }}
                                color="#6e6e73"
                                lineHeight="1.8"
                                animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards`}
                                opacity={0}
                            >
                                {t('core.features.subtitle')}
                            </Text>
                        </VStack>
                    </ScrollReveal>

                    {/* Feature Cards - Alternating layout */}
                    <VStack spacing={16} w="full">
                        {features.map((feature, index) => {
                            const isReversed = index % 2 === 1;
                            return (
                                <ScrollReveal
                                    key={`${animationKey}-${index}`}
                                    direction={isReversed ? 'left' : 'right'}
                                    delay={0.1}
                                >
                                    <SimpleGrid
                                        columns={{ base: 1, lg: 2 }}
                                        spacing={{ base: 8, lg: 16 }}
                                        w="full"
                                        alignItems="center"
                                    >
                                        {/* Text Content */}
                                        <VStack
                                            align="flex-start"
                                            spacing={6}
                                            order={{ base: 1, lg: isReversed ? 2 : 1 }}
                                        >
                                            <HStack spacing={3}>
                                                <Badge
                                                    px={3}
                                                    py={1}
                                                    borderRadius="full"
                                                    fontSize="xs"
                                                    fontWeight="700"
                                                    bg={`${feature.color}15`}
                                                    color={feature.color}
                                                    textTransform="none"
                                                >
                                                    {feature.subtitle}
                                                </Badge>
                                            </HStack>

                                            <Heading
                                                as="h3"
                                                fontSize={{ base: "2xl", md: "3xl", lg: "36px" }}
                                                fontWeight="700"
                                                color="#111111"
                                                lineHeight="1.3"
                                            >
                                                {feature.title}
                                            </Heading>

                                            <Text
                                                fontSize={{ base: "md", md: "lg" }}
                                                color="#6e6e73"
                                                lineHeight="1.8"
                                            >
                                                {feature.problem}
                                            </Text>

                                            <Box
                                                h="3px"
                                                w="60px"
                                                bg={feature.color}
                                                borderRadius="full"
                                            />
                                        </VStack>

                                        {/* SVG Image - Full width */}
                                        <Box
                                            order={{ base: 2, lg: isReversed ? 1 : 2 }}
                                            position="relative"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            w="full"
                                            minH={{ base: '300px', md: '400px', lg: '500px' }}
                                        >
                                            <Box
                                                transition="all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)"
                                                w="full"
                                                _hover={{
                                                    transform: 'scale(1.05)',
                                                }}
                                            >
                                                <Image
                                                    src={feature.svg}
                                                    alt={feature.title}
                                                    width={900}
                                                    height={700}
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        minWidth: '100%',
                                                    }}
                                                    priority
                                                />
                                            </Box>
                                        </Box>
                                    </SimpleGrid>
                                </ScrollReveal>
                            );
                        })}
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
}
