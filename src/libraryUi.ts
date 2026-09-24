import { getLocalDriveMaterials } from './driveService';
import { DriveFileItem, MaterialType, SubjectId } from './types';

export function renderAcademicLibraryView(activeCategory: string = 'all'): string {
  const materials = getLocalDriveMaterials();

  const slidesCount = materials.filter(m => m.materialType === 'slide').length;
  const examsCount = materials.filter(m => m.materialType === 'prova_antiga').length;
  const answerKeysCount = materials.filter(m => m.materialType === 'gabarito').length;
  const apostilasCount = materials.filter(m => m.materialType === 'apostila').length;
  const resumosCount = materials.filter(m => m.materialType === 'resumo').length;
  const listasCount = materials.filter(m => m.materialType === 'lista' || m.materialType === 'pdf' || m.materialType === 'documento').length;

  const getTabClass = (cat: string) => {
    const isSelected = activeCategory === cat;
    if (isSelected) {
      return 'lib-category-tab shrink-0 flex-shrink-0 px-4 py-2 rounded-xl font-bold bg-gray-900 text-white shadow-xs whitespace-nowrap cursor-pointer transition-all touch-manipulation select-none';
    }
    return 'lib-category-tab shrink-0 flex-shrink-0 px-4 py-2 rounded-xl font-bold bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-xs whitespace-nowrap cursor-pointer transition-all touch-manipulation select-none';
  };

  return `
  <div id="library-container" class="space-y-6 fade-in pb-12">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mb-2">
          <svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5M9.73 3.5h13.12l-3.43 6H6.3M15.73 21L22.28 9.5l-3.42-6-6.56 11.5"></path></svg>
          <span>Google Drive Oficial • Semestre</span>
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Biblioteca & Repositório Acadêmico</h1>
        <p class="text-xs text-gray-500 mt-1">Acesso direto e catalogado aos slides, provas anteriores, apostilas e resumos originais do Google Drive.</p>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <button onclick="window.openOrganizeMaterialsModal()" class="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          <span>Mapeamento & Status</span>
        </button>
      </div>
    </div>

    <!-- Category Pills Tabs (Slides vs Provas vs Apostilas vs Resumos) -->
    <div class="relative w-full group">
      <button type="button" onclick="window.scrollLibraryTabs(-220)" aria-label="Rolar para esquerda" class="hidden sm:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 items-center justify-center rounded-full bg-white/95 border border-gray-200 shadow-md text-gray-600 hover:text-gray-900 transition-opacity cursor-pointer">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>

      <div id="library-category-tabs-container" class="flex items-center gap-2 overflow-x-auto touch-scroll-x custom-scrollbar-x pb-2 pt-1 px-1 text-xs w-full max-w-full scroll-smooth select-none cursor-grab active:cursor-grabbing">
        <button onclick="window.setLibraryCategoryTab('all')" id="lib-tab-all" class="${getTabClass('all')}">
          Todos (${materials.length})
        </button>
        <button onclick="window.setLibraryCategoryTab('slide')" id="lib-tab-slide" class="${getTabClass('slide')} flex items-center gap-1.5 hover:bg-amber-50 hover:text-amber-700">
          <span class="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
          <span>Slides de Aula (${slidesCount})</span>
        </button>
        <button onclick="window.setLibraryCategoryTab('prova_antiga')" id="lib-tab-prova_antiga" class="${getTabClass('prova_antiga')} flex items-center gap-1.5 hover:bg-purple-50 hover:text-purple-700">
          <span class="w-2 h-2 rounded-full bg-purple-600 shrink-0"></span>
          <span>Provas Anteriores (${examsCount})</span>
        </button>
        <button onclick="window.setLibraryCategoryTab('gabarito')" id="lib-tab-gabarito" class="${getTabClass('gabarito')} flex items-center gap-1.5 hover:bg-emerald-50 hover:text-emerald-700">
          <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
          <span>Gabaritos Oficiais (${answerKeysCount})</span>
        </button>
        <button onclick="window.setLibraryCategoryTab('apostila')" id="lib-tab-apostila" class="${getTabClass('apostila')} flex items-center gap-1.5 hover:bg-blue-50 hover:text-blue-700">
          <span class="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
          <span>Apostilas & Manuais (${apostilasCount})</span>
        </button>
        <button onclick="window.setLibraryCategoryTab('resumo')" id="lib-tab-resumo" class="${getTabClass('resumo')} flex items-center gap-1.5 hover:bg-rose-50 hover:text-rose-700">
          <span class="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
          <span>Resumos & Reta Final (${resumosCount})</span>
        </button>
        <button onclick="window.setLibraryCategoryTab('lista')" id="lib-tab-lista" class="${getTabClass('lista')} flex items-center gap-1.5 hover:bg-indigo-50 hover:text-indigo-700">
          <span class="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></span>
          <span>Listas de Questões (${listasCount})</span>
        </button>
      </div>

      <button type="button" onclick="window.scrollLibraryTabs(220)" aria-label="Rolar para direita" class="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 items-center justify-center rounded-full bg-white/95 border border-gray-200 shadow-md text-gray-600 hover:text-gray-900 transition-opacity cursor-pointer">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>

    <!-- Filters Bar -->
    <div class="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-2 flex-1">
        <div class="relative w-full sm:w-72">
          <input type="text" id="lib-search-input" oninput="window.filterLibraryMaterials()" placeholder="Buscar material por título..." class="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <svg class="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        
        <select id="lib-discipline-filter" onchange="window.filterLibraryMaterials()" class="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-semibold">
          <option value="all">Todas as Disciplinas</option>
          <option value="fisiopatologia">Fisiopatologia</option>
          <option value="farmacologia">Farmacologia</option>
          <option value="propedêutica">Propedêutica</option>
          <option value="bases cirúrgicas">Bases Cirúrgicas</option>
          <option value="iesc_iv">IESC IV</option>
        </select>

        <select id="lib-type-filter" onchange="window.filterLibraryMaterials()" class="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-semibold">
          <option value="all">Todos os Tipos</option>
          <option value="slide">Slides</option>
          <option value="prova_antiga">Provas Antigas</option>
          <option value="gabarito">Gabaritos</option>
          <option value="apostila">Apostilas</option>
          <option value="resumo">Resumos</option>
          <option value="lista">Listas de Questões</option>
          <option value="pdf">Outros PDFs</option>
        </select>

        <button onclick="window.clearLibraryFilters()" class="text-xs text-gray-400 hover:text-gray-600 font-medium px-2 py-1">
          Limpar
        </button>
      </div>

      <div class="text-xs font-bold text-gray-500 flex items-center gap-1.5">
        <span>Exibindo</span>
        <span id="lib-total-count" class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-black">${materials.length}</span>
        <span>de ${materials.length} materiais</span>
      </div>
    </div>

    <!-- Material Cards Grid -->
    <div id="library-cards-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      ${materials.map(m => renderLibraryCard(m)).join('')}
    </div>

    <div id="lib-no-results" class="hidden py-16 text-center bg-white rounded-3xl border border-gray-200">
      <div class="w-12 h-12 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <h3 class="text-sm font-bold text-gray-900">Nenhum arquivo encontrado com esses filtros</h3>
      <p class="text-xs text-gray-500 mt-1">Tente remover filtros ou buscar por palavras-chave mais genéricas.</p>
      <button onclick="window.clearLibraryFilters()" class="mt-4 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold">
        Redefinir Filtros
      </button>
    </div>
  </div>
  `;
}

