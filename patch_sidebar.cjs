const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const homeScreenStartIdx = content.indexOf('<div id="home-screen"');
const appScreenStartIdx = content.indexOf('<div id="app-screen"');

const homeScreenContent = content.substring(homeScreenStartIdx, appScreenStartIdx);

// Replace the aside element with the new responsive aside
let newAside = `
        <!-- Sidebar Overlay for Mobile -->
        <div id="sidebar-overlay" class="fixed inset-0 bg-gray-900/50 z-40 hidden lg:hidden backdrop-blur-sm transition-opacity" onclick="window.toggleSidebar()"></div>

        <!-- Sidebar -->
        <aside id="main-sidebar" class="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col shadow-2xl lg:shadow-sm z-50 transform -translate-x-full lg:translate-x-0 lg:relative transition-transform duration-300">
            <div class="p-6 border-b border-gray-100 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                     <div class="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200">
                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                     </div>
                     <span class="text-2xl font-extrabold text-gray-900 tracking-tight">Estudo PR1</span>
                </div>
                <button onclick="window.toggleSidebar()" class="lg:hidden text-gray-500 hover:text-gray-700 bg-gray-100 p-2 rounded-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <nav class="flex-1 p-4 space-y-2">
                 <button onclick="window.switchTab('dashboard')" id="tab-dashboard" class="w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold transition-colors">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                     <span>Dashboard</span>
                 </button>
                 <button onclick="window.switchTab('metrics')" id="tab-metrics" class="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-bold transition-colors">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                     <span>Métricas</span>
                 </button>
                 <button onclick="window.switchTab('timed')" id="tab-timed" class="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-bold transition-colors">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                     <span>Cronometrados</span>
                 </button>
            </nav>
            <div class="p-5 border-t border-gray-100 bg-gray-50/50 m-4 rounded-2xl border border-gray-100">
                 <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Progresso Geral (PR1)</p>
                 <div class="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                     <div id="sidebar-progress" class="bg-blue-600 h-full rounded-full transition-all duration-1000" style="width: 0%"></div>
                 </div>
                 <div class="flex justify-between items-center mt-2">
                    <p id="sidebar-progress-text" class="text-xs text-gray-600 font-semibold">0% concluído</p>
                    <p id="sidebar-progress-fraction" class="text-xs text-gray-400 font-medium">0/0</p>
                 </div>
            </div>
        </aside>
`;

let replaced = homeScreenContent.replace(/<aside class="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col shadow-sm relative z-10">[\s\S]*?<\/aside>/, newAside);

// Now wrap the content of <div class="p-6 md:p-10 max-w-7xl mx-auto"> inside a view-dashboard div, and append the others.
const mainAreaRegex = /<div class="p-6 md:p-10 max-w-7xl mx-auto">([\s\S]*?)<\/main>/;
const mainMatch = replaced.match(mainAreaRegex);
if (mainMatch) {
    let mainContent = mainMatch[1];
    let newMainArea = `<div class="p-6 md:p-10 max-w-7xl mx-auto">
                 <!-- DASHBOARD VIEW -->
                 <div id="view-dashboard" class="space-y-12 block fade-in">
                     ${mainContent}
                 </div>

                 <!-- METRICS VIEW -->
                 <div id="view-metrics" class="space-y-12 hidden fade-in">
                     <div class="bg-white p-12 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center">
                         <div class="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
                             <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                         </div>
                         <h2 class="text-2xl font-bold text-gray-900 mb-2">Métricas Detalhadas</h2>
                         <p class="text-gray-500 max-w-md">Em breve! Aqui você poderá analisar gráficos de desempenho, evolução temporal por disciplina e identificar seus pontos fortes e fracos.</p>
                     </div>
                 </div>

                 <!-- TIMED SIMULATIONS VIEW -->
                 <div id="view-timed" class="space-y-12 hidden fade-in">
                     <div class="bg-white p-12 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center">
                         <div class="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-6">
                             <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                         </div>
                         <h2 class="text-2xl font-bold text-gray-900 mb-2">Simulados Cronometrados</h2>
                         <p class="text-gray-500 max-w-md">Em breve! Teste seus conhecimentos sob pressão do tempo com simulados nos moldes oficiais da prova.</p>
                     </div>
                 </div>
                 
            </div>
        </main>`;
    replaced = replaced.replace(mainMatch[0], newMainArea);
}

// Ensure toggle hamburger has onclick
replaced = replaced.replace(
    /<div class="lg:hidden mr-4 bg-blue-600 p-2.5 rounded-xl text-white shadow-sm">/,
    '<button onclick="window.toggleSidebar()" class="lg:hidden mr-4 bg-blue-600 hover:bg-blue-700 p-2.5 rounded-xl text-white shadow-sm transition-colors cursor-pointer">'
);
// replace closing div of hamburger with button
replaced = replaced.replace(/<\/div>\s*<div>\s*<h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">/, '</button>\n                      <div>\n                          <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">');


content = content.replace(homeScreenContent, replaced);

fs.writeFileSync('index.html', content);
console.log("Sidebar patched successfully");
