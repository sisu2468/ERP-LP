import { Container } from "@chakra-ui/react";
import CompanyHero from "@/components/pages/company/CompanyHero";
import CompanyProfile from "@/components/pages/company/CompanyProfile";
import CompanyMember from "@/components/pages/company/CompanyMember";
export default function Company() {
    return (
        <Container maxW="full" p={0}>
            <CompanyHero />
            <CompanyMember />
            <CompanyProfile />
        </Container>
    )
}   
