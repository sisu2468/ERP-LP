'use client';

import { Box, Container, Heading, useColorModeValue, VStack } from "@chakra-ui/react";
import { DescriptionCard } from "./DescriptionCard";

export default function Service_Description() {
    const bgColor = useColorModeValue('gray.100', 'gray.900');

    return (
        <Box py={20} bg={bgColor} overflow="hidden">
            <Container maxW="8xl">
                <VStack spacing={{ base: 10, md: 16 }} align="center">
                    <VStack align="center" spacing={2} w="full">
                        <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="orange.500" letterSpacing="wide">
                            各事業の詳細説明
                        </Heading>
                        <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="gray.500" letterSpacing="wider">
                            SERVICE DESCRIPTION
                        </Heading>
                    </VStack>
                    <DescriptionCard
                        title="ERPソフトウェア『サインタ・コア』"
                        description1="サインタ・コアは、企業運営の複雑さを解消し、効 率性を最⼤化するために設計された統合プラット フォームです。会計、在庫管理、顧客関係管理、⼈事 管理などの主要ビジネス機能を⼀元化し、リアルタイ ムでのデータ分析とレポート機能を提供します。"
                        description2="クラウドベースのソリューションにより、場所や時 間を問わずアクセスが可能で、⽇本企業特有の業務 フローやコンプライアンス要件に対応しています。モ ジュール型の設計により、企業の成⻑に合わせて機 能を拡張できる柔軟性も備えています。"
                        imgalt="ERPソフトウェア『サインタ・コア』"
                        imgstatus={true}
                        imgsrc="/images/company/description/erp-customer.png"
                    />
                    <DescriptionCard
                        title="カスタムウェブデザインサービス『サインタ・ラボ』"
                        description1="ラボは、単なるウェブサイト制作を超えた戦略的デジタルパート ナーです。ユーザー体験（UX）を中⼼に据えたデザイン哲学に より、訪問者をリードへ、リードを顧客へと効果的に変換しま す。"
                        description2="レスポンシブデザイン、SEO最適化、パフォーマンス重視の開 発アプローチにより、クライアントのオンラインプレゼンスを最 ⼤化します。また、継続的な分析とデータ駆動型の改善プロセス により、常に進化するデジタル環境に対応します。"
                        imgalt="カスタムウェブデザインサービス『サインタ・ラボ』"
                        imgstatus={false}
                        imgdirection={true}
                        imgsrc="/contentblocks/lab/contentimage_lab1.png"
                    />
                    <DescriptionCard
                        title="専⾨家ネットワーク・提携サービス『サインタ・コネクト』"
                        description1="サインタ・コネクトは、ビジネスの多様な課題に対応するための専⾨家 ネットワークです。法律、税務など、各分野のエキスパートと提携し、 統合されたアドバイザリーサービスを提供します。"
                        description2="クライアントは、複数のサービスプロバイダーとの契約管理の煩雑さか ら解放され、サインタを通じて必要な専⾨知識にアクセスできます。こ の統合アプローチにより、⼀貫した⾼品質なサービスと効率的なプロ ジェクト管理を実現します。"
                        imgalt="専⾨家ネットワーク・提携サービス『サインタ・コネクト』"
                        imgstatus={false}
                        imgsrc="/contentblocks/partner/contentimage_partner1.png"
                    />
                </VStack>
            </Container>
        </Box>
    );
}
