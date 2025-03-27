'use client';

import { Box, Container, Heading, SimpleGrid, VStack, useColorModeValue } from "@chakra-ui/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import CompanyMission from "./CompanyMission";
import CompanyValues from "./CompanyValues";
import CompanyVision from "./CompanyVision";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CompanyMVV() {
    const headingRef = useRef(null);
    const gridRef = useRef(null);
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const accentColor = useColorModeValue('orange.500', 'orange.300');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                {
                    opacity: 0,
                    y: 30
                },
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

            gsap.fromTo(gridRef.current,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <Box py={16} bg={bgColor} transition="background-color 0.2s">
            <Container maxW="8xl">
                <VStack spacing={16}>
                    <Heading
                        ref={headingRef}
                        as="h2"
                        fontSize={{ base: "3xl", md: "4xl" }}
                        textAlign="center"
                        bgGradient={`linear(to-r, ${accentColor}, ${useColorModeValue('orange.600', 'orange.400')})`}
                        bgClip="text"
                    >
                        ミッション・ビジョン・バリュー
                    </Heading>
                    <Box w="full" ref={gridRef}>
                        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
                            <CompanyMission />
                            <CompanyVision />
                        </SimpleGrid>
                        <CompanyValues />
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}
