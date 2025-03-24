import {
    Box,
    Button,
    Card,
    CardBody,
    Container,
    Flex,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import {
    FaArrowRight,
    FaCheck,
    FaClock,
    FaComments,
    FaFileAlt,
    FaPlayCircle,
} from 'react-icons/fa';
import Button_Orange from '../buttons/Button_Orange';
import Button_Blue from '../buttons/Button_Blue';
import { CTACard } from './CTACard';
import { ctaCards } from '../../constant/CTACards';

interface CTACard {
    title: string;
    description: string;
    icon: React.ElementType;
    buttonText: string;
    buttonLink: string;
    features?: string[];
    primary?: boolean;
}

const ctaCards: CTACard[] = [
    {
        title: '無料体験を始める',
        description: '30日間無料でサービスのすべての機能をお試しいただけます',
        icon: FaPlayCircle,
        buttonText: '今すぐ無料体験',
        buttonLink: '/trial',
        features: [
            '全機能が利用可能',
            '30日間無料',
            'クレジットカード不要',
            '専任サポート付き',
        ],
        primary: true,
    },
    {
        title: '専門家に相談',
        description: '経験豊富な専門家が導入までサポートいたします',
        icon: FaComments,
        buttonText: '無料相談を予約',
        buttonLink: '/consultation',
        features: [
            'オンライン相談可能',
            '導入事例の紹介',
            '課題解決のアドバイス',
            '見積もり相談可能',
        ],
    },
    {
        title: 'プラン・料金',
        description: 'ビジネスの規模に合わせた最適なプランをご用意',
        icon: FaFileAlt,
        buttonText: 'プランを確認',
        buttonLink: '/pricing',
        features: [
            '柔軟なプラン選択',
            'スケーラブルな料金体系',
            '年間契約割引あり',
            'カスタマイズ可能',
        ],
    },
];

const CTACard = ({ card }: { card: CTACard }) => {
    const bgColor = useColorModeValue(
        card.primary ? 'orange.500' : 'white',
        card.primary ? 'orange.500' : 'gray.700'
    );
    const textColor = card.primary ? 'white' : undefined;
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    return (
        <Card
            height="full"
            bg={bgColor}
            color={textColor}
            border="1px"
            borderColor={card.primary ? 'transparent' : borderColor}
            shadow="xl"
            _hover={{
                transform: 'translateY(-8px)',
                shadow: '2xl',
            }}
            transition="all 0.3s ease"
        >
            <CardBody>
                <VStack spacing={6} align="flex-start">
                    <Icon as={card.icon} w={10} h={10} />

                    <VStack align="flex-start" spacing={2}>
                        <Heading size="lg">{card.title}</Heading>
                        <Text opacity={0.9}>{card.description}</Text>
                    </VStack>

                    {card.features && (
                        <VStack align="flex-start" spacing={3} w="full">
                            {card.features.map((feature) => (
                                <HStack key={feature} spacing={3}>
                                    <Icon as={FaCheck} w={5} h={5} />
                                    <Text>{feature}</Text>
                                </HStack>
                            ))}
                        </VStack>
                    )}

                    <Button
                        as={Link}
                        href={card.buttonLink}
                        size="lg"
                        width="full"
                        rightIcon={<FaArrowRight />}
                        colorScheme={card.primary ? 'white' : 'orange'}
                        variant={card.primary ? 'outline' : 'solid'}
                        _hover={{
                            transform: 'translateX(4px)',
                        }}
                    >
                        {card.buttonText}
                    </Button>
                </VStack>
            </CardBody>
        </Card>
    );
};

  export default function CTASection() {
    return (
        <Box py={16}>
            <Container maxW="7xl">
                <VStack spacing={16}>
                    <VStack spacing={4} textAlign="center" maxW="2xl" mx="auto">
                        <Heading size="2xl">
                            ビジネスの効率化を
                            <Text as="span" color="orange.500">
                                今すぐ
                            </Text>
                            始めましょう
                        </Heading>
                        <Text fontSize="xl" color="gray.600">
                            導入から運用まで、専任のサポートチームが全面的にサポートいたします
                        </Text>
                    </VStack>

                    <SimpleGrid
                        columns={{ base: 1, lg: 3 }}
                        spacing={8}
                        width="full"
                    >
                        {ctaCards.map((card) => (
                            <CTACard key={card.title} card={card} />
                        ))}
                    </SimpleGrid>

                    <Box
                        bg="gray.50"
                        w="full"
                        p={8}
                        borderRadius="xl"
                        textAlign="center"
                    >
                        <VStack spacing={4}>
                            <HStack spacing={2} color="gray.600">
                                <Icon as={FaClock} />
                                <Text>初期設定からご利用開始まで最短3日</Text>
                            </HStack>
                            <Flex
                                gap={4}
                                flexWrap="wrap"
                                justify="center"
                            >
                                <Button
                                    as={Link}
                                    href="/contact"
                                    colorScheme="orange"
                                    size="lg"
                                >
                                    お問い合わせ
                                </Button>
                                <Button
                                    as={Link}
                                    href="/faq"
                                    variant="ghost"
                                    size="lg"
                                >
                                    よくある質問
                                </Button>
                            </Flex>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
} 