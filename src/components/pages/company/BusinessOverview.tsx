'use client';

import { Box, Circle, Container, Flex, Heading, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const MotionCircle = motion(Circle);

export default function BusinessOverview() {
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const circlesRef = useRef(null);

    const bgColor = useColorModeValue('gray.100', 'gray.900');
    const textColor = useColorModeValue('gray.700', 'gray.100');
    const subheadingColor = useColorModeValue('gray.700', 'gray.100');
    const circleColor = useColorModeValue('orange.150', 'orange.600');
    const circleTextColor = useColorModeValue('white', 'white');

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
            gsap.fromTo(headingRef.current,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Text animation
            gsap.fromTo(textRef.current,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Circles animation
            gsap.fromTo(circlesRef.current,
                {
                    opacity: 0,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    delay: 0.4,
                    ease: "elastic.out(1, 0.5)",
                    scrollTrigger: {
                        trigger: circlesRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <Box py={20} bg={bgColor} overflow="hidden">
            <Container maxW="8xl">
                <VStack spacing={16} align="start" w="full">
                    <VStack align="start" spacing={4} ref={headingRef} w="full">
                        <Heading
                            as="h2"
                            fontSize={{ base: "4xl", md: "5xl" }}
                            fontWeight="bold"
                            color="orange.500"
                        >
                            事業概要
                        </Heading>
                        <Text
                            fontSize={{ base: "2xl", md: "3xl" }}
                            fontWeight="bold"
                            color={subheadingColor}
                        >
                            BUSINESS OVERVIEW
                        </Text>
                    </VStack>

                    <Flex 
                        direction={{ base: "column", lg: "row" }} 
                        gap={{ base: 16, lg: 10 }} 
                        w="full"
                        justify="space-between"
                    >
                        <Box 
                            ref={textRef} 
                            flex="1"
                            maxW={{ lg: "50%" }}
                        >
                            <Text
                                fontSize={{ base: "lg", md: "xl" }}
                                color={textColor}
                                lineHeight="tall"
                                mb={6}
                            >
                                デジタル化が急速に進む現代の日本において、多くの企業が複雑なテクノロジー導入の壁に直面しています。株式会社サインタは、この課題に対する革新的な解決策を提供します。
                            </Text>
                            <Text
                                fontSize={{ base: "lg", md: "xl" }}
                                color={textColor}
                                lineHeight="tall"
                                mb={6}
                            >
                                私たちは、テクノロジーをより使いやすく、理解しやすくすることで、企業の真の潜在能力を引き出します。日本の市場では、現行のERPシステムは限られた選択肢しか提供しておらず、多くの企業のニーズに応えられていません。
                            </Text>
                            <Text
                                fontSize={{ base: "lg", md: "xl" }}
                                color={textColor}
                                lineHeight="tall"
                            >
                                サインタは、この市場の空白を埋めるソリューションを開発し、複雑さを犠牲にすることなく業務を簡素化します。これにより創出された時間的余裕は、従業員がより戦略的で創造的なタスクに専念できる環境へと変わります。私たちは、テクノロジーが人間の可能性を拡張し、ビジネスの持続的成長を実現する触媒となることを確信しています。
                            </Text>
                        </Box>

                        <Box
                            ref={circlesRef}
                            position="relative"
                            flex="1"
                            minH={{ base: "380px", sm: "400px", md: "450px" }}
                            minW={{ base: "300px", sm: "350px", md: "450px" }}
                            maxW={{ base: "100%", lg: "500px" }}
                            mx="auto"
                            mt={{ base: 8, lg: 0 }}
                        >
                            <MotionCircle
                                position="absolute"
                                size={{ base: "180px", sm: "200px", md: "220px" }}
                                bg={circleColor}
                                top={{ base: "-20px", md: "0" }}
                                left="25%"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                style={{ mixBlendMode: 'multiply' }}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="flex-start"
                                pt={{ base: 8, md: 10 }}
                                zIndex={2}
                            >
                                <Text
                                    color={circleTextColor}
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    fontWeight="bold"
                                    textShadow="0 2px 4px rgba(0,0,0,0.3)"
                                >
                                    使い勝手
                                </Text>
                            </MotionCircle>

                            <MotionCircle
                                position="absolute"
                                size={{ base: "180px", sm: "200px", md: "220px" }}
                                bg={circleColor}
                                bottom={{ base: "130px", md: "120px", lg: "230px", xl: "130px" }}
                                left={{ base: "0", sm: "10%", md: "11%", lg: "13%", xl: "15%" }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                style={{ mixBlendMode: 'multiply' }}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="flex-end"
                                pb={{ base: 8, md: 10 }}
                                zIndex={2}
                            >
                                <Text
                                    color={circleTextColor}
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    fontWeight="bold"
                                    textShadow="0 2px 4px rgba(0,0,0,0.3)"
                                >
                                    最新技術
                                </Text>
                            </MotionCircle>

                            <MotionCircle
                                position="absolute"
                                size={{ base: "180px", sm: "200px", md: "220px" }}
                                bg={circleColor}
                                bottom={{ base: "130px", md: "120px", lg: "230px", xl: "130px" }}
                                right={{ base: "0", sm: "10%", md: "11%", lg: "13%", xl: "15%" }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                style={{ mixBlendMode: 'multiply' }}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="flex-end"
                                pb={{ base: 8, md: 10 }}
                                zIndex={2}
                            >
                                <Text
                                    color={circleTextColor}
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    fontWeight="bold"
                                    textShadow="0 2px 4px rgba(0,0,0,0.3)"
                                >
                                    コスト効率
                                </Text>
                            </MotionCircle>

                            <Box
                                position="absolute"
                                top={{ base: "33%", md: "38%", lg: "32%", xl: "40%" }}
                                left="50%"
                                transform="translate(-50%, -50%)"
                                zIndex={3}
                                borderRadius="full"
                                p={2}
                            >
                                <Image
                                    src="/logos/sainta-hakuchou-white.png"
                                    alt="Sainta Logo"
                                    width={{ base: "35px", sm: "40px", md: "45px" }}
                                    height={{ base: "30px", sm: "40px", md: "40px" }}
                                />
                            </Box>
                        </Box>
                    </Flex>
                </VStack>
            </Container>
        </Box>
    );
} 