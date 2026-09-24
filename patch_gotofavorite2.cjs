const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const oldFuncStart = code.indexOf('(window as any).goToFavorite = function(subjectId: string, index: number) {');
const oldFuncEnd = code.indexOf('};', oldFuncStart) + 2;

const oldFunc = code.substring(oldFuncStart, oldFuncEnd);

const newFunc = `(window as any).goToFavorite = function(subjectId: string, index: number) {
    (window as any).switchTab('dashboard'); 
    (window as any).startSubject(subjectId, index);
    
    // Explicitly scroll into view just in case
    const appScreenEl = document.getElementById('app-screen');
    if (appScreenEl) {
        appScreenEl.scrollIntoView();
    }
};`;

code = code.replace(oldFunc, newFunc);
fs.writeFileSync('src/main.tsx', code);
console.log("Patched goToFavorite");
