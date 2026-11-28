import { useState, type ReactNode } from 'react';
import { ArrowLeft, Check, Crown, Lock } from 'lucide-react';
import { assinar, precoBRL, useAssinatura } from '../core/assinatura';
import { pode, type Recurso } from '../core/acesso';
import { href } from '../router';
import { Button, Spinner } from '../ui';

export const BENEFICIOS = [
  'Todas as 230 estações de OSCE em 3D, com checklist do avaliador',
  'Prova OSCE completa cronometrada e circuitos por sistema',
  'Todos os casos clínicos vivos, plantões de triagem e procedimentos',
  'Todas as questões de provas anteriores e o banco completo das 7 matérias do 4º período, sem limite diário',
  'Simulados cronometrados',
  'Treino em dupla com checklist no celular, flashcards dos seus erros e revisão espaçada',
];

export function BotaoAssinar({ className, children }: { className?: string; children?: ReactNode }) {
  const a = useAssinatura();
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  return (
    <div className={className}>
      <Button variant="primary" size="lg" className="w-full" icon={ocupado ? <Spinner /> : <Crown className="size-4" />} disabled={ocupado}
        onClick={async () => {
          setOcupado(true);
          setErro(await assinar());
          setOcupado(false);
        }}>
        {children ?? (a.diasTeste ? `Começar ${a.diasTeste} dias grátis` : `Assinar por ${precoBRL(a.preco)}/mês`)}
      </Button>
      {erro && <p className="mt-2 text-center text-[13px] text-bad">{erro}</p>}
      <p className="mt-2 text-center text-[12px] text-ink-3">
        {a.diasTeste ? `Depois, ${precoBRL(a.preco)}/mês. Cancele antes do fim do teste e não paga nada. ` : ''}Pagamento seguro pelo Mercado Pago · cancele quando quiser
      </p>
    </div>
  );
}

/** Tela de bloqueio de um recurso Premium. */
export function Bloqueio({ titulo }: { titulo?: string }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-pop">
        <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent"><Lock className="size-6" /></span>
        <p className="text-[12px] font-semibold tracking-wide text-accent uppercase">Premium</p>
        <h1 className="mt-1 text-[22px] font-semibold">{titulo ?? 'Este conteúdo faz parte do Premium'}</h1>
        <ul className="mt-4 flex flex-col gap-2">
          {BENEFICIOS.map(b => (
            <li key={b} className="flex gap-2 text-[14px] text-ink-2"><Check className="mt-0.5 size-4 shrink-0 text-good" />{b}</li>
          ))}
        </ul>
        <BotaoAssinar className="mt-6" />
        <div className="mt-4 flex justify-between text-[13px]">
          <button type="button" onClick={() => history.back()} className="inline-flex items-center gap-1 font-semibold text-ink-2"><ArrowLeft className="size-4" /> Voltar</button>
          <a href={href('planos')} className="font-semibold text-accent">Ver planos</a>
        </div>
      </div>
    </div>
  );
}

/** Mostra o conteúdo se o plano permitir; senão, a tela de bloqueio. */
export function Portao({ recurso, titulo, children }: { recurso: Recurso; titulo?: string; children: ReactNode }) {
  const a = useAssinatura();
  if (pode(a.premium || !a.vendas, recurso)) return <>{children}</>;
  return <Bloqueio titulo={titulo} />;
}

/** Selo de cadeado para listas (só aparece quando há vendas e o usuário não é Premium). */
export function Cadeado({ recurso }: { recurso: Recurso }) {
  const a = useAssinatura();
  if (pode(a.premium || !a.vendas, recurso)) return null;
  return <span title="Premium" className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent"><Lock className="size-3" /> Premium</span>;
}
