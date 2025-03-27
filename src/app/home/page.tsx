'use client'

import CTASection from "@/components/pages/home/CTASection";
import FAQ from "@/components/pages/home/FAQ";
import FeatureDetailsSection from "@/components/pages/home/FeatureDetailsSection";
import FlowChart from "@/components/pages/home/flowchart/FlowChart";
import Hero from "@/components/pages/home/Hero";
import ResourcesSection from "@/components/pages/home/ResourcesSection";
import ServiceIntroSection from "@/components/pages/home/ServiceIntroSection";
import { Box } from "@chakra-ui/react";

import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

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
