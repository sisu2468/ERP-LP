'use client'

import { Container, Box, useColorMode } from "@chakra-ui/react";

import { Flex } from "@chakra-ui/react";
import ReqForm from "./ReqForm";
import ReqIntro from "./ReqIntro";
import { getColors } from "@/constant/colorenum";

export default function RequestPage() {
    const { colorMode } = useColorMode();
    const { bgColor } = getColors(colorMode);

    return (
        <Box w="full" bg={bgColor} py={16}>
            <Container maxW="7xl">
                <Flex>
                    <Box w="50%">
                        <ReqIntro />
                    </Box>
                    <Box w="50%">
                        <ReqForm />
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}
