import { Box, Icon, Text, VStack } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface FeatureCardProps {
    title: string;
    icon: IconType;
    features: string[];
    colorMode: 'light' | 'dark';
}

export default function FeatureCard({ title, icon, features, colorMode }: FeatureCardProps) {
    return (
        <Box
            p={8}
            bg={colorMode === 'light' ? 'white' : 'gray.800'}
            borderRadius="xl"
            boxShadow="lg"
            transition="all 0.3s"
            _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'xl',
            }}
        >
            <VStack spacing={6} align="start">
                <Box>
                    <Icon
                        as={icon}
                        w={8}
                        h={8}
                        color={colorMode === 'light' ? 'orange.500' : 'orange.300'}
                        mb={4}
                    />
                    <Text
                        fontSize="xl"
                        fontWeight="bold"
                        color={colorMode === 'light' ? 'gray.700' : 'white'}
                    >
                        {title}
                    </Text>
                </Box>
                <VStack spacing={3} align="start">
                    {features.map((feature, index) => (
                        <Text
                            key={index}
                            color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
                            fontSize="md"
                        >
                            • {feature}
                        </Text>
                    ))}
                </VStack>
            </VStack>
        </Box>
    );
}