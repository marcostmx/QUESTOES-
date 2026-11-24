import type { Caso } from './motor';
import { ASMA } from './asma';
import { BRADI } from './bradi';
import { DISSECCAO } from './disseccao';
import { EAP } from './eap';
import { IAM } from './iam';
import { MEGACODE } from './megacode';
import { PNEUMOTORAX } from './pneumotorax';
import { TAQUI } from './taqui';

export const CASOS: Caso[] = [IAM, BRADI, TAQUI, EAP, MEGACODE, DISSECCAO, ASMA, PNEUMOTORAX];

export const SISTEMAS_CASO: { id: Caso['sistema']; nome: string }[] = [
  { id: 'cardiovascular', nome: 'Cardiovascular' },
  { id: 'respiratorio', nome: 'Respiratório' },
  { id: 'abdome', nome: 'Abdome e digestivo' },
  { id: 'neurologico', nome: 'Neurológico' },
  { id: 'renal', nome: 'Renal e metabólico' },
  { id: 'trauma', nome: 'Trauma e emergências' },
];

export const casoPorId = (id: string) => CASOS.find(c => c.id === id);
