const fs = require('fs');
let main = fs.readFileSync('src/main.tsx', 'utf8');

// The buggy loadQuestionSimulado
const buggyRegex = /\(window as any\)\.loadQuestionSimulado = function\(index: number\) \{[\s\S]*?progressTextEl\.textContent = `\$\{answeredQuestions\.size\} de \$\{questions\.length\}`;[\s\S]*?progressBarEl\.style\.width = `\$\{progressPercent\}%`;\n\};/m;

const newLoad = `(window as any).loadQuestionSimulado = function(index: number) {
    if (questions.length === 0) return;
    currentQuestionIndex = index;
    const q = questions[index];
    
    questionCounterEl.textContent = \`QUESTÃO \${index + 1}\`;
    questionTypeEl.textContent = q.type + (q.ogSubject ? ' • ' + q.ogSubject : '');
    questionTextEl.textContent = q.text;
    
    const isAnswered = answeredQuestions.has(index);
    let correctIndex = -1;
    
    if (q.gabarito) {
        const match = q.gabarito.match(/Alternativa\\s+([A-E])/i);
        if (match) {
            correctIndex = match[1].toUpperCase().charCodeAt(0) - 65;
        }
    }
    
    if (q.interactionType === 'multiple-choice' && q.options) {
        let optionsHtml = '<div class="space-y-3">';
        
        q.options.forEach((opt: string, i: number) => {
            const letter = String.fromCharCode(65 + i);
            
            let labelClasses = 'mcq-label flex items-start p-4 border rounded-xl cursor-pointer transition-all group shadow-sm ';
            let letterClasses = 'w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-sm font-bold mr-4 transition-all ';
            let textClasses = 'mt-1 transition-all ';
            
            if (isAnswered) {
                labelClasses += ' pointer-events-none ';
                if (i === correctIndex) {
                    labelClasses += 'border-green-500 bg-green-50';
                    letterClasses += 'border-green-600 bg-green-600 text-white';
                    textClasses += 'text-green-900 font-medium';
                } else {
                    labelClasses += 'border-gray-200 bg-white opacity-50';
                    letterClasses += 'border-gray-300 text-gray-400';
                    textClasses += 'text-gray-500';
                }
            } else {
                labelClasses += 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 bg-white';
                letterClasses += 'border-gray-300 text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500';
                textClasses += 'text-gray-700';
            }
            
            optionsHtml += \`
                <label id="mcq-label-\${i}" class="\${labelClasses}">
                    <div id="mcq-letter-\${i}" class="\${letterClasses}">
                        \${letter}
                    </div>
                    <input type="radio" name="mcq" value="\${i}" class="hidden" onchange="window.handleMCQChangeSimulado(\${i}, \${i === correctIndex})">
                    <span id="mcq-text-\${i}" class="\${textClasses}">\${opt}</span>
                </label>
            \`;
        });
        
        optionsHtml += '</div>';
        interactionAreaEl.innerHTML = optionsHtml;
        
        // Hide feedback area since this is a simulado
        feedbackAreaEl.classList.add('hidden');
        feedbackAreaEl.classList.remove('block');
        
    } else {
        // Fallback for textarea (discursive)
        interactionAreaEl.innerHTML = \`
            <textarea class="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm" 
                      rows="5" placeholder="Escreva sua resposta (simulado)..."></textarea>
            <div class="mt-4 flex justify-end">
                <button onclick="(window as any).recordSelfAssessmentSimulado(true)" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Marcar como respondida</button>
            </div>
        \`;
        feedbackAreaEl.classList.add('hidden');
        feedbackAreaEl.classList.remove('block');
    }
    
    // Update Grid and progress
    const buttons = questionGridEl.querySelectorAll('.grid-btn');
    buttons.forEach((btn, i) => {
        const isAns = answeredQuestions.has(i);
        const isCorr = correctAnswers.has(i);
        const isInc = incorrectAnswers.has(i);
        const isActive = i === index;
        
        btn.className = 'grid-btn flex items-center justify-center w-10 h-10 rounded border text-xs font-bold transition-all';
        
        if (isCorr) {
            btn.classList.add('border-green-600', 'bg-green-50', 'text-green-600', 'hover:bg-green-100');
        } else if (isInc) {
            btn.classList.add('border-red-600', 'bg-red-50', 'text-red-600', 'hover:bg-red-100');
        } else if (isAns) {
            btn.classList.add('border-blue-600', 'bg-blue-50', 'text-blue-600', 'hover:bg-blue-100');
        } else {
            btn.classList.add('border-gray-200', 'bg-white', 'text-gray-500', 'hover:bg-gray-100');
        }
        
        if (isActive) {
            btn.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2');
            if(!isAns && !isCorr && !isInc) {
                btn.classList.remove('border-gray-200');
                btn.classList.add('border-gray-300');
            }
        }
    });
    
    const progressPercent = Math.round((answeredQuestions.size / questions.length) * 100);
    progressTextEl.textContent = \`\${answeredQuestions.size} de \${questions.length}\`;
    progressBarEl.style.width = \`\${progressPercent}%\`;
};

(window as any).handleMCQChangeSimulado = function(selectedIndex: number, isCorrect: boolean) {
    if (answeredQuestions.has(currentQuestionIndex)) return;
    
    (window as any).recordSelfAssessment(isCorrect);
    (window as any).loadQuestionSimulado(currentQuestionIndex);
};

(window as any).recordSelfAssessmentSimulado = function(isCorrect: boolean) {
    (window as any).recordSelfAssessment(isCorrect);
    (window as any).loadQuestionSimulado(currentQuestionIndex);
};
`;

main = main.replace(buggyRegex, newLoad);
fs.writeFileSync('src/main.tsx', main);
console.log("Fixed simulado loadQuestion");
