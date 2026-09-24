const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');
// Remove the buttons from end-screen
indexHtml = indexHtml.replace(/<div class="flex space-x-4">[\s\S]*?<\/div>/, '');

// Fix legend
indexHtml = indexHtml.replace(/Respondida/, 'Correta');
indexHtml = indexHtml.replace(/bg-blue-50 border border-blue-600/, 'bg-green-50 border border-green-600');
indexHtml = indexHtml.replace(/Não Respondida/, 'Incorreta');
indexHtml = indexHtml.replace(/bg-gray-50 border border-gray-200/, 'bg-red-50 border border-red-600');

// The 3rd and 4th legends need adjusting. 
// "Não Respondida" needs to be added back since I replaced it with "Incorreta"
indexHtml = indexHtml.replace(/<div class="flex items-center">\s*<div class="w-3 h-3 bg-white border border-gray-300 ring-2 ring-blue-500 rounded mr-2"><\/div>\s*Atual\s*<\/div>/, `<div class="flex items-center">
    <div class="w-3 h-3 bg-gray-50 border border-gray-200 rounded mr-2"></div> Não Respondida
</div>
<div class="flex items-center">
    <div class="w-3 h-3 bg-white border border-gray-300 ring-2 ring-blue-500 rounded mr-2"></div> Atual
</div>`);

// Re-add self-assess-area
const selfAssessHtml = `
<div id="self-assess-area" class="hidden mt-4 pt-4 border-t border-green-200 flex items-center justify-between">
    <span class="text-sm font-semibold text-green-900">Como você se saiu?</span>
    <div class="flex space-x-3">
        <button onclick="window.recordSelfAssessment(false)" class="px-4 py-2 bg-red-100 text-red-700 text-sm font-bold rounded-lg hover:bg-red-200 transition-colors">Errei</button>
        <button onclick="window.recordSelfAssessment(true)" class="px-4 py-2 bg-green-200 text-green-800 text-sm font-bold rounded-lg hover:bg-green-300 transition-colors">Acertei</button>
    </div>
</div>
</div> <!-- closing feedback-area inner div -->
`;
indexHtml = indexHtml.replace(/<div id="feedback-text"[\s\S]*?<\/div>\s*<\/div>/, `<div id="feedback-text" class="text-green-900 whitespace-pre-line text-sm md:text-base leading-relaxed">
    <!-- Feedback will be injected here -->
</div>
${selfAssessHtml}`);

fs.writeFileSync('index.html', indexHtml);

let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

// Add states
mainTsx = mainTsx.replace(/let answeredQuestions = new Set<number>\(\);/, `let answeredQuestions = new Set<number>();
let correctAnswers = new Set<number>();
let incorrectAnswers = new Set<number>();`);

// Clear states
mainTsx = mainTsx.replace(/answeredQuestions\.clear\(\);/, `answeredQuestions.clear();
    correctAnswers.clear();
    incorrectAnswers.clear();`);

// Add selfAssessAreaEl
mainTsx = mainTsx.replace(/const progressBarEl = document.getElementById\('progress-bar'\)!;/, `const progressBarEl = document.getElementById('progress-bar')!;
const selfAssessAreaEl = document.getElementById('self-assess-area')!;`);

// Hide on load
mainTsx = mainTsx.replace(/feedbackAreaEl\.classList\.add\('hidden'\);\n\s*btnShowAnswer\.classList\.remove\('hidden'\);/, `feedbackAreaEl.classList.add('hidden');
        if(selfAssessAreaEl) selfAssessAreaEl.classList.add('hidden');
        btnShowAnswer.classList.remove('hidden');`);

