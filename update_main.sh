#!/bin/bash

cat << 'TSX_EOF' > src/main.tsx
import { q1 } from './q1';
import { q2 } from './q2';
import { q3 } from './q3';
import { q4 } from './q4';

// Emulate databases for other subjects
const fisiopatologiaQuestions = [...q1, ...q2, ...q3, ...q4];
const farmacologiaQuestions: any[] = [];
const propedeuticaQuestions: any[] = [];
const basesCirurgicasQuestions: any[] = [];

let currentSubject: string = '';
let questions: any[] = [];
let currentQuestionIndex = 0;
let answeredQuestions = new Set<number>();
let timerSeconds = 0;
let timerInterval: any;

// DOM Elements
const homeScreenEl = document.getElementById('home-screen')!;
const appScreenEl = document.getElementById('app-screen')!;
const headerSubjectTitleEl = document.getElementById('header-subject-title')!;
const emptyStateEl = document.getElementById('empty-state')!;
const quizContainerEl = document.getElementById('quiz-container')!;

const questionCounterEl = document.getElementById('question-counter')!;
const questionTypeEl = document.getElementById('question-type')!;
const questionTextEl = document.getElementById('question-text')!;
const interactionAreaEl = document.getElementById('interaction-area')!;
const feedbackAreaEl = document.getElementById('feedback-area')!;
const feedbackTextEl = document.getElementById('feedback-text')!;
const btnShowAnswer = document.getElementById('btn-show-answer')!;
const btnNext = document.getElementById('btn-next')!;
const btnPrev = document.getElementById('btn-prev')!;
const endScreenEl = document.getElementById('end-screen')!;
const questionGridEl = document.getElementById('question-grid')!;
const progressTextEl = document.getElementById('progress-text')!;
const progressBarEl = document.getElementById('progress-bar')!;
const timerDisplayEl = document.getElementById('timer-display')!;

(window as any).startSubject = function(subject: string) {
    currentSubject = subject;
    
    // Set active questions array
    if (subject === 'farmacologia') {
        questions = farmacologiaQuestions;
        headerSubjectTitleEl.textContent = 'Farmacologia PR1';
    } else if (subject === 'propedêutica') {
        questions = propedeuticaQuestions;
        headerSubjectTitleEl.textContent = 'Propedêutica PR1';
    } else if (subject === 'fisiopatologia') {
        questions = fisiopatologiaQuestions;
        headerSubjectTitleEl.textContent = 'Fisiopatologia PR1';
    } else if (subject === 'bases cirúrgicas') {
        questions = basesCirurgicasQuestions;
        headerSubjectTitleEl.textContent = 'Bases Cirúrgicas PR1';
    }

    // Reset state
    currentQuestionIndex = 0;
    answeredQuestions.clear();
    timerSeconds = 0;
    if (timerInterval) clearInterval(timerInterval);

    // Switch Screens
    homeScreenEl.classList.add('hidden');
    appScreenEl.classList.remove('hidden');
    appScreenEl.classList.add('flex');
    endScreenEl.classList.add('hidden');

    if (questions.length === 0) {
        emptyStateEl.classList.remove('hidden');
        quizContainerEl.classList.add('hidden');
    } else {
        emptyStateEl.classList.add('hidden');
        quizContainerEl.classList.remove('hidden');
        initGrid();
        startTimer();
        loadQuestion(0);
    }
};

(window as any).backToHome = function() {
    appScreenEl.classList.add('hidden');
    appScreenEl.classList.remove('flex');
    homeScreenEl.classList.remove('hidden');
    if (timerInterval) clearInterval(timerInterval);
};

(window as any).restartTest = function() {
    (window as any).startSubject(currentSubject);
};

function formatTime(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function startTimer() {
    timerDisplayEl.textContent = formatTime(timerSeconds);
    timerInterval = setInterval(() => {
        timerSeconds++;
        timerDisplayEl.textContent = formatTime(timerSeconds);
    }, 1000);
}

function initGrid() {
    questionGridEl.innerHTML = '';
    questions.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'grid-btn flex items-center justify-center w-10 h-10 rounded border text-xs font-bold transition-all';
        btn.textContent = (i + 1).toString().padStart(2, '0');
        btn.onclick = () => (window as any).goToQuestion(i);
        questionGridEl.appendChild(btn);
    });
}

