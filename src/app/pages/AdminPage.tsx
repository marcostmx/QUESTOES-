/* Painel do administrador: assinantes, receita, cancelamentos e conversão (só ADMIN_EMAILS). */
import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { idToken } from '../core/sync';
import { precoBRL, useAssinatura } from '../core/assinatura';
import { Badge, Button, Card, Empty, Loading, PageHeader } from '../ui';

interface Resumo {
  vendas: boolean; preco: number;
  ativos: number; emTeste: number; pendentes: number; pausados: number; cancelados: number; cancelados30d: number; novos30d: number;
  receitaMensal: number; usuarios: number | null; conversao: number | null;
  recentes: { uid: string; email?: string; status: string; proximaCobranca?: string | null; atualizadoEm?: string }[];
}
const TOM: Record<string, 'good' | 'warn' | 'bad' | 'neutral'> = { authorized: 'good', pending: 'warn', paused: 'warn', cancelled: 'bad' };
const NOME: Record<string, string> = { authorized: 'Ativa', pending: 'Pendente', paused: 'Pausada', cancelled: 'Cancelada' };
const data = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString('pt-BR') : '—');

export default function AdminPage() {
  const a = useAssinatura();
  const [r, setR] = useState<Resumo | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const carregar = async () => {
    setErro(null);
    try {
      const tok = await idToken();
      const res = await fetch('/api/admin/resumo', { headers: tok ? { Authorization: `Bearer ${tok}` } : {} });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.erro ?? 'Erro');
      setR(j);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível carregar.');
    }
  };
  useEffect(() => {
    if (a.admin) void carregar();
  }, [a.admin]);

  if (!a.admin) return <Empty icon={<RefreshCw className="size-5" />} title="Acesso restrito">Esta página é só para administradores.</Empty>;
  if (erro) return <Empty icon={<RefreshCw className="size-5" />} title="Não foi possível carregar" action={<Button onClick={carregar}>Tentar de novo</Button>}>{erro}</Empty>;
  if (!r) return <Loading label="Lendo assinaturas…" />;

  const cards: [string, string, string?][] = [
    ['Assinantes ativos', String(r.ativos), r.emTeste ? `${r.emTeste} em teste grátis` : undefined],
    ['Receita mensal', precoBRL(r.receitaMensal), `${r.ativos - r.emTeste} pagantes × ${precoBRL(r.preco)}`],
    ['Novos (30 dias)', String(r.novos30d), `${r.pendentes} aguardando pagamento`],
    ['Cancelamentos (30 dias)', String(r.cancelados30d), `${r.cancelados} no total · ${r.pausados} pausadas`],
    ['Conversão do grátis', r.conversao != null ? `${r.conversao.toLocaleString("pt-BR")}%` : '—', r.usuarios != null ? `${r.ativos} de ${r.usuarios} contas` : 'contagem de contas indisponível'],
  ];

  return (
    <div>
      <PageHeader eyebrow="Administração" title="Painel de assinaturas" actions={<Button icon={<RefreshCw className="size-4" />} onClick={carregar}>Atualizar</Button>}>
        {r.vendas ? 'Dados das assinaturas do Mercado Pago gravadas pelo servidor.' : 'As vendas ainda não estão configuradas (sem token do Mercado Pago no servidor).'}
      </PageHeader>
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {cards.map(([t, v, d]) => (
          <Card key={t} className="p-4">
            <p className="text-[12px] font-medium text-ink-3">{t}</p>
            <p className="tabular mt-1 text-[24px] font-semibold">{v}</p>
            {d && <p className="text-[12px] text-ink-3">{d}</p>}
          </Card>
        ))}
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-[13.5px]">
          <thead className="bg-surface-2 text-[12px] text-ink-3">
            <tr><th className="p-3 font-medium">Conta</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Próxima cobrança</th><th className="p-3 font-medium">Atualizada</th></tr>
          </thead>
          <tbody>
            {r.recentes.map(x => (
              <tr key={x.uid} className="border-t border-line">
                <td className="p-3">{x.email ?? <span className="font-mono text-[12px] text-ink-3">{x.uid.slice(0, 10)}…</span>}</td>
                <td className="p-3"><Badge tone={TOM[x.status] ?? 'neutral'}>{NOME[x.status] ?? x.status}</Badge></td>
                <td className="tabular p-3">{data(x.proximaCobranca)}</td>
                <td className="tabular p-3">{data(x.atualizadoEm)}</td>
              </tr>
            ))}
            {!r.recentes.length && <tr><td colSpan={4} className="p-6 text-center text-ink-3">Nenhuma assinatura ainda.</td></tr>}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
