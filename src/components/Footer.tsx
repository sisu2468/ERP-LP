'use client';

import {
    Box,
    Container,
    Divider,
    Flex,
    HStack,
    Icon,
    Image,
    Link,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return (
        <Box bg="white" py={10} borderTop="1px solid #E0E0E0">
            <Container maxW="7xl">
                <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
                    <Stack spacing={4} textAlign={{base: 'center', md: 'left'}}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.900">
                            株式会社サインタ
                        </Text>
                        <HStack align="flex-start" textAlign={{base: 'center', md: 'left'}}>
                            <Icon as={FaMapMarkerAlt} mt={1} />
                            <Text fontSize="sm">
                                〒108-0073<br />
                                東京都港区三田1丁目3-40 606号室<br />
                            </Text>
                        </HStack>
                        <HStack align="flex-start" textAlign={{base: 'center', md: 'left'}}>
                            <Icon as={FaPhone} />
                            <Text fontSize="sm">
                                <Link href="tel:+8109029138411">+81 090-2913-8411</Link>
                            </Text>
                        </HStack>
                        <HStack align="flex-start" textAlign={{base: 'center', md: 'left'}}>
                            <Icon as={FaEnvelope} />
                            <Text fontSize="sm">
                                <Link href="mailto:support@sainta.co.jp">support@sainta.co.jp</Link>
                            </Text>
                        </HStack>
                    </Stack>

                    <Stack spacing={4} textAlign={{base: 'center', md: 'left'}}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.900">
                            会社情報
                        </Text>
                        <Link href="/about" fontSize="sm" _hover={{textDecoration: 'underline', textDecorationColor: 'orange', cursor: 'pointer'}}>会社概要</Link>
                        <Link href="/privacy" fontSize="sm" _hover={{textDecoration: 'underline', textDecorationColor: 'orange', cursor: 'pointer'}}>プライバシーポリシー</Link>
                        <Link href="/terms" fontSize="sm" _hover={{textDecoration: 'underline', textDecorationColor: 'orange', cursor: 'pointer'}}>利用規約</Link>
                        <Link href="/contact" fontSize="sm" _hover={{textDecoration: 'underline', textDecorationColor: 'orange', cursor: 'pointer'}}>お問い合わせ</Link>
                    </Stack>

                    <Stack spacing={4} textAlign={{base: 'center', md: 'left'}}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.900">
                            サービス
                        </Text>
                        <Link href="/services" fontSize="sm" _hover={{textDecoration: 'underline', textDecorationColor: 'orange', cursor: 'pointer'}}>ERPシステム</Link>
                        <Link href="/signta-lab" fontSize="sm" _hover={{textDecoration: 'underline', textDecorationColor: 'orange', cursor: 'pointer'}}>サインタラボ</Link>
                        <Link href="/signta-connect" fontSize="sm" _hover={{textDecoration: 'underline', textDecorationColor: 'orange', cursor: 'pointer'}}>サインタ・コネクト</Link>
                    </Stack>

                    <Stack spacing={4} textAlign={{base: 'center', md: 'left'}}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.900">
                            SNS
                        </Text>
                        <HStack spacing={4} w={{base: '100%', md: 'auto'}} justifyContent={{base: 'center', md: 'flex-start'}} display={{base: 'flex', md: 'block'}}>
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
                        © {new Date().getFullYear()} 株式会社サインタ. All rights reserved.
                    </Text>
                    <Image
                        src="/logos/sainta-hakuchou.png"
                        alt="株式会社サインタ"
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