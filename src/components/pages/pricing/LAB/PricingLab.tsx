'use client';

import { getColors } from '@/constant/colorenum';
import {
    Box,
    Container,
    useColorMode,
    VStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PricingSection from './LabSection';
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


const pricingData = {
    basic: [
        {
            name: 'ランディングページ（LP）制作',
            price: '¥150,000〜',
            description: '商品・サービスの魅力的な紹介、効果的なCVR設計、アクセス解析実装'
        },
        {
            name: 'コーポレートサイト制作',
            price: '¥250,000〜',
            description: '企業ブランディング強化、レスポンシブ対応、問い合わせフォーム統合（5〜8ページ程度）'
        },
        {
            name: 'ポートフォリオ＆ブログサイト',
            price: '¥180,000〜',
            description: 'SEO最適化設計、コンテンツ管理システム、SNS連携機能'
        }
    ],
    level1: [
        {
            name: '採用・求人プラットフォーム',
            price: '¥450,000〜',
            description: '求人情報管理、応募フォーム、管理画面'
        },
        {
            name: 'イベント予約システム',
            price: '¥400,000〜',
            description: 'カレンダー連携、予約管理、自動メール通知'
        },
        {
            name: '小規模ECサイト',
            price: '¥500,000〜',
            description: '商品管理、決済システム連携、注文管理機能'
        }
    ],
    level2: [
        {
            name: '高機能予約システム',
            price: '¥800,000〜',
            description: '複数予約対応、会員管理、決済連携、管理画面'
        },
        {
            name: '会員制Webサービス',
            price: '¥1,000,000〜',
            description: '会員登録・認証、コンテンツ制限、プラン管理'
        },
        {
            name: 'マッチングプラットフォーム',
            price: '¥1,500,000〜',
            description: 'ユーザー管理、マッチングアルゴリズム、メッセージ機能'
        }
    ],
    level3: [
        {
            name: 'SEO対策強化',
            price: '¥100,000〜',
            description: 'キーワード分析、メタタグ最適化、構造化データ対応'
        },
        {
            name: 'コンテンツ制作',
            price: '¥10,000〜/ページ',
            description: '専門ライターによる記事作成、画像選定'
        },
        {
            name: '保守・運用サポート',
            price: '¥30,000〜/月',
            description: '定期更新、セキュリティ対策、バックアップ'
        },
        {
            name: '多言語対応',
            price: '¥80,000〜/言語',
            description: '翻訳、言語切替機能実装'
        }
    ]
};

export default function PricingLab() {
    const { colorMode } = useColorMode();
    const { bgColor } = getColors(colorMode);

    return (
        <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            bg={bgColor}
            py={16}
            viewport={{ once: true }}
        >
            <Container maxW={{ base: "xl", md: "6xl" }}>
                <VStack spacing={12} align="stretch">
                    <PricingSection title="基本サービス" items={pricingData.basic} />
                    <PricingSection title="LEVEL 1" items={pricingData.level1} level="開発期間：1週間" />
                    <PricingSection title="LEVEL 2" items={pricingData.level2} level="開発期間：2～3週間" />
                    <PricingSection title="LEVEL 3" items={pricingData.level3} level="開発期間：1ヶ月以上" />
                    <PricingSection title="オプションサービス" items={pricingData.level3} borderstate={true} />
                </VStack>
            </Container>
        </MotionBox>
    );
} 