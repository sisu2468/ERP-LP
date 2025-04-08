'use client';

import MVVCard from "@/components/pages/company/mvv/MVVCard";
import { getColors } from "@/constant/colorenum";
import { Box, Flex, Icon, SimpleGrid, Text, useColorModeValue, VStack, useColorMode } from "@chakra-ui/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import { FiMinimize2 } from "react-icons/fi";
import { RiDashboardLine, RiLightbulbFlashLine, RiShieldStarLine, RiTeamLine } from "react-icons/ri";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const values = [
    {
        title: "シンプルさ",
        titleEn: "SIMPLICITY",
        description: "誰もが直感的に使える仕組みを提供し、複雑なビジネス運営をシンプルにします。",
        icon: FiMinimize2
    },
    {
        title: "信頼性",
        titleEn: "RELIABILITY",
        description: "企業の基盤を⽀える存在として、常に顧客が安⼼して頼れるサポートを最優先する。",
        icon: RiShieldStarLine
    },
    {
        title: "⾰新性",
        titleEn: "INNOVATION",
        description: "階層を超えて最良のアイデアが⽣まれる⽂化を醸成し、新しい価値を創造し続ける。",
        icon: RiLightbulbFlashLine
    },
    {
        title: "接続性",
        titleEn: "CONNECTIVITY",
        description: "企業、パートナー、そして私たち⾃⾝が強く結びつき、共に成⻑するエコシステムを築く。",
        icon: RiTeamLine
    },
    {
        title: "透明性",
        titleEn: "TRANSPARENCY",
        description: "誠実なコミュニケーションと開かれた情報共有を通じて、揺るぎない信頼を構築する。",
        icon: RiDashboardLine
    }
];

export default function CompanyValues() {
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
            title="バリュー"
            titleEn="VALUES"
        >
            <SimpleGrid 
                w="full"
                columns={{ base: 1, md: 2, lg: 3, xl: 5 }} 
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
                        <VStack align="start" spacing={6}>
                            <Flex align="center" gap={4}>
                                <Flex
                                    w={12}
                                    h={12}
                                    bg={bgColor1}
                                    color={accentColor}
                                    borderRadius="xl"
                                    align="center"
                                    justify="center"
                                    transition="all 0.3s"
                                    _hover={{
                                        transform: 'scale(1.1)',
                                    }}
                                >
                                    <Icon 
                                        as={value.icon} 
                                        boxSize={6}
                                    />
                                </Flex>
                                <VStack align="start" spacing={1}>
                                    <Text 
                                        fontSize="xl" 
                                        fontWeight="bold" 
                                        color={textColor}
                                    >
                                        {value.title}
                                    </Text>
                                    <Text 
                                        fontSize="sm" 
                                        color={accentColor}
                                        fontWeight="semibold"
                                        letterSpacing="wider"
                                    >
                                        {value.titleEn}
                                    </Text>
                                </VStack>
                            </Flex>
                            <Text 
                                fontSize="md" 
                                color={textColor}
                                lineHeight="1.8"
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