import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from './firebase';
import { setCachedAccessToken } from './driveService';

export interface SubjectProgress {
  answeredQuestions: number[];
  correctAnswers: number[];
  incorrectAnswers: number[];
  currentQuestionIndex?: number;
  lastResetAt?: string;
  updatedAt?: string;
}

export interface StudyDataBundle {
  userId?: string;
  progress: Record<string, SubjectProgress>;
  favorites: Record<string, number[]>;
  srs: Record<string, any>;
  dailyHistory: Record<string, Record<string, { answered: number; correct: number }>>;
  streak: { currentStreak: number; bestStreak: number; lastStudiedDate: string };
  lastDevice: string;
  updatedAt: string;
}

const ALL_SUBJECT_IDS = [
  'farmacologia',
  'propedêutica',
  'fisiopatologia',
  'bases cirúrgicas'
];

export const GLOBAL_RESET_EPOCH = '2026-09-20T21:00:00.000Z';
export const GLOBAL_RESET_STORAGE_KEY = 'pr1_global_reset_epoch_v2026_09_20';

let currentUser: User | null = null;
let isSyncing = false;
let lastSyncTime: Date | null = null;
let autoSyncTimeout: any = null;
let unsubscribeSnapshot: (() => void) | null = null;

// Callbacks for UI updates
const authListeners = new Set<(user: User | null) => void>();
const syncListeners = new Set<(status: { isSyncing: boolean; lastSyncTime: Date | null; error?: string }) => void>();

export function onSyncAuthChange(callback: (user: User | null) => void) {
  authListeners.add(callback);
  callback(currentUser);
  return () => authListeners.delete(callback);
}

export function onSyncStatusChange(callback: (status: { isSyncing: boolean; lastSyncTime: Date | null; error?: string }) => void) {
  syncListeners.add(callback);
  callback({ isSyncing, lastSyncTime });
  return () => syncListeners.delete(callback);
}

function notifySyncStatus(error?: string) {
  syncListeners.forEach(cb => cb({ isSyncing, lastSyncTime, error }));
}

function getDeviceName(): string {
  if (typeof navigator === 'undefined') return 'Dispositivo Web';
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return 'Android';
  if (/iPad|iPhone|iPod/.test(ua)) return 'iOS';
  if (/Windows/i.test(ua)) return 'Windows PC';
  if (/Macintosh/i.test(ua)) return 'Mac';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Navegador Web';
}

/**
 * Coleta todo o progresso atual do aluno gravado em localStorage
 */
export function getLocalDataBundle(): StudyDataBundle {
  const progress: Record<string, SubjectProgress> = {};
  ALL_SUBJECT_IDS.forEach(subId => {
    try {
      const raw = localStorage.getItem('pr1_progress_' + subId);
      if (raw) {
        const parsed = JSON.parse(raw);
        progress[subId] = {
          answeredQuestions: Array.isArray(parsed.answeredQuestions) ? parsed.answeredQuestions : [],
          correctAnswers: Array.isArray(parsed.correctAnswers) ? parsed.correctAnswers : [],
          incorrectAnswers: Array.isArray(parsed.incorrectAnswers) ? parsed.incorrectAnswers : [],
          currentQuestionIndex: typeof parsed.currentQuestionIndex === 'number' ? parsed.currentQuestionIndex : 0,
          lastResetAt: parsed.lastResetAt || undefined,
          updatedAt: parsed.updatedAt || undefined
        };
      } else {
        progress[subId] = { answeredQuestions: [], correctAnswers: [], incorrectAnswers: [], currentQuestionIndex: 0 };
      }
    } catch {
      progress[subId] = { answeredQuestions: [], correctAnswers: [], incorrectAnswers: [], currentQuestionIndex: 0 };
    }
  });

  let favorites: Record<string, number[]> = {};
  try {
    const raw = localStorage.getItem('pr1_favorites');
    if (raw) favorites = JSON.parse(raw);
  } catch {}

  let srs: Record<string, any> = {};
  try {
    const raw = localStorage.getItem('pr1_srs');
    if (raw) srs = JSON.parse(raw);
  } catch {}

  let dailyHistory: Record<string, Record<string, { answered: number; correct: number }>> = {};
  try {
    const raw = localStorage.getItem('pr1_daily_history');
    if (raw) dailyHistory = JSON.parse(raw);
  } catch {}

  let streak = { currentStreak: 0, bestStreak: 0, lastStudiedDate: '' };
  try {
    const raw = localStorage.getItem('pr1_study_streak_v1');
    if (raw) streak = JSON.parse(raw);
  } catch {}

  return {
    progress,
    favorites,
    srs,
    dailyHistory,
    streak,
    lastDevice: getDeviceName(),
    updatedAt: new Date().toISOString()
  };
}

