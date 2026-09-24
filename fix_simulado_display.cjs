const fs = require('fs');
let main = fs.readFileSync('src/main.tsx', 'utf8');

const oldCode = `
    // Init Grid and Show
    appScreenEl.classList.remove('hidden');
    appScreenEl.classList.add('flex');
    homeScreenEl.classList.add('hidden');
`;

const newCode = `
    // Init Grid and Show
    appScreenEl.classList.remove('hidden');
    appScreenEl.classList.add('flex');
    homeScreenEl.classList.add('hidden');
    
    if (questions.length === 0) {
        emptyStateEl.classList.remove('hidden');
        quizContainerEl.classList.add('hidden');
    } else {
        emptyStateEl.classList.add('hidden');
        quizContainerEl.classList.remove('hidden');
        quizContainerEl.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-left', 'slide-out-right', 'fade-in');
        quizContainerEl.classList.add('fade-in');
    }
`;

main = main.replace(oldCode, newCode);
fs.writeFileSync('src/main.tsx', main);
console.log("Fixed simulado display");
