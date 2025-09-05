import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('white', 'gray.800');
    const headingColor = useColorModeValue('gray.800', 'white');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const accentColor = useColorModeValue('orange.500', 'orange.300');
    const cardBg = useColorModeValue('gray.50', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    const headingRef = useRef(null);
    const problemsRef = useRef(null);
    const explanationRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(headingRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        gsap.fromTo(problemsRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.2,
                scrollTrigger: {
                    trigger: problemsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        gsap.fromTo(explanationRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.4,
                scrollTrigger: {
                    trigger: explanationRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const problems = [
        "コンバージョン率が低く、もっと商品に興味を持ってもらいたい",
        "ブランドの印象が弱く、もっと「記憶に残る」存在でありたい",
        "新規顧客からのアポイントを、もっと安定的に獲得したい",
        "商品の魅力をしっかり伝える、効果的なLPを作ってもらいたい",
        "高すぎるLP／WEB制作サービスではなく、適正価格でプロに頼みたい"
    ];

    return (
        <Box py={16} bg={bgColor} transition="background-color 0.2s">
            <Container maxW="7xl">
                <VStack spacing={12}>
                    <VStack spacing={4} textAlign="center" maxW="3xl" mx="auto">
                        <Heading
                            ref={headingRef}
                            as="h2"
                            size="xl"
                            color={headingColor}
                        >
                            こんなお悩みはありませんか？
                        </Heading>
                    </VStack>

                    <VStack
                        ref={problemsRef}
                        spacing={4}
                        w="full"
                        maxW="4xl"
                        mx="auto"
                    >
                        {problems.map((problem, index) => (
                            <Box
                                key={index}
                                w="full"
                                p={6}
                                bg={cardBg}
                                borderRadius="lg"
                                border="1px"
                                borderColor={borderColor}
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    shadow: '0 8px 25px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <HStack spacing={4} align="flex-start">
                                    <Box
                                        w={8}
                                        h={8}
                                        borderRadius="full"
                                        bg={accentColor}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexShrink={0}
                                        mt={1}
                                        boxShadow="0 4px 12px rgba(0,0,0,0.15)"
                                    >
                                        <Text color="white" fontWeight="bold" fontSize="sm">
                                            {index + 1}
                                        </Text>
                                    </Box>
                                    <Text
                                        fontSize="lg"
                                        color={textColor}
                                        lineHeight="1.6"
                                    >
                                        {problem}
                                    </Text>
                                </HStack>
                            </Box>
                        ))}
                    </VStack>

                    <Box
                        ref={explanationRef}
                        w="full"
                        maxW="4xl"
                        mx="auto"
                        p={8}
                        bg={cardBg}
                        borderRadius="xl"
                        border="1px"
                        borderColor={borderColor}
                        textAlign="center"
                        boxShadow="0 4px 20px rgba(0,0,0,0.08)"
                    >
                        <VStack spacing={12} align="stretch">
                            {/* Top Section - Problem Statement */}
                            <Box>
                                <Text 
                                    fontSize="2xl" 
                                    fontWeight="bold" 
                                    color={accentColor}
                                    textAlign="center"
                                >
                                    どれだけ綺麗でも、「心に届かないLP」では成果は生まれません。
                                </Text>
                            </Box>

                            {/* Middle Section - Core Philosophy */}
                            <Box>
                                <VStack spacing={2} align="center">
                                    <Text 
                                        fontSize="xl" 
                                        color={textColor} 
                                        lineHeight="1.8"
                                        fontWeight="medium"
                                        textAlign="center"
                                    >
                                        人はデザインに動かされるのではなく、
                                    </Text>
                                    <Text 
                                        fontSize="xl" 
                                        color={textColor} 
                                        lineHeight="1.8"
                                        fontWeight="medium"
                                        textAlign="center"
                                        pl={8}
                                    >
                                        <Text as="span" color={accentColor} fontWeight="bold">
                                            "自分ごと"
                                        </Text>
                                        として響くストーリーに動かされます。
                                    </Text>
                                </VStack>
                            </Box>

                            {/* Bottom Section - Solution Statement */}
                            <Box>
                                <Text 
                                    fontSize="xl" 
                                    color={textColor} 
                                    lineHeight="1.8"
                                    fontWeight="medium"
                                    textAlign="center"
                                >
                                    だから私たちは、
                                    <Text as="span" color={accentColor} fontWeight="bold">
                                        「誰に・何を・どう伝えるか」
                                    </Text>
                                    という人の心を動かす設計から始めます。
                                </Text>
                            </Box>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
} 