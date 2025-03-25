'use client';

import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    VStack,
    HStack,
    Icon,
    Flex,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    FaComments,
    FaHeadset,
    FaShieldAlt,
    FaCheckCircle,
    FaClock,
    FaUsers,
    FaHandshake
} from 'react-icons/fa';

const supportFeatures = [
    {
        icon: FaComments,
        title: 'いつでも頼れる無料サポート',
        description: 'すべてのユーザーに無料の専用フォーラムを提供！ユーザーだけでなくスタッフと知恵を共有しながら、悩みを素早く解決できます。',
        benefits: [
            { icon: FaUsers, text: 'コミュニティサポート' },
            { icon: FaClock, text: '24時間利用可能' },
            { icon: FaCheckCircle, text: '完全無料' }
        ]
    },
    {
        icon: FaHeadset,
        title: '寄り添う対応、確かな安心',
        description: 'お困りごとには迅速かつ丁寧に対応。どんな小さな疑問でも、安心してお任せください。',
        benefits: [
            { icon: FaCheckCircle, text: '迅速な対応' },
            { icon: FaHandshake, text: '丁寧なサポート' },
            { icon: FaUsers, text: '専門スタッフ対応' }
        ]
    },
    {
        icon: FaShieldAlt,
        title: '万が一の時も柔軟に対応',
        description: '問題の深刻度や状況に応じて返金対応も可能です。ビジネスの不安を少しでも軽くするお手伝いをいたします。',
        note: '※返金可否は当社の判断により決定いたします。',
        benefits: [
            { icon: FaShieldAlt, text: '返金保証制度' },
            { icon: FaHandshake, text: '柔軟な対応' },
            { icon: FaCheckCircle, text: '安心保証' }
        ]
    }
];

export default function CustomerSupport() {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');

    return (
        <Box py={16} bg={bgColor}>
            <Container maxW="8xl">
                <VStack spacing={12}>
                    <VStack spacing={4} textAlign="center">
                        <Heading
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl" }}
                            bgGradient="linear(to-r, orange.400, orange.600)"
                            bgClip="text"
                        >
                            充実の顧客サポート
                        </Heading>
                        <Text
                            fontSize={{ base: "lg", md: "xl" }}
                            color="gray.600"
                            maxW="2xl"
                        >
                            あなたのビジネスを、ずっと支える安心感
                        </Text>
                    </VStack>

                    <SimpleGrid
                        columns={{ base: 1, md: 3 }}
                        spacing={8}
                        w="full"
                    >
                        {supportFeatures.map((feature, index) => (
                            <Box
                                key={index}
                                bg={cardBg}
                                p={8}
                                borderRadius="2xl"
                                boxShadow="xl"
                                position="relative"
                                overflow="hidden"
                                _hover={{
                                    transform: 'translateY(-4px)',
                                    boxShadow: '2xl',
                                }}
                                transition="all 0.3s"
                            >
                                <Box
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    right={0}
                                    h={2}
                                    bg="orange.300"
                                    // bgGradient={`linear(to-r, orange.${400 + (index * 100)}, orange.${500 + (index * 100)})`}
                                />

                                <Flex h="100%" direction="column" gap={4} justify="space-between">
                                    <Flex
                                        w={16}
                                        h={16}
                                        bg="orange.200"
                                        color="orange.500"
                                        borderRadius="xl"
                                        align="center"
                                        justify="center"
                                    >
                                        <Icon as={feature.icon} boxSize={8} />
                                    </Flex>
                                    <Flex h="100%" direction="column" gap={5} justify="space-between">
                                        <VStack align="flex-start" spacing={3}>
                                            <Heading
                                                as="h3"
                                                fontSize="2xl"
                                                color="orange.500"
                                            >
                                                {feature.title}
                                            </Heading>
                                            <Text color="gray.600">
                                                {feature.description}
                                            </Text>
                                            {feature.note && (
                                                <Text
                                                    fontSize="sm"
                                                    color="gray.500"
                                                    fontStyle="italic"
                                                >
                                                    {feature.note}
                                                </Text>
                                            )}
                                        </VStack>

                                        <Box w="full">
                                            <SimpleGrid columns={3} spacing={2}>
                                                {feature.benefits.map((benefit, idx) => (
                                                    <HStack
                                                        key={idx}
                                                        bg="orange.50"
                                                        p={2}
                                                        borderRadius="md"
                                                        spacing={2}
                                                        h={20}
                                                    >
                                                        <Icon
                                                            as={benefit.icon}
                                                            color="orange.500"
                                                        />
                                                        <Text
                                                            fontSize="sm"
                                                            color="gray.700"
                                                            fontWeight="medium"
                                                        >
                                                            {benefit.text}
                                                        </Text>
                                                    </HStack>
                                                ))}
                                            </SimpleGrid>
                                        </Box>
                                    </Flex>
                                </Flex>
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
} 