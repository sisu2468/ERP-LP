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
  ];

  // 理志：機能の選択肢（アイコンで視覚的に明確に）
  const features = [
    { id: 'cms', name: t('lab.simulator.feature.cms'), icon: HiDocumentText },
    { id: 'auth', name: t('lab.simulator.feature.auth'), icon: HiLockClosed },
    { id: 'payment', name: t('lab.simulator.feature.payment'), icon: HiCreditCard },
    { id: 'api', name: t('lab.simulator.feature.api'), icon: HiCloudUpload },
    { id: 'dashboard', name: t('lab.simulator.feature.dashboard'), icon: HiChartBar },
    { id: 'realtime', name: t('lab.simulator.feature.realtime'), icon: HiLightningBolt },
  ];

  // 理志：ページ規模の選択肢（シンプルに）
  const pageScales = [
    { id: 'small', name: t('lab.simulator.scale.pages.1'), desc: '1-5', icon: HiDocument },
    { id: 'medium', name: t('lab.simulator.scale.pages.2'), desc: '6-10', icon: HiDocumentDuplicate },
    { id: 'large', name: t('lab.simulator.scale.pages.3'), desc: '11-20', icon: HiLibrary },
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

    // プロジェクトタイプごとの基本料金
    switch (projectType) {
      case 'corporate':
        baseCost = 300000;
        break;
      case 'ec':
        baseCost = 500000;
        break;
      case 'webapp':
        baseCost = 800000;
        break;
      case 'mobile':
        baseCost = 1200000;
        break;
    }

    // 機能ごとの追加料金
    const featureCosts: Record<string, number> = {
      cms: 200000,
      auth: 150000,
      payment: 200000,
      api: 100000,
      dashboard: 400000,
      realtime: 300000,
    };

    const featureCost = selectedFeatures.reduce((sum, fId) => sum + (featureCosts[fId] || 0), 0);

    // ページ規模による乗数
    const pageMultipliers = { small: 1, medium: 1.3, large: 1.6 };
    const pageMultiplier = pageMultipliers[pageScale as keyof typeof pageMultipliers] || 1;

    // ユーザー規模による乗数
    const userMultipliers = { low: 1, medium: 1.2, high: 1.5 };
    const userMultiplier = userMultipliers[userScale as keyof typeof userMultipliers] || 1;

    const total = (baseCost + featureCost) * pageMultiplier * userMultiplier;
    const timeline = Math.ceil((selectedFeatures.length * 1.5 + (pageScale === 'large' ? 4 : pageScale === 'medium' ? 2 : 0)) + 4);
    
    return { cost: Math.round(total / 10000) * 10000, timeline };
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
      <Box py={{ base: 16, md: 24 }} bg="gray.50" position="relative" overflow="hidden">
        <Container maxW="container.xl">
          <VStack spacing={12}>
            {/* ヘッダー */}
            <VStack spacing={4} textAlign="center">
              <Badge
                colorScheme="orange"
                fontSize="md"
                px={4}
                py={2}
                borderRadius="full"
                border="2px"
                borderColor="orange.400"
              >
                {t('lab.simulator.badge')}
              </Badge>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="bold"
              >
                {t('lab.simulator.title')}
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" maxW="2xl">
                {t('lab.simulator.subtitle')}
              </Text>
            </VStack>

            {/* ステップインジケーター */}
            <Flex justify="center" align="center" gap={4} w="full" flexWrap="wrap">
              {[1, 2, 3, 4].map(step => (
                <Flex key={step} align="center">
                  <MotionBox
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    bg={currentStep >= step ? 'orange.400' : 'gray.300'}
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: currentStep === step ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step}
                  </MotionBox>
                  {step < 4 && (
                    <Box w={{ base: '30px', md: '60px' }} h="2px" bg={currentStep > step ? 'orange.400' : 'gray.300'} />
                  )}
                </Flex>
              ))}
            </Flex>

            {/* シミュレーターコンテンツ */}
            <Box
              w="full"
              bg={cardBg}
              p={{ base: 6, md: 10 }}
              borderRadius="2xl"
              border="1px"
              borderColor={borderColor}
              shadow="2xl"
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
                    <VStack spacing={6} align="stretch">
                      <Text fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }} textAlign="center">
                        {t('lab.simulator.step1.title')}
                      </Text>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={4}>
                        {projectTypes.map(type => (
                          <MotionBox
                            key={type.id}
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              onClick={() => setProjectType(type.id)}
                              variant={projectType === type.id ? 'solid' : 'outline'}
                              colorScheme="orange"
                              size="lg"
                              h="auto"
                              py={8}
                              w="full"
                              flexDirection="column"
                              gap={3}
                              fontSize={{ base: 'md', md: 'lg' }}
                              fontWeight="semibold"
                              borderWidth="2px"
                              bg={projectType === type.id ? 'orange.500' : 'white'}
                              _hover={{
                                bg: projectType === type.id ? 'orange.600' : 'gray.50',
                                borderColor: 'orange.500',
                              }}
                            >
                              <Icon as={type.icon} boxSize={8} />
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
                    <VStack spacing={6} align="stretch">
                      <Text fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }} textAlign="center">
                        {t('lab.simulator.step2.title')}
                      </Text>
                      <Text textAlign="center" color="gray.600" fontSize="sm">
                        複数選択可能
                      </Text>
                      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} mt={4}>
                        {features.map(feature => (
                          <MotionBox
                            key={feature.id}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              onClick={() => toggleFeature(feature.id)}
                              variant={selectedFeatures.includes(feature.id) ? 'solid' : 'outline'}
                              colorScheme="orange"
                              size="lg"
                              h="auto"
                              py={6}
                              w="full"
                              flexDirection="column"
                              gap={3}
                              borderWidth="2px"
                              bg={selectedFeatures.includes(feature.id) ? 'orange.500' : 'white'}
                              _hover={{
                                bg: selectedFeatures.includes(feature.id) ? 'orange.600' : 'gray.50',
                                borderColor: 'orange.500',
                              }}
                            >
                              <Icon as={feature.icon} boxSize={6} />
                              <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="semibold">
                                {feature.name}
                              </Text>
                            </Button>
                          </MotionBox>
                        ))}
                      </SimpleGrid>
                      {selectedFeatures.length > 0 && (
                        <Text textAlign="center" color="orange.500" fontWeight="bold">
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
                    <VStack spacing={10} align="stretch">
                      {/* ページ規模 */}
                      <Box>
                        <Text fontWeight="bold" fontSize={{ base: 'lg', md: 'xl' }} mb={4}>
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
                                variant={pageScale === scale.id ? 'solid' : 'outline'}
                                colorScheme="orange"
                                size="lg"
                                h="auto"
                                py={6}
                                w="full"
                                flexDirection="column"
                                gap={2}
                                borderWidth="2px"
                                bg={pageScale === scale.id ? 'orange.500' : 'white'}
                                _hover={{
                                  bg: pageScale === scale.id ? 'orange.600' : 'gray.50',
                                  borderColor: 'orange.500',
                                }}
                              >
                                <Icon as={scale.icon} boxSize={6} />
                                <Text fontWeight="bold">{scale.name}</Text>
                                <Text fontSize="sm" opacity={0.8}>{scale.desc}ページ</Text>
                              </Button>
                            </MotionBox>
                          ))}
                        </SimpleGrid>
                      </Box>

                      {/* ユーザー規模 */}
                      <Box>
                        <Text fontWeight="bold" fontSize={{ base: 'lg', md: 'xl' }} mb={4}>
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
                                variant={userScale === scale.id ? 'solid' : 'outline'}
                                colorScheme="orange"
                                size="lg"
                                h="auto"
                                py={6}
                                w="full"
                                flexDirection="column"
                                gap={2}
                                borderWidth="2px"
                                bg={userScale === scale.id ? 'orange.500' : 'white'}
                                _hover={{
                                  bg: userScale === scale.id ? 'orange.600' : 'gray.50',
                                  borderColor: 'orange.500',
                                }}
                              >
                                <Icon as={scale.icon} boxSize={6} />
                                <Text fontWeight="bold">{scale.name}</Text>
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
                        <VStack spacing={6}>
                          <Text fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }} textAlign="center">
                            選択内容の確認
                          </Text>
                          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="full" mt={4}>
                            {getSelectedTags().map((tag, idx) => (
                              <MotionFlex
                                key={idx}
                                p={4}
                                bg="white"
                                borderRadius="lg"
                                border="2px"
                                borderColor="orange.200"
                                align="center"
                                justify="center"
                                flexDirection="column"
                                gap={3}
                                shadow="sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <Icon as={tag.IconComponent} boxSize={8} color="orange.500" />
                                <Text fontSize="sm" fontWeight="semibold" textAlign="center" color="gray.700">
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
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <VStack
                            spacing={6}
                            p={8}
                            bg="linear-gradient(135deg, #e08e46 0%, #d97706 100%)"
                            borderRadius="2xl"
                            color="white"
                          >
                            <Text fontSize="2xl" fontWeight="bold">
                              {t('lab.simulator.result.title')}
                            </Text>
                            <VStack spacing={2}>
                              <Text fontSize={{ base: '4xl', md: '6xl' }} fontWeight="black">
                                ¥{calculateEstimate().cost.toLocaleString()}
                              </Text>
                              <Text fontSize="xl" opacity={0.9}>
                                開発期間: 約{calculateEstimate().timeline}週間
                              </Text>
                            </VStack>
                            <Text opacity={0.9} textAlign="center" fontSize="sm">
                              ※あくまで概算です。詳細はお問い合わせください。
                            </Text>
                            <HStack spacing={4} mt={4}>
                              <Button
                                bg="white"
                                color="#e08e46"
                                size="lg"
                                onClick={() => setIsModalOpen(true)}
                                _hover={{ bg: 'gray.100' }}
                              >
                                {t('lab.simulator.result.cta')}
                              </Button>
                              <Button
                                variant="outline"
                                color="white"
                                borderColor="white"
                                size="lg"
                                onClick={handleReset}
                                _hover={{ bg: 'whiteAlpha.200' }}
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
                <Flex justify="space-between" mt={10}>
                  <Button
                    leftIcon={<ChevronLeftIcon />}
                    onClick={handlePrev}
                    isDisabled={currentStep === 1}
                    variant="outline"
                    colorScheme="orange"
                    size="lg"
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
                    colorScheme="orange"
                    size="lg"
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
