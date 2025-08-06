'use client';

import { Box, Container, Heading, VStack, SimpleGrid, Text } from '@chakra-ui/react';
import SVGAnimation from '@/components/common/SVGAnimation';
import FeatureCardWithSVG from '@/components/pages/home/FeatureCardWithSVG';
import { FaChartLine, FaFileInvoiceDollar, FaHandshake } from 'react-icons/fa';

export default function SVGDemoPage() {
  const demoFeatures = [
    {
      title: '会計・請求管理',
      description: 'AIを活用した自動化で経理作業を大幅に効率化',
      icon: FaFileInvoiceDollar,
      svgPath: '/svg/accounting-animation.svg',
      svgAlt: '会計管理アニメーション',
      features: [
        '請求書の自動生成と管理',
        '経費の自動トラッキング',
        '帳簿の自動記帳',
        'クラウド会計ソフトとの連携'
      ]
    },
    {
      title: '資金繰り・財務分析',
      description: 'リアルタイムで財務状況を把握し、戦略的な意思決定をサポート',
      icon: FaChartLine,
      svgPath: '/svg/finance-animation.svg',
      svgAlt: '財務分析アニメーション',
      features: [
        'キャッシュフロー予測',
        'リアルタイム財務分析',
        '予算管理ツール',
        '経営指標のダッシュボード'
      ]
    },
    {
      title: 'マッチングプラットフォーム',
      description: 'クライアントと専門家を効率的にマッチング',
      icon: FaHandshake,
      svgPath: '/svg/matching-animation.svg',
      svgAlt: 'マッチングプラットフォームアニメーション',
      features: [
        'クライアントとの効率的なマッチング',
        '案件管理システム',
        '契約書類の電子化対応',
        '専門家評価システム'
      ]
    }
  ];

  return (
    <Container maxW="8xl" py={8}>
      <VStack spacing={12}>
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4} color="orange.500">
            SVG Animation Demo
          </Heading>
          <Text fontSize="lg" color="gray.600">
            サインタERPのSVGアニメーションシステムのデモンストレーション
          </Text>
        </Box>

        {/* Individual SVG Animations */}
        <Box width="full">
          <Heading as="h2" size="lg" mb={8} textAlign="center">
            個別SVGアニメーション
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Box textAlign="center">
              <Text mb={4} fontWeight="bold">Fade In Animation</Text>
              <SVGAnimation
                svgPath="/svg/accounting-animation.svg"
                alt="Accounting Animation"
                width="200px"
                height="200px"
                animationType="fadeIn"
                duration={1000}
                trigger="onMount"
              />
            </Box>
            <Box textAlign="center">
              <Text mb={4} fontWeight="bold">Scale In Animation</Text>
              <SVGAnimation
                svgPath="/svg/finance-animation.svg"
                alt="Finance Animation"
                width="200px"
                height="200px"
                animationType="scaleIn"
                duration={1200}
                delay={500}
                trigger="onMount"
              />
            </Box>
            <Box textAlign="center">
              <Text mb={4} fontWeight="bold">Slide In Animation</Text>
              <SVGAnimation
                svgPath="/svg/matching-animation.svg"
                alt="Matching Animation"
                width="200px"
                height="200px"
                animationType="slideIn"
                duration={1000}
                delay={1000}
                trigger="onMount"
              />
            </Box>
          </SimpleGrid>
        </Box>

        {/* Feature Cards with SVG */}
        <Box width="full">
          <Heading as="h2" size="lg" mb={8} textAlign="center">
            機能カード（SVGアニメーション付き）
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {demoFeatures.map((feature, index) => (
              <FeatureCardWithSVG
                key={feature.title}
                {...feature}
                animationDelay={index * 200}
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Scroll Triggered Animations */}
        <Box width="full">
          <Heading as="h2" size="lg" mb={8} textAlign="center">
            スクロールトリガーアニメーション
          </Heading>
          <VStack spacing={8}>
            <Box textAlign="center" minH="300px" display="flex" alignItems="center" justifyContent="center">
              <SVGAnimation
                svgPath="/svg/accounting-animation.svg"
                alt="Scroll Triggered Accounting Animation"
                width="300px"
                height="300px"
                animationType="scaleIn"
                duration={1500}
                trigger="onScroll"
              />
            </Box>
            <Box textAlign="center" minH="300px" display="flex" alignItems="center" justifyContent="center">
              <SVGAnimation
                svgPath="/svg/finance-animation.svg"
                alt="Scroll Triggered Finance Animation"
                width="300px"
                height="300px"
                animationType="fadeIn"
                duration={1200}
                trigger="onScroll"
              />
            </Box>
            <Box textAlign="center" minH="300px" display="flex" alignItems="center" justifyContent="center">
              <SVGAnimation
                svgPath="/svg/matching-animation.svg"
                alt="Scroll Triggered Matching Animation"
                width="300px"
                height="300px"
                animationType="slideIn"
                duration={1000}
                trigger="onScroll"
              />
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
} 