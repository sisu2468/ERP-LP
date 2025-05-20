'use client';

import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import SLink from '@/components/SLink';
import Image from 'next/image';

export default function NotFound() {
    const headingColor = useColorModeValue('gray.800', 'white');
    const textColor = useColorModeValue('gray.600', 'gray.300');

    return (
        <Container maxW="container.xl" py={8}>
            <VStack spacing={6} align="center" justify="center">
                <Box 
                    position="relative" 
                    w="full"
                    maxW={{ base: "300px", md: "400px", lg: "500px" }}
                >
                    <Image
                        src="/contentblocks/404/contentimage_main4.png"
                        alt="404 Error"
                        layout="responsive"
                        width={500}
                        height={500}
                        style={{
                            objectFit: 'contain',
                        }}
                        priority
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
                <VStack spacing={2}>
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