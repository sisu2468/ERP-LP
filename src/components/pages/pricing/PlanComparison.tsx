'use client'

import { getColors } from '@/constant/colorenum';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Container, HStack, Table, Tbody, Td, Text, Th, Thead, Tr, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface PlanFeature {
  feature: string;
  plans: {
    basic: string | boolean;
    standard: string | boolean;
    premium: string | boolean;
  };
}

const planFeatures: PlanFeature[] = [
  {
    feature: '月額',
    plans: {
      basic: '〇〇〇〇〇円',
      standard: '〇〇〇〇〇円',
      premium: '〇〇〇〇〇円'
    }
  },
  {
    feature: '会計機能',
    plans: {
      basic: true,
      standard: true,
      premium: true
    }
  },
  {
    feature: '請求書機能',
    plans: {
      basic: '5件/月',
      standard: '無制限',
      premium: '無制限'
    }
  },
  {
    feature: 'HR機能',
    plans: {
      basic: false,
      standard: true,
      premium: true
    }
  },
  {
    feature: 'モジュール名',
    plans: {
      basic: false,
      standard: true,
      premium: true
    }
  },
  {
    feature: 'サポート',
    plans: {
      basic: '無料フォーラム\nチャットサポート',
      standard: '無料フォーラム\nチャットサポート\nメール対応',
      premium: '無料フォーラム\nメールサポート\n電話対応'
    }
  }
];

const PlanComparison = () => {
  const { colorMode } = useColorMode();
  const { borderColor, bgColor, headingColor, textColor, textColor1, bgColor1 } = getColors(colorMode);
  const headerBgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Container maxW="7xl" py={16}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={8} w="full">
          <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color='orange.500'>プラン比較</Text>

          <Box overflowX="auto" w="full" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
            <Table variant="simple">
              <Thead>
                <Tr bg={headerBgColor}>
                  <Th color={textColor}>機能</Th>
                  <Th color={textColor}>プラン名</Th>
                  <Th color={textColor}>プラン名</Th>
                  <Th color={textColor}>プラン名</Th>
                </Tr>
              </Thead>
              <Tbody bg={bgColor} color={textColor}>
                {planFeatures.map((item, index) => (
                  <Tr key={index}>
                    <Td fontWeight="medium" color={textColor}>{item.feature}</Td>
                    <Td color={textColor}>
                      {typeof item.plans.basic === 'boolean' ? (
                        item.plans.basic ? <CheckIcon color="green.500" /> : <CloseIcon color="red.500" />
                      ) : (
                        <Text whiteSpace="pre-line">{item.plans.basic}</Text>
                      )}
                    </Td>
                    <Td color={textColor}>
                      {typeof item.plans.standard === 'boolean' ? (
                        item.plans.standard ? <CheckIcon color="green.500" /> : <CloseIcon color="red.500" />
                      ) : (
                        <Text whiteSpace="pre-line">{item.plans.standard}</Text>
                      )}
                    </Td>
                    <Td color={textColor}>
                      {typeof item.plans.premium === 'boolean' ? (
                        item.plans.premium ? <CheckIcon color="green.500" /> : <CloseIcon color="red.500" />
                      ) : (
                        <Text whiteSpace="pre-line">{item.plans.premium}</Text>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Box w="full" p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
            <VStack spacing={4} align="start">
              <Text fontSize="xl" fontWeight="bold" color={headingColor}>プラン詳細</Text>
              <Text color={textColor1}>すべてのプランに14日間無料トライアル！</Text>
              <Text color={textColor1}>年間プランなら1か月分無料（例〇〇プランなら1年で00000円→00000円）</Text>
            </VStack>
          </Box>

          <HStack spacing={4}>
            <Button
              colorScheme="orange"
              size="lg"
              variant="outline"
            >
              無料で試す
            </Button>
            <Button
              colorScheme="orange"
              size="lg"
            >
              資料請求・ご相談
            </Button>
          </HStack>
        </VStack>
      </motion.div>
    </Container>
  );
};

export default PlanComparison; 