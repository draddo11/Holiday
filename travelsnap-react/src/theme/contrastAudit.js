/**
 * Color Contrast Audit for TravelSnap Design System
 * Audits all text/background combinations for WCAG AA compliance
 */

import { colors } from './tokens';
import { auditColorCombination } from '../utils/contrastChecker';

/**
 * Common text/background combinations used in the application
 */
export const colorCombinations = [
  // Primary text on dark backgrounds
  {
    name: 'Primary text on dark background',
    textColor: colors.neutral[0], // White
    backgroundColor: colors.neutral[950], // Near black
    isLargeText: false,
    usage: 'Body text, headings on dark backgrounds',
  },
  {
    name: 'Primary text on paper background',
    textColor: colors.neutral[0], // White
    backgroundColor: colors.neutral[900], // Dark gray
    isLargeText: false,
    usage: 'Text on cards and paper surfaces',
  },
  
  // Secondary text on dark backgrounds
  {
    name: 'Secondary text on dark background',
    textColor: colors.neutral[400], // Medium gray
    backgroundColor: colors.neutral[950], // Near black
    isLargeText: false,
    usage: 'Subtitles, descriptions, secondary information',
  },
  {
    name: 'Secondary text on paper background',
    textColor: colors.neutral[400], // Medium gray
    backgroundColor: colors.neutral[900], // Dark gray
    isLargeText: false,
    usage: 'Secondary text on cards',
  },
  
  // Disabled text
  {
    name: 'Disabled text on dark background',
    textColor: colors.neutral[600], // Darker gray
    backgroundColor: colors.neutral[950], // Near black
    isLargeText: false,
    usage: 'Disabled form fields, inactive elements',
    note: 'WCAG Exception: Disabled elements are exempt from contrast requirements',
  },
  
  // Primary brand color text
  {
    name: 'Primary brand text on dark background',
    textColor: colors.primary[400], // Light blue
    backgroundColor: colors.neutral[950], // Near black
    isLargeText: false,
    usage: 'Links, accented text, icons',
  },
  {
    name: 'Primary brand text on paper',
    textColor: colors.primary[400], // Light blue
    backgroundColor: colors.neutral[900], // Dark gray
    isLargeText: false,
    usage: 'Links and accents on cards',
  },
  
  // Primary button (white text on primary background)
  {
    name: 'Primary button text',
    textColor: colors.neutral[0], // White
    backgroundColor: colors.primary[500], // Blue (#2563EB) - WCAG AA compliant
    isLargeText: false,
    usage: 'Primary button labels',
  },
  {
    name: 'Primary button text (hover)',
    textColor: colors.neutral[0], // White
    backgroundColor: colors.primary[600], // Darker blue
    isLargeText: false,
    usage: 'Primary button hover state',
  },
  {
    name: 'Primary button text (darker variant)',
    textColor: colors.neutral[0], // White
    backgroundColor: colors.primary[700], // Even darker blue
    isLargeText: false,
    usage: 'Primary button pressed state',
  },
  
  // Secondary button
  {
    name: 'Secondary button text',
    textColor: colors.neutral[0], // White
    backgroundColor: colors.secondary[500], // Slate
    isLargeText: false,
    usage: 'Secondary button labels',
  },
  
  // Semantic colors (success, warning, error)
  {
    name: 'Success text',
    textColor: colors.success, // Green
    backgroundColor: colors.neutral[950], // Near black
    isLargeText: false,
    usage: 'Success messages, positive indicators',
  },
  {
    name: 'Warning text',
    textColor: colors.warning, // Orange
    backgroundColor: colors.neutral[950], // Near black
    isLargeText: false,
    usage: 'Warning messages, caution indicators',
  },
  {
    name: 'Error text',
    textColor: colors.error, // Red
    backgroundColor: colors.neutral[950], // Near black
    isLargeText: false,
    usage: 'Error messages, validation errors',
  },
  
  // Light text on semi-transparent backgrounds
  {
    name: 'Text on glassmorphic card',
    textColor: colors.neutral[0], // White
    backgroundColor: colors.neutral[900], // Approximation of glass effect
    isLargeText: false,
    usage: 'Text on glassmorphic cards (backdrop blur)',
  },
  {
    name: 'Secondary text on glassmorphic card',
    textColor: colors.neutral[400], // Medium gray
    backgroundColor: colors.neutral[900], // Approximation of glass effect
    isLargeText: false,
    usage: 'Secondary text on glassmorphic cards',
  },
  
  // Placeholder text
  {
    name: 'Placeholder text in inputs',
    textColor: colors.neutral[400], // Medium gray - WCAG AA compliant
    backgroundColor: colors.neutral[950], // Near black (input background)
    isLargeText: false,
    usage: 'Input placeholder text',
  },
  
  // Large text variants (headings)
  {
    name: 'Large heading on dark background',
    textColor: colors.neutral[0], // White
    backgroundColor: colors.neutral[950], // Near black
    isLargeText: true,
    usage: 'H1, H2, H3 headings',
  },
  {
    name: 'Large secondary text',
    textColor: colors.neutral[400], // Medium gray
    backgroundColor: colors.neutral[950], // Near black
    isLargeText: true,
    usage: 'Large subtitles, hero subheadings',
  },
  
  // Chip/Badge backgrounds
  {
    name: 'Text on primary chip',
    textColor: colors.primary[400], // Light blue
    backgroundColor: 'rgba(59, 130, 246, 0.1)', // Semi-transparent blue
    isLargeText: false,
    usage: 'Chip labels with primary color',
    note: 'Semi-transparent background - actual contrast depends on underlying surface',
  },
  
  // Footer text
  {
    name: 'Footer secondary text',
    textColor: colors.neutral[400], // Medium gray - WCAG AA compliant
    backgroundColor: colors.neutral[950], // Near black
    isLargeText: false,
    usage: 'Footer copyright, legal links',
  },
];

