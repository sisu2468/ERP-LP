'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Badge, Box, Container, Heading, Text, VStack, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export default function LabTestimonialsSection() {
  const { t } = useLanguage();
  const { colorMode } = useColorMode();

  // 理志：顧客事例データ
  const testimonials = [
    {
      company: t('lab.testimonials.1.company'),
      project: t('lab.testimonials.1.project'),
      services: t('lab.testimonials.1.services'),
      duration: t('lab.testimonials.1.duration'),
      quote: t('lab.testimonials.1.quote'),
    },
    {
      company: t('lab.testimonials.2.company'),
      project: t('lab.testimonials.2.project'),
      services: t('lab.testimonials.2.services'),
      duration: t('lab.testimonials.2.duration'),
      quote: t('lab.testimonials.2.quote'),
    },
  ];

  return (
    <Box
      py={{ base: 16, md: 20, lg: 24 }}
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
    >
      <Container maxW="7xl">
        <VStack spacing={{ base: 12, md: 16 }} align="stretch">
          {/* 理志：セクションヘッダー */}
          <VStack spacing={4} textAlign="center">
            <Badge
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="600"
              bg="rgba(224, 142, 70, 0.1)"
              color="#e08e46"
              border="1px solid"
              borderColor="rgba(224, 142, 70, 0.2)"
            >
              {t('lab.testimonials.badge')}
            </Badge>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              color={colorMode === 'light' ? 'gray.900' : 'white'}
            >
              {t('lab.testimonials.title')}
            </Heading>
          </VStack>

          {/* 理志：顧客事例カード */}
          <VStack spacing={8}>
            {testimonials.map((testimonial, index) => (
              <MotionBox
                key={index}
                w="full"
                p={{ base: 6, md: 8 }}
                bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}
                borderRadius="2xl"
                boxShadow="lg"
                border="1px"
                borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <VStack align="start" spacing={4}>
                  {/* 理志：企業名とプロジェクト概要 */}
                  <Box>
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      color={colorMode === 'light' ? 'gray.900' : 'white'}
                      mb={2}
                    >
                      {testimonial.company}
                    </Text>
                    <Text
                      fontSize="md"
                      color="orange.500"
                      fontWeight="semibold"
                      mb={1}
                    >
                      {testimonial.project}
                    </Text>
                    <Text
                      fontSize="sm"
                      color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
                    >
                      {testimonial.services} • {testimonial.duration}
                    </Text>
                  </Box>

                  {/* 理志：顧客コメント */}
                  <Box
                    pl={4}
                    borderLeft="4px"
                    borderColor="orange.500"
                  >
                    <Text
                      fontSize={{ base: 'md', md: 'lg' }}
                      color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
                      lineHeight="1.8"
                      fontStyle="italic"
                    >
                      "{testimonial.quote}"
                    </Text>
                  </Box>
                </VStack>
              </MotionBox>
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
