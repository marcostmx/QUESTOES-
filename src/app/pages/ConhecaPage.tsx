/* Página de vendas pública: o que é, para quem, recursos, preço e perguntas frequentes. */
import { Activity, ArrowRight, Layers, BookOpen, CalendarCheck, Check, Crown, Gamepad2, HeartPulse, Route as RouteIcon, Smartphone, Users } from 'lucide-react';
import data from '../../data/osce/indice.json';
import { CASOS } from '../../casos/catalogo';
import { precoBRL, useAssinatura } from '../core/assinatura';
import { BotaoAssinar } from '../components/Premium';
import { href } from '../router';

const N_ESTACOES = (data as unknown[]).length;

const RECURSOS = [
  { i: Gamepad2, t: `${N_ESTACOES} estações de OSCE em 3D`, d: 'Entre na sala, posicione o paciente, faça as manobras e receba o achado como na prova. Correção pelo checklist do avaliador.' },
  { i: RouteIcon, t: 'Trilha do 4º período', d: 'Do básico ao complexo: PA, ectoscopia, cabeça e pescoço, cardio, respiratório, abdome, urinário e neuro. Você sabe sempre qual é a próxima estação.' },
  { i: CalendarCheck, t: 'Ritmo até a prova', d: 'Informe a data do OSCE e o app calcula quantas estações treinar por dia. Estações dominadas voltam para revisão depois de 14 dias.' },
  { i: HeartPulse, t: `${CASOS.length} casos clínicos vivos`, d: 'Paciente com sinais vitais que mudam com o tempo e com as suas condutas, numa sala de emergência 3D com monitor e equipe.' },
  { i: BookOpen, t: 'Questões das provas + inéditas', d: 'Questões de provas anteriores e inéditas de Propedêutica, Fisiopatologia, Farmacologia, Bases Cirúrgicas, GIS2, HMP-IV e SOP3, com gabarito comentado, simulados e caderno de erros.' },
  { i: Activity, t: 'ECG, gasometria, RX e RCP', d: 'Exames desenhados no próprio app para interpretar, e RCP com ritmo de compressões e desfibrilação.' },
  { i: Users, t: 'Prova OSCE completa', d: 'Rodízio cronometrado com 1 min de leitura e 5 min por estação, sem dicas, com relatório por sistema no fim.' },
  { i: Users, t: 'Treino em dupla', d: 'Um colega examina de verdade e o outro avalia pelo checklist, cada um no seu celular, conectados por um código de sala.' },
  { i: Layers, t: 'Flashcards dos seus erros', d: 'Cada questão errada e cada falha no OSCE vira um cartão de revisão que volta no momento certo.' },
  { i: Smartphone, t: 'No celular e no computador', d: 'Tudo jogável por toque. Entre com Google e o progresso sincroniza entre os aparelhos.' },
];

const FAQ = [
  ['Preciso pagar para testar?', 'Não. O plano grátis libera 2 estações por sistema, 2 casos clínicos e uma amostra de questões inéditas (20 por dia). As questões de provas anteriores são do Premium. A primeira assinatura Premium ainda tem 7 dias grátis.'],
  ['Como cancelo?', 'Na página Premium do app, a qualquer momento. Se cancelar durante o teste grátis, nada é cobrado.'],
  ['Quais formas de pagamento?', 'Cartão de crédito, pelo Mercado Pago. Não guardamos os dados do seu cartão.'],
  ['O conteúdo serve para outras faculdades?', 'O foco é o OSCE e as matérias do 4º período. As técnicas de exame físico seguem a semiologia padrão e servem para qualquer prova prática.'],
  ['Substitui as aulas práticas?', 'Não. É treino para fixar a sequência do exame e o raciocínio; a prática com pacientes e professores continua essencial.'],
];

