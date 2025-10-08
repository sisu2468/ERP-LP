import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Text,
    VStack,
    Badge,
} from '@chakra-ui/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function BasicFlowSection() {
    const headingRef = useRef(null);
    const stepsRef = useRef(null);

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
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                delay: 0.2,
                scrollTrigger: {
                    trigger: stepsRef.current,
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
        <Box 
            py={{ base: 16, md: 24 }}
            bg="#fafafa"
            position="relative"
        >
            <Container maxW="7xl" position="relative" zIndex={1}>
                <VStack spacing={16}>
                    <VStack spacing={6} textAlign="center" maxW="3xl" mx="auto">
                        <Badge
                            px={4}
                            py={2}
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="600"
                            bg="rgba(224, 142, 70, 0.1)"
                            color="#e08e46"
                            border="1px solid"
                            borderColor="rgba(224, 142, 70, 0.2)"
                        >
                            シンプルな3ステップ
                        </Badge>
                        <Heading
                            ref={headingRef}
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl", lg: "52px" }}
                            fontWeight="600"
                            color="#111111"
                            letterSpacing="-0.02em"
                            lineHeight="1.1"
                        >
                            基本的な流れ
                        </Heading>
                    </VStack>

                    <SimpleGrid
                        ref={stepsRef}
                        columns={{ base: 1, md: 3 }}
                        spacing={6}
                        w="full"
                    >
                        {steps.map((step, index) => (
                            <Box
                                key={index}
                                p={8}
                                bg="white"
                                borderRadius="xl"
                                border="1px solid"
                                borderColor="#e5e7eb"
                                textAlign="center"
                                position="relative"
                                boxShadow="0 1px 3px rgba(0, 0, 0, 0.05)"
                                _hover={{
                                    borderColor: "rgba(224, 142, 70, 0.3)",
                                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
                                    transform: 'translateY(-4px)',
                                    transition: 'all 0.2s',
                                }}
                                transition="all 0.2s"
                            >
                                <VStack spacing={6}>
                                    <Box
                                        w={12}
                                        h={12}
                                        borderRadius="full"
                                        bg="rgba(224, 142, 70, 0.1)"
                                        border="2px solid"
                                        borderColor="#e08e46"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        color="#e08e46"
                                        fontWeight="700"
                                        fontSize="xl"
                                    >
                                        {index + 1}
                                    </Box>

                                    <Box
                                        position="relative"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        opacity={0.6}
                                    >
                                        <Image
                                            src={step.icon}
                                            alt={step.title}
                                            width={320}
                                            height={180}
                                        />
                                    </Box>
                                    
                                    <Heading
                                        as="h3"
                                        fontSize={{ base: "xl", md: "2xl" }}
                                        fontWeight="700"
                                        color="#111111"
                                    >
                                        {step.title}
                                    </Heading>

                                    <Text
                                        color="#6e6e73"
                                        lineHeight="1.8"
                                        fontSize="md"
                                    >
                                        {step.description}
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
}
