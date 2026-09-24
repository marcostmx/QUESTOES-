const fs = require('fs');

let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

// The replacement was done twice, so let's clean it up using regex

mainTsx = mainTsx.replace(/let correctAnswers = new Set<number>\(\);\nlet incorrectAnswers = new Set<number>\(\);\nlet isReviewMode = false;\nlet searchQuery = '';\nlet answeredQuestions = new Set<number>\(\);\nlet correctAnswers = new Set<number>\(\);\nlet incorrectAnswers = new Set<number>\(\);\nlet isReviewMode = false;\nlet searchQuery = '';/, 
"let answeredQuestions = new Set<number>();\nlet correctAnswers = new Set<number>();\nlet incorrectAnswers = new Set<number>();\nlet isReviewMode = false;\nlet searchQuery = '';");

mainTsx = mainTsx.replace(/const statTotalEl = document.getElementById\('stat-total'\)!;\nconst statCorrectEl = document.getElementById\('stat-correct'\)!;\nconst statIncorrectEl = document.getElementById\('stat-incorrect'\)!;\nconst selfAssessAreaEl = document.getElementById\('self-assess-area'\)!;\nconst searchInputEl = document.getElementById\('search-input'\) as HTMLInputElement;\nconst reviewModeToggleEl = document.getElementById\('review-mode-toggle'\) as HTMLInputElement;\nconst progressBarEl = document.getElementById\('progress-bar'\)!;\nconst statTotalEl = document.getElementById\('stat-total'\)!;\nconst statCorrectEl = document.getElementById\('stat-correct'\)!;\nconst statIncorrectEl = document.getElementById\('stat-incorrect'\)!;\nconst selfAssessAreaEl = document.getElementById\('self-assess-area'\)!;\nconst searchInputEl = document.getElementById\('search-input'\) as HTMLInputElement;\nconst reviewModeToggleEl = document.getElementById\('review-mode-toggle'\) as HTMLInputElement;/, 
"const progressBarEl = document.getElementById('progress-bar')!;\nconst statTotalEl = document.getElementById('stat-total')!;\nconst statCorrectEl = document.getElementById('stat-correct')!;\nconst statIncorrectEl = document.getElementById('stat-incorrect')!;\nconst selfAssessAreaEl = document.getElementById('self-assess-area')!;\nconst searchInputEl = document.getElementById('search-input') as HTMLInputElement;\nconst reviewModeToggleEl = document.getElementById('review-mode-toggle') as HTMLInputElement;");

mainTsx = mainTsx.replace(/answeredQuestions\.clear\(\);\n    correctAnswers\.clear\(\);\n    incorrectAnswers\.clear\(\);\n    isReviewMode = false;\n    if\(reviewModeToggleEl\) reviewModeToggleEl\.checked = false;\n    searchQuery = "";\n    if\(searchInputEl\) searchInputEl\.value = "";\n    correctAnswers\.clear\(\);\n    incorrectAnswers\.clear\(\);\n    isReviewMode = false;\n    if\(reviewModeToggleEl\) reviewModeToggleEl\.checked = false;\n    searchQuery = "";\n    if\(searchInputEl\) searchInputEl\.value = "";/,
'answeredQuestions.clear();\n    correctAnswers.clear();\n    incorrectAnswers.clear();\n    isReviewMode = false;\n    if(reviewModeToggleEl) reviewModeToggleEl.checked = false;\n    searchQuery = "";\n    if(searchInputEl) searchInputEl.value = "";');

mainTsx = mainTsx.replace(/const q = questions\[currentQuestionIndex\];\n    if \(q\.interactionType === 'textarea' && !isReviewMode && !answeredQuestions\.has\(currentQuestionIndex\)\) \{\n        if\(selfAssessAreaEl\) selfAssessAreaEl\.classList\.remove\('hidden'\);\n    \}\n    const q = questions\[currentQuestionIndex\];\n    if \(q\.interactionType === 'textarea' && !isReviewMode && !answeredQuestions\.has\(currentQuestionIndex\)\) \{\n        if\(selfAssessAreaEl\) selfAssessAreaEl\.classList\.remove\('hidden'\);\n    \}/,
`const q = questions[currentQuestionIndex];
    if (q.interactionType === 'textarea' && !isReviewMode && !answeredQuestions.has(currentQuestionIndex)) {
        if(selfAssessAreaEl) selfAssessAreaEl.classList.remove('hidden');
    }`);

mainTsx = mainTsx.replace(/endScreenEl\.classList\.remove\('hidden'\);\n    if\(statTotalEl\) statTotalEl\.textContent = answeredQuestions\.size\.toString\(\);\n    if\(statCorrectEl\) statCorrectEl\.textContent = correctAnswers\.size\.toString\(\);\n    if\(statIncorrectEl\) statIncorrectEl\.textContent = incorrectAnswers\.size\.toString\(\);\n    if\(statTotalEl\) statTotalEl\.textContent = answeredQuestions\.size\.toString\(\);\n    if\(statCorrectEl\) statCorrectEl\.textContent = correctAnswers\.size\.toString\(\);\n    if\(statIncorrectEl\) statIncorrectEl\.textContent = incorrectAnswers\.size\.toString\(\);/,
`endScreenEl.classList.remove('hidden');
    if(statTotalEl) statTotalEl.textContent = answeredQuestions.size.toString();
    if(statCorrectEl) statCorrectEl.textContent = correctAnswers.size.toString();
    if(statIncorrectEl) statIncorrectEl.textContent = incorrectAnswers.size.toString();`);

fs.writeFileSync('src/main.tsx', mainTsx);
