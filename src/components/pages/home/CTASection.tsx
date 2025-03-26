import {
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Text,
    VStack,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    FaClock
} from 'react-icons/fa';
import Button_Orange from '../../buttons/Button_Orange';
import Button_Blue from '../../buttons/Button_Blue';
import { CTACard } from './CTACard';
import { ctaCards } from '../../../constant/CTACards';

export default function CTASection() {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('white', 'gray.900');
    const headingColor = useColorModeValue('gray.800', 'white');
    const accentColor = useColorModeValue('orange.500', 'orange.300');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const boxBg = useColorModeValue('gray.50', 'gray.800');
    const iconColor = useColorModeValue('gray.600', 'gray.300');
    const borderColor = useColorModeValue('gray.100', 'gray.700');

    return (
        <Box py={16} bg={bgColor} transition="background-color 0.2s">
            <Container maxW="7xl">
                <VStack spacing={16}>
                    <VStack spacing={4} textAlign="center" maxW="2xl" mx="auto">
                        <Heading 
                            size="xl"
                            color={headingColor}
                        >
                            ビジネスの効率化を
                            <Text as="span" color={accentColor}>
                                今すぐ
                            </Text>
                            始めましょう
                        </Heading>
                        <Text fontSize="xl" color={textColor}>
                            導入から運用まで、専任のサポートチームが全面的にサポートいたします
                        </Text>
                    </VStack>

                    <SimpleGrid
                        columns={{ base: 1, lg: 3 }}
                        spacing={8}
                        width="full"
                    >
                        {ctaCards.map((card) => (
                            <CTACard 
                                key={card.title} 
                                card={card} 
                                colorMode={colorMode}
                            />
                        ))}
                    </SimpleGrid>

                    <Box
                        bg={boxBg}
                        w="full"
                        p={8}
                        borderRadius="xl"
                        textAlign="center"
                        borderWidth="1px"
                        borderColor={borderColor}
                        _hover={{
                            borderColor: colorMode === 'light' ? 'orange.200' : 'orange.500',
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}
                        transition="all 0.3s"
                    >
                        <VStack spacing={4}>
                            <HStack spacing={2} color={iconColor}>
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