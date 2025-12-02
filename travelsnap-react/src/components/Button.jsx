import React, { useRef } from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { colors, shadows, borderRadius, transitions } from '../theme/tokens';
import { createRipple } from '../utils/animations';
import { usePrefersReducedMotion } from '../hooks/useScrollAnimation';

/**
 * Custom Button component with three variants: primary, secondary, and ghost
 * Includes hover animations, press animations, ripple effect, and loading state
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant: 'primary', 'secondary', or 'ghost'
 * @param {string} props.size - Button size: 'small', 'medium', or 'large'
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.fullWidth - Full width button
 * @param {Object} props.sx - Additional MUI sx styles
 */
const Button = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  children,
  onClick,
  fullWidth = false,
  sx = {},
  ...props
}) => {
  const buttonRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleClick = (event) => {
    if (!disabled && !loading) {
      // Only create ripple if user doesn't prefer reduced motion
      if (!prefersReducedMotion) {
        createRipple(event, buttonRef.current);
      }
      if (onClick) {
        onClick(event);
      }
    }
  };
  // Size configurations
  const sizeStyles = {
    small: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      minHeight: '36px',
    },
    medium: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      minHeight: '44px',
    },
    large: {
      padding: '1rem 2rem',
      fontSize: '1.125rem',
      minHeight: '52px',
    },
  };

  // Variant styles
  const variantStyles = {
    primary: {
      background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
      color: colors.neutral[0],
      border: 'none',
      boxShadow: shadows.md,
      '&:hover': {
        background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
        boxShadow: shadows.glowHover,
        transform: prefersReducedMotion ? 'none' : 'translateY(-2px) scale(1.02)',
      },
      '&:active': {
        transform: prefersReducedMotion ? 'none' : 'translateY(0) scale(0.98)',
        boxShadow: shadows.sm,
      },
      '&:disabled': {
        background: colors.neutral[800],
        color: colors.neutral[600],
        boxShadow: 'none',
        cursor: 'not-allowed',
      },
    },
    secondary: {
      background: 'transparent',
      color: colors.neutral[0],
      border: `2px solid ${colors.neutral[700]}`,
      boxShadow: 'none',
      '&:hover': {
        borderColor: colors.primary[500],
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        transform: prefersReducedMotion ? 'none' : 'translateY(-2px) scale(1.02)',
        boxShadow: shadows.glow,
      },
      '&:active': {
        transform: prefersReducedMotion ? 'none' : 'translateY(0) scale(0.98)',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
      },
      '&:disabled': {
        borderColor: colors.neutral[800],
        color: colors.neutral[600],
        cursor: 'not-allowed',
      },
    },
    ghost: {
      background: 'transparent',
      color: colors.neutral[300],
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        color: colors.primary[400],
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        transform: prefersReducedMotion ? 'none' : 'translateY(-2px)',
      },
      '&:active': {
        transform: prefersReducedMotion ? 'none' : 'translateY(0) scale(0.98)',
        backgroundColor: 'rgba(59, 130, 246, 0.12)',
      },
      '&:disabled': {
        color: colors.neutral[700],
        cursor: 'not-allowed',
      },
    },
  };

  // Combined styles
  const buttonStyles = {
    ...sizeStyles[size],
    ...variantStyles[variant],
    borderRadius: borderRadius.lg,
    fontWeight: 600,
    textTransform: 'none',
    transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.base} ${transitions.timing.ease}`,
    position: 'relative',
    overflow: 'hidden',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    pointerEvents: disabled || loading ? 'none' : 'auto',
    width: fullWidth ? '100%' : 'auto',
    // Ensure minimum touch target size (44x44px) for accessibility
    minWidth: size === 'small' ? '88px' : 'auto',
    // Ripple effect styles
    '& .ripple': {
      position: 'absolute',
      borderRadius: '50%',
      transform: 'scale(0)',
      animation: 'ripple-animation 600ms ease-out',
      backgroundColor: variant === 'primary' 
        ? 'rgba(255, 255, 255, 0.4)' 
        : 'rgba(99, 102, 241, 0.4)',
      pointerEvents: 'none',
    },
    '@keyframes ripple-animation': {
      to: {
        transform: 'scale(4)',
        opacity: 0,
      },
    },
    ...sx,
  };

  return (
    <MuiButton
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      sx={buttonStyles}
      {...props}
    >
      {loading ? (
        <>
          <CircularProgress
            size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
            sx={{
              color: variant === 'primary' ? colors.neutral[0] : colors.primary[500],
              marginRight: '0.5rem',
            }}
            aria-label="Loading"
          />
          {children}
        </>
      ) : (
        children
      )}
    </MuiButton>
  );
};

export default Button;
