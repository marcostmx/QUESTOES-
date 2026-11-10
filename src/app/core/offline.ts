/**
 * Uso offline: registra o service worker (só no build de produção) e, depois
 * que as questões da prova atual carregam, baixa em segundo plano os chunks das
 * outras provas e as imagens das questões, para tudo abrir sem internet.
 */
import { CURRENT_EXAM } from '../../data/schema';
import { loadAllExams, loadExam } from './bank';

export function setupOffline() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => navigator.serviceWorker.ready)
      .then(() => loadExam(CURRENT_EXAM))
      .then(() => loadAllExams())
      .then(exams => {
        const images = new Set(exams.flat().map(q => q.image).filter((i): i is string => !!i && i.startsWith('/')));
        // uma de cada vez, sem atrapalhar o uso do app
        let chain = Promise.resolve();
        images.forEach(src => {
          chain = chain.then(() => fetch(src).then(() => undefined, () => undefined));
        });
      })
      .catch(() => {
        /* sem service worker: o app segue funcionando online */
      });
  });
}
