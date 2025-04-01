import HomePage from "@/components/pages/home/HomePage";
import { Box } from "@chakra-ui/react";

import type { Metadata, Viewport } from "next";
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "【株式会社サインタ】スマートERP",
  description: "株式会社サインタが提供するスマートERP「サインタ・コア」は、企業の業務効率を大幅に向上させる次世代のシステムです。",
  metadataBase: new URL('https://sainta.co.jp/home'),
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

export default function Home() {

  return (
    <Box>
      <HomePage />
    </Box>
  )
}
