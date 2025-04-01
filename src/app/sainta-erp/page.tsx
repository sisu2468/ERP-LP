import ModuleGrid from "@/components/pages/modules/ModuleGrid";
import { Container } from "@chakra-ui/react";
import type { Metadata, Viewport } from "next";
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    title: "【株式会社サインタ】サインタ・コアにはどんな機能が入ってる？",
    description: "サインタERPの基本機能「サインタ・コア」には、ビジネスをスムーズに運営するための必須ツールが揃っています。",
    metadataBase: new URL('https://sainta.co.jp/sainta-erp'),
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

export default function SaintaErp() {
    return (
        <Container maxW="full" p={0}>
            <ModuleGrid />
        </Container>
    )
}
