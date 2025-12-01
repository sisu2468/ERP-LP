import ScrollButtons from "@/components/common/ScrollButtons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LanguageWrapper from "@/components/common/LanguageWrapper";
import LoadingManager from "@/components/common/LoadingManager";
import { Box } from "@chakra-ui/react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: '【株式会社サインタ】スマートERP',
  description: '売上・在庫・顧客情報を一つの画面で動きとして見える化。スプレッドシートの時代は終わり。サインタ・コアで、データを動かす経営へ。無料トライアル実施中。',
  metadataBase: new URL('https://sainta.co.jp'),
  keywords: ['ERP', '業務効率化', '在庫管理', '顧客管理', '請求書管理', 'サインタ', 'SAINTA', 'スマートERP', 'クラウドERP', 'Rishi Santhanam', 'Rishi Santhanam CEO', 'Rishi Santhanam Sainta', 'サンタナム 理志', 'サンタナム リシ', 'サインタ CEO', 'SAINTA Corporation', '株式会社サインタ 代表'],
  authors: [{ name: '株式会社サインタ' }],
  icons: {
    icon: '/favicons/favicon.ico',
    apple: '/favicons/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sainta.co.jp',
    siteName: '株式会社サインタ',
    title: '【株式会社サインタ】スマートERP',
    description: '売上・在庫・顧客情報を一つの画面で見える化。データを動かす経営へ。',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: '株式会社サインタ - スマートERP',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '【株式会社サインタ】スマートERP',
    description: '売上・在庫・顧客情報を一つの画面で見える化。データを動かす経営へ。',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://sainta.co.jp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <LanguageWrapper>
            <LoadingManager duration={2000}>
              <Box className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <ScrollButtons />
                <Footer />
              </Box>
            </LoadingManager>
          </LanguageWrapper>
        </Providers>
      </body>
    </html>
  )
}