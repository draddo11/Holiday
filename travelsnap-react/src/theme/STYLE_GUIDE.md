# TravelSnap Style Guide

## Introduction

This style guide documents the design system for TravelSnap, inspired by Jeton's modern, clean, and professional design aesthetic. It provides comprehensive guidelines for using colors, typography, spacing, components, and animations throughout the application.

**Design Principles:**
- Bold Typography - Large, confident headings with clear hierarchy
- Generous White Space - Breathing room between elements
- Subtle Gradients - Soft color transitions for depth
- Smooth Animations - Purposeful motion that enhances UX
- Clean Cards - Minimal borders, subtle shadows, rounded corners
- Professional Color Palette - Trust-building blues and neutrals
- Consistent Spacing - 8px base unit system
- Premium Feel - High-quality imagery and polished details

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing System](#spacing-system)
4. [Component Variants](#component-variants)
5. [Animation Guidelines](#animation-guidelines)
6. [Accessibility](#accessibility)
7. [Best Practices](#best-practices)

---

## Color Palette

### Primary Colors - Trust & Professionalism

Our primary color palette uses deep blues that convey trust and professionalism.

```javascript
primary: {
  50: '#EFF6FF',   // Lightest - backgrounds
  100: '#DBEAFE',  // Very light - hover states
  200: '#BFDBFE',  // Light - borders
  300: '#93C5FD',  // Medium light - disabled states
  400: '#60A5FA',  // Medium - interactive elements
  500: '#2563EB',  // Main brand color ⭐
  600: '#1D4ED8',  // Dark - hover states
  700: '#1E40AF',  // Darker - active states
  800: '#1E3A8A',  // Very dark - text
  900: '#1E3A8A',  // Darkest - emphasis
}
```

**Usage Guidelines:**
- **primary[500]**: Main brand color for buttons, links, and key UI elements
- **primary[400]**: Hover states and interactive feedback
- **primary[600]**: Active/pressed states
- **primary[100-300]**: Backgrounds and subtle accents
- **primary[700-900]**: Text on light backgrounds

**Contrast Compliance:**
- ✅ primary[500] on white: 4.5:1 (WCAG AA)
- ✅ white on primary[500]: 4.5:1 (WCAG AA)

**Code Example:**
```jsx
import { useTheme } from '@mui/material';

const theme = useTheme();
<Button sx={{ backgroundColor: theme.palette.primary.main }}>
  Primary Action
</Button>
```

### Secondary Colors - Modern & Clean

Secondary colors use slate tones for a modern, clean aesthetic.

```javascript
secondary: {
  50: '#F8FAFC',   // Lightest
  100: '#F1F5F9',  // Very light
  200: '#E2E8F0',  // Light
  300: '#CBD5E1',  // Medium light
  400: '#94A3B8',  // Medium
  500: '#64748B',  // Main secondary color
  600: '#475569',  // Dark
  700: '#334155',  // Darker
  800: '#1E293B',  // Very dark
  900: '#0F172A',  // Darkest
}
```

**Usage Guidelines:**
- Use for secondary actions, borders, and dividers
- Excellent for text hierarchy (400-600 for secondary text)
- Background variations for cards and containers

**Code Example:**
```jsx
<Typography sx={{ color: theme.palette.secondary[400] }}>
  Secondary text content
</Typography>
```

### Neutral Colors - True Grays

Clean, true gray scale for text, backgrounds, and UI elements.

```javascript
neutral: {
  0: '#FFFFFF',    // Pure white
  50: '#F9FAFB',   // Off-white
  100: '#F3F4F6',  // Very light gray
  200: '#E5E7EB',  // Light gray
  300: '#D1D5DB',  // Medium light gray
  400: '#9CA3AF',  // Medium gray ⭐ (secondary text)
  500: '#6B7280',  // Gray
  600: '#4B5563',  // Dark gray
  700: '#374151',  // Darker gray
  800: '#1F2937',  // Very dark gray
  900: '#111827',  // Almost black
  950: '#030712',  // Pure black (backgrounds)
}
```

**Usage Guidelines:**
- **neutral[0]**: Primary text on dark backgrounds
- **neutral[400]**: Secondary text (WCAG AA compliant on dark backgrounds)
- **neutral[950]**: Main background color
- **neutral[900]**: Card and container backgrounds
- **neutral[100-300]**: Borders and dividers

**Code Example:**
```jsx
<Box sx={{ 
  backgroundColor: theme.palette.neutral[950],
  color: theme.palette.neutral[0]
}}>
  Content
</Box>
```

### Semantic Colors

Colors for specific UI states and feedback.

```javascript
success: '#10B981',  // Green - success states
warning: '#F59E0B',  // Amber - warning states
error: '#EF4444',    // Red - error states
info: '#3B82F6',     // Blue - informational states
```

**Usage Guidelines:**
- Use sparingly and only for their intended purpose
- Always pair with text or icons for accessibility
- Ensure sufficient contrast with backgrounds

### Gradients

Subtle gradients for premium feel.

```javascript
gradients: {
  primary: '#2563EB',      // Solid primary (WCAG compliant)
  secondary: '#64748B',    // Solid secondary
  hero: 'linear-gradient(180deg, #030712 0%, #111827 50%, #1F2937 100%)',
  heroOverlay: 'radial-gradient(ellipse at top, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
  card: 'rgba(255, 255, 255, 0.05)',
  glass: 'rgba(255, 255, 255, 0.05)',
}
```

**Usage Guidelines:**
- Use `hero` gradient for hero sections and large backgrounds
- Use `card` and `glass` for glassmorphism effects
- Keep gradients subtle to maintain professionalism

---

## Typography

### Font Families

```javascript
fontFamily: {
  primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  display: '"Cal Sans", "Inter", sans-serif',  // For hero headings
  mono: '"JetBrains Mono", "Fira Code", monospace',
}
```

**Usage Guidelines:**
- **primary**: Use for all body text, UI elements, and most headings
- **display**: Use only for large hero headings (h1, h2)
- **mono**: Use for code snippets and technical content

### Font Sizes

Based on a modular scale for visual harmony.

```javascript
fontSize: {
  xs: '0.75rem',      // 12px - captions, labels
  sm: '0.875rem',     // 14px - small text
  base: '1rem',       // 16px - body text ⭐
  lg: '1.125rem',     // 18px - large body
  xl: '1.25rem',      // 20px - h6
  '2xl': '1.5rem',    // 24px - h5
  '3xl': '1.875rem',  // 30px - h4
  '4xl': '2.25rem',   // 36px - h3
  '5xl': '3rem',      // 48px - h2
  '6xl': '3.75rem',   // 60px - h1
  '7xl': '4.5rem',    // 72px - hero
}
```

**Usage Guidelines:**
- Use `base` (16px) for all body text
- Scale up for headings using the defined scale
- Never go below `xs` (12px) for readability

**Code Example:**
```jsx
<Typography variant="h1">Hero Heading</Typography>
<Typography variant="body1">Body text</Typography>
<Typography variant="caption">Caption text</Typography>
```

### Font Weights

```javascript
fontWeight: {
  normal: 400,     // Body text
  medium: 500,     // Emphasis
  semibold: 600,   // Subheadings, buttons
  bold: 700,       // Headings
  extrabold: 800,  // Hero headings
}
```

**Usage Guidelines:**
- **400**: Default for body text
- **600**: Buttons and interactive elements
- **700-800**: Headings and emphasis

### Line Heights

```javascript
lineHeight: {
  tight: 1.25,    // Headings
  normal: 1.5,    // Body text ⭐
  relaxed: 1.75,  // Long-form content
}
```

**Usage Guidelines:**
- Use `tight` for headings to maintain visual impact
- Use `normal` for most body text
- Use `relaxed` for long-form reading content

### Letter Spacing

```javascript
letterSpacing: {
  tight: '-0.02em',  // Large headings
  normal: '0',       // Body text ⭐
  wide: '0.02em',    // Uppercase text, labels
}
```

**Usage Guidelines:**
- Use `tight` for large display headings
- Use `wide` for uppercase labels and overline text

### Typography Variants

MUI provides pre-configured typography variants:

| Variant | Size | Weight | Use Case |
|---------|------|--------|----------|
| h1 | 60px | 800 | Hero headings |
| h2 | 48px | 800 | Section headings |
| h3 | 36px | 700 | Subsection headings |
| h4 | 30px | 700 | Card headings |
| h5 | 24px | 600 | Small headings |
| h6 | 20px | 600 | Smallest headings |
| subtitle1 | 18px | 500 | Subheadings |
| subtitle2 | 16px | 500 | Small subheadings |
| body1 | 16px | 400 | Primary body text |
| body2 | 14px | 400 | Secondary body text |
| button | 16px | 600 | Button text |
| caption | 12px | 400 | Captions, labels |
| overline | 12px | 600 | Uppercase labels |

---

## Spacing System

### Base Unit: 8px

All spacing follows an 8px base unit for consistency and visual rhythm.

```javascript
spacing: {
  0: '0',          // 0px
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px ⭐ base unit
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
}
```

### Usage Guidelines

**Component Padding:**
- Small components: `spacing[3]` (12px)
- Medium components: `spacing[4]` (16px)
- Large components: `spacing[6]` (24px)
- Cards: `spacing[6]` (24px)

**Margins Between Elements:**
- Tight spacing: `spacing[2]` (8px)
- Normal spacing: `spacing[4]` (16px)
- Loose spacing: `spacing[6]` (24px)
- Section spacing: `spacing[12]` (48px)

**Code Example:**
```jsx
<Box sx={{ 
  p: 4,      // padding: 32px
  mb: 6,     // margin-bottom: 48px
  gap: 3,    // gap: 24px
}}>
  Content
</Box>
```

### Responsive Spacing

Adjust spacing for different screen sizes:

```jsx
<Box sx={{ 
  p: { xs: 3, md: 6 },  // 12px mobile, 24px desktop
  mb: { xs: 4, md: 8 }, // 16px mobile, 32px desktop
}}>
  Content
</Box>
```

### Vertical Rhythm

Maintain consistent vertical spacing between sections:

- Between small elements: 16px (spacing[4])
- Between components: 24px (spacing[6])
- Between sections: 48px (spacing[12])
- Between major sections: 96px (spacing[24])

---

## Component Variants

### Buttons

#### Primary Button
For main actions and CTAs.

```jsx
<Button variant="contained" color="primary">
  Primary Action
</Button>
```

**Styling:**
- Background: Solid primary color
- Text: White
- Hover: Subtle glow, translateY(-2px)
- Border radius: 12px

#### Secondary Button
For secondary actions.

```jsx
<Button variant="outlined" color="primary">
  Secondary Action
</Button>
```

**Styling:**
- Background: Transparent
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Text: White
- Hover: Border color changes to primary, subtle background

#### Ghost Button
For tertiary actions.

```jsx
<Button variant="text" color="primary">
  Tertiary Action
</Button>
```

**Styling:**
- Background: Transparent
- No border
- Text: Primary color
- Hover: Subtle background

#### Button Sizes

```jsx
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>  {/* Default */}
<Button size="large">Large</Button>
```

### Cards

#### Standard Card
For general content containers.

```jsx
<Card>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

**Styling:**
- Background: Glassmorphism effect
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border radius: 24px
- Padding: 24px

#### Premium Destination Card
For destination showcases.

```jsx
<PremiumDestinationCard 
  destination={destinationData}
/>
```

**Features:**
- Image with hover scale
- Gradient overlay
- Badge support
- Feature chips
- Smooth hover animation

#### Modern Stats Card
For data visualization.

```jsx
<ModernStatsCard 
  icon={<WbSunny />}
  label="Weather"
  value="23°C"
  description="Clear and pleasant"
/>
```

**Features:**
- Gradient background
- Icon with glow effect
- Large numerical display
- Additional info section

### Navigation

#### Modern Navigation
Sticky navigation with backdrop blur.

```jsx
<ModernNavigation />
```

**Features:**
- Sticky positioning
- Backdrop blur effect
- Gradient logo
- Underline hover animations
- Mobile hamburger menu

#### Modern Footer
Comprehensive footer with links and social media.

```jsx
<ModernFooter />
```

**Features:**
- Multi-column layout
- Social media icons
- Link sections
- Copyright information
- Responsive stacking

### Forms

#### Text Field
Custom styled input fields.

```jsx
<TextField 
  fullWidth
  placeholder="Enter text..."
  InputProps={{
    startAdornment: <Search />
  }}
/>
```

**Styling:**
- Background: rgba(255, 255, 255, 0.05)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border radius: 16px
- Focus: 2px primary border

### Loading States

#### Skeleton Loader
For loading states.

```jsx
<SkeletonCard variant="destination" />
```

**Features:**
- Shimmer animation
- Glassmorphism background
- Multiple variants

#### Loading Spinner
For async operations.

```jsx
<LoadingSpinner />
```

### Utility Components

#### Lazy Image
Optimized image loading.

```jsx
<LazyImage 
  src={imageUrl}
  alt="Description"
/>
```

#### Page Transition
Smooth page transitions.

```jsx
<PageTransition>
  <YourPage />
</PageTransition>
```

#### Skip Link
Accessibility navigation.

```jsx
<SkipLink />
```

---

## Animation Guidelines

### Principles

1. **Purposeful**: Every animation should have a clear purpose
2. **Subtle**: Animations should enhance, not distract
3. **Fast**: Keep animations under 500ms
4. **Smooth**: Use easing functions for natural motion
5. **Respectful**: Honor prefers-reduced-motion

### Timing

```javascript
duration: {
  fast: '150ms',    // Micro-interactions
  base: '250ms',    // Standard transitions
  slow: '350ms',    // Complex animations
  slower: '500ms',  // Page transitions
}
```

### Easing Functions

```javascript
timing: {
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',        // Standard
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',        // Accelerating
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',       // Decelerating
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',   // Smooth
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy
}
```

### Common Animations

#### Hover Effects

```jsx
<Box sx={{
  transition: 'all 0.25s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows.lg,
  }
}}>
  Hover me
</Box>
```

#### Fade In

```jsx
<Box sx={{
  animation: 'fadeIn 0.5s ease',
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  }
}}>
  Content
</Box>
```

#### Scale on Press

```jsx
<Button sx={{
  transition: 'transform 0.15s ease',
  '&:active': {
    transform: 'scale(0.95)',
  }
}}>
  Press me
</Button>
```

#### Shimmer Effect

```jsx
<Box sx={{
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
    animation: 'shimmer 2s infinite',
  },
  '@keyframes shimmer': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  }
}}>
  Loading...
</Box>
```

### Performance Tips

1. **Use CSS transforms**: Prefer `transform` and `opacity` for animations
2. **Avoid layout shifts**: Don't animate `width`, `height`, `top`, `left`
3. **Use will-change**: For complex animations, add `will-change: transform`
4. **Limit simultaneous animations**: Don't animate too many elements at once

### Reduced Motion

Always respect user preferences:

```jsx
import { useReducedMotion } from '../hooks/useReducedMotion';

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <Box sx={{
      transition: prefersReducedMotion ? 'none' : 'all 0.3s ease',
    }}>
      Content
    </Box>
  );
}
```

---

## Accessibility

### Color Contrast

All text must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

**Compliant Combinations:**
- ✅ White text on primary[500]: 4.5:1
- ✅ neutral[400] text on neutral[950]: 4.5:1
- ✅ Primary[500] on white: 4.5:1

**Testing:**
Use the contrast audit tool:
```bash
npm run audit:contrast
```

### Keyboard Navigation

All interactive elements must be keyboard accessible:

```jsx
<Button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Accessible Button
</Button>
```

### Focus Indicators

Always show visible focus indicators:

```jsx
<Box sx={{
  '&:focus': {
    outline: '2px solid',
    outlineColor: theme.palette.primary.main,
    outlineOffset: '2px',
  }
}}>
  Focusable element
