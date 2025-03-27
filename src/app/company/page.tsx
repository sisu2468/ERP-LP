import { Container } from "@chakra-ui/react";
import CompanyHero from "@/components/pages/company/CompanyHero";
import CompanyProfile from "@/components/pages/company/CompanyProfile";
import CompanyMember from "@/components/pages/company/CompanyMember";
import CompanyMVV from "@/components/pages/company/mvv/CompanyMVV";
import BusinessOverview from "@/components/pages/company/BusinessOverview";
import ServiceIntroduction from "@/components/pages/company/service_introduction/ServiceIntroduction";
import Service_Description from "@/components/pages/company/description/Service_Description";
import OperationStrengths from "@/components/pages/company/operation_strengths/OperationStrengths";
import Achievements from "@/components/pages/company/achievements/Achievements";

export default function Company() {
    return (
        <Container maxW="full" p={0}>
            <CompanyHero />
            <CompanyMember />
            <CompanyProfile />
            <CompanyMVV />
            <BusinessOverview />
            <ServiceIntroduction />
            <Service_Description />
            <OperationStrengths />
            <Achievements />
        </Container>
    )
}   
