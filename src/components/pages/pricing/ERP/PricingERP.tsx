'use client';

import { getColors } from '@/constant/colorenum';
import {
    Box,
    Container,
    Grid,
    Heading,
    Text,
    useBreakpointValue,
    useColorMode,
    VStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ContractDiscounts from './ContractDiscounts';
import PricingCalculator from './PricingCalculator';
import PricingCard from './PricingCard';
import PricingFeatures from './PricingFeatures';
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

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

const headingVariants = {
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

const pricingPackages = [
    {
        name: '人事向け',
        price: 20000,
        description: '従業員管理・経費管理・タイムシート・会計管理',
        features: ['従業員管理', '経費管理', 'タイムシート', '会計管理'],
        color: 'blue.400'
    },
    {
        name: '会計向け',
        price: 30000,
        description: '従業員管理・顧客管理・会計管理・請求書・在庫',
        features: ['従業員管理', '顧客管理', '会計管理', '請求書', '在庫管理'],
        color: 'purple.400'
    },
    {
        name: '営業向け',
        price: 35000,
        description: '従業員管理・顧客管理・販売・営業管理・請求書・在庫管理',
        features: ['従業員管理', '顧客管理', '販売管理', '営業管理', '請求書', '在庫管理'],
        color: 'orange.400'
    },
    {
        name: '全モジュール',
        price: 60000,
        description: 'すべてのモジュールを含む',
        features: ['すべてのモジュール', 'カスタマイズ対応', '優先サポート'],
        color: 'green.400',
        popular: true
    }
];

export default function PricingERP() {
    const { colorMode } = useColorMode();
    const { bgColor, headingColor, textColor } = getColors(colorMode);
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box py={16} bg={bgColor}>
            <Container maxW={{ base: "xl", md: "6xl" }}>
                <VStack spacing={12} align="stretch">
                    <VStack spacing={6} textAlign="center">
                        <MotionHeading
                            as="h1"
                            fontSize={{ base: "3xl", md: "4xl" }}
                            fontWeight="bold"
                            color="orange.500"
                            variants={headingVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            サインタ ERP プラン
                        </MotionHeading>
                        <MotionText
                            color={textColor}
                            fontSize={{ base: "lg", md: "xl" }}
                            maxW="3xl"
                            variants={headingVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            企業のニーズに合わせて柔軟にカスタマイズできる総合的なERPソリューション
                        </MotionText>
                    </VStack>

                    <MotionBox
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Grid
                            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
                            gap={6}
                        >
                            {pricingPackages.map((pkg, index) => (
                                <PricingCard key={index} package={pkg} index={index} />
                            ))}
                        </Grid>
                    </MotionBox>

                    <ContractDiscounts />

                    <PricingFeatures />

                    <PricingCalculator />
                </VStack>
            </Container>
        </Box>
    );
} 