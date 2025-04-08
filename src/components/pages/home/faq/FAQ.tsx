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
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import Recommend from './Recommend';
import SupportRequest from './SupportRequest';
gsap.registerPlugin(ScrollTrigger);

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
    },
    {
        question: '無料プランでどこまで使えますか？',
        answer: '基本的な会計機能のみ利用可能です。'
    },
    {
        question: 'プラン変更は簡単ですか？',
        answer: 'はい、プランのアップグレード・ダウングレードはいつでも可能です。ビジネスの成長に合わせて 柔軟に対応できます。'
    },
    {
        question: '年間契約はできますか？',
        answer: 'はい、年間契約にすると1ヶ月分無料になります！長期利用でさらにお得に。'
    }
];

export default function FAQ() {
    const { colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const bgColor = useColorModeValue('gray.50', 'gray.800');
    const headingColor = useColorModeValue('gray.800', 'white');
    const accordionBg = useColorModeValue('white', 'gray.800');
    const accordionBorderColor = useColorModeValue('gray.200', 'gray.700');
    const accordionHoverBg = useColorModeValue('gray.50', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.300');

    const headingRef = useRef(null);
    const accordionRef = useRef(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    

    useEffect(() => {
        // Heading animation
        gsap.fromTo(headingRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Accordion items animation
        itemRefs.current.forEach((itemRef, index) => {
            if (itemRef) {
                // Initial animation
                gsap.fromTo(itemRef,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: itemRef,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Hover animation
                itemRef.addEventListener('mouseenter', () => {
                    gsap.to(itemRef, {
                        y: -4,
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        borderColor: colorMode === 'light' ? '#90CDF4' : '#3182CE',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                itemRef.addEventListener('mouseleave', () => {
                    gsap.to(itemRef, {
                        y: 0,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        borderColor: accordionBorderColor,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                // Click animation for accordion buttons
                const button = itemRef.querySelector('button');
                if (button) {
                    button.addEventListener('click', () => {
                        gsap.to(button.querySelector('.chakra-accordion__icon'), {
                            rotation: button.getAttribute('aria-expanded') === 'true' ? 0 : 180,
                            duration: 0.3,
                            ease: 'power2.inOut'
                        });
                    });
                }
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            itemRefs.current.forEach(itemRef => {
                if (itemRef) {
                    itemRef.removeEventListener('mouseenter', () => { });
                    itemRef.removeEventListener('mouseleave', () => { });
                    const button = itemRef.querySelector('button');
                    if (button) {
                        button.removeEventListener('click', () => { });
                    }
                }
            });
        };
    }, [colorMode, accordionBorderColor]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        onClose();
    };

    return (
        <Box py={16} bg={bgColor} transition="background-color 0.2s">
            <Container maxW={{ base: "xl", sm: "2xl", md: "2xl", lg: "4xl", xl: "6xl" }}>
                <Heading
                    ref={headingRef}
                    as="h2"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    mb={8}
                    textAlign="center"
                    color={headingColor}
                >
                    よくある質問
                </Heading>

                <Accordion
                    ref={accordionRef}
                    allowMultiple
                >
                    {faqData.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            ref={el => { itemRefs.current[index] = el }}
                            border="1px"
                            borderColor={accordionBorderColor}
                            bg={accordionBg}
                            mb={4}
                            boxShadow="md"
                            borderRadius="md"
                            style={{
                                willChange: 'transform',
                                transform: 'translateY(0)'
                            }}
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
                <Recommend />
                <SupportRequest isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit} />
            </Container>
        </Box>
    );
}