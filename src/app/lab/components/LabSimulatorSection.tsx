'use client';

import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  SimpleGrid,
  Button,
  Text,
  Badge,
  HStack,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import {
  HiOfficeBuilding,
  HiShoppingCart,
  HiCog,
  HiDeviceMobile,
  HiDocumentText,
  HiLockClosed,
  HiCreditCard,
  HiCloudUpload,
  HiChartBar,
  HiLightningBolt,
  HiDocument,
  HiDocumentDuplicate,
  HiLibrary,
  HiUser,
  HiUserGroup,
  HiUsers,
} from 'react-icons/hi';
import { FiCheck } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import InquiryModal from '@/components/common/InquiryModal';
import GravityChamber from './GravityChamber';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function LabSimulatorSection() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [projectType, setProjectType] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [pageScale, setPageScale] = useState('small');
  const [userScale, setUserScale] = useState('low');
  const [showAnimation, setShowAnimation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectTypes = [
    { id: 'corporate', name: t('lab.simulator.type.corporate'), icon: HiOfficeBuilding },
    { id: 'ec', name: t('lab.simulator.type.ec'), icon: HiShoppingCart },
    { id: 'webapp', name: t('lab.simulator.type.webapp'), icon: HiCog },
    { id: 'mobile', name: t('lab.simulator.type.mobile'), icon: HiDeviceMobile },
    { id: 'management', name: t('lab.simulator.type.management'), icon: HiChartBar },
    { id: 'lp', name: t('lab.simulator.type.lp'), icon: HiDocumentText },
    { id: 'custom', name: t('lab.simulator.type.custom'), icon: HiLightningBolt },
  ];

  const features = [
    { id: 'responsive', name: t('lab.simulator.feature.responsive'), icon: HiDeviceMobile, cost: 30000, days: 7 },
    { id: 'multilang', name: t('lab.simulator.feature.multilang'), icon: HiDocument, cost: 100000, days: 7 },
    { id: 'seo', name: t('lab.simulator.feature.seo'), icon: HiChartBar, cost: 100000, days: 2 },
    { id: 'contact', name: t('lab.simulator.feature.contact'), icon: HiDocumentText, cost: 30000, days: 3 },
    { id: 'auth', name: t('lab.simulator.feature.auth'), icon: HiLockClosed, cost: 150000, days: 14 },
    { id: 'payment', name: t('lab.simulator.feature.payment'), icon: HiCreditCard, cost: 200000, days: 14 },
    { id: 'booking', name: t('lab.simulator.feature.booking'), icon: HiLibrary, cost: 250000, days: 14 },
    { id: 'dashboard', name: t('lab.simulator.feature.dashboard'), icon: HiChartBar, cost: 400000, days: 21 },
    { id: 'api', name: t('lab.simulator.feature.api'), icon: HiCloudUpload, cost: 100000, days: 14 },
    { id: 'cms', name: t('lab.simulator.feature.cms'), icon: HiDocumentText, cost: 200000, days: 10.5 },
    { id: 'realtime', name: t('lab.simulator.feature.realtime'), icon: HiLightningBolt, cost: 300000, days: 21 },
    { id: 'fileupload', name: t('lab.simulator.feature.fileupload'), icon: HiCloudUpload, cost: 200000, days: 7 },
    { id: 'notification', name: t('lab.simulator.feature.notification'), icon: HiUser, cost: 200000, days: 14 },
    { id: 'productmgmt', name: t('lab.simulator.feature.productmgmt'), icon: HiShoppingCart, cost: 300000, days: 14 },
    { id: 'inventory', name: t('lab.simulator.feature.inventory'), icon: HiLibrary, cost: 300000, days: 14 },
    { id: 'coupon', name: t('lab.simulator.feature.coupon'), icon: HiCreditCard, cost: 225000, days: 14 },
  ];

  const pageScales = [
    { id: 'small', name: t('lab.simulator.scale.pages.1'), desc: '1-5', icon: HiDocument },
    { id: 'medium', name: t('lab.simulator.scale.pages.2'), desc: '6-10', icon: HiDocumentDuplicate },
    { id: 'large', name: t('lab.simulator.scale.pages.3'), desc: '11-20', icon: HiLibrary },
    { id: 'xlarge', name: t('lab.simulator.scale.pages.4'), desc: '21+', icon: HiDocumentText },
  ];

  const userScales = [
    { id: 'low', name: t('lab.simulator.scale.users.1'), desc: '~100', icon: HiUser },
    { id: 'medium', name: t('lab.simulator.scale.users.2'), desc: '~1,000', icon: HiUserGroup },
    { id: 'high', name: t('lab.simulator.scale.users.3'), desc: '1,000+', icon: HiUsers },
  ];

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const calculateEstimate = useCallback(() => {
    let baseCost = 0;
    let baseDays = 0;

    switch (projectType) {
      case 'corporate': baseCost = 300000; baseDays = 14; break;
      case 'ec': baseCost = 500000; baseDays = 21; break;
      case 'webapp': baseCost = 800000; baseDays = 28; break;
      case 'mobile': baseCost = 1200000; baseDays = 35; break;
      case 'management': baseCost = 1000000; baseDays = 35; break;
      case 'lp': baseCost = 200000; baseDays = 7; break;
      case 'custom': baseCost = 500000; baseDays = 21; break;
    }

    let additionalCost = 0;
    let additionalDays = 0;

    selectedFeatures.forEach(fId => {
      const feature = features.find(f => f.id === fId);
      if (feature) {
        additionalCost += feature.cost;
        additionalDays += feature.days;
      }
    });

    const pageMultipliers = { small: 1, medium: 1.3, large: 1.6, xlarge: 2.0 };
    const pageMultiplier = pageMultipliers[pageScale as keyof typeof pageMultipliers] || 1;

    const userMultipliers = { low: 1, medium: 1.2, high: 1.5 };
    const userMultiplier = userMultipliers[userScale as keyof typeof userMultipliers] || 1;

    const totalCost = (baseCost + additionalCost) * pageMultiplier * userMultiplier;
    const totalDays = Math.ceil((baseDays + additionalDays) * pageMultiplier);

    return {
      cost: Math.round(totalCost / 10000) * 10000,
      timeline: Math.ceil(totalDays / 7)
    };
  }, [projectType, selectedFeatures, pageScale, userScale, features]);

  const handleNext = () => {
    if (currentStep === 1 && !projectType) return;
    if (currentStep === 2 && selectedFeatures.length === 0) return;

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        setShowResult(true);
      }, 2500);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setProjectType('');
    setSelectedFeatures([]);
    setPageScale('small');
    setUserScale('low');
    setShowAnimation(false);
    setShowResult(false);
  };

  const getSelectedTags = () => {
    const tags: Array<{ text: string; IconComponent: React.ElementType }> = [];

    const type = projectTypes.find(t => t.id === projectType);
    if (type) tags.push({ text: type.name, IconComponent: type.icon });

    selectedFeatures.forEach(fId => {
      const feature = features.find(f => f.id === fId);
      if (feature) tags.push({ text: feature.name, IconComponent: feature.icon });
    });

    const page = pageScales.find(p => p.id === pageScale);
    if (page) tags.push({ text: page.name, IconComponent: page.icon });

    const user = userScales.find(u => u.id === userScale);
    if (user) tags.push({ text: user.name, IconComponent: user.icon });

    return tags;
  };

  return (
    <>
      <Box id="simulator" py={{ base: 16, md: 24 }} bg="#fafafa">
        <Container maxW="7xl">
          <VStack spacing={{ base: 10, md: 16 }}>
            {/* Header */}
            <VStack spacing={6} textAlign="center" maxW="3xl" mx="auto">
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
                {t('lab.simulator.badge')}
              </Badge>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl", lg: "52px" }}
                fontWeight="700"
                color="#111111"
                letterSpacing="-0.02em"
                lineHeight="1.2"
              >
                {t('lab.simulator.title')}
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="#6e6e73"
                lineHeight="1.8"
              >
                {t('lab.simulator.subtitle')}
              </Text>
            </VStack>

            {/* Step Indicator */}
            <Flex justify="center" align="center" gap={{ base: 2, md: 3 }} w="full" flexWrap="wrap">
              {[1, 2, 3, 4].map(step => (
                <Flex key={step} align="center">
                  <MotionBox
                    w={{ base: "36px", md: "44px" }}
                    h={{ base: "36px", md: "44px" }}
                    borderRadius="full"
                    bg={currentStep >= step ? '#e08e46' : '#f5f5f5'}
                    color={currentStep >= step ? 'white' : '#6e6e73'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="600"
                    fontSize={{ base: "sm", md: "md" }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: currentStep === step ? 1.1 : 1,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.3 }}
                    boxShadow={currentStep === step ? '0 0 0 4px rgba(224, 142, 70, 0.2)' : 'none'}
                  >
                    {currentStep > step ? <FiCheck /> : step}
                  </MotionBox>
                  {step < 4 && (
                    <Box
                      w={{ base: '24px', md: '60px' }}
                      h="2px"
                      bg={currentStep > step ? '#e08e46' : '#e5e7eb'}
                      transition="all 0.3s"
                    />
                  )}
                </Flex>
              ))}
            </Flex>

            {/* Simulator Content */}
            <Box
              w="full"
              bg="white"
              p={{ base: 5, md: 10 }}
              borderRadius="2xl"
              border="1px solid"
              borderColor="#e5e7eb"
              minH={{ base: "auto", md: "500px" }}
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Project Type */}
                {currentStep === 1 && (
                  <MotionBox
                    key="step1"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <VStack spacing={6} align="stretch">
                      <Text
                        fontWeight="700"
                        fontSize={{ base: "xl", md: "2xl" }}
                        textAlign="center"
                        color="#111111"
                      >
                        {t('lab.simulator.step1.title')}
                      </Text>
                      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
                        {projectTypes.map(type => (
                          <Button
                            key={type.id}
                            onClick={() => setProjectType(type.id)}
                            variant="unstyled"
                            h="auto"
                            py={5}
                            px={4}
                            w="full"
                            display="flex"
                            alignItems="center"
                            gap={3}
                            fontSize="md"
                            fontWeight="600"
                            borderWidth="1px"
                            borderRadius="xl"
                            bg={projectType === type.id ? '#e08e46' : 'white'}
                            color={projectType === type.id ? 'white' : '#111111'}
                            borderColor={projectType === type.id ? '#e08e46' : '#e5e7eb'}
                            transition="all 0.2s"
                            _hover={{
                              borderColor: '#e08e46',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 12px rgba(224, 142, 70, 0.15)',
                            }}
                          >
                            <Icon as={type.icon} boxSize={6} />
                            <Text textAlign="left">{type.name}</Text>
                          </Button>
                        ))}
                      </SimpleGrid>
                    </VStack>
                  </MotionBox>
                )}

                {/* Step 2: Features */}
                {currentStep === 2 && (
                  <MotionBox
                    key="step2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <VStack spacing={6} align="stretch">
                      <VStack spacing={2}>
                        <Text
                          fontWeight="700"
                          fontSize={{ base: "xl", md: "2xl" }}
                          textAlign="center"
                          color="#111111"
                        >
                          {t('lab.simulator.step2.title')}
                        </Text>
                        {selectedFeatures.length > 0 && (
                          <Badge
                            bg="rgba(224, 142, 70, 0.1)"
                            color="#e08e46"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="sm"
                          >
                            {selectedFeatures.length}個選択中
                          </Badge>
                        )}
                      </VStack>
                      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={3}>
                        {features.map(feature => (
                          <Button
                            key={feature.id}
                            onClick={() => toggleFeature(feature.id)}
                            variant="unstyled"
                            h="auto"
                            py={4}
                            px={3}
                            w="full"
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            borderWidth="1px"
                            borderRadius="xl"
                            bg={selectedFeatures.includes(feature.id) ? '#e08e46' : 'white'}
                            color={selectedFeatures.includes(feature.id) ? 'white' : '#111111'}
                            borderColor={selectedFeatures.includes(feature.id) ? '#e08e46' : '#e5e7eb'}
                            transition="all 0.2s"
                            _hover={{
                              borderColor: '#e08e46',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 12px rgba(224, 142, 70, 0.15)',
                            }}
                          >
                            <Icon as={feature.icon} boxSize={5} />
                            <Text fontSize="xs" fontWeight="600" textAlign="center" lineHeight="1.3">
                              {feature.name}
                            </Text>
                          </Button>
                        ))}
                      </SimpleGrid>
                    </VStack>
                  </MotionBox>
                )}

                {/* Step 3: Scale */}
                {currentStep === 3 && (
                  <MotionBox
                    key="step3"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <VStack spacing={10} align="stretch">
                      {/* Page Scale */}
                      <Box>
                        <Text
                          fontWeight="700"
                          fontSize={{ base: "lg", md: "xl" }}
                          mb={4}
                          color="#111111"
                        >
                          {t('lab.simulator.scale.pages')}
                        </Text>
                        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
                          {pageScales.map(scale => (
                            <Button
                              key={scale.id}
                              onClick={() => setPageScale(scale.id)}
                              variant="unstyled"
                              h="auto"
                              py={4}
                              px={3}
                              w="full"
                              display="flex"
                              flexDirection="column"
                              gap={2}
                              borderWidth="1px"
                              borderRadius="xl"
                              bg={pageScale === scale.id ? '#e08e46' : 'white'}
                              color={pageScale === scale.id ? 'white' : '#111111'}
                              borderColor={pageScale === scale.id ? '#e08e46' : '#e5e7eb'}
                              transition="all 0.2s"
                              _hover={{
                                borderColor: '#e08e46',
                                transform: 'translateY(-2px)',
                              }}
                            >
                              <Icon as={scale.icon} boxSize={5} />
                              <Text fontSize="sm" fontWeight="600">{scale.name}</Text>
                            </Button>
                          ))}
                        </SimpleGrid>
                      </Box>

                      {/* User Scale */}
                      <Box>
                        <Text
                          fontWeight="700"
                          fontSize={{ base: "lg", md: "xl" }}
                          mb={4}
                          color="#111111"
                        >
                          {t('lab.simulator.scale.users')}
                        </Text>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
                          {userScales.map(scale => (
                            <Button
                              key={scale.id}
                              onClick={() => setUserScale(scale.id)}
                              variant="unstyled"
                              h="auto"
                              py={4}
                              px={4}
                              w="full"
                              display="flex"
                              alignItems="center"
                              gap={3}
                              borderWidth="1px"
                              borderRadius="xl"
                              bg={userScale === scale.id ? '#e08e46' : 'white'}
                              color={userScale === scale.id ? 'white' : '#111111'}
                              borderColor={userScale === scale.id ? '#e08e46' : '#e5e7eb'}
                              transition="all 0.2s"
                              _hover={{
                                borderColor: '#e08e46',
                                transform: 'translateY(-2px)',
                              }}
                            >
                              <Icon as={scale.icon} boxSize={5} />
                              <VStack align="flex-start" spacing={0}>
                                <Text fontSize="sm" fontWeight="600">{scale.name}</Text>
                                <Text fontSize="xs" opacity={0.8}>{scale.desc}人/月</Text>
                              </VStack>
                            </Button>
                          ))}
                        </SimpleGrid>
                      </Box>
                    </VStack>
                  </MotionBox>
                )}

                {/* Step 4: Confirm & Result */}
                {currentStep === 4 && (
                  <MotionBox
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <VStack spacing={6}>
                      {!showAnimation && !showResult && (
                        <VStack spacing={6} w="full">
                          <Text
                            fontWeight="700"
                            fontSize={{ base: "xl", md: "2xl" }}
                            textAlign="center"
                            color="#111111"
                          >
                            選択内容の確認
                          </Text>
                          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3} w="full">
                            {getSelectedTags().map((tag, idx) => (
                              <MotionFlex
                                key={idx}
                                p={4}
                                bg="#fafafa"
                                borderRadius="xl"
                                border="1px solid"
                                borderColor="#e5e7eb"
                                align="center"
                                justify="center"
                                flexDirection="column"
                                gap={2}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                              >
                                <Icon as={tag.IconComponent} boxSize={6} color="#e08e46" />
                                <Text fontSize="xs" fontWeight="600" textAlign="center" color="#111111">
                                  {tag.text}
                                </Text>
                              </MotionFlex>
                            ))}
                          </SimpleGrid>
                        </VStack>
                      )}

                      {/* Animation */}
                      {showAnimation && (
                        <VStack spacing={4} w="full">
                          <Text fontWeight="700" fontSize="xl" color="#e08e46">
                            見積もり計算中...
                          </Text>
                          <Box w="full" h={{ base: "300px", md: "400px" }} borderRadius="xl" overflow="hidden">
                            <GravityChamber tags={getSelectedTags()} />
                          </Box>
                        </VStack>
                      )}

                      {/* Result */}
                      {showResult && (
                        <MotionBox
                          w="full"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <VStack
                            spacing={6}
                            p={{ base: 6, md: 10 }}
                            bg="#fafafa"
                            borderRadius="2xl"
                            border="1px solid"
                            borderColor="#e5e7eb"
                          >
                            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="600" color="#6e6e73">
                              {t('lab.simulator.result.title')}
                            </Text>
                            <VStack spacing={4}>
                              <Box textAlign="center">
                                <Text fontSize="sm" fontWeight="600" color="#6e6e73" mb={1}>
                                  見積もり金額
                                </Text>
                                <Text fontSize={{ base: "4xl", md: "6xl" }} fontWeight="700" color="#111111" letterSpacing="-0.02em">
                                  ¥{calculateEstimate().cost.toLocaleString()}
                                </Text>
                              </Box>
                              <Box textAlign="center">
                                <Text fontSize="sm" fontWeight="600" color="#6e6e73" mb={1}>
                                  開発期間
                                </Text>
                                <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700" color="#111111">
                                  約{calculateEstimate().timeline}週間
                                </Text>
                              </Box>
                            </VStack>
                            <Text fontSize="sm" color="#6e6e73" textAlign="center">
                              ※ あくまで概算です。詳細はお問い合わせください。
                            </Text>
                            <HStack spacing={3} flexWrap="wrap" justify="center" pt={4}>
                              <Button
                                bg="linear-gradient(135deg, #e08e46 0%, #f4a460 100%)"
                                color="white"
                                size="lg"
                                px={8}
                                h="56px"
                                fontWeight="700"
                                borderRadius="full"
                                onClick={() => setIsModalOpen(true)}
                                boxShadow="0 4px 14px rgba(224, 142, 70, 0.4)"
                                _hover={{
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 8px 24px rgba(224, 142, 70, 0.5)',
                                }}
                                transition="all 0.2s"
                              >
                                {t('lab.simulator.result.cta')}
                              </Button>
                              <Button
                                variant="outline"
                                color="#111111"
                                borderColor="#e5e7eb"
                                size="lg"
                                px={8}
                                h="56px"
                                fontWeight="700"
                                borderRadius="full"
                                onClick={handleReset}
                                _hover={{
                                  bg: '#fafafa',
                                  transform: 'translateY(-2px)',
                                }}
                                transition="all 0.2s"
                              >
                                もう一度試す
                              </Button>
                            </HStack>
                          </VStack>
                        </MotionBox>
                      )}
                    </VStack>
                  </MotionBox>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              {!showAnimation && !showResult && (
                <Flex justify="space-between" mt={8} gap={3}>
                  <Button
                    leftIcon={<ChevronLeftIcon />}
                    onClick={handlePrev}
                    isDisabled={currentStep === 1}
                    variant="ghost"
                    color="#6e6e73"
                    size="lg"
                    px={6}
                    h="52px"
                    fontWeight="600"
                    borderRadius="full"
                    _hover={{ bg: '#f5f5f5' }}
                    transition="all 0.2s"
                  >
                    戻る
                  </Button>
                  <Button
                    rightIcon={<ChevronRightIcon />}
                    onClick={handleNext}
                    isDisabled={
                      (currentStep === 1 && !projectType) ||
                      (currentStep === 2 && selectedFeatures.length === 0)
                    }
                    bg="linear-gradient(135deg, #e08e46 0%, #f4a460 100%)"
                    color="white"
                    size="lg"
                    px={8}
                    h="52px"
                    fontWeight="700"
                    borderRadius="full"
                    boxShadow="0 4px 14px rgba(224, 142, 70, 0.4)"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(224, 142, 70, 0.5)',
                    }}
                    _active={{ transform: 'translateY(0)' }}
                    _disabled={{
                      opacity: 0.5,
                      cursor: 'not-allowed',
                      transform: 'none',
                      boxShadow: 'none',
                    }}
                    transition="all 0.2s"
                  >
                    {currentStep === 4 ? '見積もりを計算' : '次へ'}
                  </Button>
                </Flex>
              )}
            </Box>
          </VStack>
        </Container>
      </Box>

      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
