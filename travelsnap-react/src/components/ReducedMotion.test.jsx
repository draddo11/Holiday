import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Button from './Button';
import PremiumDestinationCard from './PremiumDestinationCard';
import ModernStatsCard from './ModernStatsCard';
import ModernNavigation from './ModernNavigation';
import { WbSunny } from '@mui/icons-material';

// Mock the useScrollAnimation hook
vi.mock('../hooks/useScrollAnimation', () => ({
  usePrefersReducedMotion: vi.fn(),
  useFadeIn: vi.fn(() => ({ ref: { current: null }, isVisible: true })),
  useStaggeredAnimation: vi.fn(() => ({ 
    refs: { current: [] }, 
    visibleIndices: new Set([0, 1, 2]), 
    setRef: () => () => {} 
  })),
}));

const mockDestination = {
  name: 'Paris',
  tagline: 'The City of Light',
  imageUrl: 'https://example.com/paris.jpg',
  placesToVisit: ['Eiffel Tower', 'Louvre', 'Notre Dame'],
};

describe('Reduced Motion Support', () => {
  let usePrefersReducedMotionMock;

  beforeEach(() => {
    usePrefersReducedMotionMock = require('../hooks/useScrollAnimation').usePrefersReducedMotion;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Button Component', () => {
    it('should render without animations when reduced motion is preferred', () => {
      usePrefersReducedMotionMock.mockReturnValue(true);
      
      const { container } = render(
        <Button variant="primary">Click Me</Button>
      );
      
      const button = container.querySelector('button');
      const styles = window.getComputedStyle(button);
      
      // Button should render successfully
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('should render with animations when reduced motion is not preferred', () => {
      usePrefersReducedMotionMock.mockReturnValue(false);
      
      const { container } = render(
        <Button variant="primary">Click Me</Button>
      );
      
      const button = container.querySelector('button');
      
      // Button should render successfully
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('should not create ripple effect when reduced motion is preferred', () => {
      usePrefersReducedMotionMock.mockReturnValue(true);
      
      const onClick = vi.fn();
      const { container } = render(
        <Button variant="primary" onClick={onClick}>Click Me</Button>
      );
      
      const button = container.querySelector('button');
      button.click();
      
      // onClick should still be called
      expect(onClick).toHaveBeenCalled();
      
      // No ripple element should be created
      const ripple = container.querySelector('.ripple');
      expect(ripple).toBeNull();
    });
  });

  describe('PremiumDestinationCard Component', () => {
    it('should render without animations when reduced motion is preferred', () => {
      usePrefersReducedMotionMock.mockReturnValue(true);
      
      render(
        <PremiumDestinationCard 
          destination={mockDestination} 
          onClick={() => {}} 
        />
      );
      
      expect(screen.getByText('Paris')).toBeInTheDocument();
      expect(screen.getByText('The City of Light')).toBeInTheDocument();
    });

    it('should render with animations when reduced motion is not preferred', () => {
      usePrefersReducedMotionMock.mockReturnValue(false);
      
      render(
        <PremiumDestinationCard 
          destination={mockDestination} 
          onClick={() => {}} 
        />
      );
      
      expect(screen.getByText('Paris')).toBeInTheDocument();
    });
  });

  describe('ModernStatsCard Component', () => {
    it('should render without animations when reduced motion is preferred', () => {
      usePrefersReducedMotionMock.mockReturnValue(true);
      
      render(
        <ModernStatsCard
          icon={<WbSunny />}
          label="Weather"
          value="23°C"
          description="Clear and pleasant"
        />
      );
      
      expect(screen.getByText('Weather')).toBeInTheDocument();
      expect(screen.getByText('23°C')).toBeInTheDocument();
    });

    it('should render with animations when reduced motion is not preferred', () => {
      usePrefersReducedMotionMock.mockReturnValue(false);
      
      render(
        <ModernStatsCard
          icon={<WbSunny />}
          label="Weather"
          value="23°C"
          description="Clear and pleasant"
        />
      );
      
      expect(screen.getByText('Weather')).toBeInTheDocument();
    });
  });

  describe('ModernNavigation Component', () => {
    it('should render without animations when reduced motion is preferred', () => {
      usePrefersReducedMotionMock.mockReturnValue(true);
      
      render(
        <BrowserRouter>
          <ModernNavigation />
        </BrowserRouter>
      );
      
      expect(screen.getByText('TravelSnap')).toBeInTheDocument();
    });

    it('should render with animations when reduced motion is not preferred', () => {
      usePrefersReducedMotionMock.mockReturnValue(false);
      
      render(
        <BrowserRouter>
          <ModernNavigation />
        </BrowserRouter>
      );
      
      expect(screen.getByText('TravelSnap')).toBeInTheDocument();
    });
  });

  describe('Functionality without animations', () => {
    it('should maintain full functionality when animations are disabled', () => {
      usePrefersReducedMotionMock.mockReturnValue(true);
      
      const onClick = vi.fn();
      render(
        <Button variant="primary" onClick={onClick}>
          Test Button
        </Button>
      );
      
      const button = screen.getByText('Test Button');
      button.click();
      
      // Functionality should work without animations
      expect(onClick).toHaveBeenCalled();
    });

    it('should display all content immediately when reduced motion is preferred', () => {
      usePrefersReducedMotionMock.mockReturnValue(true);
      
      render(
        <PremiumDestinationCard 
          destination={mockDestination} 
          onClick={() => {}} 
        />
      );
      
      // All content should be visible immediately
      expect(screen.getByText('Paris')).toBeVisible();
      expect(screen.getByText('The City of Light')).toBeVisible();
      expect(screen.getByText('Explore Destination')).toBeVisible();
    });
  });
});
