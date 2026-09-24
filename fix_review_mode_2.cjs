const fs = require('fs');

let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

mainTsx = mainTsx.replace(/let isReviewMode = false;\n/, 'let isReviewMode = false;\n');
mainTsx = mainTsx.replace(/isReviewMode = false;\n\s*if\(reviewModeToggleEl\) reviewModeToggleEl\.checked = false;/, '');
mainTsx = mainTsx.replace(/if \(q\.interactionType === 'textarea' && !isReviewMode && !answeredQuestions\.has\(currentQuestionIndex\)\) \{\n\s*\}/, '');

// Re-implement the toggle mode
const toggleCode = `
(window as any).toggleReviewMode = function(checked: boolean) {
    isReviewMode = checked;
    if (currentSubject) {
        (window as any).startSubject(currentSubject);
    }
};
`;
if (!mainTsx.includes('toggleReviewMode')) {
    mainTsx = mainTsx.replace(/\/\/ DOM Elements/, toggleCode + '\n// DOM Elements');
}

// Implement shuffle in startSubject
const startSubjectRegex = /(if \(subject === 'farmacologia'\) \{[\s\S]*?headerSubjectTitleEl\.textContent = 'Bases Cirúrgicas PR1';\n\s*\})/;

mainTsx = mainTsx.replace(startSubjectRegex, `
    let sourceQuestions: any[] = [];
    if (subject === 'farmacologia') {
        sourceQuestions = farmacologiaQuestions;
        headerSubjectTitleEl.textContent = 'Farmacologia PR1';
    } else if (subject === 'propedêutica') {
        sourceQuestions = propedeuticaQuestions;
        headerSubjectTitleEl.textContent = 'Propedêutica PR1';
    } else if (subject === 'fisiopatologia') {
        sourceQuestions = fisiopatologiaQuestions;
        headerSubjectTitleEl.textContent = 'Fisiopatologia PR1';
    } else if (subject === 'bases cirúrgicas') {
        sourceQuestions = basesCirurgicasQuestions;
        headerSubjectTitleEl.textContent = 'Bases Cirúrgicas PR1';
    }
    
    questions = [...sourceQuestions];
    if (isReviewMode) {
        questions = questions.sort(() => Math.random() - 0.5);
    }
`);

fs.writeFileSync('src/main.tsx', mainTsx);
