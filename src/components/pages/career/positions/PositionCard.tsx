'use client'

import { getColors } from "@/constant/colorenum";
import { VStack, Box, Text, Heading, HStack, Icon, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdLocationOn, MdTimer } from "react-icons/md";

interface Position {
    title: string;
    category: string;
    categoryJa: string;
    categoryColor: string;
    description: string;
    location: string;
    type: string;
    experience?: string;
}

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

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
            staggerChildren: 0.1,
            delayChildren: 0.2
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

const childVariants = {
    hidden: { 
        opacity: 0,
        y: 20
    },
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

const buttonVariants = {
    hover: {
        x: 5,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

export default function PositionCard({ position, index }: { position: Position, index: number }) {
    const { colorMode } = useColorMode();
    const { bgColor1, headingColor, textColor, cardBg, borderColor } = getColors(colorMode);

    return (
        <MotionBox
            as="article"
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="xl"
            p={6}
            cursor="pointer"
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
                bg: position.categoryColor,
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
            <VStack align="stretch" spacing={4} position="relative" zIndex={1}>
                <Box>
                    <MotionText
                        variants={childVariants}
                        display="inline-block"
                        px={3}
                        py={1}
                        bg={position.categoryColor}
                        color="white"
                        fontSize="sm"
                        fontWeight="medium"
                        borderRadius="full"
                        mb={2}
                    >
                        {position.categoryJa}
                    </MotionText>
                    <MotionHeading
                        variants={childVariants}
                        as="h3"
                        fontSize="xl"
                        fontWeight="bold"
                        color={headingColor}
                        mb={2}
                    >
                        {position.title}
                        {position.experience && (
                            <Text
                                as="span"
                                ml={2}
                                fontSize="md"
                                color="gray.500"
                            >
                                【{position.experience}】
                            </Text>
                        )}
                    </MotionHeading>
                    <MotionText
                        variants={childVariants}
                        color={textColor}
                        fontSize="md"
                        mb={4}
                        minH="3em"
                    >
                        {position.description}
                    </MotionText>
                </Box>

                <MotionBox variants={childVariants}>
                    <HStack spacing={4} color={textColor}>
                        <HStack spacing={1}>
                            <Icon as={MdLocationOn} />
                            <Text fontSize="sm">{position.location}</Text>
                        </HStack>
                        <HStack spacing={1}>
                            <Icon as={MdTimer} />
                            <Text fontSize="sm">{position.type}</Text>
                        </HStack>
                    </HStack>
                </MotionBox>

                <MotionBox
                    as="button"
                    variants={buttonVariants}
                    whileHover="hover"
                    mt={2}
                    color={position.categoryColor}
                    fontWeight="medium"
                    display="flex"
                    alignItems="center"
                    _hover={{
                        textDecoration: "underline"
                    }}
                >
                    詳しく見る <Text as="span" ml={1}>→</Text>
                </MotionBox>
            </VStack>
        </MotionBox>
    );
}