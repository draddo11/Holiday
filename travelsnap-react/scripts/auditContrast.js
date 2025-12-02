/**
 * Script to run color contrast audit
 * Usage: node scripts/auditContrast.js
 */

import { printAuditResults } from '../src/theme/contrastAudit.js';

console.log('Running color contrast audit...\n');
printAuditResults();
