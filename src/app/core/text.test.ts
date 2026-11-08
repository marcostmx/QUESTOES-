import { describe, expect, it } from 'vitest';
import { excerpt, fold, renderMarkdown } from './text';

describe('renderMarkdown', () => {
  it('escapa HTML', () => {
    expect(renderMarkdown('<script>x</script>')).toBe('<p>&lt;script&gt;x&lt;/script&gt;</p>');
  });

  it('negrito, parágrafos e quebras', () => {
    expect(renderMarkdown('**Alternativa B**\nporque\n\nfim')).toBe('<p><strong>Alternativa B</strong><br>porque</p><p>fim</p>');
  });

  it('listas com marcador e numeradas', () => {
    expect(renderMarkdown('- um\n- dois')).toBe('<ul><li>um</li><li>dois</li></ul>');
    expect(renderMarkdown('1. a\n2. b')).toBe('<ol><li>a</li><li>b</li></ol>');
    expect(renderMarkdown('3) c')).toBe('<ol start="3"><li>c</li></ol>');
  });

  it('repassa blocos HTML só quando permitido', () => {
    const src = 'Texto\n<div class="x">\n<svg><text>a</text></svg>\n</div>\nfim';
    expect(renderMarkdown(src, { allowHtml: true })).toBe(
      '<p>Texto</p><div class="figure"><div class="x">\n<svg><text>a</text></svg>\n</div></div><p>fim</p>',
    );
    expect(renderMarkdown(src)).not.toContain('<svg>');
  });

  it('monta tabelas com linhas separadas por linha em branco', () => {
    const html = renderMarkdown('Intro\n\nAlternativa | Por quê\n\nF | A) | errado\n\nV | B) | certo\n\nFim');
    expect(html).toBe(
      '<p>Intro</p><div class="table-wrap"><table><thead><tr><th>Alternativa</th><th colspan="2">Por quê</th></tr></thead>' +
        '<tbody><tr><td>F</td><td>A)</td><td>errado</td></tr><tr><td>V</td><td>B)</td><td>certo</td></tr></tbody></table></div><p>Fim</p>',
    );
  });

  it('entende tabelas no formato Markdown (| a | b | e :---)', () => {
    expect(renderMarkdown('| | X | Y |\n| :--- | :--- | :--- |\n| VEF1 | baixo | normal |')).toBe(
      '<div class="table-wrap"><table><thead><tr><th></th><th>X</th><th>Y</th></tr></thead><tbody><tr><td>VEF1</td><td>baixo</td><td>normal</td></tr></tbody></table></div>',
    );
  });

  it('não confunde multiplicação/asterisco solto com itálico', () => {
    expect(renderMarkdown('2 * 3 = 6')).toBe('<p>2 * 3 = 6</p>');
  });
});

describe('fold / excerpt', () => {
  it('remove acentos e caixa', () => {
    expect(fold('Propedêutica CIRÚRGICA')).toBe('propedeutica cirurgica');
  });
  it('corta em palavra inteira', () => {
    expect(excerpt('uma frase bem comprida aqui', 12)).toBe('uma frase…');
  });
});
