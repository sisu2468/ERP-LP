import ScrollButtons from "@/components/common/ScrollButtons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Box } from "@chakra-ui/react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "サインタ・コアにはどんな機能が入ってる？",
  description: "サインタERPの基本機能「サインタ・コア」には、ビジネスをスムーズに運営するための必須ツールが揃っています。",
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
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Box className="flex flex-col justify-between">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <ScrollButtons />
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  )
}