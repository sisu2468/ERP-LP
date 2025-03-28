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
    yearly: number;
    savings: number;
}

const contractDiscounts = [
    {
        period: '1ヶ月',
        discount: 0,
        prices: {
            monthly: 25000,
            yearly: 25000 * 12,
            savings: 0
        }
    },
    {
        period: '3ヶ月',
        discount: 5,
        prices: {
            monthly: 25000 * 0.95,
            yearly: 25000 * 0.95 * 12,
            savings: 25000 * 0.05 * 12
        }
    },
    {
        period: '12ヶ月',
        discount: 10,
        prices: {
            monthly: 25000 * 0.90,
            yearly: 25000 * 0.90 * 12,
            savings: 25000 * 0.10 * 12
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
    const [isYearly, setIsYearly] = useState(false);
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
                <VStack spacing={4} align="center" position="relative">
                    <Box
                        mt={4}
                        bg="gray.100"
                        p={1}
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        _dark={{ bg: "gray.700" }}
                    >
                        <Text
                            px={3}
                            py={1}
                            color={isYearly ? "orange.500" : "gray.500"}
                            fontWeight="medium"
                            fontSize="sm"
                            cursor="pointer"
                            onClick={() => setIsYearly(true)}
                            bg={isYearly ? "white" : "transparent"}
                            borderRadius="full"
                            _dark={{
                                color: isYearly ? "orange.200" : "gray.400",
                                bg: isYearly ? "gray.800" : "transparent"
                            }}
                            transition="all 0.2s"
                        >
                            年間
                        </Text>
                        <Text
                            px={3}
                            py={1}
                            color={!isYearly ? "orange.500" : "gray.500"}
                            fontWeight="medium"
                            fontSize="sm"
                            cursor="pointer"
                            onClick={() => setIsYearly(false)}
                            bg={!isYearly ? "white" : "transparent"}
                            borderRadius="full"
                            _dark={{
                                color: !isYearly ? "orange.200" : "gray.400",
                                bg: !isYearly ? "gray.800" : "transparent"
                            }}
                            transition="all 0.2s"
                        >
                            月間
                        </Text>
                    </Box>
                    <HStack spacing={4}>
                        <IconButton
                            aria-label="Previous period"
                            icon={<FiArrowLeft />}
                            onClick={() => paginate(-1)}
                            variant="ghost"
                            colorScheme="orange"
                        />

                        <Box position="relative" width="300px" height="80px">
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
                                    <VStack spacing={2}>
                                        <Text fontSize="3xl" fontWeight="bold" color={headingColor}>
                                            ¥{isYearly
                                                ? Math.floor(contractDiscounts[selectedPeriod].prices.yearly).toLocaleString()
                                                : Math.floor(contractDiscounts[selectedPeriod].prices.monthly).toLocaleString()
                                            }
                                            <Text as="span" fontSize="lg" color={textColor}>
                                                {isYearly ? '/年' : '/月'}
                                            </Text>
                                        </Text>
                                        {contractDiscounts[selectedPeriod].prices.savings > 0 && (
                                            <Badge colorScheme="green" fontSize="md">
                                                年間 ¥{Math.floor(contractDiscounts[selectedPeriod].prices.savings).toLocaleString()} お得！
                                            </Badge>
                                        )}
                                    </VStack>
                                </MotionBox>
                            </AnimatePresence>
                        </Box>

                        <IconButton
                            aria-label="Next period"
                            icon={<FiArrowRight />}
                            onClick={() => paginate(1)}
                            variant="ghost"
                            colorScheme="orange"
                        />
                    </HStack>

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
                            borderColor={selectedPeriod === index ? "orange.500" : borderColor}
                            bg={selectedPeriod === index ? "orange.50" : cardBg}
                            cursor="pointer"
                            onClick={() => setSelectedPeriod(index)}
                        >
                            <VStack spacing={3} align="center">
                                <Text fontSize="xl" fontWeight="bold" color={headingColor}>
                                    {discount.period}
                                </Text>
                                <Badge
                                    colorScheme={discount.discount > 0 ? 'green' : 'gray'}
                                    fontSize="lg"
                                    px={3}
                                    py={1}
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
                    mt={2}
                    textAlign="center"
                >
                    ※ 全モジュールパッケージ契約の場合、上記割引に加えてさらに5%の割引を適用
                </MotionText>
            </VStack>
        </MotionBox>
    );
}