/**
 * Aplica os dados unificados no localStorage e notifica a interface
 */
export function applyDataBundle(bundle: StudyDataBundle, notifyUI = true) {
  if (!bundle) return;

  // Salva cada disciplina
  if (bundle.progress) {
    Object.entries(bundle.progress).forEach(([subId, data]) => {
      try {
        localStorage.setItem('pr1_progress_' + subId, JSON.stringify(data));
      } catch (e) {
        console.warn('Erro ao salvar progresso de ' + subId, e);
      }
    });
  }

  // Favoritos
  if (bundle.favorites) {
    try {
      localStorage.setItem('pr1_favorites', JSON.stringify(bundle.favorites));
    } catch (e) {
      console.warn('Erro ao salvar favoritos', e);
    }
  }

  // SRS
  if (bundle.srs) {
    try {
      localStorage.setItem('pr1_srs', JSON.stringify(bundle.srs));
    } catch (e) {
      console.warn('Erro ao salvar SRS', e);
    }
  }

  // Histórico diário
  if (bundle.dailyHistory) {
    try {
      localStorage.setItem('pr1_daily_history', JSON.stringify(bundle.dailyHistory));
    } catch (e) {
      console.warn('Erro ao salvar histórico diário', e);
    }
  }

  // Sequência de estudos
  if (bundle.streak) {
    try {
      localStorage.setItem('pr1_study_streak_v1', JSON.stringify(bundle.streak));
    } catch (e) {
      console.warn('Erro ao salvar streak', e);
    }
  }

  if (notifyUI && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pr1-sync-updated', { detail: { timestamp: Date.now() } }));
  }
}

/**
 * Zera o progresso de uma disciplina específica e sincroniza imediatamente com todos os aparelhos
 */
export async function resetSubjectProgress(subId: string): Promise<{ success: boolean; message: string }> {
  const normalizedId = subId.toLowerCase().trim();
  const now = new Date().toISOString();
  
  // 1. Zera no localStorage local
  const resetProgress: SubjectProgress = {
    answeredQuestions: [],
    correctAnswers: [],
    incorrectAnswers: [],
    currentQuestionIndex: 0,
    lastResetAt: now,
    updatedAt: now
  };
  localStorage.setItem('pr1_progress_' + normalizedId, JSON.stringify(resetProgress));

  // 2. Limpa SRS da disciplina
  try {
    const rawSrs = localStorage.getItem('pr1_srs');
    if (rawSrs) {
      const srsData = JSON.parse(rawSrs);
      if (srsData[normalizedId]) {
        delete srsData[normalizedId];
        localStorage.setItem('pr1_srs', JSON.stringify(srsData));
      }
    }
  } catch (e) {
    console.warn('Erro ao limpar SRS no reset:', e);
  }

  // 3. Notifica a UI localmente
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pr1-sync-updated', { detail: { timestamp: Date.now(), resetSubject: normalizedId } }));
  }

  // 4. Se o usuário estiver conectado ao Firebase, envia imediatamente para o Firestore
  if (currentUser) {
    try {
      const syncDocPath = `users/${currentUser.uid}/sync/current`;
      const syncDocRef = doc(db, 'users', currentUser.uid, 'sync', 'current');
      
      const localData = getLocalDataBundle();
      localData.userId = currentUser.uid;
      localData.updatedAt = now;
      localData.lastDevice = getDeviceName();
      
      await setDoc(syncDocRef, localData);
      lastSyncTime = new Date();
      notifySyncStatus();
      return { success: true, message: `Módulo zerado e sincronizado com a nuvem!` };
    } catch (err: any) {
      console.error('Erro ao sincronizar reset com a nuvem:', err);
      return { success: true, message: `Módulo zerado localmente.` };
    }
  }

  return { success: true, message: `Módulo zerado no dispositivo atual.` };
}

