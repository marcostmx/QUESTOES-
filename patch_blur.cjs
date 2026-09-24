const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const sIdx = code.indexOf("document.addEventListener('DOMContentLoaded', () => {");
const eIdx = code.indexOf("// --- FAVORITES LOGIC ---", sIdx);
const oldBlock = code.substring(sIdx, eIdx);

const newBlock = `document.addEventListener('DOMContentLoaded', () => {
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
                        if (!q || matchCount > 50) return; // hard limit to prevent severe lag
                        const text = q.text.toLowerCase();
                        if (text.includes(searchTerm)) {
                            matchCount++;
                            if (matchCount <= 20) { // limit displayed results
                                const qTextSnippet = q.text.substring(0, 100) + '...';
                                matchesHtml += \`
                                    <div class="p-4 border border-gray-100 rounded-xl bg-white hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm cursor-pointer" onclick="document.getElementById('module-search').value=''; document.getElementById('questions-search-results').classList.add('hidden'); window.goToFavorite('\${sub.id}', \${idx})">
                                        <div class="flex-1">
                                            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">\${sub.name} - Q\${idx + 1}</span>
                                            <p class="text-gray-800 text-sm mt-1 line-clamp-2">\${qTextSnippet}</p>
                                        </div>
                                        <button class="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-lg hover:bg-blue-200 transition-colors shrink-0">
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

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (questionsResults && !questionsResults.contains(e.target as Node) && e.target !== searchInput) {
                questionsResults.classList.add('hidden');
            }
        });
        
        // Re-open results if input is clicked and has content
        searchInput.addEventListener('click', () => {
            if (searchInput.value.length > 2 && questionsResults && questionsList.innerHTML.trim() !== '') {
                questionsResults.classList.remove('hidden');
            }
        });
    }
});

`;

code = code.replace(oldBlock, newBlock);
fs.writeFileSync('src/main.tsx', code);
console.log("Updated blur/focus logic for search");
