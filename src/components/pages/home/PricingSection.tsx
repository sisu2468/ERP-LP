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
    Icon,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    List,
    ListItem,
    ListIcon,
    Tooltip,
} from '@chakra-ui/react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import ScrollReveal from '@/components/common/ScrollReveal';
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLanguageAnimation, textReveal } from '@/components/common/LanguageAnimationWrapper';

// Token explanations with hours
const tokenExplanations: { [key: string]: string } = {
    '150,000/日': '約1時間/日のAI利用が可能。一般的な業務での質問応答やデータ処理に十分な量です。',
    '500,000/日': '約3〜4時間/日のAI利用が可能。頻繁なAI活用や複数スタッフでの利用に最適。',
    '1,500,000/ユーザー/日': '1ユーザーあたり約10時間/日のAI利用が可能。ほぼ終日AIを活用した業務が可能です。',
};

// Token patterns for feature list items
const featureTokenPatterns: { pattern: RegExp; explanation: string }[] = [
    { pattern: /150,000トークン\/日/, explanation: tokenExplanations['150,000/日'] },
    { pattern: /500,000トークン\/日/, explanation: tokenExplanations['500,000/日'] },
    { pattern: /1\.5M トークン\/ユーザー\/日/, explanation: tokenExplanations['1,500,000/ユーザー/日'] },
];

// Feature list item with optional tooltip for token values
const FeatureListItem = ({ feature, isPopular }: { feature: string; isPopular: boolean }) => {
    const tokenMatch = featureTokenPatterns.find(({ pattern }) => pattern.test(feature));

    if (tokenMatch) {
        return (
            <Tooltip
                label={tokenMatch.explanation}
                bg="white"
                color="#e08e46"
                fontSize="sm"
                fontWeight="500"
                px={4}
                py={3}
                borderRadius="lg"
                border="2px solid"
                borderColor="#e08e46"
                boxShadow="0 4px 12px rgba(224, 142, 70, 0.2)"
                hasArrow
                placement="top"
                maxW="280px"
            >
                <HStack spacing={2} cursor="pointer">
                    <ListIcon
                        as={FaCheck}
                        color={isPopular ? '#e08e46' : '#10b981'}
                        boxSize={3}
                    />
                    <Text fontSize="sm" color="#111111">
                        {feature}
                    </Text>
                    <Icon as={FaInfoCircle} boxSize={3} color="#e08e46" />
                </HStack>
            </Tooltip>
        );
    }

    return (
        <HStack spacing={2}>
            <ListIcon
                as={FaCheck}
                color={isPopular ? '#e08e46' : '#10b981'}
                boxSize={3}
            />
            <Text fontSize="sm" color="#111111">
                {feature}
            </Text>
        </HStack>
    );
};

// Tooltip wrapper for token values
const TokenValue = ({ value }: { value: string }) => {
    const explanation = tokenExplanations[value];
    if (explanation) {
        return (
            <Tooltip
                label={explanation}
                bg="white"
                color="#e08e46"
                fontSize="sm"
                fontWeight="500"
                px={4}
                py={3}
                borderRadius="lg"
                border="2px solid"
                borderColor="#e08e46"
                boxShadow="0 4px 12px rgba(224, 142, 70, 0.2)"
                hasArrow
                placement="top"
                maxW="280px"
            >
                <HStack spacing={1} cursor="pointer" display="inline-flex">
                    <Text fontSize="sm" fontWeight="600" color="#111111">
                        {value}
                    </Text>
                    <Icon as={FaInfoCircle} boxSize={3} color="#e08e46" />
                </HStack>
            </Tooltip>
        );
    }
    return (
        <Text fontSize="sm" fontWeight="600" color="#111111">
            {value}
        </Text>
    );
};

const planConfig = [
    {
        id: 'start',
        price: '9,800',
        features: ['allModules', 'users5', 'storage10', 'hakuai150k', 'emailSupport'],
        popular: false,
        hasBadge: true,
        color: '#6e6e73',
    },
    {
        id: 'business',
        price: '29,800',
        features: ['allModules', 'users20', 'storage100', 'hakuai500k', 'prioritySupport', 'onboarding'],
        popular: true,
        hasBadge: false,
        color: '#e08e46',
    },
    {
        id: 'enterprise',
        price: 'contact',
        features: ['allModules', 'usersUnlimited', 'storage1tb', 'hakuai1.5m', 'dedicatedSupport', 'apiCustom'],
        popular: false,
        hasBadge: false,
        color: '#4a5568',
    },
];

