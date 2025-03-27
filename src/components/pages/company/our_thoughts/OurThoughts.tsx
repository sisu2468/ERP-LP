'use client';

import { Box, Container, Flex, Heading, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";

const MotionText = motion(Text);
const MotionHeading = motion(Heading);
const MotionBox = motion(Box);
const MotionImage = motion(Image);

export default function OurThoughts() {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const textColor = useColorModeValue('gray.900', 'white');
    const accentColor = useColorModeValue('orange.400', 'orange.300');
    const headingColor = useColorModeValue('orange.500', 'orange.300');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15,
                duration: 1
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, x: 100 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 1.2,
                delay: 0.3
            }
        }
    };

    return (
        <Box
            bg={bgColor}
            py={{ base: 20, md: 32 }}
            position="relative"
            overflow="hidden"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
                opacity: 0.8,
                transition: '0.3s'
            }}
            _hover={{
                _before: {
                    opacity: 1,
                    transform: 'scale(1.1)'
                }
            }}
        >
            <Container maxW="7xl">
                <VStack
                    as={motion.div}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    spacing={{ base: 12, md: 16 }}
                    align="start"
                >
                    <VStack 
                        as={motion.div}
                        variants={titleVariants}
                        align="center" 
                        spacing={2} 
                        w="full"
                    >
                        <Heading
                            as={motion.h2}
                            fontSize={{ base: "3xl", md: "4xl" }}
                            fontWeight="bold"
                            color={headingColor}
                            letterSpacing="wide"
                            mb={3}
                            whileHover={{ scale: 1.05 }}
                        >
                            会社の想い
                        </Heading>
                        <Heading
                            as={motion.h3}
                            fontSize={{ base: "xl", md: "2xl" }}
                            fontWeight="bold"
                            color="gray.500"
                            letterSpacing="wider"
                            whileHover={{ scale: 1.05 }}
                        >
                            OUR THOUGHTS
                        </Heading>
                    </VStack>

                    <MotionHeading
                        variants={textVariants}
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="bold"
                        color={textColor}
                        lineHeight="tall"
                        whileHover={{ scale: 1.02 }}
                    >
                        テクノロジーで解放する、無限の創造力
                    </MotionHeading>

                    <Flex direction={{ base: "column", md: "row" }} gap={8}>
                        <VStack spacing={8} align="start" width={{ base: "100%", md: "50%" }}>
                            {[0, 1, 2].map((index) => (
                                <MotionText
                                    key={index}
                                    variants={textVariants}
                                    custom={index}
                                    fontSize={{ base: "lg", md: "xl" }}
                                    color={textColor}
                                    lineHeight="tall"
                                    whileHover={{ x: 10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {index === 0 && "私たちサインタは、テクノロジーの真の価値は⼈間の可能性を解放することにあると信じています。⽇々 の業務の煩雑さから解放された時、⼈は本来持っている創造性を発揮し、より⼤きな⽬標に向かって挑戦 することができます。"}
                                    {index === 1 && "「具体的なことはテクノロジーに、抽象的なことは⼈間に」̶ この原則のもと、私たちは企業の⽇常業務 を効率化し、イノベーションに集中できる環境を創造します。"}
                                    {index === 2 && "経験豊富な起業家からこれから夢を追いかける方まで、すべてのビジネスパーソンに寄り添い、その挑戦を技術の力で支えることが私たちの使命です。サインタは単なるサービスプロバイダーではなく、お客様の成功の旅に欠かせないパートナーとして、共に歩み続けます。経験豊富な起業家からこれから夢を追いかける⽅まで、すべてのビジネスパーソンに寄り添い、その挑戦 を技術の⼒で⽀えることが私たちの使命です。サインタは単なるサービスプロバイダーではなく、お客様 の成功の旅に⽋かせないパートナーとして、共に歩み続けます。"}
                                </MotionText>
                            ))}
                        </VStack>
                        <MotionBox
                            variants={imageVariants}
                            width={{ base: "100%", md: "50%" }}
                            borderRadius="lg"
                            overflow="hidden"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MotionImage
                                src="/images/company/thought/discussing.jpg"
                                alt="会社の想い"
                                w="full"
                                h="full"
                                objectFit="cover"
                                initial={{ scale: 1.1 }}
                                whileHover={{ scale: 1.15 }}
                                transition={{ duration: 0.4 }}
                            />
                        </MotionBox>
                    </Flex>

                    <MotionText
                        variants={textVariants}
                        fontSize={{ base: "xl", md: "2xl" }}
                        color={accentColor}
                        fontWeight="bold"
                        pt={4}
                        whileHover={{ scale: 1.05, x: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        私たちと共に、テクノロジーの⼒を借りて、あなたのビジネスの新たな地平を切り拓きましょう。
                    </MotionText>
                </VStack>
            </Container>
        </Box>
    );
} 