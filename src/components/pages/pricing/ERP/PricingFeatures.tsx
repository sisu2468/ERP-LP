'use client';

import { getColors } from '@/constant/colorenum';
import {
    Box,
    Grid,
    Heading,
    HStack,
    Icon,
    Text,
    useColorMode,
    VStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdAccessTime, MdInfo, MdPeople, MdStar, MdSwapHoriz } from 'react-icons/md';

const MotionBox = motion(Box);

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

const features = [
    {
        icon: MdPeople,
        title: 'ユーザー数の変更',
        description: '追加はいつでも可能。削減は毎月の契約更新日に変更可能。',
        color: 'blue.400'
    },
    {
        icon: MdSwapHoriz,
        title: 'プラン変更',
        description: 'アップグレードはいつでも可能。ダウングレードは契約期間満了時に可能。',
        color: 'purple.400'
    },
    {
        icon: MdAccessTime,
        title: 'モジュール追加・削除',
        description: '追加はいつでも可能。削除は契約期間満了時に可能。データは90日間保持。',
        color: 'orange.400'
    },
    {
        icon: MdStar,
        title: 'LTV向上施策',
        description: '契約更新時の割引特典、新規顧客紹介で1ヶ月分無料クレジット。',
        color: 'green.400'
    }
];

export default function PricingFeatures() {
    const { colorMode } = useColorMode();
    const { headingColor, textColor, cardBg, borderColor } = getColors(colorMode);

    return (
        <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <VStack spacing={8} align="stretch">
                <Heading size="lg" color={headingColor}>追加機能と特典</Heading>

                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={6}
                >
                    {features.map((feature, index) => (
                        <MotionBox
                            key={index}
                            variants={itemVariants}
                            bg={cardBg}
                            p={6}
                            borderRadius="xl"
                            borderWidth="1px"
                            borderColor={borderColor}
                            _hover={{
                                transform: 'translateY(-5px)',
                                boxShadow: 'lg',
                                transition: 'all 0.3s'
                            }}
                        >
                            <HStack spacing={4} align="start">
                                <Icon
                                    as={feature.icon}
                                    w={8}
                                    h={8}
                                    color={feature.color}
                                    flexShrink={0}
                                />
                                <VStack align="start" spacing={2}>
                                    <Text
                                        fontSize="lg"
                                        fontWeight="bold"
                                        color={headingColor}
                                    >
                                        {feature.title}
                                    </Text>
                                    <Text
                                        color={textColor}
                                        fontSize="sm"
                                    >
                                        {feature.description}
                                    </Text>
                                </VStack>
                            </HStack>
                        </MotionBox>
                    ))}
                </Grid>

                <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor={borderColor}
                >
                    <HStack spacing={4}>
                        <Icon as={MdInfo} w={6} h={6} color="orange.400" />
                        <Text color={textColor}>
                            基本プラットフォーム料金（5,000円/月）と追加ユーザー料金（3,000円/ユーザー/月）が別途必要です。
                        </Text>
                    </HStack>
                </Box>
            </VStack>
        </MotionBox>
    );
} 