/**
 * Zera todo o progresso de TODAS as disciplinas, lições, histórico diário, SRS e streak do app
 * Sincroniza o estado 100% limpo com a nuvem e em tempo real para todos os aparelhos
 */
export async function resetAllProgressGlobally(): Promise<{ success: boolean; message: string }> {
  const now = new Date().toISOString();

  // 1. Zera todas as disciplinas no localStorage
  ALL_SUBJECT_IDS.forEach(subId => {
    const emptyProgress: SubjectProgress = {
      answeredQuestions: [],
      correctAnswers: [],
      incorrectAnswers: [],
      currentQuestionIndex: 0,
      lastResetAt: now,
      updatedAt: now
    };
    try {
      localStorage.setItem('pr1_progress_' + subId, JSON.stringify(emptyProgress));
    } catch (e) {}
  });

  // 2. Remove todas as chaves de histórico de questões, lições, simulados, notas de erro e SRS
  if (typeof localStorage !== 'undefined') {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.startsWith('pr1_progress_lesson_') ||
        key.startsWith('pr1_lesson_completed_') ||
        key === 'pr1_progress_simulado' ||
        key === 'pr1_progress_revisao_erros' ||
        key === 'pr1_srs' ||
        key === 'pr1_daily_history' ||
        key === 'pr1_study_streak_v1' ||
        key === 'pr1_error_notebook_v1' ||
        key === 'pr1_log'
      )) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => {
      try { localStorage.removeItem(k); } catch (e) {}
    });

    try {
      localStorage.setItem(GLOBAL_RESET_STORAGE_KEY, 'true');
    } catch (e) {}
  }

  // 3. Notifica a UI
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pr1-sync-updated', { detail: { timestamp: Date.now(), globalReset: true } }));
  }

  // 4. Se o usuário estiver autenticado no Firebase, envia o bundle limpo imediatamente para o Firestore
  if (currentUser) {
    try {
      const syncDocPath = `users/${currentUser.uid}/sync/current`;
      const syncDocRef = doc(db, 'users', currentUser.uid, 'sync', 'current');
      
      const cleanBundle: StudyDataBundle = {
        userId: currentUser.uid,
        progress: {},
        favorites: {},
        srs: {},
        dailyHistory: {},
        streak: { currentStreak: 0, bestStreak: 0, lastStudiedDate: '' },
        lastDevice: getDeviceName(),
        updatedAt: now
      };
      ALL_SUBJECT_IDS.forEach(subId => {
        cleanBundle.progress[subId] = {
          answeredQuestions: [],
          correctAnswers: [],
          incorrectAnswers: [],
          currentQuestionIndex: 0,
          lastResetAt: now,
          updatedAt: now
        };
      });

      await setDoc(syncDocRef, cleanBundle);
      lastSyncTime = new Date();
      notifySyncStatus();
      return { success: true, message: 'Todo o progresso foi zerado e limpo na nuvem com sucesso!' };
    } catch (err: any) {
      console.error('Erro ao sincronizar reset geral na nuvem:', err);
      return { success: true, message: 'Todo o progresso foi zerado no dispositivo.' };
    }
  }

  return { success: true, message: 'Todo o progresso foi zerado com sucesso.' };
}

/**
 * Garante que a limpeza global de dados seja aplicada na inicialização se ainda não tiver sido
 */
export function enforceGlobalCleanSlateIfNeeded() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  try {
    const applied = localStorage.getItem(GLOBAL_RESET_STORAGE_KEY);
    if (!applied) {
      console.log('[Clean Slate] Aplicando limpeza geral para inicializar o app limpo...');
      const now = new Date().toISOString();
      ALL_SUBJECT_IDS.forEach(subId => {
        const emptyProgress: SubjectProgress = {
          answeredQuestions: [],
          correctAnswers: [],
          incorrectAnswers: [],
          currentQuestionIndex: 0,
          lastResetAt: now,
          updatedAt: now
        };
        localStorage.setItem('pr1_progress_' + subId, JSON.stringify(emptyProgress));
      });

      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.startsWith('pr1_progress_lesson_') ||
          key.startsWith('pr1_lesson_completed_') ||
          key === 'pr1_progress_simulado' ||
          key === 'pr1_progress_revisao_erros' ||
          key === 'pr1_srs' ||
          key === 'pr1_daily_history' ||
          key === 'pr1_study_streak_v1' ||
          key === 'pr1_error_notebook_v1' ||
          key === 'pr1_log'
        )) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => {
        try { localStorage.removeItem(k); } catch (e) {}
      });

      localStorage.setItem(GLOBAL_RESET_STORAGE_KEY, 'true');
    }
  } catch (e) {
    console.error('Erro ao aplicar enforceGlobalCleanSlateIfNeeded:', e);
  }
}

