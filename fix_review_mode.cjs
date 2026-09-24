const fs = require('fs');

let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

// We will just do a regex replace for `isReviewMode` if needed, but wait:
// Let's remove the block in loadQuestion
mainTsx = mainTsx.replace(/\s*if \(isReviewMode\) \{[\s\S]*?\/\/ Disable all clicks in review mode\s*document\.querySelectorAll\('\.mcq-label'\)\.forEach\(\(label\) => label\.classList\.add\('pointer-events-none'\)\);\s*\}/g, '');

// Clean any empty lines that might have been left
mainTsx = mainTsx.replace(/\n\s*\n\s*\n/g, '\n\n');

// Also remove `toggleReviewMode` if it exists
mainTsx = mainTsx.replace(/\(window as any\)\.toggleReviewMode = function\(checked: boolean\) \{[\s\S]*?\};\n/g, '');

fs.writeFileSync('src/main.tsx', mainTsx);
