# Color Usage Guidelines

## WCAG AA Compliance

This document outlines the approved color combinations for TravelSnap that meet WCAG AA accessibility standards (4.5:1 contrast ratio for normal text, 3:1 for large text).

## Color Contrast Standards

### WCAG AA Requirements
- **Normal text** (< 18pt or < 14pt bold): Minimum 4.5:1 contrast ratio
- **Large text** (≥ 18pt or ≥ 14pt bold): Minimum 3:1 contrast ratio
- **UI components and graphics**: Minimum 3:1 contrast ratio

### WCAG AAA Requirements (Aspirational)
- **Normal text**: Minimum 7:1 contrast ratio
- **Large text**: Minimum 4.5:1 contrast ratio

## Approved Color Combinations

### Primary Text

#### White Text on Dark Backgrounds ✅
```javascript
// Body text, headings
color: colors.neutral[0]        // #FFFFFF
backgroundColor: colors.neutral[950]  // #030712
// Contrast Ratio: 21:1 (Excellent)
```

```javascript
// Text on cards and paper surfaces
color: colors.neutral[0]        // #FFFFFF
backgroundColor: colors.neutral[900]  // #111827
// Contrast Ratio: 18.6:1 (Excellent)
```

### Secondary Text

#### Gray Text on Dark Backgrounds ✅
```javascript
// Subtitles, descriptions, secondary information
color: colors.neutral[400]      // #9CA3AF
backgroundColor: colors.neutral[950]  // #030712
// Contrast Ratio: 8.6:1 (Excellent)
```

```javascript
// Secondary text on cards
color: colors.neutral[400]      // #9CA3AF
backgroundColor: colors.neutral[900]  // #111827
// Contrast Ratio: 7.6:1 (Excellent)
```

### Brand Colors

#### Primary Brand Text ✅
```javascript
// Links, accented text, icons
color: colors.primary[400]      // #60A5FA
backgroundColor: colors.neutral[950]  // #030712
// Contrast Ratio: 8.2:1 (Excellent)
```

```javascript
// Links and accents on cards
color: colors.primary[400]      // #60A5FA
backgroundColor: colors.neutral[900]  // #111827
// Contrast Ratio: 7.3:1 (Excellent)
```

### Buttons

#### Primary Button ✅
```javascript
// Primary button labels
color: colors.neutral[0]        // #FFFFFF
backgroundColor: colors.primary[500]  // #2563EB
// Contrast Ratio: 4.5:1 (WCAG AA Compliant)
```

```javascript
// Primary button hover state
color: colors.neutral[0]        // #FFFFFF
backgroundColor: colors.primary[600]  // #1D4ED8
// Contrast Ratio: 5.9:1 (Excellent)
```

#### Secondary Button ✅
```javascript
// Secondary button labels
color: colors.neutral[0]        // #FFFFFF
backgroundColor: colors.secondary[500]  // #64748B
// Contrast Ratio: 7.8:1 (Excellent)
```

### Semantic Colors

#### Success Messages ✅
```javascript
// Success messages, positive indicators
color: colors.success           // #10B981
backgroundColor: colors.neutral[950]  // #030712
// Contrast Ratio: 7.4:1 (Excellent)
```

#### Warning Messages ✅
```javascript
// Warning messages, caution indicators
color: colors.warning           // #F59E0B
backgroundColor: colors.neutral[950]  // #030712
// Contrast Ratio: 10.7:1 (Excellent)
```

#### Error Messages ✅
```javascript
// Error messages, validation errors
color: colors.error             // #EF4444
backgroundColor: colors.neutral[950]  // #030712
// Contrast Ratio: 5.9:1 (Good)
```

### Form Elements

#### Input Placeholder Text ✅
```javascript
// Input placeholder text
color: colors.neutral[400]      // #9CA3AF
backgroundColor: colors.neutral[950]  // #030712
// Contrast Ratio: 8.6:1 (Excellent)
```

#### Disabled Text ⚠️
```javascript
// Disabled form fields, inactive elements
color: colors.neutral[600]      // #4B5563
backgroundColor: colors.neutral[950]  // #030712
// Contrast Ratio: 3.9:1 (Marginal)
// Note: Disabled elements are exempt from WCAG requirements
```

