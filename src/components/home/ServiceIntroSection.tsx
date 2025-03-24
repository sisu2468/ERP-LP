import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack
} from '@chakra-ui/react';
import {
  FaChartLine,
  FaFileInvoiceDollar,
  FaHandshake
} from 'react-icons/fa';
import FeatureCard from './FeatureCarts';


export default function ServiceIntroSection() {
  const startupFeatures = {
    accounting: {
      title: '会計・請求管理',
      icon: FaFileInvoiceDollar,
      features: [
        '請求書の自動生成と管理',
        '経費の自動トラッキング',
        '帳簿の自動記帳',
        'クラウド会計ソフトとの連携'
      ]
    },
    finance: {
      title: '財務分析・財務分析',
      icon: FaChartLine,
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
      icon: FaHandshake,
      features: [
        'クライアントとの効率的なマッチング',
        '案件管理システム',
        'オンライン相談ツール',
        '契約書類の電子化対応'
      ]
    }
  };

  return (
    <Box py={16} bg="gray.50">
      <Container maxW="8xl">
        <VStack spacing={12}>
          <Box width="full">
            <Heading
              as="h2"
              size="lg"
              mb={8}
              textAlign="center"
              color="gray.700"
            >
              スタートアップ・フリーランス向けサービス
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <FeatureCard {...startupFeatures.accounting} />
              <FeatureCard {...startupFeatures.finance} />
            </SimpleGrid>
          </Box>

          <Box width="full">
            <Heading
              as="h2"
              size="lg"
              mb={8}
              textAlign="center"
              color="gray.700"
            >
              税理士・行政書士向けサービス
            </Heading>
            <Box maxW="600px" mx="auto">
              <FeatureCard {...professionalFeatures.matching} />
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 