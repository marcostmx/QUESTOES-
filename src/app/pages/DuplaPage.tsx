/* Treino em dupla do OSCE: dois celulares numa sala com código. */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy, Eye, Lock, Shuffle, Users, X } from 'lucide-react';
import indice from '../../data/osce/indice.json';
import { nomeManobra, nomeSistema, SISTEMAS } from '../../osce/engine';
import { osceHistory } from '../../osce/history';
import type { EstacaoIndice } from '../../osce/indice';
import { pode } from '../core/acesso';
import { useAssinatura } from '../core/assinatura';
import { idToken, login, useSync } from '../core/sync';
import { href } from '../router';
import { Badge, Button, Card, Chip, cx, PageHeader, Ring, Spinner, toast } from '../ui';

const ESTACOES = (indice as unknown as EstacaoIndice[]).filter(e => e.tipo !== 'discussao');
const DUR = { leitura: 60, estacao: 300 } as const;
type Marca = 'feito' | 'parcial' | 'nao';
interface Vista {
  codigo: string; versao: number; agora: number; papel: 'avaliador' | 'examinando' | null;
  membros: { eu: boolean; nome: string; papel: string }[];
  fase: 'espera' | 'leitura' | 'estacao' | 'fim'; faseDesde: number; rodada: number; revelados: string[]; nota: number | null;
  estacao: null | { id: string; rotulo: string; sistema: string; titulo?: string; caso: string; vitais?: string; comandos: string[]; achados?: string; achadosPorManobra?: Record<string, string>; pontoChave?: string };
  itens: { texto: string; pts: number; parcial?: string }[];
  marcas: Record<string, Marca>;
}

async function api<T>(caminho: string, corpo?: unknown): Promise<T> {
  const tok = await idToken();
  const r = await fetch(caminho, {
    method: corpo === undefined ? 'GET' : 'POST',
    headers: { 'Content-Type': 'application/json', ...(tok ? { Authorization: `Bearer ${tok}` } : {}) },
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
    cache: 'no-store',
  });
  const j = await r.json().catch(() => ({ erro: 'Servidor indisponível.' }));
  if (!r.ok) throw new Error(j?.erro ?? 'Erro');
  return j as T;
}

export default function DuplaPage({ codigo }: { codigo?: string }) {
  const { user, ready } = useSync();
  if (!ready) return <div className="py-20 text-center"><Spinner /></div>;
  if (!user) {
    return (
      <div className="mx-auto max-w-lg">
        <PageHeader eyebrow="OSCE" title="Treino em dupla">Um colega examina, o outro avalia pelo checklist. Cada um no seu celular, conectados por um código.</PageHeader>
        <Card className="p-6 text-center">
          <p className="mb-4 text-[14.5px] text-ink-2">Entre com sua conta Google para criar ou entrar numa sala.</p>
          <Button variant="primary" size="lg" onClick={async () => { const e = await login(); if (e) toast(e); }}>Entrar com Google</Button>
        </Card>
      </div>
    );
  }
  return codigo ? <SalaView codigo={codigo.toUpperCase()} /> : <Inicio />;
}

function Inicio() {
  const [cod, setCod] = useState('');
  const [ocupado, setOcupado] = useState(false);
  const criar = async () => {
    setOcupado(true);
    try {
      const v = await api<Vista>('/api/sala', {});
      location.hash = href(`dupla/${v.codigo}`);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Erro');
    }
    setOcupado(false);
  };
  return (
    <div className="mx-auto max-w-lg">
      <PageHeader eyebrow="OSCE" title="Treino em dupla">Um colega examina de verdade e o outro avalia pelo checklist da estação. Cada um no seu celular, conectados por um código.</PageHeader>
      <Card className="mb-3 p-5">
        <p className="mb-1 text-[15px] font-semibold">Criar uma sala</p>
        <p className="mb-4 text-[13.5px] text-ink-2">Você começa como avaliador e escolhe a estação. Depois é só trocar os papéis.</p>
        <Button variant="primary" size="lg" className="w-full" icon={ocupado ? <Spinner /> : <Users className="size-4" />} disabled={ocupado} onClick={criar}>Criar sala</Button>
      </Card>
      <Card className="p-5">
        <p className="mb-3 text-[15px] font-semibold">Entrar com o código</p>
        <form className="flex gap-2" onSubmit={e => { e.preventDefault(); if (cod.length === 5) location.hash = href(`dupla/${cod}`); }}>
          <input value={cod} onChange={e => setCod(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5))} placeholder="ABCDE" inputMode="text" autoCapitalize="characters" aria-label="Código da sala"
            className="h-12 min-w-0 flex-1 rounded-xl border border-line bg-surface px-4 text-center font-mono text-[22px] tracking-[0.3em] uppercase" />
          <Button size="lg" type="submit" disabled={cod.length !== 5}>Entrar</Button>
        </form>
      </Card>
    </div>
  );
}

