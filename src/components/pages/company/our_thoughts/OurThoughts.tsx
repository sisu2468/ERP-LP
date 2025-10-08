'use client';

import { Box, Container, Heading, Text, VStack, Button, useDisclosure } from "@chakra-ui/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import InquiryModal from '@/components/common/InquiryModal';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function OurThoughts() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const quoteRef = useRef(null);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);
    const ctaRef = useRef(null);
    const principleRef = useRef(null);
    const [hoveredWord, setHoveredWord] = useState<string | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
            gsap.fromTo(headingRef.current,
                { opacity: 0, scale: 0.9, y: 60 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Quote animation
            gsap.fromTo(quoteRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Principle animation
            gsap.fromTo(principleRef.current,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: principleRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Text stagger animation
            if (textRefs.current.length > 0) {
                gsap.fromTo(textRefs.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: textRefs.current[0],
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // CTA animation
            gsap.fromTo(ctaRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const interactiveWords = [
        { text: "解放", color: "#e08e46", description: "無駄な作業からの解放" },
        { text: "創造", color: "#0891b2", description: "新しい未来を想像" },
        { text: "挑戦", color: "#059669", description: "新たな道を切り開く" }
    ];

    return (
        <>
            <Box
                ref={sectionRef}
                bg="#ffffff"
                py={{ base: 24, md: 32, lg: 40 }}
                position="relative"
                overflow="hidden"
            >
                {/* Minimal Background Gradient */}
                <Box
                    position="absolute"
                    top="0"
                    left="50%"
                    transform="translateX(-50%)"
                    w="100%"
                    h="50%"
                    bgGradient="radial(circle at 50% 0%, rgba(224, 142, 70, 0.03), transparent 70%)"
                    pointerEvents="none"
                />

                <Container maxW="7xl" position="relative" zIndex={1}>
                    <VStack spacing={{ base: 16, md: 24 }} align="center" w="full">
                        {/* Main Heading - Balanced Size */}
                        <VStack ref={headingRef} spacing={6} align="center" w="full" py={{ base: 8, md: 12 }}>
                            <Heading
                                fontSize={{ base: "4xl", md: "5xl", lg: "64px" }}
                                fontWeight="800"
                                color="#111111"
                                letterSpacing="-0.03em"
                                textAlign="center"
                                lineHeight="1.1"
                            >
                                テクノロジーで
                                <br />
                                {interactiveWords.map((word, idx) => (
                                    <Text
                                        key={idx}
                                        as="span"
                                        color={hoveredWord === word.text ? "#f4a460" : "#e08e46"}
                                        cursor="pointer"
                                        transition="all 0.3s"
                                        onMouseEnter={() => setHoveredWord(word.text)}
                                        onMouseLeave={() => setHoveredWord(null)}
                                        display="inline-block"
                                    >
                                        {word.text}
                                        {idx < interactiveWords.length - 1 && "、"}
                                    </Text>
                                ))}
                                する。
                            </Heading>
                            
                            {/* Hover Description */}
                            <Box h="32px">
                                {hoveredWord && (
                                    <Text
                                        fontSize={{ base: "md", md: "lg" }}
                                        color="#6e6e73"
                                        fontWeight="600"
                                        textAlign="center"
                                    >
                                        {interactiveWords.find(w => w.text === hoveredWord)?.description}
                                    </Text>
                                )}
                            </Box>
                        </VStack>

                        {/* Opening Statement */}
                        <Text
                            ref={quoteRef}
                            fontSize={{ base: "xl", md: "2xl", lg: "28px" }}
                            color="#111111"
                            textAlign="center"
                            lineHeight="1.8"
                            maxW="4xl"
                            fontWeight="500"
                        >
                            私たちサインタは、テクノロジーの真の価値は
                            <Text as="span" color="#e08e46" fontWeight="700">
                                人間の可能性を解放すること
                            </Text>
                            にあると信じています。
                        </Text>

                        {/* Principle Box - Balanced */}
                        <Box
                            ref={principleRef}
                            w="full"
                            maxW="5xl"
                            bg="linear-gradient(135deg, rgba(224, 142, 70, 0.08) 0%, rgba(224, 142, 70, 0.03) 100%)"
                            borderRadius="3xl"
                            p={{ base: 10, md: 16 }}
                            border="2px solid"
                            borderColor="rgba(224, 142, 70, 0.15)"
                            position="relative"
                            overflow="hidden"
                            _hover={{
                                borderColor: "rgba(224, 142, 70, 0.3)",
                                transform: "translateY(-4px)"
                            }}
                            transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                            boxShadow="0 4px 32px rgba(224, 142, 70, 0.08)"
                        >
                            {/* Decorative Circle */}
                            <Box
                                position="absolute"
                                top="-40%"
                                right="-15%"
                                w="500px"
                                h="500px"
                                borderRadius="full"
                                bg="radial-gradient(circle, rgba(224, 142, 70, 0.1), transparent 70%)"
                                pointerEvents="none"
                            />
                            
                            <VStack spacing={6} align="center" position="relative" zIndex={1}>
                                <Text
                                    fontSize={{ base: "3xl", md: "4xl", lg: "48px" }}
                                    fontWeight="800"
                                    color="#e08e46"
                                    textAlign="center"
                                    lineHeight="1.3"
                                    letterSpacing="-0.02em"
                                >
                                    具体的なことはテクノロジーに、
                                    <br />
                                    抽象的なことは人間に。
                                </Text>
                                <Text
                                    fontSize={{ base: "lg", md: "xl" }}
                                    color="#6e6e73"
                                    textAlign="center"
                                    lineHeight="1.8"
                                    maxW="3xl"
                                    fontWeight="500"
                                >
                                    この原則のもと、企業の日常業務を効率化し、
                                    イノベーションに集中できる環境を創造します。
                                </Text>
                            </VStack>
                        </Box>

                        {/* Main Content - Balanced */}
                        <VStack spacing={10} align="center" w="full" maxW="4xl" py={{ base: 8, md: 12 }}>
                            <Text
                                ref={(el) => { textRefs.current[0] = el; }}
                                fontSize={{ base: "xl", md: "2xl" }}
                                color="#111111"
                                lineHeight="1.8"
                                fontWeight="500"
                                textAlign="center"
                            >
                                日々の業務の煩雑さから解放された時、人は本来持っている
                                <Text as="span" color="#e08e46" fontWeight="700">
                                    創造性を発揮
                                </Text>
                                し、より大きな目標に向かって挑戦することができます。
                            </Text>

                            <Text
                                ref={(el) => { textRefs.current[1] = el; }}
                                fontSize={{ base: "xl", md: "2xl" }}
                                color="#111111"
                                lineHeight="1.8"
                                fontWeight="500"
                                textAlign="center"
                            >
                                経験豊富な起業家からこれから夢を追いかける方まで、すべてのビジネスパーソンに寄り添い、その挑戦を
                                <Text as="span" color="#e08e46" fontWeight="700">
                                    技術の力で支える
                                </Text>
                                ことが私たちの使命です。
                            </Text>
                        </VStack>

                        {/* お問い合わせ CTA - Balanced */}
                        <VStack
                            ref={ctaRef}
                            spacing={8}
                            w="full"
                            maxW="5xl"
                            py={{ base: 16, md: 20 }}
                        >
                            <VStack spacing={5} align="center">
                                <Heading
                                    fontSize={{ base: "3xl", md: "4xl", lg: "56px" }}
                                    fontWeight="800"
                                    color="#111111"
                                    textAlign="center"
                                    lineHeight="1.2"
                                    letterSpacing="-0.03em"
                                >
                                    私たちと共に、
                                    <br />
                                    新たな地平を切り拓きましょう。
                                </Heading>
                                <Text
                                    fontSize={{ base: "lg", md: "xl" }}
                                    color="#6e6e73"
                                    textAlign="center"
                                    maxW="2xl"
                                    lineHeight="1.8"
                                    fontWeight="500"
                                >
                                    無料相談で、あなたのビジネスの可能性を一緒に探りませんか。
                                </Text>
                            </VStack>

                            <Button
                                onClick={onOpen}
                                size="lg"
                                h="72px"
                                px={16}
                                bg="#e08e46"
                                color="white"
                                fontSize="xl"
                                fontWeight="700"
                                borderRadius="full"
                                boxShadow="0 6px 24px rgba(224, 142, 70, 0.3)"
                                _hover={{
                                    bg: "#d17d3a",
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 12px 40px rgba(224, 142, 70, 0.4)"
                                }}
                                _active={{
                                    transform: "translateY(-2px)"
                                }}
                                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                            >
                                お問い合わせ
                            </Button>

                            <Text
                                fontSize={{ base: "sm", md: "md" }}
                                color="#6e6e73"
                                textAlign="center"
                                fontWeight="500"
                            >
                                ✓ 初回相談無料　✓ オンライン対応可　✓ 24時間以内に返信
                            </Text>
                        </VStack>
                    </VStack>
                </Container>
            </Box>

            <InquiryModal isOpen={isOpen} onClose={onClose} />
        </>
    );
} 