"use client"

import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Badge,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    SimpleGrid,
    useBreakpointValue,
} from '@chakra-ui/react';
import ScrollReveal from '@/components/common/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

export default function EnglishPricingSection() {
    const { t } = useLanguage();
    const isMobile = useBreakpointValue({ base: true, lg: false });

    const tiers = [
        {
            price: t('english.pricing.tier1'),
            lessons: t('english.pricing.lessons.tier1'),
            coaching: t('english.pricing.coaching.tier1'),
            plan: t('english.pricing.plan.tier1'),
            correction: t('english.pricing.correction.tier1'),
        },
        {
            price: t('english.pricing.tier2'),
            lessons: t('english.pricing.lessons.tier2'),
            coaching: t('english.pricing.coaching.tier2'),
            plan: t('english.pricing.plan.tier2'),
            correction: t('english.pricing.correction.tier2'),
        },
        {
            price: t('english.pricing.tier3'),
            lessons: t('english.pricing.lessons.tier3'),
            coaching: t('english.pricing.coaching.tier3'),
            plan: t('english.pricing.plan.tier3'),
            correction: t('english.pricing.correction.tier3'),
        },
        {
            price: t('english.pricing.tier4'),
            lessons: t('english.pricing.lessons.tier4'),
            coaching: t('english.pricing.coaching.tier4'),
            plan: t('english.pricing.plan.tier4'),
            correction: t('english.pricing.correction.tier4'),
        },
    ];

    const labels = {
        lessons: t('english.pricing.lessons'),
        coaching: t('english.pricing.coaching'),
        plan: t('english.pricing.plan'),
        correction: t('english.pricing.correction'),
    };

    return (
        <Box id="pricing" py={{ base: 16, md: 24 }} bg="#fafafa">
            <Container maxW="6xl">
                <VStack spacing={12}>
                    {/* Header */}
                    <ScrollReveal>
                        <VStack spacing={6} textAlign="center" maxW="4xl" mx="auto">
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
                            >
                                {t('english.pricing.badge')}
                            </Badge>
                            <Heading
                                as="h2"
                                fontSize={{ base: "2xl", md: "3xl", lg: "42px" }}
                                fontWeight="700"
                                color="#111111"
                                letterSpacing="-0.02em"
                                lineHeight="1.3"
                            >
                                {t('english.pricing.title')}
                            </Heading>
                        </VStack>
                    </ScrollReveal>

                    {/* Mobile: Card Layout */}
                    {isMobile ? (
                        <ScrollReveal>
                            <SimpleGrid columns={1} spacing={4} w="full">
                                {tiers.map((tier, index) => (
                                    <Box
                                        key={index}
                                        bg="white"
                                        borderRadius="xl"
                                        border="1px solid"
                                        borderColor="#e5e7eb"
                                        p={5}
                                    >
                                        <Text
                                            fontSize="lg"
                                            fontWeight="700"
                                            color="#111111"
                                            mb={4}
                                            pb={3}
                                            borderBottom="1px solid"
                                            borderColor="#e5e7eb"
                                        >
                                            {tier.price}
                                        </Text>
                                        <VStack spacing={0} align="stretch" divider={<Box borderBottom="1px solid" borderColor="#e5e7eb" />}>
                                            <HStack justify="space-between" py={3}>
                                                <Text fontSize="sm" color="#6e6e73" fontWeight="600">
                                                    {labels.lessons}
                                                </Text>
                                                <Text fontSize="sm" color="#111111" fontWeight="500">
                                                    {tier.lessons}
                                                </Text>
                                            </HStack>
                                            <HStack justify="space-between" py={3}>
                                                <Text fontSize="sm" color="#6e6e73" fontWeight="600">
                                                    {labels.coaching}
                                                </Text>
                                                <Text fontSize="sm" color="#111111" fontWeight="500">
                                                    {tier.coaching}
                                                </Text>
                                            </HStack>
                                            <HStack justify="space-between" py={3}>
                                                <Text fontSize="sm" color="#6e6e73" fontWeight="600">
                                                    {labels.plan}
                                                </Text>
                                                <Text fontSize="sm" color="#111111" fontWeight="500">
                                                    {tier.plan}
                                                </Text>
                                            </HStack>
                                            <HStack justify="space-between" py={3}>
                                                <Text fontSize="sm" color="#6e6e73" fontWeight="600">
                                                    {labels.correction}
                                                </Text>
                                                <Text fontSize="sm" color="#111111" fontWeight="500">
                                                    {tier.correction}
                                                </Text>
                                            </HStack>
                                        </VStack>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </ScrollReveal>
                    ) : (
                        /* Desktop: Table Layout */
                        <ScrollReveal>
                            <TableContainer
                                w="full"
                                borderRadius="2xl"
                                border="1px solid"
                                borderColor="#e5e7eb"
                                overflow="hidden"
                                bg="white"
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
                                                minW="140px"
                                            >
                                            </Th>
                                            {tiers.map((tier, index) => (
                                                <Th
                                                    key={index}
                                                    py={5}
                                                    px={6}
                                                    fontSize="sm"
                                                    fontWeight="700"
                                                    color="#111111"
                                                    textAlign="center"
                                                    textTransform="none"
                                                    letterSpacing="normal"
                                                    borderColor="#e5e7eb"
                                                    whiteSpace="nowrap"
                                                >
                                                    {tier.price}
                                                </Th>
                                            ))}
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr _hover={{ bg: 'rgba(224, 142, 70, 0.02)' }}>
                                            <Td py={4} px={6} fontSize="sm" fontWeight="600" color="#111111" borderColor="#e5e7eb" bg="#fafafa">
                                                {labels.lessons}
                                            </Td>
                                            {tiers.map((tier, index) => (
                                                <Td key={index} py={4} px={6} textAlign="center" fontSize="sm" color="#444" fontWeight="500" borderColor="#e5e7eb">
                                                    {tier.lessons}
                                                </Td>
                                            ))}
                                        </Tr>
                                        <Tr _hover={{ bg: 'rgba(224, 142, 70, 0.02)' }}>
                                            <Td py={4} px={6} fontSize="sm" fontWeight="600" color="#111111" borderColor="#e5e7eb" bg="#fafafa">
                                                {labels.coaching}
                                            </Td>
                                            {tiers.map((tier, index) => (
                                                <Td key={index} py={4} px={6} textAlign="center" fontSize="sm" color="#444" fontWeight="500" borderColor="#e5e7eb">
                                                    {tier.coaching}
                                                </Td>
                                            ))}
                                        </Tr>
                                        <Tr _hover={{ bg: 'rgba(224, 142, 70, 0.02)' }}>
                                            <Td py={4} px={6} fontSize="sm" fontWeight="600" color="#111111" borderColor="#e5e7eb" bg="#fafafa">
                                                {labels.plan}
                                            </Td>
                                            {tiers.map((tier, index) => (
                                                <Td key={index} py={4} px={6} textAlign="center" fontSize="sm" color="#444" fontWeight="500" borderColor="#e5e7eb">
                                                    {tier.plan}
                                                </Td>
                                            ))}
                                        </Tr>
                                        <Tr _hover={{ bg: 'rgba(224, 142, 70, 0.02)' }}>
                                            <Td py={4} px={6} fontSize="sm" fontWeight="600" color="#111111" borderColor="#e5e7eb" bg="#fafafa">
                                                {labels.correction}
                                            </Td>
                                            {tiers.map((tier, index) => (
                                                <Td key={index} py={4} px={6} textAlign="center" fontSize="sm" color="#444" fontWeight="500" borderColor="#e5e7eb">
                                                    {tier.correction}
                                                </Td>
                                            ))}
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </ScrollReveal>
                    )}

                    {/* Enterprise note */}
                    <Text
                        fontSize="sm"
                        color="#6e6e73"
                        textAlign="center"
                    >
                        {t('english.pricing.note')}
                    </Text>
                </VStack>
            </Container>
        </Box>
    );
}
