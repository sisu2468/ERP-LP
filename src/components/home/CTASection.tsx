import {
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Text,
    VStack
} from '@chakra-ui/react';
import {
    FaClock
} from 'react-icons/fa';
import { ctaCards } from '../../constant/CTACards';
import Button_Blue from '../buttons/Button_Blue';
import Button_Orange from '../buttons/Button_Orange';
import { CTACard } from './CTACart';

export default function CTASection() {
    return (
        <Box py={16}>
            <Container maxW="7xl">
                <VStack spacing={16}>
                    <VStack spacing={4} textAlign="center" maxW="2xl" mx="auto">
                        <Heading size="xl">
                            ビジネスの効率化を
                            <Text as="span" color="orange.500">
                                今すぐ
                            </Text>
                            始めましょう
                        </Heading>
                        <Text fontSize="xl" color="gray.600">
                            導入から運用まで、専任のサポートチームが全面的にサポートいたします
                        </Text>
                    </VStack>

                    <SimpleGrid
                        columns={{ base: 1, lg: 3 }}
                        spacing={8}
                        width="full"
                    >
                        {ctaCards.map((card) => (
                            <CTACard key={card.title} card={card} />
                        ))}
                    </SimpleGrid>

                    <Box
                        bg="gray.50"
                        w="full"
                        p={8}
                        borderRadius="xl"
                        textAlign="center"
                    >
                        <VStack spacing={4}>
                            <HStack spacing={2} color="gray.600">
                                <Icon as={FaClock} />
                                <Text>初期設定からご利用開始まで最短3日</Text>
                            </HStack>
                            <Flex
                                gap={4}
                                flexWrap="wrap"
                                justify="center"
                            >
                                <Button_Orange href="/contact">
                                    お問い合わせ
                                </Button_Orange>
                                <Button_Blue href="/faq">
                                    よくある質問
                                </Button_Blue>
                            </Flex>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
} 