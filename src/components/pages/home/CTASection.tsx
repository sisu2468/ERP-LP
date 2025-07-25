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
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import {
    FaClock
} from 'react-icons/fa';
import Button_Orange from '../../buttons/Button_Orange';
import Button_Blue from '../../buttons/Button_Blue';
import { CTACard } from './CTACard';
import { ctaCards } from '../../../constant/CTACards';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InquiryModal from '../../common/InquiryModal';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('white', 'gray.900');
    const headingColor = useColorModeValue('gray.800', 'white');
    const accentColor = useColorModeValue('orange.500', 'orange.300');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const boxBg = useColorModeValue('gray.50', 'gray.800');
    const iconColor = useColorModeValue('gray.600', 'gray.300');
    const borderColor = useColorModeValue('gray.100', 'gray.700');

    const headingRef = useRef(null);
    const cardsGridRef = useRef(null);
    const ctaBoxRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

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

        // Cards grid container animation
        gsap.fromTo(cardsGridRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: cardsGridRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Bottom CTA box animation
        const ctaBox = ctaBoxRef.current;
        if (ctaBox) {
            gsap.fromTo(ctaBox,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: ctaBox,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
           
        };
    }, [colorMode, borderColor]);

    return (
        <Box py={16} bg={bgColor} transition="background-color 0.2s">
            <Container maxW="7xl">
                <VStack spacing={16}>
                    <VStack 
                        ref={headingRef}
                        spacing={4} 
                        textAlign="center" 
                        maxW="2xl" 
                        mx="auto"
                    >
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
                        ref={cardsGridRef}
                        columns={{ base: 1, lg: 3 }}
                        spacing={8}
                        width="full"
                    >
                        {ctaCards.map((card, index) => (
                            <CTACard 
                                key={card.title} 
                                card={card} 
                                colorMode={colorMode}
                                index={index}
                            />
                        ))}
                    </SimpleGrid>

                    <Box
                        ref={ctaBoxRef}
                        bg={boxBg}
                        w="full"
                        p={8}
                        borderRadius="xl"
                        textAlign="center"
                        borderWidth="1px"
                        borderColor={borderColor}
                        style={{ 
                            willChange: 'transform',
                            transform: 'translateY(0)'
                        }}
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
                                <Button
                                    size="lg"
                                    colorScheme="orange"
                                    px={8}
                                    fontSize="md"
                                    fontWeight="bold"
                                    onClick={onOpen}
                                    _hover={{
                                        transform: "translateY(-2px)",
                                        boxShadow: "lg",
                                    }}
                                >
                                    お問い合わせ
                                </Button>
                                <InquiryModal isOpen={isOpen} onClose={onClose} />
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