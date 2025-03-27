import { Box, Flex, Heading, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import ServiceIcon from "./ServiceIcon";
import { motion } from "framer-motion";

interface ServiceCardProps {
    title: string;
    subtitle: string;
    description: string;
    iconType: 'erp' | 'web' | 'network';
    index?: number;
}

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, subtitle, description, iconType, index = 0 }) => {
    const bgColor = useColorModeValue('gray.100', 'gray.700');
    const borderColor = useColorModeValue('orange.400', 'orange.500');
    const textColor = useColorModeValue('gray.900', 'gray.100');
    const subtitleColor = useColorModeValue('orange.400', 'orange.300');

    return (
        <MotionBox
            bg={bgColor}
            p={8}
            borderRadius="xl"
            border="1px solid"
            borderColor="transparent"
            flex="1"
            minW={{ base: "full", md: "300px" }}
            position="relative"
            overflow="hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.2
            }}
            whileHover={{
                y: -8,
                borderColor: borderColor,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }
            }}
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
            }}
        >
            <VStack align="start" spacing={6}>
                <Flex w="100%" justifyContent="center" fontSize="4xl">
                    <ServiceIcon type={iconType} />
                </Flex>
                <VStack align="start" spacing={2}>
                    <MotionHeading
                        as="h3"
                        fontSize="2xl"
                        color={textColor}
                        mb={4}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                            delay: index * 0.2 + 0.3
                        }}
                    >
                        {title}
                    </MotionHeading>
                    <MotionText
                        color={subtitleColor}
                        fontSize="lg"
                        fontWeight="bold"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                            delay: index * 0.2 + 0.4
                        }}
                    >
                        {subtitle}
                    </MotionText>
                </VStack>
                <MotionText
                    color="gray.400"
                    fontSize="md"
                    lineHeight="tall"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: index * 0.2 + 0.5
                    }}
                >
                    {description}
                </MotionText>
            </VStack>
        </MotionBox>
    );
};