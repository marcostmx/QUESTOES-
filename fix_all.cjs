const fs = require('fs');

// 1. Remove Review Mode from index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/<label class="flex items-center cursor-pointer mr-4">[\s\S]*?<\/label>/g, '');

// 2. Enhance transitions in index.html styles
const newStyles = `
    <style>
        .fade-in { animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .slide-out-left { animation: slideOutLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .slide-out-right { animation: slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .slide-in-left { animation: slideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideOutLeft {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-30px); }
        }
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(30px); }
        }
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
    </style>
`;
indexHtml = indexHtml.replace(/<style>[\s\S]*?<\/style>/, newStyles);

fs.writeFileSync('index.html', indexHtml);

// 3. Update main.tsx
let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

// Remove isReviewMode
mainTsx = mainTsx.replace(/let isReviewMode = false;\n/, '');
mainTsx = mainTsx.replace(/\(window as any\)\.toggleReviewMode = function\(checked: boolean\) \{[\s\S]*?\};\n/, '');
mainTsx = mainTsx.replace(/if \(isReviewMode\) \{\s*questions = questions\.sort\(\(\) => Math\.random\(\) - 0\.5\);\s*\}/, '');
mainTsx = mainTsx.replace(/const reviewModeToggleEl = document.getElementById\('review-mode-toggle'\) as HTMLInputElement;\n/, '');

// Fix triggerTransitionAndLoad
const transitionLogic = `
function triggerTransitionAndLoad(index: number, direction: 'forward' | 'backward' = 'forward') {
    const outClass = direction === 'forward' ? 'slide-out-left' : 'slide-out-right';
    const inClass = direction === 'forward' ? 'slide-in-right' : 'slide-in-left';
    
    quizContainerEl.classList.remove('fade-in', 'slide-in-right', 'slide-in-left', 'slide-out-left', 'slide-out-right');
    quizContainerEl.classList.add(outClass);
    
    setTimeout(() => {
        loadQuestion(index);
        quizContainerEl.classList.remove(outClass);
        void quizContainerEl.offsetWidth; // trigger reflow
        quizContainerEl.classList.add(inClass);
    }, 300); // match animation duration
}
`;

mainTsx = mainTsx.replace(/function triggerTransitionAndLoad\(index: number\) \{[\s\S]*?\}/, transitionLogic);

// Update calls to triggerTransitionAndLoad
mainTsx = mainTsx.replace(/triggerTransitionAndLoad\(currentQuestionIndex \+ 1\);/g, "triggerTransitionAndLoad(currentQuestionIndex + 1, 'forward');");
mainTsx = mainTsx.replace(/triggerTransitionAndLoad\(currentQuestionIndex - 1\);/g, "triggerTransitionAndLoad(currentQuestionIndex - 1, 'backward');");
mainTsx = mainTsx.replace(/triggerTransitionAndLoad\(index\);/g, "triggerTransitionAndLoad(index, index > currentQuestionIndex ? 'forward' : 'backward');");

// Update init load to just fade-in or slide-in
mainTsx = mainTsx.replace(/quizContainerEl\.classList\.remove\('hidden'\);\n\s*initGrid\(\);\n\s*loadQuestion\(0\);/, `quizContainerEl.classList.remove('hidden');
        quizContainerEl.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-left', 'slide-out-right', 'fade-in');
        quizContainerEl.classList.add('fade-in');
        initGrid();
        loadQuestion(0);`);

fs.writeFileSync('src/main.tsx', mainTsx);
