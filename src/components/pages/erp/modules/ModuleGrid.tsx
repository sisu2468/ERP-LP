'use client';

import { SimpleGrid, Container, Heading, Text, VStack, Box, useColorModeValue } from '@chakra-ui/react';
import ModuleCard from './ModuleCard';
import { getColors } from '@/constant/colorenum';
import { useColorMode } from '@chakra-ui/react';

const modules = [
    {
        title: '顧客管理',
        catchCopy: '顧客との絆を最大に',
        description: '一度入力すれば顧客情報を瞬時に呼び出し、商談履歴からサポート記録まで一元管理。「あの顧客、どうだったっけ？」から解放されます。',
        icon: '/featureimages/customer.png',
        packages: ['会計向け', '営業向け'],
    },
    {
        title: '従業員管理',
        catchCopy: '煩わしい人事作業を一掃',
        description: '書類探しに奔走する日々にサヨナラ。社員情報・勤怠・役職を一括管理し、小さなチームでも大企業並みの人材マネジメントが可能に。',
        icon: '/featureimages/employee.png',
        packages: ['人事向け', '会計向け', '営業向け'],
    },
    {
        title: '会計管理',
        catchCopy: '経営の数字を自分の手に',
        description: '複雑な仕訳も数クリックで完了、リアルタイムで試算表を確認。「今月どれくらい稼いでいるのか」を常に把握できる経営者の強い味方です。',
        icon: '/featureimages/accounting.png',
        packages: ['人事向け', '会計向け'],
    },
    {
        title: '在庫管理',
        catchCopy: 'キャッシュフロー改善の切り札',
        description: '「また発注し過ぎた」「在庫切れで販売機会を逃した」という失敗とはおさらば。在庫状況をリアルタイムで把握し、利益を最大化します。',
        icon: '/featureimages/inventory.png',
        packages: ['会計向け', '営業向け'],
    },
    {
        title: '製品管理',
        catchCopy: 'バラバラな製品情報を統一、問い合わせ対応を劇的に改善',
        description: '製品データを一元管理し、どの担当者でも同じ正確な情報を提供できる体制を構築。顧客満足度向上と社内混乱の解消を同時に実現します。',
        icon: '/featureimages/product.png',
        packages: ['会計向け', '営業向け'],
    },
    {
        title: 'タイムシート',
        catchCopy: '残業代計算の悩みから解放',
        description: '勤怠管理の手作業による計算ミスやデータ紛失のリスクを排除。従業員の働き方を可視化し、生産性向上と法令遵守を両立します。',
        icon: '/featureimages/timesheet.png',
        packages: ['人事向け'],
    },
    {
        title: '経費管理',
        catchCopy: '領収書の山と格闘する日々にピリオド',
        description: '経費精算の煩わしさから解放され、承認プロセスも簡略化。「どこでいくら使っているのか」を正確に把握し、無駄なコスト削減につなげます。',
        icon: '/featureimages/expenses.png',
        packages: ['人事向け', '会計向け', '営業向け'],
    },
    {
        title: '請求書管理',
        catchCopy: '未入金トラブルを防止、資金繰り改善の決定打',
        description: '請求書作成から入金確認までをシームレスに管理。「あの請求書、まだ支払われていない？」という不安から経営者を解放します。',
        icon: '/featureimages/invoice.png',
        packages: ['会計向け', '営業向け'],
    },
    {
        title: '営業・販売管理',
        catchCopy: '営業スタイルを組織の力に変換',
        description: '商談進捗から受注・売上データを見える化し、「あの営業マンだけが分かる」なんて状況を解消。チーム全体の営業力を底上げします。',
        icon: '/featureimages/sales.png',
        packages: ['営業向け'],
    },
];

const ModuleGrid = () => {
    const { colorMode } = useColorMode();
    const { textColor, bgColor2 } = getColors(colorMode);


    return (
        <Box w="full" bg={bgColor2} py={16}>
            <Container maxW="7xl">
                <VStack spacing={16}>
                    <VStack spacing={8} textAlign="center">
                        <Heading
                            fontSize={{ base: "3xl", md: "4xl" }}
                            bgGradient={colorMode === 'light'
                                ? "linear(to-r, orange.400, orange.600)"
                                : "linear(to-r, orange.300, orange.500)"
                            }
                            bgClip="text"
                        >
                            ERPモジュール
                        </Heading>
                        <Text
                            fontSize={{ base: 'lg', md: 'xl' }}
                            color={textColor}
                            maxW="3xl"
                            px={4}
                        >
                            包括的なビジネス管理を実現する統合モジュール群。
                            各モジュールは独立して機能しながら、シームレスに連携します。
                        </Text>
                    </VStack>

                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        spacing={{ base: 6, md: 8, lg: 10 }}
                        px={{ base: 4, md: 8 }}
                    >
                        {modules.map((module, index) => (
                            <ModuleCard
                                key={index}
                                title={module.title}
                                description={module.description}
                                icon={module.icon}
                                packages={module.packages}
                                catchCopy={module.catchCopy}
                            />
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
};

export default ModuleGrid; 