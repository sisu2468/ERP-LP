'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Badge, Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MotionBox = motion.create(Box);

export default function LabFAQSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // 理志：スクロールアニメーション
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      py={{ base: 20, md: 28 }}
      bg="white"
      position="relative"
      overflow="hidden"
    >
      <Container maxW="5xl">
        <VStack spacing={{ base: 16, md: 20 }} align="stretch">
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
              {t('lab.faq.badge')}
            </Badge>
            <Heading
              as="h2"
              fontSize={{ base: '40px', md: '56px', lg: '64px' }}
              fontWeight="700"
              color="#111111"
              letterSpacing="-0.02em"
            >
              {t('lab.faq.title')}
            </Heading>
          </VStack>

          {/* 理志：FAQアコーディオン */}
          <Accordion allowMultiple>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                border="none"
                mb={4}
                bg="#fafafa"
                borderRadius="24px"
                overflow="hidden"
                _last={{ mb: 0 }}
              >
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      p={6}
                      _hover={{
                        bg: 'white',
                      }}
                      transition="all 0.3s"
                      borderRadius="24px"
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
                          w="40px"
                          h="40px"
                          borderRadius="12px"
                          bg={isExpanded ? '#e08e46' : 'white'}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color={isExpanded ? 'white' : '#e08e46'}
                          fontWeight="700"
                          fontSize="md"
                          border="2px"
                          borderColor={isExpanded ? '#e08e46' : '#e5e5e7'}
                          transition="all 0.3s"
                        >
                          Q
                        </Box>
                        <Text
                          fontSize={{ base: 'md', md: 'lg' }}
                          fontWeight="600"
                          color="#111111"
                          lineHeight="1.6"
                        >
                          {faq.q}
                        </Text>
                      </Box>
                      <Box
                        ml={4}
                        color="#e08e46"
                        fontSize="20px"
                        transform={isExpanded ? 'rotate(180deg)' : 'rotate(0)'}
                        transition="transform 0.3s"
                      >
                        {isExpanded ? <MinusIcon /> : <AddIcon />}
                      </Box>
                    </AccordionButton>
                    <AccordionPanel
                      pb={6}
                      pt={0}
                      px={6}
                    >
                      <Box
                        pl={{ base: 0, md: '56px' }}
                        pt={2}
                      >
                        <Box
                          p={5}
                          bg="white"
                          borderRadius="16px"
                          border="1px solid"
                          borderColor="gray.100"
                        >
                          <Text
                            fontSize={{ base: 'sm', md: 'md' }}
                            color="gray.700"
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
        </VStack>
      </Container>
    </Box>
  );
}
