'use client';

import { Box, Container, Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";

export default function CompanyHero() {
    const overlayBg = useColorModeValue('rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.7)');
    const textColor = "white";
    const bgColor = useColorModeValue('white', 'gray.800');

    return (
        <Box>
            {/* Hero Section */}
            <Box position="relative" height="60vh">
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgImage="/images/company/company.jpg"
                    bgPosition="center"
                    bgSize="cover"
                    _after={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: overlayBg,
                    }}
                />

                {/* Hero Content */}
                <Container maxW="4xl" height="100%" position="relative">
                    <VStack
                        spacing={6}
                        align="center"
                        color={textColor}
                        height="100%"
                        justify="center"
                    >
                        <Heading
                            as="h1"
                            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                            textAlign="center"
                        >
                            会社概要<br />
                            COMPANY OVERVIEW
                        </Heading>
                        <Text
                            fontSize={{ base: "lg", md: "xl" }}
                            textAlign="center"
                            maxW="2xl"
                        >
                            テクノロジーの力で、日本のビジネスの未来を創造する
                        </Text>
                    </VStack>
                </Container>
            </Box>
        </Box>
    );
}   
