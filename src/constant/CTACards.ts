import { FaFileAlt, FaComments, FaPlayCircle } from "react-icons/fa";
import { CTACard } from "./interface";

export const ctaCards: CTACard[] = [
    {
        title: '無料体験を始める',
        description: '30日間無料でサービスのすべての機能をお試しいただけます',
        icon: FaPlayCircle,
        buttonText: '今すぐ無料体験',
        buttonLink: '/trial',
        features: [
            '全機能が利用可能',
            '30日間無料',
            'クレジットカード不要',
            '専任サポート付き',
        ],
        primary: true,
    },
    {
        title: '専門家に相談',
        description: '経験豊富な専門家が導入までサポートいたします',
        icon: FaComments,
        buttonText: '無料相談を予約',
        buttonLink: '/consultation',
        features: [
            'オンライン相談可能',
            '導入事例の紹介',
            '課題解決のアドバイス',
            '見積もり相談可能',
        ],
    },
    {
        title: 'プラン・料金',
        description: 'ビジネスの規模に合わせた最適なプランをご用意',
        icon: FaFileAlt,
        buttonText: 'プランを確認',
        buttonLink: '/pricing',
        features: [
            '柔軟なプラン選択',
            'スケーラブルな料金体系',
            '年間契約割引あり',
            'カスタマイズ可能',
        ],
    },
];