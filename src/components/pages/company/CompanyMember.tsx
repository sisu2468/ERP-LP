'use client';

import { Box, Container, Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import MemberCard from "./MemberCard";
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CompanyMember() {
    const { t } = useLanguage();
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const accentColor = useColorModeValue('orange.500', 'orange.300');
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (headingRef.current) {
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
        }
    }, []);

    return (
        <Box bg={bgColor} id="members" py={16}>
            <Container maxW="6xl">
                <VStack spacing={12}>
                    <VStack spacing={2}>
                        <Heading
                            ref={headingRef}
                            as="h2"
                            size="lg"
                            fontSize={{ base: "3xl", md: "4xl" }}
                            textAlign="center"
                            color={accentColor}
                        >
                            {t('member.heading')}
                        </Heading>
                    </VStack>

                    <MemberCard
                        name={t('member.ceo.name')}
                        image="/images/company/members/ceo-whitebg.png"
                        title={t('member.ceo.title')}
                        description1={t('member.ceo.desc1')}
                        description2={t('member.ceo.desc2')}
                    />
                </VStack>
            </Container>
        </Box>
    );
} 