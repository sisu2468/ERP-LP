import {
    Alert,
    AlertIcon,
    Box,
    Container,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    useColorMode,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function BasicFlowSection() {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const headingColor = useColorModeValue('gray.800', 'white');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const accentColor = useColorModeValue('orange.500', 'orange.300');
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const headingRef = useRef(null);
    const stepsRef = useRef(null);
    const noteRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(headingRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        gsap.fromTo(stepsRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.2,
                scrollTrigger: {
                    trigger: stepsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        gsap.fromTo(noteRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.4,
                scrollTrigger: {
                    trigger: noteRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const steps = [
        {
            icon: "/svg/svg2.svg",
            title: "無料相談",
            description: "まずはオンラインでの無料相談からスタート。ご予算、ご希望、現在の状況やお悩みについて丁寧にヒアリングを行い、ご要望の複雑さを踏まえたお見積もりをご案内いたします。",
        },
        {
            icon: "/svg/svg3.svg",
            title: "開発開始",
            description: "お支払いが確認でき次第、制作を開始いたします。LP・Webアプリともに、お客様のご希望に沿った形で進行し、進捗はSlackやメールなど、ご希望の連絡手段で定期的にご報告いたします。",
        },
        {
            icon: "/svg/svg4.svg",
            title: "公開・デプロイ",
            description: "制作が完了次第、公開作業までしっかり対応いたします。ドメイン設定やホスティング、SEO対策などもすべてお任せください。あなたのビジョンを、世界へ。私たちがカタチにします。",
        }
    ];

    return (
        <Box py={16} bg={bgColor} transition="background-color 0.2s">
            <Container maxW="7xl">
                <VStack spacing={12}>
                    <VStack spacing={4} textAlign="center" maxW="3xl" mx="auto">
                        <Heading
                            ref={headingRef}
                            as="h2"
                            size="xl"
                            color={headingColor}
                        >
                            基本的な流れ
                        </Heading>
                    </VStack>

                    <SimpleGrid
                        ref={stepsRef}
                        columns={{ base: 1, md: 3 }}
                        spacing={8}
                        w="full"
                    >
                        {steps.map((step, index) => (
                            <Box
                                key={index}
                                p={8}
                                bg={cardBg}
                                borderRadius="xl"
                                border="1px"
                                borderColor={borderColor}
                                textAlign="center"
                                position="relative"
                                boxShadow="0 4px 20px rgba(0,0,0,0.08)"
                                _hover={{
                                    transform: 'translateY(-4px)',
                                    shadow: '0 20px 40px rgba(0,0,0,0.12)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <VStack spacing={6}>
                                    <Box
                                        position="absolute"
                                        top={-4}
                                        left="50%"
                                        transform="translateX(-50%)"
                                        w={8}
                                        h={8}
                                        borderRadius="full"
                                        bg={accentColor}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        color="white"
                                        fontWeight="bold"
                                        fontSize="sm"
                                        boxShadow="0 4px 12px rgba(0,0,0,0.15)"
                                    >
                                        {index + 1}
                                    </Box>

                                    <Box
                                        position="relative"
                                        mt={4}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Image
                                            src={step.icon}
                                            alt={step.title}
                                            width={320}
                                            height={180}
                                            style={{
                                                filter: colorMode === 'dark' ? 'brightness(0) invert(1)' : 'none',
                                                opacity: 0.8
                                            }}
                                        />
                                    </Box>
                                    <Heading
                                        as="h3"
                                        size="lg"
                                        color={headingColor}
                                    >
                                        {step.title}
                                    </Heading>

                                    <Text
                                        color={textColor}
                                        lineHeight="1.8"
                                        fontSize="md"
                                    >
                                        {step.description}
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>

                    <Box
                        ref={noteRef}
                        w="full"
                        maxW="4xl"
                        mx="auto"
                    >
                        <Alert
                            status="info"
                            variant="subtle"
                            flexDirection="column"
                            alignItems="flex-start"
                            justifyContent="center"
                            textAlign="left"
                            height="auto"
                            p={6}
                            borderRadius="lg"
                            bg={useColorModeValue('blue.50', 'blue.900')}
                            color={useColorModeValue('blue.800', 'blue.200')}
                            border="1px solid"
                            borderColor={useColorModeValue('blue.200', 'blue.700')}
                        >
                            <HStack spacing={3} mb={3}>
                                <AlertIcon boxSize="20px" />
                                <Text fontWeight="bold" fontSize="lg">
                                    ご注意事項
                                </Text>
                            </HStack>
                            <Text fontSize="md" lineHeight="1.6">
                                ※ 開発期間中に、制作の大半が進行いたします。修正対応は、初回ヒアリング時にご相談いただいた内容の範囲内で対応いたします。
                                <br /><br />
                                ご契約後の追加相談や再ヒアリングには、別途費用を頂戴する場合がございますので、あらかじめご了承ください。
                            </Text>
                        </Alert>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
} 