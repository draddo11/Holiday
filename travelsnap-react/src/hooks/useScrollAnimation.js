import { useState, useEffect, useRef } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * @returns {boolean} True if user prefers reduced motion
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for fade-in animation when element enters viewport
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for observer
 * @param {boolean} options.triggerOnce - Whether to trigger animation only once
 * @returns {Object} { ref, isVisible }
 */
export function useFadeIn(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, show immediately
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce, prefersReducedMotion]);

  return { ref, isVisible };
}

/**
 * Hook for staggered animations on multiple elements
 * @param {number} count - Number of elements to animate
 * @param {Object} options - Animation options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for observer
 * @param {number} options.staggerDelay - Delay between each element (ms)
 * @returns {Object} { refs, visibleIndices, setRef }
 */
export function useStaggeredAnimation(count, options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    staggerDelay = 100,
  } = options;

  const [visibleIndices, setVisibleIndices] = useState(new Set());
  const refs = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, show all immediately
    if (prefersReducedMotion) {
      setVisibleIndices(new Set(Array.from({ length: count }, (_, i) => i)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target);
            if (index !== -1) {
              // Add staggered delay
              setTimeout(() => {
                setVisibleIndices((prev) => new Set([...prev, index]));
              }, index * staggerDelay);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [count, threshold, rootMargin, staggerDelay, prefersReducedMotion]);

  const setRef = (index) => (el) => {
    refs.current[index] = el;
  };

  return { refs, visibleIndices, setRef };
}

/**
 * Hook for slide-up animation when element enters viewport
 * @param {Object} options - Animation options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for observer
 * @param {number} options.distance - Distance to slide (px)
 * @returns {Object} { ref, isVisible, style }
 */
export function useSlideUp(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    distance = 30,
  } = options;

  const { ref, isVisible } = useFadeIn({ threshold, rootMargin });
  const prefersReducedMotion = usePrefersReducedMotion();

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
    transition: prefersReducedMotion 
      ? 'none' 
      : 'opacity 0.6s ease, transform 0.6s ease',
  };

  return { ref, isVisible, style };
}

/**
 * Get animation style for staggered elements
 * @param {boolean} isVisible - Whether element is visible
 * @param {number} index - Element index for stagger calculation
 * @param {Object} options - Animation options
 * @returns {Object} Style object
 */
export function getStaggeredStyle(isVisible, index, options = {}) {
  const {
    distance = 30,
    staggerDelay = 100,
    duration = 600,
  } = options;

  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
    transitionDelay: `${index * staggerDelay}ms`,
  };
}
