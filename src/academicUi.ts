import { getAcademicDisciplines, saveAcademicDisciplines } from './academicData';
import { getLocalDriveMaterials, saveLocalDriveMaterials, getLocalDriveReport, fetchDriveMaterialsRecursively } from './driveService';
import { AcademicDiscipline, AcademicLesson, DriveFileItem, SubjectId } from './types';

export function renderOrganizeMaterialsModal(): string {
  const files = getLocalDriveMaterials();
  const report = getLocalDriveReport();

  return `
  <div id="modal-organize-materials" class="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-white rounded-3xl max-w-5xl w-full p-6 md:p-8 shadow-2xl border border-gray-100 max-h-[92vh] flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <div>
            <h2 class="text-xl font-black text-gray-900">Organizar Materiais Acadêmicos (Google Drive)</h2>
            <p class="text-xs text-gray-500">Classifique os arquivos do semestre em 3 estados: Importado, Mapeado e Pronto para Estudo.</p>
          </div>
        </div>
        <button onclick="window.closeOrganizeMaterialsModal()" class="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Sync Report Summary Card -->
      <div class="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 shrink-0 text-center">
        <div>
          <span class="text-[10px] font-bold uppercase text-gray-500">Total Importados</span>
          <p class="text-xl font-black text-gray-900">${report.totalFiles}</p>
        </div>
        <div>
          <span class="text-[10px] font-bold uppercase text-gray-500">Não Classificados</span>
          <p class="text-xl font-black text-amber-600">${report.unclassifiedCount}</p>
        </div>
        <div>
          <span class="text-[10px] font-bold uppercase text-gray-500">Provas Identificadas</span>
          <p class="text-xl font-black text-blue-600">${report.examsCount}</p>
        </div>
        <div>
          <span class="text-[10px] font-bold uppercase text-gray-500">Gabaritos</span>
          <p class="text-xl font-black text-emerald-600">${report.answerKeysCount}</p>
        </div>
        <div>
          <span class="text-[10px] font-bold uppercase text-gray-500">Duplicatas</span>
          <p class="text-xl font-black text-gray-500">${report.duplicatesCount}</p>
        </div>
        <div>
          <span class="text-[10px] font-bold uppercase text-gray-500">Última Sincronização</span>
          <p class="text-[11px] font-bold text-gray-700 mt-1">${new Date(report.lastSyncTime).toLocaleDateString('pt-BR')} ${new Date(report.lastSyncTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>

      <!-- Actions bar -->
      <div class="mt-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div class="flex items-center gap-2">
          <input type="text" id="organize-search-input" oninput="window.filterOrganizeList()" placeholder="Filtrar por nome do material..." class="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
          <select id="organize-status-filter" onchange="window.filterOrganizeList()" class="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl">
            <option value="all">Todos os Estados</option>
            <option value="importado">Estado: Importado</option>
            <option value="mapeado">Estado: Mapeado</option>
            <option value="pronto_para_estudo">Estado: Pronto para Estudo</option>
          </select>
        </div>
        <button onclick="window.triggerDriveManualSync()" id="btn-sync-drive-modal" class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-200 cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          <span>Atualizar materiais do Drive</span>
        </button>
      </div>

      <!-- Files List Table -->
      <div class="mt-4 flex-1 overflow-y-auto custom-scrollbar border border-gray-200 rounded-2xl">
        <table class="w-full text-left text-xs">
          <thead class="bg-gray-50 text-gray-500 font-bold uppercase sticky top-0 border-b border-gray-200">
            <tr>
              <th class="py-3 px-4">Material / Nome no Drive</th>
              <th class="py-3 px-4">Disciplina</th>
              <th class="py-3 px-4">Tipo & Prioridade</th>
              <th class="py-3 px-4">Estado</th>
              <th class="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody id="organize-table-body" class="divide-y divide-gray-100">
            ${renderOrganizeTableRows(files)}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;
}

export function renderOrganizeTableRows(files: DriveFileItem[]): string {
  if (!files || files.length === 0) {
    return `<tr><td colspan="5" class="py-8 text-center text-gray-400 font-medium">Nenhum material encontrado. Clique em "Atualizar materiais do Drive" para importar.</td></tr>`;
  }

  return files.map(file => {
    const statusBadges = {
      importado: `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">1. Importado</span>`,
      mapeado: `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">2. Mapeado</span>`,
      pronto_para_estudo: `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">3. Pronto para Estudo</span>`
    };

    return `
    <tr class="hover:bg-gray-50/80 transition-colors organize-item-row" data-name="${file.name.toLowerCase()}" data-status="${file.status}">
      <td class="py-3 px-4 max-w-xs">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          <div class="overflow-hidden">
            <p class="font-bold text-gray-900 truncate" title="${file.name}">${file.customTitle || file.name}</p>
            <p class="text-[10px] text-gray-400 truncate">${file.path || 'Raiz do Drive'}</p>
          </div>
        </div>
      </td>
      <td class="py-3 px-4">
        <select onchange="window.updateMaterialDiscipline('${file.id}', this.value)" class="text-[11px] font-semibold bg-gray-50 border border-gray-200 rounded-lg p-1">
          <option value="" ${!file.discipline ? 'selected' : ''}>Não Classificado</option>
          <option value="fisiopatologia" ${file.discipline === 'fisiopatologia' ? 'selected' : ''}>Fisiopatologia</option>
          <option value="farmacologia" ${file.discipline === 'farmacologia' ? 'selected' : ''}>Farmacologia</option>
          <option value="propedêutica" ${file.discipline === 'propedêutica' ? 'selected' : ''}>Propedêutica</option>
          <option value="bases cirúrgicas" ${file.discipline === 'bases cirúrgicas' ? 'selected' : ''}>Bases Cirúrgicas</option>
        </select>
      </td>
      <td class="py-3 px-4">
        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 capitalize">${file.materialType || 'documento'}</span>
        <span class="inline-block text-[10px] text-gray-400 ml-1">(${file.priority || 'conteúdo-base'})</span>
      </td>
      <td class="py-3 px-4">
        ${statusBadges[file.status]}
      </td>
      <td class="py-3 px-4 text-right space-x-1">
        <a href="${file.webViewLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-2 py-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg">
          Abrir
        </a>
        <button onclick="window.advanceMaterialStatus('${file.id}')" class="px-2 py-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg cursor-pointer">
          Avançar Status
        </button>
      </td>
    </tr>
    `;
  }).join('');
}
