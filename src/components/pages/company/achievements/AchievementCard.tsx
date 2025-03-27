'use client';

import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ServiceIcon from "../service_introduction/ServiceIcon";

interface AchievementCardProps {
    title: string;
    description: string;
    iconType: 'erp' | 'web' | 'network';
    index?: number;
}

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export const AchievementCard: React.FC<AchievementCardProps> = ({ title, description, iconType, index = 0 }) => {
    const bgColor = useColorModeValue('white', 'whiteAlpha.100');
    const borderColor = useColorModeValue('whiteAlpha.200', 'whiteAlpha.200');
    const textColor = useColorModeValue('gray.500', 'white');
    const descriptionColor = useColorModeValue('gray.500', 'gray.300');

    const cardVariants = {
        hidden: { opacity: 0, x: -50, y: 20 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.2
            }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: (index * 0.2) + 0.3
            }
        },
        hover: {
            scale: 1.2,
            rotate: [0, -10, 10, -10, 0],
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: (index * 0.2) + 0.4
            }
        }
    };

    return (
        <MotionBox
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            w="full"
            bg={bgColor}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            p={6}
            position="relative"
            overflow="hidden"
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                opacity: 0,
                transition: '0.3s'
            }}
            _hover={{
                _before: {
                    opacity: 1
                }
            }}
        >
            <MotionFlex align="center" gap={6}>
                <Box
                    as={motion.div}
                    variants={iconVariants}
                    whileHover="hover"
                >
                    <ServiceIcon type={iconType} />
                </Box>
                <Box
                    as={motion.div}
                    variants={contentVariants}
                    flex="1"
                >
                    <Text
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="bold"
                        color={textColor}
                        mb={2}
                    >
                        {title}
                    </Text>
                    <Text
                        fontSize={{ base: "sm", md: "md" }}
                        color={descriptionColor}
                        lineHeight="tall"
                    >
                        {description}
                    </Text>
                </Box>
            </MotionFlex>
        </MotionBox>
    );
}; 