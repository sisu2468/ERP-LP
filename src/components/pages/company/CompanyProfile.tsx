'use client';
import { Box, Container, Heading, HStack, List, ListIcon, ListItem, Text, VStack, Badge } from "@chakra-ui/react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from "react";
import { FiCircle } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function CompanyProfile() {
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
                scale: 0.98,
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
        if (itemRefs.current.length > 0) {
            gsap.fromTo(itemRefs.current,
                {
                    opacity: 0,
                    x: -30
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <Box
            bg="white"
            id="company"
            position="relative"
            py={20}
        >
            <Container maxW="6xl" position="relative">
                <VStack spacing={16} align="stretch">
                    <Box ref={sectionRef}>
                        <VStack spacing={6} mb={16}>
                            <Badge
                                px={4}
                                py={2}
                                borderRadius="full"
                                fontSize="sm"
                                fontWeight="600"
                                bg="rgba(224, 142, 70, 0.1)"
                                color="#e08e46"
                                border="1px solid"
                                borderColor="rgba(224, 142, 70, 0.2)"
                            >
                                会社情報
                            </Badge>
                            <Heading
                                as="h2"
                                fontSize={{ base: "3xl", md: "4xl", lg: "48px" }}
                                textAlign="center"
                                color="#111111"
                                fontWeight="700"
                                letterSpacing="-0.02em"
                            >
                                会社概要
                            </Heading>
                            <Text
                                color="#6e6e73"
                                fontSize={{ base: "lg", md: "xl" }}
                                letterSpacing="0.1em"
                                fontWeight="600"
                            >
                                COMPANY PROFILE
                            </Text>
                        </VStack>

                        <VStack
                            ref={cardRef}
                            spacing={0}
                            align="stretch"
                            borderRadius="2xl"
                            borderWidth="1px"
                            borderColor="#e5e7eb"
                            overflow="hidden"
                            bg="white"
                            boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
                        >
                            {[
                                { label: "会社名", content: <Text fontSize="lg" color="#111111" fontWeight="500">株式会社サインタ</Text> },
                                { label: "所在地", content: <Text color="#111111" fontWeight="500">東京都港区三田１丁目3－40 6F</Text> },
                                {
                                    label: "代表", content: (
                                        <VStack align="start" spacing={1}>
                                            <Text color="#111111" fontWeight="500">サンタナム 理志 (CEO)</Text>
                                        </VStack>
                                    )
                                },
                                { label: "メンバー", content: <Text color="#111111" fontWeight="500">３名〜５名</Text> }
                            ].map((item, index) => (
                                <HStack
                                    key={item.label}
                                    ref={el => {
                                        if (el) itemRefs.current[index] = el;
                                    }}
                                    spacing={8}
                                    w="full"
                                    py={6}
                                    px={8}
                                    borderBottomWidth={index < 3 ? "1px" : "0"}
                                    borderColor="#f5f5f7"
                                    transition="all 0.3s"
                                    _hover={{
                                        bg: "#fafafa",
                                    }}
                                >
                                    <Text
                                        fontWeight="700"
                                        minW="120px"
                                        color="#e08e46"
                                        fontSize="md"
                                    >
                                        {item.label}
                                    </Text>
                                    <Box flex="1">
                                        {item.content}
                                    </Box>
                                </HStack>
                            ))}

                            <HStack
                                spacing={8}
                                w="full"
                                py={6}
                                px={8}
                                alignItems="flex-start"
                                ref={el => {
                                    if (el) itemRefs.current[4] = el;
                                }}
                                transition="all 0.3s"
                                _hover={{
                                    bg: "#fafafa",
                                }}
                            >
                                <Text
                                    fontWeight="700"
                                    minW="120px"
                                    color="#e08e46"
                                    fontSize="md"
                                >
                                    事業内容
                                </Text>
                                <List spacing={4} flex="1">
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
                                            color="#111111"
                                            fontWeight="500"
                                            _hover={{
                                                color: '#e08e46',
                                                transform: 'translateX(8px)'
                                            }}
                                        >
                                            <ListIcon
                                                as={FiCircle}
                                                color="#e08e46"
                                                fontSize="xs"
                                                mr={3}
                                            />
                                            {service}
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