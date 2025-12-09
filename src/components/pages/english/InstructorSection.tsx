'use client';

import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Badge,
    SimpleGrid,
} from '@chakra-ui/react';
import Image from 'next/image';
import ScrollReveal from '@/components/common/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLanguageAnimation, textReveal } from '@/components/common/LanguageAnimationWrapper';
import TranslatedText from '@/components/common/TranslatedText';

export default function InstructorSection() {
    const { t } = useLanguage();
    const { animationKey } = useLanguageAnimation();

    const principles = [
        {
            number: '1',
            title: t('english.instructor.principle.1'),
        },
        {
            number: '2',
            title: t('english.instructor.principle.2'),
        },
        {
            number: '3',
            title: t('english.instructor.principle.3'),
        },
    ];

    const languages = [
        t('english.instructor.lang.english'),
        t('english.instructor.lang.japanese'),
        t('english.instructor.lang.french'),
        t('english.instructor.lang.korean'),
        t('english.instructor.lang.tamil'),
    ];

    return (
        <Box py={{ base: 16, md: 24 }} bg="white">
            <Container maxW="7xl">
                <VStack spacing={20}>
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
                                {t('english.instructor.badge')}
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
                                <TranslatedText as="span" translationKey="english.instructor.title.1" staggerDelay={0} />
                                <Text as="span" color="#e08e46"><TranslatedText as="span" translationKey="english.instructor.title.2" staggerDelay={0.02} /></Text>
                                <TranslatedText as="span" translationKey="english.instructor.title.3" staggerDelay={0.04} />
                            </Heading>
                        </VStack>
                    </ScrollReveal>

                    {/* First Block: Text Left, Image Right */}
                    <ScrollReveal>
                        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, lg: 16 }} alignItems="center">
                            {/* Text content */}
                            <VStack align="flex-start" spacing={6} order={{ base: 2, lg: 1 }}>
                                <VStack align="flex-start" spacing={1}>
                                    <Text
                                        fontSize={{ base: "2xl", md: "3xl" }}
                                        fontWeight="700"
                                        color="#111111"
                                    >
                                        {t('english.instructor.name')}
                                    </Text>
                                    <Text
                                        fontSize={{ base: "md", md: "lg" }}
                                        color="#e08e46"
                                        fontWeight="600"
                                    >
                                        {t('english.instructor.position')}
                                    </Text>
                                </VStack>

                                <Text
                                    fontSize={{ base: "sm", md: "md" }}
                                    color="#6e6e73"
                                    lineHeight="1.8"
                                >
                                    {t('english.instructor.bio')}
                                </Text>

                                <HStack spacing={2} flexWrap="wrap">
                                    {languages.map((lang) => (
                                        <Badge
                                            key={lang}
                                            px={3}
                                            py={1}
                                            borderRadius="full"
                                            fontSize="xs"
                                            fontWeight="600"
                                            bg="rgba(224, 142, 70, 0.1)"
                                            color="#e08e46"
                                        >
                                            {lang}
                                        </Badge>
                                    ))}
                                </HStack>

                                <VStack align="flex-start" spacing={4} pt={6}>
                                    {/* Greeting Header */}
                                    <Box>
                                        <Text
                                            fontSize={{ base: "xs", md: "sm" }}
                                            color="#e08e46"
                                            fontWeight="600"
                                            letterSpacing="0.2em"
                                            textTransform="uppercase"
                                            mb={1}
                                        >
                                            {t('english.instructor.message.label')}
                                        </Text>
                                        <Text
                                            fontSize={{ base: "xl", md: "2xl" }}
                                            fontWeight="700"
                                            color="#111111"
                                            letterSpacing="-0.02em"
                                            position="relative"
                                            _after={{
                                                content: '""',
                                                position: 'absolute',
                                                bottom: '-8px',
                                                left: '0',
                                                width: '40px',
                                                height: '3px',
                                                bg: '#e08e46',
                                                borderRadius: 'full',
                                            }}
                                        >
                                            {t('english.instructor.message.title')}
                                        </Text>
                                    </Box>
                                    <Text
                                        fontSize={{ base: "lg", md: "xl" }}
                                        color="#111111"
                                        lineHeight="1.8"
                                        fontWeight="600"
                                        pt={4}
                                    >
                                        {t('english.instructor.message.greeting')}
                                    </Text>
                                    <Text
                                        fontSize={{ base: "md", md: "lg" }}
                                        color="#444"
                                        lineHeight="1.9"
                                    >
                                        {t('english.instructor.message.intro')}
                                    </Text>
                                </VStack>
                            </VStack>

                            {/* Image with fade */}
                            <Box position="relative" order={{ base: 1, lg: 2 }}>
                                <Box position="relative">
                                    <Image
                                        src="/images/english/santhanam_normalportrait.png"
                                        alt="サンタナム 理志"
                                        width={600}
                                        height={520}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'contain'
                                        }}
                                        priority
                                    />
                                    {/* Bottom fade gradient */}
                                    <Box
                                        position="absolute"
                                        bottom={0}
                                        left={0}
                                        right={0}
                                        h="150px"
                                        bgGradient="linear(to-t, white 0%, transparent 100%)"
                                        pointerEvents="none"
                                    />
                                </Box>
                            </Box>
                        </SimpleGrid>
                    </ScrollReveal>

                    {/* Second Block: Image Left, Text Right */}
                    <ScrollReveal>
                        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, lg: 16 }} alignItems="center">
                            {/* Image with fade */}
                            <Box position="relative" order={{ base: 1, lg: 1 }}>
                                <Box position="relative">
                                    <Image
                                        src="/images/english/santhanam_speech.png"
                                        alt="サンタナム 理志 スピーチ"
                                        width={700}
                                        height={420}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'contain'
                                        }}
                                    />
                                    {/* Bottom fade gradient */}
                                    <Box
                                        position="absolute"
                                        bottom={0}
                                        left={0}
                                        right={0}
                                        h="150px"
                                        bgGradient="linear(to-t, white 0%, transparent 100%)"
                                        pointerEvents="none"
                                    />
                                </Box>
                            </Box>

                            {/* Text content */}
                            <VStack
                                align="flex-start"
                                spacing={6}
                                order={{ base: 2, lg: 2 }}
                            >
                                <Text
                                    fontSize={{ base: "md", md: "lg" }}
                                    color="#444"
                                    lineHeight="1.9"
                                >
                                    {t('english.instructor.message.insight.1')}
                                    <Text as="span" color="#e08e46" fontWeight="600">
                                        {t('english.instructor.message.insight.highlight')}
                                    </Text>
                                    {t('english.instructor.message.insight.2')}
                                </Text>
                                <Text
                                    fontSize={{ base: "md", md: "lg" }}
                                    color="#444"
                                    lineHeight="1.9"
                                >
                                    {t('english.instructor.message.detail.1')}
                                </Text>
                                <Text
                                    fontSize={{ base: "md", md: "lg" }}
                                    color="#444"
                                    lineHeight="1.9"
                                >
                                    {t('english.instructor.message.detail.2.1')}
                                    <Text as="span" color="#e08e46" fontWeight="600">
                                        {t('english.instructor.message.detail.2.highlight')}
                                    </Text>
                                    {t('english.instructor.message.detail.2.2')}
                                </Text>
                            </VStack>
                        </SimpleGrid>
                    </ScrollReveal>

                    {/* Principles */}
                    <ScrollReveal>
                        <VStack spacing={8} maxW="4xl" mx="auto" w="full">
                            <Text
                                fontSize={{ base: "lg", md: "xl" }}
                                color="#111111"
                                fontWeight="600"
                                textAlign="center"
                            >
                                {t('english.instructor.principles.intro')}
                            </Text>

                            <VStack spacing={4} align="stretch" w="full">
                                {principles.map((principle) => (
                                    <HStack
                                        key={principle.number}
                                        spacing={4}
                                        align="flex-start"
                                        bg="#fafafa"
                                        p={5}
                                        borderRadius="xl"
                                        border="1px solid"
                                        borderColor="#e5e7eb"
                                    >
                                        <Box
                                            minW="44px"
                                            h="44px"
                                            borderRadius="full"
                                            bg="#e08e46"
                                            color="white"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            fontWeight="700"
                                            fontSize="lg"
                                            flexShrink={0}
                                        >
                                            {principle.number}
                                        </Box>
                                        <Text
                                            fontSize={{ base: "md", md: "lg" }}
                                            color="#444"
                                            lineHeight="1.8"
                                            pt={2}
                                        >
                                            {principle.title}
                                        </Text>
                                    </HStack>
                                ))}
                            </VStack>
                        </VStack>
                    </ScrollReveal>

                    {/* Closing Message */}
                    <ScrollReveal>
                        <Box
                            maxW="4xl"
                            mx="auto"
                            textAlign="center"
                            py={{ base: 8, md: 12 }}
                        >
                            <Text
                                fontSize={{ base: "2xl", md: "3xl", lg: "36px" }}
                                fontWeight="700"
                                lineHeight="1.6"
                                letterSpacing="-0.02em"
                                color="#111111"
                            >
                                <Text as="span" color="#e08e46">{t('english.instructor.closing.1')}</Text>
                                {t('english.instructor.closing.2')}
                                <br />
                                {t('english.instructor.closing.3')}
                            </Text>
                            <Box
                                w="60px"
                                h="3px"
                                bg="#e08e46"
                                mx="auto"
                                mt={6}
                                borderRadius="full"
                            />
                        </Box>
                    </ScrollReveal>
                </VStack>
            </Container>
        </Box>
    );
}
