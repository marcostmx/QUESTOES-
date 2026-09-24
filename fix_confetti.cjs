const fs = require('fs');

// --- 1. Clean index.html ---
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Remove Hint Button
indexHtml = indexHtml.replace(/<button id="btn-show-hint"[\s\S]*?DICA\s*<\/button>\s*/, '');

// Remove Hint Area
indexHtml = indexHtml.replace(/<div id="hint-area"[\s\S]*?<\/div><div id="feedback-area"/, '<div id="feedback-area"');

fs.writeFileSync('index.html', indexHtml);

// --- 2. Clean and Update main.tsx ---
let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

// Add import
mainTsx = 'import confetti from "canvas-confetti";\n' + mainTsx;

// Remove DOM elements
mainTsx = mainTsx.replace(/const hintAreaEl = document\.getElementById\('hint-area'\)!;\n/, '');
mainTsx = mainTsx.replace(/const hintTextEl = document\.getElementById\('hint-text'\)!;\n/, '');
mainTsx = mainTsx.replace(/const btnShowHint = document\.getElementById\('btn-show-hint'\)!;\n/, '');

// Remove visibility toggles
mainTsx = mainTsx.replace(/btnShowHint\.classList\.add\('hidden'\);\n\s*hintAreaEl\.classList\.add\('hidden'\);/, '');
mainTsx = mainTsx.replace(/btnShowHint\.classList\.remove\('hidden'\);\n\s*hintAreaEl\.classList\.add\('hidden'\);/, '');
mainTsx = mainTsx.replace(/btnShowHint\.classList\.add\('hidden'\);/g, '');

// Remove showHint function
mainTsx = mainTsx.replace(/\(window as any\)\.showHint = function showHint\(\) \{[\s\S]*?btnShowHint\.classList\.add\('hidden'\);\n\};\n/, '');

// Add confetti to handleMCQChange
mainTsx = mainTsx.replace(/correctAnswers\.add\(currentQuestionIndex\);\n\s*\/\/ Correct animation/, `correctAnswers.add(currentQuestionIndex);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#22c55e', '#16a34a', '#15803d']
            });
            // Correct animation`);

// Add confetti to recordSelfAssessment
mainTsx = mainTsx.replace(/correctAnswers\.add\(currentQuestionIndex\);/, `correctAnswers.add(currentQuestionIndex);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#22c55e', '#16a34a', '#15803d']
        });`);

fs.writeFileSync('src/main.tsx', mainTsx);
