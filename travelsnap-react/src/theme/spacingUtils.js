/**
 * Spacing Utilities
 * 
 * Helper functions for consistent spacing across the application
 * Based on 8px base unit system
 */

import { spacing } from './tokens';

/**
 * Get responsive spacing values
 * Automatically scales down spacing on mobile devices
 * 
 * @param {number|string} base - Base spacing value (e.g., 6 for 24px)
 * @param {Object} options - Options for responsive scaling
 * @param {number} options.mobileScale - Scale factor for mobile (default: 0.75)
 * @param {number} options.tabletScale - Scale factor for tablet (default: 0.875)
 * @returns {Object} MUI responsive spacing object
 * 
 * @example
 * // Returns { xs: '18px', sm: '21px', md: '24px' }
 * getResponsiveSpacing(6)
 * 
 * @example
 * // Custom scaling
 * getResponsiveSpacing(8, { mobileScale: 0.5, tabletScale: 0.75 })
 */
export const getResponsiveSpacing = (base, options = {}) => {
  const { mobileScale = 0.75, tabletScale = 0.875 } = options;
  
  const baseValue = typeof base === 'number' ? spacing[base] : base;
  const baseNum = parseFloat(baseValue);
  const unit = baseValue.replace(/[0-9.]/g, '');
  
  return {
    xs: `${baseNum * mobileScale}${unit}`,
    sm: `${baseNum * tabletScale}${unit}`,
    md: baseValue,
  };
};

/**
 * Get responsive padding
 * 
 * @param {number|string} value - Spacing value
 * @param {Object} options - Responsive options
 * @returns {Object} MUI responsive padding object
 * 
 * @example
 * sx={{ ...getResponsivePadding(6) }}
 */
export const getResponsivePadding = (value, options) => {
  const responsive = getResponsiveSpacing(value, options);
  return {
    px: responsive,
    py: responsive,
  };
};

/**
 * Get responsive margin
 * 
 * @param {number|string} value - Spacing value
 * @param {Object} options - Responsive options
 * @returns {Object} MUI responsive margin object
 * 
 * @example
 * sx={{ ...getResponsiveMargin(4) }}
 */
export const getResponsiveMargin = (value, options) => {
  const responsive = getResponsiveSpacing(value, options);
  return {
    mx: responsive,
    my: responsive,
  };
};

/**
 * Get responsive gap for flexbox/grid
 * 
 * @param {number|string} value - Spacing value
 * @param {Object} options - Responsive options
 * @returns {Object} MUI responsive gap object
 * 
 * @example
 * sx={{ display: 'flex', gap: getResponsiveGap(3) }}
 */
export const getResponsiveGap = (value, options) => {
  return getResponsiveSpacing(value, options);
};

/**
 * Get section spacing (vertical rhythm)
 * Larger spacing for major sections
 * 
 * @param {string} size - 'small', 'medium', 'large'
 * @returns {Object} MUI responsive spacing object
 * 
 * @example
 * sx={{ py: getSectionSpacing('large') }}
 */
export const getSectionSpacing = (size = 'medium') => {
  const sizeMap = {
    small: { xs: spacing[8], sm: spacing[10], md: spacing[12] },
    medium: { xs: spacing[12], sm: spacing[16], md: spacing[20] },
    large: { xs: spacing[16], sm: spacing[20], md: spacing[24] },
  };
  
  return sizeMap[size] || sizeMap.medium;
};

/**
 * Get container padding
 * Consistent padding for page containers
 * 
 * @returns {Object} MUI responsive padding object
 * 
 * @example
 * sx={{ ...getContainerPadding() }}
 */
export const getContainerPadding = () => ({
  px: { xs: spacing[4], sm: spacing[6], md: spacing[8] },
  py: { xs: spacing[8], sm: spacing[10], md: spacing[12] },
});

/**
 * Get card padding
 * Consistent padding for card components
 * 
 * @param {string} size - 'small', 'medium', 'large'
 * @returns {Object} MUI responsive padding object
 * 
 * @example
 * sx={{ ...getCardPadding('large') }}
 */
export const getCardPadding = (size = 'medium') => {
  const sizeMap = {
    small: { xs: spacing[3], sm: spacing[4], md: spacing[4] },
    medium: { xs: spacing[4], sm: spacing[5], md: spacing[6] },
    large: { xs: spacing[5], sm: spacing[6], md: spacing[8] },
  };
  
  return sizeMap[size] || sizeMap.medium;
};

/**
 * Get grid gap
 * Consistent gap spacing for grids
 * 
 * @param {string} size - 'small', 'medium', 'large'
 * @returns {Object} MUI responsive gap object
 * 
 * @example
 * sx={{ display: 'grid', gap: getGridGap('medium') }}
 */
export const getGridGap = (size = 'medium') => {
  const sizeMap = {
    small: { xs: spacing[2], sm: spacing[3], md: spacing[4] },
    medium: { xs: spacing[3], sm: spacing[4], md: spacing[6] },
    large: { xs: spacing[4], sm: spacing[6], md: spacing[8] },
  };
  
  return sizeMap[size] || sizeMap.medium;
};

/**
 * Validate spacing value is multiple of base unit (8px)
 * Useful for development/testing
 * 
 * @param {string|number} value - Spacing value to validate
 * @returns {boolean} True if valid
 */
export const isValidSpacing = (value) => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  const remValue = numValue * 16; // Convert rem to px
  return remValue % 8 === 0;
};

export default {
  getResponsiveSpacing,
  getResponsivePadding,
  getResponsiveMargin,
  getResponsiveGap,
  getSectionSpacing,
  getContainerPadding,
  getCardPadding,
  getGridGap,
  isValidSpacing,
};