/**
 * Mesclagem inteligente bidirecional:
 * Respeita resets temporais e acumula novos acertos sem apagar progresso legítimo.
 */
export function mergeDataBundles(local: StudyDataBundle, cloud: StudyDataBundle): StudyDataBundle {
  const epochTime = new Date(GLOBAL_RESET_EPOCH).getTime();
  const cloudUpdatedTime = cloud.updatedAt ? new Date(cloud.updatedAt).getTime() : 0;
  
  // Se a nuvem contiver dados antigos antes do reset global, não reintroduz dados antigos
  const isCloudPreEpoch = cloudUpdatedTime < epochTime;

  const merged: StudyDataBundle = {
    userId: cloud.userId || local.userId,
    progress: {},
    favorites: {},
    srs: {},
    dailyHistory: {},
    streak: { currentStreak: 0, bestStreak: 0, lastStudiedDate: '' },
    lastDevice: getDeviceName(),
    updatedAt: new Date().toISOString()
  };

  // 1. Progresso das disciplinas com suporte a Reset Temporal
  ALL_SUBJECT_IDS.forEach(subId => {
    const loc = local.progress?.[subId] || { answeredQuestions: [], correctAnswers: [], incorrectAnswers: [] };
    const cld = (!isCloudPreEpoch && cloud.progress?.[subId]) ? cloud.progress[subId] : { answeredQuestions: [], correctAnswers: [], incorrectAnswers: [], lastResetAt: GLOBAL_RESET_EPOCH };

    const locResetTime = loc.lastResetAt ? new Date(loc.lastResetAt).getTime() : 0;
    const cldResetTime = cld.lastResetAt ? new Date(cld.lastResetAt).getTime() : 0;
    const locUpdateTime = loc.updatedAt ? new Date(loc.updatedAt).getTime() : 0;
    const cldUpdateTime = cld.updatedAt ? new Date(cld.updatedAt).getTime() : 0;

    // Se o dispositivo local sofreu um reset mais recente que a nuvem
    if (locResetTime > 0 && locResetTime > Math.max(cldUpdateTime, cldResetTime)) {
      merged.progress[subId] = {
        answeredQuestions: loc.answeredQuestions || [],
        correctAnswers: loc.correctAnswers || [],
        incorrectAnswers: loc.incorrectAnswers || [],
        currentQuestionIndex: loc.currentQuestionIndex || 0,
        lastResetAt: loc.lastResetAt,
        updatedAt: loc.updatedAt || loc.lastResetAt
      };
      return;
    }

    // Se a nuvem sofreu um reset mais recente que o dispositivo local
    if (cldResetTime > 0 && cldResetTime > Math.max(locUpdateTime, locResetTime)) {
      merged.progress[subId] = {
        answeredQuestions: cld.answeredQuestions || [],
        correctAnswers: cld.correctAnswers || [],
        incorrectAnswers: cld.incorrectAnswers || [],
        currentQuestionIndex: cld.currentQuestionIndex || 0,
        lastResetAt: cld.lastResetAt,
        updatedAt: cld.updatedAt || cld.lastResetAt
      };
      return;
    }

    // Mesclagem regular de união de questões respondidas
    const answeredSet = new Set<number>([...(loc.answeredQuestions || []), ...(cld.answeredQuestions || [])]);
    const correctSet = new Set<number>([...(loc.correctAnswers || []), ...(cld.correctAnswers || [])]);
    
    // Se a questão já foi acertada em algum dispositivo, ela é considerada certa
    const incorrectSet = new Set<number>();
    [...(loc.incorrectAnswers || []), ...(cld.incorrectAnswers || [])].forEach(idx => {
      if (!correctSet.has(idx)) {
        incorrectSet.add(idx);
      }
    });

    const latestReset = locResetTime >= cldResetTime ? loc.lastResetAt : cld.lastResetAt;
    const latestUpdate = new Date().toISOString();

    merged.progress[subId] = {
      answeredQuestions: Array.from(answeredSet).sort((a, b) => a - b),
      correctAnswers: Array.from(correctSet).sort((a, b) => a - b),
      incorrectAnswers: Array.from(incorrectSet).sort((a, b) => a - b),
      currentQuestionIndex: Math.max(loc.currentQuestionIndex || 0, cld.currentQuestionIndex || 0),
      lastResetAt: latestReset,
      updatedAt: latestUpdate
    };
  });

  // 2. Favoritos (União de conjuntos)
  const allFavKeys = new Set([...Object.keys(local.favorites || {}), ...Object.keys(cloud.favorites || {})]);
  allFavKeys.forEach(k => {
    const locFavs = local.favorites?.[k] || [];
    const cldFavs = cloud.favorites?.[k] || [];
    merged.favorites[k] = Array.from(new Set([...locFavs, ...cldFavs])).sort((a, b) => a - b);
  });

  // 3. SRS (Repetição Espaçada por Disciplina e Questão)
  const allSrsKeys = new Set([...Object.keys(local.srs || {}), ...Object.keys(cloud.srs || {})]);
  allSrsKeys.forEach(key => {
    const locVal = local.srs?.[key];
    const cldVal = cloud.srs?.[key];

    // Se o valor for um mapa de questões (ex: srs[subjectId][qIndex])
    if ((locVal && typeof locVal === 'object' && !('level' in locVal) && !('nextReview' in locVal)) ||
        (cldVal && typeof cldVal === 'object' && !('level' in cldVal) && !('nextReview' in cldVal))) {
      merged.srs[key] = {};
      const allQKeys = new Set([...Object.keys(locVal || {}), ...Object.keys(cldVal || {})]);
      allQKeys.forEach(qIdx => {
        const itemL = locVal?.[qIdx];
        const itemC = cldVal?.[qIdx];
        if (itemL && itemC) {
          const lvlL = itemL.level ?? itemL.repetition ?? 0;
          const lvlC = itemC.level ?? itemC.repetition ?? 0;
          if (lvlL > lvlC) {
            merged.srs[key][qIdx] = itemL;
          } else if (lvlC > lvlL) {
            merged.srs[key][qIdx] = itemC;
          } else {
            const timeL = itemL.nextReview || itemL.lastReviewed || 0;
            const timeC = itemC.nextReview || itemC.lastReviewed || 0;
            merged.srs[key][qIdx] = timeL >= timeC ? itemL : itemC;
          }
        } else {
          merged.srs[key][qIdx] = itemL || itemC;
        }
      });
    } else {
      // Caso plano/item individual
      if (locVal && cldVal) {
        const lvlL = locVal.level ?? locVal.repetition ?? 0;
        const lvlC = cldVal.level ?? cldVal.repetition ?? 0;
        merged.srs[key] = lvlL >= lvlC ? locVal : cldVal;
      } else {
        merged.srs[key] = locVal || cldVal;
      }
    }
  });

  // 4. Histórico Diário
  const allDates = new Set([...Object.keys(local.dailyHistory || {}), ...Object.keys(cloud.dailyHistory || {})]);
  allDates.forEach(d => {
    merged.dailyHistory[d] = {};
    const locSubjs = local.dailyHistory?.[d] || {};
    const cldSubjs = cloud.dailyHistory?.[d] || {};
    const subjs = new Set([...Object.keys(locSubjs), ...Object.keys(cldSubjs)]);
    subjs.forEach(s => {
      const locVal = locSubjs[s] || { answered: 0, correct: 0 };
      const cldVal = cldSubjs[s] || { answered: 0, correct: 0 };
      merged.dailyHistory[d][s] = {
        answered: Math.max(locVal.answered, cldVal.answered),
        correct: Math.max(locVal.correct, cldVal.correct)
      };
    });
  });

  // 5. Streaks
  const locStreak = local.streak || { currentStreak: 0, bestStreak: 0, lastStudiedDate: '' };
  const cldStreak = cloud.streak || { currentStreak: 0, bestStreak: 0, lastStudiedDate: '' };
  merged.streak = {
    currentStreak: Math.max(locStreak.currentStreak || 0, cldStreak.currentStreak || 0),
    bestStreak: Math.max(locStreak.bestStreak || 0, cldStreak.bestStreak || 0),
    lastStudiedDate: (locStreak.lastStudiedDate > cldStreak.lastStudiedDate) ? locStreak.lastStudiedDate : cldStreak.lastStudiedDate
  };

  return merged;
}

