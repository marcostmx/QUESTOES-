/* Flashcards do que o aluno errou (questões e OSCE), com repetição espaçada. */
import { useEffect, useMemo, useState } from 'react';
import { Layers, RotateCcw } from 'lucide-react';
import { loadAllExams, useBank } from '../core/bank';
import { montarBaralho, vence, flashStore, useFlashEstados, type OrigemCartao } from '../core/flashcards';
import { useStudy } from '../core/store';
import { useOsceHistory } from '../../osce/history';
import { subjectMeta } from '../subjects';
import { href } from '../router';
import { Button, Card, Chip, cx, Empty, PageHeader } from '../ui';

type Filtro = 'todos' | OrigemCartao;

export default function FlashcardsPage() {
  const bank = useBank();
  const data = useStudy();
  const hist = useOsceHistory();
  const estados = useFlashEstados();
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [virado, setVirado] = useState(false);
  const [agora, setAgora] = useState(() => Date.now());
  useEffect(() => void loadAllExams().catch(() => undefined), []);

  const baralho = useMemo(
    () => montarBaralho(bank.byId, data.questions, hist, id => subjectMeta(id)?.name ?? id),
    // bank.byId é mutável: a versão do banco muda junto com bank.all
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bank.all, data.questions, hist],
  );
  const doFiltro = baralho.filter(c => filtro === 'todos' || c.origem === filtro);
  const fila = doFiltro.filter(c => vence(estados[c.id], agora));
  const atual = fila[0];

  const responder = (nota: 'errei' | 'dificil' | 'acertei') => {
    if (!atual) return;
    flashStore.marcar(atual.id, nota);
    setVirado(false);
    setAgora(Date.now());
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Revisão rápida" title="Flashcards">
        Cartões feitos a partir do que você errou nas questões e nas estações de OSCE. Os que você acerta voltam cada vez mais tarde.
      </PageHeader>
      <div className="mb-4 flex flex-wrap gap-2">
        {([['todos', 'Todos'], ['questao', 'Questões'], ['osce', 'OSCE']] as const).map(([id, nome]) => (
          <Chip key={id} active={filtro === id} onClick={() => { setFiltro(id); setVirado(false); }} count={baralho.filter(c => id === 'todos' || c.origem === id).length}>{nome}</Chip>
        ))}
      </div>

      {!baralho.length ? (
        <Empty icon={<Layers className="size-5" />} title="Ainda não há cartões" action={<Button variant="primary" to="praticar">Fazer questões</Button>}>
          Cada questão que você errar e cada falha numa estação de OSCE vira um cartão aqui.
        </Empty>
      ) : !atual ? (
        <Empty icon={<RotateCcw className="size-5" />} title="Tudo revisado por agora" action={<Button onClick={() => setAgora(Date.now())}>Verificar de novo</Button>}>
          {doFiltro.length} {doFiltro.length === 1 ? 'cartão' : 'cartões'} no baralho. Os próximos vencem nos próximos dias.
        </Empty>
      ) : (
        <>
          <p className="tabular mb-2 text-[13px] text-ink-3">{fila.length} para revisar agora · {doFiltro.length} no baralho</p>
          <button type="button" onClick={() => setVirado(v => !v)} aria-label={virado ? 'Mostrar a frente' : 'Mostrar a resposta'}
            className="block w-full text-left">
            <Card className={cx('min-h-[280px] p-6 transition', virado && 'border-accent')}>
              <p className="mb-3 text-[12px] font-semibold tracking-wide text-accent uppercase">{atual.titulo}</p>
              <p className="text-[16.5px] leading-relaxed whitespace-pre-line">{atual.frente}</p>
              {virado ? (
                <div className="mt-5 border-t border-line pt-4">
                  <p className="text-[12px] font-semibold text-ink-3 uppercase">Resposta</p>
                  <p className="mt-1 text-[16px] font-semibold whitespace-pre-line text-good">{atual.verso}</p>
                  {atual.extra && <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{atual.extra}</p>}
                  {atual.questaoId && <a href={href(`questao/${atual.questaoId}`)} onClick={e => e.stopPropagation()} className="mt-3 inline-block text-[13px] font-semibold text-accent">Abrir a questão completa</a>}
                </div>
              ) : (
                <p className="mt-8 text-center text-[13px] text-ink-3">Pense na resposta e toque para virar</p>
              )}
            </Card>
          </button>
          {virado && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Button variant="danger" size="lg" onClick={() => responder('errei')}>Errei</Button>
              <Button size="lg" onClick={() => responder('dificil')}>Difícil</Button>
              <Button variant="good" size="lg" onClick={() => responder('acertei')}>Acertei</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
