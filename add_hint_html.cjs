const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

const hintBtnHtml = `<button id="btn-show-hint" class="bg-yellow-50 text-yellow-700 border border-yellow-200 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-yellow-100 transition-colors" onclick="window.showHint()">
    DICA
</button>
<button id="btn-show-answer"`;

indexHtml = indexHtml.replace(/<button id="btn-show-answer"/, hintBtnHtml);

const hintAreaHtml = `<div id="hint-area" class="hidden mt-6 p-4 md:p-5 border border-yellow-200 bg-yellow-50 rounded-2xl shadow-sm fade-in">
    <div class="flex items-center mb-2">
        <div class="bg-yellow-200 p-1.5 rounded-md mr-3">
            <svg class="w-5 h-5 text-yellow-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
        </div>
        <h3 class="font-bold text-yellow-900 text-base">Pista</h3>
    </div>
    <div id="hint-text" class="text-yellow-900 whitespace-pre-line text-sm leading-relaxed">
    </div>
</div>

<div id="feedback-area"`;

indexHtml = indexHtml.replace(/<div id="feedback-area"/, hintAreaHtml);

fs.writeFileSync('index.html', indexHtml);
