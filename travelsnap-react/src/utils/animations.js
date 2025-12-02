/**
 * Animation utilities for micro-interactions
 * All animations use CSS transforms for optimal performance
 */

import { transitions } from '../theme/tokens';

/**
 * Ripple effect animation for buttons
 * Creates a circular ripple that expands from click point
 */
export const createRipple = (event, element) => {
  const button = element || event.currentTarget;
  
  // Remove existing ripple if present
  const existingRipple = button.querySelector('.ripple');
  if (existingRipple) {
    existingRipple.remove();
  }

  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const rect = button.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add('ripple');

  button.appendChild(circle);
};

/**
 * Card hover animation styles
 * Provides consistent scale and shadow animations for clickable cards
 */
export const cardHoverAnimation = {
  transition: `all ${transitions.duration.slow} ${transitions.timing.spring}`,
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
  },
  '&:active': {
    transform: 'translateY(-4px) scale(0.99)',
  },
};

/**
 * Button press animation styles
 * Provides tactile feedback on button press
 */
export const buttonPressAnimation = {
  transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
  '&:active': {
    transform: 'scale(0.96)',
  },
};

/**
 * Smooth color transition styles
 * For elements that change color on hover/focus
 */
export const colorTransition = {
  transition: `color ${transitions.duration.base} ${transitions.timing.ease}, 
               background-color ${transitions.duration.base} ${transitions.timing.ease},
               border-color ${transitions.duration.base} ${transitions.timing.ease}`,
};

/**
 * Page transition animation variants
 * For use with route transitions
 */
export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/**
 * Loading spinner animation
 * Smooth rotation animation for loading states
 */
export const spinnerAnimation = {
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  animation: 'spin 1s linear infinite',
};

/**
 * Pulse animation for loading states
 * Subtle scale animation to indicate activity
 */
export const pulseAnimation = {
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 0.8,
      transform: 'scale(1.05)',
    },
  },
  animation: 'pulse 2s ease-in-out infinite',
};

/**
 * Fade in animation
 * For elements entering the viewport
 */
export const fadeInAnimation = {
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  animation: 'fadeIn 0.6s ease-out forwards',
};

/**
 * Shimmer animation for skeleton loaders
 * Creates a moving highlight effect
 */
export const shimmerAnimation = {
  '@keyframes shimmer': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },
  animation: 'shimmer 2s infinite',
};
