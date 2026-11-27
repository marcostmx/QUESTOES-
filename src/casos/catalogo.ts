import type { Caso } from './motor';
import { ASMA } from './asma';
import { BRADI } from './bradi';
import { DISSECCAO } from './disseccao';
import { DPOC } from './dpoc';
import { EAP } from './eap';
import { HDA } from './hda';
import { IAM } from './iam';
import { MEGACODE } from './megacode';
import { PNEUMOTORAX } from './pneumotorax';
import { SEPSE } from './sepse';
import { TAQUI } from './taqui';
import { TEP } from './tep';

export const CASOS: Caso[] = [IAM, BRADI, TAQUI, EAP, MEGACODE, DISSECCAO, ASMA, DPOC, PNEUMOTORAX, SEPSE, TEP, HDA];

export const SISTEMAS_CASO: { id: Caso['sistema']; nome: string }[] = [
  { id: 'cardiovascular', nome: 'Cardiovascular' },
  { id: 'respiratorio', nome: 'Respiratório' },
  { id: 'abdome', nome: 'Abdome e digestivo' },
  { id: 'neurologico', nome: 'Neurológico' },
  { id: 'renal', nome: 'Renal e metabólico' },
  { id: 'trauma', nome: 'Trauma e emergências' },
];

export const casoPorId = (id: string) => CASOS.find(c => c.id === id);
