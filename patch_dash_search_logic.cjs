const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const oldLogic = `// Module Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('module-search') as HTMLInputElement;
    const modulesGrid = document.getElementById('modules-grid');

    if (searchInput && modulesGrid) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
            const moduleButtons = modulesGrid.querySelectorAll('button');

            moduleButtons.forEach(button => {
                const titleEl = button.querySelector('h3');
                const descEl = button.querySelector('p');
                
                const title = titleEl ? titleEl.textContent?.toLowerCase() || '' : '';
                const desc = descEl ? descEl.textContent?.toLowerCase() || '' : '';

                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                    button.style.display = 'flex';
                } else {
                    button.style.display = 'none';
                }
            });
        });
    }
});`;

const newLogic = `// Module & Question Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('module-search') as HTMLInputElement;
    const modulesGrid = document.getElementById('modules-grid');
    const questionsResults = document.getElementById('questions-search-results');
    const questionsList = document.getElementById('questions-search-list');

    if (searchInput && modulesGrid) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
            
            // 1. Search Modules
            const moduleButtons = modulesGrid.querySelectorAll('button');
            moduleButtons.forEach(button => {
                const titleEl = button.querySelector('h3');
                const descEl = button.querySelector('p');
                
                const title = titleEl ? titleEl.textContent?.toLowerCase() || '' : '';
                const desc = descEl ? descEl.textContent?.toLowerCase() || '' : '';

                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                    button.style.display = 'flex';
                } else {
                    button.style.display = 'none';
                }
            });
            
            // 2. Search Questions
            if (searchTerm.length > 2 && questionsResults && questionsList) {
                const subjectsConfig = [
                    { id: 'farmacologia', src: farmacologiaQuestions, name: 'Farmacologia' },
                    { id: 'propedêutica', src: propedeuticaQuestions, name: 'Propedêutica' },
                    { id: 'fisiopatologia', src: fisiopatologiaQuestions, name: 'Fisiopatologia' },
                    { id: 'bases cirúrgicas', src: basesCirurgicasQuestions, name: 'Bases Cirúrgicas' },
                    { id: 'gis2', src: (gis2_all || []), name: 'GIS 2' }
                ];
                
                let matchesHtml = '';
                let matchCount = 0;
                
                subjectsConfig.forEach(sub => {
                    sub.src.forEach((q: any, idx: number) => {
                        if (!q) return;
                        const text = q.text.toLowerCase();
                        if (text.includes(searchTerm)) {
                            matchCount++;
                            if (matchCount <= 20) { // limit results
                                const qTextSnippet = q.text.substring(0, 100) + '...';
                                matchesHtml += \`
                                    <div class="p-4 border border-gray-100 rounded-xl bg-white hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                                        <div class="flex-1">
                                            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">\${sub.name} - Q\${idx + 1}</span>
                                            <p class="text-gray-800 text-sm mt-1 line-clamp-2">\${qTextSnippet}</p>
                                        </div>
                                        <button onclick="window.goToFavorite('\${sub.id}', \${idx})" class="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-lg hover:bg-blue-200 transition-colors shrink-0">
                                            Responder
                                        </button>
                                    </div>
                                \`;
                            }
                        }
                    });
                });
                
                if (matchCount > 0) {
                    questionsResults.classList.remove('hidden');
                    questionsList.innerHTML = matchesHtml + (matchCount > 20 ? \`<p class="text-xs text-gray-400 text-center mt-2">E mais \${matchCount - 20} resultados...</p>\` : '');
                } else {
                    questionsResults.classList.add('hidden');
                }
            } else if (questionsResults) {
                questionsResults.classList.add('hidden');
            }
        });
    }
});`;

code = code.replace(oldLogic, newLogic);
fs.writeFileSync('src/main.tsx', code);
