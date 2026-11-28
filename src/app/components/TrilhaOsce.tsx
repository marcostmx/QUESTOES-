/* Trilha OSCE do 4º período: progresso por módulo, próxima estação e ritmo até a prova. */
import { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, ChevronDown, Lock, Route as RouteIcon } from 'lucide-react';
import data from '../../data/osce/indice.json';
import { nomeSistema } from '../../osce/engine';
import type { EstacaoIndice } from '../../osce/indice';
import { useOsceHistory } from '../../osce/history';
import { proxima, resumo, ritmo, trilha, type StatusEstacao } from '../../osce/trilha';
import { pode } from '../core/acesso';
import { useAssinatura } from '../core/assinatura';
import { preferences, storage, usePrefs } from '../core/store';
import { href } from '../router';
import { Bar, Card, cx, Ring } from '../ui';

const ESTACOES = data as unknown as EstacaoIndice[];
const ROTULO = new Map(ESTACOES.map(e => [e.id, e.rotulo]));
const COR: Record<StatusEstacao, string> = {
  nova: 'border-line bg-surface text-ink-3',
  treinando: 'border-warn/40 bg-warn-soft text-warn',
  dominada: 'border-good/40 bg-good-soft text-good',
  revisar: 'border-accent/40 bg-accent-soft text-accent',
};
const NOME: Record<StatusEstacao, string> = { nova: 'Nova', treinando: 'Em treino', dominada: 'Dominada', revisar: 'Revisar' };

const linkEstacao = (id: string) => href(`osce/${id}`) + `?modo=${storage.read<string>('pr.v2.osce.modo') ?? 'prova'}`;

export function useTrilha() {
  const hist = useOsceHistory();
  const a = useAssinatura();
  const livre = a.premium || !a.vendas;
  return useMemo(() => {
    const mods = trilha(ESTACOES, hist);
    return { mods, res: resumo(mods), prox: proxima(mods, id => pode(livre, { tipo: 'osce', id })), livre };
  }, [hist, livre]);
}

/** Cartão compacto para a tela Hoje. */
export function TrilhaResumo() {
  const { mods, res, prox } = useTrilha();
  const { osceDate } = usePrefs();
  const r = ritmo(mods, osceDate);
  return (
    <Card className="flex items-center gap-4 p-4">
      <Ring value={res.pct / 100} size={52}><span className="text-[13px] font-semibold">{res.pct}%</span></Ring>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-semibold tracking-wide text-ink-3 uppercase">Trilha OSCE</p>
        <p className="text-[14.5px] font-semibold">{res.dominadas} de {res.total} estações dominadas</p>
        <p className="truncate text-[12.5px] text-ink-2">
          {prox ? `Próxima: estação ${ROTULO.get(prox.id)} · ${nomeSistema(prox.sistema)}` : 'Trilha concluída!'}
          {r && r.dias > 0 && ` · ${r.porDia}/dia até a prova`}
        </p>
      </div>
      <a href={prox ? (prox.bloqueada ? href('planos') : linkEstacao(prox.id)) : href('osce')} className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-ink"><ArrowRight className="size-5" /></a>
    </Card>
  );
}

