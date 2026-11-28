import { useEffect, useState } from 'react';
import { Check, Crown, Minus } from 'lucide-react';
import { cancelarAssinatura, carregarAssinatura, precoBRL, useAssinatura } from '../core/assinatura';
import { LIMITE_QUESTOES_DIA } from '../core/acesso';
import { useSync } from '../core/sync';
import { BotaoAssinar } from '../components/Premium';
import { Badge, Button, Card, PageHeader } from '../ui';

const LINHAS: [string, string | boolean, string | boolean][] = [
  ['Estações de OSCE em 3D', '2 por sistema', 'Todas (230)'],
  ['Trilha OSCE com domínio e revisão', 'Parcial', 'Completa'],
  ['Prova OSCE completa e circuitos', false, true],
  ['Casos clínicos vivos', '2 casos', 'Todos'],
  ['Plantão de triagem e procedimentos', 'Oxigenoterapia', 'Todos'],
  ['Questões do 4º período', `${LIMITE_QUESTOES_DIA} por dia`, 'Ilimitadas'],
  ['Simulados cronometrados', false, true],
  ['ECG, gasometria, RX e RCP', true, true],
  ['Revisão espaçada e sincronização', true, true],
];

const STATUS: Record<string, string> = {
  authorized: 'Ativa', pending: 'Aguardando pagamento', paused: 'Pausada', cancelled: 'Cancelada', nenhuma: 'Sem assinatura',
};

const Celula = ({ v }: { v: string | boolean }) =>
  typeof v === 'string' ? <span className="text-[13px]">{v}</span> : v ? <Check className="size-4 text-good" /> : <Minus className="size-4 text-ink-3" />;

export default function PlanosPage() {
  const a = useAssinatura();
  const { user } = useSync();
  const [msg, setMsg] = useState<string | null>(null);
  const retorno = location.hash.includes('retorno=1');

  useEffect(() => {
    if (retorno) void carregarAssinatura(true);
  }, [retorno, user?.uid]);

  return (
    <div>
      <PageHeader eyebrow="Planos" title="Estudo PR Premium">
        Treino completo para o OSCE e para as provas do 4º período, num só lugar.
      </PageHeader>

      {retorno && !a.premium && a.status === 'pending' && (
        <Card className="mb-4 p-4 text-[14px]">Recebemos sua assinatura. Assim que o Mercado Pago confirmar o pagamento, o Premium é liberado (normalmente em poucos minutos).</Card>
      )}
      {!a.vendas && !a.carregando && (
        <Card className="mb-4 p-4 text-[14px] text-ink-2">As assinaturas ainda não estão abertas nesta versão: por enquanto, tudo está liberado.</Card>
      )}

      {a.vendas && a.premium ? (
        <Card className="mb-6 p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent"><Crown className="size-5" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[16px] font-semibold">Você é Premium {a.admin && <Badge tone="accent">acesso de administrador</Badge>}</p>
              {!a.admin && (
                <p className="text-[13px] text-ink-3">
                  Assinatura {STATUS[a.status].toLowerCase()}
                  {a.proximaCobranca && ` · próxima cobrança em ${new Date(a.proximaCobranca).toLocaleDateString('pt-BR')}`}
                </p>
              )}
            </div>
          </div>
          {!a.admin && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={async () => {
                if (!confirm('Cancelar a assinatura? O acesso Premium termina com o cancelamento.')) return;
                setMsg((await cancelarAssinatura()) ?? 'Assinatura cancelada.');
              }}>Cancelar assinatura</Button>
            </div>
          )}
          {msg && <p className="mt-2 text-[13px] text-ink-2">{msg}</p>}
        </Card>
      ) : (
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <Card className="p-5">
            <p className="text-[14px] font-semibold text-ink-2">Grátis</p>
            <p className="mt-1 text-[28px] font-semibold">R$ 0</p>
            <p className="text-[13px] text-ink-3">Para conhecer o simulador.</p>
          </Card>
          <Card className="border-accent p-5">
            <p className="flex items-center gap-1.5 text-[14px] font-semibold text-accent"><Crown className="size-4" /> Premium</p>
            <p className="mt-1 text-[28px] font-semibold">{precoBRL(a.preco)}<span className="text-[14px] font-normal text-ink-3">/mês</span></p>
            <p className="text-[13px] text-ink-3">{a.diasTeste ? `${a.diasTeste} dias grátis na primeira assinatura. ` : ''}Renovação automática, cancele quando quiser.</p>
            {a.vendas && <BotaoAssinar className="mt-4" />}
            {a.status === 'pending' && <p className="mt-2 text-[12px] text-ink-3">Há uma assinatura aguardando pagamento. <button type="button" className="font-semibold text-accent" onClick={() => carregarAssinatura(true)}>Verificar agora</button></p>}
          </Card>
        </div>
      )}

      <Card className="overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-2 text-[12px] text-ink-3">
            <tr><th className="p-3 font-medium">Recurso</th><th className="p-3 font-medium">Grátis</th><th className="p-3 font-medium">Premium</th></tr>
          </thead>
          <tbody>
            {LINHAS.map(([r, g, p]) => (
              <tr key={r} className="border-t border-line">
                <td className="p-3 text-[14px]">{r}</td>
                <td className="p-3"><Celula v={g} /></td>
                <td className="p-3"><Celula v={p} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="mt-4 text-[12px] text-ink-3">Conteúdo educacional para estudantes de Medicina; não substitui a orientação de professores nem a conduta clínica real.</p>
    </div>
  );
}
