# Animation Guidelines

## Overview

This guide provides comprehensive guidelines for implementing animations in TravelSnap. All animations should enhance the user experience without being distracting or causing performance issues.

## Core Principles

### 1. Purposeful
Every animation must serve a clear purpose:
- **Feedback**: Confirm user actions (button press, form submission)
- **Attention**: Draw focus to important elements
- **Orientation**: Help users understand spatial relationships
- **Continuity**: Maintain context during transitions

### 2. Subtle
Animations should enhance, not dominate:
- Keep movements small and refined
- Use subtle easing for natural motion
- Avoid excessive bouncing or overshooting
- Maintain professional aesthetic

### 3. Fast
Respect user's time:
- Most animations: 150-350ms
- Page transitions: 400-500ms max
- Never exceed 500ms for UI animations
- Instant feedback for critical actions

### 4. Smooth
Use proper easing functions:
- Natural acceleration and deceleration
- Avoid linear timing (feels robotic)
- Match easing to animation type
- Consistent timing across similar elements

### 5. Respectful
Honor user preferences:
- Detect `prefers-reduced-motion`
- Provide non-animated alternatives
- Ensure functionality without animations
- Test with motion disabled

---

## Timing System

### Duration Values

```javascript
duration: {
  fast: '150ms',    // Micro-interactions (hover, focus)
  base: '250ms',    // Standard transitions (color, opacity)
  slow: '350ms',    // Complex animations (transform + multiple properties)
  slower: '500ms',  // Page transitions, major state changes
}
```

### When to Use Each Duration

**Fast (150ms)**
- Button hover states
- Focus indicators
- Tooltip appearances
- Icon color changes
- Small scale changes

**Base (250ms)**
- Card hover effects
- Dropdown menus
- Modal overlays
- Background color transitions
- Border color changes

**Slow (350ms)**
- Card movements (translateY + scale)
- Complex hover effects
- Accordion expansions
- Tab transitions
- Multi-property animations

**Slower (500ms)**
- Page transitions
- Major layout changes
- Slide-in panels
- Full-screen overlays
- Route changes

---

## Easing Functions

### Available Easings

```javascript
timing: {
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',        // Standard - balanced
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',        // Accelerating - exits
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',       // Decelerating - entrances
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',   // Smooth - both directions
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy - playful (use sparingly)
}
```

### Choosing the Right Easing

**ease (Standard)**
- Default choice for most animations
- Balanced acceleration and deceleration
- Works well for hover effects
- Good for color/opacity transitions

**easeOut (Decelerating)**
- Elements entering the screen
- Dropdowns appearing
- Modals opening
- Content fading in
- Gives impression of speed

**easeIn (Accelerating)**
- Elements leaving the screen
- Dropdowns closing
- Modals dismissing
- Content fading out
- Feels more natural for exits

**easeInOut (Smooth)**
- Elements moving within the viewport
- Carousel transitions
- Tab switching
- Smooth both ways

**spring (Bouncy)**
- Use very sparingly
- Only for playful interactions
- Success confirmations
- Celebratory moments
- Can feel unprofessional if overused

---

## Common Animation Patterns

### 1. Hover Effects

#### Basic Hover
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

#### Card Hover
```jsx
<Card sx={{
  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: theme.shadows['2xl'],
  }
}}>
  Card content
</Card>
```

#### Button Hover
```jsx
<Button sx={{
  transition: 'all 0.15s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows.glow,
  },
  '&:active': {
    transform: 'scale(0.95)',
  }
}}>
  Click me
</Button>
```

### 2. Fade Animations

#### Fade In
```jsx
<Box sx={{
  animation: 'fadeIn 0.5s ease',
  '@keyframes fadeIn': {
    from: { 
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: { 
      opacity: 1,
      transform: 'translateY(0)',
    },
  }
}}>
  Content
</Box>
```

#### Fade Out
```jsx
<Box sx={{
  animation: 'fadeOut 0.3s ease',
  '@keyframes fadeOut': {
    from: { 
      opacity: 1,
      transform: 'translateY(0)',
    },
    to: { 
      opacity: 0,
      transform: 'translateY(-20px)',
    },
  }
}}>
  Content
</Box>
```

### 3. Scale Animations

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

#### Pulse Effect
```jsx
<Box sx={{
  animation: 'pulse 2s ease-in-out infinite',
  '@keyframes pulse': {
    '0%, 100%': { 
      transform: 'scale(1)',
      opacity: 1,
    },
    '50%': { 
      transform: 'scale(1.05)',
      opacity: 0.8,
    },
  }
}}>
  Pulsing element
</Box>
```

### 4. Slide Animations

#### Slide In from Right
```jsx
<Box sx={{
  animation: 'slideInRight 0.4s ease-out',
  '@keyframes slideInRight': {
    from: { 
      transform: 'translateX(100%)',
      opacity: 0,
    },
    to: { 
      transform: 'translateX(0)',
      opacity: 1,
    },
  }
}}>
  Content
</Box>
```

#### Slide In from Bottom
```jsx
<Box sx={{
  animation: 'slideInBottom 0.4s ease-out',
  '@keyframes slideInBottom': {
    from: { 
      transform: 'translateY(100%)',
      opacity: 0,
    },
    to: { 
      transform: 'translateY(0)',
      opacity: 1,
    },
  }
}}>
  Content
</Box>
```