function updateGridAndProgress() {
    if (questions.length === 0) return;
    
    const buttons = questionGridEl.querySelectorAll('.grid-btn');
    buttons.forEach((btn, i) => {
        const isAnswered = answeredQuestions.has(i);
        const isActive = i === currentQuestionIndex;
        
        // Base styles reset
        btn.className = 'grid-btn flex items-center justify-center w-10 h-10 rounded border text-xs font-bold transition-all hover:bg-blue-100 cursor-pointer';
        
        if (isActive) {
            if (isAnswered) {
                btn.classList.add('border-blue-600', 'bg-blue-50', 'text-blue-600', 'ring-2', 'ring-blue-500', 'ring-offset-2');
            } else {
                btn.classList.add('border-gray-300', 'bg-white', 'text-gray-600', 'ring-2', 'ring-blue-500', 'ring-offset-2');
            }
        } else {
            if (isAnswered) {
                btn.classList.add('border-blue-600', 'bg-blue-50', 'text-blue-600');
            } else {
                btn.classList.add('border-gray-200', 'bg-gray-50', 'text-gray-400');
            }
        }
    });

    const progressPercent = Math.round((answeredQuestions.size / questions.length) * 100);
    progressTextEl.textContent = `${answeredQuestions.size} de ${questions.length}`;
    progressBarEl.style.width = `${progressPercent}%`;
}

function loadQuestion(index: number) {
    if (questions.length === 0) return;
    
    currentQuestionIndex = index;
    const q = questions[index];
    
    // Update Headers
    questionCounterEl.textContent = `QUESTÃO ${index + 1}`;
    questionTypeEl.textContent = q.type;
    questionTextEl.textContent = q.text;

    // Render Interaction Area
    if (q.interactionType === 'textarea') {
        interactionAreaEl.innerHTML = `
            <textarea class="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm" 
                      rows="5" placeholder="Escreva seus tópicos / rascunho de resposta aqui..."></textarea>
        `;
    } else if (q.interactionType === 'multiple-choice' && q.options) {
        let optionsHtml = '<div class="space-y-3">';
        q.options.forEach((opt: string, i: number) => {
            const letter = String.fromCharCode(65 + i);
            optionsHtml += `
                <label id="mcq-label-${i}" class="mcq-label flex items-start p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all group shadow-sm">
                    <div id="mcq-letter-${i}" class="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0 text-sm font-bold text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500 mr-4 transition-all">
                        ${letter}
                    </div>
                    <input type="radio" name="mcq" value="${i}" class="hidden" onchange="window.handleMCQChange(${i})">
                    <span id="mcq-text-${i}" class="text-gray-700 mt-1 transition-all">${opt}</span>
                </label>
            `;
        });
        optionsHtml += '</div>';
        interactionAreaEl.innerHTML = optionsHtml;
    } else if (q.interactionType === 'true-false') {
        interactionAreaEl.innerHTML = `
            <textarea class="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm" 
                      rows="5" placeholder="Avalie as afirmações e corrija as falsas..."></textarea>
        `;
    }

    // Restore state if already answered
    if (answeredQuestions.has(index)) {
        feedbackAreaEl.classList.remove('hidden');
        btnShowAnswer.classList.add('hidden');
        feedbackTextEl.textContent = q.gabarito;
    } else {
        feedbackAreaEl.classList.add('hidden');
        btnShowAnswer.classList.remove('hidden');
        feedbackTextEl.textContent = '';
    }

    // Prev/Next Button states
    btnPrev.disabled = index === 0;
    btnPrev.classList.toggle('opacity-30', index === 0);
    btnPrev.classList.toggle('cursor-not-allowed', index === 0);

    if (index === questions.length - 1) {
        btnNext.innerHTML = '<span>FINALIZAR BLOCO</span><svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
    } else {
        btnNext.innerHTML = '<span>PRÓXIMA</span><svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>';
    }

    updateGridAndProgress();
}

