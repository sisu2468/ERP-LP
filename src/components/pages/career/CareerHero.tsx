'use client';

import { Box, Container, Heading, Text, VStack, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

export default function CareerHero() {
    const textColor = useColorModeValue('white', 'white');
    const overlayColor = useColorModeValue(
        'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))',
        'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))'
    );
    const lineWidth = useBreakpointValue({ base: "300px", md: "580px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
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
                damping: 20,
                duration: 0.8
            }
        }
    };

    return (
        <Box
            position="relative"
            height={{ base: "50vh", md: "50vh" }}
            width="100%"
            overflow="hidden"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: overlayColor,
                zIndex: 1
            }}
        >
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                backgroundImage="url('/images/career/career.jpg')"
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundAttachment="fixed"
                filter="brightness(0.9)"
                as={MotionBox}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
            />

            <Container
                maxW="7xl"
                height="100%"
                position="relative"
                zIndex={2}
            >
                <VStack
                    as={motion.div}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    height="100%"
                    justify="center"
                    align="center"
                >
                    <VStack align="center" spacing={3}>
                        <MotionHeading
                            variants={textVariants}
                            fontSize={{ base: "4xl", md: "6xl" }}
                            fontWeight="bold"
                            color={textColor}
                            letterSpacing="wide"
                            lineHeight="shorter"
                        >
                            採用 CAREERS
                        </MotionHeading>
                        <MotionText
                            variants={textVariants}
                            fontSize={{ base: "xl", md: "2xl" }}
                            color={textColor}
                            maxW="2xl"
                            lineHeight="tall"
                        >
                            サインタと共に、ビジネスに革新を、世界に刺激を
                        </MotionText>
                    </VStack>

                    <MotionBox
                        variants={textVariants}
                        width={lineWidth}
                        height="4px"
                        bg="orange.400"
                        initial={{ width: 0 }}
                        animate={{ width: lineWidth }}
                        transition={{ delay: 1, duration: 0.8 }}
                    />
                </VStack>
            </Container>
        </Box>
    );
}