'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Badge, Box, Container, Heading, Text, VStack, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export default function LabFAQSection() {
  const { t } = useLanguage();
  const { colorMode } = useColorMode();

  // 理志：FAQ データ
  const faqs = [
    { q: t('lab.faq.q1'), a: t('lab.faq.a1') },
    { q: t('lab.faq.q2'), a: t('lab.faq.a2') },
    { q: t('lab.faq.q3'), a: t('lab.faq.a3') },
    { q: t('lab.faq.q4'), a: t('lab.faq.a4') },
    { q: t('lab.faq.q5'), a: t('lab.faq.a5') },
    { q: t('lab.faq.q6'), a: t('lab.faq.a6') },
    { q: t('lab.faq.q7'), a: t('lab.faq.a7') },
    { q: t('lab.faq.q8'), a: t('lab.faq.a8') },
    { q: t('lab.faq.q9'), a: t('lab.faq.a9') },
    { q: t('lab.faq.q10'), a: t('lab.faq.a10') },
  ];

  return (
    <Box
      py={{ base: 16, md: 20, lg: 24 }}
      bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}
    >
      <Container maxW="4xl">
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
              {t('lab.faq.badge')}
            </Badge>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              color={colorMode === 'light' ? 'gray.900' : 'white'}
            >
              {t('lab.faq.title')}
            </Heading>
          </VStack>

          {/* 理志：FAQアコーディオン */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Accordion allowMultiple>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  border="none"
                  mb={4}
                  bg={colorMode === 'light' ? 'white' : 'gray.800'}
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="md"
                >
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        p={{ base: 5, md: 6 }}
                        _hover={{
                          bg: colorMode === 'light' ? 'gray.50' : 'gray.700',
                        }}
                        transition="all 0.2s"
                      >
                        <Box
                          flex="1"
                          textAlign="left"
                          display="flex"
                          alignItems="center"
                          gap={4}
                        >
                          <Box
                            flexShrink={0}
                            w="32px"
                            h="32px"
                            borderRadius="lg"
                            bg="orange.500"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            color="white"
                            fontWeight="bold"
                            fontSize="sm"
                          >
                            Q
                          </Box>
                          <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight="semibold"
                            color={colorMode === 'light' ? 'gray.900' : 'white'}
                            lineHeight="1.6"
                          >
                            {faq.q}
                          </Text>
                        </Box>
                        <Box
                          ml={4}
                          color="orange.500"
                          fontSize="xl"
                        >
                          {isExpanded ? <MinusIcon /> : <AddIcon />}
                        </Box>
                      </AccordionButton>
                      <AccordionPanel
                        pb={6}
                        pt={2}
                        px={{ base: 5, md: 6 }}
                      >
                        <Box
                          pl={{ base: 0, md: '48px' }}
                          pt={2}
                        >
                          <Box
                            p={4}
                            bg={colorMode === 'light' ? 'orange.50' : 'gray.700'}
                            borderRadius="lg"
                            borderLeft="4px"
                            borderColor="orange.500"
                          >
                            <Text
                              fontSize={{ base: 'sm', md: 'md' }}
                              color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
                              lineHeight="1.8"
                              whiteSpace="pre-line"
                            >
                              {faq.a}
                            </Text>
                          </Box>
                        </Box>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
