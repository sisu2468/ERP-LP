'use client';

import { Box, Container, Flex, Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AchievementCard } from "./AchievementCard";

const MotionBox = motion(Box);

const achievementsData = {
    notice: {
        title: "新設会社のため、今後の実績を構築していく予定です。",
        subtitle: "設立メンバーはそれぞれの分野で以下のような経験と実績を持っています："
    },
    achievements: [
        {
            title: "ERPシステム導入・最適化プロジェクト",
            description: "複数件の成功実績",
            iconType: "erp" as const
        },
        {
            title: "ウェブサイトとeコマース開発",
            description: "国内外の企業向けウェブサイトとeコマースプラットフォームの開発",
            iconType: "web" as const
        },
        {
            title: "スタートアップ支援",
            description: "テクノロジースタートアップのアクセラレーションと成長支援",
            iconType: "network" as const
        }
    ],
    conclusion: "私たちはこれらの経験を活かし、サインタの各サービスを通じて新たな成功事例を創出していきます。"
};

export default function Achievements() {
    const bgColor = useColorModeValue('gray.100', 'gray.900');
    const textColor = useColorModeValue('gray.900', 'white');
    const headingColor = useColorModeValue('orange.400', 'orange.300');
    const subTextColor = useColorModeValue('gray.500', 'gray.300');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 0.8
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 1
            }
        }
    };

    return (
        <Box
            bg={bgColor}
            py={{ base: 16, md: 24 }}
            position="relative"
            overflow="hidden"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
                opacity: 0.8,
                transition: '0.3s'
            }}
            _hover={{
                _before: {
                    opacity: 1,
                    transform: 'scale(1.1)'
                }
            }}
        >
            <Container maxW="8xl" position="relative">
                <VStack
                    as={motion.div}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    spacing={{ base: 12, md: 16 }}
                    align="start"
                >
                    <VStack align="center" spacing={2} w="full">
                        <Heading
                            as={motion.h2}
                            variants={titleVariants}
                            fontSize={{ base: "3xl", md: "4xl" }}
                            fontWeight="bold"
                            color={headingColor}
                            letterSpacing="wide"
                            mb={3}
                        >
                            各事業の実績
                        </Heading>
                        <Heading
                            as={motion.h3}
                            variants={titleVariants}
                            fontSize={{ base: "xl", md: "2xl" }}
                            fontWeight="bold"
                            color="gray.500"
                            letterSpacing="wide"
                        >
                            ACHIEVEMENTS
                        </Heading>
                    </VStack>

                    <VStack
                        as={motion.div}
                        variants={itemVariants}
                        spacing={6}
                        align="start"
                        w="full"
                        maxW="3xl"
                    >
                        <Text fontSize={{ base: "lg", md: "xl" }} color={textColor} fontWeight="bold">
                            {achievementsData.notice.title}
                        </Text>
                        <Text fontSize={{ base: "md", md: "lg" }} color={subTextColor}>
                            {achievementsData.notice.subtitle}
                        </Text>
                    </VStack>

                    <Flex w="full" gap={6} direction={{ base: "column", md: "column", lg: "row" }}>
                        {achievementsData.achievements.map((achievement, index) => (
                            <AchievementCard
                                key={index}
                                {...achievement}
                                index={index}
                            />
                        ))}
                    </Flex>

                    <Text
                        as={motion.p}
                        variants={itemVariants}
                        fontSize={{ base: "md", md: "lg" }}
                        color={subTextColor}
                    >
                        {achievementsData.conclusion}
                    </Text>
                </VStack>
            </Container>
        </Box>
    );
} 