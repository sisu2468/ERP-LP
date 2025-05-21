'use client'

import RequestPage from "@/components/pages/req-info/RequestPage";
import {
    Container,
    Text,
    VStack
} from "@chakra-ui/react";

export default function RequestInformation() {
    return (
        <Container maxW="full" p={0}>
            <RequestPage />

            <Text fontSize="sm" color="gray.600" textAlign="center">
                お申し込み完了ページの日程調整ツールより、ご希望の日程をお選びいただくか、お電話やメールにて日程をご調整ください。
            </Text>
        </Container>
    );
}