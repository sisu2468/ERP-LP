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

const MotionBox = motion(Box);

interface PricingPackage {
    name: string;
    price: number;
    features: string[];
    color: string;
    popular?: boolean;
}

interface PricingCardProps {
    package: PricingPackage;
    index: number;
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1,
            delay: 0.1
        }
    },
    hover: {
        y: -10,
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
    const { cardBg, headingColor, textColor, borderColor } = getColors(colorMode);

    return (
        <MotionBox
            as="article"
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="xl"
            p={6}
            position="relative"
            overflow="hidden"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 'xl',
                bg: pkg.color,
                opacity: 0,
                transition: 'opacity 0.3s',
                zIndex: 0
            }}
            _hover={{
                _before: {
                    opacity: 0.05
                }
            }}
        >
            <Flex h="100%" direction={{ base: "row", md: "column" }} justify="space-between">
                <Flex direction="column" gap={4}>
                    <Box textAlign="center">
                        <Flex justify="center" gap={2}>
                            <Text
                                fontSize="xl"
                                fontWeight="bold"
                                color={headingColor}
                                mb={2}
                            >
                                {pkg.name}
                            </Text>
                            {pkg.popular && (
                                <Badge
                                    colorScheme="orange"
                                    mb={3}
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                >
                                    おすすめ
                                </Badge>
                            )}
                        </Flex>
                        <Text
                            fontSize="3xl"
                            fontWeight="bold"
                            color={pkg.color}
                            mb={2}
                        >
                            ¥{pkg.price.toLocaleString()}
                            <Text as="span" fontSize="md" color={textColor}>/月</Text>
                        </Text>
                    </Box>

                    <List spacing={3}>
                        {pkg.features.map((feature, idx) => (
                            <ListItem
                                key={idx}
                                as={motion.li}
                                variants={listItemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={index * 0.1 + idx * 0.05}
                            >
                                <HStack spacing={2}>
                                    <ListIcon as={MdCheck} color={pkg.color} />
                                    <Text color={textColor} fontSize="sm">{feature}</Text>
                                </HStack>
                            </ListItem>
                        ))}
                    </List>
                </Flex>
                <Button
                    colorScheme={pkg.color.split('.')[0]}
                    size="lg"
                    mt={4}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                        transition: 'all 0.2s'
                    }}
                >
                    詳細を見る
                </Button>
            </Flex>
        </MotionBox>
    );
} 