function useSala(codigo: string) {
  const [v, setV] = useState<Vista | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const vr = useRef<Vista | null>(null);
  const aplicar = (n: Vista) => {
    vr.current = n;
    setV(n);
    setOffset(n.agora - Date.now());
  };
  useEffect(() => {
    let vivo = true;
    let t: ReturnType<typeof setTimeout>;
    const ciclo = async () => {
      try {
        if (!vr.current) aplicar(await api<Vista>(`/api/sala/${codigo}/entrar`, {}));
        else {
          const r = await api<Vista | { igual: true; agora: number }>(`/api/sala/${codigo}?v=${vr.current.versao}`);
          if (!vivo) return;
          if ('igual' in r) setOffset(r.agora - Date.now());
          else aplicar(r);
        }
        setErro(null);
      } catch (e) {
        if (vivo) setErro(e instanceof Error ? e.message : 'Erro');
      }
      if (vivo) t = setTimeout(ciclo, document.hidden ? 4000 : 1000);
    };
    void ciclo();
    return () => {
      vivo = false;
      clearTimeout(t);
    };
  }, [codigo]);
  const acao = useCallback(async (a: Record<string, unknown>) => {
    try {
      aplicar(await api<Vista>(`/api/sala/${codigo}/acao`, a));
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Erro');
    }
  }, [codigo]);
  return { v, erro, offset, acao };
}

function Relogio({ v, offset }: { v: Vista; offset: number }) {
  const [, tick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => tick(x => x + 1), 250);
    return () => clearInterval(i);
  }, []);
  if (v.fase !== 'leitura' && v.fase !== 'estacao') return null;
  const resta = Math.ceil(DUR[v.fase] - (Date.now() + offset - v.faseDesde) / 1000);
  const mm = Math.floor(Math.abs(resta) / 60), ss = String(Math.abs(resta) % 60).padStart(2, '0');
  return (
    <div className={cx('rounded-2xl px-4 py-3 text-center', resta < 0 ? 'bg-bad text-white' : resta <= 30 ? 'bg-warn-soft text-warn' : 'bg-surface-2')}>
      <p className="text-[12px] font-semibold uppercase">{v.fase === 'leitura' ? 'Leitura' : 'Estação'}{resta < 0 && ' · tempo esgotado'}</p>
      <p className="tabular font-mono text-[40px] leading-none font-semibold">{resta < 0 ? '-' : ''}{mm}:{ss}</p>
    </div>
  );
}

function SalaView({ codigo }: { codigo: string }) {
  const { v, erro, offset, acao } = useSala(codigo);
  if (!v) return <div className="py-20 text-center">{erro ? <p className="text-[15px] text-bad">{erro} <a className="ml-2 text-accent underline" href={href('dupla')}>Voltar</a></p> : <Spinner />}</div>;
  const link = `${location.origin}/#/dupla/${v.codigo}`;
  const compartilhar = async () => {
    try {
      if (navigator.share) await navigator.share({ title: 'Treino de OSCE em dupla', text: `Entre na minha sala: ${v.codigo}`, url: link });
      else {
        await navigator.clipboard.writeText(link);
        toast('Link copiado');
      }
    } catch { /* cancelado */ }
  };
  const sozinho = v.membros.length < 2;
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold text-ink-3 uppercase">Sala de treino em dupla</p>
          <p className="font-mono text-[30px] font-semibold tracking-[0.25em]">{v.codigo}</p>
        </div>
        <Button icon={<Copy className="size-4" />} onClick={compartilhar}>Convidar</Button>
        {v.fase !== 'leitura' && v.fase !== 'estacao' && !sozinho && <Button onClick={() => acao({ tipo: 'trocar' })}>Trocar papéis</Button>}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {v.membros.map(m => (
          <span key={m.nome + m.papel} className={cx('rounded-full px-3 py-1 text-[13px] font-semibold', m.eu ? 'bg-accent text-accent-ink' : 'bg-surface-2')}>
            {m.nome}{m.eu && ' (você)'} · {m.papel}
          </span>
        ))}
        {sozinho && <span className="rounded-full border border-dashed border-line px-3 py-1 text-[13px] text-ink-3">Aguardando o colega entrar com o código…</span>}
      </div>
      {erro && <p className="mb-3 text-[13px] text-bad">{erro}</p>}
      {v.papel === 'avaliador' ? <Avaliador v={v} offset={offset} acao={acao} /> : <Examinando v={v} offset={offset} />}
    </div>
  );
}