/** Painel completo da trilha (topo do Simulador OSCE). */
export function TrilhaOsce() {
  const { mods, res, prox, livre } = useTrilha();
  const { osceDate } = usePrefs();
  const r = ritmo(mods, osceDate);
  const atual = prox?.sistema ?? null;
  const [aberto, setAberto] = useState<string | null>(null);
  const aberta = aberto ?? atual;

  return (
    <Card className="mb-6 overflow-hidden">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <Ring value={res.pct / 100} size={64} stroke={5}><span className="text-[15px] font-semibold">{res.pct}%</span></Ring>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold tracking-wide text-accent uppercase"><RouteIcon className="size-3.5" /> Trilha OSCE · 4º período</p>
          <p className="text-[17px] font-semibold">{res.dominadas} de {res.total} estações dominadas{res.revisar > 0 && <span className="text-accent"> · {res.revisar} para revisar</span>}</p>
          <p className="text-[12.5px] text-ink-3">Dominar = duas notas ≥ 70%. Depois de 14 dias, a estação volta para revisão.</p>
        </div>
        {prox && (
          <a href={prox.bloqueada ? href('planos') : linkEstacao(prox.id)}
            className="flex items-center gap-3 rounded-2xl bg-accent px-4 py-3 text-accent-ink transition hover:brightness-110 active:scale-[0.99] sm:max-w-[300px]">
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold">{prox.bloqueada ? 'Desbloquear a trilha' : `Estação ${ROTULO.get(prox.id)} · ${nomeSistema(prox.sistema)}`}</span>
              <span className="block text-[12px] opacity-85">{prox.motivo}</span>
            </span>
            {prox.bloqueada ? <Lock className="size-5" /> : <ArrowRight className="size-5" />}
          </a>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-line px-5 py-3 text-[13px]">
        <CalendarDays className="size-4 text-ink-3" />
        <label htmlFor="osce-data" className="text-ink-2">Data da prova de OSCE</label>
        <input id="osce-data" type="date" value={osceDate ?? ''} onChange={e => preferences.set({ osceDate: e.target.value || undefined })}
          className="h-8 rounded-lg border border-line bg-surface px-2 text-[13px]" />
        {r && (r.dias > 0
          ? <span className="font-semibold text-ink">Faltam {r.dias} dias · ritmo: {r.porDia} {r.porDia === 1 ? 'tentativa' : 'tentativas'} por dia</span>
          : <span className="text-ink-3">A data já passou.</span>)}
      </div>

      <ol className="border-t border-line">
        {mods.map((m, i) => {
          const open = aberta === m.sistema;
          return (
            <li key={m.sistema} className="border-b border-line last:border-b-0">
              <button type="button" onClick={() => setAberto(open ? '' : m.sistema)} aria-expanded={open}
                className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-surface-2">
                <span className={cx('flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold', m.pct === 100 ? 'bg-good text-white' : m.sistema === atual ? 'bg-accent text-accent-ink' : 'bg-surface-2 text-ink-2')}>{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14.5px] font-semibold">{nomeSistema(m.sistema)}</span>
                  <span className="block truncate text-[12px] text-ink-3">{m.porque}</span>
                </span>
                <span className="hidden w-28 sm:block"><Bar value={m.pct / 100} /></span>
                <span className="tabular w-14 shrink-0 text-right text-[12.5px] text-ink-2">{m.dominadas}/{m.estacoes.length}</span>
                <ChevronDown className={cx('size-4 shrink-0 text-ink-3 transition', open && 'rotate-180')} />
              </button>
              {open && (
                <div className="flex flex-wrap gap-1.5 px-5 pb-4">
                  {m.estacoes.map(x => {
                    const ok = pode(livre, { tipo: 'osce', id: x.id });
                    return (
                      <a key={x.id} href={ok ? linkEstacao(x.id) : href('planos')} title={`${NOME[x.status]}${x.melhor != null ? ` · melhor ${x.melhor}%` : ''}`}
                        className={cx('inline-flex h-9 min-w-11 items-center justify-center gap-1 rounded-xl border px-2 font-mono text-[13px] font-semibold transition hover:brightness-95', COR[x.status], !ok && 'opacity-60')}>
                        {!ok && <Lock className="size-3" />}{ROTULO.get(x.id)}
                      </a>
                    );
                  })}
                  <span className="flex w-full flex-wrap gap-3 pt-1 text-[11.5px] text-ink-3">
                    {(Object.keys(NOME) as StatusEstacao[]).map(s => <span key={s} className="inline-flex items-center gap-1"><span className={cx('size-2.5 rounded-full border', COR[s])} />{NOME[s]}</span>)}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