/**
 * Realiza sincronização completa na nuvem
 */
export async function syncNow(): Promise<{ success: boolean; message: string }> {
  if (!currentUser) {
    return { success: false, message: 'Faça login com sua conta Google para sincronizar entre dispositivos.' };
  }

  isSyncing = true;
  notifySyncStatus();

  try {
    const syncDocPath = `users/${currentUser.uid}/sync/current`;
    const syncDocRef = doc(db, 'users', currentUser.uid, 'sync', 'current');
    
    let cloudData: StudyDataBundle | null = null;
    try {
      const snap = await getDoc(syncDocRef);
      if (snap.exists()) {
        cloudData = snap.data() as StudyDataBundle;
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, syncDocPath);
    }

    const localData = getLocalDataBundle();
    const finalBundle = cloudData ? mergeDataBundles(localData, cloudData) : localData;
    finalBundle.userId = currentUser.uid;
    finalBundle.updatedAt = new Date().toISOString();
    finalBundle.lastDevice = getDeviceName();

    // Salva localmente sem disparar evento de recarga desnecessário na própria tela
    applyDataBundle(finalBundle, false);

    // Salva na nuvem (Firestore)
    try {
      await setDoc(syncDocRef, finalBundle);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, syncDocPath);
    }

    lastSyncTime = new Date();
    isSyncing = false;
    notifySyncStatus();

    return { success: true, message: 'Progresso sincronizado com sucesso na nuvem!' };
  } catch (err: any) {
    console.error('Falha na sincronização:', err);
    isSyncing = false;
    notifySyncStatus(err?.message || 'Erro de conexão');
    return { success: false, message: 'Falha ao sincronizar: ' + (err?.message || 'Erro desconhecido') };
  }
}

