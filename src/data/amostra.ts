/**
 * Amostra do plano grátis: só questões inéditas, cerca de 1 em cada 5 (escolha fixa pelo id).
 * Questões de provas anteriores (e de slides/materiais) são exclusivas do Premium.
 * Usado pelo servidor para filtrar o banco e pelos testes.
 */
export const FRACAO_GRATIS = 5;

/** hash FNV-1a de 32 bits (estável entre servidor e cliente) */
export function hashId(s: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

export const questaoGratis = (q: { id: string; origin?: string }) => q.origin === 'inedita' && hashId(q.id) % FRACAO_GRATIS === 0;
