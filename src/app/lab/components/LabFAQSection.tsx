'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function LabFAQSection() {
  const { t } = useLanguage();

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
    <Box py={{ base: 16, md: 24 }} bg="#fafafa">
      <Container maxW="4xl">
        <VStack spacing={{ base: 12, md: 16 }} align="stretch">
          {/* Header */}
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
              textTransform="none"
            >
              {t('lab.faq.badge')}
            </Badge>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl', lg: '52px' }}
              fontWeight="700"
              color="#111111"
              letterSpacing="-0.02em"
            >
              FAQ
            </Heading>
          </VStack>

          {/* FAQ Accordion */}
          <Accordion allowMultiple>
            <VStack spacing={3} align="stretch">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  border="1px solid"
                  borderColor="#e5e7eb"
                  borderRadius="xl"
                  overflow="hidden"
                  bg="white"
                >
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        py={5}
                        px={6}
                        _hover={{
                          bg: 'transparent',
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
                          <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight="600"
                            color="#111111"
                            lineHeight="1.5"
                          >
                            {faq.q}
                          </Text>
                        </Box>
                        <Box
                          ml={4}
                          w="28px"
                          h="28px"
                          borderRadius="full"
                          bg={isExpanded ? '#e08e46' : '#f5f5f5'}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color={isExpanded ? 'white' : '#6e6e73'}
                          transition="all 0.2s"
                          flexShrink={0}
                        >
                          {isExpanded ? (
                            <MinusIcon boxSize={3} />
                          ) : (
                            <AddIcon boxSize={3} />
                          )}
                        </Box>
                      </AccordionButton>
                      <AccordionPanel pb={5} pt={0} px={6}>
                        <Text
                          fontSize={{ base: 'sm', md: 'md' }}
                          color="#6e6e73"
                          lineHeight="1.8"
                        >
                          {faq.a}
                        </Text>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </VStack>
          </Accordion>
        </VStack>
      </Container>
    </Box>
  );
}
