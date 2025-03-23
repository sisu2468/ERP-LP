'use client';

import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Stack,
    Text
} from '@chakra-ui/react';

export default function Hero() {
    return (
        <Box position="relative" overflow="hidden">
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="linear-gradient(135deg, rgba(66, 153, 225, 0.1) 0%, rgba(49, 130, 206, 0.05) 100%)"
                zIndex={0}
            />

            <Container maxW="7xl" position="relative" zIndex={1}>
                <Flex
                    align="center"
                    justify="space-between"
                    wrap="wrap"
                    pt={32}
                    pb={{ base: 8, md: 16 }}
                    gap={{ base: 8, md: 16 }}
                >
                    <Stack
                        spacing={6}
                        w={{ base: "100%", md: "50%" }}
                        textAlign={{ base: "center", md: "left" }}
                    >
                        <Heading
                            as="h1"
                            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                            fontWeight="bold"
                            lineHeight="1.2"
                            color="gray.800"
                        >
                            人が輝けば、企業はもっと強くなる。
                            <Text
                                as="span"
                                display="block"
                                color="blue.600"
                                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                                mt={4}
                            >
                                サインタERPで新たなステージへ。
                            </Text>
                        </Heading>

                        <Text
                            fontSize={{ base: "md", lg: "lg" }}
                            color="gray.600"
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
                            <Button
                                size="lg"
                                colorScheme="orange"
                                px={8}
                                fontSize="md"
                                fontWeight="bold"
                                _hover={{
                                    transform: "translateY(-2px)",
                                    boxShadow: "lg",
                                }}
                            >
                                無料で試す
                            </Button>
                            <Button
                                size="lg"
                                colorScheme="blue"
                                variant="outline"
                                px={8}
                                fontSize="md"
                                fontWeight="bold"
                                _hover={{
                                    transform: "translateY(-2px)",
                                    boxShadow: "lg",
                                }}
                            >
                                資料請求
                            </Button>
                        </Stack>
                    </Stack>

                    {/* <Box
                        w={{ base: "100%", md: "45%" }}
                        display={{ base: "none", md: "block" }}
                    >
                        <Image
                            src="/images/hero-illustration.png" // You'll need to add your own image
                            alt="Business Growth Illustration"
                            w="full"
                            h="auto"
                            objectFit="contain"
                            loading="eager"
                        />
                    </Box> */}
                </Flex>
            </Container>
        </Box>
    );
} 