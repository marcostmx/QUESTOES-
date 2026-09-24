const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const oldFuncStart = code.indexOf('(window as any).startSubject = function(subject: string) {');
const oldFuncEnd = code.indexOf('};', code.indexOf('loadQuestion(currentQuestionIndex);')) + 2;

const oldStartSubject = code.substring(oldFuncStart, oldFuncEnd);

const newStartSubject = `(window as any).startSubject = function(subject: string, targetIndex?: number) {
    currentSubject = subject;
    
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
    } else if (subject === 'gis2') {
        sourceQuestions = gis2_all;
        headerSubjectTitleEl.textContent = 'GIS 2 PR1';
    } else if (subject === 'bases cirúrgicas') {
        sourceQuestions = basesCirurgicasQuestions;
        headerSubjectTitleEl.textContent = 'Bases Cirúrgicas PR1';
    }
    
    questions = [...sourceQuestions];
    
    const hasProgress = loadProgress();
    
    if (targetIndex !== undefined) {
        currentQuestionIndex = targetIndex;
    } else if (!hasProgress) {
        currentQuestionIndex = 0;
        answeredQuestions.clear();
        correctAnswers.clear();
        incorrectAnswers.clear();
    }
    
    homeScreenEl.classList.add('hidden');
    appScreenEl.classList.remove('hidden');
    appScreenEl.classList.add('flex');
    endScreenEl.classList.add('hidden');

    if (questions.length === 0) {
        emptyStateEl.classList.remove('hidden');
        quizContainerEl.classList.add('hidden');
    } else {
        emptyStateEl.classList.add('hidden');
        quizContainerEl.classList.remove('hidden');
        quizContainerEl.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-left', 'slide-out-right', 'fade-in');
        quizContainerEl.classList.add('fade-in');
        initGrid();
        loadQuestion(currentQuestionIndex);
    }
};`;

code = code.replace(oldStartSubject, newStartSubject);
fs.writeFileSync('src/main.tsx', code);
console.log("Patched startSubject");
