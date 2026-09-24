const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// The main dashboard content starts after <div class="p-6 md:p-10 max-w-7xl mx-auto space-y-12">
// and ends before </main> inside #home-screen.
const startIdx = content.indexOf('<div class="p-6 md:p-10 max-w-7xl mx-auto space-y-12">');
const endIdx = content.indexOf('</main>', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const mainContent = content.substring(startIdx + '<div class="p-6 md:p-10 max-w-7xl mx-auto space-y-12">'.length, endIdx);

    const newHTML = `
        <div class="p-6 md:p-10 max-w-7xl mx-auto">
             <!-- DASHBOARD VIEW -->
             <div id="view-dashboard" class="space-y-12 block fade-in">
                 ${mainContent}
             </div>

             <!-- METRICS VIEW -->
             <div id="view-metrics" class="space-y-12 hidden fade-in">
                 <div class="flex items-center justify-between mb-6">
                     <h2 class="text-xl font-bold text-gray-900">Métricas Detalhadas</h2>
                 </div>
                 <div class="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                     <div id="metrics-container" class="space-y-6">
                        <!-- Metrics injected here -->
                     </div>
                 </div>
             </div>

             <!-- SIMULADO VIEW -->
             <div id="view-simulado" class="space-y-8 hidden fade-in">
                 <div class="flex items-center justify-between mb-6">
                     <h2 class="text-xl font-bold text-gray-900">Simulado Cronometrado</h2>
                 </div>
                 <div class="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col items-center max-w-2xl mx-auto text-center">
                     <div class="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-6">
                         <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                     </div>
                     <h3 class="text-2xl font-bold text-gray-900 mb-2">Configure seu Simulado</h3>
                     <p class="text-gray-500 max-w-md mb-8">O simulado irá misturar questões de todas as disciplinas para simular a prova real.</p>
                     
                     <div class="w-full space-y-6 text-left">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Número de Questões</label>
                            <div class="grid grid-cols-3 gap-3">
                                <button onclick="window.selectSimuladoQ(20)" id="btn-sim-q-20" class="btn-sim-q py-3 rounded-xl border-2 border-orange-500 bg-orange-50 text-orange-700 font-bold">20</button>
                                <button onclick="window.selectSimuladoQ(40)" id="btn-sim-q-40" class="btn-sim-q py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50">40</button>
                                <button onclick="window.selectSimuladoQ(80)" id="btn-sim-q-80" class="btn-sim-q py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50">80</button>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Tempo Limite</label>
                            <div class="grid grid-cols-3 gap-3">
                                <button onclick="window.selectSimuladoT(30)" id="btn-sim-t-30" class="btn-sim-t py-3 rounded-xl border-2 border-orange-500 bg-orange-50 text-orange-700 font-bold">30 min</button>
                                <button onclick="window.selectSimuladoT(60)" id="btn-sim-t-60" class="btn-sim-t py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50">60 min</button>
                                <button onclick="window.selectSimuladoT(120)" id="btn-sim-t-120" class="btn-sim-t py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50">120 min</button>
                            </div>
                        </div>
                        <div class="pt-4">
                            <button onclick="window.startSimulado()" class="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-md transition-colors text-lg">
                                INICIAR SIMULADO
                            </button>
                        </div>
                     </div>
                 </div>
             </div>
        `;

    content = content.substring(0, startIdx) + newHTML + content.substring(endIdx);
}

// Rename 'Cronometrados' to 'Simulados' in the sidebar text and change tab ID to tab-simulado
content = content.replace(/Cronometrados/g, 'Simulado');
content = content.replace(/tab-timed/g, 'tab-simulado');
content = content.replace(/switchTab\('timed'\)/g, "switchTab('simulado')");

// Add dark mode toggle button in sidebar
const darkModeHTML = `
    <!-- Dark Mode Toggle -->
    <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between px-2">
        <span class="text-sm font-bold text-gray-600">Modo Noturno</span>
        <button onclick="window.toggleDarkMode()" id="dark-mode-toggle" class="w-12 h-6 bg-gray-200 rounded-full relative transition-colors">
            <div class="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow transition-transform transform"></div>
        </button>
    </div>
</nav>
`;
content = content.replace('</nav>', darkModeHTML);

// Dark mode global styles
const darkStyles = `
<style>
    /* Quick CSS Filter Dark Mode Strategy */
    html.dark { filter: invert(1) hue-rotate(180deg); background-color: #111; }
    html.dark img, html.dark iframe, html.dark video { filter: invert(1) hue-rotate(180deg); }
    /* Exception for specific colors that shouldn't look weird when inverted */
    html.dark .bg-orange-600 { filter: hue-rotate(10deg); }
</style>
</head>
`;
content = content.replace('</head>', darkStyles);

// Add Timer display to app-screen header
const timerHTML = `
<div id="timer-display" class="hidden items-center justify-center bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg font-mono font-bold text-sm shadow-sm mr-4">
    00:00:00
</div>
`;
content = content.replace('<div class="flex items-center space-x-4 md:space-x-6">', '<div class="flex items-center space-x-4 md:space-x-6">' + timerHTML);


fs.writeFileSync('index.html', content);
console.log("Patched index.html with new views and dark mode");
