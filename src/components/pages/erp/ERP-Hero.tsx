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
    useColorMode
} from '@chakra-ui/react';

export default function Hero() {
    const { colorMode } = useColorMode();

    return (
        <Box
            position="relative"
            overflow="hidden"
            bg={colorMode === 'light' ? 'white' : 'gray.800'}
        >
            <Container maxW={{ base: "xl", sm: "2xl", md: "2xl", lg: "4xl", xl: "8xl", '2xl': '8xl' }} position="relative" zIndex={1}>
                <Flex
                    align="center"
                    justify="space-between"
                    py={8}
                    gap={{ base: 8, md: 16 }}
                >
                    <Stack
                        spacing={6}
                        w={{ base: "100%", md: "50%" }}
                        textAlign={{ base: "center", md: "left" }}
                    >
                        <Heading
                            as="h1"
                            fontSize={{ base: "2xl", md: "2xl", lg: "3xl", xl: "4xl" }}
                            fontWeight="bold"
                            lineHeight="1.2"
                            color={colorMode === 'light' ? 'gray.800' : 'white'}
                        >
                            人が輝けば、企業はもっと強くなる。サインタERPで新たなステージへ。
                        </Heading>

                        <Text
                            fontSize={{ base: "md", lg: "lg" }}
                            color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
                            lineHeight="1.8"
                        >
                            サインタERPは、ビジネスのあらゆる側面を一元管理し、業務効率を飛躍的に向上させる革新的なツールです。
                            データの可視化と自動化により、迅速かつ的確な意思決定を可能にし、新たな成長ステージへと導きます。
                        </Text>

                        <Stack
                            direction={{ base: "column", sm: "row" }}
                            spacing={4}
                            justify={{ base: "center", md: "flex-start" }}
                        >
                            <Box width="100%">
                                <Link href="/contact">
                                    <Button
                                        size="lg"
                                        colorScheme="orange"
                                        px={8}
                                        fontSize="md"
                                        w="100%"
                                        fontWeight="bold"
                                        _hover={{
                                            transform: "translateY(-2px)",
                                            boxShadow: "lg",
                                            bg: colorMode === 'light' ? 'orange.500' : 'orange.400',
                                        }}
                                    >
                                        すぐに始める
                                    </Button>
                                </Link>
                            </Box>
                            <Box width="100%">
                                <Link href="/newsletter">
                                    <Button
                                        w="100%"
                                        size="lg"
                                        colorScheme="blue"
                                        variant="outline"
                                        px={8}
                                        fontSize="md"
                                        fontWeight="bold"
                                        borderColor={colorMode === 'light' ? 'blue.500' : 'blue.400'}
                                        color={colorMode === 'light' ? 'blue.500' : 'blue.400'}
                                        _hover={{
                                            transform: "translateY(-2px)",
                                            boxShadow: "lg",
                                            bg: colorMode === 'light' ? 'blue.50' : 'blue.900',
                                        }}
                                    >
                                        資料請求
                                    </Button>
                                </Link>
                            </Box>
                        </Stack>
                    </Stack>

                    <Flex
                        w={{ base: "100%", md: "45%" }}
                        display={{ base: "none", md: "block" }}
                        maxW="550px"
                        position="relative"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box position="relative" w="full">
                            <Image
                                src="/hero/basic-kinousei.png"
                                alt="ビジネスシーンの女性"
                                w="full"
                                maxW="550px"
                                h="auto"
                                objectFit="cover"
                                borderRadius="12px"
                                display="block"
                                loading="eager"
                                filter={colorMode === 'dark' ? 'brightness(0.9)' : 'none'}
                            />
                            <Box
                                position="absolute"
                                bottom="0"
                                left="0"
                                w="full"
                                h="25%"
                                bgGradient={colorMode === 'light'
                                    ? "linear(to-t, white 0%, rgba(255, 255, 255, 0) 100%)"
                                    : "linear(to-t, gray.800 0%, rgba(26, 32, 44, 0) 100%)"
                                }
                                pointerEvents="none"
                                borderBottomRadius="12px"
                            />
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
} 