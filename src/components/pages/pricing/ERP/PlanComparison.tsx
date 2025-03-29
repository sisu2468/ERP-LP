'use client';

import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, VStack, Button, HStack, useColorModeValue } from '@chakra-ui/react';
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
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgColor = useColorModeValue('white', 'gray.800');
  const headerBgColor = useColorModeValue('gray.50', 'gray.700');
  const checkColor = useColorModeValue('green.500', 'green.300');
  const crossColor = useColorModeValue('red.500', 'red.300');

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return (
        <Text color={value ? checkColor : crossColor} fontWeight="bold">
          {value ? '○' : '×'}
        </Text>
      );
    }
    return <Text whiteSpace="pre-line">{value}</Text>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={8} w="full">
        <Text fontSize="2xl" fontWeight="bold">プラン比較</Text>
        
        <Box overflowX="auto" w="full" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <Table variant="simple">
            <Thead>
              <Tr bg={headerBgColor}>
                <Th>機能</Th>
                <Th>プラン名</Th>
                <Th>プラン名</Th>
                <Th>プラン名</Th>
              </Tr>
            </Thead>
            <Tbody>
              {planFeatures.map((item, index) => (
                <Tr key={index}>
                  <Td fontWeight="medium">{item.feature}</Td>
                  <Td>{renderValue(item.plans.basic)}</Td>
                  <Td>{renderValue(item.plans.standard)}</Td>
                  <Td>{renderValue(item.plans.premium)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box w="full" p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <VStack spacing={4} align="start">
            <Text fontSize="xl" fontWeight="bold">プラン詳細</Text>
            <Text>すべてのプランに14日間無料トライアル！</Text>
            <Text>年間プランなら1か月分無料（例〇〇プランなら1年で00000円→00000円）</Text>
          </VStack>
        </Box>

        <HStack spacing={4}>
          <Button
            colorScheme="blue"
            size="lg"
            variant="outline"
          >
            無料で試す
          </Button>
          <Button
            colorScheme="blue"
            size="lg"
          >
            資料請求・ご相談
          </Button>
        </HStack>
      </VStack>
    </motion.div>
  );
};

export default PlanComparison; 