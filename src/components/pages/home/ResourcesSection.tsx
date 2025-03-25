import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Button,
  Badge,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaBook,
  FaLightbulb,
  FaUserTie,
  FaClock,
  FaArrowRight,
  FaRegBookmark,
} from 'react-icons/fa';
import Link from 'next/link';

interface GuideArticle {
  title: string;
  description: string;
  category: string;
  readTime: string;
  link: string;
}

interface CaseStudy {
  title: string;
  company: string;
  personName: string;
  position: string;
  summary: string;
  imageUrl: string;
  link: string;
}

interface Tip {
  title: string;
  description: string;
  category: string;
  link: string;
}

const guides: GuideArticle[] = [
  {
    title: 'はじめての電子契約導入ガイド',
    description: '電子契約の基礎から実践的な活用方法まで、段階的に解説します。',
    category: '最初の一歩',
    readTime: '10分',
    link: '/guides/electronic-contract',
  },
  {
    title: '会計システム移行の完全ガイド',
    description: 'スムーズな会計システムの移行のための準備と手順を詳しく説明。',
    category: '最初の一歩',
    readTime: '15分',
    link: '/guides/accounting-migration',
  },
  {
    title: '人事労務システム導入の手引き',
    description: '人事労務管理の効率化を実現するためのシステム導入ステップ。',
    category: '最初の一歩',
    readTime: '12分',
    link: '/guides/hr-system',
  },
];

const caseStudies: CaseStudy[] = [
  {
    title: '請求書作成時間を80%削減した方法',
    company: 'サインタ株式会社',
    personName: '山田太郎',
    position: '経理部長',
    summary: '自動化ツールの導入により、月次の請求書作成業務を大幅に効率化。',
    imageUrl: '/images/case-study-1.jpg',
    link: '/case-studies/billing-automation',
  },
  {
    title: '年間100時間の労務作業を削減',
    company: 'サインタ株式会社',
    personName: '鈴木花子',
    position: '人事マネージャー',
    summary: '勤怠管理のデジタル化による業務改革の成功事例。',
    imageUrl: '/images/case-study-2.jpg',
    link: '/case-studies/hr-digitalization',
  },
];

const tips: Tip[] = [
  {
    title: 'エクセル作業を自動化する5つのテクニック',
    description: 'マクロとショートカットを活用した時短テクニックを紹介。',
    category: '業務効率化',
    link: '/tips/excel-automation',
  },
  {
    title: '経費精算のペーパーレス化完全ガイド',
    description: 'スマートフォンで完結する経費精算の方法を解説。',
    category: '自動化',
    link: '/tips/paperless-expenses',
  },
  {
    title: '会議時間を半分に削減するコツ',
    description: 'オンライン会議ツールを活用した効率的な会議運営方法。',
    category: '時短テクニック',
    link: '/tips/meeting-efficiency',
  },
];

const ResourceCard = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <Card
    as={Link}
    href={href}
    height="full"
    _hover={{
      transform: 'translateY(-4px)',
      shadow: 'lg',
      textDecoration: 'none',
    }}
    transition="all 0.3s"
  >
    {children}
  </Card>
);

export default function ResourcesSection() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box py={16} bg={bgColor}>
      <Container maxW="7xl">
        <VStack spacing={16}>
          {/* 導入ガイド */}
          <Box width="full">
            <HStack mb={8} justify="space-between">
              <VStack align="flex-start">
                <Heading size="lg">導入ガイド</Heading>
                <Text color="gray.600">「最初の一歩」シリーズ</Text>
              </VStack>
              <Button rightIcon={<FaArrowRight />} variant="ghost" as={Link} href="/guides">
                すべて見る
              </Button>
            </HStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {guides.map((guide) => (
                <ResourceCard key={guide.title} href={guide.link}>
                  <CardBody>
                    <VStack align="flex-start" spacing={4}>
                      <Badge colorScheme="green">{guide.category}</Badge>
                      <Heading size="md">{guide.title}</Heading>
                      <Text color="gray.600">{guide.description}</Text>
                      <HStack color="gray.500">
                        <Icon as={FaClock} />
                        <Text fontSize="sm">読了時間: {guide.readTime}</Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                </ResourceCard>
              ))}
            </SimpleGrid>
          </Box>

          {/* 事例紹介 */}
          <Box width="full">
            <HStack mb={8} justify="space-between">
              <VStack align="flex-start">
                <Heading size="lg">事例紹介</Heading>
                <Text color="gray.600">成功事例インタビュー</Text>
              </VStack>
              <Button rightIcon={<FaArrowRight />} variant="ghost" as={Link} href="/case-studies">
                すべて見る
              </Button>
            </HStack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {caseStudies.map((study) => (
                <ResourceCard key={study.title} href={study.link}>
                  <CardBody>
                    <VStack align="flex-start" spacing={4}>
                      <HStack>
                        <Avatar size="md" name={study.personName} src={study.imageUrl} />
                        <Box>
                          <Text fontWeight="bold">{study.personName}</Text>
                          <Text fontSize="sm" color="gray.500">{study.position}</Text>
                        </Box>
                      </HStack>
                      <Heading size="md">{study.title}</Heading>
                      <Text color="gray.600">{study.summary}</Text>
                      <Text fontSize="sm" color="gray.500">{study.company}</Text>
                    </VStack>
                  </CardBody>
                </ResourceCard>
              ))}
            </SimpleGrid>
          </Box>

          {/* 業務効率化Tips */}
          <Box width="full">
            <HStack mb={8} justify="space-between">
              <VStack align="flex-start">
                <Heading size="lg">業務効率化 Tips</Heading>
                <Text color="gray.600">日常業務の時短テクニック</Text>
              </VStack>
              <Button rightIcon={<FaArrowRight />} variant="ghost" as={Link} href="/tips">
                すべて見る
              </Button>
            </HStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {tips.map((tip) => (
                <ResourceCard key={tip.title} href={tip.link}>
                  <CardBody>
                    <VStack align="flex-start" spacing={4}>
                      <Badge colorScheme="blue">{tip.category}</Badge>
                      <Heading size="md">{tip.title}</Heading>
                      <Text color="gray.600">{tip.description}</Text>
                      <Icon as={FaLightbulb} color="orange.500" />
                    </VStack>
                  </CardBody>
                </ResourceCard>
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 