</Box>
```

### ARIA Labels

Provide descriptive labels for screen readers:

```jsx
<IconButton aria-label="Close dialog">
  <Close />
</IconButton>

<img src={url} alt="Descriptive text" />
```

### Touch Targets

Minimum touch target size: 44x44px

```jsx
<IconButton sx={{ 
  minWidth: 44, 
  minHeight: 44 
}}>
  <Icon />
</IconButton>
```

### Skip Links

Provide skip navigation for keyboard users:

```jsx
<SkipLink />  // Already implemented
```

---

## Best Practices

### Do's ✅

1. **Use design tokens**: Always use theme values, never hardcode
2. **Follow spacing scale**: Stick to the 8px base unit
3. **Maintain hierarchy**: Use typography variants consistently
4. **Test accessibility**: Run contrast audits and keyboard tests
5. **Optimize images**: Use WebP with fallbacks, lazy load
6. **Respect motion preferences**: Honor prefers-reduced-motion
7. **Use semantic HTML**: Choose appropriate HTML elements
8. **Test responsively**: Check all breakpoints

### Don'ts ❌

1. **Don't hardcode colors**: Use theme.palette instead
2. **Don't use arbitrary spacing**: Stick to the spacing scale
3. **Don't skip focus indicators**: Always show keyboard focus
4. **Don't animate layout properties**: Use transforms instead
5. **Don't ignore contrast**: Ensure WCAG compliance
6. **Don't use tiny text**: Minimum 12px font size
7. **Don't create tiny touch targets**: Minimum 44x44px
8. **Don't forget alt text**: All images need descriptions

### Code Organization

```
src/
├── components/
│   ├── Button.jsx
│   ├── Button.test.jsx
│   └── Button.usage.md
├── theme/
│   ├── tokens.js
│   ├── theme.js
│   └── STYLE_GUIDE.md
└── pages/
    └── HomePage.jsx
```

### Naming Conventions

- **Components**: PascalCase (e.g., `PremiumDestinationCard`)
- **Files**: PascalCase for components (e.g., `Button.jsx`)
- **Props**: camelCase (e.g., `backgroundColor`)
- **CSS classes**: kebab-case (e.g., `card-image`)

### Performance Checklist

- [ ] Images optimized and lazy loaded
- [ ] Code split by route
- [ ] Animations use transforms
- [ ] Bundle size monitored
- [ ] Core Web Vitals passing

### Accessibility Checklist

- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Touch targets 44x44px minimum
- [ ] Reduced motion respected
- [ ] Screen reader tested

---

## Resources

- [MUI Documentation](https://mui.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Design Tokens](./tokens.js)
- [Theme Configuration](./theme.js)

---

**Last Updated**: 2025
**Version**: 1.0.0
