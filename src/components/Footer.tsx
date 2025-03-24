'use client';

import {
    Box,
    Container,
    SimpleGrid,
    Stack,
    Text,
    Link,
    Icon,
    HStack,
    Divider,
    Image,
    Flex,
} from '@chakra-ui/react';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    return (
        <Box bg="white" py={10} borderTop="1px solid #E0E0E0">
            <Container maxW="7xl">
                <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
                    <Stack spacing={4}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.900">
                            サインタ株式会社
                        </Text>
                        <HStack align="flex-start">
                            <Icon as={FaMapMarkerAlt} mt={1} />
                            <Text fontSize="sm">
                                〒108-0073<br />
                                東京都港区三田1丁目3-40 606号室<br />
                            </Text>
                        </HStack>
                        <HStack>
                            <Icon as={FaPhone} />
                            <Text fontSize="sm">
                                <Link href="tel:+8109029138411">+81 090-2913-8411</Link>
                            </Text>
                        </HStack>
                        <HStack>
                            <Icon as={FaEnvelope} />
                            <Text fontSize="sm">
                                <Link href="mailto:support@sainta.co.jp">support@sainta.co.jp</Link>
                            </Text>
                        </HStack>
                    </Stack>

                    <Stack spacing={4}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.900">
                            会社情報
                        </Text>
                        <Link href="/about" fontSize="sm">会社概要</Link>
                        <Link href="/privacy" fontSize="sm">プライバシーポリシー</Link>
                        <Link href="/terms" fontSize="sm">利用規約</Link>
                        <Link href="/contact" fontSize="sm">お問い合わせ</Link>
                    </Stack>

                    <Stack spacing={4}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.900">
                            サービス
                        </Text>
                        <Link href="/services" fontSize="sm">ERPシステム</Link>
                        <Link href="/signta-lab" fontSize="sm">サインタラボ</Link>
                        <Link href="/signta-connect" fontSize="sm">サインタ・コネクト</Link>
                    </Stack>

                    <Stack spacing={4}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.900">
                            SNS
                        </Text>
                        <HStack spacing={4}>
                            <Link href="https://twitter.com" isExternal>
                                <Icon as={FaTwitter} w={5} h={5} />
                            </Link>
                            <Link href="https://facebook.com" isExternal>
                                <Icon as={FaFacebook} w={5} h={5} />
                            </Link>
                            <Link href="https://linkedin.com" isExternal>
                                <Icon as={FaLinkedin} w={5} h={5} />
                            </Link>
                            <Link href="https://instagram.com" isExternal>
                                <Icon as={FaInstagram} w={5} h={5} />
                            </Link>
                        </HStack>
                    </Stack>
                </SimpleGrid>

                <Divider my={8} />
                <Flex justifyContent="center" alignItems="center" textAlign="center" gap={4}>
                    <Text fontSize="sm">
                        © {new Date().getFullYear()} サインタ株式会社. All rights reserved.
                    </Text>
                    <Image
                        src="/logos/sainta-hakuchou.png"
                        alt="サインタ株式会社"
                        width="30px"
                        height="auto"
                        alignItems="center"
                        display="inline-block"
                    />
                </Flex>
            </Container>
        </Box>
    );
} 