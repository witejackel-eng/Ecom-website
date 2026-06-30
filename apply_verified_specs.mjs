import { readFileSync, writeFileSync } from 'fs';
const src = 'C:/Users/Aditya/enterprise-tech-store-rollback/workspace/enterprise-tech-store/src/data/products.ts';
const lines = readFileSync(src, 'utf8').split(/\r?\n/);
const out = [];
let i = 0;
while (i < lines.length) {
  if (lines[i].includes('id: "cp-unc-da41l3c-q"')) {
    // Skip until we hit 'specs: {'
    while (i < lines.length && !lines[i].includes('specs: {')) { out.push(lines[i]); i++; }
    // Output 'specs: {'
    out.push(lines[i]); i++;
    // Null out all spec lines
    while (i < lines.length && !lines[i].includes('    },')) { out.push(lines[i]); i++; }
    // We hit a line with '    },' — could be end of specs or product. Skip all '    },' lines
    while (i < lines.length && lines[i].trim() === '},') i++;
    // Continue normally
  } else {
    out.push(lines[i]); i++;
  }
}
writeFileSync(src, out.join('\n'));
console.log('step1 done');