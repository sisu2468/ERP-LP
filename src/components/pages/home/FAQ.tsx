'use client';

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Container,
    Heading,
    Link,
    Text,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';

const faqData = [
    {
        question: 'サインタ・コア（ERP）とはなんですか？',
        answer: 'サインタの ERP（Enterprise Resource Planning）は、企業のリソースを一元管理し、業務の効率化を図るための統合ソフトウェアです。そして、サインタの ERP 内ですべてのモジュールが利用できます。'
    },
    {
        question: 'どのような機能がありますか？',
        answer: (
            <>
                サインタERPには、財務管理、在庫管理、生産管理、販売管理、人事管理、顧客管理（CRM）など、様々な機能が含まれています。
                詳しい情報は、<Link href="/features" color="blue.500" textDecoration="underline">機能ページ</Link>をご覧ください。
            </>
        )
    },
    {
        question: '導入にはどれくらいの時間がかかりますか？',
        answer: '導入にかかる時間は企業の規模や複雑さによりますが、1 週間～1 か月ほどです。'
    },
    {
        question: 'クラウドベースですか、それともオンプレミスですか？',
        answer: 'サインタはクラウドベースに対応しており、お客様のニーズに合わせた柔軟な導入方法を選択できます。'
    },
    {
        question: '導入後のアップデートはどうなりますか？',
        answer: 'サインタでは定期的にアップデートを実施しており、新機能や改善点をお客様に提供します。'
    }
];

export default function FAQ() {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('gray.50', 'gray.800');
    const headingColor = useColorModeValue('gray.800', 'white');
    const accordionBg = useColorModeValue('white', 'gray.800');
    const accordionBorderColor = useColorModeValue('gray.200', 'gray.700');
    const accordionHoverBg = useColorModeValue('gray.50', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.300');

    return (
        <Box py={16} bg={bgColor} transition="background-color 0.2s">
            <Container maxW={{ base: "xl", sm: "2xl", md: "2xl", lg: "4xl", xl: "6xl" }}>
                <Heading
                    as="h2"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    mb={8}
                    textAlign="center"
                    color={headingColor}
                >
                    よくある質問
                </Heading>

                <Accordion allowMultiple>
                    {faqData.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            border="1px"
                            borderColor={accordionBorderColor}
                            bg={accordionBg}
                            mb={4}
                            boxShadow="md"
                            borderRadius="md"
                            _hover={{
                                borderColor: colorMode === 'light' ? 'blue.200' : 'blue.500',
                                transform: 'translateY(-1px)',
                                boxShadow: 'lg',
                            }}
                            transition="all 0.2s"
                        >
                            <h3>
                                <AccordionButton
                                    py={4}
                                    _hover={{ bg: accordionHoverBg }}
                                >
                                    <Box flex="1" textAlign="left" fontWeight="medium" color={headingColor}>
                                        {faq.question}
                                    </Box>
                                    <AccordionIcon color={colorMode === 'light' ? 'gray.800' : 'gray.100'} />
                                </AccordionButton>
                            </h3>
                            <AccordionPanel pb={4}>
                                <Text color={textColor}>
                                    {faq.answer}
                                </Text>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Container>
        </Box>
    );
} 