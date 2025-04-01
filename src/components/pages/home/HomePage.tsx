"use client"

import { Box } from "@chakra-ui/react";
import Hero from "./Hero";
import ServiceIntroSection from "./ServiceIntroSection";
import FeatureDetailsSection from "./FeatureDetailsSection";
import ResourcesSection from "./ResourcesSection";
import CTASection from "./CTASection";
import FlowChart from "./flowchart/FlowChart";
import FAQ from "./faq/FAQ";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
    const sectionsRef = useRef([]);

    useEffect(() => {
        sectionsRef.current.forEach((section) => {
            if (!section) return;

            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1.2, ease: "circ.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 72.5%",
                        toggleActions: "play none none none",
                        once: true
                    }
                }
            );
        });
    }, []);
    return (
        <Box>
            <Hero />
            <ServiceIntroSection />
            <FeatureDetailsSection />
            <ResourcesSection />
            <FlowChart />
            <CTASection />
            <FAQ />
        </Box>
    )
}
