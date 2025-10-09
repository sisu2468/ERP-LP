'use client';

import MVVCard from "@/components/pages/company/mvv/MVVCard";
import { getColors } from "@/constant/colorenum";
import { Box, Flex, Icon, SimpleGrid, Text, useColorModeValue, VStack, useColorMode } from "@chakra-ui/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import { FiMinimize2 } from "react-icons/fi";
import { RiDashboardLine, RiLightbulbFlashLine, RiShieldStarLine, RiTeamLine } from "react-icons/ri";
import { useLanguage } from '@/contexts/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CompanyValues() {
    const { t } = useLanguage();
    
    const values = [
        {
            title: t('mvv.value.1.title'),
            titleEn: t('mvv.value.1.titleEn'),
            description: t('mvv.value.1.desc'),
            icon: FiMinimize2
        },
        {
            title: t('mvv.value.2.title'),
            titleEn: t('mvv.value.2.titleEn'),
            description: t('mvv.value.2.desc'),
            icon: RiShieldStarLine
        },
        {
            title: t('mvv.value.3.title'),
            titleEn: t('mvv.value.3.titleEn'),
            description: t('mvv.value.3.desc'),
            icon: RiLightbulbFlashLine
        },
        {
            title: t('mvv.value.4.title'),
            titleEn: t('mvv.value.4.titleEn'),
            description: t('mvv.value.4.desc'),
            icon: RiTeamLine
        },
        {
            title: t('mvv.value.5.title'),
            titleEn: t('mvv.value.5.titleEn'),
            description: t('mvv.value.5.desc'),
            icon: RiDashboardLine
        }
    ];
    
    const valueRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { colorMode } = useColorMode();
    const accentColor = useColorModeValue('orange.500', 'orange.300');
    const cardBg = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('orange.100', 'orange.700');
    const bgColor1 = getColors(colorMode).bgColor1;
    const textColor = useColorModeValue('gray.700', 'gray.100');

    useEffect(() => {
        const handlers = new Map<HTMLDivElement, { enter: () => void; leave: () => void }>();
        
        const ctx = gsap.context(() => {
            valueRefs.current.forEach((ref, index) => {
                if (ref) {
                    gsap.fromTo(ref,
                        {
                            opacity: 0,
                            y: 20,
                            scale: 0.95
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: ref,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );

                    const handleMouseEnter = () => {
                        gsap.to(ref, {
                            y: -8,
                            scale: 1.02,
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            borderColor: accentColor,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    };

                    const handleMouseLeave = () => {
                        gsap.to(ref, {
                            y: 0,
                            scale: 1,
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            borderColor: borderColor,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    };

                    handlers.set(ref, { enter: handleMouseEnter, leave: handleMouseLeave });
                    ref.addEventListener('mouseenter', handleMouseEnter);
                    ref.addEventListener('mouseleave', handleMouseLeave);
                }
            });
        });

        return () => {
            ctx.revert();
            valueRefs.current.forEach(ref => {
                if (ref) {
                    const handler = handlers.get(ref);
                    if (handler) {
                        ref.removeEventListener('mouseenter', handler.enter);
                        ref.removeEventListener('mouseleave', handler.leave);
                    }
                }
            });
        };
    }, [accentColor, borderColor]);

    return (
        <MVVCard
            title={t('mvv.values.title')}
            titleEn={t('mvv.values.titleEn')}
        >
            <SimpleGrid 
                w="full"
                maxW="100%"
                columns={{ base: 1, md: 2, lg: 3 }} 
                spacing={6} 
                mt={8}
            >
                {values.map((value, index) => (
                    <Box
                        key={index}
                        ref={(el) => { valueRefs.current[index] = el }}
                        bg={cardBg}
                        p={5}
                        borderRadius="2xl"
                        boxShadow="xl"
                        borderWidth="1px"
                        borderColor={borderColor}
                        position="relative"
                        transition="none"
                        style={{ willChange: 'transform' }}
                        overflow="hidden"
                        w="full"
                        maxW="100%"
                        minW={0}
                    >
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            h={2}
                            bg={accentColor}
                            borderTopRadius="2xl"
                        />
                        <VStack align="start" spacing={6} w="full" maxW="100%" minW={0}>
                            <Flex align="center" gap={4} w="full" maxW="100%" minW={0}>
                                <Flex
                                    w={12}
                                    h={12}
                                    bg={bgColor1}
                                    color={accentColor}
                                    borderRadius="xl"
                                    align="center"
                                    justify="center"
                                    transition="all 0.3s"
                                    flexShrink={0}
                                    _hover={{
                                        transform: 'scale(1.1)',
                                    }}
                                >
                                    <Icon 
                                        as={value.icon} 
                                        boxSize={6}
                                    />
                                </Flex>
                                <VStack align="start" spacing={1} flex={1} minW={0} maxW="100%">
                                    <Text 
                                        fontSize="xl" 
                                        fontWeight="bold" 
                                        color={textColor}
                                        w="full"
                                        maxW="100%"
                                        sx={{
                                            wordBreak: 'keep-all',
                                            overflowWrap: 'anywhere',
                                            lineBreak: 'strict'
                                        }}
                                    >
                                        {value.title}
                                    </Text>
                                    <Text 
                                        fontSize="sm" 
                                        color={accentColor}
                                        fontWeight="semibold"
                                        letterSpacing="wider"
                                        w="full"
                                        maxW="100%"
                                        sx={{
                                            wordBreak: 'keep-all',
                                            overflowWrap: 'anywhere',
                                            lineBreak: 'strict'
                                        }}
                                    >
                                        {value.titleEn}
                                    </Text>
                                </VStack>
                            </Flex>
                            <Text 
                                fontSize="md" 
                                color={textColor}
                                lineHeight="1.8"
                                w="full"
                                maxW="100%"
                                sx={{
                                    wordBreak: 'keep-all',
                                    overflowWrap: 'anywhere',
                                    lineBreak: 'strict'
                                }}
                            >
                                {value.description}
                            </Text>
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>
        </MVVCard>
    );
} 