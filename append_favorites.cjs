const fs = require('fs');

const code = `
// --- FAVORITES LOGIC ---

(window as any).toggleFavorite = function() {
    let subjectId = currentSubject;
    let index = currentQuestionIndex;
    
    // In error review or simulado, the real subject and index are ogSubject and ogIndex
    const q = questions[index];
    if (q && q.ogSubject && q.ogIndex !== undefined) {
        subjectId = q.ogSubject;
        index = q.ogIndex;
    }

    const favs = JSON.parse(localStorage.getItem('pr1_favorites') || '{}');
    if (!favs[subjectId]) favs[subjectId] = [];
    
    const favArray = favs[subjectId];
    const favIndex = favArray.indexOf(index);
    
    if (favIndex > -1) {
        // Remove
        favArray.splice(favIndex, 1);
    } else {
        // Add
        favArray.push(index);
    }
    
    localStorage.setItem('pr1_favorites', JSON.stringify(favs));
    
    // Update icon visually
    (window as any).updateFavoriteIcon(subjectId, index);
};

(window as any).updateFavoriteIcon = function(subjectId: string, index: number) {
    const icon = document.getElementById('icon-favorite');
    const btn = document.getElementById('btn-favorite');
    if (!icon || !btn) return;
    
    const favs = JSON.parse(localStorage.getItem('pr1_favorites') || '{}');
    const isFav = favs[subjectId] && favs[subjectId].includes(index);
    
    if (isFav) {
        icon.setAttribute('fill', 'currentColor');
        btn.classList.add('text-yellow-400');
        btn.classList.remove('text-gray-300');
    } else {
        icon.setAttribute('fill', 'none');
        btn.classList.remove('text-yellow-400');
        btn.classList.add('text-gray-300');
    }
};

(window as any).renderFavorites = function() {
    const listEl = document.getElementById('favorites-list');
    if (!listEl) return;
    
    const favs = JSON.parse(localStorage.getItem('pr1_favorites') || '{}');
    let hasFavs = false;
    let html = '';
    
    const subjectsConfig = [
        { id: 'farmacologia', src: farmacologiaQuestions, name: 'Farmacologia' },
        { id: 'propedêutica', src: propedeuticaQuestions, name: 'Propedêutica' },
        { id: 'fisiopatologia', src: fisiopatologiaQuestions, name: 'Fisiopatologia' },
        { id: 'bases cirúrgicas', src: basesCirurgicasQuestions, name: 'Bases Cirúrgicas' },
        { id: 'gis2', src: (gis2_all || []), name: 'GIS 2' }
    ];
    
    // Filter logic
    const searchInput = document.getElementById('favorites-search') as HTMLInputElement;
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    subjectsConfig.forEach(sub => {
        const subFavs = favs[sub.id] || [];
        if (subFavs.length > 0) {
            
            let matchedQuestions = '';
            
            subFavs.sort((a: number, b: number) => a - b).forEach((qIdx: number) => {
                const q = sub.src[qIdx];
                if (!q) return;
                
                const qTextSnippet = q.text.substring(0, 100) + '...';
                const searchTarget = (sub.name + ' ' + q.text).toLowerCase();
                
                if (searchTerm && !searchTarget.includes(searchTerm)) return;
                
                hasFavs = true;
                
                matchedQuestions += \`
                    <div class="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="flex-1">
                            <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">\${sub.name} - Q\${qIdx + 1}</span>
                            <p class="text-gray-800 text-sm mt-1 line-clamp-2">\${qTextSnippet}</p>
                        </div>
                        <button onclick="window.goToFavorite('\${sub.id}', \${qIdx})" class="px-4 py-2 bg-yellow-100 text-yellow-700 font-bold rounded-lg hover:bg-yellow-200 transition-colors shrink-0">
                            Revisar
                        </button>
                    </div>
                \`;
            });
            
            if (matchedQuestions) {
                html += \`
                    <div class="mb-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-3 border-b pb-2">\${sub.name}</h3>
                        <div class="space-y-3">
                            \${matchedQuestions}
                        </div>
                    </div>
                \`;
            }
        }
    });
    
    if (!hasFavs) {
        listEl.innerHTML = \`<p class="text-sm text-gray-500 font-medium italic text-center p-8">Nenhuma questão favorita encontrada.</p>\`;
    } else {
        listEl.innerHTML = html;
    }
};

(window as any).goToFavorite = function(subjectId: string, index: number) {
    (window as any).switchTab('dashboard'); // go back to main screen
    (window as any).startSubject(subjectId);
    (window as any).loadQuestion(index);
};

document.addEventListener('DOMContentLoaded', () => {
    const favSearch = document.getElementById('favorites-search');
    if (favSearch) {
        favSearch.addEventListener('input', () => {
            (window as any).renderFavorites();
        });
    }
});
`;
fs.appendFileSync('src/main.tsx', code);
