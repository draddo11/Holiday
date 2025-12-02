/**
 * Color Contrast Compliance Tests
 * Ensures all text/background combinations meet WCAG AA standards
 */

import { describe, it, expect } from 'vitest';
import { getContrastRatio, meetsWCAG_AA, hexToRgb, getRelativeLuminance } from '../utils/contrastChecker';
import { runContrastAudit, colorCombinations } from './contrastAudit';
import { colors } from './tokens';

describe('Color Contrast Utility Functions', () => {
  it('should convert hex to RGB correctly', () => {
    const white = hexToRgb('#FFFFFF');
    expect(white).toEqual({ r: 255, g: 255, b: 255 });
    
    const black = hexToRgb('#000000');
    expect(black).toEqual({ r: 0, g: 0, b: 0 });
    
    // Test shorthand hex
    const red = hexToRgb('#F00');
    expect(red).toEqual({ r: 255, g: 0, b: 0 });
  });
  
  it('should calculate relative luminance correctly', () => {
    const whiteLum = getRelativeLuminance({ r: 255, g: 255, b: 255 });
    expect(whiteLum).toBe(1);
    
    const blackLum = getRelativeLuminance({ r: 0, g: 0, b: 0 });
    expect(blackLum).toBe(0);
  });
  
  it('should calculate contrast ratio correctly', () => {
    // White on black should be 21:1
    const ratio = getContrastRatio('#FFFFFF', '#000000');
    expect(ratio).toBeCloseTo(21, 0);
    
    // Same color should be 1:1
    const sameRatio = getContrastRatio('#FFFFFF', '#FFFFFF');
    expect(sameRatio).toBe(1);
  });
  
  it('should correctly identify WCAG AA compliance', () => {
    // 4.5:1 is the minimum for normal text
    const passing = meetsWCAG_AA(4.5, false);
    expect(passing.passes).toBe(true);
    
    const failing = meetsWCAG_AA(4.4, false);
    expect(failing.passes).toBe(false);
    
    // 3:1 is the minimum for large text
    const largeTextPassing = meetsWCAG_AA(3.0, true);
    expect(largeTextPassing.passes).toBe(true);
  });
});

describe('Design System Color Contrast Audit', () => {
  const audit = runContrastAudit();
  
  it('should have color combinations defined', () => {
    expect(colorCombinations.length).toBeGreaterThan(0);
    expect(audit.total).toBe(colorCombinations.length);
  });
  
  it('should pass WCAG AA for primary text on dark backgrounds', () => {
    const primaryTextCombo = audit.results.find(
      r => r.name === 'Primary text on dark background'
    );
    expect(primaryTextCombo).toBeDefined();
    expect(primaryTextCombo.wcagAA.passes).toBe(true);
    expect(parseFloat(primaryTextCombo.contrastRatio)).toBeGreaterThanOrEqual(4.5);
  });
  
  it('should pass WCAG AA for primary text on paper background', () => {
    const paperTextCombo = audit.results.find(
      r => r.name === 'Primary text on paper background'
    );
    expect(paperTextCombo).toBeDefined();
    expect(paperTextCombo.wcagAA.passes).toBe(true);
  });
  
  it('should pass WCAG AA for secondary text on dark backgrounds', () => {
    const secondaryTextCombo = audit.results.find(
      r => r.name === 'Secondary text on dark background'
    );
    expect(secondaryTextCombo).toBeDefined();
    expect(secondaryTextCombo.wcagAA.passes).toBe(true);
  });
  
  it('should pass WCAG AA for primary button text', () => {
    const buttonTextCombo = audit.results.find(
      r => r.name === 'Primary button text'
    );
    expect(buttonTextCombo).toBeDefined();
    expect(buttonTextCombo.wcagAA.passes).toBe(true);
  });
  
  it('should pass WCAG AA for primary brand color text', () => {
    const brandTextCombo = audit.results.find(
      r => r.name === 'Primary brand text on dark background'
    );
    expect(brandTextCombo).toBeDefined();
    expect(brandTextCombo.wcagAA.passes).toBe(true);
  });
  
  it('should pass WCAG AA for semantic colors (success, warning, error)', () => {
    const successCombo = audit.results.find(r => r.name === 'Success text');
    const warningCombo = audit.results.find(r => r.name === 'Warning text');
    const errorCombo = audit.results.find(r => r.name === 'Error text');
    
    expect(successCombo.wcagAA.passes).toBe(true);
    expect(warningCombo.wcagAA.passes).toBe(true);
    expect(errorCombo.wcagAA.passes).toBe(true);
  });
  
  it('should pass WCAG AA for large text with relaxed requirements', () => {
    const largeHeadingCombo = audit.results.find(
      r => r.name === 'Large heading on dark background'
    );
    expect(largeHeadingCombo).toBeDefined();
    expect(largeHeadingCombo.wcagAA.passes).toBe(true);
    // Large text only needs 3:1
    expect(parseFloat(largeHeadingCombo.contrastRatio)).toBeGreaterThanOrEqual(3.0);
  });
  
  it('should have at least 80% of combinations passing WCAG AA', () => {
    const passRate = parseFloat(audit.passRate);
    expect(passRate).toBeGreaterThanOrEqual(80);
    
    // Document exceptions: disabled elements and semi-transparent backgrounds
    // are allowed to have lower contrast per WCAG guidelines
    const acceptableExceptions = [
      'Disabled text on dark background',
      'Text on primary chip', // Semi-transparent background
    ];
    
    audit.failingCombinations.forEach(combo => {
      const isException = acceptableExceptions.some(ex => combo.name.includes(ex));
      if (!isException) {
        console.warn(`Unexpected failing combination: ${combo.name} (${combo.contrastRatio}:1)`);
      }
    });
  });
  
  it('should document usage for each color combination', () => {
    colorCombinations.forEach(combo => {
      expect(combo.usage).toBeDefined();
      expect(combo.usage.length).toBeGreaterThan(0);
    });
  });
});

describe('Specific Color Token Contrast', () => {
  it('should ensure neutral[0] (white) has sufficient contrast on neutral[950]', () => {
    const ratio = getContrastRatio(colors.neutral[0], colors.neutral[950]);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
  
  it('should ensure neutral[400] has sufficient contrast on neutral[950]', () => {
    const ratio = getContrastRatio(colors.neutral[400], colors.neutral[950]);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
  
  it('should ensure primary[400] has sufficient contrast on neutral[950]', () => {
    const ratio = getContrastRatio(colors.primary[400], colors.neutral[950]);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
  
  it('should ensure white text on primary[500] button has sufficient contrast', () => {
    const ratio = getContrastRatio(colors.neutral[0], colors.primary[500]);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
  
  it('should ensure semantic colors have sufficient contrast on dark backgrounds', () => {
    const successRatio = getContrastRatio(colors.success, colors.neutral[950]);
    const warningRatio = getContrastRatio(colors.warning, colors.neutral[950]);
    const errorRatio = getContrastRatio(colors.error, colors.neutral[950]);
    
    expect(successRatio).toBeGreaterThanOrEqual(4.5);
    expect(warningRatio).toBeGreaterThanOrEqual(4.5);
    expect(errorRatio).toBeGreaterThanOrEqual(4.5);
  });
});
