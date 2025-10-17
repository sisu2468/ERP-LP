'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Badge, Box, Container, Flex, Heading, Text, VStack, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export default function LabProcessSection() {
  const { t } = useLanguage();
  const { colorMode } = useColorMode();

  // 理志：プロセスステップデータ
  const steps = [
    {
      number: t('lab.process.step1.number'),
      title: t('lab.process.step1.title'),
      subtitle: t('lab.process.step1.subtitle'),
      content: t('lab.process.step1.content'),
      deliverable: t('lab.process.step1.deliverable'),
    },
    {
      number: t('lab.process.step2.number'),
      title: t('lab.process.step2.title'),
      subtitle: t('lab.process.step2.subtitle'),
      content: t('lab.process.step2.content'),
      deliverable: t('lab.process.step2.deliverable'),
    },
    {
      number: t('lab.process.step3.number'),
      title: t('lab.process.step3.title'),
      subtitle: t('lab.process.step3.subtitle'),
      content: t('lab.process.step3.content'),
      deliverable: t('lab.process.step3.deliverable'),
    },
    {
      number: t('lab.process.step4.number'),
      title: t('lab.process.step4.title'),
      subtitle: t('lab.process.step4.subtitle'),
      content: t('lab.process.step4.content'),
      deliverable: t('lab.process.step4.deliverable'),
    },
    {
      number: t('lab.process.step5.number'),
      title: t('lab.process.step5.title'),
      subtitle: t('lab.process.step5.subtitle'),
      content: t('lab.process.step5.content'),
      deliverable: t('lab.process.step5.deliverable'),
    },
  ];

  return (
    <Box
      py={{ base: 16, md: 20, lg: 24 }}
      bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}
    >
      <Container maxW="7xl">
        <VStack spacing={{ base: 12, md: 16 }} align="stretch">
          {/* 理志：セクションヘッダー */}
          <VStack spacing={4} textAlign="center">
            <Badge
              colorScheme="orange"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {t('lab.process.badge')}
            </Badge>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              color={colorMode === 'light' ? 'gray.900' : 'white'}
            >
              {t('lab.process.title')}
            </Heading>
          </VStack>

          {/* 理志：プロセスステップ */}
          <VStack spacing={6} position="relative">
            {/* 理志：縦の接続線 */}
            <Box
              display={{ base: 'none', md: 'block' }}
              position="absolute"
              left="44px"
              top="60px"
              bottom="60px"
              w="2px"
              bg="orange.400"
              opacity={0.3}
            />

            {steps.map((step, index) => (
              <MotionBox
                key={index}
                w="full"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Flex
                  gap={{ base: 4, md: 6 }}
                  p={{ base: 6, md: 8 }}
                  bg={colorMode === 'light' ? 'white' : 'gray.800'}
                  borderRadius="2xl"
                  boxShadow="lg"
                  border="1px"
                  borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
                  position="relative"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: '2xl',
                    borderColor: 'orange.400',
                  }}
                  transition="all 0.3s"
                >
                  {/* 理志：ステップ番号 */}
                  <Box flexShrink={0}>
                    <Flex
                      w={{ base: '50px', md: '60px' }}
                      h={{ base: '50px', md: '60px' }}
                      borderRadius="xl"
                      bgGradient="linear(to-br, orange.400, orange.600)"
                      align="center"
                      justify="center"
                      color="white"
                      fontSize={{ base: 'xl', md: '2xl' }}
                      fontWeight="bold"
                      boxShadow="lg"
                    >
                      {step.number}
                    </Flex>
                  </Box>

                  {/* 理志：ステップ内容 */}
                  <VStack align="start" spacing={3} flex={1}>
                    <Box>
                      <Heading
                        as="h3"
                        fontSize={{ base: 'xl', md: '2xl' }}
                        fontWeight="bold"
                        color={colorMode === 'light' ? 'gray.900' : 'white'}
                        mb={1}
                      >
                        {step.title}
                      </Heading>
                      <Text
                        fontSize={{ base: 'sm', md: 'md' }}
                        color="orange.500"
                        fontWeight="semibold"
                      >
                        {step.subtitle}
                      </Text>
                    </Box>

                    <Text
                      fontSize={{ base: 'sm', md: 'md' }}
                      color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
                      lineHeight="1.7"
                    >
                      {step.content}
                    </Text>

                    {/* 理志：成果物 */}
                    <Box
                      mt={2}
                      px={3}
                      py={2}
                      bg={colorMode === 'light' ? 'orange.50' : 'gray.700'}
                      borderRadius="lg"
                      borderLeft="3px"
                      borderColor="orange.500"
                    >
                      <Text
                        fontSize="xs"
                        color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
                        fontWeight="semibold"
                        mb={1}
                      >
                        成果物
                      </Text>
                      <Text
                        fontSize="sm"
                        color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
                      >
                        {step.deliverable}
                      </Text>
                    </Box>
                  </VStack>
                </Flex>
              </MotionBox>
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
