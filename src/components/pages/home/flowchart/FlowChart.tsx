import { Box } from "@chakra-ui/react";
import ImplementationFlow from "./ImplementationFlow";
import PricingFeatures from "./PricingFeatures";
import CustomerSupport from "./CustomerSupport";

export default function FlowChart() {
    return (
        <Box>
            <ImplementationFlow />
            <PricingFeatures />
            <CustomerSupport />
        </Box>
    );
}   