### 5. Loading Animations

#### Shimmer Effect
```jsx
<Box sx={{
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
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

#### Spinner
```jsx
<Box sx={{
  width: 40,
  height: 40,
  border: '3px solid rgba(255, 255, 255, 0.1)',
  borderTopColor: theme.palette.primary.main,
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  }
}} />
```

### 6. Stagger Animations

For animating lists or grids:

```jsx
{items.map((item, index) => (
  <Box
    key={item.id}
    sx={{
      animation: 'fadeIn 0.5s ease',
      animationDelay: `${index * 0.1}s`,
      animationFillMode: 'backwards',
      '@keyframes fadeIn': {
        from: { 
          opacity: 0,
          transform: 'translateY(20px)',
        },
        to: { 
          opacity: 1,
          transform: 'translateY(0)',
        },
      }
    }}
  >
    {item.content}
  </Box>
))}
```

---

## Performance Optimization

### Use GPU-Accelerated Properties

**Performant** (GPU-accelerated):
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur, brightness, etc.)

**Avoid** (causes reflow/repaint):
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `border-width`

### Example: Good vs Bad

❌ **Bad** (causes layout recalculation):
```jsx
<Box sx={{
  transition: 'width 0.3s ease',
  width: 100,
  '&:hover': {
    width: 200,
  }
}} />
```

✅ **Good** (GPU-accelerated):
```jsx
<Box sx={{
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scaleX(2)',
  }
}} />
```

### Use will-change for Complex Animations

For animations that will definitely happen:

```jsx
<Box sx={{
  willChange: 'transform',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.05)',
  }
}} />
```

**Warning**: Don't overuse `will-change`. Only use it for elements that will definitely animate.

### Limit Simultaneous Animations

- Don't animate more than 10-15 elements at once
- Use stagger delays for large lists
- Consider pagination for very long lists
- Disable animations on low-end devices

---

## Reduced Motion Support

### Detecting User Preference

```jsx
import { useReducedMotion } from '../hooks/useReducedMotion';

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <Box sx={{
      transition: prefersReducedMotion ? 'none' : 'all 0.3s ease',
      '&:hover': {
        transform: prefersReducedMotion ? 'none' : 'translateY(-4px)',
      }
    }}>
      Content
    </Box>
  );
}
```

### Hook Implementation

```javascript
// hooks/useReducedMotion.js
import { useState, useEffect } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
```

### Alternative Approaches

When motion is reduced:
- Use instant transitions (0ms)
- Use opacity changes only
- Use color changes for feedback
- Maintain functionality without motion

---

## Animation Checklist

Before implementing an animation, ask:

- [ ] Does this animation serve a clear purpose?
- [ ] Is the duration appropriate (< 500ms)?
- [ ] Am I using GPU-accelerated properties?
- [ ] Does it respect `prefers-reduced-motion`?
- [ ] Is the easing function appropriate?
- [ ] Does it feel smooth at 60fps?
- [ ] Is it consistent with other animations?
- [ ] Does it work on mobile devices?

---

## Common Mistakes to Avoid

### 1. Too Slow
❌ Don't use durations over 500ms for UI animations
✅ Keep most animations between 150-350ms

### 2. Linear Timing
❌ Don't use `linear` easing (feels robotic)
✅ Use `ease`, `ease-out`, or `ease-in`

### 3. Animating Layout Properties
❌ Don't animate `width`, `height`, `top`, `left`
✅ Use `transform` and `opacity`

### 4. Too Many Simultaneous Animations
❌ Don't animate 50 cards at once
✅ Use stagger delays or pagination

### 5. Ignoring Reduced Motion
❌ Don't force animations on all users
✅ Respect `prefers-reduced-motion`

### 6. Overusing Spring Easing
❌ Don't make everything bouncy
✅ Use spring sparingly for special moments

### 7. No Purpose
❌ Don't animate just because you can
✅ Every animation should enhance UX

---

## Testing Animations

### Manual Testing

1. **Visual Inspection**
   - Does it look smooth?
   - Is the timing right?
   - Does it feel natural?

2. **Performance Testing**
   - Open DevTools Performance tab
   - Record during animation
   - Check for dropped frames
   - Ensure 60fps

3. **Reduced Motion Testing**
   - Enable in OS settings
   - Verify animations are disabled/reduced
   - Ensure functionality still works

4. **Device Testing**
   - Test on mobile devices
   - Test on low-end devices
   - Check battery impact

### Automated Testing

```javascript
// Example test for reduced motion
describe('AnimatedComponent', () => {
  it('respects prefers-reduced-motion', () => {
    // Mock matchMedia
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { container } = render(<AnimatedComponent />);
    const element = container.firstChild;
    
    expect(element).toHaveStyle({ transition: 'none' });
  });
});
```

---

## Resources

- [MDN: CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [MDN: CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [Cubic Bezier Generator](https://cubic-bezier.com/)
- [Easing Functions Cheat Sheet](https://easings.net/)
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

---

**Last Updated**: 2025
**Version**: 1.0.0
