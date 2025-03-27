'use client';

import { Box, Flex, Heading, List, ListIcon, ListItem, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import ServiceIcon from "../service_introduction/ServiceIcon";

interface StrengthPoint {
    title: string;
    description: string;
}

interface StrengthCardProps {
    title: string;
    subtitle: string;
    points: StrengthPoint[];
    iconType: 'erp' | 'web' | 'network';
    index?: number;
}

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);
const MotionListItem = motion(ListItem);

export const StrengthCard: React.FC<StrengthCardProps> = ({ title, subtitle, points, iconType, index = 0 }) => {
    const bgColor = useColorModeValue('gray.50', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const hoverBorderColor = useColorModeValue('orange.400', 'orange.500');
    const textColor = useColorModeValue('gray.800', 'gray.100');
    const subtitleColor = useColorModeValue('orange.500', 'orange.300');
    const descriptionColor = useColorModeValue('gray.600', 'gray.400');
    const iconColor = useColorModeValue('orange.500', 'orange.300');

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.2,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <MotionBox
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            bg={bgColor}
            p={{ base: 6, md: 8 }}
            borderRadius="2xl"
            border="1px solid"
            borderColor={borderColor}
            flex="1"
            position="relative"
            overflow="hidden"
            boxShadow="sm"
            whileHover={{
                y: -8,
                scale: 1.02,
                borderColor: hoverBorderColor,
                boxShadow: "xl",
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }
            }}
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--chakra-colors-orange-400), transparent)',
                opacity: 0,
                transition: '0.3s'
            }}
            _hover={{
                _before: {
                    opacity: 1
                }
            }}
        >
            <VStack align="start" spacing={6}>
                <MotionFlex
                    variants={contentVariants}
                    w="100%"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="4xl"
                    mb={2}
                    whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, -5, 0],
                        transition: {
                            duration: 0.5,
                            ease: "easeInOut"
                        }
                    }}
                >
                    <ServiceIcon type={iconType} />
                    <VStack align="start" spacing={2}>
                        <MotionHeading
                            variants={contentVariants}
                            as="h3"
                            fontSize={{ base: "xl", md: "2xl" }}
                            color={textColor}
                        >
                            {title}
                        </MotionHeading>
                        <MotionText
                            variants={contentVariants}
                            color={subtitleColor}
                            fontSize={{ base: "md", md: "lg" }}
                            fontWeight="bold"
                        >
                            {subtitle}
                        </MotionText>
                    </VStack>
                </MotionFlex>


                <List spacing={4} w="full">
                    {points.map((point, idx) => (
                        <MotionListItem
                            key={idx}
                            variants={contentVariants}
                            display="flex"
                            alignItems="flex-start"
                        >
                            <ListIcon
                                as={FiCheck}
                                color={iconColor}
                                boxSize={5}
                                mt={1}
                            />
                            <Box>
                                <Text
                                    color={textColor}
                                    fontSize={{ base: "md", md: "lg" }}
                                    fontWeight="semibold"
                                    mb={1}
                                >
                                    {point.title}
                                </Text>
                                <Text
                                    color={descriptionColor}
                                    fontSize={{ base: "sm", md: "md" }}
                                    lineHeight="tall"
                                >
                                    {point.description}
                                </Text>
                            </Box>
                        </MotionListItem>
                    ))}
                </List>
            </VStack>
        </MotionBox>
    );
}; 