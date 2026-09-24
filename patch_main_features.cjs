const fs = require('fs');
let main = fs.readFileSync('src/main.tsx', 'utf8');

// 1. We need to add the new script logic at the bottom.
const additionalLogic = `
// --- Dark Mode ---
(window as any).toggleDarkMode = function() {
    const htmlEl = document.documentElement;
    htmlEl.classList.toggle('dark');
    const isDark = htmlEl.classList.contains('dark');
    
    // Animate toggle switch
    const toggleCircle = document.querySelector('#dark-mode-toggle div');
    const toggleBg = document.getElementById('dark-mode-toggle');
    if (toggleCircle && toggleBg) {
        if (isDark) {
            toggleCircle.classList.add('translate-x-6');
            toggleBg.classList.add('bg-blue-600');
            toggleBg.classList.remove('bg-gray-200');
        } else {
            toggleCircle.classList.remove('translate-x-6');
            toggleBg.classList.remove('bg-blue-600');
            toggleBg.classList.add('bg-gray-200');
        }
    }
    
    // Save preference
    localStorage.setItem('pr1_dark_mode', isDark ? 'true' : 'false');
};

// Check dark mode on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('pr1_dark_mode');
    if (savedTheme === 'true') {
        (window as any).toggleDarkMode(); // this will set it and animate the button
    }
});

// --- Métricas ---
function renderDetailedMetrics() {
    const container = document.getElementById('metrics-container');
    if (!container) return;
    
    const subjects = [
        { id: 'farmacologia', title: 'Farmacologia', total: farmacologiaQuestions.length },
        { id: 'propedêutica', title: 'Propedêutica', total: propedeuticaQuestions.length },
        { id: 'fisiopatologia', title: 'Fisiopatologia', total: fisiopatologiaQuestions.length },
        { id: 'bases_cirurgicas', title: 'Bases Cirúrgicas', total: basesCirurgicasQuestions.length, internal: 'bases cirúrgicas' },
        { id: 'gis2', title: 'GIS 2', total: gis2_all.length }
    ];

    let html = '';
    
    subjects.forEach(sub => {
        const internalId = sub.internal || sub.id;
        const saved = localStorage.getItem('pr1_progress_' + internalId);
        
        let ans = 0;
        let corr = 0;
        let incorr = 0;
        
        if (saved) {
            try {
                const data = JSON.parse(saved);
                ans = data.answeredQuestions ? data.answeredQuestions.length : 0;
                corr = data.correctAnswers ? data.correctAnswers.length : 0;
                incorr = data.incorrectAnswers ? data.incorrectAnswers.length : 0;
            } catch(e) {}
        }
        
        const pct = sub.total > 0 ? Math.round((ans / sub.total) * 100) : 0;
        const acc = ans > 0 ? Math.round((corr / ans) * 100) : 0;
        
        html += \`
            <div class="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                <div class="flex justify-between items-end mb-2">
                    <h4 class="font-bold text-gray-900">\${sub.title}</h4>
                    <span class="text-sm font-bold \${acc >= 70 ? 'text-emerald-600' : (acc >= 40 ? 'text-orange-500' : 'text-red-500')}">\${acc}% acerto</span>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div class="bg-blue-600 h-full rounded-full transition-all" style="width: \${pct}%"></div>
                    </div>
                    <span class="text-xs font-bold text-gray-500 w-16 text-right">\${ans} / \${sub.total}</span>
                </div>
                <div class="flex space-x-4 mt-2 text-xs">
                    <div class="flex items-center text-gray-500"><div class="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></div>\${corr} corretas</div>
                    <div class="flex items-center text-gray-500"><div class="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>\${incorr} erradas</div>
                </div>
            </div>
        \`;
    });
    
    container.innerHTML = html;
}

// Override updateDashboardStats to also render metrics
const oldUpdate = (window as any).updateDashboardStats;
(window as any).updateDashboardStats = function() {
    if(oldUpdate) oldUpdate();
    renderDetailedMetrics();
};

// --- Simulado Cronometrado ---
let simConfig = { q: 20, t: 30 };
let simTimer: any = null;
let simTimeRemaining = 0;

(window as any).selectSimuladoQ = function(val: number) {
    simConfig.q = val;
    [20, 40, 80].forEach(n => {
        const btn = document.getElementById('btn-sim-q-' + n);
        if(btn) {
            if(n === val) {
                btn.className = 'btn-sim-q py-3 rounded-xl border-2 border-orange-500 bg-orange-50 text-orange-700 font-bold';
            } else {
                btn.className = 'btn-sim-q py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50';
            }
        }
    });
};

(window as any).selectSimuladoT = function(val: number) {
    simConfig.t = val;
    [30, 60, 120].forEach(n => {
        const btn = document.getElementById('btn-sim-t-' + n);
        if(btn) {
            if(n === val) {
                btn.className = 'btn-sim-t py-3 rounded-xl border-2 border-orange-500 bg-orange-50 text-orange-700 font-bold';
            } else {
                btn.className = 'btn-sim-t py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50';
            }
        }
    });
};

(window as any).startSimulado = function() {
    // Collect all questions
    const allQ = [
        ...farmacologiaQuestions.map(q => ({...q, ogSubject: 'Farmacologia'})),
        ...propedeuticaQuestions.map(q => ({...q, ogSubject: 'Propedêutica'})),
        ...fisiopatologiaQuestions.map(q => ({...q, ogSubject: 'Fisiopatologia'})),
        ...basesCirurgicasQuestions.map(q => ({...q, ogSubject: 'Bases Cirúrgicas'})),
        ...gis2_all.map(q => ({...q, ogSubject: 'GIS 2'}))
    ];
    
    // Shuffle and pick
    for (let i = allQ.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQ[i], allQ[j]] = [allQ[j], allQ[i]];
    }
    
    const selectedQ = allQ.slice(0, Math.min(simConfig.q, allQ.length));
    
    // Set global test state
    currentSubject = 'simulado';
    questions = selectedQ;
    currentQuestionIndex = 0;
    answeredQuestions.clear();
    correctAnswers.clear();
    incorrectAnswers.clear();
    
    // UI Update
    document.getElementById('header-subject-title')!.textContent = 'Simulado (' + simConfig.q + 'Q)';
    
    // Start timer
    simTimeRemaining = simConfig.t * 60;
    const timerDisplay = document.getElementById('timer-display');
    if(timerDisplay) {
        timerDisplay.classList.remove('hidden');
        timerDisplay.classList.add('flex');
    }
    
    updateTimerDisplay();
    clearInterval(simTimer);
    simTimer = setInterval(() => {
        simTimeRemaining--;
        updateTimerDisplay();
        if(simTimeRemaining <= 0) {
            clearInterval(simTimer);
            alert('Tempo esgotado!');
            (window as any).finishTest();
        }
    }, 1000);
    
    // Init Grid and Show
    appScreenEl.classList.remove('hidden');
    appScreenEl.classList.add('flex');
    homeScreenEl.classList.add('hidden');
    
    // Create grid and load Q0
    (window as any).initGridSimulado();
    (window as any).loadQuestionSimulado(0);
};

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display');
    if(!timerDisplay) return;
    
    const h = Math.floor(simTimeRemaining / 3600);
    const m = Math.floor((simTimeRemaining % 3600) / 60);
    const s = simTimeRemaining % 60;
    
    timerDisplay.textContent = 
        String(h).padStart(2, '0') + ':' + 
        String(m).padStart(2, '0') + ':' + 
        String(s).padStart(2, '0');
        
    if(simTimeRemaining < 300) {
        timerDisplay.classList.remove('bg-orange-100', 'text-orange-700');
        timerDisplay.classList.add('bg-red-100', 'text-red-700', 'animate-pulse');
    } else {
        timerDisplay.classList.add('bg-orange-100', 'text-orange-700');
        timerDisplay.classList.remove('bg-red-100', 'text-red-700', 'animate-pulse');
    }
}

// We need special versions of initGrid and loadQuestion because they are encapsulated in the main scope
// Fortunately, they refer to globals. We can expose them if needed, or simply override them.
(window as any).initGridSimulado = function() {
    questionGridEl.innerHTML = '';
    questions.forEach((q, i) => {
        const btn = document.createElement('button');
        btn.className = 'grid-btn flex items-center justify-center w-10 h-10 rounded border text-xs font-bold transition-all';
        btn.textContent = (i + 1).toString().padStart(2, '0');
        btn.onclick = () => (window as any).goToQuestion(i);
        questionGridEl.appendChild(btn);
    });
};

(window as any).loadQuestionSimulado = function(index: number) {
    if (questions.length === 0) return;
    currentQuestionIndex = index;
    const q = questions[index];
    
    questionCounterEl.textContent = \`QUESTÃO \${index + 1}\`;
    questionTypeEl.textContent = q.type + (q.ogSubject ? ' • ' + q.ogSubject : '');
    questionTextEl.textContent = q.text;
    
    optionsContainerEl.innerHTML = '';
    
    const isAnswered = answeredQuestions.has(index);
    const isCorrectAns = correctAnswers.has(index);
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn flex items-start text-left p-4 rounded-xl border-2 transition-all cursor-pointer bg-white group';
        
        const letter = String.fromCharCode(65 + i);
        let statusClass = 'border-gray-200 text-gray-500 group-hover:border-blue-300';
        let bgClass = 'bg-gray-100';
        let textClass = 'text-gray-700';
        
        if (isAnswered) {
            if (opt.isCorrect) {
                statusClass = 'border-green-500 text-green-700 bg-green-50';
                bgClass = 'bg-green-500 text-white border-green-500';
            } else {
                statusClass = 'border-red-200 text-gray-500 opacity-60';
                bgClass = 'bg-gray-100 text-gray-400';
            }
        }
        
        btn.innerHTML = \`
            <div class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm mr-4 border-2 transition-colors \${bgClass} \${isAnswered ? '' : 'border-gray-200'}">
                \${letter}
            </div>
            <div class="text-sm md:text-base font-medium \${textClass} pt-1 leading-relaxed">
                \${opt.text}
            </div>
        \`;
        
        if (!isAnswered) {
            btn.onclick = () => {
                (window as any).recordSelfAssessment(opt.isCorrect);
                (window as any).loadQuestionSimulado(index); // re-render to show correct
            };
        }
        
        btn.classList.add(...statusClass.split(' '));
        optionsContainerEl.appendChild(btn);
    });
    
    // Update Grid and progress
    const buttons = questionGridEl.querySelectorAll('.grid-btn');
    buttons.forEach((btn, i) => {
        const isAns = answeredQuestions.has(i);
        const isCorr = correctAnswers.has(i);
        const isInc = incorrectAnswers.has(i);
        const isActive = i === index;
        
        btn.className = 'grid-btn flex items-center justify-center w-10 h-10 rounded border text-xs font-bold transition-all';
        
        if (isCorr) {
            btn.classList.add('border-green-600', 'bg-green-50', 'text-green-600', 'hover:bg-green-100');
        } else if (isInc) {
            btn.classList.add('border-red-600', 'bg-red-50', 'text-red-600', 'hover:bg-red-100');
        } else if (isAns) {
            btn.classList.add('border-blue-600', 'bg-blue-50', 'text-blue-600', 'hover:bg-blue-100');
        } else {
            btn.classList.add('border-gray-200', 'bg-white', 'text-gray-500', 'hover:bg-gray-100');
        }
        
        if (isActive) {
            btn.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2');
            if(!isAns && !isCorr && !isInc) {
                btn.classList.remove('border-gray-200');
                btn.classList.add('border-gray-300');
            }
        }
    });
    
    const progressPercent = Math.round((answeredQuestions.size / questions.length) * 100);
    progressTextEl.textContent = \`\${answeredQuestions.size} de \${questions.length}\`;
    progressBarEl.style.width = \`\${progressPercent}%\`;
};

// Override original loadQuestion to check if simulado
const ogLoadQuestion = (window as any).goToQuestion || function(i:number){ loadQuestion(i); };
(window as any).goToQuestion = function(index: number) {
    if(currentSubject === 'simulado') {
        (window as any).loadQuestionSimulado(index);
    } else {
        ogLoadQuestion(index);
    }
};

// Also patch backToHome to clear timer
const ogBackToHome = (window as any).backToHome;
(window as any).backToHome = function() {
    clearInterval(simTimer);
    const timerDisplay = document.getElementById('timer-display');
    if(timerDisplay) {
        timerDisplay.classList.add('hidden');
        timerDisplay.classList.remove('flex');
    }
    ogBackToHome();
};
`;

main = main.replace('// --- Navigation Logic ---', additionalLogic + '\n// --- Navigation Logic ---');
fs.writeFileSync('src/main.tsx', main);
console.log("Patched main.tsx with new features");
