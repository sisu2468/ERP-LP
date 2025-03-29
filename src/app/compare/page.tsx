'use client'

import PlanComparison from "@/components/pages/pricing/PlanComparison"
import { Container } from "@chakra-ui/react"
import { useColorMode } from "@chakra-ui/react"
import { getColors } from "@/constant/colorenum"

export default function Compare() {
    const { colorMode } = useColorMode();
    const { bgColor } = getColors(colorMode);
    return (
        <Container maxW="full" p={0} bg={bgColor}>
            <PlanComparison />
        </Container>
    )
}
