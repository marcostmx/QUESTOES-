import { DriveFileItem, DriveSyncReport, SubjectId } from './types';
import { INITIAL_SEMESTER_DRIVE_MATERIALS, INITIAL_SEMESTER_REPORT } from './mockDriveData';

// In-memory access token cache
let cachedAccessToken: string | null = null;
const FOLDER_ID = '1M4XXYKo43Db531FwehPucpYKfQNwCWnA';

export function setCachedAccessToken(token: string | null) {
  cachedAccessToken = token;
}

export function getCachedAccessToken(): string | null {
  return cachedAccessToken;
}

export interface DriveFolderContent {
  files: DriveFileItem[];
  report: DriveSyncReport;
}

/**
 * Heurística para classificar disciplina a partir de nome e caminho de pasta
 */
export function inferDiscipline(name: string, folderPath: string = ''): SubjectId | '' {
  const text = (name + ' ' + folderPath).toLowerCase();
  if (text.includes('farmaco') || text.includes('farmacologia')) return 'farmacologia';
  if (text.includes('propedeutica') || text.includes('propedêutica') || text.includes('semiologia')) return 'propedêutica';
  if (text.includes('fisiopato') || text.includes('fisiopatologia')) return 'fisiopatologia';
  if (text.includes('bases cirurgicas') || text.includes('bases cirúrgicas') || text.includes('cirurgia') || text.includes('cirurg') || text.includes('técnica cirúrgica')) return 'bases cirúrgicas';
  if (text.includes('gis 2') || text.includes('gis2') || text.includes('digestorio') || text.includes('digestório')) return 'gis2';
  return '';
}

/**
 * Heurística para classificar tipo de material e prioridade
 */
export function inferMaterialTypeAndPriority(name: string, mimeType: string): { type: DriveFileItem['materialType']; priority: DriveFileItem['priority'] } {
  const lower = name.toLowerCase();

  if (lower.includes('gabarito') || lower.includes('resposta') || lower.includes('chave')) {
    return { type: 'gabarito', priority: 'gabarito' };
  }
  if (lower.includes('prova') || lower.includes('pr1') || lower.includes('pr2') || lower.includes('exame') || lower.includes('teste')) {
    return { type: 'prova_antiga', priority: 'prova antiga' };
  }
  if (lower.includes('resumo') || lower.includes('mapa mental') || lower.includes('esquema') || lower.includes('flashcard')) {
    return { type: 'resumo', priority: 'resumo' };
  }
  if (lower.includes('lista') || lower.includes('exercicio') || lower.includes('exercício') || lower.includes('questoes') || lower.includes('questões')) {
    return { type: 'lista', priority: 'questão' };
  }
  if (mimeType.includes('presentation') || lower.endsWith('.ppt') || lower.endsWith('.pptx') || lower.includes('slide') || lower.includes('aula')) {
    return { type: 'slide', priority: 'conteúdo-base' };
  }
  if (lower.includes('apostila') || lower.includes('manual') || lower.includes('livro')) {
    return { type: 'apostila', priority: 'conteúdo-base' };
  }
  if (mimeType.includes('pdf')) {
    return { type: 'pdf', priority: 'conteúdo-base' };
  }
  if (mimeType.startsWith('image/')) {
    return { type: 'imagem', priority: 'complementar' };
  }
  return { type: 'documento', priority: 'complementar' };
}

/**
 * Importação recursiva de arquivos da pasta do Google Drive informada
 */