(window as any).handleMCQChange = function (selectedIndex: number) {
    if (answeredQuestions.has(currentQuestionIndex)) return; // prevent re-answering visually if already locked
    
    const q = questions[currentQuestionIndex];
    // Find correct answer from gabarito
    const match = q.gabarito.match(/Alternativa\s+([A-E])/i);
    
    if (match) {
        const correctLetter = match[1].toUpperCase();
        const correctIndex = correctLetter.charCodeAt(0) - 65;
        
        const labels = document.querySelectorAll('.mcq-label');
        labels.forEach((label) => label.classList.add('pointer-events-none')); // disable further clicks
        
        const selectedLabel = document.getElementById(`mcq-label-${selectedIndex}`)!;
        const selectedLetterBox = document.getElementById(`mcq-letter-${selectedIndex}`)!;
        const selectedText = document.getElementById(`mcq-text-${selectedIndex}`)!;
        
        if (selectedIndex === correctIndex) {
            // Correct animation
            selectedLabel.classList.add('pop', 'border-green-500', 'bg-green-50');
            selectedLabel.classList.remove('border-gray-200', 'hover:border-blue-500', 'hover:bg-blue-50');
            selectedLetterBox.classList.add('border-green-600', 'bg-green-600', 'text-white');
            selectedLetterBox.classList.remove('border-gray-300', 'text-gray-400');
            selectedText.classList.add('text-green-900', 'font-medium');
        } else {
            // Incorrect animation
            selectedLabel.classList.add('shake', 'border-red-500', 'bg-red-50');
            selectedLabel.classList.remove('border-gray-200', 'hover:border-blue-500', 'hover:bg-blue-50');
            selectedLetterBox.classList.add('border-red-600', 'bg-red-600', 'text-white');
            selectedLetterBox.classList.remove('border-gray-300', 'text-gray-400');
            selectedText.classList.add('text-red-900', 'font-medium');
            
            // Highlight correct one
            const correctLabel = document.getElementById(`mcq-label-${correctIndex}`);
            if (correctLabel) {
                const correctLetterBox = document.getElementById(`mcq-letter-${correctIndex}`)!;
                const correctText = document.getElementById(`mcq-text-${correctIndex}`)!;
                
                correctLabel.classList.add('border-green-500', 'bg-green-50');
                correctLetterBox.classList.add('border-green-600', 'bg-green-600', 'text-white');
                correctText.classList.add('text-green-900', 'font-medium');
            }
        }
    }
    
    // Automatically show answer
    (window as any).showAnswer();
};

(window as any).showAnswer = function showAnswer() {
    const q = questions[currentQuestionIndex];
    answeredQuestions.add(currentQuestionIndex);
    
    feedbackTextEl.textContent = q.gabarito;
    feedbackAreaEl.classList.remove('hidden');
    
    btnShowAnswer.classList.add('hidden');
    updateGridAndProgress();
};

(window as any).nextQuestion = function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        triggerTransitionAndLoad(currentQuestionIndex + 1);
    } else {
        (window as any).finishTest();
    }
};

(window as any).prevQuestion = function prevQuestion() {
    if (currentQuestionIndex > 0) {
        triggerTransitionAndLoad(currentQuestionIndex - 1);
    }
};

(window as any).goToQuestion = function goToQuestion(index: number) {
    if (index >= 0 && index < questions.length && index !== currentQuestionIndex) {
        triggerTransitionAndLoad(index);
    }
};

(window as any).finishTest = function finishTest() {
    quizContainerEl.classList.add('hidden');
    endScreenEl.classList.remove('hidden');
    endScreenEl.classList.add('flex');
    clearInterval(timerInterval);
};

function triggerTransitionAndLoad(index: number) {
    quizContainerEl.classList.remove('fade-in');
    void quizContainerEl.offsetWidth; // trigger reflow
    quizContainerEl.classList.add('fade-in');
    loadQuestion(index);
}

TSX_EOF
