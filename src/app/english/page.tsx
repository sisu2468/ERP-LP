import EnglishPage from "@/components/pages/english/EnglishPage";
import { Box } from "@chakra-ui/react";

import type { Metadata, Viewport } from "next";
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "【株式会社サインタ】英語学習プログラム",
  description: "サインタ・イングリッシュは、日本人向けの英語学習プログラムです。ネイティブ講師とのレッスン、専任コーチによるサポートで、最短で「使える英語」を身につけましょう。",
  keywords: '英語学習, 英会話, ネイティブ講師, 英語コーチング, オンライン英会話, ビジネス英語, 日常英会話, サインタイングリッシュ, SAINTA English, 英語レッスン, マンツーマン英会話',
  icons: {
    icon: "/favicons/favicon.ico",
  },
  openGraph: {
    title: '【株式会社サインタ】英語学習プログラム',
    description: 'ネイティブ講師とのレッスン、専任コーチによるサポートで、最短で「使える英語」を身につけましょう。',
    type: 'website',
    locale: 'ja_JP',
    images: [{
      url: '/images/english/english_hero.png',
      width: 1200,
      height: 630,
      alt: 'サインタ・イングリッシュ Preview Image',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '【株式会社サインタ】英語学習プログラム',
    description: 'ネイティブ講師とのレッスン、専任コーチによるサポートで、最短で「使える英語」を身につけましょう。',
  },
  alternates: {
    canonical: 'https://sainta.co.jp/english',
    languages: {
      'ja': 'https://sainta.co.jp/english',
      'en': 'https://sainta.co.jp/en/english',
      'ko': 'https://sainta.co.jp/ko/english',
    },
  },
};

export default function English() {
  return (
    <Box>
      <EnglishPage />
    </Box>
  )
}
