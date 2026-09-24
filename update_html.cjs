const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Add Search bar to sidebar
const searchHtml = `
                <div class="p-4 border-b border-gray-200 dark:border-[#222]">
                    <div class="relative">
                        <input type="text" id="search-input" onkeyup="window.handleSearch(this.value)" placeholder="Buscar..." class="w-full bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#333] text-gray-800 dark:text-gray-200 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                        <svg class="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>
`;
indexHtml = indexHtml.replace(
    /(<aside[^>]*>)/,
    '$1\n' + searchHtml
);

// 2. Add Review Mode toggle to header
const reviewModeHtml = `
                <label class="flex items-center cursor-pointer mr-4">
                    <div class="relative">
                        <input type="checkbox" id="review-mode-toggle" class="sr-only" onchange="window.toggleReviewMode(this.checked)">
                        <div class="block bg-gray-200 dark:bg-[#222] w-10 h-6 rounded-full transition-colors border border-gray-300 dark:border-[#333]"></div>
                        <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                    </div>
                    <div class="ml-3 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Modo Revisão</div>
                </label>
`;
// add style for the dot
if (!indexHtml.includes('.dot:checked')) {
    indexHtml = indexHtml.replace('</style>', `
        input:checked ~ .dot { transform: translateX(100%); background-color: #3B82F6; }
        input:checked ~ .block { background-color: #DBEAFE; border-color: #93C5FD; }
        .dark input:checked ~ .block { background-color: rgba(30, 58, 138, 0.5); border-color: #1E3A8A; }
    </style>`);
}

indexHtml = indexHtml.replace(
    /<button onclick="window.toggleTheme\(\)" class="text-gray-500/,
    reviewModeHtml + '\n                <button onclick="window.toggleTheme()" class="text-gray-500'
);


// 3. Add self-assessment buttons to feedback-area for open-ended questions
const selfAssessHtml = `
                            <div id="self-assess-area" class="hidden mt-4 pt-4 border-t border-green-200 dark:border-green-800 flex items-center justify-between">
                                <span class="text-sm font-semibold text-green-900 dark:text-green-300">Como você se saiu?</span>
                                <div class="flex space-x-3">
                                    <button onclick="window.recordSelfAssessment(false)" class="px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-sm font-bold rounded-lg hover:bg-red-200 dark:hover:bg-red-900 transition-colors">Errei</button>
                                    <button onclick="window.recordSelfAssessment(true)" class="px-4 py-2 bg-green-200 dark:bg-green-700/50 text-green-800 dark:text-green-200 text-sm font-bold rounded-lg hover:bg-green-300 dark:hover:bg-green-700 transition-colors">Acertei</button>
                                </div>
                            </div>
`;
indexHtml = indexHtml.replace(
    /<\/div>\s*<\/div>\s*<\/div>\s*<!-- Footer Nav -->/,
    selfAssessHtml + '\n                        </div>\n                    </div>\n                    <!-- Footer Nav -->'
);

// 4. Add Stats to End Screen
const statsHtml = `
                    <div class="grid grid-cols-3 gap-4 mb-8 w-full max-w-md">
                        <div class="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-xl p-4 flex flex-col items-center">
                            <span class="text-3xl font-extrabold text-blue-600 dark:text-blue-400" id="stat-total">0</span>
                            <span class="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 mt-1">Respondidas</span>
                        </div>
                        <div class="bg-white dark:bg-[#111] border border-green-200 dark:border-green-900/50 rounded-xl p-4 flex flex-col items-center">
                            <span class="text-3xl font-extrabold text-green-600 dark:text-green-400" id="stat-correct">0</span>
                            <span class="text-[10px] uppercase font-bold text-green-700 dark:text-green-500 mt-1">Acertos</span>
                        </div>
                        <div class="bg-white dark:bg-[#111] border border-red-200 dark:border-red-900/50 rounded-xl p-4 flex flex-col items-center">
                            <span class="text-3xl font-extrabold text-red-600 dark:text-red-400" id="stat-incorrect">0</span>
                            <span class="text-[10px] uppercase font-bold text-red-700 dark:text-red-500 mt-1">Erros</span>
                        </div>
                    </div>
`;
indexHtml = indexHtml.replace(
    /<p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-base md:text-lg leading-relaxed">Você terminou as questões deste módulo.<\/p>/,
    '$&\n' + statsHtml
);

fs.writeFileSync('index.html', indexHtml);
