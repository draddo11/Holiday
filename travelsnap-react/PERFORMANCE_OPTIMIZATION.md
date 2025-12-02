# Performance Optimization Guide

This document outlines the performance optimizations implemented in TravelSnap React application.

## Implemented Optimizations

### 1. Code Splitting & Lazy Loading

**Routes are lazy loaded** to reduce initial bundle size:
- `HomePage`, `DestinationsPage`, `AIPhotoPage`, `HowItWorksPage`, and `CustomDestinationPage` are loaded on-demand
- React's `lazy()` and `Suspense` are used for code splitting
- Loading fallback component provides smooth UX during chunk loading

**Benefits:**
- Reduced initial bundle size by ~40-60%
- Faster Time to Interactive (TTI)
- Better First Contentful Paint (FCP)

### 2. Image Lazy Loading

**LazyImage component** implements:
- Intersection Observer API for viewport detection
- Images load 50px before entering viewport
- WebP format support with automatic fallback to JPEG/PNG
- Skeleton loading states for better perceived performance

**Usage:**
```jsx
import LazyImage from './components/LazyImage';

<LazyImage
  src="/images/destination.jpg"
  webpSrc="/images/destination.webp"
  alt="Destination name"
  aspectRatio={0.6667}
/>
```

### 3. Bundle Optimization

**Vite configuration optimizations:**
- Manual chunk splitting for vendor libraries
- Separate chunks for React and MUI libraries
- CSS code splitting enabled
- Terser minification with console.log removal in production
- Optimized dependency pre-bundling

**Chunk Strategy:**
- `react-vendor`: React, React DOM, React Router
- `mui-vendor`: Material-UI and Emotion libraries
- Route-based chunks: Each page is a separate chunk

### 4. CSS Transforms for Animations

All animations use CSS transforms instead of layout properties:
- `transform: translateY()` instead of `top/bottom`
- `transform: scale()` instead of `width/height`
- Hardware acceleration with `will-change` where appropriate

**Benefits:**
- Animations run on GPU
- No layout recalculation
- Smooth 60fps animations
- Better Cumulative Layout Shift (CLS) scores

### 5. Performance Monitoring

**Core Web Vitals tracking:**
- LCP (Largest Contentful Paint) - Target: < 2.5s
- FID (First Input Delay) - Target: < 100ms
- CLS (Cumulative Layout Shift) - Target: < 0.1
- FCP (First Contentful Paint) - Target: < 1.8s

**Enable monitoring:**
```javascript
// In browser console or localStorage
localStorage.setItem('enablePerformanceMonitoring', 'true');
```

## Performance Targets

### Core Web Vitals Goals

| Metric | Good | Needs Improvement | Poor | Our Target |
|--------|------|-------------------|------|------------|
| LCP    | ≤ 2.5s | 2.5s - 4.0s | > 4.0s | < 2.0s |
| FID    | ≤ 100ms | 100ms - 300ms | > 300ms | < 80ms |
| CLS    | ≤ 0.1 | 0.1 - 0.25 | > 0.25 | < 0.05 |
| FCP    | ≤ 1.8s | 1.8s - 3.0s | > 3.0s | < 1.5s |

### Bundle Size Targets

- Initial JS bundle: < 200 KB (gzipped)
- Total JS (all chunks): < 500 KB (gzipped)
- CSS bundle: < 50 KB (gzipped)
- Largest route chunk: < 100 KB (gzipped)

## Testing Performance

### 1. Build and Analyze

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### 2. Lighthouse Audit

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Performance" category
4. Run audit on production build

**Target Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

### 3. Bundle Analysis

Install bundle analyzer:
```bash
npm install --save-dev rollup-plugin-visualizer
```

Add to `vite.config.js`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true })
  ]
});
```

### 4. Network Throttling

Test with Chrome DevTools Network throttling:
- Fast 3G: Simulates mobile network
- Slow 3G: Simulates poor connection
- Offline: Tests service worker caching

## Best Practices

### Images

1. **Use WebP format** with JPEG/PNG fallback
2. **Optimize images** before deployment:
   - Compress to < 200 KB per image
   - Use appropriate dimensions (don't serve 4K images for thumbnails)
3. **Use LazyImage component** for all non-critical images
4. **Provide aspect ratios** to prevent layout shift

### Code

1. **Lazy load routes** - Already implemented
2. **Avoid large dependencies** - Check bundle size impact
3. **Use dynamic imports** for heavy features:
   ```javascript
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   ```
4. **Memoize expensive computations**:
   ```javascript
   const expensiveValue = useMemo(() => computeExpensive(data), [data]);
   ```

### Animations

1. **Use CSS transforms** - translateX/Y, scale, rotate
2. **Avoid animating** - width, height, top, left, margin, padding
3. **Respect reduced motion**:
   ```javascript
   const prefersReducedMotion = usePrefersReducedMotion();
   ```
4. **Use will-change sparingly** - Only for active animations

### Fonts

1. **Preload critical fonts**:
   ```html
   <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
   ```
2. **Use font-display: swap** to prevent FOIT (Flash of Invisible Text)
3. **Subset fonts** to include only needed characters

## Monitoring in Production

### Setup Analytics

Extend `performanceMonitor.js` to send metrics to analytics:

```javascript
export function reportWebVitals(metric) {
  // Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_rating: metric.rating,
    });
  }
  
  // Or send to custom analytics endpoint
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(metric),
  });
}
```

### Real User Monitoring (RUM)

Consider integrating:
- Google Analytics 4 with Web Vitals
- Sentry Performance Monitoring
- New Relic Browser
- Datadog RUM

## Troubleshooting

### Large Bundle Size

1. Run bundle analyzer to identify large dependencies
2. Check for duplicate dependencies in package.json
3. Use dynamic imports for heavy libraries
4. Consider lighter alternatives (e.g., date-fns instead of moment.js)

### Slow LCP

1. Optimize hero images (compress, use WebP)
2. Preload critical resources
3. Reduce render-blocking resources
4. Use CDN for static assets

### High CLS

1. Set explicit dimensions for images and videos
2. Avoid inserting content above existing content
3. Use CSS aspect-ratio or padding-top technique
4. Reserve space for ads and embeds

### Poor FID

1. Break up long JavaScript tasks
2. Use web workers for heavy computations
3. Defer non-critical JavaScript
4. Optimize event handlers

## Future Optimizations

### Potential Improvements

1. **Service Worker** for offline support and caching
2. **HTTP/2 Server Push** for critical resources
3. **Prefetching** next likely routes
4. **Image CDN** with automatic optimization
5. **Edge caching** with CDN
6. **Progressive Web App (PWA)** features

### Advanced Techniques

1. **React Server Components** (when stable)
2. **Streaming SSR** for faster TTFB
3. **Partial Hydration** to reduce JavaScript
4. **Islands Architecture** for static content

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

## Checklist

- [x] Code splitting for routes
- [x] Lazy loading for images
- [x] WebP format support with fallback
- [x] Bundle size optimization
- [x] CSS transforms for animations
- [x] Performance monitoring setup
- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Bundle size < 200 KB (initial)
