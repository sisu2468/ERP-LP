import { FormLabel, RadioGroup, Button, FormControl, Radio, SimpleGrid, Input, Select } from "@chakra-ui/react";

import { VStack } from "@chakra-ui/react";

import { Box } from "@chakra-ui/react";

export default function ReqForm() {
    return (
        <Box
            boxShadow="md"
            borderRadius="lg"
            p={8}
            bg="white"
        >
            <VStack spacing={6}>
                <SimpleGrid columns={2} spacing={4} w="100%">
                    <FormControl>
                        <FormLabel>姓</FormLabel>
                        <Input placeholder="サック" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>名</FormLabel>
                        <Input placeholder="太郎" />
                    </FormControl>
                </SimpleGrid>

                <FormControl>
                    <FormLabel>会社名</FormLabel>
                    <Input placeholder="株式会社オロ" />
                </FormControl>

                <SimpleGrid columns={2} spacing={4} w="100%">
                    <FormControl>
                        <FormLabel>部署区分</FormLabel>
                        <Select placeholder="選択してください">
                            <option>営業部</option>
                            <option>経理部</option>
                            <option>総務部</option>
                            <option>その他</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>役職</FormLabel>
                        <Select placeholder="選択してください">
                            <option>部長</option>
                            <option>課長</option>
                            <option>主任</option>
                            <option>その他</option>
                        </Select>
                    </FormControl>
                </SimpleGrid>

                <FormControl>
                    <FormLabel>部署名</FormLabel>
                    <Input placeholder="任意" />
                </FormControl>

                <FormControl>
                    <FormLabel>メールアドレス</FormLabel>
                    <Input type="email" placeholder="zac@jp.oro.com" />
                </FormControl>

                <FormControl>
                    <FormLabel>日中連絡のつきやすい電話番号</FormLabel>
                    <Input placeholder="08012345678" />
                </FormControl>

                <FormControl>
                    <FormLabel>導入検討先</FormLabel>
                    <RadioGroup>
                        <VStack align="start" spacing={2}>
                            <Radio value="self">自社導入</Radio>
                            <Radio value="client">クライアント先での導入</Radio>
                        </VStack>
                    </RadioGroup>
                </FormControl>

                <Button
                    colorScheme="blue"
                    size="lg"
                    width="100%"
                    mt={4}
                >
                    お申し込み
                </Button>
            </VStack>
        </Box>
    )
}
