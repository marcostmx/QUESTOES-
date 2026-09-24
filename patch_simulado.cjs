const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const oldSimuladoMap = `    let allQ = [
        ...(farmacologiaQuestions || []).filter(q => q).map(q => ({...q, ogSubject: 'Farmacologia'})),
        ...(propedeuticaQuestions || []).filter(q => q).map(q => ({...q, ogSubject: 'Propedêutica'})),
        ...(fisiopatologiaQuestions || []).filter(q => q).map(q => ({...q, ogSubject: 'Fisiopatologia'})),
        ...(basesCirurgicasQuestions || []).filter(q => q).map(q => ({...q, ogSubject: 'Bases Cirúrgicas'})),
        ...(gis2_all || []).filter(q => q).map(q => ({...q, ogSubject: 'GIS 2'}))
    ];`;

const newSimuladoMap = `    let allQ = [
        ...(farmacologiaQuestions || []).map((q, idx) => ({...q, ogSubject: 'farmacologia', ogIndex: idx})).filter(q => q && Object.keys(q).length > 2),
        ...(propedeuticaQuestions || []).map((q, idx) => ({...q, ogSubject: 'propedêutica', ogIndex: idx})).filter(q => q && Object.keys(q).length > 2),
        ...(fisiopatologiaQuestions || []).map((q, idx) => ({...q, ogSubject: 'fisiopatologia', ogIndex: idx})).filter(q => q && Object.keys(q).length > 2),
        ...(basesCirurgicasQuestions || []).map((q, idx) => ({...q, ogSubject: 'bases cirúrgicas', ogIndex: idx})).filter(q => q && Object.keys(q).length > 2),
        ...(gis2_all || []).map((q, idx) => ({...q, ogSubject: 'gis2', ogIndex: idx})).filter(q => q && Object.keys(q).length > 2)
    ];`;

if (code.includes(oldSimuladoMap)) {
    code = code.replace(oldSimuladoMap, newSimuladoMap);
    fs.writeFileSync('src/main.tsx', code);
    console.log("Patched startSimulado mapping");
} else {
    console.log("Could not find oldSimuladoMap");
}
