import { Container } from "@chakra-ui/react";
import CareerHero from "@/components/pages/career/CareerHero";
import CompanyCulture from "@/components/pages/career/culture/CompanyCulture";

export default function Career() {
    return (
        <Container maxW="full" p={0}>
            <CareerHero />
            <CompanyCulture />
        </Container>
    )
}
