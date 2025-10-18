'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Badge, Box, Button, Checkbox, Container, Flex, Grid, Heading, Radio, RadioGroup, Stack, Text, VStack, useColorMode, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import InquiryModal from '@/components/common/InquiryModal';

const MotionBox = motion.create(Box);

export default function LabSimulatorSection() {
  const { t } = useLanguage();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 理志：シミュレーター状態管理
  const [projectType, setProjectType] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [pageScale, setPageScale] = useState<string>('');
  const [userScale, setUserScale] = useState<string>('');

  // 理志：プロジェクトタイプ基本価格と期間
  const projectTypes = {
    corporate: { baseCost: 300000, baseDuration: 4, name: t('lab.simulator.type.corporate') },
    ec: { baseCost: 500000, baseDuration: 8, name: t('lab.simulator.type.ec') },
    webapp: { baseCost: 800000, baseDuration: 12, name: t('lab.simulator.type.webapp') },
    mobile: { baseCost: 1200000, baseDuration: 16, name: t('lab.simulator.type.mobile') },
    management: { baseCost: 1500000, baseDuration: 20, name: t('lab.simulator.type.management') },
    lp: { baseCost: 150000, baseDuration: 2, name: t('lab.simulator.type.lp') },
    custom: { baseCost: 500000, baseDuration: 8, name: t('lab.simulator.type.custom') },
  };

  // 理志：機能の追加料金と期間
  const features = [
    { id: 'responsive', cost: 30000, duration: 0.2, name: t('lab.simulator.feature.responsive') },
    { id: 'multilang', cost: 100000, duration: 1, name: t('lab.simulator.feature.multilang') },
    { id: 'seo', cost: 100000, duration: 0.3, name: t('lab.simulator.feature.seo') },
    { id: 'contact', cost: 30000, duration: 0.4, name: t('lab.simulator.feature.contact') },
    { id: 'auth', cost: 150000, duration: 2, name: t('lab.simulator.feature.auth') },
    { id: 'payment', cost: 200000, duration: 2, name: t('lab.simulator.feature.payment') },
    { id: 'booking', cost: 250000, duration: 2, name: t('lab.simulator.feature.booking') },
    { id: 'dashboard', cost: 400000, duration: 3, name: t('lab.simulator.feature.dashboard') },
    { id: 'api', cost: 100000, duration: 2, name: t('lab.simulator.feature.api') },
    { id: 'cms', cost: 200000, duration: 1.5, name: t('lab.simulator.feature.cms') },
    { id: 'realtime', cost: 300000, duration: 3, name: t('lab.simulator.feature.realtime') },
    { id: 'upload', cost: 200000, duration: 1, name: t('lab.simulator.feature.upload') },
    { id: 'notification', cost: 200000, duration: 2, name: t('lab.simulator.feature.notification') },
    { id: 'products', cost: 300000, duration: 2, name: t('lab.simulator.feature.products') },
    { id: 'inventory', cost: 300000, duration: 2, name: t('lab.simulator.feature.inventory') },
    { id: 'coupon', cost: 225000, duration: 2, name: t('lab.simulator.feature.coupon') },
  ];

  // 理志：規模による倍率
  const pageScaleMultipliers = {
    '1-5': 1,
    '6-10': 1.3,
    '11-20': 1.6,
    '21+': 2,
  };

  const userScaleMultipliers = {
    '100': 1,
    '1000': 1.2,
    '1000+': 1.5,
  };

  // 理志：総額計算
  const calculateTotal = () => {
    if (!projectType) return { cost: 0, duration: 0 };

    const typeData = projectTypes[projectType as keyof typeof projectTypes];
    let totalCost = typeData.baseCost;
    let totalDuration = typeData.baseDuration;

    // 機能追加
    selectedFeatures.forEach(featureId => {
      const feature = features.find(f => f.id === featureId);
      if (feature) {
        totalCost += feature.cost;
        totalDuration += feature.duration;
      }
    });

    // 規模による倍率適用
    if (pageScale) {
      totalCost *= pageScaleMultipliers[pageScale as keyof typeof pageScaleMultipliers];
    }
    if (userScale) {
      totalCost *= userScaleMultipliers[userScale as keyof typeof userScaleMultipliers];
    }

    return {
      cost: Math.round(totalCost / 10000) * 10000, // 1万円単位で四捨五入
      duration: Math.round(totalDuration * 10) / 10, // 小数点1桁まで
    };
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleReset = () => {
    setProjectType('');
    setSelectedFeatures([]);
    setPageScale('');
    setUserScale('');
  };

  const { cost, duration } = calculateTotal();
  const showResult = projectType && (selectedFeatures.length > 0 || pageScale || userScale);

  return (
    <>
      <Box
        py={{ base: 16, md: 20, lg: 24 }}
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
      >
        <Container maxW="7xl">
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
                {t('lab.simulator.badge')}
              </Badge>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="bold"
                color={colorMode === 'light' ? 'gray.900' : 'white'}
              >
                {t('lab.simulator.title')}
              </Heading>
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
                maxW="3xl"
                lineHeight="1.8"
              >
                {t('lab.simulator.subtitle')}
              </Text>
              <Text
                fontSize="sm"
                color="orange.500"
                fontWeight="semibold"
              >
                {t('lab.simulator.notice')}
              </Text>
            </VStack>

            {/* 理志：シミュレーター本体 */}
            <Box
              p={{ base: 6, md: 8 }}
              bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}
              borderRadius="2xl"
              boxShadow="xl"
              border="1px"
              borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
            >
              <VStack spacing={8} align="stretch">
                {/* ステップ1: プロジェクトタイプ */}
                <Box>
                  <Heading
                    as="h3"
                    fontSize={{ base: 'lg', md: 'xl' }}
                    fontWeight="bold"
                    color={colorMode === 'light' ? 'gray.900' : 'white'}
                    mb={4}
                  >
                    {t('lab.simulator.step1.title')}
                  </Heading>
                  <RadioGroup value={projectType} onChange={setProjectType}>
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={3}>
                      {Object.entries(projectTypes).map(([key, value]) => (
                        <Box
                          key={key}
                          p={4}
                          bg={colorMode === 'light' ? 'white' : 'gray.800'}
                          borderRadius="lg"
                          border="2px"
                          borderColor={projectType === key ? 'orange.500' : (colorMode === 'light' ? 'gray.200' : 'gray.600')}
                          cursor="pointer"
                          onClick={() => setProjectType(key)}
                          _hover={{ borderColor: 'orange.400' }}
                          transition="all 0.2s"
                        >
                          <Radio value={key} colorScheme="orange">
                            <Text
                              fontSize="md"
                              fontWeight="semibold"
                              color={colorMode === 'light' ? 'gray.900' : 'white'}
                            >
                              {value.name}
                            </Text>
                          </Radio>
                        </Box>
                      ))}
                    </Grid>
                  </RadioGroup>
                </Box>

                {/* ステップ2: 機能選択 */}
                <Box>
                  <Heading
                    as="h3"
                    fontSize={{ base: 'lg', md: 'xl' }}
                    fontWeight="bold"
                    color={colorMode === 'light' ? 'gray.900' : 'white'}
                    mb={4}
                  >
                    {t('lab.simulator.step2.title')}
                  </Heading>
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={3}>
                    {features.map(feature => (
                      <Box
                        key={feature.id}
                        p={3}
                        bg={colorMode === 'light' ? 'white' : 'gray.800'}
                        borderRadius="lg"
                        border="2px"
                        borderColor={selectedFeatures.includes(feature.id) ? 'orange.500' : (colorMode === 'light' ? 'gray.200' : 'gray.600')}
                        cursor="pointer"
                        onClick={() => handleFeatureToggle(feature.id)}
                        _hover={{ borderColor: 'orange.400' }}
                        transition="all 0.2s"
                      >
                        <Checkbox
                          isChecked={selectedFeatures.includes(feature.id)}
                          colorScheme="orange"
                          onChange={() => handleFeatureToggle(feature.id)}
                        >
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color={colorMode === 'light' ? 'gray.900' : 'white'}
                          >
                            {feature.name}
                          </Text>
                        </Checkbox>
                      </Box>
                    ))}
                  </Grid>
                </Box>

                {/* ステップ3: 規模選択 */}
                <Box>
                  <Heading
                    as="h3"
                    fontSize={{ base: 'lg', md: 'xl' }}
                    fontWeight="bold"
                    color={colorMode === 'light' ? 'gray.900' : 'white'}
                    mb={4}
                  >
                    {t('lab.simulator.step3.title')}
                  </Heading>
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                    {/* ページ数 */}
                    <Box>
                      <Text
                        fontSize="md"
                        fontWeight="semibold"
                        color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
                        mb={3}
                      >
                        {t('lab.simulator.scale.pages')}
                      </Text>
                      <RadioGroup value={pageScale} onChange={setPageScale}>
                        <Stack spacing={2}>
                          {['1-5', '6-10', '11-20', '21+'].map(scale => (
                            <Box
                              key={scale}
                              p={3}
                              bg={colorMode === 'light' ? 'white' : 'gray.800'}
                              borderRadius="lg"
                              border="2px"
                              borderColor={pageScale === scale ? 'orange.500' : (colorMode === 'light' ? 'gray.200' : 'gray.600')}
                              cursor="pointer"
                              onClick={() => setPageScale(scale)}
                              _hover={{ borderColor: 'orange.400' }}
                              transition="all 0.2s"
                            >
                              <Radio value={scale} colorScheme="orange">
                                <Text fontSize="sm" color={colorMode === 'light' ? 'gray.900' : 'white'}>
                                  {t(`lab.simulator.scale.pages.${['1-5', '6-10', '11-20', '21+'].indexOf(scale) + 1}`)}
                                </Text>
                              </Radio>
                            </Box>
                          ))}
                        </Stack>
                      </RadioGroup>
                    </Box>

                    {/* ユーザー数 */}
                    <Box>
                      <Text
                        fontSize="md"
                        fontWeight="semibold"
                        color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
                        mb={3}
                      >
                        {t('lab.simulator.scale.users')}
                      </Text>
                      <RadioGroup value={userScale} onChange={setUserScale}>
                        <Stack spacing={2}>
                          {['100', '1000', '1000+'].map(scale => (
                            <Box
                              key={scale}
                              p={3}
                              bg={colorMode === 'light' ? 'white' : 'gray.800'}
                              borderRadius="lg"
                              border="2px"
                              borderColor={userScale === scale ? 'orange.500' : (colorMode === 'light' ? 'gray.200' : 'gray.600')}
                              cursor="pointer"
                              onClick={() => setUserScale(scale)}
                              _hover={{ borderColor: 'orange.400' }}
                              transition="all 0.2s"
                            >
                              <Radio value={scale} colorScheme="orange">
                                <Text fontSize="sm" color={colorMode === 'light' ? 'gray.900' : 'white'}>
                                  {t(`lab.simulator.scale.users.${['100', '1000', '1000+'].indexOf(scale) + 1}`)}
                                </Text>
                              </Radio>
                            </Box>
                          ))}
                        </Stack>
                      </RadioGroup>
                    </Box>
                  </Grid>
                </Box>

                {/* 結果表示 */}
                {showResult && (
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    p={6}
                    bgGradient="linear(to-r, orange.400, orange.600)"
                    borderRadius="xl"
                    color="white"
                  >
                    <VStack spacing={4}>
                      <Heading as="h4" fontSize="2xl" fontWeight="bold">
                        {t('lab.simulator.result.title')}
                      </Heading>
                      <Flex gap={8} flexWrap="wrap" justify="center">
                        <VStack>
                          <Text fontSize="sm" opacity={0.9}>
                            {t('lab.simulator.result.cost')}
                          </Text>
                          <Text fontSize="3xl" fontWeight="bold">
                            ¥{cost.toLocaleString()}
                          </Text>
                        </VStack>
                        <VStack>
                          <Text fontSize="sm" opacity={0.9}>
                            {t('lab.simulator.result.duration')}
                          </Text>
                          <Text fontSize="3xl" fontWeight="bold">
                            {duration} {t('lab.simulator.result.weeks')}
                          </Text>
                        </VStack>
                      </Flex>
                      <Flex gap={4} mt={4} flexWrap="wrap" justify="center">
                        <Button
                          size="lg"
                          colorScheme="whiteAlpha"
                          color="white"
                          onClick={onOpen}
                          _hover={{ bg: 'whiteAlpha.300' }}
                        >
                          {t('lab.simulator.result.cta')}
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          color="white"
                          borderColor="white"
                          onClick={handleReset}
                          _hover={{ bg: 'whiteAlpha.200' }}
                        >
                          {t('lab.simulator.result.reset')}
                        </Button>
                      </Flex>
                    </VStack>
                  </MotionBox>
                )}
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      <InquiryModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
