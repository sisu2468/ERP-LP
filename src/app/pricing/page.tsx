import PricingERP from "@/components/pages/pricing/ERP/PricingERP";
import PricingLab from "@/components/pages/pricing/LAB/PricingLab";
import { Container } from "@chakra-ui/react";
import type { Metadata, Viewport } from "next"; 
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    title: "【株式会社サインタ】価格情報",
    description: "サインタ・コアは、企業の多様なニーズに応じて柔軟にカスタマイズ可能な総合的なERPソリューションです。直感的な操作性と高い拡張性を兼ね備えたサインタ・コアで、あなたの企業に最適な業務環境を構築しましょう。",
    metadataBase: new URL('https://sainta.co.jp/pricing'),
    icons: {
        icon: "/favicons/favicon.ico",
    },
    openGraph: {
        images: [{
            url: '/favicons/favicon-96x96.png',
            width: 96,
            height: 96,
            alt: 'サインタ・コア Preview Image',
        }],
    },
};

export default function Pricing() {
    return (
        <Container maxW="full" p={0}>
            <PricingERP />
            <PricingLab />
        </Container>
    );
}
