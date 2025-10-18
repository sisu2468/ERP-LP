'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Box, Button, Container, Flex, Grid, Heading, Icon, Text, VStack, keyframes, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircleIcon } from '@chakra-ui/icons';
import InquiryModal from '@/components/common/InquiryModal';
import TranslatedText from '@/components/common/TranslatedText';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const MotionBox = motion.create(Box);

// 理志：アニメーション定義
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(1deg); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function LabHeroSection() {
  const { t } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 理志：初回アニメーション
  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const image = imageRef.current;
    
    if (hero && title) {
      gsap.fromTo(hero,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );

      gsap.fromTo(title,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' }
      );

      if (image) {
        gsap.fromTo(image,
          { opacity: 0, x: 30, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 1.2, delay: 0.5, ease: 'power3.out' }
        );
      }
    }

    // 理志：マウスパララックス効果
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
        ref={heroRef}
        position="relative"
        overflow="hidden"
        bg="#fafafa"
        minH="100vh"
        display="flex"
        alignItems="center"
      >
        {/* 理志：サインタオレンジの装飾要素 */}
        <Box
          position="absolute"
          top="-10%"
          right="-5%"
          w="600px"
          h="600px"
          opacity={0.4}
          transform={`translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`}
          transition="transform 0.3s ease-out"
          pointerEvents="none"
        >
          <svg width="100%" height="100%" viewBox="0 0 600 600">
            <defs>
              <linearGradient id="labOrangeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e08e46" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f4a460" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <polygon points="300,50 550,450 50,450" fill="url(#labOrangeGrad1)" />
          </svg>
        </Box>

        <Box
          position="absolute"
          bottom="-15%"
          left="-10%"
          w="500px"
          h="500px"
          opacity={0.3}
          animation={`${rotate} 60s linear infinite`}
          pointerEvents="none"
        >
          <svg width="100%" height="100%" viewBox="0 0 500 500">
            <defs>
              <linearGradient id="labOrangeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e08e46" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ffc478" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <circle cx="250" cy="250" r="200" fill="url(#labOrangeGrad2)" />
          </svg>
        </Box>

        <Box
          position="absolute"
          top="30%"
          left="15%"
          w="300px"
          h="300px"
          opacity={0.25}
          transform={`translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`}
          transition="transform 0.3s ease-out"
          pointerEvents="none"
        >
          <svg width="100%" height="100%" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="labOrangeGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e08e46" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f4a460" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            <polygon points="150,20 280,140 150,280 20,140" fill="url(#labOrangeGrad3)" />
          </svg>
        </Box>

        <Container maxW="8xl" position="relative" zIndex={2}>
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 12, lg: 16 }}
            alignItems="center"
            py={{ base: 20, md: 28 }}
          >
            {/* 理志：左側 - テキストコンテンツ */}
            <VStack align="start" spacing={{ base: 6, md: 8 }} ref={titleRef}>
              <Heading
                as="h1"
                fontSize={{ base: '48px', md: '64px', lg: '72px', xl: '84px' }}
                fontWeight="700"
                lineHeight="1.1"
                letterSpacing="-0.03em"
                color="#111111"
              >
                <TranslatedText
                  as="span"
                  translationKey="lab.hero.title.1"
                />
                <br />
                <TranslatedText
                  as="span"
                  color="#e08e46"
                  translationKey="lab.hero.title.2"
                  staggerDelay={0.1}
                />
              </Heading>

              <Text
                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                color="#6e6e73"
                lineHeight="1.8"
                fontWeight="400"
              >
                <TranslatedText
                  as="span"
                  translationKey="lab.hero.subtitle"
                />
              </Text>

              {/* 理志：CTAボタン */}
              <Flex gap={4} flexWrap="wrap" pt={4}>
                <Button
                  size="lg"
                  h="60px"
                  px={8}
                  fontSize="lg"
                  fontWeight="600"
                  bg="#e08e46"
                  color="white"
                  borderRadius="full"
                  _hover={{
                    bg: '#d07836',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 30px rgba(224, 142, 70, 0.3)',
                  }}
                  transition="all 0.3s"
                  onClick={onOpen}
                >
                  {t('lab.hero.cta.primary')}
                </Button>
                <Button
                  size="lg"
                  h="60px"
                  px={8}
                  fontSize="lg"
                  fontWeight="600"
                  variant="outline"
                  borderColor="#e08e46"
                  color="#e08e46"
                  borderWidth="2px"
                  borderRadius="full"
                  _hover={{
                    bg: 'rgba(224, 142, 70, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 30px rgba(224, 142, 70, 0.2)',
                  }}
                  transition="all 0.3s"
                  onClick={() => {
                    const simulatorSection = document.getElementById('simulator');
                    if (simulatorSection) {
                      simulatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  {t('lab.hero.cta.secondary')}
                </Button>
              </Flex>

              {/* 理志：信頼性指標 */}
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} w="full" pt={4}>
                {trustIndicators.map((indicator, index) => (
                  <Flex
                    key={index}
                    align="start"
                    gap={2}
                    p={4}
                    borderRadius="xl"
                    bg="white"
                    border="1px"
                    borderColor="#e5e5e7"
                    _hover={{
                      borderColor: '#e08e46',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                    }}
                    transition="all 0.3s"
                  >
                    <Icon
                      as={CheckCircleIcon}
                      color="#e08e46"
                      boxSize={5}
                      mt={0.5}
                      flexShrink={0}
                    />
                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="#111111"
                        mb={0.5}
                      >
                        {indicator.title}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="#6e6e73"
                        lineHeight="1.5"
                      >
                        {indicator.desc}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Grid>
            </VStack>

            {/* 理志：右側 - ヒーロー画像 */}
            <Box ref={imageRef}>
              <Box
                position="relative"
                borderRadius="30px"
                overflow="hidden"
                animation={`${float} 6s ease-in-out infinite`}
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
            </Box>
          </Grid>
        </Container>
      </Box>

      <InquiryModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
