/** Comemora quando o aluno sobe de nível ou desbloqueia uma conquista (em qualquer tela). */
import { useEffect, useState } from 'react';
import { Award, X } from 'lucide-react';
import { storage } from '../core/store';
import { Selo, useCarreira } from '../pages/CareerPage';
import { href } from '../router';

const KEY = 'pr.v2.carreira.visto';
interface Visto { rank: number; conquistas: string[] }
type Aviso = { tipo: 'nivel'; nome: string; sigla: string; indice: number } | { tipo: 'conquista'; titulo: string; descricao: string };

export function CareerWatcher() {
  const k = useCarreira();
  const [fila, setFila] = useState<Aviso[]>([]);

  useEffect(() => {
    const feitas = k.conquistas.filter(c => c.feita).map(c => c.c.id);
    const visto = storage.read<Visto>(KEY);
    if (!visto) {
      // primeira vez: registra sem comemorar o que já existia
      storage.write(KEY, { rank: k.rank.indice, conquistas: feitas });
      return;
    }
    const novos: Aviso[] = [];
    if (k.rank.indice > visto.rank) novos.push({ tipo: 'nivel', nome: k.rank.atual.nome, sigla: k.rank.atual.sigla, indice: k.rank.indice });
    for (const c of k.conquistas) if (c.feita && !visto.conquistas.includes(c.c.id)) novos.push({ tipo: 'conquista', titulo: c.c.titulo, descricao: c.c.descricao });
    if (novos.length) {
      storage.write(KEY, { rank: Math.max(visto.rank, k.rank.indice), conquistas: [...new Set([...visto.conquistas, ...feitas])] });
      setFila(f => [...f, ...novos]);
    }
  }, [k]);

  const a = fila[0];
  useEffect(() => {
    if (!a) return;
    const t = setTimeout(() => setFila(f => f.slice(1)), 5000);
    return () => clearTimeout(t);
  }, [a]);
  if (!a) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[70] flex justify-center px-4" role="status" aria-live="polite">
      <div key={a.tipo === 'nivel' ? a.nome : a.titulo} className="animate-rise pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-line bg-surface p-3 pr-2 shadow-pop">
        {a.tipo === 'nivel' ? (
          <Selo sigla={a.sigla} indice={a.indice} size={48} />
        ) : (
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-warn-soft text-warn"><Award className="size-6" /></span>
        )}
        <a href={href('carreira')} className="min-w-0 flex-1" onClick={() => setFila(f => f.slice(1))}>
          <p className="text-[12px] font-medium text-ink-3">{a.tipo === 'nivel' ? 'Subiu de nível!' : 'Conquista desbloqueada'}</p>
          <p className="truncate text-[15px] font-semibold">{a.tipo === 'nivel' ? a.nome : a.titulo}</p>
          {a.tipo === 'conquista' && <p className="truncate text-[12px] text-ink-2">{a.descricao}</p>}
        </a>
        <button type="button" aria-label="Fechar" className="rounded-lg p-2 text-ink-3 hover:bg-surface-2" onClick={() => setFila(f => f.slice(1))}><X className="size-4" /></button>
      </div>
    </div>
  );
}
