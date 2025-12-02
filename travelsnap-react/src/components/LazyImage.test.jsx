import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import LazyImage from './LazyImage';

describe('LazyImage Component', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = class IntersectionObserver {
      constructor(callback) {
        this.callback = callback;
        // Immediately trigger intersection
        setTimeout(() => {
          this.callback([{ isIntersecting: true }]);
        }, 0);
      }
      observe() {}
      disconnect() {}
      unobserve() {}
    };
  });

  it('should render skeleton initially', () => {
    render(
      <LazyImage
        src="/test-image.jpg"
        alt="Test image"
        aspectRatio={0.5}
      />
    );

    // Skeleton should be present initially
    const skeleton = document.querySelector('.MuiSkeleton-root');
    expect(skeleton).toBeTruthy();
  });

  it('should have correct structure', () => {
    const { container } = render(
      <LazyImage
        src="/test-image.jpg"
        alt="Test image"
        aspectRatio={0.5}
      />
    );

    // Should have a wrapper box
    expect(container.firstChild).toBeTruthy();
  });

  it('should use correct aspect ratio for container', () => {
    const { container } = render(
      <LazyImage
        src="/test-image.jpg"
        alt="Test image"
        aspectRatio={0.75}
      />
    );

    const wrapper = container.firstChild;
    const paddingTop = window.getComputedStyle(wrapper).paddingTop;
    
    // Should set padding-top to 75% (0.75 * 100)
    expect(paddingTop).toBe('75%');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <LazyImage
        src="/test-image.jpg"
        alt="Test image"
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should accept webpSrc prop', () => {
    const { container } = render(
      <LazyImage
        src="/test-image.jpg"
        webpSrc="/test-image.webp"
        alt="Test image"
      />
    );

    // Component should render without errors
    expect(container.firstChild).toBeTruthy();
  });
});
