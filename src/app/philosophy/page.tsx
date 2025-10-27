import { Container } from "@chakra-ui/react";
import PhilosophyHero from "@/components/pages/philosophy/PhilosophyHero";
import CreationSection from "@/components/pages/philosophy/CreationSection";
import TimeSection from "@/components/pages/philosophy/TimeSection";
import EvolutionSection from "@/components/pages/philosophy/EvolutionSection";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    title: "【株式会社サインタ】理念",
    description: "サインタの理念ページ。なぜサインタを、世界に？創造とは何か、そして私たちがどのように進化し続けるのかについて。",
    metadataBase: new URL('https://sainta.co.jp/philosophy'),
    icons: {
        icon: [
            { url: '/favicons/favicon.ico' },
            { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
        ],
    },
    openGraph: {
        title: "【株式会社サインタ】理念",
        description: "サインタの理念ページ。なぜサインタを、世界に？創造とは何か、そして私たちがどのように進化し続けるのかについて。",
        siteName: "株式会社サインタ",
        locale: 'ja_JP',
        type: 'website',
        url: '/philosophy',
        images: [{
            url: '/favicons/favicon-96x96.png',
            width: 1200,
            height: 630,
            alt: '株式会社サインタ - 理念',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: "【株式会社サインタ】理念",
        description: "サインタの理念ページ。なぜサインタを、世界に？",
        images: ['/favicons/favicon-96x96.png'],
    }
};

export default function Philosophy() {
    return (
        <Container maxW="full" p={0}>
            <PhilosophyHero />
            <CreationSection />
            <TimeSection />
            <EvolutionSection />
        </Container>
    )
}
