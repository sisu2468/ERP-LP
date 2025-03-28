import { motion } from "framer-motion";
import { getColors } from "@/constant/colorenum";
import { Grid, Badge, useColorMode, Box, VStack, Text, Divider, Heading, HStack } from "@chakra-ui/react";
const MotionBox = motion(Box);

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

export default function PricingSection({ title, items, level, borderstate }: { title: string; items: any[]; level?: string, borderstate?: boolean }) {
    const { colorMode } = useColorMode();
    const { headingColor, textColor, cardBg, borderColor } = getColors(colorMode);

    return (
        <MotionBox variants={itemVariants}>
            <VStack spacing={6} align="stretch">
                <HStack spacing={3}>
                    <Heading size="lg" color={headingColor}>{title}</Heading>
                    {level && (
                        <Badge colorScheme="orange" fontSize="md" px={3} py={1}>
                            {level}
                        </Badge>
                    )}
                </HStack>
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                    gap={6}
                >
                    {items.map((item, index) => (
                        <MotionBox
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            bg={cardBg}
                            p={6}
                            borderRadius="xl"
                            borderWidth='1px'
                            borderColor={borderColor}
                            _hover={{
                                borderColor: 'orange.500',
                                boxShadow: 'lg',
                                transition: 'all 0.2s'
                            }}
                        >
                            <VStack align="stretch" spacing={3}>
                                <Text fontSize="xl" fontWeight="bold" color={headingColor}>
                                    {item.name}
                                </Text>
                                <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                                    {item.price}
                                </Text>
                                <Text color={textColor} fontSize="sm">
                                    {item.description}
                                </Text>
                            </VStack>
                        </MotionBox>
                    ))}
                </Grid>
                {!borderstate && (
                    <Divider />
                )}
            </VStack>
        </MotionBox>
    );
}