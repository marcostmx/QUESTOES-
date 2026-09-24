const fs = require('fs');
let main = fs.readFileSync('src/main.tsx', 'utf8');

main = main.replace(
    'const q = questions[index];\n    if (!q) return;',
    'const q = questions[index];\n    if (!q || typeof q !== "object") return;'
);

fs.writeFileSync('src/main.tsx', main);
