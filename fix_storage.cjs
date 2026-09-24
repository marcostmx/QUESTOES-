const fs = require('fs');

let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

const persistenceLogic = `
function getStorageKey() {
    return \`pr1_progress_\${currentSubject}\`;
}

function saveProgress() {
    if (!currentSubject) return;
    const state = {
        currentQuestionIndex,
        answeredQuestions: Array.from(answeredQuestions),
        correctAnswers: Array.from(correctAnswers),
        incorrectAnswers: Array.from(incorrectAnswers),
    };
    localStorage.setItem(getStorageKey(), JSON.stringify(state));
}

function loadProgress() {
    if (!currentSubject) return false;
    const saved = localStorage.getItem(getStorageKey());
    if (saved) {
        try {
            const state = JSON.parse(saved);
            currentQuestionIndex = state.currentQuestionIndex || 0;
            answeredQuestions = new Set(state.answeredQuestions || []);
            correctAnswers = new Set(state.correctAnswers || []);
            incorrectAnswers = new Set(state.incorrectAnswers || []);
            return true;
        } catch (e) {
            console.error("Error loading progress", e);
        }
    }
    return false;
}
`;

mainTsx = mainTsx.replace(/let incorrectAnswers = new Set<number>\(\);\n/, 'let incorrectAnswers = new Set<number>();\n' + persistenceLogic);

mainTsx = mainTsx.replace(/progressBarEl\.style\.width = \`\$\{progressPercent\}%\`;\n\}/, 'progressBarEl.style.width = `${progressPercent}%`;\n    saveProgress();\n}');

const newStartLogic = `
    questions = [...sourceQuestions];
    
    const hasProgress = loadProgress();
    if (!hasProgress) {
        currentQuestionIndex = 0;
        answeredQuestions.clear();
        correctAnswers.clear();
        incorrectAnswers.clear();
    }
`;
mainTsx = mainTsx.replace(/questions = \[\.\.\.sourceQuestions\];[\s\S]*?\/\/ Reset state[\s\S]*?incorrectAnswers\.clear\(\);/, newStartLogic);

mainTsx = mainTsx.replace(/quizContainerEl\.classList\.add\('fade-in'\);\n\s*initGrid\(\);\n\s*loadQuestion\(0\);/, "quizContainerEl.classList.add('fade-in');\n        initGrid();\n        loadQuestion(currentQuestionIndex);");

fs.writeFileSync('src/main.tsx', mainTsx);
