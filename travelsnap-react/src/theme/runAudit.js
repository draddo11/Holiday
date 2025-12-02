/**
 * Run contrast audit and display results
 */

import { runContrastAudit } from './contrastAudit.js';

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
  console.log('');
});
