import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  BarChart3, Bookmark, CalendarClock, ClipboardList, Ellipsis, Home, Library, Moon, NotebookPen, PartyPopper, PenLine, Search, Sun, SunMoon, UserRound, X,
} from 'lucide-react';
import { EXAMS, type ExamId } from '../data/schema';
import { useBank } from './core/bank';
import { isDue } from './core/srs';
import { isOpenError } from './core/study';
import { preferences, today, usePrefs, useStudy } from './core/store';
import { useSync, startSync } from './core/sync';
import { href, useRoute } from './router';
import { cx, Loading } from './ui';

const HomePage = lazy(() => import('./pages/HomePage'));
const PracticePage = lazy(() => import('./pages/PracticePage'));
const SessionPage = lazy(() => import('./pages/SessionPage'));
const ExamPage = lazy(() => import('./pages/ExamPage'));
const ReviewPage = lazy(() => import('./pages/ReviewPage'));
const ErrorsPage = lazy(() => import('./pages/ErrorsPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const StatsPage = lazy(() => import('./pages/StatsPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const QuestionPage = lazy(() => import('./pages/QuestionPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

/* ---------- Tema ---------- */
function useTheme() {
  const { theme } = usePrefs();
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && mq.matches);
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#131210' : '#f6f4ef');
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [theme]);
}

function ThemeToggle({ compact }: { compact?: boolean }) {
  const { theme } = usePrefs();
  const next = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
  const Icon = theme === 'system' ? SunMoon : theme === 'light' ? Sun : Moon;
  const label = theme === 'system' ? 'Tema do sistema' : theme === 'light' ? 'Tema claro' : 'Tema escuro';
  return (
    <button
      type="button"
      onClick={() => preferences.set({ theme: next })}
      title={label}
      aria-label={`${label} — trocar`}
      className={cx('flex items-center gap-3 rounded-xl text-[14px] text-ink-2 transition hover:bg-surface-2 hover:text-ink', compact ? 'size-10 justify-center' : 'h-10 w-full px-3')}
    >
      <Icon className="size-[18px]" />
      {!compact && label}
    </button>
  );
}

/* ---------- Navegação ---------- */
interface NavItem {
  path: string;
  label: string;
  icon: typeof Home;
  badge?: number;
}

function useNav(): NavItem[] {
  const data = useStudy();
  const bank = useBank();
  return useMemo(() => {
    const t = today();
    let due = 0;
    let errors = 0;
    for (const q of bank.all) {
      const s = data.questions[q.id];
      if (isDue(s?.srs, t)) due++;
      if (isOpenError(s)) errors++;
    }
    return [
      { path: '', label: 'Hoje', icon: Home },
      { path: 'praticar', label: 'Praticar', icon: PenLine },
      { path: 'simulado', label: 'Simulado', icon: ClipboardList },
      { path: 'revisao', label: 'Revisão', icon: CalendarClock, badge: due },
      { path: 'erros', label: 'Caderno de erros', icon: NotebookPen, badge: errors },
      { path: 'favoritos', label: 'Favoritos', icon: Bookmark },
      { path: 'biblioteca', label: 'Biblioteca', icon: Library },
      { path: 'estatisticas', label: 'Estatísticas', icon: BarChart3 },
    ];
  }, [data, bank]);
}

const isActive = (current: string, path: string) => (path === '' ? current === '' : current === path || current.startsWith(path + '/'));

function Brand() {
  return (
    <a href={href('')} className="flex items-center gap-2.5 px-1">
      <span className="font-display flex size-9 items-center justify-center rounded-[11px] bg-ink text-[19px] font-semibold text-bg italic">P</span>
      <span className="leading-tight">
        <span className="font-display block text-[19px] font-semibold">Estudo PR</span>
        <span className="block text-[11.5px] text-ink-3">banco de questões</span>
      </span>
    </a>
  );
}

function AccountLink({ current }: { current: string }) {
  const sync = useSync();
  return (
    <a
      href={href('conta')}
      className={cx(
        'flex h-12 items-center gap-3 rounded-xl px-2.5 text-[14px] transition hover:bg-surface-2',
        isActive(current, 'conta') ? 'bg-surface-2 text-ink' : 'text-ink-2',
      )}
    >
      {sync.user?.photo ? (
        <img src={sync.user.photo} alt="" className="size-8 rounded-full" referrerPolicy="no-referrer" />
      ) : (
        <span className="flex size-8 items-center justify-center rounded-full bg-surface-3 text-ink-2">
          <UserRound className="size-4" />
        </span>
      )}
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate font-medium text-ink">{sync.user ? sync.user.name.split(' ')[0] : 'Entrar'}</span>
        <span className="block truncate text-[12px] text-ink-3">
          {sync.user ? (sync.status === 'syncing' ? 'Sincronizando…' : sync.status === 'error' ? 'Falha ao sincronizar' : 'Sincronizado') : 'Salvar em todos os dispositivos'}
        </span>
      </span>
      {sync.user && <span className={cx('size-2 rounded-full', sync.status === 'error' ? 'bg-bad' : sync.status === 'syncing' ? 'bg-warn' : 'bg-good')} />}
    </a>
  );
}

function ExamSwitch({ compact }: { compact?: boolean }) {
  const { exam } = usePrefs();
  const pick = (id: ExamId) => {
    if (id === exam) return;
    preferences.set({ exam: id });
    const head = location.hash.replace(/^#\/?/, '').split(/[/?]/)[0];
    // páginas que dependem do conteúdo da prova voltam para a raiz da seção
    if (head === 'praticar') location.hash = href('praticar');
  };
  return (
    <div
      role="radiogroup"
      aria-label="Prova"
      className={cx('grid grid-cols-2 gap-1 rounded-xl border border-line bg-surface-2 p-1', compact ? 'w-[120px]' : 'w-full')}
    >
      {EXAMS.map(e => (
        <button
          key={e.id}
          type="button"
          role="radio"
          aria-checked={exam === e.id}
          onClick={() => pick(e.id)}
          title={`${e.label} · ${e.hint}`}
          className={cx(
            'flex flex-col items-center justify-center rounded-lg leading-tight transition',
            compact ? 'h-8' : 'h-11',
            exam === e.id ? 'bg-surface text-ink shadow-card' : 'text-ink-3 hover:text-ink',
          )}
        >
          <span className="font-mono text-[13px] font-semibold">{e.label}</span>
          {!compact && <span className="text-[10.5px] font-medium opacity-80">{e.hint}</span>}
        </button>
      ))}
    </div>
  );
}

function Sidebar({ current }: { current: string }) {
  const nav = useNav();
  return (
    <aside className="sticky top-0 hidden h-dvh w-[264px] shrink-0 flex-col border-r border-line bg-bg px-4 py-5 lg:flex">
      <Brand />
      <div className="mt-6">
        <ExamSwitch />
      </div>
      <a
        href={href('busca')}
        className="mt-3 mb-4 flex h-10 items-center gap-2.5 rounded-xl border border-line bg-surface px-3 text-[14px] text-ink-3 transition hover:border-line-strong hover:text-ink-2"
      >
        <Search className="size-4" />
        Buscar questões
        <kbd className="ml-auto rounded-md border border-line px-1.5 font-mono text-[11px]">/</kbd>
      </a>
      <nav className="flex flex-col gap-0.5" aria-label="Principal">
        {nav.map(item => {
          const active = isActive(current, item.path);
          return (
            <a
              key={item.path}
              href={href(item.path)}
              aria-current={active ? 'page' : undefined}
              className={cx(
                'group flex h-10 items-center gap-3 rounded-xl px-3 text-[14px] transition',
                active ? 'bg-surface font-medium text-ink shadow-card' : 'text-ink-2 hover:bg-surface-2 hover:text-ink',
              )}
            >
              <item.icon className={cx('size-[18px]', active ? 'text-accent' : 'text-ink-3 group-hover:text-ink-2')} />
              {item.label}
              {!!item.badge && <span className="tabular ml-auto rounded-full bg-accent-soft px-2 text-[12px] font-semibold text-accent">{item.badge}</span>}
            </a>
          );
        })}
      </nav>
      <div className="mt-auto flex flex-col gap-1 border-t border-line pt-3">
        <ThemeToggle />
        <AccountLink current={current} />
      </div>
    </aside>
  );
}

function MobileNav({ current }: { current: string }) {
  const nav = useNav();
  const [more, setMore] = useState(false);
  const primary = nav.slice(0, 4);
  const secondary = [
    ...nav.slice(4),
    { path: 'busca', label: 'Buscar', icon: Search },
    { path: 'conta', label: 'Conta e sincronização', icon: UserRound },
  ];
  const moreActive = secondary.some(i => isActive(current, i.path));
  useEffect(() => setMore(false), [current]);

  return (
    <>
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 backdrop-blur-lg lg:hidden" aria-label="Principal">
        <div className="mx-auto grid max-w-lg grid-cols-5">
          {primary.map(item => {
            const active = isActive(current, item.path);
            return (
              <a key={item.path} href={href(item.path)} aria-current={active ? 'page' : undefined} className={cx('relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium', active ? 'text-ink' : 'text-ink-3')}>
                <span className={cx('relative flex h-7 w-12 items-center justify-center rounded-full transition', active && 'bg-accent-soft text-accent')}>
                  <item.icon className="size-[19px]" />
                  {!!item.badge && <span className="tabular absolute -top-1 right-0.5 min-w-4 rounded-full bg-accent px-1 text-[10px] leading-4 text-accent-ink">{item.badge > 99 ? '99+' : item.badge}</span>}
                </span>
                {item.label === 'Caderno de erros' ? 'Erros' : item.label}
              </a>
            );
          })}
          <button type="button" onClick={() => setMore(true)} className={cx('flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium', moreActive ? 'text-ink' : 'text-ink-3')}>
            <span className={cx('flex h-7 w-12 items-center justify-center rounded-full', moreActive && 'bg-accent-soft text-accent')}>
              <Ellipsis className="size-[19px]" />
            </span>
            Mais
          </button>
        </div>
      </nav>
      {more && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mais opções">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMore(false)} />
          <div className="animate-rise safe-bottom absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-line bg-surface p-3 pb-5">
            <div className="flex items-center justify-between px-2 pt-1 pb-2">
              <span className="text-[13px] font-medium text-ink-3">Mais</span>
              <button type="button" aria-label="Fechar" onClick={() => setMore(false)} className="flex size-9 items-center justify-center rounded-lg text-ink-2">
                <X className="size-4" />
              </button>
            </div>
            {secondary.map(item => (
              <a key={item.path} href={href(item.path)} className="flex h-12 items-center gap-3 rounded-xl px-3 text-[15px] text-ink hover:bg-surface-2">
                <item.icon className="size-5 text-ink-3" />
                {item.label}
              </a>
            ))}
            <div className="mt-1 border-t border-line pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MobileTop() {
  return (
    <div className="flex items-center justify-between px-4 pt-4 lg:hidden">
      <Brand />
      <div className="flex items-center gap-1">
        <ExamSwitch compact />
        <a href={href('busca')} aria-label="Buscar" className="flex size-10 items-center justify-center rounded-xl text-ink-2 hover:bg-surface-2">
          <Search className="size-5" />
        </a>
      </div>
    </div>
  );
}

/* ---------- Rotas ---------- */
function page(parts: string[]): ReactNode {
  const [head, arg] = parts;
  switch (head ?? '') {
    case '': return <HomePage />;
    case 'praticar': return <PracticePage subject={arg} />;
    case 'simulado': return <ExamPage />;
    case 'revisao': return <ReviewPage />;
    case 'erros': return <ErrorsPage />;
    case 'favoritos': return <FavoritesPage />;
    case 'biblioteca': return <LibraryPage />;
    case 'estatisticas': return <StatsPage />;
    case 'busca': return <SearchPage />;
    case 'conta': return <AccountPage />;
    case 'questao': return <QuestionPage id={arg} />;
    default: return <NotFound />;
  }
}

/** Comemoração discreta quando a meta do dia é atingida. */
function GoalCelebration() {
  const data = useStudy();
  const { dailyGoal } = usePrefs();
  const n = data.days[today()]?.answered ?? 0;
  const prev = useRef(n);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (prev.current < dailyGoal && n >= dailyGoal && dailyGoal > 0) {
      setShow(true);
      const t = setTimeout(() => setShow(false), 3300);
      prev.current = n;
      return () => clearTimeout(t);
    }
    prev.current = n;
  }, [n, dailyGoal]);
  if (!show) return null;
  return (
    <div role="status" className="goal-burst pointer-events-none fixed top-20 left-1/2 z-[70] flex items-center gap-3 rounded-2xl bg-good px-5 py-3 text-white shadow-pop">
      <PartyPopper className="size-5" />
      <span className="text-[15px] font-semibold">Meta do dia batida: {dailyGoal} questões!</span>
    </div>
  );
}

export default function App() {
  useTheme();
  useBank(); // começa a baixar as questões em segundo plano
  useEffect(startSync, []);
  const route = useRoute();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(t.tagName) && !t.isContentEditable && route.parts[0] !== 'sessao') {
        e.preventDefault();
        location.hash = href('busca');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [route.parts]);

  if (route.parts[0] === 'sessao') {
    return (
      <Suspense fallback={<Loading />}>
        <SessionPage />
        <GoalCelebration />
      </Suspense>
    );
  }

  return (
    <div className="flex min-h-dvh">
      <Sidebar current={route.path} />
      <div className="min-w-0 flex-1">
        <MobileTop />
        <main className="mx-auto w-full max-w-[1120px] px-4 pt-6 pb-28 sm:px-6 lg:px-10 lg:pt-12 lg:pb-16">
          <Suspense fallback={<Loading label="Carregando…" />}>
            <div key={route.path} className="animate-rise">
              {page(route.parts)}
            </div>
          </Suspense>
        </main>
      </div>
      <MobileNav current={route.path} />
      <GoalCelebration />
    </div>
  );
}
