import { HeartPulse, Pill, Scissors, Stethoscope, Users, type LucideIcon } from 'lucide-react';
import { SUBJECTS, type QuestionKind, type SubjectId } from '../data/schema';

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  short: string;
  color: string;
  icon: LucideIcon;
  blurb: string;
}

const extra: Record<SubjectId, { icon: LucideIcon; blurb: string }> = {
  fisiopatologia: { icon: HeartPulse, blurb: 'Mecanismos de doença: cardiovascular, respiratório, renal, endócrino.' },
  farmacologia: { icon: Pill, blurb: 'Farmacocinética, farmacodinâmica e classes terapêuticas.' },
  propedeutica: { icon: Stethoscope, blurb: 'Anamnese, exame físico e semiologia dos sistemas.' },
  'bases-cirurgicas': { icon: Scissors, blurb: 'Tempos cirúrgicos, assepsia, instrumentação e suturas.' },
  'iesc-iv': { icon: Users, blurb: 'Atenção primária, MCCP, SOAP e qualidade na ESF.' },
};

export const SUBJECT_LIST: SubjectMeta[] = SUBJECTS.map(s => ({
  id: s.id,
  name: s.name,
  short: s.short,
  color: `var(--s-${s.id})`,
  ...extra[s.id],
}));

export const subjectMeta = (id: string): SubjectMeta | undefined => SUBJECT_LIST.find(s => s.id === id);

export const KIND_LABEL: Record<QuestionKind, string> = {
  'multipla-escolha': 'Múltipla escolha',
  'verdadeiro-falso': 'Verdadeiro ou falso',
  associacao: 'Associação',
  'caso-clinico': 'Caso clínico',
  discursiva: 'Discursiva',
};
