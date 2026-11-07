/**
 * Sincronização entre dispositivos via Firebase (login Google + Firestore).
 * Documento: users/{uid}/sync/study-v2  →  { userId, progress, dailyHistory, lastDevice, updatedAt }
 * Os nomes dos campos seguem as regras de segurança em firestore.rules.
 */
import { useSyncExternalStore } from 'react';
import type { User } from 'firebase/auth';
import type { StudyData } from './study';
import { study } from './store';

export interface SyncState {
  user: { uid: string; name: string; email: string; photo?: string } | null;
  status: 'idle' | 'syncing' | 'error' | 'offline';
  lastSync: number | null;
  error?: string;
  ready: boolean;
}

let state: SyncState = { user: null, status: 'idle', lastSync: null, ready: false };
const listeners = new Set<() => void>();
const set = (patch: Partial<SyncState>) => {
  state = { ...state, ...patch };
  listeners.forEach(l => l());
};

const DOC_ID = 'study-v2';

// Firebase é carregado sob demanda para não pesar a abertura do app.
const fb = () =>
  Promise.all([import('../../firebase'), import('firebase/auth'), import('firebase/firestore')]).then(
    ([base, auth, store]) => ({ ...base, ...auth, ...store }),
  );

const deviceName = () => {
  const ua = navigator.userAgent;
  if (/iPhone|iPad/.test(ua)) return 'iOS';
  if (/Android/.test(ua)) return 'Android';
  if (/Mac/.test(ua)) return 'Mac';
  if (/Windows/.test(ua)) return 'Windows';
  return 'Navegador';
};

let unsubscribeDoc: (() => void) | null = null;
let pushTimer: ReturnType<typeof setTimeout> | null = null;
let currentUid: string | null = null;

async function push(data: StudyData) {
  if (!currentUid) return;
  set({ status: 'syncing' });
  try {
    const { db, doc, setDoc } = await fb();
    await setDoc(doc(db, 'users', currentUid, 'sync', DOC_ID), {
      userId: currentUid,
      progress: data.questions,
      dailyHistory: data.days,
      lastDevice: deviceName(),
      updatedAt: Date.now(),
    });
    set({ status: 'idle', lastSync: Date.now(), error: undefined });
  } catch (e: any) {
    set({ status: navigator.onLine ? 'error' : 'offline', error: e?.message ?? String(e) });
  }
}

function schedulePush() {
  if (!currentUid) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => push(study.get()), 2500);
}

async function attach(user: User) {
  currentUid = user.uid;
  set({
    user: { uid: user.uid, name: user.displayName ?? 'Estudante', email: user.email ?? '', photo: user.photoURL ?? undefined },
    status: 'syncing',
  });
  const { db, doc, getDoc, onSnapshot, setDoc } = await fb();
  try {
    await setDoc(
      doc(db, 'users', user.uid),
      { userId: user.uid, email: user.email ?? '', displayName: user.displayName ?? '', photoURL: user.photoURL ?? '', lastDevice: deviceName() },
      { merge: true },
    );
    const ref = doc(db, 'users', user.uid, 'sync', DOC_ID);
    const snap = await getDoc(ref);
    if (snap.exists()) study.mergeRemote(fromDoc(snap.data()));
    await push(study.get());
    unsubscribeDoc?.();
    unsubscribeDoc = onSnapshot(ref, s => {
      if (s.exists() && !s.metadata.hasPendingWrites) study.mergeRemote(fromDoc(s.data()));
    });
  } catch (e: any) {
    set({ status: 'error', error: e?.message ?? String(e) });
  }
}

function fromDoc(d: any): StudyData {
  return { version: 2, questions: d?.progress ?? {}, days: d?.dailyHistory ?? {} };
}

let started = false;
/** Inicia a escuta de login. Chamado uma vez na abertura do app. */
export function startSync() {
  if (started) return;
  started = true;
  study.onLocalChange(schedulePush);
  fb()
    .then(({ auth, onAuthStateChanged }) => {
      onAuthStateChanged(auth, user => {
        set({ ready: true });
        if (user) void attach(user);
        else {
          currentUid = null;
          unsubscribeDoc?.();
          unsubscribeDoc = null;
          set({ user: null, status: 'idle' });
        }
      });
    })
    .catch(e => set({ ready: true, status: 'error', error: String(e) }));
}

export async function login(): Promise<string | null> {
  try {
    const { auth, googleProvider, signInWithPopup } = await fb();
    await signInWithPopup(auth, googleProvider);
    return null;
  } catch (e: any) {
    const code = e?.code ?? '';
    if (code.includes('popup-closed') || code.includes('cancelled-popup')) return 'Login cancelado.';
    if (code.includes('popup-blocked')) return 'O navegador bloqueou a janela de login. Permita pop-ups e tente de novo.';
    if (code.includes('unauthorized-domain')) return 'Este endereço não está autorizado no Firebase (Authentication → Domínios autorizados).';
    if (code.includes('network')) return 'Sem conexão com a internet.';
    return e?.message ?? 'Não foi possível entrar.';
  }
}

export async function logout() {
  const { auth, signOut } = await fb();
  await signOut(auth);
}

export async function syncNow() {
  if (pushTimer) clearTimeout(pushTimer);
  await push(study.get());
}

export function useSync(): SyncState {
  return useSyncExternalStore(
    l => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => state,
  );
}
