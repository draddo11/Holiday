/**
 * Browser Compatibility Utilities
 * Detects browser features and provides fallbacks for cross-browser compatibility
 */

/**
 * Detect if backdrop-filter is supported
 */
export const supportsBackdropFilter = () => {
  if (typeof window === 'undefined') return false;
  
  return (
    CSS.supports('backdrop-filter', 'blur(10px)') ||
    CSS.supports('-webkit-backdrop-filter', 'blur(10px)')
  );
};

/**
 * Detect if CSS Grid is supported
 */
export const supportsGrid = () => {
  if (typeof window === 'undefined') return false;
  return CSS.supports('display', 'grid');
};

/**
 * Detect if CSS custom properties (variables) are supported
 */
export const supportsCustomProperties = () => {
  if (typeof window === 'undefined') return false;
  return CSS.supports('--test', '0');
};

/**
 * Detect if Intersection Observer is supported
 */
export const supportsIntersectionObserver = () => {
  if (typeof window === 'undefined') return false;
  return 'IntersectionObserver' in window;
};

/**
 * Detect if ResizeObserver is supported
 */
export const supportsResizeObserver = () => {
  if (typeof window === 'undefined') return false;
  return 'ResizeObserver' in window;
};

/**
 * Detect if the user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
};

/**
 * Detect if touch is supported
 */
export const supportsTouch = () => {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

/**
 * Detect browser type
 */
export const getBrowser = () => {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('firefox')) return 'firefox';
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'safari';
  if (userAgent.includes('chrome')) return 'chrome';
  if (userAgent.includes('edge')) return 'edge';
  if (userAgent.includes('trident')) return 'ie';
  
  return 'unknown';
};

/**
 * Detect if running on iOS
 */
export const isIOS = () => {
  if (typeof window === 'undefined') return false;
  
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
};

/**
 * Detect if running on Android
 */
export const isAndroid = () => {
  if (typeof window === 'undefined') return false;
  return /Android/.test(navigator.userAgent);
};

/**
 * Detect if running on mobile device
 */
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return isIOS() || isAndroid() || window.innerWidth < 768;
};

/**
 * Get current viewport width
 */
export const getViewportWidth = () => {
  if (typeof window === 'undefined') return 0;
  return window.innerWidth || document.documentElement.clientWidth;
};

/**
 * Get current viewport height
 */
export const getViewportHeight = () => {
  if (typeof window === 'undefined') return 0;
  return window.innerHeight || document.documentElement.clientHeight;
};

/**
 * Get current breakpoint based on viewport width
 */
export const getCurrentBreakpoint = () => {
  const width = getViewportWidth();
  
  if (width < 600) return 'xs';
  if (width < 900) return 'sm';
  if (width < 1200) return 'md';
  if (width < 1536) return 'lg';
  return 'xl';
};

/**
 * Apply glassmorphism styles with fallback
 */
export const getGlassmorphismStyles = (blurAmount = '20px', opacity = 0.1) => {
  const hasBackdropFilter = supportsBackdropFilter();
  
  if (hasBackdropFilter) {
    return {
      backdropFilter: `blur(${blurAmount})`,
      WebkitBackdropFilter: `blur(${blurAmount})`,
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    };
  }
  
  // Fallback for browsers without backdrop-filter support
  return {
    backgroundColor: `rgba(255, 255, 255, ${opacity * 2})`, // Slightly more opaque
    border: '1px solid rgba(255, 255, 255, 0.2)', // Add border for definition
  };
};

/**
 * Get animation duration based on reduced motion preference
 */
export const getAnimationDuration = (normalDuration = 300) => {
  return prefersReducedMotion() ? 0 : normalDuration;
};

/**
 * Get safe area insets for iOS devices with notch
 */
export const getSafeAreaInsets = () => {
  if (!isIOS()) {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
  
  // Use CSS environment variables for safe area insets
  const style = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(style.getPropertyValue('env(safe-area-inset-top)')) || 0,
    right: parseInt(style.getPropertyValue('env(safe-area-inset-right)')) || 0,
    bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)')) || 0,
    left: parseInt(style.getPropertyValue('env(safe-area-inset-left)')) || 0,
  };
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = getViewportHeight();
  const windowWidth = getViewportWidth();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= windowHeight &&
    rect.right <= windowWidth
  );
};

/**
 * Smooth scroll to element with fallback
 */
export const smoothScrollTo = (element, options = {}) => {
  if (!element) return;
  
  const supportsSmooth = 'scrollBehavior' in document.documentElement.style;
  
  if (supportsSmooth) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options,
    });
  } else {
    // Fallback for browsers without smooth scroll
    element.scrollIntoView(true);
  }
};

/**
 * Debounce function for resize/scroll events
 */
export const debounce = (func, wait = 100) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for high-frequency events
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Feature detection object
 */
export const features = {
  backdropFilter: supportsBackdropFilter(),
  grid: supportsGrid(),
  customProperties: supportsCustomProperties(),
  intersectionObserver: supportsIntersectionObserver(),
  resizeObserver: supportsResizeObserver(),
  touch: supportsTouch(),
  reducedMotion: prefersReducedMotion(),
};

/**
 * Device information object
 */
export const device = {
  browser: getBrowser(),
  isIOS: isIOS(),
  isAndroid: isAndroid(),
  isMobile: isMobile(),
  breakpoint: getCurrentBreakpoint(),
  viewportWidth: getViewportWidth(),
  viewportHeight: getViewportHeight(),
};

export default {
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
  getSafeAreaInsets,
  isInViewport,
  smoothScrollTo,
  debounce,
  throttle,
  features,
  device,
};
