'use client';

import { culturePoints } from "@/constant/career/enum";
import { Box, Container, Grid, GridItem, Heading, VStack, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import CultureCard from "./CultureCard";
import { getColors } from "@/constant/colorenum";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const MotionHeading = motion(Heading);

export default function CompanyCulture() {
    const { colorMode } = useColorMode();
    const colors = getColors(colorMode);

    const headingRef = useRef<HTMLDivElement>(null);
    const underlineRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(underlineRef.current,
                { width: 0 },
                {
                    width: "230px",
                    duration: 0.8,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: underlineRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            if (cardsRef.current && cardsRef.current.children) {
                gsap.fromTo(cardsRef.current.children,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.9
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <Box bg={colors.bgColor} py={{ base: 16, md: 24 }}>
            <Container maxW="7xl">
                <VStack spacing={16} align="stretch">
                    <VStack spacing={4} align="center" ref={headingRef}>
                        <MotionHeading
                            fontSize={{ base: "3xl", md: "4xl" }}
                            fontWeight="bold"
                            color="orange.500"
                            textAlign="center"
                        >
                            文化ポイント
                        </MotionHeading>
                        <Box
                            ref={underlineRef}
                            height="4px"
                            bg={colors.accentColor}
                            width="230px"
                            borderRadius="full"
                        />
                    </VStack>

                    <Grid
                        ref={cardsRef}
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                        gap={8}
                    >
                        {culturePoints.map((point, index) => (
                            <GridItem
                                key={index}
                                colSpan={index === culturePoints.length - 1 ? { base: 1, md: 2 } : 1}
                            >
                                <CultureCard
                                    index={index}
                                    cardBg={colors.cardBg}
                                    borderColor={colors.borderColor}
                                    point={point}
                                />
                            </GridItem>
                        ))}
                    </Grid>
                </VStack>
            </Container>
        </Box>
    );
} 