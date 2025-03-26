'use client';
import { Container, Heading, HStack, useColorModeValue, VStack, Text, Box, List, ListItem, ListIcon } from "@chakra-ui/react";
import { FiCircle } from "react-icons/fi";

export default function CompanyProfile() {
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.100', 'gray.700');
    const accentColor = useColorModeValue('orange.500', 'orange.300');

    return (
        <Box bg={bgColor} id="company">
            <Container maxW="5xl" py={16}>
                <VStack spacing={16} align="stretch">
                    <Box>
                        <VStack spacing={2} mb={12}>
                            <Heading
                                as="h2"
                                size="lg"
                                textAlign="center"
                                color={accentColor}
                            >
                                会社概要
                            </Heading>
                            <Text
                                fontSize="md"
                                color="gray.500"
                                letterSpacing="wider"
                            >
                                COMPANY PROFILE
                            </Text>
                        </VStack>

                        <VStack 
                            spacing={6} 
                            align="start"
                            borderRadius="xl"
                            borderWidth="1px"
                            borderColor={borderColor}
                            p={8}
                            bg={useColorModeValue('gray.50', 'gray.900')}
                        >
                            <HStack spacing={8} w="full" py={4} borderBottomWidth="1px" borderColor={borderColor}>
                                <Text fontWeight="bold" minW="120px" color={accentColor}>会社名</Text>
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="lg">株式会社サインタ</Text>
                                </VStack>
                            </HStack>

                            <HStack spacing={8} w="full" py={4} borderBottomWidth="1px" borderColor={borderColor}>
                                <Text fontWeight="bold" minW="120px" color={accentColor}>所在地</Text>
                                <Text>東京都港区三⽥1丁⽬3-406F[606]</Text>
                            </HStack>

                            <HStack spacing={8} w="full" py={4} borderBottomWidth="1px" borderColor={borderColor}>
                                <Text fontWeight="bold" minW="120px" color={accentColor}>代表</Text>
                                <VStack align="start" spacing={1}>
                                    <Text>サンタナム理志(CEO)</Text>
                                    <Text>望⽉佑樹(COO)</Text>
                                </VStack>
                            </HStack>

                            <HStack spacing={8} w="full" py={4} borderBottomWidth="1px" borderColor={borderColor}>
                                <Text fontWeight="bold" minW="120px" color={accentColor}>メンバー</Text>
                                <Text>3名</Text>
                            </HStack>

                            <HStack spacing={8} w="full" py={4} alignItems="flex-start">
                                <Text fontWeight="bold" minW="120px" color={accentColor}>事業内容</Text>
                                <List spacing={3}>
                                    <ListItem display="flex" alignItems="center">
                                        <ListIcon as={FiCircle} color={accentColor} fontSize="xs" />
                                        <Text>ERPソフトウェア『サインタ・コア』</Text>
                                    </ListItem>
                                    <ListItem display="flex" alignItems="center">
                                        <ListIcon as={FiCircle} color={accentColor} fontSize="xs" />
                                        <Text>カスタムウェブデザインサービス『サインタ・ラボ』</Text>
                                    </ListItem>
                                    <ListItem display="flex" alignItems="center">
                                        <ListIcon as={FiCircle} color={accentColor} fontSize="xs" />
                                        <Text>専⾨家ネットワーク・提携サービス『サインタ・コネクト』</Text>
                                    </ListItem>
                                </List>
                            </HStack>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}