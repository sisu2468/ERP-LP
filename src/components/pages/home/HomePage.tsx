"use client"

import { Box } from "@chakra-ui/react";
import Hero from "./Hero";
import FeaturesSection from "./FeaturesSection";
import ModulesSection from "./ModulesSection";
import PricingSection from "./PricingSection";
import FAQSection from "./FAQSection";

export default function HomePage() {
    return (
        <Box>
            {/* 1. ヒーローセクション */}
            <Hero />

            {/* 2. 機能セクション（5つの問題解決） */}
            <FeaturesSection />

            {/* 3. モジュール機能一覧 */}
            <ModulesSection />

            {/* 4. 料金プラン */}
            <PricingSection />

            {/* 5. FAQ */}
            <FAQSection />
        </Box>
    )
}
