'use client';

import { getColors } from '@/constant/colorenum';
import {
    Box,
    Container,
    Grid,
    Heading,
    HStack,
    Icon,
    Text,
    useColorMode,
    VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdLocationOn, MdTimer } from 'react-icons/md';
import PositionCard from './PositionCard';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

interface Position {
    title: string;
    category: string;
    categoryJa: string;
    categoryColor: string;
    description: string;
    location: string;
    type: string;
    experience?: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const positions: Position[] = [
    {
        title: 'マーケティング',
        category: 'Marketing',
        categoryJa: 'マーケティング',
        categoryColor: 'blue.400',
        description: 'デジタルマーケティング戦略の立案から実行まで。ブランド価値向上とユーザー獲得を担当。',
        location: '東京',
        type: '正社員',
        experience: '新卒'
    },
    {
        title: '営業',
        category: 'Sales',
        categoryJa: '営業',
        categoryColor: 'purple.400',
        description: '新規顧客の開拓から既存顧客のフォローまで。製品価値を伝え、ビジネスの成長を促進。',
        location: '東京',
        type: '正社員',
        experience: '新卒'
    },
    {
        title: '法人営業',
        category: 'Sales',
        categoryJa: '営業',
        categoryColor: 'purple.400',
        description: '企業向けソリューション提案。顧客のビジネス課題を解決し、長期的な関係構築を目指す。',
        location: '東京',
        type: '正社員',
        experience: '1-3年'
    }
];

const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

export default function CareerPositions() {
    const { colorMode } = useColorMode();
    const { bgColor, headingColor, textColor, cardBg, borderColor } = getColors(colorMode);

    return (
        <Box py={16} bg={bgColor}>
            <Container maxW={{ base: "xl", md: "6xl" }}>
                <VStack spacing={8} mb={12}>
                    <MotionHeading
                        as="h2"
                        fontSize={{ base: "3xl", md: "4xl" }}
                        fontWeight="bold"
                        color="orange.500"
                        textAlign="center"
                        variants={headingVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        採用リスト
                    </MotionHeading>
                    <MotionText
                        color={textColor}
                        textAlign="center"
                        maxW="2xl"
                        variants={headingVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        私たちと一緒に、次世代のビジネスソリューションを創造しませんか？
                    </MotionText>
                </VStack>

                <MotionGrid
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                    gap={6}
                >
                    {positions.map((position, index) => (
                        <PositionCard key={index} position={position} index={index} />
                    ))}
                </MotionGrid>
            </Container>
        </Box>
    );
} 