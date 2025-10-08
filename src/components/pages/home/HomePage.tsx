"use client"

import { Box } from "@chakra-ui/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import CTASection from "./CTASection";
import FAQ from "./faq/FAQ";
import Hero from "./Hero";
import ProblemSection from "./ProblemSection";
import BasicFlowSection from "./BasicFlowSection";
import TestimonialsSection from "./TestimonialsSection";

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
            <TestimonialsSection />
            <ProblemSection />
            <BasicFlowSection />
            <CTASection />
            {/* <FAQ /> */}
        </Box>
    )
}
