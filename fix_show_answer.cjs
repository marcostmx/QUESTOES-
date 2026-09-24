const fs = require('fs');

let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

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

if (!mainTsx.includes('recordSelfAssessment')) {
    mainTsx = mainTsx.replace(
        /(window as any)\.showAnswer = function/,
        recordAssessmentLogic + '\n$1'
    );
    fs.writeFileSync('src/main.tsx', mainTsx);
}
