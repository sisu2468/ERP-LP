import ScrollButtons from "@/components/common/ScrollButtons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
  title: "【株式会社サインタ】スマートERP",
  description: "株式会社サインタが提供するスマートERP「サインタ・コア」は、企業の業務効率を大幅に向上させる次世代のシステムです。",
  metadataBase: new URL('https://sainta.co.jp'),
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Define images to preload for better loading experience
  const imagesToPreload = [
    '/hero/woman_half.png',
    // Add more image paths as needed
  ];

  return (
    <html lang="ja">
      <body>
        <Providers>
          <LoadingManager 
            imageUrls={imagesToPreload}
            minLoadingTime={3000}
          >
            <Box className="flex flex-col justify-between">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <ScrollButtons />
              <Footer />
            </Box>
          </LoadingManager>
        </Providers>
      </body>
    </html>
  )
}