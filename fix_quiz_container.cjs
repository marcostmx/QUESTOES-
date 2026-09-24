const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `<div id="quiz-container" class="max-w-4xl mx-auto flex flex-col h-full w-full p-4 md:p-12 fade-in relative hidden">
<div class="flex items-center space-x-3 mb-6 md:mb-8">
    <span id="question-counter" class="bg-gray-900 text-white text-xs font-bold px-3 md:px-4 py-1.5 rounded-md shadow-sm"> QUESTÃO 1 </span>
    <span id="question-type" class="text-gray-500 text-xs font-bold uppercase tracking-widest bg-gray-200 px-3 py-1.5 rounded-md"> CASO CLÍNICO </span>
    <div class="flex-1"></div>
    <button id="btn-favorite" onclick="window.toggleFavorite()" class="text-gray-300 hover:text-yellow-400 transition-colors p-1" title="Adicionar aos Favoritos">
        <svg id="icon-favorite" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
    </button>
</div>
</div> <div class="flex-1 overflow-y-auto pr-2 pb-4">`;

const fixedStr = `<div id="quiz-container" class="max-w-4xl mx-auto flex flex-col h-full w-full p-4 md:p-12 fade-in relative hidden">
<div class="flex items-center space-x-3 mb-6 md:mb-8">
    <span id="question-counter" class="bg-gray-900 text-white text-xs font-bold px-3 md:px-4 py-1.5 rounded-md shadow-sm"> QUESTÃO 1 </span>
    <span id="question-type" class="text-gray-500 text-xs font-bold uppercase tracking-widest bg-gray-200 px-3 py-1.5 rounded-md"> CASO CLÍNICO </span>
    <div class="flex-1"></div>
    <button id="btn-favorite" onclick="window.toggleFavorite()" class="text-gray-300 hover:text-yellow-400 transition-colors p-1" title="Adicionar aos Favoritos">
        <svg id="icon-favorite" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
    </button>
</div>
<div class="flex-1 overflow-y-auto pr-2 pb-4">`;

if (html.includes(targetStr)) {
    html = html.replace(targetStr, fixedStr);
    fs.writeFileSync('index.html', html);
    console.log("Bug fixed");
} else {
    console.log("Target not found!");
}