// Feature comparison data - focus on differentiating features (using translation keys)
const featureCategoriesConfig = [
    {
        categoryKey: 'userStorage',
        features: [
            { nameKey: 'users', startKey: 'max5', businessKey: 'max20', enterpriseKey: 'unlimited' },
            { nameKey: 'storage', start: '10GB', business: '100GB', enterprise: '1TB' },
        ],
    },
    {
        categoryKey: 'hakuai',
        features: [
            { nameKey: 'tokens', start: '150,000/日', business: '500,000/日', enterprise: '1,500,000/ユーザー/日' },
        ],
    },
    {
        categoryKey: 'supportIntegration',
        features: [
            { nameKey: 'supportMethod', startKey: 'email', businessKey: 'priorityChat', enterpriseKey: 'dedicated' },
            { nameKey: 'responseTime', startKey: '48h', businessKey: '24h', enterpriseKey: '4h' },
            { nameKey: 'onboarding', start: false, business: true, enterprise: true },
        ],
    },
    {
        categoryKey: 'extensions',
        features: [
            { nameKey: 'api', start: false, business: false, enterprise: true },
            { nameKey: 'webhook', start: false, business: true, enterprise: true },
            { nameKey: 'customDev', start: false, business: false, enterprise: true },
        ],
    },
];

const FeatureValue = ({ value, planColor }: { value: boolean | string, planColor: string }) => {
    if (typeof value === 'boolean') {
        return value ? (
            <Icon as={FaCheck} color={planColor} boxSize={4} />
        ) : (
            <Icon as={FaTimes} color="#d1d5db" boxSize={4} />
        );
    }
    // Check if this is a token value that should have a tooltip
    if (tokenExplanations[value]) {
        return <TokenValue value={value} />;
    }
    return (
        <Text fontSize="sm" fontWeight="600" color="#111111">
            {value}
        </Text>
    );
};

