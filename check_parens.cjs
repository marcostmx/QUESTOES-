const fs = require('fs');
let code = fs.readFileSync('src/bc_all.ts', 'utf8');
let stripped = code.replace(/`([^`\\]|\\.)*`/g, '``')
                   .replace(/"([^"\\]|\\.)*"/g, '""')
                   .replace(/'([^'\\]|\\.)*'/g, "''")
                   .replace(/\/\/.*$/gm, '')
                   .replace(/\/\*[\s\S]*?\*\//g, '');
let open = 0;
for (let i = 0; i < stripped.length; i++) {
  if (stripped[i] === '(') open++;
  if (stripped[i] === ')') open--;
}
console.log('Unclosed parens:', open);
