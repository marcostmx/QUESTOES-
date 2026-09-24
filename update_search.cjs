const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the search input from the Módulos header
const oldSearchInputStr = `                     <div class="relative w-full sm:w-64">
                         <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                             <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                         </div>
                         <input type="text" id="module-search" class="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Buscar módulo...">
                     </div>`;

html = html.replace(oldSearchInputStr, '');

// 2. Remove the search results container from the Módulos section
const oldSearchResultsStr = `                 <!-- Global Questions Search Results -->
                 <div id="questions-search-results" class="hidden mt-8">
                     <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                         <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                         Questões Encontradas
                     </h3>
                     <div id="questions-search-list" class="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                     </div>
                 </div>`;

html = html.replace(oldSearchResultsStr, '');

// 3. Inject the new search bar and results at the top of #view-dashboard
const newSearchBar = `
                 <!-- Global Search -->
                 <section class="relative">
                     <div class="relative w-full max-w-3xl mx-auto mb-2">
                         <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                             <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                         </div>
                         <input type="text" id="module-search" class="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg" placeholder="Pesquisar em todas as questões e módulos...">
                     </div>
                     <div id="questions-search-results" class="hidden max-w-3xl mx-auto bg-white border border-gray-100 shadow-xl rounded-2xl p-4 md:p-6 mb-8 absolute w-full z-30 left-0 right-0 top-16">
                         <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                             <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                             Questões Encontradas
                         </h3>
                         <div id="questions-search-list" class="space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                         </div>
                     </div>
                 </section>
`;

html = html.replace('<div id="view-dashboard" class="space-y-12 block fade-in">', '<div id="view-dashboard" class="space-y-12 block fade-in">' + newSearchBar);

fs.writeFileSync('index.html', html);
console.log("Updated HTML");