/**
 * Agenda sincronização automática em background (debounce)
 */
export function scheduleAutoSync(delayMs = 2000) {
  if (!currentUser) return;
  if (autoSyncTimeout) clearTimeout(autoSyncTimeout);
  autoSyncTimeout = setTimeout(() => {
    syncNow().catch(e => console.warn('Auto-sync silencioso falhou:', e));
  }, delayMs);
}

/**
 * Converte erros do Firebase Auth em mensagens claras e amigáveis em português
 */
export function getFriendlyAuthErrorMessage(err: any): string {
  const code = err?.code || '';
  const msg = err?.message || '';

  if (code === 'auth/popup-blocked') {
    return 'O navegador bloqueou a janela de autenticação. Habilite pop-ups para este site ou abra o app em uma aba separada.';
  }
  if (code === 'auth/popup-closed-by-user') {
    return 'A janela de login do Google foi fechada antes de concluir.';
  }
  if (code === 'auth/cancelled-popup-request') {
    return 'Solicitação anterior em andamento. Aguarde alguns segundos e tente novamente.';
  }
  if (code === 'auth/unauthorized-domain') {
    return 'Domínio não autorizado nas credenciais do Firebase. Verifique a lista de Authorized Domains no console.';
  }
  if (code === 'auth/network-request-failed') {
    return 'Falha de conexão com a rede. Verifique sua internet.';
  }
  if (code === 'auth/operation-not-supported-in-this-environment') {
    return 'Operação não suportada dentro deste quadro. Abra o app diretamente em uma nova aba.';
  }
  if (msg.includes('blocked') || msg.includes('restricted')) {
    return 'Acesso bloqueado pelo navegador. Abra a aplicação em uma nova aba para autenticar com segurança.';
  }
  return msg || 'Falha ao autenticar com o Google.';
}

/**
 * Login com conta Google (Popup com fallback seguro)
 */
