const fs = require('fs');

// 1. Fix main.tsx (data.answered -> data.answeredQuestions)
let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');
mainTsx = mainTsx.replace(/data\.answered \? data\.answered\.length : 0/g, "data.answeredQuestions ? data.answeredQuestions.length : 0");
mainTsx = mainTsx.replace(/data\.correct \? data\.correct\.length : 0/g, "data.correctAnswers ? data.correctAnswers.length : 0");
fs.writeFileSync('src/main.tsx', mainTsx);

// 2. Fix index.html (MedQuest -> Estudo PR1, md:flex -> lg:flex)
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/MedQuest/g, "Estudo PR1");

// Fix sidebar visibility
indexHtml = indexHtml.replace(/hidden md:flex flex-col shadow-sm/g, "hidden lg:flex flex-col shadow-sm");
indexHtml = indexHtml.replace(/<div class="md:hidden mr-4 bg-blue-600/g, '<div class="lg:hidden mr-4 bg-blue-600');

fs.writeFileSync('index.html', indexHtml);
console.log("Patched successfully");
