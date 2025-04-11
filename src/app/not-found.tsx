'use client';

import { Box, Container, Heading, Text, VStack, Image, Button } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import SLink from '@/components/SLink';

export default function NotFound() {
    const headingColor = useColorModeValue('gray.800', 'white');
    const textColor = useColorModeValue('gray.600', 'gray.300');

    return (
        <Container maxW="container.xl" py={8}>
            <VStack spacing={8} align="center" justify="center">
                <Box 
                    position="relative" 
                    w={{ base: "200px", md: "300px", lg: "500px" }}
                    h={{ base: "200px", md: "300px", lg: "500px" }}
                >
                    <Image
                        src="/contentblocks/main/contentimage_main4.png"
                        alt="404 Error"
                        width={500}
                        height={500}
                        style={{
                            objectFit: 'contain',
                        }}
                    />
                </Box>
                <Heading 
                    as="h1" 
                    size="2xl" 
                    color={headingColor}
                    textAlign="center"
                >
                    404
                </Heading>
                <VStack>
                    <Text 
                        color={textColor} 
                        textAlign="center"
                        fontSize="lg"
                        fontWeight="medium"
                    >
                        申し訳ありません。お探しのページは見つかりませんでした。
                    </Text>
                    <Text 
                        color={textColor} 
                        textAlign="center"
                        fontSize="md"
                    >
                        現在、ウェブサイトは構築中です。<br />
                        近日中に新しいコンテンツが追加される予定です。
                    </Text>
                </VStack>
                <SLink href="/">
                    <Button
                        colorScheme="orange"
                        size="lg"
                        mt={4}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg'
                        }}
                    >
                        ホームページへ戻る
                    </Button>
                </SLink>
            </VStack>
        </Container>
    );
} 