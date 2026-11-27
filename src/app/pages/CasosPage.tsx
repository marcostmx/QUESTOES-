import { Activity, ArrowRight, FlaskConical, HeartPulse, Lock, ScanLine, Syringe, Users } from 'lucide-react';
import { CASOS, SISTEMAS_CASO } from '../../casos/catalogo';
import { PROCEDIMENTOS } from '../../casos/procedimentos';
import { useCasoHistory } from '../../casos/history';
import { href } from '../router';
import { Badge, Card, cx, PageHeader, Section } from '../ui';

/** Próximos casos de cada sistema (do roteiro), mostrados como "em breve". */
const EM_BREVE: Record<string, string[]> = {
  cardiovascular: [],
  respiratorio: [],
  abdome: ['Apendicite', 'Colecistite e colangite', 'Pancreatite', 'Obstrução intestinal'],
  neurologico: ['AVC isquêmico na janela', 'Estado de mal epiléptico'],
  renal: ['Cetoacidose diabética', 'Hipercalemia'],
  trauma: ['Trauma pelo ABCDE', 'Anafilaxia'],
};

export default function CasosPage() {
  const hist = useCasoHistory();
  const melhor = (id: string) => Math.max(-1, ...hist.filter(h => h.id === id).map(h => h.nota));
  return (
    <>
      <PageHeader eyebrow="Plantão" title="Casos clínicos vivos">
        O paciente evolui em tempo real: os sinais vitais mudam com o tempo e com as suas condutas. No fim, um debriefing mostra as metas, os erros e o tempo de cada decisão.
      </PageHeader>
      <a href={href('plantao/cardiovascular')} className="mb-3 flex items-center gap-4 rounded-2xl border border-ink bg-ink p-4 text-bg transition hover:shadow-card active:scale-[0.99]">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15"><Users className="size-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold">Plantão do pronto-socorro · Cardiovascular</span>
          <span className="block text-[13px] opacity-75">Classifique o risco (Manchester) e decida quem atender primeiro. 10 pacientes por plantão.</span>
        </span>
        <ArrowRight className="size-4 shrink-0 opacity-70" />
      </a>
      <a href={href('plantao/respiratorio')} className="mb-3 flex items-center gap-4 rounded-2xl border border-ink bg-ink p-4 text-bg transition hover:shadow-card active:scale-[0.99]">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15"><Users className="size-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold">Plantão do pronto-socorro · Respiratório</span>
          <span className="block text-[13px] opacity-75">Classifique o risco (Manchester) e decida quem atender primeiro. 10 pacientes por plantão.</span>
        </span>
        <ArrowRight className="size-4 shrink-0 opacity-70" />
      </a>
      <a href={href('ecg')} className="mb-3 flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:border-line-strong hover:shadow-card active:scale-[0.99]">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><Activity className="size-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold">Treino de ECG</span>
          <span className="block text-[13px] text-ink-2">Quiz e atlas com 18 padrões: arritmias, bloqueios, IAM, hipercalemia e pericardite.</span>
        </span>
        <ArrowRight className="size-4 shrink-0 text-ink-3" />
      </a>
      <a href={href('gasometria')} className="mb-3 flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:border-line-strong hover:shadow-card active:scale-[0.99]">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><FlaskConical className="size-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold">Gasometria arterial passo a passo</span>
          <span className="block text-[13px] text-ink-2">Distúrbio primário, compensação, ânion gap, delta-delta e causa, com as fórmulas.</span>
        </span>
        <ArrowRight className="size-4 shrink-0 text-ink-3" />
      </a>
      <a href={href('rx')} className="mb-3 flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:border-line-strong hover:shadow-card active:scale-[0.99]">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><ScanLine className="size-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold">Radiografia de tórax</span>
          <span className="block text-[13px] text-ink-2">Quiz e atlas: pneumotórax, derrame, consolidação, congestão, pneumoperitônio e mais.</span>
        </span>
        <ArrowRight className="size-4 shrink-0 text-ink-3" />
      </a>
      <a href={href('rcp')} className="mb-8 flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:border-line-strong hover:shadow-card active:scale-[0.99]">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-bad-soft text-bad"><HeartPulse className="size-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold">RCP e desfibrilação</span>
          <span className="block text-[13px] text-ink-2">Comprima no ritmo certo, ventile 30:2, analise o ritmo e choque com segurança.</span>
        </span>
        <ArrowRight className="size-4 shrink-0 text-ink-3" />
      </a>
      {SISTEMAS_CASO.map(s => {
        const casos = CASOS.filter(c => c.sistema === s.id);
        return (
          <Section key={s.id} title={s.nome}>
            <div className="grid gap-3 sm:grid-cols-2">
              {casos.map(c => {
                const m = melhor(c.id);
                return (
                  <a key={c.id} href={href(`casos/${c.id}`)} className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:border-line-strong hover:shadow-card active:scale-[0.99]">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-bad-soft text-bad"><HeartPulse className="size-5" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold">{c.titulo}</span>
                      <span className="block text-[13px] text-ink-2">{c.subtitulo}</span>
                    </span>
                    {m >= 0 && <Badge tone={m >= 70 ? 'good' : m >= 50 ? 'warn' : 'bad'}>{m}</Badge>}
                    <ArrowRight className="size-4 shrink-0 text-ink-3" />
                  </a>
                );
              })}
              {PROCEDIMENTOS.filter(p => p.sistema === s.id).map(p => {
                const m = melhor(`proc-${p.id}`);
                return (
                  <a key={p.id} href={href(`procedimento/${p.id}`)} className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:border-line-strong hover:shadow-card active:scale-[0.99]">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><Syringe className="size-5" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold">{p.titulo}</span>
                      <span className="block text-[13px] text-ink-2">Procedimento passo a passo · {p.etapas.length} etapas</span>
                    </span>
                    {m >= 0 && <Badge tone={m >= 70 ? 'good' : m >= 50 ? 'warn' : 'bad'}>{m}</Badge>}
                    <ArrowRight className="size-4 shrink-0 text-ink-3" />
                  </a>
                );
              })}
              {(EM_BREVE[s.id] ?? []).map(t => (
                <Card key={t} className={cx('flex items-center gap-4 border-dashed p-4 opacity-70')}>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-ink-3"><Lock className="size-4" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-medium text-ink-2">{t}</span>
                    <span className="block text-[12px] text-ink-3">Em breve</span>
                  </span>
                </Card>
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
}
