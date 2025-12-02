import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { usePrefersReducedMotion, useFadeIn, useStaggeredAnimation, useSlideUp } from './useScrollAnimation';

describe('usePrefersReducedMotion', () => {
  let matchMediaMock;

  beforeEach(() => {
    // Mock window.matchMedia
    matchMediaMock = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    window.matchMedia = vi.fn(() => matchMediaMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return false when user does not prefer reduced motion', () => {
    matchMediaMock.matches = false;
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it('should return true when user prefers reduced motion', () => {
    matchMediaMock.matches = true;
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  it('should add event listener for media query changes', () => {
    renderHook(() => usePrefersReducedMotion());
    expect(matchMediaMock.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should remove event listener on unmount', () => {
    const { unmount } = renderHook(() => usePrefersReducedMotion());
    unmount();
    expect(matchMediaMock.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should update when media query changes', () => {
    matchMediaMock.matches = false;
    const { result } = renderHook(() => usePrefersReducedMotion());
    
    expect(result.current).toBe(false);

    // Simulate media query change
    act(() => {
      const changeHandler = matchMediaMock.addEventListener.mock.calls[0][1];
      changeHandler({ matches: true });
    });

    expect(result.current).toBe(true);
  });
});

describe('useFadeIn with reduced motion', () => {
  let matchMediaMock;
  let intersectionObserverMock;

  beforeEach(() => {
    matchMediaMock = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    window.matchMedia = vi.fn(() => matchMediaMock);

    intersectionObserverMock = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };
    global.IntersectionObserver = vi.fn(() => intersectionObserverMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should show element immediately when reduced motion is preferred', () => {
    matchMediaMock.matches = true;
    const { result } = renderHook(() => useFadeIn());
    
    // Element should be visible immediately
    expect(result.current.isVisible).toBe(true);
  });

  it('should not create IntersectionObserver when reduced motion is preferred', () => {
    matchMediaMock.matches = true;
    renderHook(() => useFadeIn());
    
    // IntersectionObserver should not be created
    expect(global.IntersectionObserver).not.toHaveBeenCalled();
  });

  it('should create IntersectionObserver when reduced motion is not preferred', () => {
    matchMediaMock.matches = false;
    const { result } = renderHook(() => useFadeIn());
    
    // Set ref to trigger observer
    act(() => {
      result.current.ref.current = document.createElement('div');
    });

    // IntersectionObserver should be created
    expect(global.IntersectionObserver).toHaveBeenCalled();
  });
});

describe('useStaggeredAnimation with reduced motion', () => {
  let matchMediaMock;

  beforeEach(() => {
    matchMediaMock = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    window.matchMedia = vi.fn(() => matchMediaMock);

    global.IntersectionObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should show all elements immediately when reduced motion is preferred', () => {
    matchMediaMock.matches = true;
    const count = 5;
    const { result } = renderHook(() => useStaggeredAnimation(count));
    
    // All elements should be visible immediately
    expect(result.current.visibleIndices.size).toBe(count);
    for (let i = 0; i < count; i++) {
      expect(result.current.visibleIndices.has(i)).toBe(true);
    }
  });

  it('should not create IntersectionObserver when reduced motion is preferred', () => {
    matchMediaMock.matches = true;
    renderHook(() => useStaggeredAnimation(3));
    
    // IntersectionObserver should not be created
    expect(global.IntersectionObserver).not.toHaveBeenCalled();
  });
});

describe('useSlideUp with reduced motion', () => {
  let matchMediaMock;

  beforeEach(() => {
    matchMediaMock = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    window.matchMedia = vi.fn(() => matchMediaMock);

    global.IntersectionObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should have no transition when reduced motion is preferred', () => {
    matchMediaMock.matches = true;
    const { result } = renderHook(() => useSlideUp());
    
    // Style should have no transition
    expect(result.current.style.transition).toBe('none');
  });

  it('should have transition when reduced motion is not preferred', () => {
    matchMediaMock.matches = false;
    const { result } = renderHook(() => useSlideUp());
    
    // Style should have transition
    expect(result.current.style.transition).toContain('opacity');
    expect(result.current.style.transition).toContain('transform');
  });
});
