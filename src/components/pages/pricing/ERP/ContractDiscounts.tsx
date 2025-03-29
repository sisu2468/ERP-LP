'use client';

import { Badge, Heading, Text, VStack, Button, HStack, IconButton } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { getColors } from '@/constant/colorenum';
import { useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiRepeat } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionText = motion(Text);

interface PriceDetails {
    monthly: number;
    total: number;
    savings: number;
}

const BASE_PRICE = 60000; // All modules package price
const USER_PRICE = 3000;  // Price per additional user

const contractDiscounts = [
    {
        period: '1ヶ月',
        discount: 0,
        billingPeriod: 1,
        prices: {
            monthly: BASE_PRICE,
            total: BASE_PRICE,
            savings: 0
        }
    },
    {
        period: '3ヶ月',
        discount: 5,
        billingPeriod: 3,
        prices: {
            monthly: BASE_PRICE * 0.95,
            total: BASE_PRICE * 0.95 * 3,
            savings: BASE_PRICE * 0.05 * 3
        }
    },
    {
        period: '12ヶ月',
        discount: 10,
        billingPeriod: 12,
        prices: {
            monthly: BASE_PRICE * 0.90,
            total: BASE_PRICE * 0.90 * 12,
            savings: BASE_PRICE * 0.10 * 12
        }
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    },
    hover: {
        y: -5,
        scale: 1.02,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

const priceVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0,
        scale: 0.8
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25
        }
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 100 : -100,
        opacity: 0,
        scale: 0.8
    })
};

export default function ContractDiscounts() {
    const { colorMode } = useColorMode();
    const { headingColor, textColor, cardBg, borderColor } = getColors(colorMode);
    const [selectedPeriod, setSelectedPeriod] = useState(0);
    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection: number) => {
        const newIndex = (selectedPeriod + newDirection + contractDiscounts.length) % contractDiscounts.length;
        setPage([page + newDirection, newDirection]);
        setSelectedPeriod(newIndex);
    };

    return (
        <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <VStack spacing={8} align="stretch">
                <Heading size="lg" color={headingColor}>契約期間と割引体系</Heading>
                <VStack spacing={6} align="center" position="relative">
                    <HStack spacing={4} justify="center">
                        {contractDiscounts.map((discount, index) => (
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
                                {discount.period}
                            </Button>
                        ))}
                    </HStack>

                    <Box position="relative" width="300px" height="120px" mt={4}>
                        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                            <MotionBox
                                key={page}
                                custom={direction}
                                variants={priceVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                position="absolute"
                                width="100%"
                                textAlign="center"
                            >
                                <VStack spacing={3}>
                                    <Text fontSize="4xl" fontWeight="bold" color={headingColor}>
                                        ¥{Math.floor(contractDiscounts[selectedPeriod].prices.total).toLocaleString()}
                                        <Text as="span" fontSize="xl" color={textColor}>
                                            /年
                                        </Text>
                                    </Text>
                                    {contractDiscounts[selectedPeriod].prices.savings > 0 && (
                                        <Badge
                                            colorScheme="green"
                                            fontSize="md"
                                            px={3}
                                            py={1}
                                            borderRadius="full"
                                            bg="green.100"
                                            color="green.700"
                                        >
                                            年間 ¥{Math.floor(contractDiscounts[selectedPeriod].prices.savings).toLocaleString()} お得！
                                        </Badge>
                                    )}
                                </VStack>
                            </MotionBox>
                        </AnimatePresence>
                    </Box>
                </VStack>

                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                    gap={6}
                >
                    {contractDiscounts.map((discount, index) => (
                        <MotionBox
                            key={index}
                            variants={cardVariants}
                            whileHover="hover"
                            p={6}
                            borderRadius="xl"
                            boxShadow={selectedPeriod === index ? "xl" : "md"}
                            borderWidth="1px"
                            borderColor={selectedPeriod === index ? "orange.200" : borderColor}
                            bg={selectedPeriod === index ? "orange.50" : cardBg}
                            cursor="pointer"
                            onClick={() => setSelectedPeriod(index)}
                            _dark={{
                                bg: selectedPeriod === index ? "gray.800" : cardBg,
                                borderColor: selectedPeriod === index ? "white" : borderColor
                            }}
                        >
                            <VStack spacing={3} align="center">
                                <Text fontSize="xl" fontWeight="bold" color={headingColor}>
                                    {discount.period}
                                </Text>
                                <Badge
                                    colorScheme={discount.discount > 0 ? 'green' : 'gray'}
                                    fontSize="md"
                                    px={3}
                                    py={1}
                                    bg={discount.discount > 0 ? "green.100" : "gray.100"}
                                    color={discount.discount > 0 ? "green.700" : "gray.600"}
                                    borderRadius="full"
                                >
                                    {discount.discount > 0 ? `${discount.discount}%割引` : '標準料金'}
                                </Badge>
                            </VStack>
                        </MotionBox>
                    ))}
                </Grid>

                <MotionText
                    variants={cardVariants}
                    color={textColor}
                    fontSize="sm"
                    textAlign="center"
                >
                    ※ 全モジュールパッケージ契約の場合、上記割引に加えてさらに5%の割引を適用
                </MotionText>
            </VStack>
        </MotionBox>
    );
}