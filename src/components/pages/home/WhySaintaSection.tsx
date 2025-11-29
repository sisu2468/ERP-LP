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
} from '@chakra-ui/react';
import {
    FaFlag,
    FaFileContract,
    FaRocket,
    FaDatabase,
    FaSyncAlt,
} from 'react-icons/fa';

const reasons = [
    {
        number: '01',
        icon: FaFlag,
        title: '日本に特化したERP',
        description: '海外ツールのローカライズではない。日本企業の実務に合わせて、ゼロから設計。',
        color: '#e08e46',
    },
    {
        number: '02',
        icon: FaFileContract,
        title: '法令に完全対応',
        description: 'インボイス制度、電子帳簿保存法 - すべて対応済み。後付けの調整は不要。',
        color: '#3b82f6',
    },
    {
        number: '03',
        icon: FaRocket,
        title: '導入は数日で完了',
        description: '半年かかる導入は過去の話。ほとんどの企業が1週間以内に稼働。',
        color: '#10b981',
    },
    {
        number: '04',
        icon: FaDatabase,
        title: 'データはあなたのもの',
        description: '日本国内でホスト。いつでもエクスポート可能。ロックインなし。',
        color: '#8b5cf6',
    },
    {
        number: '05',
        icon: FaSyncAlt,
        title: '常に進化し続ける',
        description: '毎月アップデートを配信。お客様のフィードバックが、開発の方向性を決める。',
        color: '#ec4899',
    },
];

export default function WhySaintaSection() {
    return (
        <Box
            py={{ base: 20, md: 28 }}
            bg="#fafafa"
        >
            <Container maxW="7xl">
                <VStack spacing={16}>
                    {/* Header */}
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
                            textTransform="none"
                        >
                            選ばれる理由
                        </Badge>
                        <Heading
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl", lg: "52px" }}
                            fontWeight="700"
                            color="#111111"
                            letterSpacing="-0.02em"
                            lineHeight="1.2"
                        >
                            なぜ
                            <Text as="span" color="#e08e46">サインタ・コア</Text>
                            なのか
                        </Heading>
                        <Text
                            fontSize={{ base: "lg", md: "xl" }}
                            color="#6e6e73"
                            lineHeight="1.8"
                        >
                            まだ迷っていますか？
                            <br />
                            5つの理由をご紹介します。
                        </Text>
                    </VStack>

                    {/* Reasons Grid */}
                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        spacing={6}
                        w="full"
                    >
                        {reasons.map((reason, index) => (
                            <Box
                                key={index}
                                p={8}
                                bg="white"
                                borderRadius="2xl"
                                border="1px solid"
                                borderColor="#e5e7eb"
                                position="relative"
                                overflow="hidden"
                                transition="all 0.3s"
                                _hover={{
                                    borderColor: reason.color,
                                    transform: 'translateY(-4px)',
                                    boxShadow: `0 20px 40px ${reason.color}15`,
                                }}
                                // Make the 4th and 5th cards span properly on lg
                                gridColumn={index === 3 ? { lg: '1 / 2' } : index === 4 ? { lg: '2 / 3' } : undefined}
                                justifySelf={index >= 3 ? { lg: 'center' } : undefined}
                                maxW={index >= 3 ? { lg: '400px' } : undefined}
                                w="full"
                            >
                                {/* Number badge */}
                                <Text
                                    position="absolute"
                                    top={4}
                                    right={4}
                                    fontSize="4xl"
                                    fontWeight="800"
                                    color={`${reason.color}15`}
                                    lineHeight="1"
                                >
                                    {reason.number}
                                </Text>

                                <VStack align="flex-start" spacing={5}>
                                    <Box
                                        w={12}
                                        h={12}
                                        borderRadius="xl"
                                        bg={`${reason.color}15`}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Icon
                                            as={reason.icon}
                                            boxSize={6}
                                            color={reason.color}
                                        />
                                    </Box>

                                    <Heading
                                        as="h3"
                                        fontSize="xl"
                                        fontWeight="700"
                                        color="#111111"
                                    >
                                        {reason.title}
                                    </Heading>

                                    <Text
                                        fontSize="md"
                                        color="#6e6e73"
                                        lineHeight="1.75"
                                    >
                                        {reason.description}
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
}
