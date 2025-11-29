'use client';

import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    SimpleGrid,
    Avatar,
    HStack,
    Icon,
    keyframes,
    Badge,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/common/TranslatedText';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

export default function TestimonialsSection() {
    const { t } = useLanguage();
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    // 理志：証言データ - 翻訳キーを使用
    const testimonials = [
        {
            quoteKey: "testimonials.1.quote",
            nameKey: "testimonials.1.name",
            roleKey: "testimonials.1.role",
            metrics: [
                { labelKey: "testimonials.1.metric1.label", valueKey: "testimonials.1.metric1.value" },
                { labelKey: "testimonials.1.metric2.label", valueKey: "testimonials.1.metric2.value" },
                { labelKey: "testimonials.1.metric3.label", valueKey: "testimonials.1.metric3.value" }
            ],
            color: "#e08e46"
        },
        {
            quoteKey: "testimonials.2.quote",
            nameKey: "testimonials.2.name",
            roleKey: "testimonials.2.role",
            metrics: [
                { labelKey: "testimonials.2.metric1.label", valueKey: "testimonials.2.metric1.value" },
                { labelKey: "testimonials.2.metric2.label", valueKey: "testimonials.2.metric2.value" },
                { labelKey: "testimonials.2.metric3.label", valueKey: "testimonials.2.metric3.value" }
            ],
            color: "#4facfe"
        },
        {
            quoteKey: "testimonials.3.quote",
            nameKey: "testimonials.3.name",
            roleKey: "testimonials.3.role",
            metrics: [
                { labelKey: "testimonials.3.metric1.label", valueKey: "testimonials.3.metric1.value" },
                { labelKey: "testimonials.3.metric2.label", valueKey: "testimonials.3.metric2.value" },
                { labelKey: "testimonials.3.metric3.label", valueKey: "testimonials.3.metric3.value" }
            ],
            color: "#f093fb"
        }
    ];

    return (
        <Box
            py={{ base: 20, md: 28 }}
            bg="#fafafa"
        >
            <Container maxW="7xl">
                <VStack spacing={16}>
                    <VStack spacing={6} textAlign="center" maxW="3xl" mx="auto">
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
                            {t('testimonials.badge')}
                        </Badge>
                        <Heading
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl", lg: "56px" }}
                            fontWeight="700"
                            color="#111111"
                            letterSpacing="-0.02em"
                            lineHeight="1.1"
                        >
                            <TranslatedText
                                as="span"
                                translationKey="testimonials.title.1"
                            />
                            <TranslatedText
                                as="span"
                                color="#e08e46"
                                translationKey="testimonials.title.2"
                                staggerDelay={0.1}
                            />
                        </Heading>
                    </VStack>

                    <SimpleGrid
                        columns={{ base: 1, lg: 3 }}
                        spacing={{ base: 6, md: 8 }}
                        w="full"
                    >
                        {testimonials.map((testimonial, index) => (
                            <Box
                                key={index}
                                position="relative"
                                p={{ base: 8, md: 10 }}
                                bg="white"
                                borderRadius="2xl"
                                border="2px solid"
                                borderColor={hoveredCard === index ? testimonial.color : "#e5e7eb"}
                                boxShadow={hoveredCard === index ? `0 20px 40px ${testimonial.color}20` : "0 2px 8px rgba(0, 0, 0, 0.05)"}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                                cursor="pointer"
                                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                                animation={hoveredCard === index ? `${float} 3s ease-in-out infinite` : 'none'}
                                _hover={{
                                    transform: 'translateY(-8px) scale(1.02)',
                                }}
                                minH={{ base: "auto", md: "520px" }}
                            >
                                <VStack spacing={6} align="flex-start" h="full">
                                    {/* Rating Stars */}
                                    <HStack spacing={1}>
                                        {[...Array(5)].map((_, i) => (
                                            <Icon 
                                                key={i} 
                                                as={FaStar} 
                                                color={testimonial.color} 
                                                boxSize={4}
                                            />
                                        ))}
                                    </HStack>

                                    {/* 理志：引用文 */}
                                    <TranslatedText
                                        translationKey={testimonial.quoteKey}
                                        fontSize={{ base: "md", md: "lg" }}
                                        color="#333333"
                                        lineHeight="1.8"
                                        fontWeight="400"
                                        flex="1"
                                    />

                                    {/* 理志：メトリックバブル */}
                                    <Box w="full">
                                        <HStack spacing={2} flexWrap="wrap" gap={2}>
                                            {testimonial.metrics.map((metric, i) => (
                                                <Box
                                                    key={i}
                                                    px={3}
                                                    py={2}
                                                    bg={`${testimonial.color}15`}
                                                    borderRadius="full"
                                                    border="1px solid"
                                                    borderColor={`${testimonial.color}30`}
                                                    flexShrink={0}
                                                >
                                                    <HStack spacing={2}>
                                                        <Text
                                                            fontSize="xs"
                                                            fontWeight="500"
                                                            color="#6e6e73"
                                                            whiteSpace="nowrap"
                                                        >
                                                            {t(metric.labelKey)}
                                                        </Text>
                                                        <Text
                                                            fontSize="sm"
                                                            fontWeight="700"
                                                            color={testimonial.color}
                                                            whiteSpace="nowrap"
                                                        >
                                                            {t(metric.valueKey)}
                                                        </Text>
                                                    </HStack>
                                                </Box>
                                            ))}
                                        </HStack>
                                    </Box>

                                    {/* 理志：著者情報 */}
                                    <HStack spacing={4} pt={4}>
                                        <Avatar
                                            size="md"
                                            name={t(testimonial.nameKey)}
                                            bg={`${testimonial.color}20`}
                                            color={testimonial.color}
                                            border="2px solid"
                                            borderColor={hoveredCard === index ? testimonial.color : "#e5e7eb"}
                                        />
                                        <VStack spacing={0} align="flex-start">
                                            <Text
                                                fontSize="md"
                                                fontWeight="700"
                                                color="#111111"
                                            >
                                                {t(testimonial.nameKey)}
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="#6e6e73"
                                                fontWeight="500"
                                            >
                                                {t(testimonial.roleKey)}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
}