export async function fetchDriveMaterialsRecursively(
  folderId: string = FOLDER_ID,
  onProgress?: (msg: string) => void
): Promise<{ files: DriveFileItem[]; report: DriveSyncReport }> {
  const token = getCachedAccessToken();
  if (!token) {
    throw new Error('NEEDS_AUTH: Token de acesso do Google Drive ausente ou expirado.');
  }

  const allFiles: DriveFileItem[] = [];
  const foldersToProcess: { id: string; path: string }[] = [{ id: folderId, path: 'Semestre' }];
  const seenIds = new Set<string>();

  if (onProgress) onProgress('Iniciando varredura recursiva na pasta do semestre...');

  while (foldersToProcess.length > 0) {
    const currentFolder = foldersToProcess.shift()!;
    let pageToken: string | null = null;

    do {
      const q = `'${currentFolder.id}' in parents and trashed = false`;
      const url = new URL('https://www.googleapis.com/drive/v3/files');
      url.searchParams.set('q', q);
      url.searchParams.set('fields', 'nextPageToken, files(id, name, mimeType, size, webViewLink, iconLink, thumbnailLink, modifiedTime, parents)');
      url.searchParams.set('pageSize', '100');

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error('AUTH_ERROR: Permissão de leitura do Drive negada ou revogada.');
        }
        throw new Error(`Erro ao consultar Google Drive: status ${res.status}`);
      }

      const data = await res.json();
      const items = data.files || [];

      for (const item of items) {
        if (seenIds.has(item.id)) continue;
        seenIds.add(item.id);

        if (item.mimeType === 'application/vnd.google-apps.folder') {
          foldersToProcess.push({
            id: item.id,
            path: `${currentFolder.path} / ${item.name}`
          });
          if (onProgress) onProgress(`Localizada pasta: ${item.name}`);
        } else {
          const discipline = inferDiscipline(item.name, currentFolder.path);
          const { type, priority } = inferMaterialTypeAndPriority(item.name, item.mimeType);

          const fileItem: DriveFileItem = {
            id: item.id,
            name: item.name,
            mimeType: item.mimeType,
            size: item.size,
            webViewLink: item.webViewLink || `https://drive.google.com/file/d/${item.id}/view`,
            iconLink: item.iconLink,
            thumbnailLink: item.thumbnailLink,
            modifiedTime: item.modifiedTime || new Date().toISOString(),
            parents: item.parents,
            path: currentFolder.path,
            discipline: discipline,
            module: '',
            lesson: '',
            materialType: type,
            priority: priority,
            status: discipline ? 'mapeado' : 'importado',
            readStatus: false,
            isFavorite: false
          };
          allFiles.push(fileItem);
        }
      }

      pageToken = data.nextPageToken || null;
    } while (pageToken);
  }

  // Detecção de duplicatas (por nome idêntico ou tamanho/nome)
  const nameMap = new Map<string, string>();
  allFiles.forEach(f => {
    const key = f.name.trim().toLowerCase();
    if (nameMap.has(key)) {
      f.isDuplicate = true;
      f.duplicateOf = nameMap.get(key);
    } else {
      nameMap.set(key, f.id);
    }
  });

  // Relatório de importação
  const filesByDiscipline: Record<string, number> = {
    farmacologia: 0,
    propedêutica: 0,
    fisiopatologia: 0,
    'bases cirúrgicas': 0,
    gis2: 0,
    outros: 0
  };

  let unclassifiedCount = 0;
  let duplicatesCount = 0;
  let examsCount = 0;
  let answerKeysCount = 0;

  allFiles.forEach(f => {
    if (f.discipline && filesByDiscipline[f.discipline] !== undefined) {
      filesByDiscipline[f.discipline]++;
    } else {
      filesByDiscipline['outros']++;
      unclassifiedCount++;
    }

    if (f.isDuplicate) duplicatesCount++;
    if (f.materialType === 'prova_antiga') examsCount++;
    if (f.materialType === 'gabarito') answerKeysCount++;
  });

  const report: DriveSyncReport = {
    lastSyncTime: new Date().toISOString(),
    totalFiles: allFiles.length,
    filesByDiscipline,
    unclassifiedCount,
    duplicatesCount,
    examsCount,
    answerKeysCount,
    recentFiles: allFiles
      .slice()
      .sort((a, b) => new Date(b.modifiedTime).getTime() - new Date(a.modifiedTime).getTime())
      .slice(0, 10)
      .map(f => ({ id: f.id, name: f.name, modifiedTime: f.modifiedTime }))
  };

  return { files: allFiles, report };
}

/**
 * Salvar e recuperar materiais locais do Drive
 */
const DRIVE_STORAGE_KEY = 'pr1_drive_materials_v2';
const DRIVE_REPORT_KEY = 'pr1_drive_report_v2';

export function saveLocalDriveMaterials(files: DriveFileItem[], report?: DriveSyncReport) {
  try {
    localStorage.setItem(DRIVE_STORAGE_KEY, JSON.stringify(files));
    if (report) {
      localStorage.setItem(DRIVE_REPORT_KEY, JSON.stringify(report));
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pr1-drive-updated', { detail: { count: files.length } }));
    }
  } catch (e) {
    console.error('Erro ao armazenar materiais do Drive:', e);
  }
}

export function getLocalDriveMaterials(): DriveFileItem[] {
  try {
    const raw = localStorage.getItem(DRIVE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    return INITIAL_SEMESTER_DRIVE_MATERIALS;
  } catch {
    return INITIAL_SEMESTER_DRIVE_MATERIALS;
  }
}

export function getLocalDriveReport(): DriveSyncReport {
  try {
    const raw = localStorage.getItem(DRIVE_REPORT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.totalFiles > 0) return parsed;
    }
    return INITIAL_SEMESTER_REPORT;
  } catch {
    return INITIAL_SEMESTER_REPORT;
  }
}
