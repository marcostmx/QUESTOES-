const fs = require('fs');

let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

// Remove selfAssessAreaEl check
mainTsx = mainTsx.replace(/\/\/ Hide self assess initially\n\s*if\(selfAssessAreaEl\) selfAssessAreaEl\.classList\.add\('hidden'\);\n/, '');

// Remove correctAnswers from handleMCQChange
mainTsx = mainTsx.replace(/correctAnswers\.add\(currentQuestionIndex\);/g, '');
mainTsx = mainTsx.replace(/incorrectAnswers\.add\(currentQuestionIndex\);/g, '');

fs.writeFileSync('src/main.tsx', mainTsx);
