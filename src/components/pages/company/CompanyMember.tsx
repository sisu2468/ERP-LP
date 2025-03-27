'use client';

import { Box, Container, Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import MemberCard from "./MemberCard";

export default function CompanyMember() {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const accentColor = useColorModeValue('orange.500', 'orange.300');

    return (
        <Box bg={bgColor} id="members" py={16}>
            <Container maxW="6xl">
                <VStack spacing={12}>
                    <VStack spacing={2}>
                        <Heading
                            as="h2"
                            size="lg"
                            fontSize={{ base: "3xl", md: "4xl" }}
                            textAlign="center"
                            color={accentColor}
                        >
                            CEO自己紹介
                        </Heading>
                    </VStack>

                    <MemberCard
                        name="サンタナム 理志"
                        image="/images/company/members/ceo-whitebg.png"
                        title="株式会社サインタ・代表取締役社長"
                        description1="アメリカで生まれ育ち、コンピュータサイエンスを学んだ後、ニューヨークと東京でのキャリアを積みました。日本で働く中で、この国の素晴らしいおもてなしの心や製品の品質の高さに深く感銘を受けました。しかし同時に、そうした日本の強みがソフトウェア分野ではまだ十分に活かされていないことに気づきました。"
                        description2="この経験から、「ユーザーファースト」を企業理念に掲げ、株式会社サインタを設立しました。私たちは、日本の方々がより簡単に自分のビジネスを始められる環境づくりに貢献したいと考えています。テクノロジーの力で日本のビジネスの誕生と成長を支える—それが私たちサインタの使命です。"
                    />
                </VStack>
            </Container>
        </Box>
    );
} 