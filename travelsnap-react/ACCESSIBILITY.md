# Accessibility Implementation Guide

This document outlines the accessibility improvements implemented in the TravelSnap application to ensure WCAG 2.1 AA compliance and provide an inclusive user experience.

## Overview

The TravelSnap application has been enhanced with comprehensive accessibility features including:
- ARIA labels and semantic HTML
- Keyboard navigation support
- Visible focus indicators
- Skip links for screen readers
- Minimum touch target sizes
- Descriptive alt text for images
- Proper form labeling

## Implementation Details

### 1. ARIA Labels

All interactive elements have been enhanced with appropriate ARIA labels to provide context for screen reader users.

#### Navigation
- Main navigation has `role="navigation"` and `aria-label="Main navigation"`
- Mobile menu button includes `aria-expanded` and `aria-controls` attributes
- Navigation links include `aria-current="page"` for the active page
- All buttons have descriptive `aria-label` attributes

#### Cards and Interactive Elements
- Destination cards have `role="button"` with descriptive `aria-label`
- Stats cards have `role="article"` with summary `aria-label`
- All clickable cards support keyboard interaction

#### Forms
- File inputs have associated labels with `aria-labelledby`
- Form descriptions use `aria-describedby`
- Landmark selector uses `role="radiogroup"` with proper ARIA attributes

### 2. Skip Links

A skip link component has been added to allow keyboard users to bypass navigation and jump directly to main content.

**Location**: `src/components/SkipLink.jsx`

**Features**:
- Hidden until focused via keyboard (Tab key)
- High contrast styling when visible
- Smooth scroll to main content
- Positioned at the top of the page

**Usage**:
```jsx
import SkipLink from './components/SkipLink';

<SkipLink />
<Navigation />
<main id="main-content" tabIndex={-1}>
  {/* Main content */}
</main>
```

### 3. Keyboard Navigation

All interactive elements support keyboard navigation:

#### Supported Keys
- **Tab**: Navigate between interactive elements
- **Enter**: Activate buttons and links
- **Space**: Activate buttons
- **Escape**: Close modals and drawers

#### Implementation
- All clickable cards have `tabIndex={0}` and `onKeyDown` handlers
- Focus management for modals and drawers
- Logical tab order throughout the application

### 4. Focus Indicators

Visible focus indicators have been implemented globally to help keyboard users understand where they are on the page.

**Global Styles** (in `App.jsx`):
```css
*:focus-visible {
  outline: 3px solid #6366F1;
  outline-offset: 2px;
}
```

**Features**:
- High contrast outline (3px solid)
- Offset from element for visibility
- Uses `:focus-visible` to only show for keyboard navigation
- Consistent across all interactive elements

### 5. Touch Target Sizes

All interactive elements meet or exceed the WCAG 2.1 AA minimum touch target size of 44x44 pixels.

#### Button Sizes
- Small buttons: minimum 36px height (for dense UIs)
- Medium buttons: minimum 44px height
- Large buttons: minimum 52px height
- Icon buttons: 44x44px

#### Implementation
```jsx
// Button component
sx={{
  minHeight: '44px',
  minWidth: '88px', // For small buttons
}}

// Icon buttons
sx={{
  width: 44,
  height: 44,
}}
```

### 6. Alt Text for Images

All images have descriptive alt text that provides context about the image content.

#### Destination Images
```jsx
<img
  src={destination.imageUrl}
  alt={`Beautiful view of ${destination.name}`}
/>
```

#### Landmark Images
```jsx
<img
  src={landmark.imageUrl}
  alt={`${landmark.name} in ${landmark.location}`}
/>
```

#### Decorative Images
Decorative images and icons use `aria-hidden="true"` or `role="img"` with appropriate labels:
```jsx
<Box role="img" aria-label="Airplane icon">
  ✈️
</Box>
```

### 7. Semantic HTML

The application uses semantic HTML5 elements to provide structure and meaning:

- `<nav>` for navigation areas
- `<main>` for main content
- `<header>` for page headers
- `<footer>` for page footers
- `<section>` for thematic groupings
- `<article>` for self-contained content
- `<button>` for interactive actions

### 8. Form Accessibility

Forms have been enhanced with proper labeling and descriptions:

#### File Upload
```jsx
<Typography id="image-upload-label">
  Upload Your Photo
</Typography>
<input
  type="file"
  aria-labelledby="image-upload-label"
  aria-describedby="image-upload-description"
/>
<Typography id="image-upload-description">
  Accepted formats: JPG, PNG. Maximum size: 10MB
</Typography>
```

#### Landmark Selector
```jsx
<Box role="radiogroup" aria-labelledby="landmark-selector-label">
  <Typography id="landmark-selector-label">
    Select a Landmark
  </Typography>
  {/* Radio options */}
</Box>
```

## Testing

### Automated Testing

Comprehensive accessibility tests have been implemented in `src/accessibility.test.jsx`:

- ARIA label verification
- Skip link functionality
- Touch target size validation
- Alt text presence
- Keyboard navigation support
- Focus indicator implementation
- Loading state accessibility
- Semantic HTML structure
- Form accessibility

**Run tests**:
```bash
npm test accessibility.test.jsx
```

### Manual Testing Checklist

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Verify focus indicators are visible
- [ ] Test Enter/Space key activation
- [ ] Verify skip link appears on Tab
- [ ] Test Escape key for modals

#### Screen Reader Testing
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Verify all images have alt text
- [ ] Verify all buttons have labels
- [ ] Verify form inputs have labels

#### Touch Target Testing
- [ ] Test on mobile devices
- [ ] Verify all buttons are easily tappable
- [ ] Check spacing between interactive elements

#### Color Contrast
- [ ] Verify text meets 4.5:1 contrast ratio
- [ ] Check focus indicators are visible
- [ ] Test with color blindness simulators

## Browser Support

Accessibility features are supported in:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## Resources

### WCAG Guidelines
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Checklist](https://webaim.org/standards/wcag/checklist)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)

### Screen Readers
- [NVDA (Free, Windows)](https://www.nvaccess.org/)
- [VoiceOver (Built-in, macOS/iOS)](https://www.apple.com/accessibility/voiceover/)
- [JAWS (Commercial, Windows)](https://www.freedomscientific.com/products/software/jaws/)

## Future Improvements

Potential enhancements for future iterations:

1. **Reduced Motion Support**: Implement `prefers-reduced-motion` media query handling
2. **High Contrast Mode**: Add support for Windows High Contrast Mode
3. **Language Support**: Add `lang` attributes for multilingual content
4. **Live Regions**: Implement ARIA live regions for dynamic content updates
5. **Error Announcements**: Add screen reader announcements for form errors
6. **Landmark Regions**: Add more ARIA landmark roles for better navigation

## Compliance

This implementation targets WCAG 2.1 Level AA compliance, addressing:

- **Perceivable**: Alt text, color contrast, semantic structure
- **Operable**: Keyboard navigation, focus indicators, touch targets
- **Understandable**: Clear labels, consistent navigation, form instructions
- **Robust**: Semantic HTML, ARIA attributes, cross-browser support

## Contact

For accessibility concerns or suggestions, please open an issue in the project repository.
