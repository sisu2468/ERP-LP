import { getColors } from "@/constant/colorenum";
import { Box, Button, Grid, HStack, Text, useColorMode, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import PricingCard from "./PricingCard";

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

const contractPeriods = [
    { period: '1ヶ月', discount: 0 },
    { period: '3ヶ月', discount: 5 },
    { period: '1年間', discount: 10 }
];

const pricingPackages = [
    {
        name: '人事向け',
        price: 20000,
        features: ['従業員管理', '経費管理', 'タイムシート', '会計管理'],
        color: 'blue.400'
    },
    {
        name: '会計向け',
        price: 30000,
        features: ['従業員管理', '顧客管理', '会計管理', '請求書管理', '在庫管理'],
        color: 'purple.400'
    },
    {
        name: '営業向け',
        price: 35000,
        features: ['従業員管理', '顧客管理', '販売管理', '営業管理', '請求書管理', '在庫管理'],
        color: 'orange.400'
    },
    {
        name: '全モジュール',
        price: 60000,
        features: ['すべてのモジュール', 'カスタマイズ対応', '優先サポート'],
        color: 'green.400',
        popular: true
    }
];

export default function ModulePricing() {
    const { colorMode } = useColorMode();
    const { textColor } = getColors(colorMode);
    const [selectedPeriod, setSelectedPeriod] = useState(0);

    const getDiscountedPrice = (basePrice: number) => {
        const discount = contractPeriods[selectedPeriod].discount;
        return basePrice * (1 - discount / 100);
    };

    return (
        <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <VStack spacing={8} align="stretch">
                <HStack spacing={4} justify="center">
                    {contractPeriods.map((period, index) => (
                        <Button
                            key={index}
                            onClick={() => setSelectedPeriod(index)}
                            bg={selectedPeriod === index ? "black" : "gray.200"}
                            color={selectedPeriod === index ? "white" : "black"}
                            _hover={{
                                bg: selectedPeriod === index ? "blackAlpha.800" : "gray.300"
                            }}
                            _dark={{
                                bg: selectedPeriod === index ? "white" : "gray.600",
                                color: selectedPeriod === index ? "black" : "white",
                                _hover: {
                                    bg: selectedPeriod === index ? "whiteAlpha.800" : "gray.500"
                                }
                            }}
                            borderRadius="full"
                            px={6}
                        >
                            {period.period}
                        </Button>
                    ))}
                </HStack>

                <Text fontSize="sm" color={textColor} textAlign="center">
                    ※ パッケージ料金のみ割引対象となります。追加ユーザー料金(¥3,000/ユーザー/月)は割引対象外です。
                </Text>

                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
                    gap={6}
                >
                    {pricingPackages.map((pkg, index) => (
                        <PricingCard
                            key={index}
                            package={{
                                ...pkg,
                                price: getDiscountedPrice(pkg.price),
                                originalPrice: pkg.price,
                                discount: contractPeriods[selectedPeriod].discount
                            }}
                            index={index}
                        />
                    ))}
                </Grid>
            </VStack>
        </MotionBox>
    );
}