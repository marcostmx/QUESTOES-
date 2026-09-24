const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

// The replacement line
const replacement = "feedbackTextEl.innerHTML = (q.gabarito || '').replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>').replace(/\\*(.*?)\\*/g, '<em>$1</em>');";
code = code.replace(/feedbackTextEl\.textContent\s*=\s*q\.gabarito;/g, replacement);

fs.writeFileSync('src/main.tsx', code);
