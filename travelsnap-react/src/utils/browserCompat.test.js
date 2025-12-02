import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  supportsBackdropFilter,
  supportsGrid,
  supportsCustomProperties,
  supportsIntersectionObserver,
  supportsResizeObserver,
  prefersReducedMotion,
  supportsTouch,
  getBrowser,
  isIOS,
  isAndroid,
  isMobile,
  getViewportWidth,
  getViewportHeight,
  getCurrentBreakpoint,
  getGlassmorphismStyles,
  getAnimationDuration,
  isInViewport,
  debounce,
  throttle,
} from './browserCompat';

describe('Browser Compatibility Utilities', () => {
  beforeEach(() => {
    // Reset window dimensions
    global.innerWidth = 1024;
    global.innerHeight = 768;
  });

  describe('Feature Detection', () => {
    it('should detect backdrop-filter support', () => {
      const result = supportsBackdropFilter();
      expect(typeof result).toBe('boolean');
    });

    it('should detect CSS Grid support', () => {
      const result = supportsGrid();
      expect(typeof result).toBe('boolean');
    });

    it('should detect CSS custom properties support', () => {
      const result = supportsCustomProperties();
      expect(typeof result).toBe('boolean');
    });

    it('should detect IntersectionObserver support', () => {
      const result = supportsIntersectionObserver();
      expect(typeof result).toBe('boolean');
    });

    it('should detect ResizeObserver support', () => {
      const result = supportsResizeObserver();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('Motion Preferences', () => {
    it('should detect prefers-reduced-motion', () => {
      const matchMediaMock = vi.fn((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      global.matchMedia = matchMediaMock;

      const result = prefersReducedMotion();
      expect(typeof result).toBe('boolean');
    });

    it('should return 0 duration when reduced motion is preferred', () => {
      const matchMediaMock = vi.fn(() => ({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      global.matchMedia = matchMediaMock;

      const duration = getAnimationDuration(300);
      expect(duration).toBe(0);
    });

    it('should return normal duration when reduced motion is not preferred', () => {
      const matchMediaMock = vi.fn(() => ({
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      global.matchMedia = matchMediaMock;

      const duration = getAnimationDuration(300);
      expect(duration).toBe(300);
    });
  });

  describe('Touch Detection', () => {
    it('should detect touch support', () => {
      const result = supportsTouch();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('Browser Detection', () => {
    it('should detect browser type', () => {
      const browser = getBrowser();
      expect(typeof browser).toBe('string');
      expect(['chrome', 'firefox', 'safari', 'edge', 'ie', 'unknown']).toContain(browser);
    });

    it('should detect iOS devices', () => {
      const result = isIOS();
      expect(typeof result).toBe('boolean');
    });

    it('should detect Android devices', () => {
      const result = isAndroid();
      expect(typeof result).toBe('boolean');
    });

    it('should detect mobile devices', () => {
      const result = isMobile();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('Viewport Utilities', () => {
    it('should get viewport width', () => {
      global.innerWidth = 1024;
      const width = getViewportWidth();
      expect(width).toBe(1024);
    });

    it('should get viewport height', () => {
      global.innerHeight = 768;
      const height = getViewportHeight();
      expect(height).toBe(768);
    });

    it('should determine breakpoint for mobile (xs)', () => {
      global.innerWidth = 320;
      const breakpoint = getCurrentBreakpoint();
      expect(breakpoint).toBe('xs');
    });

    it('should determine breakpoint for tablet (sm)', () => {
      global.innerWidth = 768;
      const breakpoint = getCurrentBreakpoint();
      expect(breakpoint).toBe('sm');
    });

    it('should determine breakpoint for desktop (md)', () => {
      global.innerWidth = 1024;
      const breakpoint = getCurrentBreakpoint();
      expect(breakpoint).toBe('md');
    });

    it('should determine breakpoint for large desktop (lg)', () => {
      global.innerWidth = 1440;
      const breakpoint = getCurrentBreakpoint();
      expect(breakpoint).toBe('lg');
    });

    it('should determine breakpoint for extra large desktop (xl)', () => {
      global.innerWidth = 1920;
      const breakpoint = getCurrentBreakpoint();
      expect(breakpoint).toBe('xl');
    });
  });

  describe('Glassmorphism Styles', () => {
    it('should return glassmorphism styles with backdrop-filter when supported', () => {
      // Mock CSS.supports to return true for backdrop-filter
      const originalSupports = CSS.supports;
      CSS.supports = vi.fn((prop) => prop.includes('backdrop-filter'));

      const styles = getGlassmorphismStyles('20px', 0.1);
      
      expect(styles).toHaveProperty('backdropFilter');
      expect(styles.backdropFilter).toBe('blur(20px)');

      CSS.supports = originalSupports;
    });

    it('should return fallback styles when backdrop-filter is not supported', () => {
      // Mock CSS.supports to return false for backdrop-filter
      const originalSupports = CSS.supports;
      CSS.supports = vi.fn(() => false);

      const styles = getGlassmorphismStyles('20px', 0.1);
      
      expect(styles).toHaveProperty('backgroundColor');
      expect(styles).toHaveProperty('border');
      expect(styles).not.toHaveProperty('backdropFilter');

      CSS.supports = originalSupports;
    });
  });

  describe('Viewport Utilities', () => {
    it('should check if element is in viewport', () => {
      const mockElement = {
        getBoundingClientRect: () => ({
          top: 100,
          left: 100,
          bottom: 200,
          right: 200,
        }),
      };

      global.innerWidth = 1024;
      global.innerHeight = 768;

      const result = isInViewport(mockElement);
      expect(typeof result).toBe('boolean');
    });

    it('should return false for null element', () => {
      const result = isInViewport(null);
      expect(result).toBe(false);
    });
  });

  describe('Performance Utilities', () => {
    it('should debounce function calls', (done) => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 50);

      // Call multiple times rapidly
      debouncedFn();
      debouncedFn();
      debouncedFn();

      // Should only be called once after delay
      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 100);
    });

    it('should throttle function calls', (done) => {
      let callCount = 0;
      const throttledFn = throttle(() => {
        callCount++;
      }, 50);

      // Call multiple times rapidly
      throttledFn();
      throttledFn();
      throttledFn();

      // Should be called immediately once
      expect(callCount).toBe(1);

      // Wait and call again
      setTimeout(() => {
        throttledFn();
        expect(callCount).toBe(2);
        done();
      }, 100);
    });
  });

  describe('Breakpoint Consistency', () => {
    it('should maintain consistent breakpoint values', () => {
      const breakpoints = [
        { width: 320, expected: 'xs' },
        { width: 599, expected: 'xs' },
        { width: 600, expected: 'sm' },
        { width: 899, expected: 'sm' },
        { width: 900, expected: 'md' },
        { width: 1199, expected: 'md' },
        { width: 1200, expected: 'lg' },
        { width: 1535, expected: 'lg' },
        { width: 1536, expected: 'xl' },
      ];

      breakpoints.forEach(({ width, expected }) => {
        global.innerWidth = width;
        const breakpoint = getCurrentBreakpoint();
        expect(breakpoint).toBe(expected);
      });
    });
  });
});