function Escolher({ acao }: { acao: (a: Record<string, unknown>) => void }) {
  const a = useAssinatura();
  const livre = a.premium || !a.vendas;
  const [sis, setSis] = useState<string>('abdome');
  const lista = ESTACOES.filter(e => e.sistema === sis);
  const liberadas = lista.filter(e => pode(livre, { tipo: 'osce', id: e.id }));
  return (
    <Card className="mb-4 p-4">
      <p className="mb-2 text-[14px] font-semibold">Escolha a estação</p>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {SISTEMAS.filter(s => ESTACOES.some(e => e.sistema === s.id)).map(s => <Chip key={s.id} active={sis === s.id} onClick={() => setSis(s.id)}>{s.nome}</Chip>)}
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Button size="sm" variant="primary" icon={<Shuffle className="size-3.5" />} disabled={!liberadas.length} onClick={() => acao({ tipo: 'estacao', id: liberadas[Math.floor(Math.random() * liberadas.length)].id })}>Sortear</Button>
        {lista.map(e => {
          const ok = pode(livre, { tipo: 'osce', id: e.id });
          return ok
            ? <button key={e.id} type="button" onClick={() => acao({ tipo: 'estacao', id: e.id })} className="h-8 min-w-10 rounded-lg border border-line px-2 font-mono text-[13px] font-semibold hover:border-accent">{e.rotulo}</button>
            : <a key={e.id} href={href('planos')} className="inline-flex h-8 min-w-10 items-center gap-1 rounded-lg border border-line px-2 font-mono text-[13px] text-ink-3 opacity-60"><Lock className="size-3" />{e.rotulo}</a>;
        })}
      </div>
    </Card>
  );
}

function Enunciado({ v }: { v: Vista }) {
  const e = v.estacao!;
  return (
    <Card className="mb-4 p-5">
      <p className="text-[12px] font-semibold text-accent uppercase">Estação {e.rotulo} · {nomeSistema(e.sistema as never)}</p>
      <p className="mt-2 text-[15px] leading-relaxed whitespace-pre-line">{e.caso}</p>
      {e.vitais && <p className="mt-2 text-[13.5px] text-ink-2">{e.vitais}</p>}
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-[14.5px] font-medium">{e.comandos.map((c, i) => <li key={i}>{c}</li>)}</ol>
    </Card>
  );
}

const MARCAS: [Marca, string, typeof Check][] = [['feito', 'Feito', Check], ['parcial', 'Parcial', Eye], ['nao', 'Não feito', X]];

