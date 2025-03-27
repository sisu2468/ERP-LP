'use client';
import { Container, Heading, HStack, useColorModeValue, VStack, Text, Box, List, ListItem, ListIcon } from "@chakra-ui/react";
import { FiCircle } from "react-icons/fi";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";

export default function CompanyProfile() {
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.100', 'gray.700');
    const accentColor = useColorModeValue('orange.500', 'orange.300');
    const cardBg = useColorModeValue('gray.50', 'gray.900');
    const glowColor = useColorModeValue('orange.50', 'rgba(251, 146, 60, 0.15)');
    const textColor = useColorModeValue('gray.700', 'white');

    const sectionRef = useRef(null);
    const cardRef = useRef(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Heading animation
        gsap.fromTo(sectionRef.current,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Card animation
        gsap.fromTo(cardRef.current,
            {
                opacity: 0,
                scale: 0.95,
                y: 30
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Items stagger animation
        itemRefs.current.forEach((item, index) => {
            gsap.fromTo(item,
                {
                    opacity: 0,
                    x: -20
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    delay: 0.3 + (index * 0.1),
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, []);

    return (
        <Box
            bg={bgColor}
            id="company"
            position="relative"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bg: `linear-gradient(180deg, ${glowColor} 0%, transparent 100%)`,
                opacity: 0.6,
                pointerEvents: 'none'
            }}
        >
            <Container maxW="5xl" py={16} position="relative">
                <VStack spacing={16} align="stretch">
                    <Box ref={sectionRef}>
                        <VStack spacing={2} mb={12}>
                            <Heading
                                as="h2"
                                size="lg"
                                textAlign="center"
                                fontSize={{ base: "3xl", md: "4xl" }}
                                color={accentColor}
                                bgGradient={`linear(to-r, ${accentColor}, orange.400)`}
                                bgClip="text"
                            >
                                会社概要
                            </Heading>
                            <Text
                                color="gray.500"
                                fontSize={{ base: "xl", md: "2xl" }}
                                letterSpacing="wider"
                            >
                                COMPANY PROFILE
                            </Text>
                        </VStack>

                        <VStack
                            ref={cardRef}
                            spacing={6}
                            align="start"
                            borderRadius="xl"
                            borderWidth="1px"
                            borderColor={borderColor}
                            p={8}
                            bg={cardBg}
                            boxShadow="xl"
                            transition="all 0.3s"
                            _hover={{
                                boxShadow: '2xl',
                                transform: 'translateY(-2px)',
                            }}
                        >
                            {[
                                { label: "会社名", content: <Text fontSize="lg" color={textColor}>株式会社サインタ</Text> },
                                { label: "所在地", content: <Text color={textColor}>東京都港区三⽥1丁⽬3-406F[606]</Text> },
                                {
                                    label: "代表", content: (
                                        <VStack align="start" spacing={1}>
                                            <Text color={textColor}>サンタナム理志(CEO)</Text>
                                            <Text color={textColor}>望⽉佑樹(COO)</Text>
                                        </VStack>
                                    )
                                },
                                { label: "メンバー", content: <Text color={textColor}>3名</Text> }
                            ].map((item, index) => (
                                <HStack
                                    key={item.label}
                                    ref={el => {
                                        if (el) itemRefs.current[index] = el;
                                    }}
                                    spacing={8}
                                    w="full"
                                    py={4}
                                    borderBottomWidth="1px"
                                    borderColor={borderColor}
                                >
                                    <Text
                                        fontWeight="bold"
                                        minW="120px"
                                        color={accentColor}
                                        bgGradient={`linear(to-r, ${accentColor}, orange.400)`}
                                        bgClip="text"
                                    >
                                        {item.label}
                                    </Text>
                                    {item.content}
                                </HStack>
                            ))}

                            <HStack
                                spacing={8}
                                w="full"
                                py={4}
                                alignItems="flex-start"
                                ref={el => {
                                    if (el) itemRefs.current[4] = el;
                                }}
                            >
                                <Text
                                    fontWeight="bold"
                                    minW="120px"
                                    color={accentColor}
                                    bgGradient={`linear(to-r, ${accentColor}, orange.400)`}
                                    bgClip="text"
                                >
                                    事業内容
                                </Text>
                                <List spacing={3}>
                                    {[
                                        "ERPソフトウェア『サインタ・コア』",
                                        "カスタムウェブデザインサービス『サインタ・ラボ』",
                                        "専⾨家ネットワーク・提携サービス『サインタ・コネクト』"
                                    ].map((service, index) => (
                                        <ListItem
                                            key={index}
                                            display="flex"
                                            alignItems="center"
                                            transition="all 0.3s"
                                            _hover={{
                                                color: accentColor,
                                                transform: 'translateX(4px)'
                                            }}
                                        >
                                            <ListIcon
                                                as={FiCircle}
                                                color={accentColor}
                                                fontSize="xs"
                                            />
                                            <Text color={textColor}>{service}</Text>
                                        </ListItem>
                                    ))}
                                </List>
                            </HStack>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}