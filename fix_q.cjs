const fs = require('fs');
let main = fs.readFileSync('src/main.tsx', 'utf8');

main = main.replace(
    'const q = questions[index];',
    'const q = questions[index];\n    if (!q) return;'
);

fs.writeFileSync('src/main.tsx', main);
console.log("Patched loadQuestionSimulado safety");
