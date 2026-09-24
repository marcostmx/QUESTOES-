const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Remove search input
indexHtml = indexHtml.replace(/<div class="p-4 border-b border-gray-200 dark:border-\[#222\]">[\s\S]*?<\/div>\s*<\/div>/, '');

// Remove stats section
indexHtml = indexHtml.replace(/<div class="grid grid-cols-3 gap-4 mb-8 w-full max-w-md">[\s\S]*?<\/div>/, '');

// Remove self assess
indexHtml = indexHtml.replace(/<div id="self-assess-area"[\s\S]*?<\/div>\s*<\/div>/, '');

// Remove dark mode toggles (home)
indexHtml = indexHtml.replace(/<button onclick="window.toggleTheme\(\)" class="absolute top-6 right-6[^>]*>[\s\S]*?<\/button>/, '');
// Remove dark mode toggles (header)
indexHtml = indexHtml.replace(/<button onclick="window.toggleTheme\(\)" class="text-gray-500[^>]*>[\s\S]*?<\/button>/, '');
// Remove theme script
indexHtml = indexHtml.replace(/<script>\s*function toggleTheme\(\) \{[\s\S]*?\}[\s\S]*?<\/script>/, '');
// Let's remove the dark class from html tag if it exists (it's dynamically added but let's be sure).
indexHtml = indexHtml.replace(/<html[^>]*>/, '<html lang="pt-BR">');
// Remove the styles for the toggle
// indexHtml = indexHtml.replace(/input:checked ~ .dot \{ transform: translateX\(100%\); background-color: #3B82F6; \}[\s\S]*?\.dark input:checked ~ \.block \{ background-color: rgba\(30, 58, 138, 0\.5\); border-color: #1E3A8A; \}/, 'input:checked ~ .dot { transform: translateX(100%); background-color: #3B82F6; }\n        input:checked ~ .block { background-color: #DBEAFE; border-color: #93C5FD; }');
indexHtml = indexHtml.replace(/\.dark input:checked ~ \.block \{ background-color: rgba\(30, 58, 138, 0\.5\); border-color: #1E3A8A; \}/, '');

fs.writeFileSync('index.html', indexHtml);

let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

mainTsx = mainTsx.replace(/let correctAnswers = new Set<number>\(\);\nlet incorrectAnswers = new Set<number>\(\);\n/, '');

mainTsx = mainTsx.replace(/const statTotalEl = document.getElementById\('stat-total'\)!;\nconst statCorrectEl = document.getElementById\('stat-correct'\)!;\nconst statIncorrectEl = document.getElementById\('stat-incorrect'\)!;\nconst selfAssessAreaEl = document.getElementById\('self-assess-area'\)!;\nconst searchInputEl = document.getElementById\('search-input'\) as HTMLInputElement;\n/, '');

// Reset logic in startSubject
mainTsx = mainTsx.replace(/correctAnswers\.clear\(\);\n\s*incorrectAnswers\.clear\(\);\n\s*/, '');
mainTsx = mainTsx.replace(/searchQuery = "";\n\s*if\(searchInputEl\) searchInputEl\.value = "";\n\s*/, '');

mainTsx = mainTsx.replace(/let searchQuery = '';\n/, '');

// handleSearch logic
mainTsx = mainTsx.replace(/\(window as any\)\.handleSearch = function\(query: string\) \{[\s\S]*?\};\n/, '');

// initGrid filtering
mainTsx = mainTsx.replace(/if \(searchQuery\) \{[\s\S]*?if \(!matchesText && !matchesGabarito && !matchesOptions\) return;\n\s*\}/, '');

// self assess hide
mainTsx = mainTsx.replace(/\/\/ Hide self assess initially\n\s*if\(selfAssessAreaEl\) selfAssessAreaEl\.classList\.add\('hidden'\);\n\s*/, '');

// the correctAnswers and incorrectAnswers logic in handleMCQChange
mainTsx = mainTsx.replace(/correctAnswers\.add\(currentQuestionIndex\);/, '');
mainTsx = mainTsx.replace(/incorrectAnswers\.add\(currentQuestionIndex\);/, '');

mainTsx = mainTsx.replace(/if\(selfAssessAreaEl\) selfAssessAreaEl\.classList\.remove\('hidden'\);/, '');
mainTsx = mainTsx.replace(/if\(statTotalEl\) statTotalEl\.textContent = answeredQuestions\.size\.toString\(\);\n\s*if\(statCorrectEl\) statCorrectEl\.textContent = correctAnswers\.size\.toString\(\);\n\s*if\(statIncorrectEl\) statIncorrectEl\.textContent = incorrectAnswers\.size\.toString\(\);\n\s*/, '');

// recordSelfAssessment logic
mainTsx = mainTsx.replace(/\(window as any\)\.recordSelfAssessment = function\(isCorrect: boolean\) \{[\s\S]*?\};\n/, '');

fs.writeFileSync('src/main.tsx', mainTsx);
