const fs = require('fs');
let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

// 1. Add DOM elements
const domInjection = `
const feedbackTextEl = document.getElementById('feedback-text')!;
const hintAreaEl = document.getElementById('hint-area')!;
const hintTextEl = document.getElementById('hint-text')!;
const btnShowHint = document.getElementById('btn-show-hint')!;
`;
mainTsx = mainTsx.replace(/const feedbackTextEl = document\.getElementById\('feedback-text'\)!;/, domInjection);

// 2. Hide hint area on answered
mainTsx = mainTsx.replace(/btnShowAnswer\.classList\.add\('hidden'\);/, `btnShowAnswer.classList.add('hidden');
        btnShowHint.classList.add('hidden');
        hintAreaEl.classList.add('hidden');`);

// 3. Show hint btn on unanswered
mainTsx = mainTsx.replace(/btnShowAnswer\.classList\.remove\('hidden'\);/, `btnShowAnswer.classList.remove('hidden');
        btnShowHint.classList.remove('hidden');
        hintAreaEl.classList.add('hidden');`);

// 4. Hide hint btn when answer is shown
mainTsx = mainTsx.replace(/btnShowAnswer\.classList\.add\('hidden'\);/g, `btnShowAnswer.classList.add('hidden');
    btnShowHint.classList.add('hidden');`);

// 5. Add showHint function
const showHintFn = `
(window as any).showHint = function showHint() {
    const q = questions[currentQuestionIndex];
    // Tenta usar a propriedade dica, senao gera um texto generico
    let hint = q.dica;
    if (!hint) {
        if (q.interactionType === 'multiple-choice') {
            hint = "Elimine as alternativas mais improváveis focando no conceito principal que o enunciado descreve.";
        } else {
            hint = "Releia os achados principais do caso e tente lembrar da fisiopatologia associada a esses sinais.";
        }
    }
    hintTextEl.textContent = hint;
    hintAreaEl.classList.remove('hidden');
    btnShowHint.classList.add('hidden');
};
`;
mainTsx = mainTsx.replace(/(window as any)\.showAnswer = function showAnswer\(\) \{/, showHintFn + '\n(window as any).showAnswer = function showAnswer() {');

fs.writeFileSync('src/main.tsx', mainTsx);
