import { BoxProps } from "@chakra-ui/react";

export interface MVVCardProps extends BoxProps {
    title: string;
    titleEn: string;
    subtitle?: string;
    subtitleEn?: string;
    description?: string;
    setHeight?: boolean;
    children?: React.ReactNode;
}