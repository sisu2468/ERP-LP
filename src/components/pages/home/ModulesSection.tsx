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
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import {
    FiUsers,
    FiPackage,
    FiFileText,
    FiShoppingCart,
    FiFolder,
    FiCpu,
} from 'react-icons/fi';
import { FaRegHandshake } from 'react-icons/fa';
import ScrollReveal from '@/components/common/ScrollReveal';
import HakuAIText from '@/components/common/HakuAIText';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLanguageAnimation, textReveal } from '@/components/common/LanguageAnimationWrapper';

const moduleConfig = [
    { id: 'customers', icon: FiUsers, color: '#e08e46', featureCount: 30 },
    { id: 'inventory', icon: FiPackage, color: '#f4a460', featureCount: 35 },
    { id: 'invoices', icon: FiFileText, color: '#d97706', featureCount: 40 },
    { id: 'contracts', icon: FaRegHandshake, color: '#ea580c', featureCount: 25 },
    { id: 'orders', icon: FiShoppingCart, color: '#c2410c', featureCount: 35 },
    { id: 'files', icon: FiFolder, color: '#b45309', featureCount: 15 },
    { id: 'hakuai', icon: FiCpu, color: '#e08e46', featureCount: 50 },
];

export default function ModulesSection() {
    const { t } = useLanguage();
    const { animationKey } = useLanguageAnimation();

    const modules = moduleConfig.map(config => ({
        ...config,
        title: t(`core.modules.${config.id}.title`),
        description: t(`core.modules.${config.id}.desc`),
        highlights: [
            t(`core.modules.${config.id}.h1`),
            t(`core.modules.${config.id}.h2`),
            t(`core.modules.${config.id}.h3`),
        ],
    }));

    return (
        <Box py={{ base: 16, md: 24 }} bg="#fafafa" id="modules">
            <Container maxW="7xl">
                <VStack spacing={12}>
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
                                {t('core.modules.badge')}
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
                                {t('core.modules.title.1')}
                                <Text as="span" color="#e08e46">{t('core.modules.title.2')}</Text>
                            </Heading>
                            <Text
                                fontSize={{ base: "lg", md: "xl" }}
                                color="#6e6e73"
                                lineHeight="1.8"
                                animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards`}
                                opacity={0}
                            >
                                {t('core.modules.subtitle')}
                            </Text>
                        </VStack>
                    </ScrollReveal>

                    {/* Module Grid - Summary Cards */}
                    <ScrollReveal delay={0.1}>
                        <SimpleGrid
                            columns={{ base: 2, md: 3, lg: 4 }}
                            spacing={4}
                            w="full"
                            key={`grid-${animationKey}`}
                        >
                            {modules.map((module, index) => (
                                <Box
                                    key={module.id}
                                    p={5}
                                    bg="white"
                                    borderRadius="xl"
                                    border="1px solid"
                                    borderColor="#e5e7eb"
                                    transition="all 0.2s"
                                    animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.05}s forwards`}
                                    opacity={0}
                                    _hover={{
                                        borderColor: module.color,
                                        boxShadow: `0 8px 24px ${module.color}15`,
                                        transform: 'translateY(-2px)',
                                    }}
                                >
                                    <VStack align="flex-start" spacing={3}>
                                        <HStack spacing={3}>
                                            <Box
                                                w={10}
                                                h={10}
                                                borderRadius="lg"
                                                bg={`${module.color}15`}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Icon
                                                    as={module.icon}
                                                    w={5}
                                                    h={5}
                                                    color={module.color}
                                                />
                                            </Box>
                                            <Badge
                                                fontSize="xs"
                                                bg={`${module.color}10`}
                                                color={module.color}
                                                borderRadius="full"
                                                px={2}
                                            >
                                                {module.featureCount}+
                                            </Badge>
                                        </HStack>
                                        <Text
                                            fontWeight="700"
                                            fontSize="md"
                                            color="#111111"
                                        >
                                            {module.id === 'hakuai' ? (
                                                <HakuAIText />
                                            ) : (
                                                module.title
                                            )}
                                        </Text>
                                        <Text
                                            fontSize="sm"
                                            color="#6e6e73"
                                            lineHeight="1.6"
                                        >
                                            {module.description}
                                        </Text>
                                        <Wrap spacing={1}>
                                            {module.highlights.map((h, i) => (
                                                <WrapItem key={i}>
                                                    <Badge
                                                        fontSize="xs"
                                                        bg="#f5f5f5"
                                                        color="#6e6e73"
                                                        fontWeight="500"
                                                        borderRadius="md"
                                                        px={2}
                                                        py={0.5}
                                                    >
                                                        {h}
                                                    </Badge>
                                                </WrapItem>
                                            ))}
                                        </Wrap>
                                    </VStack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </ScrollReveal>
                </VStack>
            </Container>
        </Box>
    );
}
