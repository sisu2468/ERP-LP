'use client';

import { Box, Flex, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface DescriptionCardProps {
    title: string;
    description1: string;
    description2: string;
    imgsrc: string;
    imgstatus: boolean;
    imgalt: string;
    imgdirection?: boolean;
}

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);
const MotionImage = motion(Image);
const MotionFlex = motion(Flex);

export const DescriptionCard: React.FC<DescriptionCardProps> = ({ title, description1, description2, imgsrc, imgstatus, imgalt, imgdirection }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const hoverBorderColor = useColorModeValue('orange.400', 'orange.500');
    const textColor = useColorModeValue('gray.800', 'gray.100');
    const descriptionColor = useColorModeValue('gray.600', 'gray.400');

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, x: imgdirection ? 20 : -20 },
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

    const imageVariants = {
        hidden: { opacity: 0, x: imgdirection ? -20 : 20, scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
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
                y: -4,
                scale: 1.01,
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
            <MotionFlex 
                gap={10} 
                flexDirection={{ base: "column", md: !imgdirection ? "row" : "row-reverse" }} 
                w="full" 
                alignItems="center"
            >
                <Box w={{ base: "full", md: imgstatus ? "40%" : "60%" }}>
                    <MotionHeading
                        variants={contentVariants}
                        as="h3"
                        fontSize={{ base: "2xl", md: "3xl" }}
                        color={textColor}
                        mb={6}
                    >
                        {title}
                    </MotionHeading>
                    <MotionText
                        variants={contentVariants}
                        color={descriptionColor}
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="bold"
                        mb={8}
                    >
                        {description1}
                    </MotionText>
                    <MotionText
                        variants={contentVariants}
                        color={descriptionColor}
                        fontSize={{ base: "md", md: "lg" }}
                        lineHeight="tall"
                    >
                        {description2}
                    </MotionText>
                </Box>
                <MotionFlex 
                    variants={imageVariants}
                    w={{ base: "full", md: imgstatus ? "60%" : "40%" }} 
                    justifyContent="flex-end" 
                    mt={{ base: 8, md: 4 }}
                >
                    <MotionImage 
                        borderRadius="lg" 
                        src={imgsrc} 
                        alt={imgalt} 
                        w="full" 
                        h={420}
                        whileHover={{
                            scale: 1.02,
                            transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }
                        }}
                    />
                </MotionFlex>
            </MotionFlex>
        </MotionBox>
    );
};