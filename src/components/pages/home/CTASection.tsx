import {
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Text,
    VStack,
    useColorMode,
    useColorModeValue,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import {
    FaRocket,
    FaChartLine,
    FaUsers
} from 'react-icons/fa';
import Button_Orange from '../../buttons/Button_Orange';
import Button_Blue from '../../buttons/Button_Blue';
import { CTACard } from './CTACard';
import { ctaCards } from '../../../constant/CTACards';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InquiryModal from '../../common/InquiryModal';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const headingColor = useColorModeValue('gray.800', 'white');
    const accentColor = useColorModeValue('orange.500', 'orange.300');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const boxBg = useColorModeValue('white', 'gray.800');
    const iconColor = useColorModeValue('gray.600', 'gray.300');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

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
    }, [colorMode, borderColor]);

    const benefits = [
        {
            icon: FaRocket,
            title: "最短1週間で初稿",
            description: "ご相談から最短1週間で初稿を提出。スピードと品質を両立します。",
            color: "orange.500"
        },
        {
            icon: FaChartLine,
            title: "成約率重視の設計",
            description: "心理学ベースで「行動につながる」導線を設計し、成約率を高めます。",
            color: "green.500"
        },
        {
            icon: FaUsers,
            title: "柔軟な対応",
            description: "修正や追加対応にも柔軟に対応。お客様のご要望に寄り添います。",
            color: "blue.500"
        }
    ];

    return (
        <Box py={16} bg={bgColor} transition="background-color 0.2s">
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
                            size="xl"
                            color={headingColor}
                        >
                            あなたのビジョンを
                            <Text as="span" color={accentColor}>
                                カタチに
                            </Text>
                            しませんか？
                        </Heading>
                        <Text fontSize="xl" color={textColor}>
                            "売れる設計"からはじめるLP制作で、ビジネスの成長を加速させます
                        </Text>
                    </VStack>

                    <SimpleGrid
                        ref={cardsGridRef}
                        columns={{ base: 1, lg: 3 }}
                        spacing={8}
                        width="full"
                    >
                        {benefits.map((benefit, index) => (
                            <Box
                                key={index}
                                p={8}
                                bg={boxBg}
                                borderRadius="xl"
                                border="1px"
                                borderColor={borderColor}
                                textAlign="center"
                                boxShadow="0 4px 20px rgba(0,0,0,0.08)"
                                _hover={{
                                    transform: 'translateY(-4px)',
                                    shadow: '0 20px 40px rgba(0,0,0,0.12)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <VStack spacing={4}>
                                    <Icon 
                                        as={benefit.icon} 
                                        w={12} 
                                        h={12} 
                                        color={benefit.color}
                                    />
                                    <Heading size="md" color={headingColor}>
                                        {benefit.title}
                                    </Heading>
                                    <Text color={textColor} lineHeight="1.6">
                                        {benefit.description}
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>

                    <Box
                        ref={ctaBoxRef}
                        bg={boxBg}
                        w="full"
                        p={8}
                        borderRadius="xl"
                        textAlign="center"
                        borderWidth="1px"
                        borderColor={borderColor}
                        boxShadow="0 4px 20px rgba(0,0,0,0.08)"
                        style={{ 
                            willChange: 'transform',
                            transform: 'translateY(0)'
                        }}
                    >
                        <VStack spacing={6}>
                            <Text fontSize="lg" fontWeight="bold" color={headingColor}>
                                まずは無料相談から始めましょう
                            </Text>
                            <Text color={textColor}>
                                ご予算やご要望について、丁寧にヒアリングいたします
                            </Text>
                            <Flex
                                gap={4}
                                flexWrap="wrap"
                                justify="center"
                            >
                                <Button
                                    size="lg"
                                    colorScheme="orange"
                                    px={8}
                                    fontSize="md"
                                    fontWeight="bold"
                                    onClick={onOpen}
                                    _hover={{
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                                    }}
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