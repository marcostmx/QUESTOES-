/** Componentes de interface reutilizáveis. */
import { useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { href } from './router';

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

/* ---------- Botões ---------- */

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'good';
const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink hover:bg-accent-hover shadow-card',
  secondary: 'bg-surface text-ink border border-line hover:border-line-strong hover:bg-surface-2',
  ghost: 'text-ink-2 hover:text-ink hover:bg-surface-2',
  danger: 'bg-bad-soft text-bad hover:brightness-95',
  good: 'bg-good text-white hover:brightness-110 shadow-card',
};
const sizes = { sm: 'h-8 px-3 text-[13px] gap-1.5 rounded-lg', md: 'h-10 px-4 text-sm gap-2 rounded-xl', lg: 'h-12 px-5 text-[15px] gap-2 rounded-xl' };

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: keyof typeof sizes;
  icon?: ReactNode;
  to?: string;
}

export function Button({ variant = 'secondary', size = 'md', icon, to, className, children, ...rest }: BtnProps) {
  const cls = cx(
    'inline-flex items-center justify-center font-medium whitespace-nowrap select-none transition-[background,border,color,filter,transform] active:scale-[0.98] disabled:opacity-45 disabled:active:scale-100',
    variants[variant],
    sizes[size],
    className,
  );
  if (to)
    return (
      <a href={href(to)} className={cls}>
        {icon}
        {children}
      </a>
    );
  return (
    <button type="button" className={cls} {...rest}>
      {icon}
      {children}
    </button>
  );
}

export function IconButton({ label, className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx('inline-flex size-9 items-center justify-center rounded-lg text-ink-2 transition hover:bg-surface-2 hover:text-ink', className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------- Superfícies ---------- */

export function Card({ className, children, as: As = 'div', ...rest }: { className?: string; children: ReactNode; as?: any; [k: string]: any }) {
  return (
    <As className={cx('rounded-2xl border border-line', !/(^|\s)bg-/.test(className ?? '') && 'bg-surface', className)} {...rest}>
      {children}
    </As>
  );
}

export function PageHeader({ eyebrow, title, children, actions }: { eyebrow?: string; title: string; children?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <p className="mb-1.5 text-[13px] font-medium text-ink-3">{eyebrow}</p>}
        <h1 className="font-display text-[2rem] leading-[1.1] font-semibold text-ink sm:text-[2.5rem]">{title}</h1>
        {children && <div className="mt-2 max-w-2xl text-[15px] text-ink-2">{children}</div>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

export function Section({ title, action, children, className }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cx('mb-10', className)}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

/* ---------- Pequenos indicadores ---------- */

export function Chip({ active, onClick, children, color, count }: { active?: boolean; onClick?: () => void; children: ReactNode; color?: string; count?: number }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        'inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium transition',
        active ? 'border-ink bg-ink text-bg' : 'border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink',
      )}
    >
      {color && <span className="size-2 rounded-full" style={{ background: color }} />}
      {children}
      {count !== undefined && <span className={cx('tabular text-[12px]', active ? 'opacity-70' : 'text-ink-3')}>{count}</span>}
    </button>
  );
}

export function Badge({ children, tone = 'neutral', className }: { children: ReactNode; tone?: 'neutral' | 'good' | 'bad' | 'warn' | 'accent'; className?: string }) {
  const tones = {
    neutral: 'bg-surface-2 text-ink-2',
    good: 'bg-good-soft text-good',
    bad: 'bg-bad-soft text-bad',
    warn: 'bg-warn-soft text-warn',
    accent: 'bg-accent-soft text-accent',
  };
  return <span className={cx('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[12px] font-medium', tones[tone], className)}>{children}</span>;
}

export function SubjectTag({ name, color }: { name: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-2">
      <span className="size-2 rounded-full" style={{ background: color }} />
      {name}
    </span>
  );
}

export function Bar({ value, color = 'var(--accent)', className }: { value: number; color?: string; className?: string }) {
  return (
    <div className={cx('h-1.5 overflow-hidden rounded-full bg-surface-3', className)}>
      <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%`, background: color }} />
    </div>
  );
}

export function Ring({ value, size = 44, stroke = 4, color = 'var(--accent)', children }: { value: number; size?: number; stroke?: number; color?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.min(1, Math.max(0, value)))}
          style={{ transition: 'stroke-dashoffset .6s ease' }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">{children}</span>
    </div>
  );
}

export function Empty({ icon, title, children, action }: { icon: ReactNode; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-surface-2 text-ink-2">{icon}</div>
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      {children && <p className="mt-1.5 max-w-sm text-sm text-ink-2">{children}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return <span className={cx('inline-block size-5 animate-spin rounded-full border-2 border-line-strong border-t-accent', className)} />;
}

export function Loading({ label = 'Carregando questões…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-24 text-sm text-ink-2">
      <Spinner />
      {label}
    </div>
  );
}

/* ---------- Diálogo / folha ---------- */

export function Dialog({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title?: string; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div
        ref={ref}
        tabIndex={-1}
        className={cx(
          'animate-rise safe-bottom relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-pop outline-none sm:rounded-3xl',
          wide ? 'sm:max-w-5xl' : 'sm:max-w-lg',
        )}
      >
        {title && (
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
            <h2 className="truncate text-[15px] font-semibold">{title}</h2>
            <IconButton label="Fechar" onClick={onClose}>
              <X className="size-4" />
            </IconButton>
          </div>
        )}
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Avisos rápidos ---------- */

let toastTimer: ReturnType<typeof setTimeout> | null = null;
export function toast(message: string) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.setAttribute('role', 'status');
    el.className =
      'fixed left-1/2 bottom-24 lg:bottom-8 z-[60] -translate-x-1/2 rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-bg shadow-pop transition-all duration-200 opacity-0 translate-y-2 pointer-events-none';
    document.body.appendChild(el);
  }
  el.textContent = message;
  requestAnimationFrame(() => el!.classList.remove('opacity-0', 'translate-y-2'));
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el!.classList.add('opacity-0', 'translate-y-2'), 2600);
}
