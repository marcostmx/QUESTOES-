const fs = require('fs');

let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

// Inject the correctness tracking in handleMCQChange
mainTsx = mainTsx.replace(/\/\/ Correct animation/, `correctAnswers.add(currentQuestionIndex);
            // Correct animation`);
mainTsx = mainTsx.replace(/\/\/ Incorrect animation/, `incorrectAnswers.add(currentQuestionIndex);
            // Incorrect animation`);

// Rewrite updateGridAndProgress
const newGridBody = `function updateGridAndProgress() {
    if (questions.length === 0) return;
    
    const buttons = questionGridEl.querySelectorAll('.grid-btn');
    buttons.forEach((btn, i) => {
        const isAnswered = answeredQuestions.has(i);
        const isCorrect = correctAnswers.has(i);
        const isIncorrect = incorrectAnswers.has(i);
        const isActive = i === currentQuestionIndex;
        
        // Base styles reset
        btn.className = 'grid-btn flex items-center justify-center w-10 h-10 rounded border text-xs font-bold transition-all cursor-pointer';
        
        if (isCorrect) {
            btn.classList.add('border-green-600', 'bg-green-50', 'text-green-600', 'hover:bg-green-100');
        } else if (isIncorrect) {
            btn.classList.add('border-red-600', 'bg-red-50', 'text-red-600', 'hover:bg-red-100');
        } else if (isAnswered) {
            btn.classList.add('border-blue-600', 'bg-blue-50', 'text-blue-600', 'hover:bg-blue-100');
        } else {
            btn.classList.add('border-gray-200', 'bg-white', 'text-gray-500', 'hover:bg-gray-100');
        }
        
        if (isActive) {
            btn.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2');
            if(!isAnswered && !isCorrect && !isIncorrect) {
                btn.classList.remove('border-gray-200');
                btn.classList.add('border-gray-300');
            }
        }
    });

    const progressPercent = Math.round((answeredQuestions.size / questions.length) * 100);
    progressTextEl.textContent = \`\${answeredQuestions.size} de \${questions.length}\`;
    progressBarEl.style.width = \`\${progressPercent}%\`;
}`;

mainTsx = mainTsx.replace(/function updateGridAndProgress\(\) \{[\s\S]*?progressBarEl\.style\.width = \`\$\{\w+\}%\`;\n\}/, newGridBody);

fs.writeFileSync('src/main.tsx', mainTsx);
