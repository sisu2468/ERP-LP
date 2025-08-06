'use client';

import {
  Box,
  VStack,
  Text,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import SVGAnimation from '@/components/common/SVGAnimation';

interface FeatureCardWithSVGProps {
  title: string;
  description: string;
  svgPath?: string;
  svgAlt?: string;
  features: string[];
  animationDelay?: number;
  icon?: React.ElementType;
}

export default function FeatureCardWithSVG({
  title,
  description,
  svgPath,
  svgAlt,
  features,
  animationDelay = 0,
  icon: Icon
}: FeatureCardWithSVGProps) {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const titleColor = useColorModeValue('gray.800', 'white');
  const iconColor = useColorModeValue('orange.500', 'orange.300');

  return (
    <Box
      p={8}
      bg={bgColor}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      boxShadow="sm"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
        borderColor: colorMode === 'light' ? 'orange.200' : 'orange.600'
      }}
      position="relative"
      overflow="hidden"
    >
      <VStack spacing={6} align="flex-start">
        {/* Header with Icon and Title */}
        <Box display="flex" alignItems="center" gap={4} width="100%">
          {Icon && (
            <Box
              p={3}
              borderRadius="lg"
              bg={colorMode === 'light' ? 'orange.50' : 'orange.900'}
              color={iconColor}
            >
              <Icon size={24} />
            </Box>
          )}
          <Box flex={1}>
            <Text
              fontWeight="bold"
              fontSize="xl"
              color={titleColor}
              mb={2}
            >
              {title}
            </Text>
            <Text
              color={textColor}
              fontSize="sm"
              lineHeight="1.6"
            >
              {description}
            </Text>
          </Box>
        </Box>

        {/* SVG Animation Section */}
        {svgPath && (
          <Box
            width="100%"
            height="200px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}
            borderRadius="lg"
            overflow="hidden"
          >
            <SVGAnimation
              svgPath={svgPath}
              alt={svgAlt || title}
              width="100%"
              height="100%"
              animationType="scaleIn"
              duration={1200}
              delay={animationDelay}
              trigger="onScroll"
            />
          </Box>
        )}

        {/* Features List */}
        <Box width="100%">
          <Text
            fontWeight="semibold"
            fontSize="md"
            color={titleColor}
            mb={4}
          >
            主な機能:
          </Text>
          <VStack spacing={3} align="flex-start">
            {features.map((feature, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                gap={3}
                opacity={0}
                animation={`fadeInUp 0.6s ease-out ${animationDelay + (index * 0.1)}s forwards`}
              >
                <Box
                  w={2}
                  h={2}
                  borderRadius="full"
                  bg={iconColor}
                  flexShrink={0}
                />
                <Text
                  color={textColor}
                  fontSize="sm"
                  lineHeight="1.5"
                >
                  {feature}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
} 