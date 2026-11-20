/* OSCE: escolha da estação (sem revelar o subtema) e histórico. */
import { useMemo, useState } from 'react';
import { Gamepad2, Hand, MousePointerClick, Shuffle, Timer } from 'lucide-react';
import data from '../../data/osce/stations.json';
import { nomeSistema, SISTEMAS, type Estacao } from '../../osce/engine';
import { melhores, useOsceHistory } from '../../osce/history';
import type { Sistema } from '../../osce/maneuvers';
import { href } from '../router';
import { Badge, Button, Card, Chip, cx, PageHeader, Section } from '../ui';

const ESTACOES = data as unknown as Estacao[];

export default function OscePage() {
  const [sis, setSis] = useState<Sistema | 'todos'>('todos');
  const hist = useOsceHistory();
  const best = useMemo(() => melhores(hist), [hist]);
  const lista = ESTACOES.filter(e => sis === 'todos' || e.sistema === sis);
  const feitas = lista.filter(e => best.has(e.id)).length;
  const aleatoria = () => {
    const pool = lista.filter(e => !best.has(e.id));
    const src = pool.length ? pool : lista;
    location.hash = href(`osce/${src[Math.floor(Math.random() * src.length)].id}`);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Prova prática"
        title="Simulador OSCE"
        actions={<Button variant="primary" icon={<Shuffle className="size-4" />} onClick={aleatoria}>Estação aleatória</Button>}
      >
        Entre na sala, examine o paciente em 3D e seja avaliado pelo checklist da estação: 1 min de leitura e 5 min de execução.
      </PageHeader>

      <Card className="mb-6 grid gap-4 p-5 sm:grid-cols-3">
        <div className="flex gap-3">
          <Timer className="mt-0.5 size-5 shrink-0 text-accent" />
          <p className="text-[13.5px] text-ink-2"><b className="text-ink">Leitura na porta.</b> O caso e os comandos ficam na porta por 1 minuto. Depois ela abre e começam os 5 minutos.</p>
        </div>
        <div className="flex gap-3">
          <Hand className="mt-0.5 size-5 shrink-0 text-accent" />
          <p className="text-[13.5px] text-ink-2"><b className="text-ink">Abertura conta ponto.</b> Higienize as mãos na pia, apresente-se, explique, peça consentimento e pergunte sobre dor.</p>
        </div>
        <div className="flex gap-3">
          <MousePointerClick className="mt-0.5 size-5 shrink-0 text-accent" />
          <p className="text-[13.5px] text-ink-2"><b className="text-ink">Clique no corpo do paciente</b> para escolher a manobra. Ande com WASD/setas ou tocando no chão.</p>
        </div>
      </Card>

      <div className="mb-4 flex flex-wrap gap-2">
        <Chip active={sis === 'todos'} onClick={() => setSis('todos')} count={ESTACOES.length}>Todos</Chip>
        {SISTEMAS.map(s => (
          <Chip key={s.id} active={sis === s.id} onClick={() => setSis(s.id)} count={ESTACOES.filter(e => e.sistema === s.id).length}>{s.nome}</Chip>
        ))}
      </div>

      <Section title={`Estações · ${feitas}/${lista.length} treinadas`}>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {lista.map(e => {
            const b = best.get(e.id);
            return (
              <a
                key={e.id}
                href={href(`osce/${e.id}`)}
                className="group flex flex-col gap-2 rounded-2xl border border-line bg-surface p-3.5 transition hover:border-line-strong hover:shadow-card"
              >
                <span className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-[10px] bg-surface-2 font-mono text-[14px] font-semibold text-ink group-hover:bg-accent-soft group-hover:text-accent">
                    {e.n}
                  </span>
                  {b != null && <Badge tone={b >= 70 ? 'good' : b >= 50 ? 'warn' : 'bad'}>{b}%</Badge>}
                </span>
                <span className="text-[13.5px] font-medium">Estação {e.n}</span>
                <span className="text-[12px] text-ink-3">{nomeSistema(e.sistema)}</span>
              </a>
            );
          })}
        </div>
      </Section>

      {hist.length > 0 && (
        <Section title="Últimas tentativas" className="mt-8">
          <Card className="divide-y divide-line">
            {hist.slice(0, 8).map(r => {
              const e = ESTACOES.find(x => x.id === r.id);
              return (
                <a key={r.key} href={href(`osce/${r.id}`)} className="flex items-center gap-3 px-4 py-3 text-[14px] hover:bg-surface-2">
                  <Gamepad2 className="size-4 text-ink-3" />
                  <span className="flex-1">Estação {e?.n} · {e ? nomeSistema(e.sistema) : ''}</span>
                  <span className="text-[12px] text-ink-3">{new Date(r.date).toLocaleDateString('pt-BR')}</span>
                  <span className={cx('tabular w-12 text-right font-semibold', r.nota >= 70 ? 'text-good' : r.nota >= 50 ? 'text-warn' : 'text-bad')}>{r.nota}%</span>
                </a>
              );
            })}
          </Card>
        </Section>
      )}
    </div>
  );
}
