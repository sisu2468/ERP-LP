'use client';

import { getColors } from '@/constant/colorenum';
import { Badge, Box, Flex, Heading, HStack, Image, Text, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  packages: string[];
  isFeatureCard?: boolean;
  tag?: string;
  catchCopy?: string;
}

const MotionBox = motion(Box);

const getPackageColor = (pkg: string) => {
  switch (pkg) {
    case '営業向け':
      return 'blue';
    case '会計向け':
      return 'green';
    case '人事向け':
      return 'purple';
    case '全モジュール':
      return 'orange';
    default:
      return 'gray';
  }
};

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  packages,
  isFeatureCard = false,
  tag,
  catchCopy
}) => {
  const { colorMode } = useColorMode();
  const { headingColor, textColor, borderColor1 } = getColors(colorMode);

  const cardBgGradient = useColorModeValue(
    isFeatureCard ? 'linear(to-br, white, orange.50)' : 'white',
    isFeatureCard ? 'linear(to-br, gray.800, orange.900)' : 'gray.900'
  );

  const tagBgColor = useColorModeValue('orange.400', 'orange.500');
  const iconBgColor = useColorModeValue('orange.50', 'whiteAlpha.100');
  const bgColor1 = getColors('light').bgColor1;

  const cardBg1 = useColorModeValue('white', 'gray.700');


  if (isFeatureCard) {
    return (
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
        p={6}
        bgGradient={cardBgGradient}
        borderRadius="2xl"
        shadow="xl"
        w="full"
        maxW="400px"
        position="relative"
        overflow="hidden"
      >
        {tag && (
          <Box
            position="absolute"
            top={4}
            right={4}
            bg={tagBgColor}
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
            fontWeight="medium"
          >
            {tag}
          </Box>
        )}
        <VStack align="start" spacing={6}>
          <Box
            p={4}
            borderRadius="xl"
            bg={iconBgColor}
            border="1px solid"
            borderColor={borderColor1}
          >
            <Image
              src={icon}
              alt={title}
              boxSize="48px"
              objectFit="contain"
            />
          </Box>
          <VStack align="start" spacing={3}>
            <Heading size="lg" color={headingColor}>
              {title}
            </Heading>
            <Text fontSize="md" color={textColor} lineHeight="tall">
              {description}
            </Text>
          </VStack>
        </VStack>
      </MotionBox>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      p={5}
      bg={cardBg1}
      borderWidth="1px"
      borderColor={borderColor1}
      borderRadius="xl"
      shadow="lg"
      w="full"
      minH="380px"
      position="relative"
      overflow="hidden"
      _hover={{
        shadow: '2xl',
        borderColor: 'orange.400',
        transition: 'all 0.3s ease'
      }}
    >
      <VStack align="start" spacing={4}>
        <Box
          position="relative"
          w="full"
          pb={packages.length > 0 ? 4 : 0}
        >
          {packages.length > 0 && (
            <Flex
              justifyContent="flex-end"
              bottom={0}
              left={0}
              pt={2}
            >
              <HStack spacing={2} flexWrap="wrap" gap={2}>
                {packages.map((pkg, index) => (
                  <Badge
                    key={index}
                    colorScheme={getPackageColor(pkg)}
                    variant="solid"
                    fontSize="xs"
                    px={2}
                    py={1}
                    borderRadius="full"
                    opacity={0.9}
                    _hover={{
                      opacity: 1,
                      transform: 'scale(1.05)',
                      transition: 'all 0.2s'
                    }}
                  >
                    {pkg}
                  </Badge>
                ))}
              </HStack>
            </Flex>
          )}
          <VStack align="start" spacing={5}>
            <HStack spacing={4}>
              <Box
                p={3}
                borderRadius="lg"
                bg={bgColor1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderColor={borderColor1}
              >
                <Image
                  src={icon}
                  alt={title}
                  boxSize="40px"
                  objectFit="contain"
                />
              </Box>
              <Heading
                size="md"
                fontWeight="bold"
                color={headingColor}
                noOfLines={2}
              >
                {title}
              </Heading>
            </HStack>
            {catchCopy && (
              <Box
                pl={7}
                py={2}
                bg={useColorModeValue('gray.50', 'gray.900')}
                borderRadius="md"
                w="full"
                borderLeft="4px solid"
                borderColor="orange.400"
              >
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="orange.500"
                  lineHeight="tall"
                >
                  {catchCopy}
                </Text>
              </Box>
            )}
          </VStack>
        </Box>

        <Text
          color={textColor}
          fontSize="md"
          lineHeight="tall"
        >
          {description}
        </Text>
      </VStack>
    </MotionBox>
  );
};

export default ModuleCard; 