export function renderLibraryCard(material: DriveFileItem): string {
  const typeIcons: Record<string, string> = {
    slide: `<svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>`,
    apostila: `<svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
    prova_antiga: `<svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>`,
    gabarito: `<svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
    resumo: `<svg class="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`,
    lista: `<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>`,
    imagem: `<svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`,
    pdf: `<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`
  };

  const typeNames: Record<string, string> = {
    slide: 'Slide de Aula',
    prova_antiga: 'Prova Antiga',
    gabarito: 'Gabarito Oficial',
    apostila: 'Apostila',
    resumo: 'Resumo',
    lista: 'Lista de Exercícios',
    pdf: 'Documento PDF',
    imagem: 'Imagem / Esquema',
    documento: 'Arquivo'
  };

  const disciplineColors: Record<string, { bg: string; text: string }> = {
    fisiopatologia: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
    farmacologia: { bg: 'bg-blue-50', text: 'text-blue-700' },
    'propedêutica': { bg: 'bg-amber-50', text: 'text-amber-800' },
    'bases cirúrgicas': { bg: 'bg-rose-50', text: 'text-rose-700' },
    gis2: { bg: 'bg-cyan-50', text: 'text-cyan-800' },
    geral: { bg: 'bg-gray-100', text: 'text-gray-700' }
  };

  const icon = typeIcons[material.materialType || ''] || typeIcons.pdf;
  const typeLabel = typeNames[material.materialType || ''] || 'Material';
  const discKey = material.discipline || 'geral';
  const color = disciplineColors[discKey] || disciplineColors.geral;

  // Make sure webViewLink points directly to the file view
  const directFileLink = material.webViewLink && !material.webViewLink.includes('folders')
    ? material.webViewLink
    : (material.driveId ? `https://drive.google.com/file/d/${material.driveId}/view?usp=sharing` : material.webViewLink);

  return `
  <div class="library-material-card bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between" 
       data-name="${material.name.toLowerCase()}" 
       data-discipline="${material.discipline || 'geral'}" 
       data-type="${material.materialType || 'pdf'}">
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <div class="p-2 rounded-xl bg-gray-50 border border-gray-100">
          ${icon}
        </div>
        <div class="flex items-center gap-1.5 flex-wrap justify-end">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${color.bg} ${color.text} uppercase">
            ${material.discipline || 'Geral'}
          </span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
            ${typeLabel}
          </span>
        </div>
      </div>

      <div>
        <h3 class="font-bold text-sm text-gray-900 leading-snug line-clamp-2" title="${material.name}">${material.customTitle || material.name}</h3>
        <p class="text-[11px] text-gray-400 mt-1 truncate" title="${material.path || ''}">${material.path || 'Pasta do Semestre'}</p>
      </div>

      ${material.assessmentRelation ? `
        <div class="p-2 bg-purple-50/80 rounded-xl border border-purple-100 text-[11px] text-purple-900 font-semibold flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-purple-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          <span class="truncate">${material.assessmentRelation}</span>
        </div>
      ` : ''}
    </div>

    <div class="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
      <button onclick="window.toggleMaterialFavorite('${material.id}')" class="text-xs font-semibold ${material.isFavorite ? 'text-amber-500 font-bold' : 'text-gray-400 hover:text-amber-500'} flex items-center gap-1 cursor-pointer">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <span>${material.isFavorite ? 'Salvo' : 'Salvar'}</span>
      </button>

      <a href="${directFileLink}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer shrink-0">
        <span>Abrir Arquivo</span>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
      </a>
    </div>
  </div>
  `;
}

export function setupHorizontalScroll(elementId: string) {
  const el = document.getElementById(elementId);
  if (!el || (el as any).__hasDragScroll) return;
  (el as any).__hasDragScroll = true;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let moved = false;

  el.addEventListener('mousedown', (e: MouseEvent) => {
    isDown = true;
    moved = false;
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
    el.style.cursor = 'grabbing';
  });

  const stopDrag = () => {
    if (isDown) {
      isDown = false;
      if (el) el.style.cursor = '';
    }
  };

  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('blur', stopDrag);

  el.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 4) moved = true;
    el.scrollLeft = scrollLeft - walk;
  });

  el.addEventListener('click', (e: MouseEvent) => {
    if (moved) {
      e.stopPropagation();
      moved = false;
    }
  }, true);
}

if (typeof window !== 'undefined') {
  (window as any).scrollLibraryTabs = function(delta: number) {
    const container = document.getElementById('library-category-tabs-container');
    if (container) {
      container.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };
}

