import { Container } from "@chakra-ui/react";
import CompanyHero from "@/components/pages/company/CompanyHero";
import CompanyProfile from "@/components/pages/company/CompanyProfile";
import CompanyMember from "@/components/pages/company/CompanyMember";
import CompanyMVV from "@/components/pages/company/mvv/CompanyMVV";
import BusinessOverview from "@/components/pages/company/BusinessOverview";
import ServiceIntroduction from "@/components/pages/company/service_introduction/ServiceIntroduction";
import Service_Description from "@/components/pages/company/description/Service_Description";
import OperationStrengths from "@/components/pages/company/operation_strengths/OperationStrengths";
import Achievements from "@/components/pages/company/achievements/Achievements";
import OurThoughts from "@/components/pages/company/our_thoughts/OurThoughts";
import type { Metadata, Viewport } from "next";
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    title: "【株式会社サインタ】会社概要",
    description: "株式会社サインタの会社概要ページでは、私たちの企業理念、歴史、業務内容を詳しくご紹介します。信頼性と革新性を重視し、クライアントの成功をサポートしています。",
    metadataBase: new URL('https://sainta.co.jp/company'),
    icons: {
        icon: [
            { url: '/favicons/favicon.ico' },
            { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
        ],
    },
    openGraph: {
        title: "【株式会社サインタ】会社概要",
        description: "株式会社サインタの会社概要ページでは、私たちの企業理念、歴史、業務内容を詳しくご紹介します。信頼性と革新性を重視し、クライアントの成功をサポートしています。",
        siteName: "株式会社サインタ",
        locale: 'ja_JP',
        type: 'website',
        url: '/company',
        images: [{
            url: '/favicons/favicon-96x96.png',
            width: 1200,
            height: 630,
            alt: '株式会社サインタ - 会社概要',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: "【株式会社サインタ】会社概要",
        description: "株式会社サインタの会社概要ページでは、私たちの企業理念、歴史、業務内容を詳しくご紹介します。",
        images: ['/favicons/favicon-96x96.png'],
    }
};

export default function Company() {
    return (
        <Container maxW="full" p={0}>
            <CompanyHero />
            <CompanyMember />
            <CompanyProfile />
            <CompanyMVV />
            <BusinessOverview />
            {/* <ServiceIntroduction />
            <Service_Description />
            <OperationStrengths />
            <Achievements /> */}
            <OurThoughts />
        </Container>
    )
}   
