import { farmaco_1_15 } from '../src/farmaco_1_15';
import { farmaco_16_30 } from '../src/farmaco_16_30';
import { farmaco_31_45 } from '../src/farmaco_31_45';
import { farmaco_56_70 } from '../src/farmaco_56_70';
import { farmaco_71_81 } from '../src/farmaco_71_81';
import { farmaco_82_100 } from '../src/farmaco_82_100';
import { farmaco_prova_11q } from '../src/farmaco_prova_11q';
import { farmaco_q1_300 } from '../src/farmaco_q1_300';
import { farmaco_q301_600 } from '../src/farmaco_q301_600';

const banks = [
  { name: 'f1_15', list: farmaco_1_15 },
  { name: 'f16_30', list: farmaco_16_30 },
  { name: 'f31_45', list: farmaco_31_45 },
  { name: 'f56_70', list: farmaco_56_70 },
  { name: 'f71_81', list: farmaco_71_81 },
  { name: 'f82_100', list: farmaco_82_100 },
  { name: 'prova11', list: farmaco_prova_11q },
  { name: 'q1_300', list: farmaco_q1_300 },
  { name: 'q301_600', list: farmaco_q301_600 }
];

const suspiciousKeywords = [
  'parkinson', 'asma', 'hipertens', 'insuficiência cardíaca', 'infecção', 'antibiótico', 'antifúngic',
  'autônomo', 'sna', 'simpátic', 'parassimpátic', 'muscarínic', 'nicotínic', 'adrenérgic', 'colinérgic',
  'atropina', 'pilocarpina', 'salbutamol', 'betabloqueador', 'propranolol', 'adrenalina', 'noradrenalina',
  'anabolizante', 'emagrecimento', 'anorexígeno', 'antidepressiv', 'antipsicótic', 'alzheimer', 'epilepsia',
  'anticonvulsivante', 'arritmia', 'angina', 'infarto', 'diabetes', 'insulina', 'metformina'
];

banks.forEach(b => {
  console.log(`=== Bank: ${b.name} Total: ${b.list.length}`);
  b.list.forEach((q: any, idx: number) => {
    const fullText = (q.text + ' ' + (q.options?.join(' ') || '') + ' ' + (q.gabarito || '')).toLowerCase();
    const matches = suspiciousKeywords.filter(k => fullText.includes(k));
    if (matches.length > 0) {
      console.log(`[${b.name} #${idx}] (${matches.join(', ')}): ${q.text.substring(0, 110)}...`);
    }
  });
});
