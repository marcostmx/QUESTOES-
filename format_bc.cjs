const fs = require('fs');
let code = fs.readFileSync('src/bc_all.ts', 'utf8');

// Replace all `];basesCirurgicas.push(` with `,`
code = code.replace(/\}\];\nbasesCirurgicas\.push\(\n/g, '},\n');
code = code.replace(/\}\];basesCirurgicas\.push\(/g, '},');

// Replace any `});basesCirurgicas.push(`
code = code.replace(/\}\);\nbasesCirurgicas\.push\(\n/g, '},\n');
code = code.replace(/\}\);basesCirurgicas\.push\(/g, '},');

// Find all the trailing closures
code = code.replace(/\}\);\n\];\n$/g, '}\n];\n');
code = code.replace(/\}\);\n$/g, '}\n];\n');

fs.writeFileSync('src/bc_all.ts', code);
