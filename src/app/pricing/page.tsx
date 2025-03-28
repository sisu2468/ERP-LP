import PricingERP from "@/components/pages/pricing/ERP/PricingERP";
import PricingLab from "@/components/pages/pricing/LAB/PricingLab";
import { Container } from "@chakra-ui/react";

export default function Pricing() {
    return (
        <Container maxW="full" p={0}>
            <PricingERP />
            <PricingLab />
        </Container>
    );
}
