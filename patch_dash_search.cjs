const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const searchSection = `
                 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" id="modules-grid">`;
const questionsResults = `
                 <!-- Global Questions Search Results -->
                 <div id="questions-search-results" class="hidden mt-8">
                     <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                         <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                         Questões Encontradas
                     </h3>
                     <div id="questions-search-list" class="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                     </div>
                 </div>
                 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" id="modules-grid">`;

if(html.includes(searchSection)) {
    html = html.replace(searchSection, questionsResults);
    fs.writeFileSync('index.html', html);
}
