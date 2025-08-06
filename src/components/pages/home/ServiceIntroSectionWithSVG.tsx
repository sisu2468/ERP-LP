import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  useColorMode
} from '@chakra-ui/react';
import {
  FaChartLine,
  FaFileInvoiceDollar,
  FaHandshake
} from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FeatureCardWithSVG from './FeatureCardWithSVG';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceIntroSectionWithSVG() {
  const { colorMode } = useColorMode();
  const startupHeadingRef = useRef(null);
  const professionalHeadingRef = useRef(null);
  const startupCardsRef = useRef(null);
  const professionalCardRef = useRef(null);

  useEffect(() => {
    // Startup section animations
    gsap.fromTo(startupHeadingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: startupHeadingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(startupCardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: startupCardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Professional section animations
    gsap.fromTo(professionalHeadingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: professionalHeadingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(professionalCardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: professionalCardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const startupFeatures = {
    accounting: {
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
    finance: {
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
    }
  };

  const professionalFeatures = {
    matching: {
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
  };

  return (
    <Box 
      py={16} 
      bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      transition="background-color 0.2s"
    >
      <Container maxW="8xl">
        <VStack spacing={12}>
          <Box width="full">
            <Heading
              ref={startupHeadingRef}
              as="h2"
              size="lg"
              mb={8}
              textAlign="center"
              color={colorMode === 'light' ? 'gray.700' : 'gray.100'}
            >
              スタートアップ・フリーランス向けサービス
            </Heading>
            <SimpleGrid 
              ref={startupCardsRef}
              columns={{ base: 1, md: 2 }} 
              spacing={8}
            >
              <FeatureCardWithSVG 
                {...startupFeatures.accounting} 
                animationDelay={0}
              />
              <FeatureCardWithSVG 
                {...startupFeatures.finance} 
                animationDelay={200}
              />
            </SimpleGrid>
          </Box>

          <Box width="full">
            <Heading
              ref={professionalHeadingRef}
              as="h2"
              size="lg"
              mb={8}
              textAlign="center"
              color={colorMode === 'light' ? 'gray.700' : 'gray.100'}
            >
              税理士・行政書士向けサービス
            </Heading>
            <Box 
              ref={professionalCardRef}
              maxW="600px" 
              mx="auto"
            >
              <FeatureCardWithSVG 
                {...professionalFeatures.matching} 
                animationDelay={0}
              />
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 