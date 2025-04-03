import { Box, Heading, ListIcon, List, ListItem, Image } from "@chakra-ui/react";
import { MdCheckCircle } from 'react-icons/md';

export default function ReqIntro() {
    return (
        <Box>
            <Box textAlign="center">
                <Heading as="h1" size="xl" color="blue.700" mb={2}>
                    クラウドERP ZAC
                </Heading>
                <Heading as="h2" size="lg" mb={6}>
                    無料デモ相談のお申込み
                </Heading>
            </Box>

            <Box>
                <Image
                    src="/demo-devices.png"
                    alt="ZAC on multiple devices"
                    mx="auto"
                />
            </Box>

            <Box bg="gray.50" p={6} borderRadius="md">
                <Heading as="h3" size="md" color="blue.700" mb={4}>
                    【ZAC 無料デモ相談のポイント】
                </Heading>
                <List spacing={3}>
                    <ListItem display="flex" alignItems="center">
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        豊富な導入事例から御社に似た事例を紹介
                    </ListItem>
                    <ListItem display="flex" alignItems="center">
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        デモ画面を見ながら御社別の業務改善を提案
                    </ListItem>
                    <ListItem display="flex" alignItems="center">
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        詳しい機能や価格についてご説明
                    </ListItem>
                </List>
            </Box>
        </Box>

    )
}
