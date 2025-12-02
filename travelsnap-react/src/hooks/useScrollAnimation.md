# Scroll Animation Hooks

This module provides React hooks for implementing scroll-triggered animations with built-in support for `prefers-reduced-motion` accessibility settings.

## Hooks

### `usePrefersReducedMotion()`

Detects if the user has enabled reduced motion preferences in their system settings.

**Returns:** `boolean` - `true` if user prefers reduced motion

**Example:**
```jsx
const prefersReducedMotion = usePrefersReducedMotion();
```

---

### `useFadeIn(options)`

Creates a fade-in animation when an element enters the viewport.

**Parameters:**
- `options` (Object, optional)
  - `threshold` (number): Visibility threshold (0-1). Default: `0.1`
  - `rootMargin` (string): Root margin for observer. Default: `'0px 0px -50px 0px'`
  - `triggerOnce` (boolean): Whether to trigger animation only once. Default: `true`

**Returns:** `{ ref, isVisible }`
- `ref`: React ref to attach to the element
- `isVisible`: Boolean indicating if element is visible

**Example:**
```jsx
const { ref, isVisible } = useFadeIn({ threshold: 0.2 });

return (
  <div 
    ref={ref}
    style={{
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.6s ease'
    }}
  >
    Content
  </div>
);
```

---

### `useStaggeredAnimation(count, options)`

Creates staggered animations for multiple elements (e.g., card grids).

**Parameters:**
- `count` (number): Number of elements to animate
- `options` (Object, optional)
  - `threshold` (number): Visibility threshold (0-1). Default: `0.1`
  - `rootMargin` (string): Root margin for observer. Default: `'0px 0px -50px 0px'`
  - `staggerDelay` (number): Delay between each element in ms. Default: `100`

**Returns:** `{ refs, visibleIndices, setRef }`
- `refs`: Array of refs
- `visibleIndices`: Set of visible element indices
- `setRef`: Function to set ref for an element at index

**Example:**
```jsx
const { setRef, visibleIndices } = useStaggeredAnimation(items.length, {
  staggerDelay: 150
});

return items.map((item, index) => (
  <div
    key={index}
    ref={setRef(index)}
    style={{
      opacity: visibleIndices.has(index) ? 1 : 0,
      transform: visibleIndices.has(index) ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease'
    }}
  >
    {item}
  </div>
));
```

---

### `useSlideUp(options)`

Creates a slide-up animation when an element enters the viewport.

**Parameters:**
- `options` (Object, optional)
  - `threshold` (number): Visibility threshold (0-1). Default: `0.1`
  - `rootMargin` (string): Root margin for observer. Default: `'0px 0px -50px 0px'`
  - `distance` (number): Distance to slide in pixels. Default: `30`

**Returns:** `{ ref, isVisible, style }`
- `ref`: React ref to attach to the element
- `isVisible`: Boolean indicating if element is visible
- `style`: Pre-computed style object with animation

**Example:**
```jsx
const { ref, style } = useSlideUp({ distance: 50 });

return <div ref={ref} style={style}>Content</div>;
```

---

### `getStaggeredStyle(isVisible, index, options)`

Utility function to generate staggered animation styles.

**Parameters:**
- `isVisible` (boolean): Whether element is visible
- `index` (number): Element index for stagger calculation
- `options` (Object, optional)
  - `distance` (number): Distance to slide in pixels. Default: `30`
  - `staggerDelay` (number): Delay between elements in ms. Default: `100`
  - `duration` (number): Animation duration in ms. Default: `600`

**Returns:** Style object with animation properties

**Example:**
```jsx
const style = getStaggeredStyle(isVisible, 2, { staggerDelay: 150 });
```

## Accessibility

All hooks automatically respect the user's `prefers-reduced-motion` setting:
- When enabled, animations are disabled or significantly reduced
- Elements appear immediately without animation
- Ensures the app remains accessible to users with motion sensitivities

## Browser Support

These hooks use the Intersection Observer API, which is supported in all modern browsers. For older browsers, consider using a polyfill.

## Performance

- Uses Intersection Observer for efficient scroll detection
- Animations use CSS transforms for optimal performance
- Cleanup is handled automatically on unmount