export default function PricingSection() {
    const { t } = useLanguage();
    const { animationKey } = useLanguageAnimation();

    // Build plans with translations
    const plans = planConfig.map(config => ({
        ...config,
        name: t(`core.pricing.${config.id}.name`),
        description: t(`core.pricing.${config.id}.desc`),
        period: config.id === 'enterprise' ? '' : t('core.pricing.perMonth'),
        price: config.id === 'enterprise' ? t('core.pricing.contact') : config.price,
        badge: config.hasBadge ? t('core.pricing.allFeatures') : (config.popular ? t('core.pricing.popular') : null),
        features: config.features.map(f => t(`core.pricing.features.${f}`)),
    }));

    // Build feature categories with translations
    const featureCategories = featureCategoriesConfig.map(cat => ({
        category: t(`core.pricing.table.${cat.categoryKey}`),
        features: cat.features.map(f => ({
            name: t(`core.pricing.table.${f.nameKey}`),
            start: f.startKey ? t(`core.pricing.table.${f.startKey}`) : f.start,
            business: f.businessKey ? t(`core.pricing.table.${f.businessKey}`) : f.business,
            enterprise: f.enterpriseKey ? t(`core.pricing.table.${f.enterpriseKey}`) : f.enterprise,
        })),
    }));

    return (
        <Box id="pricing" py={{ base: 20, md: 28 }} bg="white">
            <Container maxW="7xl">
                <VStack spacing={16}>
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
                                {t('core.pricing.badge')}
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
                                {t('core.pricing.title.1')}
                                <Text as="span" color="#e08e46">{t('core.pricing.title.2')}</Text>
                            </Heading>
                            <Text
                                fontSize={{ base: "lg", md: "xl" }}
                                color="#6e6e73"
                                lineHeight="1.8"
                                animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards`}
                                opacity={0}
                            >
                                {t('core.pricing.subtitle')}
                            </Text>
                        </VStack>
                    </ScrollReveal>

                    {/* Pricing Cards with feature lists */}
                    <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8} w="full">
                        {plans.map((plan, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <Box
                                    p={8}
                                    bg={plan.popular ? '#fafafa' : 'white'}
                                    borderRadius="2xl"
                                    border="2px solid"
                                    borderColor={plan.popular ? '#e08e46' : '#e5e7eb'}
                                    position="relative"
                                    transition="all 0.3s"
                                    h="full"
                                    overflow="hidden"
                                    _hover={{
                                        borderColor: plan.color,
                                        transform: 'translateY(-4px)',
                                        boxShadow: `0 20px 40px ${plan.color}15`,
                                    }}
                                >
                                    {/* Corner ribbon for popular */}
                                    {plan.popular && (
                                        <Box
                                            position="absolute"
                                            top={0}
                                            right={0}
                                            w="120px"
                                            h="120px"
                                            overflow="hidden"
                                            zIndex={10}
                                        >
                                            <Box
                                                position="absolute"
                                                top="26px"
                                                right="-36px"
                                                bg="#e08e46"
                                                color="white"
                                                fontWeight="700"
                                                fontSize="xs"
                                                py={1.5}
                                                w="150px"
                                                textAlign="center"
                                                transform="rotate(45deg)"
                                                boxShadow="0 2px 4px rgba(0,0,0,0.15)"
                                            >
                                                {t('core.pricing.popular')}
                                            </Box>
                                        </Box>
                                    )}

                                    {/* Corner ribbon for starter - outlined version */}
                                    {plan.hasBadge && (
                                        <Box
                                            position="absolute"
                                            top={0}
                                            right={0}
                                            w="140px"
                                            h="140px"
                                            overflow="hidden"
                                            zIndex={10}
                                        >
                                            <Box
                                                position="absolute"
                                                top="32px"
                                                right="-42px"
                                                bg="white"
                                                color="#e08e46"
                                                fontWeight="700"
                                                fontSize="xs"
                                                py={1.5}
                                                w="170px"
                                                textAlign="center"
                                                transform="rotate(45deg)"
                                                border="2px solid"
                                                borderColor="#e08e46"
                                                boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                                            >
                                                {t('core.pricing.allFeatures')}
                                            </Box>
                                        </Box>
                                    )}

                                    <VStack spacing={6} align="stretch">
                                        {/* Plan name */}
                                        <VStack spacing={2} align="flex-start">
                                            <Text
                                                fontSize="xl"
                                                fontWeight="700"
                                                color={plan.color}
                                            >
                                                {plan.name}
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="#6e6e73"
                                            >
                                                {plan.description}
                                            </Text>
                                        </VStack>

                                        {/* Price */}
                                        <HStack align="baseline" spacing={1}>
                                            {plan.period && (
                                                <Text fontSize="lg" color="#6e6e73">¥</Text>
                                            )}
                                            <Text
                                                fontSize={{ base: "3xl", md: "4xl" }}
                                                fontWeight="800"
                                                color="#111111"
                                                lineHeight="1"
                                            >
                                                {plan.price}
                                            </Text>
                                            {plan.period && (
                                                <Text fontSize="md" color="#6e6e73">
                                                    /{plan.period}
                                                </Text>
                                            )}
                                        </HStack>

                                        {/* Features list */}
                                        <List spacing={3} pt={2}>
                                            {plan.features.map((feature, i) => (
                                                <ListItem
                                                    key={i}
                                                    display="flex"
                                                    alignItems="center"
                                                    fontSize="sm"
                                                    color="#111111"
                                                >
                                                    <FeatureListItem feature={feature} isPopular={plan.popular} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </VStack>
                                </Box>
                            </ScrollReveal>
                        ))}
                    </SimpleGrid>

                    {/* Disclaimer */}
                    <Text
                        fontSize="sm"
                        color="#6e6e73"
                        textAlign="center"
                    >
                        {t('core.pricing.disclaimer')}
                    </Text>

                    {/* Feature Comparison Table - Hidden on mobile */}
                    <ScrollReveal>
                        <Box w="full" display={{ base: 'none', lg: 'block' }}>
                            <Heading
                                as="h3"
                                fontSize={{ base: "xl", md: "2xl" }}
                                fontWeight="700"
                                color="#111111"
                                textAlign="center"
                                mb={8}
                            >
                                {t('core.pricing.comparison')}
                            </Heading>

                            <TableContainer
                                borderRadius="2xl"
                                border="1px solid"
                                borderColor="#e5e7eb"
                                overflow="hidden"
                            >
                                <Table variant="simple">
                                    <Thead bg="#fafafa">
                                        <Tr>
                                            <Th
                                                py={5}
                                                px={6}
                                                fontSize="sm"
                                                fontWeight="600"
                                                color="#6e6e73"
                                                textTransform="none"
                                                letterSpacing="normal"
                                                borderColor="#e5e7eb"
                                            >
                                                機能
                                            </Th>
                                            <Th
                                                py={5}
                                                px={6}
                                                fontSize="sm"
                                                fontWeight="700"
                                                color="#6e6e73"
                                                textAlign="center"
                                                textTransform="none"
                                                letterSpacing="normal"
                                                borderColor="#e5e7eb"
                                            >
                                                スタート
                                            </Th>
                                            <Th
                                                py={5}
                                                px={6}
                                                fontSize="sm"
                                                fontWeight="700"
                                                color="#e08e46"
                                                textAlign="center"
                                                textTransform="none"
                                                letterSpacing="normal"
                                                borderColor="#e5e7eb"
                                            >
                                                ビジネス
                                            </Th>
                                            <Th
                                                py={5}
                                                px={6}
                                                fontSize="sm"
                                                fontWeight="700"
                                                color="#4a5568"
                                                textAlign="center"
                                                textTransform="none"
                                                letterSpacing="normal"
                                                borderColor="#e5e7eb"
                                            >
                                                エンタープライズ
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {featureCategories.map((category, catIndex) => (
                                            <React.Fragment key={`cat-${catIndex}`}>
                                                {/* Category header row */}
                                                <Tr bg="#fafafa">
                                                    <Td
                                                        colSpan={4}
                                                        py={3}
                                                        px={6}
                                                        fontSize="xs"
                                                        fontWeight="700"
                                                        color="#e08e46"
                                                        textTransform="uppercase"
                                                        letterSpacing="0.05em"
                                                        borderColor="#e5e7eb"
                                                    >
                                                        {category.category}
                                                    </Td>
                                                </Tr>
                                                {/* Feature rows */}
                                                {category.features.map((feature, featureIndex) => (
                                                    <Tr
                                                        key={`${catIndex}-${featureIndex}`}
                                                        _hover={{ bg: 'rgba(224, 142, 70, 0.02)' }}
                                                        transition="background 0.2s"
                                                    >
                                                        <Td
                                                            py={4}
                                                            px={6}
                                                            fontSize="sm"
                                                            color="#111111"
                                                            borderColor="#e5e7eb"
                                                        >
                                                            {feature.name}
                                                        </Td>
                                                        <Td
                                                            py={4}
                                                            px={6}
                                                            textAlign="center"
                                                            borderColor="#e5e7eb"
                                                        >
                                                            <FeatureValue value={feature.start ?? false} planColor="#6e6e73" />
                                                        </Td>
                                                        <Td
                                                            py={4}
                                                            px={6}
                                                            textAlign="center"
                                                            borderColor="#e5e7eb"
                                                        >
                                                            <FeatureValue value={feature.business ?? false} planColor="#e08e46" />
                                                        </Td>
                                                        <Td
                                                            py={4}
                                                            px={6}
                                                            textAlign="center"
                                                            borderColor="#e5e7eb"
                                                        >
                                                            <FeatureValue value={feature.enterprise ?? false} planColor="#4a5568" />
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </ScrollReveal>

                    {/* Bottom note */}
                    <Text
                        fontSize="sm"
                        color="#6e6e73"
                        textAlign="center"
                    >
                        {t('core.pricing.trial')}
                    </Text>
                </VStack>
            </Container>
        </Box>
    );
}
