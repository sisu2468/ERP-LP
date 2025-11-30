'use client';

import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Badge,
    Box,
    Container,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';
import ScrollReveal from '@/components/common/ScrollReveal';
import HakuAIText from '@/components/common/HakuAIText';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLanguageAnimation, textReveal } from '@/components/common/LanguageAnimationWrapper';
import React from 'react';

// Helper to render FAQ text with HakuAIText component for 白AI
const FAQText = ({ text }: { text: string }) => {
    // Check if text contains 白AI (Japanese) or Haku AI (English) or 하쿠 AI (Korean)
    const hakuAIPatterns = ['白AI', 'Haku AI', '하쿠 AI'];

    for (const pattern of hakuAIPatterns) {
        if (text.includes(pattern)) {
            const parts = text.split(pattern);
            // Handle multiple occurrences
            return (
                <>
                    {parts.map((part, index) => (
                        <React.Fragment key={index}>
                            {part}
                            {index < parts.length - 1 && <HakuAIText />}
                        </React.Fragment>
                    ))}
                </>
            );
        }
    }
    return <>{text}</>;
};

export default function FAQSection() {
    const { t } = useLanguage();
    const { animationKey } = useLanguageAnimation();

    const faqs = [
        { q: t('core.faq.q1'), a: t('core.faq.a1') },
        { q: t('core.faq.q2'), a: t('core.faq.a2') },
        { q: t('core.faq.q3'), a: t('core.faq.a3') },
        { q: t('core.faq.q4'), a: t('core.faq.a4') },
        { q: t('core.faq.q5'), a: t('core.faq.a5') },
        { q: t('core.faq.q6'), a: t('core.faq.a6') },
        { q: t('core.faq.q7'), a: t('core.faq.a7') },
        { q: t('core.faq.q8'), a: t('core.faq.a8') },
        { q: t('core.faq.q9'), a: t('core.faq.a9') },
        { q: t('core.faq.q10'), a: t('core.faq.a10') },
    ];

    return (
        <Box py={{ base: 16, md: 24 }} bg="#fafafa">
            <Container maxW="4xl">
                <VStack spacing={{ base: 12, md: 16 }} align="stretch">
                    {/* Header */}
                    <ScrollReveal>
                        <VStack spacing={4} textAlign="center" key={animationKey}>
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
                                {t('core.faq.badge')}
                            </Badge>
                            <Heading
                                as="h2"
                                fontSize={{ base: '3xl', md: '4xl', lg: '52px' }}
                                fontWeight="700"
                                color="#111111"
                                letterSpacing="-0.02em"
                                animation={`${textReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards`}
                                opacity={0}
                            >
                                {t('core.faq.title')}
                            </Heading>
                        </VStack>
                    </ScrollReveal>

                    {/* FAQ Accordion */}
                    <Accordion allowMultiple key={`accordion-${animationKey}`}>
                        <VStack spacing={3} align="stretch">
                            {faqs.map((faq, index) => (
                                <ScrollReveal key={index} delay={index * 0.03}>
                                    <AccordionItem
                                        border="1px solid"
                                        borderColor="#e5e7eb"
                                        borderRadius="xl"
                                        overflow="hidden"
                                        bg="white"
                                    >
                                        {({ isExpanded }) => (
                                            <>
                                                <AccordionButton
                                                    py={5}
                                                    px={6}
                                                    _hover={{
                                                        bg: 'transparent',
                                                    }}
                                                    transition="all 0.2s"
                                                >
                                                    <Box
                                                        flex="1"
                                                        textAlign="left"
                                                        display="flex"
                                                        alignItems="center"
                                                        gap={4}
                                                    >
                                                        <Text
                                                            fontSize={{ base: 'md', md: 'lg' }}
                                                            fontWeight="600"
                                                            color="#111111"
                                                            lineHeight="1.5"
                                                        >
                                                            {faq.q}
                                                        </Text>
                                                    </Box>
                                                    <Box
                                                        ml={4}
                                                        w="28px"
                                                        h="28px"
                                                        borderRadius="full"
                                                        bg={isExpanded ? '#e08e46' : '#f5f5f5'}
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        color={isExpanded ? 'white' : '#6e6e73'}
                                                        transition="all 0.2s"
                                                        flexShrink={0}
                                                    >
                                                        {isExpanded ? (
                                                            <MinusIcon boxSize={3} />
                                                        ) : (
                                                            <AddIcon boxSize={3} />
                                                        )}
                                                    </Box>
                                                </AccordionButton>
                                                <AccordionPanel pb={5} pt={0} px={6}>
                                                    <Text
                                                        fontSize={{ base: 'sm', md: 'md' }}
                                                        color="#6e6e73"
                                                        lineHeight="1.8"
                                                    >
                                                        <FAQText text={faq.a} />
                                                    </Text>
                                                </AccordionPanel>
                                            </>
                                        )}
                                    </AccordionItem>
                                </ScrollReveal>
                            ))}
                        </VStack>
                    </Accordion>
                </VStack>
            </Container>
        </Box>
    );
}
