const fs = require('fs');
let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

const oldShowAnswer = `(window as any).showAnswer = function showAnswer() {
    const q = questions[currentQuestionIndex];
    answeredQuestions.add(currentQuestionIndex);
    
    feedbackTextEl.textContent = q.gabarito;
    feedbackAreaEl.classList.remove('hidden');
    if (q.interactionType === 'textarea' && !answeredQuestions.has(currentQuestionIndex)) {
        if(selfAssessAreaEl) selfAssessAreaEl.classList.remove('hidden');
    } else {
        if(selfAssessAreaEl) selfAssessAreaEl.classList.add('hidden');
        answeredQuestions.add(currentQuestionIndex);
    }
    
    btnShowAnswer.classList.add('hidden');
    btnShowHint.classList.add('hidden');`;

const newShowAnswer = `(window as any).showAnswer = function showAnswer() {
    const q = questions[currentQuestionIndex];
    const isFirstTime = !answeredQuestions.has(currentQuestionIndex);
    
    feedbackTextEl.textContent = q.gabarito;
    feedbackAreaEl.classList.remove('hidden');
    
    if (q.interactionType === 'textarea' && isFirstTime) {
        if(selfAssessAreaEl) selfAssessAreaEl.classList.remove('hidden');
    } else {
        if(selfAssessAreaEl) selfAssessAreaEl.classList.add('hidden');
    }
    
    answeredQuestions.add(currentQuestionIndex);
    
    btnShowAnswer.classList.add('hidden');
    btnShowHint.classList.add('hidden');`;

mainTsx = mainTsx.replace(oldShowAnswer, newShowAnswer);
fs.writeFileSync('src/main.tsx', mainTsx);
