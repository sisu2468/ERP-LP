'use client';

import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    VStack,
    HStack,
    Icon,
    useColorMode,
    useColorModeValue,
    keyframes,
} from '@chakra-ui/react';
import { FaTrophy, FaMoneyBillWave, FaBolt, FaArrowRight } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Animation keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

export default function Hero() {
    const { colorMode } = useColorMode();
    const heroRef = useRef(null);

    useEffect(() => {
        const hero = heroRef.current;
        if (hero) {
            gsap.fromTo(hero,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out"
                }
            );
        }
    }, []);

    return (
        <Box 
            ref={heroRef}
            position="relative" 
            overflow="hidden"
            minH="100vh"
            display="flex"
            alignItems="center"
            bg="white"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                    linear-gradient(45deg, rgba(255, 138, 0, 0.02) 25%, transparent 25%), 
                    linear-gradient(-45deg, rgba(255, 138, 0, 0.02) 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, rgba(255, 138, 0, 0.02) 75%), 
                    linear-gradient(-45deg, transparent 75%, rgba(255, 138, 0, 0.02) 75%)
                `,
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
                pointerEvents: 'none',
            }}
        >
            {/* Animated background elements */}
            <Box
                position="absolute"
                top="10%"
                left="10%"
                w="200px"
                h="200px"
                borderRadius="full"
                bg="rgba(66, 153, 225, 0.05)"
                animation={`${float} 6s ease-in-out infinite`}
                filter="blur(40px)"
            />
            <Box
                position="absolute"
                bottom="20%"
                right="15%"
                w="150px"
                h="150px"
                borderRadius="full"
                bg="rgba(236, 72, 153, 0.05)"
                animation={`${float} 8s ease-in-out infinite reverse`}
                filter="blur(30px)"
            />

            <Container maxW="8xl" position="relative" zIndex={2}>
                <VStack spacing={16} textAlign="center" py={20}>
                    {/* Main Catchphrase */}
                    <VStack spacing={8} maxW="5xl">
                        <VStack spacing={6}>
                            <Heading
                                as="h1"
                                fontSize={{ base: "4xl", md: "5xl", lg: "6xl", xl: "7xl" }}
                                fontWeight="900"
                                lineHeight="0.9"
                                color="gray.800"
                                letterSpacing="tight"
                                textShadow="0 4px 20px rgba(0,0,0,0.1)"
                            >
                                <Text
                                    bgGradient="linear(to-r, #FFCC99, #FFB366)"
                                    bgClip="text"
                                    display="inline"
                                >
                                    設計する。
                                </Text>
                                <Text
                                    bgGradient="linear(to-r, #FFB366, #FFA366)"
                                    bgClip="text"
                                    display="inline"
                                    mx={4}
                                >
                                    魅せる。
                                </Text>
                                <Text
                                    bgGradient="linear(to-r, #FFA366, #FF9966)"
                                    bgClip="text"
                                    display="inline"
                                >
                                    勝たせる。
                                </Text>
                            </Heading>

                            <Text
                                fontSize={{ base: "xl", lg: "2xl", xl: "3xl" }}
                                color="gray.600"
                                lineHeight="1.4"
                                fontWeight="300"
                                textShadow="0 2px 10px rgba(0,0,0,0.1)"
                                maxW="3xl"
                            >
                                あなたのビジョン、カタチに。
                            </Text>
                        </VStack>
                    </VStack>

                    {/* Feature Points */}
                    <VStack spacing={10} maxW="6xl" mx="auto">
                        <HStack spacing={8} align="flex-start" flexWrap="wrap" justify="center">
                            <Box
                                p={8}
                                bg="rgba(255, 255, 255, 0.8)"
                                borderRadius="2xl"
                                border="1px solid"
                                borderColor="rgba(0, 0, 0, 0.1)"
                                backdropFilter="blur(10px)"
                                maxW="350px"
                                minH="290px"
                                boxShadow="0 10px 30px rgba(0,0,0,0.1)"
                                _hover={{
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <VStack spacing={4} align="flex-start">
                                    <HStack spacing={4}>
                                        <Box
                                            p={3}
                                            borderRadius="xl"
                                            bgGradient="linear(to-r, #FFCC99, #FFB366)"
                                            boxShadow="0 8px 20px rgba(255, 204, 153, 0.3)"
                                        >
                                            <Icon as={FaTrophy} w={6} h={6} color="white" />
                                        </Box>
                                        <Text fontWeight="bold" fontSize="xl" color="gray.800">
                                            🥇 成約率重視の構成設計
                                        </Text>
                                    </HStack>
                                    <Text color="gray.600" lineHeight="1.8" fontSize="md">
                                        アメリカやヨーロッパのデザイン技術を活かし、心理学ベースで「行動につながる」導線を設計。ユーザーの心を動かし、成約率を高めるWebを提供します。
                                    </Text>
                                </VStack>
                            </Box>

                            <Box    
                                p={8}
                                bg="rgba(255, 255, 255, 0.8)"
                                borderRadius="2xl"
                                border="1px solid"
                                borderColor="rgba(0, 0, 0, 0.1)"
                                backdropFilter="blur(10px)"
                                maxW="350px"
                                minH="290px"
                                boxShadow="0 10px 30px rgba(0,0,0,0.1)"
                                _hover={{
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <VStack spacing={4} align="flex-start">
                                    <HStack spacing={4}>
                                        <Box
                                            p={3}
                                            borderRadius="xl"
                                            bgGradient="linear(to-r, #FFB366, #FFA366)"
                                            boxShadow="0 8px 20px rgba(255, 179, 102, 0.3)"
                                        >
                                            <Icon as={FaMoneyBillWave} w={6} h={6} color="white" />
                                        </Box>
                                        <Text fontWeight="bold" fontSize="xl" color="gray.800">
                                            💰 適正価格で、高品質を。
                                        </Text>
                                    </HStack>
                                    <Text color="gray.600" lineHeight="1.8" fontSize="md">
                                        初期費用は抑えつつ、仕上がりには一切妥協なし。明瞭な料金体系と丁寧なヒアリングで、安心して任せられるパートナーを目指します。
                                    </Text>
                                </VStack>
                            </Box>

                            <Box
                                p={8}
                                bg="rgba(255, 255, 255, 0.8)"
                                borderRadius="2xl"
                                border="1px solid"
                                borderColor="rgba(0, 0, 0, 0.1)"
                                backdropFilter="blur(10px)"
                                maxW="350px"
                                minH="290px"
                                boxShadow="0 10px 30px rgba(0,0,0,0.1)"
                                _hover={{
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <VStack spacing={4} align="flex-start">
                                    <HStack spacing={4}>
                                        <Box
                                            p={3}
                                            borderRadius="xl"
                                            bgGradient="linear(to-r, #FFA366, #FF9966)"
                                            boxShadow="0 8px 20px rgba(255, 163, 102, 0.3)"
                                        >
                                            <Icon as={FaBolt} w={6} h={6} color="white" />
                                        </Box>
                                        <Text fontWeight="bold" fontSize="xl" color="gray.800">
                                            ⚡ スピードと柔軟性
                                        </Text>
                                    </HStack>
                                    <Text color="gray.600" lineHeight="1.8" fontSize="md">
                                        ご相談から最短1週間で初稿を提出。やり取りはスムーズで、修正や追加対応にも柔軟に対応。スピードと丁寧さ、どちらも大切にしています。
                                    </Text>
                                </VStack>
                            </Box>
                        </HStack>
                    </VStack>

                    {/* CTA Buttons */}
                    <VStack spacing={6}>
                        <Stack
                            direction={{ base: "column", sm: "row" }}
                            spacing={6}
                            justify="center"
                            w="full"
                            maxW="md"
                        >
                            <Link href="/contact" w="100%">
                                <Button
                                    size="lg"
                                    bgGradient="linear(to-r, #FF8A00, #FF6B35)"
                                    color="white"
                                    px={10}
                                    fontSize="lg"
                                    w="100%"
                                    fontWeight="bold"
                                    h="70px"
                                    borderRadius="xl"
                                    boxShadow="0 10px 30px rgba(255, 138, 0, 0.4)"
                                    _hover={{
                                        transform: "translateY(-3px)",
                                        boxShadow: "0 15px 40px rgba(255, 138, 0, 0.6)",
                                        bgGradient: "linear(to-r, #FF6B35, #FF8A00)",
                                    }}
                                    _active={{
                                        transform: "translateY(-1px)",
                                    }}
                                    transition="all 0.3s ease"
                                >
                                    無料相談
                                    <Icon as={FaArrowRight} ml={2} />
                                </Button>
                            </Link>
                            <Link href="/pricing" w="100%">
                                <Button
                                    w="100%"
                                    size="lg"
                                    variant="outline"
                                    px={10}
                                    fontSize="lg"
                                    fontWeight="bold"
                                    h="70px"
                                    borderRadius="xl"
                                    borderWidth="2px"
                                    borderColor="gray.400"
                                    color="gray.700"
                                    bg="rgba(255, 255, 255, 0.8)"
                                    backdropFilter="blur(10px)"
                                    _hover={{
                                        transform: "translateY(-3px)",
                                        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
                                        bg: "rgba(255, 255, 255, 0.9)",
                                    }}
                                    _active={{
                                        transform: "translateY(-1px)",
                                    }}
                                    transition="all 0.3s ease"
                                >
                                    料金詳細
                                </Button>
                            </Link>
                        </Stack>
                        
                        <Text color="gray.500" fontSize="sm" fontWeight="300">
                            ※ 初回相談は完全無料・義務なし
                        </Text>
                    </VStack>
                </VStack>
            </Container>

            {/* Scroll indicator */}
            <Box
                position="absolute"
                bottom={8}
                left="50%"
                transform="translateX(-50%)"
                animation={`${pulse} 2s ease-in-out infinite`}
            >
                <Box
                    w="2px"
                    h="40px"
                    bg="rgba(0, 0, 0, 0.3)"
                    borderRadius="full"
                    position="relative"
                    _after={{
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        w: "8px",
                        h: "8px",
                        bg: "gray.600",
                        borderRadius: "full",
                        animation: `${float} 2s ease-in-out infinite`,
                    }}
                />
            </Box>
        </Box>
    );
} 