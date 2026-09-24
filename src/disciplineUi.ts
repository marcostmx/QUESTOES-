import { AcademicDiscipline, AcademicLesson, DriveFileItem, ErrorLogItem, SubjectId } from './types';
import { getAcademicDisciplines } from './academicData';
import { getLocalDriveMaterials } from './driveService';

export function getDisciplineDriveMaterials(disciplineId: SubjectId): DriveFileItem[] {
  const materials = getLocalDriveMaterials();
  return materials.filter(m => m.discipline === disciplineId);
}

export function renderDisciplineDetailView(disciplineId: SubjectId): string {
  const disciplines = getAcademicDisciplines();
  const disc = disciplines.find(d => d.id === disciplineId);
  if (!disc) return `<div class="p-8 text-center text-gray-500">Disciplina não encontrada.</div>`;

  const driveMaterials = getDisciplineDriveMaterials(disciplineId);
  const examMaterials = driveMaterials.filter(m => m.materialType === 'prova_antiga' || m.materialType === 'gabarito');
  const requiredMaterials = driveMaterials.filter(m => m.priority === 'conteúdo-base');

  return `
  <div id="discipline-detail-container" class="space-y-8 fade-in">
    <!-- Back and Breadcrumb -->
    <div class="flex items-center justify-between">
      <button onclick="window.backToDisciplinesList()" class="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        <span>Voltar para Disciplinas</span>
      </button>

      <div class="flex items-center gap-2">
        <a href="https://drive.google.com/drive/folders/1M4XXYKo43Db531FwehPucpYKfQNwCWnA" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>
          <span>Abrir Pasta da Disciplina no Drive</span>
        </a>
      </div>
    </div>

    <!-- Header Hero Banner -->
    <div class="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="space-y-2 max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
          Fonte Oficial: Google Drive
        </div>
        <h1 class="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">${disc.name}</h1>
        <p class="text-sm text-gray-600 leading-relaxed">${disc.description}</p>
        <div class="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500 pt-2">
          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-blue-500"></span>${disc.modules.length} Módulos</span>
          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>${driveMaterials.length} Materiais no Drive</span>
          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-purple-500"></span>${examMaterials.length} Provas Anteriores</span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
        <button onclick="window.startSubject('${disc.id}')" class="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all cursor-pointer flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path></svg>
          <span>Continuar Estudando</span>
        </button>
        <button onclick="window.openDisciplineExams('${disc.id}')" class="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl font-bold transition-all cursor-pointer flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          <span>Provas & Avaliações</span>
        </button>
        <button onclick="window.confirmResetCurrentSubject('${disc.id}')" class="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border border-red-100">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          <span>Zerar e Reiniciar Módulo</span>
        </button>
      </div>
    </div>

    <!-- Main Content: Modules & Lessons -->
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-900">Trilha Acadêmica de Módulos e Aulas</h2>
        <span class="text-xs font-semibold text-gray-500">Alinhada com arquivos do Drive</span>
      </div>

      <div class="space-y-4">
        ${disc.modules.map(mod => `
          <div class="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
            <div class="p-5 bg-gray-50/70 border-b border-gray-100 flex items-center justify-between cursor-pointer" onclick="window.toggleModuleAccordion('${mod.id}')">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  ${mod.title.match(/Módulo\s+(\d+)/i)?.[1] || '1'}
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 text-base">${mod.title}</h3>
                  <p class="text-xs text-gray-500">${mod.description || ''}</p>
                </div>
              </div>
              <span class="text-xs font-bold text-gray-400 flex items-center gap-1">
                ${mod.lessons.length} aulas
                <svg id="mod-arrow-${mod.id}" class="w-4 h-4 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </span>
            </div>

            <div id="mod-content-${mod.id}" class="divide-y divide-gray-100">
              ${mod.lessons.map(lesson => {
                const linkedMaterials = driveMaterials.filter(m => m.lesson === lesson.id || m.module === mod.title);
                return `
                <div class="p-5 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="space-y-1.5 max-w-2xl">
                    <div class="flex items-center gap-2">
                      <h4 class="font-bold text-gray-900 text-sm hover:text-blue-600 transition-colors cursor-pointer" onclick="window.openLessonDetail('${lesson.id}')">${lesson.title}</h4>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">${lesson.relatedQuestionIndices.length} Questões</span>
                    </div>
                    <ul class="text-xs text-gray-500 space-y-0.5 list-disc list-inside">
                      ${lesson.objectives.slice(0, 2).map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                    <div class="flex items-center gap-3 text-[11px] text-gray-400 pt-1">
                      <span class="flex items-center gap-1 font-semibold text-gray-600">
                        <svg class="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        ${linkedMaterials.length} Materiais no Drive
                      </span>
                      <span>•</span>
                      <span>Alta incidência em Provas</span>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    <button onclick="window.openLessonDetail('${lesson.id}')" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer">
                      Estudar Aula
                    </button>
                    <button onclick="window.solveLessonQuestions('${disc.id}', '${lesson.id}')" class="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors cursor-pointer">
                      Questões (${lesson.relatedQuestionIndices.length})
                    </button>
                  </div>
                </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
  `;
}
