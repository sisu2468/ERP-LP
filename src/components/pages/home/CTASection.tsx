import {
    Box,
    Container,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Text,
    VStack,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import {
    FaRocket,
    FaChartLine,
    FaUsers,
    FaArrowRight,
} from 'react-icons/fa';
import Button_Blue from '../../buttons/Button_Blue';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InquiryModal from '../../common/InquiryModal';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
    const headingRef = useRef(null);
    const cardsGridRef = useRef(null);
    const ctaBoxRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
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

        gsap.fromTo(cardsGridRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: cardsGridRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        const ctaBox = ctaBoxRef.current;
        if (ctaBox) {
            gsap.fromTo(ctaBox,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: ctaBox,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const benefits = [
        {
            icon: FaRocket,
            title: "最短1週間で初稿",
            description: "ご相談から最短1週間で初稿を提出。スピードと品質を両立します。",
        },
        {
            icon: FaChartLine,
            title: "成約率重視の設計",
            description: "心理学ベースで「行動につながる」導線を設計し、成約率を高めます。",
        },
        {
            icon: FaUsers,
            title: "柔軟な対応",
            description: "修正や追加対応にも柔軟に対応。お客様のご要望に寄り添います。",
        }
    ];

    return (
        <Box 
            py={{ base: 16, md: 24 }}
            bg="#ffffff"
            borderTop="1px solid"
            borderColor="#e5e7eb"
        >
            <Container maxW="7xl">
                <VStack spacing={16}>
                    <VStack 
                        ref={headingRef}
                        spacing={4} 
                        textAlign="center" 
                        maxW="3xl" 
                        mx="auto"
                    >
                        <Heading 
                            fontSize={{ base: "3xl", md: "4xl", lg: "52px" }}
                            fontWeight="600"
                            color="#111111"
                            letterSpacing="-0.02em"
                            lineHeight="1.1"
                        >
                            あなたのビジョンを
                            <Text as="span" color="#e08e46">
                                カタチに
                            </Text>
                            しませんか？
                        </Heading>
                        <Text fontSize="xl" color="#6e6e73" lineHeight="1.6">
                            "売れる設計"からはじめるLP制作で、ビジネスの成長を加速させます
                        </Text>
                    </VStack>

                    <SimpleGrid
                        ref={cardsGridRef}
                        columns={{ base: 1, lg: 3 }}
                        spacing={6}
                        width="full"
                    >
                        {benefits.map((benefit, index) => (
                            <Box
                                key={index}
                                p={8}
                                bg="white"
                                borderRadius="xl"
                                border="1px"
                                borderColor="#e5e7eb"
                                textAlign="center"
                                boxShadow="0 1px 3px rgba(0, 0, 0, 0.05)"
                                _hover={{
                                    borderColor: 'rgba(224, 142, 70, 0.3)',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
                                    transform: 'translateY(-4px)',
                                    transition: 'all 0.2s',
                                }}
                                transition="all 0.2s"
                            >
                                <VStack spacing={4}>
                                    <Box
                                        w={14}
                                        h={14}
                                        borderRadius="xl"
                                        bg="rgba(224, 142, 70, 0.1)"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Icon 
                                            as={benefit.icon} 
                                            w={7} 
                                            h={7} 
                                            color="#e08e46"
                                        />
                                    </Box>
                                    <Heading size="md" color="#111111" fontWeight="700">
                                        {benefit.title}
                                    </Heading>
                                    <Text color="#6e6e73" lineHeight="1.7" fontSize="md">
                                        {benefit.description}
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>

                    <Box
                        ref={ctaBoxRef}
                        bg="#fafafa"
                        w="full"
                        p={12}
                        borderRadius="2xl"
                        textAlign="center"
                        borderWidth="1px"
                        borderColor="#e5e7eb"
                    >
                        <VStack spacing={6}>
                            <Heading size="lg" fontWeight="700" color="#111111">
                                まずは無料相談から始めましょう
                            </Heading>
                            <Text color="#6e6e73" fontSize="lg">
                                ご予算やご要望について、丁寧にヒアリングいたします
                            </Text>
                            <Flex
                                gap={4}
                                flexWrap="wrap"
                                justify="center"
                                pt={4}
                            >
                                <Button
                                    size="lg"
                                    bg="#e08e46"
                                    color="white"
                                    px={10}
                                    h="56px"
                                    fontSize="md"
                                    fontWeight="600"
                                    borderRadius="full"
                                    onClick={onOpen}
                                    rightIcon={<FaArrowRight />}
                                    _hover={{
                                        bg: "#d17d35",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 4px 12px rgba(224, 142, 70, 0.3)",
                                    }}
                                    _active={{
                                        transform: "translateY(0)",
                                    }}
                                    transition="all 0.2s"
                                >
                                    無料相談を申し込む
                                </Button>
                                <InquiryModal isOpen={isOpen} onClose={onClose} />
                                <Button_Blue href="/pricing">
                                    料金詳細を見る
                                </Button_Blue>
                            </Flex>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
} 