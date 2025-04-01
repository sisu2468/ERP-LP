'use client';

import { getColors } from '@/constant/colorenum';
import {
    Box,
    Text,
    VStack,
    HStack,
    Badge,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorMode,
    Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdCheck } from 'react-icons/md';
import { FiCheck } from "react-icons/fi";

const MotionBox = motion(Box);

interface PricingPackage {
    name: string;
    price: number;
    originalPrice: number;
    features: string[];
    color: string;
    popular?: boolean;
    discount: number;
}

interface PricingCardProps {
    package: PricingPackage;
    index: number;
}

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

const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (delay: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay
        }
    })
};

export default function PricingCard({ package: pkg, index }: PricingCardProps) {
    const { colorMode } = useColorMode();
    const { headingColor, textColor, cardBg, borderColor } = getColors(colorMode);

    return (
        <MotionBox
            variants={cardVariants}
            whileHover="hover"
            p={6}
            borderRadius="xl"
            boxShadow="xl"
            borderWidth="1px"
            borderColor={pkg.popular ? pkg.color : borderColor}
            bg={cardBg}
            position="relative"
            overflow="hidden"
        >
            {pkg.popular && (
                <Badge
                    position="absolute"
                    top={4}
                    right={-8}
                    transform="rotate(45deg)"
                    px={8}
                    py={1}
                    bg={pkg.color}
                    color="white"
                >
                    おすすめ
                </Badge>
            )}

            <VStack spacing={4} align="stretch">
                <VStack spacing={2}>
                    <Text fontSize="xl" fontWeight="bold" color={headingColor}>
                        {pkg.name}
                    </Text>
                    <Box textAlign="center">
                        {pkg.discount > 0 && (
                            <Text
                                fontSize="sm"
                                textDecoration="line-through"
                                color="gray.500"
                            >
                                ¥{pkg.originalPrice.toLocaleString()}/月
                            </Text>
                        )}
                        <Text fontSize="3xl" fontWeight="bold" color={headingColor}>
                            ¥{Math.floor(pkg.price).toLocaleString()}
                            <Text as="span" fontSize="sm" color={textColor}>
                                /月
                            </Text>
                        </Text>
                        {pkg.discount > 0 && (
                            <Badge
                                colorScheme="green"
                                fontSize="sm"
                                px={2}
                                borderRadius="full"
                            >
                                {pkg.discount}% OFF
                            </Badge>
                        )}
                    </Box>
                </VStack>

                <List spacing={3}>
                    {pkg.features.map((feature, index) => (
                        <ListItem key={index} display="flex" alignItems="center">
                            <ListIcon as={FiCheck} color={pkg.color} />
                            <Text color={textColor}>{feature}</Text>
                        </ListItem>
                    ))}
                </List>
            </VStack>
        </MotionBox>
    );
} 