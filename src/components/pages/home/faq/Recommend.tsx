'use client'

import SLink from "@/components/SLink";
import { Box, Button, Flex, Heading, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { getColors } from "@/constant/colorenum";
import { useColorMode } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export default function Recommend() {
    const { colorMode } = useColorMode();
    const { headingColor, textColor } = getColors(colorMode);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const handleSignupClick = (e: React.MouseEvent) => {
        if (window.innerWidth < 425) {
            e.preventDefault();
            toast({
                title: 'お知らせ',
                description: 'ノートパソコンやパソコンからご利用ください。',
                status: 'info',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    return (
        <VStack spacing={6} pt={8} pb={4}>
            <Heading as="h3" fontSize="2xl" color={headingColor} textAlign="center">
                今すぐ始めよう！
            </Heading>
            <Flex
                gap={4}
                direction={{ base: 'column', sm: 'column', md: 'row' }}
            >
                <SLink href="#" onClick={handleSignupClick}>
                    <Button
                        colorScheme="orange"
                        size="lg"
                        px={8}
                        w={{ base: '100%', sm: '100%', md: '280px' }}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg'
                        }}
                    >
                        無料で試す（14日間無料）
                    </Button>
                </SLink>
                <SLink href="/compare">
                    <Button
                        variant="outline"
                        colorScheme="orange"
                        size="lg"
                        px={8}
                        w={{ base: '100%', sm: '100%', md: '280px' }}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg'
                        }}
                    >
                        プランを比較する
                    </Button>
                </SLink>
            </Flex>
            <VStack spacing={2}>
                <Text color={textColor}>
                    💬 まだ迷っていますか？お気軽にお問い合わせください。
                </Text>
                <Button
                    variant="link"
                    colorScheme="blue"
                    onClick={onOpen}
                    _hover={{
                        textDecoration: 'none',
                        transform: 'translateY(-1px)'
                    }}
                >
                    お問い合わせフォーム
                </Button>
            </VStack>
        </VStack>
    );
}   
