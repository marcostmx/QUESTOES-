const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `</div>\n        </main>`;
const favView = `
            <div id="view-favorites" class="space-y-8 hidden fade-in">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <h2 class="text-xl font-bold text-gray-900">Questões Favoritas</h2>
                    <div class="relative w-full sm:w-64">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="text" id="favorites-search" class="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all" placeholder="Buscar nas favoritas...">
                    </div>
                </div>
                
                <div class="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div id="favorites-list" class="space-y-4">
                        <p class="text-gray-500 italic">Carregando favoritas...</p>
                    </div>
                </div>
            </div>
`;

if (html.includes(target)) {
    html = html.replace(target, favView + '\n' + target);
    fs.writeFileSync('index.html', html);
    console.log("View added");
} else {
    console.log("Target not found!");
}
