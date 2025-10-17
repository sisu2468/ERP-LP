'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Box, Button, Container, Flex, Grid, Heading, Icon, Text, VStack, useColorMode, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircleIcon } from '@chakra-ui/icons';
import InquiryModal from '@/components/common/InquiryModal';

const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);

export default function LabHeroSection() {
  const { t } = useLanguage();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 理志：信頼性指標データ
  const trustIndicators = [
    {
      title: t('lab.hero.trust.1'),
      desc: t('lab.hero.trust.1.desc'),
    },
    {
      title: t('lab.hero.trust.2'),
      desc: t('lab.hero.trust.2.desc'),
    },
    {
      title: t('lab.hero.trust.3'),
      desc: t('lab.hero.trust.3.desc'),
    },
  ];

  return (
    <>
      <Box
        position="relative"
        overflow="hidden"
        bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}
        py={{ base: 16, md: 20, lg: 24 }}
      >
        <Container maxW="7xl">
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 12, lg: 16 }}
            alignItems="center"
          >
            {/* 理志：左側 - テキストコンテンツ */}
            <VStack align="start" spacing={{ base: 6, md: 8 }}>
              <MotionHeading
                as="h1"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl', xl: '6xl' }}
                fontWeight="bold"
                lineHeight="1.2"
                color={colorMode === 'light' ? 'gray.900' : 'white'}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {t('lab.hero.title.1')}
                <br />
                <Text
                  as="span"
                  bgGradient="linear(to-r, orange.400, orange.600)"
                  bgClip="text"
                >
                  {t('lab.hero.title.2')}
                </Text>
              </MotionHeading>

              <MotionText
                fontSize={{ base: 'md', md: 'lg' }}
                color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
                lineHeight="1.8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t('lab.hero.subtitle')}
              </MotionText>

              {/* 理志：CTAボタン */}
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Flex gap={4} flexWrap="wrap">
                  <Button
                    size="lg"
                    colorScheme="orange"
                    px={8}
                    py={6}
                    fontSize="md"
                    fontWeight="bold"
                    borderRadius="xl"
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    transition="all 0.3s"
                    onClick={onOpen}
                  >
                    {t('lab.hero.cta.primary')}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    colorScheme="orange"
                    px={8}
                    py={6}
                    fontSize="md"
                    fontWeight="bold"
                    borderRadius="xl"
                    borderWidth="2px"
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    transition="all 0.3s"
                  >
                    {t('lab.hero.cta.secondary')}
                  </Button>
                </Flex>
              </MotionBox>

              {/* 理志：信頼性指標 */}
              <MotionBox
                w="full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} mt={4}>
                  {trustIndicators.map((indicator, index) => (
                    <Flex
                      key={index}
                      align="start"
                      gap={2}
                      p={3}
                      borderRadius="lg"
                      bg={colorMode === 'light' ? 'white' : 'gray.800'}
                      border="1px"
                      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
                    >
                      <Icon
                        as={CheckCircleIcon}
                        color="orange.500"
                        boxSize={5}
                        mt={0.5}
                        flexShrink={0}
                      />
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="bold"
                          color={colorMode === 'light' ? 'gray.900' : 'white'}
                          mb={0.5}
                        >
                          {indicator.title}
                        </Text>
                        <Text
                          fontSize="xs"
                          color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
                          lineHeight="1.5"
                        >
                          {indicator.desc}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
                </Grid>
              </MotionBox>
            </VStack>

            {/* 理志：右側 - ヒーロー画像 */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Box
                position="relative"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="2xl"
              >
                <Image
                  src="/images/lab/hero-lab.png"
                  alt="Sainta Lab Hero"
                  width={800}
                  height={600}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                  priority
                />
              </Box>
            </MotionBox>
          </Grid>
        </Container>
      </Box>

      <InquiryModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
