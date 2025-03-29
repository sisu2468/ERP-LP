'use client'

import { getColors } from "@/constant/colorenum";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Textarea, useColorMode, VStack } from "@chakra-ui/react";

export default function SupportRequest({ isOpen, onClose, handleSubmit }: { isOpen: boolean, onClose: () => void, handleSubmit: (e: React.FormEvent) => void }) {
    const { colorMode } = useColorMode();
    
    const { headingColor } = getColors(colorMode);
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay
                bg="blackAlpha.300"
                backdropFilter="blur(10px)"
            />
            <ModalContent>
                <ModalHeader color={headingColor}>お問い合わせ</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel color={headingColor}>会社名</FormLabel>
                                <Input placeholder="株式会社サインタ" color={headingColor} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color={headingColor}>お名前</FormLabel>
                                <Input placeholder="山田 太郎" color={headingColor} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color={headingColor}>メールアドレス</FormLabel>
                                <Input type="email" placeholder="example@sainta.jp" color={headingColor} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color={headingColor}>電話番号</FormLabel>
                                <Input type="tel" placeholder="03-1234-5678" color={headingColor} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color={headingColor}>お問い合わせ内容</FormLabel>
                                <Select placeholder="選択してください" color={headingColor}>
                                    <option value="demo">デモのご依頼</option>
                                    <option value="price">料金に関するお問い合わせ</option>
                                    <option value="function">機能に関するお問い合わせ</option>
                                    <option value="other">その他</option>
                                </Select>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color={headingColor}>詳細</FormLabel>
                                <Textarea
                                    placeholder="お問い合わせ内容の詳細をご記入ください"
                                    rows={5}
                                    color={headingColor}
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                colorScheme="orange"
                                size="lg"
                                width="full"
                                mt={4}
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg'
                                }}
                            >
                                送信する
                            </Button>
                        </VStack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}