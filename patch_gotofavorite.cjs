const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const oldFunc = `(window as any).goToFavorite = function(subjectId: string, index: number) {
    (window as any).switchTab('dashboard'); // go back to main screen
    (window as any).startSubject(subjectId);
    // Use loadQuestion directly, as it's defined in this file's scope. 
    // Using (window as any).loadQuestion threw a TypeError because it's not exported to window.
    loadQuestion(index);
};`;

const newFunc = `(window as any).goToFavorite = function(subjectId: string, index: number) {
    console.log("goToFavorite triggered:", subjectId, index);
    
    // Switch to dashboard tab to ensure elements are visible if they were hidden
    (window as any).switchTab('dashboard'); 
    
    // Set a flag to bypass the default loadProgress/loadQuestion in startSubject
    (window as any)._targetQuestionIndex = index;
    (window as any).startSubject(subjectId);
    
    // Now explicitly load the correct question
    loadQuestion(index);
    
    // Force a scroll to top so the user sees the question
    const appScreenEl = document.getElementById('app-screen');
    if (appScreenEl) {
        appScreenEl.scrollIntoView();
    }
};`;

code = code.replace(oldFunc, newFunc);
fs.writeFileSync('src/main.tsx', code);
