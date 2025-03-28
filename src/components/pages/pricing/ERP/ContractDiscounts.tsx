import { Badge, Heading, Text, VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { getColors } from '@/constant/colorenum';
import { useColorMode } from '@chakra-ui/react';

const contractDiscounts = [
    { period: '1ヶ月', discount: 0 },
    { period: '3ヶ月', discount: 5 },
    { period: '12ヶ月', discount: 10 }
];

const MotionBox = motion(Box);
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

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.6
        }
    }
};

export default function ContractDiscounts() {
    const { colorMode } = useColorMode();
    const { headingColor, textColor, cardBg, borderColor } = getColors(colorMode);

    return (
        <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <VStack spacing={6} align="stretch">
                <Heading size="lg" color={headingColor}>契約期間と割引体系</Heading>
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
                            bg={cardBg}
                            borderRadius="xl"
                            boxShadow="md"
                            borderWidth="1px"
                            borderColor={borderColor}
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
                    variants={textVariants}
                    color={textColor}
                    fontSize="sm"
                    mt={2}
                >
                    ※ 全モジュールパッケージ契約の場合、上記割引に加えてさらに5%の割引を適用
                </MotionText>
            </VStack>
        </MotionBox>
    );
}