'use client'

import CTASection from "@/components/home/CTASection";
import FAQ from "@/components/home/FAQ";
import FeatureDetailsSection from "@/components/home/FeatureDetailsSection";
import FlowChart from "@/components/home/FlowChart";
import Hero from "@/components/home/Hero";
import ResourcesSection from "@/components/home/ResourcesSection";
import ServiceIntroSection from "@/components/home/ServiceIntroSection";
import { Box } from "@chakra-ui/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
export default function Home() {
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
