'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Badge, Box, Container, Flex, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MotionBox = motion.create(Box);

export default function LabProcessSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 理志：プロセスステップデータ
  const steps = [
    {
      number: t('lab.process.step1.number'),
      title: t('lab.process.step1.title'),
      subtitle: t('lab.process.step1.subtitle'),
      content: t('lab.process.step1.content'),
      deliverable: t('lab.process.step1.deliverable'),
      gradient: 'linear(to-br, orange.400, pink.400)',
    },
    {
      number: t('lab.process.step2.number'),
      title: t('lab.process.step2.title'),
      subtitle: t('lab.process.step2.subtitle'),
      content: t('lab.process.step2.content'),
      deliverable: t('lab.process.step2.deliverable'),
      gradient: 'linear(to-br, orange.500, red.400)',
    },
    {
      number: t('lab.process.step3.number'),
      title: t('lab.process.step3.title'),
      subtitle: t('lab.process.step3.subtitle'),
      content: t('lab.process.step3.content'),
      deliverable: t('lab.process.step3.deliverable'),
      gradient: 'linear(to-br, orange.400, yellow.500)',
    },
    {
      number: t('lab.process.step4.number'),
      title: t('lab.process.step4.title'),
      subtitle: t('lab.process.step4.subtitle'),
      content: t('lab.process.step4.content'),
      deliverable: t('lab.process.step4.deliverable'),
      gradient: 'linear(to-br, orange.500, purple.400)',
    },
    {
      number: t('lab.process.step5.number'),
      title: t('lab.process.step5.title'),
      subtitle: t('lab.process.step5.subtitle'),
      content: t('lab.process.step5.content'),
      deliverable: t('lab.process.step5.deliverable'),
      gradient: 'linear(to-br, orange.400, teal.400)',
    },
  ];

  // 理志：スクロールアニメーション
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      py={{ base: 20, md: 28 }}
      bg="#fafafa"
      position="relative"
      overflow="hidden"
    >
      <Container maxW="7xl">
        <VStack spacing={{ base: 16, md: 20 }} align="stretch">
          {/* 理志：セクションヘッダー */}
          <VStack spacing={4} textAlign="center">
            <Badge
              px={6}
              py={3}
              borderRadius="full"
              fontSize="sm"
              fontWeight="700"
              textTransform="uppercase"
              bg="white"
              color="#e08e46"
              border="2px"
              borderColor="#e08e46"
            >
              {t('lab.process.badge')}
            </Badge>
            <Heading
              as="h2"
              fontSize={{ base: '40px', md: '56px', lg: '64px' }}
              fontWeight="700"
              color="#111111"
              letterSpacing="-0.02em"
            >
              {t('lab.process.title')}
            </Heading>
          </VStack>

          {/* 理志：プロセスステップ - グリッド表示 */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={8}
          >
            {steps.map((step, index) => (
              <Box
                key={index}
                ref={el => { cardsRef.current[index] = el; }}
              >
                <Box
                  p={8}
                  bg="white"
                  borderRadius="30px"
                  border="1px"
                  borderColor="#e5e5e7"
                  position="relative"
                  overflow="hidden"
                  h="full"
                  _hover={{
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
                    borderColor: '#e08e46',
                  }}
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  cursor="pointer"
                >
                  {/* 理志：グラデーション背景 */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    h="6px"
                    bgGradient={step.gradient}
                  />

                  <VStack align="start" spacing={4} h="full">
                    {/* 理志：ステップ番号 */}
                    <Flex
                      w="60px"
                      h="60px"
                      borderRadius="20px"
                      bgGradient={step.gradient}
                      align="center"
                      justify="center"
                      color="white"
                      fontSize="28px"
                      fontWeight="700"
                      boxShadow="0 10px 30px rgba(224, 142, 70, 0.3)"
                    >
                      {step.number}
                    </Flex>

                    {/* 理志：タイトル */}
                    <Box>
                      <Heading
                        as="h3"
                        fontSize="24px"
                        fontWeight="700"
                        color="#111111"
                        mb={2}
                      >
                        {step.title}
                      </Heading>
                      <Text
                        fontSize="sm"
                        color="#e08e46"
                        fontWeight="600"
                      >
                        {step.subtitle}
                      </Text>
                    </Box>

                    {/* 理志：説明 */}
                    <Text
                      fontSize="15px"
                      color="#6e6e73"
                      lineHeight="1.7"
                      flex={1}
                    >
                      {step.content}
                    </Text>

                    {/* 理志：成果物 */}
                    <Box
                      w="full"
                      p={4}
                      bg="#fafafa"
                      borderRadius="16px"
                      borderLeft="4px"
                      borderColor="#e08e46"
                    >
                      <Text
                        fontSize="xs"
                        color="#86868b"
                        fontWeight="600"
                        mb={1}
                        textTransform="uppercase"
                      >
                        成果物
                      </Text>
                      <Text
                        fontSize="sm"
                        color="#111111"
                        fontWeight="500"
                      >
                        {step.deliverable}
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}
