const fs = require('fs');
let code = fs.readFileSync('src/bc_all.ts', 'utf8');

code = code.replace(/\}\]\s*;\s*basesCirurgicas\.push\s*\(/g, '},');
code = code.replace(/\}\)\s*;\s*basesCirurgicas\.push\s*\(/g, '},');

fs.writeFileSync('src/bc_all.ts', code);
