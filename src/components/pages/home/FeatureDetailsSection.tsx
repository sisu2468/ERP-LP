import {
  Box,
  Container,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  VStack,
  Icon,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import {
  FaCalculator,
  FaFileAlt,
  FaUserClock,
  FaChartBar,
  FaFileInvoiceDollar,
  FaRegClock,
  FaUserTie,
  FaFileContract,
  FaStamp,
  FaSitemap,
} from 'react-icons/fa';

interface FeatureDetail {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FeatureCategory {
  title: string;
  description: string;
  details: FeatureDetail[];
}

const features: FeatureCategory[] = [
  {
    title: '会計管理',
    description: '効率的な会計処理と税務申告をサポート',
    details: [
      {
        icon: FaCalculator,
        title: '仕訳自動化',
        description: 'AIによる取引の自動仕訳化で、経理作業の時間を大幅削減',
      },
      {
        icon: FaChartBar,
        title: 'レポート生成',
        description: '経営状況を可視化する多様な財務レポートを自動生成',
      },
      {
        icon: FaFileInvoiceDollar,
        title: '確定申告サポート',
        description: '必要書類の自動作成と電子申告の完全サポート',
      },
    ],
  },
  {
    title: '人事労務',
    description: '従業員管理と給与計算の効率化',
    details: [
      {
        icon: FaUserTie,
        title: '給与計算',
        description: '複雑な給与計算を自動化し、控除や手当も正確に処理',
      },
      {
        icon: FaRegClock,
        title: '勤怠管理',
        description: 'スマートフォン対応の勤怠記録と自動集計システム',
      },
      {
        icon: FaUserClock,
        title: 'シフト管理',
        description: 'ドラッグ＆ドロップで簡単にシフトを作成・管理',
      },
    ],
  },
  {
    title: '契約管理',
    description: 'ペーパーレスで効率的な契約処理',
    details: [
      {
        icon: FaFileContract,
        title: '電子契約',
        description: '法的効力のある電子署名で契約をオンライン化',
      },
      {
        icon: FaFileAlt,
        title: '文書管理',
        description: 'クラウドベースの安全な文書保管・検索システム',
      },
      {
        icon: FaSitemap,
        title: '承認フロー',
        description: 'カスタマイズ可能な承認ワークフローの自動化',
      },
    ],
  },
];

const FeatureCard = ({ icon, title, description }: FeatureDetail) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
        transition: 'all 0.3s ease',
      }}
    >
      <VStack spacing={4} align="flex-start">
        <Icon as={icon} w={8} h={8} color="orange.500" />
        <Box>
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            {title}
          </Text>
          <Text color="gray.600" fontSize="sm">
            {description}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default function FeatureDetailsSection() {
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box py={16} bg="white">
      <Container maxW="7xl">
        <VStack spacing={12}>
          <Box textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              機能の詳細説明
            </Heading>
            <Text color="gray.600" fontSize="lg">
              業務効率化を実現する主要機能
            </Text>
          </Box>

          <Tabs variant="enclosed" width="full">
            <TabList>
              {features.map((category) => (
                <Tab
                  key={category.title}
                  _selected={{
                    color: 'orange.500',
                    borderColor: borderColor,
                    borderBottom: 'none',
                  }}
                >
                  {category.title}
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              {features.map((category) => (
                <TabPanel key={category.title}>
                  <VStack spacing={8}>
                    <Box textAlign="center" maxW="2xl" mx="auto">
                      <Text fontSize="lg" color="gray.600">
                        {category.description}
                      </Text>
                    </Box>
                    <Divider />
                    <Grid
                      templateColumns={{
                        base: '1fr',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)',
                      }}
                      gap={8}
                    >
                      {category.details.map((detail) => (
                        <FeatureCard key={detail.title} {...detail} />
                      ))}
                    </Grid>
                  </VStack>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
} 