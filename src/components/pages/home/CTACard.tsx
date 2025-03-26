import { Box, Heading, Icon, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { CTACard as CTACardType } from '../../../constant/interface';
interface CTACardProps {
    card: CTACardType;
    colorMode: 'light' | 'dark';
}

export function CTACard({ card, colorMode }: CTACardProps) {
    const cardBg = useColorModeValue('white', 'gray.800');
    const headingColor = useColorModeValue('gray.800', 'white');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const iconColor = useColorModeValue('orange.500', 'orange.300');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const iconBg = useColorModeValue('orange.50', 'gray.700');

    return (
        <Box
            bg={cardBg}
            p={8}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'xl',
                borderColor: colorMode === 'light' ? 'orange.200' : 'orange.500',
            }}
            transition="all 0.3s"
        >
            <VStack spacing={4} align="flex-start">
                <Box
                    p={3}
                    bg={iconBg}
                    borderRadius="lg"
                    transition="all 0.3s"
                    _hover={{
                        transform: 'scale(1.1)',
                    }}
                >
                    <Icon
                        as={card.icon}
                        boxSize={6}
                        color={iconColor}
                    />
                </Box>
                <Heading 
                    size="md"
                    color={headingColor}
                >
                    {card.title}
                </Heading>
                <Text 
                    color={textColor}
                >
                    {card.description}
                </Text>
            </VStack>
        </Box>
    );
}