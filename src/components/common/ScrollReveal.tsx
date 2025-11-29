"use client"

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    once?: boolean;
}

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    once = true,
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    const getInitialPosition = () => {
        switch (direction) {
            case 'up':
                return { y: 40, x: 0 };
            case 'down':
                return { y: -40, x: 0 };
            case 'left':
                return { x: 40, y: 0 };
            case 'right':
                return { x: -40, y: 0 };
            default:
                return { y: 40, x: 0 };
        }
    };

    const initial = getInitialPosition();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...initial }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
