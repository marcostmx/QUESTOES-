const fs = require('fs');
let content = fs.readFileSync('src/main.tsx', 'utf8');

// The block we want to replace is where optionsHtml is generated.
// We'll update the logic inside the rendering of multiple choice options.
// Also we'll check if answeredQuestions.has(index) to apply correct classes and pointer-events-none immediately.

const newMCQLogic = `
    } else if (q.interactionType === 'multiple-choice' && q.options) {
        let optionsHtml = '<div class="space-y-3">';
        const isAnswered = answeredQuestions.has(index);
        let correctIndex = -1;
        
        if (isAnswered) {
            const match = q.gabarito.match(/Alternativa\\s+([A-E])/i);
            if (match) {
                const correctLetter = match[1].toUpperCase();
                correctIndex = correctLetter.charCodeAt(0) - 65;
            }
        }
        
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
                    <input type="radio" name="mcq" value="\${i}" class="hidden" onchange="window.handleMCQChange(\${i})">
                    <span id="mcq-text-\${i}" class="\${textClasses}">\${opt}</span>
                </label>
            \`;
        });
        optionsHtml += '</div>';
        interactionAreaEl.innerHTML = optionsHtml;
    } else if (q.interactionType === 'true-false') {
`;

// Replace it
content = content.replace(
    /\} else if \(q\.interactionType === 'multiple-choice' && q\.options\) \{[\s\S]*?\} else if \(q\.interactionType === 'true-false'\) \{/,
    newMCQLogic
);

fs.writeFileSync('src/main.tsx', content);
console.log("Patched loadQuestion for MCQ");