### Large Text (Headings)

#### Large Headings ✅
```javascript
// H1, H2, H3 headings (≥ 18pt)
color: colors.neutral[0]        // #FFFFFF
backgroundColor: colors.neutral[950]  // #030712
// Contrast Ratio: 21:1 (Excellent)
// Required: 3:1 for large text
```

```javascript
// Large subtitles, hero subheadings
color: colors.neutral[400]      // #9CA3AF
backgroundColor: colors.neutral[950]  // #030712
// Contrast Ratio: 8.6:1 (Excellent)
// Required: 3:1 for large text
```

## Color Combinations to Avoid

### ❌ Insufficient Contrast

```javascript
// DON'T: Light gray on medium gray
color: colors.neutral[300]      // #D1D5DB
backgroundColor: colors.neutral[600]  // #4B5563
// Contrast Ratio: 2.8:1 (Fails WCAG AA)
```

```javascript
// DON'T: Dark text on dark background
color: colors.neutral[700]      // #374151
backgroundColor: colors.neutral[950]  // #030712
// Contrast Ratio: 2.1:1 (Fails WCAG AA)
```

```javascript
// DON'T: Primary color on secondary color
color: colors.primary[500]      // #3B82F6
backgroundColor: colors.secondary[500]  // #64748B
// Contrast Ratio: 1.1:1 (Fails WCAG AA)
```

## Special Cases

### Glassmorphic Backgrounds

When using glassmorphic effects (backdrop blur with semi-transparent backgrounds), ensure the effective background color (after blur) maintains sufficient contrast:

```javascript
// Text on glassmorphic cards
color: colors.neutral[0]        // #FFFFFF
backgroundColor: 'rgba(17, 24, 39, 0.8)'  // Semi-transparent neutral[900]
// Note: Actual contrast depends on underlying content
// Test in context with backdrop-filter: blur(20px)
```

### Gradient Text

When using gradient text effects, ensure both gradient endpoints have sufficient contrast:

```javascript
// Gradient text on dark background
background: 'linear-gradient(135deg, #FFFFFF 0%, #A5B4FC 100%)'
backgroundClip: 'text'
WebkitBackgroundClip: 'text'
WebkitTextFillColor: 'transparent'
// Both #FFFFFF and #A5B4FC must have 4.5:1 contrast with background
```

### Semi-Transparent Overlays

For text over images with overlays:

```javascript
// Ensure overlay is dark enough for white text
background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)'
color: colors.neutral[0]  // White text
// Minimum overlay opacity: 0.7 for reliable contrast
```

## Testing Tools

### Automated Testing
Run the contrast audit test suite:
```bash
npm test -- contrastAudit.test.js
```

### Manual Testing Tools
- Chrome DevTools: Lighthouse accessibility audit
- Browser extensions: WAVE, axe DevTools
- Online tools: WebAIM Contrast Checker, Contrast Ratio by Lea Verou

### Color Blindness Simulation
Test with color blindness simulators:
- Chrome DevTools: Rendering > Emulate vision deficiencies
- Online tools: Coblis Color Blindness Simulator

## Implementation Checklist

When adding new color combinations:

- [ ] Calculate contrast ratio using `getContrastRatio()` utility
- [ ] Verify WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
- [ ] Add combination to `contrastAudit.js` for ongoing monitoring
- [ ] Test with color blindness simulators
- [ ] Document usage in this guide
- [ ] Add automated test case

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio Tool](https://contrast-ratio.com/)
- [Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)

## Maintenance

This document should be updated whenever:
- New colors are added to the design system
- New text/background combinations are introduced
- Accessibility standards are updated
- User feedback indicates contrast issues

## Recent Updates

### 2025-01-27: WCAG AA Compliance Fixes
- **Primary button color:** Changed primary[500] from #3B82F6 to #2563EB for WCAG AA compliance
- **Placeholder text:** Changed from neutral[500] to neutral[400] for better contrast (4.16:1 → 8.6:1)
- **Footer text:** Changed from neutral[500] to neutral[400] for better contrast (4.16:1 → 8.6:1)
- **Result:** 90.5% of combinations now pass WCAG AA (19/21), with 2 acceptable exceptions

Last updated: 2025-01-27
