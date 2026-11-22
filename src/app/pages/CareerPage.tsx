import { useMemo } from 'react';
import { Award, Check, Flame, Lock, Stethoscope, Target, Trophy, Zap } from 'lucide-react';
import { carreira, RANKS, XP } from '../core/career';
import { useExamHistory } from '../core/exams';
import { today, useStudy } from '../core/store';
import { useOsceHistory } from '../../osce/history';
import { useCasoHistory } from '../../casos/history';
import { useEcgHistory } from './EcgPage';
import { href } from '../router';
import { Bar, Card, cx, PageHeader, Section } from '../ui';

const fmt = (n: number) => n.toLocaleString('pt-BR');
const WEEKDAY = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function useCarreira() {
  const data = useStudy();
  const osce = useOsceHistory();
  const exams = useExamHistory();
  const casos = useCasoHistory();
  const ecg = useEcgHistory();
  return useMemo(() => carreira({ days: data.days, osce, exams, casos, ecg, today: today() }), [data.days, osce, exams, casos, ecg]);
}

/** Selo do nível (hexágono com a sigla) */
export function Selo({ sigla, indice, size = 64 }: { sigla: string; indice: number; size?: number }) {
  const cores = ['#64748b', '#0ea5e9', '#14b8a6', '#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444', '#a855f7'];
  const c = cores[indice % cores.length];
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id={`selo-${indice}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={c} />
          <stop offset="1" stopColor={c} stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <path d="M32 3 57 17.5v29L32 61 7 46.5v-29Z" fill={`url(#selo-${indice})`} stroke="rgba(0,0,0,.15)" strokeWidth="1.5" />
      <path d="M32 9 52 20.5v23L32 55 12 43.5v-23Z" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1.5" />
      <text x="32" y="38" textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff" fontFamily="system-ui, sans-serif">{sigla}</text>
    </svg>
  );
}

export default function CareerPage() {
  const k = useCarreira();
  const { atual, prox, progresso, indice, faltam } = k.rank;
  const feitas = k.conquistas.filter(c => c.feita).length;

  return (
    <>
      <PageHeader eyebrow="Carreira" title={atual.nome}>
        Ganhe XP respondendo questões, fazendo estações de OSCE, simulados e desafios do dia. Seu progresso antigo já conta.
      </PageHeader>

      <Card className="mb-6 p-5 sm:p-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <Selo sigla={atual.sigla} indice={indice} size={72} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display tabular text-4xl font-semibold">{fmt(k.xp)}</span>
              <span className="text-[15px] text-ink-2">XP</span>
              {k.xpHoje > 0 && <span className="rounded-md bg-good-soft px-2 py-0.5 text-[12px] font-medium text-good">+{fmt(k.xpHoje)} hoje</span>}
            </div>
            <Bar value={progresso} className="mt-3 h-2.5" />
            <p className="mt-2 text-[13px] text-ink-2">
              {prox ? <>Faltam <b className="tabular">{fmt(faltam)} XP</b> para <b>{prox.nome}</b></> : 'Nível máximo alcançado. Parabéns!'}
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            ['Questões', k.partes.questoes],
            ['OSCE', k.partes.osce],
            ['Simulados', k.partes.simulados],
            ['Casos', k.partes.casos],
            ['ECG', k.partes.ecg],
            ['Desafios', k.partes.desafios],
          ].map(([n, v]) => (
            <div key={n} className="rounded-xl bg-surface-2 px-3 py-2.5">
              <p className="text-[12px] text-ink-3">{n}</p>
              <p className="tabular text-[17px] font-semibold">{fmt(v as number)} XP</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="mb-10 grid gap-4 md:grid-cols-2">
        <Card className={cx('p-5', k.desafio.feito && 'border-good')}>
          <div className="flex items-center gap-2 text-[13px] font-medium text-ink-3">
            <Target className="size-4" /> Desafio do dia · +{XP.desafio} XP
          </div>
          <p className="font-display mt-3 text-xl font-semibold">{k.desafio.titulo}</p>
          <Bar value={k.desafio.progresso / k.desafio.alvo} color={k.desafio.feito ? 'var(--good)' : 'var(--accent)'} className="mt-4 h-2" />
          <div className="mt-2 flex items-center justify-between text-[13px] text-ink-2">
            <span className="tabular">{fmt(k.desafio.progresso)} / {fmt(k.desafio.alvo)}</span>
            {k.desafio.feito ? (
              <span className="inline-flex items-center gap-1 font-medium text-good"><Check className="size-4" /> Concluído</span>
            ) : (
              <a className="font-medium text-accent" href={href(/osce/.test(k.desafio.modelo.id) ? 'osce' : 'praticar')}>Começar →</a>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 text-[13px] font-medium text-ink-3">
            <Flame className="size-4" /> Sequência
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display tabular text-4xl font-semibold">{k.totais.sequencia}</span>
            <span className="text-[15px] text-ink-2">{k.totais.sequencia === 1 ? 'dia seguido' : 'dias seguidos'}</span>
            <span className="ml-auto text-[12px] text-ink-3">recorde: {k.totais.melhorSequencia}</span>
          </div>
          <div className="mt-4 grid gap-1" style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}>
            {k.semanas.map(s => {
              const [y, m, d] = s.dia.split('-').map(Number);
              return (
                <div key={s.dia} className="flex flex-col items-center gap-1" title={s.dia}>
                  <div className={cx('flex aspect-square w-full items-center justify-center rounded-md', s.ativo ? 'bg-accent text-white' : 'bg-surface-2')}>
                    {s.desafio && <Zap className="size-3" />}
                  </div>
                  <span className="text-[10px] text-ink-3">{WEEKDAY[new Date(y, m - 1, d).getDay()]}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Section title={`Conquistas · ${feitas} de ${k.conquistas.length}`}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {k.conquistas.map(({ c, feita, atual: a, alvo }) => (
            <Card key={c.id} className={cx('flex items-center gap-3 p-4', !feita && 'opacity-80')}>
              <span className={cx('flex size-11 shrink-0 items-center justify-center rounded-xl', feita ? 'bg-warn-soft text-warn' : 'bg-surface-2 text-ink-3')}>
                {feita ? <Award className="size-5" /> : <Lock className="size-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold">{c.titulo}</p>
                <p className="text-[12px] text-ink-2">{c.descricao}</p>
                {!feita && alvo > 1 && <Bar value={a / alvo} className="mt-2" />}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Níveis">
        <Card className="divide-y divide-line">
          {RANKS.map((r, i) => (
            <div key={r.id} className={cx('flex items-center gap-3 px-4 py-3', i > indice && 'opacity-55')}>
              <Selo sigla={r.sigla} indice={i} size={36} />
              <span className="flex-1 text-[14px] font-medium">{r.nome}</span>
              <span className="tabular text-[13px] text-ink-2">{fmt(r.min)} XP</span>
              {i === indice && <Trophy className="size-4 text-warn" />}
            </div>
          ))}
        </Card>
      </Section>

      <Section title="Como ganhar XP">
        <Card className="p-4 text-[14px] text-ink-2">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li><b className="text-ink">+{XP.acerto}</b> por questão certa · <b className="text-ink">+{XP.erro}</b> por questão errada</li>
            <li className="flex items-center gap-1.5"><Stethoscope className="size-4" /> <b className="text-ink">+{XP.osceBase}</b> + a nota por estação de OSCE (×1,25 em modo prova)</li>
            <li><b className="text-ink">+{XP.simuladoPorQuestao}</b> por questão do simulado + <b className="text-ink">{XP.simuladoBonusNota}×</b> a nota</li>
            <li><b className="text-ink">+{XP.desafio}</b> por desafio do dia concluído</li>
            <li><b className="text-ink">+{XP.casoBase}</b> + a nota por caso clínico vivo</li>
            <li><b className="text-ink">+{XP.ecgAcerto}</b> por ECG acertado no treino</li>
          </ul>
        </Card>
      </Section>
    </>
  );
}
