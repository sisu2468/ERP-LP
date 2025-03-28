'use client';

import { getColors } from '@/constant/colorenum';
import {
    Box,
    Container,
    Grid,
    Heading,
    Text,
    useColorMode,
    VStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ContractDiscounts from './ContractDiscounts';
import PricingCalculator from './PricingCalculator';
import PricingCard from './PricingCard';
import PricingFeatures from './PricingFeatures';
import ModulePricing from './ModulePricing';

const MotionHeading = motion(Heading);
const MotionText = motion(Text);

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

export default function PricingERP() {
    const { colorMode } = useColorMode();
    const { bgColor1, textColor } = getColors(colorMode);

    return (
        <Box py={16} bg={bgColor1}>
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
                            サインタ・コア
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

                    <ModulePricing />

                    <PricingFeatures />

                    <PricingCalculator />
                </VStack>
            </Container>
        </Box>
    );
} 