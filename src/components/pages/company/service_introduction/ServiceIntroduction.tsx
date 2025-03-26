'use client';

import { Box, Container, Flex, Heading, VStack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ServiceCard } from "./ServiceCard";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function ServiceIntroduction() {
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.900', 'gray.100');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                {
                    opacity: 0,
                    y: 30,
                    scale: 0.95
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <Box bg={bgColor} py={{ base: 12, md: 20 }} overflow="hidden">
            <Container maxW="8xl">
                <VStack spacing={{ base: 10, md: 16 }} align="start">
                    <motion.div
                        ref={headingRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        <VStack align="start" spacing={2} w="full">
                            <Heading
                                as="h2"
                                fontSize={{ base: "3xl", md: "5xl" }}
                                fontWeight="bold"
                                color="orange.500"
                                letterSpacing="wide"
                            >
                                事業紹介
                            </Heading>
                            <Heading
                                as="h3"
                                fontSize={{ base: "2xl", md: "4xl" }}
                                fontWeight="bold"
                                color={textColor}
                            >
                                SERVICE INTRODUCTION
                            </Heading>
                        </VStack>
                    </motion.div>

                    <MotionFlex
                        ref={cardsRef}
                        direction={{ base: "column", lg: "row" }}
                        gap={{ base: 6, md: 8 }}
                        w="full"
                        align="stretch"
                    >
                        <ServiceCard
                            title="ERPソフトウェア"
                            subtitle="サインタ・コア"
                            description="会計管理、人事管理、顧客管理などのビジネス機能を統合した次世代ERPプラットフォーム。直感的なインターフェースと柔軟な拡張性により、あらゆる規模の企業に最適なソリューションを提供します。"
                            iconType="erp"
                            index={0}
                        />
                        <ServiceCard
                            title="ウェブデザインサービス"
                            subtitle="サインタ・ラボ"
                            description="企業のブランドアイデンティティと戦略目標に合わせた、カスタムデジタルエクスペリエンスを創造します。戦略立案からデザイン、開発、そして実装まで、一貫したサービスを提供します。"
                            iconType="web"
                            index={1}
                        />
                        <ServiceCard
                            title="専門家ネットワーク・提携サービス"
                            subtitle="サインタ・コネクト"
                            description="法務、会計、マーケティングなど、各分野の専門家とのネットワークを活用し、クライアントのビジネス課題に対して包括的なソリューションを提供します。"
                            iconType="network"
                            index={2}
                        />
                    </MotionFlex>
                </VStack>
            </Container>
        </Box>
    );
} 