import { Container } from "@chakra-ui/react";
import CareerHero from "@/components/pages/career/CareerHero";
import CompanyCulture from "@/components/pages/career/culture/CompanyCulture";
import CareerProcess from "@/components/pages/career/process/CareeerProcess";
import CareerPositions from "@/components/pages/career/positions/CareerPositions";
import type { Metadata, Viewport } from "next"; 
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    title: "【株式会社サインタ】採用情報",
    description: "株式会社サインタの採用情報ページでは、私たちと共に未来を切り開く仲間を募集しています。",
    metadataBase: new URL('https://sainta.co.jp/career'),
    icons: {
        icon: "/favicons/favicon.ico",
    },
};
export default function Career() {
    return (
        <Container maxW="full" p={0}>
            <CareerHero />
            <CompanyCulture />
            <CareerProcess />
            <CareerPositions />
        </Container>
    )
}
