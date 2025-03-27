'use client';

import { Box, Container, Flex, Heading, VStack, useColorModeValue } from "@chakra-ui/react";
import { StrengthCard } from "./StrengthCard";

const strengthsData = {
    erp: {
        title: "ERPソフトウェア",
        subtitle: "サインタ・コア",
        points: [
            {
                title: "真の統合プラットフォーム",
                description: "複数のアプリケーションやサービスへの登録が不要で、単一のインターフェースから全機能にアクセス可能"
            },
            {
                title: "コストパフォーマンス",
                description: "スタートアップから中堅企業まで、様々な規模に対応した柔軟な料金プラン"
            },
            {
                title: "日本企業特化",
                description: "日本の会計基準、労働法規、ビジネス慣行に完全対応"
            },
            {
                title: "シームレスな拡張性",
                description: "企業の成長に合わせてスケールするモジュール型設計"
            }
        ]
    },
    web: {
        title: "ウェブデザインサービス",
        subtitle: "サインタ・ラボ",
        points: [
            {
                title: "戦略的アプローチ",
                description: "ビジネス目標とユーザーニーズを融合させたデザイン思考"
            },
            {
                title: "データ駆動型デザイン",
                description: "アナリティクスと行動分析に基づく継続的な最適化"
            },
            {
                title: "テクニカルエクセレンス",
                description: "最新のウェブ技術とベストプラクティスの実装"
            },
            {
                title: "ブランド一貫性",
                description: "デジタルとリアルのタッチポイントを統合したブランド体験の創出"
            },
            {
                title: "継続的サポート",
                description: "ローンチ後も持続的な成長をサポートする伴走型サービス"
            }
        ]
    },
    network: {
        title: "専門家ネットワーク・提携サービス",
        subtitle: "サインタ・コネクト",
        points: [
            {
                title: "キュレーテッドネットワーク",
                description: "厳選された各分野のトップエキスパートへのアクセス"
            },
            {
                title: "ワンストップソリューション",
                description: "複数の専門サービスを単一の窓口で管理"
            },
            {
                title: "スケーラブルなサポート",
                description: "成長段階に応じて必要な専門知識を柔軟に提供"
            }
        ]
    }
};

export default function OperationStrengths() {
    const bgColor = useColorModeValue('white', 'gray.800');
    const headingColor = useColorModeValue('orange.500', 'orange.300');

    return (
        <Box bg={bgColor} py={{ base: 16, md: 24 }} position="relative">
            <Container maxW="8xl">
                <VStack spacing={{ base: 12, md: 16 }} align="center">
                    <VStack align="center" spacing={2} w="full">
                        <Heading
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl" }}
                            fontWeight="bold"
                            color={headingColor}
                            letterSpacing="wide"
                            mb={3}
                        >
                            各事業の強み
                        </Heading>
                        <Heading
                            as="h3"
                            fontSize={{ base: "xl", md: "2xl" }}
                            fontWeight="bold"
                            color="gray.500"
                            letterSpacing="wider"
                        >
                            OPERATION STRENGTHS
                        </Heading>
                    </VStack>

                    <Flex
                        direction={{ base: "column", lg: "row" }}
                        gap={{ base: 8, md: 10 }}
                        w="full"
                        align="stretch"
                    >
                        <StrengthCard
                            title={strengthsData.erp.title}
                            subtitle={strengthsData.erp.subtitle}
                            points={strengthsData.erp.points}
                            iconType="erp"
                            index={0}
                        />
                        <StrengthCard
                            title={strengthsData.web.title}
                            subtitle={strengthsData.web.subtitle}
                            points={strengthsData.web.points}
                            iconType="web"
                            index={1}
                        />
                        <StrengthCard
                            title={strengthsData.network.title}
                            subtitle={strengthsData.network.subtitle}
                            points={strengthsData.network.points}
                            iconType="network"
                            index={2}
                        />
                    </Flex>
                </VStack>
            </Container>
        </Box>
    );
} 