const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const targetStr = `(window as any).goToFavorite = function(subjectId: string, index: number) {
    (window as any).switchTab('dashboard'); // go back to main screen
    (window as any).startSubject(subjectId);
    (window as any).loadQuestion(index);
};`;

const replacement = `(window as any).goToFavorite = function(subjectId: string, index: number) {
    (window as any).switchTab('dashboard'); // go back to main screen
    (window as any).startSubject(subjectId);
    // Use loadQuestion directly, as it's defined in this file's scope. 
    // Using (window as any).loadQuestion threw a TypeError because it's not exported to window.
    loadQuestion(index);
};`;

if (code.includes(targetStr)) {
    code = code.replace(targetStr, replacement);
    fs.writeFileSync('src/main.tsx', code);
    console.log("Successfully fixed goToFavorite");
} else {
    console.log("Error: could not find targetStr");
}
