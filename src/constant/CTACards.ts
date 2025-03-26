import { FaFileAlt, FaComments, FaPlayCircle, FaCheckCircle, FaHeadset, FaCreditCard, FaCalendarCheck, FaBook, FaLightbulb, FaFileInvoiceDollar, FaCog, FaPercent, FaChartLine, FaHandshake } from "react-icons/fa";
import { CTACard } from "./interface";

export const ctaCards: CTACard[] = [
    {
        title: '無料体験を始める',
        description: '14日間無料でサービスのすべての機能をお試しいただけます',
        icon: FaPlayCircle,
        buttonText: '今すぐ無料体験',
        buttonLink: '/trial',
        features: [
            { text: '全機能が利用可能' },
            { text: '14日間無料' },
            { text: 'クレジットカード不要' },
            { text: '専任サポート付き' },
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
            { text: 'オンライン相談可能' },
            { text: '導入事例の紹介' },
            { text: '課題解決のアドバイス' },
            { text: '見積もり相談可能' },
        ],
    },
    {
        title: 'プラン・料金',
        description: 'ビジネスの規模に合わせた最適なプランをご用意',
        icon: FaFileAlt,
        buttonText: 'プランを確認',
        buttonLink: '/pricing',
        features: [
            { text: '柔軟なプラン選択' },
            { text: 'スケーラブルな料金体系' },
            { text: '年間契約割引あり' },
            { text: 'カスタマイズ可能' },
        ],
    },
];