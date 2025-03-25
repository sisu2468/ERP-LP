'use client';

import {
    Box,
    Container,
    Heading,
    VStack,
    Text,
    Grid,
    GridItem,
    Icon,
    Flex,
    useColorModeValue,
} from '@chakra-ui/react';
import { 
    FaUserFriends, 
    FaPiggyBank, 
    FaServer, 
    FaHeadset, 
    FaCloudUploadAlt 
} from 'react-icons/fa';

const pricingFeatures = [
    {
        icon: FaUserFriends,
        title: 'シンプルな料金体系',
        description: 'ユーザーごとに料金が発生する仕組み。追加ユーザーに余分なコストはかかりません。',
        highlight: '追加コスト無し'
    },
    {
        icon: FaPiggyBank,
        title: 'コストパフォーマンスにすぐれたプラン',
        description: '一般的なクラウド型ERPのライセンス料は平均10万円以上/月。サインタなら基本モジュールが2〜3万円から導入可能！',
        highlight: '最大70%コスト削減',
        note: '※サービス向上のため、価格を改定させていただく場合がございます。'
    },
    {
        icon: FaServer,
        title: 'オンプレミスもスマートに導入',
        description: '導入コストを抑えながら、貴社のビジネスにフィットしたシステム構築をサポート。更新コストも効率的に管理できます。',
        highlight: 'カスタマイズ可能'
    },
    {
        icon: FaHeadset,
        title: '安心の導入サポート',
        description: 'オンプレミス導入時には、経験豊富なスタッフが丁寧にサポート。追加の人員を確保する必要はありません。',
        highlight: '専任スタッフ対応'
    },
    {
        icon: FaCloudUploadAlt,
        title: '常に最新のクラウド環境',
        description: 'クラウド型ERPなら、自動アップデートで常に最新の機能をご利用いただけます。手間をかけずにビジネスの成長を後押しします。',
        highlight: '自動アップデート'
    }
];

export default function PricingFeatures() {
    const bgGradient = useColorModeValue(
        'linear(to-br, orange.50, gray.50)',
        'linear(to-br, gray.800, gray.900)'
    );
    
    return (
        <Box py={16} bgGradient={bgGradient}>
            <Container maxW="6xl">
                <VStack spacing={12}>
                    <VStack spacing={4} textAlign="center">
                        <Heading
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl" }}
                            bg="orange.400"
                            bgClip="text"
                        >
                            選ぶならサインタ・コア
                        </Heading>
                        <Text 
                            fontSize={{ base: "lg", md: "xl" }}
                            color="gray.600"
                            maxW="2xl"
                        >
                            ビジネスの成長に合わせて選べる、柔軟な料金プラン
                        </Text>
                    </VStack>

                    <Grid
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                        gap={8}
                    >
                        {pricingFeatures.map((feature, index) => (
                            <GridItem key={index}>
                                <Box
                                    bg="white"
                                    p={6}
                                    borderRadius="xl"
                                    boxShadow="lg"
                                    height="full"
                                    position="relative"
                                    overflow="hidden"
                                    _hover={{
                                        transform: 'translateY(-4px)',
                                        boxShadow: 'xl',
                                    }}
                                    transition="all 0.3s"
                                >
                                    <Box
                                        position="absolute"
                                        top={0}
                                        right={0}
                                        bg="orange.400"
                                        color="white"
                                        px={3}
                                        py={1}
                                        borderBottomLeftRadius="md"
                                        fontSize="sm"
                                        fontWeight="bold"
                                    >
                                        {feature.highlight}
                                    </Box>

                                    <VStack spacing={4} align="flex-start">
                                        <Flex
                                            w={12}
                                            h={12}
                                            bg="orange.200"
                                            color="orange.500"
                                            borderRadius="full"
                                            align="center"
                                            justify="center"
                                        >
                                            <Icon as={feature.icon} boxSize={6} />
                                        </Flex>

                                        <Heading
                                            as="h3"
                                            fontSize="xl"
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
                                </Box>
                            </GridItem>
                        ))}
                    </Grid>
                </VStack>
            </Container>
        </Box>
    );
} 