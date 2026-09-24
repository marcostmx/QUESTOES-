import { getAcademicDisciplines } from './academicData';
import { getLocalDriveMaterials } from './driveService';
import { ErrorLogItem, SubjectId } from './types';

const ERROR_LOG_STORAGE_KEY = 'pr1_error_notebook_v1';

export function getErrorNotebook(): ErrorLogItem[] {
  try {
    const raw = localStorage.getItem(ERROR_LOG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

export function saveErrorNotebook(list: ErrorLogItem[]) {
  try {
    localStorage.setItem(ERROR_LOG_STORAGE_KEY, JSON.stringify(list));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pr1-errors-updated', { detail: { count: list.length } }));
    }
  } catch (e) {
    console.error('Erro ao salvar caderno de erros:', e);
  }
}

export function addErrorToNotebook(item: {
  questionIndex: number;
  subject: SubjectId;
  questionText: string;
  selectedOption: string;
  correctOption: string;
  explanation: string;
  lessonId?: string;
}) {
  const errors = getErrorNotebook();
  // Check if already in notebook
  const existing = errors.find(e => e.questionIndex === item.questionIndex && e.subject === item.subject);
  if (existing) {
    existing.timestamp = new Date().toISOString();
    saveErrorNotebook(errors);
    return;
  }

  // Find linked materials in Drive
  const materials = getLocalDriveMaterials();
  const linked = materials.filter(m => m.discipline === item.subject);
  const topMaterial = linked[0]?.name || 'Material da disciplina no Drive';

  const newError: ErrorLogItem = {
    id: 'err-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
    questionIndex: item.questionIndex,
    subject: item.subject,
    questionText: item.questionText,
    selectedOption: item.selectedOption,
    correctOption: item.correctOption,
    explanation: item.explanation,
    lessonId: item.lessonId,
    timestamp: new Date().toISOString(),
    reviewed: false,
    originMaterial: topMaterial,
    userNotes: ''
  };

  errors.unshift(newError);
  saveErrorNotebook(errors);
}

export function renderErrorNotebookView(): string {
  const errors = getErrorNotebook();

  return `
  <div id="error-notebook-container" class="space-y-8 fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Caderno de Erros</h1>
        <p class="text-xs text-gray-500 mt-1">Todas as questões que você errou, vinculadas diretamente às aulas e materiais do Drive para revisão dirigida.</p>
      </div>

      <div class="flex items-center gap-2">
        <span class="px-3.5 py-1.5 bg-rose-50 text-rose-700 font-bold text-xs rounded-xl border border-rose-100">
          ${errors.length} erros catalogados
        </span>
      </div>
    </div>

    <!-- Error list -->
    ${errors.length === 0 ? `
      <div class="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center space-y-4 max-w-lg mx-auto">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Nenhum erro registrado ainda!</h3>
          <p class="text-xs text-gray-500 mt-1">Conforme você resolve as questões dos simulados e disciplinas, as questões incorretas serão mapeadas automaticamente aqui com a indicação de qual material do Drive você deve reler.</p>
        </div>
        <button onclick="window.switchTab('dashboard')" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-200 cursor-pointer">
          Praticar Questões
        </button>
      </div>
    ` : `
      <div class="space-y-4">
        ${errors.map(err => `
          <div class="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 uppercase">
                  ${err.subject}
                </span>
                <span class="text-xs font-bold text-gray-700">Questão #${err.questionIndex + 1}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[11px] text-gray-400 font-medium">
                  ${new Date(err.timestamp).toLocaleDateString('pt-BR')}
                </span>
                <button onclick="window.removeErrorNotebookItem('${err.id}')" class="text-gray-400 hover:text-rose-600 p-1 transition-colors" title="Remover do caderno de erros">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>

            <!-- Question statement -->
            <p class="text-xs font-medium text-gray-800 leading-relaxed">${err.questionText}</p>

            <!-- Comparison -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-rose-50 border border-rose-100">
                <span class="font-bold text-rose-800 block text-[10px] uppercase">Sua Resposta:</span>
                <p class="text-rose-950 mt-0.5 font-medium">${err.selectedOption || 'Não assinalada'}</p>
              </div>
              <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <span class="font-bold text-emerald-800 block text-[10px] uppercase">Gabarito Correto:</span>
                <p class="text-emerald-950 mt-0.5 font-medium">${err.correctOption}</p>
              </div>
            </div>

            <!-- Explanation -->
            ${err.explanation ? `
              <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-600 leading-relaxed">
                <span class="font-bold text-gray-700 block text-[10px] uppercase mb-1">Explicação / Raciocínio Clínico:</span>
                ${err.explanation}
              </div>
            ` : ''}

            <!-- Drive Grounding Source -->
            <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                <div>
                  <span class="text-[10px] font-bold uppercase text-blue-800 block">Material Recomendado no Drive para Revisão:</span>
                  <p class="font-bold text-blue-950">${err.originMaterial}</p>
                </div>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button onclick="window.askTutorAboutError('${err.id}')" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer">
                  Explicar com Prof. Assistente
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `}
  </div>
  `;
}
