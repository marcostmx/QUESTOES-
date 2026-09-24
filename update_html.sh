#!/bin/bash

# We will wrap the current body content in #app-screen
# and add #home-screen before it.

cat << 'HTML_EOF' > index.html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste Interativo - PR1</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    <style>
        .hidden { display: none !important; }
        .fade-in { animation: fadeIn 0.3s ease-in; }
        .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        .pop { animation: pop 0.3s ease-out forwards; }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        @keyframes pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #D1D5DB; }
    </style>
</head>
<body class="flex flex-col h-screen w-full bg-[#F3F4F6] font-sans overflow-hidden relative">

    <!-- HOME SCREEN -->
    <div id="home-screen" class="absolute inset-0 z-50 bg-[#F3F4F6] flex flex-col items-center justify-center p-6 fade-in">
        <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">Q-Bank UWorld Style</h1>
        <p class="text-gray-600 mb-10 text-center max-w-md">Selecione o módulo que deseja praticar hoje.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            <!-- Cards -->
            <button onclick="window.startSubject('farmacologia')" class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 hover:bg-indigo-50 transition-all flex flex-col items-center text-center group cursor-pointer">
                <div class="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">Farmacologia</h3>
                <p class="text-xs text-gray-500 mt-2">Mecanismos de ação e posologia</p>
            </button>
            <button onclick="window.startSubject('propedêutica')" class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-300 hover:bg-emerald-50 transition-all flex flex-col items-center text-center group cursor-pointer">
                <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">Propedêutica</h3>
                <p class="text-xs text-gray-500 mt-2">Sinais, sintomas e exame físico</p>
            </button>
            <button onclick="window.startSubject('fisiopatologia')" class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 hover:bg-blue-50 transition-all flex flex-col items-center text-center group cursor-pointer">
                <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Fisiopatologia</h3>
                <p class="text-xs text-gray-500 mt-2">Mecanismos de doenças</p>
            </button>
            <button onclick="window.startSubject('bases cirúrgicas')" class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-rose-300 hover:bg-rose-50 transition-all flex flex-col items-center text-center group cursor-pointer">
                <div class="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-rose-700 transition-colors">Bases Cirúrgicas</h3>
                <p class="text-xs text-gray-500 mt-2">Fundamentos da cirurgia</p>
            </button>
        </div>
    </div>

    <div id="app-screen" class="hidden flex-col h-full w-full">
        <header class="flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b border-gray-200 shadow-sm z-10 shrink-0">
            <div class="flex items-center space-x-4">
                <button onclick="window.backToHome()" class="text-gray-400 hover:text-gray-600 transition-colors mr-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </button>
                <div class="bg-blue-600 p-2 rounded-lg hidden md:block">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <div>
                    <h1 id="header-subject-title" class="text-sm md:text-lg font-bold text-gray-900 leading-tight">Fisiopatologia PR1</h1>
                    <p class="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-semibold">Modo de Estudo</p>
                </div>
            </div>
            <div class="flex items-center space-x-4 md:space-x-6">
                <div class="text-right">
                    <p class="text-[9px] md:text-[10px] text-gray-400 font-bold tracking-widest uppercase">Tempo de Estudo</p>
                    <p id="timer-display" class="text-lg md:text-xl font-mono font-bold text-blue-700 leading-none mt-1">00:00:00</p>
                </div>
                <div class="h-10 w-px bg-gray-200 hidden md:block"></div>
                <button onclick="window.finishTest()" class="bg-red-50 text-red-600 px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-bold border border-red-100 hover:bg-red-100 transition-colors">
                    FINALIZAR
                </button>
            </div>
        </header>

        <main class="flex flex-1 overflow-hidden relative">
            <!-- Sidebar -->
            <aside class="w-64 md:w-72 bg-white border-r border-gray-200 flex flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 hidden md:flex">
                <div class="p-5 border-b border-gray-100">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-sm font-bold text-gray-800">Progresso</span>
                        <span id="progress-text" class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">0 de 100</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                        <div id="progress-bar" class="bg-blue-600 h-2 rounded-full w-0 transition-all duration-500"></div>
                    </div>
                </div>
                <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <div id="question-grid" class="grid grid-cols-5 gap-2">
                        <!-- Dynamic Grid Buttons -->
                    </div>
                </div>
                <div class="p-4 bg-gray-50 text-[10px] font-semibold text-gray-500 border-t border-gray-200 shrink-0 uppercase tracking-wider space-y-2">
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-blue-50 border border-blue-600 rounded mr-2"></div> Respondida
                    </div>
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-gray-50 border border-gray-200 rounded mr-2"></div> Não Respondida
                    </div>
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-white border border-gray-300 ring-2 ring-blue-500 rounded mr-2"></div> Atual
                    </div>
                </div>
            </aside>

            <!-- Content Area -->
            <section class="flex-1 bg-gray-50 overflow-y-auto flex flex-col relative custom-scrollbar">
                <!-- Empty State (No Questions) -->
                <div id="empty-state" class="hidden absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gray-50 z-20">
                    <div class="w-20 h-20 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Sem questões disponíveis</h2>
                    <p class="text-gray-500 max-w-sm mx-auto">Este banco de questões ainda não possui perguntas cadastradas. Volte para a tela inicial para escolher outra matéria.</p>
                    <button onclick="window.backToHome()" class="mt-6 px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Voltar</button>
                </div>

                <!-- Question Container -->
                <div id="quiz-container" class="max-w-4xl mx-auto flex flex-col h-full w-full p-4 md:p-12 fade-in relative hidden">
                    
                    <div class="flex items-center space-x-3 mb-6 md:mb-8">
                        <span id="question-counter" class="bg-gray-900 text-white text-xs font-bold px-3 md:px-4 py-1.5 rounded-md shadow-sm">
                            QUESTÃO 1
                        </span>
                        <span id="question-type" class="text-gray-500 text-xs font-bold uppercase tracking-widest bg-gray-200 px-3 py-1.5 rounded-md">
                            CASO CLÍNICO
                        </span>
                    </div>

                    <div class="flex-1 overflow-y-auto pr-2 pb-4">
                        <div class="prose prose-sm md:prose-base max-w-none text-gray-800 leading-relaxed mb-8">
                            <h2 id="question-text" class="font-medium text-lg md:text-xl whitespace-pre-line text-gray-900">
                                <!-- Question text will be injected here -->
                            </h2>
                        </div>

                        <div id="interaction-area" class="mb-8">
                            <!-- Dynamic interaction -->
                        </div>

                        <div id="feedback-area" class="hidden mt-8 p-4 md:p-6 border border-green-200 bg-green-50 rounded-2xl shadow-sm fade-in">
                            <div class="flex items-center mb-4">
                                <div class="bg-green-100 p-1.5 rounded-md mr-3">
                                    <svg class="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h3 class="font-bold text-green-900 text-lg">Gabarito Comentado</h3>
                            </div>
                            <div id="feedback-text" class="text-green-900 whitespace-pre-line text-sm md:text-base leading-relaxed">
                                <!-- Feedback will be injected here -->
                            </div>
                        </div>
                    </div>

                    <!-- Footer Nav -->
                    <div class="mt-auto pt-6 border-t border-gray-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-0">
                        <button id="btn-prev" class="flex items-center justify-center text-gray-600 font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors" onclick="window.prevQuestion()">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> ANTERIOR
                        </button>
                        
                        <div class="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                            <button id="btn-show-answer" class="bg-white text-blue-600 border border-blue-200 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-50 transition-colors" onclick="window.showAnswer()">
                                MOSTRAR GABARITO
                            </button>
                            <button id="btn-next" class="bg-blue-600 text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center" onclick="window.nextQuestion()">
                                <span>PRÓXIMA</span>
                                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- End Screen -->
                <div id="end-screen" class="hidden absolute inset-0 bg-gray-50 flex-col items-center justify-center fade-in text-center p-8 z-20">
                    <div class="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-sm">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Simulado Concluído!</h2>
                    <p class="text-gray-600 mb-8 max-w-md mx-auto text-base md:text-lg leading-relaxed">Você terminou as questões deste módulo.</p>
                    <div class="flex space-x-4">
                        <button class="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-all" onclick="window.backToHome()">
                            TROCAR MATÉRIA
                        </button>
                        <button class="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all" onclick="window.restartTest()">
                            REINICIAR MÓDULO
                        </button>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
HTML_EOF
