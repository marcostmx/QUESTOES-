const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const oldSelect = `<option value="all">Todas as Matérias</option>
                                <option value="Farmacologia">Farmacologia</option>
                                <option value="Propedêutica">Propedêutica</option>
                                <option value="Fisiopatologia">Fisiopatologia</option>
                                <option value="Bases Cirúrgicas">Bases Cirúrgicas</option>
                                <option value="GIS 2">GIS 2</option>`;

const newSelect = `<option value="all">Todas as Matérias</option>
                                <option value="farmacologia">Farmacologia</option>
                                <option value="propedêutica">Propedêutica</option>
                                <option value="fisiopatologia">Fisiopatologia</option>
                                <option value="bases cirúrgicas">Bases Cirúrgicas</option>
                                <option value="gis2">GIS 2</option>`;

if (code.includes(oldSelect)) {
    code = code.replace(oldSelect, newSelect);
    fs.writeFileSync('index.html', code);
    console.log("Patched index.html simulado select");
} else {
    console.log("Could not find oldSelect");
}
