/**
 * Conteúdo protegido: o banco de questões sai do pacote do app e passa a vir daqui.
 * Assinante Premium (ou servidor sem vendas configuradas) recebe tudo; os demais recebem a amostra
 * grátis (só inéditas, ~1 em 5). Questões de provas anteriores são exclusivas do Premium.
 * Os arquivos ficam em src/data/questions (o Dockerfile copia para a imagem; não são servidos como estáticos).
 */
import fs from 'fs';
import path from 'path';
import express, { type Request, type Response } from 'express';
import { questaoGratis } from '../src/data/amostra';
import { acessoPremium } from './assinatura';

interface Q { id: string; origin?: string }
const DIR = process.env.CONTEUDO_DIR || path.join(process.cwd(), 'src/data/questions');
const NOME = /^[a-z0-9-]+$/;

let cache: Map<string, Q[]> | null = null;
/** carrega uma vez: chave "pr2/propedeutica" */
function banco() {
  if (cache) return cache;
  cache = new Map();
  for (const exam of fs.readdirSync(DIR)) {
    const d = path.join(DIR, exam);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d)) {
      if (!f.endsWith('.json')) continue;
      cache.set(`${exam}/${f.slice(0, -5)}`, JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')) as Q[]);
    }
  }
  return cache;
}

export function rotasConteudo() {
  const r = express.Router();

  /** índice: arquivos por prova, com total e quantas estão liberadas no plano do usuário */
  r.get('/api/conteudo/indice', async (req: Request, res: Response) => {
    const premium = await acessoPremium(req);
    const indice: Record<string, { arquivo: string; total: number; liberadas: number; provas: number }[]> = {};
    for (const [k, qs] of banco()) {
      const [exam, arquivo] = k.split('/');
      (indice[exam] ??= []).push({
        arquivo,
        total: qs.length,
        liberadas: premium ? qs.length : qs.filter(questaoGratis).length,
        provas: qs.filter(q => q.origin === 'prova').length,
      });
    }
    res.setHeader('Cache-Control', 'private, no-cache');
    res.json({ premium, indice });
  });

  r.get('/api/conteudo/questoes/:exam/:arquivo', async (req: Request, res: Response) => {
    const { exam, arquivo } = req.params;
    if (!NOME.test(exam) || !NOME.test(arquivo)) return res.status(400).end();
    const qs = banco().get(`${exam}/${arquivo}`);
    if (!qs) return res.status(404).json({ erro: 'Arquivo não encontrado.' });
    const premium = await acessoPremium(req);
    res.setHeader('Cache-Control', 'private, no-cache');
    res.setHeader('X-Plano', premium ? 'premium' : 'gratis');
    res.json(premium ? qs : qs.filter(questaoGratis));
  });
  return r;
}
