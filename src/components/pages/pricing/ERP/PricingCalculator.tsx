'use client';

import { getColors } from '@/constant/colorenum';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    HStack,
    NumberInput,
    NumberInputField,
    Select,
    Text,
    VStack,
    useColorMode,
    useToast,
    Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionBox = motion(Box);

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

const pricingPackages = [
    { name: '人事向け', price: 25000 },
    { name: '会計向け', price: 40000 },
    { name: '営業向け', price: 45000 },
    { name: '全モジュール', price: 60000 }
];

const contractPeriods = [
    { period: '1ヶ月', discount: 0 },
    { period: '3ヶ月', discount: 5 },
    { period: '12ヶ月', discount: 10 }
];

export default function PricingCalculator() {
    const { colorMode } = useColorMode();
    const { headingColor, textColor, cardBg, borderColor } = getColors(colorMode);
    const toast = useToast();

    const [selectedPackage, setSelectedPackage] = useState(pricingPackages[0]);
    const [contractPeriod, setContractPeriod] = useState(contractPeriods[0]);
    const [userCount, setUserCount] = useState(2);
    const [isFullModule, setIsFullModule] = useState(false);

    const basePrice = selectedPackage.price;
    const platformFee = 5000;
    const additionalUserFee = 3000;
    const additionalUsers = Math.max(0, userCount ? userCount - 2 : 0);
    const additionalUserCost = additionalUsers * additionalUserFee;

    const subtotal = basePrice + platformFee + additionalUserCost;
    const periodDiscount = subtotal * (contractPeriod.discount / 100);
    const fullModuleDiscount = isFullModule ? subtotal * 0.05 : 0;
    const totalDiscount = periodDiscount + fullModuleDiscount;
    const finalPrice = subtotal - totalDiscount;

    const handleCalculate = () => {
        toast({
            title: '料金計算結果',
            description: `月額料金: ¥${finalPrice.toLocaleString()}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <VStack spacing={8} align="stretch">
                <Heading size="lg" color={headingColor}>料金シミュレーション</Heading>

                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={6}
                >
                    <MotionBox variants={itemVariants}>
                        <VStack spacing={6} align="stretch">
                            <FormControl>
                                <FormLabel color={textColor}>パッケージ選択</FormLabel>
                                <Select
                                    value={selectedPackage.name}
                                    onChange={(e) => {
                                        const pkg = pricingPackages.find(p => p.name === e.target.value);
                                        if (pkg) {
                                            setSelectedPackage(pkg);
                                            setIsFullModule(pkg.name === '全モジュール');
                                        }
                                    }}
                                    bg={cardBg}
                                    borderColor={borderColor}
                                    color={textColor}
                                    _hover={{ borderColor: 'orange.500' }}
                                    _focus={{ borderColor: 'orange.500' }}
                                >
                                    {pricingPackages.map((pkg) => (
                                        <option key={pkg.name} value={pkg.name} style={{ backgroundColor: colorMode === 'dark' ? '#1A202C' : 'white' }}>
                                            {pkg.name} (¥{pkg.price.toLocaleString()}/月)
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel color={textColor}>契約期間</FormLabel>
                                <Select
                                    value={contractPeriod.period}
                                    onChange={(e) => {
                                        const period = contractPeriods.find(p => p.period === e.target.value);
                                        if (period) setContractPeriod(period);
                                    }}
                                    bg={cardBg}
                                    borderColor={borderColor}
                                    color={textColor}
                                    _hover={{ borderColor: 'orange.500' }}
                                    _focus={{ borderColor: 'orange.500' }}
                                >
                                    {contractPeriods.map((period) => (
                                        <option key={period.period} value={period.period} style={{ backgroundColor: colorMode === 'dark' ? '#1A202C' : 'white' }}>
                                            {period.period} ({period.discount}%割引)
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel color={textColor}>ユーザー数</FormLabel>
                                <NumberInput
                                    min={2}
                                    value={userCount}
                                    onChange={(_, value) => setUserCount(value)}
                                    bg={cardBg}
                                    borderColor={borderColor}
                                    _hover={{ borderColor: 'orange.500' }}
                                    _focus={{ borderColor: 'orange.500' }}
                                >
                                    <NumberInputField 
                                        color={textColor}
                                        _hover={{ borderColor: 'orange.500' }}
                                        _focus={{ borderColor: 'orange.500' }}
                                    />
                                </NumberInput>
                            </FormControl>
                        </VStack>
                    </MotionBox>

                    <MotionBox variants={itemVariants}>
                        <Box
                            bg={cardBg}
                            p={6}
                            borderRadius="xl"
                            borderWidth="1px"
                            borderColor={borderColor}
                        >
                            <VStack spacing={4} align="stretch">
                                <Heading size="md" color={headingColor}>料金内訳</Heading>
                                
                                <HStack justify="space-between">
                                    <Text color={textColor}>基本パッケージ料金</Text>
                                    <Text fontWeight="bold" color={textColor}>¥{basePrice.toLocaleString()}</Text>
                                </HStack>

                                <HStack justify="space-between">
                                    <Text color={textColor}>プラットフォーム料金</Text>
                                    <Text fontWeight="bold" color={textColor}>¥{platformFee.toLocaleString()}</Text>
                                </HStack>

                                <HStack justify="space-between">
                                    <Text color={textColor}>追加ユーザー料金</Text>
                                    <Text fontWeight="bold" color={textColor}>¥{additionalUserCost.toLocaleString()}</Text>
                                </HStack>

                                <HStack justify="space-between">
                                    <Text color={textColor}>期間割引</Text>
                                    <Text fontWeight="bold" color="green.500">
                                        -¥{periodDiscount.toLocaleString()}
                                    </Text>
                                </HStack>

                                {isFullModule && (
                                    <HStack justify="space-between">
                                        <Text color={textColor}>全モジュール割引</Text>
                                        <Text fontWeight="bold" color="green.500">
                                            -¥{fullModuleDiscount.toLocaleString()}
                                        </Text>
                                    </HStack>
                                )}

                                <Divider />

                                <HStack justify="space-between">
                                    <Text fontSize="lg" fontWeight="bold" color={headingColor}>
                                        月額合計
                                    </Text>
                                    <Text fontSize="xl" fontWeight="bold" color="orange.500">
                                        ¥{finalPrice.toLocaleString()}
                                    </Text>
                                </HStack>

                                <Button
                                    colorScheme="orange"
                                    size="lg"
                                    onClick={handleCalculate}
                                    mt={4}
                                >
                                    見積もりを取得
                                </Button>
                            </VStack>
                        </Box>
                    </MotionBox>
                </Grid>
            </VStack>
        </MotionBox>
    );
} 