export default function ConhecaPage() {
  const a = useAssinatura();
  return (
    <div className="min-h-dvh bg-bg">
      <header className="mx-auto flex max-w-[1120px] items-center justify-between px-4 py-4 sm:px-6">
        <span className="flex items-center gap-2 font-display text-[20px] font-semibold"><span className="flex size-8 items-center justify-center rounded-lg bg-ink font-display text-bg italic">P</span>Estudo PR</span>
        <a href={href('')} className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-line bg-surface px-4 text-[14px] font-semibold hover:border-line-strong">Abrir o app <ArrowRight className="size-4" /></a>
      </header>

      <section className="mx-auto max-w-[1120px] px-4 pt-8 pb-14 sm:px-6 sm:pt-16">
        <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">OSCE e 4º período de Medicina</p>
        <h1 className="mt-2 max-w-3xl font-display text-[38px] leading-[1.08] font-semibold sm:text-[56px]">Treine o OSCE como se já estivesse na sala da prova.</h1>
        <p className="mt-4 max-w-2xl text-[17px] text-ink-2">Estações em 3D com checklist do avaliador, uma trilha que diz o que estudar a cada dia e as questões das provas anteriores e inéditas das 7 matérias do período, num só lugar.</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a href={href('osce')} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-semibold text-accent-ink shadow-card hover:bg-accent-hover">Começar grátis <ArrowRight className="size-4" /></a>
          <a href="#precos" onClick={e => { e.preventDefault(); document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-surface px-6 text-[15px] font-semibold hover:border-line-strong">Ver preço</a>
        </div>
        <p className="mt-3 text-[13px] text-ink-3">Sem cartão para o plano grátis · {a.diasTeste ? `${a.diasTeste} dias grátis no Premium` : 'cancele quando quiser'}</p>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 pb-16 sm:px-6">
        <h2 className="mb-6 font-display text-[28px] font-semibold">O que tem dentro</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RECURSOS.map(({ i: I, t, d }) => (
            <div key={t} className="rounded-2xl border border-line bg-surface p-5">
              <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent"><I className="size-5" /></span>
              <p className="text-[15px] font-semibold">{t}</p>
              <p className="mt-1 text-[13.5px] text-ink-2">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-[1120px] gap-6 px-4 py-14 sm:px-6 md:grid-cols-3">
          {[['1', 'Marque a data do OSCE', 'A trilha calcula o ritmo diário até a prova.'], ['2', 'Treine a estação do dia', 'Na sala 3D, em modo treino com dicas ou em modo prova cronometrado.'], ['3', 'Domine e revise', 'Duas notas ≥ 70% dominam a estação; depois de 14 dias ela volta para revisão.']].map(([n, t, d]) => (
            <div key={n} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink font-semibold text-bg">{n}</span>
              <div><p className="text-[16px] font-semibold">{t}</p><p className="text-[14px] text-ink-2">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="precos" className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
        <h2 className="mb-6 text-center font-display text-[28px] font-semibold">Preço</h2>
        <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-surface p-6">
            <p className="text-[15px] font-semibold text-ink-2">Grátis</p>
            <p className="mt-1 text-[34px] font-semibold">R$ 0</p>
            <ul className="mt-4 flex flex-col gap-2 text-[14px] text-ink-2">
              {['2 estações de OSCE por sistema', '2 casos clínicos vivos', 'Amostra de questões inéditas (20 por dia)', 'ECG, gasometria, RX e RCP'].map(x => <li key={x} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-good" />{x}</li>)}
            </ul>
            <a href={href('osce')} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl border border-line text-[15px] font-semibold hover:border-line-strong">Começar grátis</a>
          </div>
          <div className="rounded-3xl border-2 border-accent bg-surface p-6 shadow-pop">
            <p className="flex items-center gap-1.5 text-[15px] font-semibold text-accent"><Crown className="size-4" /> Premium</p>
            <p className="mt-1 text-[34px] font-semibold">{precoBRL(a.preco)}<span className="text-[15px] font-normal text-ink-3">/mês</span></p>
            <ul className="mt-4 flex flex-col gap-2 text-[14px] text-ink-2">
              {[`Todas as ${N_ESTACOES} estações e a trilha completa`, 'Prova OSCE completa e circuitos', 'Todos os casos, plantões e procedimentos', 'Todas as questões de provas anteriores', 'Banco completo de questões, sem limite, e simulados'].map(x => <li key={x} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-good" />{x}</li>)}
            </ul>
            {a.vendas ? <BotaoAssinar className="mt-6" /> : <a href={href('planos')} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-accent text-[15px] font-semibold text-accent-ink">Ver planos</a>}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <h2 className="mb-4 font-display text-[28px] font-semibold">Perguntas frequentes</h2>
        <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {FAQ.map(([q, r]) => (
            <details key={q} className="group p-4">
              <summary className="cursor-pointer list-none text-[15px] font-semibold marker:hidden">{q}</summary>
              <p className="mt-2 text-[14px] text-ink-2">{r}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-2 px-4 py-6 text-[13px] text-ink-3 sm:flex-row sm:justify-between sm:px-6">
          <span>Conteúdo educacional para estudantes de Medicina. Não substitui aulas, professores nem conduta clínica.</span>
          <span className="flex gap-4"><a href={href('termos')} className="hover:text-ink">Termos de uso</a><a href={href('privacidade')} className="hover:text-ink">Privacidade</a></span>
        </div>
      </footer>
    </div>
  );
}