// Show on answer (textarea)
mainTsx = mainTsx.replace(/feedbackTextEl\.textContent = q\.gabarito;\n\s*feedbackAreaEl\.classList\.remove\('hidden'\);/, `feedbackTextEl.textContent = q.gabarito;
    feedbackAreaEl.classList.remove('hidden');
    if (q.interactionType === 'textarea' && !answeredQuestions.has(currentQuestionIndex)) {
        if(selfAssessAreaEl) selfAssessAreaEl.classList.remove('hidden');
    } else {
        if(selfAssessAreaEl) selfAssessAreaEl.classList.add('hidden');
        answeredQuestions.add(currentQuestionIndex);
    }`);

// Update handleMCQChange
mainTsx = mainTsx.replace(/const selectedText = document\.getElementById\(\`mcq-text-\$\{selectedIndex\}\`\)!;\n\s*selectedLabel\.classList\.add\('border-blue-500', 'bg-blue-50'\);\n\s*selectedLetterBox\.classList\.add\('border-blue-600', 'bg-blue-600', 'text-white'\);\n\s*selectedText\.classList\.add\('text-blue-900', 'font-medium'\);\n\s*if \(selectedIndex === correctIndex\) \{/, `const selectedText = document.getElementById(\`mcq-text-\${selectedIndex}\`)!;
        
        selectedLabel.classList.add('border-blue-500', 'bg-blue-50');
        selectedLetterBox.classList.add('border-blue-600', 'bg-blue-600', 'text-white');
        selectedText.classList.add('text-blue-900', 'font-medium');
        
        if (selectedIndex === correctIndex) {
            correctAnswers.add(currentQuestionIndex);
        } else {
            incorrectAnswers.add(currentQuestionIndex);
        }
        
        if (selectedIndex === correctIndex) {`);

// Add recordSelfAssessment
const recordCode = `
(window as any).recordSelfAssessment = function(isCorrect: boolean) {
    if (isCorrect) {
        correctAnswers.add(currentQuestionIndex);
    } else {
        incorrectAnswers.add(currentQuestionIndex);
    }
    answeredQuestions.add(currentQuestionIndex);
    if(selfAssessAreaEl) selfAssessAreaEl.classList.add('hidden');
    updateGridAndProgress();
};
`;

mainTsx = mainTsx.replace(/function updateGridAndProgress\(\) \{/, `${recordCode}\nfunction updateGridAndProgress() {`);

// Update updateGridAndProgress
const oldGridLogic = `if (answeredQuestions.has(i)) {
            btn.className = 'grid-btn flex items-center justify-center w-10 h-10 rounded border text-xs font-bold transition-all hover:bg-blue-100 cursor-pointer border-blue-600 bg-blue-50 text-blue-600';
        } else {
            btn.className = 'grid-btn flex items-center justify-center w-10 h-10 rounded border text-xs font-bold transition-all hover:bg-gray-100 cursor-pointer border-gray-200 bg-white text-gray-500';
        }`;
const newGridLogic = `if (correctAnswers.has(i)) {
            btn.className = 'grid-btn flex items-center justify-center w-10 h-10 rounded border text-xs font-bold transition-all hover:bg-green-100 cursor-pointer border-green-600 bg-green-50 text-green-600';
        } else if (incorrectAnswers.has(i)) {
            btn.className = 'grid-btn flex items-center justify-center w-10 h-10 rounded border text-xs font-bold transition-all hover:bg-red-100 cursor-pointer border-red-600 bg-red-50 text-red-600';
        } else if (answeredQuestions.has(i)) {
            btn.className = 'grid-btn flex items-center justify-center w-10 h-10 rounded border text-xs font-bold transition-all hover:bg-blue-100 cursor-pointer border-blue-600 bg-blue-50 text-blue-600';
        } else {
            btn.className = 'grid-btn flex items-center justify-center w-10 h-10 rounded border text-xs font-bold transition-all hover:bg-gray-100 cursor-pointer border-gray-200 bg-white text-gray-500';
        }`;
mainTsx = mainTsx.replace(oldGridLogic, newGridLogic);

fs.writeFileSync('src/main.tsx', mainTsx);
