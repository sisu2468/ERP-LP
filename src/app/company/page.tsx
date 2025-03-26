import { Container } from "@chakra-ui/react";
import CompanyHero from "@/components/pages/company/CompanyHero";
import CompanyProfile from "@/components/pages/company/CompanyProfile";
import CompanyMember from "@/components/pages/company/CompanyMember";
import CompanyMVV from "@/components/pages/company/mvv/CompanyMVV";
import BusinessOverview from "@/components/pages/company/BusinessOverview";
import ServiceIntroduction from "@/components/pages/company/service_introduction/ServiceIntroduction";
export default function Company() {
    return (
        <Container maxW="full" p={0}>
            <CompanyHero />
            <CompanyMember />
            <CompanyProfile />
            <CompanyMVV />
            <BusinessOverview />
            <ServiceIntroduction />
        </Container>
    )
}   
