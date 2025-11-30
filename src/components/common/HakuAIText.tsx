"use client"

import { Text, TextProps } from '@chakra-ui/react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HakuAITextProps extends Omit<TextProps, 'children'> {
    suffix?: string;
}

/**
 * Renders "白AI" with furigana for Japanese, or "Haku AI" / "하쿠 AI" for other languages
 */
export default function HakuAIText({ suffix = '', ...props }: HakuAITextProps) {
    const { language } = useLanguage();

    if (language === 'ja') {
        return (
            <Text as="span" {...props}>
                <ruby style={{ rubyPosition: 'over' }}>
                    白<rp>(</rp><rt style={{ fontSize: '0.5em', fontWeight: 500 }}>はく</rt><rp>)</rp>
                </ruby>
                AI{suffix}
            </Text>
        );
    }

    if (language === 'ko') {
        return (
            <Text as="span" {...props}>
                하쿠 AI{suffix}
            </Text>
        );
    }

    // English
    return (
        <Text as="span" {...props}>
            Haku AI{suffix}
        </Text>
    );
}
