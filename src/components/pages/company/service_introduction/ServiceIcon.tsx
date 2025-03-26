'use client';

import { Box, Image, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

interface ServiceIconProps {
    type: 'erp' | 'web' | 'network';
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ type }) => {
    const { colorMode } = useColorMode();
    const icons = {
        erp: {
            src: "/images/featureimages/sainta-sales-management.png",
            alt: "ERPソフトウェア"
        },
        web: {
            src: "/images/featureimages/analysis.png",
            alt: "ウェブデザインサービス"
        },
        network: {
            src: "/images/featureimages/user-erp.png",
            alt: "専門家ネットワーク"
        }
    };

    const icon = icons[type];

    return (
        <MotionBox
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.5,
                ease: "easeOut"
            }}
            width={{ base: "50px", md: "100px" }}
            height={{ base: "50px", md: "100px" }}
        >
            <MotionImage
                src={icon.src}
                alt={icon.alt}
                width="100%"
                height="100%"
                objectFit="contain"
                filter={colorMode === "light" ? "none" : "brightness(0) invert(1)"}
                whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, -5, 0],
                    transition: {
                        duration: 0.5,
                        rotate: {
                            duration: 0.5,
                            ease: "easeInOut",
                            repeat: 0
                        }
                    }
                }}
                _dark={{
                    filter: "brightness(0) invert(1)"
                }}
            />
        </MotionBox>
    );
};

export default ServiceIcon; 