export async function loginWithGoogle(): Promise<{ success: boolean; user?: User; error?: string; code?: string }> {
  try {
    let result;
    const isIframe = typeof window !== 'undefined' && window.self !== window.top;

    try {
      result = await signInWithPopup(auth, googleProvider);
    } catch (popupErr: any) {
      // Se estiver em janela normal fora de iframe e o popup foi bloqueado, tenta redirect
      if (!isIframe && popupErr?.code === 'auth/popup-blocked') {
        console.warn('Popup bloqueado, acionando signInWithRedirect...');
        await signInWithRedirect(auth, googleProvider);
        return { success: false, error: 'Redirecionando para login seguro do Google...' };
      }
      throw popupErr;
    }

    const user = result.user;
    currentUser = user;

    // Cache access token for Google Drive API operations in memory if available
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential?.accessToken) {
      setCachedAccessToken(credential.accessToken);
    }

    // Atualiza/Cria documento de perfil do usuário
    if (user) {
      const profilePath = `users/${user.uid}`;
      const profileRef = doc(db, 'users', user.uid);
      try {
        await setDoc(profileRef, {
          userId: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          lastDevice: getDeviceName(),
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, profilePath);
      }

      // Realiza sincronização imediata
      await syncNow();
      setupRealtimeListener(user.uid);
    }

    return { success: true, user };
  } catch (err: any) {
    console.error('Erro no login com Google:', err);
    return {
      success: false,
      code: err?.code,
      error: getFriendlyAuthErrorMessage(err)
    };
  }
}

/**
 * Desconectar conta do dispositivo atual
 */
export async function logoutUser(): Promise<void> {
  if (unsubscribeSnapshot) {
    unsubscribeSnapshot();
    unsubscribeSnapshot = null;
  }
  setCachedAccessToken(null);
  await signOut(auth);
  currentUser = null;
  lastSyncTime = null;
  authListeners.forEach(cb => cb(null));
  notifySyncStatus();
}

/**
 * Listener em tempo real para refletir mudanças feitas em outro dispositivo instantaneamente
 */
function setupRealtimeListener(userId: string) {
  if (unsubscribeSnapshot) {
    unsubscribeSnapshot();
  }

  const syncDocPath = `users/${userId}/sync/current`;
  const syncDocRef = doc(db, 'users', userId, 'sync', 'current');
  
  unsubscribeSnapshot = onSnapshot(syncDocRef, (snap) => {
    if (snap.exists()) {
      const cloudBundle = snap.data() as StudyDataBundle;
      // Se a atualização foi feita por outro dispositivo, mescla e aplica
      if (cloudBundle.lastDevice !== getDeviceName()) {
        const local = getLocalDataBundle();
        const merged = mergeDataBundles(local, cloudBundle);
        applyDataBundle(merged, true);
        lastSyncTime = new Date();
        notifySyncStatus();
      }
    }
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, syncDocPath);
  });
}

// Inicializa ouvinte de estado de autenticação e retorno de redirecionamento
if (typeof window !== 'undefined') {
  getRedirectResult(auth).then(async (res) => {
    if (res && res.user) {
      currentUser = res.user;
      authListeners.forEach(cb => cb(res.user));
      setupRealtimeListener(res.user.uid);
      await syncNow().catch(e => console.warn('Sync pós-redirect falhou:', e));
    }
  }).catch((err) => {
    console.warn('Redirect auth check:', err);
  });

  onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    authListeners.forEach(cb => cb(user));
    if (user) {
      setupRealtimeListener(user.uid);
      syncNow().catch(e => console.warn('Sync inicial pós-auth falhou:', e));
    } else {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }
    }
  });
}

/**
 * Exporta backup em arquivo .json (recurso de portabilidade offline)
 */
export function exportBackupJSON() {
  const bundle = getLocalDataBundle();
  const jsonStr = JSON.stringify(bundle, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `estudo_pr1_backup_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Importa backup a partir de arquivo .json
 */
export async function importBackupJSON(file: File): Promise<{ success: boolean; message: string }> {
  try {
    const text = await file.text();
    const imported = JSON.parse(text) as StudyDataBundle;
    if (!imported || !imported.progress) {
      return { success: false, message: 'Arquivo de backup inválido.' };
    }
    const local = getLocalDataBundle();
    const merged = mergeDataBundles(local, imported);
    applyDataBundle(merged, true);
    if (currentUser) {
      await syncNow();
    }
    return { success: true, message: 'Backup importado e mesclado com sucesso!' };
  } catch (err: any) {
    return { success: false, message: 'Erro ao ler arquivo: ' + (err?.message || 'Arquivo corrompido') };
  }
}
