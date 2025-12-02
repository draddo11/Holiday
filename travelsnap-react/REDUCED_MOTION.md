# Reduced Motion Support

This document describes the implementation of reduced motion support in TravelSnap, ensuring accessibility for users who prefer reduced animations.

## Overview

The application respects the `prefers-reduced-motion` CSS media query and provides a React hook for detecting user preferences. When a user has reduced motion enabled in their system settings, animations are either disabled or significantly reduced throughout the application.

## Implementation

### 1. React Hook: `usePrefersReducedMotion`

Located in `src/hooks/useScrollAnimation.js`, this hook detects the user's motion preference:

```javascript
import { usePrefersReducedMotion } from '../hooks/useScrollAnimation';

function MyComponent() {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  return (
    <div style={{
      transition: prefersReducedMotion ? 'none' : 'all 0.3s ease'
    }}>
      Content
    </div>
  );
}
```

**Features:**
- Detects initial preference on mount
- Listens for changes to user preferences
- Automatically cleans up event listeners
- Returns boolean: `true` if reduced motion is preferred

### 2. CSS Media Queries

All CSS files include `@media (prefers-reduced-motion: reduce)` rules:

**Example from `HomePage.css`:**
```css
.hero-title {
  animation: fadeInUp 0.8s ease;
}

@media (prefers-reduced-motion: reduce) {
  .hero-title {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

**Files Updated:**
- `src/pages/HomePage.css` - Hero section animations
- `src/pages/AIPhotoPage.css` - Loading spinner (slowed down)
- `src/components/DestinationCard.css` - Card hover animations

### 3. Component Integration

All interactive components respect reduced motion preferences:

#### Button Component
- Disables ripple effect when reduced motion is preferred
- Removes scale and transform animations on hover/active states
- Maintains full functionality without animations

#### PremiumDestinationCard
- Disables card lift animation on hover
- Removes image scale effect
- Disables overlay opacity transitions

#### ModernStatsCard
- Removes card lift and scale animations
- Disables icon rotation and scale effects
- Maintains visual hierarchy without motion

#### ModernNavigation
- Disables logo rotation animation
- Removes navigation underline animations
- Disables button transform effects
- Reduces drawer transition duration to 0

#### ModernFooter
- Disables link color transitions
- Removes icon hover animations
- Disables logo rotation effect

### 4. Scroll Animations

The scroll animation hooks automatically respect reduced motion:

**`useFadeIn`:**
- Shows elements immediately when reduced motion is preferred
- Skips IntersectionObserver setup
- No fade-in animation

**`useStaggeredAnimation`:**
- Shows all elements immediately
- No stagger delay
- Skips IntersectionObserver setup

**`useSlideUp`:**
- Sets `transition: 'none'` in returned style object
- Elements appear without slide animation

## Testing

### Manual Testing

To test reduced motion support:

**macOS:**
1. Open System Settings
2. Go to Accessibility → Display
3. Enable "Reduce motion"
4. Reload the application

**Windows:**
1. Open Settings
2. Go to Accessibility → Visual effects
3. Turn off "Animation effects"
4. Reload the application

**Browser DevTools:**
1. Open Chrome DevTools
2. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
3. Type "Emulate CSS prefers-reduced-motion"
4. Select "Emulate CSS prefers-reduced-motion: reduce"

### Automated Testing

Run the reduced motion tests:

```bash
npm test reducedMotion.integration.test.js
```

Tests verify:
- Hook correctly detects user preferences
- Event listeners are properly set up and cleaned up
- Preference changes are detected dynamically

## Accessibility Compliance

This implementation ensures compliance with:

- **WCAG 2.1 Success Criterion 2.3.3** (Level AAA): Animation from Interactions
- **WCAG 2.2 Success Criterion 2.3.3** (Level AAA): Motion Actuation

## Functionality Without Animations

All features work identically with or without animations:

✅ Navigation and routing
✅ Button clicks and interactions
✅ Form submissions
✅ Content loading and display
✅ Search and filtering
✅ Card interactions
✅ Modal and drawer functionality

The only difference is the visual presentation - functionality remains unchanged.

## Browser Support

The `prefers-reduced-motion` media query is supported in:

- Chrome 74+
- Firefox 63+
- Safari 10.1+
- Edge 79+
- iOS Safari 10.3+
- Chrome for Android 74+

For unsupported browsers, animations will display normally (graceful degradation).

## Best Practices

When adding new animations:

1. **Always check the hook:**
   ```javascript
   const prefersReducedMotion = usePrefersReducedMotion();
   ```

2. **Conditionally apply transitions:**
   ```javascript
   transition: prefersReducedMotion ? 'none' : 'all 0.3s ease'
   ```

3. **Add CSS media queries:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     .animated-element {
       animation: none;
       transition: none;
     }
   }
   ```

4. **Test both modes:**
   - Test with reduced motion enabled
   - Verify functionality works without animations
   - Ensure no layout shifts occur

## Performance Benefits

Disabling animations when not needed provides:

- Reduced CPU usage
- Lower battery consumption on mobile devices
- Improved performance on lower-end devices
- Better experience for users with vestibular disorders

## Future Enhancements

Potential improvements:

- [ ] Add user preference toggle in settings
- [ ] Provide "subtle" animation mode (middle ground)
- [ ] Add animation intensity slider
- [ ] Store user preference in localStorage
- [ ] Add visual indicator when reduced motion is active
