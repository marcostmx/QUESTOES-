/** Utilidades de texto: busca sem acento e um Markdown mínimo e seguro. */

export function fold(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

/**
 * Converte o texto dos gabaritos em HTML: parágrafos, listas (-, •, 1.),
 * títulos (#) e negrito/itálico. Todo o conteúdo é escapado antes.
 */
export function renderMarkdown(src: string, opts: { allowHtml?: boolean } = {}): string {
  const lines = src.replace(/\r\n?/g, '\n').split('\n');
  const out: string[] = [];
  let list: 'ul' | 'ol' | null = null;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) out.push(`<p>${para.map(inline).join('<br>')}</p>`);
    para = [];
  };
  const closeList = () => {
    if (list) out.push(`</${list}>`);
    list = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();

    // Bloco HTML confiável do próprio banco (figuras/SVG): repassado como está.
    if (opts.allowHtml && /^\s*<(div|svg|table|figure)\b/i.test(line)) {
      flushPara();
      closeList();
      const block: string[] = [];
      let depth = 0;
      for (; i < lines.length; i++) {
        block.push(lines[i]);
        depth += (lines[i].match(/<(div|svg|table|figure)\b/gi) || []).length;
        depth -= (lines[i].match(/<\/(div|svg|table|figure)>/gi) || []).length;
        if (depth <= 0) break;
      }
      out.push(`<div class="figure">${block.join('\n')}</div>`);
      continue;
    }

    const bullet = line.match(/^\s*(?:[-•*]|·)\s+(.*)$/);
    const ordered = line.match(/^\s*(\d+)[.)]\s+(.*)$/);
    const heading = line.match(/^\s*#{1,6}\s+(.*)$/);

    if (!line.trim()) {
      flushPara();
      closeList();
    } else if (heading) {
      flushPara();
      closeList();
      out.push(`<h4>${inline(heading[1])}</h4>`);
    } else if (bullet || ordered) {
      flushPara();
      const kind = bullet ? 'ul' : 'ol';
      if (list !== kind) {
        closeList();
        out.push(kind === 'ol' && ordered && ordered[1] !== '1' ? `<ol start="${ordered[1]}">` : `<${kind}>`);
        list = kind;
      }
      out.push(`<li>${inline(bullet ? bullet[1] : ordered![2])}</li>`);
    } else {
      closeList();
      para.push(line.trim());
    }
  }
  flushPara();
  closeList();
  return out.join('');
}

/** Primeiras palavras do enunciado, para listas e resultados de busca. */
export function excerpt(s: string, max = 160): string {
  const flat = s.replace(/\s+/g, ' ').trim();
  return flat.length > max ? flat.slice(0, max).replace(/\s+\S*$/, '') + '…' : flat;
}

export const plural = (n: number, one: string, many: string) => `${n.toLocaleString('pt-BR')} ${n === 1 ? one : many}`;
