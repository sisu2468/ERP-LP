'use client';

import { Box, useColorMode } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

interface SVGAnimationProps {
  svgPath: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  animationType?: 'fadeIn' | 'slideIn' | 'scaleIn' | 'draw';
  duration?: number;
  delay?: number;
  trigger?: 'onMount' | 'onScroll' | 'onHover';
  className?: string;
  style?: React.CSSProperties;
}

export default function SVGAnimation({
  svgPath,
  alt = '',
  width = '100%',
  height = 'auto',
  animationType = 'fadeIn',
  duration = 1000,
  delay = 0,
  trigger = 'onMount',
  className,
  style
}: SVGAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (trigger === 'onMount') {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay]);

  useEffect(() => {
    if (trigger === 'onScroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `all ${duration}ms ease-out`,
      transitionDelay: `${delay}ms`,
    };

    switch (animationType) {
      case 'fadeIn':
        return {
          ...baseStyles,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        };
      case 'slideIn':
        return {
          ...baseStyles,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
        };
      case 'scaleIn':
        return {
          ...baseStyles,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        };
      case 'draw':
        return {
          ...baseStyles,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        };
      default:
        return baseStyles;
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'onHover') {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'onHover') {
      setIsHovered(false);
    }
  };

  const shouldAnimate = trigger === 'onHover' ? isHovered : isVisible;

  return (
    <Box
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={style}
    >
      <Box
        width={width}
        height={height}
        style={getAnimationStyles()}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          as="object"
          data={svgPath}
          type="image/svg+xml"
          width="100%"
          height="100%"
          aria-label={alt}
          sx={{
            '& svg': {
              width: '100%',
              height: '100%',
              filter: colorMode === 'dark' ? 'invert(1)' : 'none',
              transition: 'filter 0.3s ease-in-out'
            }
          }}
        />
      </Box>
    </Box>
  );
} 