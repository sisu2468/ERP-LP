'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  SimpleGrid,
  Button,
  Text,
  Badge,
  useColorModeValue,
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
import { useLanguage } from '@/contexts/LanguageContext';
import InquiryModal from '@/components/common/InquiryModal';
import GravityChamber from './GravityChamber';
import TranslatedText from '@/components/common/TranslatedText';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// 理志：見積もりシミュレーター - ステップバイステップ + Three.js
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

  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');

  // 理志：プロジェクトタイプの選択肢（React Iconsでプロフェッショナルに）
  const projectTypes = [
    { id: 'corporate', name: t('lab.simulator.type.corporate'), icon: HiOfficeBuilding },
    { id: 'ec', name: t('lab.simulator.type.ec'), icon: HiShoppingCart },
    { id: 'webapp', name: t('lab.simulator.type.webapp'), icon: HiCog },
    { id: 'mobile', name: t('lab.simulator.type.mobile'), icon: HiDeviceMobile },
    { id: 'management', name: t('lab.simulator.type.management'), icon: HiChartBar },
    { id: 'lp', name: t('lab.simulator.type.lp'), icon: HiDocumentText },
    { id: 'custom', name: t('lab.simulator.type.custom'), icon: HiLightningBolt },
  ];

  // 理志：機能の選択肢（アイコンで視覚的に明確に）
  const features = [
    { id: 'responsive', name: t('lab.simulator.feature.responsive'), icon: HiDeviceMobile, cost: 30000, days: 7, perPage: true },
    { id: 'multilang', name: t('lab.simulator.feature.multilang'), icon: HiDocument, cost: 100000, days: 7, perLang: true },
    { id: 'seo', name: t('lab.simulator.feature.seo'), icon: HiChartBar, cost: 100000, days: 2 },
    { id: 'contact', name: t('lab.simulator.feature.contact'), icon: HiDocumentText, cost: 30000, days: 3, needsBackend: true },
    { id: 'auth', name: t('lab.simulator.feature.auth'), icon: HiLockClosed, cost: 150000, days: 14, needsBackend: true, needsDb: true },
    { id: 'payment', name: t('lab.simulator.feature.payment'), icon: HiCreditCard, cost: 200000, days: 14, needsBackend: true },
    { id: 'booking', name: t('lab.simulator.feature.booking'), icon: HiLibrary, cost: 250000, days: 14, needsBackend: true, needsDb: true },
    { id: 'dashboard', name: t('lab.simulator.feature.dashboard'), icon: HiChartBar, cost: 400000, days: 21, needsBackend: true, needsDb: true },
    { id: 'api', name: t('lab.simulator.feature.api'), icon: HiCloudUpload, cost: 100000, days: 14, needsBackend: true, perApi: true },
    { id: 'cms', name: t('lab.simulator.feature.cms'), icon: HiDocumentText, cost: 200000, days: 10.5, needsBackend: true, needsDb: true },
    { id: 'realtime', name: t('lab.simulator.feature.realtime'), icon: HiLightningBolt, cost: 300000, days: 21, needsBackend: true },
    { id: 'fileupload', name: t('lab.simulator.feature.fileupload'), icon: HiCloudUpload, cost: 200000, days: 7, needsBackend: true, needsDb: true },
    { id: 'notification', name: t('lab.simulator.feature.notification'), icon: HiUser, cost: 200000, days: 14, needsBackend: true },
    { id: 'productmgmt', name: t('lab.simulator.feature.productmgmt'), icon: HiShoppingCart, cost: 300000, days: 14, needsBackend: true, needsDb: true, ecOnly: true },
    { id: 'inventory', name: t('lab.simulator.feature.inventory'), icon: HiLibrary, cost: 300000, days: 14, needsBackend: true, needsDb: true, ecOnly: true },
    { id: 'coupon', name: t('lab.simulator.feature.coupon'), icon: HiCreditCard, cost: 225000, days: 14, needsBackend: true, needsDb: true, ecOnly: true },
  ];

  // 理志：ページ規模の選択肢（シンプルに）
  const pageScales = [
    { id: 'small', name: t('lab.simulator.scale.pages.1'), desc: '1-5', icon: HiDocument },
    { id: 'medium', name: t('lab.simulator.scale.pages.2'), desc: '6-10', icon: HiDocumentDuplicate },
    { id: 'large', name: t('lab.simulator.scale.pages.3'), desc: '11-20', icon: HiLibrary },
    { id: 'xlarge', name: t('lab.simulator.scale.pages.4'), desc: '21+', icon: HiDocumentText },
  ];

  // 理志：ユーザー規模の選択肢（明確に）
  const userScales = [
    { id: 'low', name: t('lab.simulator.scale.users.1'), desc: '~100', icon: HiUser },
    { id: 'medium', name: t('lab.simulator.scale.users.2'), desc: '~1,000', icon: HiUserGroup },
    { id: 'high', name: t('lab.simulator.scale.users.3'), desc: '1,000+', icon: HiUsers },
  ];

  // 理志：機能の選択/解除
  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  // 理志：見積もり計算
  const calculateEstimate = () => {
    let baseCost = 0;
    let baseDays = 0;

    // プロジェクトタイプごとの基本料金と期間
    switch (projectType) {
      case 'corporate':
        baseCost = 300000;
        baseDays = 14;
        break;
      case 'ec':
        baseCost = 500000;
        baseDays = 21;
        break;
      case 'webapp':
        baseCost = 800000;
        baseDays = 28;
        break;
      case 'mobile':
        baseCost = 1200000;
        baseDays = 35;
        break;
      case 'management':
        baseCost = 1000000;
        baseDays = 35;
        break;
      case 'lp':
        baseCost = 200000;
        baseDays = 7;
        break;
      case 'custom':
        baseCost = 500000;
        baseDays = 21;
        break;
    }

    // 機能ごとの追加料金と期間
    let additionalCost = 0;
    let additionalDays = 0;

    selectedFeatures.forEach(fId => {
      const feature = features.find(f => f.id === fId);
      if (feature) {
        additionalCost += feature.cost;
        additionalDays += feature.days;
      }
    });

    // ページ規模による乗数
    const pageMultipliers = { small: 1, medium: 1.3, large: 1.6, xlarge: 2.0 };
    const pageMultiplier = pageMultipliers[pageScale as keyof typeof pageMultipliers] || 1;

    // ユーザー規模による乗数
    const userMultipliers = { low: 1, medium: 1.2, high: 1.5 };
    const userMultiplier = userMultipliers[userScale as keyof typeof userMultipliers] || 1;

    const totalCost = (baseCost + additionalCost) * pageMultiplier * userMultiplier;
    const totalDays = Math.ceil((baseDays + additionalDays) * pageMultiplier);
    
    return { 
      cost: Math.round(totalCost / 10000) * 10000, 
      timeline: Math.ceil(totalDays / 7) // Convert to weeks
    };
  };

  // 理志：次のステップへ
  const handleNext = () => {
    if (currentStep === 1 && !projectType) return;
    if (currentStep === 2 && selectedFeatures.length === 0) return;
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Step 4: アニメーション開始
      setShowAnimation(true);
      // 2.5秒後に結果表示
      setTimeout(() => {
        setShowAnimation(false);
        setShowResult(true);
      }, 2500);
    }
  };

  // 理志：前のステップへ
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 理志：リセット
  const handleReset = () => {
    setCurrentStep(1);
    setProjectType('');
    setSelectedFeatures([]);
    setPageScale('small');
    setUserScale('low');
    setShowAnimation(false);
    setShowResult(false);
  };

  // 理志：選択されたタグのデータ（アイコンコンポーネントも含める）
  const getSelectedTags = () => {
    const tags: Array<{ text: string; IconComponent: React.ElementType }> = [];
    
    // プロジェクトタイプ
    const type = projectTypes.find(t => t.id === projectType);
    if (type) tags.push({ text: type.name, IconComponent: type.icon });
    
    // 機能
    selectedFeatures.forEach(fId => {
      const feature = features.find(f => f.id === fId);
      if (feature) tags.push({ text: feature.name, IconComponent: feature.icon });
    });
    
    // ページ規模
    const page = pageScales.find(p => p.id === pageScale);
    if (page) tags.push({ text: page.name, IconComponent: page.icon });
    
    // ユーザー規模
    const user = userScales.find(u => u.id === userScale);
    if (user) tags.push({ text: user.name, IconComponent: user.icon });
    
    return tags;
  };

  return (
    <>
      <Box id="simulator" py={{ base: 20, md: 32 }} bg="white" position="relative" overflow="hidden">
        <Container maxW="container.xl">
          <VStack spacing={{ base: 16, md: 20 }}>
            {/* ヘッダー */}
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
              >
                {t('lab.simulator.badge')}
              </Badge>
              <Heading
                as="h2"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                fontWeight="700"
                letterSpacing="-0.02em"
                lineHeight="1.1"
                color="gray.900"
              >
                <TranslatedText translationKey="lab.simulator.title" as="span" staggerDelay={0.05} />
              </Heading>
              <Text 
                fontSize={{ base: 'lg', md: 'xl' }} 
                color="gray.600" 
                maxW="2xl"
                lineHeight="1.7"
                fontWeight="400"
              >
                <TranslatedText translationKey="lab.simulator.subtitle" as="span" staggerDelay={0.03} />
              </Text>
            </VStack>

            {/* ステップインジケーター */}
            <Flex justify="center" align="center" gap={3} w="full" flexWrap="wrap">
              {[1, 2, 3, 4].map(step => (
                <Flex key={step} align="center">
                  <MotionBox
                    w="48px"
                    h="48px"
                    borderRadius="full"
                    bg={currentStep >= step ? 'orange.500' : 'gray.100'}
                    color={currentStep >= step ? 'white' : 'gray.400'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="600"
                    fontSize="lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: currentStep === step ? 1.1 : 1,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.3 }}
                    boxShadow={currentStep === step ? '0 0 0 4px rgba(224, 142, 70, 0.2)' : 'none'}
                  >
                    {step}
                  </MotionBox>
                  {step < 4 && (
                    <Box 
                      w={{ base: '40px', md: '80px' }} 
                      h="2px" 
                      bg={currentStep > step ? 'orange.500' : 'gray.200'} 
                      transition="all 0.3s"
                    />
                  )}
                </Flex>
              ))}
            </Flex>

            {/* シミュレーターコンテンツ */}
            <Box
              w="full"
              bg="white"
              p={{ base: 8, md: 12 }}
              borderRadius="24px"
              border="1px"
              borderColor="gray.200"
              shadow="xl"
              minH="500px"
            >
              <AnimatePresence mode="wait">
                {/* Step 1: プロジェクトタイプ */}
                {currentStep === 1 && (
                  <MotionBox
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <VStack spacing={8} align="stretch">
                      <Text 
                        fontWeight="600" 
                        fontSize={{ base: '2xl', md: '3xl' }} 
                        textAlign="center"
                        color="gray.900"
                        letterSpacing="-0.01em"
                      >
                        {t('lab.simulator.step1.title')}
                      </Text>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mt={6}>
                        {projectTypes.map(type => (
                          <MotionBox
                            key={type.id}
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              onClick={() => setProjectType(type.id)}
                              variant="unstyled"
                              size="lg"
                              h="auto"
                              py={8}
                              px={6}
                              w="full"
                              display="flex"
                              flexDirection="column"
                              gap={4}
                              fontSize="lg"
                              fontWeight="600"
                              borderWidth="1.5px"
                              borderRadius="16px"
                              bg={projectType === type.id ? 'orange.500' : 'white'}
                              color={projectType === type.id ? 'white' : 'gray.900'}
                              borderColor={projectType === type.id ? 'orange.500' : 'gray.200'}
                              transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                              _hover={{
                                bg: projectType === type.id ? 'orange.600' : 'gray.50',
                                borderColor: projectType === type.id ? 'orange.600' : 'orange.300',
                                shadow: 'md',
                              }}
                            >
                              <Icon as={type.icon} boxSize={10} />
                              {type.name}
                            </Button>
                          </MotionBox>
                        ))}
                      </SimpleGrid>
                    </VStack>
                  </MotionBox>
                )}

                {/* Step 2: 機能選択 */}
                {currentStep === 2 && (
                  <MotionBox
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <VStack spacing={8} align="stretch">
                      <VStack spacing={3}>
                        <Text 
                          fontWeight="600" 
                          fontSize={{ base: '2xl', md: '3xl' }} 
                          textAlign="center"
                          color="gray.900"
                          letterSpacing="-0.01em"
                        >
                          {t('lab.simulator.step2.title')}
                        </Text>
                        <Text textAlign="center" color="gray.500" fontSize="md" fontWeight="500">
                          複数選択可能
                        </Text>
                      </VStack>
                      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} mt={4}>
                        {features.map(feature => (
                          <MotionBox
                            key={feature.id}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              onClick={() => toggleFeature(feature.id)}
                              variant="unstyled"
                              size="lg"
                              h="auto"
                              py={5}
                              px={4}
                              w="full"
                              display="flex"
                              flexDirection="column"
                              gap={3}
                              borderWidth="1.5px"
                              borderRadius="12px"
                              bg={selectedFeatures.includes(feature.id) ? 'orange.500' : 'white'}
                              color={selectedFeatures.includes(feature.id) ? 'white' : 'gray.900'}
                              borderColor={selectedFeatures.includes(feature.id) ? 'orange.500' : 'gray.200'}
                              transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                              _hover={{
                                bg: selectedFeatures.includes(feature.id) ? 'orange.600' : 'gray.50',
                                borderColor: selectedFeatures.includes(feature.id) ? 'orange.600' : 'orange.300',
                                shadow: 'md',
                              }}
                            >
                              <Icon as={feature.icon} boxSize={6} />
                              <Text fontSize="sm" fontWeight="600" textAlign="center">
                                {feature.name}
                              </Text>
                            </Button>
                          </MotionBox>
                        ))}
                      </SimpleGrid>
                      {selectedFeatures.length > 0 && (
                        <Text textAlign="center" color="orange.600" fontWeight="600" fontSize="md">
                          {selectedFeatures.length}個選択中
                        </Text>
                      )}
                    </VStack>
                  </MotionBox>
                )}

                {/* Step 3: ページ規模 & ユーザー規模 */}
                {currentStep === 3 && (
                  <MotionBox
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <VStack spacing={12} align="stretch">
                      {/* ページ規模 */}
                      <Box>
                        <Text 
                          fontWeight="600" 
                          fontSize={{ base: 'xl', md: '2xl' }} 
                          mb={6}
                          color="gray.900"
                          letterSpacing="-0.01em"
                        >
                          {t('lab.simulator.scale.pages')}
                        </Text>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                          {pageScales.map(scale => (
                            <MotionBox
                              key={scale.id}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                onClick={() => setPageScale(scale.id)}
                                variant="unstyled"
                                size="lg"
                                h="auto"
                                py={6}
                                px={4}
                                w="full"
                                display="flex"
                                flexDirection="column"
                                gap={2}
                                borderWidth="1.5px"
                                borderRadius="12px"
                                bg={pageScale === scale.id ? 'orange.500' : 'white'}
                                color={pageScale === scale.id ? 'white' : 'gray.900'}
                                borderColor={pageScale === scale.id ? 'orange.500' : 'gray.200'}
                                transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                                _hover={{
                                  bg: pageScale === scale.id ? 'orange.600' : 'gray.50',
                                  borderColor: pageScale === scale.id ? 'orange.600' : 'orange.300',
                                  shadow: 'md',
                                }}
                              >
                                <Icon as={scale.icon} boxSize={6} />
                                <Text fontWeight="600">{scale.name}</Text>
                                <Text fontSize="sm" opacity={0.8}>{scale.desc}ページ</Text>
                              </Button>
                            </MotionBox>
                          ))}
                        </SimpleGrid>
                      </Box>

                      {/* ユーザー規模 */}
                      <Box>
                        <Text 
                          fontWeight="600" 
                          fontSize={{ base: 'xl', md: '2xl' }} 
                          mb={6}
                          color="gray.900"
                          letterSpacing="-0.01em"
                        >
                          {t('lab.simulator.scale.users')}
                        </Text>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                          {userScales.map(scale => (
                            <MotionBox
                              key={scale.id}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                onClick={() => setUserScale(scale.id)}
                                variant="unstyled"
                                size="lg"
                                h="auto"
                                py={6}
                                px={4}
                                w="full"
                                display="flex"
                                flexDirection="column"
                                gap={2}
                                borderWidth="1.5px"
                                borderRadius="12px"
                                bg={userScale === scale.id ? 'orange.500' : 'white'}
                                color={userScale === scale.id ? 'white' : 'gray.900'}
                                borderColor={userScale === scale.id ? 'orange.500' : 'gray.200'}
                                transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                                _hover={{
                                  bg: userScale === scale.id ? 'orange.600' : 'gray.50',
                                  borderColor: userScale === scale.id ? 'orange.600' : 'orange.300',
                                  shadow: 'md',
                                }}
                              >
                                <Icon as={scale.icon} boxSize={6} />
                                <Text fontWeight="600">{scale.name}</Text>
                                <Text fontSize="sm" opacity={0.8}>{scale.desc}人/月</Text>
                              </Button>
                            </MotionBox>
                          ))}
                        </SimpleGrid>
                      </Box>
                    </VStack>
                  </MotionBox>
                )}

                {/* Step 4: アニメーション & 結果 */}
                {currentStep === 4 && (
                  <MotionBox
                    key="step4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <VStack spacing={8}>
                      {!showAnimation && !showResult && (
                        <VStack spacing={8}>
                          <Text 
                            fontWeight="600" 
                            fontSize={{ base: '2xl', md: '3xl' }} 
                            textAlign="center"
                            color="gray.900"
                            letterSpacing="-0.01em"
                          >
                            選択内容の確認
                          </Text>
                          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={5} w="full" mt={4}>
                            {getSelectedTags().map((tag, idx) => (
                              <MotionFlex
                                key={idx}
                                p={5}
                                bg="white"
                                borderRadius="12px"
                                border="1.5px solid"
                                borderColor="gray.200"
                                align="center"
                                justify="center"
                                flexDirection="column"
                                gap={3}
                                shadow="sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.08 }}
                                _hover={{
                                  shadow: 'md',
                                  borderColor: 'orange.300',
                                }}
                              >
                                <Icon as={tag.IconComponent} boxSize={8} color="orange.500" />
                                <Text fontSize="sm" fontWeight="600" textAlign="center" color="gray.800">
                                  {tag.text}
                                </Text>
                              </MotionFlex>
                            ))}
                          </SimpleGrid>
                        </VStack>
                      )}

                      {/* アニメーション表示 */}
                      {showAnimation && (
                        <VStack spacing={6} w="full">
                          <Text fontWeight="bold" fontSize="2xl" color="orange.500">
                            見積もり計算中...
                          </Text>
                          <Box w="full" h="400px" borderRadius="xl" overflow="hidden">
                            <GravityChamber tags={getSelectedTags()} />
                          </Box>
                        </VStack>
                      )}

                      {/* 結果表示 */}
                      {showResult && (
                        <MotionBox
                          w="full"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <VStack
                            spacing={8}
                            p={{ base: 8, md: 12 }}
                            bg="white"
                            border="1px solid"
                            borderColor="gray.100"
                            borderRadius="24px"
                            shadow="xl"
                          >
                            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="600" letterSpacing="-0.01em" color="gray.700">
                              {t('lab.simulator.result.title')}
                            </Text>
                            <VStack spacing={6}>
                              <Box>
                                <Text fontSize="sm" fontWeight="600" color="gray.500" mb={2} textTransform="uppercase" letterSpacing="0.05em">
                                  見積もり金額
                                </Text>
                                <Text fontSize={{ base: '5xl', md: '7xl' }} fontWeight="800" letterSpacing="-0.02em" color="gray.900">
                                  ¥{calculateEstimate().cost.toLocaleString()}
                                </Text>
                              </Box>
                              <Box textAlign="center">
                                <Text fontSize="sm" fontWeight="600" color="gray.500" mb={1} textTransform="uppercase" letterSpacing="0.05em">
                                  開発期間
                                </Text>
                                <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="700" color="gray.900">
                                  約{calculateEstimate().timeline}週間
                                </Text>
                              </Box>
                            </VStack>
                            <Box bg="gray.50" p={4} borderRadius="12px" border="1px solid" borderColor="gray.100">
                              <Text color="gray.600" textAlign="center" fontSize="sm" fontWeight="500">
                                ※ あくまで概算です。詳細はお問い合わせください。
                              </Text>
                            </Box>
                            <HStack spacing={4} mt={6} flexWrap="wrap" justify="center">
                              <Button
                                bg="orange.500"
                                color="white"
                                size="lg"
                                px={8}
                                h="56px"
                                fontSize="md"
                                fontWeight="600"
                                borderRadius="12px"
                                onClick={() => setIsModalOpen(true)}
                                _hover={{ bg: 'orange.600', transform: 'translateY(-2px)' }}
                                transition="all 0.2s"
                                shadow="lg"
                              >
                                {t('lab.simulator.result.cta')}
                              </Button>
                              <Button
                                variant="outline"
                                color="gray.700"
                                borderColor="gray.200"
                                borderWidth="1.5px"
                                size="lg"
                                px={8}
                                h="56px"
                                fontSize="md"
                                fontWeight="600"
                                borderRadius="12px"
                                onClick={handleReset}
                                _hover={{ bg: 'gray.50', transform: 'translateY(-2px)' }}
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

              {/* ナビゲーションボタン */}
              {!showAnimation && !showResult && (
                <Flex justify="space-between" mt={12} gap={4}>
                  <Button
                    leftIcon={<ChevronLeftIcon />}
                    onClick={handlePrev}
                    isDisabled={currentStep === 1}
                    variant="ghost"
                    colorScheme="gray"
                    size="lg"
                    px={6}
                    h="56px"
                    fontSize="md"
                    fontWeight="600"
                    borderRadius="12px"
                    _hover={{ bg: 'gray.100' }}
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
                    bg="orange.500"
                    color="white"
                    size="lg"
                    px={8}
                    h="56px"
                    fontSize="md"
                    fontWeight="600"
                    borderRadius="12px"
                    _hover={{ bg: 'orange.600', transform: 'translateY(-2px)' }}
                    _active={{ transform: 'translateY(0)' }}
                    transition="all 0.2s"
                    shadow="lg"
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
