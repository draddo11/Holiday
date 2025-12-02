# Logging Best Practices

## Overview

This project uses a centralized logging utility (`src/utils/logger.js`) to manage console output across development and production environments.

## Why Centralized Logging?

1. **Environment-aware**: Automatically silences debug logs in production
2. **Maintainable**: Single place to update logging behavior
3. **Performance**: Reduces console overhead in production
4. **Extensible**: Easy to add analytics or error tracking services

## Usage

```javascript
import { logger } from '../utils/logger';

// Development only - silenced in production
logger.log('Debug information');
logger.info('Informational message');
logger.warn('Warning message');
logger.debug('Detailed debug info');

// Always logged (but should send to error tracking service in production)
logger.error('Error occurred:', error);
```

## When to Log

### ✅ DO Log:
- **Errors**: Always log errors with context
- **Performance metrics**: In development or when explicitly enabled
- **Important state changes**: During development/debugging

### ❌ DON'T Log:
- **User actions**: Clicks, form inputs (use analytics instead)
- **API responses**: Unless debugging (already logged at API layer)
- **Render cycles**: Creates noise and performance issues
- **Sensitive data**: Passwords, tokens, personal information

## Production Considerations

In production, you should:
1. Send errors to a service like Sentry, LogRocket, or Datadog
2. Use analytics for user behavior tracking
3. Minimize console output to reduce bundle size and overhead

## Example: API Error Handling

```javascript
// ✅ Good - Error logged once at API layer
export const fetchData = async () => {
  try {
    const response = await axios.get('/api/data');
    return response.data;
  } catch (error) {
    logger.error('Error fetching data:', error);
    throw error;
  }
};

// Component using the API
const MyComponent = () => {
  try {
    const data = await fetchData();
  } catch (error) {
    // ✅ Good - No duplicate logging, just handle the error
    setError('Failed to load data');
  }
};
```

## Performance Monitoring

Performance monitoring is **disabled by default** to reduce console noise. Enable it when needed:

```javascript
// Enable performance monitoring (in browser console)
localStorage.setItem('enablePerformanceMonitoring', 'true');

// Then refresh the page to see metrics

// Disable it again
localStorage.removeItem('enablePerformanceMonitoring');
```

This monitors Core Web Vitals:
- **LCP** (Largest Contentful Paint) - Loading performance
- **FID** (First Input Delay) - Interactivity
- **CLS** (Cumulative Layout Shift) - Visual stability
- **FCP** (First Contentful Paint) - Initial render

## Migration Notes

All console statements have been migrated to use the logger utility:
- `console.log` → `logger.log` (dev only)
- `console.info` → `logger.info` (dev only)
- `console.warn` → `logger.warn` (dev only)
- `console.error` → `logger.error` (always)
- Removed redundant logs where errors are already logged at API layer