function Avaliador({ v, offset, acao }: { v: Vista; offset: number; acao: (a: Record<string, unknown>) => void }) {
  const [txt, setTxt] = useState('');
  const e = v.estacao;
  const proxFase = v.fase === 'espera' ? ['leitura', 'Iniciar leitura (1 min)'] : v.fase === 'leitura' ? ['estacao', 'Iniciar estação (5 min)'] : v.fase === 'estacao' ? ['fim', 'Encerrar e dar a nota'] : null;
  return (
    <>
      {(v.fase === 'espera' || v.fase === 'fim') && <Escolher acao={acao} />}
      {e && (
        <>
          <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <Relogio v={v} offset={offset} />
            {proxFase && <Button variant="primary" size="lg" onClick={() => acao({ tipo: 'fase', fase: proxFase[0] })}>{proxFase[1]}</Button>}
          </div>
          {v.fase === 'fim' && v.nota != null && <Resultado v={v} />}
          <Enunciado v={v} />
          <Card className="mb-4 p-5">
            {e.achados?.trim() && (
              <>
                <p className="text-[12px] font-semibold text-ink-3 uppercase">Achados (só você vê)</p>
                <p className="mt-1 mb-3 text-[14px] whitespace-pre-line">{e.achados}</p>
              </>
            )}
            <p className="mb-2 text-[12px] font-semibold text-ink-3 uppercase">Revelar ao examinando quando ele fizer a manobra</p>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(e.achadosPorManobra ?? {}).map(([m, t]) => (
                <button key={m} type="button" onClick={() => acao({ tipo: 'revelar', texto: `${nomeManobra(m)}: ${t}` })} className="rounded-lg border border-line px-2.5 py-1.5 text-left text-[12.5px] hover:border-accent">{nomeManobra(m)}</button>
              ))}
            </div>
            <form className="mt-2 flex gap-2" onSubmit={ev => { ev.preventDefault(); if (txt.trim()) { acao({ tipo: 'revelar', texto: txt }); setTxt(''); } }}>
              <input value={txt} onChange={ev => setTxt(ev.target.value)} placeholder="Outro achado (ex.: PA 150/90)" className="h-10 min-w-0 flex-1 rounded-xl border border-line bg-surface px-3 text-[14px]" />
              <Button type="submit">Revelar</Button>
            </form>
          </Card>
          <Card className="mb-4 divide-y divide-line">
            <p className="p-4 text-[14px] font-semibold">Checklist do avaliador</p>
            {v.itens.map((it, i) => (
              <div key={i} className="p-4">
                <p className="text-[14px]">{it.texto} <span className="tabular text-[12px] text-ink-3">· {it.pts} pt</span></p>
                {it.parcial && <p className="mt-0.5 text-[12px] text-ink-3">{it.parcial}</p>}
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {MARCAS.map(([m, nome, I]) => (
                    <button key={m} type="button" onClick={() => acao({ tipo: 'marcar', i, marca: v.marcas[i] === m ? null : m })}
                      className={cx('flex h-10 items-center justify-center gap-1 rounded-xl border text-[13px] font-semibold transition', v.marcas[i] === m ? (m === 'feito' ? 'border-good bg-good text-white' : m === 'parcial' ? 'border-warn bg-warn-soft text-warn' : 'border-bad bg-bad-soft text-bad') : 'border-line')}>
                      <I className="size-3.5" />{nome}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </Card>
          {e.pontoChave && <Card className="mb-6 p-4 text-[13.5px] text-ink-2"><b className="text-ink">Ponto-chave:</b> {e.pontoChave}</Card>}
        </>
      )}
    </>
  );
}

function Resultado({ v }: { v: Vista }) {
  return (
    <Card className="mb-4 flex items-center gap-4 p-5">
      <Ring value={(v.nota ?? 0) / 100} size={64} stroke={5} color={(v.nota ?? 0) >= 70 ? 'var(--good)' : 'var(--warn)'}><span className="text-[16px] font-semibold">{v.nota}</span></Ring>
      <div>
        <p className="text-[16px] font-semibold">Nota da estação: {v.nota}%</p>
        <p className="text-[13px] text-ink-3">{(v.nota ?? 0) >= 70 ? 'Conta para o domínio na trilha (duas notas ≥ 70%).' : 'Refaça trocando os papéis ou volte a esta estação depois.'}</p>
      </div>
    </Card>
  );
}

function Examinando({ v, offset }: { v: Vista; offset: number }) {
  // a nota entra no histórico de OSCE do examinando (uma vez por rodada)
  useEffect(() => {
    if (v.fase === 'fim' && v.nota != null && v.estacao) {
      const key = `dupla-${v.codigo}-${v.rodada}`;
      if (!osceHistory.get().some(r => r.key === key)) osceHistory.save({ key, id: v.estacao.id, date: Date.now(), nota: v.nota, pendentes: 0, modo: 'treino' });
    }
  }, [v.fase, v.nota, v.codigo, v.rodada, v.estacao]);
  if (!v.estacao) return <Card className="p-6 text-center text-[14.5px] text-ink-2">Aguardando o avaliador escolher a estação…</Card>;
  return (
    <>
      <div className="mb-4"><Relogio v={v} offset={offset} /></div>
      {v.fase === 'espera' && <Card className="mb-4 p-4 text-center text-[14px] text-ink-2">Estação escolhida. O avaliador vai iniciar o tempo de leitura.</Card>}
      {v.fase === 'fim' && v.nota != null && <Resultado v={v} />}
      <Enunciado v={v} />
      {v.revelados.length > 0 && (
        <Card className="mb-4 p-5">
          <p className="mb-2 text-[12px] font-semibold text-ink-3 uppercase">Achados informados pelo avaliador</p>
          <ul className="space-y-1.5">{[...v.revelados].reverse().map((t, i) => <li key={i} className={cx('text-[14.5px]', i === 0 && 'font-semibold')}>{t}</li>)}</ul>
        </Card>
      )}
      {v.fase === 'fim' && v.itens.length > 0 && (
        <Card className="mb-6 divide-y divide-line">
          <p className="p-4 text-[14px] font-semibold">Como você foi avaliado</p>
          {v.itens.map((it, i) => (
            <div key={i} className="flex items-start gap-3 p-4 text-[14px]">
              <Badge tone={v.marcas[i] === 'feito' ? 'good' : v.marcas[i] === 'parcial' ? 'warn' : 'bad'}>{v.marcas[i] === 'feito' ? 'Feito' : v.marcas[i] === 'parcial' ? 'Parcial' : 'Não feito'}</Badge>
              <span>{it.texto}</span>
            </div>
          ))}
          {v.estacao.pontoChave && <p className="p-4 text-[13.5px] text-ink-2"><b className="text-ink">Ponto-chave:</b> {v.estacao.pontoChave}</p>}
        </Card>
      )}
    </>
  );
}
