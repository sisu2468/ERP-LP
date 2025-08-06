# SVG Animations Implementation Guide

This document explains how to use the SVG animation system implemented for the Sainta ERP landing page.

## Overview

The SVG animation system consists of three main components:

1. **LoadingAnimation** - Full-screen loading animation with SVG
2. **LoadingManager** - Manages image preloading and loading timing
3. **SVGAnimation** - Reusable component for animated SVGs in content sections

## Components

### 1. LoadingAnimation (`src/components/common/LoadingAnimation.tsx`)

Displays a full-screen loading animation using the main SVG file.

**Props:**
- `onLoadingComplete?: () => void` - Callback when loading finishes
- `duration?: number` - Loading duration in milliseconds (default: 3500)

**Usage:**
```tsx
<LoadingAnimation 
  onLoadingComplete={() => console.log('Loading complete!')}
  duration={3000}
/>
```

### 2. LoadingManager (`src/components/common/LoadingManager.tsx`)

Manages the overall loading experience, including image preloading.

**Props:**
- `children: React.ReactNode` - Content to display after loading
- `imageUrls?: string[]` - Array of image URLs to preload
- `minLoadingTime?: number` - Minimum loading time in milliseconds (default: 2000)

**Usage:**
```tsx
<LoadingManager 
  imageUrls={['/hero/woman_half.png', '/other-image.jpg']}
  minLoadingTime={3000}
>
  <YourAppContent />
</LoadingManager>
```

### 3. SVGAnimation (`src/components/common/SVGAnimation.tsx`)

Reusable component for displaying animated SVGs in content sections.

**Props:**
- `svgPath: string` - Path to the SVG file
- `alt?: string` - Alt text for accessibility
- `width?: string | number` - Width of the SVG container
- `height?: string | number` - Height of the SVG container
- `animationType?: 'fadeIn' | 'slideIn' | 'scaleIn' | 'draw'` - Animation type
- `duration?: number` - Animation duration in milliseconds
- `delay?: number` - Animation delay in milliseconds
- `trigger?: 'onMount' | 'onScroll' | 'onHover'` - When to trigger animation

**Usage:**
```tsx
<SVGAnimation
  svgPath="/svg/my-animation.svg"
  alt="My animated icon"
  animationType="scaleIn"
  duration={1200}
  delay={200}
  trigger="onScroll"
/>
```

## Feature Cards with SVG

### FeatureCardWithSVG (`src/components/pages/home/FeatureCardWithSVG.tsx`)

A complete feature card component that includes SVG animations.

**Props:**
- `title: string` - Feature title
- `description: string` - Feature description
- `svgPath?: string` - Path to SVG animation
- `svgAlt?: string` - Alt text for SVG
- `features: string[]` - List of feature points
- `animationDelay?: number` - Delay for staggered animations
- `icon?: React.ElementType` - Icon component

**Usage:**
```tsx
<FeatureCardWithSVG
  title="会計・請求管理"
  description="AIを活用した自動化で経理作業を大幅に効率化"
  svgPath="/svg/accounting-animation.svg"
  svgAlt="会計管理アニメーション"
  features={[
    '請求書の自動生成と管理',
    '経費の自動トラッキング',
    '帳簿の自動記帳'
  ]}
  animationDelay={0}
  icon={FaFileInvoiceDollar}
/>
```

## SVG File Structure

Place your SVG animation files in the `public/svg/` directory:

```
public/
├── sainta.svg              # Main loading animation
└── svg/
    ├── accounting-animation.svg
    ├── finance-animation.svg
    ├── matching-animation.svg
    └── your-custom-animation.svg
```

## Creating Custom SVG Animations

### Basic SVG Animation Structure

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <!-- Define gradients, filters, etc. -->
  </defs>
  
  <!-- Animated elements -->
  <circle cx="100" cy="100" r="20" fill="#3182ce">
    <animate attributeName="r" values="20;25;20" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>
```

### Animation Techniques

1. **Opacity Animation:**
```svg
<animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
```

2. **Scale Animation:**
```svg
<animateTransform attributeName="transform" type="scale" values="1;1.2;1" dur="2s" repeatCount="indefinite"/>
```

3. **Path Drawing:**
```svg
<path d="M10 10 L100 100" stroke="#000" stroke-width="2">
  <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s"/>
</path>
```

4. **Color Transitions:**
```svg
<animate attributeName="fill" values="#3182ce;#38a169;#3182ce" dur="3s" repeatCount="indefinite"/>
```

## Integration Examples

### 1. Adding to Existing Sections

Replace the existing `ServiceIntroSection` with `ServiceIntroSectionWithSVG`:

```tsx
// In HomePage.tsx
import ServiceIntroSectionWithSVG from './ServiceIntroSectionWithSVG';

// Replace
<ServiceIntroSection />

// With
<ServiceIntroSectionWithSVG />
```

### 2. Adding New Sections

Create new sections using the SVG animation components:

```tsx
import FeatureCardWithSVG from './FeatureCardWithSVG';

const newFeatures = [
  {
    title: "新機能",
    description: "説明文",
    svgPath: "/svg/new-feature.svg",
    features: ["機能1", "機能2", "機能3"]
  }
];

// In your component
<SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
  {newFeatures.map((feature, index) => (
    <FeatureCardWithSVG
      key={feature.title}
      {...feature}
      animationDelay={index * 200}
    />
  ))}
</SimpleGrid>
```

## Best Practices

1. **Performance:** Keep SVG files under 50KB for optimal loading
2. **Accessibility:** Always include alt text for SVGs
3. **Responsive:** Use viewBox and percentage-based dimensions
4. **Animation Timing:** Use staggered delays for multiple elements
5. **Color Mode:** Consider dark/light mode compatibility

## Customization

### Changing Loading Animation

Replace the `sainta.svg` file in the `public/` directory with your custom loading animation.

### Modifying Animation Styles

Edit the `SVGAnimation` component to add new animation types or modify existing ones.

### Adding New Triggers

Extend the `trigger` prop in `SVGAnimation` to support new trigger types like `onClick` or `onFocus`.

## Troubleshooting

### SVG Not Loading
- Check file path is correct
- Ensure SVG file is in the `public/` directory
- Verify SVG syntax is valid

### Animation Not Playing
- Check if `trigger` prop is set correctly
- Verify `duration` and `delay` values
- Ensure SVG has proper animation elements

### Performance Issues
- Optimize SVG file size
- Reduce number of animated elements
- Use `will-change` CSS property for complex animations 