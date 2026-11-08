/** Utilidades de texto: busca sem acento e um Markdown mínimo e seguro. */

export function fold(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const isRow = (l: string | undefined) => !!l && /\S\s\|\s\S/.test(l) && !/^\s*</.test(l);
const nextFilled = (lines: string[], i: number) => {
  for (let j = i + 1; j < lines.length; j++) if (lines[j].trim()) return lines[j];
  return undefined;
};

function renderTable(rows: string[][]): string {
  const cols = Math.max(...rows.map(r => r.length));
  const pad = (r: string[]) => [...r, ...Array(cols - r.length).fill('')];
  const [head, ...body] = rows;
  // cabeçalho com menos colunas (ex.: "Alternativa | Por quê" sobre linhas "F | A) | …"): última célula ocupa o resto
  const th = head.map((c, k) => `<th${k === head.length - 1 && head.length < cols ? ` colspan="${cols - head.length + 1}"` : ''}>${inline(c)}</th>`).join('');
  const tb = body.map(r => `<tr>${pad(r).map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('');
  return `<div class="table-wrap"><table><thead><tr>${th}</tr></thead><tbody>${tb}</tbody></table></div>`;
}

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

    // Tabela simples: linhas "a | b | c" (linhas em branco entre elas são toleradas).
    if (isRow(line)) {
      flushPara();
      closeList();
      const rows: string[][] = [];
      while (i < lines.length && (isRow(lines[i]) || (!lines[i].trim() && isRow(nextFilled(lines, i))))) {
        const cells = lines[i].trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
        const separator = cells.every(c => /^:?-{2,}:?$/.test(c));
        if (lines[i].trim() && !separator) rows.push(cells);
        i++;
      }
      i--;
      out.push(renderTable(rows));
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
