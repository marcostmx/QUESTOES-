const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<div id="home-screen"[\s\S]*?<\/div>\s*<\/div>\s*<div id="app-screen"/;

const newHTML = `<div id="home-screen" class="absolute inset-0 z-50 bg-[#f8fafc] flex overflow-hidden fade-in">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col shadow-sm relative z-10">
        <div class="p-6 border-b border-gray-100 flex items-center space-x-3">
             <div class="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
             </div>
             <span class="text-2xl font-extrabold text-gray-900 tracking-tight">MedQuest</span>
        </div>
        <nav class="flex-1 p-4 space-y-2">
             <a href="#" class="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold transition-colors">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                 <span>Dashboard</span>
             </a>
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

    <!-- Main Dashboard Area -->
    <main class="flex-1 overflow-y-auto custom-scrollbar relative bg-[#f8fafc]">
        <!-- Top header -->
        <header class="bg-white/70 backdrop-blur-xl sticky top-0 z-20 border-b border-gray-200/60 px-6 md:px-10 py-5 flex items-center justify-between">
             <div class="flex items-center">
                  <div class="md:hidden mr-4 bg-blue-600 p-2.5 rounded-xl text-white shadow-sm">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  </div>
                  <div>
                      <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Olá, Estudante 👋</h1>
                      <p class="text-sm text-gray-500 font-medium mt-1">Pronto para a revisão de hoje? Escolha um módulo.</p>
                  </div>
             </div>
             <div class="hidden sm:flex items-center space-x-3 bg-white border border-gray-200 py-2 px-4 rounded-full shadow-sm">
                 <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                     M
                 </div>
                 <span class="text-sm font-semibold text-gray-700 pr-2">Membro PRO</span>
             </div>
        </header>

        <div class="p-6 md:p-10 max-w-7xl mx-auto space-y-12">
             
             <!-- Stats Overview -->
             <section>
                 <div class="flex items-center justify-between mb-6">
                     <h2 class="text-xl font-bold text-gray-900">Visão Geral</h2>
                 </div>
                 <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
                     <!-- Total Resolvidas -->
                     <div class="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center space-x-6 relative overflow-hidden group">
                         <div class="absolute -right-6 -top-6 w-32 h-32 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                         <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center relative z-10 shrink-0 shadow-inner">
                             <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                         </div>
                         <div class="relative z-10">
                             <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Questões Resolvidas</p>
                             <h4 class="text-3xl md:text-4xl font-black text-gray-900" id="dash-total-answered">0</h4>
                         </div>
                     </div>
                     <!-- Precisão -->
                     <div class="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center space-x-6 relative overflow-hidden group">
                         <div class="absolute -right-6 -top-6 w-32 h-32 bg-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                         <div class="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center relative z-10 shrink-0 shadow-inner">
                             <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                         </div>
                         <div class="relative z-10">
                             <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Taxa de Acerto</p>
                             <h4 class="text-3xl md:text-4xl font-black text-gray-900" id="dash-accuracy">0%</h4>
                         </div>
                     </div>
                     <!-- Ofensiva -->
                     <div class="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center space-x-6 relative overflow-hidden group">
                         <div class="absolute -right-6 -top-6 w-32 h-32 bg-orange-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                         <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center relative z-10 shrink-0 shadow-inner">
                             <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path></svg>
                         </div>
                         <div class="relative z-10">
                             <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Ofensiva de Estudos</p>
                             <div class="flex items-baseline space-x-1.5">
                                <h4 class="text-3xl md:text-4xl font-black text-gray-900">1</h4>
                                <span class="text-sm font-bold text-gray-500 uppercase tracking-wider">Dia</span>
                             </div>
                         </div>
                     </div>
                 </div>
             </section>

             <!-- Módulos -->
             <section>
                 <div class="flex items-center justify-between mb-6">
                     <h2 class="text-xl font-bold text-gray-900">Módulos de Questões</h2>
                 </div>
                 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                     <!-- Farmacologia -->
                     <button onclick="window.startSubject('farmacologia')" class="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300 transition-all duration-300 flex items-start text-left group cursor-pointer relative overflow-hidden">
                         <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                         <div class="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mr-5 shrink-0 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                             <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                         </div>
                         <div class="relative z-10 flex-1">
                             <h3 class="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors mb-1">Farmacologia</h3>
                             <p class="text-sm text-gray-500 font-medium leading-relaxed">Mecanismos de ação e posologia</p>
                             <div class="mt-5 flex items-center justify-between bg-indigo-50/50 p-2.5 rounded-xl">
                                 <span class="text-xs font-bold text-indigo-700" id="badge-farmacologia">0 / 0</span>
                                 <div class="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                                    <svg class="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                 </div>
                             </div>
                         </div>
                     </button>
                     
                     <!-- Propedêutica -->
                     <button onclick="window.startSubject('propedêutica')" class="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-300 transition-all duration-300 flex items-start text-left group cursor-pointer relative overflow-hidden">
                         <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-full opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                         <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mr-5 shrink-0 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                             <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                         </div>
                         <div class="relative z-10 flex-1">
                             <h3 class="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-1">Propedêutica</h3>
                             <p class="text-sm text-gray-500 font-medium leading-relaxed">Sinais, sintomas e exame físico</p>
                             <div class="mt-5 flex items-center justify-between bg-emerald-50/50 p-2.5 rounded-xl">
                                 <span class="text-xs font-bold text-emerald-700" id="badge-propedêutica">0 / 0</span>
                                 <div class="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                                    <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                 </div>
                             </div>
                         </div>
                     </button>

                     <!-- Fisiopatologia -->
                     <button onclick="window.startSubject('fisiopatologia')" class="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 flex items-start text-left group cursor-pointer relative overflow-hidden">
                         <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                         <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mr-5 shrink-0 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                             <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                         </div>
                         <div class="relative z-10 flex-1">
                             <h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-1">Fisiopatologia</h3>
                             <p class="text-sm text-gray-500 font-medium leading-relaxed">Mecanismos de doenças</p>
                             <div class="mt-5 flex items-center justify-between bg-blue-50/50 p-2.5 rounded-xl">
                                 <span class="text-xs font-bold text-blue-700" id="badge-fisiopatologia">0 / 0</span>
                                 <div class="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                                    <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                 </div>
                             </div>
                         </div>
                     </button>

                     <!-- Bases Cirúrgicas -->
                     <button onclick="window.startSubject('bases cirúrgicas')" class="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-rose-300 transition-all duration-300 flex items-start text-left group cursor-pointer relative overflow-hidden">
                         <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-rose-50 to-transparent rounded-bl-full opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                         <div class="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mr-5 shrink-0 shadow-inner group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                             <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>
                         </div>
                         <div class="relative z-10 flex-1">
                             <h3 class="text-lg font-bold text-gray-900 group-hover:text-rose-700 transition-colors mb-1">Bases Cirúrgicas</h3>
                             <p class="text-sm text-gray-500 font-medium leading-relaxed">Fundamentos da cirurgia</p>
                             <div class="mt-5 flex items-center justify-between bg-rose-50/50 p-2.5 rounded-xl">
                                 <span class="text-xs font-bold text-rose-700" id="badge-bases_cirurgicas">0 / 0</span>
                                 <div class="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                                    <svg class="w-3.5 h-3.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                 </div>
                             </div>
                         </div>
                     </button>

                     <!-- GIS 2 -->
                     <button onclick="window.startSubject('gis2')" class="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-300 transition-all duration-300 flex items-start text-left group cursor-pointer relative overflow-hidden">
                         <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-50 to-transparent rounded-bl-full opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                         <div class="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mr-5 shrink-0 shadow-inner group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                             <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                         </div>
                         <div class="relative z-10 flex-1">
                             <h3 class="text-lg font-bold text-gray-900 group-hover:text-orange-700 transition-colors mb-1">GIS 2</h3>
                             <p class="text-sm text-gray-500 font-medium leading-relaxed">Epidemiologia e Gestão</p>
                             <div class="mt-5 flex items-center justify-between bg-orange-50/50 p-2.5 rounded-xl">
                                 <span class="text-xs font-bold text-orange-700" id="badge-gis2">0 / 0</span>
                                 <div class="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                                    <svg class="w-3.5 h-3.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                 </div>
                             </div>
                         </div>
                     </button>
                 </div>
             </section>

             <!-- Materiais Teóricos / Google Drive -->
             <section class="pb-12">
                 <div class="flex items-center justify-between mb-6">
                     <h2 class="text-xl font-bold text-gray-900 flex items-center">
                         <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                             <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5M9.73 3.5h13.12l-3.43 6H6.3M15.73 21L22.28 9.5l-3.42-6-6.56 11.5"></path></svg>
                         </div>
                         Material de Apoio (Google Drive)
                     </h2>
                 </div>
                 <div id="drive-files-container" class="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden h-[500px]">
                     <!-- Drive Iframe injected here -->
                 </div>
             </section>
             
        </div>
    </main>
</div>
<div id="app-screen"`;

const newDoc = html.replace(regex, newHTML);
fs.writeFileSync('index.html', newDoc);
console.log("Patched full home screen HTML successfully");
