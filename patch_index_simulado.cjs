const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Número de Questões</label>
`;

const replaceStr = `
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Disciplina</label>
                            <select id="simulado-subject-select" onchange="window.selectSimuladoSubject(this.value)" class="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-700 font-bold focus:outline-none focus:border-orange-500 mb-2 bg-white appearance-none cursor-pointer">
                                <option value="all">Todas as Matérias</option>
                                <option value="Farmacologia">Farmacologia</option>
                                <option value="Propedêutica">Propedêutica</option>
                                <option value="Fisiopatologia">Fisiopatologia</option>
                                <option value="Bases Cirúrgicas">Bases Cirúrgicas</option>
                                <option value="GIS 2">GIS 2</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Número de Questões</label>
`;

html = html.replace(targetStr, replaceStr);

// Also change "O simulado irá misturar questões de todas as disciplinas para simular a prova real."
html = html.replace(
    'O simulado irá misturar questões de todas as disciplinas para simular a prova real.',
    'Selecione uma disciplina específica ou misture todas para simular a prova real.'
);

fs.writeFileSync('index.html', html);
console.log("Patched index.html for simulado subject selector");
