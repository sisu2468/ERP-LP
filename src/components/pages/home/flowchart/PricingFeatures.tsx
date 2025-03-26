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
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { 
    FaUserFriends, 
    FaPiggyBank, 
    FaServer, 
    FaHeadset, 
    FaCloudUploadAlt 
} from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    const { colorMode } = useColorMode();
    const bgGradient = useColorModeValue(
        'linear(to-br, orange.50, gray.50)',
        'linear(to-br, gray.800, gray.900)'
    );
    const cardBg = useColorModeValue('white', 'gray.800');
    const headingColor = useColorModeValue('orange.500', 'orange.300');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const noteColor = useColorModeValue('gray.500', 'gray.400');
    const iconBg = useColorModeValue('orange.200', 'orange.900');
    const iconColor = useColorModeValue('orange.500', 'orange.300');
    const tagBg = useColorModeValue('orange.400', 'orange.500');
    const borderColor = useColorModeValue('gray.100', 'gray.700');

    const headingRef = useRef(null);
    const descriptionRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Heading animation
        gsap.fromTo(headingRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Description animation
        gsap.fromTo(descriptionRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                scrollTrigger: {
                    trigger: descriptionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Cards animation
        cardsRef.current.forEach((cardRef, index) => {
            if (cardRef) {
                // Scroll animation
                gsap.fromTo(cardRef,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: cardRef,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Hover animation
                cardRef.addEventListener('mouseenter', () => {
                    gsap.to(cardRef, {
                        translateY: -8,
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        borderColor: colorMode === 'light' ? '#FED7AA' : '#ED8936',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                cardRef.addEventListener('mouseleave', () => {
                    gsap.to(cardRef, {
                        translateY: 0,
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        borderColor: borderColor,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            cardsRef.current.forEach(cardRef => {
                if (cardRef) {
                    cardRef.removeEventListener('mouseenter', () => {});
                    cardRef.removeEventListener('mouseleave', () => {});
                }
            });
        };
    }, [colorMode, borderColor]);
    
    return (
        <Box py={16} bgGradient={bgGradient}>
            <Container maxW="6xl">
                <VStack spacing={12}>
                    <VStack spacing={4} textAlign="center">
                        <Heading
                            ref={headingRef}
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl" }}
                            bgGradient={colorMode === 'light' 
                                ? "linear(to-r, orange.400, orange.600)"
                                : "linear(to-r, orange.300, orange.500)"
                            }
                            bgClip="text"
                        >
                            選ぶならサインタ・コア
                        </Heading>
                        <Text 
                            ref={descriptionRef}
                            fontSize={{ base: "lg", md: "xl" }}
                            color={textColor}
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
                                    ref={el => { cardsRef.current[index] = el }}
                                    bg={cardBg}
                                    p={6}
                                    borderRadius="xl"
                                    boxShadow="lg"
                                    height="full"
                                    position="relative"
                                    overflow="hidden"
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                    style={{ transform: 'translateY(0)' }}
                                >
                                    <Box
                                        position="absolute"
                                        top={0}
                                        right={0}
                                        bg={tagBg}
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
                                            bg={iconBg}
                                            color={iconColor}
                                            borderRadius="full"
                                            align="center"
                                            justify="center"
                                            transition="all 0.3s"
                                            _hover={{
                                                transform: 'scale(1.1)',
                                            }}
                                        >
                                            <Icon as={feature.icon} boxSize={6} />
                                        </Flex>

                                        <Heading
                                            as="h3"
                                            fontSize="xl"
                                            color={headingColor}
                                        >
                                            {feature.title}
                                        </Heading>

                                        <Text color={textColor}>
                                            {feature.description}
                                        </Text>

                                        {feature.note && (
                                            <Text
                                                fontSize="sm"
                                                color={noteColor}
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