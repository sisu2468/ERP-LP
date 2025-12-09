"use client"

import { Box } from "@chakra-ui/react";
import EnglishHero from "./EnglishHero";
import InstructorSection from "./InstructorSection";
import ProblemsSection from "./ProblemsSection";
import SolutionSection from "./SolutionSection";
import EnglishPricingSection from "./EnglishPricingSection";
import ProcessSection from "./ProcessSection";

export default function EnglishPage() {
    return (
        <Box>
            {/* 1. Hero Section */}
            <EnglishHero />

            {/* 2. Instructor Introduction */}
            <InstructorSection />

            {/* 3. Problems/Pain Points */}
            <ProblemsSection />

            {/* 4. Solutions */}
            <SolutionSection />

            {/* 5. Pricing Plans */}
            <EnglishPricingSection />

            {/* 6. Process/Flow */}
            <ProcessSection />
        </Box>
    )
}
