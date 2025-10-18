'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Box, Container, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import TranslatedText from '@/components/common/TranslatedText';

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

const getSvgForStep = (stepNumber: number) => {
  if (stepNumber <= 1) return '/svg/svg2.svg';
  if (stepNumber <= 3) return '/svg/svg3.svg';
  return '/svg/svg4.svg';
};

const AnimatedSvgDisplay = ({ activeStep }: { activeStep: number }) => {
  const currentSvg = getSvgForStep(activeStep);
  
  return (
    <AnimatePresence mode="wait">
      <MotionBox
        key={currentSvg}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        w="full"
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={currentSvg}
          alt={`Process step ${activeStep + 1}`}
          width={500}
          height={500}
          style={{ width: '100%', height: 'auto', maxWidth: '500px' }}
          priority={activeStep < 2}
        />
      </MotionBox>
    </AnimatePresence>
  );
};

export default function LabProcessSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const step = Math.floor(latest * 5);
      setCurrentStep(Math.min(step, 4));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const steps = [
    {
      number: t('lab.process.step1.number'),
      title: t('lab.process.step1.title'),
      subtitle: t('lab.process.step1.subtitle'),
      content: t('lab.process.step1.content'),
      deliverable: t('lab.process.step1.deliverable'),
      color: '#e08e46',
    },
    {
      number: t('lab.process.step2.number'),
      title: t('lab.process.step2.title'),
      subtitle: t('lab.process.step2.subtitle'),
      content: t('lab.process.step2.content'),
      deliverable: t('lab.process.step2.deliverable'),
      color: '#e08e46',
    },
    {
      number: t('lab.process.step3.number'),
      title: t('lab.process.step3.title'),
      subtitle: t('lab.process.step3.subtitle'),
      content: t('lab.process.step3.content'),
      deliverable: t('lab.process.step3.deliverable'),
      color: '#e08e46',
    },
    {
      number: t('lab.process.step4.number'),
      title: t('lab.process.step4.title'),
      subtitle: t('lab.process.step4.subtitle'),
      content: t('lab.process.step4.content'),
      deliverable: t('lab.process.step4.deliverable'),
      color: '#e08e46',
    },
    {
      number: t('lab.process.step5.number'),
      title: t('lab.process.step5.title'),
      subtitle: t('lab.process.step5.subtitle'),
      content: t('lab.process.step5.content'),
      deliverable: t('lab.process.step5.deliverable'),
      color: '#e08e46',
    },
  ];

  return (
    <>
      <Box
        ref={sectionRef}
        position="relative"
        h="500vh"
        bg="white"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.03}
          backgroundImage="radial-gradient(circle, #e08e46 1px, transparent 1px)"
          backgroundSize="40px 40px"
          pointerEvents="none"
        />

        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="radial-gradient(circle at 50% 0%, rgba(224, 142, 70, 0.02), transparent 50%)"
          pointerEvents="none"
        />

        <Box
          position="sticky"
          top={0}
          h="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
        >
          <Container maxW="7xl" py={12}>
            <VStack spacing={3} textAlign="center" mb={{ base: 6, lg: 10 }}>
              <TranslatedText
                translationKey="lab.process.subtitle"
                fontSize={{ base: 'xs', md: 'sm' }}
                fontWeight="600"
                color="#e08e46"
                textTransform="uppercase"
                letterSpacing="0.15em"
                staggerDelay={0}
              />
              <TranslatedText
                translationKey="lab.process.title"
                as="h2"
                fontSize={{ base: '32px', md: '40px', lg: '48px' }}
                fontWeight="700"
                color="#111111"
                letterSpacing="-0.02em"
                staggerDelay={0.1}
              />
            </VStack>

            <Flex
              direction={{ base: 'column', lg: 'row' }}
              gap={{ base: 8, lg: 16 }}
              align="center"
              justify="center"
              minH={{ base: 'auto', lg: '70vh' }}
            >
              <Box
                display={{ base: 'none', lg: 'flex' }}
                flexDirection="column"
                alignItems="center"
                gap={8}
                position="relative"
              >
                <Box
                  position="absolute"
                  left="50%"
                  top={0}
                  bottom={0}
                  w="3px"
                  bg="#f0f0f0"
                  transform="translateX(-50%)"
                  borderRadius="full"
                >
                  <MotionBox
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bg="linear-gradient(to bottom, #e08e46, #ff8c5a)"
                    borderRadius="full"
                    boxShadow="0 0 12px rgba(224, 142, 70, 0.4)"
                    style={{
                      height: `${(currentStep / 4) * 100}%`
                    }}
                  />
                </Box>

                {steps.map((step, index) => (
                  <Box key={index} position="relative">
                    {currentStep === index && (
                      <MotionBox
                        position="absolute"
                        top="50%"
                        left="50%"
                        w="40px"
                        h="40px"
                        borderRadius="full"
                        border="2px solid"
                        borderColor="rgba(224, 142, 70, 0.3)"
                        style={{
                          transform: "translate(-50%, -50%)"
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0.2, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    <MotionBox
                      w="24px"
                      h="24px"
                      borderRadius="full"
                      bg={currentStep >= index ? step.color : 'white'}
                      border="3px solid"
                      borderColor={currentStep >= index ? step.color : '#e5e7eb'}
                      boxShadow={currentStep === index ? '0 0 0 6px rgba(224, 142, 70, 0.15)' : 'none'}
                      position="relative"
                      zIndex={2}
                      animate={{
                        scale: currentStep === index ? [1, 1.15, 1] : 1,
                      }}
                      transition={{
                        duration: currentStep === index ? 2 : 0.3,
                        repeat: currentStep === index ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    />
                  </Box>
                ))}
              </Box>

              <AnimatePresence mode="wait">
                <MotionBox
                  key={currentStep}
                  flex={{ base: '1', lg: '0 0 45%' }}
                  p={{ base: 6, md: 8, lg: 10 }}
                  bg="white"
                  borderRadius="24px"
                  border="2px solid"
                  borderColor="#e08e46"
                  boxShadow="0 12px 40px -8px rgba(224, 142, 70, 0.2)"
                  initial={{ opacity: 0, x: -40, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 40, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  maxW={{ base: 'full', lg: '600px' }}
                  position="relative"
                >
                  <MotionBox
                    position="absolute"
                    top={4}
                    right={4}
                    bg={steps[currentStep].color}
                    color="white"
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="700"
                    boxShadow="0 4px 12px rgba(224, 142, 70, 0.3)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {currentStep + 1}/5
                  </MotionBox>

                  <VStack align="start" spacing={6}>
                    <Box>
                      <Heading
                        as="h3"
                        fontSize={{ base: '28px', md: '32px', lg: '36px' }}
                        fontWeight="600"
                        color="#111111"
                        mb={2}
                        letterSpacing="-0.02em"
                      >
                        {steps[currentStep].title}
                      </Heading>
                      <Text
                        fontSize="lg"
                        color={steps[currentStep].color}
                        fontWeight="500"
                      >
                        {steps[currentStep].subtitle}
                      </Text>
                    </Box>

                    <Text
                      fontSize={{ base: '16px', md: '17px' }}
                      color="#6e6e73"
                      lineHeight="1.8"
                      fontWeight="400"
                    >
                      {steps[currentStep].content}
                    </Text>

                    <Box
                      w="full"
                      p={5}
                      bg="#fff7ed"
                      borderRadius="16px"
                      border="1px solid"
                      borderColor="rgba(224, 142, 70, 0.2)"
                    >
                      <Text
                        fontSize="xs"
                        color="#86868b"
                        fontWeight="600"
                        mb={2}
                        textTransform="uppercase"
                        letterSpacing="0.08em"
                      >
                        成果物
                      </Text>
                      <Text
                        fontSize="md"
                        color="#111111"
                        fontWeight="600"
                      >
                        {steps[currentStep].deliverable}
                      </Text>
                    </Box>
                  </VStack>
                </MotionBox>
              </AnimatePresence>

              <Box
                flex={{ base: '1', lg: '0 0 40%' }}
                p={{ base: 6, md: 8 }}
                bg="#fafafa"
                borderRadius="24px"
                border="1px solid #f0f0f0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                minH={{ base: '300px', md: '400px', lg: '500px' }}
                maxW={{ base: 'full', lg: '550px' }}
              >
                <AnimatedSvgDisplay activeStep={currentStep} />
              </Box>
            </Flex>

            <Box textAlign="center" mt={{ base: 8, lg: 10 }}>
              <Text
                fontSize={{ base: 'xs', md: 'sm' }}
                color="#86868b"
                fontWeight="400"
                letterSpacing="0.02em"
              >
                ※ スクロールしてプロセスを進めてください
              </Text>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
