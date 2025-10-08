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
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

export default function TestimonialsSection() {
    const headingRef = useRef(null);
    const cardsRef = useRef(null);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    useEffect(() => {
        gsap.fromTo(headingRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        gsap.fromTo(cardsRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                delay: 0.3,
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const testimonials = [
        {
            quote: "NPOとして限られた予算の中、完全オーダーメイドのサイトを作っていただき、寄付者や支援者との繋がりが可視化できるようになりました。データ追跡機能のおかげで、一人ひとりに合わせた支援依頼ができ、寄付率が大幅に向上しました。",
            name: "竜 礼奈",
            role: "NPO法人代表",
            metrics: [
                { label: "寄付率", value: "+240%" },
                { label: "平均寄付額", value: "+140%" },
                { label: "継続支援者", value: "+85%" }
            ],
            color: "#e08e46"
        },
        {
            quote: "今までいろいろなツールを使い分けていた業務が、一つのシステムに統合されました。毎日2時間かかっていた作業が15分に短縮され、本当に重要な仕事に集中できるようになりました。",
            role: "スタートアップCTO",
            metrics: [
                { label: "作業時間", value: "-55%" },
                { label: "開発速度", value: "+120%" },
                { label: "エラー率", value: "-78%" }
            ],
            color: "#4facfe"
        },
        {
            quote: "海外顧客向けに多言語対応のシステムを構築していただき、英語・フランス語・韓国語・日本語の切り替えがシームレスになりました。翻訳の手間が省けただけでなく、各言語でのデータ分析も可能になり、グローバル展開が加速しました。",
            name: "石神 拓真",
            role: "EC事業責任者",
            metrics: [
                { label: "海外売上", value: "+240%" },
                { label: "CV率", value: "+92%" },
                { label: "顧客満足度", value: "4.8/5" }
            ],
            color: "#f093fb"
        }
    ];

    return (
        <Box 
            py={{ base: 20, md: 28 }}
            bg="white"
            position="relative"
            overflow="hidden"
        >
            {/* Decorative Background Elements */}
            <Box
                position="absolute"
                top="5%"
                left="-10%"
                w="500px"
                h="500px"
                opacity={0.08}
            >
                <svg width="100%" height="100%" viewBox="0 0 500 500">
                    <defs>
                        <linearGradient id="testimGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e08e46" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#f4a460" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                    <polygon points="250,50 450,400 50,400" fill="url(#testimGrad1)" />
                </svg>
            </Box>

            <Container maxW="7xl" position="relative" zIndex={1}>
                <VStack spacing={16}>
                    <VStack spacing={6} textAlign="center" maxW="3xl" mx="auto" ref={headingRef}>
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
                            お客様の声
                        </Badge>
                        <Heading
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl", lg: "56px" }}
                            fontWeight="700"
                            color="#111111"
                            letterSpacing="-0.02em"
                            lineHeight="1.1"
                        >
                            導入企業の
                            <Text as="span" color="#e08e46">
                                成功事例
                            </Text>
                        </Heading>
                    </VStack>

                    <SimpleGrid
                        ref={cardsRef}
                        columns={{ base: 1, lg: 3 }}
                        spacing={8}
                        w="full"
                    >
                        {testimonials.map((testimonial, index) => (
                            <Box
                                key={index}
                                position="relative"
                                p={8}
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
                            >
                                <VStack spacing={6} align="flex-start">
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

                                    {/* Quote */}
                                    <Text
                                        fontSize="md"
                                        color="#333333"
                                        lineHeight="1.8"
                                        fontWeight="400"
                                    >
                                        {testimonial.quote}
                                    </Text>

                                    {/* Metric Bubbles */}
                                    <HStack spacing={3} flexWrap="wrap">
                                        {testimonial.metrics.map((metric, i) => (
                                            <Box
                                                key={i}
                                                px={3}
                                                py={1.5}
                                                bg={`${testimonial.color}15`}
                                                borderRadius="full"
                                                border="1px solid"
                                                borderColor={`${testimonial.color}30`}
                                            >
                                                <HStack spacing={2}>
                                                    <Text
                                                        fontSize="xs"
                                                        fontWeight="500"
                                                        color="#6e6e73"
                                                    >
                                                        {metric.label}
                                                    </Text>
                                                    <Text
                                                        fontSize="sm"
                                                        fontWeight="700"
                                                        color={testimonial.color}
                                                    >
                                                        {metric.value}
                                                    </Text>
                                                </HStack>
                                            </Box>
                                        ))}
                                    </HStack>

                                    {/* Author Info */}
                                    <HStack spacing={4} pt={4}>
                                        <Avatar
                                            size="md"
                                            name={testimonial.name}
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
                                                {testimonial.name}
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="#6e6e73"
                                                fontWeight="500"
                                            >
                                                {testimonial.role}
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
