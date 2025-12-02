/**
 * Color Contrast Checker Utility
 * Ensures WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
 */

/**
 * Convert hex color to RGB
 * @param {string} hex - Hex color code (e.g., '#FFFFFF' or '#FFF')
 * @returns {Object} RGB values {r, g, b}
 */
export function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Handle shorthand hex (e.g., #FFF)
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return { r, g, b };
}

/**
 * Calculate relative luminance of a color
 * @param {Object} rgb - RGB values {r, g, b}
 * @returns {number} Relative luminance (0-1)
 */
export function getRelativeLuminance(rgb) {
  const { r, g, b } = rgb;
  
  // Convert to 0-1 range
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;
  
  // Apply gamma correction
  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
  
  // Calculate relative luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First color (hex)
 * @param {string} color2 - Second color (hex)
 * @returns {number} Contrast ratio (1-21)
 */
export function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const lum1 = getRelativeLuminance(rgb1);
  const lum2 = getRelativeLuminance(rgb2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standards
 * @param {number} ratio - Contrast ratio
 * @param {boolean} isLargeText - Whether text is large (18pt+ or 14pt+ bold)
 * @returns {Object} Compliance status
 */
export function meetsWCAG_AA(ratio, isLargeText = false) {
  const requiredRatio = isLargeText ? 3.0 : 4.5;
  const passes = ratio >= requiredRatio;
  
  return {
    passes,
    ratio: ratio.toFixed(2),
    required: requiredRatio,
    level: passes ? 'AA' : 'Fail',
  };
}

/**
 * Check if contrast ratio meets WCAG AAA standards
 * @param {number} ratio - Contrast ratio
 * @param {boolean} isLargeText - Whether text is large (18pt+ or 14pt+ bold)
 * @returns {Object} Compliance status
 */
export function meetsWCAG_AAA(ratio, isLargeText = false) {
  const requiredRatio = isLargeText ? 4.5 : 7.0;
  const passes = ratio >= requiredRatio;
  
  return {
    passes,
    ratio: ratio.toFixed(2),
    required: requiredRatio,
    level: passes ? 'AAA' : 'Fail',
  };
}

/**
 * Audit a text/background color combination
 * @param {string} textColor - Text color (hex)
 * @param {string} backgroundColor - Background color (hex)
 * @param {boolean} isLargeText - Whether text is large
 * @returns {Object} Audit results
 */
export function auditColorCombination(textColor, backgroundColor, isLargeText = false) {
  const ratio = getContrastRatio(textColor, backgroundColor);
  const aa = meetsWCAG_AA(ratio, isLargeText);
  const aaa = meetsWCAG_AAA(ratio, isLargeText);
  
  return {
    textColor,
    backgroundColor,
    isLargeText,
    contrastRatio: ratio.toFixed(2),
    wcagAA: aa,
    wcagAAA: aaa,
    recommendation: aa.passes ? 'Compliant' : 'Needs adjustment',
  };
}

/**
 * Find the closest compliant color
 * @param {string} textColor - Text color (hex)
 * @param {string} backgroundColor - Background color (hex)
 * @param {boolean} isLargeText - Whether text is large
 * @returns {Object} Suggested color adjustments
 */
export function suggestCompliantColor(textColor, backgroundColor, isLargeText = false) {
  const currentRatio = getContrastRatio(textColor, backgroundColor);
  const requiredRatio = isLargeText ? 3.0 : 4.5;
  
  if (currentRatio >= requiredRatio) {
    return {
      needsAdjustment: false,
      currentRatio: currentRatio.toFixed(2),
      message: 'Color combination is already compliant',
    };
  }
  
  // Suggest making text lighter or darker
  const textRgb = hexToRgb(textColor);
  const bgLuminance = getRelativeLuminance(hexToRgb(backgroundColor));
  
  const suggestion = bgLuminance > 0.5 
    ? 'Consider using a darker text color'
    : 'Consider using a lighter text color';
  
  return {
    needsAdjustment: true,
    currentRatio: currentRatio.toFixed(2),
    requiredRatio,
    suggestion,
  };
}

export default {
  hexToRgb,
  getRelativeLuminance,
  getContrastRatio,
  meetsWCAG_AA,
  meetsWCAG_AAA,
  auditColorCombination,
  suggestCompliantColor,
};
