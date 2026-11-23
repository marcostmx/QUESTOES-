import type { Caso } from './motor';
import { BRADI } from './bradi';
import { EAP } from './eap';
import { IAM } from './iam';
import { TAQUI } from './taqui';

export const CASOS: Caso[] = [IAM, BRADI, TAQUI, EAP];

export const SISTEMAS_CASO: { id: Caso['sistema']; nome: string }[] = [
  { id: 'cardiovascular', nome: 'Cardiovascular' },
  { id: 'respiratorio', nome: 'Respiratório' },
  { id: 'abdome', nome: 'Abdome e digestivo' },
  { id: 'neurologico', nome: 'Neurológico' },
  { id: 'renal', nome: 'Renal e metabólico' },
  { id: 'trauma', nome: 'Trauma e emergências' },
];

export const casoPorId = (id: string) => CASOS.find(c => c.id === id);
