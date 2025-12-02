# Spacing System Guide

## Overview

The TravelSnap application uses a consistent 8px base unit spacing system to maintain visual rhythm and consistency across all components and pages.

## Base Unit System

All spacing values are multiples of 8px:

```javascript
spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
}
```

## Responsive Spacing

### Automatic Scaling

The spacing system automatically scales down on smaller devices to maintain proportions:

- **Mobile (xs)**: 75% of base value
- **Tablet (sm)**: 87.5% of base value
- **Desktop (md+)**: 100% of base value

### Usage Examples

```jsx
import { spacing } from '../theme/tokens';
import { getResponsiveSpacing, getSectionSpacing } from '../theme/spacingUtils';

// Direct token usage
<Box sx={{ p: spacing[4] }}>  // 16px padding

// Responsive spacing
<Box sx={{ p: getResponsiveSpacing(6) }}>
// Results in: { xs: '18px', sm: '21px', md: '24px' }

// Section spacing (for major page sections)
<Box sx={{ py: getSectionSpacing('large') }}>
// Results in: { xs: '64px', sm: '80px', md: '96px' }
```

## Spacing Utilities

### getResponsiveSpacing(value, options)

Converts a spacing value to responsive breakpoints.

```jsx
// Basic usage
getResponsiveSpacing(6)
// Returns: { xs: '18px', sm: '21px', md: '24px' }

// Custom scaling
getResponsiveSpacing(8, { mobileScale: 0.5, tabletScale: 0.75 })
// Returns: { xs: '16px', sm: '24px', md: '32px' }
```

### getSectionSpacing(size)

Predefined spacing for major page sections.

```jsx
getSectionSpacing('small')   // { xs: '32px', sm: '40px', md: '48px' }
getSectionSpacing('medium')  // { xs: '48px', sm: '64px', md: '80px' }
getSectionSpacing('large')   // { xs: '64px', sm: '80px', md: '96px' }
```

### getCardPadding(size)

Consistent padding for card components.

```jsx
getCardPadding('small')   // { xs: '12px', sm: '16px', md: '16px' }
getCardPadding('medium')  // { xs: '16px', sm: '20px', md: '24px' }
getCardPadding('large')   // { xs: '20px', sm: '24px', md: '32px' }
```

### getGridGap(size)

Consistent gap spacing for grids.

```jsx
getGridGap('small')   // { xs: '8px', sm: '12px', md: '16px' }
getGridGap('medium')  // { xs: '12px', sm: '16px', md: '24px' }
getGridGap('large')   // { xs: '16px', sm: '24px', md: '32px' }
```

## Component-Specific Guidelines

### Page Containers

```jsx
<Box sx={{
  pt: getSectionSpacing('large'),    // Top padding
  pb: getSectionSpacing('medium'),   // Bottom padding
}}>
```

### Cards

```jsx
<Card sx={{
  ...getCardPadding('medium'),  // Responsive padding
  mb: spacing[4],               // Bottom margin
}}>
```

### Grids

```jsx
<Box sx={{
  display: 'grid',
  gap: getGridGap('medium'),  // Responsive gap
}}>
```

### Buttons

```jsx
<Button sx={{
  px: spacing[6],  // Horizontal padding: 24px
  py: spacing[2],  // Vertical padding: 8px
}}>
```

### Typography

```jsx
<Typography sx={{
  mb: spacing[3],  // Margin bottom: 12px
}}>
```

## Vertical Rhythm

Maintain consistent vertical spacing between sections:

1. **Hero sections**: Use `getSectionSpacing('large')`
2. **Content sections**: Use `getSectionSpacing('medium')`
3. **Sub-sections**: Use `spacing[8]` or `spacing[10]`
4. **Related elements**: Use `spacing[3]` to `spacing[6]`
5. **Tight groupings**: Use `spacing[1]` or `spacing[2]`

## Best Practices

### ✅ DO

- Use spacing tokens from `tokens.js`
- Use responsive spacing utilities for major layout elements
- Maintain consistent spacing within component types
- Use multiples of 8px for custom spacing values

```jsx
// Good
<Box sx={{ p: spacing[4], mb: spacing[6] }}>

// Good - responsive
<Box sx={{ py: getSectionSpacing('medium') }}>
```

### ❌ DON'T

- Use arbitrary pixel values
- Mix spacing systems
- Use non-8px-multiple values

```jsx
// Bad
<Box sx={{ p: '17px', mb: '23px' }}>

// Bad
<Box sx={{ padding: 2.5 }}>  // MUI spacing units without tokens
```

## Migration Guide

When updating existing components:

1. **Identify hardcoded spacing values**
   ```jsx
   // Before
   <Box sx={{ p: 3, mb: 4 }}>
   ```

2. **Replace with spacing tokens**
   ```jsx
   // After
   import { spacing } from '../theme/tokens';
   <Box sx={{ p: spacing[3], mb: spacing[4] }}>
   ```

3. **Add responsive spacing for major sections**
   ```jsx
   // After (for page sections)
   import { getSectionSpacing } from '../theme/spacingUtils';
   <Box sx={{ py: getSectionSpacing('large') }}>
   ```

## Validation

Use the `isValidSpacing` utility to check if a value follows the 8px system:

```javascript
import { isValidSpacing } from '../theme/spacingUtils';

isValidSpacing('1rem');    // true (16px)
isValidSpacing('1.5rem');  // true (24px)
isValidSpacing('1.3rem');  // false (20.8px - not multiple of 8)
```

## Requirements Coverage

This spacing system addresses the following requirements:

- **9.1**: Consistent spacing scale (8px base unit) ✓
- **9.2**: Consistent padding and margins ✓
- **9.3**: Responsive spacing (smaller on mobile) ✓
- **9.4**: Consistent gap spacing in grids ✓
- **9.5**: Vertical rhythm across sections ✓
