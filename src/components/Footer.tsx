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
    useColorMode,
    useColorModeValue,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaTwitter } from 'react-icons/fa';
import InquiryModal from './common/InquiryModal';

export default function Footer() {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('white', 'gray.900');
    const borderColor = useColorModeValue('#E0E0E0', 'gray.700');
    const headingColor = useColorModeValue('gray.900', 'white');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const linkColor = useColorModeValue('gray.600', 'gray.300');
    const iconColor = useColorModeValue('gray.600', 'gray.400');
    const dividerColor = useColorModeValue('gray.200', 'gray.700');
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box bg={bgColor} py={10} borderTop={`1px solid ${borderColor}`} transition="background-color 0.2s">
            <Container maxW="7xl">
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} justifyContent="space-between">
                    <Stack spacing={4} textAlign='left'>
                        <Text fontSize="lg" fontWeight="bold" color={headingColor}>
                            株式会社サインタ
                        </Text>
                        <HStack align="flex-start" textAlign='left' alignItems='flex-start' justifyContent='flex-start'>
                            <Icon as={FaMapMarkerAlt} mt={1} color={iconColor} />
                            <Flex flexDirection='column' alignItems='flex-start' justifyContent='flex-start'>
                                <Text fontSize="sm" color={textColor}>
                                    〒108-0073
                                </Text>
                                <Text fontSize="sm" color={textColor}>
                                    東京都港区三田１丁目3－40 6F
                                </Text>
                            </Flex>
                        </HStack>
                        <HStack align="flex-start" textAlign='left' alignItems='flex-start' justifyContent='flex-start'>
                            <Icon as={FaPhone} color={iconColor} />
                            <Text fontSize="sm" color={textColor}>
                                <Link href="tel:+8109029138411" color={linkColor} _hover={{ color: 'orange.500' }}>+81 03-5247-2777</Link>
                            </Text>
                        </HStack>
                        <HStack align="flex-start" textAlign={{ base: 'center', md: 'left' }} alignItems='flex-start' justifyContent='flex-start'>
                            <Icon as={FaEnvelope} color={iconColor} />
                            <Text fontSize="sm" color={textColor}>
                                <Link href="mailto:support@sainta.co.jp" color={linkColor} _hover={{ color: 'orange.500' }}>support@sainta.co.jp</Link>
                            </Text>
                        </HStack>
                    </Stack>

                    <Stack spacing={4} textAlign='left'>
                        <Text fontSize="lg" fontWeight="bold" color={headingColor}>
                            会社情報
                        </Text>
                        <Link href="/company" fontSize="sm" color={linkColor} _hover={{ color: 'orange.500' }}>会社概要</Link>
                        <Link href="/privacy" fontSize="sm" color={linkColor} _hover={{ color: 'orange.500' }}>プライバシーポリシー</Link>
                        <Link href="/terms" fontSize="sm" color={linkColor} _hover={{ color: 'orange.500' }}>利用規約</Link>
                        <Button
                            display="flex"
                            justifyContent="flex-start"
                            variant="link"
                            fontSize="sm"
                            fontWeight="light"
                            color={linkColor}
                            _hover={{ color: 'orange.500', textDecoration: 'none' }}
                            onClick={onOpen}
                            p={0}
                            h="auto"
                            textDecoration='none'
                        >
                            お問い合わせ
                        </Button>
                    </Stack>
                    <InquiryModal isOpen={isOpen} onClose={onClose} />

                    {/* <Stack spacing={4} textAlign='left'>
                        <Text fontSize="lg" fontWeight="bold" color={headingColor}>
                            サービス
                        </Text>
                        <Link href="/services" fontSize="sm" color={linkColor} _hover={{ color: 'orange.500' }}>ERPシステム</Link>
                        <Link href="/signta-lab" fontSize="sm" color={linkColor} _hover={{ color: 'orange.500' }}>サインタ・ラボ</Link>
                        <Link href="/signta-connect" fontSize="sm" color={linkColor} _hover={{ color: 'orange.500' }}>サインタ・コネクト</Link>
                    </Stack> */}

                    <Stack spacing={4} textAlign='left'>
                        <Text fontSize="lg" fontWeight="bold" color={headingColor}>
                            SNS
                        </Text>
                        <HStack spacing={4} w={{ base: '100%', md: 'auto' }} justifyContent='flex-start' display='flex'>
                            <Link href="https://twitter.com" isExternal>
                                <Icon as={FaTwitter} w={5} h={5} color={iconColor} _hover={{ color: 'blue.400' }} transition="color 0.2s" />
                            </Link>
                            <Link href="https://facebook.com" isExternal>
                                <Icon as={FaFacebook} w={5} h={5} color={iconColor} _hover={{ color: 'blue.600' }} transition="color 0.2s" />
                            </Link>
                            <Link href="https://linkedin.com" isExternal>
                                <Icon as={FaLinkedin} w={5} h={5} color={iconColor} _hover={{ color: 'blue.500' }} transition="color 0.2s" />
                            </Link>
                            <Link href="https://instagram.com" isExternal>
                                <Icon as={FaInstagram} w={5} h={5} color={iconColor} _hover={{ color: 'pink.500' }} transition="color 0.2s" />
                            </Link>
                        </HStack>
                    </Stack>
                </SimpleGrid>

                <Divider my={8} borderColor={dividerColor} />
                <Flex gap={4} justifyContent="center" alignItems="center">
                    <Text fontSize="sm" color={textColor}>
                        © {new Date().getFullYear()} 株式会社サインタ. All rights reserved.
                    </Text>
                    <Image
                        src={colorMode === 'light' ? "/logos/sainta-hakuchou.png" : "/logos/sainta-hakuchou-white.png"}
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