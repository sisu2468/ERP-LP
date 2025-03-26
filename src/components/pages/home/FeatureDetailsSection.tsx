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
  useColorMode,
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
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTab } from '@chakra-ui/react';

gsap.registerPlugin(ScrollTrigger);

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

type AnimatedTabPanelProps = {
  children: React.ReactNode;
  bg?: string;
  borderX?: string;
  borderBottom?: string;
  borderColor?: string;
  borderBottomRadius?: string;
  [key: string]: any;
};

const AnimatedTabPanel = ({ children, ...props }: AnimatedTabPanelProps) => {
  const tabRef = useRef(null);
  const isSelected = props['aria-selected'] === true;

  useEffect(() => {
    if (isSelected && tabRef.current) {
      gsap.fromTo(tabRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }
      );
    }
  }, [isSelected]);

  return (
    <TabPanel ref={tabRef} {...props}>
      {children}
    </TabPanel>
  );
};

const FeatureCard = ({ icon, title, description }: FeatureDetail) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const iconColor = useColorModeValue('orange.500', 'orange.300');
  const titleColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      w="100%"
      minH="180px"
      borderColor={borderColor}
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
        transition: 'all 0.3s ease',
      }}
    >
      <VStack spacing={4} align="flex-start">
        <Icon as={icon} w={8} h={8} color={iconColor} />
        <Box>
          <Text fontWeight="bold" fontSize="lg" mb={2} color={titleColor}>
            {title}
          </Text>
          <Text color={textColor} fontSize="sm">
            {description}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default function FeatureDetailsSection() {
  const { colorMode } = useColorMode();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgColor = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('gray.800', 'white');
  const descriptionColor = useColorModeValue('gray.600', 'gray.300');
  const tabBg = useColorModeValue('gray.50', 'gray.800');
  const tabHoverBg = useColorModeValue('gray.100', 'gray.700');
  const tabSelectedBg = useColorModeValue('white', 'gray.800');

  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const tabsRef = useRef(null);
  const tabPanelsRef = useRef(null);

  useEffect(() => {
    // Heading animation
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Description animation
    gsap.fromTo(descriptionRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Tabs animation
    gsap.fromTo(tabsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.4,
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Tab panels animation
    gsap.fromTo(tabPanelsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        scrollTrigger: {
          trigger: tabPanelsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Box py={16} bg={bgColor} transition="background-color 0.2s">
      <Container maxW="7xl">
        <VStack spacing={12}>
          <Box textAlign="center">
            <Heading 
              ref={headingRef}
              as="h2" 
              size="xl" 
              mb={4} 
              color={headingColor}
            >
              機能の詳細説明
            </Heading>
            <Text 
              ref={descriptionRef}
              color={descriptionColor} 
              fontSize="lg"
            >
              業務効率化を実現する主要機能
            </Text>
          </Box>

          <Tabs variant="enclosed" width="full">
            <TabList ref={tabsRef}>
              {features.map((category) => (
                <Tab
                  key={category.title}
                  _selected={{
                    color: colorMode === 'light' ? 'orange.500' : 'orange.300',
                    borderColor: borderColor,
                    borderBottom: 'none',
                    bg: tabSelectedBg,
                  }}
                  _hover={{
                    bg: tabHoverBg,
                  }}
                  bg={tabBg}
                  color={descriptionColor}
                >
                  {category.title}
                </Tab>
              ))}
            </TabList>

            <TabPanels ref={tabPanelsRef}>
              {features.map((category) => (
                <AnimatedTabPanel 
                  key={category.title}
                  bg={tabSelectedBg}
                  borderX="1px"
                  borderBottom="1px"
                  borderColor={borderColor}
                  borderBottomRadius="md"
                >
                  <VStack spacing={8}>
                    <Box textAlign="center" maxW="2xl" mx="auto">
                      <Text fontSize="lg" color={descriptionColor}>
                        {category.description}
                      </Text>
                    </Box>
                    <Divider borderColor={borderColor} />
                    <Grid
                      w="100%"
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
                </AnimatedTabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
} 