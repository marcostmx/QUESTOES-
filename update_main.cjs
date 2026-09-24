const fs = require('fs');
let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

// 1. Add state variables for stats, review mode, and search
const stateVars = `
let correctAnswers = new Set<number>();
let incorrectAnswers = new Set<number>();
let isReviewMode = false;
let searchQuery = '';
`;
mainTsx = mainTsx.replace(
    /let answeredQuestions = new Set<number>\(\);/,
    '$&\n' + stateVars
);

// Add DOM elements for stats and self-assess
const domElements = `
const statTotalEl = document.getElementById('stat-total')!;
const statCorrectEl = document.getElementById('stat-correct')!;
const statIncorrectEl = document.getElementById('stat-incorrect')!;
const selfAssessAreaEl = document.getElementById('self-assess-area')!;
const searchInputEl = document.getElementById('search-input') as HTMLInputElement;
const reviewModeToggleEl = document.getElementById('review-mode-toggle') as HTMLInputElement;
`;
mainTsx = mainTsx.replace(
    /const progressBarEl = document.getElementById\('progress-bar'\)!;/,
    '$&\n' + domElements
);

// Reset stats in startSubject
mainTsx = mainTsx.replace(
    /answeredQuestions\.clear\(\);/,
    '$&\n    correctAnswers.clear();\n    incorrectAnswers.clear();\n    isReviewMode = false;\n    if(reviewModeToggleEl) reviewModeToggleEl.checked = false;\n    searchQuery = "";\n    if(searchInputEl) searchInputEl.value = "";'
);

// 2. Add handleSearch
const searchLogic = `
(window as any).handleSearch = function(query: string) {
    searchQuery = query.toLowerCase();
    initGrid();
};
`;
mainTsx = mainTsx.replace(
    /(window as any)\.restartTest = function\(\) \{/,
    searchLogic + '\n$1'
);

// Update initGrid to filter by searchQuery
mainTsx = mainTsx.replace(
    /questions\.forEach\(\(_, i\) => \{/,
    `questions.forEach((q, i) => {
        if (searchQuery) {
            const matchesText = q.text.toLowerCase().includes(searchQuery);
            const matchesGabarito = q.gabarito.toLowerCase().includes(searchQuery);
            let matchesOptions = false;
            if (q.options) {
                matchesOptions = q.options.some((opt: string) => opt.toLowerCase().includes(searchQuery));
            }
            if (!matchesText && !matchesGabarito && !matchesOptions) return;
        }`
);

// Update loadQuestion to respect isReviewMode
const reviewModeLoadLogic = `
    // Hide self assess initially
    if(selfAssessAreaEl) selfAssessAreaEl.classList.add('hidden');
    
    if (isReviewMode) {
        (window as any).showAnswer();
        if (q.interactionType === 'multiple-choice' && q.options) {
            const match = q.gabarito.match(/Alternativa\\s+([A-E])/i);
            if (match) {
                const correctLetter = match[1].toUpperCase();
                const correctIndex = correctLetter.charCodeAt(0) - 65;
                const correctLabel = document.getElementById(\`mcq-label-\${correctIndex}\`);
                if (correctLabel) {
                    const correctLetterBox = document.getElementById(\`mcq-letter-\${correctIndex}\`)!;
                    const correctText = document.getElementById(\`mcq-text-\${correctIndex}\`)!;
                    correctLabel.classList.add('border-green-500', 'bg-green-50', 'dark:bg-green-900/30');
                    correctLetterBox.classList.add('border-green-600', 'bg-green-600', 'text-white');
                    correctText.classList.add('text-green-900', 'dark:text-green-300', 'font-medium');
                }
            }
            // Disable all clicks in review mode
            document.querySelectorAll('.mcq-label').forEach((label) => label.classList.add('pointer-events-none'));
        }
    }
`;
mainTsx = mainTsx.replace(
    /btnPrev\.classList\.toggle\('cursor-not-allowed', index === 0\);/,
    '$&\n' + reviewModeLoadLogic
);

// 3. toggleReviewMode logic
const reviewModeToggleLogic = `
(window as any).toggleReviewMode = function(checked: boolean) {
    isReviewMode = checked;
    loadQuestion(currentQuestionIndex); // reload current question to apply mode
};
`;
mainTsx = mainTsx.replace(
    /(window as any)\.handleSearch = function/,
    reviewModeToggleLogic + '\n$1'
);

// 4. Update stats when answering MCQ
mainTsx = mainTsx.replace(
    /if \(selectedIndex === correctIndex\) \{/,
    `if (selectedIndex === correctIndex) {
            correctAnswers.add(currentQuestionIndex);`
);
mainTsx = mainTsx.replace(
    /\} else \{\s*\/\/ Incorrect animation/,
    `} else {
            incorrectAnswers.add(currentQuestionIndex);
            // Incorrect animation`
);

// Show self-assessment buttons in showAnswer if open-ended
mainTsx = mainTsx.replace(
    /feedbackAreaEl\.classList\.remove\('hidden'\);/,
    `feedbackAreaEl.classList.remove('hidden');
    const q = questions[currentQuestionIndex];
    if (q.interactionType === 'textarea' && !isReviewMode && !answeredQuestions.has(currentQuestionIndex)) {
        if(selfAssessAreaEl) selfAssessAreaEl.classList.remove('hidden');
    }`
);

// Record self assessment
const recordAssessmentLogic = `
(window as any).recordSelfAssessment = function(isCorrect: boolean) {
    if (isCorrect) {
        correctAnswers.add(currentQuestionIndex);
    } else {
        incorrectAnswers.add(currentQuestionIndex);
    }
    answeredQuestions.add(currentQuestionIndex);
    if(selfAssessAreaEl) selfAssessAreaEl.classList.add('hidden');
    
    // Update grid
    const btn = document.getElementById(\`grid-btn-\${currentQuestionIndex}\`);
    if (btn) {
        btn.className = 'grid-btn flex items-center justify-center w-10 h-10 rounded border text-xs font-bold transition-all hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer';
        btn.classList.add('border-blue-600', 'bg-blue-50', 'dark:bg-blue-900/30', 'text-blue-600', 'ring-2', 'ring-blue-500', 'ring-offset-2');
    }
    const progressPercent = Math.round((answeredQuestions.size / questions.length) * 100);
    progressTextEl.textContent = \`\${answeredQuestions.size} de \${questions.length}\`;
    progressBarEl.style.width = \`\${progressPercent}%\`;
};
`;
mainTsx = mainTsx.replace(
    /(window as any)\.showAnswer = function/,
    recordAssessmentLogic + '\n$1'
);

// Populate stats at the end
mainTsx = mainTsx.replace(
    /endScreenEl\.classList\.remove\('hidden'\);/,
    `endScreenEl.classList.remove('hidden');
    if(statTotalEl) statTotalEl.textContent = answeredQuestions.size.toString();
    if(statCorrectEl) statCorrectEl.textContent = correctAnswers.size.toString();
    if(statIncorrectEl) statIncorrectEl.textContent = incorrectAnswers.size.toString();`
);

fs.writeFileSync('src/main.tsx', mainTsx);
