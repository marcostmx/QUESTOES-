import { getAcademicDisciplines } from './academicData';
import { getLocalDriveMaterials } from './driveService';
import { AcademicLesson, DriveFileItem, SubjectId } from './types';

export function findLessonById(lessonId: string): { lesson: AcademicLesson; disciplineId: SubjectId } | null {
  const disciplines = getAcademicDisciplines();
  for (const disc of disciplines) {
    for (const mod of disc.modules) {
      const found = mod.lessons.find(l => l.id === lessonId);
      if (found) return { lesson: found, disciplineId: disc.id };
    }
  }
  return null;
}

export function renderLessonDetailView(lessonId: string): string {
  const data = findLessonById(lessonId);
  if (!data) return `<div class="p-8 text-center text-gray-500">Aula não encontrada.</div>`;

  const { lesson, disciplineId } = data;
  const allMaterials = getLocalDriveMaterials();
  const linkedMaterials = allMaterials.filter(m => m.lesson === lessonId || (m.discipline === disciplineId && m.priority === 'conteúdo-base'));
  
  const requiredMaterials = linkedMaterials.filter(m => m.priority === 'conteúdo-base' || m.materialType === 'slide' || m.materialType === 'apostila');
  const complementaryMaterials = linkedMaterials.filter(m => m.priority === 'complementar' || m.materialType === 'imagem');

  return `
  <div id="lesson-detail-container" class="space-y-8 fade-in">
    <!-- Breadcrumbs -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <button onclick="window.backToDiscipline('${disciplineId}')" class="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        <span>Voltar para Módulos</span>
      </button>

      <div class="flex items-center gap-2">
        <button onclick="window.askTutorAboutLesson('${lesson.id}', '${lesson.title.replace(/'/g, "\\'")}')" class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-200 hover:brightness-110 transition-all cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          <span>Perguntar ao Prof. Assistente (IA)</span>
        </button>
        <button onclick="window.solveLessonQuestions('${disciplineId}', '${lesson.id}')" class="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors cursor-pointer">
          Resolver Questões (${lesson.relatedQuestionIndices.length})
        </button>
      </div>
    </div>

    <!-- Lesson Header -->
    <div class="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
      <div class="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
        <span>${disciplineId.toUpperCase()}</span>
        <span>•</span>
        <span>${lesson.moduleId.toUpperCase()}</span>
      </div>
      <h1 class="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">${lesson.title}</h1>

      <!-- Learning Objectives -->
      <div class="mt-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
        <h3 class="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Objetivos de Aprendizagem
        </h3>
        <ul class="space-y-1.5 text-xs text-gray-600 list-disc list-inside leading-relaxed">
          ${lesson.objectives.map(obj => `<li>${obj}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Key Concepts & High Yield Exam Points -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
        <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          Conceitos-Chave da Aula
        </h3>
        <ul class="space-y-2 text-xs text-gray-600">
          ${lesson.keyConcepts.map(kc => `
            <li class="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100/60 font-medium text-emerald-950">
              ${kc}
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
        <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
          Pontos de Maior Incidência em Provas
        </h3>
        <div class="space-y-2">
          ${lesson.highYieldExamPoints.map(hyp => `
            <div class="p-3 bg-purple-50/50 rounded-xl border border-purple-100/60 text-xs space-y-1">
              <p class="font-bold text-purple-950">${hyp.point}</p>
              <p class="text-[10px] text-purple-700 font-semibold">Fonte comprovada: ${hyp.sourceExams.join(', ')}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Materials Section (Google Drive Grounding) -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-900">Materiais Oficiais do Google Drive</h2>
        <span class="text-xs text-gray-500">Acesso direto aos arquivos do semestre</span>
      </div>

      <!-- Required Materials -->
      <div class="space-y-2">
        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500">Materiais Obrigatórios (Base)</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${requiredMaterials.length === 0 ? `<p class="text-xs text-gray-400 col-span-2">Nenhum arquivo obrigatório vinculado no momento.</p>` : requiredMaterials.map(m => `
            <div class="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between gap-3 hover:border-blue-300 transition-colors">
              <div class="flex items-center gap-3 overflow-hidden">
                <div class="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                </div>
                <div class="overflow-hidden">
                  <p class="font-bold text-xs text-gray-900 truncate" title="${m.name}">${m.customTitle || m.name}</p>
                  <p class="text-[10px] text-gray-400 capitalize">${m.materialType} • ${m.path || 'Drive'}</p>
                </div>
              </div>
              <a href="${m.webViewLink}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs shrink-0 inline-flex items-center gap-1">
                <span>Abrir</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Complementary Materials -->
      ${complementaryMaterials.length > 0 ? `
      <div class="space-y-2 pt-2">
        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500">Materiais Complementares & Esquemas</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${complementaryMaterials.map(m => `
            <div class="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between gap-3">
              <div class="flex items-center gap-3 overflow-hidden">
                <div class="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div class="overflow-hidden">
                  <p class="font-bold text-xs text-gray-900 truncate" title="${m.name}">${m.customTitle || m.name}</p>
                  <p class="text-[10px] text-gray-400 capitalize">${m.materialType} • Complementar</p>
                </div>
              </div>
              <a href="${m.webViewLink}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold shrink-0">
                Visualizar
              </a>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}
    </div>
  </div>
  `;
}
