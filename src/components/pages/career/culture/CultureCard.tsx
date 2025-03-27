'use client';

import { Box, Heading, Icon, Text, useColorMode, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { getColors } from "@/constant/colorenum";

interface CultureCardProps {
    index: number;
    cardBg: string;
    borderColor: string;
    point: {
        title: string;
        description: string;
        icon: IconType;
        color: string;
    };
}

export default function CultureCard({ index, cardBg, borderColor, point }: CultureCardProps) {
    const { colorMode } = useColorMode();
    const colors = getColors(colorMode);

    return (
        <Box
            key={index}
            bg={cardBg}
            h="100%"
            p={8}
            borderRadius="xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
            position="relative"
            overflow="hidden"
            transition="all 0.3s ease"
            _hover={{
                transform: "translateY(-8px)",
                boxShadow: "2xl",
                "& .culture-icon": {
                    transform: "scale(1.2) rotate(10deg)",
                },
                _before: {
                    height: "100%",
                    opacity: 0.1,
                }
            }}
            _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: point.color,
                opacity: 0.5,
                transition: "all 0.3s ease"
            }}
        >
            <VStack align="start" spacing={6}>
                <Box
                    p={3}
                    bg={colors.iconBg}
                    borderRadius="full"
                    className="culture-icon"
                    transition="all 0.3s ease"
                >
                    <Icon
                        as={point.icon}
                        boxSize={6}
                        color={point.color}
                    />
                </Box>
                <VStack align="start" spacing={4}>
                    <Heading
                        fontSize={{ base: "xl", md: "2xl" }}
                        color={colors.headingColor}
                        fontWeight="bold"
                    >
                        {point.title}
                    </Heading>
                    <Text
                        color={colors.textColor}
                        fontSize={{ base: "md", md: "lg" }}
                        lineHeight="tall"
                    >
                        {point.description}
                    </Text>
                </VStack>
            </VStack>
        </Box>      
    )
}
