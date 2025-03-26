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
import FeatureCard from './FeatureCarts';

export default function ServiceIntroSection() {
  const { colorMode } = useColorMode();

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
      title: '資金繰り・財務分析',
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
    <Box 
      py={16} 
      bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      transition="background-color 0.2s"
    >
      <Container maxW="8xl">
        <VStack spacing={12}>
          <Box width="full">
            <Heading
              as="h2"
              size="lg"
              mb={8}
              textAlign="center"
              color={colorMode === 'light' ? 'gray.700' : 'gray.100'}
            >
              スタートアップ・フリーランス向けサービス
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <FeatureCard 
                {...startupFeatures.accounting} 
                colorMode={colorMode}
              />
              <FeatureCard 
                {...startupFeatures.finance} 
                colorMode={colorMode}
              />
            </SimpleGrid>
          </Box>

          <Box width="full">
            <Heading
              as="h2"
              size="lg"
              mb={8}
              textAlign="center"
              color={colorMode === 'light' ? 'gray.700' : 'gray.100'}
            >
              税理士・行政書士向けサービス
            </Heading>
            <Box maxW="600px" mx="auto">
              <FeatureCard 
                {...professionalFeatures.matching} 
                colorMode={colorMode}
              />
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 