const fs = require('fs');
let content = fs.readFileSync('src/main.tsx', 'utf8');

content = content.replace(
    /(window as any)\.restartTest = function\(\) \{\n    \(window as any\)\.startSubject\(currentSubject\);\n\};/,
    `(window as any).restartTest = function() {
    if (currentSubject) {
        localStorage.removeItem('pr1_progress_' + currentSubject);
    }
    currentQuestionIndex = 0;
    answeredQuestions.clear();
    correctAnswers.clear();
    incorrectAnswers.clear();
    (window as any).startSubject(currentSubject);
};`
);

fs.writeFileSync('src/main.tsx', content);
console.log("Patched restartTest");