/**
 * Run complete contrast audit
 * @returns {Object} Audit results with passing and failing combinations
 */
export function runContrastAudit() {
  const results = colorCombinations.map(combo => {
    const audit = auditColorCombination(
      combo.textColor,
      combo.backgroundColor,
      combo.isLargeText
    );
    
    return {
      ...combo,
      ...audit,
    };
  });
  
  const passing = results.filter(r => r.wcagAA.passes);
  const failing = results.filter(r => !r.wcagAA.passes);
  
  return {
    total: results.length,
    passing: passing.length,
    failing: failing.length,
    passRate: ((passing.length / results.length) * 100).toFixed(1),
    results,
    passingCombinations: passing,
    failingCombinations: failing,
  };
}

/**
 * Print audit results to console
 */
export function printAuditResults() {
  const audit = runContrastAudit();
  
  console.log('\n=== TravelSnap Color Contrast Audit ===\n');
  console.log(`Total combinations tested: ${audit.total}`);
  console.log(`Passing WCAG AA: ${audit.passing} (${audit.passRate}%)`);
  console.log(`Failing WCAG AA: ${audit.failing}\n`);
  
  if (audit.failing > 0) {
    console.log('❌ FAILING COMBINATIONS:\n');
    audit.failingCombinations.forEach(combo => {
      console.log(`  ${combo.name}`);
      console.log(`    Text: ${combo.textColor}`);
      console.log(`    Background: ${combo.backgroundColor}`);
      console.log(`    Contrast Ratio: ${combo.contrastRatio}:1 (Required: ${combo.wcagAA.required}:1)`);
      console.log(`    Usage: ${combo.usage}`);
      if (combo.note) {
        console.log(`    Note: ${combo.note}`);
      }
      console.log('');
    });
  }
  
  console.log('✅ PASSING COMBINATIONS:\n');
  audit.passingCombinations.forEach(combo => {
    console.log(`  ${combo.name}`);
    console.log(`    Contrast Ratio: ${combo.contrastRatio}:1 (Required: ${combo.wcagAA.required}:1)`);
    console.log(`    Usage: ${combo.usage}`);
    console.log('');
  });
  
  return audit;
}

export default {
  colorCombinations,
  runContrastAudit,
  printAuditResults,
};
